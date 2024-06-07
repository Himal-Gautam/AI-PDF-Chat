from fastapi import APIRouter, UploadFile, File, HTTPException
from fastapi.responses import JSONResponse
import fitz
from llama_index import GPTVectorStoreIndex, ServiceContext, Document
from langchain.llms import OpenAI


router = APIRouter(
    prefix="/pdf",
    tags=["pdf"],
)

@router.post("/upload/")
async def upload_pdf(file: UploadFile = File(...)):
    # Validate file type
    if not file.filename.endswith('.pdf'):
        raise HTTPException(status_code=400, detail="Invalid file type. Only PDF files are allowed.")

    # Save the uploaded PDF file
    file_path = f"uploads/{file.filename}"
    with open(file_path, "wb") as f:
        f.write(await file.read())

    # Load the PDF
    doc = fitz.open(file_path)
    text = ""
    for page in doc:
        text += page.get_text()

    # Create LlamaIndex
    service_context = ServiceContext.from_defaults(llm=OpenAI(temperature=0, model_name="gpt-3.5-turbo"))
    index = GPTVectorStoreIndex.from_documents([Document(text=text)], service_context=service_context)
    index_name = file.filename.replace(".pdf", "")
    index.save_to_disk(f'uploads/{index_name}.json')

    return JSONResponse(content={"message": "PDF uploaded and processed successfully", "file_name": file.filename}, status_code=200)


@router.get("/ask/")
async def ask_question(question: str = Query(..., description="The question to ask"), 
                       file_name: str = Query(..., description="The filename (without .pdf) of the uploaded PDF")):
    
    # Load LlamaIndex from disk
    try:
        index = GPTSimpleVectorIndex.load_from_disk(f'uploads/{file_name}.json')
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail=f"PDF with filename '{file_name}' not found.")

    # Query LlamaIndex
    response = index.query(question)

    return JSONResponse(content={"answer": response.response}, status_code=200)

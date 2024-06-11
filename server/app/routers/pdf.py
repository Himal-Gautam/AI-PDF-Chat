from fastapi import APIRouter, UploadFile, File, HTTPException, Depends, Query
from fastapi.responses import JSONResponse
import shutil
import os
from uuid import uuid4
from llama_index.core import VectorStoreIndex, ServiceContext, Document
from langchain.llms import OpenAI
from dotenv import load_dotenv
import logging
from app.utils import extract_text_from_pdf

load_dotenv()
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

router = APIRouter(
    prefix="/pdf",
    tags=["pdf"],
)

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/upload/")
async def upload_pdf(file: UploadFile = File(...)):
    if not file.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Invalid file type. Only PDFs are allowed.")

    file_id = str(uuid4())
    file_path = os.path.join(UPLOAD_DIR, f"{file_id}.pdf")

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Extract text using the utility function
    document_text = extract_text_from_pdf(file_path)

    # Create LlamaIndex from the extracted text
    service_context = ServiceContext.from_defaults(llm=OpenAI(temperature=0, model_name="gpt-3.5-turbo", openai_api_key=OPENAI_API_KEY))
    index = VectorStoreIndex.from_documents([Document(text=document_text)], service_context=service_context)
    index.save_to_disk(f'uploads/{file_id}.json')

    return JSONResponse(content={"file_id": file_id})


@router.post("/ask/")
async def ask_question(file_id: str, question: str):
    try:
        index = VectorStoreIndex.load_from_disk(f'uploads/{file_id}.json')
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="File not found.")

    response = index.query(question)
    
    return JSONResponse(content={"answer": response.response}, status_code=200)

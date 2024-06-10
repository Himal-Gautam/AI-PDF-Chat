# from fastapi import FastAPI
# from app.routers import pdf

# app = FastAPI(title="PDF Q&A API")  # Added a title for better API docs

# app.include_router(pdf.router)  # Include the PDF router

# @app.get("/")
# def read_root():
#     return {"message": "Welcome to the PDF Q&A API"}


from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.responses import JSONResponse
import shutil
import os
from uuid import uuid4
from PyPDF2 import PdfReader

app = FastAPI()

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)


@app.post("/upload/")
async def upload_pdf(file: UploadFile = File(...)):
    if not file.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Invalid file type. Only PDFs are allowed.")

    file_id = str(uuid4())
    file_path = os.path.join(UPLOAD_DIR, f"{file_id}.pdf")

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

#pdf se text nikaaal ne ke liye 
    pdf_reader = PdfReader(file_path)
    text = ""
    for page in pdf_reader.pages:
        text += page.extract_text()

    # Ssave karle extracted text 
    text_path = os.path.join(UPLOAD_DIR, f"{file_id}.txt")
    with open(text_path, "w") as text_file:
        text_file.write(text)

    return JSONResponse(content={"file_id": file_id})


@app.post("/ask/")
async def ask_question(file_id: str, question: str):
    text_path = os.path.join(UPLOAD_DIR, f"{file_id}.txt")
    if not os.path.exists(text_path):
        raise HTTPException(status_code=404, detail="File not found.")

    with open(text_path, "r") as text_file:
        document_text = text_file.read()

    # labgchain ya lama ka model use karliyo 
    # Here, we'll mock the answer processing
    answer = "This is a mock answer based on the question and document text."

    return JSONResponse(content={"answer": answer})


if _name_ == "_main_":
    uvicorn.run(app, host="0.0.0.0",port=8000)
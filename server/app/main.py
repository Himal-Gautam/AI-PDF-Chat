from fastapi import FastAPI
from app.routers import pdf

app = FastAPI(title="PDF Q&A API")  # Added a title for better API docs

app.include_router(pdf.router)  # Include the PDF router

@app.get("/")
def read_root():
    return {"message": "Welcome to the PDF Q&A API"}

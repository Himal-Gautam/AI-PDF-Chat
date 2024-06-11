from fastapi import FastAPI
from app.routers import pdf

app = FastAPI(title="PDF Q&A API")  

app.include_router(pdf.router)  

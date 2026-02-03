from fastapi import FastAPI
from src.database import Base, engine
import src.models

app = FastAPI(title="AI-First CRM HCP")

Base.metadata.create_all(bind=engine)

@app.get("/health")
def health_check():
    return {"status": "Backend is running 🚀"}

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.database import Base, engine
from src.routes.doctor import router as doctor_router
from src.routes.interaction import router as interaction_router

app = FastAPI(title="AI-First CRM (HCP)")


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# create tables
Base.metadata.create_all(bind=engine)

# routes
app.include_router(doctor_router)
app.include_router(interaction_router)

@app.get("/health")
def health():
    return {"status": "Backend running 🚀"}

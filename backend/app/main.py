from fastapi import FastAPI

app = FastAPI(title="AI-First CRM HCP")

@app.get("/health")
def health_check():
    return {"status": "Backend is running 🚀"}

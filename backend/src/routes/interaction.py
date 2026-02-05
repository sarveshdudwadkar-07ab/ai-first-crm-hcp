from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from src.database import get_db
from src import models, schemas
from src.ai.llm import llm

router = APIRouter(
    prefix="/interactions",
    tags=["Interactions"]
)

@router.post("/")
def create_interaction(
    interaction: schemas.InteractionCreate,
    db: Session = Depends(get_db)
):
    print("📥 Notes received:", interaction.notes)

    ai_summary = None

    try:
        response = llm.invoke(
            f"Summarize this doctor interaction in simple medical language:\n{interaction.notes}"
        )
        ai_summary = response.content
        print("🤖 AI summary generated:", ai_summary)

    except Exception as e:
        print("❌ LLM failed:", str(e))

    new_interaction = models.Interaction(
        doctor_id=interaction.doctor_id,
        notes=interaction.notes,
        ai_summary=ai_summary
    )

    db.add(new_interaction)
    db.commit()
    db.refresh(new_interaction)

    return new_interaction


@router.get("/")
def get_interactions(db: Session = Depends(get_db)):
    return db.query(models.Interaction).all()

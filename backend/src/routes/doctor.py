from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from src.database import get_db
from src import models, schemas

router = APIRouter(prefix="/doctors", tags=["Doctors"])

@router.post("/")
def create_doctor(doctor: schemas.DoctorCreate, db: Session = Depends(get_db)):
    new_doctor = models.Doctor(
        name=doctor.name,
        specialty=doctor.specialty
    )
    db.add(new_doctor)
    db.commit()
    db.refresh(new_doctor)
    return new_doctor


@router.get("/")
def get_doctors(db: Session = Depends(get_db)):
    return db.query(models.Doctor).all()

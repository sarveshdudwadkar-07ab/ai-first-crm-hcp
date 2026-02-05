from pydantic import BaseModel

class DoctorCreate(BaseModel):
    name: str
    specialty: str


class InteractionCreate(BaseModel):
    doctor_id: int
    notes: str

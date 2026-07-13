from pydantic import BaseModel

class SalaryInput(BaseModel):
    ctc: float
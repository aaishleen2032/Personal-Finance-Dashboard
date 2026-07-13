from pydantic import BaseModel


class TaxInput(BaseModel):
    salary: float
    otherIncome: float = 0
    deduction80C: float = 0
    deduction80D: float = 0
    nps: float = 0
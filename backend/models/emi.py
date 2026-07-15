from pydantic import BaseModel

class EMIInput(BaseModel):
    principal: float
    annualRate: float
    years: int
    scheduleType: int
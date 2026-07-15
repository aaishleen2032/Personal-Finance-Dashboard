from fastapi import APIRouter

from models.emi import EMIInput
from services.emi_service import calculate_loan
router = APIRouter()

@router.post("/calculate-emi")
def calculate(data: EMIInput):
    return calculate_loan(data)
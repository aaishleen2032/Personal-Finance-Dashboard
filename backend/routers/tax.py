from fastapi import APIRouter
from models.tax import TaxInput
from services.tax_service import calculate_tax
router = APIRouter()
@router.post("/calculate-tax")
def calculate(data: TaxInput):
    return calculate_tax(data)
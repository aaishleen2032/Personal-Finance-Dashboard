from fastapi import APIRouter
from models.salary import SalaryInput
from services.ctc_service import calculate_ctc

router = APIRouter()


@router.post("/calculate-ctc")
def calculate(data: SalaryInput):
    return calculate_ctc(data.ctc)
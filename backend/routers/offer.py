from fastapi import APIRouter

from models.offer import OfferComparisonInput
from services.offer_service import compare_offers

router = APIRouter()

@router.post("/compare-offers")
def compare(data: OfferComparisonInput):
    return compare_offers(data)
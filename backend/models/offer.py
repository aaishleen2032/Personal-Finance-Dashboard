from pydantic import BaseModel

class Offer(BaseModel):
    ctc: float
    joiningBonus: float = 0
    esops: float = 0
    companyRating: float
    growth: float
    city: str
    benefitScore: float

class OfferComparisonInput(BaseModel):
    offerA: Offer
    offerB: Offer
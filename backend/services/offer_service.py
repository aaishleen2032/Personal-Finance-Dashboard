from services.ctc_service import calculate_ctc

city_scores = {
    "Remote": 10,
    "Hyderabad": 9,
    "Pune": 8,
    "Delhi": 7,
    "Noida": 7,
    "Chennai": 7,
    "Bangalore": 6,
    "Mumbai": 5
}

def calculate_offer(offer):
    salary = calculate_ctc(offer.ctc)
    annual_take_home = salary["annualSalary"] + offer.joiningBonus
    return {
        "ctc": offer.ctc,
        "bonus": offer.joiningBonus,
        "esop": offer.esops,
        "benefits": offer.benefitScore,
        "growth": offer.growth,
        "companyRating": offer.companyRating,
        "city": offer.city,
        "cityScore": city_scores.get(offer.city, 0),
        "annualTakeHome": annual_take_home,
        "monthlyIncome": annual_take_home / 12,
        "basic": salary["basic"],
        "employeePF": salary["employeePF"],
        "tax": salary["tax"]
    }

def compare_offers(data):
    offerA = calculate_offer(data.offerA)
    offerB = calculate_offer(data.offerB)
    scoreA = 0
    scoreB = 0
    if offerA["annualTakeHome"] > offerB["annualTakeHome"]:
        scoreA += 35
    elif offerB["annualTakeHome"] > offerA["annualTakeHome"]:
        scoreB += 35
    if offerA["bonus"] > offerB["bonus"]:
        scoreA += 10
    elif offerB["bonus"] > offerA["bonus"]:
        scoreB += 10
    if offerA["esop"] > offerB["esop"]:
        scoreA += 15
    elif offerB["esop"] > offerA["esop"]:
        scoreB += 15
    if offerA["benefits"] > offerB["benefits"]:
        scoreA += 10
    elif offerB["benefits"] > offerA["benefits"]:
        scoreB += 10
    if offerA["growth"] > offerB["growth"]:
        scoreA += 15
    elif offerB["growth"] > offerA["growth"]:
        scoreB += 15
    if offerA["companyRating"] > offerB["companyRating"]:
        scoreA += 10
    elif offerB["companyRating"] > offerA["companyRating"]:
        scoreB += 10
    if offerA["cityScore"] > offerB["cityScore"]:
        scoreA += 5
    elif offerB["cityScore"] > offerA["cityScore"]:
        scoreB += 5
    winner = "Both Offers are Equal"
    if scoreA > scoreB:
        winner = "Offer A is Better"
    elif scoreB > scoreA:
        winner = "Offer B is Better"
    return {
        "offerA": offerA,
        "offerB": offerB,
        "scoreA": scoreA,
        "scoreB": scoreB,
        "winner": winner
    }
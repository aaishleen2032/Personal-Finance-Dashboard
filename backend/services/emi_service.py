from math import pow


def calculate_emi(principal, annual_rate, years):
    months = years * 12
    monthly_rate = annual_rate / (12 * 100)

    if monthly_rate == 0:
        emi = principal / months
    else:
        emi = (
            principal
            * monthly_rate
            * pow(1 + monthly_rate, months)
        ) / (
            pow(1 + monthly_rate, months) - 1
        )
    return {
        "emi": emi,
        "totalPayment": emi * months,
        "totalInterest": emi * months - principal,
    }


def generate_schedule(principal, annual_rate, years, emi, step):
    monthly_rate = annual_rate / (12 * 100)
    total_months = years * 12
    balance = principal
    schedule = []
    principal_sum = 0
    interest_sum = 0
    emi_sum = 0
    for month in range(1, total_months + 1):
        interest = balance * monthly_rate
        principal_paid = emi - interest
        balance -= principal_paid
        if balance < 0:
            balance = 0
        principal_sum += principal_paid
        interest_sum += interest
        emi_sum += emi
        if month % step == 0 or month == total_months:
            if step == 1:
                label = str(month)
            elif step == 6:
                label = f"Period {((month - 1) // 6) + 1}"
            else:
                label = f"Year {((month - 1) // 12) + 1}"

            schedule.append({
                "label": label,
                "emiPaid": emi_sum,
                "principal": principal_sum,
                "interest": interest_sum,
                "balance": balance
            })
            principal_sum = 0
            interest_sum = 0
            emi_sum = 0
    return schedule

def calculate_loan(data):
    result = calculate_emi(
        data.principal,
        data.annualRate,
        data.years
    )

    schedule = generate_schedule(
        data.principal,
        data.annualRate,
        data.years,
        result["emi"],
        data.scheduleType
    )

    return {
        **result,
        "schedule": schedule
    }
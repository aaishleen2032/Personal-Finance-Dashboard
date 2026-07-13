STANDARD_DEDUCTION = 75000


def calculate_new_regime_tax(income):
    tax = 0

    if income <= 400000:
        tax = 0
    elif income <= 800000:
        tax = (income - 400000) * 0.05
    elif income <= 1200000:
        tax = 20000 + (income - 800000) * 0.10
    elif income <= 1600000:
        tax = 60000 + (income - 1200000) * 0.15
    elif income <= 2000000:
        tax = 120000 + (income - 1600000) * 0.20
    elif income <= 2400000:
        tax = 200000 + (income - 2000000) * 0.25
    else:
        tax = 300000 + (income - 2400000) * 0.30

    return tax * 1.04


def calculate_old_regime_tax(income, deduction):
    taxable_income = max(income - deduction, 0)

    tax = 0

    if taxable_income <= 250000:
        tax = 0
    elif taxable_income <= 500000:
        tax = (taxable_income - 250000) * 0.05
    elif taxable_income <= 1000000:
        tax = 12500 + (taxable_income - 500000) * 0.20
    else:
        tax = 112500 + (taxable_income - 1000000) * 0.30

    return tax * 1.04


def calculate_tax(data):
    gross_income = data.salary + data.otherIncome

    total_deduction = (
        STANDARD_DEDUCTION
        + data.deduction80C
        + data.deduction80D
        + data.nps
    )

    taxable_old = max(gross_income - total_deduction, 0)

    taxable_new = max(gross_income - STANDARD_DEDUCTION, 0)

    old_tax = calculate_old_regime_tax(
        gross_income,
        total_deduction
    )

    new_tax = calculate_new_regime_tax(
        taxable_new
    )

    better_regime = (
        "Old Regime"
        if old_tax < new_tax
        else "New Regime"
    )

    saving = abs(old_tax - new_tax)

    return {
        "grossIncome": gross_income,
        "taxableIncome": taxable_old,
        "totalDeduction": total_deduction,
        "oldTax": old_tax,
        "newTax": new_tax,
        "recommended": better_regime,
        "saving": saving
    }
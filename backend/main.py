from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

# Allow frontend to talk to backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class SalaryInput(BaseModel):
    ctc: float


def calculate_tax(taxable_income):
    tax = 0

    if taxable_income <= 400000:
        tax = 0
    elif taxable_income <= 800000:
        tax = (taxable_income - 400000) * 0.05
    elif taxable_income <= 1200000:
        tax = 20000 + (taxable_income - 800000) * 0.10
    elif taxable_income <= 1600000:
        tax = 60000 + (taxable_income - 1200000) * 0.15
    elif taxable_income <= 2000000:
        tax = 120000 + (taxable_income - 1600000) * 0.20
    elif taxable_income <= 2400000:
        tax = 200000 + (taxable_income - 2000000) * 0.25
    else:
        tax = 300000 + (taxable_income - 2400000) * 0.30

    return tax * 1.04


@app.post("/calculate-ctc")
def calculate_ctc(data: SalaryInput):

    ctc = data.ctc

    basic = ctc * 0.40

    employee_pf = min(basic * 0.12, 21600)

    employer_pf = min(basic * 0.12, 21600)

    gross_salary = ctc - employer_pf

    taxable_income = (gross_salary - employee_pf) - 75000

    tax = calculate_tax(max(taxable_income, 0))

    annual_salary = gross_salary - employee_pf - tax

    monthly_income = annual_salary / 12

    return {
        "basic": basic,
        "employeePF": employee_pf,
        "grossSalary": gross_salary,
        "tax": tax,
        "annualSalary": annual_salary,
        "monthlyIncome": monthly_income
    }
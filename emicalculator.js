
function calculateEMI(principal, annualRate, years) {
    const months = years * 12;
    const monthlyRate = annualRate / (12 * 100);
    let emi;
    if (monthlyRate === 0) {
        emi = principal / months;
    } else {
        emi =
            (principal *
                monthlyRate *
                Math.pow(1 + monthlyRate, months)) /
            (Math.pow(1 + monthlyRate, months) - 1);
    }
    return {
        emi,
        totalPayment: emi * months,
        totalInterest: (emi * months) - principal
    };
}

// Generate Amortization Schedule
function generateSchedule(principal, annualRate, years, emi) {
    const monthlyRate = annualRate / (12 * 100);
    const totalMonths = years * 12;
    const step = Number(document.getElementById("scheduleType").value);
    let balance = principal;
    let rows = "";
    let principalSum = 0;
    let interestSum = 0;
    let emiSum = 0;
    let heading = "Month";
    if (step === 6)
        heading = "Period";
    if (step === 12)
        heading = "Year";
    for (let month = 1; month <= totalMonths; month++) {
        const interest = balance * monthlyRate;
        const principalPaid = emi - interest;
        balance -= principalPaid;
        if (balance < 0)
            balance = 0;
        principalSum += principalPaid;
        interestSum += interest;
        emiSum += emi;
        if (month % step === 0 || month === totalMonths) {
            let label;
            if (step === 1) {
                label = month;
            }
            else if (step === 6) {
                label = `Month ${month}`;
            }
            else {
                label = `Year ${Math.ceil(month / 12)}`;
            }
            rows += `
            <tr>
                <td>${label}</td>
                <td>
                ₹${emiSum.toLocaleString("en-IN", {
                    maximumFractionDigits: 2
                })}
                </td>
                <td>
                ₹${principalSum.toLocaleString("en-IN", {
                    maximumFractionDigits: 2
                })}
                </td>
                <td>
                ₹${interestSum.toLocaleString("en-IN", {
                    maximumFractionDigits: 2
                })}
                </td>
                <td>
                ₹${balance.toLocaleString("en-IN", {
                    maximumFractionDigits: 2
                })}
                </td>
            </tr>
            `;
            principalSum = 0;
            interestSum = 0;
            emiSum = 0;
        }
    }
    return {
        rows,
        heading
    };
}
// Calculate Button

document.getElementById("calculateEMI").addEventListener("click", function () {
    const loanType =
        document.getElementById("loanType").value;
    const principal =
        Number(document.getElementById("loanAmount").value);
    const rate =
        Number(document.getElementById("interestRate").value);
    const years =
        Number(document.getElementById("loanTenure").value);
    if (
        principal <= 0 ||
        rate < 0 ||
        years <= 0
    ) {
        alert("Please enter valid values.");
        return;
    }
    const result =
        calculateEMI(principal, rate, years);
    const schedule =
        generateSchedule(
            principal,
            rate,
            years,
            result.emi
        );
    document.getElementById("emiResult").innerHTML = `
<h3>Loan Summary</h3>
<table border="1" cellpadding="8">
<tr>
<td><strong>Loan Type</strong></td>
<td>${loanType}</td>
</tr>
<tr>
<td><strong>Loan Amount</strong></td>
<td>₹${principal.toLocaleString("en-IN")}</td>
</tr>
<tr>
<td><strong>Interest Rate</strong></td>
<td>${rate}%</td>
</tr>
<tr>
<td><strong>Loan Tenure</strong></td>
<td>${years} Years (${years * 12} Months)</td>
</tr>
<tr>
<td><strong>Monthly EMI</strong></td>
<td>
₹${result.emi.toLocaleString("en-IN", {
    maximumFractionDigits: 2
})}
</td>
</tr>
<tr>
<td><strong>Total Interest</strong></td>
<td>
₹${result.totalInterest.toLocaleString("en-IN", {
    maximumFractionDigits: 2
})}
</td>
</tr>
<tr>
<td><strong>Total Payment</strong></td>
<td>
₹${result.totalPayment.toLocaleString("en-IN", {
    maximumFractionDigits: 2
})}
</td>
</tr>
</table>

<br>
<h3>EMI Amortization Schedule</h3>
<div style="
max-height:450px;
overflow:auto;
border:1px solid #ddd;
">
<table
border="1"
cellpadding="8"
style="
width:100%;
border-collapse:collapse;
">
<thead
style="
position:sticky;
top:0;
background:#1976d2;
color:white;
">
<tr>
<th>${schedule.heading}</th>
<th>EMI Paid</th>
<th>Principal Paid</th>
<th>Interest Paid</th>
<th>Outstanding Balance</th>
</tr>
</thead>
<tbody>
${schedule.rows}
</tbody>
</table>
</div>
`;
});
// Automatically regenerate schedule
// when user changes Monthly / 6 Months / Yearly

document.getElementById("scheduleType").addEventListener("change", () => {
    if (document.getElementById("loanAmount").value !== "") {
        document.getElementById("calculateEMI").click();
    }
});
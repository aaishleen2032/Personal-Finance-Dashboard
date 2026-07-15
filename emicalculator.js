// EMI CALCULATOR

document.getElementById("calculateEMI").addEventListener("click", async function () {
    const loanType = document.getElementById("loanType").value;
    const principal = Number(document.getElementById("loanAmount").value);
    const annualRate = Number(document.getElementById("interestRate").value);
    const years = Number(document.getElementById("loanTenure").value);
    const scheduleType = Number(document.getElementById("scheduleType").value);
    if (principal <= 0 || annualRate < 0 || years <= 0) {
        document.getElementById("emiResult").innerHTML = `
        <div class="alert alert-error mt-2">
            Please enter valid values.
        </div>
        `;
        return;
    }
    try {
        const response = await fetch("http://127.0.0.1:8000/calculate-emi", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                principal: principal,
                annualRate: annualRate,
                years: years,
                scheduleType: scheduleType
            })
        });
        if (!response.ok) {
            throw new Error("Server Error");
        }
        const result = await response.json();
        let heading = "Month";
        if (scheduleType === 6)
            heading = "Period";
        if (scheduleType === 12)
            heading = "Year";
        let rows = "";
        result.schedule.forEach((item, index) => {
            const rowClass =
                index % 2 === 0
                    ? "bg-base-100"
                    : "bg-base-200";
            rows += `
<tr class="${rowClass} hover">
<td class="font-medium">${item.label}</td>
<td>
₹${item.emiPaid.toLocaleString("en-IN",{maximumFractionDigits:2})}
</td>
<td class="text-success">
₹${item.principal.toLocaleString("en-IN",{maximumFractionDigits:2})}
</td>
<td class="text-warning">
₹${item.interest.toLocaleString("en-IN",{maximumFractionDigits:2})}
</td>
<td class="text-error">
₹${item.balance.toLocaleString("en-IN",{maximumFractionDigits:2})}
</td>
</tr>
`;
        });
        const summaryCards = `
<div class="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
<div class="stat bg-primary text-primary-content rounded-xl p-4">
<div class="stat-title text-primary-content/70 text-xs">
Monthly EMI
</div>
<div class="stat-value text-xl">
₹${Math.round(result.emi).toLocaleString("en-IN")}
</div>
</div>
<div class="stat bg-warning text-warning-content rounded-xl p-4">
<div class="stat-title text-warning-content/70 text-xs">
Total Interest
</div>
<div class="stat-value text-xl">
₹${Math.round(result.totalInterest).toLocaleString("en-IN")}
</div>
</div>
<div class="stat bg-base-200 rounded-xl p-4">
<div class="stat-title text-xs">
Total Payment
</div>
<div class="stat-value text-xl">
₹${Math.round(result.totalPayment).toLocaleString("en-IN")}
</div>
</div>
</div>
`;
        const summaryTable = `
<div class="overflow-x-auto mb-6">
<table class="table table-zebra">
<tbody>
<tr>
<th>Loan Type</th>
<td>${loanType}</td>
</tr>
<tr>
<th>Loan Amount</th>
<td>₹${principal.toLocaleString("en-IN")}</td>
</tr>
<tr>
<th>Interest Rate</th>
<td>${annualRate}%</td>
</tr>
<tr>
<th>Loan Tenure</th>
<td>${years} Years</td>
</tr>
<tr>
<th>Monthly EMI</th>
<td>
₹${result.emi.toLocaleString("en-IN",{maximumFractionDigits:2})}
</td>
</tr>
<tr>
<th>Total Interest</th>
<td>
₹${result.totalInterest.toLocaleString("en-IN",{maximumFractionDigits:2})}
</td>
</tr>
<tr>
<th>Total Payment</th>
<td>
₹${result.totalPayment.toLocaleString("en-IN",{maximumFractionDigits:2})}
</td>
</tr>
</tbody>
</table>
</div>
`;
        const scheduleTable = `
<h3 class="font-semibold text-lg mb-3">
Amortization Schedule
</h3>
<div class="overflow-x-auto rounded-xl border border-base-300">
<table class="table table-sm">
<thead>
<tr>
<th>${heading}</th>
<th>EMI Paid</th>
<th>Principal</th>
<th>Interest</th>
<th>Balance</th>
</tr>
</thead>
<tbody>
${rows}
</tbody>
</table>
</div>
`;
        document.getElementById("emiResult").innerHTML =
            summaryCards +
            summaryTable +
            scheduleTable;
    } catch (error) {
        console.error(error);
        document.getElementById("emiResult").innerHTML = `
        <div class="alert alert-error mt-2">
            Unable to connect to FastAPI backend.
        </div>
        `;
    }
});

// Regenerate schedule when user changes the view type
document.getElementById("scheduleType").addEventListener("change", function () {
    if (document.getElementById("loanAmount").value !== "") {
        document.getElementById("calculateEMI").click();
    }
});
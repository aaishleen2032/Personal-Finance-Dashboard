const STANDARD_DEDUCTION = 75000;

document.getElementById("calculateTax").addEventListener("click", async function () {
    let salary = Number(document.getElementById("salary").value);
    let otherIncome = Number(document.getElementById("otherIncome").value) || 0;
    let deduction80C = Number(document.getElementById("deduction80C").value) || 0;
    let deduction80D = Number(document.getElementById("deduction80D").value) || 0;
    let nps = Number(document.getElementById("nps").value) || 0;
    if (salary <= 0) {
        alert("Please enter a valid salary.");
        return;
    }
    try {
        const response = await fetch("http://127.0.0.1:8000/calculate-tax", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                salary: salary,
                otherIncome: otherIncome,
                deduction80C: deduction80C,
                deduction80D: deduction80D,
                nps: nps
            })
        });
        if (!response.ok) {
            throw new Error("Server Error");
        }
        const tax = await response.json();
        document.getElementById("taxResult").innerHTML = `
<div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
<div class="stat bg-primary text-primary-content rounded-xl">
<div class="stat-title">Gross Income</div>
<div class="stat-value text-xl">
₹${tax.grossIncome.toLocaleString("en-IN")}
</div>
</div>

<div class="stat bg-success text-success-content rounded-xl">
<div class="stat-title">Taxable Income</div>
<div class="stat-value text-xl">
₹${tax.taxableIncome.toLocaleString("en-IN")}
</div>
</div>

<div class="stat bg-warning text-warning-content rounded-xl">
<div class="stat-title">Old Tax</div>
<div class="stat-value text-xl">
₹${tax.oldTax.toFixed(0)}
</div>
</div>

<div class="stat bg-error text-error-content rounded-xl">
<div class="stat-title">New Tax</div>
<div class="stat-value text-xl">
₹${tax.newTax.toFixed(0)}
</div>
</div>

</div>

<div class="overflow-x-auto">

<table class="table table-zebra">

<tbody>

<tr>
<th>Annual Salary</th>
<td>₹${salary.toLocaleString("en-IN")}</td>
</tr>

<tr>
<th>Other Income</th>
<td>₹${otherIncome.toLocaleString("en-IN")}</td>
</tr>

<tr>
<th>80C Deduction</th>
<td>₹${deduction80C.toLocaleString("en-IN")}</td>
</tr>

<tr>
<th>80D Deduction</th>
<td>₹${deduction80D.toLocaleString("en-IN")}</td>
</tr>

<tr>
<th>NPS</th>
<td>₹${nps.toLocaleString("en-IN")}</td>
</tr>

<tr>
<th>Total Deduction</th>
<td>₹${tax.totalDeduction.toLocaleString("en-IN")}</td>
</tr>

<tr>
<th>Old Regime Tax</th>
<td class="text-warning font-bold">
₹${tax.oldTax.toFixed(0)}
</td>
</tr>

<tr>
<th>New Regime Tax</th>
<td class="text-error font-bold">
₹${tax.newTax.toFixed(0)}
</td>
</tr>

<tr>
<th>Recommended</th>
<td class="text-success font-bold">
${tax.recommended}
</td>
</tr>

<tr>
<th>You Save</th>
<td class="font-bold">
₹${tax.saving.toFixed(0)}
</td>
</tr>
</tbody>
</table>
</div>
`;
    } catch (error) {
        console.error(error);
        document.getElementById("taxResult").innerHTML = `
        <p class="text-red-500 font-bold">
            Unable to connect to FastAPI backend.
        </p>
        `;
    }
});
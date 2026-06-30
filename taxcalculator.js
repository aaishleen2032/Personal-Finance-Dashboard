// TAX CALCULATOR
const STANDARD_DEDUCTION = 75000;
// NEW REGIME TAX
function calculateNewRegimeTax(income) {

    let tax = 0;
    if (income <= 400000)
        tax = 0;
    else if (income <= 800000)
        tax = (income - 400000) * 0.05;
    else if (income <= 1200000)
        tax = 20000 + (income - 800000) * 0.10;
    else if (income <= 1600000)
        tax = 60000 + (income - 1200000) * 0.15;
    else if (income <= 2000000)
        tax = 120000 + (income - 1600000) * 0.20;
    else if (income <= 2400000)
        tax = 200000 + (income - 2000000) * 0.25;
    else
        tax = 300000 + (income - 2400000) * 0.30;
    return tax * 1.04;
}

// OLD REGIME TAX
function calculateOldRegimeTax(income, deduction) {
    let taxableIncome = Math.max(income - deduction, 0);
    let tax = 0;
    if (taxableIncome <= 250000)
        tax = 0;
    else if (taxableIncome <= 500000)
        tax = (taxableIncome - 250000) * 0.05;
    else if (taxableIncome <= 1000000)
        tax = 12500 + (taxableIncome - 500000) * 0.20;
    else
        tax = 112500 + (taxableIncome - 1000000) * 0.30;
    return tax * 1}
// BUTTON
document.getElementById("calculateTax").addEventListener("click", function () {
    let salary = Number(document.getElementById("salary").value);
    let otherIncome = Number(document.getElementById("otherIncome").value) || 0;
    let deduction80C = Number(document.getElementById("deduction80C").value) || 0;
    let deduction80D = Number(document.getElementById("deduction80D").value) || 0;
    let nps = Number(document.getElementById("nps").value) || 0;
    if (salary <= 0) {
        alert("Please enter a valid salary.");
        return;
    }
    let grossIncome = salary + otherIncome;
    let totalDeduction = STANDARD_DEDUCTION +
                         deduction80C +
                         deduction80D +
                         nps;
    let taxableOld = Math.max(grossIncome - totalDeduction, 0);
    let taxableNew = Math.max(grossIncome - STANDARD_DEDUCTION, 0);
    let oldTax = calculateOldRegimeTax(grossIncome, totalDeduction);
    let newTax = calculateNewRegimeTax(taxableNew);
    let betterRegime =
        oldTax < newTax ? "Old Regime" : "New Regime";
    let saving = Math.abs(oldTax - newTax);
    document.getElementById("taxResult").innerHTML = `
<div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
<div class="stat bg-primary text-primary-content rounded-xl">
<div class="stat-title text-primary-content">
Gross Income
</div>
<div class="stat-value text-xl">
₹${grossIncome.toLocaleString("en-IN")}
</div>
</div>
<div class="stat bg-success text-success-content rounded-xl">
<div class="stat-title">
Taxable Income
</div>
<div class="stat-value text-xl">
₹${taxableOld.toLocaleString("en-IN")}
</div>
</div>
<div class="stat bg-warning text-warning-content rounded-xl">
<div class="stat-title">
Old Tax
</div>
<div class="stat-value text-xl">
₹${oldTax.toFixed(0)}
</div>
</div>
<div class="stat bg-error text-error-content rounded-xl">
<div class="stat-title">
New Tax
</div>
<div class="stat-value text-xl">
₹${newTax.toFixed(0)}
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
<td>₹${totalDeduction.toLocaleString("en-IN")}</td>
</tr>
<tr>
<th>Old Regime Tax</th>
<td class="text-warning font-bold">
₹${oldTax.toFixed(0)}
</td>
</tr>
<tr>
<th>New Regime Tax</th>
<td class="text-error font-bold">
₹${newTax.toFixed(0)}
</td>
</tr>
<tr>
<th>Recommended</th>
<td class="text-success font-bold">
${betterRegime}
</td>
</tr>
<tr>
<th>You Save</th>
<td class="font-bold">
₹${saving.toFixed(0)}
</td>
</tr>
</tbody>
</table>
</div>
`;
});
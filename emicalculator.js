//EMI CALCULATOR

function calculateEMI(principal, annualRate, years) {
    const months = years * 12;
    const monthlyRate = annualRate / (12 * 100);
    let emi;
    if (monthlyRate === 0) {
        emi = principal / months;
    } else {
        emi =
            (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
            (Math.pow(1 + monthlyRate, months) - 1);
    }
    return {
        emi,
        totalPayment: emi * months,
        totalInterest: emi * months - principal,
    };
}

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
    if (step === 6)  heading = "Period";
    if (step === 12) heading = "Year";

    for (let month = 1; month <= totalMonths; month++) {
        const interest      = balance * monthlyRate;
        const principalPaid = emi - interest;
        balance -= principalPaid;
        if (balance < 0) balance = 0;

        principalSum += principalPaid;
        interestSum  += interest;
        emiSum       += emi;

        if (month % step === 0 || month === totalMonths) {
            let label;
            if (step === 1)       label = month;
            else if (step === 6)  label = `Period ${Math.ceil(month / 6)}`;
            else                  label = `Year ${Math.ceil(month / 12)}`;

            // Alternate row shading via Tailwind
            const rowClass = (Math.ceil(month / step) % 2 === 0)
                ? "bg-base-200"
                : "bg-base-100";

            rows += `
            <tr class="${rowClass} hover">
                <td class="font-medium">${label}</td>
                <td>₹${emiSum.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</td>
                <td class="text-success">₹${principalSum.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</td>
                <td class="text-warning">₹${interestSum.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</td>
                <td class="text-error">₹${balance.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</td>
            </tr>`;

            principalSum = 0;
            interestSum  = 0;
            emiSum       = 0;
        }
    }

    return { rows, heading };
}

//Calculate button 

document.getElementById("calculateEMI").addEventListener("click", function () {
    const loanType  = document.getElementById("loanType").value;
    const principal = Number(document.getElementById("loanAmount").value);
    const rate      = Number(document.getElementById("interestRate").value);
    const years     = Number(document.getElementById("loanTenure").value);

    if (principal <= 0 || rate < 0 || years <= 0) {
        document.getElementById("emiResult").innerHTML = `
            <div class="alert alert-error mt-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Please enter valid values for all fields.</span>
            </div>`;
        return;
    }

    const result   = calculateEMI(principal, rate, years);
    const schedule = generateSchedule(principal, rate, years, result.emi);

    // Loan summary stats
    const summaryCards = `
    <div class="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
        <div class="stat bg-primary text-primary-content rounded-xl p-4">
            <div class="stat-title text-primary-content/70 text-xs">Monthly EMI</div>
            <div class="stat-value text-xl">₹${Math.round(result.emi).toLocaleString("en-IN")}</div>
        </div>
        <div class="stat bg-warning text-warning-content rounded-xl p-4">
            <div class="stat-title text-warning-content/70 text-xs">Total Interest</div>
            <div class="stat-value text-xl">₹${Math.round(result.totalInterest).toLocaleString("en-IN")}</div>
        </div>
        <div class="stat bg-base-200 rounded-xl p-4 col-span-2 sm:col-span-1">
            <div class="stat-title text-xs">Total Payment</div>
            <div class="stat-value text-xl">₹${Math.round(result.totalPayment).toLocaleString("en-IN")}</div>
        </div>
    </div>`;

    //Summary table
    const summaryTable = `
    <div class="overflow-x-auto mb-6">
        <table class="table table-zebra w-full text-sm">
            <tbody>
                <tr><th class="w-1/2">Loan Type</th><td>${loanType}</td></tr>
                <tr><th>Loan Amount</th><td>₹${principal.toLocaleString("en-IN")}</td></tr>
                <tr><th>Interest Rate</th><td>${rate}% per annum</td></tr>
                <tr><th>Loan Tenure</th><td>${years} Years (${years * 12} Months)</td></tr>
                <tr><th>Monthly EMI</th><td class="font-bold text-primary">₹${result.emi.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</td></tr>
                <tr><th>Total Interest</th><td class="text-warning font-semibold">₹${result.totalInterest.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</td></tr>
                <tr><th>Total Payment</th><td class="font-semibold">₹${result.totalPayment.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</td></tr>
            </tbody>
        </table>
    </div>`;

    //Amortization schedule
    const scheduleTable = `
    <h3 class="font-semibold text-lg mb-3">Amortization Schedule</h3>
    <div class="overflow-x-auto rounded-xl border border-base-300">
        <div class="max-h-96 overflow-y-auto">
            <table class="table table-sm w-full">
                <thead class="sticky top-0 bg-primary text-primary-content z-10">
                    <tr>
                        <th>${schedule.heading}</th>
                        <th>EMI Paid</th>
                        <th>Principal</th>
                        <th>Interest</th>
                        <th>Balance</th>
                    </tr>
                </thead>
                <tbody>
                    ${schedule.rows}
                </tbody>
            </table>
        </div>
    </div>`;

    document.getElementById("emiResult").innerHTML =
        summaryCards + summaryTable + scheduleTable;
});

//Regenerate schedule on view-type change
document.getElementById("scheduleType").addEventListener("change", () => {
    if (document.getElementById("loanAmount").value !== "") {
        document.getElementById("calculateEMI").click();
    }
});
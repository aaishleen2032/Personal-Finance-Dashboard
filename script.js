//tax calculation
function calculatetax(taxableincome){
let tax = 0;

    if (taxableincome <= 400000) {
        tax = 0;
    }
    else if (taxableincome <= 800000) {
        tax = (taxableincome - 400000) * 0.05;
    }
    else if (taxableincome <= 1200000) {
        tax = 20000 + (taxableincome - 800000) * 0.10;
    }
    else if (taxableincome <= 1600000) {
        tax = 60000 + (taxableincome - 1200000) * 0.15;
    }
    else if (taxableincome <= 2000000) {
        tax = 120000 + (taxableincome - 1600000) * 0.20;
    }
    else if (taxableincome <= 2400000) {
        tax = 200000 + (taxableincome - 2000000) * 0.25;
    }
    else {
        tax = 300000 + (taxableincome - 2400000) * 0.30;
    } return tax*1.04;
}
//ctc calculator

function CalculateTakeHome(ctc) {
    let basic = ctc * 0.40;
    let employeePF = Math.min(basic * 0.12,21600);
    let employerPF = Math.min(basic * 0.12,21600);
    let grossSalary = ctc - employerPF;
    let taxableincome = (grossSalary - employeePF)-75000;
    let tax=calculatetax(Math.max(taxableincome,0));
    let annualsalary = grossSalary - employeePF - tax;
    let monthlyincome = annualsalary / 12;

    return {
        basic,
        employeePF,
        tax,
        grossSalary,
        annualsalary,
        monthlyincome
    };
}

document.getElementById("calculate").addEventListener("click", function () {

    let ctc = parseFloat(document.getElementById("ctc").value);
    if (isNaN(ctc) || ctc <= 0) {
    alert("Please enter a valid CTC.");
    return;
}
    let salary = CalculateTakeHome(ctc);

    document.getElementById("result").innerHTML = `
    <h3>Salary Breakdown</h3>

    <p><strong>CTC (Annual):</strong> ₹${ctc.toLocaleString('en-IN')}</p>

    <p><strong>Basic Salary (Annual):</strong> ₹${salary.basic.toLocaleString('en-IN')}</p>

    <p><strong>Gross Salary (Annual):</strong> ₹${salary.grossSalary.toLocaleString('en-IN')}</p>

    <p><strong>Employee PF (Annual):</strong> ₹${salary.employeePF.toLocaleString('en-IN')}</p>

    <p><strong>Income Tax (Annual):</strong> ₹${salary.tax.toFixed(0)}</p>

    <p><strong>Net Annual salary:</strong> ₹${salary.annualsalary.toLocaleString('en-IN')}</p>

    <p><strong>Monthly In-hand:</strong> ₹${salary.monthlyincome.toFixed(0)}</p>
`; });
// OFFER COMPARATOR
function calculateoffer(ctc,bonus){
    let salary=CalculateTakeHome(ctc);
    let annualTakeHome=salary.annualsalary+bonus;
    return{
        ctc,
        bonus,
        basic:salary.basic,
        employeePF:salary.employeePF,
        tax:salary.tax,
        annualTakeHome,
        monthlyincome:annualTakeHome/12
    };
}
document.getElementById("compare").addEventListener("click", function () {
    let ctc1 = parseFloat(document.getElementById("ctc1").value);
    let ctc2 = parseFloat(document.getElementById("ctc2").value);

    if (isNaN(ctc1) || ctc1 <= 0 || isNaN(ctc2) || ctc2 <= 0) {
        alert("Please enter valid CTC for both offers.");
        return;
    }

    let offerA = calculateoffer(
        parseFloat(document.getElementById("ctc1").value),
        parseFloat(document.getElementById("bonus1").value) || 0
    );

    let offerB = calculateoffer(
        parseFloat(document.getElementById("ctc2").value),
        parseFloat(document.getElementById("bonus2").value) || 0
    );
    let winner;
    if (offerA.annualTakeHome > offerB.annualTakeHome) {
        winner = "Offer A is better.";
    }
    else if (offerB.annualTakeHome > offerA.annualTakeHome) {
       winner = "Offer B is better.";
    }
    else {
        winner = "Both offers are equal.";
    }

    document.getElementById("compareResult").innerHTML = `
    <h3>Comparison Result</h3>
    <p><strong>Offer A Annual Take Home:</strong> ₹${offerA.annualTakeHome.toFixed(2)}</p>
    <p><strong>Offer B Annual Take Home:</strong> ₹${offerB.annualTakeHome.toFixed(2)}</p>
    <p><strong>${winner}</strong></p>
    `;
});
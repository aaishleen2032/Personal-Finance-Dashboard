document.getElementById("calculate").addEventListener("click", async function () {

    let ctc = parseFloat(document.getElementById("ctc").value);

    if (isNaN(ctc) || ctc <= 0) {
        alert("Please enter a valid CTC.");
        return;
    }

    try {

        const response = await fetch("http://127.0.0.1:8000/calculate-ctc", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ctc: ctc
            })
        });

        if (!response.ok) {
            throw new Error("Server Error");
        }

        const salary = await response.json();

        document.getElementById("result").innerHTML = `
            <h3 class="text-xl font-bold mb-3">Salary Breakdown</h3>

            <p><strong>CTC (Annual):</strong> ₹${ctc.toLocaleString('en-IN')}</p>

            <p><strong>Basic Salary:</strong> ₹${salary.basic.toLocaleString('en-IN')}</p>

            <p><strong>Gross Salary:</strong> ₹${salary.grossSalary.toLocaleString('en-IN')}</p>

            <p><strong>Employee PF:</strong> ₹${salary.employeePF.toLocaleString('en-IN')}</p>

            <p><strong>Income Tax:</strong> ₹${salary.tax.toFixed(0)}</p>

            <p><strong>Net Annual Salary:</strong> ₹${salary.annualSalary.toLocaleString('en-IN')}</p>

            <p><strong>Monthly In-hand:</strong> ₹${salary.monthlyIncome.toFixed(0)}</p>
        `;

    } catch (error) {

        console.error(error);

        document.getElementById("result").innerHTML = `
            <p class="text-red-500 font-bold">
                Unable to connect to FastAPI backend.
            </p>
        `;
    }

});
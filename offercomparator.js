// BENEFIT SCORE
function getBenefitScore(className) {
    let score = 0;
    document.querySelectorAll("." + className + ":checked").forEach(item => {
        score += Number(item.value);
    });
    return Math.min(score, 10);
}

// COMPARE BUTTON
document.getElementById("compare").addEventListener("click", async function () {
    let ctc1 = parseFloat(document.getElementById("ctc1").value);
    let ctc2 = parseFloat(document.getElementById("ctc2").value);
    if (isNaN(ctc1) || isNaN(ctc2)) {
        alert("Enter valid CTC values.");
        return;
    }

    const data = {
        offerA: {
            ctc: ctc1,
            joiningBonus: parseFloat(document.getElementById("bonus1").value) || 0,
            esops: parseFloat(document.getElementById("esop1").value) || 0,
            benefitScore: getBenefitScore("benefitA"),
            growth: parseInt(document.getElementById("growth1").value),
            companyRating: parseInt(document.getElementById("rating1").value),
            city: document.getElementById("city1").value
        },
        offerB: {
            ctc: ctc2,
            joiningBonus: parseFloat(document.getElementById("bonus2").value) || 0,
            esops: parseFloat(document.getElementById("esop2").value) || 0,
            benefitScore: getBenefitScore("benefitB"),
            growth: parseInt(document.getElementById("growth2").value),
            companyRating: parseInt(document.getElementById("rating2").value),
            city: document.getElementById("city2").value
        }
    };
    try {
        const response = await fetch("http://127.0.0.1:8000/compare-offers", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error("Server Error");
        }
        const result = await response.json();
        const offerA = result.offerA;
        const offerB = result.offerB;
        document.getElementById("compareResult").innerHTML = `
<h2 class="text-2xl font-bold mb-4">
Offer Comparison
</h2>
<div class="overflow-x-auto">
<table class="table table-zebra w-full">
<thead>
<tr>
<th>Factor</th>
<th>Offer A</th>
<th>Offer B</th>
</tr>
</thead>
<tbody>
<tr>
<td>Annual Take Home</td>
<td>₹${offerA.annualTakeHome.toLocaleString("en-IN")}</td>
<td>₹${offerB.annualTakeHome.toLocaleString("en-IN")}</td>
</tr>
<tr>
<td>Monthly In-Hand</td>
<td>₹${offerA.monthlyIncome.toFixed(0)}</td>
<td>₹${offerB.monthlyIncome.toFixed(0)}</td>
</tr>
<tr>
<td>Joining Bonus</td>
<td>₹${offerA.bonus.toLocaleString("en-IN")}</td>
<td>₹${offerB.bonus.toLocaleString("en-IN")}</td>
</tr>
<tr>
<td>ESOP</td>
<td>₹${offerA.esop.toLocaleString("en-IN")}</td>
<td>₹${offerB.esop.toLocaleString("en-IN")}</td>
</tr>
<tr>
<td>Benefits</td>
<td>${offerA.benefits}/10</td>
<td>${offerB.benefits}/10</td>
</tr>
<tr>
<td>Growth</td>
<td>${offerA.growth}/10</td>
<td>${offerB.growth}/10</td>
</tr>
<tr>
<td>Company Rating</td>
<td>${offerA.companyRating}/5</td>
<td>${offerB.companyRating}/5</td>
</tr>
<tr>
<td>Location</td>
<td>${offerA.city}</td>
<td>${offerB.city}</td>
</tr>
<tr>
<td>City Score</td>
<td>${offerA.cityScore}/10</td>
<td>${offerB.cityScore}/10</td>
</tr>
<tr class="font-bold">
<td>Overall Score</td>
<td>${result.scoreA}/100</td>
<td>${result.scoreB}/100</td>
</tr>
</tbody>
</table>
</div>
<div class="alert alert-success mt-6">
<h3 class="font-bold text-lg">
${result.winner}
</h3>
</div>
`;
    }
    catch (error) {
        console.error(error);
        document.getElementById("compareResult").innerHTML = `
<div class="alert alert-error">
Unable to connect to FastAPI backend.
</div>
`;
    }
});
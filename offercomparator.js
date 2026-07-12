// BENEFIT SCORE
function getBenefitScore(className) {
    let score = 0;
    document.querySelectorAll("." + className + ":checked").forEach(item => {
        score += Number(item.value);
    });
    return Math.min(score, 10);
}

// CITY SCORE 
const cityScores = {
    "Remote": 10,
    "Hyderabad": 9,
    "Pune": 8,
    "Delhi": 7,
    "Noida": 7,
    "Chennai": 7,
    "Bangalore": 6,
    "Mumbai": 5
};

//OFFER
function calculateOffer(ctc, bonus, esop, benefits, growth, companyRating, city) {
     const salary = CalculateTakeHome(ctc);
    const annualTakeHome = salary.annualsalary + bonus;
    return {
       ctc,
        bonus,
        esop,
        benefits,
        growth,
        companyRating,
        city,
        cityScore: cityScores[city],
        annualTakeHome,
        monthlyincome: annualTakeHome / 12,
        basic: salary.basic,
        employeePF: salary.employeePF,
        tax: salary.tax
    };
}

// COMPARISON 
function compareOffers(a, b) {
    let scoreA = 0;
    let scoreB = 0;
    if (a.annualTakeHome > b.annualTakeHome)
        scoreA += 35;
    else if (b.annualTakeHome > a.annualTakeHome)
        scoreB += 35;
    if (a.bonus > b.bonus)
        scoreA += 10;
    else if (b.bonus > a.bonus)
        scoreB += 10;
    if (a.esop > b.esop)
        scoreA += 15;
    else if (b.esop > a.esop)
        scoreB += 15;
    if (a.benefits > b.benefits)
        scoreA += 10;
    else if (b.benefits > a.benefits)
        scoreB += 10;
    if (a.growth > b.growth)
        scoreA += 15;
    else if (b.growth > a.growth)
        scoreB += 15;
    if (a.companyRating > b.companyRating)
        scoreA += 10;
    else if (b.companyRating > a.companyRating)
        scoreB += 10;
    if (a.cityScore > b.cityScore)
        scoreA += 5;
    else if (b.cityScore > a.cityScore)
        scoreB += 5;
    return {
        scoreA,
        scoreB
    };
}

// BUTTON 
document.getElementById("compare").addEventListener("click", function () {
    let ctc1 = parseFloat(document.getElementById("ctc1").value);
    let ctc2 = parseFloat(document.getElementById("ctc2").value);
    if (isNaN(ctc1) || isNaN(ctc2)) {
        alert("Enter valid CTC values.");
        return;
    }
    const offerA = calculateOffer(
        ctc1,
        parseFloat(document.getElementById("bonus1").value) || 0,
        parseFloat(document.getElementById("esop1").value) || 0,
        getBenefitScore("benefitA"),
        parseInt(document.getElementById("growth1").value),
        parseInt(document.getElementById("rating1").value),
        document.getElementById("city1").value
    );
    const offerB = calculateOffer(
        ctc2,
        parseFloat(document.getElementById("bonus2").value) || 0,
        parseFloat(document.getElementById("esop2").value) || 0,
        getBenefitScore("benefitB"),
        parseInt(document.getElementById("growth2").value),
        parseInt(document.getElementById("rating2").value),
        document.getElementById("city2").value
    );
    const result = compareOffers(offerA, offerB);
    let winner = "";
    if (result.scoreA > result.scoreB)
        winner = "Offer A is Better";
    else if (result.scoreB > result.scoreA)
        winner = " Offer B is Better";
    else
        winner = " Both Offers are Equal";
    document.getElementById("compareResult").innerHTML = `
    <h2>Offer Comparison</h2>
    <table border="1" cellpadding="8">
    <tr>
    <th>Factor</th>
    <th>Offer A</th>
    <th>Offer B</th>
    </tr>
    <tr>
    <td>Annual Take Home</td>
    <td>₹${offerA.annualTakeHome.toLocaleString()}</td>
    <td>₹${offerB.annualTakeHome.toLocaleString()}</td>
    </tr>
    <tr>
    <td>Monthly In-Hand</td>
    <td>₹${offerA.monthlyincome.toFixed()}</td>
    <td>₹${offerB.monthlyincome.toFixed()}</td>
    </tr>
    <tr>
    <td>Joining Bonus</td>
    <td>₹${offerA.bonus.toLocaleString()}</td>
    <td>₹${offerB.bonus.toLocaleString()}</td>
    </tr>
    <tr>
    <td>ESOP</td>
    <td>₹${offerA.esop.toLocaleString()}</td>
    <td>₹${offerB.esop.toLocaleString()}</td>
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
    <td>Cost of Living Score</td>
    <td>${offerA.cityScore}/10</td>
    <td>${offerB.cityScore}/10</td>
    </tr>

    <tr>
    <th>Overall Score</th>
    <th>${result.scoreA}/100</th>
    <th>${result.scoreB}/100</th>
    </tr>

    </table>

    <h2>${winner}</h2>

    `;
});
import React from "react";
function formatCurrency(value) {
    return Number(value).toLocaleString("en-IN", {
        maximumFractionDigits: 0
    });
}

function OfferResult({ result }) {
    if (!result) {
        return null;
    }
    const offerA = result.offerA;
    const offerB = result.offerB;
    return (
        <div className="offer-result">
            <h2>Offer Comparison</h2>
            <div className="comparison-table">
                <div className="comparison-row header">
                    <strong>Factor</strong>
                    <strong>Offer A</strong>
                    <strong>Offer B</strong>
                </div>
                <div className="comparison-row">
                    <span>Annual Take Home</span>
                    <span>₹{formatCurrency(offerA.annualTakeHome)}</span>
                    <span>₹{formatCurrency(offerB.annualTakeHome)}</span>
                </div>
                <div className="comparison-row">
                    <span>Monthly In-Hand</span>
                    <span>₹{formatCurrency(offerA.monthlyIncome)}</span>
                    <span>₹{formatCurrency(offerB.monthlyIncome)}</span>
                </div>
                <div className="comparison-row">
                    <span>Joining Bonus</span>
                    <span>₹{formatCurrency(offerA.bonus)}</span>
                    <span>₹{formatCurrency(offerB.bonus)}</span>
                </div>
                <div className="comparison-row">
                    <span>ESOP</span>
                    <span>₹{formatCurrency(offerA.esop)}</span>
                    <span>₹{formatCurrency(offerB.esop)}</span>
                </div>
                <div className="comparison-row">
                    <span>Benefits</span>
                    <span>{offerA.benefits}/10</span>
                    <span>{offerB.benefits}/10</span>
                </div>
                <div className="comparison-row">
                    <span>Growth</span>
                    <span>{offerA.growth}/10</span>
                    <span>{offerB.growth}/10</span>
                </div>
                <div className="comparison-row">
                    <span>Company Rating</span>
                    <span>{offerA.companyRating}/5</span>
                    <span>{offerB.companyRating}/5</span>
                </div>
                <div className="comparison-row">
                    <span>Location</span>
                    <span>{offerA.city}</span>
                    <span>{offerB.city}</span>
                </div>
                <div className="comparison-row">
                    <span>City Score</span>
                    <span>{offerA.cityScore}/10</span>
                    <span>{offerB.cityScore}/10</span>
                </div>
                <div className="comparison-row overall-score">
                    <strong>Overall Score</strong>
                    <strong>{result.scoreA}/100</strong>
                    <strong>{result.scoreB}/100</strong>
                </div>
            </div>
            <div className="winner">
                <h3>{result.winner}</h3>
            </div>
        </div>
    );
}
export default OfferResult;
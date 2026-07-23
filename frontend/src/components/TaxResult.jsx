import React from "react";
function formatCurrency(value) {
    return Number(value).toLocaleString("en-IN", {
        maximumFractionDigits: 0
    });
}
function TaxResult({ tax, formData }) {
    if (!tax) {
        return null;
    }
    return (
        <div className="tax-result">
            <div className="tax-stats">
                <div className="tax-card">
                    <h4>Gross Income</h4>
                    <p>₹{formatCurrency(tax.grossIncome)}</p>
                </div>
                <div className="tax-card">
                    <h4>Taxable Income</h4>
                    <p>₹{formatCurrency(tax.taxableIncome)}</p>
                </div>
                <div className="tax-card">
                    <h4>Old Tax</h4>
                    <p>₹{formatCurrency(tax.oldTax)}</p>
                </div>
                <div className="tax-card">
                    <h4>New Tax</h4>
                    <p>₹{formatCurrency(tax.newTax)}</p>
                </div>
            </div>
            <div className="tax-table">
                <div className="tax-row">
                    <strong>Annual Salary</strong>
                    <span>
                        ₹{formatCurrency(formData.salary)}
                    </span>
                </div>
                <div className="tax-row">
                    <strong>Other Income</strong>
                    <span>
                        ₹{formatCurrency(formData.otherIncome)}
                    </span>
                </div>
                <div className="tax-row">
                    <strong>80C Deduction</strong>
                    <span>
                        ₹{formatCurrency(formData.deduction80C)}
                    </span>
                </div>
                <div className="tax-row">
                    <strong>80D Deduction</strong>
                    <span>
                        ₹{formatCurrency(formData.deduction80D)}
                    </span>
                </div>
                <div className="tax-row">
                    <strong>NPS</strong>
                    <span>
                        ₹{formatCurrency(formData.nps)}
                    </span>
                </div>
                <div className="tax-row">
                    <strong>Total Deduction</strong>
                    <span>
                        ₹{formatCurrency(tax.totalDeduction)}
                    </span>
                </div>
                <div className="tax-row">
                    <strong>Old Regime Tax</strong>
                    <span>
                        ₹{formatCurrency(tax.oldTax)}
                    </span>
                </div>
                <div className="tax-row">
                    <strong>New Regime Tax</strong>
                    <span>
                        ₹{formatCurrency(tax.newTax)}
                    </span>
                </div>
                <div className="tax-row recommended">
                    <strong>Recommended</strong>
                    <span>
                        {tax.recommended}
                    </span>
                </div>
                <div className="tax-row saving">
                    <strong>You Save</strong>
                    <span>
                        ₹{formatCurrency(tax.saving)}
                    </span>
                </div>
            </div>
        </div>
    );
}
export default TaxResult;
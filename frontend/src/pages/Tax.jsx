import React, { useState } from "react";
import api from "../services/api";
import TaxForm from "../components/TaxForm";
import TaxResult from "../components/TaxResult";
import "../styles/Tax.css";
function Tax() {
    const [formData, setFormData] = useState({
        salary: "",
        otherIncome: 0,
        deduction80C: 0,
        deduction80D: 0,
        nps: 0
    });
    const [tax, setTax] = useState(null);
    const [error, setError] = useState("");
    const calculateTax = async () => {
        if (Number(formData.salary) <= 0) {
            setError("Please enter a valid salary.");
            return;
        }
        try {
            setError("");
            const response = await api.post("/calculate-tax", {
                salary: Number(formData.salary),
                otherIncome: Number(formData.otherIncome) || 0,
                deduction80C: Number(formData.deduction80C) || 0,
                deduction80D: Number(formData.deduction80D) || 0,
                nps: Number(formData.nps) || 0
            });
            console.log("Tax response:", response.data);
            setTax(response.data);
        } catch (error) {
            console.error("Tax Error:", error.response?.data || error.message);
            setError("Unable to connect to FastAPI backend.");
        }
    };
    return (
        <div className="tax-page">
            <h1>Income Tax Calculator</h1>
            <div className="tax-container">
                <TaxForm
                    formData={formData}
                    setFormData={setFormData}
                    onCalculate={calculateTax}
                />
                {error && (
                    <p className="tax-error">
                        {error}
                    </p>
                )}
                <TaxResult
                    tax={tax}
                    formData={formData}
                />
            </div>
        </div>
    );
}
export default Tax;
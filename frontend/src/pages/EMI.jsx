import { useState } from "react";
import api from "../services/api";

function EMI() {
    const [loanType, setLoanType] = useState("Home Loan");
    const [principal, setPrincipal] = useState("");
    const [annualRate, setAnnualRate] = useState("");
    const [years, setYears] = useState("");
    const [scheduleType, setScheduleType] = useState(1);

    const [result, setResult] = useState(null);
    const [error, setError] = useState("");

    const calculateEMI = async () => {
        if (
            Number(principal) <= 0 ||
            Number(annualRate) < 0 ||
            Number(years) <= 0
        ) {
            setError("Please enter valid values.");
            return;
        }

        try {
            setError("");

            const response = await api.post("/calculate-emi", {
                principal: Number(principal),
                annualRate: Number(annualRate),
                years: Number(years),
                scheduleType: Number(scheduleType),
            });

            setResult(response.data);
        } catch (error) {
            console.error(error);
            setError("Unable to connect to FastAPI backend.");
        }
    };

    return (
        <div>
            <h1>EMI Calculator</h1>

            <select
                value={loanType}
                onChange={(e) => setLoanType(e.target.value)}
            >
                <option>Home Loan</option>
                <option>Car Loan</option>
                <option>Personal Loan</option>
                <option>Education Loan</option>
            </select>

            <input
                type="number"
                placeholder="Loan Amount"
                value={principal}
                onChange={(e) => setPrincipal(e.target.value)}
            />

            <input
                type="number"
                placeholder="Interest Rate (%)"
                value={annualRate}
                onChange={(e) => setAnnualRate(e.target.value)}
            />

            <input
                type="number"
                placeholder="Loan Tenure (Years)"
                value={years}
                onChange={(e) => setYears(e.target.value)}
            />

            <select
                value={scheduleType}
                onChange={(e) => setScheduleType(Number(e.target.value))}
            >
                <option value={1}>Monthly</option>
                <option value={6}>6 Months</option>
                <option value={12}>Yearly</option>
            </select>

            <button onClick={calculateEMI}>
                Calculate EMI
            </button>

            {error && <p>{error}</p>}

            {result && (
                <div>
                    <p>Monthly EMI: ₹{result.emi}</p>
                    <p>Total Interest: ₹{result.totalInterest}</p>
                    <p>Total Payment: ₹{result.totalPayment}</p>
                </div>
            )}
        </div>
    );
}
export default EMI;
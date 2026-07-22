import { useState } from "react";
import api from "../services/api";
import "../styles/EMI.css";
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
        <div className="emi-page">
            <h1>EMI Calculator</h1>
            <div className="emi-form">
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
                    onChange={(e) =>
                        setScheduleType(Number(e.target.value))
                    }
                >
                    <option value={1}>Monthly</option>
                    <option value={6}>6 Months</option>
                    <option value={12}>Yearly</option>
                </select>
                <button onClick={calculateEMI}>
                    Calculate EMI
                </button>
            </div>
            {error && (
                <p className="emi-error">
                    {error}
                </p>
            )}
            {result && (
                <div className="emi-result">
                    {/* SUMMARY CARDS */}
                    <div className="emi-cards">
                        <div className="emi-card">
                            <h3>Monthly EMI</h3>
                            <p>
                                ₹{Math.round(result.emi).toLocaleString("en-IN")}
                            </p>
                        </div>
                        <div className="emi-card">
                            <h3>Total Interest</h3>
                            <p>
                                ₹{Math.round(result.totalInterest).toLocaleString("en-IN")}
                            </p>
                        </div>
                        <div className="emi-card">
                            <h3>Total Payment</h3>
                            <p>
                                ₹{Math.round(result.totalPayment).toLocaleString("en-IN")}
                            </p>
                        </div>
                    </div>
                    {/* LOAN SUMMARY */}
                    <div className="emi-summary">
                        <h2>Loan Summary</h2>
                        <p>
                            <strong>Loan Type:</strong> {loanType}
                        </p>
                        <p>
                            <strong>Loan Amount:</strong>{" "}
                            ₹{Number(principal).toLocaleString("en-IN")}
                        </p>
                        <p>
                            <strong>Interest Rate:</strong> {annualRate}%
                        </p>
                        <p>
                            <strong>Loan Tenure:</strong> {years} Years
                        </p>
                        <p>
                            <strong>Monthly EMI:</strong>{" "}
                            ₹{Number(result.emi).toLocaleString("en-IN", {
                                maximumFractionDigits: 2,
                            })}
                        </p>
                        <p>
                            <strong>Total Interest:</strong>{" "}
                            ₹{Number(result.totalInterest).toLocaleString("en-IN", {
                                maximumFractionDigits: 2,
                            })}
                        </p>
                        <p>
                            <strong>Total Payment:</strong>{" "}
                            ₹{Number(result.totalPayment).toLocaleString("en-IN", {
                                maximumFractionDigits: 2,
                            })}
                        </p>
                    </div>
                    {/* AMORTIZATION SCHEDULE */}
                    <div className="schedule-section">
                        <h2>Amortization Schedule</h2>
                        <div className="table-container">
                            <table>
                                <thead>
                                    <tr>
                                        <th>
                                            {scheduleType === 1
                                                ? "Month"
                                                : scheduleType === 6
                                                    ? "Period"
                                                    : "Year"}
                                        </th>
                                        <th>EMI Paid</th>
                                        <th>Principal</th>
                                        <th>Interest</th>
                                        <th>Balance</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {result.schedule.map((item, index) => (
                                        <tr key={index}>
                                            <td>
                                                {item.label}
                                            </td>
                                            <td>
                                                ₹{Number(item.emiPaid).toLocaleString(
                                                    "en-IN",
                                                    {
                                                        maximumFractionDigits: 2,
                                                    }
                                                )}
                                            </td>
                                            <td>
                                                ₹{Number(item.principal).toLocaleString(
                                                    "en-IN",
                                                    {
                                                        maximumFractionDigits: 2,
                                                    }
                                                )}
                                            </td>
                                            <td>
                                                ₹{Number(item.interest).toLocaleString(
                                                    "en-IN",
                                                    {
                                                        maximumFractionDigits: 2,
                                                    }
                                                )}
                                            </td>
                                            <td>
                                                ₹{Number(item.balance).toLocaleString(
                                                    "en-IN",
                                                    {
                                                        maximumFractionDigits: 2,
                                                    }
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
export default EMI;
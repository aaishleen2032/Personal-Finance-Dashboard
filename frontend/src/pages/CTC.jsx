import { useState } from "react";
import api from "../services/api";
import CTCForm from "../components/CTCForm";
import CTCResult from "../components/CTCResult";
import "../styles/CTC.css";
function CTC() {
    const [ctc, setCtc] = useState("");
    const [result, setResult] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const calculateCTC = async () => {
        const value = Number(ctc);
        if (!Number.isFinite(value) || value <= 0) {
            setError("Please enter a valid CTC.");
            setResult(null);
            return;
        }
        try {
            setLoading(true);
            setError("");
            setResult(null);
            const response = await api.post(
                "/calculate-ctc",
                {
                    ctc: value
                }
            );
            setResult(response.data);
        } catch (error) {
            console.error(
                "CTC calculation error:",
                error
            );
            setError(
                error.response?.data?.detail ||
                "Unable to connect to backend."
            );
        } finally {
            setLoading(false);
        }
    };
    return (
        <section className="ctc-page">
            <h1>CTC Calculator</h1>
            <CTCForm
                ctc={ctc}
                setCtc={setCtc}
                calculateCTC={calculateCTC}
                loading={loading}
            />
            {error && (
                <p className="ctc-error">
                    {error}
                </p>
            )}
            {result && (
                <CTCResult
                    result={result}
                />
            )}
        </section>
    );
}
export default CTC;
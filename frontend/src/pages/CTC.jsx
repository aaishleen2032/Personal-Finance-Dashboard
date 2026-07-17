import { useState } from "react";
import api from "../services/api";
import CTCForm from "../components/CTCForm";
import CTCResult from "../components/CTCResult";
function CTC() {
    const [ctc, setCtc] = useState("");
    const [result, setResult] = useState(null);
    const calculateCTC = async () => {
        try {
            const response = await api.post("/calculate-ctc", {
                ctc: Number(ctc),
            });
            setResult(response.data);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div style={{ padding: "40px" }}>
            <h1>CTC Calculator</h1>
            <CTCForm
                ctc={ctc}
                setCtc={setCtc}
                calculateCTC={calculateCTC}
            />
            <br />
            <CTCResult result={result} />
        </div>
    );
}
export default CTC;
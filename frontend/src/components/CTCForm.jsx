function CTCForm({ ctc, setCtc, calculateCTC }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        if (ctc === "" || Number(ctc) <= 0) {
            alert("Please enter a valid CTC.");
            return;
        }
        calculateCTC();
    };
    return (
        <form className="ctc-form" onSubmit={handleSubmit}>
            <input
                type="number"
                placeholder="Enter your annual CTC"
                value={ctc}
                onChange={(e) => setCtc(e.target.value)}
            />
            <button type="submit">
                Calculate
            </button>
        </form>
    );
}
export default CTCForm;
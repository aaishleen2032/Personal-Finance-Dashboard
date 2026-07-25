function CTCForm({
    ctc,
    setCtc,
    calculateCTC,
    loading
}) {
    const handleSubmit = (event) => {
        event.preventDefault();
        calculateCTC();

    };
    return (
        <form
            className="ctc-form"
            onSubmit={handleSubmit}
        >
            <label htmlFor="ctc">
                Annual CTC
            </label>
            <input
                id="ctc"
                type="number"
                min="1"
                step="any"
                placeholder="Enter annual CTC"
                value={ctc}
                onChange={(event) => {
                    setCtc(event.target.value);

                }}
            />
            <button
                type="submit"
                disabled={loading}
            >
                {loading
                    ? "Calculating..."
                    : "Calculate"
                }
            </button>
        </form>
    );
}
export default CTCForm;
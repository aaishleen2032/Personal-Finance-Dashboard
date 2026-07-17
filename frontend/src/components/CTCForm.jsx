function CTCForm({ ctc, setCtc, calculateCTC }) {
    return (
        <div>
            <input
                type="number"
                placeholder="Enter Annual CTC"
                value={ctc}
                onChange={(e) => setCtc(e.target.value)}
            />
            <br /><br />
            <button onClick={calculateCTC}>
                Calculate
            </button>

        </div>
    );
}
export default CTCForm;
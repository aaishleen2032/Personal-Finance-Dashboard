function TaxForm({ formData, setFormData, onCalculate }) {
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };

    return (
        <div className="tax-form">

            <h2>Tax Calculator</h2>

            <div className="form-group">
                <label>Annual Salary</label>
                <input
                    type="number"
                    name="salary"
                    placeholder="Enter annual salary"
                    value={formData.salary}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <label>Other Income</label>
                <input
                    type="number"
                    name="otherIncome"
                    placeholder="Enter other income"
                    value={formData.otherIncome}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <label>80C Deduction</label>
                <input
                    type="number"
                    name="deduction80C"
                    placeholder="Enter 80C deduction"
                    value={formData.deduction80C}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <label>80D Deduction</label>
                <input
                    type="number"
                    name="deduction80D"
                    placeholder="Enter 80D deduction"
                    value={formData.deduction80D}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <label>NPS Contribution</label>
                <input
                    type="number"
                    name="nps"
                    placeholder="Enter NPS contribution"
                    value={formData.nps}
                    onChange={handleChange}
                />
            </div>

            <button
                type="button"
                onClick={onCalculate}
            >
                Calculate Tax
            </button>

        </div>
    );
}
export default TaxForm;
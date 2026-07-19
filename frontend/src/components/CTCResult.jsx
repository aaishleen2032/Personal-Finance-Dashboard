function CTCResult({ result }) {
    if (!result) return null;

    const formatCurrency = (value) =>
        `₹${Number(value).toLocaleString("en-IN", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        })}`;

    return (
        <div className="ctc-result">
            <h2>Results</h2>

            <p>Basic Salary : {formatCurrency(result.basic)}</p>

            <p>Employee PF : {formatCurrency(result.employeePF)}</p>

            <p>Gross Salary : {formatCurrency(result.grossSalary)}</p>

            <p>Tax : {formatCurrency(result.tax)}</p>

            <p>Annual Salary : {formatCurrency(result.annualSalary)}</p>

            <p>Monthly Income : {formatCurrency(result.monthlyIncome)}</p>
        </div>
    );
}

export default CTCResult;
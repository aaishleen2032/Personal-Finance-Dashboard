import { Link } from "react-router-dom";
import "../styles/Home.css";

function Home() {
    return (
        <div className="home">
            <h1>Personal Finance Dashboard</h1>

            <p>
                Smart tools to help you make better financial decisions.
            </p>

            <div className="cards">

                <Link to="/ctc" className="feature-card">
                    <h2>CTC Calculator</h2>
                    <p>Calculate your salary breakdown and in-hand salary.</p>
                </Link>

                <Link to="/emi" className="feature-card">
                    <h2>EMI Calculator</h2>
                    <p>Calculate EMI and view your loan amortization schedule.</p>
                </Link>

                <div className="feature-card">
                    <h2>SIP Calculator</h2>
                    <p>Plan your investments and estimate future returns.</p>
                </div>

                <div className="feature-card">
                    <h2>Tax Calculator</h2>
                    <p>Compare your tax liability under different regimes.</p>
                </div>

                <div className="feature-card">
                    <h2>Offer Comparator</h2>
                    <p>Compare job offers based on salary, benefits and location.</p>
                </div>

                <div className="feature-card">
                    <h2>Retirement Planner</h2>
                    <p>Plan your savings and estimate your retirement corpus.</p>
                </div>

            </div>
        </div>
    );
}
export default Home;
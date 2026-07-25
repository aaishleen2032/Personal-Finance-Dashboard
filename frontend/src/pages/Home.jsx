import FeatureCard from "../components/FeatureCard";
import "../styles/Home.css";
const tools = [
    {
        title: "CTC Calculator",
        description:
            "Calculate your salary breakdown, deductions, tax, and estimated monthly income.",
        link: "/ctc",
    },
    {
        title: "EMI Calculator",
        description:
            "Calculate your monthly EMI and view a detailed loan repayment schedule.",
        link: "/emi",
    },
    {
        title: "Tax Calculator",
        description:
            "Estimate your income tax and compare different tax regime options.",
        link: "/tax",
    },
    {
        title: "Offer Comparator",
        description:
            "Compare two job offers based on salary, bonuses, benefits, and location.",
        link: "/offer",
    },
];
function Home() {
    return (
        <main className="home">
            {/* Hero Section */}
            <section className="hero">
                <div className="hero-content">
                    <h1>
                        Take Control of
                        <span> Your Finances</span>
                    </h1>
                    <p>
                        Make smarter financial decisions with powerful tools
                        designed to help you understand your income, loans,
                        taxes, and job offers.
                    </p>
                </div>
            </section>
            {/* Finance Tools Section */}
            <section className="tools-section">
                <div className="section-heading">
                    <h2>
                        Finance Tools
                    </h2>
                    <p>
                        Simple and powerful tools to help you make better
                        financial decisions.
                    </p>
                </div>
                <div className="cards">
                    {tools.map((tool) => (
                        <FeatureCard
                            key={tool.link}
                            title={tool.title}
                            description={tool.description}
                            link={tool.link}
                        />
                    ))}
                </div>
            </section>
            {/* Dashboard Preview Section */}
            <section className="dashboard-preview">
                <div className="preview-content">
                    <h2>
                        Your Personal Finance Dashboard
                    </h2>
                    <p>
                        Track your net worth, cash flow, investments, loans,
                        goals, and much more in one place.
                    </p>
                    <button>
                        Coming Soon
                    </button>
                </div>
            </section>
            {/* Features Section */}
            <section className="features-section">
                <div className="feature-item">
                    <h3>
                         Track Your Finances
                    </h3>
                    <p>
                        Get a clear overview of your financial health.
                    </p>
                </div>
                <div className="feature-item">
                    <h3>
                         Set Financial Goals
                    </h3>
                    <p>
                        Plan and track your progress towards your financial goals.
                    </p>
                </div>
                <div className="feature-item">
                    <h3>
                         Make Smarter Decisions
                    </h3>
                    <p>
                        Use data-driven insights to improve your financial future.
                    </p>
                </div>
            </section>
        </main>
    );
}
export default Home;
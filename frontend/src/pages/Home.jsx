import Navbar from "../components/Navbar";
import FeatureCard from "../components/FeatureCard";

import "../styles/Home.css";
import "../styles/Navbar.css";

function Home() {
    return (
        <>
            <Navbar />
            <div className="home">
                <h1>Personal Finance Dashboard</h1>
                <p>Manage your finances smarter.</p>
                <div className="cards">
                    <FeatureCard title="CTC Calculator" link="/ctc"/>
                    <FeatureCard title="EMI Calculator" />
                    <FeatureCard title="Tax Calculator" />
                    <FeatureCard title="Offer Comparator" />
                </div>
            </div>
        </>
    );
}

export default Home;
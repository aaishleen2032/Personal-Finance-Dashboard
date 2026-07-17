import { Link } from "react-router-dom";

function FeatureCard({ title, link }) {
    return (
        <Link to={link} className="feature-link">
            <div className="feature-card">
                <h2>{title}</h2>
            </div>
        </Link>
    );
}
export default FeatureCard;
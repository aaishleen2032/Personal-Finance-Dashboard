import { Link } from "react-router-dom";
function FeatureCard({ title, description, link }) {
    return (
        <Link
            to={link}
            className="feature-card"
        >
            <h2>
                {title}
            </h2>
            <p>
                {description}
            </p>
            <span className="card-link">
                Explore Tool →
            </span>
        </Link>
    );
}
export default FeatureCard;
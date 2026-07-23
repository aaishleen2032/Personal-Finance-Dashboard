import { Link } from "react-router-dom";
function Navbar() {
    return (
        <nav className="navbar">
            <Link to="/" className="logo">
                Finance Dashboard
            </Link>
            <div className="nav-links">
                <Link to="/ctc">
                    CTC Calculator
                </Link>
                <Link to="/emi">
                    EMI Calculator
                </Link>
                <Link to="/tax">
                    Tax Calculator
                </Link>
                <Link to="/login" className="login-btn">
                    Login
                </Link>
                <Link to="/signup" className="signup-btn">
                    Sign Up
                </Link>
            </div>
        </nav>
    );
}
export default Navbar;
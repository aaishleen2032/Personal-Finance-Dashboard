import { Link, NavLink } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
    return (
        <nav className="navbar">

            <Link to="/" className="logo">
                Finance Dashboard
            </Link>


            <div className="nav-links">

                <NavLink to="/ctc">
                    CTC Calculator
                </NavLink>

                <NavLink to="/emi">
                    EMI Calculator
                </NavLink>

                <NavLink to="/tax">
                    Tax Calculator
                </NavLink>

                <NavLink to="/offer">
                    Offer Comparator
                </NavLink>

                <Link
                    to="/login"
                    className="login-btn"
                >
                    Login
                </Link>

                <Link
                    to="/signup"
                    className="signup-btn"
                >
                    Sign Up
                </Link>

            </div>

        </nav>
    );
}

export default Navbar;
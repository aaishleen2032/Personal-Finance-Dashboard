function Navbar() {
    return (
        <nav className="navbar">
            <div className="logo">
                Finance Dashboard
            </div>
            <div className="nav-links">
                <button className="login-btn">Login</button>
                <button className="signup-btn">Sign Up</button>
            </div>
        </nav>
    );
}

export default Navbar;
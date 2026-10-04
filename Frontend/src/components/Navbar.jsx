import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">

        <Link to="/" className="navbar-logo">
          Publishly
        </Link>

        <div className="navbar-links">
          <Link to="/">Home</Link>
          <Link to="/feed">Explore</Link>

          {user ? (
            <>
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/stats">Stats</Link>

              <button
                className="btn btn-secondary"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
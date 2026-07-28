import { Link, NavLink } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function NavBar() {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar navbar-expand navbar-light bg-white border-bottom mb-4">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Weather App
        </Link>

        <ul className="navbar-nav me-auto">
          {user && (
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Cities
              </NavLink>
            </li>
          )}
        </ul>

        <ul className="navbar-nav">
          {user ? (
            <>
              <li className="nav-item">
                <NavLink className="nav-link" to="/login">
                  Log out
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <NavLink className="nav-link" to="/login">
                  Log in
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/signup">
                  Sign up
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

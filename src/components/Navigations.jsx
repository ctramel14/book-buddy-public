import { Link } from "react-router-dom";

export default function Navigations({ token }) {
  
  return (
    <nav className="navbar" style={{ display: "flex", gap: "8px" }}>
      {token ? (
        <div>
          <Link to="/">Books</Link>
          <Link to="/users/login">Login</Link>
          <Link to="/account">Account</Link>
        </div>
      ) : (
        <div>
          <Link to="/">Books</Link>
          <Link to="/users/login">Login</Link>
          <Link to="/users/register">Register</Link>
        </div>
      )}
    </nav>
  );
}

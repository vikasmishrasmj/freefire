import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice.js";
import "../styles/Navbar.css";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/dashboard">⚡ GameHub</Link>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/dashboard">Home</Link>
        </li>
        <li>
          <Link to="/dashboard/tournaments">Tournaments</Link>
        </li>
        <li>
          <Link to="/dashboard/matches">Matches</Link>
        </li>
        <li>
          <Link to="/dashboard/leaderboard">Leaderboard</Link>
        </li>
        <li>
          <Link to="/dashboard/profile">Profile</Link>
        </li>
      </ul>
      <div className="navbar-user">
        {user ? (
          <>
            <span className="navbar-username">Hi, {user.username}</span>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="login-btn">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

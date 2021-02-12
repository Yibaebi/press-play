import React from "react";
import { NavLink } from "react-router-dom";
import { whiteLogo } from "../../assets";

function LandingNavbar({ user }) {
  return (
    <nav className="landing-navbar">
      <NavLink to="/">{whiteLogo()}</NavLink>
      <div className="links-container">
        <NavLink to="/dashboard/discover" className="landing-page browse-link">
          Browse Podcasts
        </NavLink>
        {user ? (
          <NavLink className="landing-page login-link" to="/logout">
            Logout
          </NavLink>
        ) : (
          <React.Fragment>
            <NavLink className="landing-page login-link" to="/login">
              Login
            </NavLink>
            <NavLink to="/signup" className="landing-page signup-link">
              Sign up
            </NavLink>
          </React.Fragment>
        )}
      </div>
    </nav>
  );
}

export { LandingNavbar };

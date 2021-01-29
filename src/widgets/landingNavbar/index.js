import React from "react";
import { NavLink, Route } from "react-router-dom";
import { whiteLogo } from "../../assets";

function LandingNavbar() {
  return (
    <nav className="landing-navbar">
      <NavLink to="/">{whiteLogo()}</NavLink>
      <div className="links-container">
        <NavLink to="/home" className="landing-page browse-link">
          Browse Podcasts
        </NavLink>
        <NavLink className="landing-page login-link" to="/login">
          Login
        </NavLink>
        <NavLink to="/signup" className="landing-page signup-link">
          Get started
        </NavLink>
      </div>
    </nav>
  );
}

export { LandingNavbar };

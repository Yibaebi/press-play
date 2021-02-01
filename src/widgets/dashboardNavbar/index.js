import React from "react";
import { hamburgerUnclicked, primaryLogo, searchIcon } from "../../assets";
import profileImage from "../../assets/images/05D10002-48EC-4D1E-BA3F-8957EC3D2651L0001.jpeg";
import { Link } from "react-router-dom";
import "./dashboardNavbar.css";

function DashboardNavBar({ handleModalOpen, user }) {
  return (
    <React.Fragment>
      <div className="logo-container">
        <img
          onClick={handleModalOpen}
          src={hamburgerUnclicked}
          alt="pressplay logo"
        />

        <Link to="/">
          <img
            src={primaryLogo}
            className="pressplay-logo"
            alt="pressplay logo"
          />
        </Link>
      </div>
      <div className="dashboard-search-profile">
        <div htmlFor="search" className="dashboard-nav-search">
          {searchIcon()}
          <input type="search" />
        </div>

        <div className="dashboard-profile">
          <p>{user}</p>
          <div className="profile-avatar">
            <img src={profileImage} alt="profile" />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export { DashboardNavBar };

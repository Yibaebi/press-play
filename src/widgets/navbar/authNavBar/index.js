import React from "react";
import { primaryLogo } from "../../../assets";
import { Button } from "../../../components";
import { Link } from "react-router-dom";

function AuthNavBar({ buttonLabel, link }) {
  return (
    <React.Fragment>
      <div className="header-container">
        <Link to="/">
          <img src={primaryLogo} alt="pressplay logo" />
        </Link>
        {buttonLabel && (
          <div className="links">
            <Link to="/dashboard/discover">Browse Podcasts</Link>
            <Button
              label={buttonLabel}
              colorClass="white"
              className="auth-signup-button"
              link={link}
            />
          </div>
        )}
      </div>
    </React.Fragment>
  );
}

export { AuthNavBar };

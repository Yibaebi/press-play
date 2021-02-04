import React from "react";
import { Route, Switch } from "react-router-dom";
import jwtDecode from "jwt-decode";

import { ActivateAccount, Dashboard, LogInPage, SignUpPage } from "./pages";
import { PasswordResetPage } from "./pages";
import "./PressPlay.css";
import { LandingPage } from "./pages/application/landingPage";
import { Logout } from "./pages/auth/logout";

class PressPlay extends React.Component {
  state = { userFirstName: "", userDetails: {} };

  componentDidMount() {
    try {
      const user = localStorage.getItem("userDetails");
      const userDetails = JSON.parse(user);
      console.log("current user ", userDetails);
      this.setState({ user: userDetails.firstName, userDetails });
    } catch (error) {}
  }

  render() {
    return (
      <div className="press-play-main-container">
        <Switch>
          <Route path="/signup" component={SignUpPage} />
          <Route path="/login" component={LogInPage} />
          <Route path="/logout" component={Logout} />
          <Route path="/resetPassword" component={PasswordResetPage} />
          <Route path="/activateAccount" component={ActivateAccount} />
          <Route
            path="/dashboard"
            render={(props) => (
              <Dashboard
                user={this.state.user}
                userDetails={this.state.userDetails}
                {...props}
              />
            )}
          />
          <Route path="/activateAccount" component={ActivateAccount} />
          <Route path="/resetPassword" component={PasswordResetPage} />
          <Route path="/activateAccount" component={ActivateAccount} />
          <Route path="/signup" component={SignUpPage} />
          <Route path="/login" component={LogInPage} />
          <Route path="/" component={LandingPage} />
        </Switch>
      </div>
    );
  }
}

export default PressPlay;

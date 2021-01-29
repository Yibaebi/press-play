import React from "react";
import { Route, Switch } from "react-router-dom";
import jwtDecode from "jwt-decode";

import {
  ActivateAccount,
  Dashboard,
  Home,
  LogInPage,
  SignUpPage,
} from "./pages";
import { PasswordResetPage } from "./pages";
import "./PressPlay.css";
import { LandingPage } from "./pages/application/landingPage";
import { LandingNavbar } from "./widgets";

class PressPlay extends React.Component {
  state = {};

  componentDidMount() {
    try {
      const jwt = localStorage.getItem("token");
      const user = jwtDecode(jwt);

      this.setState({ user: user.email });
    } catch (error) {}
  }

  render() {
    return (
      <div className="press-play-main-container">
        <Switch>
          <Route path="/signup" component={SignUpPage} />
          <Route path="/login" component={LogInPage} />
          <Route path="/activateAccount" component={ActivateAccount} />
          <Route path="/resetPassword" component={PasswordResetPage} />
          <Route
            path="/dashboard"
            render={(props) => <Dashboard user={this.state.user} {...props} />}
          />
          <Route path="/" component={LandingPage} />
        </Switch>
      </div>
    );
  }
}

export default PressPlay;

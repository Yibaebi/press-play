import React from "react";
// import { Dashboard } from "./pages";
import { Route, Switch } from "react-router-dom";
import jwtDecode from "jwt-decode";

import { Dashboard, LogInPage, SignUpPage } from "./pages";
import { PasswordResetPage } from "./pages";
import "./PressPlay.css";

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
          <Route path="/resetPassword" component={PasswordResetPage} />
          <Route
            path="/"
            render={(props) => <Dashboard user={this.state.user} {...props} />}
          />
        </Switch>

        {/* <Dashboard /> */}
      </div>
    );
  }
}

export default PressPlay;

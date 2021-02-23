import React from "react";
import { Route, Switch } from "react-router-dom";
import { getUserAvatar } from "./api";
import { ActivateAccount, Dashboard, LogInPage, SignUpPage } from "./pages";
import { PasswordResetPage } from "./pages";
import { LandingPage } from "./pages/application/landingPage";
import { Logout } from "./pages/auth/logout";
import "./PressPlay.css";

class PressPlay extends React.Component {
  state = {
    userFirstName: "",
    userDetails: {},
    userAvatar: " https://www.w3schools.com/howto/img_avatar.png",
  };

  async componentDidMount() {
    try {
      const userAvatar = await getUserAvatar();
      console.log(userAvatar);

      const user = localStorage.getItem("userDetails");
      const userDetails = JSON.parse(user);
      console.log("current user ", userDetails);
      this.setState({
        user: userDetails.lastName,
        userDetails,
      });
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
                userAvatar={this.state.userAvatar}
                {...props}
              />
            )}
          />
          <Route path="/activateAccount" component={ActivateAccount} />
          <Route path="/resetPassword" component={PasswordResetPage} />
          <Route
            path="/api/users/activate-account"
            component={ActivateAccount}
          />
          <Route path="/signup" component={SignUpPage} />
          <Route path="/login" component={LogInPage} />
          <Route path="/" component={LandingPage} />
        </Switch>
      </div>
    );
  }
}

export default PressPlay;

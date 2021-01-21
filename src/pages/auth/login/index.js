import React from "react";
import { primaryLogo } from "../../../assets";
import { Button } from "../../../components/button";
import "./login.css";

const userDetails = {
  email: "",
  password: "",
  rememberLogin: false,
};

class LogInPage extends React.Component {
  state = {
    userEmail: "",
    userPassword: "",
    checked: false,
  };

  handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log(this.state.userEmail, this.state.userPassword);

    if (this.state.userEmail && this.state.userPassword) {
      captureUserLoginDetails(
        this.state.userEmail,
        this.state.userPassword,
        this.state.checked
      );

      console.log("Updated user details", userDetails);
    } else {
      alert("Please complete all login fields.");
      revertUserDetails();
      console.log("Updated user details", userDetails);
    }
  };

  handleRemeberMe = () => {
    let checked = !this.state.checked;
    this.setState({
      checked: checked,
    });
  };

  render() {
    return (
      <main className="login-page-main">
        <section className="login-page-header">
          <div className="header-container">
            <img src={primaryLogo} alt="pressplay logo" />
            <div className="links">
              <a href="#browsepodcasts">Browse Podcasts</a>
              <Button
                label="Sign Up"
                colorClass="white"
                className="login-signup-button"
              />
            </div>
          </div>
        </section>
        <section
          className="login-page-body"
          onSubmit={(e) => this.handleLoginSubmit(e)}
        >
          <aside>
            <h1>Welcome Back!</h1>
            <p>Let's continue where you left off</p>
            <div>
              <form className="login-form">
                <label className="login-form-label " htmlFor="userEmail">
                  Email address
                </label>
                <input
                  type="email"
                  name="userEmail"
                  id="userEmail"
                  placeholder="name@domain.com"
                  onChange={(e) => this.setState({ userEmail: e.target.value })}
                  value={this.state.userEmail}
                />
                <label className="login-form-label" htmlFor="userPassword">
                  Password
                </label>
                <input
                  type="password"
                  name="userPassword"
                  id="userPassword"
                  placeholder="Type your password"
                  onChange={(e) =>
                    this.setState({ userPassword: e.target.value })
                  }
                  value={this.state.userPassword}
                />
                <div className="login-form-remember">
                  <label className="label-container" htmlFor="rememberMe">
                    <input
                      type="checkbox"
                      name="rememberMe"
                      id="rememberMe"
                      checked={this.state.checked}
                      onChange={() => this.handleRemeberMe()}
                    />
                    <span className="checkmark"></span>Remember login
                  </label>
                </div>

                <Button label="Log In" className="login-button" />
              </form>
            </div>
          </aside>
          <aside></aside>
        </section>
      </main>
    );
  }
}

const captureUserLoginDetails = (email, password, rememberMe) => {
  userDetails.email = email;
  userDetails.password = password;
  userDetails.rememberLogin = rememberMe;
};

const revertUserDetails = () => {
  userDetails.email = "";
  userDetails.password = "";
  userDetails.rememberLogin = false;
};

export { LogInPage, userDetails };

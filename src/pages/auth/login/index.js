import React from "react";
import { primaryLogo } from "../../../assets";
import { Button } from "../../../components/button";
import { LogUserIn } from "../../../api";
import { Input } from "../../../components";
import "./login.css";
import {
  AuthenticationPage,
  captureUserDetails,
  revertUserDetails,
} from "../authPages";

const userDetails = {
  email: "",
  password: "",
  rememberLogin: false,
};

class LogInPage extends AuthenticationPage {
  state = {
    account: { userEmail: "", userPassword: "" },
    checked: false,
    errors: {},
    iconChange: "far fa-eye",
    passwordType: "password",
  };

  validateDetails = () => {
    const errors = {};

    const { userEmail, userPassword } = { ...this.state.account };

    if (userEmail.trim() === "") {
      errors.userEmail = "Invalid email";
    }

    if (userPassword.trim() === "") {
      errors.userPassword = "Password is required!";
    }

    return Object.keys(errors).length === 0 ? null : errors;
  };

  handleLoginSubmit = (e) => {
    e.preventDefault();

    const account = { ...this.state.account };

    if (account.userEmail && account.userPassword) {
      captureUserDetails(
        account.userEmail.toLocaleLowerCase(),
        account.userPassword
      );

      console.log(LogUserIn(userDetails));
    } else {
      revertUserDetails();
    }
  };

  handleRemeberMe = () => {
    let checked = !this.state.checked;
    this.setState({
      checked: checked,
    });
  };

  render() {
    const errors = { ...this.state.errors };

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
                className="auth-signup-button"
              />
            </div>
          </div>
        </section>
        <section className="login-page-body">
          <aside>
            <h1>Welcome Back!</h1>
            <p>Let's continue where you left off</p>
            <div>
              <form
                className="login-form"
                onSubmit={(e) => this.handleLoginSubmit(e)}
              >
                <Input
                  onChange={this.handleInputChange}
                  value={this.state.account.userEmail}
                  labelClassName="login-form-label"
                  type="email"
                  label="Email address"
                  name="userEmail"
                  placeHolder="email@domain.com"
                  error={errors.userEmail}
                />

                <Input
                  onChange={this.handleInputChange}
                  value={this.state.account.userPassword}
                  labelClassName="login-form-label label-password"
                  type={this.state.passwordType}
                  label="Password"
                  name="userPassword"
                  placeHolder="Type your password"
                  error={errors.userPassword}
                  iconClass={this.state.iconChange}
                  iconChange={this.handleHidePassword}
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

                <Button
                  disabled={this.validateDetails()}
                  label="Log In"
                  className="login-button"
                />
              </form>
            </div>
          </aside>
          <aside></aside>
        </section>
      </main>
    );
  }
}

export { LogInPage, userDetails };

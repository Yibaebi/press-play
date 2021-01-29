import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../../../components/button";
import { login } from "../../../api";
import { Input } from "../../../components";
import { AuthenticationPage } from "../authPages";
import { AuthNavBar } from "../../../widgets";

import "./login.css";

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

    if (userPassword.length < 4) {
      errors.userPassword = "Password is less than 7 characters";
    }

    return Object.keys(errors).length === 0 ? null : errors;
  };

  handleLoginSubmit = async (e) => {
    e.preventDefault();

    const account = { ...this.state.account };

    if (account.userEmail && account.userPassword) {
      try {
        const { data } = await login(account.userEmail, account.userPassword);

        console.log(data.data.token);
        const jwt = data.data.token;
        localStorage.setItem("token", jwt);
        window.location = "/dashboard";
      } catch (error) {
        if (error.response && error.response.status === 401) {
          const errors = { ...this.state.errors };
          errors.userEmail = "Invalid email or password. Try again";
          this.setState({
            errors,
          });
        }
      }
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
          <AuthNavBar buttonLabel="Sign up" link="/signup" />
        </section>
        <section className="login-page-body">
          <aside>
            <h1>Welcome Back!</h1>
            <p>Login to continue your amazing experience at Press Play</p>
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
            <div className="forgot-password-link">
              Forgot your password?
              <Link to="/resetPassword"> Click here.</Link>
            </div>
          </aside>
          <aside>
            <section>
              <div></div>
            </section>
          </aside>
        </section>
      </main>
    );
  }
}

export { LogInPage };

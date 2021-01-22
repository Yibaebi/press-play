import React from "react";
import { primaryLogo } from "../../../assets";
import { Button } from "../../../components/button";
import { LogUserIn } from "../../../api";
import { Input } from "../../../components";
import "./login.css";

const userDetails = {
  email: "",
  password: "",
  rememberLogin: false,
};

class LogInPage extends React.Component {
  state = {
    account: { userEmail: "", userPassword: "" },
    checked: false,
    errors: {
      userEmail: "",
      userPassword: "",
    },
    iconChange: "far fa-eye",
    passwordType: "password",
  };

  validateLoginDetails = () => {
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

  validatLoginProperties = ({ name, value }) => {
    if (name === "userEmail") {
      if (value.trim() === "") {
        return "Invalid email";
      }
    }

    if (name === "userPassword") {
      if (value.trim() === "") {
        return "Password is required!";
      }
    }
  };

  handleLoginSubmit = (e) => {
    e.preventDefault();

    const account = { ...this.state.account };

    if (account.userEmail && account.userPassword) {
      captureUserLoginDetails(
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

  handleHidePassword = () => {
    const iconChange =
      this.state.iconChange === "far fa-eye"
        ? "far fa-eye-slash"
        : "far fa-eye";

    const passwordType =
      this.state.passwordType === "password" ? "text" : "password";

    this.setState({
      iconChange: iconChange,
      passwordType: passwordType,
    });
  };

  handleInputChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validatLoginProperties(input);

    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({ account, errors });
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

const captureUserLoginDetails = (email, password) => {
  userDetails.email = email;
  userDetails.password = password;
};

const revertUserDetails = () => {
  userDetails.email = "";
  userDetails.password = "";
  userDetails.rememberLogin = false;
};

export { LogInPage, userDetails };

import React from "react";
// import { SignUserUp } from "../../../api";
import "./auth.css";

class AuthenticationPage extends React.Component {
  validateDetails = () => {
    const errors = {};

    const { userEmail, userPassword, userName } = { ...this.state.account };

    if (userEmail.trim() === "") {
      errors.userEmail = "Invalid email";
    }

    if (userName.trim() === "") {
      errors.userName = "Username cannot be empty";
    }

    if (userPassword.trim() === "") {
      errors.userPassword = "Password is required!";
    }

    return Object.keys(errors).length === 0 ? null : errors;
  };

  validatSignUpProperties = ({ name, value }) => {
    if (name === "userEmail") {
      if (value.trim() === "") {
        return "Email is empty";
      }
    }

    if (name === "userName") {
      if (value.trim() === "") {
        return "Username cannot be empty";
      }
    }

    if (name === "userPassword") {
      if (value.trim() === "") {
        return "Password is required!";
      }
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
    const errorMessage = this.validatSignUpProperties(input);

    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({ account, errors });
  };
}

const captureUserDetails = (userEmail, userPassword, userName) => {
  return {
    userEmail: userEmail,
    userPassword: userPassword,
    userName: userName,
  };
};

export { AuthenticationPage, captureUserDetails };

import React from "react";
import "./auth.css";

class AuthenticationPage extends React.Component {
  validateDetails = () => {
    const errors = {};

    const {
      userEmail,
      userPassword,
      userFirstName,
      userLastName,
      newPassword,
      confirmPassword,
    } = {
      ...this.state.account,
    };

    if (userEmail.trim() === "") {
      errors.userEmail = "Invalid email";
    }

    if (userLastName.trim() === "") {
      errors.userLastName = "Lastname cannot be empty";
    }
    if (userFirstName.trim() === "") {
      errors.userName = "Firstname cannot be empty";
    }

    if (userPassword.trim() === "") {
      errors.userPassword = "Password is required!";
    }

    if (userPassword.length < 7) {
      errors.userPassword = "Password is less than 7 characters";
    }

    return Object.keys(errors).length === 0 ? null : errors;
  };

  validateSignUpProperties = ({ name, value }) => {
    if (name === "userFirstName") {
      if (value.trim() === "") {
        return "Enter firstname";
      }
    }
    if (name === "userLastName") {
      if (value.trim() === "") {
        return "Lastname is empty";
      }
    }
    if (name === "userEmail") {
      if (value.trim() === "") {
        return "Email cannot be empty";
      }
    }

    if (
      name === "userPassword" ||
      name === "newPassword" ||
      name === "confirmPassword"
    ) {
      if (value.trim() === "") {
        return "Password is required!";
      }

      if (value.length < 7) {
        return "Password is too short. Must be at least 7 characters";
      }
    }
    if (name === "resetEmail") {
      if (value.trim() === "") {
        return "Email can not be empty.";
      }
    }
    if (name === "newPassword") {
      if (value.trim() === "") {
        return "Field can not be empty.";
      }
    }
    if (name === "confirmPassword") {
      if (value.trim() === "") {
        return "Please confirm your new password";
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
    const errorMessage = this.validateSignUpProperties(input);

    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({ account, errors });
  };
}

const captureUserDetails = (
  userEmail,
  userPassword,
  userFirstName,
  userLastName
) => {
  return {
    userEmail: userEmail,
    userPassword: userPassword,
    userFirstName: userFirstName,
    userLastName: userLastName,
  };
};

export { AuthenticationPage, captureUserDetails };

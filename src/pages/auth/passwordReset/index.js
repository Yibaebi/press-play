import React from "react";
import ReactModal from "react-modal";
import { Button } from "../../../components/button";
import { Input } from "../../../components";
import { AuthenticationPage } from "../authPages";
import { AuthNavBar } from "../../../widgets";
import "./passwordReset.css";
import { resetPassword } from "../../../api";

class PasswordResetPage extends AuthenticationPage {
  state = {
    account: { resetEmail: "", newPassword: "", confirmPassword: "" },
    checked: false,
    errors: {},
    iconChange: "far fa-eye",
    passwordType: "password",
    showModal: false,
    token: "",
    activated: false,
  };

  async componentDidMount() {
    const urlString = window.location.href;
    console.log(urlString);
    const url = new URL(urlString);
    const token = url.searchParams.get("token");
    console.log(token);

    this.setState({
      token: token,
    });

    // try {
    //   const response = await resetPassword(token);
    //   console.log(response);
    //   if (response.status === 200) {
    //     this.setState({
    //       activated: true,
    //     });
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  }

  validateDetails = () => {
    const errors = {};

    const { resetEmail, newPassword, confirmPassword } = {
      ...this.state.account,
    };

    if (!this.state.token) {
      if (resetEmail.trim() === "") {
        errors.resetEmail = "Invalid email";
      }
    }
    if (this.state.token) {
      if (newPassword.length < 7 || confirmPassword.length < 7) {
        errors.newPassword = "Password is less than 7 characters";
      }
      if (newPassword.trim() === "") {
        errors.newPassword = "New password field cannot be empty.";
      }
      if (confirmPassword.trim() === "") {
        errors.newPassword = "Please confirm new password.";
      }
      if (newPassword !== confirmPassword) {
        errors.newPassword = "Passwords do not match";
      }
      if (newPassword.length < 7 || confirmPassword.length < 7) {
        errors.newPassword = "Password is less than 7 characters";
        errors.confirmPassword = "Password is less than 7 characters";
      }
    }

    console.log(errors);
    return Object.keys(errors).length === 0 ? null : errors;
  };

  handleResetSubmit = async (e) => {
    e.preventDefault();
    const errors = { ...this.state.errors };
    const { resetEmail, newPassword, confirmPassword } = {
      ...this.state.account,
    };

    if (resetEmail) {
      this.setState({
        showModal: true,
      });
      try {
        const { data } = await resetPassword(resetEmail);

        if (data.message) {
          this.setState({
            showModal: true,
          });
        }
      } catch (error) {
        if (error.response) {
          const errors = { ...this.state.errors };
          errors.resetEmail = "Invalid email. Try again";
          this.setState({
            errors,
          });
        }
      }
    } else if (newPassword === confirmPassword) {
      console.log(newPassword, confirmPassword);

      this.setState({
        showModal: true,
        resetSuccess: true,
      });
    } else {
      errors.newPassword = "Passwords do not match";
      this.setState({
        errors,
      });
    }
  };

  handleRemeberMe = () => {
    let checked = !this.state.checked;
    this.setState({
      checked: checked,
    });
  };

  handleCloseModal = () => {
    this.setState({
      showModal: false,
    });

    window.location = "/login";
  };

  render() {
    const errors = { ...this.state.errors };

    return (
      <main className="auth-page-main">
        <section className="auth-page-header">
          <AuthNavBar />
        </section>
        <section className="reset-page-body">
          <aside>
            <h1>Don’t Worry</h1>
            <p>
              We are here to help you recover your password. Enter the email
              address you used when you joined and we’ll send the instructions
              to reset your password
            </p>
            <div>
              <form
                className="reset-form"
                onSubmit={(e) => this.handleResetSubmit(e)}
              >
                {this.state.token ? (
                  <React.Fragment>
                    <Input
                      onChange={this.handleInputChange}
                      value={this.state.newPassword}
                      labelClassName="reset-form-label"
                      type="password"
                      label="New password"
                      name="newPassword"
                      placeHolder="Enter new password"
                      error={errors.newPassword}
                      iconClass={this.state.iconChange}
                      iconChange={this.handleHidePassword}
                    />
                    <Input
                      onChange={this.handleInputChange}
                      value={this.state.confirmPassword}
                      labelClassName="reset-form-label"
                      type="password"
                      label="Confirm password"
                      name="confirmPassword"
                      placeHolder="Retype password "
                      error={errors.confirmPassword}
                      iconClass={this.state.iconChange}
                      iconChange={this.handleHidePassword}
                    />

                    <Button
                      disabled={this.validateDetails()}
                      label="Reset Password"
                      className="reset-button"
                    />
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <Input
                      onChange={this.handleInputChange}
                      value={this.state.resetEmail}
                      labelClassName="reset-form-label"
                      type="email"
                      label="Email"
                      name="resetEmail"
                      placeHolder="email@domain.com"
                      error={errors.resetEmail}
                    />

                    <Button
                      disabled={this.validateDetails()}
                      label="Email me a recovery"
                      className="reset-button"
                    />
                  </React.Fragment>
                )}
              </form>
            </div>
          </aside>
          <aside></aside>
        </section>
        <ReactModal
          isOpen={this.state.showModal}
          className="Modal"
          overlayClassName="Overlay"
          shouldCloseOnOverlayClick={true}
        >
          {!this.state.token ? (
            <h1>Success!</h1>
          ) : this.state.resetSuccess ? (
            <h1>
              Your password has been reset successfully. You will be redirected
              to your login page shortly.
            </h1>
          ) : (
            <h1>An error occured somewhere. Please try again.</h1>
          )}

          {!this.state.token ? (
            <p>A reset link has been sent to your email address</p>
          ) : (
            ""
          )}
          <Button
            onClick={this.handleCloseModal}
            label="Return to login"
            className="reset-button"
          />
        </ReactModal>
      </main>
    );
  }
}

export { PasswordResetPage };

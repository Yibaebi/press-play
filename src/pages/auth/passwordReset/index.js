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
    account: { resetEmail: "" },
    checked: false,
    errors: {},
    iconChange: "far fa-eye",
    passwordType: "password",
    showModal: false,
  };

  validateDetails = () => {
    const errors = {};

    const { resetEmail } = { ...this.state.account };
    console.log("reset email: ", resetEmail);

    if (resetEmail.trim() === "") {
      errors.resetEmail = "Invalid email";
    }

    return Object.keys(errors).length === 0 ? null : errors;
  };

  handleResetSubmit = async (e) => {
    e.preventDefault();

    this.setState({
      showModal: true,
    });

    const { resetEmail } = { ...this.state.account };

    if (resetEmail) {
      try {
        const { data } = await resetPassword(resetEmail);

        if (data.message) {
          this.setState({
            showModal: true,
          });
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          const errors = { ...this.state.errors };
          errors.resetEmail = "Invalid email. Try again";
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
          <h1>Success!</h1>
          <p>A reset link has been sent to your email address</p>
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

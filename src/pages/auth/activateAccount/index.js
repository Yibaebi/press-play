import React from "react";
import { activateAccount } from "../../../api";
import { IconLoaderVariant1 } from "../../../utilities";
import "./activateAccount.css";

class ActivateAccount extends React.Component {
  state = { token: "", activated: false, error: false };

  async componentDidMount() {
    const url_string = window.location.href;
    console.log(url_string);
    const url = new URL(url_string);
    const token = url.searchParams.get("token");
    console.log(token);

    try {
      const response = await activateAccount(token);
      console.log(response);
      if (response.status) {
        this.setState({
          activated: true,
        });

        setTimeout(() => {
          window.location = "/login";
        }, 5000);
      }
    } catch (error) {
      this.setState({
        error: true,
      });
      setTimeout(() => {
        window.location = "/login";
      }, 5000);
      console.log(error);
    }
  }

  render() {
    return (
      <div className="activate-account-container">
        {this.state.error ? (
          <div>
            <i class="fa fa-exclamation-circle" aria-hidden="true"></i>
            <p>
              An error occured during activation. Please ensure that you clicked
              the right activation link in your email.
            </p>
          </div>
        ) : this.state.activated ? (
          <div>
            <i class="fa fa-check-square" aria-hidden="true"></i>
            Activation Successful! You'll be redirected to{" "}
            <span>PressPlay's</span> login page in a moment.
          </div>
        ) : (
          <div>
            <IconLoaderVariant1 /> Activating your account. Please wait.
          </div>
        )}
      </div>
    );
  }
}

export { ActivateAccount };

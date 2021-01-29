import React from "react";
import { activateAccount } from "../../../api";

class ActivateAccount extends React.Component {
  state = { token: "", activated: false };

  async componentDidMount() {
    const url_string = window.location.href;
    console.log(url_string);
    const url = new URL(url_string);
    const token = url.searchParams.get("token");
    console.log(token);

    try {
      const response = await activateAccount(token);
      console.log(response);
      if (response.status === 200) {
        this.setState({
          activated: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div>
        {this.state.activated
          ? "You have been successfully activated!"
          : "Something went wrong. Try again"}
      </div>
    );
  }
}

export { ActivateAccount };

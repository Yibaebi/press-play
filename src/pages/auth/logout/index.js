import React from "react";
import { IconLoader } from "../../../utilities/loader";

class Logout extends React.Component {
  state = {
    iconLoader: "",
  };

  componentDidMount() {
    localStorage.removeItem("userDetails");
    this.setState({
      iconLoader: <IconLoader loadingMessage="We hope to have you back" />,
    });
    setTimeout(() => {
      window.location = "/";
    }, 3000);
  }

  render() {
    return <React.Fragment>{this.state.iconLoader}</React.Fragment>;
  }
}

export { Logout };

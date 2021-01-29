import React from "react";

class Logout extends React.Component {
  componentDidMount() {
    localStorage.removeItem("token");
    window.location = "/";
  }

  render() {
    return null;
  }
}

export { Logout };

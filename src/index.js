import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
// import { LogInPage } from "./pages/auth/login";
import { SignUpPage } from "./pages/auth";
// import App from "./App";
// import { AuthenticationPage } from "./

ReactDOM.render(
  <React.StrictMode>
    {/* <LogInPage /> */}
    <SignUpPage />
  </React.StrictMode>,
  document.getElementById("root")
);

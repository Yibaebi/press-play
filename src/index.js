import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import PressPlay from "./PressPlay";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <PressPlay />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

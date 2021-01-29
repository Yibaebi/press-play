import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
// import { UploadModal } from "./widgets";
import PressPlay from "./PressPlay";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <PressPlay />
      {/* <UploadModal /> */}
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

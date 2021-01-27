import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import PressPlay from "./PressPlay";
import { UploadModal } from "./widgets";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      {/* <PressPlay /> */}
      <UploadModal />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

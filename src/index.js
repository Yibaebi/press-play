import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
// import { PodcastPage } from "./pages/application";
// import { UploadModal } from "./widgets";
import PressPlay from "./PressPlay";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <PressPlay />
      {/* <UploadModal /> */}
      {/* <PodcastPage /> */}
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
// import { PodcastPage } from "./pages/application";
// import { UploadModal } from "./widgets";
// import PressPlay from "./PressPlay";
import { FavoritesPage } from "./pages/application/favoritesPage";
// import { EpisodeUploadModal } from "./widgets/episodeUploadModal";
// import { AudioPlayer } from "./utilities/audioPlayer/index";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      {/* <PressPlay /> */}
      <FavoritesPage />
      {/* <UploadModal /> */}
      {/* <PodcastPage /> */}
      {/* <AudioPlayer /> */}
      {/* <EpisodeUploadModal /> */}
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

import React from "react";
import "./header.css";

const AudioHeader = ({ episodeTitle, podcastAuthor, podcastCover }) => {
  return (
    <section className="audio-header-section">
      <aside className="image-container">
        <img src={podcastCover} alt="podcast cover" />
      </aside>
      <aside className="podcast-description">
        <h3>{episodeTitle}</h3>
        <p>{podcastAuthor}</p>
      </aside>
    </section>
  );
};

export { AudioHeader };

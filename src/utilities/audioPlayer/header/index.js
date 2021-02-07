import React from "react";
import { eli } from "../../../assets";
import "./header.css";

const AudioHeader = () => {
  return (
    <section className="audio-header-section">
      <aside className="image-container">
        <img src={eli} alt="podcast cover" />
      </aside>
      <aside className="podcast-description">
        <h3>Entrepreneurs on Fire</h3>
        <p>John Lee Dumas</p>
      </aside>
    </section>
  );
};

export { AudioHeader };

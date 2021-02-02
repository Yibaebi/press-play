import React from "react";
import { NavLink } from "react-router-dom";

const ImageSlide = ({ url, title, author }) => {
  return (
    <div className="slide-item">
      <NavLink to="dashboard/home">
        <img className="image-slide" src={url} alt="" />
      </NavLink>
      <div className="slide-item-desc">
        <h3>{title}</h3>
        <p>{author}</p>
      </div>
    </div>
  );
};

export { ImageSlide };

import React from "react";
import { angleLeftIcon, angleRightIcon } from "../../assets/icons";

const Arrow = ({ direction, clickFunction, show }) => (
  <div className={`slide-arrow ${direction} ${show}`} onClick={clickFunction}>
    {direction === "left" ? angleLeftIcon() : angleRightIcon()}
  </div>
);

export { Arrow };

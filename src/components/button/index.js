import React from "react";
import "./btn.css";

const Button = ({ label, colorClass, className }) => {
  return <button className={`btn ${colorClass} ${className}`}>{label}</button>;
};

export { Button };

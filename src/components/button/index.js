import React from "react";
import "./btn.css";

const Button = ({ label, colorClass, className, type, disabled }) => {
  return (
    <button
      disabled={disabled}
      type={type}
      className={`btn ${colorClass} ${className}`}
    >
      {label}
    </button>
  );
};

export { Button };

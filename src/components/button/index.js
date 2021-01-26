import React from "react";
import "./btn.css";
import { Link } from "react-router-dom";

const Button = ({
  label,
  colorClass,
  onClick,
  className,
  type,
  disabled,
  link,
}) => {
  return (
    <button
      disabled={disabled}
      type={type}
      className={`btn ${colorClass} ${className}`}
      onClick={onClick}
    >
      {link ? <Link to={link}>{label}</Link> : label}
    </button>
  );
};

export { Button };

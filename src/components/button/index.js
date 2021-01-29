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
  const ColorClass = colorClass ? colorClass : "";
  return (
    <button
      disabled={disabled}
      type={type}
      className={`btn ${ColorClass} ${className}`}
      onClick={onClick}
    >
      {link ? <Link to={link}>{label}</Link> : label}
    </button>
  );
};

export { Button };

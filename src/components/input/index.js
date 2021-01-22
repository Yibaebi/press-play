import React from "react";
import "./input.css";

const Input = ({
  labelClassName,
  name,
  label,
  placeHolder,
  error,
  value,
  iconClass,
  iconChange,
  ...rest
}) => {
  return (
    <React.Fragment>
      <label className={labelClassName} htmlFor={name}>
        {label}
        {value && <i onClick={iconChange} className={iconClass}></i>}
        <input name={name} id={name} placeholder={placeHolder} {...rest} />
        {<p className="error">{error}</p>}
      </label>
    </React.Fragment>
  );
};

export { Input };

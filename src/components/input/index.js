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
  const autoFocus = name === "userEmail" ? true : false;
  return (
    <React.Fragment>
      <label className={labelClassName} htmlFor={name}>
        {label}
        {value && <i onClick={iconChange} className={iconClass}></i>}
        <input
          autoFocus={autoFocus}
          name={name}
          id={name}
          placeholder={placeHolder}
          {...rest}
        />
        {{ error } && <p className="error">{error}</p>}
      </label>
    </React.Fragment>
  );
};

export { Input };

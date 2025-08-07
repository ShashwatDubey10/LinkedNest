import React from "react";

const Input = React.forwardRef(
  (
    { type = "text", placeholder, value, onChange, disabled = false, className = "", name, ...rest },
    ref
  ) => {
    return (
      <input
        ref={ref}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`input input-bordered w-full ${className}`}
        {...rest}
      />
    );
  }
);

Input.displayName = "Input";

export default Input;

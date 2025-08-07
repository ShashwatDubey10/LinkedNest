import React from "react";

const Button = ({
  children,
  onClick,
  type = "button",
  className = "",
  disabled = false,
  loading = false,
  variant = "primary", 
}) => {
  const baseClasses =
    "btn " +
    (variant === "primary"
      ? "btn-primary"
      : variant === "secondary"
      ? "btn-secondary"
      : variant === "outline"
      ? "btn-outline"
      : variant === "ghost"
      ? "btn-ghost"
      : "btn-primary");

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseClasses} ${className} ${loading ? "loading" : ""}`}
    >
      {!loading ? children : <span className="invisible">{children}</span>}
    </button>
  );
};

export default Button;

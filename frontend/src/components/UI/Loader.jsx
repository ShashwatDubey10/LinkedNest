import React from "react";

const Loader = ({ size = "md", className = "" }) => {
  const sizeClass =
    size === "sm"
      ? "w-6 h-6"
      : size === "lg"
      ? "w-12 h-12"
      : "w-8 h-8"; 

  return (
    <div className={`flex justify-center items-center ${className}`}>
      <span className={`loading loading-spinner loading-md ${sizeClass}`}></span>
    </div>
  );
};

export default Loader;

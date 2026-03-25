// components/Button.jsx
import React from "react";

const Button = ({
  children,
  variant = "primary",
  size = "md",
  icon = null,
  onClick,
  className = "",
  disabled = false,
  type = "button",
  fullWidth = false,
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-primary text-white hover:bg-primary/90 focus:ring-primary",
    secondary:
      "bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-400",
    outline:
      "border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-400",
    danger: "bg-red-500 text-white hover:bg-red-600 focus:ring-red-500",
    ghost: "text-gray-600 hover:bg-gray-100 focus:ring-gray-400",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm gap-1.5",
    md: "px-4 py-2 text-sm gap-2",
    default: "px-4 py-2 text-sm gap-2", // alias for md — fixes Dashboard usage
    lg: "px-5 py-2.5 text-base gap-2",
  };

  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size] ?? sizes.md} ${widthClass} ${className}`}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;

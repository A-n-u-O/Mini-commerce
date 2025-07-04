"use client";

import React from "react";
type ButtonVariant = "default" | "ghost" | "outline";
type ButtonSize = "default" | "sm" | "lg" | "icon";
type ButtonAsChild = "true" | "false";
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild: ButtonAsChild;
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "default",
      size = "default",
      className = "",
      asChild="true",
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500";

    const variantStyles = {
      default: "bg-blue-600 text-white hover:bg-blue-700",
      ghost: "bg-transparent hover:bg-gray-100",
      outline: "border border-gray-300 bg-transparent hover:bg-gray-50",
    };

    const sizeStyles = {
      default: "px-4 py-2",
      sm: "px-3 py-1.5 text-sm",
      lg: "px-6 py-3 text-lg",
      icon: "p-2",
    };
    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
        {...props}>
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

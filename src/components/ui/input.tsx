import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", ...props }, ref) => {
    return <input ref={ref} className={`px-4 py-2 ${className}`} {...props} />;
  }
);

Input.displayName = "input";

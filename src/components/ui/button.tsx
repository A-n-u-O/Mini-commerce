"use client";

import React from "react";

type ButtonVariant = "default" | "ghost" | "outline" | "link";
type ButtonSize = "default" | "sm" | "lg" | "icon";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "default",
      size = "default",
      className = "",
      asChild = false,
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
      link: "bg-transparent underline text-blue-600 hover:text-blue-800",
    };

    const sizeStyles = {
      default: "px-4 py-2",
      sm: "px-3 py-1.5 text-sm",
      lg: "px-6 py-3 text-lg",
      icon: "p-2",
    };

    const buttonClass = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

    if (asChild && React.isValidElement(children)) {
      // Create a type for the child props we expect to merge
      type ChildProps = {
        className?: string;
        ref?: React.Ref<unknown>;
      } & React.ComponentPropsWithoutRef<any>;

      const child = children as React.ReactElement<ChildProps>;
      
      return React.cloneElement(child, {
        className: `${child.props.className || ''} ${buttonClass}`,
        ...props,
        ...(typeof child.type !== 'string' && { ref }),
      } as ChildProps);
    }

    return (
      <button
        ref={ref}
        className={buttonClass}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
"use client";

import { HTMLAttributes, forwardRef } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  padding?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ hover = false, padding = true, children, className = "", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`
          bg-[var(--color-surface)] rounded-2xl
          border border-[var(--color-border)]
          ${hover ? "hover:shadow-lg hover:border-[var(--color-primary)]/20 transition-all duration-300" : ""}
          ${padding ? "p-6" : ""}
          ${className}
        `}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";
export default Card;

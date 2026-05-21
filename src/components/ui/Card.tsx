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
          rounded-2xl border
          bg-[var(--color-surface)]
          border-[var(--color-border)]
          t-shadow
          ${hover
            ? "cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:t-shadow-md hover:border-[color-mix(in_srgb,var(--color-primary)_20%,var(--color-border))]"
            : ""}
          ${padding ? "p-5 sm:p-6" : ""}
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

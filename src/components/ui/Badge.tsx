"use client";

interface BadgeProps {
  variant?: "success" | "warning" | "danger" | "default";
  children: React.ReactNode;
  onClick?: () => void;
}

const variantStyles = {
  success: "bg-emerald-100 text-emerald-700",
  warning: "bg-amber-100 text-amber-700",
  danger: "bg-red-100 text-red-700",
  default: "bg-gray-100 text-gray-600",
};

export default function Badge({
  variant = "default",
  children,
  onClick,
}: BadgeProps) {
  const Tag = onClick ? "button" : "span";
  return (
    <Tag
      onClick={onClick}
      className={`
        inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium
        transition-all duration-200
        ${variantStyles[variant]}
        ${onClick ? "cursor-pointer hover:opacity-80 active:scale-95" : ""}
      `}
    >
      {children}
    </Tag>
  );
}

"use client";

import Image from "next/image";

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: "sm" | "md" | "lg" | "xl";
  showBorder?: boolean;
}

const sizeMap = {
  sm: { container: "w-10 h-10", text: "text-sm" },
  md: { container: "w-16 h-16", text: "text-xl" },
  lg: { container: "w-24 h-24", text: "text-3xl" },
  xl: { container: "w-32 h-32", text: "text-4xl" },
};

export default function Avatar({
  src,
  alt = "",
  size = "lg",
  showBorder = true,
}: AvatarProps) {
  const { container, text } = sizeMap[size];
  const initials = alt
    ? alt
        .split(" ")
        .map((w) => w[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "?";

  return (
    <div
      className={`
        ${container} rounded-full overflow-hidden flex-shrink-0
        ${showBorder ? "ring-2 ring-offset-2 ring-[var(--color-primary)]/30" : ""}
      `}
      style={showBorder ? { ringOffsetColor: "var(--color-background)" } as React.CSSProperties : undefined}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          width={128}
          height={128}
          className="w-full h-full object-cover"
        />
      ) : (
        <div
          className={`w-full h-full flex items-center justify-center ${text} font-bold text-white`}
          style={{ background: "var(--color-gradient)" }}
        >
          {initials}
        </div>
      )}
    </div>
  );
}

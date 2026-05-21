"use client";

import Image from "next/image";
import Link from "next/link";
import { IconChevronRight } from "@/components/ui";

export interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  showPrice: boolean;
  category: string;
}

export default function ProductCard({
  id,
  name,
  description,
  image,
  price,
  showPrice,
  category,
}: ProductCardProps) {
  return (
    <Link
      href={`/product/${id}`}
      className="group flex flex-col h-full rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
      style={{
        backgroundColor: "var(--color-surface)",
        border: "1px solid var(--color-border)",
        boxShadow: "var(--shadow-card)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-md)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-card)";
      }}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden" style={{ backgroundColor: "var(--color-surface-hover)" }}>
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
        {/* Subtle gradient overlay at bottom */}
        <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Category badge floated on image */}
        {category && (
          <div className="absolute top-2.5 left-2.5">
            <span
              className="inline-block text-[11px] font-semibold px-2 py-0.5 rounded-md backdrop-blur-sm"
              style={{
                backgroundColor: "color-mix(in srgb, var(--color-primary) 15%, white)",
                color: "var(--color-primary)",
                border: "1px solid color-mix(in srgb, var(--color-primary) 20%, transparent)",
              }}
            >
              {category}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-3.5 sm:p-4">
        {/* Name */}
        <h3
          className="font-semibold line-clamp-1 text-sm sm:text-[15px] leading-snug"
          style={{ color: "var(--color-text)" }}
        >
          {name}
        </h3>

        {/* Description */}
        <p
          className="text-xs sm:text-sm line-clamp-2 mt-1.5 leading-relaxed min-h-[2.4em]"
          style={{ color: "var(--color-text-muted)" }}
        >
          {description || " "}
        </p>

        {/* Price + CTA */}
        <div className="flex items-center justify-between mt-auto pt-3 gap-2">
          {showPrice && price > 0 ? (
            <span
              className="font-bold text-sm sm:text-[15px] whitespace-nowrap"
              style={{ color: "var(--color-primary)" }}
            >
              {price.toLocaleString("vi-VN")}đ
            </span>
          ) : (
            <span />
          )}

          <span
            className="inline-flex items-center text-xs sm:text-sm font-medium whitespace-nowrap gap-1 transition-all duration-300 group-hover:gap-2"
            style={{ color: "var(--color-primary)" }}
          >
            Xem
            <IconChevronRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}

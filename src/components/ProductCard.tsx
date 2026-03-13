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
      className="group flex flex-col h-full rounded-2xl overflow-hidden t-bg-surface border border-[var(--color-border)] hover:shadow-xl transition-all duration-400 hover:-translate-y-1"
    >
      {/* Image — fixed aspect ratio */}
      <div className="relative aspect-[4/3] overflow-hidden t-bg-hover">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
      </div>

      {/* Content — flex-grow pushes CTA to bottom */}
      <div className="flex flex-col flex-1 p-3 sm:p-4">
        {/* Category — always occupies space via min-h */}
        <div className="min-h-[20px] mb-1">
          {category && (
            <span className="inline-block text-[11px] font-medium px-2 py-0.5 rounded-full t-text-primary t-bg-hover">
              {category}
            </span>
          )}
        </div>

        {/* Name */}
        <h3 className="font-semibold t-text line-clamp-1 text-sm sm:text-[15px]">
          {name}
        </h3>

        {/* Description — fixed 2-line height */}
        <p className="t-text-muted text-xs sm:text-sm line-clamp-2 mt-1 leading-relaxed min-h-[2.5em]">
          {description || "\u00A0"}
        </p>

        {/* Price + CTA — pushed to bottom */}
        <div className="flex items-center justify-between mt-auto pt-3 gap-2">
          {showPrice && price > 0 ? (
            <span className="font-bold text-sm sm:text-base whitespace-nowrap t-text-primary">
              {price.toLocaleString("vi-VN")}đ
            </span>
          ) : (
            <span />
          )}

          <span className="inline-flex items-center text-xs sm:text-sm font-medium whitespace-nowrap gap-1 transition-all duration-300 group-hover:gap-2 t-text-primary">
            Xem chi tiết
            <IconChevronRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}

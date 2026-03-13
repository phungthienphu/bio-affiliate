"use client";

import Image from "next/image";
import Link from "next/link";
import ThemeProvider from "@/components/ThemeProvider";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui";
import { IProduct } from "@/models/product";
import { ISiteSettings } from "@/models/settings";

interface Props {
  product: IProduct;
  settings: ISiteSettings;
  relatedProducts: IProduct[];
}

export default function ProductDetailClient({
  product,
  settings,
  relatedProducts,
}: Props) {
  const handleBuyClick = async () => {
    const res = await fetch("/api/clicks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId: String(product._id) }),
    });
    const data = await res.json();
    if (data.url) {
      window.open(data.url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <ThemeProvider initialThemeId={settings.themeId}>
      <main
        className="min-h-screen"
        style={{ backgroundColor: "var(--color-background)" }}
      >
        {/* Top nav bar */}
        <nav
          className="sticky top-0 z-40 backdrop-blur-xl border-b"
          style={{
            backgroundColor: "color-mix(in srgb, var(--color-surface) 85%, transparent)",
            borderColor: "var(--color-border)",
          }}
        >
          <div className="max-w-5xl mx-auto px-4 h-12 flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-2 text-sm font-medium transition-colors"
              style={{ color: "var(--color-text-secondary)" }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Quay lại
            </Link>
          </div>
        </nav>

        {/* Product Content */}
        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fadeIn">
            {/* Image */}
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-[var(--color-surface)]">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>

            {/* Details */}
            <div className="flex flex-col justify-center space-y-5">
              {/* Category */}
              {product.category && (
                <span
                  className="inline-block self-start text-xs font-semibold px-3 py-1 rounded-full"
                  style={{
                    color: "var(--color-primary)",
                    backgroundColor: "var(--color-surface-hover)",
                  }}
                >
                  {product.category}
                </span>
              )}

              {/* Name */}
              <h1
                className="text-2xl sm:text-3xl font-bold leading-tight"
                style={{ color: "var(--color-text)" }}
              >
                {product.name}
              </h1>

              {/* Price */}
              {product.showPrice && product.price > 0 && (
                <p
                  className="text-2xl font-bold"
                  style={{ color: "var(--color-primary)" }}
                >
                  {product.price.toLocaleString("vi-VN")}đ
                </p>
              )}

              {/* Description */}
              {product.description && (
                <p
                  className="text-base leading-relaxed whitespace-pre-line"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  {product.description}
                </p>
              )}

              {/* CTA */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <Button size="lg" onClick={handleBuyClick}>
                  <span className="flex items-center gap-2">
                    Mua ngay
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </span>
                </Button>
                <Button variant="secondary" size="lg" onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: product.name,
                      url: window.location.href,
                    });
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                  }
                }}>
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                    Chia sẻ
                  </span>
                </Button>
              </div>

              {/* Stats */}
              <div
                className="flex items-center gap-4 pt-3 text-sm"
                style={{ color: "var(--color-text-muted)" }}
              >
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  {product.clicks} lượt xem
                </span>
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <section className="mt-16 animate-fadeIn" style={{ animationDelay: "0.2s" }}>
              <h2
                className="text-xl font-bold mb-6"
                style={{ color: "var(--color-text)" }}
              >
                Sản phẩm khác
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
                {relatedProducts.map((p) => (
                  <ProductCard
                    key={String(p._id)}
                    id={String(p._id)}
                    name={p.name}
                    description={p.description}
                    image={p.image}
                    price={p.price}
                    showPrice={p.showPrice}
                    category={p.category}
                  />
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Footer */}
        <footer
          className="text-center py-8 text-sm border-t"
          style={{
            color: "var(--color-text-muted)",
            borderColor: "var(--color-border)",
          }}
        >
          <p>&copy; {new Date().getFullYear()} {settings.displayName}</p>
        </footer>
      </main>
    </ThemeProvider>
  );
}

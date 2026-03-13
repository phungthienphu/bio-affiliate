"use client";

import Image from "next/image";
import Link from "next/link";
import ThemeProvider from "@/components/ThemeProvider";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";
import { Button, IconChevronLeft, IconExternalLink, IconShare, IconEye } from "@/components/ui";
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
  const handleBuyClick = () => {
    // Track click with sendBeacon (fire-and-forget, doesn't block navigation)
    navigator.sendBeacon(
      "/api/clicks",
      new Blob(
        [JSON.stringify({ productId: String(product._id) })],
        { type: "application/json" }
      )
    );
    // Redirect immediately — no async wait, works on all mobile browsers
    window.location.href = product.affiliateUrl;
  };

  const handleShare = async () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        url: window.location.href,
      });
    } else {
      await navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <ThemeProvider initialThemeId={settings.themeId}>
      <main className="min-h-screen t-bg">
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
              className="flex items-center gap-2 text-sm font-medium transition-colors t-text-sub"
            >
              <IconChevronLeft className="w-4 h-4" />
              Quay lại
            </Link>
          </div>
        </nav>

        {/* Product Content */}
        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fadeIn">
            {/* Image */}
            <div className="relative aspect-square rounded-2xl overflow-hidden t-bg-surface">
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
              {product.category && (
                <span className="inline-block self-start text-xs font-semibold px-3 py-1 rounded-full t-text-primary t-bg-hover">
                  {product.category}
                </span>
              )}

              <h1 className="text-2xl sm:text-3xl font-bold leading-tight t-text">
                {product.name}
              </h1>

              {product.showPrice && product.price > 0 && (
                <p className="text-2xl font-bold t-text-primary">
                  {product.price.toLocaleString("vi-VN")}đ
                </p>
              )}

              {product.description && (
                <p className="text-base leading-relaxed whitespace-pre-line t-text-sub">
                  {product.description}
                </p>
              )}

              {/* CTA */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <Button size="lg" onClick={handleBuyClick}>
                  <span className="flex items-center gap-2">
                    Mua ngay
                    <IconExternalLink className="w-4 h-4" />
                  </span>
                </Button>
                <Button variant="secondary" size="lg" onClick={handleShare}>
                  <span className="flex items-center gap-2">
                    <IconShare className="w-4 h-4" />
                    Chia sẻ
                  </span>
                </Button>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-4 pt-3 text-sm t-text-muted">
                <span className="flex items-center gap-1.5">
                  <IconEye className="w-4 h-4" />
                  {product.clicks} lượt xem
                </span>
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <section className="mt-16 animate-fadeIn" style={{ animationDelay: "0.2s" }}>
              <h2 className="text-xl font-bold mb-6 t-text">
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

        <Footer displayName={settings.displayName} />
      </main>
    </ThemeProvider>
  );
}

"use client";

import { useState, useMemo } from "react";
import ThemeProvider from "@/components/ThemeProvider";
import HeroSection from "@/components/HeroSection";
import SearchFilterBar, { SORT_OPTIONS } from "@/components/SearchFilterBar";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";
import { IProduct } from "@/models/product";
import { ISiteSettings } from "@/models/settings";

interface Props {
  products: IProduct[];
  settings: ISiteSettings;
}

type SortOption = "newest" | "oldest" | "popular";

export default function PublicPageClient({ products, settings }: Props) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [sort, setSort] = useState<SortOption>("newest");

  const categories = useMemo(() => {
    const cats = products.map((p) => p.category).filter(Boolean);
    return ["all", ...Array.from(new Set(cats))];
  }, [products]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (activeCategory !== "all") {
      result = result.filter((p) => p.category === activeCategory);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    switch (sort) {
      case "oldest":
        result.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
        break;
      case "popular":
        result.sort((a, b) => b.clicks - a.clicks);
        break;
      case "newest":
      default:
        result.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
    }

    return result;
  }, [products, activeCategory, search, sort]);

  const hasActiveFilter = activeCategory !== "all" || sort !== "newest";

  const resetFilters = () => {
    setSearch("");
    setActiveCategory("all");
    setSort("newest");
  };

  return (
    <ThemeProvider initialThemeId={settings.themeId}>
      <main className="min-h-screen t-bg">
        {/* Decorative background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full opacity-[0.04] blur-3xl t-bg-gradient" />
        </div>

        <HeroSection
          avatar={settings.avatar}
          displayName={settings.displayName}
          bio={settings.bio}
          socialLinks={settings.socialLinks}
        />

        <SearchFilterBar
          search={search}
          onSearchChange={setSearch}
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          sort={sort}
          onSortChange={setSort}
        />

        {/* Products Section */}
        <section className="relative max-w-5xl mx-auto px-4 pb-20 pt-4">
          {filteredProducts.length === 0 ? (
            <EmptyState
              search={search}
              hasActiveFilter={hasActiveFilter}
              onReset={resetFilters}
            />
          ) : (
            <>
              <p className="text-xs mb-4 t-text-muted">
                {filteredProducts.length} sản phẩm
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                {filteredProducts.map((product, index) => (
                  <div
                    key={String(product._id)}
                    className="animate-fadeIn"
                    style={{ animationDelay: `${0.03 * Math.min(index, 12)}s` }}
                  >
                    <ProductCard
                      id={String(product._id)}
                      name={product.name}
                      description={product.description}
                      image={product.image}
                      price={product.price}
                      showPrice={product.showPrice}
                      category={product.category}
                    />
                  </div>
                ))}
              </div>
            </>
          )}
        </section>

        <Footer displayName={settings.displayName} />
      </main>
    </ThemeProvider>
  );
}

/* ---- Empty state sub-component ---- */

function EmptyState({
  search,
  hasActiveFilter,
  onReset,
}: {
  search: string;
  hasActiveFilter: boolean;
  onReset: () => void;
}) {
  return (
    <div className="text-center py-20 animate-fadeIn">
      <div className="text-5xl mb-4">{search ? "🔍" : "🛍️"}</div>
      <p className="text-lg font-medium t-text-sub">
        {search ? `Không tìm thấy "${search}"` : "Chưa có sản phẩm nào"}
      </p>
      <p className="text-sm mt-2 t-text-muted">
        {search ? "Thử từ khóa khác nhé!" : "Hãy quay lại sau nhé!"}
      </p>
      {(search || hasActiveFilter) && (
        <button
          onClick={onReset}
          className="mt-4 text-sm font-medium cursor-pointer t-text-primary"
        >
          Xóa bộ lọc
        </button>
      )}
    </div>
  );
}

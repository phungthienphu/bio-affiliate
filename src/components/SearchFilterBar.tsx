"use client";

import { useState, useRef, useEffect } from "react";
import { IconSearch, IconClose, IconFilter } from "@/components/ui";

type SortOption = "newest" | "oldest" | "popular";

export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "newest", label: "Mới nhất" },
  { value: "oldest", label: "Cũ nhất" },
  { value: "popular", label: "Phổ biến" },
];

interface SearchFilterBarProps {
  search: string;
  onSearchChange: (value: string) => void;
  categories: string[];
  activeCategory: string;
  onCategoryChange: (cat: string) => void;
  sort: SortOption;
  onSortChange: (sort: SortOption) => void;
}

export default function SearchFilterBar({
  search,
  onSearchChange,
  categories,
  activeCategory,
  onCategoryChange,
  sort,
  onSortChange,
}: SearchFilterBarProps) {
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const hasActiveFilter = activeCategory !== "all" || sort !== "newest";
  const hasCategories = categories.length > 2;

  // Sticky detection
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsSticky(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    if (!mobileFilterOpen) return;
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setMobileFilterOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [mobileFilterOpen]);

  const resetFilters = () => {
    onCategoryChange("all");
    onSortChange("newest");
    setMobileFilterOpen(false);
  };

  return (
    <>
      {/* Sentinel */}
      <div ref={sentinelRef} className="h-0" />

      {/* Sticky bar */}
      <div
        className="sticky top-0 z-30 transition-all duration-300"
        style={{
          backgroundColor: isSticky
            ? "color-mix(in srgb, var(--color-background) 85%, transparent)"
            : "transparent",
          backdropFilter: isSticky ? "blur(12px)" : "none",
          WebkitBackdropFilter: isSticky ? "blur(12px)" : "none",
          borderBottom: isSticky
            ? "1px solid var(--color-border)"
            : "1px solid transparent",
        }}
      >
        <div className="max-w-5xl mx-auto px-4 py-3">
          {/* Row 1: Search + mobile filter toggle */}
          <div className="flex items-center gap-2">
            {/* Search Input */}
            <div className="relative flex-1">
              <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 t-text-muted" />
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                value={search}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-9 pr-9 py-2.5 rounded-xl text-sm outline-none t-bg-surface t-text border border-[var(--color-border)] transition-all duration-200"
              />
              {search && (
                <button
                  onClick={() => onSearchChange("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer t-text-muted"
                >
                  <IconClose className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Mobile-only: filter toggle button */}
            <div className="relative sm:hidden" ref={dropdownRef}>
              <button
                onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
                className="relative p-2.5 rounded-xl cursor-pointer transition-all duration-200 t-bg-surface border border-[var(--color-border)]"
                style={{
                  backgroundColor: mobileFilterOpen
                    ? "var(--color-primary)"
                    : undefined,
                  color: mobileFilterOpen ? "#fff" : "var(--color-text-secondary)",
                  borderColor: mobileFilterOpen
                    ? "var(--color-primary)"
                    : undefined,
                }}
              >
                <IconFilter className="w-5 h-5" />
                {hasActiveFilter && !mobileFilterOpen && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[var(--color-primary)]" />
                )}
              </button>

              {/* Mobile dropdown */}
              {mobileFilterOpen && (
                <FilterDropdown
                  categories={categories}
                  hasCategories={hasCategories}
                  activeCategory={activeCategory}
                  onCategoryChange={onCategoryChange}
                  sort={sort}
                  onSortChange={onSortChange}
                  hasActiveFilter={hasActiveFilter}
                  onReset={resetFilters}
                />
              )}
            </div>
          </div>

          {/* Row 2: Desktop inline filters (hidden on mobile) */}
          {(hasCategories || true) && (
            <div className="hidden sm:flex items-center justify-between gap-3 mt-3">
              {/* Category pills */}
              {hasCategories && (
                <div className="flex flex-wrap gap-1.5">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => onCategoryChange(cat)}
                      className={`t-pill ${activeCategory === cat ? "t-pill-active" : "t-pill-inactive"}`}
                    >
                      {cat === "all" ? "Tất cả" : cat}
                    </button>
                  ))}
                </div>
              )}

              {/* Sort pills */}
              <div className="flex items-center gap-1.5 ml-auto">
                {SORT_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => onSortChange(opt.value)}
                    className={`t-pill ${sort === opt.value ? "t-pill-active" : "t-pill-inactive"}`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Active filter tags */}
      {hasActiveFilter && (
        <div className="max-w-5xl mx-auto px-4 pt-3">
          <div className="flex flex-wrap items-center gap-2">
            {activeCategory !== "all" && (
              <span className="t-tag">
                {activeCategory}
                <button onClick={() => onCategoryChange("all")} className="cursor-pointer hover:opacity-70">
                  <IconClose className="w-3 h-3" />
                </button>
              </span>
            )}
            {sort !== "newest" && (
              <span className="t-tag">
                {SORT_OPTIONS.find((o) => o.value === sort)?.label}
                <button onClick={() => onSortChange("newest")} className="cursor-pointer hover:opacity-70">
                  <IconClose className="w-3 h-3" />
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </>
  );
}

/* ---- Mobile filter dropdown ---- */

function FilterDropdown({
  categories,
  hasCategories,
  activeCategory,
  onCategoryChange,
  sort,
  onSortChange,
  hasActiveFilter,
  onReset,
}: {
  categories: string[];
  hasCategories: boolean;
  activeCategory: string;
  onCategoryChange: (cat: string) => void;
  sort: SortOption;
  onSortChange: (sort: SortOption) => void;
  hasActiveFilter: boolean;
  onReset: () => void;
}) {
  return (
    <div className="absolute right-0 top-full mt-2 w-64 rounded-xl shadow-xl overflow-hidden animate-scaleIn origin-top-right t-bg-surface border border-[var(--color-border)]">
      {/* Sort */}
      <div className="p-3 space-y-2">
        <p className="text-[11px] font-semibold uppercase tracking-wider t-text-muted">
          Sắp xếp
        </p>
        <div className="flex flex-wrap gap-1.5">
          {SORT_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => onSortChange(opt.value)}
              className={`t-pill ${sort === opt.value ? "t-pill-active" : "t-pill-inactive"}`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Categories */}
      {hasCategories && (
        <div className="p-3 space-y-2 t-border-b border-t">
          <p className="text-[11px] font-semibold uppercase tracking-wider t-text-muted">
            Danh mục
          </p>
          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => onCategoryChange(cat)}
                className={`t-pill ${activeCategory === cat ? "t-pill-active" : "t-pill-inactive"}`}
              >
                {cat === "all" ? "Tất cả" : cat}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Reset */}
      {hasActiveFilter && (
        <div className="p-3 border-t" style={{ borderColor: "var(--color-border)" }}>
          <button onClick={onReset} className="text-xs font-medium cursor-pointer t-text-primary">
            Xóa bộ lọc
          </button>
        </div>
      )}
    </div>
  );
}

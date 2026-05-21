"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { Modal, Button } from "@/components/ui";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Sản phẩm" },
  { href: "/settings", label: "Cài đặt" },
];

interface AdminNavProps {
  role?: "user" | "admin";
  username?: string;
}

export default function AdminNav({ role, username }: AdminNavProps) {
  const pathname = usePathname();
  const [showLogout, setShowLogout] = useState(false);
  const isAdmin = role === "admin";

  const allNavItems = isAdmin
    ? [...NAV_ITEMS, { href: "/admin", label: "Users" }]
    : NAV_ITEMS;

  const navLink = (item: { href: string; label: string }) => {
    const isActive = pathname === item.href;
    return (
      <Link
        key={item.href}
        href={item.href}
        className="px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap"
        style={{
          color: isActive ? "var(--color-primary)" : "var(--color-text-muted)",
          backgroundColor: isActive ? "var(--color-surface-hover)" : "transparent",
        }}
      >
        {item.label}
      </Link>
    );
  };

  return (
    <>
      <nav
        className="sticky top-0 z-40 border-b"
        style={{
          backgroundColor: "var(--color-surface)",
          borderColor: "var(--color-border)",
          backdropFilter: "blur(12px)",
        }}
      >
        {/* ── Desktop: single row (sm+) ── */}
        <div className="hidden sm:flex max-w-6xl mx-auto px-4 h-14 items-center justify-between">
          <div className="flex items-center gap-0.5">
            <Link
              href="/dashboard"
              className="font-bold text-sm mr-3 px-2 py-1 rounded-lg"
              style={{ color: "var(--color-text)" }}
            >
              Admin
            </Link>
            {allNavItems.map(navLink)}
          </div>
          <div className="flex items-center gap-3">
            {username && (
              <Link
                href={`/u/${username}`}
                target="_blank"
                className="text-xs px-3 py-1.5 rounded-lg transition-colors"
                style={{
                  color: "var(--color-text-muted)",
                  backgroundColor: "var(--color-surface-hover)",
                }}
              >
                Xem bio
              </Link>
            )}
            <button
              onClick={() => setShowLogout(true)}
              className="text-xs cursor-pointer hover:text-red-500 transition-colors"
              style={{ color: "var(--color-text-muted)" }}
            >
              Đăng xuất
            </button>
          </div>
        </div>

        {/* ── Mobile: two rows (< sm) ── */}
        <div className="sm:hidden">
          {/* Row 1: Logo + icon actions */}
          <div className="flex items-center justify-between px-4 h-12">
            <Link
              href="/dashboard"
              className="font-bold text-sm"
              style={{ color: "var(--color-text)" }}
            >
              Admin
            </Link>
            <div className="flex items-center gap-1">
              {username && (
                <a
                  href={`/u/${username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center rounded-xl transition-colors"
                  style={{
                    color: "var(--color-text-muted)",
                    backgroundColor: "var(--color-surface-hover)",
                  }}
                  title="Xem bio"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </a>
              )}
              <button
                onClick={() => setShowLogout(true)}
                className="w-9 h-9 flex items-center justify-center rounded-xl cursor-pointer transition-colors hover:text-red-500"
                style={{ color: "var(--color-text-muted)" }}
                title="Đăng xuất"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            </div>
          </div>

          {/* Row 2: Nav tabs */}
          <div
            className="flex border-t overflow-x-auto"
            style={{ borderColor: "var(--color-border)" }}
          >
            {allNavItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex-1 h-9 flex items-center justify-center text-xs font-semibold border-b-2 transition-all duration-200 min-w-[64px] whitespace-nowrap"
                  style={{
                    color: isActive ? "var(--color-primary)" : "var(--color-text-muted)",
                    borderBottomColor: isActive ? "var(--color-primary)" : "transparent",
                    backgroundColor: isActive ? "var(--color-surface-hover)" : "transparent",
                  }}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Logout Modal */}
      <Modal open={showLogout} onClose={() => setShowLogout(false)} size="sm">
        <div className="text-center space-y-4">
          <div
            className="w-12 h-12 rounded-full mx-auto flex items-center justify-center"
            style={{ backgroundColor: "var(--color-surface-hover)" }}
          >
            <svg className="w-6 h-6" style={{ color: "var(--color-text-muted)" }}
              fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-semibold" style={{ color: "var(--color-text)" }}>
              Xác nhận đăng xuất
            </h3>
            <p className="text-sm mt-1" style={{ color: "var(--color-text-muted)" }}>
              Bạn có chắc chắn muốn đăng xuất không?
            </p>
          </div>
          <div className="flex gap-3 justify-center pt-2">
            <Button variant="danger" onClick={() => signOut({ callbackUrl: "/login" })}>
              Đăng xuất
            </Button>
            <Button variant="secondary" onClick={() => setShowLogout(false)}>
              Hủy
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}

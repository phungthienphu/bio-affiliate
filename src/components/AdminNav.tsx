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

export default function AdminNav() {
  const pathname = usePathname();
  const [showLogout, setShowLogout] = useState(false);

  return (
    <>
      <nav
        className="border-b backdrop-blur-md sticky top-0 z-40"
        style={{
          backgroundColor: "var(--color-surface)",
          borderColor: "var(--color-border)",
        }}
      >
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Link
              href="/dashboard"
              className="font-bold text-sm mr-4 px-2 py-1 rounded-lg"
              style={{ color: "var(--color-text)" }}
            >
              Admin
            </Link>

            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200"
                  style={{
                    color: isActive
                      ? "var(--color-primary)"
                      : "var(--color-text-muted)",
                    backgroundColor: isActive
                      ? "var(--color-surface-hover)"
                      : "transparent",
                  }}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="text-xs px-3 py-1.5 rounded-lg transition-colors"
              style={{
                color: "var(--color-text-muted)",
                backgroundColor: "var(--color-surface-hover)",
              }}
            >
              Xem trang
            </Link>
            <button
              onClick={() => setShowLogout(true)}
              className="text-xs cursor-pointer hover:text-red-500 transition-colors"
              style={{ color: "var(--color-text-muted)" }}
            >
              Đăng xuất
            </button>
          </div>
        </div>
      </nav>

      {/* Logout Confirmation Modal */}
      <Modal open={showLogout} onClose={() => setShowLogout(false)} size="sm">
        <div className="text-center space-y-4">
          <div
            className="w-12 h-12 rounded-full mx-auto flex items-center justify-center"
            style={{ backgroundColor: "var(--color-surface-hover)" }}
          >
            <svg
              className="w-6 h-6"
              style={{ color: "var(--color-text-muted)" }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
          </div>
          <div>
            <h3
              className="text-lg font-semibold"
              style={{ color: "var(--color-text)" }}
            >
              Xác nhận đăng xuất
            </h3>
            <p
              className="text-sm mt-1"
              style={{ color: "var(--color-text-muted)" }}
            >
              Bạn có chắc chắn muốn đăng xuất không?
            </p>
          </div>
          <div className="flex gap-3 justify-center pt-2">
            <Button
              variant="danger"
              onClick={() => signOut({ callbackUrl: "/login" })}
            >
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

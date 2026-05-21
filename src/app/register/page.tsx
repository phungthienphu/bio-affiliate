"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button, Input } from "@/components/ui";

export default function RegisterPage() {
  const [form, setForm] = useState({ email: "", username: "", password: "", confirm: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const update = (key: keyof typeof form, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirm) {
      setError("Mật khẩu xác nhận không khớp");
      return;
    }

    setLoading(true);
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: form.email,
        username: form.username,
        password: form.password,
      }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error || "Đăng ký thất bại");
      return;
    }

    router.push("/login?registered=1");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: "var(--color-background)" }}
    >
      <Link
        href="/"
        className="fixed top-4 left-4 z-10 flex items-center gap-1.5 text-sm font-medium px-3 py-2 rounded-xl transition-colors"
        style={{
          color: "var(--color-text-secondary)",
          backgroundColor: "var(--color-surface)",
          border: "1px solid var(--color-border)",
        }}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Trang chủ
      </Link>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-[0.06] blur-3xl"
          style={{ background: "var(--color-gradient)" }}
        />
      </div>

      <div
        className="relative max-w-sm w-full rounded-2xl shadow-xl p-8 animate-slideUp"
        style={{
          backgroundColor: "var(--color-surface)",
          border: "1px solid var(--color-border)",
        }}
      >
        <div className="text-center mb-8">
          <div
            className="w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center"
            style={{ background: "var(--color-gradient)" }}
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h1 className="text-xl font-bold" style={{ color: "var(--color-text)" }}>
            Tạo tài khoản
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--color-text-muted)" }}>
            Xây dựng trang bio affiliate của bạn
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email"
            type="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            required
          />
          <div>
            <Input
              label="Username"
              value={form.username}
              onChange={(e) => update("username", e.target.value.toLowerCase())}
              placeholder="vd: nguyenvana"
              required
            />
            <p className="text-xs mt-1" style={{ color: "var(--color-text-muted)" }}>
              Trang bio của bạn: /u/{form.username || "username"}
            </p>
          </div>
          <Input
            label="Mật khẩu"
            type="password"
            value={form.password}
            onChange={(e) => update("password", e.target.value)}
            required
          />
          <Input
            label="Xác nhận mật khẩu"
            type="password"
            value={form.confirm}
            onChange={(e) => update("confirm", e.target.value)}
            required
          />

          {error && (
            <p className="text-red-500 text-sm text-center animate-fadeIn">{error}</p>
          )}

          <Button type="submit" loading={loading} fullWidth size="lg">
            Đăng ký
          </Button>
        </form>

        <p className="text-center text-sm mt-6" style={{ color: "var(--color-text-muted)" }}>
          Đã có tài khoản?{" "}
          <Link
            href="/login"
            className="font-medium"
            style={{ color: "var(--color-primary)" }}
          >
            Đăng nhập
          </Link>
        </p>
      </div>
    </div>
  );
}

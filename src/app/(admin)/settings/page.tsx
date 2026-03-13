"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Button, Input, Textarea, Card, IconCamera } from "@/components/ui";
import LoadingSpinner from "@/components/LoadingSpinner";
import { getThemeList, Theme } from "@/lib/themes";

interface Settings {
  displayName: string;
  bio: string;
  avatar: string;
  themeId: string;
  socialLinks: {
    facebook: string;
    tiktok: string;
    instagram: string;
    youtube: string;
    zalo: string;
  };
}

const SOCIAL_FIELDS = [
  { key: "facebook" as const, label: "Facebook", placeholder: "https://facebook.com/..." },
  { key: "tiktok" as const, label: "TikTok", placeholder: "https://tiktok.com/@..." },
  { key: "instagram" as const, label: "Instagram", placeholder: "https://instagram.com/..." },
  { key: "youtube" as const, label: "YouTube", placeholder: "https://youtube.com/@..." },
  { key: "zalo" as const, label: "Zalo", placeholder: "https://zalo.me/..." },
];

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [saved, setSaved] = useState(false);

  const fetchSettings = useCallback(async () => {
    const res = await fetch("/api/settings");
    const data = await res.json();
    setSettings(data);
  }, []);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  const handleSave = async () => {
    if (!settings) return;
    setSaving(true);
    await fetch("/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingAvatar(true);
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    const data = await res.json();
    setSettings((prev) => (prev ? { ...prev, avatar: data.url } : prev));
    setUploadingAvatar(false);
  };

  const updateSocialLink = (key: keyof Settings["socialLinks"], value: string) => {
    setSettings((prev) =>
      prev
        ? { ...prev, socialLinks: { ...prev.socialLinks, [key]: value } }
        : prev
    );
  };

  const themes = getThemeList();

  if (!settings) {
    return <LoadingSpinner />;
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fadeIn">
      <h1 className="text-2xl font-bold t-text">
        Cài đặt trang
      </h1>

      {/* Profile Section */}
      <Card>
        <h2 className="text-lg font-semibold mb-4 t-text">
          Hồ sơ cá nhân
        </h2>

        {/* Avatar Upload */}
        <div className="flex items-center gap-5 mb-5">
          <label className="relative cursor-pointer group">
            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-dashed border-[var(--color-border)] group-hover:border-[var(--color-primary)] transition-colors">
              {settings.avatar ? (
                <Image
                  src={settings.avatar}
                  alt="Avatar"
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div
                  className="w-full h-full flex items-center justify-center text-2xl font-bold text-white"
                  style={{ background: "var(--color-gradient)" }}
                >
                  {settings.displayName?.[0]?.toUpperCase() || "?"}
                </div>
              )}
              {/* Overlay */}
              <div className="absolute inset-0 rounded-full bg-black/0 group-hover:bg-black/40 flex items-center justify-center transition-colors">
                <IconCamera className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarUpload}
              className="hidden"
            />
          </label>
          <div>
            <p className="text-sm font-medium t-text">Ảnh đại diện</p>
            <p className="text-xs mt-0.5 t-text-muted">
              {uploadingAvatar ? "Đang tải..." : "Click vào ảnh để thay đổi"}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <Input
            label="Tên hiển thị"
            value={settings.displayName}
            onChange={(e) =>
              setSettings((prev) =>
                prev ? { ...prev, displayName: e.target.value } : prev
              )
            }
          />
          <Textarea
            label="Giới thiệu"
            value={settings.bio}
            onChange={(e) =>
              setSettings((prev) =>
                prev ? { ...prev, bio: e.target.value } : prev
              )
            }
            rows={3}
          />
        </div>
      </Card>

      {/* Social Links */}
      <Card>
        <h2 className="text-lg font-semibold mb-4 t-text">
          Mạng xã hội
        </h2>
        <div className="space-y-3">
          {SOCIAL_FIELDS.map((field) => (
            <Input
              key={field.key}
              label={field.label}
              placeholder={field.placeholder}
              value={settings.socialLinks[field.key]}
              onChange={(e) => updateSocialLink(field.key, e.target.value)}
            />
          ))}
        </div>
      </Card>

      {/* Theme Selection */}
      <Card>
        <h2 className="text-lg font-semibold mb-4 t-text">
          Giao diện
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {themes.map((theme: Theme) => {
            const isActive = settings.themeId === theme.id;
            return (
              <button
                key={theme.id}
                onClick={() =>
                  setSettings((prev) =>
                    prev ? { ...prev, themeId: theme.id } : prev
                  )
                }
                className={`
                  relative p-4 rounded-xl border-2 cursor-pointer
                  transition-all duration-200
                  ${isActive ? "scale-[1.02] shadow-md" : "hover:scale-[1.01]"}
                `}
                style={{
                  borderColor: isActive
                    ? theme.colors.primary
                    : "var(--color-border)",
                  backgroundColor: theme.colors.background,
                }}
              >
                {/* Color dots */}
                <div className="flex gap-1.5 mb-2">
                  <div
                    className="w-5 h-5 rounded-full"
                    style={{ background: theme.colors.gradient }}
                  />
                  <div
                    className="w-5 h-5 rounded-full"
                    style={{ backgroundColor: theme.colors.surface }}
                  />
                  <div
                    className="w-5 h-5 rounded-full"
                    style={{ backgroundColor: theme.colors.text }}
                  />
                </div>
                <p
                  className="text-xs font-medium text-left"
                  style={{ color: theme.colors.text }}
                >
                  {theme.name}
                </p>
                {isActive && (
                  <div
                    className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center"
                    style={{ background: theme.colors.gradient }}
                  >
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </Card>

      {/* Save Button */}
      <div className="flex items-center gap-3 pb-8">
        <Button onClick={handleSave} loading={saving} size="lg">
          {saved ? "Đã lưu!" : "Lưu thay đổi"}
        </Button>
        {saved && (
          <span className="text-sm animate-fadeIn text-emerald-600">
            Cập nhật thành công
          </span>
        )}
      </div>
    </div>
  );
}

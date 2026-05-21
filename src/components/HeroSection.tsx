"use client";

import Image from "next/image";
import SocialLinks from "@/components/SocialLinks";

interface HeroSectionProps {
  avatar: string;
  displayName: string;
  bio: string;
  socialLinks: {
    facebook: string;
    tiktok: string;
    instagram: string;
    youtube: string;
    zalo: string;
  };
}

export default function HeroSection({
  avatar,
  displayName,
  bio,
  socialLinks,
}: HeroSectionProps) {
  const initials = displayName
    ? displayName.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()
    : "?";

  return (
    <section className="relative pt-16 sm:pt-24 pb-8 px-4 overflow-hidden">
      {/* Ambient glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 opacity-[0.12] blur-3xl pointer-events-none rounded-full"
        style={{ background: "var(--color-gradient)" }}
      />

      <div className="relative max-w-sm mx-auto text-center">
        {/* Avatar with gradient ring */}
        <div className="flex justify-center mb-5 animate-fadeIn">
          <div className="relative">
            {/* Gradient ring */}
            <div
              className="w-28 h-28 sm:w-32 sm:h-32 rounded-full p-[3px] t-shadow-md"
              style={{ background: "var(--color-gradient)" }}
            >
              <div
                className="w-full h-full rounded-full overflow-hidden"
                style={{ backgroundColor: "var(--color-surface)" }}
              >
                {avatar ? (
                  <Image
                    src={avatar}
                    alt={displayName}
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                    priority
                  />
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center text-3xl font-bold text-white"
                    style={{ background: "var(--color-gradient)" }}
                  >
                    {initials}
                  </div>
                )}
              </div>
            </div>

            {/* Online dot */}
            <div
              className="absolute bottom-1 right-1 w-4 h-4 rounded-full border-2 bg-emerald-400"
              style={{ borderColor: "var(--color-surface)" }}
            />
          </div>
        </div>

        {/* Name */}
        <div className="animate-fadeIn" style={{ animationDelay: "0.08s" }}>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-0.5 t-gradient-text">
            {displayName}
          </h1>
        </div>

        {/* Bio */}
        {bio && (
          <div className="animate-fadeIn" style={{ animationDelay: "0.16s" }}>
            <p
              className="text-sm sm:text-[15px] leading-relaxed max-w-xs mx-auto mt-3 px-2"
              style={{ color: "var(--color-text-secondary)" }}
            >
              {bio}
            </p>
          </div>
        )}

        {/* Social links */}
        <div className="mt-5 animate-fadeIn" style={{ animationDelay: "0.24s" }}>
          <SocialLinks links={socialLinks} />
        </div>

        {/* Divider */}
        <div
          className="mt-8 h-px w-24 mx-auto rounded-full opacity-60"
          style={{ background: "var(--color-gradient)" }}
        />
      </div>
    </section>
  );
}

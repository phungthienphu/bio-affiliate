"use client";

import { Avatar } from "@/components/ui";
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
  return (
    <section className="relative pt-14 sm:pt-20 pb-0 px-4">
      <div className="max-w-lg mx-auto text-center space-y-4">
        <div className="flex justify-center animate-fadeIn">
          <Avatar src={avatar} alt={displayName} size="xl" showBorder />
        </div>

        <div className="space-y-2 animate-fadeIn" style={{ animationDelay: "0.1s" }}>
          <h1 className="text-3xl sm:text-4xl font-bold t-gradient-text">
            {displayName}
          </h1>
          <p className="text-base leading-relaxed max-w-md mx-auto t-text-sub">
            {bio}
          </p>
        </div>

        <div className="animate-fadeIn" style={{ animationDelay: "0.2s" }}>
          <SocialLinks links={socialLinks} />
        </div>
      </div>
    </section>
  );
}

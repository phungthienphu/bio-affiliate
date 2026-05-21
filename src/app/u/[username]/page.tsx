import { notFound } from "next/navigation";
import dbConnect from "@/lib/mongodb";
import User from "@/models/user";
import Product from "@/models/product";
import SiteSettings from "@/models/settings";
import PublicPageClient from "@/app/(public)/PublicPageClient";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  await dbConnect();
  const user = await User.findOne({ username: username.toLowerCase(), status: "active" });
  if (!user) return { title: "Không tìm thấy" };

  const settings = await SiteSettings.findOne({ userId: user._id });
  const name = settings?.displayName || username;
  const bio = settings?.bio || "Trang affiliate cá nhân";

  return {
    title: `${name} | Bio`,
    description: bio,
    openGraph: {
      title: `${name} | Bio`,
      description: bio,
      type: "profile",
    },
  };
}

export default async function UserBioPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  await dbConnect();

  const user = await User.findOne({ username: username.toLowerCase(), status: "active" });
  if (!user) notFound();

  const [settingsDoc, products] = await Promise.all([
    SiteSettings.findOne({ userId: user._id }),
    Product.find({ userId: user._id, isActive: true }).sort({ order: 1, createdAt: -1 }),
  ]);

  const s = settingsDoc;
  const settings = {
    displayName: s?.displayName || user.username,
    bio: s?.bio || "",
    avatar: s?.avatar || "",
    themeId: s?.themeId || "rose",
    socialLinks: {
      facebook: s?.socialLinks?.facebook || "",
      tiktok: s?.socialLinks?.tiktok || "",
      instagram: s?.socialLinks?.instagram || "",
      youtube: s?.socialLinks?.youtube || "",
      zalo: s?.socialLinks?.zalo || "",
    },
  };

  return (
    <PublicPageClient
      products={JSON.parse(JSON.stringify(products))}
      settings={JSON.parse(JSON.stringify(settings))}
    />
  );
}

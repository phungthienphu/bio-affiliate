import dbConnect from "@/lib/mongodb";
import Product from "@/models/product";
import SiteSettings from "@/models/settings";
import { IProduct } from "@/models/product";
import { ISiteSettings } from "@/models/settings";
import PublicPageClient from "./PublicPageClient";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  await dbConnect();
  const settings = await SiteSettings.findOne();
  const name = settings?.displayName || "Affiliate";
  const bio = settings?.bio || "Sản phẩm yêu thích được tuyển chọn";

  return {
    title: `${name} | Sản phẩm yêu thích`,
    description: bio,
    openGraph: {
      title: `${name} | Sản phẩm yêu thích`,
      description: bio,
      type: "website",
    },
  };
}

async function getData(): Promise<{
  products: IProduct[];
  settings: ISiteSettings;
}> {
  await dbConnect();
  const [products, settingsDoc] = await Promise.all([
    Product.find({ isActive: true }).sort({ order: 1, createdAt: -1 }),
    SiteSettings.findOne(),
  ]);
  const settings = settingsDoc || (await SiteSettings.create({}));
  return {
    products: JSON.parse(JSON.stringify(products)),
    settings: JSON.parse(JSON.stringify(settings)),
  };
}

export default async function HomePage() {
  const { products, settings } = await getData();
  return <PublicPageClient products={products} settings={settings} />;
}

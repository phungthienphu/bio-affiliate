import dbConnect from "@/lib/mongodb";
import Product from "@/models/product";
import SiteSettings from "@/models/settings";
import { notFound } from "next/navigation";
import ProductDetailClient from "./ProductDetailClient";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  await dbConnect();
  const product = await Product.findById(id);
  if (!product) return { title: "Không tìm thấy sản phẩm" };

  return {
    title: product.name,
    description: product.description || `Xem chi tiết sản phẩm ${product.name}`,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [product.image],
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  await dbConnect();

  const [product, settings, relatedProducts] = await Promise.all([
    Product.findById(id),
    SiteSettings.findOne(),
    Product.find({ isActive: true, _id: { $ne: id } })
      .sort({ createdAt: -1 })
      .limit(4),
  ]);

  if (!product || !product.isActive) notFound();

  const siteSettings = settings || (await SiteSettings.create({}));

  return (
    <ProductDetailClient
      product={JSON.parse(JSON.stringify(product))}
      settings={JSON.parse(JSON.stringify(siteSettings))}
      relatedProducts={JSON.parse(JSON.stringify(relatedProducts))}
    />
  );
}

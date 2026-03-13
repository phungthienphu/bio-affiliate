import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Product from "@/models/product";
import Click from "@/models/click";

// POST: Track click vào link affiliate
export async function POST(req: NextRequest) {
  await dbConnect();
  const { productId } = await req.json();

  if (!productId) {
    return NextResponse.json({ error: "productId required" }, { status: 400 });
  }

  const product = await Product.findById(productId);
  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  // Track click
  await Click.create({
    productId,
    ip: req.headers.get("x-forwarded-for") || "",
    userAgent: req.headers.get("user-agent") || "",
    referer: req.headers.get("referer") || "",
  });

  // Increment click count
  await Product.findByIdAndUpdate(productId, { $inc: { clicks: 1 } });

  return NextResponse.json({ url: product.affiliateUrl });
}

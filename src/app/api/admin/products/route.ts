import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Product from "@/models/product";
import { auth } from "@/lib/auth";

// GET: Lấy TẤT CẢ sản phẩm (admin only - bao gồm cả inactive)
export async function GET() {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();
  const products = await Product.find().sort({ order: 1, createdAt: -1 });
  return NextResponse.json(products);
}

import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Product from "@/models/product";
import { auth } from "@/lib/auth";

// GET: Lấy danh sách sản phẩm (public)
export async function GET() {
  await dbConnect();
  const products = await Product.find({ isActive: true }).sort({ order: 1, createdAt: -1 });
  return NextResponse.json(products);
}

// POST: Tạo sản phẩm mới (admin only)
export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();
  const body = await req.json();
  const product = await Product.create(body);
  return NextResponse.json(product, { status: 201 });
}

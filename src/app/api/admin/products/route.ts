import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Product from "@/models/product";
import { auth } from "@/lib/auth";

// GET: Lấy TẤT CẢ sản phẩm của user hiện tại (bao gồm cả inactive)
export async function GET() {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();
  const products = await Product.find({ userId: session.user.id }).sort({
    order: 1,
    createdAt: -1,
  });
  return NextResponse.json(products);
}

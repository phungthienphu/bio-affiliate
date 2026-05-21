import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Product from "@/models/product";
import User from "@/models/user";
import { auth } from "@/lib/auth";

// GET: Lấy sản phẩm active của user hiện tại (cần đăng nhập)
export async function GET() {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();
  const products = await Product.find({ userId: session.user.id, isActive: true }).sort({
    order: 1,
    createdAt: -1,
  });
  return NextResponse.json(products);
}

// POST: Tạo sản phẩm mới (kiểm tra giới hạn)
export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();

  const user = await User.findById(session.user.id);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const productCount = await Product.countDocuments({ userId: session.user.id });
  if (productCount >= user.productLimit) {
    return NextResponse.json(
      { error: `Đã đạt giới hạn ${user.productLimit} sản phẩm` },
      { status: 403 }
    );
  }

  const body = await req.json();
  const product = await Product.create({ ...body, userId: session.user.id });
  return NextResponse.json(product, { status: 201 });
}

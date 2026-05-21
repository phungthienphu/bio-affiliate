import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Product from "@/models/product";
import { auth } from "@/lib/auth";

// PUT: Cập nhật sản phẩm (chỉ owner)
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();
  const { id } = await params;
  const body = await req.json();

  const product = await Product.findOne({ _id: id, userId: session.user.id });
  if (!product) {
    return NextResponse.json({ error: "Không tìm thấy sản phẩm" }, { status: 404 });
  }

  Object.assign(product, body);
  await product.save();

  return NextResponse.json(product);
}

// DELETE: Xóa sản phẩm (chỉ owner)
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();
  const { id } = await params;

  const product = await Product.findOneAndDelete({ _id: id, userId: session.user.id });
  if (!product) {
    return NextResponse.json({ error: "Không tìm thấy sản phẩm" }, { status: 404 });
  }

  return NextResponse.json({ message: "Deleted" });
}

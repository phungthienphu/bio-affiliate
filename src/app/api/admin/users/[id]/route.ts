import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/models/user";
import Product from "@/models/product";
import SiteSettings from "@/models/settings";
import { auth } from "@/lib/auth";

// PUT: Cập nhật user (productLimit, status, role)
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  await dbConnect();
  const { id } = await params;
  const { productLimit, status, role } = await req.json();

  // Không cho sửa role của chính mình
  if (id === session.user.id && role && role !== "admin") {
    return NextResponse.json(
      { error: "Không thể hạ quyền tài khoản của chính mình" },
      { status: 400 }
    );
  }

  const updates: Record<string, unknown> = {};
  if (productLimit !== undefined) updates.productLimit = productLimit;
  if (status !== undefined) updates.status = status;
  if (role !== undefined) updates.role = role;

  const user = await User.findByIdAndUpdate(id, updates, { new: true }).select("-password");
  if (!user) {
    return NextResponse.json({ error: "Không tìm thấy user" }, { status: 404 });
  }

  return NextResponse.json(user);
}

// DELETE: Xóa user và tất cả data của họ
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  await dbConnect();
  const { id } = await params;

  if (id === session.user.id) {
    return NextResponse.json(
      { error: "Không thể xóa tài khoản của chính mình" },
      { status: 400 }
    );
  }

  await Promise.all([
    User.findByIdAndDelete(id),
    Product.deleteMany({ userId: id }),
    SiteSettings.deleteOne({ userId: id }),
  ]);

  return NextResponse.json({ message: "Deleted" });
}

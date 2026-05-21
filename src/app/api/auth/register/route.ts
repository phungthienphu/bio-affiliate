import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/mongodb";
import User from "@/models/user";
import SiteSettings from "@/models/settings";

export async function POST(req: NextRequest) {
  await dbConnect();
  const { email, username, password } = await req.json();

  if (!email || !username || !password) {
    return NextResponse.json({ error: "Thiếu thông tin bắt buộc" }, { status: 400 });
  }

  if (!/^[a-z0-9_-]{3,30}$/.test(username.toLowerCase())) {
    return NextResponse.json(
      { error: "Username chỉ được chứa chữ thường, số, dấu - và _, từ 3-30 ký tự" },
      { status: 400 }
    );
  }

  if (password.length < 6) {
    return NextResponse.json({ error: "Mật khẩu tối thiểu 6 ký tự" }, { status: 400 });
  }

  const existing = await User.findOne({
    $or: [{ email: email.toLowerCase() }, { username: username.toLowerCase() }],
  });

  if (existing) {
    if (existing.email === email.toLowerCase()) {
      return NextResponse.json({ error: "Email đã được sử dụng" }, { status: 409 });
    }
    return NextResponse.json({ error: "Username đã được sử dụng" }, { status: 409 });
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  const superAdminEmail = process.env.SUPER_ADMIN_EMAIL;
  const role = email.toLowerCase() === superAdminEmail?.toLowerCase() ? "admin" : "user";

  const user = await User.create({
    email: email.toLowerCase(),
    password: hashedPassword,
    username: username.toLowerCase(),
    role,
  });

  await SiteSettings.create({ userId: user._id, displayName: username });

  return NextResponse.json({ success: true }, { status: 201 });
}

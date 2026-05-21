import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import SiteSettings from "@/models/settings";
import { auth } from "@/lib/auth";

// GET: Lấy settings của user hiện tại (cần đăng nhập)
export async function GET() {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();
  let settings = await SiteSettings.findOne({ userId: session.user.id });
  if (!settings) {
    settings = await SiteSettings.create({ userId: session.user.id });
  }
  return NextResponse.json(settings);
}

// PUT: Cập nhật settings của user hiện tại
export async function PUT(req: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();
  const body = await req.json();

  let settings = await SiteSettings.findOne({ userId: session.user.id });
  if (!settings) {
    settings = await SiteSettings.create({ userId: session.user.id, ...body });
  } else {
    Object.assign(settings, body);
    await settings.save();
  }

  return NextResponse.json(settings);
}

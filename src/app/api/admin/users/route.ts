import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/models/user";
import Product from "@/models/product";
import { auth } from "@/lib/auth";

// GET: Lấy danh sách tất cả users (super admin only)
export async function GET() {
  const session = await auth();
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  await dbConnect();
  const users = await User.find().select("-password").sort({ createdAt: -1 });

  const usersWithStats = await Promise.all(
    users.map(async (user) => {
      const productCount = await Product.countDocuments({ userId: user._id });
      const totalClicks = await Product.aggregate([
        { $match: { userId: user._id } },
        { $group: { _id: null, total: { $sum: "$clicks" } } },
      ]);
      return {
        ...user.toObject(),
        productCount,
        totalClicks: totalClicks[0]?.total || 0,
      };
    })
  );

  return NextResponse.json(usersWithStats);
}

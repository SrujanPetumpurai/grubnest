import { connectToDB } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { Items } from "@/app/lib/models/user";
export async function GET(req: NextRequest) {
  try {
    await connectToDB();

    const { searchParams } = new URL(req.url);
    const q = (searchParams.get("q") || "").trim();

    const match = q
      ? {
          $or: [
            { name: { $regex: q, $options: "i" } },
            { category: { $regex: q, $options: "i" } },
          ],
        }
      : {};

    const items = await Items.find(match)
      .limit(24)
      .select("name image cost category discount rating measurement");

    return NextResponse.json({ items });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

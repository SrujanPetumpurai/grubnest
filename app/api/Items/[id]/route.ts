import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { connectToDB } from "@/app/lib/db";
import { Items } from "@/app/lib/models/user";

export const runtime = "nodejs";

export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params;
    await connectToDB();
    const item = await Items.findOne({ _id: id });

    if (!item) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    return NextResponse.json(item);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

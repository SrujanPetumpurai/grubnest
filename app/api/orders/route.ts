import { getServerSession } from "next-auth";
import { NEXT_AUTH_CONFIG } from "@/app/lib/auth";
import { NextResponse } from "next/server";
import { connectToDB } from "@/app/lib/db";
import { Orders } from "@/app/lib/models/user";

export async function GET() {
  const session = await getServerSession(NEXT_AUTH_CONFIG);

  if (!session?.user?.id) {
    return NextResponse.json(
      { message: "Login to get your previous order details" },
      { status: 401 }
    );
  }

  await connectToDB();

  const orders = await Orders.find({ userId: session.user.id })
    .populate("items.itemId")
    .sort({ createdAt: -1 });

  return NextResponse.json(orders, { status: 200 });
}

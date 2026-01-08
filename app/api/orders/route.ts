import { getServerSession } from "next-auth";
import { NEXT_AUTH_CONFIG } from "@/app/lib/auth";
import { NextResponse,NextRequest } from "next/server";
import { connectToDB } from "@/app/lib/db";
import { Orders } from "@/app/lib/models/user";
import Razorpay from 'razorpay'
import { env } from "process";
//To get previous order details
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

//To create a order
const razorpay = new Razorpay({
  key_id:process.env.NEXT_PUBLIC_RAZORPAY_ID!,
  key_secret: process.env.RAZORPAY_SECRET!
});

  export async function POST(req: Request) {
    try {
      const { amount } = await req.json();
      console.log('razorpay details')
      console.log(process.env.NEXT_PUBLIC_RAZORPAY_ID);
      console.log(process.env.RAZORPAY_SECRET);

      const order = await razorpay.orders.create({
        amount: amount * 100,
        currency: "INR",
      });

      return NextResponse.json({
        razorpayOrderId: order.id,
        amount: order.amount,
      });
    } catch (err) {
      console.error("ORDER ERROR:", err);
      return NextResponse.json(
        { error: "Failed to create order" },
        { status: 500 }
      );
    }
  }
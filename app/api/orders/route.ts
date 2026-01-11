import { getServerSession } from "next-auth";
import { NEXT_AUTH_CONFIG } from "@/app/lib/auth";
import { NextResponse } from "next/server";
import { connectToDB } from "@/app/lib/db";
import { Orders } from "@/app/lib/models/user";
import Razorpay from 'razorpay'
import { env } from "process";
import mongoose from "mongoose";

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
    .populate("items.itemId","name image ")
    .sort({ createdAt: -1 });

  return NextResponse.json(orders, { status: 200 });
}

//To create a order
export async function POST(req: Request) {
  const userSession = await getServerSession(NEXT_AUTH_CONFIG)
  if (!userSession?.user?.id) {
    return NextResponse.json(
      { message: "Login to get your previous order details" },
      { status: 401 }
    );
  }
  const razorpay = new Razorpay({
    key_id:process.env.NEXT_PUBLIC_RAZORPAY_ID!,
    key_secret: process.env.RAZORPAY_SECRET!
  });

  await connectToDB();
  interface Item {
  name: string
  cost: number
  discount: string | null
  category: string
  image: string
  itemId: string
  quantity: number
  isFeatured:boolean
}
      const session = await mongoose.startSession()
      session.startTransaction();
      try {
        const { amount,items } = await req.json();
        const order = await razorpay.orders.create({
          amount: amount * 100,
          currency: "INR",
        });
        const orderItems = items.map((i:Item)=>{
          const discount = Number(i.discount?.replace('%','')??0)
         return( {
          itemId:i.itemId,
          quantity:i.quantity,
          priceAtPurchase:(i.cost-((discount*i.cost)/100))
        })
      })
        await Orders.create([{
          userId:userSession.user.id,
          items:orderItems,
          totalAmount:amount,
          status:'created',
          orderId:order.id,
          deliveryAddress:"No address"
        }],{session})
        await session.commitTransaction();
        session.endSession();
        return NextResponse.json({
          razorpayOrderId: order.id,
          amount: order.amount,
        });
      } catch (err) {
        await session.abortTransaction(); 
        session.endSession();
        console.error("ORDER ERROR:", err);
        return NextResponse.json(
          { error: "Failed to create order" },
          { status: 500 }
        );
      }finally{
        session.endSession();
      }
    }
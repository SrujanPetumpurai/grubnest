import { Orders } from "@/app/lib/models/user"
import { connectToDB } from "@/app/lib/db"
import { NEXT_AUTH_CONFIG } from "@/app/lib/auth"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
      const { id } = await context.params
      console.log("this is orders id")
      console.log("And this is the orderId",id)
    const session = await getServerSession(NEXT_AUTH_CONFIG)
    if (!session?.user?.id) {
      return NextResponse.json(
        {
          error: {
            code: "UNAUTHORIZED",
            message: "Please login to view this order",
          },
        },
        { status: 401 }
      )
    }

    await connectToDB()
    const order = await Orders.findOne({ orderId:id })

    if (!order) {
      return NextResponse.json(
        {
          error: {
            code: "ORDER_NOT_FOUND",
            message: "Order does not exist",
          },
        },
        { status: 404 }
      )
    }
    return NextResponse.json({
        orderId: order.orderId,
        paymentId: order.paymentId,
        totalAmount: order.totalAmount,
        deliveryAddress: order.deliveryAddress,
        status: order.status,
    })
  } catch (err) {
    console.error("ORDER_FETCH_ERROR", err)

    return NextResponse.json(
      {
        error: {
          code: "SERVER_ERROR",
          message: "Failed to fetch order details",
        },
      },
      { status: 500 }
    )
  }
}

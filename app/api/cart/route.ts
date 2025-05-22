import { connectToDB } from "@/app/lib/db";
import {Cart} from "@/app/lib/models/user"
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
import { NEXT_AUTH_CONFIG } from "@/app/lib/auth"; 


export async function POST(req:NextRequest) {
  await connectToDB();
  const session = await getServerSession(NEXT_AUTH_CONFIG);

  if (!session || !session.user) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  const { itemId} = await req.json();
  const userId = session.user.id;

  if (!itemId) {
    return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
  }

  let cart = await Cart.findOne({ userId });

  if (!cart) {
    cart = new Cart({ userId, items: [] });
  }

  const existingItem = cart.items.find((item:any) => item.itemId.toString() === itemId);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.items.push({ itemId, quantity:1 });
  }

  await cart.save();
  return new Response(JSON.stringify({ message: "Item added to cart", cart }), { status: 200 });
}

export async function GET(req:NextRequest) {
  await connectToDB();
  const session = await getServerSession( NEXT_AUTH_CONFIG );

  if (!session || !session.user) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  const userId = session.user.id;
  try{
    const cart = await Cart.findOne({ userId }).populate('items.itemId');
    const items = cart.items.map((item:{itemId:any,quantity:number})=>({
      name: item.itemId.name,
      image: item.itemId.image,
      cost: item.itemId.cost,
      type: item.itemId.type,
      quantity:item.quantity,
      itemId:item.itemId._id
  }));

    return Response.json({items,cart})
  }
  catch (error) {
    if (error instanceof Error) {
      return new Response(error.message, { status: 500 });
    }
    return new Response('An unknown error occurred', { status: 500 });
  }
  
  
  
}

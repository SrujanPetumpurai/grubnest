import { connectToDB } from "@/app/lib/db";
import {Cart} from "@/app/lib/models/user"
import { getServerSession } from "next-auth";
import { NextRequest,NextResponse } from "next/server";
import { NEXT_AUTH_CONFIG } from "@/app/lib/auth"; 

//Adding item into the cart && creating a new cart if cart doesn't exist
export async function POST(req: NextRequest) {
  const session = await getServerSession(NEXT_AUTH_CONFIG);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectToDB();
  const { id, quantity } = await req.json();
  const userId = session.user.id;

  if (!id) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  // remove item if quantity=0
  if (quantity === 0) {
    await Cart.updateOne({ userId }, { $pull: { items: { itemId: id } } });
  } else {
    // add or update item quantity
    await Cart.updateOne(
      { userId, "items.itemId": id },
      { $set: { "items.$.quantity": quantity } }
    );

    // if not present, push new item
    await Cart.updateOne(
      { userId, "items.itemId": { $ne: id } },
      { $push: { items: { itemId: id, quantity } } },
      { upsert: true }
    );
  }

  const updated = await Cart.findOne({ userId }).populate("items.itemId");
  return NextResponse.json({ message: "Item added to cart", cart: updated });
}

//Sending the user cart
export async function GET(req:NextRequest) {
  await connectToDB();
  const session = await getServerSession( NEXT_AUTH_CONFIG );

  if (!session || !session.user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;
  var cart = await Cart.findOne({ userId }).populate('items.itemId');
  if(!cart){
    cart = await Cart.create({userId,items:[]})
    return Response.json({message:'no items yet',items:[]},{status:200})
  }
  if(cart.items.length>0){
    const items = cart.items.map((item:{itemId:any,quantity:number})=>({
      name: item.itemId.name,
      image: item.itemId.image,
      cost: item.itemId.cost,
      category: item.itemId.category,
      quantity:item.quantity,
      discount:item.itemId.discount,
      itemId:item.itemId._id
     }));
    return Response.json({items})
  }
  else{
    return Response.json({items:[]})
  }
  }

//Delete Item
export async function DELETE(req: NextRequest) {
  await connectToDB();
  const session = await getServerSession(NEXT_AUTH_CONFIG);

  if (!session?.user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;
  const { itemId } = await req.json(); 

  if (!itemId) {
    return Response.json({ error: "Item ID required" }, { status: 400 });
  }

  try {
    const updatedCart = await Cart.findOneAndUpdate(
      { userId },
      { $pull: { items: { itemId } } },
      { new: true }
    ).populate("items.itemId");

    if (!updatedCart) {
      return Response.json({ error: "Cart not found" }, { status: 404 });
    }

    return Response.json({ message: "Item removed successfully", cart: updatedCart });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Failed to remove item" }, { status: 500 });
  }
}

  

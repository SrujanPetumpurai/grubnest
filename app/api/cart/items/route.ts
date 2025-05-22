import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { NEXT_AUTH_CONFIG } from "@/app/lib/auth";
import { connectToDB } from "@/app/lib/db";
import {Cart} from '@/app/lib/models/user'
export async function POST(req:NextRequest){
    await connectToDB();
   const session= await getServerSession(NEXT_AUTH_CONFIG)
   const body = await req.json()
   const {itemId,value}=body
   console.log(itemId,value,"ItemId and value")
   if(!itemId || !value){
    return Response.json("No itemId or value found",{status:400})
   }
   try{
    const cart = await Cart.findOne({userId:session?.user.id}).populate('items.itemId');
    if (!cart){
         throw new Error("couldn find the cart")
    }
    let updatedQuantity = 0;
    if (value == '+') {
        cart.items.forEach((item:any) => {
          if (item.itemId._id.toString() === itemId) {
            item.quantity += 1;
            updatedQuantity=item.quantity
            cart.save()
          }
        });
      } else if (value =='-') {
        cart.items.forEach((item:any) => {
          if (item.itemId._id.toString() === itemId) {
            item.quantity = Math.max(0, item.quantity - 1); // Prevents negative quantity
            updatedQuantity = item.quantity
            cart.save()
          }
        });
      }
      return Response.json({'quantity changed':updatedQuantity})
    
   }catch(error){
    return Response.json("Coulnd't increment/decrement the value of the product",{status:500})
   }
}
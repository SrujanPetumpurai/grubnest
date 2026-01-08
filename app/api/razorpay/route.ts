import { NextRequest,NextResponse } from "next/server";
import { redirect } from "next/navigation";
import { Orders } from "@/app/lib/models/user";
import crypto from 'crypto'
type data ={
    orderId:string
}
export async function POST(req:NextRequest){
    const{razorpay_payment_id,razorpay_order_id,razorpay_signature}= await req.json();
    try{
        const order = await Orders.findOne({orderId:razorpay_order_id})
        if(!order) return NextResponse.json({message:"Order with orderId doesn't exist"},{status:404})

        const generatedSignature =  crypto
                                       .createHmac('sha256',process.env.RAZORPAY_SECRET!)
                                       .update(order.orderId+'|'+razorpay_payment_id)
                                       .digest('hex');

        if(generatedSignature!=razorpay_signature){
            return NextResponse.json({message:"Signature doesn't match"},{status:400})
        }
    }catch(e){
        return NextResponse.json({message:"Error while verifying the signature"})
    }
   
}
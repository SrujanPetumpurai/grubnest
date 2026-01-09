import { NextRequest,NextResponse } from "next/server";
import { Orders } from "@/app/lib/models/user";
import crypto from 'crypto'
type data ={
    orderId:string
}
export async function POST(req:NextRequest){
    const formData = await req.formData();
    console.log(Object.fromEntries(formData));
    console.log("Razorpay is hitting the payment confirmation api")
    const razorpay_payment_id = formData.get("razorpay_payment_id") as string;
    const razorpay_order_id = formData.get("razorpay_order_id") as string;
    const razorpay_signature = formData.get("razorpay_signature") as string;
    try{
        const order = await Orders.findOne({orderId:razorpay_order_id})
        if(!order) return NextResponse.json({message:"Order with orderId doesn't exist"},{status:404})

        const generatedSignature =  crypto
                                       .createHmac('sha256',process.env.RAZORPAY_SECRET!)
                                       .update(order.orderId+'|'+razorpay_payment_id)
                                       .digest('hex');

        if(generatedSignature!=razorpay_signature){
            await Orders.findOneAndUpdate({orderId:razorpay_order_id},{
                $set:{
                    status:'failed'
                }
            })
            return NextResponse.json({message:"Signature doesn't match"},{status:400})  
        }
        await Orders.findOneAndUpdate({orderId:razorpay_order_id},{
            $set:{
                paymentId:razorpay_payment_id,
                status:'captured',
            }
        })
        return NextResponse.redirect(new URL("/payment", req.url));
    }catch(e){
            if(razorpay_order_id){
                await Orders.findOneAndUpdate({orderId:razorpay_order_id},{
                $set:{
                    status:'failed'
                }
            })
            }
        return NextResponse.json({message:"Error while verifying the signature"})
    }
   
}
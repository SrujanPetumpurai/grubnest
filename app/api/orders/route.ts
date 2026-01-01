import { getServerSession } from "next-auth";
import { NEXT_AUTH_CONFIG } from "@/app/lib/auth";
import { NextResponse } from "next/server";
import { connectToDB } from "@/app/lib/db";
export async function GET(){
    const session =await getServerSession(NEXT_AUTH_CONFIG);
    if(!session?.user){
        return NextResponse.json({message:"Login to get your previous order details"},{status:400})
    }
    await connectToDB();
    
}
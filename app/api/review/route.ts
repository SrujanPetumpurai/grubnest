import { connectToDB } from "@/app/lib/db";
import { NextRequest,NextResponse } from "next/server";
import { Reviews, Users } from "@/app/lib/models/user";
//To get all the reviews
export async function GET(req:NextRequest){
    await connectToDB();
    try{
    const reviews = await Reviews.find({}).limit(7);
    return NextResponse.json({message:"Here are the reviews",reviews},{status:200})
}catch(e:any){
    return NextResponse.json({message:"Issue at the backend unable to retrive reviews",error:e.message},
        {status:500}
    )
}
}

//To Create review
export async function POST(req:NextRequest){
     await connectToDB()
     const body = await req.json();
     const {comment,rating,userId,itemId} = body
     try{
        const user = await Users.findById({userId})
        const review = await Reviews.create({
            comment,
            rating,
            userId,
            itemId
        })
     }catch(e:any){

     }

}
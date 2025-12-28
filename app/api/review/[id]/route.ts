import { NextRequest } from "next/server";
import { connectToDB } from "@/app/lib/db";
import { Reviews } from "@/app/lib/models/user";

export async function GET(req:NextRequest,{ params }: { params: Promise<{ id: string }> }){
    const {id}= await params;
    if(!id){
        return Response.json('No id given')
    }
    await connectToDB();
    try{
    const item =await Reviews.findOne({itemId:id})
    if(!item.rating){
        return Response.json({message:"no rating found for this item"})
    }
    return Response.json(item.rating)
    
}catch(e){
    return Response.json("Could not give u rating")
}
}
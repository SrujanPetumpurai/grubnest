import { connectToDB } from "@/app/lib/db";
import { Items } from "@/app/lib/models/user";
import { NextRequest } from "next/server";
//to get all Items
export async function GET(req:NextRequest){
    await connectToDB();
    const searchParams = req.nextUrl.searchParams;
    const featured = searchParams.get('featured');
    try{
        const items = await Items.find(
            featured=='true'?{isFeatured:'true'}:{}
        );
        return Response.json(items,{status:200})
    }catch(e){
        return Response.json({error:"Unable to fetch all Items"},{status:400})
    }
}
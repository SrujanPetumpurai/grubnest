import { connectToDB } from "@/app/lib/db";
import { Items } from "@/app/lib/models/user";
//to get all Items
export async function GET(){
    await connectToDB();
    try{
        const items = await Items.find();
        return Response.json(items,{status:200})
    }catch(e){
        return Response.json({error:"Unable to fetch all Items"},{status:400})
    }
}
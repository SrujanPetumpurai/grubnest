import { NextResponse,NextRequest } from "next/server";
import { connectToDB } from "@/app/lib/db";
import { Items } from "@/app/lib/models/user";

export async function GET(
  req: Request,
  {params}: { params: Promise<{ category: string }> }
) {
  const { category } = await params

  await connectToDB();
  var items
  try{
    if(category=='all'){
      items = await Items.find()
    }else{
      items = await Items.find({category})
    }
  }catch(e){
    return console.log("Unable to fetch the items from backend",category)
  }
  
    category === 'all' ? await Items.find() : await Items.find({ category });

   return NextResponse.json({message:'Here are the Items' ,items },{status:200});
}

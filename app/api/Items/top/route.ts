import { connectToDB } from "@/app/lib/db";
import { Reviews } from "@/app/lib/models/user";
export async function GET(){
    await connectToDB();
    try{
    const items = await Reviews.aggregate([
        { $match: { rating: 5 } }, 
        {
          $lookup: {
            from: 'items',
            localField: 'itemId',
            foreignField: '_id',
            as: 'itemDetails'
          }
        },
        { $unwind: '$itemDetails' },
        { $replaceRoot: { newRoot: '$itemDetails' } }
      ]);
      return Response.json(items,{status:200})
    }
    catch(e){
      console.log('unable to fetch top rated items',e)
    }
      
}
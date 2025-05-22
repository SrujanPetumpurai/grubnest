import { connectToDB } from "@/app/lib/db";
import { Reviews } from "@/app/lib/models/user";
export async function GET(){
    await connectToDB();
    try{
    const items = await Reviews.aggregate([
        { $match: { rating: 5 } }, // Find reviews with 5-star ratings
        {
          $lookup: {
            from: 'items',
            localField: 'itemId',
            foreignField: '_id',
            as: 'itemDetails'
          }
        },
        { $unwind: '$itemDetails' }, // Flatten the result
        { $replaceRoot: { newRoot: '$itemDetails' } }
      ]);
      return Response.json(items,{status:200})
    }
    catch(e){
        throw new Error('unable to fetch top rated items')
    }
      
}
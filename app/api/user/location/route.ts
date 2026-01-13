import { getServerSession } from "next-auth"
import { NextResponse,NextRequest } from "next/server";
import { NEXT_AUTH_CONFIG } from "@/app/lib/auth";
import { connectToDB } from "@/app/lib/db";
import { Users } from "@/app/lib/models/user";
export async function POST(req:NextRequest){
    const session = await getServerSession(NEXT_AUTH_CONFIG);
        if (!session?.user?.id) {
        return NextResponse.json(
          { message: "User not logged in" },
          { status: 401 }
        );
      }
      await connectToDB();
      try{
        const data = await req.json()
        await Users.findOneAndUpdate(
            {_id:session.user.id},
            {$set:{location:data.location}}
        )
        console.log('saving cords',data)
        return NextResponse.json({message:"Location save"},{status:200})
      }catch(e){
        return NextResponse.json({message:"Couldn't able to store user location coords"},{status:500})
      }
}
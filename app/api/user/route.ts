import { getServerSession } from "next-auth"
import { NextResponse,NextRequest } from "next/server";
import { NEXT_AUTH_CONFIG } from "@/app/lib/auth";
import { connectToDB } from "@/app/lib/db";
import { Users } from "@/app/lib/models/user";

//Get user Details
export async function GET() {
    const session = await getServerSession(NEXT_AUTH_CONFIG);
    if (!session?.user?.id) {
    return NextResponse.json(
      { message: "User not logged in" },
      { status: 401 }
    );
  }

    await connectToDB();
    try{
    const user = await Users.findById(session.user.id)
   const userAddress = {
    phNumber:user.phNumber??'',
    surname:user.surname??'',
    email:user.email,
    address:{
        houseNo: user.address?.houseNo ?? '',
        street: user.address?.street ?? '',
        landmark: user.address?.landmark ?? '',
        city: user.address?.city ?? '',
        state: user.address?.state ?? '',
        zipcode: user.address?.zipcode ?? '',
    }
  
};

    return NextResponse.json(userAddress)
    }catch(e){
        return NextResponse.json({message:"Coudln't find user"},{status:400})
    }

}

//Save user Address
export async function POST(req:NextRequest){
  const session = await getServerSession(NEXT_AUTH_CONFIG);
    if (!session?.user?.id) {
    return NextResponse.json(
      { message: "User not logged in" },
      { status: 401 }
    );
  }

    await connectToDB();
    const details = await req.json();
    const user = await Users.updateOne({_id:session.user.id},{$set:{
      phNumber:details.phNumber,
      address:{
        houseNo:details.houseNo,
        street:details.street,
        landmark:details.landmark,
        city:details.city,
        state:details.state,
        zipcode:details.zipcode,
        deliveryInstruction:details.deliveryInstruction
      }
    }})
    return Response.json({message:"Saved Address"},{status:200})
}
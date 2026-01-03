import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import {connectToDB} from "../../../lib/db"; 
    import {Users} from "../../../lib/models/user";

export async function POST(req: Request) {
    try {
        await connectToDB();
        console.log("reached the post")
        const { email, password,name,surname } = await req.json();
        const existingUser = await Users.findOne({ email });

        if (existingUser) {
            return NextResponse.json({ message: "User already exists" }, { status: 400 });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await Users.create({ email, password: hashedPassword,name,surname });

        return NextResponse.json({ message: "User created" }, { status: 201 });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Something went wrong" ,error:String(error)}, { status: 500 });
    }
}

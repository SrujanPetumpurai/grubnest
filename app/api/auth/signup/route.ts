import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import {connectToDB} from "../../../lib/db"; // your Mongo connection
    import {Users} from "../../../lib/models/user"; // your User schema

export async function POST(req: Request) {
    try {
        await connectToDB();
        const { email, password,name } = await req.json();
        const existingUser = await Users.findOne({ email });

        if (existingUser) {
            return NextResponse.json({ message: "User already exists" }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await Users.create({ email, password: hashedPassword,name });

        return NextResponse.json({ message: "User created" }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
    }
}

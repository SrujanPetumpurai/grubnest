import { NextResponse } from "next/server";
import { connectToDB} from "@/app/lib/db"; // Assuming you have a DB connection file
import { Orders } from "@/app/lib/models/user";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get("userId");

        if (!userId) {
            return NextResponse.json({ error: "User ID is required" }, { status: 400 });
        }

        await connectToDB();
        const orders = await Orders.find({ userId });

        return NextResponse.json(orders);
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const { count, date, cost, userId } = await req.json();

        if (!count || !date || !cost || !userId) {
            return NextResponse.json({ error: "Missing fields" }, { status: 400 });
        }

        await connectToDB();

        const newOrder = await Orders.create({ count, date, cost, userId });

        return NextResponse.json(newOrder, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
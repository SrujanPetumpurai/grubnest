import { NextResponse,NextRequest } from "next/server";
import { connectToDB } from "@/app/lib/db";
import { Items } from "@/app/lib/models/user";

export async function GET(req: NextRequest,{ params }: { params: Promise<{ id: string }> }) {
    try {
       const { id } = await params;
       await connectToDB();
        const item = await Items.findOne({ _id: id });
        console.log(id, "this is params.id")
        if (!item) {
            return NextResponse.json({ error: "Item not found" }, { status: 404 });
        }

        return NextResponse.json(item);
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
import { connectToDB } from "@/app/lib/db";
import {Items} from "@/app/lib/models/user";
import { NextRequest } from "next/server";

export async function GET(req:NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('query');

    if (!query) {
      return new Response(JSON.stringify({ error: 'Query parameter is required' }), { status: 400 });
    }

    await connectToDB();

    const results = await Items.find({
      name: { $regex: query, $options: 'i' }
    }, 'name type'); // Only returning name and type for suggestions

    return new Response(JSON.stringify(results), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify('Eeeeh Error'), { status: 500 });
  }
}

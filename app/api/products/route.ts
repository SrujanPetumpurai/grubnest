import { connectToDB } from '@/app/lib/db';
import { Items } from '@/app/lib/models/user';
import { NextRequest } from 'next/server';

export async function GET(req:NextRequest) {
  try {
    await connectToDB();
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('query');

    if (!query) {
      return new Response(JSON.stringify({ error: 'Query parameter is required' }), { status: 400 });
    }

    const items = await Items.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { type: { $regex: query, $options: 'i' } },
      ],
    });

    return new Response(JSON.stringify(items), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}

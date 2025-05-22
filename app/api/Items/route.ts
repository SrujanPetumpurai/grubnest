
import { NextResponse } from 'next/server';
import { connectToDB } from '@/app/lib/db';
import { Items } from '@/app/lib/models/user';

export async function GET() {
  try {
    await connectToDB();
    const items = await Items.find({});
    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

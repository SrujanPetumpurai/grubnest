import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { payment_id } = await req.json();

  const res = await fetch(`https://www.instamojo.com/api/1.1/payments/${payment_id}`, {
    headers: {
      'X-Api-Key': process.env.INSTAMOJO_API_KEY!,
      'X-Auth-Token': process.env.INSTAMOJO_AUTH_TOKEN!,
    },
  });

  const data = await res.json();

  if (data.success && data.payment.status === 'Credit') {
    // You can save the order/payment to DB here
    return NextResponse.json({ verified: true, payment: data.payment });
  } else {
    return NextResponse.json({ verified: false, error: 'Payment not confirmed' }, { status: 400 });
  }
}

import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();
  const { amount, purpose, buyer_name, email, redirect_url } = body;

  const formData = new URLSearchParams();
  formData.append('amount', amount.toString());
  formData.append('purpose', purpose);
  formData.append('buyer_name', buyer_name);
  formData.append('email', email);
  formData.append('redirect_url', redirect_url);

  const response = await fetch('https://www.instamojo.com/api/1.1/payment-requests/', {
    method: 'POST',
    headers: {
      'X-Api-Key': process.env.INSTAMOJO_API_KEY!,
      'X-Auth-Token': process.env.INSTAMOJO_AUTH_TOKEN!,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formData.toString(),
  });

  const data = await response.json();

  if (data.success) {
    return NextResponse.json({ paymentUrl: data.payment_request.longurl });
  } else {
    return NextResponse.json({ error: data.message || 'Payment creation failed' }, { status: 500 });
  }
}

'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ConfirmationPage() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'failed'>('loading');

  useEffect(() => {
    const paymentStatus = searchParams.get('payment_status');
    if (paymentStatus === 'Credit') {
      setStatus('success');
    } else {
      setStatus('failed');
    }

  }, [searchParams]);

  return (
    <div className="p-6">
      { status === 'loading' && <p>Checking payment status...</p>}
      {status === 'success' && (
        <div className="text-green-600 text-xl font-bold">Payment Successful! 🎉</div>
      )}
      {status === 'failed' && (
        <div className="text-red-600 text-xl font-bold">Payment Failed or Cancelled.</div>
      )}
    </div>
  );
}

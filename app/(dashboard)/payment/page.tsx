'use client'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { useRouter } from 'next/navigation'
type Order = {
  orderId: string
  paymentId?: string
  totalAmount: number
  deliveryAddress: string
  status: string
}
export default function Payment(){
  return(
  <Suspense>
    <PaymentInner></PaymentInner>
  </Suspense>
  )
}
 function PaymentInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const status = searchParams.get('status')
  const orderId = searchParams.get('orderId')
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!orderId) return
    async function getOrderDetails() {
      const res = await fetch(`/api/orders/${orderId}`)
      const data = await res.json()
      setOrder(data)
      setLoading(false)
    }
    getOrderDetails()
  }, [orderId])

  if (!status) return null
  if (loading) return <div className="p-10 text-center">Loading…</div>

  const isSuccess = status === 'success'

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 space-y-4">
        <div
          className={`text-center text-2xl font-semibold ${
            isSuccess ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {isSuccess ? 'Payment Successful' : 'Payment Failed'}
        </div>

        <div className="border-t pt-4 space-y-2 text-sm">
          <Detail label="Order ID" value={order?.orderId} />
          <Detail label="Payment ID" value={order?.paymentId ?? '—'} />
          <Detail label="Total Amount" value={`₹${order?.totalAmount}`} />
          <Detail label="Delivery Address" value={order?.deliveryAddress} />
          <Detail label="Order Status" value={order?.status} />
        </div>

          <button onClick={()=>{
            isSuccess?router.push('/orders'):router.push('/checkout')
          }}
            className={`w-full py-2 rounded-lg text-white ${
              isSuccess ? 'bg-green-600' : 'bg-red-600'
            }`}
          >
            {isSuccess ? 'Go to Orders' : 'Retry Payment'}
          </button>
      </div>
    </div>
  )
}

function Detail({ label, value }: { label: string; value?: string }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-gray-500">{label}</span>
      <span className="font-medium text-right">{value}</span>
    </div>
  )
}

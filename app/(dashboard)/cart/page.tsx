'use client'
import { useEffect, useState } from 'react'
import CartItem from '@/app/components/CartItem'
import OrderSummary from '@/app/components/OrderSummary'
import Link from 'next/link'
export interface Item {
  name: string
  cost: number
  discount: string | null
  category: string
  image: string
  itemId: string
  quantity: number
  isFeatured:boolean
}

export function CartItems({items}:{items:Item[]}) {
  

  return (
    <div>
    
      <div className="border mt-16 w-full max-w-[500px] rounded-xl flex flex-col items-center">
      {items.map(item => (
        <CartItem
          key={item.itemId}
          image={item.image}
          id={item.itemId}
          quantity={item.quantity}
          name={item.name}
          cost={item.cost}
          discount={item.discount}
          category={item.category}
        />
      ))}
    </div>
    
    </div>
  )
}

export default function Cart() {
  const [items, setItems] = useState<Item[]>([])

  useEffect(() => {
    const getCartItems = async () => {
      try {
        const res = await fetch('/api/cart', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        })

        const body = await res.json()

        if (!res.ok) {
          console.log(body.error)
          console.log(body.message)
          return
        }

        if (body.items?.length) {
          setItems(body.items)
        }
      } catch (err) {
        console.error('Failed to fetch cart items', err)
      }
    }

    getCartItems()
  }, [])
  return (
    <div
      style={{ backgroundColor: '#FBF9F5' }}
      className="w-vw gap-4 h-vh flex justify-center"
    >{items.length===0 && (
      <div className="text-center mt-20">
      <h2 className="text-2xl font-semibold">Your cart is empty</h2>
      <p className="text-gray-500 mt-2">Looks like you haven’t added anything yet.</p>

      <div className="mt-6 flex justify-center gap-4">
        <Link href="/home" className="px-6 py-2 bg-green-600 text-white rounded-lg">
          Continue shopping
        </Link>
      </div>
    </div>

    )}
    {items.length>0 &&(
      <div>
      <CartItems items={items} />
      <OrderSummary payment={false} ctaText='Checkout'/></div>
    )}
    </div>
  )
}

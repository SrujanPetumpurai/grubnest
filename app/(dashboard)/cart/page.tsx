'use client'
import { useEffect, useState } from 'react'
import CartItem from '@/app/components/CartItem'
import OrderSummary from '@/app/components/OrderSummary'

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

export function CartItems() {
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
  )
}

export default function Cart() {
  return (
    <div
      style={{ backgroundColor: '#FBF9F5' }}
      className="w-vw gap-4 h-vh flex justify-center"
    >
      <CartItems />
      <OrderSummary ctaText='Checkout'/>
    </div>
  )
}

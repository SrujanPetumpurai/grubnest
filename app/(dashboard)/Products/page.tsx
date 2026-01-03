'use client'
import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import mongoose from "mongoose"
import ItemCard from "@/app/components/ItemCard"
import Sidebar from "@/app/components/Sidebar"

type Item = {
  discount?: string,
  image: string,
  name: string,
  category: string,
  rating: number,
  cost: number,
  measurement: string,
  isFeatured:boolean,
  _id: mongoose.ObjectId
}

export default function Products() {
  const searchParams = useSearchParams()
  const initialCategory = searchParams.get('category') || 'all'
  const [category, setCategory] = useState<string>(initialCategory)
  const [items, setItems] = useState<Item[]>([])

  function changeCategory(type: string) {
    setCategory(type)
  }

  useEffect(() => {
    async function getItems() {
      const res = await fetch(`/api/Items/${category}`)
      if (!res.ok) {
        const err = await res.json()
        console.error(err.error)
        return
      }
      const body = await res.json()
      setItems(body.items)
    }
    getItems()
  }, [category])

  return (
    <div className="w-full">
      <div className="w-[5%]">
        <Sidebar onClick={changeCategory} />
      </div>
      <div className="flex mx-auto flex-wrap w-[80%] h-full">
        {items.length > 0 && items.map((item) => (
          <div key={item._id.toString()} className="w-1/4 flex justify-center mb-4 mt-2">
            <ItemCard
              id={item._id.toString()}
              measurement={item.measurement}
              discount="10"
              image={item.image}
              name={item.name}
              category={item.category}
              rating={item.rating}
              cost={item.cost}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

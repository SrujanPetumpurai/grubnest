import CartItem from '@/app/components/CartItem'

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
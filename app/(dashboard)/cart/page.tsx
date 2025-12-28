'use client'
import { useEffect,useState } from 'react'
import CartItem from '@/app/components/CartItem'
import OrderSummary from '@/app/components/OrderSummary'
export interface item {
      name:string,
      cost:number,
      discount:string| null,
      category:string,
      image:string,
      itemId:string,
      quantity:number
    }
export function CartItems(){
    
    const [items,setItems] = useState<item[]>([]);
    useEffect(()=>{
      const getCartItems = async()=>{
        const res = await fetch('/api/cart',{
          method:'GET',
        })
        const body = await res.json();
        if(!res.ok){
          console.log(body.error)
          console.log(body.message)
          return
        }else{
          if(body.items.length>0){
            setItems(body.items)
          }else{
            return
          }
          
        }
      }
      getCartItems()
    },[])
    return(
      <div className='border mt-16 w-[500px] rounded-xl flex flex-col items-center'>
        {items.length>0 && items.map((item)=>(
          <div key={item.itemId}>
            <CartItem image={item.image} id={item.itemId} quantity={item.quantity} name={item.name} cost={item.cost} discount={item.discount} category={item.category}></CartItem>
          </div> 
        ))}
      </div>
    )
  }

export default function Cart(){
    return(
      <div style={{backgroundColor:'#FBF9F5'}} className='w-vw h-vh flex justify-center'>
        <CartItems></CartItems>
        <OrderSummary></OrderSummary>
      </div>
    )
  }


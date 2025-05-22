'use client'

import { useState,useEffect} from "react";

export default function CartItem({name,price,img,quantity,itemId}:{name:string,price:number,img:string,quantity:number,itemId:string}){
    const [amount,setAmount] = useState<number>(quantity);
    
    const changeAmount = (e:React.MouseEvent<HTMLButtonElement>)=>{
        let value = e.currentTarget.textContent;
        if(value=='+'){
            setAmount((previousAmt)=> previousAmt+1)
        }
        else{
            setAmount((previousAmt) => previousAmt - 1 )
        }
        window.location.reload()
    }
    const handleQuantity=(e:React.MouseEvent<HTMLButtonElement>)=>{
        let value = e.currentTarget.textContent;
        fetch('api/cart/items',{
            method:'POST',
            headers: { 'Content-Type': 'application/json' },
            body:JSON.stringify({itemId,value})
    })
    
    }
    return(
        <div className="flex h-[78] justify-between  px-5 items-center ">
            <div className="flex items-center text-sm  w-[240px]  p-1">
                
                <div className="w-[50px] ">
                    <img className="size-10 rounded-md" src={img} alt="ItemImage" />
                </div>
                <div className="w-[120px]  flex flex-col">
                    <div className=''>{name}</div> 
                    
                    <div className="text-gray-400 font-semibold">{price}$</div> 
                    
                </div>
            </div>
            <div className="ml-6 py-1 font-bold text-green-500 border border-gray-300 rounded-xl  ">
                <button className="mx-2  pt-auto w-6 " onClick={(e)=>{handleQuantity(e);
                    changeAmount(e)
                }}>-</button>
                {amount}
                <button className=" mx-2 pt-auto w-6 "  onClick={(e)=>{handleQuantity(e);
                    changeAmount(e);
                }}>+</button>
            </div>
        </div>
    )
}
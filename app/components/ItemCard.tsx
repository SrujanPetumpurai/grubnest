'use client'
import { StaticImageData } from "next/image";
import { useState,useEffect } from "react";
import { useRouter } from "next/navigation";
import RatingComponent from "./RatingComponent";
export default function ItemCard({name,img,cost,itemId}:{name:string,img:string | StaticImageData,cost:number,itemId:string}){
const addtoCart = async()=>{
  fetch('api/cart',{
    method:"POST",
    body:JSON.stringify({itemId})
  })
}
const router = useRouter();
const toItemPage = ()=>{
  router.push(`/Products/${itemId}`)
}

const [rating,setRating]= useState(1);
console.log("This is rating:",rating)
useEffect(()=>{
  async function getRating(){
   const response = await fetch(`/api/rating/${itemId}`);
   const data = await response.json();
   setRating(data)
   console.log("This is data:",data)
  }
  getRating();
},[itemId])
 
  return(
      <div onClick={toItemPage} className="flex flex-col bg-white-300   w-[170px] h-[230px]">
        <div className="h-[53%]">
        <img className="w-full p-2 h-[95%]  object-cover object-center " src={typeof img === 'string' ? img : img.src} alt="" />
        </div>
        <div className="absolute left-10">

        </div>
        <div className="flex justify-between  mt-[10px] h-[35%] w-full">
          <div className="flex flex-col">
           <div className="w-full font-semibold ">{name}</div>
           <div className="font-semibold">${cost}</div>
           <div><RatingComponent rating={rating}></RatingComponent></div>
          </div>
          <div className="text-sm self-end text-white bg-green-500 rounded pb-1 px-2">
            <button onClick={addtoCart}> Add to Card</button> 
            </div>
        </div>
      </div>
    
)
}
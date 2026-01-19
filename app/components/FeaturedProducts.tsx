'use client'
import { useState,useEffect } from "react";
import ItemCard from "./ItemCard"

type item={
  _id: string;
  discount?: string;
  image: string;
  name: string;
  category: string;
  rating: number;
  cost: number;
  measurement:string,
  isFeatured:boolean
}

export default function FeaturedProducts(){
const [featuredArray,setFeaturedArray] = useState<item[]>([])

  useEffect(()=>{
    async function getFeaturedProducts(){
      const response = await fetch('/api/Items?featured=true');
      const data = await response.json();
      setFeaturedArray(data);
    }
    getFeaturedProducts();
  },[]);
    return(
      <div className="mt-8 w-[1200px] max-w-[100vw] mx-auto flex flex-col px-2">
        <h1 className="text-xl sm:text-2xl font-bold text-center sm:text-left">Farm Fresh products</h1>
        <div className="mt-6 sm:mt-8 mx-auto flex flex-wrap justify-center sm:justify-start">
            {featuredArray.map((item,idx)=>(
                <ItemCard key={item._id} measurement={item.measurement} id={item._id} image={item.image} rating={item.rating} name={item.name} cost={item.cost} discount={item.discount} category={item.category}></ItemCard>
            ))} 
        </div>
      </div>
    )
}
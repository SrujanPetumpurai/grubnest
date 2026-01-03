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
      <div className="mt-8 w-[1200px] mx-auto  flex flex-col">
        <h1 className="text-2xl font-bold">Farm Fresh products</h1>
        <div className="mt-8 mx-auto flex flex-wrap">
            {featuredArray.map((item,idx)=>(
                <ItemCard key={item._id} measurement={item.measurement} id={item._id} image={item.image} rating={item.rating} name={item.name} cost={item.cost} discount={item.discount} category={item.category}></ItemCard>
            ))} 
        </div>
      </div>
    )
}
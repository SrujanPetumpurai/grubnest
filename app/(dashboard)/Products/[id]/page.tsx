'use client'
import { useParams } from "next/navigation"
import { useState,useEffect } from "react"
export default function Product(){
  const {id} = useParams();
  useEffect(()=>{
    async ()=>{
      const res = await fetch(`api/Items/${id}`)
    }
  },[])
  return(
    <div>
      Sorry still in development
    </div>
  )
}
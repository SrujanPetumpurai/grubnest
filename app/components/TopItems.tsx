'use client'
import { useEffect, useState } from "react"
import ItemCard from './ItemCard'

interface Item {
  name: string;
  image: string;
  cost:number;
  _id:string;
}

export default function TopItems() {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const getItems = async () => {
      try {
        const response = await fetch('/api/Items/top');
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error(error);
      }
    };
    getItems();
  }, []);

  return (
    <ul className="flex justify-around mt-36">
      {items.map((item, index) => (
        <li key={index}>
          <ItemCard  itemId={item._id} cost ={item.cost} name={item.name} img={item.image} />
        </li>
      ))}
    </ul>
  );
}

"use client";
import { useState } from "react";
import CategoryCard from "./CategoryCard";

const categories = [
  { name: "Fresh Fruits", img: "/fruits.png", bgColor: "#ffc6c6ff" },
  { name: "Sea-Food", img: "/fish.jpg", bgColor: "#a56800ff" },
  { name: "Milk", img: "/milk.png", bgColor: "#F3E5F5" },
  { name: "Honey", img: "/honey.jpg", bgColor: "rgba(234, 255, 235, 1)" },
  { name: "Vegetables", img: "/Vegetables.png", bgColor: "#cdcdcdff" },
  { name: "Meat", img: "/Meat.png", bgColor: "#ffcb9dff" },
  { name: "Baking", img: "/Baking.png", bgColor: "#E8F5E9" },
  { name: "Cheese", img: "/Cheese.png", bgColor: "#fcffa4ff" },
  { name: "Drinks", img: "/Drinks.png", bgColor: "#E8F5E9" },
]

export default function Carousel() {
  const [start, setStart] = useState(0);
  const visibleCount = 8;

  const prev = () => setStart((start - 1 + categories.length) % categories.length);
  const next = () => setStart((start + 1) % categories.length);

  const visible = Array.from({ length: visibleCount }, (_, i) =>
    categories[(start + i) % categories.length]
  );

  return (
    <div className=" flex flex-col relative mt-8 w-[1200px] max-w-[90vw] mx-auto overflow-hidden">
      <div className="text-2xl font-bold mb-8 text-teal-900">
        Shop by Category
      </div>
      <div className="flex  gap-4 justify-center transition-transform duration-300">
        {visible.map((cat, i) => (
          <CategoryCard key={i} name={cat.name} img={cat.img} bgColor={cat.bgColor} />
        ))}
      </div>
      <button
        onClick={prev}
        className="absolute top-1/2 left-2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full"
      >
        ‹
      </button>
      <button
        onClick={next}
        className="absolute top-1/2 right-2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full"
      >
        ›
      </button>
    </div>
  );
}

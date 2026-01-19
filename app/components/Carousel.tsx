"use client";
import { useState } from "react";
import CategoryCard from "./CategoryCard";

const categories = [
  { name: "Fresh Fruits", img: "/fruits.png", bgColor: "#0C6F65" },
  { name: "Sea-Food", img: "/fish.png", bgColor: "#a56800ff" },
  { name: "Milk", img: "/milk.png", bgColor: "#5FA8D3" },
  { name: "Honey", img: "/honey.png", bgColor: "#D98E04" },
  { name: "Vegetables", img: "/vegetables.png", bgColor: "#6C7613" },
  { name: "Meat", img: "/meat.png", bgColor: "#700C0C" },
  { name: "Baking", img: "/Baking.png", bgColor: "#700C60" },
  { name: "Cheese", img: "/Cheese.png", bgColor: "#F2B705" },
  { name: "Drinks", img: "/Drinks.png", bgColor: "#0B3471" },
]

export default function Carousel() {
  const [start, setStart] = useState(0);
  const visibleCount = 6;

  const prev = () => setStart((start - 1 + categories.length) % categories.length);
  const next = () => setStart((start + 1) % categories.length);

  const visible = Array.from({ length: visibleCount }, (_, i) =>
    categories[(start + i) % categories.length]
  );

  return (
    <div className="flex flex-col relative mt-8 w-[1200px] max-w-[95vw] mb-8 mx-auto overflow-hidden px-2">
      <div className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 text-teal-900 text-center sm:text-left">
        Shop by Categories
      </div>
      <div className="flex gap-3 sm:gap-4 justify-start sm:justify-center transition-transform duration-300 overflow-x-auto sm:overflow-visible scroll-smooth">
        {visible.map((cat, i) => (
          <CategoryCard key={i} name={cat.name} img={cat.img} bgColor={cat.bgColor} />
        ))}
      </div>
      <button
        onClick={prev}
        className="absolute top-1/2 left-1 sm:left-2 bg-black/50 text-white p-2 sm:p-3 rounded-full"
      >
        ‹
      </button>
      <button
        onClick={next}
        className="absolute top-1/2 right-1 sm:right-2 bg-black/50 text-white p-2 sm:p-3 rounded-full"
      >
        ›
      </button>
</div>

  );
}

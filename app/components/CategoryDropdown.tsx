'use client'
import { useState,useRef,useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function CategoryDropdown() {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const categories = [
    'meat',
    'seafood',
    'milk',
    'eggs',
    'vegetable',
  ]
  const ref = useRef<HTMLDivElement|null>(null);
  useEffect(()=>{
    function handleClickOutside(e:any){
      if(!ref.current) return
        if(!ref.current.contains(e.target)){
            setOpen(false)
        }
    }
    document.addEventListener('mousedown',handleClickOutside);
    return ()=>document.removeEventListener('mousedown',handleClickOutside)
},[])
  return (
    <div ref={ref} className="relative inline-block text-left">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 border px-4 py-2 rounded-lg hover:bg-gray-100"
      >
        Shop by Category
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 011.08 1.04l-4.25 4.25a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>
        <ul className={`absolute z-10 mt-2 w-48 bg-white border rounded-lg shadow-md transition-all duration-200 ease-in-out
                       ${open ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
          {categories.map((cat) => (
            <li
              key={cat}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
              onClick={() => {
                router.push(`/Products?category=${encodeURIComponent(cat)}`)
                setOpen(false)
              }}
            >
              {cat}
            </li>
          ))}
        </ul>
    </div>
  )
}

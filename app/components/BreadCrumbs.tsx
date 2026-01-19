'use client'
import { usePathname } from 'next/navigation'

export default function Breadcrumbs() {
  const pathname = usePathname()
  const parts = pathname.split('/').filter(Boolean)

  return (
    <nav className="text-md ml-[180px] absolute z-51 top-21 text-gray-500">
      <span>Home</span>
      {parts.map((p, i) => (
        <span key={i}> {'>'} {p}</span>
      ))}
    </nav>
  )
}

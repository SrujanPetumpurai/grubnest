'use client'
import { useState } from 'react'
import Map from './Map'

export default function GetLocation() {
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null)

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setCoords({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      })
    })
}

  return (
    <div className="flex flex-col gap-3">
      <button
        onClick={getLocation}
        className=" rounded-md hover:bg-emerald-700"
      >
        <svg
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            className='w-6 h-6'
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M25,13c0,8-9,15-9,15s-9-7-9-15c0-5,4-9,9-9S25,8,25,13z" />
            <circle cx={16} cy={13} r={3} />
          </svg>
      </button>

      {coords && (
        <div className="w-full h-[400px]">
         <Map lat={coords.lat} lng={coords.lng} />
        </div>
      )}
    </div>
  )
}

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
        className="w-fit px-3 py-1.5 text-sm rounded-md bg-emerald-600 text-white hover:bg-emerald-700"
      >
        Select location
      </button>

      {coords && (
        <div className="w-full h-[400px]">
         <Map lat={coords.lat} lng={coords.lng} />
        </div>
      )}
    </div>
  )
}

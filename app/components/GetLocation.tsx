'use client'
import { useState,useRef,useEffect } from 'react'
import Map from './Map'

export default function GetLocation() {
  const [coords, setCoords] = useState<{ lng: number; lat : number } | null>(null)
  const [open,setOpen] = useState<boolean>(false);
  const [locality,setLocality] = useState<string>('');
  const ref = useRef<HTMLDivElement|null>(null);
  useEffect(()=>{
    function handleClick(e:any){
      if(ref.current && !ref.current.contains(e.target)){
        setOpen(false)
      }
    }
    document.addEventListener('mousedown',handleClick);
    return ()=>document.removeEventListener('mousedown',handleClick)
  },[])
  const sendCoords = async ()=>{
      if(!coords) return
       await fetch('/api/user/location',{
        method:"POST",
        headers:{
          'Content-type':'application/json'
        },
        body:JSON.stringify({
          location:{
            type:'Point',
            coordinates:[coords?.lng,coords?.lat]
          }
        })
      })
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${coords.lat}&lon=${coords.lng}&format=json`)
      const data = await response.json();
      const shortName = data.display_name?.split(',')[0] || ''
      setLocality(shortName||'')
      setOpen(false)
    }
  const getLocation = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setCoords({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      })
      setOpen(true)
    })
}

  return (
    <div ref={ref} className="flex  flex-col gap-3 relative">
      <div className='flex justify-between items-center'>
        <span className='text-gray-500 italic'>{locality?`${locality}...`:''}</span>
        <button
        onClick={getLocation}
        className=" rounded-md hover:bg-gray-200"
      >
        <svg viewBox="0 0 32 32"xmlns="http://www.w3.org/2000/svg"fill="none"stroke="currentColor"className='w-6 h-6'strokeWidth={2}strokeLinecap="round"strokeLinejoin="round">
            <path d="M25,13c0,8-9,15-9,15s-9-7-9-15c0-5,4-9,9-9S25,8,25,13z" />
            <circle cx={16} cy={13} r={3} />
          </svg>
      </button>
      </div>
      

      {coords && open && (
        <div onMouseDown={(e) => e.stopPropagation()}  className="w-[400px] h-[400px] absolute z-50 top-12 right-0 w-[90vw] max-w-[420px] h-[400px]  shadow-lg rounded-lg">
           <Map lat={coords.lat} lng={coords.lng} onChange={(lat, lng) => setCoords({ lat, lng })}/>
           <button className='rounded-lg rounded-tl-[0px] py-1 px-1 text-white bg-red-500' disabled={!coords} onClick={()=>sendCoords()}>Confirm location</button>
        </div>
      )}
    </div>
  )
}

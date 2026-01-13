'use client'
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

export default function LeafletMap({
  lat,
  lng,
  onChange,
}: {
  lat: number
  lng: number
  onChange: (lat: number, lng: number) => void
}) {
  const center: [number, number] = [lat, lng]

  return (
    <MapContainer key={`${lat}-${lng}`} center={center} zoom={14} className="w-full rounded-lg rounded-bl-[0px] h-[400px]">
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker
        position={center}
        draggable
        eventHandlers={{
          dragend: (e) => {
            const { lat, lng } = e.target.getLatLng()
            onChange(lat, lng)
          },
        }}
      />
    </MapContainer>
  )
}


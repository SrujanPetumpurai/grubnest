'use client'
import dynamic from 'next/dynamic'

const Map = dynamic(() => import('./LeafletMap'), {
  ssr: false,
})  

export default Map
//Dynamic() renders the component at browser.We doing that because leaflet uses window and dom apis.
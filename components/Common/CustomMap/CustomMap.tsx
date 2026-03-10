'use client'

import {useEffect, useRef} from 'react'
import useGoogleMap from '@/components/Common/CustomMap/hooks/useGoogleMap'

export type CustomMapProps = {
  locations: {
    index: number
    lat: number
    lng: number
    isExterior: boolean
  }[]
  showNumbers?: boolean
  showTrail?: boolean
  onClick?: (index: number) => void
}

export default function CustomMap(props: CustomMapProps) {
  const {initMap} = useGoogleMap(props)

  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mapRef.current) {
      return
    }

    initMap(mapRef).catch(console.error)
  }, [props, mapRef.current])

  return <div ref={mapRef} style={{width: '100%', height: '100%'}} />
}

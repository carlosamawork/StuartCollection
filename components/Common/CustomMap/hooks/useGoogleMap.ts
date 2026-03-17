import {RefObject, useEffect, useId, useState} from 'react'
import {setOptions, importLibrary} from '@googlemaps/js-api-loader'
import {CustomMapProps} from '@/components/Common/CustomMap/CustomMap'

export default function useGoogleMap({
  locations,
  showNumbers,
  showTrail,
  onClick,
  centerOnClick,
  mapCenter,
}: CustomMapProps) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY

  const [map, setMap] = useState<google.maps.Map | null>(null)
  const uid = useId()
  const mapId = `map_${uid}`

  useEffect(() => {
    if (!mapCenter || !map) return
    map.panTo(mapCenter)
  }, [mapCenter])

  async function initMap(mapRef: RefObject<HTMLDivElement | null>) {
    if (!mapRef.current) return

    // Configure the Google Maps API
    setOptions({
      key: apiKey,
      v: 'weekly',
    })

    // Import libraries
    const {Map} = await importLibrary('maps')
    const {AdvancedMarkerElement} = await importLibrary('marker')

    // Create map
    const map = new Map(mapRef.current, {
      center: new google.maps.LatLng(locations[0].lat, locations[0].lng),
      zoom: 18,
      mapId,
      mapTypeId: google.maps.MapTypeId.SATELLITE,
      disableDefaultUI: true, // This hides all default controls
    })

    // Create a new bounds object
    const bounds = new google.maps.LatLngBounds()

    // Create markers
    const markers: any[] = []

    locations.forEach(({index, isExterior, lat, lng}) => {
      const position = new google.maps.LatLng(lat, lng)

      // Create a DOM element from your SVG string
      const svgElement = document.createElement('div')
      svgElement.innerHTML = pinString(showNumbers ? index.toString() : '', isExterior)
      svgElement.style.transform = 'translateY(50%)'

      // Create the AdvancedMarkerElement with the custom SVG content
      const marker = new AdvancedMarkerElement({
        map,
        position,
        content: svgElement,
        title: 'Clickable Marker', // Title is used for accessibility and hover text
        gmpClickable: !!onClick,
      })

      markers.push(marker)

      // Extend the bounds to include the marker's position
      bounds.extend(position)

      // Add the click event listener
      onClick &&
        marker.addListener('gmp-click', (event: any) => {
          centerOnClick && map.panTo(position) // Animates the center to the marker's position
          onClick(index)
        })
    })

    // Create trail
    if (showTrail && locations.length > 1) {
      markers.forEach((marker, i, array) => {
        if (i === array.length - 1) return

        const nextMarker = array[i + 1]

        // Define the path for the polyline using the markers' positions
        const flightPath = [marker.position, nextMarker.position]

        // Create the polyline object and add it to the map
        const polyline = new google.maps.Polyline({
          path: flightPath,
          geodesic: true, // Set to true for a curved line over a large distance
          strokeColor: '#000000',
          strokeOpacity: 0.4,
          strokeWeight: 4,
        })

        // Render the polyline on the map
        polyline.setMap(map)
      })
    }

    // Fit the map to the bounds of all markers
    map.fitBounds(bounds)
    map.setZoom(map.getZoom() ?? 18 + 1)

    // Save map for external interaction with mapCenter
    setMap(map)
  }

  return {
    initMap,
  }
}

// exteriores = redonda negra, numero en blanco
// interiores = redonda blanca, numero en negro

export const pinString = (text: string, isExterior: boolean, forceBlackCircle?: boolean) => `
  <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="1" y="1" width="32" height="32" rx="16" fill="${isExterior ? 'black' : 'white'}"/>
    <rect x="1" y="1" width="32" height="32" rx="16" stroke="${isExterior && !forceBlackCircle ? 'white' : 'black'}" stroke-width="2"/>
    <text x="50%" y="50%" fill="${isExterior ? 'white' : 'black'}" text-anchor="middle" dy=".3em">
      ${text}
    </text>
  </svg>
`

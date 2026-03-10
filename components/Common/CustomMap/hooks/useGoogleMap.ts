import {RefObject, useId} from 'react'
import {setOptions, importLibrary} from '@googlemaps/js-api-loader'
import {CustomMapProps} from '@/components/Common/CustomMap/CustomMap'

export default function useGoogleMap({locations, showNumbers, showTrail, onClick}: CustomMapProps) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY

  const uid = useId()
  const mapId = `map_${uid}`

  async function initMap(mapRef: RefObject<HTMLDivElement | null>) {
    if (!mapRef.current) return

    // Configure the Google Maps API
    setOptions({
      key: apiKey,
      v: 'weekly',
    })

    // Create map
    const {Map} = await importLibrary('maps')
    const map = new Map(mapRef.current, {
      center: new google.maps.LatLng(locations[0].lat, locations[0].lng),
      zoom: 18,
      mapId,
      mapTypeId: google.maps.MapTypeId.SATELLITE,
      disableDefaultUI: true, // This hides all default controls
    })

    // Create markers
    const {AdvancedMarkerElement} = await importLibrary('marker')
    locations.forEach(({index, isExterior, lat, lng}) => {
      // Create a DOM element from your SVG string
      const svgElement = document.createElement('div')
      svgElement.innerHTML = pinString(showNumbers ? index.toString() : '', isExterior)

      // Create the AdvancedMarkerElement with the custom SVG content
      const marker = new AdvancedMarkerElement({
        map,
        position: new google.maps.LatLng(lat, lng),
        content: svgElement,
        title: 'Clickable Marker', // Title is used for accessibility and hover text
        gmpClickable: !!onClick,
      })

      // Add the click event listener
      onClick &&
        marker.addListener('gmp-click', (event: any) => {
          onClick(index)
        })
    })

    // Create trail
    if (showTrail && locations.length > 1) {
      const {DirectionsService, DirectionsRenderer} = await importLibrary('routes')

      const directionsService = new DirectionsService()

      const directionsRenderer = new DirectionsRenderer({
        map,
        suppressMarkers: true, // usamos tus markers custom
        polylineOptions: {
          strokeColor: '#000000',
          strokeOpacity: 0.9,
          strokeWeight: 4,
        },
      })

      const origin = {
        lat: locations[0].lat,
        lng: locations[0].lng,
      }

      const destination = {
        lat: locations[locations.length - 1].lat,
        lng: locations[locations.length - 1].lng,
      }

      const waypoints = locations.slice(1, -1).map((loc) => ({
        location: {lat: loc.lat, lng: loc.lng},
      }))

      directionsService.route(
        {
          origin,
          destination,
          waypoints,
          travelMode: google.maps.TravelMode.WALKING,
          optimizeWaypoints: false,
        },
        (result, status) => {
          if (status === 'OK' && result) {
            directionsRenderer.setDirections(result)
          }
        },
      )
    }
  }

  return {
    initMap,
  }
}

// exteriores = redonda negra, numero en blanco
// interiores = redonda blanca, numero en negro

const pinString = (text: string, isExterior: boolean) => `
  <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="1" y="1" width="32" height="32" rx="16" fill="${isExterior ? 'black' : 'white'}"/>
    <rect x="1" y="1" width="32" height="32" rx="16" stroke="${isExterior ? 'white' : 'black'}" stroke-width="2"/>
    <text x="50%" y="50%" font-size="14" fill="${isExterior ? 'white' : 'black'}" text-anchor="middle" dy=".3em" font-family="Arial">
      ${text}
    </text>
  </svg>
`

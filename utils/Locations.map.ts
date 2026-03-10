import {LocationData} from '@/sanity/queries/fragments/location'

export const LocationsMap = {
  toCoordinates: (location: LocationData, i: number) => ({
    index: i + 1,
    lat: location.geopoint.lat,
    lng: location.geopoint.lng,
    isExterior: location.isExterior,
  }),
}

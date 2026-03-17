export const location = `
    name,
    geopoint,
    isExterior,
`

export type LocationData = {
  name: string
  geopoint: {
    lat: number
    lng: number
    alt: number
  }
  isExterior: boolean
}

import {location, LocationData} from '../../fragments/location'

export const visitSectionQuery = `
    title,
    "location": ^.location->{
        ${location}
    },
    "visitDescription": ^.visitDescription
`

export type ArtworkVisitSectionData = {
  title: string
  location: LocationData
  visitDescription: any
}

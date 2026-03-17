import {location, LocationData} from '../../fragments/location'

export const visitSectionQuery = `
    title,
    "locations": ^.locations[]->{
        ${location}
    },
    "visitDescription": ^.visitDescription,
    "signupLink": ^.signupLink
`

export type ArtworkVisitSectionData = {
  title: string
  locations: LocationData[]
  visitDescription: any
  signupLink: string
}

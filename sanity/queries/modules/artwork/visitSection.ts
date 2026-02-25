import {location, LocationData} from '../../fragments/location'

export const visitSectionQuery = `
    title,
    "location": ^.location->{
        ${location}
    },
    "visitDescription": ^.visitDescription,
    "signupLink": ^.signupLink
`

export type ArtworkVisitSectionData = {
  title: string
  location: LocationData
  visitDescription: any
  signupLink: string
}

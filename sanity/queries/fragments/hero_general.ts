import {image} from '@/sanity/queries/fragments/image'

export const hero_general = `
    image{
        ${image},
    },
    videoUrl,
`

export type HeroGeneralData = {
  image: any
  videoUrl: string
}

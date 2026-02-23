import {image} from '@/sanity/queries/fragments/image'

export const artwork_card = `
    title,
    "slug": slug.current,
    "image": coalesce(thumbnail, hero.image){
        ${image}
    },
    artists[]->{
        name,
    },
`

export type ArtworkCardData = {
  title: string
  slug: string
  image: any
  artists: {name: string}[]
}

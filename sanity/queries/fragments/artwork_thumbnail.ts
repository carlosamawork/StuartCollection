import {image} from '@/sanity/queries/fragments/image'

export const artwork_thumbnail = `
    title,
    "slug": slug.current,
    "image": coalesce(thumbnail, featuredImage){
        ${image}
    },
    artists[]->{
        name,
    },
`

export type ArtworkThumbnailData = {
  title: string
  slug: string
  image: any
  artists: {name: string}[]
}

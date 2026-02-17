import {image} from '../../fragments/image'
import {accordeonQuery} from '@/sanity/queries/modules/general/accordeon'

export const artistSectionQuery = `
    title,
    text,
    images.customizeArtistsImages == true => {
        "images": images.images[]{
            _type == "artist" => @->image{
                ${image}
            },
            _type == "image" => {
                ${image}
            }, 
        },
    },
    images.customizeArtistsImages == false => {
        "images": ^.artists[]->image{
            ${image}
        }
    },
    accordeon{
        ${accordeonQuery}
    },
`

export type ArtworkArtistSectionData = {
  title: string
  text: any
  images: any[]
  accordeon: any[]
}

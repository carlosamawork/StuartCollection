import {image} from '../../fragments/image'
import {artist} from '../../fragments/artist'
import {accordeonQuery} from '@/sanity/queries/modules/general/accordeon'

export const artistQuery = `
    title,
    text,
    images{
        customizeArtistsImages,
        customizeArtistsImages == true => {
            images[]{
                _type,
                _type == "artist" => {
                    ${artist}
                },
                _type == "image" => {
                    ${image}
                }, 
            },
        }
    },
    accordeon{
        ${accordeonQuery}
    },
`

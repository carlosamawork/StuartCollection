import {groq} from 'next-sanity'
import {client} from '..'
import {seo} from '../fragments/seo'
import {image} from '../fragments/image'
import {location} from '../modules/artwork/location'
import {textAccordeonQuery} from '../modules/artwork/textAccordeon'
import {artistQuery} from '../modules/artwork/artist'
import {imagesQuery} from '../modules/artwork/images'
import {visitQuery} from '../modules/artwork/visit'
import {textParagraphsQuery} from '../modules/general/textParagraphs'
import {iframQuery} from '../modules/general/iframe'

export async function getArtwork(slug: string) {
  return client.fetch(
    groq`*[_type == "artwork" && slug.current == $slug][0]{
            title,
            "slug": slug.current,
            artists[]->{
                name,
            },
            themes[]->{
                title,
            },
            year,
    
            "body_modules": body[]{
                _type,
                _type == "module.textParagraphs" => {
                    ${textParagraphsQuery}
                },
                _type == "module.artwork.textAccordeon" => {
                    ${textAccordeonQuery}
                },
                _type == "module.iframe" => {
                    ${iframQuery}
                },
            },   
            "sections": sections[]{
                _key,
                _type == "module.artwork.images" => {
                    ${imagesQuery}
                },
                _type == "module.artwork.artist" => {
                    ${artistQuery}
                },
                _type == "module.artwork.visit" => {
                    ${visitQuery}
                },
                _type == "module.artwork.videos" => {
                    ${visitQuery}
                },
                _type == "module.artwork.social" => {
                    ${visitQuery}
                },
            },   
        }`,
    {slug},
  )
}

// featuredImage{
//     ${image}
// },
// visitDescription,
// location->{
//     ${location}
// },
// "details": {
//     themes[]->{
//         title,
//     },
//     year,
// },

export async function getArtworkSEO(slug: string) {
  return client.fetch(
    groq`*[_type == "artwork" && slug.current == $slug][0]{
                seo{
                    ${seo}
                }
            }`,
    {slug},
  )
}

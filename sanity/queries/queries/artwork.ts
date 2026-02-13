import {groq} from 'next-sanity'
import {client} from '..'
import {seo} from '../fragments/seo'
import {image} from '../fragments/image'
import {location} from '../fragments/location'
import {artistQuery} from '../modules/artwork/artist'
import {socialQuery} from '../modules/artwork/social'
import {videosQuery} from '../modules/artwork/videos'
import {imagesQuery} from '../modules/artwork/images'
import {visitQuery} from '../modules/artwork/visit'
import {textParagraphsQuery} from '../modules/general/textParagraphs'
import {iframQuery} from '../modules/general/iframe'
import {accordeonQuery} from '@/sanity/queries/modules/general/accordeon'

export async function getArtwork(slug: string) {
  return client.fetch(
    groq`*[_type == "artwork" && slug.current == $slug][0]{
            title,
            "slug": slug.current,
            artists[]->{
                name,
            },
            featuredImage{
                ${image}
            },
            "specs": {
                themes[]->{
                    title,
                },
                year,
                visitDescription,
                location->{
                    ${location}
                },
            },     
            "body_modules": body[]{
                _type,
                _type == "module.textParagraphs" => {
                    ${textParagraphsQuery}
                },
                _type == "module.accordion" => {
                    ${accordeonQuery}
                },
                _type == "module.iframe" => {
                    ${iframQuery}
                },
            },   
            "sections": sections[]{
                _type,
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
                    ${videosQuery}
                },
                _type == "module.artwork.social" => {
                    ${socialQuery}
                },
            },
        }`,
    {slug},
  )
}

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

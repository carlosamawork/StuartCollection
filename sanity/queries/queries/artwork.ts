import {groq} from 'next-sanity'
import {client} from '..'
import {seo} from '../fragments/seo'
import {image} from '../fragments/image'
import {location, LocationData} from '../fragments/location'
import {artistSectionQuery, ArtworkArtistSectionData} from '../modules/artwork/artistSection'
import {ArtworkSocialSectionData, socialSectionQuery} from '../modules/artwork/socialSection'
import {ArtworkVideosSectionData, videosSectionQuery} from '../modules/artwork/videosSection'
import {ArtworkImagesSectionData, imagesSectionQuery} from '../modules/artwork/imagesSection'
import {ArtworkVisitSectionData, visitSectionQuery} from '../modules/artwork/visitSection'
import {textParagraphsQuery} from '../modules/general/textParagraphs'
import {iframQuery} from '../modules/general/iframe'
import {accordeonQuery} from '@/sanity/queries/modules/general/accordeon'

export async function getArtwork(slug: string): Promise<ArtworkData> {
  return client.fetch(
    groq`*[_type == "artwork" && slug.current == $slug][0]{
            title,
            "slug": slug.current,
            artists[]->{
                name,
                image
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
                    ${imagesSectionQuery}
                },
                _type == "module.artwork.artist" => {
                    ${artistSectionQuery}
                },
                _type == "module.artwork.visit" => {
                    ${visitSectionQuery}
                },
                _type == "module.artwork.videos" => {
                    ${videosSectionQuery}
                },
                _type == "module.artwork.social" => {
                    ${socialSectionQuery}
                },
            },
        }`,
    {slug},
  )
}

export type ArtworkData = {
  title: string
  slug: string
  artists: {name: string; slug: string; image: any}[]
  featuredImage: any
  specs: {
    themes: {title: string}[]
    year: number
    visitDescription: any
    location: LocationData
  }
  body_modules: any[]
  sections: (
    | ArtworkImagesSectionData
    | ArtworkArtistSectionData
    | ArtworkVisitSectionData
    | ArtworkVideosSectionData
    | ArtworkSocialSectionData
  )[]
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

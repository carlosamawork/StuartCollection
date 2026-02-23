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
import {artwork_card, ArtworkCardData} from '@/sanity/queries/fragments/artwork_card'
import {hero_general, HeroGeneralData} from '@/sanity/queries/fragments/hero_general'

export async function getArtwork(slug: string): Promise<ArtworkData> {
  return client.fetch(
    groq`*[_type == "artwork" && slug.current == $slug][0]{
            title,
            "slug": slug.current,
            artists[]->{
                name,
                image
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
            hero{
                ${hero_general}
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
            "related": {
                "byLocation": *[
                    _type == "artwork" && 
                    _id != ^._id && 
                    location._ref == ^.location._ref
                ] {
                    ${artwork_card}    
                } [0...4],
                "byTheme": *[
                    _type == "artwork" && 
                    _id != ^._id && 
                    count(themes[@._ref in ^.^.themes[]._ref]) > 0
                ] {
                    ${artwork_card}    
                    // Calculate match count for sorting
                    "matchCount": count(themes[@._ref in ^.^.themes[]._ref])
                } | order(matchCount desc) [0...4], // Order by count and take top 4
                "byTrail": *[
                    _type == "artwork" &&
                    _id != ^._id &&
                    count(*[
                        _type == "trail" &&
                        references(^._id) &&
                        references(^.^._id)
                    ]) > 0
                ]{
                    ${artwork_card}
                    "sharedTrailCount": count(*[
                        _type == "trail" &&
                        references(^._id) &&
                        references(^.^._id)
                    ])
                } | order(sharedTrailCount desc) [0...4]
            }
        }`,
    {slug},
  )
}

export type ArtworkData = {
  title: string
  slug: string
  artists: {name: string; image: any}[]
  specs: {
    themes: {title: string}[]
    year: number
    visitDescription: any
    location: LocationData
  }
  hero: HeroGeneralData
  body_modules: any[]
  sections: (
    | ArtworkImagesSectionData
    | ArtworkArtistSectionData
    | ArtworkVisitSectionData
    | ArtworkVideosSectionData
    | ArtworkSocialSectionData
  )[]
  related: {
    byLocation: ArtworkCardData[]
    byTrail: ArtworkCardData[]
    byTheme: ArtworkCardData[]
  }
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

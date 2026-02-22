import {groq} from 'next-sanity'
import {client} from '..'
import {seo} from '../fragments/seo'
import {artwork_card, ArtworkCardData} from '@/sanity/queries/fragments/artwork_card'
import {iframQuery} from '@/sanity/queries/modules/general/iframe'
import {hero_general, HeroGeneralData} from '@/sanity/queries/fragments/hero_general'

export async function getTrail(slug: string): Promise<TrailData> {
  return client.fetch(
    groq`*[_type == "trail" && slug.current == $slug][0]{
        title,
        "slug": slug.current,
        hero{
            ${hero_general}
        },
        body,
        map{
            ${iframQuery}
        },
        artworks[]->{
            ${artwork_card}
        },
      }`,
    {slug},
  )
}

export type TrailData = {
  title: string
  slug: string
  hero: HeroGeneralData
  body: any
  map: any
  artworks: ArtworkCardData[]
}

export async function getTrailSEO(slug: string) {
  return client.fetch(
    groq`*[_type == "trail" && slug.current == $slug][0]{
            seo{
                ${seo}
            }
        }`,
    {slug},
  )
}

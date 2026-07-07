import {groq} from 'next-sanity'
import {client} from '..'
import {seo} from '../fragments/seo'
import {image} from '../fragments/image'
import {artwork_card, ArtworkCardData} from '@/sanity/queries/fragments/artwork_card'
import {hero_general, HeroGeneralData} from '@/sanity/queries/fragments/hero_general'
import {location, LocationData} from '@/sanity/queries/fragments/location'

export async function getTrail(slug: string): Promise<TrailData> {
  return client.fetch(
    groq`*[_type == "trail" && slug.current == $slug][0]{
        title,
        "slug": slug.current,
        hero{
            ${hero_general}
        },
        body,
        artworks[]->{
            ${artwork_card}
            locations[]->{
              ${location}
              _id
            }
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
  artworks: (ArtworkCardData & {locations: (LocationData & {_id: string})[]})[]
}

export async function getTrailSEO(slug: string) {
  return client.fetch(
    groq`*[_type == "trail" && slug.current == $slug][0]{
            title,
            "image": coalesce(thumbnail, hero.image){
                ${image}
            },
            seo{
                ${seo}
            }
        }`,
    {slug},
  )
}

export async function getTrailSlugs(): Promise<{slug: string}[]> {
  return client.fetch(
    groq`*[_type == "trail" && defined(slug.current)]{
            "slug": slug.current
        }`,
  )
}

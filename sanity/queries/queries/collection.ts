import {groq} from 'next-sanity'
import {client} from '..'
import {seo} from '../fragments/seo'
import {artwork_card, ArtworkCardData} from '@/sanity/queries/fragments/artwork_card'
import {image} from '@/sanity/queries/fragments/image'
import {iframQuery} from '@/sanity/queries/modules/general/iframe'

export async function getCollection(): Promise<CollectionData> {
  return client.fetch(
    groq`{
        "artworks": *[_type == "artwork"]{
            ${artwork_card}
            "themesIds": themes[]->_id,
            year
        },
        "themes": *[_type == "theme"]{
            title,
            _id,
        },
        "locations": *[_type == "location"]{
            title,
            iframe{
              ${iframQuery}
            }
        },
        "artists": *[_type == "artist"]{
            name,
            "artworks": *[_type == "artwork" && references(^._id)]{
                title,
                "slug": slug.current,
            }
        },
        "trails": *[_type == "trail"]{
            title,
            "slug": slug.current,
            "artworksCount": count(artworks),
            "image": coalesce(thumbnail, hero.image){
                ${image}
            },
        },
    }`,
  )
}

export type CollectionData = {
  artworks: CollectionArtworkData[]
  themes: CollectionThemeData[]
  locations: CollectionLocationData[]
  artists: CollectionArtistData[]
  trails: CollectionTrailData[]
}

export type CollectionArtworkData = ArtworkCardData & {
  themesIds: string[]
  year: number
}

export type CollectionThemeData = {
  title: string
  _id: string
}

export type CollectionLocationData = {
  title: string
  iframe: any
}

export type CollectionArtistData = {
  name: string
  artworks: {title: string; slug: string}[]
}

export type CollectionTrailData = {
  title: string
  slug: string
  artworksCount: number
  image: any
}

export async function getCollectionSEO() {
  return client.fetch(
    groq`*[_type == "artwork"][0]{
          seo{
              ${seo}
          }
      }`,
  )
}

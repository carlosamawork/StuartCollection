import {groq} from 'next-sanity'
import {client} from '..'
import {seo} from '../fragments/seo'
import {artwork_card, ArtworkCardData} from '@/sanity/queries/fragments/artwork_card'
import {image} from '@/sanity/queries/fragments/image'
import {location, LocationData} from '@/sanity/queries/fragments/location'

export async function getCollection(): Promise<CollectionData> {
  return client.fetch(
    groq`{
        "copys": *[_type == "settings"][0].collection,
        "artworks": *[_type == "artwork"]{
            ${artwork_card}
            "themesIds": themes[]->_id,
            year,
            _id,
            summary,
            locations[]->{
              _id,
              ${location}
            },
        },
        "themes": *[_type == "theme"]{
            title,
            _id,
        },
        "locations": *[_type == "location" && count(*[_type == "artwork" && references(^._id)]) > 0]{
            ${location}
            _id,
            "firstArtwork": *[_type == "artwork" && references(^._id)][0]{
              _id,
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
         "sections": [
          {
            "id": "artworks",
            "title": "Artworks",
          },
          {
            "id": "artists",
            "title": "Artists",
          },
          {
            "id": "locations",
            "title": "Locations",
          },
          {
            "id": "trails",
            "title": "Trails",
          }
        ]
    }`,
  )
}

export type CollectionData = {
  copys: {
    locationsText: string
    locationsTitle: any
  }
  artworks: CollectionArtworkData[]
  themes: CollectionThemeData[]
  locations: CollectionLocationData[]
  artists: CollectionArtistData[]
  trails: CollectionTrailData[]
  sections: {id: string; title: string}[]
}

export type CollectionArtworkData = ArtworkCardData & {
  themesIds: string[]
  year: number
  _id: string
  summary: any
  locations: ({_id: string} & LocationData)[]
}

export type CollectionThemeData = {
  title: string
  _id: string
}

export type CollectionLocationData = LocationData & {
  _id: string
  firstArtwork: {_id: string}
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

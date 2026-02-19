import {groq} from 'next-sanity'
import {client} from '..'
import {seo} from '../fragments/seo'
import {artwork_thumbnail} from '@/sanity/queries/fragments/artwork_thumbnail'

export async function getCollection(): Promise<CollectionData> {
  return client.fetch(
    groq`{
        "artworks": *[_type == "artwork"]{
            ${artwork_thumbnail}
        },
        "themes": *[_type == "theme"]{
            title,
            "slug": slug.current,
            "artworks": *[_type == "artwork" && references(^._id)]{
                "slug": slug.current,
            }
        },
        "locations": *[_type == "location"]{
            name,
            "slug": slug.current,
        },
        "artists": *[_type == "artist"]{
            name,
            "artworks": *[_type == "artwork" && references(^._id)]{
                title,
                "slug": slug.current,
            }
        },
    }`,
  )

  const combinedQuery = groq`{
  "posts": *[_type == "post"][0...10] {
    title,
    slug,
    publishedAt
  },
  "siteSettings": *[_type == "siteSettings"][0] {
    title,
    description,
    keywords
  }
}`
}

export type CollectionData = {
  artworks: CollectionArtworkData[]
  themes: CollectionThemeData[]
  locations: CollectionLocationData[]
  artists: CollectionArtistData[]
}

type CollectionArtworkData = {
  title: string
  slug: string
  image: any
  artists: {name: string; slug: string}[]
}

type CollectionThemeData = {
  title: string
  slug: string
  artworks: {slug: string}[]
}

type CollectionLocationData = {
  name: string
  slug: string
}

type CollectionArtistData = {
  name: string
  artworks: {slug: string}[]
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

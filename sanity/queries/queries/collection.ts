import {groq} from 'next-sanity'
import {client} from '..'
import {seo} from '../fragments/seo'

export async function getCollection() {
  return client.fetch(
    groq`{
        "artworks": *[_type == "artwork"]{
            title,
            "slug": slug.current,
            "image": coalesce(thumbnail, featuredImage),
            artists[]->{
                name,
            },
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

export async function getCollectionSEO() {
  return client.fetch(
    groq`*[_type == "artwork"][0]{
          seo{
              ${seo}
          }
      }`,
  )
}

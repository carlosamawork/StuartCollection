import {groq} from 'next-sanity'
import {client} from '..'

export async function getAllArtists() {
  return client.fetch(
    groq`*[_type == "artist"]{
            name,
            "artworks": *[_type == "artwork" && references(^._id)]{
                title
            }
        }`,
  )
}

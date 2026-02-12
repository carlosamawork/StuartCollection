import { groq } from 'next-sanity'
import { client } from '../index'

export const getFooter = async () => {
  return client.fetch(groq`
    *[_type == "settings"][0]{
      footer{
        claim,
        linksPolicy[]{
          ...
        },
        titleNewsletter,
        descriptionNewsletter
      },
      "openingHours": hours[]{
        day,
        open,
        close
      },
      directions,
      connect,
      telephone,
      email,

      "visit": *[_type == "page" && slug.current == "visit"][0]{
        "slug": slug.current,
        "sections": modules[]{
          _type == "module.section" => {
            title,
            id
          }
        }
      },

      "about": *[_type == "page" && slug.current == "about"][0]{
        "slug": slug.current,
        "sections": modules[]{
          _type == "module.section" => {
            title,
            id
          }
        }
      },

      "support": *[_type == "page" && slug.current == "support-us"][0]{
        "slug": slug.current,
        "sections": modules[]{
          _type == "module.section" => {
            title,
            id
          }
        }
      },

      "theCollection": *[_type == "page" && slug.current == "the-collection"][0]{
        "slug": slug.current,
        "sections": modules[]{
          _type == "module.section" => {
            title,
            id
          }
        }
      }
    }
  `)
}
import {groq} from 'next-sanity'
import {client} from '../index'

export const getHeader = async () => {
  return client.fetch(
    groq`*[_type == "settings"][0]{
        menu{
          links[]{
            ...,
            _type == "linkInternal" => {
              "slug": reference->slug.current,
              "sections": reference->modules[]{
                _type == "module.section" => {
                  title,
                  id,
                }
              }
            },
            _type == "linkExternal" => {
              title,
              url,
              newWindow
            }
          }
        },
        "openingHours": hours[]{
          day,
          open,
          close
        },
        directions,
        googleMapsUrl,
        connect,
        telephone,
        email
    }`,
  )
}

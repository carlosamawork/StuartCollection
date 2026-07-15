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
              newWindow,
              // El link a /collection es externo (la ruta no es un doc "page"),
              // pero debe desplegar las mismas secciones que los tabs de la página
              url == "/collection" => {
                "slug": "collection",
                "sections": [
                  {"id": "artworks", "title": "Artworks"},
                  {"id": "artists", "title": "Artists"},
                  {"id": "locations", "title": "Locations"}
                ] + select(
                  count(*[_type == "trail"]) > 0 => [{"id": "trails", "title": "Trails"}],
                  []
                )
              }
            }
          }
        },
        directions,
        googleMapsUrl,
        connect,
        telephone,
        email
    }`,
  )
}

import { groq } from 'next-sanity';
import { client }from '../index';

export const getHeader = async () => {
  return client.fetch(
    groq`*[_type == "settings"][0]{
        menu{
          links[]{
            ...,
            _type == "linkInternal" => {
              "slug": page->slug.current
            },
            _type == "linkExternal" => {
              title,
              url,
              newWindow
            }
          }
        }
    }`
  )
};
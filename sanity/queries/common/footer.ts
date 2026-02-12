import { groq } from 'next-sanity';
import { client }from '../index';

export const getFooter = async () => {
  return client.fetch(
    groq`*[_type == "settings"][0]{
        footerSettings{
            claim,
            linksPolicy[]{
                ...,
            },
            titleNewsletter,
            descriptionNewsletter,
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
        "visit": *[_type == "visit"][0]{
            "slug": slug.current,
            "sections": modules[]{
                _type == "module.section" => {
                    title,
                    id,
                }
            }
        },
        "about": *[_type == "about"][0]{
            "slug": slug.current,
            "sections": modules[]{
                _type == "module.section" => {
                    title,
                    id,
                }
            }
        },
        "support": *[_type == "support"][0]{
            "slug": slug.current,
            "sections": modules[]{
                _type == "module.section" => {
                    title,
                    id,
                }
            }
        },
        "theCollection": *[_type == "theCollection"][0]{
            "slug": slug.current,
            "sections": modules[]{
                _type == "module.section" => {
                    title,
                    id,
                }
            }
        },
    }`
  )
};
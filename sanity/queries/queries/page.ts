import { groq } from 'next-sanity'
import { client } from '..'
import { seo } from '../fragments/seo'
import {image} from '../fragments/image'
import { sectionQuery } from '../modules/general/section'

export async function getPage(slug: string) {
    return client.fetch(
        groq`*[_type == "page" && slug.current == $slug][0]{
            title,
            "slug": slug.current,
            asideMenu,
            modules[]{
                ...,
                _type == "module.section" => {
                    ...,
                    ${sectionQuery}
                },
            },               
            }`,{ slug }
    )
}

export async function getPageSEO(slug: string) {
    return client.fetch(
        groq`*[_type == "page" && slug.current == $slug][0]{
                seo{
                    ${seo}
                }
            }`,{ slug }
    )
}
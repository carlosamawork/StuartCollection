import { groq } from 'next-sanity'
import { client } from '../index';
import { seo } from '../fragments/seo';

export async function getDefaultSEO() {
  return client.fetch(
    groq`*[_type == "settings"][0]{
      seo{
        ${seo}
      }
    }`
  )
}


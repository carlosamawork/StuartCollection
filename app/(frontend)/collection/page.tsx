import CollectionComponent from '@/components/CollectionComponent'
import {getDefaultSEO} from '@/sanity/queries/common/defaultSEO'
import {getCollection} from '@/sanity/queries/queries/collection'
import {buildPageMetadata, jsonLdScript} from '@/utils/metadata'
import {buildUrl} from '@/utils/seoHelper'
import {Suspense} from 'react'

export const revalidate = 60

export async function generateMetadata() {
  const defaultSEO = await getDefaultSEO()

  return buildPageMetadata({
    defaultSeo: defaultSEO?.seo,
    pageTitle: 'The Collection',
    path: '/collection/',
  })
}

export default async function Collection() {
  const data = await getCollection()

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'The Collection',
    url: buildUrl('/collection/'),
    itemListElement: (data.artworks || [])
      .filter((artwork) => artwork.slug)
      .map((artwork, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: artwork.title,
        url: buildUrl(`/collection/artwork/${artwork.slug}/`),
      })),
  }

  return (
    <Suspense fallback={false}>
      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{__html: jsonLdScript(itemListSchema)}}
        />
        <CollectionComponent data={data} />
      </main>
    </Suspense>
  )
}

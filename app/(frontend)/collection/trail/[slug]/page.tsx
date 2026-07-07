import TrailComponent from '@/components/TrailComponent'
import {getDefaultSEO} from '@/sanity/queries/common/defaultSEO'
import {getTrail, getTrailSEO, getTrailSlugs} from '@/sanity/queries/queries/trail'
import {notFound} from 'next/navigation'
import {buildPageMetadata, jsonLdScript} from '@/utils/metadata'
import {buildUrl} from '@/utils/seoHelper'

export const revalidate = 60

export async function generateStaticParams() {
  const slugs = await getTrailSlugs()
  return slugs.map(({slug}) => ({slug}))
}

export async function generateMetadata({params}: {params: Promise<{slug: string}>}) {
  const {slug} = await params
  const [page, defaultSEO] = await Promise.all([getTrailSEO(slug), getDefaultSEO()])

  return buildPageMetadata({
    seo: {
      ...page?.seo,
      image: page?.seo?.image?.imageUrl ? page.seo.image : page?.image,
    },
    defaultSeo: defaultSEO?.seo,
    pageTitle: page?.title,
    path: `/collection/trail/${slug}/`,
    index: !!page,
  })
}

export default async function Trail({params}: {params: Promise<{slug: string}>}) {
  const {slug} = await params
  const data = await getTrail(slug)

  if (!data) notFound()

  const trailSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: data.title,
    url: buildUrl(`/collection/trail/${slug}/`),
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
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{__html: jsonLdScript(trailSchema)}}
      />
      <TrailComponent data={data} />
    </main>
  )
}

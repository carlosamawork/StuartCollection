import ArtworkComponent from '@/components/ArtworkComponent'
import {getDefaultSEO} from '@/sanity/queries/common/defaultSEO'
import {getArtwork, getArtworkSEO, getArtworkSlugs} from '@/sanity/queries/queries/artwork'
import {notFound} from 'next/navigation'
import {buildPageMetadata, jsonLdScript} from '@/utils/metadata'
import {buildUrl, siteTitle} from '@/utils/seoHelper'

export const revalidate = 60

export async function generateStaticParams() {
  const slugs = await getArtworkSlugs()
  return slugs.map(({slug}) => ({slug}))
}

export async function generateMetadata({params}: {params: Promise<{slug: string}>}) {
  const {slug} = await params
  const [page, defaultSEO] = await Promise.all([getArtworkSEO(slug), getDefaultSEO()])

  const artistNames = page?.artists?.filter(Boolean).join(', ')

  return buildPageMetadata({
    seo: {
      ...page?.seo,
      image: page?.seo?.image?.imageUrl ? page.seo.image : page?.image,
    },
    defaultSeo: defaultSEO?.seo,
    pageTitle: page?.title && artistNames ? `${page.title} — ${artistNames}` : page?.title,
    pageDescription: page?.summary,
    path: `/collection/artwork/${slug}/`,
    index: !!page,
    type: 'article',
  })
}

export default async function Artwork({params}: {params: Promise<{slug: string}>}) {
  const {slug} = await params
  const data = await getArtwork(slug)

  if (!data) notFound()

  const artworkSchema = {
    '@context': 'https://schema.org',
    '@type': 'VisualArtwork',
    name: data.title,
    url: buildUrl(`/collection/artwork/${slug}/`),
    ...(data.artists?.length > 0 && {
      creator: data.artists.map((artist: {name: string}) => ({
        '@type': 'Person',
        name: artist.name,
      })),
    }),
    ...(data.specs?.year && {dateCreated: String(data.specs.year)}),
    isPartOf: {
      '@type': 'Collection',
      name: siteTitle,
      url: buildUrl('/collection/'),
    },
    locationCreated: {
      '@type': 'Place',
      name: 'University of California San Diego',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'La Jolla',
        addressRegion: 'CA',
        addressCountry: 'US',
      },
    },
  }

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{__html: jsonLdScript(artworkSchema)}}
      />
      <ArtworkComponent data={data} />
    </main>
  )
}

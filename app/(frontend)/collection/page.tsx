import ArtworkComponent from '@/components/ArtworkComponent'
import CollectionComponent from '@/components/CollectionComponent'
import {getDefaultSEO} from '@/sanity/queries/common/defaultSEO'
import {getArtwork, getArtworkSEO} from '@/sanity/queries/queries/artwork'
import {getCollection, getCollectionSEO} from '@/sanity/queries/queries/collection'
import {
  BASE_IMAGE_HEIGHT,
  BASE_IMAGE_URL,
  BASE_IMAGE_WIDTH,
  BASE_URL,
  buildUrl,
  getFavicons,
  siteDescription,
  siteTitle,
} from '@/utils/seoHelper'

export const revalidate = 1 // revalidate to work set to 1, then we change it to 10

export async function generateMetadata({params}: {params: {slug: string}}) {
  const {slug} = await params
  const page = await getCollectionSEO()
  const defaultSEO = await getDefaultSEO()

  if (!page) {
    return {
      metadataBase: BASE_URL,
      title: `Stuart Collection | ${defaultSEO.title || siteTitle}`,
      description: defaultSEO.description || siteDescription,
      robots: {
        index: false,
        follow: true,
        nocache: false,
        googleBot: {
          index: false,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      },
      alternates: {
        canonical: BASE_URL.origin,
      },
    }
  }

  return {
    metadataBase: BASE_URL,
    title: `Stuart Collection | ${page.seo?.title || defaultSEO.title || siteTitle}`,
    description: page.seo?.description || defaultSEO.description || siteDescription,
    generator: 'Next.js',
    applicationName: 'Stuart Collection by Cacho Salvador',
    openGraph: {
      title: `Stuart Collection | ${page.seo?.title || defaultSEO.title || siteTitle}`,
      description: page.seo?.description || defaultSEO.description || siteDescription,
      url: buildUrl(`/collection/artwork/${slug}/`),
      siteName: siteTitle,
      images: [
        {
          url: page.seo?.image?.imageUrl || defaultSEO.image?.imageUrl || BASE_IMAGE_URL,
          width:
            page.seo?.image?.metadata?.dimensions?.width ||
            defaultSEO.image?.metadata?.dimensions?.width ||
            BASE_IMAGE_WIDTH,
          height:
            page.seo?.image?.metadata?.dimensions?.height ||
            defaultSEO.image?.metadata?.dimensions?.height ||
            BASE_IMAGE_HEIGHT,
        },
      ],
      type: 'website',
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    icons: getFavicons(),
    alternates: {
      canonical: buildUrl(`/collection/artwork/${slug}/`),
    },
    twitter: {
      card: 'summary_large_image',
      title: `${page.seo?.title || defaultSEO.title || siteTitle}`,
      description: page.seo?.description || defaultSEO.description || siteDescription,
      images: [page.seo?.image?.imageUrl || defaultSEO.image?.imageUrl || BASE_IMAGE_URL],
    },
  }
}

export default async function Collection() {
  const data = await getCollection()

  return (
    <main>
      <CollectionComponent data={data} />
    </main>
  )
}

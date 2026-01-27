import HomeComponent from '@/components/HomeComponent';
import PageComponent from '@/components/PageComponent';
import { getDefaultSEO } from '@/sanity/queries/common/defaultSEO';
import { getHome, getHomeSEO } from '@/sanity/queries/queries/home';
import { getPage, getPageSEO } from '@/sanity/queries/queries/page';
import { BASE_IMAGE_HEIGHT, BASE_IMAGE_URL, BASE_IMAGE_WIDTH, BASE_URL, buildUrl, getFavicons, siteDescription, siteTitle } from '@/utils/seoHelper';

export const revalidate = 1 // revalidate to work set to 1, then we change it to 10

export async function generateMetadata({params}: {params: {slug: string}}) {
  const { slug } = await params
  const page = await getPageSEO(slug);
  const defaultSEO = await getDefaultSEO();

  if (!page) {
    return {
      metadataBase: BASE_URL,
      title: `Stuart Collection | ${page.seo?.title || siteTitle}`,
      description: page.seo?.description || siteDescription,
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
    title: `Stuart Collection | ${page.seo?.title || siteTitle}`,
    description: page.seo?.description || siteDescription,
    generator: 'Next.js',
    applicationName: 'Stuart Collection by Cacho Salvador',
    openGraph: {
      title: `Stuart Collection | ${page.seo?.title || siteTitle}`,
      description: page.seo?.description || siteDescription,
      url: buildUrl(`/${slug}/`),
      siteName: siteTitle,
      images: [
        {
          url: page.seo?.image?.imageUrl || BASE_IMAGE_URL,
          width: page.seo?.image?.metadata?.dimensions?.width || BASE_IMAGE_WIDTH,
          height: page.seo?.image?.metadata?.dimensions?.height || BASE_IMAGE_HEIGHT,
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
      canonical: buildUrl(`/${slug}/`),
    },
    twitter: {
      card: 'summary_large_image',
      title: `${page.seo?.title || siteTitle}`,
      description: page.seo?.description || siteDescription,
      images: [
        page.seo?.image?.imageUrl || BASE_IMAGE_URL,
      ],
    },
  }
}

export default async function Page({params}: {params: {slug: string}}) {
    const { slug } = await params
  const data = await getPage(slug);
  console.log("Page data:", data);
  return (
    <main>
      <PageComponent data={data} />
    </main>
  )
}
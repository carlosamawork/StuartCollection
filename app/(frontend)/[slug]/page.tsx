import PageComponent from '@/components/PageComponent'
import {getDefaultSEO} from '@/sanity/queries/common/defaultSEO'
import {getPage, getPageSEO, getPageSlugs} from '@/sanity/queries/queries/page'
import {notFound} from 'next/navigation'
import {buildPageMetadata, jsonLdScript} from '@/utils/metadata'
import {buildUrl, formatSlug, siteDescription} from '@/utils/seoHelper'

export const revalidate = 60

export async function generateStaticParams() {
  const slugs = await getPageSlugs()
  return slugs.map(({slug}) => ({slug}))
}

export async function generateMetadata({params}: {params: Promise<{slug: string}>}) {
  const {slug} = await params
  const [page, defaultSEO] = await Promise.all([getPageSEO(slug), getDefaultSEO()])

  return buildPageMetadata({
    seo: page?.seo,
    defaultSeo: defaultSEO?.seo,
    pageTitle: page?.title || formatSlug(slug),
    path: `/${slug}/`,
    index: !!page,
  })
}

export default async function Page({params}: {params: Promise<{slug: string}>}) {
  const {slug} = await params
  const data = await getPage(slug)

  if (!data) notFound()

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: data.title || formatSlug(slug),
    description: siteDescription,
    url: buildUrl(`/${slug}/`),
  }

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: jsonLdScript(webPageSchema)}} />
      <PageComponent data={data} />
    </main>
  )
}

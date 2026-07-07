import PageComponent from '@/components/PageComponent'
import {getDefaultSEO} from '@/sanity/queries/common/defaultSEO'
import {getPage, getPageSEO, getPageSectionParams} from '@/sanity/queries/queries/page'
import {notFound} from 'next/navigation'
import {buildPageMetadata, jsonLdScript} from '@/utils/metadata'
import {buildUrl} from '@/utils/seoHelper'

export const revalidate = 60

export async function generateStaticParams() {
  const pages = await getPageSectionParams()
  return pages.flatMap(({slug, sections}) =>
    (sections || []).filter(Boolean).map((section) => ({slug, section})),
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{slug: string; section: string}>
}) {
  const {slug, section} = await params
  const [page, defaultSEO] = await Promise.all([getPageSEO(slug), getDefaultSEO()])

  const sectionData = page?.sections?.find((s: {id: string}) => s.id === section)

  return buildPageMetadata({
    // El title de la sección manda; description e imagen caen al SEO de la página
    seo: {
      description: page?.seo?.description,
      image: page?.seo?.image,
    },
    defaultSeo: defaultSEO?.seo,
    pageTitle: sectionData?.title,
    path: `/${slug}/${section}/`,
    index: !!(page && sectionData),
  })
}

export default async function PageSection({
  params,
}: {
  params: Promise<{slug: string; section: string}>
}) {
  const {slug, section} = await params
  const data = await getPage(slug)

  if (!data || !data.asideMenu) notFound()

  const sectionData = data.modules?.find((m: {id?: string}) => m.id === section)
  if (!sectionData) notFound()

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: sectionData.title,
    url: buildUrl(`/${slug}/${section}/`),
    isPartOf: {
      '@type': 'WebPage',
      name: data.title,
      url: buildUrl(`/${slug}/`),
    },
  }

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{__html: jsonLdScript(webPageSchema)}}
      />
      <PageComponent data={data} activeSectionId={section} />
    </main>
  )
}

import HomeComponent from '@/components/HomeComponent'
import {getDefaultSEO} from '@/sanity/queries/common/defaultSEO'
import {getHome, getHomeSEO} from '@/sanity/queries/queries/home'
import {buildPageMetadata} from '@/utils/metadata'

export const revalidate = 60

export async function generateMetadata() {
  const [page, defaultSEO] = await Promise.all([getHomeSEO(), getDefaultSEO()])

  return buildPageMetadata({
    seo: page?.seo,
    defaultSeo: defaultSEO?.seo,
    path: '/',
    index: !!page,
  })
}

export default async function Home() {
  const data = await getHome()
  return (
    <main>
      <h1 className="sr-only">Stuart Collection — Site-specific art at UC San Diego</h1>
      <HomeComponent data={data} />
    </main>
  )
}

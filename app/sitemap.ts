import type { MetadataRoute } from 'next'
import { groq } from 'next-sanity'
import { client } from '@/sanity/queries'
import { buildUrl } from '@/utils/seoHelper'

export const revalidate = 3600

type SitemapEntry = { slug: string; _updatedAt: string }
type PageEntry = SitemapEntry & { asideMenu?: boolean; sections?: string[] }

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { pages, artworks, trails } = await client.fetch<{
    pages: PageEntry[]
    artworks: SitemapEntry[]
    trails: SitemapEntry[]
  }>(
    groq`{
      "pages": *[_type == "page" && defined(slug.current)]{
        "slug": slug.current,
        _updatedAt,
        asideMenu,
        "sections": modules[defined(id)].id
      },
      "artworks": *[_type == "artwork" && defined(slug.current)]{ "slug": slug.current, _updatedAt },
      "trails": *[_type == "trail" && defined(slug.current)]{ "slug": slug.current, _updatedAt },
    }`,
  )

  return [
    { url: buildUrl('/'), lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    {
      url: buildUrl('/collection/'),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...artworks.map((e) => ({
      url: buildUrl(`/collection/artwork/${e.slug}/`),
      lastModified: new Date(e._updatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    ...trails.map((e) => ({
      url: buildUrl(`/collection/trail/${e.slug}/`),
      lastModified: new Date(e._updatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
    ...pages.map((e) => ({
      url: buildUrl(`/${e.slug}/`),
      lastModified: new Date(e._updatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    // Secciones con URL propia (solo páginas con asideMenu)
    ...pages
      .filter((e) => e.asideMenu)
      .flatMap((e) =>
        (e.sections || []).map((section) => ({
          url: buildUrl(`/${e.slug}/${section}/`),
          lastModified: new Date(e._updatedAt),
          changeFrequency: 'monthly' as const,
          priority: 0.6,
        })),
      ),
  ]
}

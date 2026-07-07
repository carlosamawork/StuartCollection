import type { Metadata } from 'next'
import {
	BASE_IMAGE_HEIGHT,
	BASE_IMAGE_URL,
	BASE_IMAGE_WIDTH,
	BASE_URL,
	buildTitle,
	buildUrl,
	getFavicons,
	siteDescription,
	siteTitle,
} from './seoHelper'

type SeoImage = {
	imageUrl?: string
	metadata?: { dimensions?: { width?: number; height?: number } }
}

export type SeoData = {
	title?: string | null
	description?: string | null
	image?: SeoImage | null
} | null | undefined

// Shared generateMetadata builder — title/description/image resolve as:
// document SEO → document fallback (pageTitle/pageDescription) → settings SEO → site constants
export function buildPageMetadata({
	seo,
	defaultSeo,
	pageTitle,
	pageDescription,
	path,
	index = true,
	type = 'website',
}: {
	seo?: SeoData
	defaultSeo?: SeoData
	pageTitle?: string | null
	pageDescription?: string | null
	path: string
	index?: boolean
	type?: 'website' | 'article'
}): Metadata {
	const title = buildTitle(seo?.title || pageTitle || defaultSeo?.title)
	const description = seo?.description || pageDescription || defaultSeo?.description || siteDescription
	const image = seo?.image?.imageUrl ? seo.image : defaultSeo?.image?.imageUrl ? defaultSeo.image : null
	const url = buildUrl(path)

	return {
		metadataBase: BASE_URL,
		title,
		description,
		applicationName: siteTitle,
		openGraph: {
			title,
			description,
			url,
			siteName: siteTitle,
			images: [
				{
					url: image?.imageUrl || BASE_IMAGE_URL,
					width: image?.metadata?.dimensions?.width || BASE_IMAGE_WIDTH,
					height: image?.metadata?.dimensions?.height || BASE_IMAGE_HEIGHT,
				},
			],
			type,
		},
		robots: {
			index,
			follow: true,
			nocache: false,
			googleBot: {
				index,
				follow: true,
				'max-video-preview': -1,
				'max-image-preview': 'large',
				'max-snippet': -1,
			},
		},
		icons: getFavicons(),
		alternates: {
			canonical: url,
		},
		twitter: {
			card: 'summary_large_image',
			title,
			description,
			images: [image?.imageUrl || BASE_IMAGE_URL],
		},
	}
}

// JSON-LD helper — serialized in the Server Component render, never client-side.
// "<" is escaped so CMS strings can never close the <script> tag (XSS guard).
export function jsonLdScript(schema: Record<string, unknown>) {
	return JSON.stringify(schema).replace(/</g, '\\u003c')
}

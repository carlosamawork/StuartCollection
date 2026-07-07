// 🧭 Base URL — set NEXT_PUBLIC_SITE_URL per environment (production/staging)
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://stuartcollection.ucsd.edu'

export const BASE_URL = new URL(SITE_URL)

if (process.env.NODE_ENV !== 'production' && !process.env.NEXT_PUBLIC_SITE_URL) {
	console.warn('[seoHelper] NEXT_PUBLIC_SITE_URL is not set — falling back to', SITE_URL)
}

// 🧱 Helper function for consistent URL creation
export const buildUrl = (path = "/") => new URL(path, BASE_URL).toString();

// 🌍 Global site metadata
export const siteTitle = "Stuart Collection";
export const siteDescription =
	"The Stuart Collection commissions site-specific artworks by leading contemporary artists across the University of California San Diego campus, free and open to all.";

// 🏷️ "Page | Site" title — avoids "Stuart Collection | Stuart Collection" duplicates
export const buildTitle = (pageTitle?: string | null) =>
	pageTitle && pageTitle !== siteTitle ? `${pageTitle} | ${siteTitle}` : siteTitle;

// 🔗 Social & canonical links
export const linkInstagram = "https://www.instagram.com/stuartcollection/";
export const canonicalHome = buildUrl("/");


// 🖼️ Images & favicons
// Last-resort OG image — add this file to /public/images before launch
export const BASE_IMAGE_URL = buildUrl("/images/og-default.jpg");
export const BASE_IMAGE_WIDTH = 1200;
export const BASE_IMAGE_HEIGHT = 800;

export const FAVICON_CLEAR = buildUrl("/favicon/favicon_clear.png");
export const FAVICON_DARK = buildUrl("/favicon/favicon_dark.png");

export function getFavicons() {
	return {
		icon: [
			{ media: '(prefers-color-scheme: light)', url: FAVICON_CLEAR, href: FAVICON_CLEAR },
			{ media: '(prefers-color-scheme: dark)', url: FAVICON_DARK, href: FAVICON_DARK },
		],
		shortcut: FAVICON_CLEAR,
		apple: FAVICON_CLEAR,
		other: { rel: 'apple-touch-icon-precomposed', url: FAVICON_CLEAR },
	};
}

export function formatSlug(slug: string) {
    if (!slug) return '';
    // Replace dashes/underscores with spaces and capitalize first letter of each word
    return slug
        .replace(/[-_]/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase());
}

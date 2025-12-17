// lib/constants.js

// 🧭 Determine the base URL depending on the environment
export const BASE_URL = new URL(
	process.env.NODE_ENV === "production"
		? "https://www.ama.work"
		: "https://staging.ama.work"
);

// 🧱 Helper function for consistent URL creation
export const buildUrl = (path = "/") => new URL(path, BASE_URL).toString();

// 🌍 Global site metadata
export const siteTitle = "Stuart Collection";
export const siteDescription =
	"Stuart Collection";

// 🔗 Social & canonical links
export const linkInstagram = "https://www.instagram.com/";
export const canonicalHome = buildUrl("/");


// 🖼️ Images & favicons
export const BASE_IMAGE_URL = buildUrl("/images/cc_ama_fbshare_1200x800.jpg");
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
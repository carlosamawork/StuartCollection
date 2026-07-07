import { MetadataRoute } from 'next'
import { BASE_URL, buildUrl } from '@/utils/seoHelper'

const DISALLOW = ['/admin/', '/api/']

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // AI crawlers — explicit allow
      { userAgent: 'GPTBot', allow: '/', disallow: DISALLOW },
      { userAgent: 'ChatGPT-User', allow: '/', disallow: DISALLOW },
      { userAgent: 'OAI-SearchBot', allow: '/', disallow: DISALLOW },
      { userAgent: 'ClaudeBot', allow: '/', disallow: DISALLOW },
      { userAgent: 'Claude-Web', allow: '/', disallow: DISALLOW },
      { userAgent: 'anthropic-ai', allow: '/', disallow: DISALLOW },
      { userAgent: 'PerplexityBot', allow: '/', disallow: DISALLOW },
      { userAgent: 'Google-Extended', allow: '/', disallow: DISALLOW },
      { userAgent: 'Applebot-Extended', allow: '/', disallow: DISALLOW },
      { userAgent: 'cohere-ai', allow: '/', disallow: DISALLOW },
      { userAgent: 'FacebookBot', allow: '/', disallow: DISALLOW },
      // Everything else
      { userAgent: '*', allow: '/', disallow: DISALLOW },
    ],
    sitemap: buildUrl('/sitemap.xml'),
    host: BASE_URL.origin,
  }
}

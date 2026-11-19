import type { MetadataRoute } from 'next'
import { siteUrl } from '@/src/lib/site'

/** The site is fully public, so robots.txt only points crawlers at the sitemap. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  }
}

import type { MetadataRoute } from 'next'

import { siteUrl } from '@/lib/seo/config'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/_next', '/api', '/private'],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}

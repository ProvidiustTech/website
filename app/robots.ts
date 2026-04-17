// src/app/robots.ts
// Auto-served at /robots.txt
// Blocks crawlers from authenticated dashboard routes

import { MetadataRoute } from 'next'

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://providiustech.com'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // Block all bots from private/authenticated routes
        userAgent: '*',
        disallow: [
          '/dashboard',
          '/conversations',
          '/knowledge-base',
          '/analytics',
          '/automation',
          '/channels',
          '/settings',
          '/onboarding',
          '/api/',
        ],
        allow: [
          '/',
          '/login',
          '/register',
          '/founding',
          '/founding/success',
          '/coming-soon',
        ],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  }
}
// src/app/sitemap.ts
// Next.js 14 Metadata API sitemap — auto-served at /sitemap.xml
// Docs: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap

import { MetadataRoute } from 'next'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://providiustech.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  return [
    // ── Public / Marketing ─────────────────────────────────────────────────
    {
      url: `${BASE_URL}/`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/coming-soon`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/founding`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/founding/success`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },

    // ── Auth ───────────────────────────────────────────────────────────────
    {
      url: `${BASE_URL}/login`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/register`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },

    // ── Onboarding ─────────────────────────────────────────────────────────
    {
      url: `${BASE_URL}/onboarding`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.4,
    },

    // ── Dashboard (authenticated — lower priority for crawlers) ────────────
    {
      url: `${BASE_URL}/dashboard`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/conversations`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/knowledge-base`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/knowledge-base/edit`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.4,
    },
    {
      url: `${BASE_URL}/analytics`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/automation`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/channels`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.5,
    },

    // ── Settings ───────────────────────────────────────────────────────────
    {
      url: `${BASE_URL}/settings`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/settings/general`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    {
      url: `${BASE_URL}/settings/integrations`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    {
      url: `${BASE_URL}/settings/integrations/configure`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/settings/team`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    {
      url: `${BASE_URL}/settings/billing`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    {
      url: `${BASE_URL}/settings/api-keys`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/settings/notifications`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.3,
    },
  ]
}
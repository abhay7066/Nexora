// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Production domain (matches main's nitro.config.ts wrangler custom_domain).
// Override via PUBLIC_SITE_URL for local/staging builds.
const siteUrl = process.env.PUBLIC_SITE_URL || 'https://nexoratech.biz';

// https://astro.build/config
export default defineConfig({
  site: siteUrl,
  output: 'static',
  // Matches main's current URL scheme exactly: /about, /services, etc — no trailing slash.
  trailingSlash: 'never',
  redirects: {
    // main's /portfolio route is a hard redirect to /services (nav item is commented out).
    '/portfolio': '/services',
  },
  integrations: [
    sitemap({
      // Exclude /portfolio (redirect-only route, not a real page) to match main's sitemap.xml exactly.
      filter: (page) => !page.includes('/portfolio'),
      serialize(item) {
        const priorities = {
          [`${siteUrl}/`]: { changefreq: 'weekly', priority: 1.0 },
          [`${siteUrl}/services`]: { changefreq: 'monthly', priority: 0.9 },
          [`${siteUrl}/about`]: { changefreq: 'monthly', priority: 0.8 },
          [`${siteUrl}/case-studies`]: { changefreq: 'monthly', priority: 0.8 },
          [`${siteUrl}/contact`]: { changefreq: 'monthly', priority: 0.7 },
        };
        return { ...item, ...(priorities[item.url] ?? {}) };
      },
    }),
  ],
});

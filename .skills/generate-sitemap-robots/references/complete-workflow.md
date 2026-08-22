# Sitemap & Robots.txt Generation

Generate `robots.txt` and `sitemap.xml` for SEO.

---

## What This Does

- **robots.txt** — tells search engines which pages to crawl
- **sitemap.xml** — lists all pages, images, and metadata for indexing

Both files generated at build time and served from `public/`.

---

## Startup

Verify:
- All pages built and visible in `src/pages/`
- All integrations complete (posts, CPTs, etc.)
- `PUBLIC_SITE_URL` set in `.env`

---

## robots.txt Generation

Create `public/robots.txt`:

```
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /wp-admin/
Disallow: /wp-content/
Disallow: /?
Sitemap: https://yourdomain.com/sitemap.xml
```

**Staging (`PUBLIC_IS_STAGING=true`):**
```
User-agent: *
Disallow: /
```

Prevents staging site from being indexed.

---

## sitemap.xml Generation

Astro can auto-generate sitemap via `@astrojs/sitemap`:

```bash
npm install @astrojs/sitemap
```

Configure `astro.config.mjs`:

```javascript
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: process.env.PUBLIC_SITE_URL,  // required
  integrations: [sitemap()],
});
```

Sitemap auto-includes all routes.

**Custom sitemap (manual):**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">

  <!-- Homepage -->
  <url>
    <loc>https://yourdomain.com/</loc>
    <lastmod>2026-06-16</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>

  <!-- Static pages -->
  <url>
    <loc>https://yourdomain.com/about/</loc>
    <lastmod>2026-06-16</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

  <!-- Blog posts (dynamic) -->
  <url>
    <loc>https://yourdomain.com/blog/post-title/</loc>
    <lastmod>2026-06-01</lastmod>
    <changefreq>never</changefreq>
    <priority>0.7</priority>
    <image:image>
      <image:loc>https://yourdomain.com/images/post-image.jpg</image:loc>
      <image:title>Post image</image:title>
    </image:image>
  </url>

  <!-- CPT archive -->
  <url>
    <loc>https://yourdomain.com/team/</loc>
    <lastmod>2026-06-16</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>

</urlset>
```

---

## Staging vs Production

### Staging (`PUBLIC_IS_STAGING=true`)

```
robots.txt: Disallow /  (block all search engines)
sitemap.xml: Still generated, but search engines ignore due to robots.txt
```

Set env var in hosting platform (Netlify, Vercel, etc.):
```
PUBLIC_IS_STAGING=true
```

Do NOT commit to `.env`.

### Production (`PUBLIC_IS_STAGING=false` or unset)

```
robots.txt: Allow / (allow search engines)
sitemap.xml: Full site indexed
```

---

## Implementation Steps

1. **Create robots.txt** in `public/robots.txt`
2. **Install @astrojs/sitemap** (or create manual sitemap.xml)
3. **Set PUBLIC_SITE_URL** in `.env` and hosting env vars
4. **Build and verify:**
   ```bash
   npm run build
   # Check: dist/robots.txt and dist/sitemap.xml exist
   # Check: PUBLIC_IS_STAGING unset (default false)
   ```
5. **Submit to search engines:**
   - Google Search Console: add sitemap
   - Bing Webmaster: add sitemap

---

## robots.txt Rules

Common patterns:

```
# Block all crawlers except Google
User-agent: *
Disallow: /
User-agent: Googlebot
Allow: /

# Block specific paths
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /wp-admin/
Disallow: /private/

# Crawl delay (be nice to server)
User-agent: *
Crawl-delay: 10

# Block specific bot
User-agent: AhrefsBot
Disallow: /
```

For this project:
```
User-agent: *
Allow: /
Disallow: /admin/
Sitemap: https://yourdomain.com/sitemap.xml
```

---

## Image URLs in Sitemap

Include images for better indexing:

```xml
<url>
  <loc>https://yourdomain.com/blog/post/</loc>
  <image:image>
    <image:loc>https://yourdomain.com/images/hero.jpg</image:loc>
    <image:title>Post hero image</image:title>
  </image:image>
</url>
```

---

## Dynamic Sitemap (Blog Posts, Collections)

If using `@astrojs/sitemap`, it auto-includes dynamic routes.

For a manual sitemap, read content collections at build time:

```javascript
import { getCollection } from 'astro:content';

// fetch all blog posts, collection items
const posts = await getCollection('blog');
// generate <url> entries for each
// write sitemap.xml
```

---

## State Update

```json
{
  "integrations": {
    "seo": {
      "configured": true,
      "sitemap": true,
      "robots_txt": true,
      "canonical_urls": true
    }
  }
}
```

```markdown
// session.md
- [x] SEO: robots.txt + sitemap.xml generated
      Pages in sitemap: [count]
      Staging protection: yes (PUBLIC_IS_STAGING guard)
```

---

## Verification

After build:

1. **robots.txt exists**: `public/robots.txt` readable
2. **sitemap.xml exists**: `public/sitemap.xml` valid XML
3. **Search console**: submit sitemap to Google/Bing
4. **robots.txt test**: robots.txt checker online tools
5. **Staging blocked**: verify staging site has `Disallow: /`

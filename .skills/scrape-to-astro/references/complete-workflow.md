# Scrape-to-Astro Workflow

Convert existing website to static Astro site using Firecrawl scraping.

---

## What This Does

Fetches all pages from an existing website (HTML), parses structure/content, generates Astro pages and components.

Alternative to Figma scaffold — useful when design already exists as a live site.

---

## Startup

Verify:
- Firecrawl MCP connected OR `FIRECRAWL_API_KEY` in `.env`
- Target website URL accessible and public
- No robots.txt blocking

---

## Discovery

Ask:
1. **Website URL** to scrape (e.g. `https://existingsite.com`)
2. **Pages to scrape** — all pages, specific section, or just homepage?
3. **Design tokens** — extract colors/fonts from site or provide from Figma?
4. **Content type:**
   - Blog/news (links to individual posts)
   - Marketing pages (static single pages)
   - E-commerce (products with images)
5. **Keep existing styling?** (extract CSS, or restyle with Figma)

---

## Implementation

### 1. Scrape with Firecrawl

```javascript
import Firecrawl from "@firecrawl/sdk";

const client = new Firecrawl({ apiKey: process.env.FIRECRAWL_API_KEY });

// Scrape single page
const page = await client.scrapeUrl('https://existingsite.com/about');
// Returns: { html, markdown, metadata }

// Crawl entire site
const crawl = await client.crawlUrl('https://existingsite.com', {
  limit: 50,  // max pages to crawl
  scrapeOptions: { formats: ['markdown', 'html'] }
});
// Returns: array of scraped pages
```

### 2. Parse HTML Structure

Extract:
- Page title, meta description
- Headings (`<h1>`, `<h2>`, `<h3>`)
- Paragraphs, lists, links
- Images (download to `public/images/`)
- Forms (if present)
- Navigation links

### 3. Generate Astro Pages

For each scraped page, create `src/pages/[route].astro`:

```astro
---
export const prerender = true;
import Layout from '../layouts/Layout.astro';
---

<Layout title="Page Title" description="...">
  <section>
    <h1>Heading</h1>
    <p>Content</p>
  </section>
</Layout>
```

### 4. Extract Design (if not using Figma)

Parse colors, fonts, spacing from scraped CSS:

```javascript
// Parse <style> tags and <link rel="stylesheet">
// Extract: colors, font-family, font-size, padding, margin, border-radius
// Generate DESIGN.md and global.css
```

Or use Figma (recommended) to design new site while using scraped content.

### 5. Image Download

For each `<img src="...">` in scraped content:

```javascript
// Download image
// Save to public/images/[page]-[description].[ext]
// Update src in markup to local path
```

### 6. Link Conversion

Convert scraped links to Astro routing:

```
https://existingsite.com/about  →  /about/
https://existingsite.com/blog/post-title  →  /blog/post-title/
```

Add trailing slashes (per AGENTS.md rule).

---

## Content Extraction Priority

1. **Markdown** (from Firecrawl) — cleanest, easiest to edit
2. **HTML** — fallback if markdown parsing fails
3. **Manual review** — verify extracted content accuracy

---

## Styling Strategy

**Option A: Keep original CSS**
- Extract stylesheet links from HTML
- Save to `src/styles/custom.css`
- Import in Layout.astro

**Option B: Restyle with design tokens (recommended)**
- Use Figma to design new site look
- Generate `DESIGN.md` and `global.css` from Figma
- Apply to scraped content
- Cleaner, more consistent result

---

## Repeating Content (Optional)

If the scraped site has repeating dynamic content (blog posts, team members, etc.):

1. Scrape to get structure and copy for each item
2. Define a matching schema in `src/content/config.ts` (see `astro-figma-scaffold/references/content-collections.md`)
3. Convert each scraped item into a `src/content/<name>/*.md` entry
4. Replace static content with `getCollection()` reads

---

## Fallback: Failed Scrapes

If Firecrawl can't reach or parse a page:

```
⚠️  Failed to scrape: https://existingsite.com/[page]
    Reason: [timeout / parse error / blocked / 404]
    → Manually create [page] or provide alternative content
```

Don't block progress on difficult pages — create placeholders.

---

## State Update

```json
{
  "integrations": {
    "scraped_site": {
      "configured": true,
      "sourceUrl": "https://existingsite.com",
      "pageCount": 15,
      "designSource": "figma",  // or "existing-css"
      "contentCollectionsCreated": false
    }
  }
}
```

```markdown
// session.md
- [x] Site scraped from https://existingsite.com
      Pages: 15
      Images: 42 downloaded
      Content: parsed to markdown
      Design: using Figma tokens
```

---

## Rules

- **Public site only** — Firecrawl needs to access via HTTP
- **Respect robots.txt** — don't violate crawl restrictions
- **Verify content accuracy** — manually review scraped content before shipping
- **Update links** — ensure all internal links use Astro routing
- **Image optimization** — download and optimize images locally
- **Metadata extraction** — keep page titles, descriptions, keywords

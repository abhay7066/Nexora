# SEO Reference Values

## Meta Tags — Character Limits

| Tag | Min | Ideal | Max (before truncation) |
|---|---|---|---|
| `<title>` | 30 | 50–60 | 60 |
| `<meta description>` | 70 | 120–160 | 160 |
| `og:title` | — | 40–60 | 95 |
| `og:description` | — | 100–150 | 200 |
| `twitter:title` | — | 40–70 | 70 |
| `twitter:description` | — | 100–200 | 200 |

## Image Dimensions for Social Sharing
| Tag | Recommended Size | Min Size |
|---|---|---|
| `og:image` | 1200×630px | 600×315px |
| `twitter:image` (summary_large) | 1200×628px | 300×157px |
| `twitter:image` (summary) | 1:1 ratio | 144×144px |

## Core Web Vitals Targets (2024)
| Metric | Good | Needs Work | Poor |
|---|---|---|---|
| LCP | ≤ 2.5s | 2.5–4.0s | > 4.0s |
| CLS | ≤ 0.1 | 0.1–0.25 | > 0.25 |
| INP | ≤ 200ms | 200–500ms | > 500ms |
| TTFB | ≤ 800ms | 800ms–1.8s | > 1.8s |
| FCP | ≤ 1.8s | 1.8–3.0s | > 3.0s |

## Structured Data — Common Schemas & Required Fields

### Organization (homepage)
Required: `@type`, `name`, `url`
Recommended: `logo`, `sameAs` (social profiles), `contactPoint`

### WebSite (homepage)
Required: `@type`, `name`, `url`
Recommended: `potentialAction` (SearchAction for sitelinks searchbox)

### Article / BlogPosting
Required: `@type`, `headline`, `datePublished`, `author`
Recommended: `dateModified`, `image`, `publisher`

### Product
Required: `@type`, `name`
Recommended: `image`, `description`, `offers` (with `price`, `priceCurrency`, `availability`)

### LocalBusiness
Required: `@type`, `name`, `address`
Recommended: `telephone`, `openingHours`, `geo`, `url`

### BreadcrumbList
Required: `@type`, `itemListElement` (each with `@type: ListItem`, `position`, `name`, `item`)

### FAQPage
Required: `@type`, `mainEntity` (each with `@type: Question`, `name`, `acceptedAnswer`)

## Heading Best Practices
- One `<h1>` per page containing the primary keyword
- 2–6 `<h2>` tags per page for major sections
- `<h3>` and below for sub-points
- Never skip levels (h1 → h3 is invalid)
- Headings should describe the section (not generic like "Section 1")

## URL Best Practices
✅ Good: `/blog/website-qa-checklist`
❌ Bad: `/blog?id=123&cat=4&session=abc`
❌ Bad: `/Blog/Website_QA_Checklist`
❌ Bad: `/page1/subpage2/subpage3/subpage4/content`

- Max recommended depth: 3 levels (`/category/subcategory/page`)
- Max URL length: 75–100 characters (Google supports more but shorter is better)
- Use hyphens, never underscores
- All lowercase

## Robots.txt Common Mistakes
```
# BAD — blocks everything
User-agent: *
Disallow: /

# GOOD — blocks only admin
User-agent: *
Disallow: /admin/
Disallow: /private/
Allow: /
```

## Canonical Tag Patterns
```html
<!-- Self-referencing (most pages) -->
<link rel="canonical" href="https://example.com/page/" />

<!-- Pagination — each paginated page SELF-canonicalizes.
     Do NOT point page 2+ at page 1: Google treats that as a soft error
     and may drop the paginated pages (and the posts only linked from
     them) out of crawling entirely. -->
<link rel="canonical" href="https://example.com/blog/page/2/" />

<!-- www to non-www handled by redirect, not canonical alone -->
```

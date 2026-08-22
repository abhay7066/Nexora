# Astro Project Structure

Standard layout for all projects. Never deviate from this structure.

---

```
project-root/
│
├── .agent/
│   ├── project-map.json        ← Figma nodeIds, content collections, component registry
│   └── session.md              ← Resume state: pending/in-progress/completed
│
├── public/
│   ├── images/                 ← All images (never hotlink Figma CDN)
│   │   ├── logo.svg
│   │   ├── hero-bg.webp
│   │   └── <page>-<desc>.<ext>
│   ├── fonts/                  ← Self-hosted fonts (optional, woff2)
│   └── favicon.svg
│
├── src/
│   ├── components/             ← Reusable UI (used 2+ places)
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── ContactForm.astro   ← Static-site contact form (see /integrating-contact-form)
│   │   ├── Button.astro
│   │   ├── Icon.astro
│   │   │
│   │   └── blog/               ← Blog-specific
│   │       ├── BlogCard.astro
│   │       └── LatestPosts.astro
│   │
│   ├── content/                ← Content collections (see content-collections.md)
│   │   ├── config.ts           ← Schemas for blog/team/services/etc.
│   │   └── blog/*.md
│   │
│   ├── layouts/
│   │   ├── Layout.astro        ← Wraps ALL pages: Header + Footer + SEO
│   │   └── BlogLayout.astro    ← For blog posts, reading from src/content/blog
│   │
│   ├── pages/                  ← File-based routing (each = a URL)
│   │   ├── index.astro         ← Homepage
│   │   ├── about.astro         ← /about/
│   │   ├── contact.astro       ← /contact/
│   │   └── blog/
│   │       ├── index.astro     ← Blog listing
│   │       └── [slug].astro    ← Individual post
│   │
│   ├── data/                   ← Site-wide singleton config (nav, footer, SEO defaults)
│   │   └── site.ts
│   │
│   ├── lib/                    ← Logic (no UI)
│   │   └── utils.ts            ← Shared helpers (slugify, formatDate, etc.)
│   │
│   ├── styles/
│   │   └── global.css          ← Tailwind v4: @import, @theme, @layer
│   │                              (no tailwind.config — tokens in @theme)
│   │
│   └── types/
│       └── figma.ts            ← Figma API response types
│
├── DESIGN.md                   ← Design system tokens (written once)
├── astro.config.mjs            ← Config: site URL, output, trailingSlash
├── tsconfig.json               ← TypeScript strict mode
├── .env                        ← Third-party form/service keys (never commit secrets)
├── .env.example                ← Template for .env
└── package.json
```

---

## File Naming Conventions

| Type | Convention | Example |
|---|---|---|
| Astro component | PascalCase | `HeroSection.astro` |
| Page | lowercase | `index.astro`, `[slug].astro`, `about.astro` |
| Lib/utils function | camelCase | `utils.ts`, `downloadImage.ts` |
| Image asset | kebab-case | `hero-bg.webp`, `team-john.jpg`, `logo.svg` |
| CSS class | kebab-case | `.btn-primary`, `.flex-center`, `.section-padding` |

---

## Component vs Page Section

**Components** (`src/components/`) — reused 2+ places:
- Header, Footer
- BlogCard (used in archive + homepage)
- Button, Icon
- ContactForm
- LatestPosts (sidebar + homepage)

**Page sections** — one-off blocks inline in a single page:
- Hero section (homepage only)
- Features section (homepage only)
- Testimonials section (homepage only)
- Write inline in `src/pages/index.astro`, NOT as separate component file

**Always extract as component (even if used once):**
- Maps / location embeds (likely reused later)
- Contact forms (already in boilerplate — see /integrating-contact-form)
- Cookie banners (site-wide, lives in Layout)
- Newsletter opt-in (footer + mid-page CTAs)

---

## Page Structure

Every page:

```astro
---
export const prerender = true;
import Layout from '../../layouts/Layout.astro';
import { getCollection } from 'astro:content';

// Content collection fetch if needed (see content-collections.md)
const posts = await getCollection('blog');
---

<Layout title="Page Title" description="...">
  <!-- sections inline, not imported -->
  <section>Hero</section>
  <section>Features</section>
  <section>CTA</section>
</Layout>
```

---

## Imports

Always **relative paths** — never `@/` aliases:

```ts
// ✅ From src/pages/about.astro
import Layout from '../../layouts/Layout.astro';
import { getCollection } from 'astro:content';

// ❌ Never
import Layout from '@/layouts/Layout.astro';
```

Adjust `../` depth based on file location.

---

## Trailing Slashes

All internal `<a href>` links **must** include trailing slash:

```astro
<!-- ✅ -->
<a href="/about/">About</a>
<a href="/blog/">Blog</a>
<a href="/contact/">Contact</a>

<!-- ❌ -->
<a href="/about">About</a>
<a href="/blog">Blog</a>
```

Applies to:
- `<a href>`
- `redirect()` destinations
- Internal URL strings in component props

Does NOT apply to:
- External links
- `<img src>` attributes
- `site:` in `astro.config.mjs`

# Content Collections & Local Config

This project has no CMS and no backend API. Two mechanisms replace what a headless CMS would otherwise provide:

| Content shape | Mechanism | Location |
|---|---|---|
| Repeating items of the same shape (blog posts, team members, services, testimonials, portfolio items, FAQ) | **Astro content collection** | `src/content/<name>/*.md`, schema in `src/content/config.ts` |
| Site-wide singleton values (nav items, footer, contact info, social links, SEO defaults) | **Local TypeScript config** | `src/data/*.ts` |
| One-off page content (hero copy, a single testimonial quote, a features grid that appears once) | **Inline markup** | Directly in the `.astro` page/component |

Picking the right one matters: don't build a "collection" with one entry, and don't hardcode a list that's clearly repeating (three team members today will be eight next month).

---

## Defining a Collection

All schemas live in one file, `src/content/config.ts`, using the Content Layer API:

```ts
// src/content/config.ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    publishDate: z.coerce.date(),
    featuredImage: z.string().optional(),
    author: z.string().optional(),
    category: z.string().optional(),
  }),
});

const team = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/team' }),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    photo: z.string(),
    bio: z.string(),
    order: z.number().default(0),
  }),
});

const services = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/services' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    icon: z.string().optional(),
    order: z.number().default(0),
  }),
});

export const collections = { blog, team, services };
```

Add a new collection by defining its schema here and adding it to the exported `collections` object. Design the fields around what the Figma section actually shows — don't copy this example verbatim if the design has different fields.

---

## Writing Entries

Each item is one markdown file with frontmatter matching the schema:

```markdown
---
title: "5 Ways to Improve Your Workflow"
excerpt: "A quick look at practical changes that save time every day."
publishDate: 2026-06-01
featuredImage: "/images/blog-workflow.jpg"
author: "Jamie Chen"
category: "Productivity"
---

Full post body goes here, written in markdown. This becomes `post.body` /
`<Content />` when rendered on the single-post page.
```

Save as `src/content/blog/5-ways-to-improve-your-workflow.md` — kebab-case filename, no spaces.

### Placeholder Entries During Scaffolding

While building the section (before the client has supplied real copy), write 2–4 **realistic** placeholder entries using text and structure taken from the Figma design itself — not "Lorem ipsum", not `{ title: 'Post Title One' }` stand-ins. Note in `session.md` which collections are still placeholder so they get swapped for real content before launch (see `build-and-handoff.md`).

Replacing a placeholder with real content later is a **data change** — edit or add markdown files — never a code change to the page or schema (unless the real content needs a field the placeholder didn't anticipate, in which case extend the schema first).

---

## Querying Collections

```ts
import { getCollection, getEntry, render } from 'astro:content';

// All entries
const posts = await getCollection('blog');

// Sorted (newest first)
const sorted = [...posts].sort(
  (a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf()
);

// Single entry by filename slug
const post = await getEntry('blog', 'my-first-post');

// Rendered markdown body (for a single-post page)
const { Content } = await render(post);
```

```astro
---
export const prerender = true;
import Layout from '../../layouts/Layout.astro';
import { getCollection } from 'astro:content';

const services = (await getCollection('services')).sort((a, b) => a.data.order - b.data.order);
---

<Layout title="Services">
  <section class="section-padding">
    <div class="container-xl grid grid-cols-12 gap-6">
      {services.map(item => (
        <div class="col-span-12 md:col-span-6 xl:col-span-4 card p-6">
          <h3 class="heading-3">{item.data.title}</h3>
          <p class="body-text">{item.data.summary}</p>
        </div>
      ))}
    </div>
  </section>
</Layout>
```

### Single-item pages with `getStaticPaths()`

```astro
---
// src/pages/team/[slug].astro
export const prerender = true;
import Layout from '../../layouts/Layout.astro';
import { getCollection, render } from 'astro:content';

export async function getStaticPaths() {
  const members = await getCollection('team');
  return members.map(member => ({
    params: { slug: member.id },
    props: { member },
  }));
}

const { member } = Astro.props;
const { Content } = await render(member);
---

<Layout title={member.data.name}>
  <section class="section-padding">
    <div class="container-xl">
      <h1 class="heading-1">{member.data.name}</h1>
      <p class="body-text">{member.data.role}</p>
      <Content />
    </div>
  </section>
</Layout>
```

No auth, no rate limiting, no network fetch — collections are read from disk at build time, so there's nothing to configure beyond the schema.

---

## Local Config for Nav, Footer, and Site Settings

These are **not** collections — they're singleton values, so they're plain typed exports:

```ts
// src/data/nav.ts
export interface NavItem {
  title: string;
  url: string;
}

export const navItems: NavItem[] = [
  { title: 'Home', url: '/' },
  { title: 'About', url: '/about/' },
  { title: 'Services', url: '/services/' },
  { title: 'Blog', url: '/blog/' },
  { title: 'Contact', url: '/contact/' },
];
```

```ts
// src/data/footer.ts
export const footerColumns = [
  {
    heading: 'Company',
    links: [
      { title: 'About', url: '/about/' },
      { title: 'Careers', url: '/careers/' },
    ],
  },
  {
    heading: 'Resources',
    links: [
      { title: 'Blog', url: '/blog/' },
      { title: 'FAQ', url: '/faq/' },
    ],
  },
];

export const socialLinks = [
  { platform: 'LinkedIn', url: 'https://linkedin.com/company/example' },
  { platform: 'Instagram', url: 'https://instagram.com/example' },
];
```

```ts
// src/data/site.ts
export const siteConfig = {
  name: 'Example Co',
  tagline: 'Short brand description from Figma/DESIGN.md',
  contactEmail: 'hello@example.com',
  contactPhone: '+1 (555) 010-0100',
  address: '123 Main St, City, ST 00000',
  defaultOgImage: '/images/og-default.jpg',
};
```

Components import directly:

```astro
---
import { navItems } from '../data/nav';
import { siteConfig } from '../data/site';
---
```

Update these files whenever the client's real contact info, nav structure, or footer links are known — same "placeholder now, real value later" rule applies as with content collections, just without the markdown/schema layer since there's only ever one of each.

---

## State Tracking

Register collections in `project-map.json` as they're created:

```json
{
  "contentCollections": {
    "blog": { "configured": true, "entryCount": 3, "placeholder": true },
    "team": { "configured": true, "entryCount": 4, "placeholder": true },
    "services": { "configured": true, "entryCount": 3, "placeholder": false }
  }
}
```

`"placeholder": true` means the entries still need to be replaced with the client's real content before launch — clear it once real copy is in.

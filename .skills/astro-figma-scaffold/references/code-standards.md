# Code Standards

All Astro files must follow these rules.

---

## Component Template

```astro
---
interface Props {
  title: string;
  // Always type props
}
const { title } = Astro.props;

// Content collection fetch if needed (runs at build time)
import { getCollection } from 'astro:content';
const posts = await getCollection('blog');
---

<section class="section-padding bg-surface">
  <div class="container-xl">
    <h2 class="heading-2">{title}</h2>
    <!-- content -->
  </div>
</section>
```

---

## Layout Rules — Grid First

**Default to 12-column CSS grid.** Only use flexbox when grid cannot express it.

### Grid by default

```astro
<!-- 2-col split (6/6 columns) -->
<div class="grid grid-cols-12 gap-8 items-center">
  <div class="col-span-12 xl:col-span-6">Text</div>
  <div class="col-span-12 xl:col-span-6">Image</div>

<!-- 3-col cards (4/4/4 columns) -->
<div class="grid grid-cols-12 gap-6">
  <div class="col-span-12 md:col-span-6 xl:col-span-4">Card 1</div>
  <div class="col-span-12 md:col-span-6 xl:col-span-4">Card 2</div>
  <div class="col-span-12 md:col-span-6 xl:col-span-4">Card 3</div>

<!-- Offset layout (5 cols + 1 gap + 6 cols) -->
<div class="grid grid-cols-12 gap-8">
  <div class="col-span-12 xl:col-span-5">Text</div>
  <div class="col-span-12 xl:col-start-7 xl:col-span-6">Image</div>
```

Mobile: `col-span-12` (full width). Desktop: narrow at `xl:` (1200px).

### Flexbox only for:

- Nav / header bar (single row)
- Inline icon + label
- Button with icon
- Free-wrapping tag group
- Centering a single child

---

## Token Hygiene — CSS Variables Only

**Rule:** If a value is in `@theme` (colors, fonts, spacing, radius), use the generated class name. Never use `[arbitrary]` syntax.

### Forbidden (hardcoded)

```astro
<div class="bg-[#f5c518] text-[#09090b] rounded-[4px]">
<img src="..." class="w-[50vw]" />
```

### Required (token class)

```astro
<div class="bg-brand text-dark rounded-md">
<img src="..." class="w-full" />
```

### Inline style="" rule

Use CSS variables, not hex:

```astro
<!-- ❌ -->
<div style="background-color: #f5c518;">

<!-- ✅ -->
<div style="background-color: var(--color-brand);">

<!-- ✅ (background-image always uses url()) -->
<section style={`background-image: url('/images/hero-bg.webp')`}>
```

---

## Spacing & Sizing

- **Padding/margin:** Use Tailwind `py-*`, `px-*`, `py-*`, `gap-*` — never raw CSS
- **Width:** Use `w-full`, `max-w-*`, `col-span-*` — no fixed pixel widths
- **Height:** For non-hero elements, use `h-[px]` if Figma specifies exact px. For heroes, use `min-h-[80vh]`

---

## Viewport Units

| Context | Unit | Example |
|---|---|---|
| Hero / full-section min-height | `vh` or `dvh` | `min-h-[80vh]` ✅ |
| Fluid typography (inside clamp) | `vw` | `font-size: clamp(3rem, 6vw, 5.625rem)` ✅ |
| Everything else | `px` or Tailwind | `h-[480px]`, `py-16` ✅ |

Never use `vw`/`vh` for cards, images, buttons, regular padding/margins.

---

## Common Patterns

### Responsive nav with active state

```astro
---
const currentPath = Astro.url.pathname;
const navItems = [
  { title: 'Home', url: '/' },
  { title: 'About', url: '/about/' },
];
---

<nav class="flex-between container-xl py-4">
  <a href="/"><img src="/images/logo.svg" alt="Logo" class="h-8 w-auto" /></a>

  <!-- Desktop -->
  <ul class="hidden md:flex gap-8">
    {navItems.map(item => (
      <li>
        <a
          href={item.url}
          class:list={[
            'text-sm font-bold uppercase tracking-wider transition-colors',
            currentPath === item.url
              ? 'text-brand'
              : 'text-surface hover:text-brand'
          ]}
        >
          {item.title}
        </a>
      </li>
    ))}
  </ul>

  <!-- Mobile toggle -->
  <button id="mobile-menu-btn" class="md:hidden">☰</button>
</nav>
```

### Content collection placeholder sections

When Figma shows dynamic content (blog posts, team members, etc.) but the content collection hasn't been populated yet:

```astro
{/* CONTENT PLACEHOLDER — replace with getCollection('blog') once entries exist */}
<section class="section-padding bg-surface">
  <div class="container-xl">
    <h2 class="heading-2">Latest News</h2>
    <div class="grid grid-cols-12 gap-6 mt-10">
      {[
        { title: 'Post Title One', excerpt: 'Short excerpt.', img: '/images/blog-1.jpg' },
        { title: 'Post Title Two', excerpt: 'Short excerpt.', img: '/images/blog-2.jpg' },
      ].map(post => (
        <div class="col-span-12 md:col-span-6 xl:col-span-4 card p-6">
          <img src={post.img} alt={post.title} class="w-full h-[200px] object-cover rounded mb-4" loading="lazy" />
          <h3 class="heading-3 mb-2">{post.title}</h3>
          <p class="body-text">{post.excerpt}</p>
        </div>
      ))}
    </div>
  </div>
</section>
```

Use **real content from Figma design** for placeholders, not "Lorem ipsum". Note in `session.md` that this is a content placeholder.

---

## File Naming

| Type | Convention | Example |
|---|---|---|
| Component | PascalCase | `HeroSection.astro` |
| Page | lowercase | `index.astro`, `[slug].astro` |
| Lib/utils | camelCase | `utils.ts` |
| Image | kebab-case | `hero-bg.webp`, `team-john.jpg` |
| CSS class | kebab-case | `.btn-primary`, `.flex-center` |

---

## Imports

Always use **relative paths** — never `@/` aliases:

```ts
import { getCollection } from 'astro:content';
import Button from '../../components/Button.astro';
```

Adjust `../` depth to match file location.

---

## Every Page Must Have

```astro
export const prerender = true;
import Layout from '../../layouts/Layout.astro';

// page content
<Layout title="Page Title" description="...">
  <!-- sections -->
</Layout>
```

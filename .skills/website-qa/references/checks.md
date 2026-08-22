# Detailed QA Checklists

## 1. Design Fidelity Checklist

### Colours
- [ ] Primary brand colour matches Figma (check hex/RGB value)
- [ ] Secondary colours match
- [ ] Background colours match
- [ ] Text colours match (headings, body, captions)
- [ ] Link colours and hover states match
- [ ] Button fill / border / text colours match
- [ ] Gradient directions and stops match

### Typography
- [ ] Font families match DESIGN.md / design system (Google Fonts, custom, system fonts)
- [ ] Heading font sizes match (px / rem / vw)
- [ ] Body font size matches
- [ ] Line-height values match
- [ ] Letter-spacing matches
- [ ] Font weights match (400, 500, 600, 700…)
- [ ] Text alignment matches (left, center, right, justify)

### Layout & Spacing
- [ ] Section padding/margin matches Figma
- [ ] Grid column widths match
- [ ] Gutters between elements match
- [ ] Max-width container matches
- [ ] Card/component padding matches
- [ ] Gap between grid items matches

### Components
- [ ] Navigation bar layout, logo size, link styles match
- [ ] Hero section composition matches
- [ ] Cards: border-radius, shadow, internal layout match
- [ ] Buttons: size, radius, padding, icon placement match
- [ ] Form fields: height, border, focus style match
- [ ] Footer layout and column structure match
- [ ] Modals/overlays match if visible

### Imagery & Icons
- [ ] Correct images used (not placeholders)
- [ ] Image aspect ratios match
- [ ] Icon style consistent (outlined vs filled, weight)
- [ ] Icon sizes match
- [ ] Illustrations/graphics match Figma artwork

---

## 2. Content Accuracy Checklist

- [ ] No Lorem Ipsum or placeholder text anywhere
- [ ] No "TODO", "TBD", "Coming Soon", "PLACEHOLDER" text
- [ ] All product/service names spelled consistently
- [ ] Pricing figures match official source
- [ ] Phone numbers, addresses, emails are real and correct
- [ ] Copyright year is current
- [ ] All links open correct destinations (spot-check 5+ links)
- [ ] Images have appropriate captions/alt context
- [ ] CTAs present on each major section
- [ ] CTA copy is action-oriented (not "Submit" alone)
- [ ] Legal pages linked (Privacy Policy, Terms)
- [ ] No broken media embeds (videos, maps, social feeds)
- [ ] Blog/news dates are accurate and not in the future
- [ ] Social media links go to correct profiles

---

## 3. Grammar & Spelling Checklist

### Common Errors to Scan For
- [ ] its vs it's
- [ ] their / there / they're
- [ ] your / you're
- [ ] affect / effect
- [ ] then / than
- [ ] loose / lose
- [ ] complementary / complimentary
- [ ] ensure / insure / assure
- [ ] i.e. vs e.g. (with correct commas)
- [ ] Apostrophes in plurals (e.g., "FAQ's" should be "FAQs")

### Capitalisation
- [ ] Sentence case vs title case used consistently for headings
- [ ] Brand names capitalised correctly
- [ ] Proper nouns capitalised
- [ ] Acronyms introduced and defined on first use

### Punctuation
- [ ] Oxford comma usage consistent
- [ ] Em dash (—) vs en dash (–) used correctly
- [ ] No double spaces
- [ ] Quotation mark style consistent (curly vs straight)
- [ ] Ellipsis uses … not three separate dots

### Style Consistency
- [ ] American or British English — pick one and stick to it
- [ ] Percent written as % or "percent" consistently
- [ ] Numbers: figures vs words consistent (e.g., numbers below 10 spelled out)
- [ ] Time format consistent (12h vs 24h)
- [ ] Date format consistent (MM/DD/YYYY vs DD/MM/YYYY)

---

## 4. On-Page SEO Checklist

### Title Tag
- [ ] `<title>` exists
- [ ] Length 50–60 characters (Google truncates at ~60)
- [ ] Primary keyword near the beginning
- [ ] Brand name included (usually at end, separated by `|` or `-`)
- [ ] Unique across all pages
- [ ] No keyword stuffing

### Meta Description
- [ ] `<meta name="description">` exists
- [ ] Length 120–160 characters
- [ ] Contains primary keyword naturally
- [ ] Includes a call-to-action or value proposition
- [ ] Unique across all pages
- [ ] No duplicate of title tag

### Headings
- [ ] Exactly one `<h1>` on page
- [ ] `<h1>` contains primary keyword
- [ ] `<h2>` tags used for major sections (2–6 per page typical)
- [ ] `<h3>` tags used for sub-sections under `<h2>`
- [ ] No heading levels skipped (e.g., h1 → h3)
- [ ] Headings describe the section content accurately

### Images
- [ ] Every `<img>` has a non-empty `alt` attribute
- [ ] `alt` text is descriptive (not "image1.jpg" or "photo")
- [ ] Decorative images have `alt=""`
- [ ] File names are descriptive (kebab-case, keyword-relevant)

### Links
- [ ] Internal links use descriptive anchor text
- [ ] No "click here" or "read more" without context
- [ ] External links to low-quality sites avoided
- [ ] No broken links (check at least the main CTAs)

### URL
- [ ] Lowercase letters only
- [ ] Hyphens as word separators (not underscores)
- [ ] Short and descriptive
- [ ] Contains primary keyword
- [ ] No parameters or session IDs

### Open Graph & Social
- [ ] `og:title` present
- [ ] `og:description` present
- [ ] `og:image` present (1200×630px recommended)
- [ ] `og:url` present
- [ ] `twitter:card` present
- [ ] `twitter:title`, `twitter:description`, `twitter:image` present

---

## 5. Technical SEO Checklist

### Crawlability
- [ ] `<meta name="robots">` does NOT contain `noindex` (unless intentional)
- [ ] Page is not blocked by `X-Robots-Tag: noindex` header
- [ ] `/robots.txt` accessible at root, no accidental `Disallow: /`
- [ ] `/sitemap.xml` accessible (or `/sitemap_index.xml`)
- [ ] Sitemap includes this URL

### Canonical & Duplicate Content
- [ ] `<link rel="canonical">` present
- [ ] Canonical points to the correct URL (self-referencing unless intentional)
- [ ] www vs non-www consistent (one redirects to the other)
- [ ] Trailing slash consistent

### HTTPS & Security
- [ ] Page served over HTTPS
- [ ] No mixed-content warnings (HTTP resources on HTTPS page)
- [ ] HSTS header present (bonus)

### Structured Data (JSON-LD)
- [ ] At least one structured data type present if applicable:
  - Organisation / WebSite on homepage
  - Article / BlogPosting on blog posts
  - Product + Offer on product pages
  - LocalBusiness on location pages
  - BreadcrumbList if breadcrumbs shown
  - FAQPage if FAQ section present
- [ ] JSON-LD is valid (no syntax errors)
- [ ] Required fields present for the schema type
- [ ] No spammy or misleading markup

### Internationalisation
- [ ] `hreflang` tags present if multiple language/region versions exist
- [ ] `lang` attribute on `<html>` set correctly

### JavaScript Rendering
- [ ] Critical content is not JS-only (check with JS disabled / raw HTML fetch)
- [ ] No client-side only meta tags that Googlebot won't see

### Performance Signals
- [ ] Core Web Vitals signals estimated (see Speed section)
- [ ] No AMP issues if AMP page

---

## 6. Responsive Layout Checklist

Test each at: 375px / 768px / 1280px / 1920px

### All Breakpoints
- [ ] No horizontal scrollbar appears
- [ ] No content is clipped/cut off
- [ ] No overlapping elements
- [ ] Text remains readable (min 16px for body)
- [ ] Images do not overflow their containers
- [ ] Buttons remain tappable / clickable
- [ ] White space remains intentional (not excessive gaps)

### Mobile (375px)
- [ ] Navigation collapses to hamburger or mobile menu
- [ ] Mobile menu opens, closes, and navigates correctly
- [ ] Hero text remains legible (font size not too small)
- [ ] Touch targets ≥ 44×44px (Apple HIG / WCAG 2.5.8)
- [ ] Forms are usable on mobile
- [ ] Tables either scroll horizontally or restructure for mobile
- [ ] No tiny text that requires pinch-to-zoom

### Tablet (768px)
- [ ] Layout transitions gracefully from mobile
- [ ] Two-column layouts work as intended
- [ ] Sidebar content is accessible
- [ ] Navigation is appropriate (full nav or collapsed)

### Desktop (1280px)
- [ ] Content not stretched too wide (max-width container present)
- [ ] Multi-column grids display correctly
- [ ] Hover states work

### Wide (1920px)
- [ ] Max-width container prevents infinite stretching
- [ ] Background fills edge-to-edge if designed to

---

## 7. Semantic HTML Checklist

### Document Structure
- [ ] `<!DOCTYPE html>` present
- [ ] `<html lang="en">` (or appropriate language code)
- [ ] `<head>` contains `<meta charset="UTF-8">`
- [ ] `<head>` contains `<meta name="viewport" content="width=device-width, initial-scale=1">`
- [ ] `<title>` inside `<head>`

### Landmark Elements
- [ ] `<header>` used for site header (not just `<div class="header">`)
- [ ] `<nav>` used for primary navigation
- [ ] `<main>` wraps the primary page content (only one per page)
- [ ] `<footer>` used for site footer
- [ ] `<aside>` used for sidebar or supplementary content
- [ ] `<section>` used for thematically grouped content (has heading)
- [ ] `<article>` used for self-contained content (blog post, card)

### Headings
- [ ] Only one `<h1>` per page
- [ ] Logical heading hierarchy (h1 → h2 → h3)
- [ ] Headings are not used purely for visual sizing

### Lists
- [ ] Navigation items are inside `<ul><li>`
- [ ] Ordered steps use `<ol><li>`
- [ ] Definition lists use `<dl><dt><dd>`

### Links & Buttons
- [ ] `<a href>` used for navigation (not `<div onclick>`)
- [ ] `<button>` used for actions (not `<a>` with no href)
- [ ] Icon-only buttons have `aria-label`

### Images
- [ ] All images have `alt` attribute
- [ ] Decorative images: `alt=""` and `role="presentation"` or CSS background

### Forms
- [ ] Every `<input>` has an associated `<label>` (via `for`/`id` or wrapping)
- [ ] `<fieldset>` and `<legend>` used for radio/checkbox groups
- [ ] `<button type="submit">` not `<input type="submit">` (preferred)
- [ ] Required fields have `required` attribute
- [ ] Autocomplete attributes set where applicable

### Tables
- [ ] `<thead>`, `<tbody>`, `<tfoot>` used
- [ ] `<th>` has `scope="col"` or `scope="row"`
- [ ] `<caption>` present for data tables

### Deprecated / Problematic Tags
- [ ] No `<font>`, `<center>`, `<marquee>`, `<blink>`, `<frame>`
- [ ] No `<b>` or `<i>` where `<strong>` or `<em>` is semantically correct
- [ ] No inline `style=""` attributes (should be in CSS) — EXCEPT `background-image` and genuinely dynamic values, which the project convention requires to be inline; do not flag those
- [ ] ARIA roles not duplicating native semantics (e.g., `<button role="button">`)

---

## 8. Page Load Speed Checklist

### Images
- [ ] Images served in next-gen formats (WebP, AVIF) where possible
- [ ] No image larger than 200KB for a standard web image (hero can be up to 400KB)
- [ ] `width` and `height` attributes on `<img>` to prevent CLS
- [ ] Below-fold images have `loading="lazy"`
- [ ] `srcset` and `sizes` used for responsive images

### JavaScript
- [ ] No render-blocking `<script>` in `<head>` without `defer` or `async`
- [ ] Scripts loaded with `defer` (preferred) or `async`
- [ ] Third-party scripts (chat widgets, analytics, ads) don't block render
- [ ] No large bundles >500KB uncompressed

### CSS
- [ ] No render-blocking CSS in `<body>` (only in `<head>`)
- [ ] Critical CSS inlined if needed for above-fold content
- [ ] Unused CSS not loaded (check for massive framework dumps)

### Fonts
- [ ] Web fonts loaded with `font-display: swap` or `optional`
- [ ] No more than 2–3 font families
- [ ] Font files preloaded with `<link rel="preload">` for critical fonts

### Caching & Delivery
- [ ] Static assets served with long cache-control headers
- [ ] CDN used for static assets
- [ ] Gzip or Brotli compression enabled (check response headers)

### Core Web Vitals Targets
| Metric | Good | Needs Improvement | Poor |
|---|---|---|---|
| LCP (Largest Contentful Paint) | < 2.5s | 2.5–4.0s | > 4.0s |
| CLS (Cumulative Layout Shift) | < 0.1 | 0.1–0.25 | > 0.25 |
| INP (Interaction to Next Paint) | < 200ms | 200–500ms | > 500ms |

---

## 9. Accessibility Checklist

### Colour & Contrast
- [ ] Normal text (< 18px): contrast ratio ≥ 4.5:1
- [ ] Large text (≥ 18px or 14px bold): contrast ratio ≥ 3:1
- [ ] UI components and focus indicators: ≥ 3:1 against adjacent colours
- [ ] Information not conveyed by colour alone

### Keyboard Navigation
- [ ] All interactive elements reachable by Tab key
- [ ] Tab order is logical (follows visual reading order)
- [ ] Focus indicator visible (not `outline: none` without replacement)
- [ ] Skip-to-main-content link at top of page
- [ ] Modals trap focus when open; return focus on close
- [ ] No keyboard traps (can navigate away from any element)

### Screen Reader Support
- [ ] `aria-label` on icon-only buttons
- [ ] `aria-expanded` on toggles (dropdowns, accordions)
- [ ] `aria-hidden="true"` on decorative icons
- [ ] Live regions (`aria-live`) for dynamic content updates
- [ ] Error messages programmatically associated with inputs (`aria-describedby`)

### Media
- [ ] Videos have captions or transcript
- [ ] No content autoplay without user consent
- [ ] Audio-only content has transcript
- [ ] Animations respect `prefers-reduced-motion`

### Forms
- [ ] Error messages clearly describe what's wrong
- [ ] Success confirmation communicated to screen readers
- [ ] No timeout on forms without warning

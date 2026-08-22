---
version: alpha
name: "Nexora"
description: "Light, minimal, premium design system for Nexora — violet primary on a warm off-white, ported verbatim from the React build."
colors:
  primary: "oklch(0.45 0.16 300)"
  primaryForeground: "oklch(0.992 0.002 260)"
  background: "oklch(0.985 0.003 260)"
  foreground: "oklch(0.18 0.012 260)"
  surface: "oklch(0.96 0.005 260)"
  surfaceElevated: "oklch(0.94 0.008 260)"
  card: "oklch(0.99 0.002 260)"
  muted: "oklch(0.94 0.006 260)"
  mutedForeground: "oklch(0.48 0.015 260)"
  accent: "oklch(0.95 0.008 260)"
  accentForeground: "oklch(0.45 0.16 300)"
  destructive: "oklch(0.55 0.18 27)"
  border: "oklch(0.18 0.012 260 / 0.08)"
  input: "oklch(0.18 0.012 260 / 0.12)"
  ring: "oklch(0.45 0.16 300 / 0.6)"
typography:
  h1: { fontFamily: "Space Grotesk", fontSize: "clamp(3rem, 5vw, 5.25rem)", fontWeight: 500, lineHeight: "1.02" }
  h2: { fontFamily: "Space Grotesk", fontSize: "clamp(2.25rem, 4vw, 3.5rem)", fontWeight: 500, lineHeight: "1.05" }
  h3: { fontFamily: "Space Grotesk", fontSize: "1.5rem", fontWeight: 500, lineHeight: "1.3" }
  body: { fontFamily: "Inter Tight", fontSize: "1rem", fontWeight: 400, lineHeight: "1.6" }
  lead: { fontFamily: "Inter Tight", fontSize: "1.125rem", fontWeight: 400, lineHeight: "1.6" }
  mono: { fontFamily: "JetBrains Mono", fontSize: "0.75rem", fontWeight: 400, lineHeight: "1.4" }
  eyebrow: { fontFamily: "Inter Tight", fontSize: "0.72rem", fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase" }
spacing:
  base: "0.25rem"
  section: "clamp(4rem, 8vw, 8rem)"
  containerMax: "1240px"
  containerPadding: "clamp(1.25rem, 4vw, 2.5rem)"
rounded:
  sm: "0.5rem"
  md: "0.625rem"
  lg: "0.75rem"
  xl: "1rem"
  "2xl": "1.25rem"
  "3xl": "1.5rem"
  pill: "999px"
motion:
  easeOutExpo: "cubic-bezier(0.16, 1, 0.3, 1)"
  durFast: "180ms"
  durBase: "320ms"
  durSlow: "640ms"
  reveal: "0.7s cubic-bezier(0.16, 1, 0.3, 1)"
---

# Nexora Design System

Light-first, minimal, premium. Every colour is `oklch`. **Never hardcode a colour
in a component — use a token.** Tailwind v4 keeps its tokens in
`src/styles/global.css` under `@theme inline`; there is no `tailwind.config` file.

Ported verbatim from the React build's `src/styles.css`, so this file documents
what already ships rather than proposing anything new.

Last synced: 2026-08-09

## Colors

| Role | Token | Value | Tailwind class |
|---|---|---|---|
| Primary (violet) | `--primary` | `oklch(0.45 0.16 300)` | `bg-primary` `text-primary` |
| On primary | `--primary-foreground` | `oklch(0.992 0.002 260)` | `text-primary-foreground` |
| Page background | `--background` | `oklch(0.985 0.003 260)` | `bg-background` |
| Body text | `--foreground` | `oklch(0.18 0.012 260)` | `text-foreground` |
| Raised surface | `--surface` | `oklch(0.96 0.005 260)` | `bg-surface` |
| Higher surface | `--surface-elevated` | `oklch(0.94 0.008 260)` | `bg-surface-elevated` |
| Card | `--card` | `oklch(0.99 0.002 260)` | `bg-card` |
| Muted fill | `--muted` | `oklch(0.94 0.006 260)` | `bg-muted` |
| Secondary text | `--muted-foreground` | `oklch(0.48 0.015 260)` | `text-muted-foreground` |
| Accent fill | `--accent` | `oklch(0.95 0.008 260)` | `bg-accent` |
| Destructive | `--destructive` | `oklch(0.55 0.18 27)` | `text-destructive` |
| Hairline | `--border` | `oklch(0.18 0.012 260 / 0.08)` | `border-border` |
| Focus ring | `--ring` | `oklch(0.45 0.16 300 / 0.6)` | `ring-ring` |

### Gradients

| Name | Token | Used by |
|---|---|---|
| Hero wash | `--gradient-hero` | `PageHero`, `404` |
| Primary sweep | `--gradient-primary` | `.text-gradient-primary` |
| Surface sweep | `--gradient-surface` | `.surface-card` |
| Headline sweep | `--gradient-text` | `.text-gradient` |

## Typography

| Style | Family | Size | Weight | Line height |
|---|---|---|---|---|
| Display / headings | Space Grotesk | see YAML | 500 | 1.02–1.3 |
| Body | Inter Tight | 1rem | 400 | 1.6 |
| Mono / eyebrow numerals | JetBrains Mono | 0.75rem | 400–500 | 1.4 |

Headings set `letter-spacing: -0.02em`. Body sets
`font-feature-settings: "ss01", "cv11"`. Fonts load from Google Fonts with
`&display=swap`, preconnected and non-blocking.

## Layout & Spacing

| Item | Value | Utility |
|---|---|---|
| Container max width | 1240px | `.container-page` |
| Container padding | `clamp(1.25rem, 4vw, 2.5rem)` | `.container-page` |
| Section rhythm | `clamp(4rem, 8vw, 8rem)` | `--section-y` via `Section.astro` |
| Grid overlay | 56px × 56px, radial-masked | `.grid-bg` |

## Shapes

| Name | Value |
|---|---|
| `--radius` | `0.75rem` |
| Cards | `--radius-2xl` (`1.25rem`) via `.surface-card` |
| Buttons | `rounded-md`, or `rounded-full` for CTAs |

## Motion

| Name | Value | Where |
|---|---|---|
| Reveal (fadeUp) | opacity 0→1, y 24px→0, `0.7s` `--ease-out-expo` | `[data-reveal]` |
| Reveal trigger | IntersectionObserver, threshold 0.25, once | `Layout.astro` |
| Stagger | `delayChildren + N × staggerChildren`, baked into `--reveal-delay` at build time | section templates |
| SVG draw-on | `stroke-dashoffset`, `1.5s ease-out` | `[data-draw]` |
| Ambient loops | orbs 25/30s, grid 40s, flow pulses 10–18s, nodes 3–4s, particles 8s | `HeroBackground` |

All looping animation is suppressed and reveals resolve immediately under
`prefers-reduced-motion: reduce`.

## Components

| Component | Astro file | Status |
|---|---|---|
| Layout | `src/layouts/Layout.astro` | built |
| Header | `src/components/layout/Header.astro` | built |
| Footer | `src/components/layout/Footer.astro` | built |
| Container | `src/components/layout/Container.astro` | built |
| Section | `src/components/layout/Section.astro` | built |
| PageHero | `src/components/layout/PageHero.astro` | built |
| HeroBackground | `src/components/layout/HeroBackground.astro` | built |
| Logo | `src/components/common/Logo.astro` | built |
| Icon | `src/components/common/Icon.astro` | built |
| Eyebrow | `src/components/common/Eyebrow.astro` | built |
| ArrowLink | `src/components/common/ArrowLink.astro` | built |
| SectionHeading | `src/components/common/SectionHeading.astro` | built |
| CursorTrail | `src/components/common/CursorTrail.astro` | built |
| Home sections (×12) | `src/components/sections/home/` | built |
| About sections (×3) | `src/components/sections/about/` | built |
| ContactForm | `src/components/sections/contact/ContactForm.astro` | built (placeholder submit) |

## Pages

| Route | Astro file | Status |
|---|---|---|
| `/` | `src/pages/index.astro` | built |
| `/about/` | `src/pages/about.astro` | built |
| `/services/` | `src/pages/services.astro` | built |
| `/industries/` | `src/pages/industries.astro` | built |
| `/portfolio/` | `src/pages/portfolio.astro` | built |
| `/case-studies/` | `src/pages/case-studies.astro` | built |
| `/insights/` | `src/pages/insights.astro` | built |
| `/contact/` | `src/pages/contact.astro` | built |
| `/404` | `src/pages/404.astro` | built (noindex) |
| `/maintenance/` | `src/pages/maintenance.astro` | boilerplate (noindex) |

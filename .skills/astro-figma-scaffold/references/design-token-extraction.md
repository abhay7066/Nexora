# Design Token Extraction

Extracts colors, fonts, spacing, effects from Figma once, never repeated.

---

## Before Calling Figma

**Check if DESIGN.md already exists with tokens:**

1. Read `DESIGN.md` silently
2. If YAML frontmatter has populated `colors`, `typography`, `spacing`, `rounded` → **SKIP THIS ENTIRE SECTION**. Use existing tokens directly.
3. Only proceed if:
   - `DESIGN.md` is absent, OR
   - `DESIGN.md` exists but is empty/placeholder, OR
   - User explicitly asks to re-sync design

---

## Single Figma Call

Call `get_design_context` **once** on the top-level page frame:

```
get_design_context({
  fileKey: "[extracted from Figma URL]",
  nodeId: "[page frame nodeId]"
})
```

This returns: colors, fonts, spacing, effects, measurements, asset URLs.

Extract **all design data in one pass** — never call again for tokens, only for individual sections.

---

## Write DESIGN.md

Use `google-labs-code/design.md` spec (see AGENTS.md for full spec).

**YAML frontmatter (required):**
```yaml
version: alpha
name: "[Project Name from Q2]"
description: "[One-line brand description from design]"
colors:
  primary: "[hex from Figma primary color]"
  surface: "[hex from Figma background]"
  text: "[hex from Figma body text]"
  textMuted: "[hex from Figma muted text]"
  border: "[hex from Figma borders]"
  # ... add all colors extracted from Figma
typography:
  h1: { fontFamily: "[family]", fontSize: "[px]", fontWeight: [weight], lineHeight: [ratio] }
  h2: { ... }
  h3: { ... }
  body: { ... }
  small: { ... }
  # ... match Figma's text styles
spacing:
  base: "16px"
  section: "[from Figma section padding]"
  containerMax: "[from Q4 or Figma grid]"
  containerPx: "32px"
  cardGap: "[from card spacing in design]"
  gridGap: "[from section grid gap]"
rounded:
  sm: "[from design border radius tokens]"
  md: "[...]"
  lg: "[...]"
  xl: "[...]"
  pill: "99px"
components:
  button-primary: { backgroundColor: "{colors.primary}", textColor: "#fff", ... }
  card: { backgroundColor: "{colors.surface}", borderRadius: "{rounded.lg}", ... }
  # ... component definitions from Figma
```

**Markdown body (required):**

| Section | Content |
|---|---|
| `# Design System — [Project Name]` | Heading + "Last synced: [ISO date]" + Figma fileKey |
| `## Overview` | 2–3 sentences on brand voice, personality, principles |
| `## Colors` | Table: Role \| Token \| Value \| Tailwind class |
| `## Typography` | Table: Style \| Family \| Size \| Weight \| Line height |
| `## Layout & Spacing` | Table: Token \| Value \| Usage |
| `## Shapes` | Table: Token \| Value \| Usage |
| `## Components` | Table: Component \| Figma nodeId \| Astro file \| Status |
| `## Pages` | Table: Route \| Figma nodeId \| Astro file \| Status |
| `## Do's and Don'ts` | Bullet list of key rules (use semantic classes, don't hotlink, etc.) |

---

## Write src/styles/global.css

Generate from extracted tokens:

```css
@import "tailwindcss";

@theme {
  /* ─── Breakpoints ─────────────────────────────────────
     Standard defaults; override if user provided Q4 value
  */
  --breakpoint-sm:  640px;
  --breakpoint-md:  768px;
  --breakpoint-lg:  1024px;
  --breakpoint-xl:  1200px;
  --breakpoint-2xl: 1440px;
  --breakpoint-3xl: [1660px or Q4 value];

  --container-max: [1660px or Q4 value];

  /* ─── Colors from Figma ────────────────────────────── */
  --color-primary:    "[hex from DESIGN.md colors.primary]";
  --color-surface:    "[...]";
  --color-text:       "[...]";
  --color-text-muted: "[...]";
  /* ... all colors */

  /* ─── Fonts from Figma ─────────────────────────────── */
  --font-sans:    "[family], ui-sans-serif, system-ui, sans-serif";
  --font-display: "[family], ui-sans-serif, system-ui, sans-serif";

  /* ─── Spacing ──────────────────────────────────────── */
  --radius-sm:   "[from DESIGN.md rounded.sm]";
  --radius-md:   "[...]";
  --radius-lg:   "[...]";
  --radius-xl:   "[...]";
  --radius-pill: "99px";
}

@layer base {
  html, body { margin: 0; padding: 0; }
}

@layer utilities {
  /* Semantic classes — used by all pages/components */
  .container-xl    { max-width: var(--container-max); margin-inline: auto; padding-inline: 2rem; }
  .section-padding { padding-block: 5rem; }
  .heading-1       { font-size: clamp(3rem, 6vw, 5.625rem); font-weight: 900; line-height: 0.95; }
  .heading-2       { font-size: clamp(2.5rem, 4.5vw, 4.5rem); font-weight: 900; line-height: 0.95; }
  .heading-3       { font-size: 1.875rem; font-weight: 900; }
  .body-text       { font-size: 1rem; line-height: 1.625; }
  .btn-primary     { display: inline-flex; align-items: center; gap: 0.5rem; padding: 1rem 1.5rem; background-color: var(--color-primary); color: #fff; font-weight: 700; border-radius: var(--radius-md); }
  .card            { background-color: var(--color-surface); border-radius: var(--radius-lg); }
  .flex-center     { display: flex; align-items: center; justify-content: center; }
}

/* ─── Scroll Reveal ────────────────────────────────────
   If this block existed before, copy it verbatim here.
   If new, skip until /scroll-reveal skill runs.
*/
@supports (animation: fade-in) {
  [data-reveal] { animation: fade-in 0.6s ease-out; }
}
```

**Before overwriting:** Check if `src/styles/global.css` exists and contains a `/* ─── Scroll Reveal */` block. If yes, copy it verbatim into the new file between `@theme` and `@layer utilities`. Never lose scroll-reveal CSS.

---

## Update project-map.json

Add/update:

```json
{
  "figma": {
    "fileKey": "[extracted from URL]",
    "pages": [
      { "id": "[nodeId]", "name": "[page name]" }
    ]
  }
}
```

---

## Update session.md

Start `### Pending` queue with all discovered sections (from next step: `figma-reading-rules.md`):

```md
### Pending
- [ ] Hero section (nodeId: 123:456)
- [ ] Features section (nodeId: 123:789)
- [ ] Footer prep (nodeId: 123:999)
```

---

## Result

- ✅ `DESIGN.md` written with full token spec
- ✅ `src/styles/global.css` generated with `@theme`, `@layer base`, `@layer utilities`
- ✅ `project-map.json` updated
- ✅ Ready to discover and build sections (see `figma-reading-rules.md`)

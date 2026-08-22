# Complete Workflow

Converts a Figma design into static Astro pages.

---

## Discovery Questions

Ask ALL at once (never one by one):

```
To get started I need a few things — please provide all at once:

1. Figma file URL
2. Project name
3. Enable scroll-reveal animations? (yes / no)
4. Grid / container max width in px (default: 1660 — press Enter to keep)
```

**Q4 handling:**
- User provides value (e.g. `1440`): set `--breakpoint-3xl` and `--container-max` to that value
- User presses Enter: use `1660px` for both

---

## Step 1: Setup

### 1.1 Extract Figma fileKey from URL

Use `scripts/figma-url-parser.mjs`:

```bash
node .skills/astro-figma-wp-scaffold/scripts/figma-url-parser.mjs "https://www.figma.com/design/abc123/Project?node-id=456:789"
# Output: { fileKey: "abc123", nodeId: "456:789" }
```

### 1.2 Run npm install

```bash
npm install
```

### 1.3 Check Figma MCP

Before any Figma fetch:

```
Q: Is Figma MCP connected?
→ Yes: proceed to Figma calls
→ No: STOP and tell user:
   "The Figma MCP is required to scaffold this design. 
    Please connect the Figma MCP and try again — 
    do not use the Figma REST API."
```

Only after confirmation should you proceed with `get_design_context`, `get_metadata`, or `get_screenshot` calls.

### 1.4 Initialize Project State

Create state files:

```bash
node .skills/astro-figma-wp-scaffold/scripts/create-project-map.mjs
node .skills/astro-figma-wp-scaffold/scripts/create-session-md.mjs
```

This creates:
- `.agent/project-map.json` — Figma fileKey, nodeIds, component registry
- `.agent/session.md` — Pending / In Progress / Completed sections

---

## Step 2: Extract Design Tokens

### Before Calling Figma

**Check if DESIGN.md already exists with tokens:**

1. Read `DESIGN.md` silently
2. If YAML frontmatter has populated `colors`, `typography`, `spacing`, `rounded` → **SKIP THIS ENTIRE SECTION**. Use existing tokens directly.
3. Only proceed if:
   - `DESIGN.md` is absent, OR
   - `DESIGN.md` exists but is empty/placeholder, OR
   - User explicitly asks to re-sync design

### Single Figma Call

Call `get_design_context` **once** on the top-level page frame:

```
get_design_context({
  fileKey: "[extracted from Figma URL]",
  nodeId: "[page frame nodeId]"
})
```

This returns: colors, fonts, spacing, effects, measurements, asset URLs.

Extract **all design data in one pass** — never call again for tokens, only for individual sections.

### Write DESIGN.md

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
typography:
  h1: { fontFamily: "[family]", fontSize: "[px]", fontWeight: [weight], lineHeight: [ratio] }
  h2: { ... }
  h3: { ... }
  body: { ... }
  small: { ... }
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
  button-primary: { ... }
  card: { ... }
```

**Markdown body:** Colors table, Typography table, Spacing table, Components table, Pages table.

See `.skills/astro-figma-wp-scaffold/references/design-token-extraction.md` for full spec.

---

## Step 3: Discover Sections

### 3.1 Get Metadata (Page Structure)

Call `get_metadata` on page frame to discover sections + their nodeIds:

```
get_metadata({
  fileKey: "[from project-map.json]",
  nodeId: "[page_frame_nodeId]"
})
```

Returns: list of top-level child sections + their nodeIds.

Write each into `session.md` ### Pending with its nodeId.

### 3.2 Get Screenshot (Visual Confirmation)

Call `get_screenshot` on page frame:

```
get_screenshot({
  fileKey: "[from project-map.json]",
  nodeId: "[page_frame_nodeId]"
})
```

Returns: screenshot URL. **View URL in-context only — do NOT download into project.**

Visually confirm top-to-bottom section reading order matches Figma. If order differs, reorder sections in `session.md` pending queue.

### Why This Sequence Matters

- **Tokens once** — one global `get_design_context` call, never repeated. All other fetches are section-specific.
- **Metadata for structure** — don't use screenshots to discover sections; screenshots can't tell you layer names/nodeIds.
- **Screenshot for order** — if `get_design_context` output is truncated, screenshot confirms reading order without re-calling Figma.
- **No re-fetches** — once `DESIGN.md` is written, it's cached forever.

See `references/figma-reading-rules.md` for full Figma tool reference.

---

## Step 4: Build Sections (Loop Until Pending Empty)

For each section in `### Pending` in `session.md`:

### 4.1 Move to In Progress

```md
### In Progress
- [ ] Hero section (nodeId: 123:456)
  Images needed: hero-bg.webp
  Content source: none (static Figma content)
```

### 4.2 Fetch Section Design

Call `get_design_context` on **this section's nodeId only** (not the whole page):

```
get_design_context({
  fileKey: "[from project-map.json]",
  nodeId: "[section nodeId from queue]"
})
```

**Important:** Only fetch this section's nodeId, never re-fetch the whole page.

### 4.3 Apply Design Tokens

Use tokens from `DESIGN.md` and `src/styles/global.css` — do NOT re-derive from the section response.

Map Figma measurements to token classes:

- Figma color `#f5c518` → use `bg-brand` class (not `bg-[#f5c518]`)
- Figma font "Inter 24px Bold" → use `heading-3` class (from global.css)
- Figma spacing "32px padding" → use `px-8` Tailwind class (or custom `.section-padding`)

### 4.4 Download Images

For each image in the section:

1. Check `project-map.json` → `figma.assets` — if already downloaded, reuse path and skip
2. Check `public/images/` — if file exists, reuse it
3. If new:
   - Download from Figma export URL
   - **Verify actual file format** (check magic bytes) — see `image-handling.md`
   - Save to `public/images/[page]-[desc].[ext]` (e.g. `hero-bg.svg`, `about-team-john.jpg`)
   - Register in `project-map.json`:
     ```json
     "figma": { "assets": { "hero-bg": { "nodeId": "123:456", "localPath": "public/images/hero-bg.svg" } } }
     ```

**Key rules:**
- Download in native format (SVG for vectors, PNG for photos) — never download WebP
- Verify format after download (first bytes: `<svg` = SVG, `\x89PNG` = PNG, `\xFF\xD8` = JPEG, `GIF8` = GIF)
- If saved as wrong extension (e.g. SVG saved as `.png`), rename immediately and update all `src` references

See `references/image-handling.md` for detailed rules.

### 4.5 Write Markup

Write section **inline in `src/pages/index.astro`** — do NOT create a separate component file unless the section is reused elsewhere.

Use:
- Semantic classes from `global.css` (`.container-xl`, `.heading-1`, `.btn-primary`)
- 12-column grid by default for multi-column layouts
- Tailwind breakpoints (sm/md/lg/xl/2xl/3xl)
- Token-based colors (never `bg-[#hex]`)

```astro
<section class="hero section-padding bg-brand">
  <div class="container-xl">
    <h1 class="heading-1 text-surface mb-6">Welcome</h1>
    <p class="body-text text-surface/80 mb-8">Your tagline here</p>
    <a href="/about/" class="btn-primary">Learn More</a>
  </div>
</section>
```

**Rules:**
- Grid-first layouts: 12-column grid by default, flexbox only for: nav/header, inline icon+label, button+icon, wrapping tags, single-child center
- All internal `<a href>` links **must have trailing slash** (`/about/`, not `/about`)
- Token hygiene: if a value is in `@theme`, use its class (e.g. `bg-brand` not `bg-[#f5c518]`)
- Images: always include `width`, `height`, `alt`, `loading="lazy"`

See `references/code-standards.md` for full component template and patterns.

### 4.6 Apply Scroll-Reveal (if enabled)

**Only if `integrations.scrollReveal.configured = true` in `project-map.json`:**

Apply `data-reveal` / `data-delay` attributes while writing the section (in same pass, not after).

Follow placement rules in `.skills/scroll-reveal/SKILL.md` Step 3:
- Every `<h1>`/`<h2>`/`<h3>` should have `data-reveal`
- Every card/grid-item should have `data-reveal`
- Sequential items should have `data-delay="[ms]"`

Do NOT write the section first and add attributes later. Write them together.

### 4.7 Validate Tokens

Before finishing, check for anti-patterns:

```bash
node .skills/astro-figma-wp-scaffold/scripts/validate-tokens.mjs src/pages/index.astro
# Should report: "✅ No hardcoded colors/fonts/radii found"
```

Or manually grep for:
- `bg-[#` → should use `bg-brand`, `bg-surface`, etc.
- `text-[#` → should use `text-text`, `text-text-muted`, etc.
- `font-['` → should use `font-sans`, `font-display`
- `rounded-[` → should use `rounded-sm`, `rounded-md`, etc.

### 4.8 Move to Completed

Update `session.md`:

```md
### Completed
- [x] Hero section (src/pages/index.astro, lines 10–25)

### In Progress
- [ ] Features section (nodeId: 123:789)
  ...
```

Also update `project-map.json`:

```json
{
  "components": {
    "completed": [
      { "name": "Hero", "file": "src/pages/index.astro", "nodeId": "123:456" }
    ]
  }
}
```

### 4.9 Pause and Confirm

Print:
```
✅ Hero section done. Continue to Features section? (yes / no)
```

Wait for user confirmation before fetching next section nodeId.

---

## Step 5: Post-Section Steps

### 5.1 If scroll-reveal enabled (Q3=yes):

Run `/scroll-reveal` skill in full.

### 5.2 Build Check

```bash
npm run build 2>&1 | tail -30
```

**If build passes:** Proceed to client handoff.

**If build fails:**
- Fix all TypeScript / Astro errors before continuing
- Do NOT hand off a broken build

### 5.3 Client Handoff Summary

Print this summary once build passes:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
▶ Staging build ready — [Project Name]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Pages built:
  /          → src/pages/index.astro
  /about/    → src/pages/about.astro
  /contact/  → src/pages/contact.astro
  [list every page from session.md ### Completed]

Sections with placeholder content (need real data):
  [list every section marked "CONTENT PLACEHOLDER" below]

Images to replace manually:
  [list every image that failed to download]

Next steps after client approval:
  1. Populate content collections with real entries (see content-collections.md)
  2. Run /integrating-contact-form     (if forms present)
  3. Run /generate-sitemap-robots

Preview: npm run preview → http://localhost:4321/
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

See `references/build-and-handoff.md` for full details and astro.config.mjs verification.

---

## Scaffold Complete

Design-only site is ready.

**Next:** User approves design → populate content collections → run `/integrating-contact-form` (if forms present) → `/generate-sitemap-robots`.

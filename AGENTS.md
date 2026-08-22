# Agent Instructions

## Quick Start

**When the user types `/skill-name`, immediately read `.skills/skill-name/SKILL.md` in full and execute it.** Do not ask for confirmation. If a `/command` is typed that doesn't match the table below, check if `.skills/<command>/SKILL.md` exists before saying it doesn't exist.

---

## Skill Execution Order

| Category | Command | When to run | Dependencies |
|---|---|---|---|
| **Setup** | `/astro-figma-scaffold` | First | None — requires Figma MCP |
| | `/scrape-to-astro` | Alternative to scaffold | None — requires Firecrawl or `FIRECRAWL_API_KEY` |
| **Enhancements** | `/scroll-reveal` | After setup (anytime) | astro-figma-scaffold or scrape-to-astro |
| | `/astro-i18n` | After setup (anytime) | astro-figma-scaffold or scrape-to-astro |
| | `/integrating-contact-form` | After setup, if a contact form is present | astro-figma-scaffold or scrape-to-astro |
| **SEO** | `/generate-sitemap-robots` | After all pages built | astro-figma-scaffold + any enhancements |
| **QA** | `/website-qa` | After setup (anytime) | astro-figma-scaffold or scrape-to-astro |
| **Launch** | `/go-live-check` | Before production cutover | A project-specific go-live checklist file (e.g. `GO-LIVE-CHECKLIST.md`) — this skill audits against it, it doesn't generate it |

---

## Skill Compatibility & Dependency Validation

### Prerequisites by Skill

Every skill should validate these prerequisites before proceeding:

| Skill | Filesystem | Env vars | State files | Build required |
|-------|-----------|----------|------------|-----------------|
| `/astro-figma-scaffold` | `src/layouts/Layout.astro` exists (fresh) | Figma MCP OR `FIGMA_API_KEY` | Create fresh `.agent/` files | ✓ Final check |
| `/scrape-to-astro` | `src/pages/` exists (empty OK) | Firecrawl MCP OR `FIRECRAWL_API_KEY` | Create fresh `.agent/` files | ✓ Final check |
| `/integrating-contact-form` | `src/layouts/Layout.astro` exists | Depends on chosen submission pattern (e.g. Turnstile secret, or a third-party form backend key) | `.agent/` files present | ✓ Final check |
| `/scroll-reveal` | `src/layouts/Layout.astro` exists, `src/styles/global.css` has `[data-reveal]` CSS | None | `.agent/` files present (optional) | ✓ Final check |
| `/astro-i18n` | `src/pages/` exists, `astro.config.mjs` readable | None | `.agent/` files present | ✓ Final check |
| `/generate-sitemap-robots` | `src/pages/` exists | `PUBLIC_SITE_URL` in `.env` | `.agent/` files present | ✓ Final check |
| `/website-qa` | Target URL reachable (localhost or hosted) | None | `.agent/` files optional | No |
| `/go-live-check` | A go-live checklist file exists in the repo | None (target URL falls back to `PUBLIC_SITE_URL` if `.agent/go-live-check.config.json` doesn't set one) | Creates `.agent/go-live-check.config.json` on first run if missing | No |

---

### Skill Interaction Matrix

This table shows which skills can run together and in what order:

| Skill A | Skill B | Can Run Together? | Order Constraint | Notes |
|---------|---------|-------------------|------------------|-------|
| astro-figma-scaffold | scrape-to-astro | ❌ No | Mutually exclusive | Choose ONE for setup |
| astro-figma-scaffold or scrape-to-astro | integrating-contact-form | ✓ Yes (sequential) | A then B | Setup required before wiring the form |
| integrating-contact-form | scroll-reveal | ✓ Yes (any order) | None | Independent; can run before/after |
| scroll-reveal | astro-i18n | ✓ Yes (any order) | None | Independent; both modify different sections |
| astro-i18n | scroll-reveal | ✓ Yes (any order) | None | Independent; both modify different sections |
| astro-i18n | generate-sitemap-robots | ✓ Yes (A then B) | A then B | Sitemap must include localized routes |
| generate-sitemap-robots | website-qa | ✓ Yes (A then B) | A then B | QA validates completed build |
| scroll-reveal | website-qa | ✓ Yes (any order) | None | QA can validate animations independently |
| Any skill | website-qa | ✓ Yes | website-qa last | QA works on any state |
| website-qa | go-live-check | ✓ Yes (A then B) | A then B | go-live-check assumes generic technical QA already passed; it audits business-specific launch criteria (checklist items), not page-level QA |
| Any skill | go-live-check | ✓ Yes | go-live-check last | Final pre-launch gate — run right before production cutover, ideally re-run after each fix |

---

### Skill Execution Flow (Recommended)

**Setup (pick ONE):**
```
/astro-figma-scaffold  [or]  /scrape-to-astro
  ↓
/scroll-reveal (optional)
  ↓
npm run build
```

**Enhancements (anytime after setup):**
```
/integrating-contact-form (if a contact form is present)
/astro-i18n (optional, before sitemap)
/generate-sitemap-robots (after all pages)
/website-qa (final verification)
```

**Pre-launch (before production cutover, if a go-live checklist exists for this project):**
```
/website-qa (generic technical QA)
  ↓
/go-live-check (audits the project's own go-live checklist; re-run after each fix)
```

---

### MCP & API Requirements

- **Figma MCP required** for `/astro-figma-scaffold` — do NOT fall back to the REST API.
- **Firecrawl preferred** for `/scrape-to-astro` — falls back to `FIRECRAWL_API_KEY` in `.env` if MCP unavailable.

---

---

## Global Code Rules

**These rules apply to every file written or modified across all skills.**

### Trailing slashes

All internal `<a href>` links **must include a trailing slash** (`/about/`, `/blog/my-post/`). This applies to `href` on `<a>` tags, `redirect()` destinations, and internal URL strings in component props. Does NOT apply to external links, `src` attributes, or `site:` in `astro.config.mjs`.

### Viewport units

- **Heroes and full-section `min-height`:** Use `vh` or `dvh` (scale with viewport)
- **Fluid typography:** `vw` is allowed ONLY inside `clamp()` (e.g. `font-size: clamp(3rem, 6vw, 5.625rem)`)
- **Everything else:** Use `px` values or Tailwind utilities — never `vw`/`vh` for regular box sizing (cards, images, padding, margins)

### Breakpoints

Standard breakpoints (defined in `@theme`, override Tailwind's `xl`/`2xl`):

| Prefix | Value | Use |
|---|---|---|
| `sm:` | 640px | Large phone landscape / small tablet |
| `md:` | 768px | Tablet portrait |
| `lg:` | 1024px | Tablet landscape / small laptop |
| `xl:` | 1200px | Desktop (primary breakpoint) |
| `2xl:` | 1440px | Wide desktop |
| `3xl:` | 1660px | Ultra-wide (= `--container-max`, customizable via Q4 in scaffold) |

### Grid-first layout

Default to **12-column CSS grid** for multi-column layouts. Flexbox only for: nav bars, icon+label pairs, buttons with icons, free-wrapping tag groups, centering a single child.

### Token hygiene — CSS variables only

**Rule:** If a value is in `@theme` (colors, fonts, spacing, radius), use the generated class name. Never use arbitrary-value syntax like `bg-[#hex]` for design-system tokens.

| ❌ Forbidden | ✅ Required |
|---|---|
| `bg-[#f5c518]` | `bg-brand` |
| `text-[#09090b]` | `text-dark` |
| `rounded-[4px]` | `rounded-md` |
| `font-['Inter']` | `font-sans` or `font-display` |

Inline `style=""` attributes: use CSS variables instead of hex values (e.g. `style="background-color: var(--color-brand)"` not `#f5c518`).

### Image fetch failures — skip and report

If an image download fails cleanly (missing URL, corrupt file, timeout), use a placeholder and report it afterward. **Never block page progress on a difficult image.** See Image Handling section below.

### Staging non-indexability (`PUBLIC_IS_STAGING`)

When `PUBLIC_IS_STAGING=true`, `Layout.astro` renders `<meta name="robots" content="noindex, nofollow">` instead of canonical link.

Rules:
- **Never hard-code `noindex`** outside of `maintenance.astro`
- **Never remove the `isStaging` check** when rewriting `Layout.astro`
- Set `PUBLIC_IS_STAGING=true` in hosting platform env vars (not `.env`)
- Staging `robots.txt`/sitemap suppression handled by build pipeline, not skill code

### Domain redirects (apex ↔ www)

`public/_redirects` ships a templated redirect rule for hosts (Sevalla, Netlify, Cloudflare Pages) that serve every attached custom domain live rather than auto-redirecting. **Marking a domain "Primary" in a hosting dashboard does not add a redirect** — without this file, both `example.com` and `www.example.com` 200 the same content, which trips SEO audits' "canonicalization inconsistency" check.

Rules:
- On every new project, edit `public/_redirects`: set the real domains and keep only the rule that redirects the **non-canonical** domain to whichever one matches `PUBLIC_SITE_URL`.
- Never leave both directions active (redirect loop).
- After first production deploy, purge the host's edge cache and verify with `curl -sIL https://<non-canonical-domain>/` — expect a `301` to the canonical domain, not a direct `200`.
- `/go-live-check` (see the Launch row in Skill Execution Order above) can verify this automatically post-deploy via its `domainRedirect` config field — it's the automated version of the manual `curl -sIL` check above, and a good way to catch a forgotten placeholder before it becomes a live SEO issue.

---

## Scripting

When writing local scripts (data processing, asset generation, build helpers), **use Node.js ESM (`.mjs`) only** — no Python unless a critical library has no JS equivalent and the user explicitly approves.

Node.js is a project dependency via Astro. Use `import`/`export` syntax.

---

## Skill Validation & Resumption

### Prerequisites Check

**Every skill MUST validate prerequisites before proceeding.** See "Prerequisites Validation Pattern" section below for:
- Filesystem validation (files/folders that must exist)
- Environment variable checks (required .env variables)
- State file validation (.agent/ files)
- Fail-fast pattern (stop immediately if checks fail)

**All skills reference this same guide.** Customize checks per skill.

### Resume Checkpoints

**Skills with multiple steps MUST track progress** so users can resume without re-doing completed work. See "Resume Checkpoints" section below for:
- Session.md structure (Pending → In Progress → Completed)
- Checkpoint naming (e.g., "Section 3/8", "Blog archive complete")
- Resume instructions in session.md
- Multi-step example (section building in astro-figma-scaffold)

**Long-running skills must support resumption.** When user runs `/skill-name` again, detect checkpoints and ask: "Resume from [checkpoint]? (yes / start-over / skip)"

---

## Context Efficiency

**Startup — read silently first:**

1. `.agent/project-map.json` — Figma fileKey, nodeIds, content collections, component registry
2. `.agent/session.md` — completed / in-progress / pending items, checkpoints
3. `DESIGN.md` — design tokens (colors, typography, spacing, effects)

**Rules:**
- **Don't call Figma if `DESIGN.md` already has tokens** — use them directly
- **Batch Figma reads:** one call per page, extract all at once (tokens, sections, assets)
- **Cache content collection schemas:** once a collection's fields are known, record in `project-map.json`, never re-derive
- **Write complete files:** no partial writes requiring re-reads in same session
- **Track checkpoints:** for multi-step work, always move items between Pending/In Progress/Completed
- **Support resumption:** if skill is re-run, detect In Progress item and offer to resume from checkpoint

---

---

## State Persistence — MANDATORY

**CRITICAL RULE:** Every skill OR direct prompt MUST update all relevant state files before completing. This applies whether work edits `.astro` files or not.

**Examples of work that updates state files:**
- ✓ Skills (astro-figma-scaffold, integrating-contact-form, etc.)
- ✓ Direct prompt to fix a bug in src/components/Hero.astro
- ✓ Direct prompt to update documentation (DESIGN.md, README.md)
- ✓ Direct prompt to add a new integration flag or config
- ✓ Direct prompt to refactor code in src/content/config.ts
- ✓ Direct prompt to create new component architecture

**Update these three files before ending any response — never leave them stale:**

### Files to maintain

| File | Purpose | Updated | Mandatory? |
|---|---|---|---|
| `.agent/project-map.json` | All integrations status, configs, settings, artifact locations | Every skill | ✓ YES |
| `.agent/session.md` | Progress tracking: Pending / In Progress / Completed items with checkpoints | Every skill | ✓ YES |
| `DESIGN.md` | Design tokens (colors, typography, spacing, effects) + component/page registry | Setup (create), others (append) | ✓ YES |

**Even if a skill doesn't edit `.astro` files, it MUST update project-map.json and session.md.**

### State File Update Requirements (All Skills)

Every skill MUST update these state files before completing:

| Skill | project-map.json | session.md | DESIGN.md |
|-------|-----------------|-----------|-----------|
| astro-figma-scaffold | integrations, pages, components, design tokens | sections built, images, tokens | ✓ Create |
| scrape-to-astro | pages, components, design tokens | pages scraped, images | ✓ Create |
| scroll-reveal | scrollReveal config, element count | animation setup | - |
| astro-i18n | i18n config, locales, routing | languages, translation source | - |
| integrating-contact-form | submission pattern, form fields, pages | form integrated | - |
| generate-sitemap-robots | seoConfig, sitemap, robots status | sitemap generated, robots.txt | - |
| website-qa | qa.lastAudit, readinessLevel, issues | audit completed, readiness | - |
| go-live-check | goLiveCheck config path, last run summary (pass/fail/manual counts), report file path | audit completed, report path, headline numbers | - |

**Legend:** ✓ = Create file | ⚠ = Append rows (optional) | - = Not applicable

**Detailed guide:** See "State Persistence" and "Direct Prompt State File Updates" sections above for exact data structures and per-skill requirements.

### Direct Prompt State File Updates

When responding to direct prompts (not skills), update state files if work affects project structure:

**Update project-map.json if:**
- Changing component structure (add/remove/rename components)
- Adding new pages or sections
- Modifying integration configuration
- Updating asset locations or file paths
- Changing architectural patterns

**Update session.md if:**
- Adding features or components (append to ### Completed)
- Fixing bugs in critical files (note in ### Completed)
- Updating documentation that tracks project state (note in ### Completed)
- Pausing multi-step refactoring (add checkpoint to ### In Progress)

**Update DESIGN.md if:**
- Adding new design tokens (colors, fonts, spacing, radius)
- Creating reusable components with design implications
- Changing component styling patterns (note in Changes)

**Example: User asks "Fix the Hero component button styling"**
```markdown
## Completed
- [x] Fixed Hero component button styling
      Changed: Used DESIGN.md token bg-brand instead of hardcoded #f5c518
      File: src/components/Hero.astro (lines 12-15)
      Build verified: npm run build ✓
```

**Example: User asks "Add a new Team component backed by a content collection"**
```json
// project-map.json
{
  "components": [
    {
      "name": "TeamMember",
      "astroFile": "src/components/TeamMember.astro",
      "status": "built",
      "lastUpdated": "2026-06-16"
    }
  ]
}
```

```markdown
// session.md
## Completed
- [x] Created TeamMember component backed by the `team` content collection
      File: src/components/TeamMember.astro
      Uses: DESIGN.md tokens (card, typography)
      Build verified: npm run build ✓
```

**Rule of thumb:** If you're writing commits that affect project state, update state files. If you're writing commits that only fix internal implementation details (refactoring that's invisible to project-map.json), state files are optional.

---

## Build Validation — ALL Content-Modifying Skills

After ANY skill that modifies `.astro` files, markdown, config files, etc., run:

```bash
npm run build
```

**Verify:**
- No TypeScript errors
- No Astro build errors
- All imports resolve
- No broken components

**If build fails:**
- Check error messages for specific file/line
- Fix root cause (not symptoms)
- Re-run `npm run build`
- Do NOT proceed until build passes

**Skills that require build check:**
- astro-figma-scaffold ✓
- scrape-to-astro ✓
- scroll-reveal ✓
- astro-i18n ✓
- integrating-contact-form ✓
- generate-sitemap-robots ✓

**Do NOT proceed to next skill if build fails.**

---

## Prerequisites Validation Pattern

All skills validate prerequisites before proceeding. Follow this pattern:

```markdown
## STARTUP

Read silently:
1. `.agent/project-map.json`
2. `.agent/session.md`
3. `DESIGN.md` (if exists)

Verify prerequisites:
- [List filesystem checks: "src/pages/ exists", etc.]
- [List env var checks: "PUBLIC_SITE_URL set", etc.]
- [List state file checks: ".agent/project-map.json exists", etc.]

If prerequisites missing → Stop and report what's needed.
If already configured → Print status and ask if user wants to change something.
Otherwise → Proceed to discovery.
```

**See the "Prerequisites Validation Pattern" section above for the full validation checklist.**

---

## State File Update Pattern

Before ending every response (skill or direct prompt), check these:

```markdown
## STATE FILE UPDATES (MANDATORY)

Before ending this skill, update state files:

✓ .agent/project-map.json — [skill-specific integrations]
✓ .agent/session.md — [completion status + next steps]
✓ DESIGN.md — [if applicable: create or append]

Examples:
// .agent/project-map.json
{ "integrations": { "[skill-name]": { "configured": true, ... } } }

// .agent/session.md
- [x] [Skill name] completed
      Details: [what was configured/built/verified]
      Next: [what comes next]

Do NOT consider skill complete until state files are updated.
```

**See the "State Persistence" section above for detailed data structures and the "State File Update Requirements (All Skills)" table for skill-by-skill requirements.**

---

## Common Instructions — Reference Only

Skills MUST NOT duplicate these sections. Instead, reference this file:

- **Prerequisites validation** → "See AGENTS.md: Prerequisites Validation Pattern"
- **Build checks** → "See AGENTS.md: Build Validation"
- **State file updates** → "See AGENTS.md: State File Update Pattern"

This keeps instructions DRY and makes updates centralized.

### session.md transition rules

Items **move** between sections; never duplicate or stale:

- **Pending → In Progress:** when you start working; add context (nodeId, images, content source)
- **In Progress → Completed:** when file is written and correct
- **Pending → Completed:** trivial items finished in one step

**Only one item in In Progress at a time.** Before ending response, it must be empty or contain exactly one item.

---

## Image Handling

**Applies to all downloads: Figma assets, scraped images.**

### Storage

- Store in `public/images/` — never hotlink external URLs
- Figma: `public/images/<page>-<desc>.<ext>` (e.g. `hero-bg.svg`, `about-team-john.jpg`)
- Scraped: `public/images/scraped/<page-slug>/<filename>`

### Format selection

Download in **native format, never WebP:**

| Type | Format |
|---|---|
| Logos, icons, vectors, illustrations | SVG |
| Photos, realistic renders, complex images | PNG |
| If source returns `.webp` (rare) | Keep as-is |

WebP conversion is the optimizer's job (`scripts/optimize-images.mjs`), not the skill's. Serve WebP on production, but skills always download native format.

### Verify format after download

**Never trust the extension you saved.** Figma MCP returns the actual exported format.

Check first bytes: `<svg` → `.svg`; `\xFF\xD8` → `.jpg`; `\x89PNG` → `.png`; `GIF8` → `.gif`.

Then update all `src` references. Rename `.png` SVG files to `.svg` immediately — browsers won't render `.png` files with SVG content.

### `<img>` tag rules

Always include explicit `width` and `height` (read from Figma node), `alt` text, and `loading="lazy"`.

### Background images

Use CSS `background-image` property, never `<img>` tag.

### No CSS flip transforms

Never apply `transform: scaleX(-1)` or `scaleY(-1)` unless Figma design explicitly shows a decorative mirror. Strip flips from `get_design_context` responses (they're Figma authoring artefacts).

### Dedup before downloading

Check `project-map.json` → `figma.assets` and `public/images/` for existing files with same nodeId or basename. Reuse and skip download if found. Register new downloads in `project-map.json` to prevent re-downloads.

---

## DESIGN.md

**Purpose:** Single source of truth for design tokens. Written once by either `/astro-figma-scaffold` or `/scrape-to-astro` during setup, then read by all other skills instead of re-calling external services.

**Spec:** Follows [google-labs-code/design.md](https://github.com/google-labs-code/design.md) — YAML frontmatter (machine-readable tokens) + markdown body (human-readable tables and notes).

**YAML structure (required):**
```yaml
version: alpha
name: "[Project Name]"
description: "[One-line description]"
colors:
  primary: "#hex"
  surface: "#hex"
  text: "#hex"
  # ... more colors
typography:
  h1: { fontFamily, fontSize, fontWeight, lineHeight }
  h2: { ... }
  body: { ... }
  # ... more styles
spacing: { base, section, containerMax, ... }
rounded: { sm, md, lg, xl, pill }
components: { button-primary, card, ... }  # optional
```

**Markdown tables (required):**
- Colors table (Role | Token | Value | Tailwind class)
- Typography table (Style | Family | Size | Weight | Line height)
- Layout & Spacing table
- Shapes table
- Components table (Component | Figma nodeId | Astro file | Status)
- Pages table (Route | Figma nodeId | Astro file | Status)

**Ownership & Creation:**
- `/astro-figma-scaffold` → extracts tokens from Figma, creates DESIGN.md
- `/scrape-to-astro` → extracts tokens from site CSS or asks for Figma, creates DESIGN.md
- Only ONE of these should create it (whichever runs first)

**Rules:**
- Written once during setup — do NOT overwrite afterward
- If `DESIGN.md` already exists with tokens, don't re-fetch/regenerate; use recorded values
- All subsequent skills read from `DESIGN.md` instead of calling external services (Figma, site CSS, etc.)
- All subsequent skills read from `global.css` instead of `tailwind.config` file (there is no `tailwind.config` file; Tailwind v4 tokens live in `src/styles/global.css` `@theme` block)
- When adding a component/page, append a row to the relevant table and update YAML if needed
- Use ISO 8601 dates in "Last synced" line (e.g. `2026-05-16`)
- `colors.primary` is required; other keys are optional

---

## Skill Validation & Development Guides

All skills now follow these validation and tracking standards:

| Guide | Location | For Skills |
|-------|----------|-----------|
| **Prerequisites Check** | AGENTS.md (Skill Validation & Resumption section) | All skills — validate filesystem, env vars, state files |
| **Resume Checkpoints** | AGENTS.md (Skill Validation & Resumption section) | Multi-step skills — track progress, enable resumption |
| **Skill Interaction Matrix** | This file (Skill Compatibility section) | All skills — understand dependencies and ordering |
| **Build Checks** | Each `SKILL.md` file | Content-modifying skills — `npm run build` validation |

**What this means:**
- ✓ Every skill validates prerequisites before proceeding (fail-fast)
- ✓ Every multi-step skill tracks progress in session.md
- ✓ Users can resume interrupted skills without re-doing completed work
- ✓ Build validation prevents broken code from shipping
- ✓ Skill interaction matrix prevents ordering mistakes

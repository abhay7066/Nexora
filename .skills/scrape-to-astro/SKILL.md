# Agent Skill
# File: .skills/scrape-to-astro/SKILL.md
# Usage: /scrape-to-astro

Convert existing website to a static Astro site using Firecrawl scraping. No backend, no CMS — repeating dynamic content is modeled as Astro content collections (see `astro-figma-scaffold/references/content-collections.md`).

Alternative to Figma scaffold — for sites that already exist.

---

## STARTUP

Verify:
- Firecrawl MCP connected OR `FIRECRAWL_API_KEY` in `.env`
- Target website URL accessible and public
- No robots.txt blocking

---

## WORKFLOW

See `references/complete-workflow.md` for:

1. **Discovery** — website URL, pages to scrape, design source, content type
2. **Scrape with Firecrawl** — fetch all pages, extract markdown/HTML
3. **Parse HTML structure** — extract headings, text, images, links
4. **Generate Astro pages** — create `src/pages/[route].astro` for each
5. **Extract design** — if not using Figma, parse colors/fonts/spacing from CSS
6. **Download images** — save to `public/images/`, update src references
7. **Convert links** — Astro routing with trailing slashes
8. **State update** — `.agent/project-map.json`, `.agent/session.md`

---

## STATE PERSISTENCE

Update before ending ANY response:

| File | When | What |
|---|---|---|
| `.agent/project-map.json` | After scrape completes | Scraped pages, design tokens extracted, state flags |
| `.agent/session.md` | Before ending response | Move items between Pending/In Progress/Completed |
| `DESIGN.md` | Once after design extraction | Design tokens (colors, typography, spacing, effects) |

See AGENTS.md for transition rules and state persistence details.

---

## DESIGN.md OWNERSHIP

**Important:** If `DESIGN.md` already exists (from Figma), do NOT overwrite.

**If `DESIGN.md` missing:** Generate it from extracted site design or ask user to provide Figma file for design tokens.

---

## RULES

- **Public site only** — Firecrawl needs to access via HTTP
- **Respect robots.txt** — don't violate crawl restrictions
- **Verify content accuracy** — manually review scraped content before shipping
- **Update links** — ensure all internal links use Astro routing with trailing slashes (`/about/`, `/blog/post/`)
- **Image optimization** — download and optimize images locally
- **Metadata extraction** — keep page titles, descriptions, keywords
- **Scaffold ends:** Static site ready for review.

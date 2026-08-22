# Agent Skill
# File: .skills/astro-figma-scaffold/SKILL.md
# Usage: /astro-figma-scaffold

You are an expert Astro developer. Your job is to convert Figma designs into static Astro pages — no backend, no CMS. Repeating dynamic content (blog posts, team members, services, etc.) is modeled with Astro content collections; see `references/content-collections.md`.

---

## STARTUP PROTOCOL

### Step 1 — Check Session State

Read silently:
1. `.agent/project-map.json`
2. `.agent/session.md`
3. `DESIGN.md` (if exists)

**If project-map.json does NOT exist → Fresh Project**

See `references/complete-workflow.md` for the full flow.

**If project-map.json EXISTS → Existing Project**

See `references/existing-project-branches.md` for: Resume / Add page / Update page / Add scroll-reveal branches.

---

## FRESH PROJECT: Scaffold

**See `references/complete-workflow.md` for the full workflow.**

This single document includes:
- Discovery questions (Figma URL, project name, grid width, scroll-reveal)
- Setup (npm install, Figma MCP check, project state initialization)
- Design token extraction (DESIGN.md generation)
- Section discovery (metadata + screenshot validation)
- Section-by-section building loop (Figma fetch → design tokens → images → markup → validation)
- Scroll-reveal setup (if Q3=yes)
- Build check & client handoff

### Quick Start (if you prefer step-by-step overview)

**Condensed into 7 steps:**

1. **Ask discovery questions** — Figma URL, project name, scroll-reveal? (yes/no), grid width? (px)
2. **Setup** — npm install, check Figma MCP, initialize `.agent/` state files
3. **Extract tokens** — Call `get_design_context` once on page frame → write `DESIGN.md` and `src/styles/global.css`
4. **Discover sections** — Call `get_metadata` + `get_screenshot` on page → list sections in `session.md` ### Pending
5. **Build each section** — Loop: Fetch → Apply tokens → Download images → Write markup → Validate → Move to Completed
   - Use `DESIGN.md` tokens (never hardcoded colors/fonts)
   - 12-column grid by default, flexbox only for nav/icons/wrapping
   - All internal links with trailing slash (`/about/`, not `/about`)
   - Images: verify format after download, store in `public/images/[page]-[desc].[ext]`
   - Apply `data-reveal` attributes if scroll-reveal enabled
6. **If scroll-reveal enabled** — Run `/scroll-reveal` skill
7. **Build & handoff** — `npm run build`, print client summary

**Key rules to remember:**
- Repeating dynamic content → Astro content collections (`src/content/config.ts`), never invent a backend
- Relative imports only (no `@/` aliases)
- Confirm before next section (pause and wait for user go-ahead)
- Update `.agent/project-map.json` + `.agent/session.md` before ending each section

For detailed instructions, see `references/complete-workflow.md` (Steps 1–5).

---

## POST-SCAFFOLD INTEGRATION CHECK

See `references/post-scaffold-integration.md` for detection signals and sub-skill routing:
- `/integrating-contact-form` (if a contact form is present)

---

## EXISTING PROJECT: Continue/Resume

See `references/existing-project-branches.md` for four branches:

1. **Resume** — continue from `### Pending` in session.md
2. **Add a new page** — create `src/pages/[route]/index.astro` from Figma
3. **Update an existing page** — redesign, replace section, or content update
4. **Add scroll-reveal** — enable animations if not yet configured

---

## DESIGN STANDARDS

### Code Standards
See `references/code-standards.md` for:
- Component template
- Layout rules (grid-first, breakpoints, flex only when necessary)
- Token hygiene (CSS variables, no hardcoded colors)
- Spacing, sizing, viewport units
- Common patterns (nav, placeholders, forms)
- File naming, imports, prerender rule

### Figma Reading
See `references/figma-reading-rules.md` for:
- When to use `get_design_context` vs `get_metadata` vs `get_screenshot`
- Correct sequence (tokens once, then per-section)
- Why this matters (quota efficiency, design consistency)

### Image Handling
See `references/image-handling.md` for:
- Storage location, format selection (SVG first, never download WebP)
- Format verification after download (magic bytes)
- `<img>` tag rules, background images, no CSS flips
- Dedup before downloading, fetch failure handling

### Tailwind v4 Config
See `references/tailwind-config.md` for:
- `@theme` block structure (breakpoints, colors, fonts, radius)
- `@layer utilities` semantic classes
- Google Fonts setup
- No `tailwind.config.js` file

### Project Structure
See `references/astro-project-structure.md` for:
- Folder layout (components, pages, lib, content, styles, types)
- File naming conventions
- Component vs page section distinction
- `src/content/config.ts` (content collection schemas)
- Trailing slash rule for links

---

## DESIGN TOKENS

See `references/design-token-extraction.md` for:
- Before-calling-Figma: check `DESIGN.md` for existing tokens
- Single Figma call on page frame (never repeated)
- Write `DESIGN.md` (google-labs-code spec)
- Generate `src/styles/global.css` with `@theme` and `@layer utilities`
- Update `project-map.json`, `session.md`

---

## SECTION BUILDING

See `references/complete-workflow.md` Step 4 for per-section workflow:
1. Move to In Progress
2. Fetch section design (`get_design_context`)
3. Apply tokens from `DESIGN.md`
4. Download images (check dedup, verify format)
5. Write inline markup (use semantic classes, grid-first layout)
6. Apply scroll-reveal attributes (if enabled)
7. Validate tokens (check for hardcoded colors/fonts)
8. Move to Completed
9. Pause and confirm before next section

---

## BUILD & HANDOFF

See `references/build-and-handoff.md` for:
- Run `npm run build` — fix errors before handing off
- Print client handoff summary: pages built, placeholders, images to replace, next steps
- Verify `astro.config.mjs` settings
- Verify `public/_redirects` has the real apex/www domains (not the placeholder)
- Scaffold ends: design-only site ready

---

## KEY RULES

1. **No backend, ever** — repeating dynamic content goes in Astro content collections (`references/content-collections.md`), never a CMS/API client
2. **Always use relative imports** — never `@/` aliases
3. **Trailing slashes on all internal links** — `/about/`, `/blog/my-post/`
4. **Grid-first layouts** — 12-column grid by default, flexbox only for specific cases
5. **Token hygiene** — use semantic classes, never arbitrary-value syntax for design tokens
6. **Write complete files** — no partial writes requiring re-reads
7. **Update state files before ending** — `.agent/project-map.json`, `.agent/session.md`, `DESIGN.md`
8. **Confirm before next section** — pause and wait for user go-ahead after each section completion

---

## STATE PERSISTENCE

Update before ending ANY response:

| File | When | What |
|---|---|---|
| `.agent/project-map.json` | After each component/page | Figma fileKey + nodeIds, content collections, completion status |
| `.agent/session.md` | Before ending response | Move items between Pending/In Progress/Completed |
| `DESIGN.md` | Once after first Figma fetch | Design tokens (colors, typography, spacing, effects) |

See AGENTS.md for transition rules and state persistence details.

---

## TROUBLESHOOTING

**Figma MCP not available?**
→ Stop. Tell user to connect Figma MCP. Do not use REST API.

**Image fails to download?**
→ Use placeholder, note in report, continue. Never stall on difficult images.

**DESIGN.md already has tokens?**
→ Skip Figma call. Use recorded values. Only re-fetch if user asks.

**Token audit finds hardcoded colors?**
→ Run `node .skills/astro-figma-scaffold/scripts/validate-tokens.mjs [file]` to identify, then fix manually.

**Build fails?**
→ Fix all TypeScript/Astro errors before handing off. Do not proceed with broken build.

---

## REFERENCES

### Main Workflow
- **`complete-workflow.md`** — Full workflow (setup → tokens → sections → handoff). Start here.

### Deep Dives (optional, for specific details)
- `code-standards.md` — Component template, layouts, grid rules, token hygiene
- `figma-reading-rules.md` — When to use `get_design_context` vs `get_metadata` vs `get_screenshot`
- `image-handling.md` — Download rules, format verification, storage, `<img>` tag patterns
- `design-token-extraction.md` — DESIGN.md spec and generation details
- `tailwind-config.md` — `@theme` block structure, Google Fonts setup
- `astro-project-structure.md` — Folder layout, naming conventions, component vs page distinction
- `content-collections.md` — Modeling repeating dynamic content without a backend

### Existing Project
- `existing-project-branches.md` — Resume/Add page/Update page/Add scroll-reveal branches
- `post-scaffold-integration.md` — Detection signals, sub-skill routing

### Utilities
- `startup-checks.md` — Figma MCP, env, filesystem validation (run at skill start)
- `build-and-handoff.md` — Build check details, astro.config.mjs verification

**Scripts in `scripts/` folder:**
- `figma-url-parser.mjs` — Extract fileKey + nodeId from URL
- `create-project-map.mjs` — Initialize .agent/project-map.json
- `create-session-md.mjs` — Initialize .agent/session.md
- `validate-tokens.mjs` — Audit for hardcoded colors/fonts/radii

---

## NEXT STEPS

After scaffold completes:

1. **Build passes, handoff ready.** User approves design.
2. **Populate content collections** with real entries.
3. **Run `/integrating-contact-form`** if a form is present.
4. **Run `/generate-sitemap-robots`** for SEO.
5. **Deploy to production.**

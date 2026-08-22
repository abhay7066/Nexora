# Existing Project Branches

When `.agent/project-map.json` EXISTS, the project is in progress.

Print status banner and ask what to do:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
▶ Project: [project name from map]
✅ Done:   [list completed pages/components]
🔨 Paused: [inProgress item, or "—"]
📋 Pending:[first pending item, or "—"]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
What would you like to do?
  1) Resume — continue from where we left off
  2) Add a new page
  3) Update an existing page
  4) Add scroll-reveal animations
```

---

## Branch 1 — Resume

Continue from the first item in `### Pending` in `session.md`.

**No re-setup, no re-fetching Figma globals.**

1. Read `session.md`
2. Find first item in `### Pending`
3. Move it to `### In Progress`
4. Call `get_design_context` on that section's nodeId
5. Follow `complete-workflow.md` Step 4 (section building) from Step 4.2 onwards

---

## Branch 2 — Add a New Page

Ask ALL questions at once:

```
To add a new page, please provide:

1. Figma URL for the new page (e.g. figma.com/design/…?node-id=…)
2. Target route / URL path (e.g. /about, /services, /contact)
3. Page title (for <title> tag)
4. Does this page need any content collection data? (yes / no)
   → If yes: briefly describe (e.g. "team members", "blog posts", "services list")
```

Then:

1. Parse Figma URL → extract fileKey + nodeId (see `scripts/figma-url-parser.mjs`)
2. Fetch node design:
   ```
   get_design_context({ fileKey, nodeId })
   get_screenshot({ fileKey, nodeId })  // visually confirm section order
   ```
3. Create `src/pages/[route]/index.astro` (or `src/pages/[route].astro` for single-segment routes)
4. Write all sections inline (not as separate components unless reused elsewhere)
5. Download images → see `image-handling.md`
6. If Q4=yes (content collection data): add/extend the schema in `src/content/config.ts` → see `content-collections.md`
7. If scroll-reveal enabled: apply `data-reveal` attributes → see `complete-workflow.md` Step 4.6
8. Update state:
   - `project-map.json` → push to `pages.completed`
   - `session.md` → append under `### Completed`
9. Print:
   ```
   ✅ New page added: /[route]
      src/pages/[route]/index.astro created
      Run: npm run dev — visit /[route] to preview
   ```

---

## Branch 3 — Update an Existing Page

Ask ALL questions at once:

```
To update an existing page, please provide:

1. Which page? (e.g. /about, /services — or type file path: src/pages/about.astro)
2. What needs to change?
   a) Redesign from a new Figma URL  → paste the Figma URL
   b) Add / replace a specific section → describe the section (and paste Figma URL if available)
   c) Content / copy update only → describe the changes
   d) Something else → describe it
```

### If (a) — Full redesign

1. Parse Figma URL → extract fileKey + nodeId
2. Fetch node design: `get_design_context`
3. Read existing page file first — preserve content collection fetches if the new design still needs them
4. Rewrite page, preserving:
   - `export const prerender = true`
   - `import Layout from '../../layouts/Layout.astro'`
   - Any content collection fetches the new design still needs
5. Download new images
6. Update `session.md`

### If (b) — Add/replace section

1. Read existing page file
2. If Figma URL provided: fetch node design via `get_design_context`
3. Insert or replace section in correct position
4. Update `session.md`

### If (c) — Content/copy only

1. Read existing page file
2. Apply described content changes directly
3. Update `session.md`

### If (d) — Other

1. Understand request and proceed accordingly

---

## Branch 4 — Add Scroll-Reveal Animations

Check `project-map.json` → `integrations.scrollReveal.configured`:

- **If `true`:** "Scroll-reveal is already configured for this project. Run `/scroll-reveal` to re-apply or update attributes." Stop.
- **If `false` or missing:** Read `.skills/scroll-reveal/SKILL.md` in full and execute it.

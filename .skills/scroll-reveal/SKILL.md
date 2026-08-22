# Agent Skill
# File: .skills/scroll-reveal/SKILL.md
# Usage: /scroll-reveal

Wire up scroll-reveal animations by adding the script to Layout.astro and data-reveal attributes to elements.

---

## STEP 1 — Add Script to Layout.astro

Read `src/layouts/Layout.astro`.

**If scroll-reveal script already present:** Skip to Step 2.

**If missing:** Add this block just before `</body>` (see `references/script-setup.md` for full code):

```astro
  <!-- Scroll reveal -->
  <script>
    const reveals = document.querySelectorAll('[data-reveal]');
    if (reveals.length) {
      if (!('IntersectionObserver' in window)) {
        reveals.forEach((el) => el.classList.add('is-visible'));
      } else {
        const io = new IntersectionObserver(
          (entries, obs) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                obs.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
        );
        reveals.forEach((el) => io.observe(el));
      }
    }
  </script>
```

---

## STEP 2 — Verify CSS

Read `src/styles/global.css`. Confirm `/* ─── Scroll Reveal */` block exists with `[data-reveal]` and `.is-visible` states.

**If missing:** Stop and report — the scaffold skill owns global.css.

---

## STEP 3 — Add data-reveal Attributes

Read every `.astro` file in `src/components/` and `src/pages/` (skip `Layout.astro`).

For each file, identify scroll-target elements and add `data-reveal` / `data-delay` attributes (surgical edits only).

**See `references/placement-rules.md` for:**
- When to use each attribute type
- Where to apply (headings, cards, heroes, CTAs, etc.)
- Stagger delay pattern for grids/lists
- What NOT to touch (nav, footer, full-viewport wrappers)

Do NOT modify CSS, classes, layout, or content. Only add attributes.

---

## STEP 4 — Report

Print summary:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
▶ Scroll Reveal wired
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ src/layouts/Layout.astro — script present (added / already there)
✅ src/styles/global.css — [data-reveal] CSS verified

Attributes applied:
  src/components/Hero.astro         — 4 elements
  src/pages/index.astro             — 2 elements
  ...
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## UPDATE STATE

Update both files:

```json
// .agent/project-map.json
{
  "integrations": {
    "scrollReveal": { "configured": true }
  }
}
```

```markdown
// .agent/session.md

### Completed
- [x] Scroll reveal animations wired
```

**Note:** If `### Completed` section doesn't exist yet, create it. This happens after Phase 1 of astro-figma-scaffold or scrape-to-astro.

---

## RULES

- **CSS already exists** in `src/styles/global.css` — do not modify
- **One script in Layout.astro only** — no per-page scripts, no separate component
- **Inline script runs on normal page load** — no `astro:page-load` event needed (no view transitions used here)
- **Surgical edits only** — do not rewrite files
- **Respects `prefers-reduced-motion`** — CSS media query handles this

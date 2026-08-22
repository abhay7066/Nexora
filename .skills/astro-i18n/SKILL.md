# Agent Skill
# File: .skills/astro-i18n/SKILL.md
# Usage: /astro-i18n

Set up multi-language support. Configure routing, translation files, language switcher.

Can run anytime after design/content is stable.

---

## STARTUP

Read silently:
1. `.agent/project-map.json`
2. `.agent/session.md`
3. `DESIGN.md`

**Prerequisite checks:**
- `integrations.i18n.configured` not yet true in project-map.json
- All pages built and stable (Figma scaffold or scrape-to-astro complete)
- Decide on supported languages

**If already configured:** Print status and ask if they want to change routing or languages. Otherwise proceed to discovery.

---

## WORKFLOW

See `references/complete-workflow.md` for:

1. **Discovery** — ask for primary language, secondary languages, routing strategy (subpath vs domain), translation source
2. **Install @astrojs/i18n** (or manual setup)
3. **Configure astro.config.mjs** — routing, locales, prefix rules
4. **Create translation files** — YAML/JSON per language in `src/i18n/translations/`
5. **Update pages** — use `getTranslation()` helper in components
6. **Language switcher** — header/footer links to switch locales
7. **Link conversion** — add language prefix to all internal links
8. **State update** — `.agent/project-map.json`, `.agent/session.md`

---

## RULES

- **All pages multi-language** — every page available in all locales
- **Language prefix required** — `/en/about/`, `/es/about/`
- **Trailing slashes** — `/en/about/` not `/en/about`
- **Middleware required** — handle language detection and redirects
- **Consistent keys** — same translation keys across all languages
- **No hardcoded text** — all user-facing text in translation files

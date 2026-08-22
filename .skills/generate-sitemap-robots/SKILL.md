# Agent Skill
# File: .skills/generate-sitemap-robots/SKILL.md
# Usage: /generate-sitemap-robots

Generate robots.txt and sitemap.xml for SEO.

Run AFTER all pages/integrations are complete.

---

## STARTUP

Check if configured. Verify:
- All pages built and visible in `src/pages/`
- All integrations complete (posts, CPTs, etc.)
- `PUBLIC_SITE_URL` set in `.env`

If already configured, ask if they want to update exclusions or rules.

---

## WORKFLOW

See `references/complete-workflow.md` for:

1. **Create robots.txt** — in `public/robots.txt` with crawl rules
2. **Install @astrojs/sitemap** — or create manual sitemap.xml
3. **Set PUBLIC_SITE_URL** — in `.env` and hosting env vars
4. **Staging vs Production** — handle `PUBLIC_IS_STAGING` flag
5. **Image URLs in sitemap** — include for better indexing
6. **Dynamic sitemap** — for blog posts, CPT items
7. **Submit to search engines** — Google Search Console, Bing Webmaster
8. **State update** — `.agent/project-map.json`, `.agent/session.md`

---

## RULES

- **robots.txt blocking** — disallow crawlers on staging (`PUBLIC_IS_STAGING=true`)
- **Sitemap auto-includes** — all routes via Astro sitemap plugin
- **Staging protection** — verify staging site has `Disallow: /`
- **Submit sitemap** — to Google and Bing after deploy
- **Test robots.txt** — use online robots.txt tester tools

# Build Check & Client Handoff

Run once all pages are written and all integration skills confirmed or skipped.

---

## Step A — Build Check

```bash
npm run build 2>&1 | tail -30
```

**If build passes:** Proceed to Step B handoff summary.

**If build fails:**
- Fix all TypeScript / Astro errors before continuing
- Do NOT hand off a broken build
- Common issues:
  - Missing imports or typos in file paths
  - Undefined variables in templates
  - Invalid JSX syntax
  - Missing alt text on images

---

## Step B — Client Handoff Summary

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

---

## What to Include in Summary

### Pages built
List every page from `session.md` ### Completed section:
```
✅ / (homepage)
✅ /about/
✅ /contact/
✅ /services/
```

### Placeholder sections
Any sections marked `{/* CONTENT PLACEHOLDER ... */}` in code:
```
Blog section (will read from src/content/blog once posts are added)
Team members section (will read from src/content/team once entries are added)
Contact form (will use /integrating-contact-form)
```

### Images to replace
Any images that failed to download:
```
public/images/hero-bg.webp  — Figma export URL returned empty file
public/images/about-team.webp — network timeout after 1 retry
```

### Next steps
Show the integration skills that will run next, based on what was detected.

---

## astro.config.mjs — Verify These Settings

Read the file first, then merge (never overwrite unrelated config):

```javascript
import { loadEnv } from 'vite';
const env = loadEnv('', process.cwd(), '');

export default defineConfig({
  output: 'static',                    // always — this is a static site
  trailingSlash: 'always',             // always — consistent with href convention
  site: env.PUBLIC_SITE_URL,           // pulled from .env
  // ... rest of existing config unchanged
});
```

If `PUBLIC_SITE_URL` is missing, print warning:

```
⚠️  Set PUBLIC_SITE_URL=https://your-domain.com in .env before building.
```

---

## public/_redirects — Verify Canonical Domain Redirect

`public/_redirects` ships with placeholder domains (`example.com` / `www.example.com`). Once the client's real domain is known (from `PUBLIC_SITE_URL` or client discovery answers), update this file — do not leave the placeholder in a production handoff.

1. Determine which domain is canonical — whichever one `PUBLIC_SITE_URL` points at (apex or www).
2. Edit `public/_redirects`: replace both placeholder domains with the real ones, and keep only the rule that redirects the **non-canonical** domain to the canonical one (delete or leave the other commented out).
3. Add to the handoff summary's next-steps: confirm the hosting platform serves both the apex and www custom domains attached to the same site (Sevalla and similar hosts do this by default and require this file to redirect one to the other — marking a domain "Primary" in the dashboard does not add a redirect on its own).

If the client's domain isn't known yet at scaffold time, leave the placeholder and note it in `session.md` under `### Pending` so it isn't forgotten before production launch.

---

## Scaffold Completion

Once build passes and handoff summary is printed, the site is ready for client review.

**Next:** Client approves design → populate content collections with real entries → run `/integrating-contact-form` (if forms present) → run `/generate-sitemap-robots` → deploy.

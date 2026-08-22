# `.agent/go-live-check.config.json` Schema

One config file per project. Create it during STARTUP if it doesn't exist yet — ask the user for each field rather than guessing.

```jsonc
{
  // Human-readable name for the report header.
  "projectName": "Acme Corp Website",

  // Path to the hand-maintained go-live checklist this skill audits against.
  "checklistFile": "GO-LIVE-CHECKLIST.md",

  // Default target URL. Omit and rely on PUBLIC_SITE_URL in .env instead if preferred —
  // the script checks the config first, then .env, then requires a CLI argument.
  "targetUrl": "https://staging.example.com",

  // Optional — only used to format the task-comment output. Omit if there's no tracker to post to.
  "taskReference": {
    "label": "Linear ACME-123",
    "url": "https://linear.app/acme/issue/ACME-123"
  },

  // Top-level nav/footer paths worth spot-checking for existence (200 vs 404).
  // Keep this to the primary nav — this is an existence check, not a full sitemap crawl.
  "navPaths": ["/", "/about/", "/services/", "/contact/"],

  // Path to the privacy policy page, if the project has one worth checking for reachability.
  "privacyPolicyPath": "/privacy-policy/",

  // Text that must appear on the homepage — regulatory license numbers, registration IDs,
  // required disclosures, etc. Specific to what this business is legally required to display.
  // Leave as an empty array if not applicable to this project.
  "requiredHomepageText": [
    { "label": "State license #12345 displayed on homepage", "pattern": "12345", "blocking": true }
  ],

  // Apex-vs-www canonical domain redirect check. Pairs with this boilerplate's own
  // public/_redirects template (see AGENTS.md → "Domain redirects (apex ↔ www)") —
  // that file is the FIX, this config field is what lets /go-live-check VERIFY the fix
  // actually works in production, rather than just trusting the template was filled in.
  // REQUIRED for any site on a host that serves every attached custom domain live
  // (Sevalla, Netlify, Cloudflare Pages) — marking one domain "Primary" in the hosting
  // dashboard does NOT add a redirect on its own, so without it both the apex and www
  // domains 200 the same content (a canonicalization-inconsistency SEO issue). Omit this
  // block entirely if the redirect is instead enforced at the nginx/server layer (verify
  // that manually in that case).
  "domainRedirect": {
    "hostingPlatform": "sevalla",
    "nonCanonicalHost": "example.com",
    "canonicalUrl": "https://www.example.com"
  }
}
```

## Field notes

- `pattern` values in `requiredHomepageText` are passed to `new RegExp(pattern, 'i')` — escape regex special characters if the literal text contains them (e.g. a permit/license number with internal spacing might need `\\s?` to tolerate whitespace variation).
- `blocking` defaults to `true` for `requiredHomepageText` entries if omitted. Set `false` for anything that shouldn't stop a launch on its own.
- `domainRedirect.nonCanonicalHost` is the bare host (no `https://`, no path) that should NOT serve content directly — the script fetches `https://<nonCanonicalHost>/` and checks it 301/302/308s to `canonicalUrl`. Get the direction right: whichever domain `PUBLIC_SITE_URL` points at is canonical; `nonCanonicalHost` is the other one.
- If the check fails on a site using this boilerplate's `public/_redirects` template, the fix is almost always that the placeholder domains (`example.com` / `www.example.com`) were never swapped for the real ones — see AGENTS.md → "Domain redirects (apex ↔ www)" and `.skills/astro-figma-scaffold/references/build-and-handoff.md`.
- This file is per-project state, not committed skill logic — it lives in `.agent/` alongside `project-map.json` and `session.md`, following this repo's state-persistence convention.
- When copying `.skills/go-live-check/` into a new project's repo, do NOT copy another project's `go-live-check.config.json` along with it — always create a fresh one for the new project during STARTUP.

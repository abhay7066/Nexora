# Automated Check → Checklist Item Mapping

Each key in `audit-go-live.mjs`'s JSON output corresponds to a line in whatever project-specific go-live checklist this repo has (e.g. `GO-LIVE-CHECKLIST.md`). Because every project's checklist wording differs, match on content/intent when cross-referencing — don't assume a fixed key-to-line lookup. The table below describes what each check generally verifies, in terms most go-live checklists will phrase similarly.

| JSON key | Generally maps to |
|---|---|
| `noindex_check` | Meta robots tag not blocking indexing (the classic "forgot to flip staging noindex before launch" blocker) |
| `canonical_tag` | Canonical tags set correctly across pages |
| `gtm_script` | Tag Manager / analytics container wired into the build |
| `gsc_verification` | Search Console (or equivalent) verification meta tag present |
| `og_image` / `favicon` | Social share image and favicon present |
| `structured_data` | JSON-LD / schema markup present |
| `required_text_N` | Whatever `requiredHomepageText[N]` in the config maps to — typically a legal/regulatory disclosure this specific business must display (license numbers, registration IDs, etc.) |
| `robots_txt` | robots.txt exists and references a sitemap |
| `sitemap` | Sitemap exists (precondition for submitting to Search Console) |
| `custom_404` | 404 page exists and isn't a soft-404 |
| `privacy_policy_reachable` | Privacy Policy page existence (content accuracy itself is still a manual check) |
| `https_redirect` / `ssl_certificate` | HTTPS enforced, SSL cert valid |
| `domain_redirect` | Apex/www canonical redirect — only runs if `domainRedirect` is set in config. Pairs with this boilerplate's own `public/_redirects` template (see AGENTS.md → "Domain redirects (apex ↔ www)"): that file is the fix, this check is what verifies the fix actually works once deployed. |
| `navPathChecks[]` | Page-existence precondition per configured nav path (content parity itself is still manual) |

## Notes on interpreting results

- A `false` result on `gtm_script`, `robots_txt`, or `sitemap` means the thing is **completely absent**, not just unverified — report it as a blocking finding, not a caveat.
- If a nav path from `navPathChecks` 404s but the site's own live nav/footer links to it directly, that's a **broken link already live on the site**, which is a worse finding than "not yet built" — call that distinction out explicitly.
- `ssl_certificate` always has `pass: null` — it's informational (raw `notBefore`/`notAfter`/`subject` output). A human should confirm the cert covers the eventual **production** hostname, not just whatever staging/preview hostname was tested — a staging cert will not carry over to production.
- If `results.checks.homepage_unreachable` is present, the whole run short-circuited — report only that finding, don't present empty/false results for every other check as if they were meaningfully tested.
- If `results.checks.no_config_warning` is present, this project has no `.agent/go-live-check.config.json` yet — legal-text, nav-path, and domain-redirect checks were skipped entirely, not run-and-failed. Don't conflate "skipped" with "failed."
- `domain_redirect` only runs if `domainRedirect` is configured — absence of this key in the results means it wasn't configured, not that it passed. On a host that serves every attached custom domain live (Sevalla, Netlify, Cloudflare Pages), a `false` here almost always means this boilerplate's `public/_redirects` template still has its placeholder domains (`example.com` / `www.example.com`) rather than the real ones — see the scaffold skill's build-and-handoff guidance.

# Broken Link Checker — Reference

## How to Check Links

### Step 1: Extract all links from the page
Parse every `href` attribute from:
- `<a>` tags in the header nav
- `<a>` tags used as CTA buttons
- `<a>` tags in body copy
- `<a>` tags in the footer
- `<a>` tags wrapping images (logo, portfolio)
- Social media icon links
- Legal page links (Privacy, Terms, Accessibility)

### Step 2: Normalise URLs
- Relative paths → prepend base domain, preserving the trailing-slash convention (e.g. `/contact/` → `https://example.com/contact/`)
- **Internal href missing its trailing slash** (e.g. `/contact`) → this is itself a 🟡 finding on trailing-slash sites (every click costs a 301, and with `trailingSlash: 'always'` it can 404 in dev). Record the finding, then test the corrected slashed URL.
- Anchor-only links (`#section`) → flag as internal anchors (verify section exists)
- `#` alone → flag immediately as placeholder/broken
- `tel:` and `mailto:` → flag for manual verification only (cannot be fetched)
- External URLs → attempt fetch as-is (never append a trailing slash to external URLs)

### Step 3: Fetch and record status
Use `web_fetch` for each URL. Record:
- **200** → Working
- **301/302** → Redirect — note where it redirects to
- **404** → Broken — page not found
- **403** → Forbidden — may be intentional (login gates) or misconfigured
- **500** → Server error
- **Fetch error / timeout** → Likely broken or unreachable
- **`#` href** → Placeholder — not a real link

### Step 4: Prioritise by importance
Check in this order (most critical first):

1. **Primary CTA buttons** — "Get a Free Quote", "Start Your Journey", "Request a Quote", etc.
2. **Navigation links** — All header nav items
3. **Secondary CTAs** — "View Our Gallery", "More About Us", "View Full Portfolio"
4. **Footer navigation links** — Explore, Services sections
5. **Social media links** — Twitter, Instagram, LinkedIn, Facebook, etc.
6. **Legal links** — Privacy Policy, Terms of Service, Accessibility
7. **In-body links** — Any hyperlinks within page copy
8. **Image links** — Logo links, linked portfolio images

---

## Status Code Reference

| Code | Meaning | Severity | Action |
|------|---------|----------|--------|
| 200 | OK | ✅ None | Pass |
| 301 | Permanent redirect | 🟢 Low | Note destination; update link if redirecting to wrong place |
| 302 | Temporary redirect | 🟡 Medium | Verify redirect destination is correct |
| 400 | Bad request | 🟠 High | Fix URL format |
| 401 | Unauthorized | 🟡 Medium | May be intentional (login required) |
| 403 | Forbidden | 🟡 Medium | Usually intentional but verify |
| 404 | Not found | 🔴 Critical (CTA/Nav) / 🟠 High (footer/body) | Fix or remove the link |
| 410 | Gone | 🟠 High | Remove link permanently |
| 500 | Server error | 🔴 Critical | Notify dev team immediately |
| 503 | Service unavailable | 🟠 High | May be temporary; recheck |
| `#` | Placeholder href | 🟠 High (social) / 🔴 Critical (CTA) | Replace with real URL |
| Empty | No href | 🟠 High | Add destination URL |

---

## Common Patterns to Look For

### Red flags in link extraction:
- `href="#"` — placeholder, goes nowhere
- `href=""` — empty, broken
- Internal href missing its trailing slash (e.g., `/about` instead of `/about/`) — if the site uses `trailingSlash: 'always'`, this costs a 301 redirect per click
- `href="javascript:void(0)"` — often a placeholder
- `onclick` only (no href) — not keyboard accessible
- Links pointing to staging/dev domains when on production (`localhost`, `.wip.`, `.dev.`, `.staging.` on live site)
- Links to the wrong domain (typos like `htttps://` or `wwww.`)
- PDF/doc links where the file might not exist
- Links with `.html` extension on pages that don't use `.html` in URL structure

### Duplicate link detection:
- Same URL appears in desktop nav AND mobile nav (acceptable, just note once)
- Same URL linked from multiple CTAs (fine, just test once)

---

## Output Template Per Link

### Broken link entry:
```
🔴 Critical — CTA Button "Get a Free Quote" → /contact → 404 Not Found
  Fix: Verify the /contact page exists and is published; check for routing config issues

🟠 High — Footer link "Privacy Policy" → /privacy-policy → 404 Not Found  
  Fix: Create the Privacy Policy page or update the link to the correct URL

🟠 High — Social icon (Instagram) → # → Placeholder
  Fix: Replace # with the real Instagram profile URL or remove the icon
```

### Clean link entry (for summary):
```
✅ /contact — 200 OK
✅ /portfolio — 200 OK
✅ /about — 200 OK
```

---

## Reporting Format

At the end of link checking, produce two sub-sections:

### Broken / Problematic Links (issues to fix)
List all non-200 / placeholder links with severity, location, URL, status, and fix.

### Link Health Summary
```
Total links checked: XX
✅ Working (200):        XX
🔴 Broken (404/500):     XX  
🟠 Placeholders (#):     XX
↩️ Redirects (301/302):  XX
📞 Tel/mailto (manual):  XX
```
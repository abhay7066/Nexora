# Audit Configuration & Defaults

Configuration settings, defaults, and environment detection rules for the website QA skill.

---

## Environment Detection

Environments are detected automatically from the URL. Map URLs to their environment:

| Environment | URL Pattern | Handling | Report Suffix |
|---|---|---|---|
| **LOCALHOST** | Contains `localhost`, `127.0.0.1`, `:4321` | Full source-file access, browser screenshots if available | `QA_REPORT_LOCALHOST-username.md` |
| **DEVELOPMENT** | Contains `dev`, `test` | Firecrawl screenshots, comprehensive checks | `QA_REPORT_DEVELOPMENT-username.md` |
| **STAGING** | Contains `staging`, `stage`, `.wip.` | Run staging readiness checklist, non-blocking issues acceptable | `QA_REPORT_STAGING-username.md` |
| **PRODUCTION** | All others (www.domain.com, domain.com) | Run full production readiness checklist, critical issues block | `QA_REPORT_PRODUCTION-username.md` |

### ⚠️ Critical: Trend Comparison Rules

**Only compare reports from the SAME environment:**

- ✅ Staging report #1 vs Staging report #2 (valid trend)
- ✅ Production report #1 vs Production report #2 (valid trend)
- ❌ Staging #1 vs Production #1 (invalid — different domains, integrations, baselines)

Each environment has different:
- Domain/URL structure
- Third-party integrations (staging may have test/placeholder versions)
- Content (staging may have test data)
- Asset optimization (production optimized, staging may have debug assets)
- Baselines & severity thresholds

Comparing across environments produces misleading results. Always filter by environment when analyzing trends.

---

## Viewport Sizes (for responsive testing)

**Default breakpoints tested** (matching DESIGN.md):

| Viewport | Width | Device Type | Use Case |
|---|---|---|---|
| Mobile | 375px | iPhone 12 | Below-fold optimization, touch targets |
| Tablet | 1024px | iPad | Multi-column transition |
| Desktop | 1440px | MacBook | Primary layout, hover states |

**Note:** Firecrawl supports only `mobile: true` (~375px) and desktop default (~1440px). Custom widths (1024px) require browser DevTools or user-provided screenshots.

---

## Severity Thresholds

When assigning severity to issues, use these thresholds:

| Severity | Block Launch? | Example Issues |
|---|---|---|
| 🔴 **Critical** | YES (production only) | Missing robots.txt, 500 errors, broken nav, no H1, noindex set accidentally |
| 🟠 **High** | Stage → production | Missing canonical, bad title length, external link broken, major design deviation |
| 🟡 **Medium** | No | Minor typos, one image missing alt, spacing deviation, missing OG tags |
| 🟢 **Low** | No | Polish items, CSS optimization opportunities, ARIA enhancements |

**Staging exception:** Non-blocking issues (🟡 🟢) are acceptable. Use to validate functionality.

**Production rule:** All 🔴 critical issues must be fixed before launch.

---

## Checks to Run by Environment

### Localhost (1)
✅ All 10 dimensions  
✅ Semantic HTML (source files available)  
✅ SEO checks (exact values, no estimation)  
⏭️ Firecrawl screenshots (cannot reach localhost — use browser if available)  

### Staging (S)
✅ All 10 dimensions  
✅ Staging readiness checklist  
✅ Firecrawl screenshots (desktop + mobile)  
✅ Integration tests (GTM, forms, third-party services)  
⚠️ Non-blocking issues acceptable  

### Production (P)
✅ All 10 dimensions  
✅ Production readiness checklist  
✅ Comprehensive link audit (all pages in sitemap)  
✅ Full screenshots (desktop + mobile + every page)  
✅ Visual artifact detection  
🚫 Critical issues must be 0 to proceed  

---

## Reference Values

### SEO Targets

| Element | Target | Notes |
|---|---|---|
| Title tag | 50–60 chars | Google truncates at ~60 |
| Meta description | 120–160 chars | Google truncates at ~160 |
| H1 | Exactly 1 per page | No duplicates, no skips |
| Images | 100% with alt text | Content images required; decorative get `alt=""` |
| Internal links | All with trailing slash | Per CLAUDE.md compliance |
| Keyword density | 1–2% | Natural, no stuffing |

### Accessibility Targets (WCAG AA)

| Element | Requirement |
|---|---|
| Color contrast (normal text) | ≥ 4.5:1 |
| Color contrast (large text) | ≥ 3:1 |
| Touch targets | ≥ 44×44px |
| Focus indicators | Visible, not outline:none |
| Form labels | Linked via `for`/`id` |
| Icon-only buttons | ARIA label required |

### Performance Targets (Core Web Vitals)

| Metric | Good | Needs Improvement | Poor |
|---|---|---|---|
| **LCP** | < 2.5s | 2.5–4.0s | > 4.0s |
| **CLS** | < 0.1 | 0.1–0.25 | > 0.25 |
| **INP** | < 200ms | 200–500ms | > 500ms |

### Image Size Limits

| Image Type | Max Size | Format |
|---|---|---|
| Hero / LCP image | 400KB | WebP or PNG |
| Standard image | 200KB | WebP preferred |
| Thumbnail | 50KB | WebP or JPEG |
| OG image (1200×630) | 100KB | JPEG |
| Favicon | 20KB | SVG or ICO |

---

## Tools & APIs

### Firecrawl (REST API)

**Endpoint:** `https://api.firecrawl.dev/v1/scrape`  
**Auth:** Bearer token from `.env` → `FIRECRAWL_API_KEY`  
**Rate limit:** ~100 requests/minute (adjust delays for batch operations)  
**Timeout:** Default 30s, configurable up to 60s  

**Supported formats:**
- `html` — Full HTML (preserves `<head>`, scripts, metadata)
- `markdown` — Cleaned markdown (body text only, no structure)
- `screenshot` — Image URL (desktop default ~1440px, or `mobile: true` for ~375px)
- `links` — All outbound links extracted

**Rate limiting for batch:**
```js
// Delay 1–2s between requests to avoid rate limits
for (let i = 0; i < urls.length; i++) {
  await scrape(urls[i]);
  if (i < urls.length - 1) await sleep(1000);
}
```

See `scripts/fetch-firecrawl.mjs` for helper functions.

---

## Report Naming Convention

**Format:** `YYYY-MM-DD_HH-MM-SS-QA_REPORT_ENVIRONMENT-git_username.md`

**Components:**
- `YYYY-MM-DD` — Date (e.g., 2026-06-11)
- `HH-MM-SS` — Time in 24h format (e.g., 14-30-00)
- `ENVIRONMENT` — LOCALHOST, DEVELOPMENT, STAGING, PRODUCTION (detected from URL)
- `git_username` — First name from `git config user.name` (e.g., Kavit)

**Examples:**
- `2026-06-11_14-30-00-QA_REPORT_STAGING-Kavit.md`
- `2026-06-11_09-15-30-QA_REPORT_PRODUCTION-Alice.md`
- `2026-06-11_16-45-20-QA_REPORT_LOCALHOST-Bob.md`

**Auto-generation:**
```js
import { saveReport } from './scripts/save-report.mjs';
const path = await saveReport(url, reportMarkdown);
// Auto-generates filename and saves to .agent/reports/
```

---

## External Checklists & References

When running audits, load these reference files as needed:

| File | When to Read |
|---|---|
| `checks.md` | Before starting dimension-specific checks |
| `staging-readiness.md` | Always, for staging audits |
| `production-readiness.md` | Always, for production audits |
| `json-ld-validation.md` | When validating structured data |
| `link-checker.md` | When auditing links (dimension 10) |
| `grammar-patterns.md` | When reviewing copy (dimension 3) |
| `seo-reference.md` | For SEO best-practice reference |
| `report-template.md` | When formatting the final report |
| `report-export.md` | When exporting to HTML/DOCX |
| `tracking-verification.md` | When auditing GTM, GA, analytics |

---

## Script Usage Quick Reference

### Save a report automatically
```bash
node .skills/website-qa/scripts/save-report.mjs \
  --url https://staging.example.com \
  --report ./report-content.md
```

### Fetch with Firecrawl
```bash
node .skills/website-qa/scripts/fetch-firecrawl.mjs \
  --url https://example.com \
  --formats html,screenshot \
  --mobile \
  --output ./fetch-result.json
```

### Batch audit multiple pages
```bash
node .skills/website-qa/scripts/batch-audit.mjs \
  --url https://staging.example.com \
  --pages /, /about/, /services/, /contact/ \
  --output ./batch-results.json
```

---

## Troubleshooting

| Issue | Solution |
|---|---|
| **Firecrawl API timeout** | Increase `timeout` param (default 30s, max 60s), or retry with delay |
| **API key not found** | Ensure `.env` has `FIRECRAWL_API_KEY=...` at project root |
| **Cannot fetch localhost** | Firecrawl cannot reach local IPs. Use browser screenshots instead. |
| **Screenshot quality low** | Use desktop (~1440px) screenshots first. Mobile viewport is ~375px and less detailed. |
| **Rate limit hit** | Add 1–2s delay between batch requests; Firecrawl limit is ~100 req/min |
| **Git username not detected** | Ensure git is configured: `git config user.name "Your Name"` |

---

## Future Enhancements

- [ ] Comparison tool: compare current audit vs previous (track regressions)
- [ ] Lighthouse CI integration: automated performance checks
- [ ] Slack/email reports: auto-send reports to stakeholders
- [ ] Daily scheduled audits: cron jobs for continuous monitoring
- [ ] Custom severity rules: per-project overrides

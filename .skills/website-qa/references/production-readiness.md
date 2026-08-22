# Production Readiness Checklist

Run this checklist **before flipping the public domain** to point to the live site.

**🚨 Critical issues block launch.** Non-critical issues can be fixed post-launch (within 1–2 weeks).

---

## 🔴 Critical (Block Launch)

- [ ] `robots.txt` exists and is accessible at `/robots.txt` (returns 200 OK)
- [ ] `sitemap-index.xml` exists and is accessible at `/sitemap-index.xml` (returns 200 OK)
- [ ] `sitemap-index.xml` references all sub-sitemaps (sitemap.xml, etc.) if multi-sitemap
- [ ] Sitemaps include all public pages (exclude maintenance pages, admin paths, drafts)
- [ ] `robots.txt` points to correct sitemap: `Sitemap: https://yourdomain.com/sitemap-index.xml` or `Sitemap: https://yourdomain.com/sitemap.xml`
- [ ] Canonical tags are self-referencing (prod URL, not staging)
- [ ] **JSON-LD structured data wired** — validated per `json-ld-validation.md`
- [ ] HTTPS is enforced: all HTTP traffic redirects to HTTPS
- [ ] SSL certificate is valid and trusted (no browser warnings)
- [ ] **Search Console verification meta tag present** (if configured): `<meta name="google-site-verification" content="..." />` or `<meta name="msvalidate.01" content="..." />` (per your analytics platform)
- [ ] **Analytics tracking script present and firing** (if configured) — check DevTools Network tab for analytics requests (Google Analytics, Mixpanel, Segment, etc.), verify Real-time dashboard shows activity
- [ ] **Tag Manager or conversion tracking configured** (if configured) — check DevTools Network tab for tag manager requests (`googletagmanager.com`, `analytics.google.com`, or equivalent)
- [ ] **Third-party service scripts loaded** (if configured: CRM, live chat, email platform, etc.) — check DevTools Network tab, verify dashboard activity
- [ ] **All external links validated** — run `curl -s URL | node .skills/website-qa/scripts/validate-links.mjs - https://yourdomain.com` and fix any broken links (404/5xx), fix redirect chains
- [ ] **HTTP redirects working** — if migrating from old domain, run `node .skills/website-qa/scripts/check-redirects.mjs https://yourdomain.com/old-path` and verify no loops or chains
- [ ] No console errors or warnings (DevTools → Console tab shows green)
- [ ] All critical paths tested: home → contact form → thank you → external links

---

## 🟠 High Priority (Fix before launch)

- [ ] Open Graph image (og-default.jpg or custom) exists and renders in social previews (test with Facebook Sharing Debugger / Twitter Card Validator)
- [ ] Search Console property created (Google Search Console, Bing Webmaster Tools, or equivalent) and sitemap submitted
- [ ] Analytics platform configured and tracking confirmed (expect 24-hour lag for some platforms)
- [ ] Form submissions route to correct email address(es) or CRM integration
- [ ] User account / login portals linked and accessible (if applicable: member area, client dashboard, etc.)
- [ ] Contact information (phone, address, hours, email) is current and accurate
- [ ] Legal/compliance links correct: Privacy Policy, Terms of Service, Cookie Policy, relevant certifications/badges, etc.
- [ ] All external integrations tested: CMS APIs, email service, CRM, payment processors, as configured
- [ ] Error pages (404, 500) render without breaking styles or losing navigation

---

## 🟡 Medium Priority (Fix within 1–2 weeks post-launch)

- [ ] Page load time ≤ 3 seconds on 4G network (DevTools → Network, throttle to 4G, measure)
- [ ] Lighthouse scores: Performance ≥ 85, Accessibility ≥ 90, Best Practices ≥ 85
- [ ] Core Web Vitals targets: LCP < 2.5s, CLS < 0.1, INP < 200ms
- [ ] Images optimized: no images > 200KB, WebP served where possible
- [ ] Fonts preconnected and loaded efficiently (display=swap for Google Fonts)
- [ ] CSS and JS minified (check Network tab, look for versioned `.js` and `.css` files)
- [ ] Browser caching headers set (Cache-Control, ETag on static assets)
- [ ] CDN caching configured (if using a CDN like Cloudflare)
- [ ] Form validation works client-side before submit
- [ ] No mixed-content warnings (all resources over HTTPS)
- [ ] Emails sent from real domain (ideally `no-reply@yourdomain.com`, not generic noreply@)
- [ ] **HTML structure validated** — run `curl -s URL | node .skills/website-qa/scripts/extract-html-data.mjs -` and verify headings, semantic HTML, meta tags
- [ ] **Images optimized** — run `curl -s URL | node .skills/website-qa/scripts/check-images.mjs -` and verify no large images (>200KB), check lazy-loading on below-fold images

---

## 🟢 Low Priority (After launch, within 1 month)

- [ ] Keyboard navigation tested (Tab, Shift+Tab, Enter key navigation works logically)
- [ ] Screen reader tested (NVDA on Windows, VoiceOver on Mac/iOS)
- [ ] Mobile browsers: iOS Safari, Chrome, Firefox (test on 320px, 768px viewports)
- [ ] Desktop browsers: Chrome, Firefox, Safari, Edge (test on 1440px viewport)
- [ ] Slow network tested (DevTools: throttle to Slow 3G, Fast 3G, 4G)
- [ ] Redirects from old URLs configured (if site redesign)
- [ ] 301 redirects from old domain (if domain changed)
- [ ] Social media profiles linked and profiles verified (LinkedIn, Twitter, Facebook)
- [ ] Dark mode support tested (if implemented)

---

## Pre-Launch Automation

Run these checks in your CI/CD pipeline or manually:

```bash
# Extract and validate HTML (headings, images, links, meta)
curl -s https://yourdomain.com/ | node .skills/website-qa/scripts/extract-html-data.mjs -

# Validate all external links
curl -s https://yourdomain.com/ | node .skills/website-qa/scripts/validate-links.mjs - https://yourdomain.com

# Check image optimization
curl -s https://yourdomain.com/ | node .skills/website-qa/scripts/check-images.mjs -

# Check HTTP redirects
node .skills/website-qa/scripts/check-redirects.mjs https://yourdomain.com/

# Check critical files return 200
curl -I https://yourdomain.com/robots.txt           # Should be 200
curl -I https://yourdomain.com/sitemap-index.xml    # Should be 200
curl -I https://yourdomain.com/og-default.jpg       # Should be 200 (if custom image)
curl -I https://yourdomain.com/favicon.svg          # Should be 200

# Validate JSON-LD schemas
curl -s https://yourdomain.com/ | grep -o '<script type="application/ld+json">[^<]*</script>'

# Verify HTTPS enforcement
curl -I http://yourdomain.com/ # Should redirect to https:// (301 or 302)

# Check GSC verification meta
curl -s https://yourdomain.com/ | grep "google-site-verification"

# Run Lighthouse audit
lighthouse https://yourdomain.com/ --chrome-flags="--headless --no-sandbox" --output-path=./lighthouse-report.html
```

---

## 24-Hour Reporting Lag

**Google Analytics takes up to 24 hours to process and display data.** On launch day:
- ✅ Real-time dashboard shows activity within 30 seconds (Active Users, top pages)
- ❓ Main Dashboard reports (traffic, events, conversions) may not appear until next day
- ✅ Data is being collected (confirmed by Network tab requests and Real-time activity)

If Real-time shows **0 users** after 1 minute, GA tracking is broken and must be fixed before launch.

---

## Comprehensive Audit: Sitemap Parsing & All-Link Screenshots

**For production audits, if sitemap exists, run this comprehensive flow:**

### 1. Fetch & Parse Sitemap(s)
```bash
# Get sitemap-index.xml or sitemap.xml
curl -s https://yourdomain.com/sitemap-index.xml > sitemap-index.xml
# OR
curl -s https://yourdomain.com/sitemap.xml > sitemap.xml

# Extract all <loc> entries and deduplicate
grep -oP '(?<=<loc>)[^<]+' sitemap-index.xml sitemap.xml | sort | uniq > all-urls.txt
```

**Expected:** 20–500+ URLs depending on site size. If < 5 URLs or > 10,000, investigate.

### 2. Screenshot ALL Pages (Desktop + Mobile)

For every URL in the sitemap **plus** `/maintenance/` (check separately):

```
For each URL:
  - Firecrawl desktop screenshot (default 1440px)
  - Firecrawl mobile screenshot (mobile: true, ~375px)
  - Save URLs of screenshots for visual inspection
```

**Batch in groups of 10–20** to avoid timeouts. Example workflow:
```
Page 1–10: Screenshot all desktop + mobile → record URLs
Page 11–20: Screenshot all desktop + mobile → record URLs
...continue in batches
```

### 3. Check for Visual Artifacts

Compare each desktop vs mobile screenshot pair for:
- **Missing images** — broken image icon or white box where image should be
- **Layout shift** — buttons, text, or sections in different positions between desktop/mobile
- **Overlapping content** — text over images, buttons inaccessible
- **Unrendered sections** — blank white areas where content should exist
- **Font loading issues** — content invisible until font loads (FOUT), then layout shifts
- **Navigation issues** — mobile menu broken, links unreachable, text cut off
- **Color/contrast problems** — text unreadable against background

**Report every visual artifact with:**
- URL and screenshot URLs
- Description (e.g., "Hero image returns 404 → displays broken-image icon")
- Severity (🔴 Critical if affects primary CTA, 🟠 High if affects navigation, etc.)

### 4. Validate ALL Links

From all fetched pages (not just homepage):
```bash
# Extract all <a href> from all pages
# Normalise URLs (relative → absolute)
# Test each URL: curl -I URL
# Record status codes
```

**Expected breakdowns (typical site):**
- ✅ 90%+ working (200 OK)
- ↩️ 5–10% redirects (301/302) — acceptable if pointing to correct destination
- 🔴 0% broken (404/5xx) — critical to fix before launch

### 5. Verify `/maintenance/` Page

If the site has a maintenance mode page:
```bash
curl -I https://yourdomain.com/maintenance/    # Should be 200
curl -s https://yourdomain.com/maintenance/ | grep noindex   # Should have noindex meta
```

**Checklist:**
- [ ] Page exists and loads (200 OK)
- [ ] Has `<meta name="robots" content="noindex, nofollow">`
- [ ] Renders without CSS/styling errors
- [ ] Shows expected maintenance message
- [ ] Links and buttons work (if any)
- [ ] Is accessible when needed (check deployment flag/config that activates it)

---

## Post-Launch (First 48 Hours)

- [ ] Monitor Real-time dashboard for traffic spikes or anomalies
- [ ] Check error logs for 404s, 5xx errors
- [ ] Verify form submissions are being received
- [ ] Check GA dashboard for traffic, top pages, goal conversions (after 24 hours)
- [ ] Verify GSC sees the site as indexed (may take 1–2 weeks for full crawl)
- [ ] Test contact form on staging still works (if not migrated to production)
- [ ] Spot-check a few pages on mobile devices

---

## Launch Rollback Plan

If critical issues arise post-launch:
1. Revert DNS to staging environment OR
2. Revert `PUBLIC_IS_STAGING=false` to `true` (will set `robots: noindex, nofollow` immediately)
3. Fix the issue and re-deploy
4. Re-run the critical checklist items before re-launching

# Staging Readiness Checklist

Run this checklist when the site is deployed to a **staging environment** (before production).

**Non-blocking issues are acceptable** — staging is for validation before launch. Use the staging environment to catch bugs, test integrations, and verify functionality.

---

## 🔴 Critical (Block QA)

- [ ] Site is accessible (no 500 errors, responds in <5s)
- [ ] No console errors that break functionality (DevTools → Console tab)

---

## 🟠 High Priority (Should fix before QA testing)

- [ ] Homepage `/` loads without errors
- [ ] Navigation: all header links work correctly (test primary nav items from design system)
- [ ] Mobile menu toggles correctly at primary breakpoint (typically `md:` or `lg:`)
- [ ] Contact form (if present) submits without errors or displays expected validation
- [ ] External integrations connected (third-party services, APIs as configured)
- [ ] Scroll animations / interactive elements trigger at correct thresholds (if implemented)
- [ ] Scroll-to-top or other helper features function correctly (if implemented)

---

## 🟡 Medium Priority (Polish before sharing with stakeholders)

- [ ] All images load without 404 errors
- [ ] Fonts load from Google Fonts CDN (no fallback degradation)
- [ ] Page titles and meta descriptions are descriptive and accurate
- [ ] Open Graph preview shows correct title, description, image (use og-default.jpg)
- [ ] Twitter Card preview displays correctly in social debuggers
- [ ] Favicon renders in browser tab
- [ ] All internal links include trailing slashes (`/about/`, not `/about`)
- [ ] No console errors or warnings (check DevTools → Console)
- [ ] Lighthouse score ≥ 85 for Performance, Accessibility, Best Practices
- [ ] **HTML structure validated** — run `curl -s URL | node .skills/website-qa/scripts/extract-html-data.mjs -` and fix any heading hierarchy or semantic issues
- [ ] **Images optimized** — run `curl -s URL | node .skills/website-qa/scripts/check-images.mjs -` and review large images, missing lazy-loading, missing dimensions

---

## 🟢 Low Priority (Nice-to-have)

- [ ] Print styles don't break layout (optional, CSS @media print)
- [ ] Dark mode support tested (if implemented)
- [ ] Mobile browsers tested (iOS Safari, Chrome, Firefox)
- [ ] Desktop browsers tested (Chrome, Firefox, Safari, Edge)

---

## Automation (Optional)

```bash
# Extract and validate HTML
curl -s https://staging-yoursite.com/ | node .skills/website-qa/extract-html-data.mjs

# Check key files are accessible
curl -I https://staging-yoursite.com/favicon.svg       # Should be 200
curl -I https://staging-yoursite.com/og-default.jpg    # Should be 200

# Check console for errors (requires browser or Lighthouse)
lighthouse https://staging-yoursite.com/ --chrome-flags="--headless --no-sandbox"
```

---

## Next Steps

Once staging passes, move to **Production Readiness Checklist** before going live.

# QA Report Template

Use this template to produce the final report at the end of every audit.
Replace all `[PLACEHOLDER]` values. Remove any category section where checks were skipped — 
replace its content with the skip notice.

---

```
╔══════════════════════════════════════════════════════════════════╗
║           WEBSITE QA REPORT                                      ║
║  URL    : [https://example.com/page]                             ║
║  Audited: [DD MMM YYYY]                                          ║
║  By     : Website QA Skill                                       ║
╚══════════════════════════════════════════════════════════════════╝

┌──────────────────────────────────────────────────────────────────┐
│  SUMMARY                                                         │
├──────────────────────────────────────────────────────────────────┤
│  Total Issues  : [XX]                                            │
│  🔴 Critical   : [X]   — Must fix before launch                 │
│  🟠 High       : [X]   — Fix soon, significant impact           │
│  🟡 Medium     : [X]   — Fix in next sprint                     │
│  🟢 Low        : [X]   — Polish / nice-to-have                  │
├──────────────────────────────────────────────────────────────────┤
│  CHECKS RUN                                                      │
│  ✅ Content Accuracy    ✅ Grammar & Spelling                    │
│  ✅ On-Page SEO         ✅ Technical SEO                         │
│  ✅ Semantic HTML       ✅ Page Load Speed                       │
│  ✅ Responsive Layout   ✅ Accessibility                         │
│  ✅ Link Health         ⏭️  Design Fidelity — Skipped (no Figma) │
└──────────────────────────────────────────────────────────────────┘


══════════════════════════════════════════════════════════════════
 1. 🎨  DESIGN FIDELITY                              [X issues]
══════════════════════════════════════════════════════════════════

[🔴/🟠/🟡/🟢] [Location on page]
  Issue  : [What's wrong]
  Fix    : [How to fix it]

— or —

⏭️  Skipped — no Figma design link was provided.
    To enable this check, share a public Figma link and re-run the audit.


══════════════════════════════════════════════════════════════════
 2. 📝  CONTENT ACCURACY                             [X issues]
══════════════════════════════════════════════════════════════════

[🔴/🟠/🟡/🟢] [Location]
  Issue  : [What's wrong]
  Fix    : [How to fix it]

✅ No issues found.   ← use this when the category is clean


══════════════════════════════════════════════════════════════════
 3. ✏️  GRAMMAR & SPELLING                           [X issues]
══════════════════════════════════════════════════════════════════

[🔴/🟠/🟡/🟢] [Location — e.g. "Hero section, paragraph 2"]
  Issue  : [Exact text with error]  →  [Corrected text]
  Fix    : Replace "[wrong]" with "[right]"


══════════════════════════════════════════════════════════════════
 4. 🔍  ON-PAGE SEO                                  [X issues]
══════════════════════════════════════════════════════════════════

[🔴/🟠/🟡/🟢] [Element — e.g. "Title tag"]
  Issue  : [Current value / state]
  Fix    : [Required change]
  Current: "[current title]"  (XX chars)
  Target : 50–60 chars, include "[keyword]"


══════════════════════════════════════════════════════════════════
 5. ⚙️  TECHNICAL SEO                                [X issues]
══════════════════════════════════════════════════════════════════

[🔴/🟠/🟡/🟢] [Element]
  Issue  : [Description]
  Fix    : [Recommendation]
  Detail : [Any relevant code snippet or value]


══════════════════════════════════════════════════════════════════
 6. 📱  RESPONSIVE LAYOUT                            [X issues]
══════════════════════════════════════════════════════════════════

[🔴/🟠/🟡/🟢] [Breakpoint — e.g. "Mobile 375px | Hero section"]
  Issue  : [Description of layout problem]
  Fix    : [CSS or design recommendation]


══════════════════════════════════════════════════════════════════
 7. 🏗️  SEMANTIC HTML STRUCTURE                      [X issues]
══════════════════════════════════════════════════════════════════

[🔴/🟠/🟡/🟢] [Element / Line context]
  Issue  : [What semantic element is missing or wrong]
  Current: [current HTML snippet]
  Fix    : [Corrected HTML snippet]


══════════════════════════════════════════════════════════════════
 8. ⚡  PAGE LOAD SPEED                               [X issues]
══════════════════════════════════════════════════════════════════

[🔴/🟠/🟡/🟢] [Asset / Element]
  Issue  : [Performance problem description]
  Impact : [LCP / CLS / INP / general]
  Fix    : [Specific optimisation recommendation]

Core Web Vitals Estimate:
  LCP  : [value or "unable to measure — no browser tool"]
  CLS  : [value or estimate]
  INP  : [value or estimate]


══════════════════════════════════════════════════════════════════
 9. ♿  ACCESSIBILITY                                 [X issues]
══════════════════════════════════════════════════════════════════

[🔴/🟠/🟡/🟢] [Element]
  Issue  : [Accessibility problem]
  WCAG   : [Relevant WCAG criterion, e.g. 1.4.3 Contrast]
  Fix    : [Recommendation]


══════════════════════════════════════════════════════════════════
 10. 🔗  LINK HEALTH                                  [X issues]
══════════════════════════════════════════════════════════════════

[🔴/🟠/🟡/🟢] [Link location — e.g. "Footer — Privacy Policy"]
  Issue  : [href] → [status code / placeholder / redirect target]
  Fix    : [Recommendation]

Link Health Summary:
  Total checked: XX | ✅ Working: XX | 🔴 Broken: XX | 🟠 Placeholders: XX
  ↩️ Redirects: XX  | 📞 tel/mailto (manual check): XX


╔══════════════════════════════════════════════════════════════════╗
║  🚨  TOP PRIORITY FIXES  (Critical + High)                       ║
╠══════════════════════════════════════════════════════════════════╣
║                                                                  ║
║  1. [Category] — [One-line summary of fix]                       ║
║  2. [Category] — [One-line summary of fix]                       ║
║  3. [Category] — [One-line summary of fix]                       ║
║  4. ...                                                          ║
║                                                                  ║
╚══════════════════════════════════════════════════════════════════╝

[Optional: add a "Quick Wins" section for low-effort High-impact items]

╔══════════════════════════════════════════════════════════════════╗
║  ✅  QUICK WINS  (Low effort, High impact)                        ║
╠══════════════════════════════════════════════════════════════════╣
║  1. [Fix that takes < 5 mins]                                    ║
║  2. ...                                                          ║
╚══════════════════════════════════════════════════════════════════╝
```

---

## Severity Assignment Guide

Use this to consistently assign severities:

| Condition | Severity |
|---|---|
| Page is deindexed / noindex set accidentally | 🔴 Critical |
| Page throws a 4xx/5xx error | 🔴 Critical |
| Complete broken navigation | 🔴 Critical |
| Missing canonical causing duplicate content crawl | 🟠 High |
| H1 missing or multiple H1s | 🟠 High |
| Missing meta description | 🟠 High |
| Missing structured data for key page type | 🟠 High |
| Major design deviation (wrong brand colour sitewide) | 🟠 High |
| Horizontal scroll on mobile | 🟠 High |
| Images missing alt text (multiple) | 🟠 High |
| Grammar/spelling errors in hero/headline | 🟠 High |
| Render-blocking scripts slowing LCP > 4s | 🟠 High |
| Colour contrast fail on body text | 🟠 High |
| Missing `<main>` landmark | 🟡 Medium |
| Minor typos in body copy | 🟡 Medium |
| One image missing alt text | 🟡 Medium |
| Minor spacing deviation from Figma | 🟡 Medium |
| Missing OG/Twitter card tags | 🟡 Medium |
| `font-display` not set for web fonts | 🟡 Medium |
| Minor heading hierarchy skip (h2 → h4 once) | 🟡 Medium |
| Polish/cosmetic alignment issue | 🟢 Low |
| Caption text has minor typo | 🟢 Low |
| Image could be WebP format (is currently JPEG) | 🟢 Low |
| ARIA enhancement opportunity | 🟢 Low |

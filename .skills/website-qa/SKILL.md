# Agent Skill
# File: .skills/website-qa/SKILL.md
# Usage: /website-qa

Thorough multi-dimensional QA audit: 10 checks, issue categorization, readiness checklist.

Audits localhost or hosted sites. Generates timestamped reports in `.agent/reports/`.

---

## STARTUP

Read silently (if they exist):
1. `.agent/project-map.json` — to understand project structure and integrations
2. `.agent/session.md` — to see what's been completed
3. `DESIGN.md` — to validate design token usage

**If state files don't exist:** It's OK — QA can run standalone on any URL.

Then read:
- `references/audit-config.md` for reference thresholds and severity levels

Ask user for:
- **Target URL** (localhost:3000 or hosted domain)
- **Environment** (staging or production)
- **Focus areas** (or audit all 10 dimensions)

**File organization (mandatory):**
- Temp files: `.agent/audit/`
- Final reports: `.agent/reports/` only
- Scripts: extract-html-data.mjs, validate-links.mjs, check-images.mjs, save-report.mjs
- Report format: `.agent/reports/YYYY-MM-DD_HH-MM-SS-QA_REPORT_ENVIRONMENT-git_username.md`

---

## AUDIT STEPS

See `references/` folder for detailed checks:
- **checks.md** — 10 audit dimensions (link validation, SEO, accessibility, images, etc.)
- **audit-config.md** — severity thresholds, reference values
- **staging-readiness.md** — checklist if auditing staging
- **production-readiness.md** — checklist if auditing production
- **report-template.md** — report format and structure

---

## RULES

- **Use the scripts** — extract-html-data.mjs, validate-links.mjs, check-images.mjs, save-report.mjs
- **Temp files in .agent/audit/** — never use /tmp or $env:TEMP
- **Final reports in .agent/reports/** — timestamped, never overwrite
- **Be explicit about missing data** — no implication of perfection when data unavailable
- **Always include readiness checklist** — staging or production based on environment
- **Update session.md** — append completed entry before ending

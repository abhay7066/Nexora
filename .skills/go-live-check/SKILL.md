# Agent Skill
# File: .skills/go-live-check/SKILL.md
# Usage: /go-live-check

Runs the automatable subset of a project's go-live checklist against a live URL, cross-references the result against the checklist, and produces (1) a full report saved to `.agent/reports/`, and (2) a short copy-paste block formatted for pasting into wherever the project tracks launch progress (task tracker, ticket, etc.).

**Reusable across projects.** Nothing project-specific is hardcoded in this skill — target URL, required legal/compliance text, nav paths to spot-check, project name, and the task-tracker reference all come from `.agent/go-live-check.config.json`, which is unique per project. Copy this whole `.skills/go-live-check/` folder into any site repo; on first run it'll help you create that project's config if one doesn't exist yet.

This skill is distinct from `/website-qa` (generic technical audit of any page) — it exists specifically to track progress against a hand-maintained go-live checklist that encodes *this project's* business-specific launch criteria (which pages need migrating, data migration scope, legal numbers that must appear, etc.), which no generic skill can know about.

---

## STARTUP

Read silently:
1. The project's go-live checklist file (default `GO-LIVE-CHECKLIST.md` at repo root, or whatever `checklistFile` is set to in the config — see step 2). **If no checklist file exists anywhere in the repo, stop** and tell the user this skill has nothing to check against; it doesn't generate the checklist, only audits against it.
2. `.agent/go-live-check.config.json` — the per-project config. **If it doesn't exist, create it now** by asking the user for:
   - `projectName` — human-readable name for the report header
   - `targetUrl` — the site to audit (or confirm it should fall back to `PUBLIC_SITE_URL` in `.env`)
   - `checklistFile` — path to the checklist (default `GO-LIVE-CHECKLIST.md`)
   - `taskReference` — `{ label, url }` for wherever launch progress is tracked (a task tracker ticket, a Linear issue, etc.) — optional, used only in the task-comment output
   - `navPaths` — the site's top-level nav/footer paths worth spot-checking for existence (pull these from the checklist or the live nav if the user doesn't already have a list)
   - `privacyPolicyPath` — default `/privacy-policy/`
   - `requiredHomepageText` — array of `{ label, pattern, blocking }` for text that must appear on the homepage (regulatory license numbers, registration IDs, etc. — whatever this specific business is legally required to display). Leave empty if not applicable.

   Save it to `.agent/go-live-check.config.json` using the schema in `references/config-schema.md`, and confirm the values with the user before running anything.
3. `.agent/project-map.json` and `.agent/session.md` if present, for context only.

If the config already exists, read it silently and skip the interactive setup — just confirm the target URL with the user in case they want to point at a different environment for this run (e.g. a preview deploy instead of the usual staging URL).

---

## WHAT THIS SKILL CAN AND CANNOT AUTOMATE

State this distinction to the user before presenting results — never blur the line between the two.

**Automatable — checked directly by `scripts/audit-go-live.mjs`:**
- Meta robots `noindex` state on homepage
- `robots.txt` (200 + references a sitemap), `sitemap-index.xml` (200)
- Canonical tag, `google-site-verification` meta, `og:image`, favicon, JSON-LD structured data presence
- GTM (or equivalent tag manager) script tag presence
- Custom 404 page, HTTP→HTTPS redirect, SSL certificate validity/expiry
- Whatever `requiredHomepageText` patterns are configured for this project (e.g. regulatory license numbers)
- Whatever `navPaths` are configured — existence only (200 vs. 404), never content correctness

**NOT automatable — always reported as "needs manual sign-off," regardless of any automated check passing:**
- Content parity decisions (rebuild vs. consolidate vs. retire per page) and actual *content* correctness — an automated check can confirm a page exists, never that its content matches or that a redirect target is the right one
- Data migration completeness — requires comparing real content/record counts against the old system, not just endpoint existence
- Design/CRO sign-off — requires human review against source mockups or references
- Form submission behavior, click-through link validation, cross-browser testing, Core Web Vitals, accessibility
- Legal review sign-off — text presence is not legal approval
- Launch-day logistics and rollback execution

Never mark a manual-only item as "passed." If asked to summarize overall readiness, always report it as `<N> automated checks + <M> manual items still pending`, never as a single pass/fail number that could be misread as "ready to launch."

---

## STEPS

1. Confirm the target URL and config with the user (see STARTUP).
2. Run the audit script:
   ```bash
   node .skills/go-live-check/scripts/audit-go-live.mjs [targetUrl]
   ```
   Target URL is optional if it's set in the config or `.env`'s `PUBLIC_SITE_URL`. It prints JSON with one entry per automated check (`pass: true/false/null`, `detail`, `blocking: true/false`) plus a `navPathChecks` array.
3. Cross-reference each JSON result against the specific checklist line item it verifies. Since checklists differ per project, do this by matching on content (e.g. a `noindex_check` failure maps to whatever line in the checklist mentions "noindex" or "robots meta"), not a fixed lookup table — `references/checks.md` shows the general mapping pattern with this project's checklist as a worked example.
4. Walk every remaining checklist item that has no automated check and list it under "Manual — needs sign-off," grouped by section, preserving whatever `[ ]`/`[x]` state is already in the file (if already checked, note "marked done in checklist — not independently re-verified by this tool").
5. Render the full report using `references/report-template.md` and save it:
   ```
   .agent/reports/YYYY-MM-DD_HH-MM-SS-GO_LIVE_REPORT-<git-or-system-username>.md
   ```
6. Render the condensed version using `references/task-comment-template.md` and **print it directly in the chat response** (in a fenced code block so it's easy to copy) — do not attempt to post it anywhere automatically unless an authorized, tested integration for this project's task tracker exists. See "Publishing results" below.
7. Append a completed entry to `.agent/session.md` noting the report path and headline numbers (X automated pass / Y automated fail / Z manual pending).

---

## PUBLISHING RESULTS

Don't assume any task tracker API/webhook is available. Unless the user has explicitly confirmed one is authorized and wired up for this project, every run ends the same way: print the task-comment block in chat, and tell the user to paste it in manually (attaching the full `.agent/reports/*.md` file if their tracker supports uploads). If the user says a real integration now exists and wants automatic posting, treat that as a separate, explicit ask — don't attempt it silently or assume it carries over from a different project.

---

## RULES

- Never claim a check "passed" when the script returned `pass: null` (e.g. SSL certificate) — surface it as "needs human read," with the raw detail shown.
- Never re-implement the checks inline with ad hoc `curl` calls — always run `scripts/audit-go-live.mjs` so results are consistent run-to-run.
- Don't hardcode any project's specifics (URLs, legal text, task references) into this SKILL.md or the scripts — those belong in `.agent/go-live-check.config.json` only. If you catch yourself about to hardcode something project-specific here, put it in the config schema instead.
- Don't silently drop blocking failures into the middle of a long report — `references/report-template.md` puts a "Blockers" section first for exactly this reason.
- If the target URL is unreachable entirely, report that plainly as the single blocking finding — don't attempt the rest of the checks against a dead target.
- Update `.agent/session.md` before ending, per this repo's state-persistence rules (if this repo follows that convention — check `CLAUDE.md`/`AGENTS.md` for the project you're running in).

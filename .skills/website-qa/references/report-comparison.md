# Report Comparison & Trend Tracking

Guide for comparing QA reports over time to track improvements, regressions, and audit history.

---

## ⚠️ CRITICAL RULE: Only Compare Same Environments

**Always compare reports within the SAME environment only.**

- ✅ Compare staging report → staging report (same domain, same conditions)
- ✅ Compare production report → production report
- ✅ Compare localhost report → localhost report
- ❌ Do NOT compare staging → production (different domains, different integrations, misleading)
- ❌ Do NOT compare localhost → staging (different tools, different HTML)

Different environments have different baselines:
- **Staging:** May have test integrations, placeholder assets, non-indexed pages
- **Production:** Must have real integrations, optimized assets, indexed pages
- **Localhost:** Full source access, browser screenshots possible, different Firecrawl behavior

Comparing across environments produces false "improvements" or "regressions."

---

## Why Compare Reports (Within Same Environment)?

Comparing reports across time within the same environment lets you:

- **Track progress:** See if fixes from the last audit actually made it into the next deploy
- **Detect regressions:** Spot when new code breaks previously-passing checks
- **Justify maintenance:** Show stakeholders that QA work prevents defects
- **Monitor health:** Catch performance degradation or accessibility issues early
- **Establish trends:** Identify chronic issues that need architectural fixes

---

## Extracting Comparison Data

Each report filename includes a timestamp:

```
2026-06-11_14-30-00-QA_REPORT_STAGING-Kavit.md
         ↑ Use this to order reports chronologically
```

Reports are saved to `.agent/reports/` in chronological order by filename.

---

## Quick Manual Comparison

### 1. List all reports for ONE environment

```bash
# STAGING only
ls -la .agent/reports/ | grep "QA_REPORT_STAGING" | tail -5
# Shows last 5 staging reports

# PRODUCTION only
ls -la .agent/reports/ | grep "QA_REPORT_PRODUCTION" | tail -5
# Shows last 5 production reports

# ❌ DO NOT MIX: grep "QA_REPORT" without filtering by environment
```

### 2. Compare two reports from the SAME environment (side-by-side)

```bash
# ✅ STAGING to STAGING
diff -u \
  .agent/reports/2026-06-10_16-00-00-QA_REPORT_STAGING-Kavit.md \
  .agent/reports/2026-06-11_14-30-00-QA_REPORT_STAGING-Kavit.md

# ✅ PRODUCTION to PRODUCTION
diff -u \
  .agent/reports/2026-06-11_15-45-00-QA_REPORT_PRODUCTION-Alice.md \
  .agent/reports/2026-06-12_09-00-00-QA_REPORT_PRODUCTION-Bob.md

# ❌ WRONG: Comparing STAGING → PRODUCTION
# (different domains, different issues, misleading results)
```

**Look for:**
- New issues (lines with `+`)
- Fixed issues (lines with `-`)
- Severity changes (e.g., `🟠 High` → `🟢 Low`)

### 3. Check severity trends (SAME ENVIRONMENT ONLY)

Extract severity counts from reports in ONE environment:

```bash
# ✅ STAGING trends only
for file in .agent/reports/*QA_REPORT_STAGING*.md; do
  echo "$(basename $file):"
  grep -c "^🔴" $file | xargs echo "  Critical:"
  grep -c "^🟠" $file | xargs echo "  High:"
  grep -c "^🟡" $file | xargs echo "  Medium:"
  grep -c "^🟢" $file | xargs echo "  Low:"
done

# ✅ PRODUCTION trends only
for file in .agent/reports/*QA_REPORT_PRODUCTION*.md; do
  echo "$(basename $file):"
  grep -c "^🔴" $file | xargs echo "  Critical:"
  grep -c "^🟠" $file | xargs echo "  High:"
  grep -c "^🟡" $file | xargs echo "  Medium:"
  grep -c "^🟢" $file | xargs echo "  Low:"
done

# ❌ WRONG: Mixing all environments
# for file in .agent/reports/*QA_REPORT*.md; do  # This includes STAGING, PRODUCTION, LOCALHOST!
```

---

## Programmatic Comparison

### Parse report structure

Extract severity counts, pages audited, and issues from markdown:

```js
import fs from 'node:fs/promises';

async function parseReport(filePath) {
  const content = await fs.readFile(filePath, 'utf-8');

  const summary = {
    file: filePath.split('/').pop(),
    timestamp: filePath.match(/(\d{4}-\d{2}-\d{2}_\d{2}-\d{2}-\d{2})/)[0],
    environment: filePath.match(/QA_REPORT_(\w+)/)[1],
    critical: (content.match(/^🔴/gm) || []).length,
    high: (content.match(/^🟠/gm) || []).length,
    medium: (content.match(/^🟡/gm) || []).length,
    low: (content.match(/^🟢/gm) || []).length,
    total: 0,
  };

  summary.total = summary.critical + summary.high + summary.medium + summary.low;

  // Extract issues by dimension
  const dimensions = [
    '🎨 DESIGN FIDELITY',
    '📝 CONTENT ACCURACY',
    '✏️ GRAMMAR & SPELLING',
    '🔍 ON-PAGE SEO',
    '⚙️ TECHNICAL SEO',
    '📱 RESPONSIVE LAYOUT',
    '🏗️ SEMANTIC HTML',
    '⚡ PAGE LOAD SPEED',
    '♿ ACCESSIBILITY',
    '🔗 LINK HEALTH',
  ];

  summary.dimensions = {};
  dimensions.forEach((dim) => {
    const regex = new RegExp(`## ${dim.split(' ')[0]} .+ \\((\\d+)`, 'i');
    const match = content.match(regex);
    summary.dimensions[dim] = match ? parseInt(match[1]) : 0;
  });

  return summary;
};

// Usage
const report1 = await parseReport('.agent/reports/2026-06-10_14-30-00-QA_REPORT_STAGING-Kavit.md');
const report2 = await parseReport('.agent/reports/2026-06-11_14-30-00-QA_REPORT_STAGING-Kavit.md');

console.log(`Before: ${report1.total} issues`);
console.log(`After:  ${report2.total} issues`);
console.log(`Change: ${report2.total - report1.total} ${report2.total < report1.total ? '✅' : '⚠️'}`);
```

### Generate a trend chart

```js
import fs from 'node:fs/promises';
import path from 'node:path';

/**
 * Generate trend report for ONE environment only
 * @param {string} environment - STAGING, PRODUCTION, LOCALHOST, DEVELOPMENT
 * @throws Error if no reports found for that environment
 */
async function generateTrendReport(environment = 'STAGING') {
  const reportsDir = '.agent/reports';
  const files = await fs.readdir(reportsDir);

  // ✅ FILTER TO SAME ENVIRONMENT ONLY
  const reports = files
    .filter((f) => f.includes(`QA_REPORT_${environment}`))
    .sort()
    .slice(-10); // Last 10 reports

  // ⚠️ Warn if mixing environments
  if (!reports.length) {
    throw new Error(`No reports found for environment: ${environment}`);
  }

  const data = [];

  for (const file of reports) {
    const summary = await parseReport(path.join(reportsDir, file));
    data.push({
      date: summary.timestamp,
      critical: summary.critical,
      high: summary.high,
      medium: summary.medium,
      low: summary.low,
      total: summary.total,
    });
  }

  // Print as ASCII table
  console.log(`\n📊 ${environment} Trend (Last 10 Audits)\n`);
  console.log('Date       | 🔴 Crit | 🟠 High | 🟡 Med | 🟢 Low | Total');
  console.log('-----------|---------|---------|--------|--------|-------');

  data.forEach((row) => {
    console.log(
      `${row.date} |    ${row.critical}    |    ${row.high}    |   ${row.medium}   |   ${row.low}   |  ${row.total}`
    );
  });

  // Calculate trend
  const first = data[0];
  const last = data[data.length - 1];
  const improvement = first.total - last.total;

  console.log(`\nTrend: ${improvement > 0 ? '✅ Improving' : '⚠️ Declining'} (${improvement > 0 ? '+' : ''}${improvement} issues)`);
}

generateTrendReport('STAGING');
```

**Output:**
```
📊 STAGING Trend (Last 10 Audits)

Date       | 🔴 Crit | 🟠 High | 🟡 Med | 🟢 Low | Total
-----------|---------|---------|--------|--------|-------
2026-06-01_09-00-00 |    3    |    5    |   8    |   4   |   20
2026-06-02_10-15-00 |    3    |    4    |   7    |   4   |   18
2026-06-03_11-30-00 |    2    |    4    |   6    |   3   |   15
2026-06-04_14-00-00 |    2    |    3    |   5    |   2   |   12
2026-06-05_16-45-00 |    1    |    2    |   4    |   2   |    9
2026-06-06_09-20-00 |    0    |    2    |   3    |   2   |    7
...

Trend: ✅ Improving (+13 issues fixed)
```

---

## Baseline Expectations

Set minimum thresholds for each environment:

### Staging Baselines

| Metric | Acceptable | Target |
|---|---|---|
| Critical issues | ≤ 5 | 0 |
| High issues | ≤ 10 | ≤ 3 |
| Total issues | ≤ 20 | ≤ 10 |
| H1 coverage | 100% | 100% |
| Canonical coverage | ≥ 95% | 100% |

**Action:** If staging exceeds baseline, block QA testing until fixed.

### Production Baselines

| Metric | Acceptable | Target |
|---|---|---|
| Critical issues | 0 | 0 |
| High issues | 0 | 0 |
| Total issues | ≤ 5 | 0 |
| H1 coverage | 100% | 100% |
| Canonical coverage | 100% | 100% |
| Robots.txt | ✅ Present | ✅ Valid |
| Sitemap | ✅ Present | ✅ Valid + indexed |

**Action:** If production exceeds baseline, rollback immediately.

---

## Issue Lifecycle Tracking

Track how long issues persist:

```js
// Find issues that appear in multiple reports
const issueHistory = {};

reports.forEach((report) => {
  // Extract issue descriptions (e.g., "Missing /robots.txt")
  const issues = report.content.match(/^🔴 .+ Issue: ([^\n]+)/gm) || [];

  issues.forEach((issue) => {
    const key = issue.toLowerCase();
    if (!issueHistory[key]) {
      issueHistory[key] = {
        first: report.timestamp,
        last: report.timestamp,
        count: 0,
      };
    }
    issueHistory[key].last = report.timestamp;
    issueHistory[key].count++;
  });
});

// Find chronic issues (appear in > 3 reports)
const chronic = Object.entries(issueHistory)
  .filter(([_, v]) => v.count > 3)
  .map(([issue, v]) => ({
    issue,
    appearances: v.count,
    firstFound: v.first,
    lastFound: v.last,
    daysOpen: daySiff(v.first, v.last),
  }));

console.log('🚨 Chronic Issues (appearing > 3 times):\n');
chronic.forEach((c) => {
  console.log(`  "${c.issue}"`);
  console.log(`    First: ${c.firstFound}, Last: ${c.lastFound} (${c.daysOpen} days open)`);
});
```

---

## Staging → Production Comparison (Pre-Launch Only)

⚠️ **This is NOT a trend comparison.** It's a one-time sanity check before launch.

Before launching from staging to production, compare the final staging report to the first production report (after deploy):

```bash
# Find most recent staging report (before launch)
STAGING=$(ls -t .agent/reports/*QA_REPORT_STAGING*.md | head -1)

# Find first production report (after launch)
PRODUCTION=$(ls -t .agent/reports/*QA_REPORT_PRODUCTION*.md | head -1)

# Show differences (not a trend — just a sanity check)
diff -u "$STAGING" "$PRODUCTION"
```

**Expected:**
- ✅ Production has no new 🔴 critical issues introduced
- ✅ Production has no "staging-only" issues (e.g., `.wip.` subdomain references)
- ⚠️ Production may have different 🟡 🟢 issues (expected — different domain, different environment)
- ⚠️ Production may have FEWER issues (e.g., staging-only test data removed)

**After this one-time check:**
- Track STAGING trends separately (staging → staging)
- Track PRODUCTION trends separately (production → production)
- Do NOT compare staging trend vs production trend

---

## Reports Index

To keep track of all audits, maintain a simple index:

```markdown
# QA Reports Index

## Staging
- [2026-06-11 14:30 — Kavit](2026-06-11_14-30-00-QA_REPORT_STAGING-Kavit.md) — 11 issues, 3 critical
- [2026-06-10 16:00 — Kavit](2026-06-10_16-00-00-QA_REPORT_STAGING-Kavit.md) — 15 issues, 2 critical
- [2026-06-09 09:15 — Alice](2026-06-09_09-15-00-QA_REPORT_STAGING-Alice.md) — 18 issues, 3 critical

## Production
- [2026-06-11 15:45 — Alice](2026-06-11_15-45-00-QA_REPORT_PRODUCTION-Alice.md) — 2 issues, 0 critical
```

---

## Scheduled Audits

Set up recurring audits to monitor health:

```bash
# Run weekly staging audit (cron)
0 9 * * MON /path/to/run-audit.sh staging

# Run daily production audit
0 6 * * * /path/to/run-audit.sh production
```

Then generate trend reports automatically.

---

## Export Comparison Report

Generate a summary comparing two reports:

```markdown
# QA Audit Comparison

**Before:** 2026-06-10_16-00-00-QA_REPORT_STAGING-Kavit.md  
**After:** 2026-06-11_14-30-00-QA_REPORT_STAGING-Kavit.md  
**Auditor:** Kavit | **Environment:** Staging

## Summary

| Metric | Before | After | Change |
|---|---|---|---|
| Total Issues | 15 | 11 | ✅ -4 |
| Critical | 2 | 1 | ✅ -1 |
| High | 5 | 4 | ✅ -1 |
| Medium | 6 | 4 | ✅ -2 |
| Low | 2 | 2 | → Same |

## Issues Fixed

- ✅ Missing canonical tags (5/8 pages now have it)
- ✅ SEO description length (3 pages now in range)

## New Issues

- ⚠️ Our Process page: 1 image missing alt text

## Verdict

**Status:** ✅ Ready for production (1 critical blocker resolved, 3 new issues are low-priority)
```

---

## Tools & Automation

**Recommended setups:**

1. **GitHub Actions** — Auto-run audits on deploy
2. **Datadog / Grafana** — Track metrics over time
3. **Slack integration** — Notify team of regressions
4. **Linear / Jira** — Create tasks for chronic issues
5. **Spreadsheet** — Manual tracking (Google Sheets, Excel)

---

## Next Steps

1. ✅ Run first staging audit
2. ✅ Document baseline expectations (in this file)
3. ✅ Schedule weekly audits
4. ✅ Set up trend tracking (spreadsheet or dashboard)
5. ✅ Create production post-launch audit
6. ✅ Compare before/after

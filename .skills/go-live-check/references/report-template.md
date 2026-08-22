# Go-Live Report Template

Replace all `[PLACEHOLDER]` values. Keep the Blockers section first — a reader should never have to scroll past passing checks to find what's stopping launch.

---

```
╔══════════════════════════════════════════════════════════════════╗
║  [PROJECT NAME] — GO-LIVE READINESS REPORT                       ║
║  Target : [targetUrl from JSON]                                  ║
║  Checked: [DD MMM YYYY]                                          ║
║  Task   : [taskReference.label from config, or omit this line]   ║
╚══════════════════════════════════════════════════════════════════╝

┌──────────────────────────────────────────────────────────────────┐
│  SUMMARY                                                          │
├──────────────────────────────────────────────────────────────────┤
│  Automated checks run  : [N]                                      │
│    ✅ Passing          : [N]                                      │
│    🔴 Failing (blocking): [N]                                     │
│    🟡 Failing (non-blocking): [N]                                 │
│    ⚪ Needs human read  : [N]  (e.g. SSL cert)                    │
│  Manual sign-off items pending: [N]  (Sections 1, 2, 5, 6, 7, 8)  │
├──────────────────────────────────────────────────────────────────┤
│  This is NOT a single go/no-go score. Automated checks cover a    │
│  narrow technical slice. Manual items are not optional — they     │
│  are the majority of what "go-live ready" means for this project. │
└──────────────────────────────────────────────────────────────────┘


══════════════════════════════════════════════════════════════════
 🚨 BLOCKERS (must fix before launch)
══════════════════════════════════════════════════════════════════

[For each check with blocking: true and pass: false]
🔴 [Checklist section] — [Checklist line]
   Result : [detail from JSON]
   Fix    : [what needs to change]

✅ No blocking automated failures found.   ← use when clean


══════════════════════════════════════════════════════════════════
 1. AUTOMATED CHECK RESULTS
══════════════════════════════════════════════════════════════════

[Group by checklist section: 0, 3, 4, 7 — one line per check]
[✅/🔴/🟡/⚪] [Checklist line]
   Result : [detail]

Legend: ✅ pass · 🔴 fail (blocking) · 🟡 fail (non-blocking) · ⚪ needs human read


══════════════════════════════════════════════════════════════════
 2. MANUAL SIGN-OFF PENDING (by checklist section)
══════════════════════════════════════════════════════════════════

### Section 1 — Content Parity Audit
[List every unchecked item verbatim from the checklist, plus any already-checked
 items with a note: "marked done in checklist — not independently re-verified"]

### Section 2 — Data Migration
[...]

### Section 5 — CRO / Design
[...]

### Section 6 — Functional QA
[...]

### Section 7 — Legal / Compliance
[Note: text-presence checks above (DOT/WUTC numbers) are NOT legal sign-off]

### Section 8 — Launch Day / Rollback Plan
[...]


══════════════════════════════════════════════════════════════════
 3. NEXT ACTIONS (prioritized)
══════════════════════════════════════════════════════════════════

1. [Highest-priority blocker or decision needed]
2. [...]
3. [...]

Full JSON output and this report saved to: .agent/reports/[filename].md
```

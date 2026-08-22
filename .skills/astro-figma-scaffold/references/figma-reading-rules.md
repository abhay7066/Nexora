# Figma Reading Rules

Three Figma tools, each for a specific purpose. Using wrong tool = wrong data or wasted calls.

---

## Tool Comparison

| Tool | Returns | When to use | When NOT to use |
|---|---|---|---|
| `get_design_context` | Colors, fonts, spacing, measurements, asset URLs, element structure | **Always** — extracting values for design tokens OR section layout | Never skip; it's authoritative for design data |
| `get_metadata` | Page/frame layer tree: node names, nodeIds, hierarchy | Getting layer structure to discover sections + their nodeIds before fetching them | Never use as substitute for `get_design_context` when you need actual values |
| `get_screenshot` | Bitmap image of page/frame | **After** `get_design_context` — visual confirmation of top-to-bottom section reading order when get_design_context output is ambiguous or truncated | Do NOT use to extract colors, fonts, spacing, measurements. Never save to project folder — URL is in-context reference only |

---

## Correct Sequence (once per page)

### ONCE — Global Tokens

1. **Call `get_design_context`** on page frame
   ```
   get_design_context({ fileKey, nodeId: page_frame_nodeId })
   ```
   → Extract colors, fonts, spacing, effects
   → Write `DESIGN.md` + `src/styles/global.css`
   → Record fileKey/nodeIds in `project-map.json`

2. **Skip entirely if `DESIGN.md` already populated** with tokens

### ONCE — Section Discovery

3. **Call `get_metadata`** on page frame
   ```
   get_metadata({ fileKey, nodeId: page_frame_nodeId })
   ```
   → Returns list of top-level child sections + their nodeIds
   → Write into `session.md` ### Pending with each nodeId

4. **Call `get_screenshot`** on page frame
   ```
   get_screenshot({ fileKey, nodeId: page_frame_nodeId })
   ```
   → Returns screenshot URL
   → **View URL in-context only — do NOT curl or download into project**
   → Visually confirm top-to-bottom section reading order matches Figma
   → If order is different, reorder sections in `session.md` pending queue

### PER SECTION (repeat until pending is empty)

5. **Call `get_design_context`** on section nodeId
   ```
   get_design_context({ fileKey, nodeId: section_nodeId })
   ```
   → Returns layout, content, asset URLs for **this section only**
   → Use tokens from `DESIGN.md` — do NOT re-derive them from response
   → Implement section, download images, update state
   → Pause and confirm before pulling next section from queue

---

## Why This Matters

- **Tokens once** — one global `get_design_context` call, never repeated. All other fetches are section-specific.
- **Metadata for structure** — don't use screenshots to discover sections; screenshots can't tell you layer names/nodeIds.
- **Screenshot for order** — if `get_design_context` output is truncated or sections overlap visually, screenshot confirms reading order without re-calling Figma.
- **No re-fetches** — once `DESIGN.md` is written, it's cached forever. Don't call Figma for tokens again.

---

## Common Mistake: Token Extraction Inside Section Loop

❌ **WRONG:**
```
for each section in pending:
  get_design_context(section_nodeId)   # Extracting full design each time!
  Re-derive colors, fonts, spacing from response
  Write markup
```

This wastes API quota and contradicts "design tokens once".

✅ **RIGHT:**
```
get_design_context(page_frame)  # Once, upfront
Write DESIGN.md with all tokens
for each section in pending:
  get_design_context(section_nodeId)  # Only this section's layout/images
  Use tokens from DESIGN.md (already extracted)
  Write markup
```

---

## Screenshot Non-Rule

**Do NOT use screenshots for:**
- Color extraction
- Font/spacing measurement
- Layer discovery
- Asset URL extraction

Bitmaps are not machine-parseable. Use `get_design_context` for all values.

**DO use screenshots for:**
- Visual confirmation that sections appear in expected order
- Sanity check on layout when response is ambiguous
- Understanding visual hierarchy when text descriptions are unclear

Example: if `get_design_context` shows sections in absolute-positioned layout, their visual reading order may not match DOM order. Get screenshot to confirm what user actually sees top-to-bottom.

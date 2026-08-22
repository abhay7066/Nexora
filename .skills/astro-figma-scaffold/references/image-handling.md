# Image Handling

Download, verify, store, and reference images correctly.

---

## Storage

All images in `public/images/`. Never hotlink Figma CDN or external URLs.

- **Figma assets:** `public/images/<page>-<desc>.<ext>` (e.g. `hero-bg.svg`, `about-team-john.jpg`)
- **Named format:** kebab-case + logical description

---

## Format Selection — SVG First, Never Download WebP

**Download in native format:**

| Image type | Format |
|---|---|
| Logos, icons, vectors, illustrations, swooshes | **SVG** |
| Photos, realistic renders, complex images | **PNG** |
| If source literally returns `.webp` (rare) | Keep as-is |

**Never convert to WebP during download.** WebP isn't always smaller than PNG. Download native format and let the build optimizer decide later.

---

## Download Process

```javascript
// Example: download from Figma export URL
const res = await fetch(figmaExportUrl);
const buf = await res.arrayBuffer();
fs.writeFileSync('public/images/logo.svg', Buffer.from(buf));
```

For SVG: try `svg` export first. If corrupted/empty, fall back to `png`.

---

## CRITICAL: Verify Format After Download

**Never trust the extension you saved.** Figma MCP returns the actual exported format — which may differ from what you expected.

Check magic bytes / file signature:

```powershell
# PowerShell
$bytes = [System.IO.File]::ReadAllBytes("path/to/file.png")
$sig = "{0:X2}{1:X2}{2:X2}{3:X2}" -f $bytes[0],$bytes[1],$bytes[2],$bytes[3]
# 89504E47 = PNG
# FFD8FF__ = JPEG
# 3C737667 = SVG (<svg)
```

```bash
# Bash
head -c 4 file.png | xxd
# Or: file file.png
```

| First bytes | Format | Action |
|---|---|---|
| `<svg` or `<?xml` | SVG | Rename to `.svg` if saved as `.png` |
| `\xFF\xD8\xFF` | JPEG | Rename to `.jpg` |
| `\x89PNG` | PNG | Keep `.png` |
| `GIF8` | GIF | Rename to `.gif` |

**If you saved SVG as `.png`, rename immediately and update all `src` references.** Browsers serve `.png` with `Content-Type: image/png`, which breaks SVG rendering.

---

## `<img>` Tag Rules

Always include `width`, `height`, `alt`, `loading="lazy"`:

```astro
<img
  src="/images/hero-bg.webp"
  alt="Hero background showing mountains"
  width="1920"
  height="1080"
  loading="lazy"
  class="w-full h-auto object-cover"
/>
```

Read dimensions directly from Figma node or image metadata. These help browsers reserve layout space, preventing CLS.

---

## Background Images

Use CSS `background-image` property, never `<img>` tag:

```astro
<section
  style={`background-image: url('/images/hero-bg.webp')`}
  class="bg-cover bg-center bg-no-repeat"
>
  <!-- content -->
</section>
```

---

## No CSS Flip Transforms

**Never apply `transform: scaleX(-1)` or `scaleY(-1)`** unless Figma design explicitly shows decorative mirror (e.g. symmetrical illustration).

Figma sometimes represents flipped instances with negative scale in `relativeTransform`. This is a Figma authoring artefact — the source asset is correct as-is.

❌ **Never:**
```astro
<img src="/images/hero-bg.webp" style="transform: scaleX(-1)" />
```

✅ **Do this:**
```astro
<img src="/images/hero-bg.webp" />
```

When `get_design_context` returns CSS with flip transforms, strip them (unless prompt says otherwise).

---

## Dedup Before Downloading

Before downloading any image:

1. **Check `project-map.json` → `figma.assets`**
   ```json
   "figma": { "assets": { "hero-bg": { "nodeId": "12:34", "localPath": "public/images/hero-bg.svg" } } }
   ```
   If entry exists with same nodeId or same basename → reuse path, skip download

2. **Check `public/images/` on disk**
   If file with same basename exists → reuse it, skip download

3. **If new:** Download, verify format, register in `project-map.json`

This prevents same image being re-downloaded when it appears in multiple sections or pages.

---

## Image Fetch Failures

If image cannot be fetched cleanly (missing URL, corrupt file, network timeout, empty response):

1. **Don't retry more than once.** Time is expensive.

2. **Use placeholder in Astro:**
   ```astro
   {/* TODO: replace with actual image — fetch failed: [reason] */}
   <div class="bg-surface w-full h-[320px] flex-center text-text-muted text-sm">
     Image placeholder
   </div>
   ```

3. **Report at end of section:**
   ```
   ⚠️  Images not fetched (replace manually):
      - public/images/hero-bg.webp  — Figma export URL returned empty file
      - public/images/about-team.webp — network timeout after 1 retry
   ```

Never block page progress waiting for a difficult image. Placeholder keeps layout intact; report tells user exactly what to replace.

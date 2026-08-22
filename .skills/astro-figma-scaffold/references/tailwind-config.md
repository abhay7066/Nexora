# Tailwind v4 Configuration

No `tailwind.config.js` file. All tokens live in `src/styles/global.css` `@theme` block.

---

## @theme Block Structure

```css
@theme {
  /* ─── Breakpoints ────────────────────────────────────────
     Standard defaults; override if user provided Q4 value
  */
  --breakpoint-sm:  640px;   /* Large phone landscape / small tablet */
  --breakpoint-md:  768px;   /* Tablet portrait (first multi-column) */
  --breakpoint-lg:  1024px;  /* Tablet landscape / small laptop */
  --breakpoint-xl:  1200px;  /* Desktop (primary layout switch) */
  --breakpoint-2xl: 1440px;  /* Wide desktop */
  --breakpoint-3xl: 1660px;  /* Ultra-wide (customizable via Q4) */

  /* Container max width (matches --breakpoint-3xl) */
  --container-max: 1660px;   /* Set to Q4 value if provided */

  /* ─── Colors from Figma ────────────────────────────────── */
  --color-brand:       #f5c518;    /* Primary brand color */
  --color-brand-dark:  #d4a916;    /* Hover state variant */
  --color-dark:        #09090b;    /* Darkest neutral */
  --color-dark-2:      #18181b;    /* Dark 2 */
  --color-dark-3:      #27272a;    /* Dark 3 */
  --color-surface:     #ffffff;    /* Background / surface */
  --color-text-main:   #111827;    /* Primary text */
  --color-text-medium: #374151;    /* Secondary text */
  --color-text-muted:  #4b5563;    /* Tertiary text (body) */
  --color-text-subtle: #6b7280;    /* Subtle text */
  --color-text-faint:  #9ca3af;    /* Faint text */
  /* Add all colors extracted from Figma */

  /* ─── Fonts from Figma ─────────────────────────────────── */
  --font-sans:    "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-display: "Inter", ui-sans-serif, system-ui, sans-serif;
  /* Replace "Inter" with actual font families from design */

  /* ─── Border Radius ────────────────────────────────────── */
  --radius-sm:   2px;      /* Tags, badges */
  --radius-md:   4px;      /* Buttons, inputs */
  --radius-lg:   8px;      /* Cards */
  --radius-xl:   24px;     /* Large cards, hero sections */
  --radius-pill: 9999px;   /* Pills, toggles */
}
```

---

## From @theme, Tailwind Generates Classes

| Token | Generated Classes |
|---|---|
| `--color-brand` | `bg-brand`, `text-brand`, `border-brand`, `from-brand` (gradient), `ring-brand` |
| `--color-surface` | `bg-surface`, `text-surface`, `border-surface` |
| `--font-sans` | `font-sans` |
| `--font-display` | `font-display` |
| `--radius-md` | `rounded-md` |
| `--breakpoint-xl` | `xl:` responsive prefix |

**Never use arbitrary values for these tokens:**
- ❌ `bg-[#f5c518]` (use `bg-brand`)
- ❌ `rounded-[4px]` (use `rounded-md`)
- ❌ `font-['Inter']` (use `font-sans` or `font-display`)

---

## @layer utilities

Semantic classes used across all pages/components:

```css
@layer utilities {
  .container-xl {
    max-width: var(--container-max, 1392px);
    margin-inline: auto;
    padding-inline: 2rem;
  }

  .section-padding {
    padding-block: 5rem;
  }

  .heading-1 {
    font-size: clamp(3rem, 6vw, 5.625rem);
    font-weight: 900;
    line-height: 0.95;
    text-transform: uppercase;
  }

  .heading-2 {
    font-size: clamp(2.5rem, 4.5vw, 4.5rem);
    font-weight: 900;
    line-height: 0.95;
    text-transform: uppercase;
  }

  .heading-3 {
    font-size: 1.875rem;
    font-weight: 900;
    text-transform: uppercase;
  }

  .body-text {
    font-size: 1.125rem;
    line-height: 1.667;
    color: var(--color-text-muted);
  }

  .label-tag {
    font-size: 0.75rem;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--color-brand);
  }

  .btn-primary {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem 1.5rem;
    background-color: var(--color-brand);
    color: #000;
    font-weight: 900;
    font-size: 0.875rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    border-radius: var(--radius-md);
    transition: background-color 0.2s;
    cursor: pointer;
  }

  .btn-primary:hover {
    background-color: var(--color-brand-dark);
  }

  .btn-outline {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem 1.5rem;
    border: 2px solid currentColor;
    font-weight: 900;
    font-size: 0.875rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    border-radius: var(--radius-md);
    transition: all 0.2s;
    cursor: pointer;
  }

  .card {
    background-color: var(--color-dark-2);
    border: 1px solid var(--color-dark-3);
    border-radius: var(--radius-md);
    overflow: hidden;
  }

  .flex-center {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .flex-between {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
```

Use these class names in all templates — never expand them inline.

---

## Google Fonts Setup

In `src/layouts/Layout.astro`, replace the placeholder fonts link with actual font families and weights from Figma:

```html
<!-- Replace with the project's actual fonts from Figma -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=FONT_NAME:wght@WEIGHTS&display=swap"
  rel="stylesheet"
/>
```

Only request weights actually used in the design. Never load full variable font range (`100..900`) unless design uses 4+ distinct weights.

Example:
```html
<link
  href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;900&display=swap"
  rel="stylesheet"
/>
```

---

## No tailwind.config.js

Tailwind v4 auto-discovers tokens from `@theme` in `global.css`. There is no `tailwind.config.js` file in this project.

If a config file is needed, it would be minimal and only for non-token settings (e.g. content paths, plugins).

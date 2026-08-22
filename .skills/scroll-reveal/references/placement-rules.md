# Placement Rules for data-reveal Attributes

When to add which attribute type.

---

## Attribute Types

| Attribute | Effect | When |
|---|---|---|
| `data-reveal` | Fade + slide up (default) | Headings, cards, feature items |
| `data-reveal="left"` | Slide in from left | Left-column text blocks, feature rows |
| `data-reveal="right"` | Slide in from right | Right-column images, media |
| `data-reveal="fade"` | Fade only, no movement | Backgrounds, overlays, subtle reveals |
| `data-reveal="scale"` | Scale + lift | Hero images, large CTA blocks |
| `data-delay="100–500"` | Stagger children | Sibling cards/list items (increment by 100ms) |

---

## Where to Apply

### Section Headings
`<h1>`, `<h2>`, `<h3>` get `data-reveal` (default, no delay)

### Supporting Text
Subheadings, lead text, taglines → `data-reveal="fade"` `data-delay="100"`

### Card Grids
Each card gets `data-reveal` with staggered `data-delay`:
```astro
<div class="card" data-reveal data-delay="100">...</div>
<div class="card" data-reveal data-delay="200">...</div>
<div class="card" data-reveal data-delay="300">...</div>
```

### Feature Rows (Text Left / Image Right)
```astro
<div data-reveal="left">Text</div>
<div data-reveal="right">Image</div>
```

### Hero Section
```astro
<h1 data-reveal>Hero heading</h1>
<p data-reveal="fade" data-delay="150">Subtitle</p>
<button data-reveal="fade" data-delay="300">CTA</button>
<img data-reveal="scale" data-delay="100" />
```

### Standalone CTAs / Banners
`data-reveal="scale"`

### What NOT to Touch
- `<html>`, `<body>`, `<header>`, `<nav>`, `<footer>` — always visible
- Full-viewport wrapper `<div>` — skip
- Elements above the fold on first paint → use `data-reveal="fade"` with no delay (prevents flash on mobile)

---

## Implementation Strategy

1. Read `src/components/` and `src/pages/` (skip `Layout.astro`)
2. For each file, identify scroll-target elements
3. Add `data-reveal` / `data-delay` attributes (surgical edits only)
4. Do NOT modify CSS, layout, classes, or content
5. Do NOT add inline styles
6. Report changes after all edits

---

## Delay Increment Pattern

For grids/lists with N items:
- Item 1: `data-delay="100"`
- Item 2: `data-delay="200"`
- Item 3: `data-delay="300"`
- ...up to ~500ms (beyond that feels unresponsive)

This staggered approach makes the reveals feel orchestrated, not simultaneous.

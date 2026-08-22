# Scroll Reveal Script Setup

## The Script Block

Add this block to `src/layouts/Layout.astro` just before `</body>` if missing. **Do NOT modify if already present.**

```astro
  <!-- Scroll reveal -->
  <script>
    const reveals = document.querySelectorAll('[data-reveal]');
    if (reveals.length) {
      if (!('IntersectionObserver' in window)) {
        reveals.forEach((el) => el.classList.add('is-visible'));
      } else {
        const io = new IntersectionObserver(
          (entries, obs) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                obs.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
        );
        reveals.forEach((el) => io.observe(el));
      }
    }
  </script>
```

---

## Important Notes

- **Inline in Layout.astro** — NOT in a separate component
- **Runs once per page load** — Astro bundles inline `<script>` as deferred modules
- **No `astro:page-load`** — this project doesn't use view transitions, so that event never fires
- **CSS already exists** — `src/styles/global.css` has `/* ─── Scroll Reveal */` block with `[data-reveal]` and `.is-visible` states
- **Respects `prefers-reduced-motion`** — CSS media query handles this; no JS override needed

---

## Fallback Behavior

If browser doesn't support IntersectionObserver (rare):
- All `[data-reveal]` elements immediately get `.is-visible` class
- Animations run instantly on page load (no stagger delay, but visible)

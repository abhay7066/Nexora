# Internationalization (i18n) Workflow

Set up multi-language support using Astro's i18n routing.

---

## Startup

Verify:
- `integrations.i18n.configured` not yet true in project-map.json
- Decide on supported languages (e.g. English, Spanish, French)

---

## Discovery

Ask:
1. **Primary language** (default content language, e.g. English)
2. **Secondary languages** (what languages to support, e.g. Spanish, French)
3. **Routing strategy:**
   - **Subpath** (recommended): `/en/`, `/es/`, `/fr/` (`/en/about/` for English)
   - **Domain**: separate domains per language (requires infrastructure setup)
4. **Translated content** — from where?
   - Manual YAML files per language in `src/i18n/translations/`
   - Per-language entries in Astro content collections
   - External translation service API

---

## Implementation

### 1. Install Astro i18n Integration

```bash
npm install @astrojs/i18n
```

### 2. Configure astro.config.mjs

```javascript
import { defineConfig } from 'astro/config';
import i18n from '@astrojs/i18n';

export default defineConfig({
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es', 'fr'],
    routing: {
      prefixDefaultLocale: true,  // /en/about/
      redirectToDefaultLocale: true
    }
  },
  integrations: [
    i18n(),
    // ... other integrations
  ]
});
```

### 3. Create Translation Files

Structure:
```
src/i18n/
├── translations/
│   ├── en.json
│   ├── es.json
│   └── fr.json
└── middleware.ts
```

Example `en.json`:
```json
{
  "nav.home": "Home",
  "nav.about": "About",
  "nav.contact": "Contact",
  "home.hero.title": "Welcome",
  "home.hero.cta": "Get Started"
}
```

Spanish `es.json`:
```json
{
  "nav.home": "Inicio",
  "nav.about": "Acerca de",
  "nav.contact": "Contacto",
  "home.hero.title": "Bienvenido",
  "home.hero.cta": "Empezar"
}
```

### 4. Update Pages

Use translations in components:

```astro
---
import { getTranslation } from 'astro-i18n';
const t = getTranslation(Astro.currentLocale);
---

<h1>{t('home.hero.title')}</h1>
<p>{t('home.hero.cta')}</p>
```

Or use `i18n.getTranslations()`:

```astro
---
const allTranslations = i18n.getTranslations();
const currentLang = Astro.currentLocale;
const t = allTranslations[currentLang];
---
```

### 5. Dynamic Routes (Blog Posts, CPTs)

If you have `/integrating-posts` or `/integrating-custom-post-types` active, update routes to include language prefix:

**Blog archive:**
```
Old: /blog/
New: /en/blog/, /es/blog/, /fr/blog/
```

**Blog post:**
```
Old: /blog/my-post/
New: /en/blog/my-post/, /es/blog/my-post/, /fr/blog/my-post/
```

**CPT (e.g. team):**
```
Old: /team/
New: /en/team/, /es/team/, /fr/team/
```

**CPT item (e.g. team member):**
```
Old: /team/john-doe/
New: /en/team/john-doe/, /es/team/john-doe/, /fr/team/john-doe/
```

Update `src/pages/blog/[slug].astro` and `src/pages/[cpt]/[slug].astro` to include locale in `getStaticPaths()`:

```astro
---
export async function getStaticPaths() {
  const locales = ['en', 'es', 'fr'];
  const posts = await getPosts();
  
  return locales.flatMap(locale =>
    posts.map(post => ({
      params: { locale, slug: post.slug },
      props: { post, locale }
    }))
  );
}
---
```

---

### 6. Language Switcher

In Header or Footer:

```astro
---
const currentLocale = Astro.currentLocale;
const currentPath = Astro.url.pathname;
const availableLocales = ['en', 'es', 'fr'];

// Build language switch URL by replacing locale in path
const buildLocaleUrl = (newLocale) => {
  const parts = currentPath.split('/').filter(Boolean);
  if (availableLocales.includes(parts[0])) {
    parts[0] = newLocale;
  } else {
    parts.unshift(newLocale);
  }
  return '/' + parts.join('/') + '/';
};
---

<nav class="language-switcher">
  {availableLocales.map(locale => (
    <a
      href={buildLocaleUrl(locale)}
      class={currentLocale === locale ? 'active' : ''}
    >
      {locale.toUpperCase()}
    </a>
  ))}
</nav>
```

### 6. Translated Links

All internal links must include language prefix:

```astro
<!-- English -->
<a href="/en/about/">About</a>

<!-- Spanish -->
<a href="/es/about/">Acerca de</a>
```

Or use helper:

```astro
---
import { localizeUrl } from 'astro-i18n';
const url = localizeUrl('/about/', 'es');  // /es/about/
---

<a href={url}>Acerca de</a>
```

---

## Content Collections Per Language

Model localized entries as a `lang` field (or per-language subfolder) in the collection schema:

```javascript
import { getCollection } from 'astro:content';

export async function getPostsByLanguage(language) {
  const posts = await getCollection('blog');
  return posts.filter((post) => post.data.lang === language);
}
```

Translate headings/content directly in the collection entries at build time.

---

## Static Translation Files vs API

**Static (simpler):**
- YAML/JSON files in `src/i18n/translations/`
- Works offline, fast build
- Manual updates

**API-driven (scalable):**
- External translation service (Phrase, Lokalise, etc.)
- Automatic sync

Choose based on content volume and update frequency.

---

## Middleware

Add `src/i18n/middleware.ts`:

```typescript
import { sequence } from 'astro:middleware';
import { i18nMiddleware } from 'astro-i18n';

export const onRequest = sequence(i18nMiddleware());
```

Handles language detection, redirects, etc.

---

## State Update

```json
{
  "integrations": {
    "i18n": {
      "configured": true,
      "defaultLocale": "en",
      "locales": ["en", "es", "fr"],
      "strategy": "subpath",
      "translationSource": "yaml-files"
    }
  }
}
```

```markdown
// session.md
- [x] Internationalization configured
      Languages: en, es, fr
      Routing: subpath (/en/, /es/, /fr/)
      Translations: YAML files
```

---

## Rules

- **All pages multi-language** — every page available in all locales
- **Language prefix required** — `/en/about/`, `/es/about/`
- **Trailing slashes** — `/en/about/` not `/en/about`
- **Middleware required** — handle language detection and redirects
- **Consistent keys** — same translation keys across all languages
- **No hardcoded text** — all user-facing text in translation files

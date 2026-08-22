# JSON-LD Schema Validation Reference

**For QA audits only.** JSON-LD (JSON for Linking Data) is structured data embedded in `<script type="application/ld+json">` tags. Search engines use it for rich snippets, knowledge panels, and enhanced search results.

**Implementation note:** Validate JSON-LD output during QA audits using the checklist and tools below.

---

## Quick Validation Checklist

- [ ] Script tag has correct type: `type="application/ld+json"`
- [ ] JSON is valid (no trailing commas, quotes matched, no unescaped characters)
- [ ] `@context` is present: `"@context": "https://schema.org"`
- [ ] `@type` matches page purpose (see types below)
- [ ] Required properties present for the chosen type
- [ ] URLs use full absolute URLs (not relative paths)
- [ ] Dates in ISO 8601 format: `YYYY-MM-DD` or `YYYY-MM-DDTHH:MM:SSZ`

---

## Recommended Schemas by Page Type

### Homepage / Main Site

**Type:** `Organization` or `LocalBusiness`

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Your Company Name",
  "url": "https://yourdomain.com",
  "logo": "https://yourdomain.com/images/logo.svg",
  "description": "Brief description of your company.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Main St, Suite 100",
    "addressLocality": "City",
    "addressRegion": "ST",
    "postalCode": "12345",
    "addressCountry": "US"
  },
  "telephone": "+1-555-123-4567",
  "email": "contact@yourdomain.com",
  "sameAs": [
    "https://www.linkedin.com/company/yourcompany/",
    "https://twitter.com/yourcompany",
    "https://www.facebook.com/yourcompany"
  ]
}
```

**For LocalBusiness (if location-based):**

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Your Company Name",
  "url": "https://yourdomain.com",
  "telephone": "+1-555-123-4567",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Main St, Suite 100",
    "addressLocality": "City",
    "addressRegion": "ST",
    "postalCode": "12345"
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "17:00"
    }
  ],
  "priceRange": "$$"
}
```

### Service Pages (`/services/`, `/services/[slug]/`)

**Type:** `Service`

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Service Name",
  "description": "Clear, concise description of the service.",
  "provider": {
    "@type": "Organization",
    "name": "Your Company Name",
    "url": "https://yourdomain.com"
  },
  "areaServed": ["State codes or regions served"],
  "availableLanguage": "en"
}
```

### Pricing Page (`/pricing/`)

**Type:** `PriceSpecification` (within `Service` or standalone)

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Your Service Name",
  "provider": {
    "@type": "Organization",
    "name": "Your Company Name"
  },
  "priceSpecification": {
    "@type": "PriceSpecification",
    "priceCurrency": "USD",
    "price": "Flat price or description",
    "description": "Your pricing model or rates"
  }
}
```

### Contact Page (`/contact/`)

**Type:** `ContactPoint` (within `Organization`)

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Your Company Name",
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "Customer Service",
    "telephone": "+1-555-123-4567",
    "email": "contact@yourdomain.com"
  }
}
```

### Blog / Insights Pages (`/blog/`, `/blog/[slug]/`, or `/articles/`, etc.)

**Type:** `BlogPosting` or `Article`

```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Article Title",
  "description": "Brief description of the article.",
  "author": {
    "@type": "Person",
    "name": "Author Name"
  },
  "datePublished": "YYYY-MM-DD",
  "dateModified": "YYYY-MM-DD",
  "articleBody": "Full article text here...",
  "image": "https://yourdomain.com/images/article.webp"
}
```

---

## Validation Tools

1. **Google Structured Data Testing Tool**  
   https://search.google.com/structured-data/testing-tool

2. **Schema.org Validator**  
   https://validator.schema.org/

3. **JSON-LD Linter**  
   https://jsonld.com/playground/

4. **Command-line validation:**
   ```bash
   curl -s https://yourdomain.com/ | grep -o '<script type="application/ld+json">[^<]*</script>' | head -1
   ```

---

## Common Issues

| Issue | Fix |
|---|---|
| JSON is invalid (trailing comma, unescaped quotes) | Validate in https://jsonlint.com/ |
| `@context` missing | Add `"@context": "https://schema.org"` as first property |
| Relative URLs (e.g., `/images/logo.svg`) | Use absolute URLs: `https://domain.com/images/logo.svg` |
| Date format wrong (e.g., `Jun 11, 2026`) | Use ISO 8601: `2026-06-11` |
| `@type` doesn't match page | Use `Organization`, `LocalBusiness`, `Service`, `BlogPosting`, etc. |
| Multiple schemas without `@graph` | Wrap in `@graph` array or use separate `<script>` tags |

---

## Severity Levels

| Level | Example |
|---|---|
| 🔴 **Critical** | JSON is invalid (breaks parsing), missing `@context` or `@type` |
| 🟠 **High** | Wrong schema type for page, required properties missing |
| 🟡 **Medium** | Optional properties missing (author, image), non-ISO date format |
| 🟢 **Low** | Extra whitespace, minor formatting inconsistencies |

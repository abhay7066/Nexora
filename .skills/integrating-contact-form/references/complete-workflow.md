# Contact Form Integration Workflow

Wire up a working contact form for a static Astro site — no backend, no CMS, no server-rendered pages.

---

## Startup

Check if already configured. If yes, ask if they want to add/modify forms.

**Prerequisites:**
- Site is scaffolded (`export const prerender = true` pages, `Layout.astro`, `global.css` tokens exist)
- Know the hosting platform (Cloudflare Pages/Workers unlocks the serverless-function pattern natively; any static host works with the third-party pattern)

---

## Discovery

Ask ALL at once:

```
To set up the contact form, please answer all of the following:

1. Submission method:
   a) Serverless function endpoint (Cloudflare Pages Function / Worker — needs Cloudflare hosting)
   b) Third-party form backend (Formspree, Web3Forms, Basin, Getform, etc. — works on any host)
2. Which pages need the form? (e.g. /contact, footer newsletter signup)
3. Fields needed? (default: name, email, message)
4. Where should submissions go? (destination email address, or third-party service dashboard)
5. Custom styling? (yes = fetch from Figma, no = use DESIGN.md tokens/defaults)
```

---

## Implementation

### Create `src/components/ContactForm.astro`

Thin wrapper — always used instead of a raw `<form>` on a page:

```astro
---
import FormRenderer from './contact-form/FormRenderer.astro';

export interface Props {
  title?: string;
  fields?: Array<{ name: string; type: string; label: string; required?: boolean }>;
}
const { title, fields } = Astro.props;
---

<section class="contact-form">
  {title && <h2 class="heading-2">{title}</h2>}
  <FormRenderer fields={fields} />
</section>
```

### Boilerplate components (create once, reuse across forms)

- `src/components/contact-form/FormRenderer.astro` — renders the `<form>`, wires the submit handler
- `src/components/contact-form/FormField.astro` — individual field (input, textarea, select, etc.)
- `src/components/contact-form/FormStatus.astro` — success/error/pending messages

Do not hand-write form markup outside these components — keeps every form on the site consistent (styling, validation, Turnstile hookup).

---

## Option A — Serverless Function Endpoint (Cloudflare)

### 1. Create the function

Cloudflare Pages Functions (file-based routing under `functions/`):

```ts
// functions/api/contact.ts
interface Env {
  CONTACT_TO_EMAIL: string;
  // add TURNSTILE_SECRET_KEY here if Turnstile is enabled — see cloudflare-turnstile.md
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;
  const data = await request.formData();

  const name = data.get('name')?.toString().trim();
  const email = data.get('email')?.toString().trim();
  const message = data.get('message')?.toString().trim();

  if (!name || !email || !message) {
    return new Response(JSON.stringify({ ok: false, error: 'Missing required fields.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Send email — use Cloudflare Email Service (Email Sending API) or any transactional
  // email provider's REST API here. Never send from the browser; secrets stay server-side.

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
```

If deploying to a Cloudflare Worker instead of Pages, use the equivalent `fetch()` handler with the same validation/response shape.

### 2. Point the form at the function

In `FormRenderer.astro`'s client-side submit handler, POST to `/api/contact` (same-origin, no CORS needed) and read the JSON response to drive `FormStatus`.

### 3. Configure environment variables

Set `CONTACT_TO_EMAIL` (and any email-provider API key) in the Cloudflare Pages/Workers dashboard as **encrypted environment variables** — never commit them, never prefix with `PUBLIC_`.

---

## Option B — Third-Party Form Backend

### 1. Sign up and get an endpoint/form ID

E.g. Formspree (`https://formspree.io/f/xxxxxxx`), Web3Forms (access key), Basin, Getform — each gives a POST endpoint or a hidden field with a form ID.

### 2. Point the form at the service

In `FormRenderer.astro`, either:

- Submit natively: `<form action="https://formspree.io/f/xxxxxxx" method="POST">` (works with JS disabled, but full-page redirect on submit unless the service supports AJAX/fetch mode), or
- Submit via `fetch()` client-side to the service's endpoint and show `FormStatus` inline (check the service's docs for its AJAX/JSON submission format — most accept `Accept: application/json`).

### 3. Spam protection

Most third-party services include their own spam filtering (honeypot fields, hidden timestamp checks). If the service supports Cloudflare Turnstile natively (check its docs), wire the site key directly per its instructions. Otherwise use the opt-in Turnstile enhancement in `cloudflare-turnstile.md`, which requires your own verification step — meaning Option A (serverless function) is the better fit if Turnstile is a hard requirement and the chosen service can't verify it for you.

---

## Usage

In any page:

```astro
---
import ContactForm from '../components/ContactForm.astro';
---

<ContactForm title="Get In Touch" />
```

---

## State Update

```json
// .agent/project-map.json
{
  "integrations": {
    "contactForm": {
      "configured": true,
      "method": "serverless-function",
      "endpoint": "/api/contact",
      "pages": ["/contact/"]
    }
  }
}
```

```markdown
// .agent/session.md
- [x] Contact form configured
      Method: serverless function (functions/api/contact.ts)
      Pages: /contact/
      Turnstile: not enabled
```

---

## Rules

- **Never invent a CMS or plugin-based form endpoint** — this project has no backend server of any kind
- **Always render through `ContactForm` / `FormRenderer`** — never a bare `<form>` in a page
- **Validate server-side too** — the function (Option A) or the third-party service (Option B) must reject incomplete/malformed submissions; client-side `required` attributes are UX only
- **Secrets stay server-side** — email API keys, Turnstile secret keys: environment variables on the function/host, never in client bundles or `PUBLIC_` vars
- **Render at build time, submit at request time** — the page and form markup are static; only the submit POST is dynamic

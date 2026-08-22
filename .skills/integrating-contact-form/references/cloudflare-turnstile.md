# Cloudflare Turnstile — Optional Contact Form Enhancement

Add Cloudflare Turnstile spam protection to the contact form rendered by `<ContactForm>`.

This is an **opt-in** enhancement to `/integrating-contact-form`. It does NOT run automatically. Follow the steps below only if you want to enable Turnstile on the project.

---

## What this does

Cloudflare Turnstile is a privacy-friendly CAPTCHA replacement. When enabled, the form displays a "Verify you are human" widget before submission. The token it produces must be verified **server-side** — this skill wires the public site key into the frontend and the verification call into your own backend (Option A: serverless function) or your form service's built-in Turnstile support (Option B, if available — check the service's docs).

If `TURNSTILE_SITE_KEY` is **unset or empty**, Turnstile is silently disabled and the form renders as normal.

---

## Prerequisites

- `/integrating-contact-form` has been run (form components exist)
- You have a Cloudflare account with a Turnstile widget configured
  - Get one at: <https://www.cloudflare.com/products/turnstile/>
  - Copy the **Site Key** (32-character public string) — NOT the Secret Key

---

## Setup

### 1. Add the env var

In `.env` (and in your hosting platform's env vars for production):

```bash
TURNSTILE_SITE_KEY=0x4AAAAAAAxxxxxxxxxxxxxxxxxxxx
```

`TURNSTILE_SITE_KEY` is **deliberately not prefixed with `PUBLIC_`**. It's read at build time by `import.meta.env.TURNSTILE_SITE_KEY` in `FormRenderer.astro` and embedded into a `data-sitekey` attribute on the widget div. It is not used by any client-side JS beyond that attribute, so the no-prefix convention matches the reference implementation.

### 2. Add the Turnstile script to `src/layouts/Layout.astro`

Cloudflare's widget script must be loaded once globally so the `cf-turnstile` div can render. Add this to `<head>`, just before `</head>` or near the other `<script>` tags:

```astro
<!-- Cloudflare Turnstile -->
<script is:inline src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
```

`is:inline` is required so Astro does not try to bundle the external script. The `async defer` attributes are safe because the widget div only needs the script to render, not to parse page content.

### 3. Add the widget div to `src/components/contact-form/FormRenderer.astro`

Inside the `<form>`, after the `<FormStatus>` element and before the submit button, add:

```astro
{import.meta.env.TURNSTILE_SITE_KEY && (
  <div
    class="cf-turnstile"
    data-sitekey={import.meta.env.TURNSTILE_SITE_KEY}
    data-response-field-name="cf_turnstile_response"
  ></div>
)}
```

The conditional means the form renders without the widget if the env var is missing. Name the hidden response field whatever your backend expects to read — `cf_turnstile_response` here, matched by the verification step below.

### 4. (Optional) Guard submission when the token is empty

In the form's submit handler, before sending the request:

```ts
const turnstileInput = form.querySelector<HTMLInputElement>('input[name="cf_turnstile_response"]');
if (turnstileInput && !turnstileInput.value) {
  statusEl.classList.add('form-status--error');
  statusEl.innerHTML = '<p>Please complete the security check before submitting.</p>';
  submitBtn.disabled = false;
  return;
}
```

On a failed or error response, reset the widget so the user can try again:

```ts
try { (window as any).turnstile?.reset(); } catch {}
```

### 5. Verify the token server-side

The **Secret Key** (different from the Site Key) must never reach the browser. Where it's configured depends on which submission pattern `/integrating-contact-form` used:

**Option A — serverless function (recommended for Turnstile):**

Set `TURNSTILE_SECRET_KEY` as an encrypted environment variable on the Cloudflare Pages/Workers function, then verify inside the handler before doing anything else with the submission:

```ts
// functions/api/contact.ts
const token = data.get('cf_turnstile_response')?.toString();

const verifyRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    secret: env.TURNSTILE_SECRET_KEY,
    response: token,
    remoteip: request.headers.get('CF-Connecting-IP'),
  }),
});
const verifyResult = await verifyRes.json();

if (!verifyResult.success) {
  return new Response(JSON.stringify({ ok: false, error: 'Verification failed.' }), {
    status: 400,
    headers: { 'Content-Type': 'application/json' },
  });
}
```

**Option B — third-party form backend:**

Only works if the service has native Turnstile support (check its docs — some accept the site key/response field directly and verify it for you). If it doesn't, either switch to Option A for this form, or drop Turnstile and rely on the service's own spam filtering.

### 6. Add allowed hostnames to your Turnstile widget

In the Cloudflare Turnstile dashboard, add every domain that will serve the widget to the widget's **Allowed Hostnames** list:

- `localhost` (for development)
- your staging domain
- your production domain

Without this, the widget renders with an error and the form cannot be submitted.

---

## Verify

1. `npm run build` — must pass with no errors.
2. `npm run dev` and load any page with `<ContactForm>`.
3. The Turnstile widget should render below the form fields, above the submit button.
4. Submit the form with the widget empty — should be rejected with "Please complete the security check" (client-side) or a 400 response (server-side, if the client-side guard is skipped).
5. Submit the form with the widget completed — should succeed once `functions/api/contact.ts` (or the third-party service) verifies the token.

---

## Disable

To turn Turnstile off, blank out `TURNSTILE_SITE_KEY` in `.env` and restart the dev server / redeploy. The conditional in `FormRenderer.astro` hides the widget div, and submissions pass through without a Turnstile token. If Option A's function still checks for a token, remove or bypass that check too so submissions aren't rejected.

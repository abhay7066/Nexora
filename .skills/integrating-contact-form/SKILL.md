# Agent Skill
# File: .skills/integrating-contact-form/SKILL.md
# Usage: /integrating-contact-form

Wire up a working contact form for a static Astro site (no backend server, no CMS).

Runs AFTER the site is scaffolded (`/astro-figma-scaffold` or `/scrape-to-astro`). The site is `output: 'static'` — form submission needs somewhere to go, since there's no server-rendered endpoint on the page itself.

---

## STARTUP

Check if configured. Verify prerequisites:
- A contact form section exists in the design or was requested
- Hosting platform is known (affects which submission pattern is available)

If already configured, ask if they want to add more forms, change fields, or switch submission method.

---

## TWO SUBMISSION PATTERNS

Static sites have no server to receive a POST, so pick one:

1. **Serverless function endpoint** (recommended if hosting on Cloudflare Pages/Workers) — a small function receives the POST, verifies Turnstile server-side, and sends the email. Full control, no third-party data sharing.
2. **Third-party form backend** (Formspree, Web3Forms, Basin, Getform, etc.) — the form posts directly to the service's endpoint; no function code to write or deploy. Fastest to set up; email delivery and spam filtering are handled by the service.

See `references/complete-workflow.md` for discovery questions and implementation of both.

---

## WORKFLOW

See `references/complete-workflow.md` for:

1. **Discovery** — which submission pattern, which fields, which pages need the form, styling source
2. **Create `ContactForm.astro`** — form markup + client-side submit handler
3. **Implement the chosen backend** — Cloudflare Pages Function/Worker, or third-party service config
4. **State update** — `.agent/project-map.json`, `.agent/session.md`

---

## RULES

- **Never fetch or POST to a CMS backend endpoint** — this project has no backend server or CMS of any kind
- **Always use the `ContactForm` component** — never hand-roll a raw `<form>` on a page
- **Validate on both ends** — HTML5 `required`/`type` attributes AND server-side (function or third-party service) validation; never trust the client alone
- **Never expose secrets to the browser** — API keys/secret keys are function environment variables or service dashboard config, never `PUBLIC_`-prefixed or inlined in client JS
- **Build-time static, submit-time dynamic** — the form markup is prerendered like everything else; only the submit request is dynamic

---

## OPTIONAL ENHANCEMENTS

These are opt-in and do NOT run as part of this skill. Apply them only when explicitly requested.

### Cloudflare Turnstile spam protection

See `references/cloudflare-turnstile.md` for opt-in setup.

Summary:
- Add `TURNSTILE_SITE_KEY` to `.env` (and hosting env vars)
- Add the Turnstile `<script>` tag to `src/layouts/Layout.astro` `<head>`
- Add the `<div class="cf-turnstile">` block to the form component
- Verify the token server-side (in the Pages Function/Worker, or via the third-party service's built-in Turnstile support if it has one)
- Add allowed hostnames to the Turnstile widget in the Cloudflare dashboard

Leaving `TURNSTILE_SITE_KEY` blank disables Turnstile on the form.

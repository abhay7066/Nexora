# Post-Scaffold Integration Check

Run after scaffolding completes, or after adding/updating an existing project page that contains a form section.

---

## Detection: Scan for Integration Signals

| Signal | Skill to suggest |
|---|---|
| Contact form, inquiry form, or form section in Figma | `/integrating-contact-form` |
| User mentioned "form", "contact", "get in touch", "email" | `/integrating-contact-form` |

Scan:
1. The Figma design context already fetched
2. The user's original prompt or discovery answers

---

## Confirmation Prompt

If a form is detected, ask confirmation before running:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
I noticed a contact form on the page.

Would you like me to run the integrating-contact-form skill now to wire up submission?
  yes — run it now
  no  — skip for now (you can run it manually later)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

Wait for confirmation before invoking.

---

## On Confirmation (yes)

Read the skill's SKILL.md in full and execute it:

```
Read `.skills/integrating-contact-form/SKILL.md` in full
Execute all steps in that skill
```

That skill's startup protocol (prerequisite check + discovery questions) takes over. Do NOT pre-answer its questions — let it ask fresh.

---

## On Skip (no)

Note in `session.md` under `### Skipped`:

```markdown
### Skipped
- [ ] integrating-contact-form — form detected, user deferred
```

User can run it manually later.

---

## Skip Prevention

When asking, check `session.md` first:

```markdown
### Skipped
- [ ] integrating-contact-form — user deferred
```

**If already in Skipped section:** Don't ask again. Note: "Contact form integration previously skipped. Run `/integrating-contact-form` manually if you change your mind."

This prevents re-asking an integration the user already declined.

---

## After Integration Skill Completes

Proceed to build check → see `build-and-handoff.md`.

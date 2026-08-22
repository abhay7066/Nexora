# Startup Checks

## Figma MCP Validation

Before any Figma fetch, check if Figma MCP is available:

```
Q: Is Figma MCP connected?
→ Yes: proceed to Figma calls
→ No: STOP and tell user:
   "The Figma MCP is required to scaffold this design. 
    Please connect the Figma MCP and try again — 
    do not use the Figma REST API."
```

Only after confirmation that MCP is available should you proceed with `get_design_context`, `get_metadata`, or `get_screenshot` calls.

---

## Environment Validation

Before running `npm install`:

1. **Check `.env` exists** — if not, copy from `.env.example`
2. **Check `package.json` exists** — boilerplate should have it
3. **Check Node/npm available** — required for `npm install`

If any are missing, stop and inform the user before proceeding.

---

## File System Checks

Verify project structure:

- `src/` directory exists
- `public/` directory exists
- `astro.config.mjs` exists
- `tsconfig.json` exists

These should all exist in the boilerplate. If missing, the project is incomplete.

---

## Session State Checks

After choosing Phase, always read silently:

1. `.agent/project-map.json` — if exists, skip to "Existing Project" flow
2. `.agent/session.md` — if exists, use for state resumption
3. `DESIGN.md` — if exists with populated tokens, skip Figma token extraction

See transition rules in state persistence section of AGENTS.md.

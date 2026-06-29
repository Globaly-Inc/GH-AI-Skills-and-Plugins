---
name: gh-implementation-plan
description: >
  Implementation Plan gate — runs AFTER gh-architecture-docs is approved and BEFORE
  gh-full-dev-implementation starts. Converts an approved spec into a developer-reviewed,
  step-by-step implementation plan covering all layers (DB, backend, frontend, tests).
  Blocks any code from being written until the plan is explicitly approved.
  Trigger phrases: "write implementation plan", "plan this", "implementation plan",
  "plan before coding", "let's plan", "break this down".
---

# Implementation Plan Gate

Convert an approved architecture spec into a concrete, layer-by-layer implementation
plan that a developer reviews and signs off on before any code is written.

**This skill is a hard gate.** No file is created, no migration is run, no component
is scaffolded until the user types **"approved"**, **"proceed"**, or **"go"**.

---

## Position in the GlobalyHub pipeline

```
gh-brainstorming
      ↓
gh-product-deep-research  (optional)
      ↓
gh-prd-generator
      ↓
gh-architecture-docs      ← produces the spec + SQL skeleton
      ↓
gh-design-direction       ← produces Figma / UI direction
      ↓
► gh-implementation-plan  ← YOU ARE HERE (plan gate)
      ↓
gh-full-dev-implementation ← code is written here
```

---

## Step 0 — Context Loading (silent, always first)

Load all inputs before producing a single line of the plan:

1. **Spec file** — read `docs/superpowers/specs/YYYY-MM-DD-<slug>-design.md` (from
   `gh-architecture-docs` output). This is the source of truth for scope.
2. **PRD** — read `docs/prd/main.md` and any relevant module file. Confirm the spec
   aligns; flag contradictions before proceeding.
3. **Design direction** — read `docs/superpowers/design/<slug>-design-direction.md`
   or ask for the Figma link if not found.
4. **Live schema** — query Supabase MCP (`list_tables`) to confirm which tables,
   columns, and RLS policies already exist. Never plan a migration for something
   that already exists.
5. **Codebase scan** — grep for related hooks, components, and query keys so the
   plan reuses what's already there rather than re-inventing it.

> If any of spec, PRD, or design direction is missing, stop and say:
> "Missing: [X]. Run [gh-architecture-docs / gh-prd-generator / gh-design-direction]
> first, then return here."

---

## Scope Classification (auto, silent)

| Signal | Track |
|--------|-------|
| New DB table or column | DB track required |
| New or changed RLS policy | RLS track required |
| New Edge Function or RPC | Backend track required |
| New page / route | Frontend track required |
| New form | Form track required |
| Bug fix only | Minimal track — root-cause step added |
| Enhancement to existing feature | Delta track — diff existing code first |

Multiple signals = multiple tracks, all listed in the plan.

---

## Plan Structure

Produce the plan in this exact order. Omit a section only if its track is not triggered.

---

### Section 1 — Summary

```
Feature: <name from spec>
Date: YYYY-MM-DD
App: <app>
Spec: docs/superpowers/specs/<slug>-design.md
Mode: NEW FEATURE | BUG FIX | ENHANCEMENT | UPDATE

In scope:
- <bullet per deliverable, copied from spec>

Out of scope (explicit):
- <bullet per exclusion>
```

---

### Section 2 — File Map

List **every** file that will be created or modified. No surprises during implementation.

```
CREATE
  src/hooks/use<FeatureName>.ts         — TanStack Query hook for <entity>
  src/pages/<portal>/<PageName>.tsx     — Page component
  src/types/<feature>.ts                — Zod schema + inferred TS type
  supabase/migrations/<timestamp>_<slug>.sql — DB migration

MODIFY
  src/App.tsx                           — add lazy route entry
  src/components/<existing>.tsx         — extend with <prop / section>
  docs/DATABASE.md                      — document new table

CONFIRM BEFORE CREATING (paths tentative — developer must approve)
  <any file where the path is uncertain>
```

For bug fixes / enhancements: diff the existing file first and list only the lines /
functions that will change, not the entire file.

---

### Section 3 — DB Track

*(Omit if no DB changes.)*

**Order is fixed — do not reorder:**

1. Write migration SQL (extend the skeleton from `gh-architecture-docs` if present).
2. Enable RLS on every new table — non-negotiable hard gate.
3. Write RLS policies aligned with existing policy patterns in `docs/DATABASE.md`.
4. Add indexes for every column used in a `WHERE` or `JOIN` in the planned queries.
5. Test migration against staging Supabase before touching application code.
6. Update `docs/DATABASE.md` with new table / column documentation.

```
DB steps:
[ ] supabase/migrations/<timestamp>_<slug>.sql — create/alter tables
[ ] Enable RLS: ALTER TABLE <x> ENABLE ROW LEVEL SECURITY;
[ ] Policy: SELECT — <rule>
[ ] Policy: INSERT — <rule>
[ ] Policy: UPDATE — <rule> (if applicable)
[ ] Policy: DELETE — <rule> (if applicable)
[ ] Index: <column> on <table> (for <query pattern>)
[ ] Validate migration on staging
[ ] Update docs/DATABASE.md
```

---

### Section 4 — Backend Track

*(Omit if no RPC / Edge Function.)*

Prefer: direct client query → RPC → Edge Function (escalate only if lower rung can't do it).
State which rung was chosen and why.

```
Backend steps:
[ ] <RPC name> in supabase/functions/<name>/index.ts — <one-line purpose>
    - Input: <params>
    - Output: <shape>
    - Auth check: <how>
    - Error path: <what to return on failure>
[ ] Circuit breaker / timeout if 3rd-party API involved
[ ] Async job entry (if email / webhook involved)
[ ] Integration test: npx supabase functions serve + curl smoke test
```

---

### Section 5 — Frontend Track

*(Omit if backend-only.)*

Follow the `gh-architecture-docs` portal assignment and naming conventions exactly.

```
Frontend steps:

Hook (src/hooks/use<FeatureName>.ts):
[ ] Define query key constant (follow existing queryKey naming in codebase)
[ ] useQuery for reads — map Supabase response to typed shape
[ ] useMutation for writes — include onMutate optimistic update if UX requires it
[ ] Invalidate by key family on mutation success

Types (src/types/<feature>.ts or co-located):
[ ] Zod schema — schema-first, infer TS type from it
[ ] No `any`, no `as` casts

Page (src/pages/<portal>/<PageName>.tsx):
[ ] Lazy import added to App.tsx via lazyWithRetry
[ ] Route path: <path>
[ ] Wire React Hook Form → Zod schema → useMutation hook
[ ] Loading / error / empty states handled

UI components:
[ ] Reuse existing shadcn/ui primitives — list which ones
[ ] If a new component is needed: confirm path before creating
    > "I plan to create src/components/<Name>.tsx. Proceed?"

Design reference:
[ ] Figma link or design-direction doc: <link or path>
[ ] Follow GlobalyHub brand tokens (brand doc: gh-design-direction/brand-*.md)
```

---

### Section 6 — Test Plan

Tracer-bullet first — one failing test before any implementation code.

```
Tests:
[ ] Tracer bullet: <smallest test that fails if core logic breaks>
    File: src/__tests__/<feature>.test.ts
    Tool: vitest + @testing-library/react
[ ] Cycle tests (one per non-trivial behavior — written before implementation):
    - <behavior 1>
    - <behavior 2>
[ ] Full suite check every 5 cycles: npx vitest run
[ ] Quality gates before done:
    - npx tsc --noEmit              — zero type errors
    - secret scan grep              — no hardcoded secrets
    - RLS gate                      — every new table has policies
```

Trivial one-liners (format helpers, constants, style props) need no test. YAGNI applies.

---

### Section 7 — Risk & Rollback

```
Risks:
- <risk 1> → mitigation: <how>
- <risk 2> → mitigation: <how>

Rollback plan:
- DB: supabase db reset OR reverse migration script
- Edge Function: redeploy previous version tag
- Frontend: revert lazy route entry in App.tsx; component is unreachable without route
```

---

### Section 8 — Open Questions

List anything unresolved that would block a developer from starting. Each item needs
an answer before implementation begins. If there are none, write "None — ready to proceed."

```
[ ] <question 1> — owner: <dev / designer / product>
[ ] <question 2>
```

---

## Approval Gate

End the plan with:

```
Plan saved → docs/superpowers/plans/YYYY-MM-DD-<slug>-impl-plan.md

Open questions above must be resolved before implementation starts.

Type **"approved"** to hand off to gh-full-dev-implementation, or tell me what to change.
```

Save the plan to `docs/superpowers/plans/YYYY-MM-DD-<slug>-impl-plan.md`.

**Do NOT invoke `gh-full-dev-implementation`, write any code, run any migration, or
create any file listed in the File Map until "approved" is received.**

If the user asks to skip:
> "The plan isn't approved yet. Approving ensures the developer knows exactly what
> will be built before a single line is written. Type 'approved' to proceed, or
> tell me what to change."

---

## Mode-specific rules

### New Feature
- All tracks required that have signals.
- File Map must be complete — no "TBD" paths at approval time.

### Bug Fix
- Root-cause step is mandatory: grep every caller of the affected function before
  planning the fix. A symptom fix that leaves sibling callers broken is not done.
- Minimal track: only list files that actually change.
- One regression test covering the fixed path is required in the Test Plan.

### Enhancement / Update to existing feature
- Delta track: read the existing implementation first. List only what changes, not
  what stays the same.
- Note any existing tests that will need updating — do not delete tests to make
  them pass.

---

## Globaly hard rules (inherited, non-negotiable)

- **RLS on every new table.** No exceptions. A table without RLS is a data breach.
- **TypeScript strict mode.** No `any`, no `as` casts without explanatory comment.
- **Secrets gate.** Any `.env` write requires explicit user confirmation first.
- **Ask before creating.** Every new file path is confirmed with the user before writing.
- **Ponytail ladder.** Run it before each implementation step: YAGNI → existing code
  → stdlib → installed dep → one-liner → minimum code. Mark ceilings with `// ponytail:`.
- **Fix the root cause, not the symptom.** Grep all callers before touching shared code.

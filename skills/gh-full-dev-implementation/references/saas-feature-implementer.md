# Reference: SaaS Feature Implementer

Used by `gh-full-dev-implementation` for end-to-end feature delivery in GlobalyApp.
Orchestrates every layer in the correct sequence so nothing is left incomplete.

---

## When to use this sequence

Use this full sequence when the feature touches **more than one layer** (database + UI,
or API + Edge Function). For a UI-only change, use `feature-builder.md` directly.

---

## Canonical sequence

Work through layers strictly in this order. Each step has a hard gate before proceeding
to the next. Never skip a step and "come back later" — incomplete layers cause type drift
and missed RLS.

```
Step 1 — Migration
Step 2 — Types regeneration
Step 3 — RLS policies
Step 4 — Edge Function (if needed)
Step 5 — React hooks
Step 6 — React components
Step 7 — React page + routing
Step 8 — Navigation
Step 9 — Tests
Step 10 — Documentation + changelog
```

---

## Step 1 — Migration

See `migration-workflow.md` for full rules.

- Write the migration SQL (schema, indexes, column comments).
- Name it descriptively: `YYYYMMDD000001_<feature-slug>.sql`.
- Run locally: `npx supabase db reset`.
- Write the rollback script.
- Gate: `npx supabase db reset` must complete without errors.

---

## Step 2 — Types regeneration

After migration applies:

```bash
npx supabase gen types typescript --local > src/integrations/supabase/types.ts
```

Commit `types.ts` alongside the migration in the same commit. Never let types drift from
the schema — a stale `types.ts` causes silent `any` at every query site.

Gate: `npx tsc --noEmit` must pass after type regeneration.

---

## Step 3 — RLS policies

See `rls-auditor.md` for full checklist.

- Write policies for every CRUD operation the feature needs.
- Use `auth.uid()` binding for user-owned rows.
- Use business membership sub-select for business-owned rows.
- Gate: run the RLS audit checklist against the new table before moving to Step 4.

---

## Step 4 — Edge Function (only if needed)

See `edge-function.md` for full rules.

Triggers for creating an Edge Function (not a client-side Supabase query):
- Operation requires service-role (e.g. sending email, charging a payment, backfill)
- Business logic must not be exposed to the client
- External API call (OpenAI, Stripe, Google Maps, etc.)
- Webhook receiver

If none of these apply, query Supabase directly from the hook (Step 5).

Gate: function deploys locally with `npx supabase functions serve <name> --env-file .env`.

---

## Step 5 — React hooks (`src/hooks/use<Feature>.ts`)

See `feature-builder.md` → Hook pattern.

- One hook file per feature domain.
- Query keys as constants at the top.
- Never call Supabase directly from a component — always via a hook.
- Gate: hook file passes `npx tsc --noEmit` with zero errors.

---

## Step 6 — React components (`src/components/<domain>/`)

- One component per UI concern (list, card, form, modal).
- Use existing shadcn/ui primitives — never install new UI libraries.
- Props typed explicitly (no `any`, no untyped `{}`).
- Gate: component passes `npx tsc --noEmit` and renders without console errors in local dev.

---

## Step 7 — React page + routing (`src/pages/`)

- Page component assembles hooks + components.
- Page does NOT contain Supabase calls — only uses hooks.
- Register the route in `src/App.tsx` or the relevant portal router.
- Wrap in `<ProtectedRoute>` if auth is required.
- Gate: page renders at its route in local dev (`npm run dev`).

---

## Step 8 — Navigation

- Add nav link only if the feature has a dedicated page the user navigates to.
- Match style of adjacent nav items — do not introduce new nav patterns.
- Gate: link appears and routes correctly in local dev.

---

## Step 9 — Tests

Follow the TDD loop from the main skill. At minimum:

| Layer | Test type | Tool |
|-------|-----------|------|
| Hook (query) | Mock Supabase, assert data shape | vitest + vi.mock |
| Hook (mutation) | Assert mutationFn called with correct args | vitest |
| Component | Renders expected output given hook data | @testing-library/react |
| Edge Function | Unit tests for validation and auth branches | deno test |
| RLS | Integration test via `supabase db reset` + SQL assertions | psql / Supabase test helpers |

Gate: `npx vitest run` must be fully green before Step 10.

---

## Step 10 — Documentation + changelog

**JSDoc** — one-line on every new public hook/component:
```ts
/** Lists open job applications for the authenticated student. */
export function useStudentApplications() { … }
```

**README** — append to `## Recent additions` in the nearest `README.md`:
```markdown
### `<FeatureName>` (added YYYY-MM-DD)
<One sentence: what it does and which portals it affects.>
Files: `src/pages/…`, `src/hooks/…`, `supabase/migrations/…`
```

**Changelog** — if the project has a `CHANGELOG.md`, add an entry under `## Unreleased`:
```markdown
- feat: <feature name> — <one-line description> (#<ticket-or-PR>)
```

---

## Completeness check

Before opening a PR, verify every step is done:

```
[ ] Migration file committed + rollback written
[ ] types.ts regenerated and committed
[ ] RLS audit passed (rls-auditor.md checklist)
[ ] Edge Function deployed locally (if applicable)
[ ] Hook file with typed query keys
[ ] Components use only shadcn primitives
[ ] Page assembled from hooks + components (no raw Supabase calls)
[ ] Route registered + navigation updated
[ ] Tests green (npx vitest run)
[ ] JSDoc on all new public exports
[ ] README + changelog updated
[ ] npx tsc --noEmit passes
[ ] Secret scan passes
```

Any unchecked box = the feature is not done.

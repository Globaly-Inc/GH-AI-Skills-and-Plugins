---
name: gh-architecture-docs
description: >
  Auto-triggers after a PRD is finalized when a new feature, screen, or module is mentioned.
  Backend-focused: turns a post-PRD idea into an approved spec, implementation plan, and SQL
  migration skeleton before any code is written. Trigger phrases: "new feature", "add module",
  "build screen", "let's add", "I want to implement", "new table", "new endpoint", "next feature".
---

# Architecture Docs — Backend Design Gate

Convert a post-PRD idea into an approved backend spec before any implementation begins.
Adapted from `obra/superpowers/brainstorming`, `garrytan/gstack`, and `Genuineh/fus` backend skills.

---

## Framework Standards (React/Supabase apps)

These are the enforced patterns. Any design that deviates must justify the deviation explicitly.

### Frontend
| Layer | Standard | Rule |
|-------|----------|------|
| Data fetching | **TanStack Query** | All Supabase reads go in `useQuery`. All writes go in `useMutation`. No raw `useEffect` for data fetching. |
| Forms | **React Hook Form + Zod** | Every form backed by a Zod schema. Validation at the schema level, never ad-hoc in handlers. |
| Routing | **React Router DOM** — `BrowserRouter` + `Routes/Route` | New pages go in `src/pages/<portal>/`. Lazy-loaded via `lazyWithRetry`. Never eager-import a page. |
| State (client) | **React Context only** | No Zustand/Redux/Jotai. Global UI state goes in a `use*.tsx` context hook. Keep it narrow. |
| UI components | **shadcn/ui (Radix UI) + Tailwind** | Reuse existing components in `src/components/ui/`. Don't build new primitives when a shadcn component exists. |

### Data Hooks Pattern
Every new feature gets a dedicated `src/hooks/use<FeatureName>.ts` file:
- Supabase client called **directly inside the hook** (no service/repository layer)
- TanStack Query wraps every Supabase call
- Hook exports typed query/mutation results only — no business logic in components

### Backend (Supabase)
| Concern | Standard |
|---------|----------|
| Data access | Direct client query → RPC function → Edge Function (prefer in this order) |
| Security | **RLS required on every new table**, no exceptions |
| Business logic | Edge Functions only when a direct query or RPC can't do it |
| Auth | Supabase Auth only. Never read `auth.users` from client — route through `profiles` or a security-definer RPC |
| Money/numeric | Integer (coins/cents), never floats |
| Portals | `public`, `personal`, `business`, `admin`, `student`, `auth`, `invite` — new pages go in the correct portal folder |

---

## Hard Gate

NEVER write code, run migrations, create plans, or invoke `write-implementation-plan` until
the user has typed **"approved"**, **"proceed"**, or **"go"** at the end of this document.

If the user asks to skip or jump to implementation before approval:
> "The brainstorm isn't approved yet. Approving now ensures we don't build the wrong thing.
> Type 'approved' to proceed, or tell me what to change in the design."

---

## Step 0 — Context Loading (always run first, silently)

Before asking any questions, load the active app's context:

1. **Identify the active app** from conversation context or ask: "Which app are we building this for?"
2. **Read the app's PRD** — look for `docs/prd/main.md` and `docs/prd/modules/<relevant-module>.md`.
   The design must extend the PRD, never contradict it.
3. **Read the app's DATABASE.md** — understand existing tables, RLS policies, relationships,
   and naming conventions. Any new schema must align with these conventions.
4. **Read DEVELOPMENT_GUIDELINES.md** if present — follow existing patterns exactly.
5. **Query Supabase MCP** — run `list_tables` to get the live schema. Cross-check against DATABASE.md.
   If they diverge, surface the gap before proceeding.

> If docs don't exist yet (new app), note this and proceed with whatever context is available.

---

## Complexity Assessment (auto, silent)

Immediately classify the request. Escalate from **Lightweight** to **Full** if ANY signal is present:

| Signal | Escalates? |
|--------|-----------|
| New DB table or column | Yes |
| Changes to existing RLS policies or auth | Yes |
| New Supabase Edge Function or 3rd-party API | Yes |
| Feature touches 2+ existing modules | Yes |
| New user role or permission scope | Yes |

- **Lightweight** (no signals): 2 phases — Intent + Approach selection
- **Full** (any signal): 4 phases — Intent → DB Design → API Design → Edge Cases

---

## Phase 1 — Intent Clarification

Ask as a grouped set (all at once):

```
Before I design this, a few quick questions about what we're building:

1. What problem does this solve for the user? (1–2 sentences)
2. Who is the primary user — [list portals/user types from PRD]?
3. What does "done" look like? What can the user do that they can't do today?
4. Is there a related feature already in the app this should follow the pattern of?
```

Wait for answers. Then summarize your understanding in one sentence and confirm before moving on.

---

## Phase 2 — DB Design (Full depth only)

Ask as a grouped set:

```
DB design questions:

1. What are the core entities? (e.g. "a booking has many sessions")
2. Which existing tables does this touch? (confirm against live schema from Supabase MCP)
3. Who owns each row — a user, a business, or is it shared?
4. What consistency does this need — strong (financial, audit) or eventual (activity feeds, analytics)?
5. Any time-series, document, or analytics data that needs a different storage pattern?
```

Apply the fus/backend-database decision matrix internally:
- Transactional → PostgreSQL (existing Supabase DB)
- Caching → Redis / edge cache (flag if needed)
- Analytics aggregates → materialized views or separate table with denormalization

Surface any normalization decisions explicitly: "I'm recommending a separate `X` table rather than
a JSONB column on `Y` because [reason]."

---

## Phase 3 — API & Backend Design (Full depth only)

Ask as a grouped set:

```
API and backend design questions:

1. Will this be a direct Supabase client query, an RPC function, or an Edge Function?
   (Rule: prefer direct queries → RPC → Edge Function, in that order of complexity)
2. Are there any async operations — emails, webhooks, background jobs?
3. Does this need rate limiting, retries, or circuit-breaker protection?
4. Which existing RLS policies apply? Do we need new ones?
5. Any 3rd-party integrations involved?
```

Apply fus/backend-principles internally:
- Default to async for all I/O
- Single responsibility per Edge Function
- Match consistency model to use case (strong for money/auth, eventual for feeds)
- New 3rd-party = circuit breaker + timeout required

For features with a frontend layer, also document:
- Which portal the new page/screen belongs to (`public/`, `personal/`, `business/`, `admin/`, `student/`)
- Hook file name: `src/hooks/use<FeatureName>.ts`
- TanStack Query keys to use (follow existing `queryKey` naming in the codebase)
- Zod schema location if new form is involved: `src/types/` or co-located with the hook
- Route path and lazy import entry in `App.tsx`

---

## Phase 4 — Edge Cases & Cross-Module Impact (Full depth only)

Ask as a grouped set:

```
Edge cases and risk questions:

1. What happens if this fails halfway through? Is it recoverable?
2. Does this feature affect any other modules? (check against loaded PRD modules)
3. Are there any data migration concerns for existing rows?
4. What's the rollback plan if we need to revert after shipping?
5. Any compliance, privacy, or audit logging requirements?
```

If cross-module impact is detected: propose decomposition.
> "This touches both [Module A] and [Module B]. I recommend splitting into two sub-features,
> each with its own brainstorm → plan cycle. Want me to scope them separately?"

---

## Approach Proposal

After all phases, propose **2–3 implementation approaches** with clear tradeoffs:

```
Approach A — [Name]: [1-sentence description]
  + [advantage]
  - [tradeoff]
  Complexity: Low / Medium / High

Approach B — [Name]: ...

Recommended: Approach [X] because [reason tied to PRD goals and existing patterns].
```

---

## Output — Design Summary

Once the user selects an approach, produce three artifacts:

### 1. Spec File
Save to: `docs/superpowers/specs/YYYY-MM-DD-<feature-slug>-design.md`

```markdown
# Feature: <Name>
Date: YYYY-MM-DD
App: <app name>
Status: PENDING APPROVAL

## Goal
<1 sentence>

## Who it's for
<user type from PRD>

## Backend Flow
<numbered steps, ≤7>

## Data Design
- New tables: <list or "none">
- Modified tables: <list or "none">
- RLS policies needed: <list>
- Edge Functions: <list or "none">
- 3rd-party dependencies: <list or "none">

## Out of Scope
<explicit exclusions>

## Risks & Open Questions
<list>
```

### 2. Implementation Plan Skeleton
Save to: `docs/superpowers/plans/YYYY-MM-DD-<feature-slug>.md`

```markdown
# Plan: <Name>

## Tasks

### Backend
- [ ] Write migration: create/alter tables
- [ ] Write RLS policies
- [ ] Write RPC / Edge Function logic
- [ ] Wire up async jobs (if any)
- [ ] Integration test against staging Supabase

### Frontend (if screen/module involved)
- [ ] Create `src/hooks/use<FeatureName>.ts` with TanStack Query
- [ ] Define Zod schema for any new forms
- [ ] Create page in `src/pages/<portal>/<PageName>.tsx`
- [ ] Add lazy route entry in `App.tsx` via `lazyWithRetry`
- [ ] Wire React Hook Form to Zod schema + mutation hook
```

### 3. SQL Migration Skeleton
Paste inline in chat (not saved to file):

```sql
-- Migration: <feature-slug>
-- Created: YYYY-MM-DD
-- Review against: docs/DATABASE.md before running

-- New tables
CREATE TABLE IF NOT EXISTS <table_name> (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  -- TODO: add columns
  created_at timestamptz DEFAULT now() NOT NULL
);

-- RLS
ALTER TABLE <table_name> ENABLE ROW LEVEL SECURITY;
-- TODO: add policies aligned with existing RLS patterns

-- Indexes
-- TODO: add indexes for expected query patterns
```

---

## Approval Gate

End every document with:

```
**Design Summary:** [1-paragraph recap]

Spec saved → `docs/superpowers/specs/YYYY-MM-DD-<slug>-design.md`
Plan skeleton saved → `docs/superpowers/plans/YYYY-MM-DD-<slug>.md`
Migration skeleton above — review against DATABASE.md before running.

Type **"approved"** to hand off to `write-implementation-plan`, or tell me what to change.
```

Do NOT invoke `write-implementation-plan` or write any code until "approved" is received.

---

## App-Agnostic Notes

- This skill works for any app, not just GlobalyApp. Always load the active app's PRD and
  DATABASE.md dynamically in Step 0. Never hardcode paths.
- If the app has no PRD yet, flag it: "No PRD found. Recommend running `product-discovery`
  first to define the problem before designing the backend."
- Follow the active app's naming conventions exactly — infer them from DATABASE.md and
  existing schema rather than inventing new patterns.

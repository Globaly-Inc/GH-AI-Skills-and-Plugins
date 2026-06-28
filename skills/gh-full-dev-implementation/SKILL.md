---
name: gh-full-dev-implementation
description: >
  Full-stack implementation and architecture improvement for GlobalyHub projects (React +
  TypeScript + Supabase + React Query). Auto-detects mode from context: if input is a
  spec, PRD, ticket, or feature description → IMPLEMENT flow; if input is existing code,
  a module, or an architectural concern → IMPROVE flow. Use when the user says "implement
  this", "build this feature", "dev this", "code this up", "improve this code", "refactor
  this", "architecture review", "make this better", "full dev", or hands over a ticket/PRD.
---

# Engineering — Full Dev Implementation

One skill for the full development loop: write new features with tracer-bullet TDD, or
surface and fix architectural friction. Detects which mode you need from context.

---

## Mode detection

Read the user's input before doing anything else.

- **IMPLEMENT mode** — input is a spec, PRD, issue, ticket number, or description of
  something to build.
- **IMPROVE mode** — input is existing code, a module path, a vague complaint about
  quality/complexity, or an explicit refactor request.

When ambiguous, state your interpretation and ask the user to confirm before proceeding.

---

## Reference files (load when relevant)

| Reference | When to use |
|-----------|------------|
| `references/feature-builder.md` | Adding pages, routes, hooks, components, or navigation |
| `references/migration-workflow.md` | Any database schema change |
| `references/rls-auditor.md` | New tables, policy review, or IMPROVE mode security audit |
| `references/edge-function.md` | Creating or modifying a Supabase Edge Function |
| `references/saas-feature-implementer.md` | Full end-to-end feature touching 2+ layers |
| `references/ponytail.md` | Laziness discipline — ladder, YAGNI for tests, root-cause fixes, `ponytail:` comments |

---

## Stack reference (always in scope)

| Layer | Technology | Key rules |
|-------|-----------|-----------|
| UI components | React 18 + Radix UI + shadcn/ui + Tailwind | Use existing shadcn primitives; don't add new UI libs |
| Types | TypeScript (strict mode) | No `any`, no `as` casts without comment; prefer `unknown` + zod narrowing |
| Database / Auth | Supabase (`@supabase/supabase-js`) | Use generated types from `src/integrations/supabase/types.ts`; never write raw SQL strings in component code |
| Server state | React Query v5 | Shared query keys in constants; invalidate by key family; optimistic updates via `onMutate` |
| Forms | react-hook-form + zod | Schema-first: define zod schema → infer TypeScript type → pass to `useForm` |
| Routing | react-router-dom v6 | Loaders + actions for data routes; `useNavigate` not `window.location` |

---

## IMPLEMENT mode

### Phase 1 — Understand

1. Re-read the spec/PRD/ticket in full.
2. Identify every file that will be **created** and every file that will be **modified**.
3. For each new file, state the proposed path before touching it:
   > "I plan to create `src/hooks/useJobSearch.ts`. Proceed?"
   Wait for the user to confirm, rename, or cancel before writing.
4. Identify any new Supabase tables or columns. If a new table will be created, note that
   an RLS policy is required — this is a hard gate (see Quality Gates).

### Phase 2 — Tracer bullet

Before writing a single line, run the **ponytail ladder** (see `references/ponytail.md`):
1. Does this behavior need to exist at all? (YAGNI — skip and say so if not)
2. Already in the codebase? (`grep -r "<concept>" src/` before writing)
3. Stdlib / React / Supabase client does it? Use it.
4. Already-installed dependency covers it? Use it.
5. Only then: write the minimum code.

Then establish a working end-to-end path through the smallest possible vertical slice:

1. Write **one** failing test — the smallest thing that fails if this logic breaks.
   Test through public interfaces, not implementation details.
   Prefer `vitest` + `@testing-library/react` for components/hooks.
   Trivial one-liners (format helpers, constants, style props) need no test. YAGNI applies to tests too.
2. Write the minimum code to make that test pass.
3. Run the test: `npx vitest run <test-file>`.
4. Refactor only if duplication or clarity demands it — no speculative cleanup.
5. Mark any deliberate simplification with a `ponytail:` comment naming the ceiling and upgrade path.
6. Commit the tracer bullet before expanding.

### Phase 3 — Incremental TDD loop

One **cycle** = write one failing test → write minimum code → test passes.

**Per cycle** (cycles 1–4 of every group of 5):
```
write one failing test
  → write minimum code to pass
  → run: npx vitest run <test-file>   ← fast, only the file you just changed
  → refactor only if needed
  → start next cycle
```

**Every 5th cycle** — run the full suite to catch regressions in untouched code:
```
npx vitest run   ← no file filter, entire suite
```
- All green → continue implementing
- Any failure → fix the regression before starting the next cycle

Running the full suite after every single cycle is too slow. Running it only at the end
misses regressions until it's too late. Every 5 cycles is the balance.

Rules:
- One behavior per cycle. Do not batch.
- No implementation without a test first — unless the code is a trivial one-liner (YAGNI for tests).
- Run the ponytail ladder before each cycle's implementation step. If a higher rung holds, take it.
- Do not anticipate future requirements during implementation.
- No unrequested abstractions: no interface with one implementation, no helper extracted from a single call site.
- Mark deliberate simplifications with `// ponytail: <ceiling> — <upgrade path>`.
- Bug fix = root cause. `grep -r "<fn>" src/` before touching any shared function.

### Phase 4 — Quality gates

Run all gates before declaring done. Any ❌ **blocks** completion.

| Gate | Command | Block condition |
|------|---------|-----------------|
| TypeScript | `npx tsc --noEmit` | Any type error |
| Secret scan | `grep -rE "(api_key\|secret\|password\|token\|private_key)\s*=\s*['\"][^'\"]{8,}" src/` | Any match |
| RLS check | Review new migration files | New table without `CREATE POLICY` or `ENABLE ROW LEVEL SECURITY` |

If a gate fails, fix the root cause. Do not suppress errors with `// @ts-ignore`, `any`, or
disable comments unless you leave a comment explaining an unavoidable external constraint.

### Phase 5 — Output

**A. Self-review findings report**

After the final `tsc` passes, diff your own work:
```
git diff <base-branch>...HEAD
```
Review the diff exactly as `eng-code-review` would. Emit findings as:
```
[SEVERITY] file:line — issue → suggested fix
```
Severity levels: `CRITICAL` (block) / `HIGH` (fix before merge) / `MEDIUM` (consider) / `LOW` (optional).

End with one of:
- **Approve** — no CRITICAL or HIGH findings
- **Approve with comments** — HIGH findings only, all called out
- **Block** — any CRITICAL finding (must resolve before merge)

**B. Documentation**

For every new public function, hook, or component, add a one-line JSDoc:
```ts
/** Returns paginated job listings filtered by country and role. */
export function useJobSearch(params: JobSearchParams) { … }
```

Append a short README section under `## Recent additions` (create the section if absent)
in the nearest `README.md` to the changed code:
```markdown
### `useJobSearch` (added YYYY-MM-DD)
Paginated job search hook. Accepts `JobSearchParams`, returns React Query result.
```

---

## IMPROVE mode

### Phase 1 — Explore

1. Check for `CONTEXT.md` or `docs/` in the repo root. Read it first for domain vocabulary.
2. Run an organic exploration of the target area using the Explore agent or direct `grep`/`find`.
3. Watch for **friction signals**:
   - Understanding of a concept scattered across 5+ files
   - Shallow modules: interface mirrors implementation 1:1
   - Untested coupling: changing X forces changes in Y, Z, W
   - Callers that must know implementation details to use a module
   - Functions >50 lines or files >800 lines with no clear seam

### Phase 2 — Report

Generate an HTML report and open it from the scratchpad directory
(`/tmp/claude-1000/-home-benziii-GlobalyHub/<session>/scratchpad/improve-report.html`).

Each **candidate card** must include:
- Affected files (linked by path)
- The problem (in terms of depth, seam, coupling — use the vocabulary below)
- Proposed solution with before/after pseudocode
- Expected benefit: leverage for callers, locality for maintainers, testability gain
- Recommendation badge: `Strong` / `Moderate` / `Speculative`

Present the report path to the user and ask them to pick a candidate.

**Deep-module vocabulary** (use these terms in the report, not informal descriptions):

| Term | Meaning |
|------|---------|
| **Module** | Anything with an interface + implementation (function, class, package, slice) |
| **Interface** | Everything a caller must know: types, invariants, ordering, errors, config |
| **Depth** | Behaviour a caller exercises per unit of interface they learn |
| **Seam** | Where behaviour can change without editing at that location |
| **Adapter** | Concrete thing satisfying an interface at a seam |
| **Leverage** | More capability per unit of interface learned (what callers get from depth) |
| **Locality** | Changes concentrate in one place (what maintainers get from depth) |
| **Deletion test** | If removing this module concentrates complexity rather than relocates it, it's shallow |

### Phase 3 — Grilling loop

Once the user picks a candidate:

1. Ask constraint questions before writing code:
   - What callers depend on the current interface?
   - Is there an existing test suite to protect the refactor?
   - Are there performance or compatibility invariants that must hold?
   - Is a migration path needed (deprecation shim, parallel run)?
2. Update `CONTEXT.md` with any new module names or sharpened vocabulary introduced.
3. Get user sign-off on the approach.

### Phase 4 — Refactor

Execute the refactor using the same TDD tracer-bullet loop as IMPLEMENT Phase 2–3.
The existing test suite is your safety net; run it before every commit.

### Phase 5 — Output

Same as IMPLEMENT Phase 5: self-review findings report + JSDoc + README section.

---

## Globaly notes

- **Ask before creating.** Every new file gets a confirmation prompt (path + one-line purpose).
  Never create files silently.
- **Secrets are an instant stop.** If the secret-scan gate fires, stop immediately. Before
  touching `.env`, show this warning and wait for explicit confirmation:
  > "⚠️ I need to add a value to `.env`. This file is gitignored but lives on disk. Confirm
  > I can write to `.env`? (yes / no)"
  Only proceed after the user says yes. Remove the hardcoded secret, add the variable to
  `.env`, reference it via `import.meta.env.VITE_*` in code, then re-run the secret-scan
  gate before continuing.
- **RLS is non-negotiable.** GlobalyApp stores multi-tenant user data. A table without RLS
  is a data-breach waiting to happen. Block, fix, then continue.
- **TypeScript strict mode.** GlobalyApp runs `strict: true`. Every `any` you leave behind
  is a bug you can't see yet.
- **Cite file:line.** Vague findings waste the author's time; precise findings get fixed.
- **Fix the implementation, not the test** — unless the test itself is wrong.

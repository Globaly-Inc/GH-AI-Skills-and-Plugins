---
name: gh-code-review
description: >
  Full-implementation code review gate — runs AFTER gh-full-dev-implementation finishes
  and BEFORE merge. Reviews the entire feature diff against the base branch (migrations +
  RLS, Edge Functions / RPCs, hooks, pages, forms, tests, docs) against the approved
  implementation plan, the GlobalyHub stack rules, and the ponytail ladder. Emits
  file:line findings with severity and an Approve / Approve with comments / Block verdict.
  Read-only: it never edits code. Trigger phrases: "review the full code", "review the
  implementation", "review this feature", "full code review", "code review", "review
  before merge", "is this ready to merge", "review the PR", "review the branch".
---

# Code Review Gate

Review the **whole** implementation a feature branch produced — not the last commit, not
one file — and decide whether it can merge.

**This skill is read-only.** It reports; it does not fix. If the user wants fixes, hand the
findings to `gh-full-dev-implementation` (IMPLEMENT Phase 3) and re-run this review after.

---

## Position in the GlobalyHub pipeline

```
gh-implementation-plan     ← approved plan (source of truth for scope)
      ↓
gh-full-dev-implementation ← code written here
      ↓
► gh-code-review           ← YOU ARE HERE (merge gate)
      ↓
merge
```

---

## Step 0 — Context loading (silent, always first)

1. **Base branch and diff scope.** Ask only if it cannot be inferred:
   ```bash
   git diff <base>...HEAD --stat
   git diff <base>...HEAD
   ```
   Default base: `main`. Review the full three-dot diff — every commit on the branch.
2. **Implementation plan.** Read `docs/superpowers/plans/YYYY-MM-DD-<slug>-impl-plan.md`.
   Its File Map and Test Plan are the contract. If no plan exists, say so once and review
   against the spec / PRD / ticket instead — do not block on a missing plan.
3. **Spec.** Read `docs/superpowers/specs/<slug>-design.md` if present.
4. **Live schema.** For any migration in the diff, confirm current state via Supabase MCP
   (`list_tables`) so you review against what actually exists.
5. **Read every changed file in full**, not just the hunks. A hunk is correct or wrong
   only in the context of the function around it.

---

## Step 1 — Run the gates

Run before reading for style; a red gate changes the review's shape.

| Gate | Command | Block condition |
|------|---------|-----------------|
| TypeScript | `npx tsc --noEmit` | Any error |
| Tests | `npx vitest run` | Any failure |
| Secret scan | `grep -rEn "(api_key\|secret\|password\|token\|private_key)\s*=\s*['\"][^'\"]{8,}" src/ supabase/` | Any match |
| RLS | For every `CREATE TABLE` in `supabase/migrations/` on this branch: `ENABLE ROW LEVEL SECURITY` + at least one `CREATE POLICY` | Missing either |

Any red gate = at least one `CRITICAL` finding and a **Block** verdict. Still finish the
rest of the review so the author gets everything in one pass.

---

## Step 2 — Review passes

Run every pass, in this order. One finding per issue. Cite `file:line` for every finding.

### Pass 1 — Plan conformance
- Every file in the plan's `CREATE` / `MODIFY` lists: present in the diff?
- Every file in the diff: listed in the plan? Unplanned files are a `MEDIUM` finding
  unless they are trivially necessary (barrel export, test file for a planned module).
- Scope creep: behaviour not in the plan's "In scope" list → `HIGH`.
- Anything in "Out of scope" that got built → `HIGH`.

### Pass 2 — Correctness
- Does the code do what the spec says, including error / empty / loading paths?
- Off-by-one, null / undefined paths, unawaited promises, stale closures in hooks.
- Bug fixes: was the **root cause** fixed? `grep -rn "<fn>" src/` — are sibling callers
  still broken? A symptom patch is `HIGH`.
- React Query: correct key family, invalidation on mutation success, no stale
  optimistic state on error.

### Pass 3 — Security
- **RLS** (full audit per `gh-full-dev-implementation/references/rls-auditor.md`):
  `USING (true)` on user data → `CRITICAL`; missing `WITH CHECK` on INSERT/UPDATE →
  `HIGH`; business-scoped table not checking membership → `CRITICAL`.
- Service-role key used in any client-reachable path → `CRITICAL`.
- Input validation at every trust boundary (Edge Function body, RPC args, form input):
  zod-parsed, not trusted → missing = `HIGH`.
- Secrets, tokens, or PII in logs → `HIGH`.
- Auth check in every Edge Function / RPC before data access → missing = `CRITICAL`.

### Pass 4 — Stack rules
| Rule | Severity if broken |
|------|--------------------|
| No `any`; no `as` cast without an explanatory comment | HIGH |
| No `// @ts-ignore` / `eslint-disable` without a comment naming the external constraint | HIGH |
| No raw SQL strings in component / hook code; use generated Supabase types | HIGH |
| Forms: zod schema → inferred type → `useForm`; no hand-written duplicate types | MEDIUM |
| Routing via `react-router-dom` (`useNavigate`, loaders), never `window.location` | MEDIUM |
| New page added through `lazyWithRetry` in `App.tsx` | MEDIUM |
| Only existing shadcn/ui primitives; no new UI library | HIGH |
| Follows `gh-design-direction/brand-*.md` tokens for the app in question | MEDIUM |

### Pass 5 — Tests
- Tracer-bullet test from the plan exists and exercises the public interface.
- Every non-trivial behaviour (branch, loop, parser, auth / money path, mutation,
  stateful hook) has one test. Trivial one-liners need none — do not demand them.
- No test was deleted, skipped (`.skip`, `xit`), or loosened to make the suite pass → `HIGH`.
- Tests assert behaviour, not implementation details (no spying on internals) → `LOW`.

### Pass 6 — Over-engineering (ponytail)
- Interface with one implementation, factory for one product, config for a constant → `MEDIUM`.
- Helper extracted from a single call site → `LOW`.
- New dependency in `package.json` that stdlib / React / an installed dep already covers → `HIGH`.
- Re-implemented something that already exists in `src/` → `MEDIUM`, name the existing one.
- Deliberate shortcut **without** a `// ponytail:` comment naming the ceiling → `LOW`.

### Pass 7 — Docs
- Every new exported function / hook / component has a one-line JSDoc → `LOW`.
- `## Recent additions` entry in the nearest `README.md` → `LOW`.
- New table documented in `docs/DATABASE.md` → `MEDIUM`.

---

## Step 3 — Output

Emit the report in this exact shape, then save it to
`docs/superpowers/reviews/YYYY-MM-DD-<slug>-review.md`.

```
# Code review — <feature> (<branch> → <base>)

## Verdict: Approve | Approve with comments | Block

## Gates
| Gate | Result |
|------|--------|
| tsc | ✅ / ❌ <n errors> |
| vitest | ✅ <n passed> / ❌ <n failed> |
| secret scan | ✅ / ❌ |
| RLS | ✅ / ❌ <table> |

## Plan conformance
| Planned file | In diff |
|--------------|---------|
| <path> | ✅ / ❌ missing |
Unplanned files: <list or "none">

## Findings
[CRITICAL] file:line — issue → suggested fix
[HIGH]     file:line — issue → suggested fix
[MEDIUM]   file:line — issue → suggested fix
[LOW]      file:line — issue → suggested fix

## Summary
<2–4 sentences: what the branch does, what blocks it, what to do next>
```

Severity:
- `CRITICAL` — data breach, data loss, broken gate, auth bypass. Blocks.
- `HIGH` — bug or rule violation that must be fixed before merge.
- `MEDIUM` — should fix; author may defer with a stated reason.
- `LOW` — optional polish.

Verdict:
- **Approve** — no CRITICAL or HIGH.
- **Approve with comments** — HIGH only, every one called out.
- **Block** — any CRITICAL, or any red gate.

Findings sorted CRITICAL → LOW. No finding without a `file:line`. No finding without a fix.

---

## Rules

- **Read-only.** Never edit, commit, or run migrations during review. If asked to fix,
  say "handing to gh-full-dev-implementation" and switch skills.
- **Whole diff, whole file.** Never review a hunk without the surrounding function.
- **Precise or silent.** A finding you cannot pin to `file:line` is not a finding.
- **No formatter nitpicks.** If the repo has Prettier / ESLint, trust them. Review logic.
- **Fix the implementation, not the test** — unless the test itself is wrong, and say why.
- **Secrets are an instant CRITICAL.** Do not paste the secret value into the report.
- **One pass, complete.** Deliver all findings together; do not trickle them across turns.
- **Re-review is a delta.** On a second run, diff against the previous report: list
  resolved findings, still-open findings, and new findings. Do not re-explain resolved ones.

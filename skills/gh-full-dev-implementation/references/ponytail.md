# Reference: Ponytail — Laziness Discipline for TDD

Source: github.com/DietrichGebert/ponytail (MIT)
Applied here to the TDD loop in `gh-full-dev-implementation`.

Lazy means efficient, not careless. The best code is code never written.
The shortest path to done is the right path — but only once you understand the problem.

---

## The ladder (run before writing anything)

Stop at the first rung that holds. Do not skip rungs.

1. **Does this need to exist at all?** Speculative need → skip it, say so in one line. (YAGNI)
2. **Already in this codebase?** A hook, util, type, or query that already exists → reuse it.
   `grep -r "<concept>" src/` before writing. Re-implementing what's a few files over is the
   most common waste.
3. **Stdlib / React / Supabase client does it?** Use it.
4. **Native platform feature covers it?** CSS over JS, DB constraint over app code,
   `<input type="date">` over a picker lib.
5. **Already-installed dependency solves it?** Use it. Never add a new package for what a
   few lines can do.
6. **Can it be one line?** One line.
7. **Only then:** the minimum code that works.

The ladder runs *after* you read the task and trace the real flow end to end — not instead of it.

---

## YAGNI applies to tests too

Do not write a test for code that doesn't need to exist.
Do not write a test suite for a trivial one-liner.

The threshold: **non-trivial logic** = a branch, a loop, a parser, a money/auth path,
a Supabase mutation, a hook with state. These get one test — the smallest thing that
fails if the logic breaks.

Trivial one-liners (a format helper, a constant, a style prop) need no test.

---

## One runnable check per non-trivial unit

Not a suite. Not fixtures for every edge case upfront. One test:

> "The smallest thing that fails if this logic breaks."

This is compatible with strict TDD: write that one check first (red), then implement (green),
then refactor. The ponytail constraint is on how many tests you write, not when.

---

## Bug fix = root cause

Before touching any function, `grep` every caller:
```bash
grep -r "<functionName>" src/
```

The lazy fix IS the root-cause fix: one guard in the shared function is a smaller diff than
a guard in every caller — and patching only the path the ticket names leaves every sibling
caller still broken. Fix once, where all callers route through.

---

## No unrequested abstractions

- No interface with one implementation
- No factory for one product
- No config for a value that never changes
- No helper extracted from a single call site
- No boilerplate "for later" — later can scaffold for itself

If a request is complex, ship the lazy version and question it:
> "Did X; Y covers it. Need the full version? Say so."

---

## The `ponytail:` comment

Mark deliberate simplifications so they read as intent, not ignorance:

```ts
// ponytail: linear scan — acceptable for <50 items; switch to indexed lookup if list grows
// ponytail: no cache — query is fast enough; add React Query cache if this fires on every keystroke
// ponytail: single RLS policy covers all roles — add per-role policies if access model splits
```

Shortcuts with a known ceiling name the ceiling and the upgrade path. Silent simplifications
are tech debt; commented ones are decisions.

---

## What ponytail never simplifies away

These are exempt from laziness, always in full:

- Input validation at trust boundaries (user input, Edge Function bodies)
- RLS policies — never skip, never `USING (true)`
- Error handling that prevents data loss
- Auth checks
- Accessibility basics on interactive components
- Anything the user explicitly requested in full

---

## Output format

Code first. Then at most three short lines: what was skipped, when to add it.

```
[code] → skipped: [X], add when [Y].
```

No essays defending a simplification. If the explanation is longer than the code, delete
the explanation.

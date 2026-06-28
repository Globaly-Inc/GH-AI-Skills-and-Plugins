---
name: eng-code-review
description: Review a code change against Globaly engineering standards before merge. Use when the user says "review this", "code review", "check my diff", "is this ready to merge", or after writing/modifying code. Produces severity-tagged findings (CRITICAL/HIGH/MEDIUM/LOW) covering security, correctness, and maintainability, plus a clear merge verdict.
---

# Engineering — Code Review

A Globaly code review. Catch what matters, tag by severity, give a clear verdict.

## When to use
- After writing or modifying code, before opening or merging a PR.
- When touching auth, payments, user data, migrations, or external APIs.

## Process

1. **Get the diff.** `git diff` (or `git diff <base>...HEAD` for a full PR). Review the change,
   not the whole repo.
2. **Security first** (block-worthy): hardcoded secrets, injection (SQL/command/XSS), missing
   authz checks, unsanitized input, path traversal, SSRF, unsafe crypto.
3. **Correctness**: logic errors, unhandled edge cases, error swallowing, race conditions,
   off-by-one, null/empty handling, intent vs. implementation mismatch.
4. **Maintainability**: functions >50 lines, files >800 lines, nesting >4 levels, mutation
   where immutability is expected, dead code, leaky abstractions, missing tests.
5. **Tests**: does new behavior have coverage? Are assertions meaningful (not just "no throw")?

## Severity
| Level | Meaning | Action |
|-------|---------|--------|
| CRITICAL | Security hole or data-loss risk | **Block** |
| HIGH | Real bug or significant quality issue | Fix before merge |
| MEDIUM | Maintainability concern | Consider fixing |
| LOW | Style / minor | Optional |

## Output
List findings as `[SEVERITY] file:line — issue → suggested fix`. End with a verdict:
**Approve** (no CRITICAL/HIGH), **Approve with comments** (HIGH only), or **Block** (any CRITICAL).

## Globaly notes
- Be specific and cite `file:line`. Vague feedback wastes the author's time.
- Fix the implementation, not the test — unless the test itself is wrong.

---
name: devops-deploy-check
description: Run a pre-deploy readiness checklist before promoting a build to staging or production. Use when the user says "ready to deploy", "deploy check", "promote to prod", "ship it", or "go/no-go". Produces a Go/No-Go verdict with checks across build, migrations, secrets, rollback, and post-deploy verification.
---

# DevOps — Deploy Readiness Check

A Globaly pre-deploy gate. Decide Go/No-Go with evidence, not vibes.

## When to use
- Before promoting a verified staging build to production.
- Before any deploy touching migrations, secrets, or infrastructure.

## Checklist

1. **Build & tests green.** CI passing on the exact commit being promoted (same digest, not a rebuild).
2. **Migrations safe.** Backward-compatible? Reversible? Tested against a prod-like dataset? Long
   locks avoided? Confirm the migration runs with the credentials the deploy job actually uses.
3. **Secrets & config.** Required env/secrets present in the target environment. No secret drift
   between what the app expects and what the secret manager holds.
4. **Rollback plan.** One-command rollback path identified and known-good prior version pinned.
5. **Blast radius.** What breaks if this is wrong? Who is paged? Is there a maintenance window?
6. **Post-deploy verification.** Concrete smoke checks (health endpoint, key user flow, error rate,
   latency) defined *before* deploy, so "verified" means something.

## Output
A Go/No-Go report: each check marked ✅ / ⚠️ / ❌ with a one-line justification, the rollback
command, and the post-deploy smoke checks to run. Any ❌ on items 1-4 = **No-Go**.

## Globaly notes
- Promote the *same artifact* through environments; never rebuild between staging and prod.
- DB credential drift is a recurring failure mode — verify migration auth explicitly.

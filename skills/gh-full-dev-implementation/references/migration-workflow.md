# Reference: Supabase Migration Workflow

Used by `gh-full-dev-implementation` when any database change is required.
Covers creation, rollback, seeds, indexes, comments, and verification.

---

## Naming convention

GlobalyApp uses two naming styles — match the intent:

| Style | When to use | Example |
|-------|------------|---------|
| `YYYYMMDDHHMMSS_<uuid>.sql` | Auto-generated / Lovable migrations | `20260628040217_a05cc763.sql` |
| `YYYYMMDD000001_<descriptive_slug>.sql` | Hand-authored, intentional changes | `20260618000001_lms_fix_self_enroll_rls.sql` |

Always use the **descriptive slug style** for hand-authored migrations. Use a sequential
suffix (`000001`, `000002`) when multiple migrations share a date.

---

## Migration file structure

Every migration must follow this layout:

```sql
-- <One-line summary of what this migration does and why>
-- <If fixing a prior migration, note which one and why it was broken>

-- 1. Schema changes
ALTER TABLE public.<table> ADD COLUMN IF NOT EXISTS <col> <type> <constraints>;

-- 2. Indexes (add CONCURRENTLY for large tables in prod)
CREATE INDEX IF NOT EXISTS idx_<table>_<col> ON public.<table>(<col>);

-- 3. RLS (see rls-auditor.md — required for every table)
ALTER TABLE public.<table> ENABLE ROW LEVEL SECURITY;
CREATE POLICY "<Human-readable policy name>"
  ON public.<table> FOR <SELECT|INSERT|UPDATE|DELETE>
  TO authenticated
  USING ( <condition> )
  WITH CHECK ( <condition> );

-- 4. Column comments (document non-obvious columns)
COMMENT ON COLUMN public.<table>.<col> IS '<What this stores and why>';
```

---

## Idempotency

All migrations must be safe to run twice. Use:

```sql
-- Columns
ALTER TABLE public.t ADD COLUMN IF NOT EXISTS col text;

-- Tables
CREATE TABLE IF NOT EXISTS public.t ( ... );

-- Policies (drop-then-recreate pattern)
DROP POLICY IF EXISTS "Policy name" ON public.t;
CREATE POLICY "Policy name" ON public.t ...;

-- Indexes
CREATE INDEX IF NOT EXISTS idx_t_col ON public.t(col);
```

Never write a migration that errors on re-run. This protects against duplicate-timestamp
incidents (as seen in `20260618000001`).

---

## Rollback script

For every migration that alters production data or schema, create a matching rollback
file at `supabase/migrations/<same-timestamp>_rollback_<slug>.sql`:

```sql
-- Rollback for <original migration name>
-- Run this to undo: psql $DATABASE_URL -f <this file>

DROP POLICY IF EXISTS "Policy name" ON public.<table>;
ALTER TABLE public.<table> DROP COLUMN IF EXISTS <col>;
DROP INDEX IF EXISTS idx_<table>_<col>;
```

Rollback files are **not applied** by Supabase CLI automatically — they are documentation
and emergency scripts. Name them clearly.

---

## Seed updates

If the migration adds a new table or lookup values that seeds depend on, update
`supabase/seed.sql` to include representative rows. Seeds run in local dev only.

---

## Verification checklist

Before committing a migration:

| Check | How |
|-------|-----|
| Migration applies cleanly | `npx supabase db reset` (local) |
| No type drift | `npx supabase gen types typescript --local > src/integrations/supabase/types.ts && git diff src/integrations/supabase/types.ts` |
| RLS in place | `grep -i "ENABLE ROW LEVEL\|CREATE POLICY" <migration.sql>` |
| Idempotent | Run `npx supabase db reset` twice — second run must not error |
| Rollback written | `ls supabase/migrations/ | grep rollback` |

Any check that fails **blocks** the PR.

---

## Large-table safety

For tables with significant data:
- Use `ADD COLUMN ... DEFAULT NULL` first, backfill in a separate migration, then add `NOT NULL`.
- Index with `CREATE INDEX CONCURRENTLY` — avoids table lock on prod.
- Never run `DROP COLUMN` without confirming the column is unused in code (`grep -r "<col_name>" src/`).

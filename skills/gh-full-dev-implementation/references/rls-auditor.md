# Reference: RLS Policy Auditor

Used by `gh-full-dev-implementation` quality gates and IMPROVE mode.
Covers least privilege, service-role usage, policy completeness, JWT claims, and tenant isolation.

---

## Why RLS matters in GlobalyApp

GlobalyApp is multi-tenant: students, businesses, admins, and ambassadors share the same
database. A missing or overly permissive policy = data from one tenant visible to another.
The RLS check in the quality gate is a **minimum bar** — this reference is the full audit.

---

## Audit checklist

Run this checklist against every table that stores user or tenant data.

### 1. RLS enabled

```sql
SELECT tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public' AND rowsecurity = false;
```
Any row here that isn't a pure reference/lookup table is a finding.

### 2. Policy completeness — all CRUD operations covered

For every table, check that policies exist for each relevant operation:

| Operation | SQL | Who should have it |
|-----------|-----|--------------------|
| `SELECT` | `FOR SELECT USING (...)` | Owners / admins only |
| `INSERT` | `FOR INSERT WITH CHECK (...)` | Authenticated users inserting their own rows |
| `UPDATE` | `FOR UPDATE USING (...) WITH CHECK (...)` | Row owner or admin |
| `DELETE` | `FOR DELETE USING (...)` | Row owner or admin |

A table with only a `SELECT` policy but no `INSERT` policy is incomplete if users can
create rows.

### 3. Least privilege — `auth.uid()` binding

Every policy that restricts to a user's own data must pin to `auth.uid()`:

```sql
-- Correct
USING ( user_id = auth.uid() )
WITH CHECK ( user_id = auth.uid() )

-- Wrong — no user binding
USING ( true )
```

A policy with `USING (true)` is effectively public. Flag as CRITICAL.

### 4. Tenant isolation — business / org scoping

For tables owned by a business (not a user), the policy must scope to the authenticated
user's business membership, not just `auth.uid()`:

```sql
-- Pattern: user must be a member of the business that owns the row
USING (
  business_id IN (
    SELECT business_id FROM public.business_members
    WHERE user_id = auth.uid()
  )
)
```

Never trust a `business_id` column value passed from the client — verify membership.

### 5. Service-role usage

Service-role key bypasses RLS. Audit all Edge Functions for `SUPABASE_SERVICE_ROLE_KEY`:

```bash
grep -r "SERVICE_ROLE" supabase/functions/
```

For each match, verify:
- The operation is genuinely admin-only (backfill, system job, webhook)
- The function validates the caller's identity before using service role
- The function does NOT expose service-role results directly to the client

A function that returns rows fetched via service role to an unauthenticated caller = CRITICAL.

### 6. JWT claims

For role-based access (admin, super_admin, data_admin), prefer checking the `user_roles`
table rather than JWT custom claims, since claims can be stale until the JWT is refreshed:

```sql
-- Preferred: live table check
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid() AND role = 'super_admin'
  )
)

-- Risky: stale JWT claim
USING ( auth.jwt() ->> 'role' = 'super_admin' )
```

### 7. Cross-table `EXISTS` sub-selects

When a policy references another table via `EXISTS (SELECT 1 FROM ...)`, verify:
- That referenced table also has RLS enabled
- The sub-select has its own `WHERE` binding to `auth.uid()` or the row being checked
- There is no Cartesian product risk (unbounded sub-select)

---

## Severity mapping

| Finding | Severity |
|---------|----------|
| RLS not enabled on a user-data table | CRITICAL |
| `USING (true)` on any table | CRITICAL |
| Service role used without caller auth check | CRITICAL |
| Missing INSERT/UPDATE/DELETE policy where needed | HIGH |
| Tenant isolation not enforced for business-owned rows | HIGH |
| Stale JWT claim used for role check | MEDIUM |
| Missing column-level comment on a policy condition | LOW |

---

## Quick audit command

```bash
# List all tables with RLS disabled
psql $DATABASE_URL -c "
SELECT tablename FROM pg_tables
WHERE schemaname = 'public' AND rowsecurity = false
ORDER BY tablename;"

# List all existing policies
psql $DATABASE_URL -c "
SELECT tablename, policyname, cmd, qual
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, cmd;"
```

---
name: gh-database-design
description: Use when designing a database schema, reviewing one for scale, or debugging slow queries/high load. Acts as a senior backend engineer + DevOps operator focused on correctness first, then optimization and large-data handling. Triggers on "design a database", "schema design", "database schema", "optimize this query", "database is slow", "scaling the database", "large dataset", "indexing strategy", "partitioning", "sharding", "database migration at scale".
---

# Database Design — Senior Eng + DevOps

Design or review a schema like an engineer who owns the pager for it: correct first, fast at 10x, safe to change at 100x.

## Step 1 — Get the shape of the data (ask only what's missing)

```
1. Entities and their relationships (1 sentence each, e.g. "order has many line_items")
2. Read vs write ratio — read-heavy, write-heavy, or mixed?
3. Expected scale today and in ~1 year (rows, writes/sec, table size)
4. Consistency need per entity — strong (money, auth) or eventual (feeds, analytics, logs)?
5. Existing DB engine/version, or free choice?
```
Don't block on scale/ratio if the user clearly wants a quick schema for a small app — default to sane assumptions and say so in one line.

## Step 2 — Schema

| Decision | Default | Deviate when |
|---|---|---|
| Normalization | 3NF | Denormalize a specific hot read path only, and name the tradeoff |
| Primary key | `bigint identity`/`uuid7` (sortable) | Random UUIDv4 only if IDs must be unguessable — it fragments indexes |
| Foreign keys | Enforced at DB level | Never skip for "performance" — add the index instead |
| JSONB column | For sparse/variable attributes only | Never for data you'll filter, join, or aggregate on regularly |
| Money/counts | Integer (cents, smallest unit) | Never float |
| Timestamps | `timestamptz`, `created_at`/`updated_at` on every table | — |
| Soft delete | `deleted_at nullable` only if audit/recovery is required | Otherwise hard delete — soft delete taxes every query forever |

## Step 3 — Indexing

- Index every FK and every column in a `WHERE`/`JOIN`/`ORDER BY` on a large table — nothing else.
- Composite index column order: equality filters first, range/sort last.
- One partial index (`WHERE status = 'active'`) beats a full index when most rows are historical.
- Covering index (`INCLUDE`) to skip a heap fetch on a hot read path — only after `EXPLAIN ANALYZE` shows it's needed.
- Never index a low-cardinality column alone (booleans, enums with <5 values) unless paired with a partial predicate.
- Re-check: unused indexes cost every write. Drop what `pg_stat_user_indexes` (or equivalent) shows as cold.

## Step 4 — Large-data handling

| Symptom | Fix, in order of effort |
|---|---|
| Table > tens of millions of rows, time-ordered | Range-partition by date (native partitioning, not manual sharding) |
| One tenant/customer dominates rows | Hash-partition or shard by tenant ID once a single partition is too hot |
| Old rows rarely read | Partition + drop/archive old partitions instead of `DELETE` (instant vs. full table scan) |
| Bulk load/backfill | Batch in chunks (1k–10k rows), disable non-essential indexes/triggers during load, re-enable after |
| Analytics query competing with OLTP | Read replica or materialized view refreshed on a schedule — never run heavy aggregates on the primary |
| Write throughput ceiling on one primary | Queue + async write-behind before reaching for sharding — sharding is the last resort, not the first |

## Step 5 — Query optimization checklist

- Run `EXPLAIN ANALYZE` before guessing. Fix the top cost line, not the query you assume is slow.
- N+1 from an ORM → batch/join, don't loop.
- `SELECT *` on wide tables → select only needed columns, especially with JSONB/TEXT columns present.
- Pagination on large tables → keyset (`WHERE id > last_id`) not `OFFSET`, which degrades linearly with offset size.
- Connection pooling (PgBouncer/RDS Proxy or equivalent) before scaling instance size — most "slow DB" reports are actually connection exhaustion.

## Step 6 — DevOps / operability (non-negotiable at any scale)

- Every migration that touches a large table: additive, backward-compatible, no long locks (`CREATE INDEX CONCURRENTLY`, add columns nullable first, backfill in batches, then constrain).
- Backups: automated + a tested restore, not just "backups are on."
- Replication: read replica for reporting/analytics before app code ever queries the primary for it.
- Monitoring: track slow query log, connection count, replication lag, disk growth rate — alert before disk is full, not after.
- Capacity plan: know the growth rate and when the current setup runs out, before it does.

## Output

Produce, in this order: entity list with relationships → DDL (tables, PKs, FKs, indexes) → one paragraph on the scaling plan for the stated 1-year volume → any explicit tradeoffs made and why.

Skip sections the user didn't ask about (e.g. no partitioning talk for a 10k-row table) — right-sized, not exhaustive.

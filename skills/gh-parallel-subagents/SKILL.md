---
name: gh-parallel-subagents
description: >
  Dispatch independent tasks to parallel subagents for concurrent execution.
  Use when the user says "run in parallel", "do these simultaneously", "parallel agents",
  "dispatch agents", "fan out", "parallelize this", "run these at the same time",
  or when you identify 2+ genuinely independent tasks that would benefit from concurrency.
---

# Parallel Subagent Dispatch

Run independent tasks concurrently by dispatching focused subagents. Each agent gets
isolated context, a clear scope, and a single responsibility. Results are collected,
verified for conflicts, and integrated.

---

## When to use

Use this skill when:
- Multiple independent tasks exist (e.g. fix bugs in unrelated files, research separate topics)
- Tasks touch **different files or domains** with no shared dependencies
- Each task can proceed without information from the others
- Sequential execution would be unnecessarily slow

Do **NOT** use when:
- Tasks share root causes or depend on each other's output
- Tasks modify the same files (merge conflicts are likely)
- A single task is small enough to just do inline
- The user explicitly wants sequential, reviewed steps

---

## Step 0 — Identify and classify tasks

Before dispatching anything, read the full request and the relevant code.

1. **List every discrete task** the user is asking for (or that the problem decomposes into).
2. **Check independence** — for each pair of tasks, answer:
   - Do they touch the same files? → **not independent**, run sequentially or merge into one agent.
   - Does one need the output of the other? → **not independent**, sequence them.
   - Do they share state (DB rows, global config, env vars)? → **caution**, note the overlap.
3. **Classify each task:**

| Classification | Action |
|---------------|--------|
| Fully independent | Dispatch in parallel |
| Shared files but different sections | Parallel OK with worktree isolation (`isolation: "worktree"`) |
| Depends on another task's output | Sequence: run dependency first, then dependent task |
| Same root cause | Merge into a single agent |

4. **Cap at 4 concurrent agents.** More than 4 rarely helps and burns context. If you have
   more tasks, batch them into rounds.

---

## Step 1 — Write focused prompts

Each subagent prompt must be **self-contained**. The agent has no conversation history.

### Required in every prompt

- **What** — the specific task, stated in one sentence
- **Where** — exact file paths, function names, line numbers when known
- **Context** — why this needs to happen (enough for the agent to make judgment calls)
- **Constraints** — what NOT to touch, style rules, test requirements
- **Done-when** — concrete success criteria

### Prompt template

```
Task: [one-sentence description]

Context: [why this matters, what the surrounding system does]

Files to modify:
- [path/to/file.ts] — [what to change and why]

Constraints:
- Do not modify [other files]
- [Style/pattern rules relevant to this task]
- Run [specific test command] when done

Success criteria:
- [Concrete, verifiable outcome]
```

### What makes a strong vs weak prompt

| Strong | Weak |
|--------|------|
| "Fix the race condition in `useJobSearch.ts:42` where..." | "Fix the search bug" |
| One clear problem domain | "Fix all the issues in src/" |
| All context included in the prompt | "Look at the recent conversation for context" |
| Specific success criteria | "Make it work" |
| Named files and functions | "Somewhere in the hooks folder" |

---

## Step 2 — Dispatch

Send **all independent agent calls in a single message**. This is what triggers parallel
execution — multiple `Agent` tool calls in one response.

### Choosing agent type and isolation

| Scenario | `subagent_type` | `isolation` |
|----------|----------------|-------------|
| Code changes in separate files | (default) | omit |
| Code changes that might overlap | (default) | `"worktree"` |
| Research / exploration only | `"Explore"` | omit |
| Complex multi-step implementation | `"general-purpose"` | `"worktree"` |

### Choosing permission mode

| Scenario | `mode` |
|----------|--------|
| Trusted code changes (tests, fixes) | `"bypassPermissions"` |
| Changes needing review | `"default"` |
| Plan-only, no edits | `"plan"` |

### Example dispatch (3 independent bug fixes)

```
Agent call 1:
  description: "Fix date parsing bug"
  prompt: "Task: Fix the date parsing error in src/utils/date.ts:28..."
  isolation: "worktree"
  run_in_background: true
  name: "fix-date-parsing"

Agent call 2:
  description: "Fix avatar upload"
  prompt: "Task: Fix the avatar upload handler in src/api/upload.ts..."
  isolation: "worktree"
  run_in_background: true
  name: "fix-avatar-upload"

Agent call 3:
  description: "Fix nav highlight"
  prompt: "Task: Fix active state in src/components/Nav.tsx..."
  isolation: "worktree"
  run_in_background: true
  name: "fix-nav-highlight"
```

Key rules:
- **All calls in one message** — this is what makes them parallel
- **Use `run_in_background: true`** for 2+ agents so you don't block on the first one
- **Name each agent** so you can send follow-up messages if needed
- **Use `isolation: "worktree"`** when agents write code, so they don't conflict on disk

---

## Step 3 — Collect and integrate

When agents complete:

1. **Read each result.** Note what each agent changed and whether it succeeded.
2. **Check for conflicts:**
   - Did two agents modify the same file? → Manual merge needed.
   - Did any agent's change break assumptions another agent relied on? → Fix.
   - Did any agent fail? → Diagnose and re-dispatch or fix inline.
3. **Run the full test suite** once after integrating all changes.
4. **Report to the user:**

```
## Parallel dispatch results

| Agent | Task | Status | Files changed |
|-------|------|--------|---------------|
| fix-date-parsing | Date parsing bug | Done | src/utils/date.ts |
| fix-avatar-upload | Avatar upload | Done | src/api/upload.ts |
| fix-nav-highlight | Nav highlight | Failed — type error | — |

Conflicts: None
Test suite: All passing (after fixing nav highlight inline)
```

---

## Patterns by use case

### Bug triage — multiple unrelated failures

1. Group failures by file/module
2. One agent per independent failure group
3. Each agent runs the relevant test after fixing
4. Coordinator runs full suite after all complete

### Research — parallel investigation

1. One `Explore` agent per question or subsystem
2. No worktree needed (read-only)
3. Collect findings, synthesize in the main conversation

### Feature implementation — independent layers

1. One agent for DB migration + RLS
2. One agent for API/edge function
3. One agent for frontend component
4. Sequence: DB agent must complete first if others depend on schema

### Code review — parallel file review

1. Split files across agents (each gets a batch)
2. Agents return findings in `[SEVERITY] file:line — issue` format
3. Coordinator deduplicates and ranks

---

## Safety rules

- **Never dispatch agents that modify the same file** without worktree isolation.
- **Never dispatch more than 4 agents at once.** Batch into rounds if needed.
- **Always run the full test suite** after integrating parallel results.
- **If an agent fails, diagnose before re-dispatching.** Don't blindly retry.
- **Agents cannot spawn nested parallel agents.** One level of fan-out only.
- **Use worktree isolation** for any agent that writes code — this prevents filesystem conflicts
  between concurrent agents.

---

## Quick reference

```
Identify tasks → Check independence → Write focused prompts
    → Dispatch all in one message → Collect results
    → Check conflicts → Run full tests → Report
```

Skipped: worker lifecycle management, SQLite coordination, budget ceilings.
Add when: persistent multi-session orchestration is needed beyond single-conversation fan-out.

# Handling Product Changes Mid-Development (reference)

## Handling product changes mid-development (both projects)

When anything changes on the product side — a requirement shifts, a user flow is revised, scope is added or cut — it is fine to update the design direction and frontend first. After the build or design update is done, the PRD and dev architecture must be updated to reflect what was actually built. Documents follow the work, not the other way around.

### Change order

```
Product change (new requirement, scope shift, user flow change)
  │
  ▼
1. Update design direction (this skill — delta run)
   - Re-assess only the affected parts: IA, component tree, state, copy, phases
   - Produce a delta brief (what changed, not a full re-output)
  │
  ▼
2. Update frontend code
   - Build or adjust based on the updated design direction
  │
  ▼
3. Update PRD  ← do this after the build, not before
   - Revise affected user flows, acceptance criteria, scope
   - Mark what was added / removed / changed
  │
  ▼
4. Update dev architecture  ← do this after the build, not before
   - Update data model, API shape, hook list, state plan to reflect what was actually built
   - Flag any breaking changes introduced (renamed endpoints, schema changes)
```

**Steps 3 and 4 are not optional.** If PRD and architecture are not updated after a change, they go stale — future design direction runs will be based on wrong context and produce wrong output.

### What needs updating per change type

| Change | Design direction | Frontend | PRD | Architecture |
|--------|-----------------|----------|-----|-------------|
| New screen / flow added | ✅ delta run | ✅ build | ✅ update | ✅ update |
| Existing flow simplified | ✅ delta run | ✅ update | ✅ update | if data changed ✅ |
| Scope cut (feature removed) | ✅ remove from tree + phases | ✅ remove code | ✅ update | ✅ update |
| Copy / label change only | ✅ copy section only | ✅ update | ✅ update | ❌ not needed |
| Visual / styling change | ✅ visual decisions only | ✅ update | ❌ not needed | ❌ not needed |
| Data model change | ✅ hooks + state plan | ✅ update | ✅ update | ✅ update |

### Delta run — when re-running this skill after a change

Describe what changed when invoking:

> "The [flow / scope / requirement] changed — [describe what]. Re-run design direction for the affected parts."

The skill produces a **delta brief** — only the sections that changed. Evaluate each content section and mark it Added / Changed / Removed / Unchanged:

1. **Change summary** — what shifted on the product side
2. **Design direction delta** — for each section below, state Added / Changed / Removed / Unchanged and describe specifically what changed:
   - Information architecture (routes, nav, guards)
   - Existing component audit (components added, removed, or newly reusable)
   - Component tree (new components, removed components, renamed components)
   - Data & state plan (hooks, query keys, state layer assignments)
   - State matrix (new states, changed empty/error copy)
   - Interaction patterns (new elements, changed states)
   - Copy & content (changed labels, titles, CTAs, error messages)
   - Visual decisions (token changes, breakpoint changes, animation changes)
   - Build phases (phase reassignment, new phases)
3. **Phase impact** — does the change move work between phases or add a new phase?
4. **PRD + architecture update checklist** — bullet list of specific sections to update in each document after the build, naming the exact user flows, acceptance criteria, data model fields, hook names, or endpoint shapes that changed. Do not write "update the PRD" — write "update user flow 3 (report creation) to remove the draft step" or "update the data model to add `reportStatus: 'scheduled' | 'sent' | 'failed'`".

End with: **Design direction updated — ready to continue Phase [N]** and **Update PRD and architecture after this build.**


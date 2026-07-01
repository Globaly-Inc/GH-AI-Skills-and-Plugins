---
name: gh-design-direction
description: Use when a PRD and dev architecture are approved and a feature needs frontend design direction before any component is built, OR when a product change happens mid-development and the design direction needs a delta update before updating the PRD and architecture. Triggers on "design direction", "frontend plan", "component architecture", "how should this look", "UI breakdown", "wireframe this", "what do we build first", "design this feature", "requirement changed", "scope changed", "update design direction", or "product change".
---

# Frontend Design Direction — Globaly

Translate an approved PRD + architecture into a concrete, build-ready design and component plan. Output is something you act on immediately — not a handoff document.

## Step 0 — Ask which project (always, before anything else)

Before producing any output, ask the user exactly this:

> **Which project are you working on?**
> - **1 — GlobalyApp** (public marketplace, business directory)
> - **2 — GlobalyOS** (internal HR and ops platform)
> - **3 — GlobalyPay** (payments and financial platform)

Wait for their answer. Then:

| Answer | Read next |
|--------|-----------|
| GlobalyApp / 1 | `brand-globalyapp.md` in this skill folder |
| GlobalyOS / 2 | `brand-globalyos.md` in this skill folder |
| GlobalyPay / 3 | `brand-globalypay.md` in this skill folder |

**Read the full brand file before doing anything else.** It contains the real color tokens, layout shells, animation rules, route guards, and key hooks for that project. Do not proceed, guess, or use the other project's tokens without reading it first.

Confirm to the user which brand was loaded before moving to inputs.

## Reference files — read on demand (do NOT read all upfront)

This skill keeps standards in reference files so they load only when the step needs them. Read the relevant one when you reach that step:

| File | Read when |
|------|-----------|
| `references/design-system.md` | choosing tokens, typography, icons, components, or visual rules (Step 7) |
| `references/engineering-standards.md` | folder structure, shared stack, state management, TS/React conventions, performance, a11y, forms, testing, breakpoints (Steps 1, 3, 8) |
| `references/ux-and-copy.md` | information architecture, interaction states, copy & content (Steps 5, 6 + IA) |
| `references/change-management.md` | a product change came mid-development (delta run) |
| `references/common-mistakes.md` | final self-check before handing off |

Plus the **brand file** from Step 0 (project-specific tokens, shells, animation, guards).

## Inputs required before proceeding

Do not produce output if any of these are missing — ask first:

1. **PRD summary** — feature purpose, target user, key flows
2. **Dev architecture** — data model, API shape, React Query hooks needed
3. **Route context** — which portal/section this feature lives in
4. **Scope** — MVP vs. full, known edge cases
5. **Existing feature folder?** — does `src/features/<feature>/` already exist?
   - **Yes** → audit every file in it (components, hooks, store, routes, types) before proposing anything new. List what exists, what can be extended, and what is missing — do not propose new files that duplicate existing ones.
   - **No** → scaffold the full feature folder structure (template in `references/engineering-standards.md`).

> **Mid-development product change?** Skip the full process — do a **delta run** per `references/change-management.md`.

## Process

### 1. Existing component audit
- Check `src/components/ui/` for shared primitives to reuse; check `src/features/<feature>/components/` if the folder exists (audit every file before proposing new ones). Folder/primitive lists are in `references/engineering-standards.md`.
- Reference the brand file for project-specific custom UI components.

### 2. Component tree
Map the feature to a build-ready tree; name every component before writing code.

```
<LayoutShell>                         ← from brand file — pick the right one
  <FeaturePageName>                   ← src/features/<feature>/pages/
    <FeatureShell>
      <FeatureHeader />
      <FeatureContent>
        <PrimaryComponent />          ← state: loading | empty | error | filled
        <PrimaryComponent.skeleton />
        <SupportingComponent />
```
For each NEW component: file at `src/features/<feature>/components/ComponentName.tsx` + co-located `.skeleton.tsx`; props = only what it needs (no drilling > 2 levels); `cva` if 2+ visual variants.

### 3. Data & state plan
- Which React Query hook fetches each data slice; hook file `src/features/<feature>/hooks/useFeatureName.ts`.
- Forms: zod schema + `useForm` + `zodResolver`.
- Which state layer handles each piece of UI state — use the state-layer decision flowchart in `references/engineering-standards.md`.

### 4. State matrix (required — no component ships without this)
Fill for every new component (build sequence: props → skeleton → empty → error → filled):

| Component | Loading | Empty | Error | Filled |
|-----------|---------|-------|-------|--------|
| `Name` | `<Name.skeleton />` | [prompt + action] | [message + retry] | [happy path] |

Skeletons match the filled layout shape; empty states need a next action (not "No data"); error states need retry/recovery.

### 5. Interaction patterns (per new interactive element)
Fill hover / focus / active / disabled / loading for every NEW interactive element using the table in `references/ux-and-copy.md`. No cell left blank.

### 6. Copy & content (required — final before Phase 0)
Define all copy using `references/ux-and-copy.md`: page title, primary CTA, empty-state headline + subtext + CTA, error messages, success toasts, delete confirmations. No placeholder text.

### 7. Visual decisions (per new component)
Per NEW component, decide: surface token, typography, responsive breakpoint change, animation, dark mode, accessibility — tokens/classes in `references/design-system.md` and the brand file.

### 8. Responsive decisions (per new component)
Use the breakpoint table in `references/engineering-standards.md`; decide which breakpoint changes the layout and what changes.

### 9. Phased build order

| Phase | Ships | Must include | Exit criteria |
|-------|-------|-------------|---------------|
| 0 — Shell | Route + layout + empty states | All copy final; empty/error states with correct text | Renders at its route with no data; no placeholder copy |
| 1 — Core flow | Happy-path components + React Query hooks | ARIA + keyboard nav on all interactive elements; tests for components added | Primary action works end-to-end |
| 2 — States | Loading skeletons + error states | Tests for hook loading/error branches | No raw spinners or blank crashes |
| 3 — Polish | Responsive, dark mode, a11y pass, animations | Full test coverage | Passes on mobile + `.dark`, WCAG AA met |

## Output format

Produce exactly these sections:

1. **Project confirmed** — which brand file was loaded
2. **Information architecture** — entry point, route map, nav placement, guards (see `references/ux-and-copy.md`)
3. **Existing component audit** — shared primitives, brand-file custom components, feature components reused as-is
4. **New component tree** — full hierarchy with file paths
5. **Data & state plan** — hooks, schemas, state layer per slice
6. **State matrix** — loading/empty/error/filled per new component
7. **Interaction patterns** — hover/focus/active/disabled/loading per interactive element
8. **Copy & content** — titles, CTAs, empty/error/success/confirmation copy
9. **Visual decisions** — token, breakpoint, animation, dark mode, a11y per component
10. **Build phases** — component → phase assignment
11. **Blockers** — anything unresolved before Phase 0 can start

End with: **Ready to build Phase 0** or **Blocked on: [specific item]**.

## Before you finish
Run through `references/common-mistakes.md` and fix any that apply.

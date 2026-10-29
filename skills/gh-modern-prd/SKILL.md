---
name: gh-modern-prd
description: Use when the user asks for a PRD, product plan, feature plan or proposal with UI mockups, user flows, design options or implementation status for GlobalyOS (or a "plan page like the Learn plan"), or asks to update the status of such a plan as work ships. Audits the existing app, researches the market, then asks the founder the decisions as multiple-choice questions before drawing. Invoked as /gh-modern-prd. For a plain Markdown PRD file use gh-prd-generator instead.
---

# GH Modern PRD

## Overview
One local bundle of HTML pages, generated from four data files, so the founder can read the audit, market scan and decisions, check every screen and flow, and see live build status in one place. Pages render on the **real GlobalyOS shell** (index.css tokens, 3D rail icons, 64px header, 200px submenu), never a generic wireframe.

| Page | Built from | Shows |
|---|---|---|
| `plan.html` | `prd.js` (required) | hero + decisions + bet, PRD sections, screen thumbnails, flow lanes, build plan with status |
| `index.html` | `screens.js` | every screen full-size, tagged NEW / CHANGED |
| `flows.html` | `flows.js` | each journey as scaled steps; click to zoom |
| `options.html` | `options.js` | design alternatives for one screen + comparison |

## Workflow
1. **Audit what already exists, before any screen.** For each part of the feature, find whether the app already does it (pages, menus, filters and saved views, settings, tables, APIs, background jobs). Write an "Already in the app" table: part · exists today? · where · extend or new. A new page or builder needs a reason why the existing one can't carry it.
2. **Market research.** Look at 4 to 6 products that do this well (direct competitors plus the best-in-class tool for the job). For each: how they solve it, how they package and price it, the pattern worth copying, and what they miss. Use WebSearch (`extended` for pricing and recent launches); for a large feature use the `market-research` skill. Cite a source for every claim. Write a "Market scan" table and a one-line "our angle" (what we do that they don't, usually because GlobalyOS already has the contacts, inbox, events and so on).
3. **Ask the decisions as multiple-choice questions, one at a time.** Turn every open choice from steps 1 and 2 into a question. Ask each one alone with `AskUserQuestion` and wait for the answer before asking the next.
   - 2 to 4 options. The recommended one comes first, labelled "(Recommended)". Each option's description says what it means for the user, what it costs to build, and which audit or market finding it comes from ("extends CRM saved filters", "how HubSpot does it").
   - Where the existing feature overlaps, the options are ways to extend it (a field, a tab, a step), not a second copy.
   - A question about UI: draw the options first (`options.js`, labelled 1A, 1B…; `prd.js` needs only `DOC` at this point), build them as in steps 6 and 7, open the page, then ask the question pointing at those labels.
   - Order: scope (extend or new) → who uses it and permissions → main flow and UI → limits, plans and pricing → rollout. Usually 5 to 12 questions. Stop when no open choice would change a screen.
   - A later answer can reopen an earlier one; say so and re-ask that one.
   - Record every answer in `DOC.decisions` as `['Q3: <picked option>', '<why, in one line>']`. Copy an "Other" answer word for word. Don't draw the final screens until the answers that shape them are in.
4. **Read before drawing.** Find the real menu (`apps/web/src/components/layout/sidebarRegistry.ts`), the pages that exist today, and the shell (`Layout.tsx`, `AppSidebar.tsx`). Tag each screen NEW or CHANGED against origin/main. Full-screen routes (`withLayout={false}`) are drawn without the shell.
5. **Read the actual UI, then draw it.** Mockups copy the real screens, so the build can follow them.
   - **CHANGED screen:** find its route (`apps/web/src/App.tsx` and the module's route file), open the page component and the children it renders, and copy what is really there: tabs, filters, column headers, button labels and order, empty and loading states, dialogs. Draw only the delta as new. Never invent a column or a button the page doesn't have.
   - **NEW screen:** build it only from blocks the app already has (the reuse table in `apps/web/CLAUDE.md` plus the shared blocks in the root `CLAUDE.md`: `PageHeader`, `DataTable`, `ColumnPicker`, `BulkActionBar`, `EmptyState`, `ListSkeleton`, `ConfirmDialog`, `Sheet`, `Tabs`). If the screen needs something no component gives, say so in its notes as a new component.
   - When the dev server or prod is reachable, screenshot the live page and compare it with the mockup. Never open Events scanner or camera pages in Playwright (it streams the real webcam).
   - **Make every screen build-ready.** Its notes carry these keys, so the implementation plan can point each task at a screen (`index.html#<id>`) and the implementer reads `screens.js` as the spec:
     `Source` (files read today, files to change) · `Build` (components and hooks to reuse) · `Data` (endpoint, query-key factory, `usePagedList` or bootstrap) · `Perf` · `Security`. What goes in the last two is in REFERENCE.md, "Build-ready notes".
6. **Write the data files** in `~/GlobalyHub/ai-outputs/plans/<YYYY-MM-DD>-<topic>/data/`. Copy the shape from `example/marketing/` (a complete, real bundle):
   - `prd.js`: `DOC` (brand, module rail id, status, title, lead, links, decisions, bet), `STATUS` (phases → tasks `[text, todo|doing|review|done|live|blocked, note]`), `SECTIONS` (typed blocks below).
   - `screens.js`: `add(group, id, title, where, 'NEW'|'CHANGED', html, notes)`. Draw with `mod(moduleId, activeItem, body, opts)` (real submenus) or `app({...})`, plus `ph()`, `kpi()`, `browser()`, `ic()`.
   - `flows.js`: `X.<id>=…` for in-between steps, then `const F=[[group,id,title,who,goal,[[screenId,caption,alt?],…]],…]`.
   - `options.js`: `opt(id,title,tag,html,notes)` per alternative, then `const OPT={title,eyebrow,intro,cmp:[[row…]],pick}`.
   **REQUIRED:** read `REFERENCE.md` (helper signatures and defaults, every CSS class, data contracts, NEW vs CHANGED) before writing screens.
7. **Build, check, look:**
   `git -C <GlobalyOS-V2 checkout> fetch origin main`
   `python3 <skill>/scripts/build.py <data_dir> <bundle_dir> --repo <GlobalyOS-V2 checkout> --check --shot`
   `<skill>` is wherever this SKILL.md lives: `<checkout>/.claude/skills/gh-modern-prd` (in the repo), `~/.claude/skills/gh-modern-prd` (global copy) or the `globaly-skills` plugin folder.
   Fix until every page prints `ok`, then open `_shots/*.png` and fix what looks wrong; `--check` can't see layout bugs.
8. **Hand over** the `file://` path to `plan.html`. Never publish an Artifact.
9. **Status updates:** edit `STATUS` in `prd.js` (task state + PR number in the note, `updated` date) and rebuild. The roll-up, progress bars and badges recompute.

## SECTIONS block types
Each section is `{id, title, nav?, intro?, blocks:[…]}`.

`status`, `build`, `screens` (auto from data) · `table {head,rows,title?,note?}` · `cards {cols,items:[{title,text|list}]}` · `pillars {items:[{title,text,fields}]}` · `matrix {corner,cols,rows}` (2 = included, 1 = limited, 0 = none, or text) · `lanes {items:[[id,title,steps,aiIdx[],extIdx[]]]}` (lane id = flow id) · `services {items:[{title,tag,text|list}]}` · `risks {items:[{title,text,mitigation}]}` · `html {html}`.

Usual order: status, problem, existing (the audit table), market (the market scan), goals, users, ai, features, flows, screens, architecture, build, risks.

## Common mistakes
- Questions asked in a batch, or screens drawn before the answers that shape them.
- A market claim with no source.
- A screen drawn inside the app shell when the real route is full-screen.
- A CHANGED screen drawn from memory instead of from its page component: labels, columns and tabs drift from the real app.
- A screen with no `Build`/`Data` notes: it can't be handed to implementation.
- An apostrophe inside a single-quoted JS string: escape it (`\'`) or `--check` fails.
- Raw hex or palette classes inside screen chrome: use the token classes from `base.css`. Content that is truly brand colour (an email body, a social post) may use hex.
- Copy that uses em-dashes or jargon: write plain sentences.

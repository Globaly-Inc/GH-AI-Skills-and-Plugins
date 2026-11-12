# gh-modern-prd reference

All helpers live in `assets/shell.js`; all classes in `assets/base.css`. The data files are concatenated in this order and share one scope: `prd.js` → `screens.js` → `flows.js` → `options.js`. Later files can call helpers defined in earlier ones; for example `flows.js` can reuse a function defined in `screens.js`.

## Drawing a screen

| Helper | Use |
|---|---|
| `mod(id, on, body, {flush, overlay, proj, wallet})` | Any module with its **real** submenu from `MENUS` (support, crm, work, calls, agents, hr, accounting, marketing, settings). `on` = the active submenu label. Modules with no submenu (home, chat, cal, events, files, automations) render rail + content. |
| `app({mod, label, items, on, proj=true, wallet=true, body, flush=false, overlay})` | Low level. `proj` shows the project switcher, `wallet` the Marketing credits box (both default **on**: turn them off outside Marketing). `flush:true` removes the content padding, for three-pane layouts (inbox, editors, canvases). |
| `setApp(on, body, overlay)` | Settings module shortcut. |
| `fullScreen(body, overlay)` | A full-screen route (`withLayout={false}`, such as editors): no header, rail or submenu. |
| `ph(title, subtitle, actionsHtml)` | PageHeader. |
| `kpi(label, value, delta)` | Stat card. |
| `browser(url, innerHtml)` | A page outside the app (public pages, Stripe, Gmail, a provider's consent screen). |
| `mob(id, html, why?)` | The phone view of screen `id`, shown beside it on index.html. `html` = `mobile(...)`; pass `null` + `why` for a desktop-only screen. Required for every screen (`--check`). |
| `mobile(body, {nav=true, on, head, h=760})` | A 390px phone frame. `nav` adds the app's MobileBottomNav (Home, CRM, My Tasks, Chat, Profile) with `on` active; set `nav:false` for public pages and full-screen routes. `head` is usually `mHead(title, actions, back)`. Body padding is 12px 16px. |
| `mHead(title, actionsHtml, back)` | Mobile page header (the app hides PageHeader chrome on phones). |
| `ic(name, attrs)` | Inline lucide-style icon. Names: see `const P` in shell.js. Add a path there if one is missing; don't substitute a wrong icon. |
| `AIBTN` | The ✦ AI button. |

Submenu item shape: `[iconName, label, badge?]` (badge such as `'NEW'`). Add a module to `MENUS` when it's missing, copying the labels from `sidebarRegistry.ts`.

**Overlays:** pass `overlay` as `<div class="ov"><div class="dlg">…</div></div>` (dialog) or `<div class="aisheet">…</div>` (right AI sheet).

## Classes (base.css)

| Area | Classes |
|---|---|
| Layout | `card`, `g2` `g3` `g4` `g5` (grids), `sp` (spacer), `tc` + `table.t` (`.n` numeric cell) |
| Text | `muted`, `small`, `mono`, `grp` (mono eyebrow), `hint` |
| Status | `chip` + `ok` `warn` `bad` `info` `ai`; `dot` + `ok` `warn` `bad` `mu`; `banner` + `ok` `warn` `bad` `info` |
| Controls | `btn` + `p` (primary) `g` (ghost) `ai` `d` (danger) `sm`; `in` (input look), `fld` + `label`; `tabs` (pill tabs, `span.on`); `ul` (underline tabs); `tg` / `tg.off` (toggle); `cb` / `cb.on` (checkbox) |
| Dialogs | `ov` › `dlg` › `dlg-h` / `dlg-b` / `dlg-f`; `steps` (wizard: `span.on` / `span.done`) |
| AI | `aisheet` (`h`, `log`, `ft`), `msg me` / `msg ai`, `cs` (change-set, `.row b`), `chips` |
| Misc | `bar` (+ `ok`/`warn`/`bad`, inner `i` width %), `check` (+ `dot`), `slash` (insert menu: direct children are rows, `.on` = highlighted), `cal`/`dh`/`dc`/`post` (calendar), `node`/`vline`/`flowcol` (automation canvas), `net` + `fb ig li tk xx wa` (network badges), `toast` (flows only), `phone`/`bubble` |

Tokens: `hsl(var(--background|foreground|card|primary|primary-fg|primary-light|muted|muted-fg|accent|border|success|warning|destructive|info|chart-4))`.

## Data contracts

- **DOC:** `brand`, `module` (rail id, used for the 3D icon), `status: [label, ok|warn|info|bad|ai]`, `date`, `title`, `lead`, `links: [[text, href, primary|ghost|'']]`, `decisions: [[bold, text]]`, `bet: [statement, footnote]`, and optionally `screensLead` and `footer`.
- **STATUS:** `updated`, `phases: [{id, name, when, exit, tasks: [[text, state, note]]}]`. States, in delivery order:
  - `todo` (Not started) · `doing` (In progress) · `review` (In review: a PR is open)
  - `done` (Done: finished work that is not code, e.g. research, a decision, an owner sign-off)
  - `merged` (Merged: the PR is in main) · `staging` (On staging: CD deployed it) · `live` (Live: promoted to production)
  - `blocked` (Blocked: put the blocker and who owns it in `note`, e.g. `owner: GitHub settings`)

  `done`, `merged`, `staging` and `live` count as finished in the progress bars. An unknown state renders its own name in amber instead of breaking the page.
- **Task notes for code tasks** carry the delivery facts, in this order: `PR #n` · base branch if not main · `review: N findings fixed` · `suite P pass / F fail at <sha>` (the full suite on the PR's final commit) · `merged <merge sha>` · `CI ✓` / `CD (staging) <state>` · `prod <date>`. Write what you checked, not what you expect; if a check was skipped or failed, say so.
- **lanes:** `[id, title, steps[], aiIdx[], extIdx[]]`. `aiIdx`/`extIdx` are arrays of step indexes (dashed = AI proposes; grey = outside the product). `id` must match a flow id in `flows.js` (`'F7'` ↔ `'f7'`): boxes link to `flows.html#f7`.
- **services:** `{title, tag, text}` or `{title, tag, list:[…]}`.
- **flows.js:** each step id resolves to `X[id]` first, then to a screen id from `screens.js`. An unknown id throws "missing screen".

## Delivery log section

Once code ships, add a section `{id:'delivery', title:'Delivery log: GitHub and CI/CD', nav:'Delivery', …}` before `build`. It has one `table` with these columns: `PR` (linked) · `Change` · `Base` · `Review` · `Full suite (final commit)` · `State` (open / merged <sha> · CI · CD · prod). Below it, a `cards` block for migrations (numbers and order), the deploy path (how main reaches staging and production, and which flags stay dark in production) and any incidents during the build. Refresh it with every status update, using `gh pr view`, `gh pr checks` and `gh run list`.

## Tagging

- **NEW:** the route or page doesn't exist on origin/main.
- **CHANGED:** an existing page gets new parts. This includes a page whose backend exists but whose UI doesn't yet; say which in the notes.

## Build notes

- `--repo <checkout>` reads `origin/main`; run `git fetch origin main` first.
- `--check` only catches JS errors and empty pages. Always add `--shot` and look at `_shots/*.png`.
- The pages load Google Fonts. That's fine for local plan files; the app's no-Google-Fonts rule is about the product, not these documents.

## Build-ready notes

Every screen's `notes` carry `Source`, `Build`, `Data`, `Perf` and `Security`, so the screen can go straight into an implementation task. Keep each to a line or two and name real files. The rules come from the root and `apps/web` `CLAUDE.md`; pick the ones the screen touches, don't paste all of them.

```js
add('Contacts','c2','Saved filter chips','CRM › Contacts','CHANGED',html,{
  Source:'pages/crm/ContactsPage.tsx (today) · add components/crm/FilterChips.tsx',
  Build:'PageHeader, DataTable, ColumnPicker, BulkActionBar; ConfirmDialog for delete',
  Data:'GET /api/crm/contacts (keyset, usePagedList) · reuse the key the page already uses, no second one · filters as server params',
  Perf:'filter/sort in SQL, not the browser · Edit dialog mounts with useHasOpened',
  Security:'withUser (RLS) · zod on params · ILIKE escaped',
});
```

**Perf** (pick what applies)
- Lists: keyset pages via `usePagedList` (100 per page), never OFFSET or "load all". Search, filter and sort run in SQL.
- One request wave per page load: if the screen needs several reference sets, a bootstrap endpoint seeds the caches (`useTasksBootstrap`).
- Query keys from `lib/queryKeys.ts`, holding only what the server call depends on. Scope on the client with `select`.
- Dialogs, sheets and rarely used tabs don't fetch until opened (`useHasOpened`, `enabled: open`). New routes and heavy libs (editors, charts, maps) load lazily (`lazyWithRetry`).
- Long boards and lists grow on scroll (`useIncrementalList`). Images use `loading="lazy"`, WebP in `<picture>`, and a storage path signed at render time (`useApiSignedUrl`).
- Lucide icons as named imports only. Loading state is `ListSkeleton`, not a spinner.

**Security** (pick what applies)
- Tenant data goes through `withUser` (RLS). A new table gets `organization_id`, RLS and `is_org_member` policies.
- zod on params, query, body and response at the route. Escape `%`/`_` in ILIKE. Response enums over unchecked columns use `.catch()` or `z.string()`.
- Who can see or do it: membership and roles via `lib/membership.ts`. Draw the screen as each role sees it when that differs.
- User or third-party HTML renders only through `lib/sanitizeHtml.ts`. CSV export through `lib/exportCsv.ts` (formula injection).
- Public pages rate-limit (`enforceRateLimit`) and show no internal ids. Signed upload URLs carry a size cap. Destructive actions use `ConfirmDialog`.
- Outbound calls never run inside a `withUser` transaction. Slow work goes to `job_outbox`, shown in the UI as a pending state.

## Mobile views
`example/marketing` predates mobile views, so its `screens.js` has no `mob(...)` calls and `--check` reports them as missing. Copy its data shape, not that gap. `example`-style app screens on phones: `mobile(body,{on:"CRM",head:mHead("Contacts")})`; public pages: `mobile(body,{nav:false,head:siteHeaderHtml})`.

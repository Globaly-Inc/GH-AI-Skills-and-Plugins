# Brand — GlobalyApp

**Project:** GlobalyApp — public-facing business directory and marketplace  
**Repo path:** `globalyhub/GlobalyApp`  
**Stack note:** No framer-motion — animations are CSS utility classes defined in `src/index.css`  
**Global state:** MobX (`mobx` + `mobx-react-lite`) — install with `npm i mobx mobx-react-lite` if not present

---

## Color tokens

| Token | Light | Dark | Use |
|-------|-------|------|-----|
| `--primary` | `hsl(0 63% 31%)` — `#7F1D1D` | `hsl(0 70% 50%)` | CTAs, links, active nav |
| `--primary-foreground` | `hsl(0 0% 100%)` | `hsl(0 0% 100%)` | Text on primary bg |
| `--secondary` | `hsl(0 30% 96%)` | `hsl(222 30% 18%)` | Chips, tag backgrounds |
| `--secondary-foreground` | `hsl(0 63% 31%)` | `hsl(270 40% 98%)` | Text on secondary |
| `--accent` | `hsl(0 86% 80%)` | `hsl(222 30% 22%)` | Soft highlights |
| `--gold` | `hsl(38 92% 50%)` | — | Badges, pricing, editorial accent |
| `--navy` | `hsl(222 47% 11%)` | `hsl(222 47% 6%)` | Sidebar, footer, dark surfaces |
| `--purple-dark` | `hsl(0 63% 20%)` | — | Hero section backgrounds |
| `--purple-deep` | `hsl(0 63% 14%)` | — | Deep hero / full-bleed sections |
| `--muted` | `hsl(210 17% 96%)` | `hsl(222 30% 18%)` | Disabled/inactive areas |
| `--muted-foreground` | `hsl(215 16% 47%)` | `hsl(240 5% 60%)` | Secondary/hint text |
| `--destructive` | `hsl(0 84% 60%)` | `hsl(0 62% 30%)` | Errors, delete actions |
| `--border` | `hsl(215 16% 90%)` | `hsl(222 30% 22%)` | Dividers, input borders |
| `--background` | `hsl(0 0% 100%)` | `hsl(222 47% 8%)` | Page background |
| `--card` | `hsl(0 0% 100%)` | `hsl(222 47% 11%)` | Card backgrounds |
| `--ring` | `hsl(0 63% 31%)` | `hsl(0 70% 50%)` | Focus rings |

**Dark mode:** `darkMode: ["class"]` — toggled via `class="dark"` on `<html>`.  
**Never hardcode hex values.** Always reference the token name.

---

## Typography

| Class | Font | Use |
|-------|------|-----|
| `font-serif` | `Libre Baskerville` | **Headings and editorial pull-quotes only** |
| `font-sans` | System sans-serif | All body copy, labels, nav, UI text |

Never use `font-serif` for body copy, form labels, navigation items, or button text.

---

## Spacing & radius

- Tailwind scale only: `gap-4`, `p-6`, `mt-8` — no arbitrary values unless unavoidable
- `rounded-lg` = `var(--radius)` = `0.625rem`
- `rounded-md` = `calc(var(--radius) - 2px)`
- `rounded-sm` = `calc(var(--radius) - 4px)`
- Container: `container mx-auto`, padding `2rem`, max-width `1280px` (`2xl`)

---

## Animation

No framer-motion. Use these CSS utility classes from `src/index.css`:

| Class | Effect |
|-------|--------|
| `.reveal` | Scroll-triggered fade-in (wired by `useScrollAnimation`) |
| `.card-hover` | Subtle lift on hover |
| `.highlight-text` | Text highlight animation (verify in `src/index.css` — add if missing) |
| `.gradient-text` | Animated gradient on text (verify in `src/index.css` — add if missing) |
| `.float-anim` | Gentle floating loop |

Before using a class, confirm it exists in `src/index.css`. If a needed animation isn't there, add it to `src/index.css` — do not use inline styles or introduce framer-motion.

Tailwind keyframes available: `accordion-down`, `accordion-up` (from `tailwindcss-animate`).

Keep entrance transitions ≤ 300ms. Exit transitions ≤ 200ms.

---

## Layout shells

Layouts live in `src/components/layout/`. Do not create a new layout — flag as a blocker if none fits.

| Layout | Route pattern | Internals |
|--------|--------------|-----------|
| `PublicLayout` | `/`, `/for-*`, `/blog`, `/search`, `/business/*` (public) | `Navbar` + `Footer` — no padding on `<main>`, each section owns its width |
| `PersonalLayout` | `/personal/*` | Navbar (portalMode) + `PortalGroupSubNav` + `MobileBottomNav` + `MobileNavDrawer`; `<main>` gets `px-3 sm:px-4 md:px-6 py-4 md:py-6 pb-24 md:pb-6` |
| `BusinessLayout` | `/business/*` (auth'd) | Same internals as PersonalLayout — use for pages requiring a business membership (manage listings, services, team). Portal sub-nav reflects the business context. |
| `AdminLayout` | `/admin/*` | Admin-only shell |

**Portal layout internals — already handled, do not re-implement in page components:**
- `MobileBottomNav` (5-tab fixed bottom bar) — owned by the layout
- `MobileNavDrawer` (sheet overlay) — owned by the layout
- `AICounselorWidget` — lazy-loaded inside Business and Personal layouts
- `pb-24 md:pb-6` — already on `<main>` inside the layout; **never add this in a page component**

---

## Feature folder structure (GlobalyApp)

Every new feature lives in `src/features/<feature-name>/`. Do not add components or pages to the old flat structure (`src/components/<name>/`, `src/pages/<name>/`) — that is legacy. New features use this layout:

```
src/features/
  business-directory/
    components/
      BusinessCard.tsx
      BusinessCard.skeleton.tsx
      BusinessGrid.tsx
      BusinessFilters.tsx
      __tests__/
        BusinessCard.test.tsx
    pages/
      BusinessListPage.tsx
      BusinessDetailPage.tsx
    store/
      businessStore.ts          ← MobX observable store
    routes/
      businessRoutes.tsx        ← lazy imports + route definitions
    hooks/
      useBusinessDirectory.ts   ← React Query hooks for this feature
      __tests__/
        useBusinessDirectory.test.ts
    types/
      index.ts
    index.ts                    ← public API (export only what other features need)
```

**`index.ts` public API example:**
```ts
// src/features/business-directory/index.ts
export type { Business, BusinessFilters } from './types'
export { BusinessCard } from './components/BusinessCard'
// Do NOT export: store internals, page components, route definitions, or hooks
// Those are consumed via their own import paths, not through this public API
```

Only export what another feature actually imports. If nothing crosses the boundary, leave `index.ts` empty or with a comment.

Repeat this structure for every feature: `ai-counselor/`, `jobs/`, `student/`, `mara/`, `visas/`, etc.

---

## MobX store conventions (GlobalyApp)

GlobalyApp uses **MobX** (`mobx` + `mobx-react-lite`) for global UI state within a feature.

Install: `npm i mobx mobx-react-lite`

### Store file pattern

```ts
// src/features/business-directory/store/businessStore.ts
import { makeAutoObservable } from 'mobx'

class BusinessStore {
  selectedBusinessId: string | null = null
  isFilterPanelOpen = false
  activeFilters: Record<string, string[]> = {}

  constructor() {
    makeAutoObservable(this)
  }

  selectBusiness(id: string | null) {
    this.selectedBusinessId = id
  }

  toggleFilterPanel() {
    this.isFilterPanelOpen = !this.isFilterPanelOpen
  }

  setFilters(filters: Record<string, string[]>) {
    this.activeFilters = filters
  }

  clearFilters() {
    this.activeFilters = {}
  }
}

export const businessStore = new BusinessStore()
```

### Consuming in components

```tsx
// Always wrap the component in observer() from mobx-react-lite
import { observer } from 'mobx-react-lite'
import { businessStore } from '../store/businessStore'

export const BusinessFilters = observer(function BusinessFilters() {
  return (
    <div>
      {businessStore.isFilterPanelOpen && <FilterPanel />}
      <button onClick={() => businessStore.toggleFilterPanel()}>Filters</button>
    </div>
  )
})
```

### MobX rules

- **`makeAutoObservable(this)`** in the constructor — no manual `observable`, `action`, `computed` decorators needed
- **`observer()`** from `mobx-react-lite` on every component that reads from a store — not `React.memo`
- **One store per feature** — `businessStore.ts`, `jobsStore.ts`, `studentStore.ts`
- **Stores hold UI state only** — never cache server/API data (that's React Query's job)
- **No single root store** — do not create one God-object that merges all feature stores. Each feature owns its own isolated store instance (`businessStore`, `jobsStore`). The module-level export (`export const businessStore = new BusinessStore()`) is intentional — it is a feature-scoped singleton, not a global root store. Cross-feature state is rare and should go through React Query or URL params instead.
- **Do not use MobX for server state** — always React Query for anything from Supabase or an API
- **Export the store instance**, not the class: `export const businessStore = new BusinessStore()`

---

## Route registration

New features define their routes in `src/features/<feature>/routes/featureRoutes.tsx` (see SKILL.md routes/ file pattern). Register in `src/App.tsx` by importing and spreading the routes array:

```tsx
// src/App.tsx — registering a new feature's routes
import { businessRoutes } from './features/business-directory/routes/businessRoutes'

// Inside AppRoutes, spread under the correct path segment with the appropriate guard:
{businessRoutes.map(route => (
  <Route
    key={route.path}
    path={route.path}
    element={<BusinessRoute>{route.element}</BusinessRoute>}
  />
))}
```

Route guards:
- Public: no guard
- `/personal/*`: `<ProtectedRoute>` — auth + onboarding completion check
- `/business/*`: `<BusinessRoute>` — auth + business membership + role check
- `/admin/*`: `<AdminRoute>` — auth + `isSuperAdmin` / `isDataAdmin`

**`lazyWithRetry()`** — a thin wrapper around `React.lazy()` that retries the dynamic import up to 3 times on network failure before throwing. It is defined in `src/lib/lazyWithRetry.ts`. Use it in `featureRoutes.tsx` instead of plain `lazy()` for resilience on flaky connections:

```tsx
import { lazyWithRetry } from '@/lib/lazyWithRetry'
const MyPage = lazyWithRetry(() => import('../pages/MyPage'))
```

---

## Key hooks (check before writing new ones)

| Hook | Provides |
|------|---------|
| `useAuth` | `user`, `loading`, `isSuperAdmin`, `isDataAdmin` |
| `useBusinessMembership` | `activeBusiness`, `activeMembership.role`, `memberships` |
| `use-mobile` | `isMobile` boolean |
| `useScrollAnimation` | Wires `.reveal` CSS class toggling on scroll |
| `useDebouncedValue` | Debounced value for search inputs |
| `useUniversalFilter` | Multi-facet filter state |
| `useSubscriptionAccess` | Feature gate by subscription plan |
| `use-toast` | Fire Sonner toasts |

---

## Project-specific custom UI components

Located in `src/components/ui/` alongside shadcn primitives:

`address-autocomplete` · `country-selector` · `db-city-selector` · `dynamic-form-field` · `dynamic-icon` · `page-header` · `phone-input` · `searchable-select` · `service-name-autocomplete` · `social-icons` · `stat-rail`

Check these before building anything with similar functionality.

---

## SEO (GlobalyApp — public pages only)

GlobalyApp is publicly indexed. For every public-facing page (`PublicLayout`), design direction must include a head metadata plan:

| Element | Requirement |
|---------|-------------|
| `<title>` | Unique per page — `[Page name] · Globaly` format |
| `<meta name="description">` | 150–160 chars, includes the primary keyword |
| `<meta property="og:*">` | Open Graph for social shares (title, description, image) |
| Canonical URL | `<link rel="canonical">` on pages with query-string variants |
| JSON-LD | `Organization` schema on homepage; `LocalBusiness` on business detail pages |

Use the existing `SeoHead` component (check `src/components/common/SeoHead.tsx` or `src/components/ui/`) before building new meta solutions. If it doesn't exist, flag as a blocker and create it.

Portal pages (`PersonalLayout`, `BusinessLayout`) are auth-gated and do not need SEO treatment.

---

## Sidebar token reference

| Token | Value |
|-------|-------|
| `--sidebar-background` | `hsl(222 47% 11%)` (navy) |
| `--sidebar-foreground` | `hsl(240 5% 85%)` |
| `--sidebar-primary` | `hsl(0 63% 45%)` |
| `--sidebar-accent` | `hsl(222 30% 18%)` |
| `--sidebar-border` | `hsl(222 30% 18%)` |

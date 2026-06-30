# Engineering Standards (reference)

## Shared stack (both projects)

| Layer | Choice |
|-------|--------|
| Framework | React + Vite, TypeScript |
| Routing | React Router v6 (`BrowserRouter`) |
| Styling | Tailwind CSS v3, CSS variables, no prefix |
| Components | shadcn/ui (`style: default`, `baseColor: slate`) |
| Server state | TanStack React Query |
| Backend / DB | Supabase (Postgres + Auth + Storage + Realtime) |
| Forms | react-hook-form + zod |
| Icons | lucide-react only |
| Toasts | sonner |
| Class merging | `cn()` from `@/lib/utils` (clsx + tailwind-merge) |
| Variants | `cva` from `class-variance-authority` |

Animation library and global state library differ per project — see brand file.


## Folder conventions (both projects)

Every new feature gets its own self-contained folder under `src/features/`. Nothing spills into top-level `src/components/` or `src/pages/`.

### Feature folder structure

```
src/
  features/
    <feature-name>/           # lowercase, hyphenated (e.g. business-directory, ask-ai)
      components/             # UI components for this feature only
        FeatureName.tsx
        FeatureName.skeleton.tsx   # co-located skeleton — always alongside the component
        SubComponent.tsx
        __tests__/            # component tests co-located here
          FeatureName.test.tsx
      pages/                  # route-level page components for this feature
        FeatureListPage.tsx
        FeatureDetailPage.tsx
      store/                  # state management for this feature
        featureStore.ts       # GlobalyApp: MobX  |  GlobalyOS: Zustand
      routes/                 # route definitions — registers routes in App.tsx
        featureRoutes.tsx
      hooks/                  # React Query hooks + feature-specific data hooks
        useFeatureName.ts
        __tests__/
          useFeatureName.test.ts
      types/                  # TypeScript types scoped to this feature
        index.ts
      constants/              # static data used only by this feature
        index.ts
      index.ts                # public API — only export what other features need
  components/
    ui/                       # shadcn primitives + shared custom primitives ONLY
    common/                   # truly shared components used across multiple features
      Navbar.tsx
      Footer.tsx
      ErrorBoundary.tsx
  hooks/                      # truly shared hooks used across multiple features
  types/                      # shared global types
  constants/                  # static data used across features
  lib/                        # utilities (cn, formatters, etc.)
```

### Naming rules

| Thing | Convention | Example |
|-------|-----------|---------|
| Feature folder | lowercase, hyphenated | `business-directory/`, `ai-counselor/` |
| Component file | PascalCase | `BusinessCard.tsx` |
| Skeleton file | PascalCase + `.skeleton` | `BusinessCard.skeleton.tsx` |
| Page file | PascalCase + `Page` suffix | `BusinessListPage.tsx` |
| Store file | camelCase + `Store` suffix | `businessStore.ts` |
| Routes file | camelCase + `Routes` suffix | `businessRoutes.tsx` |
| Hook file | camelCase, `use` prefix | `useBusinessDirectory.ts` |
| Types file | `index.ts` inside `types/` | — |
| Public API | `index.ts` at feature root | exports only what other features import |

### Rules

- **One feature = one folder.** Everything for that feature lives inside it — no exceptions.
- **Nothing crosses feature boundaries directly.** Features import from each other via `featureName/index.ts` only, never deep imports (`features/business/components/BusinessCard` → use `features/business` instead).
- **`src/components/ui/` is for shared primitives only** — never put feature-specific components there.
- **`src/components/common/` is for layout shells and truly shared UI** (Navbar, Footer, ErrorBoundary) — not feature UI.
- **Existing code** (`src/components/business/`, `src/pages/business/` etc.) migrates to `src/features/business-directory/` as features are touched — do not migrate wholesale, migrate on contact.

### routes/ file pattern (both projects)

```tsx
// src/features/business-directory/routes/businessRoutes.tsx
import { lazy, Suspense } from 'react'
import { PageSkeleton } from '@/components/common/PageSkeleton'

const BusinessListPage = lazy(() => import('../pages/BusinessListPage'))
const BusinessDetailPage = lazy(() => import('../pages/BusinessDetailPage'))

export const businessRoutes = [
  { path: '/business', element: <Suspense fallback={<PageSkeleton />}><BusinessListPage /></Suspense> },
  { path: '/business/:id', element: <Suspense fallback={<PageSkeleton />}><BusinessDetailPage /></Suspense> },
]
// Registered in src/App.tsx — do not define routes inline in App.tsx for new features
```

---

## Shared UI primitives (both projects)

Before declaring a component "new", check if it exists in `src/components/ui/`:

**Forms & inputs:** `checkbox` · `form` · `input` · `label` · `radio-group` · `select` · `slider` · `switch` · `textarea`

**Layout & structure:** `aspect-ratio` · `card` · `collapsible` · `scroll-area` · `separator` · `sidebar`

**Navigation:** `breadcrumb` · `navigation-menu` · `pagination` · `tabs`

**Overlays & feedback:** `alert` · `alert-dialog` · `dialog` · `drawer` · `popover` · `sheet` · `tooltip`

**Data display:** `badge` · `calendar` · `carousel` · `chart` · `data-table` · `progress` · `skeleton` · `table`

**Actions:** `accordion` · `button` · `dropdown-menu`

If shadcn/ui has a component not listed, add it: `npx shadcn add <component>`

## State management architecture (both projects)

There are four layers of state. Use the right layer — never the wrong one.

```
┌──────────────────────────────────────────────────────────────────────────┐
│  Layer           │  GlobalyApp              │  GlobalyOS                 │
├──────────────────────────────────────────────────────────────────────────┤
│  Server state    │  TanStack React Query    │  TanStack React Query      │
│  Global UI state │  MobX store              │  Zustand store             │
│  Shared UI state │  React Context           │  React Context             │
│  Local UI state  │  useState / useReducer   │  useState / useReducer     │
│  URL state       │  useSearchParams         │  useSearchParams           │
└──────────────────────────────────────────────────────────────────────────┘
```

Store file location: `src/features/<feature>/store/featureStore.ts`

### Layer rules

**Server state → React Query (always)**
- All data that comes from an API or Supabase lives in a `useQuery` / `useMutation` — never in `useState`
- Hooks live in `src/features/<feature>/hooks/useFeatureName.ts`
- Use query key factories (see Performance section)
- `staleTime` tuned per data type
- Mutations always invalidate affected query keys on `onSuccess`

**Global UI state → MobX (GlobalyApp) / Zustand (GlobalyOS)**
- For cross-component, cross-route UI state that is NOT server data
- Store file lives inside the feature: `src/features/<feature>/store/featureStore.ts`
- See brand file for the exact pattern and conventions per project

**Shared UI state → React Context**
- For auth session, org context, timezone, feature flags, portal auth — already provided by existing provider hooks (`useAuth`, `useOrganization`, `useFeatureFlags`, `useTimezone`)
- Do not create a new Context unless the existing providers don't cover the case — flag as a blocker if unsure

**Local UI state → useState / useReducer**
- Accordion open/close, modal visibility, form step, hover — anything that resets when the component unmounts
- `useReducer` when a component has 3+ related state values that change together
- Never store server data here

**URL state → useSearchParams**
- Filters, search queries, pagination, selected tab — any state that should be shareable via URL or survive a page refresh without a store
- Use for all filterable list pages: `?status=active&page=2`
- Read with `useSearchParams()` from react-router-dom

### Decision flowchart

```
Is the data from an API or database?
  YES → React Query (useQuery / useMutation in features/<name>/hooks/)
  NO  → Is it already provided by an existing Context hook?
          (useAuth, useOrganization, useFeatureFlags, useTimezone, usePortalAuth)
          YES → Use that hook — do not duplicate in a store or useState
          NO  → Is it needed across multiple components or routes?
                  YES → GlobalyApp: MobX store in features/<name>/store/
                        GlobalyOS:  Zustand store in features/<name>/store/
                  NO  → Should it survive a refresh or be shareable via URL?
                          YES → useSearchParams
                          NO  → useState (or useReducer if 3+ related values)
```

---

## TypeScript & component conventions (both projects)

- **No `any`** — use `unknown` + type narrowing, or define the actual type
- **No `React.FC`** — use explicit named functions with return types: `function MyComponent(props: MyComponentProps): JSX.Element`
- **Named exports only** — `export function MyComponent` not `export default`. Exception: page-level route components (`export default function MyPage`)
- **Props interface** — named `<ComponentName>Props`, always exported
- **Boolean props** — prefix with `is` or `has`: `isLoading`, `isDisabled`, `hasError`
- **Event handlers** — prefix with `on`: `onSelect`, `onDelete`, `onClose` (not raw `onClick`)
- **Discriminated union for state variants** — never `isLoading: boolean; data?: T; error?: Error` separately:
  ```ts
  type State<T> =
    | { status: 'loading' }
    | { status: 'error'; error: string }
    | { status: 'success'; data: T }
  ```
- **`satisfies` operator** for config/token objects — better inference than `as`
- **`ComponentPropsWithoutRef<'div'>`** when extending a native HTML element's props
- **`forwardRef`** on all primitive UI components that wrap a DOM element
- **`key` prop** — never use array index for dynamic lists that can reorder or delete
- **API / Supabase error typing** — never type errors as `any`. For React Query errors use a typed error parameter: `useQuery<MyData, ApiError>(...)` where `ApiError = { message: string; status: number; code?: string }`. Supabase errors are `PostgrestError` — import from `@supabase/supabase-js`. Narrow with `instanceof` or a type guard before accessing fields.

---

## React patterns (both projects)

- **Container / Presenter split** — data-fetching and UI are separate. A component either fetches or renders, not both. Hook owns the query; component receives the data as props.
- **One component per file** — no co-exporting multiple components from one file (except the co-located skeleton)
- **`index.ts`** for folder re-exports (never `index.tsx` with JSX)
- **`React.memo`** — only on components receiving object/array props from a parent that re-renders frequently. Not a default.
- **`useMemo`** — only for computations that are O(n²)+ or transform arrays > 1000 items
- **`useCallback`** — only for functions passed to a memoized child component
- **Avoid inline object/array literals in JSX props** — creates a new reference every render, breaks memo
- **Virtualize lists > 100 items** — use TanStack Virtual (`@tanstack/react-virtual`). Confirm it is installed (`npm ls @tanstack/react-virtual`) before using; add it if missing.
- **`startTransition` / `useDeferredValue`** for non-critical UI updates that block input
- **Optimistic updates** — apply mutation immediately, roll back on error with a toast via sonner

---

## Performance (both projects)

- **`transition-colors`**, **`transition-opacity`**, **`transition-transform`** — use these explicitly. Never `transition-all` (causes layout/paint jank on unrelated properties)
- **Images** — WebP format, `loading="lazy"`, explicit `width` + `height` to prevent layout shift
- **4px base unit, 8px meaningful increment** — Tailwind spacing maps to 4px units (`p-1` = 4px, `p-2` = 8px, `p-4` = 16px, `p-6` = 24px, `p-8` = 32px). Prefer multiples of 2 (`p-2`, `p-4`, `p-6`, `p-8`) for meaningful spacing; use odd steps only for fine-tuning.
- **Query `staleTime`** — tune per data type: user profile = 5 min, feed/list = 30s, static config = Infinity
- **Query key factories** — centralize per feature:
  ```ts
  export const myFeatureKeys = {
    all: ['myFeature'] as const,
    list: (filters: Record<string, unknown>) => [...myFeatureKeys.all, 'list', filters] as const,
    detail: (id: string) => [...myFeatureKeys.all, 'detail', id] as const,
  }
  ```
- **Prefetch on hover** for predictable navigations (list item → detail page)
- **Mutations** — always `onSuccess: () => queryClient.invalidateQueries(myFeatureKeys.all)`

### Performance budget targets

| Metric | Target |
|--------|--------|
| LCP (Largest Contentful Paint) | ≤ 2.5s on 4G mobile |
| CLS (Cumulative Layout Shift) | < 0.1 |
| INP (Interaction to Next Paint) | < 200ms |
| JS bundle (initial route, gzipped) | < 150 kB |
| JS bundle (lazy feature chunk, gzipped) | < 80 kB |

Check bundle size with `npx vite-bundle-visualizer` after each significant addition.

---

## Accessibility (a11y) — WCAG 2.1 AA (both projects)

**Contrast minimums:**
- Normal text: 4.5:1
- Large text (18px+ or 14px bold): 3:1
- UI components and icons: 3:1

**Rules:**
- All images: `alt` text. Decorative images: `alt=""`
- All form inputs: `<label htmlFor>` or `aria-label` — never unlabeled
- Icon-only buttons: always `aria-label`
- Color alone never conveys meaning — pair with text or icon
- `aria-live="polite"` on regions that update dynamically (loading → loaded, count changes)
- `aria-describedby` linking error messages to their input field
- `aria-required="true"` on required fields + visual indicator
- Focus management: modal/drawer open → focus first interactive element; close → return focus to trigger
- Keyboard: all interactive elements reachable via Tab in logical order

---

## Form standards (both projects)

- Validate **on blur first**, then on change after the first submission attempt
- Error messages: below the field, `role="alert"`, linked via `aria-describedby`
- Required fields: `aria-required="true"` + visual marker (asterisk or label suffix)
- Submit button: disabled + loading indicator during submission — never allow double-submit
- On success: either clear the form OR navigate away — never leave stale submitted data
- zod schema defined at the top of the feature hook file (`src/features/<feature>/hooks/useFeatureName.ts`) — not inline in `useForm` and not in the component file

---

## Component build order (within a single component)

Always build in this sequence — never skip ahead to filled state:

1. Define `ComponentNameProps` interface + discriminated state type
2. Write `ComponentName.skeleton.tsx` (layout-preserving, same height/columns as filled)
3. Write the **empty state** (with a next action — not just "No data")
4. Write the **error state** (with retry or recovery path)
5. Write the **filled / happy-path** last
6. Add `React.memo` only if the component receives object/array props from a frequently re-rendering parent

**Error boundary placement:** Wrap the route-level page component AND each major feature section in an `ErrorBoundary` from `src/components/common/ErrorBoundary.tsx`. This is a resilience requirement, not an a11y one.

---

## Testing standards (both projects)

Testing library: **Vitest + React Testing Library**. Files co-located in `__tests__/` inside the relevant folder.

| Test type | Location | What to cover |
|-----------|----------|---------------|
| Component | `features/<f>/components/__tests__/` | Renders filled/empty/error state; key user interactions |
| Hook | `features/<f>/hooks/__tests__/` | Return values, loading/error states, React Query integration |
| Utility | `src/lib/__tests__/` | Pure function correctness |

**Rules:**
- Query by role/label/text (`getByRole`, `getByLabelText`) — not by test ID unless no semantic alternative exists
- Mock at the network boundary (MSW or `vi.mock` on the React Query hook) — never mock the component's own logic
- Each component test covers: loading skeleton renders, empty state renders (with CTA), error state renders (with retry), filled state renders with realistic data
- Do not test implementation details (internal state, class names, hook internals)
- Filename: `ComponentName.test.tsx` for components, `useHookName.test.ts` for hooks


## Breakpoints (both projects)

Mobile-first always. Start with the smallest layout and layer up.

| Breakpoint | px | Common use |
|------------|-----|-----------|
| `sm:` | 640px | Compact mobile tweaks |
| `md:` | 768px | Most layout shifts (stack → side-by-side) |
| `lg:` | 1024px | Sidebar appears, content expands |
| `xl:` | 1280px | Max container width (2xl cap) |


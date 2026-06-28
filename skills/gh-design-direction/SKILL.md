---
name: frontend-design
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

---

## Globaly Design System

**Version:** 2.1 — source: `Style Guide.fig` (Figma) · `colors_and_type.css` · `_ds_bundle.js`

The design system is a shared component library bundled as `_ds_bundle.js` and exposed at `window.GlobalyDesignSystem_c92b6a`. It is brand-aware: setting `data-brand` on a root element switches all tokens.

```html
<!-- No attribute = Globalyapp (maroon) -->
<body data-brand="globalyos">…</body>   <!-- purple -->
<body data-brand="globalypay">…</body>  <!-- blue -->
```

**Usage:**
```html
<link rel="stylesheet" href="colors_and_type.css">
<script src="_ds_bundle.js"></script>
<script>
  const { Button, Badge, Input, Modal } = window.GlobalyDesignSystem_c92b6a;
</script>
```

### Design tokens

Always use semantic tokens — never hardcode hex or hsl values.

**Brand semantic tokens (swap per `data-brand`):**

| Token | Globalyapp | GlobalyOS | GlobalyPay |
|-------|-----------|-----------|------------|
| `--brand-primary-default` | `#7F1D1D` | `#6820E4` | `#2563EB` |
| `--brand-primary-hover` | `#6B1818` | `#5618BF` | `#1D4ED8` |
| `--brand-primary-active` | `#B91C1C` | `#461699` | `#1E40AF` |
| `--brand-primary-subtle` | `#FEE2E2` | `#E6D8FF` | `#DBEAFE` |
| `--brand-primary-foreground` | `#FFFFFF` | `#FFFFFF` | `#FFFFFF` |
| `--brand-secondary-default` | `#1E293B` | `#1E293B` | `#1E293B` |
| `--brand-accent-default` | `#C51918` | `#7A32EA` | `#2563EB` |

**Surface & background:**

| Token | Value | Usage |
|-------|-------|-------|
| `--surface-page` | `#F8FAFC` | Page background |
| `--surface-panel` | `#F1F5F9` | Sidebar, section bg |
| `--surface-card` | `#FFFFFF` | Card surfaces |
| `--surface-overlay` | `rgba(15,23,42,0.5)` | Modal/drawer backdrop |

**Foreground / text:**

| Token | Value | Usage |
|-------|-------|-------|
| `--fg-display` | `#0F172A` | Headlines, display text |
| `--fg-primary` | `#1E293B` | Main body text |
| `--fg-secondary` | `#475569` | Secondary body text |
| `--fg-muted` | `#64748B` | Labels, descriptions |
| `--fg-subtle` | `#94A3B8` | Placeholders, hints |
| `--fg-disabled` | `#CBD5E1` | Disabled state text |
| `--fg-inverse` | `#FFFFFF` | Text on dark surfaces |
| `--fg-brand` | brand-specific | Brand-colored text (swaps per mode) |

**Border:**

| Token | Value | Usage |
|-------|-------|-------|
| `--border-default` | `#E2E8F0` | Default borders, dividers |
| `--border-strong` | `#CBD5E1` | Emphasized borders |
| `--border-focus` | brand-specific | Active input ring (swaps per brand) |
| `--border-error` | `#DC2626` | Error state |
| `--border-success` | `#16A34A` | Success state |

**Semantic state colors:**

| State | Bg | Border | Text |
|-------|----|--------|------|
| Error | `#FEE2E2` | `#DC2626` | `#991B1B` |
| Success | `#DCFCE7` | `#16A34A` | `#15803D` |
| Warning | `#FEF3C7` | `#D97706` | `#92400E` |
| Info | `#DBEAFE` | `#2563EB` | `#1E40AF` |

**Spacing** — base unit 4px, 34-step scale: `--space-1` (4px) → `--space-96` (384px). Prefer `--space-2` (8px), `--space-4` (16px), `--space-6` (24px), `--space-8` (32px) for meaningful increments.

**Border radius:**

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-default` | 4px | Buttons (xs/sm) |
| `--radius-lg` | 8px | Buttons (xl), inputs |
| `--radius-xl` | 12px | Cards, panels |
| `--radius-full` | 9999px | Avatars, badges, chips |

**Shadows:**

| Token | Usage |
|-------|-------|
| `--shadow-sm` | Cards (subtle) |
| `--shadow-default` | Cards (default) |
| `--shadow-md` | Dropdowns |
| `--shadow-lg` | Modals |

### Typography

**Font families:**

| Token | Stack | Usage |
|-------|-------|-------|
| `--font-sans` | Plus Jakarta Sans, DM Sans | Body, labels, buttons, headings |
| `--font-ui` | Inter | Data tables, docs, metadata, captions |
| `--font-label` | Averta Std*, DM Sans | Sidebar labels, nav text |
| `--font-mono` | JetBrains Mono, Fira Code | Code |

> Averta Std is a commercial typeface — request font files from design. DM Sans is the active fallback.

**Semantic typography classes:**

| Class | Size / Weight | Color token |
|-------|--------------|-------------|
| `.t-display-2xl` | 72px bold, −0.02em | `--fg-display` |
| `.t-display-xl` | 60px bold, −0.02em | `--fg-display` |
| `.t-display-lg` | 48px bold, −0.01em | `--fg-display` |
| `.t-h1` | 36px bold | `--fg-display` |
| `.t-h2` | 30px bold | `--fg-display` |
| `.t-h3` | 24px semibold | `--fg-display` |
| `.t-h4` | 20px semibold | `--fg-primary` |
| `.t-h5` | 18px semibold | `--fg-primary` |
| `.t-body-lg` | 16px regular | `--fg-primary` |
| `.t-body` | 14px regular | `--fg-secondary` |
| `.t-body-sm` | 12px regular | `--fg-muted` |
| `.t-label` | 14px medium | `--fg-primary` |
| `.t-label-sm` | 12px medium | `--fg-muted` |
| `.t-caption` | 12px regular (Inter) | `--fg-subtle` |
| `.t-overline` | 10px bold, 0.08em, uppercase (Inter) | `--fg-subtle` |
| `.t-code` | 14px regular (JetBrains Mono) | `--fg-primary` |

Use these semantic classes for typography — do not compose size + weight + color manually when a class covers it.

### Iconography

**Style:** Stroke/outline SVGs — no icon font, no emoji in UI components.

| Style | Size | Usage |
|-------|------|-------|
| `Icon/Outline/*` | 24px default, 16px compact | Navigation, actions, form adornments |
| `Icon/Solid/*` | 24px | Arrows, chevrons, CTAs |

Most-used icons: `frame`, `arrow-sm-right`, `close-small`, `x`, `check`, `arrow-right` (solid), `chevron-down-small`, `3-dots`, `diagonals-tlbr`, `arrows-update`.

> The proprietary Globaly SVG set lives in Figma. Use **Lucide Icons** (`lucide-react`) as a stand-in — matches stroke weight and style closely. Request SVG exports from the design team for production use.

### Component library (40 components, 6 groups)

Check for a design system component before reaching for shadcn or building custom.

**Actions:** `Button` · `IconButton`

```ts
// Button
variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'subtle'
size?:    'xs' | 'sm' | 'md' | 'lg' | 'xl'
icon?:    ReactNode   // leading
iconRight?: ReactNode // trailing
disabled?: boolean
```

**Data display:** `Badge` · `StatusBadge` · `Tag` · `Chip` · `Avatar` · `AvatarGroup` · `Card` · `StatCard` · `SectionHeader` · `Table`

```ts
// Badge
variant?: 'red' | 'green' | 'blue' | 'yellow' | 'slate' | 'purple' | 'orange'
size?:    'xs' | 'sm'
dot?:     boolean

// StatusBadge — color derived automatically
status: 'Active' | 'Pending' | 'In Review' | 'Rejected' | 'Draft'

// Avatar
name?: string; src?: string
size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number
status?: 'online' | 'away' | 'offline' | 'busy'
```

Card surface rule: `#FFFFFF` bg · `1px solid --border-default` · `--radius-xl` · 16–24px padding · `--shadow-sm` or `--shadow-default`.

**Forms:** `Input` · `Textarea` · `Field` · `SearchInput` · `Select` · `Combobox` · `Checkbox` · `Radio` · `RadioGroup` · `Switch` · `Datepicker` · `AuthCode`

```ts
// Input
state?:        'default' | 'active' | 'error' | 'success'
size?:         'sm' | 'md' | 'lg' | 'xl'
leadingIcon?:  ReactNode
trailingIcon?: ReactNode

// Field — wraps any control with label/hint/error
label?:   string; hint?: string; error?: string; required?: boolean
```

**Feedback:** `Alert` · `Toast` · `Snackbar` · `Tooltip` · `ProgressBar` · `Spinner`

```ts
// Alert
variant: 'info' | 'success' | 'warning' | 'error'
title?:  string; onDismiss?: () => void
```

**Navigation:** `Tabs` · `Breadcrumb` · `Pagination` · `SegmentedControl`

**Overlays:** `Modal` · `Drawer` · `Dropdown` · `Popover` · `Accordion`

**Media:** `Carousel`

### Visual rules (design system)

- **Light-first.** No dark mode in the design system bundle. White cards on `#F8FAFC`/`#F1F5F9` backgrounds.
- **No gradients** on page or card backgrounds. Flat, clean surfaces only.
- **No full-bleed imagery, textures, or hand-drawn illustrations** in UI components.
- **Hover:** slightly darker fill (not opacity). **Active/press:** darker still — no scale transform. **Focus:** border changes to `--border-focus`.
- **Transitions:** ~150–200ms ease, subtle. Never `transition-all`.

> Note: The React app brand files (see project brand files below) extend these rules with project-specific dark mode and animation support. The design system bundle itself is light-mode only.

---

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

---

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

---

## Inputs required before proceeding

Do not produce output if any of these are missing — ask first:

1. **PRD summary** — feature purpose, target user, key flows
2. **Dev architecture** — data model, API shape, React Query hooks needed
3. **Route context** — which portal/section this feature lives in
4. **Scope** — MVP vs. full, known edge cases
5. **Existing feature folder?** — does `src/features/<feature>/` already exist?
   - **Yes** → audit every file in it (components, hooks, store, routes, types) before proposing anything new. List what exists, what can be extended, and what is missing — do not propose new files that duplicate existing ones.
   - **No** → scaffold the full feature folder structure from the template in the Folder conventions section.

---

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

---

## Information architecture (both projects)

Before any component is named, map where the feature sits in the product:

- **Entry point** — how does the user reach this feature? (nav item, button, link, redirect, deep link)
- **Route** — what is the full URL path? (e.g. `/business/my-feature` or `/org/:orgCode/my-feature`)
- **Placement in nav** — does it appear in the top nav, sidebar, sub-nav, or bottom tab bar? Which item is active?
- **Exit points** — where can the user go from here? (back, breadcrumb, next step, cancel)
- **Related routes** — list page → detail page → edit page — map all routes in the flow, not just the primary one
- **Deep link behaviour** — if someone lands directly on a sub-route (e.g. `/org/:orgCode/my-feature/:id`), does it work without parent context? If not, add a redirect.
- **Guards** — which route guard applies? (from brand file — `OrgProtectedRoute`, `BusinessRoute`, etc.)

Output this as a simple flow:

```
[Entry: sidebar nav item "Feature Name"]
  → /route/list          ListPage
    → /route/:id         DetailPage
      → /route/:id/edit  EditPage
    ← back / breadcrumb
```

---

## Interaction patterns (both projects)

Define how each interactive element behaves across all states. Do not leave any state undefined.

### Per element type

| Element | Hover | Focus | Active/Pressed | Disabled | Loading |
|---------|-------|-------|---------------|----------|---------|
| Primary button | `bg-primary/90` | `ring-2 ring-ring ring-offset-2` | `scale-[0.98]` | `opacity-50 cursor-not-allowed aria-disabled` | spinner left of label + `disabled` |
| Secondary button | `bg-secondary/80` | `ring-2 ring-ring` | `scale-[0.98]` | `opacity-50 cursor-not-allowed` | — |
| Card (clickable) | `shadow-md -translate-y-0.5 transition-transform` | `ring-2 ring-ring` | `scale-[0.99]` | — | skeleton |
| Input field | `border-primary/50` | `border-primary ring-1 ring-primary` | — | `bg-muted opacity-60` | — |
| Link | `underline` | `ring-2 ring-ring` | `opacity-80` | — | — |
| Icon button | `bg-muted` | `ring-2 ring-ring` | `bg-muted/80` | `opacity-40 aria-disabled` | — |
| Destructive action | `bg-destructive/90` | `ring-2 ring-destructive` | `scale-[0.98]` | `opacity-50` | spinner |

Adapt this table for each NEW interactive component in the feature — never leave a state blank.

> **Note:** `ring-ring` resolves to the project's brand focus color — deep red in GlobalyApp, violet in GlobalyOS. The class name is identical; the visual result differs per project. Do not override this token.

### Interaction rules

- **Hover**: only on devices that support it — wrap hover styles in `@media (hover: hover)` or use Tailwind's `hover:` (applies only on hover-capable devices in Tailwind v3+)
- **Focus**: always `focus-visible:` not `focus:` — avoids outlines on mouse click
- **Disabled**: always `aria-disabled="true"` + visual dim — never `pointer-events-none` alone
- **Loading on actions**: disable the trigger element while the mutation is in flight — prevents double-submit
- **Transitions**: `transition-colors duration-150`, `transition-transform duration-150` — never `transition-all`
- **Confirmation for destructive actions**: always require a second confirmation (dialog or inline confirm) before delete/remove/cancel operations

---

## Copy & content direction (both projects)

Content is part of the design. Define it before building, not after.

### Tone by project

| Project | Voice | Avoid |
|---------|-------|-------|
| **GlobalyApp** | Editorial, confident, warm — speaks to business owners and students discovering opportunities | Jargon, overly technical terms, corporate coldness |
| **GlobalyOS** | Direct, efficient, professional — speaks to team members and admins managing work | Filler words, vague labels, passive voice |

### Required copy for every feature

Define these before Phase 0:

| Copy element | What to write | Example |
|-------------|--------------|---------|
| **Page / section title** | Short noun phrase, 2–4 words | GlobalyApp: "Find Your Opportunity", "Top Businesses Near You" — GlobalyOS: "Scheduled Reports", "Team Attendance" |
| **Primary CTA label** | Verb + object, specific | "Add Service", "Send Invite" — not "Submit" or "OK" |
| **Empty state headline** | Friendly, explains why it's empty | "No reports yet" |
| **Empty state subtext** | What to do next, one sentence | "Create your first report to track team performance." |
| **Empty state CTA** | Same verb as the primary CTA | "Create Report" |
| **Error message** | What went wrong + what to do | "Couldn't load reports. Check your connection and try again." |
| **Delete confirmation** | Name what's being deleted | "Delete 'Q4 Report'? This can't be undone." |
| **Success toast** | Past tense, specific | "Report created", "Invite sent" — not "Success!" |
| **Loading label** (if visible) | Present progressive | "Loading reports…" |

### Copy rules

- **Labels**: sentence case (`Add service`, not `Add Service` except for proper nouns)
- **Buttons**: title case (`Add Service`, `Send Invite`)
- **Error messages**: always say what failed AND what to do — never just "Something went wrong"
- **Empty states**: never "No data found" or "No results" — write for the specific context
- **Placeholders**: describe the expected input, not the field name (`e.g. john@company.com`, not `Email`)
- **Confirmation dialogs**: name the specific item being affected — never generic ("Are you sure?")

---

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

---

## Breakpoints (both projects)

Mobile-first always. Start with the smallest layout and layer up.

| Breakpoint | px | Common use |
|------------|-----|-----------|
| `sm:` | 640px | Compact mobile tweaks |
| `md:` | 768px | Most layout shifts (stack → side-by-side) |
| `lg:` | 1024px | Sidebar appears, content expands |
| `xl:` | 1280px | Max container width (2xl cap) |

---

## Process

### 1. Existing component audit
- Check `src/components/ui/` for shared primitives to reuse
- Check `src/features/<feature>/components/` — if the feature folder already exists, audit every file in it before proposing anything new
- Reference the brand file for project-specific custom UI components

### 2. Component tree
Map the feature to a build-ready tree. Name every component before writing any code.

```
<LayoutShell>                         ← from brand file — pick the right one
  <FeaturePageName>                   ← src/features/<feature>/pages/
    <FeatureShell>                    ← top-level feature container
      <FeatureHeader />
      <FeatureContent>
        <PrimaryComponent />          ← state: loading | empty | error | filled
        <PrimaryComponent.skeleton />
        <SupportingComponent />
```

For each NEW component:
- **File:** `src/features/<feature>/components/ComponentName.tsx`
- **Skeleton:** `src/features/<feature>/components/ComponentName.skeleton.tsx`
- **Props:** only what it needs — no prop drilling > 2 levels
- **Variants:** use `cva` if 2+ visual variants

### 3. Data & state plan
- Which React Query hook fetches each data slice (`useExistingHook` or `useNewHookName`)
- Hook file: `src/features/<feature>/hooks/useFeatureName.ts`
- For forms: zod schema + `useForm` + `zodResolver` + `<FormMessage />` for inline errors
- Which state layer handles each piece of UI state (MobX / Zustand / useState / useSearchParams) — reference state management decision flowchart

### 4. State matrix (required — no component ships without this)

Fill this for every new component. Cross-reference with Component build order above — props → skeleton → empty → error → filled is the build sequence; this table is the design specification.

| Component | Loading | Empty | Error | Filled |
|-----------|---------|-------|-------|--------|
| `Name` | `<Name.skeleton />` | [prompt + action] | [message + retry] | [happy path] |

- Skeletons must match the filled layout shape (same height, same column count)
- Empty states need a next action, not "No data"
- Error states need a retry or recovery path

### 5. Interaction patterns (per new interactive element)

For every NEW interactive element in this feature, fill in hover / focus / active / disabled / loading using the Interaction patterns reference table. Do not leave any cell blank.

### 6. Copy & content (required — must be final before Phase 0 starts)

Define all copy for this feature using the Copy & content direction reference: page title, primary CTA, empty-state headline + subtext + CTA, error messages, success toasts, delete confirmations. No placeholder text ("Lorem ipsum", "TBD", "Coming soon") allowed.

### 7. Visual decisions (per new component)
Answer for each NEW component:
- **Surface token** — which background token? (see brand file)
- **Typography** — which elements use `font-serif`? (headings only per project rule)
- **Responsive** — which breakpoint changes the layout (`md:` / `lg:`)? What changes?
- **Animation** — which CSS utility class or Tailwind keyframe? (see brand file)
- **Dark mode** — CSS variable tokens handle dark mode automatically for all standard cases. Only add explicit `dark:` overrides when a value is hardcoded (a hex color, a fixed opacity, a brand illustration tint) and cannot reference a token.
- **Accessibility** — WCAG AA minimum: 4.5:1 text contrast, 3:1 UI components, keyboard nav, ARIA roles

### 8. Responsive decisions (per new component)

Use the breakpoint reference table — see **Breakpoints** section. For each new component, decide which breakpoint changes the layout and what changes (stack → side-by-side, column count, visibility).

### 9. Phased build order

| Phase | Ships | Must include | Exit criteria |
|-------|-------|-------------|---------------|
| 0 — Shell | Route + layout + empty states | All copy final; empty/error states with correct text | Feature renders at its route with no data; no placeholder copy |
| 1 — Core flow | Happy-path components + React Query hooks | ARIA roles + keyboard nav on all interactive elements; tests written for components added | Primary user action works end-to-end |
| 2 — States | Loading skeletons + error states | Tests for hook loading/error branches | No raw spinners or blank crashes |
| 3 — Polish | Responsive, dark mode, a11y pass, animations | Full test coverage for components built | Passes on mobile + `.dark`, WCAG AA met |

---

## Output format

Produce exactly these sections:

1. **Project confirmed** — which brand file was loaded
2. **Information architecture** — entry point, route map, nav placement, guards
3. **Existing component audit** — shared primitives, brand-file custom components, and feature components reused as-is
4. **New component tree** — full hierarchy with file paths
5. **Data & state plan** — hooks, schemas, state layer per slice
6. **State matrix** — loading/empty/error/filled per new component
7. **Interaction patterns** — hover/focus/active/disabled/loading per interactive element
8. **Copy & content** — titles, CTAs, empty/error/success/confirmation copy
9. **Visual decisions** — token, breakpoint, animation, dark mode, a11y per component
10. **Build phases** — component → phase assignment
11. **Blockers** — anything unresolved before Phase 0 can start

End with: **Ready to build Phase 0** or **Blocked on: [specific item]**.

---

## Common mistakes (both projects)

| Mistake | Correct approach |
|---------|-----------------|
| Skipping the brand file | Always read it first — tokens, layouts, and hooks differ between projects |
| Putting feature components in `src/components/ui/` | Feature components go in `src/features/<feature>/components/` |
| Building a primitive shadcn already covers | `npx shadcn add <component>` |
| Hardcoding hex or hsl values directly | Use CSS variable token names from the brand file |
| Using `font-serif` on body copy or labels | Serif = headings and editorial pull-quotes only |
| Leaving states as "TBD" | Every state must be concrete before Phase 0 |
| Creating a new layout shell | Use one from the brand file — flag as blocker if none fits |
| Using icons outside lucide-react | lucide-react only |
| Merging classNames with string concatenation | Always `cn()` from `@/lib/utils` |
| Building a form without a zod schema | react-hook-form + zodResolver, always |
| Prop drilling server data > 2 levels | Lift to a React Query hook |
| Skipping a11y until Phase 3 | ARIA roles and keyboard nav belong in Phase 1 with the component |
| Using `any` in TypeScript | Use `unknown` + type narrowing or define the real type |
| Using `React.FC` | Named function with explicit return type: `function Foo(props: FooProps): JSX.Element` |
| Default-exporting a component | Named exports only — except page-level route components |
| Using array index as `key` for dynamic lists | Use a stable unique id from the data |
| `transition-all` for animations | Use `transition-colors`, `transition-opacity`, or `transition-transform` explicitly |
| `:focus` for keyboard outlines | Use `:focus-visible` — avoids outlines on mouse click |
| Disabling with `pointer-events-none` only | Use `aria-disabled` + visual dim so screen readers see the state |
| Inline object/array literals in JSX props | Extract to a variable or `useMemo` — inline literals break `React.memo` |
| Building filled state before skeleton/empty/error | Always: props → skeleton → empty → error → filled |
| Validating only on submit | Validate on blur first, then on change after first submission attempt |
| Leaving form data after success | Clear the form OR navigate — never leave stale submitted data |
| Fetching data inside a UI component | Fetch in a hook; component receives data as props (Container/Presenter) |
| Rendering lists > 100 items without virtualization | Use `@tanstack/react-virtual` |
| Skipping `staleTime` on queries | Tune per data type: user profile = 5min, feed = 30s, static = Infinity |
| Storing server data in `useState` | Server data always goes in React Query (`useQuery`) in `src/features/<feature>/hooks/` |
| Storing server data in a MobX or Zustand store | Stores are for UI state only — never cache API responses in them |
| Using `useState` for filter/search state on a list page | Use `useSearchParams` — makes filters shareable via URL |
| Creating a new React Context for cross-route state in GlobalyOS | Use a Zustand store in `src/features/<feature>/store/` instead |
| Using Zustand in GlobalyApp | GlobalyApp uses MobX — create a store in `src/features/<feature>/store/featureStore.ts` |
| Using MobX in GlobalyOS | GlobalyOS uses Zustand — create a store in `src/features/<feature>/store/featureStore.ts` |
| Adding a component to `src/components/<feature>/` for a new feature | New features go in `src/features/<feature>/components/` — the old flat structure is legacy |
| Defining routes inline in App.tsx for a new feature | New features define routes in `src/features/<feature>/routes/featureRoutes.tsx`, registered in App.tsx |
| Using a component from another feature via a deep import | Import from the feature's `index.ts` public API only — never deep-import across feature boundaries |
| Forgetting `observer()` on a component that reads MobX state | Every component reading from a MobX store must be wrapped in `observer()` from `mobx-react-lite` |
| Skipping information architecture | Map the entry point, route, nav placement, and exit points before naming any component |
| Leaving interaction states undefined | Every interactive element needs hover/focus/active/disabled/loading defined before Phase 1 |
| Writing copy as "TBD" or "Lorem ipsum" | All copy (CTAs, empty states, errors, toasts) must be final before Phase 0 |
| Using generic error messages ("Something went wrong") | State what failed + what the user should do |
| Using generic empty states ("No data found") | Write for the specific context with a next action |
| Using "Submit" or "OK" as button labels | Use verb + object: "Save Report", "Send Invite" |

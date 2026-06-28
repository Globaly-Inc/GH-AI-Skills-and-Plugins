# Brand — GlobalyOS

**Project:** GlobalyOS — internal HR, ops, and AI operating system for organizations  
**Repo path:** `globalyhub/GlobalyOS`  
**Stack note:** PWA + native app (Capacitor) aware — safe-area insets and touch interactions apply

---

## Color tokens

| Token | Light | Dark | Use |
|-------|-------|------|-----|
| `--primary` | `hsl(262 83% 58%)` — `#7C3BEC` | `hsl(262 83% 65%)` | CTAs, links, active nav |
| `--primary-foreground` | `hsl(0 0% 100%)` | `hsl(0 0% 100%)` | Text on primary bg |
| `--primary-light` | `hsl(262 83% 92%)` | `hsl(262 83% 20%)` | Soft primary tints |
| `--primary-dark` | `hsl(262 83% 48%)` | `hsl(262 83% 75%)` | Hover / pressed states |
| `--secondary` | `hsl(270 60% 96%)` | `hsl(270 25% 18%)` | Soft backgrounds, chips |
| `--secondary-foreground` | `hsl(262 83% 48%)` | `hsl(270 40% 98%)` | Text on secondary |
| `--accent` | `hsl(280 85% 60%)` | `hsl(280 85% 60%)` | Secondary highlights, purple-pink |
| `--accent-light` | `hsl(280 100% 95%)` | `hsl(280 85% 20%)` | Soft accent tints |
| `--ai` | `hsl(262 84% 58%)` | `hsl(262 84% 65%)` | **AI feature surfaces** — use `text-ai`, `bg-ai`, `border-ai` utility classes |
| `--success` | `hsl(142 71% 45%)` | `hsl(142 71% 45%)` | Confirmed, approved, check-in |
| `--warning` | `hsl(38 92% 50%)` | `hsl(38 92% 50%)` | Caution, pending states |
| `--muted` | `hsl(270 30% 92%)` | `hsl(270 25% 18%)` | Inactive areas |
| `--muted-foreground` | `hsl(265 20% 40%)` | `hsl(265 20% 65%)` | Secondary/hint text |
| `--destructive` | `hsl(0 84% 60%)` | `hsl(0 63% 50%)` | Errors, delete actions |
| `--border` | `hsl(270 25% 91%)` | `hsl(270 25% 22%)` | Dividers, input borders |
| `--background` | `hsl(270 30% 98%)` | `hsl(270 25% 10%)` | Page background |
| `--card` | `hsl(0 0% 100%)` | `hsl(270 25% 13%)` | Card backgrounds |
| `--ring` | `hsl(262 83% 58%)` | `hsl(262 83% 65%)` | Focus rings |

**Dark mode:** `darkMode: ["class"]` — toggled via `class="dark"` on `<html>`.  
**Never hardcode hex values.** Always reference the token name.

### Gradient tokens

| Token | Value | Use |
|-------|-------|-----|
| `--gradient-primary` | `linear-gradient(135deg, hsl(262 83% 58%) 0%, hsl(280 85% 60%) 100%)` | Hero CTAs, feature banners |
| `--gradient-accent` | `linear-gradient(135deg, hsl(280 85% 60%) 0%, hsl(300 80% 65%) 100%)` | Accent cards, badges |
| `--gradient-subtle` | `linear-gradient(180deg, hsl(270 30% 98%) 0%, hsl(262 83% 98%) 100%)` | Page hero backgrounds |

Apply gradients via a Tailwind arbitrary value — not inline styles (inline styles are for runtime-dynamic values only):
```tsx
// ✅ correct
<div className="bg-[var(--gradient-primary)]">...</div>

// ❌ wrong — static gradient as inline style
<div style={{ background: 'var(--gradient-primary)' }}>...</div>
```

### Shadow tokens

| Token | Use |
|-------|-----|
| `--shadow-sm` | Subtle card lift |
| `--shadow-md` | Modals, dropdowns |
| `--shadow-lg` | Floating panels |
| `--shadow-glow` | AI feature elements — purple glow effect |

### AI utility classes (from `src/index.css`)

```
.text-ai        .bg-ai          .border-ai
.text-ai/80     .bg-ai/10       .bg-ai/20
```

Use these on any AI-powered feature element instead of raw token values.

---

## Typography

| Class | Font | Use |
|-------|------|-----|
| `font-serif` | `Playfair Display` | **Headings, marketing sections, editorial moments** |
| `font-sans` | System sans-serif | All body copy, labels, nav, UI, data tables |

Never use `font-serif` for body copy, form labels, table data, or chat messages.

---

## Spacing & radius

- Tailwind scale only: `gap-4`, `p-6`, `mt-8` — no arbitrary values unless unavoidable
- `rounded-lg` = `var(--radius)` = `0.75rem` (slightly larger than GlobalyApp)
- `rounded-md` = `calc(var(--radius) - 2px)`
- `rounded-sm` = `calc(var(--radius) - 4px)`
- Container: `container mx-auto`, padding `2rem`, max-width `1280px` (`2xl`)

---

## Animation

GlobalyOS has richer animation support defined in `tailwind.config.ts`:

| Tailwind class | Effect |
|----------------|--------|
| `animate-float` | Gentle float loop — 4s ease-in-out (illustration elements) |
| `animate-marquee` | Horizontal scroll — 30s linear (logo strips) |
| `animate-marquee-reverse` | Reverse marquee |
| `animate-gradient-shift` | Background gradient shift — 3s (AI feature cards) |
| `animate-border-rotate` | Rotating border gradient — 3s (active/highlight rings) |
| `animate-float-particle` | Floating particle — 3s (background decoration) |
| `animate-twinkle` | Twinkle pulse — 2s (status dots, AI indicators) |
| `animate-phone-float` | Phone device float — 4s (marketing screenshots) |
| `animate-pulse-dot` | Pulse dot — 1.5s (online presence, typing indicator) |
| `animate-scroll-up` | Vertical text scroll — 5s (ticker elements) |
| `animate-confetti` | Confetti fall — 3s one-shot (KPI celebrations) |
| `animate-accordion-down/up` | shadcn accordion |

Also: `useScrollAnimation` hook wires scroll-triggered reveal.

`--transition-smooth` (`all 0.3s cubic-bezier(0.4, 0, 0.2, 1)`) is available for consistent easing. Apply it via a Tailwind arbitrary value — **not** as an inline style (inline styles are reserved for truly dynamic runtime values):
```tsx
// ✅ correct — Tailwind arbitrary value
<div className="transition-[var(--transition-smooth)]">...</div>

// ✅ also acceptable — explicit Tailwind utilities (preferred)
<div className="transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]">...</div>

// ❌ wrong — inline style for a static value
<div style={{ transition: 'var(--transition-smooth)' }}>...</div>
```

Keep entrance transitions ≤ 300ms. Exit transitions ≤ 200ms. Celebration animations (confetti) are one-shot — not looping.

---

## Layout shells

Do not create a new layout — flag as a blocker if none fits.

| Layout | Route pattern | Notes |
|--------|--------------|-------|
| `Layout` (`src/components/Layout.tsx`) | `/org/:orgCode/*` — all authenticated org pages | Main app shell: `TopNav` + `SubNav` (context-aware) + `MobileBottomNav` + `PullToRefreshIndicator` + `TrialBanner`. Owns `pb-24 md:pb-6` for mobile nav clearance. |
| Public pages | `/home`, `/features`, `/pricing`, `/blog/*`, `/support/*`, etc. | No shell wrapper — each public page controls its own layout |
| `PortalLayout` | `/portal/*` | Client portal — separate auth context (`usePortalAuth`) |
| `AgentLayout` | `/agent/*` | AI agent runner — separate auth (`useAgentAuth`) |
| `SuperAdminLayout` | `/super-admin/*` | Globaly super-admin only |

**Layout internals — already handled, do not re-implement in page components:**
- `TopNav` — top navigation bar
- `SubNav` — context-aware secondary nav (switches between CRM, Inbox, Calls, Accounting, WhatsApp, Settings sub-navs automatically)
- `MobileBottomNav` — fixed bottom tab bar on mobile
- `LayoutDialogs` — global dialog mount point (check-in chooser, etc.)
- `DesktopQuickActions` / `MobileHeaderActions` — action buttons in the nav
- `PullToRefreshIndicator` — PWA pull-to-refresh gesture
- `TrialBanner` — subscription trial countdown
- `pb-24 md:pb-6` on `<main>` — **never add this in a page component**

---

## Route registration

New features define their routes in `src/features/<feature>/routes/featureRoutes.tsx` (see SKILL.md routes/ file pattern). Register in `src/App.tsx` by importing and spreading the routes array under the `/org/:orgCode` block:

```tsx
// src/App.tsx — registering a new feature's routes
import { askAIRoutes } from './features/ask-ai/routes/askAIRoutes'

// Inside the /org/:orgCode Route block — spread with the appropriate guard:
{askAIRoutes.map(route => (
  <Route
    key={route.path}
    path={route.path}
    element={<OrgProtectedRoute>{route.element}</OrgProtectedRoute>}
  />
))}

// With feature flag gate:
{myFeatureRoutes.map(route => (
  <Route
    key={route.path}
    path={route.path}
    element={
      <OrgProtectedRoute>
        <FeatureProtectedRoute feature="my_feature">
          {route.element}
        </FeatureProtectedRoute>
      </OrgProtectedRoute>
    }
  />
))}
```

Route guards:
- `OrgProtectedRoute` — auth + org membership check (most pages)
- `OrgProtectedRoute withLayout={false}` — auth without the Layout shell (onboarding wizards)
- `FeatureProtectedRoute feature="x"` — feature flag gate on top of org auth
- `PortalProtectedRoute` — client portal auth
- `AgentProtectedRoute` — agent runner auth

All org-scoped routes live under `/org/:orgCode/`. The `orgCode` param is always available via `useParams`.

---

## Key hooks (check before writing new ones)

| Hook | Provides |
|------|---------|
| `useAuth` | `user`, `profile`, `loading`, session |
| `useOrganization` | `organization`, `orgCode`, `members` |
| `useCurrentUser` | Current user's employee record |
| `useUserRole` | `role`, `isAdmin`, `isManager`, `isEmployee` |
| `useSuperAdmin` | Super-admin access check |
| `useFeatureFlags` | `isFeatureEnabled(key)` — check before rendering gated UI |
| `useLayoutState` | Sidebar open/close, panel visibility |
| `use-mobile` | `isMobile` boolean |
| `useOrgNavigation` | `navigateOrg(path)` — org-scoped navigation helper |
| `useNativeApp` | `isNative`, Capacitor platform detection |
| `useHapticFeedback` | Trigger haptic on native mobile |
| `usePullToRefresh` | PWA pull-to-refresh state |
| `useScrollAnimation` | Scroll-triggered reveal animation wiring |
| `useUniversalFilter` | Multi-facet filter state |
| `usePersistedFilters` | Filter state persisted to localStorage |
| `useColumnPreferences` | Table column show/hide preferences |
| `useRelativeTime` | Format timestamps as relative ("2 hours ago") |
| `useTimezone` | Org timezone context |
| `useGlobalSearch` | Global spotlight search state |
| `useErrorLogger` | Log caught errors to the error monitoring service — call in `catch` blocks and ErrorBoundary `onError` handlers |

**`useErrorLogger` usage:**
```ts
const { logError } = useErrorLogger()

// In a try/catch:
try {
  await doSomething()
} catch (err) {
  logError(err, { context: 'MyFeature.submit', userId: user?.id })
}

// In an ErrorBoundary onError prop:
<ErrorBoundary onError={(err, info) => logError(err, { componentStack: info.componentStack })}>
```
Call it for unexpected errors only — not for validation errors or expected empty states.

---

## Feature folder structure (GlobalyOS)

Every new feature lives in `src/features/<feature-name>/`. The existing flat structure (`src/components/ask-ai/`, `src/components/accounting/` etc.) is legacy — migrate on contact, not wholesale.

```
src/features/
  ask-ai/
    components/
      AskAIInput.tsx
      AskAIInput.skeleton.tsx
      AskAIMessageBubble.tsx
      AskAIConversation.tsx
      __tests__/
        AskAIInput.test.tsx
    pages/
      AskAIPage.tsx
    store/
      askAIStore.ts             ← Zustand store for this feature
    routes/
      askAIRoutes.tsx           ← lazy imports + route definitions
    hooks/
      useAskAI.ts               ← React Query hooks for this feature
      __tests__/
        useAskAI.test.ts
    types/
      index.ts
    index.ts                    ← public API
```

**`index.ts` public API example:**
```ts
// src/features/ask-ai/index.ts
export type { ChatMessage, ConversationSession } from './types'
export { AskAIConversation } from './components/AskAIConversation'
// Do NOT export: store internals, page components, route definitions, or hooks
```

Only export what another feature actually imports. If nothing crosses the boundary, leave `index.ts` empty.

Repeat for every feature: `attendance/`, `accounting/`, `wiki/`, `inbox/`, `kpi/`, `hiring/`, etc.

---

## Zustand stores (GlobalyOS only)

GlobalyOS uses Zustand for global cross-component UI state that is not server data. Where a store lives depends on its scope — see decision rule in Store file conventions below.

### Existing stores (check before creating a new one)

| Store | File | Manages |
|-------|------|---------|
| `useChatTabsStore` | `chatTabsStore.ts` | Open chat tabs, active tab, tab highlight state — persisted to localStorage |
| `useChatDraftStore` | `chatDraftStore.ts` | Per-conversation message draft state |
| `usePageTitleStore` | `pageTitleStore.ts` | Current page base title (coordinates between `PageTitle` and `useUnreadTitleBadge`) |
| `useToastNotificationStore` | `toastNotificationStore.ts` | Global notification toast queue |

### Store file conventions

```ts
// src/features/<feature-name>/store/featureStore.ts
import { create } from 'zustand'

interface MyFeatureState {
  // state fields
  // action methods
}

export const useMyFeatureStore = create<MyFeatureState>((set, get) => ({
  // initial state + actions
}))
```

- File: `src/features/<feature>/store/featureNameStore.ts` (camelCase, `Store` suffix)
- Export: `useFeatureNameStore` (Zustand `create`, named export)
- Add `persist` middleware only when state must survive a page refresh — use `localStorage` key prefixed with `globalyos-`
- Stores hold UI state only — never cache server data (that's React Query's job)
- **Existing cross-feature stores** in `src/stores/` (`chatTabsStore`, `pageTitleStore`, `chatDraftStore`, `toastNotificationStore`) remain where they are — they predate the feature-slice architecture and are shared across features with no single owner. Do not move them.
- **New feature-scoped stores** go in `src/features/<feature>/store/featureNameStore.ts`. If a store is consumed only by one feature, it belongs in that feature's folder.
- **Decision rule:** if a new store is consumed by more than one feature folder, put it in `src/stores/` and note the cross-feature dependency. If consumed by only one feature, put it in that feature's `store/` folder.
- If a store grows beyond ~150 lines, split it by concern

---

## PWA & native app rules

GlobalyOS runs as a PWA and native app via Capacitor. Additional requirements:

- **Safe areas:** Use `.safe-area-bottom`, `.safe-area-top` utility classes on fixed/sticky elements near device edges — not raw padding.
- **Touch targets:** Minimum 44×44px on all interactive elements.
- **Tap highlight:** `style={{ WebkitTapHighlightColor: 'transparent' }}` or use the global reset already in `index.css`.
- **Scrollbar hiding on mobile:** `.scrollbar-hide` class available for horizontal scroll containers.
- **Overscroll:** `html { overscroll-behavior: none }` is global — do not override per-component.
- **Haptic feedback:** Call `useHapticFeedback` on significant user actions (destructive confirms, form submits) — no-op on web.
- **Push notifications:** Use `usePushNotifications` — do not call Capacitor Push directly in components.

---

## Sidebar token reference

| Token | Light | Dark |
|-------|-------|------|
| `--sidebar-background` | `hsl(0 0% 98%)` | `hsl(270 5.9% 10%)` |
| `--sidebar-foreground` | `hsl(265 5.3% 26.1%)` | `hsl(270 4.8% 95.9%)` |
| `--sidebar-primary` | `hsl(265 5.9% 10%)` | `hsl(262 76.3% 48%)` |
| `--sidebar-accent` | `hsl(270 4.8% 95.9%)` | `hsl(270 3.7% 15.9%)` |
| `--sidebar-border` | `hsl(270 13% 91%)` | `hsl(270 3.7% 15.9%)` |
| `--sidebar-ring` | `hsl(262 83% 58%)` | `hsl(262 83% 58%)` |

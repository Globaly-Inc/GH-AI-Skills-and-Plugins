# Brand — GlobalyPay

**Project:** GlobalyPay — payments and financial platform  
**Design system brand:** `data-brand="globalypay"` — blue `#2563EB`

---

## Design system token mapping

GlobalyPay uses the Globaly Design System with the `globalypay` brand mode. Always use semantic tokens — never hardcode hex or hsl values.

| Design system token | Value |
|--------------------|-------|
| `--brand-primary-default` | `#2563EB` |
| `--brand-primary-hover` | `#1D4ED8` |
| `--brand-primary-active` | `#1E40AF` |
| `--brand-primary-subtle` | `#DBEAFE` |
| `--brand-primary-foreground` | `#FFFFFF` |
| `--brand-secondary-default` | `#1E293B` |
| `--brand-accent-default` | `#2563EB` |

Shared surface, foreground, border, radius, shadow, and spacing tokens are identical to the other brands — see the "Design tokens" section in `SKILL.md`.

Typography semantic classes (`.t-h1`, `.t-body`, etc.) apply identically — see `SKILL.md`.

---

## Color tokens

| Token | Light | Dark | Use |
|-------|-------|------|-----|
| `--primary` | `hsl(217 91% 60%)` — `#2563EB` | `hsl(217 91% 65%)` | CTAs, links, active nav |
| `--primary-foreground` | `hsl(0 0% 100%)` | `hsl(0 0% 100%)` | Text on primary bg |
| `--primary-light` | `hsl(217 91% 92%)` | `hsl(217 91% 20%)` | Soft primary tints |
| `--primary-dark` | `hsl(217 91% 48%)` — `#1D4ED8` | `hsl(217 91% 70%)` | Hover / pressed states |
| `--secondary` | `hsl(213 60% 96%)` | `hsl(213 25% 18%)` | Soft backgrounds, chips |
| `--secondary-foreground` | `hsl(217 91% 48%)` | `hsl(213 40% 98%)` | Text on secondary |
| `--accent` | `hsl(199 89% 48%)` | `hsl(199 89% 55%)` | Cyan highlights |
| `--accent-light` | `hsl(199 100% 95%)` | `hsl(199 89% 18%)` | Soft accent tints |
| `--success` | `hsl(142 71% 45%)` | `hsl(142 71% 45%)` | Confirmed, settled, paid |
| `--warning` | `hsl(38 92% 50%)` | `hsl(38 92% 50%)` | Pending, review required |
| `--muted` | `hsl(213 30% 92%)` | `hsl(213 25% 18%)` | Inactive areas |
| `--muted-foreground` | `hsl(215 20% 40%)` | `hsl(215 20% 65%)` | Secondary/hint text |
| `--destructive` | `hsl(0 84% 60%)` | `hsl(0 63% 50%)` | Errors, failed transactions, refunds |
| `--border` | `hsl(213 25% 91%)` | `hsl(213 25% 22%)` | Dividers, input borders |
| `--background` | `hsl(213 30% 98%)` | `hsl(213 25% 10%)` | Page background |
| `--card` | `hsl(0 0% 100%)` | `hsl(213 25% 13%)` | Card backgrounds |
| `--ring` | `hsl(217 91% 60%)` | `hsl(217 91% 65%)` | Focus rings |

**Dark mode:** `darkMode: ["class"]` — toggled via `class="dark"` on `<html>`.  
**Never hardcode hex values.** Always reference the token name.

### Semantic state colors (payments context)

| State | Bg | Border | Text | Usage |
|-------|----|--------|------|-------|
| Paid / Success | `#DCFCE7` | `#16A34A` | `#15803D` | Transaction settled |
| Pending | `#FEF3C7` | `#D97706` | `#92400E` | Awaiting confirmation |
| Failed | `#FEE2E2` | `#DC2626` | `#991B1B` | Transaction failed |
| Processing | `#DBEAFE` | `#2563EB` | `#1E40AF` | In-flight payment |
| Refunded | `#F3E8FF` | `#7C3AED` | `#5B21B6` | Refund issued |

---

## Typography

| Class | Font | Use |
|-------|------|-----|
| `font-sans` | Plus Jakarta Sans, DM Sans | All body copy, labels, nav, UI text |
| `font-ui` | Inter | Transaction tables, amount displays, metadata, receipts |
| `font-mono` | JetBrains Mono, Fira Code | Transaction IDs, reference codes, account numbers |

> GlobalyPay does not use a display serif. All headings use `font-sans` (Plus Jakarta Sans). Use `.t-h1`–`.t-h5` semantic classes from the design system.

**Numeric display rule:** All monetary amounts and transaction IDs use `font-mono` with `tabular-nums` (`font-variant-numeric: tabular-nums`) so amounts align in tables. Apply via `.t-code` or `font-mono tabular-nums` Tailwind utilities.

---

## Spacing & radius

- Tailwind scale only — no arbitrary values unless unavoidable
- `rounded-lg` = `var(--radius)` = `0.75rem`
- `rounded-md` = `calc(var(--radius) - 2px)`
- `rounded-sm` = `calc(var(--radius) - 4px)`
- Container: `container mx-auto`, padding `2rem`, max-width `1280px` (`2xl`)

---

## Animation

GlobalyPay uses minimal, trust-building animations — no decorative loops.

| Tailwind class | Effect | Usage |
|----------------|--------|-------|
| `animate-pulse` | Subtle pulse | Processing / pending state indicators |
| `animate-spin` | Spinner | Loading states during payment flow |
| `accordion-down/up` | shadcn accordion | — |

Keep entrance transitions ≤ 200ms. Exit transitions ≤ 150ms. No celebration animations in payment flows — trust and clarity over delight.

---

## Layout shells

Do not create a new layout — flag as a blocker if none fits.

| Layout | Route pattern | Notes |
|--------|--------------|-------|
| `PayLayout` | `/pay/*` — authenticated payment pages | Main app shell: `TopNav` + `SideNav` + `MobileBottomNav`. Owns `pb-24 md:pb-6` for mobile nav clearance. |
| `CheckoutLayout` | `/checkout/*` | Focused checkout flow — no sidebar, no nav distractions. Header with logo + secure badge only. |
| `ReceiptLayout` | `/receipt/*` | Minimal shell for receipt/confirmation pages. |
| Public pages | `/home`, `/pricing`, `/docs/*` | No shell wrapper — each page controls its own layout. |
| `AdminLayout` | `/admin/*` | GlobalyPay admin only. |

**Layout internals — already handled, do not re-implement in page components:**
- `TopNav` and `SideNav` are owned by `PayLayout`
- `MobileBottomNav` is owned by `PayLayout`
- `pb-24 md:pb-6` on `<main>` — **never add this in a page component**
- `SecureBadge` (padlock + "Secured by GlobalyPay") is owned by `CheckoutLayout` header — do not add it manually in checkout pages

---

## Route registration

New features define routes in `src/features/<feature>/routes/featureRoutes.tsx`. Register in `src/App.tsx` under the appropriate block:

```tsx
// src/App.tsx — registering a new feature's routes
import { transactionRoutes } from './features/transactions/routes/transactionRoutes'

{transactionRoutes.map(route => (
  <Route
    key={route.path}
    path={route.path}
    element={<PayProtectedRoute>{route.element}</PayProtectedRoute>}
  />
))}
```

Route guards:
- `PayProtectedRoute` — auth + account verification (most pages)
- `PayProtectedRoute withKYC` — auth + KYC completion required (send money, withdraw)
- `CheckoutPublicRoute` — no auth required (payment link checkout flows)
- `AdminRoute` — auth + `isPayAdmin`

---

## Key hooks (check before writing new ones)

| Hook | Provides |
|------|---------|
| `useAuth` | `user`, `loading`, session |
| `usePayAccount` | `account`, `balance`, `currency`, `kycStatus` |
| `useTransactions` | Paginated transaction list with filters |
| `useTransaction` | Single transaction detail |
| `usePaymentMethods` | Saved cards, bank accounts |
| `useCurrencyFormatter` | Locale-aware amount formatting with currency symbol |
| `useExchangeRate` | Live FX rates |
| `useKYCStatus` | `isVerified`, `isPending`, `isRejected` |
| `use-mobile` | `isMobile` boolean |
| `useDebouncedValue` | Debounced search/filter inputs |

**Amount formatting rule:** Always use `useCurrencyFormatter` — never format amounts with raw `toLocaleString` or manual string concatenation. Amounts must respect locale, currency symbol position, and decimal precision.

---

## Feature folder structure (GlobalyPay)

Every new feature lives in `src/features/<feature-name>/`.

```
src/features/
  transactions/
    components/
      TransactionRow.tsx
      TransactionRow.skeleton.tsx
      TransactionList.tsx
      TransactionFilters.tsx
      __tests__/
        TransactionRow.test.tsx
    pages/
      TransactionsPage.tsx
      TransactionDetailPage.tsx
    store/
      transactionStore.ts       ← Zustand store for this feature
    routes/
      transactionRoutes.tsx
    hooks/
      useTransactions.ts
      __tests__/
        useTransactions.test.ts
    types/
      index.ts
    index.ts
```

**Global state:** Zustand (`zustand`) — same pattern as GlobalyOS. See SKILL.md state management section.

---

## Payments-specific UI rules

- **Never show partial amounts.** Always display the full amount with currency and decimal places. `$10` → `$10.00`.
- **Always show currency code alongside symbol** on international transfers: `$10.00 USD`, not just `$10.00`.
- **Transaction status** must always use `StatusBadge` from the design system — never raw text or a custom badge. Map to the payment semantic state colors above.
- **Destructive actions** (refund, cancel payment, delete card) always require a confirmation dialog naming the specific item and amount: "Refund $250.00 to Visa ••••4242? This can't be undone."
- **Loading states on payment actions:** Disable the submit button and show a spinner for the entire duration of a payment mutation — never allow re-submission.
- **Error messages** must tell the user what failed and what to do: "Payment declined by your bank. Try a different card or contact your bank." — never "Payment failed."
- **Sensitive data masking:** Card numbers display as `••••4242`. Account numbers display as `••••1234`. Never render full PAN or account numbers in the UI.
- **Amounts in tables:** Use `font-mono tabular-nums` so currency values align on the decimal point.

---

## SEO (GlobalyPay — public pages only)

Public pages (`/home`, `/pricing`, `/docs/*`, payment link checkout) are indexed. For every public-facing page:

| Element | Requirement |
|---------|-------------|
| `<title>` | Unique per page — `[Page name] · GlobalyPay` format |
| `<meta name="description">` | 150–160 chars |
| `<meta property="og:*">` | Open Graph for social shares |
| Canonical URL | On pages with query-string variants |

Authenticated payment pages (`/pay/*`) are not indexed.

---

## Sidebar token reference

| Token | Light | Dark |
|-------|-------|------|
| `--sidebar-background` | `hsl(0 0% 98%)` | `hsl(213 5.9% 10%)` |
| `--sidebar-foreground` | `hsl(215 5.3% 26.1%)` | `hsl(213 4.8% 95.9%)` |
| `--sidebar-primary` | `hsl(217 91% 60%)` | `hsl(217 76.3% 55%)` |
| `--sidebar-accent` | `hsl(213 4.8% 95.9%)` | `hsl(213 3.7% 15.9%)` |
| `--sidebar-border` | `hsl(213 13% 91%)` | `hsl(213 3.7% 15.9%)` |
| `--sidebar-ring` | `hsl(217 91% 60%)` | `hsl(217 91% 60%)` |

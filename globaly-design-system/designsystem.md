# Globaly Design System

**Version:** 2.1  
**Source:** `Style Guide.fig` (Figma) · `colors_and_type.css` · `_ds_bundle.js`  
**Bundle namespace:** `window.GlobalyDesignSystem_c92b6a`

---

## Products & Multi-Brand

One component library, three brand modes. Brand is switched by setting `data-brand` on a root element.

| Product | Primary | Accent | Audience |
|---------|---------|--------|----------|
| **Globalyapp** (default) | `#012E8A` deep navy | `#1D4ED8` blue | Students, agents, institutions |
| **GlobalyOS** | `#6820E4` purple | `#7A32EA` | Business / OS users |
| **GlobalyPay** | `#2563EB` blue | `#1D4ED8` | Payments, financial |

```html
<body data-brand="globalyos">…</body>   <!-- purple mode -->
<body data-brand="globalypay">…</body  <!-- blue mode -->
<!-- no attribute = Globalyapp navy -->
```

---

## Usage

```html
<link rel="stylesheet" href="colors_and_type.css">
<script src="https://unpkg.com/react@18.3.1/umd/react.production.min.js"></script>
<script src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.production.min.js"></script>
<script src="_ds_bundle.js"></script>
<script>
  const { Button, Badge, Input, Modal } = window.GlobalyDesignSystem_c92b6a;
</script>
```

---

## Design Tokens

### Brand Semantic Tokens

| Token | Globalyapp | GlobalyOS | GlobalyPay |
|-------|-----------|-----------|------------|
| `--brand-primary-default` | `#012E8A` | `#6820E4` | `#2563EB` |
| `--brand-primary-hover` | `#012670` | `#5618BF` | `#1D4ED8` |
| `--brand-primary-active` | `#001F5B` | `#461699` | `#1E40AF` |
| `--brand-primary-subtle` | `#DBEAFE` | `#E6D8FF` | `#DBEAFE` |
| `--brand-primary-foreground` | `#FFFFFF` | `#FFFFFF` | `#FFFFFF` |
| `--brand-secondary-default` | `#1E293B` | `#1E293B` | `#1E293B` |
| `--brand-accent-default` | `#1D4ED8` | `#7A32EA` | `#2563EB` |

### Surface & Background

| Token | Value | Usage |
|-------|-------|-------|
| `--surface-page` | `#F8FAFC` | Page background |
| `--surface-panel` | `#F1F5F9` | Sidebar, section bg |
| `--surface-card` | `#FFFFFF` | Card surfaces |
| `--surface-overlay` | `rgba(15,23,42,0.5)` | Modal/drawer backdrop |

### Foreground / Text

| Token | Value | Usage |
|-------|-------|-------|
| `--fg-display` | `#0F172A` | Headlines, display text |
| `--fg-primary` | `#1E293B` | Main body text |
| `--fg-secondary` | `#475569` | Secondary body text |
| `--fg-muted` | `#64748B` | Labels, descriptions |
| `--fg-subtle` | `#94A3B8` | Placeholders, hints |
| `--fg-disabled` | `#CBD5E1` | Disabled state text |
| `--fg-inverse` | `#FFFFFF` | Text on dark surfaces |
| `--fg-brand` | `#012E8A` | Brand-colored text (swaps per mode) |

### Border

| Token | Value | Usage |
|-------|-------|-------|
| `--border-default` | `#E2E8F0` | Default borders, dividers |
| `--border-strong` | `#CBD5E1` | Emphasized borders |
| `--border-focus` | `#012E8A` | Active input ring (swaps per brand) |
| `--border-error` | `#DC2626` | Error state |
| `--border-success` | `#16A34A` | Success state |

### Semantic State Colors

| State | Bg | Border | Text |
|-------|----|--------|------|
| Error | `#FEE2E2` | `#DC2626` | `#991B1B` |
| Success | `#DCFCE7` | `#16A34A` | `#15803D` |
| Warning | `#FEF3C7` | `#D97706` | `#92400E` |
| Info | `#DBEAFE` | `#2563EB` | `#1E40AF` |

### Spacing

Base unit: **4px**. 34-step scale.

| Token | Value | Token | Value |
|-------|-------|-------|-------|
| `--space-1` | 4px | `--space-6` | 24px |
| `--space-2` | 8px | `--space-8` | 32px |
| `--space-3` | 12px | `--space-12` | 48px |
| `--space-4` | 16px | `--space-16` | 64px |
| `--space-5` | 20px | `--space-24` | 96px |

Full scale: 0 → 384px via `--space-0` through `--space-96`.

### Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-none` | 0px | — |
| `--radius-sm` | 2px | — |
| `--radius-default` | 4px | Buttons (xs/sm) |
| `--radius-md` | 6px | — |
| `--radius-lg` | 8px | Buttons (xl), inputs |
| `--radius-xl` | 12px | Cards, panels |
| `--radius-2xl` | 16px | — |
| `--radius-3xl` | 24px | — |
| `--radius-full` | 9999px | Avatars, badges, chips |

### Shadows

| Token | Value | Usage |
|-------|-------|-------|
| `--shadow-none` | none | — |
| `--shadow-2xs` | `0 1px 0` 5% | — |
| `--shadow-xs` | `0 1px 2px` 5% | — |
| `--shadow-sm` | `0 1px 3px + 0 1px 2px` 10% | Cards |
| `--shadow-default` | `0 4px 6px + 0 2px 4px` 10% | Cards (default) |
| `--shadow-md` | `0 10px 15px + 0 4px 6px` 10% | Dropdowns |
| `--shadow-lg` | `0 20px 25px + 0 8px 10px` 10% | Modals |
| `--shadow-2xl` | `0 25px 50px` 25% | — |
| `--shadow-inner` | `inset 0 2px 4px` 5% | — |

---

## Typography

### Font Families

| Token | Stack | Usage |
|-------|-------|-------|
| `--font-sans` | Plus Jakarta Sans, DM Sans | Body, labels, buttons, headings |
| `--font-ui` | Inter | Data tables, docs, metadata, captions |
| `--font-label` | Averta Std*, DM Sans | Sidebar labels, nav text |
| `--font-mono` | JetBrains Mono, Fira Code | Code |

> ⚠️ Averta Std is a commercial typeface — request font files from the design team. DM Sans is the active fallback.

### Type Scale

| Token | Size | Line height |
|-------|------|-------------|
| `--text-xs` | 12px | 16px |
| `--text-sm` | 14px | 20px |
| `--text-base` | 16px | 24px |
| `--text-lg` | 18px | 28px |
| `--text-xl` | 20px | 28px |
| `--text-2xl` | 24px | 32px |
| `--text-3xl` | 30px | 36px |
| `--text-4xl` | 36px | 40px |
| `--text-5xl` | 48px | 48px |
| `--text-6xl` | 60px | 60px |
| `--text-7xl` | 72px | 72px |

### Semantic Typography Classes

| Class | Size / Weight | Color |
|-------|--------------|-------|
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

---

## Iconography

**Style:** Stroke/outline icons, SVG-based. No icon font, no emoji.

| Style | Size | Usage |
|-------|------|-------|
| `Icon/Outline/*` | 24px default, 16px compact | Navigation, actions, form adornments |
| `Icon/Solid/*` | 24px | Arrows, chevrons, CTAs |

**Most-used icons:** `frame`, `arrow-sm-right`, `close-small`, `x`, `check`, `arrow-right` (solid), `chevron-down-small`, `3-dots`, `diagonals-tlbr`, `arrows-update`.

> ⚠️ The proprietary Globaly SVG set lives in Figma. Use **Lucide Icons** as a stand-in (`https://unpkg.com/lucide@latest/dist/umd/lucide.min.js`) — matches the stroke weight and style closely. Request SVG exports from the design team for production.

---

## Component Library

40 exported components across 6 groups.

### Actions

#### `Button`
```ts
variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'subtle'  // default: 'primary'
size?:    'xs' | 'sm' | 'md' | 'lg' | 'xl'                                      // default: 'md'
icon?:        ReactNode   // leading icon (inherits text color)
iconRight?:   ReactNode   // trailing icon
disabled?:    boolean
```

#### `IconButton`
Square icon-only button. Same `variant` and `size` as `Button`, requires `icon`.

---

### Data Display

#### `Badge`
```ts
variant?: 'red' | 'green' | 'blue' | 'yellow' | 'slate' | 'purple' | 'orange'
size?:    'xs' | 'sm'
dot?:     boolean   // leading status dot
```

#### `StatusBadge`
```ts
status: string   // 'Active' | 'Pending' | 'In Review' | 'Rejected' | 'Draft' — color derived automatically
dot?:   boolean
```

#### `Tag`
```ts
variant?: BadgeVariant   // same 7 as Badge
```
Rounded-rectangle (less pill than Badge).

#### `Chip`
```ts
onRemove?: () => void   // renders × button when provided
```

#### `Avatar`
```ts
name?:   string                              // initials fallback + alt
src?:    string                              // image URL
size?:   'xs' | 'sm' | 'md' | 'lg' | 'xl' | number
status?: 'online' | 'away' | 'offline' | 'busy'
color?:  string                              // initials bg, default #012E8A
```

#### `AvatarGroup`
```ts
max?:  number    // overflow count shown as +N chip
size?: AvatarSize
```

#### `Card` / `StatCard` / `SectionHeader`
White surface (`#FFFFFF`), `1px solid --border-default`, `--radius-xl`, 16–24px padding, `--shadow-sm` or `--shadow-default`.

#### `Table`
Data table with header, hover rows, and custom cell renderer support.

---

### Forms

#### `Input`
```ts
state?:        'default' | 'active' | 'error' | 'success'
size?:         'sm' | 'md' | 'lg' | 'xl'
leadingIcon?:  ReactNode
trailingIcon?: ReactNode
disabled?:     boolean
```
Border radius: `--radius-lg` (8px) on all sizes.

#### `Textarea`
```ts
state?:    FieldState
rows?:     number
disabled?: boolean
```

#### `Field`
```ts
label?:    string
hint?:     string
error?:    string
success?:  string
required?: boolean
children:  ReactNode   // wraps a control
```

#### `SearchInput`
`Input` preset with a leading search glyph baked in.

#### `Select`
```ts
options?:     { value: string; label: string }[]
size?:        'sm' | 'md' | 'lg'
placeholder?: string
```
Native `<select>` styled to match the input system with a custom chevron.

#### `Combobox`
Searchable single-select with type-to-filter.

#### `Checkbox` / `Radio` / `RadioGroup`
Standard form controls. `RadioGroup` manages a controlled set.

#### `Switch`
```
Two sizes. On/off toggle with labels. Disabled state supported.
```

#### `Datepicker`
Month calendar. Selected day = navy fill. Today = ring indicator.

#### `AuthCode`
One-time code input with auto-advance and error state.

---

### Feedback

#### `Alert`
```ts
variant: 'info' | 'success' | 'warning' | 'error'
title?:  string
onDismiss?: () => void
```

#### `Toast` / `Snackbar`
Light semantic toasts (info/success/warning/error) and dark Snackbar with an action button.

#### `Tooltip`
```ts
placement?: 'top' | 'bottom' | 'left' | 'right'
```
Dark bg, shows on hover/focus.

#### `ProgressBar`
Linear progress. Sizes `sm`/`md`/`lg`. Optional label + percentage.

#### `Spinner`
Indeterminate loader. Multiple sizes and colors.

---

### Navigation

#### `Tabs`
Underline-style tabs. Active tab: navy indicator. Supports count badges.

#### `Breadcrumb`
Path trail, chevron separators, current page emphasized.

#### `Pagination`
Prev/next + truncated page list. Active page = navy.

#### `SegmentedControl`
Pill container. Active segment = raised white card on light bg.

---

### Overlays

#### `Modal`
```ts
open:      boolean
onClose:   () => void
title?:    string
```
Centered dialog. Overlay: `--surface-overlay`. Shadow: `--shadow-lg`.

#### `Drawer`
Side slide-over panel. Header / body / footer slots. Overlay backdrop.

#### `Dropdown`
Click-to-open menu. Supports icons, danger items, dividers. Shadow: `--shadow-md`.

#### `Popover`
Click-to-open floating panel for rich content.

#### `Accordion`
Collapsible panels with rotating chevron. Supports single or multi-expand.

---

### Media

#### `Carousel`
Sliding carousel with prev/next controls and dot indicators.

---

## Voice & Tone

- **Professional but human.** Knowledgeable guide, never robotic.
- **Action-oriented.** "Continue", "View details", "Get started" — not vague CTAs.
- **Plain language.** "Your documents" not "User-uploaded artifacts". "Submit application" not "Transmit form payload".
- **Second person.** "Your application", "Your dashboard". "We" only in error/support messages.
- **Sentence case** everywhere except proper nouns (Globalyapp, GlobalyOS, GlobalyPay) and navigation section headers (Title Case).
- **No emoji** in UI components or product copy.

---

## Visual Rules

- **Light-first.** No dark mode in the current design system. White cards on `#F8FAFC`/`#F1F5F9` backgrounds.
- **No gradients** on backgrounds. Flat, clean surfaces.
- **No full-bleed imagery, textures, or hand-drawn illustrations** in UI components.
- **Hover:** slightly darker fill (not opacity). **Active/press:** darker still, no scale transform. **Focus:** border changes to `--border-focus`.
- **Transitions:** ~150–200ms ease, subtle.
- Cards: `#FFFFFF` bg · `1px solid --border-default` or `--shadow-sm` · `--radius-xl` · 16–24px padding.

---

## Assets

| File | Description |
|------|-------------|
| `assets/logos/globaly-app-white-full.png` | Globalyapp white wordmark |
| `assets/logos/globaly-main-full.png` | Globalyapp full-color wordmark |
| `assets/logos/globaly-red-icon.png` | App icon, red gradient, square |
| `assets/logos/globaly-white-icon.svg` | App icon, white, SVG |
| `assets/logos/globalyos-main-full.png` | GlobalyOS full-color wordmark |

---

## Primitive Color Scales

Full Tailwind palette (255 tokens) available as `--color-{scale}-{step}` CSS custom properties. Scales: `gray`, `slate`, `zinc`, `neutral`, `stone`, `red`, `orange`, `amber`, `yellow`, `lime`, `green`, `emerald`, `teal`, `cyan`, `sky`, `blue`, `indigo`, `violet`, `purple`, `fuchsia`, `pink`, `rose`. Plus custom `--color-gos-purple-{50–950}` for GlobalyOS.

**Primary neutral scale is Slate.** Prefer `--fg-*`, `--border-*`, and `--surface-*` semantic tokens over reaching for primitives directly.

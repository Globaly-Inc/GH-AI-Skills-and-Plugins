# Globaly Design System (reference)

## Globaly Design System

**Version:** 2.1 — source: `Style Guide.fig` (Figma) · `colors_and_type.css` · `_ds_bundle.js`

The design system is a shared component library bundled as `_ds_bundle.js` and exposed at `window.GlobalyDesignSystem_c92b6a`. It is brand-aware: setting `data-brand` on a root element switches all tokens.

```html
<!-- No attribute = Globalyapp (navy) -->
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
| `--brand-primary-default` | `#012E8A` | `#6820E4` | `#2563EB` |
| `--brand-primary-hover` | `#012670` | `#5618BF` | `#1D4ED8` |
| `--brand-primary-active` | `#1E40AF` | `#461699` | `#1E40AF` |
| `--brand-primary-subtle` | `#DBEAFE` | `#E6D8FF` | `#DBEAFE` |
| `--brand-primary-foreground` | `#FFFFFF` | `#FFFFFF` | `#FFFFFF` |
| `--brand-secondary-default` | `#1E293B` | `#1E293B` | `#1E293B` |
| `--brand-accent-default` | `#1D4ED8` | `#7A32EA` | `#2563EB` |

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


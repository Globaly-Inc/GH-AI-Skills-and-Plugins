# Globalyapp Design System

**Version:** 2.1  
**Source:** Figma file "Style Guide.fig" (48 pages, 529 top-level frames) + brand asset uploads  
**Figma source:** Internal — provided via .fig attachment. Explore with `fig_ls`, `fig_read`, `fig_screenshot`.

---

## Products

Globalyapp is a multi-brand SaaS platform serving education, migration, and business workflow use cases. The design system is **multi-brand** with shared components and semantic tokens that swap per product:

| Product | Primary Color | Accent | Audience |
|---------|--------------|--------|----------|
| **Globalyapp** | Deep maroon `#7F1D1D` | `#C51918` red | Students, agents, institutions |
| **GlobalyOS** | Purple `#6820E4` | `#7A32EA` | Business/OS users |
| **GlobalyPay** | Blue `#2563EB` | `#1D4ED8` | Payments, financial |

All three products share the same component library. The brand mode is controlled by semantic tokens (`brand/primary/*`, `brand/secondary/*`, `brand/accent/*`) that resolve differently per product.

---

## File Index

```
README.md                     ← this file
SKILL.md                      ← agent skill definition
colors_and_type.css           ← CSS custom properties for colors, type, spacing
assets/
  logos/
    globaly-app-white-full.png    ← Globalyapp white full wordmark
    globalyos-main-full.png       ← GlobalyOS full color wordmark
    globaly-red-icon.png          ← Globaly app icon (red gradient, square)
    globaly-white-icon.svg        ← Globaly app icon (white, SVG)
preview/
  colors-brand.html             ← Brand color tokens (Globalyapp · GlobalyOS)
  colors-primitives.html        ← Full 255-token color primitive palette
  colors-neutrals.html          ← Neutral + brand + GlobalyOS purple scales
  colors-semantic.html          ← Semantic state colors
  type-scale.html               ← Type scale specimens
  type-fonts.html               ← Font family / weight reference (Inter)
  spacing-tokens.html           ← Spacing scale tokens
  radius-shadows.html           ← Border radius + shadow scale
  components-sidebar.html       ← Sidebar navigation specimen
  brand-logos.html              ← Logo lockups
components/                     ← Exported design-system components (the bundle)
  Button/  IconButton           ← via Button (Button.jsx + .d.ts + @dsCard)
  Badge/   Badge · StatusBadge · Tag · Chip
  Input/   Input · Textarea · Field · SearchInput · Select
  Card/    Card · StatCard · SectionHeader
  Checkbox/ Radio/ Switch/      ← form controls
  Alert/ Tooltip/ ProgressBar/ Spinner/   ← feedback
  Tabs/ Breadcrumb/ Pagination/ SegmentedControl/   ← navigation
  Modal/ Accordion/ Avatar/ (AvatarGroup)  ← overlays & data
ui_kits/
  globalyapp/
    README.md                   ← UI kit notes
    index.html                  ← Main dashboard (interactive)
    Sidebar.jsx                 ← Sidebar navigation (kit-local)
    TopBar.jsx                  ← Top navigation bar (kit-local)
```

## COMPONENT LIBRARY

30 components are compiled into `_ds_bundle.js` and exposed on the global
`window.GlobalyDesignSystem_c92b6a`. Each lives in `components/<Name>/` with a
`<Name>.jsx` source, a `<Name>.d.ts` type declaration, and a `<Name>.html`
`@dsCard` preview.

**Usage in an HTML page:**
```html
<script crossorigin src="https://unpkg.com/react@18.3.1/umd/react.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.production.min.js"></script>
<script src="path/to/_ds_bundle.js"></script>
<script>
  const { Button, Badge, Input, Modal /* … */ } = window.GlobalyDesignSystem_c92b6a;
</script>
```

| Group | Components |
|-------|-----------|
| Actions | `Button`, `IconButton` |
| Data display | `Badge`, `StatusBadge`, `Tag`, `Chip`, `Avatar`, `AvatarGroup`, `Card`, `StatCard`, `SectionHeader`, `Table` |
| Forms | `Input`, `Textarea`, `Field`, `SearchInput`, `Select`, `Combobox`, `Checkbox`, `Radio`, `RadioGroup`, `Switch`, `Datepicker`, `AuthCode` |
| Feedback | `Alert`, `Toast`, `Snackbar`, `Tooltip`, `ProgressBar`, `Spinner` |
| Navigation | `Tabs`, `Breadcrumb`, `Pagination`, `SegmentedControl` |
| Overlays | `Modal`, `Drawer`, `Dropdown`, `Popover`, `Accordion` |
| Media | `Carousel` |

All components use the maroon Globalyapp brand by default and read from the
established token system (slate neutrals, 8px input radius, 12px card radius).

---

## CONTENT FUNDAMENTALS

### Voice & Tone
- **Professional but human.** Never robotic or overly formal. Feels like a knowledgeable guide.
- **Supportive and clear.** The audience often includes students, first-time migrants, and non-technical business users. Language should reduce anxiety, not add to it.
- **Action-oriented.** UI copy always tells users what to do next. Labels like "Continue", "View details", "Get started" — not vague CTAs.
- **Avoid jargon.** "Submit application" not "Transmit form payload". "Your documents" not "User-uploaded artifacts".

### Casing
- **Sentence case** for all body copy, labels, and descriptions.
- **Title case** only for proper nouns (product names: Globalyapp, GlobalyOS, GlobalyPay) and navigation section headers.
- **ALL CAPS** sparingly — used only for table column headers and section dividers in the design system itself.

### Pronouns
- **"You" / "Your"** — the product addresses the user directly in second person. "Your application", "Your documents", "Your dashboard".
- **"We"** — used only in error/support messages: "We couldn't process this." Not used in standard UI labels.

### Emoji
- **Not used** in UI components or product copy. The design system is emoji-free. No decorative icons via emoji.

### Copy Examples (from Figma)
- Navigation: "Your teams", "Reports", "Month to Date", "Year to Date"
- Inputs: "Input label text", "Placeholder text"
- Buttons: "Button text" (design system generic), real labels are action-verb phrases
- Section dividers: "BRAND", "Token", "Visual"

---

## VISUAL FOUNDATIONS

### Colors
The system uses a **full Tailwind palette** (255 tokens) as primitives + semantic brand tokens across 3 modes.

**Globalyapp brand palette:**
- Primary: `#7F1D1D` (red-900, deep maroon) — buttons, active borders, focus rings
- Primary hover: darker maroon ~`#6B1818`
- Primary subtle: `#FEE2E2` (red-100) — tinted backgrounds, badges
- Accent/bright red: `#C51918`, `#E31D1C`, `#DC2626` — notifications, warnings
- Yellow accent: `#FECA00`, `#FFD018` — highlight, special states (possibly GlobalyPay)
- Secondary: `#1E293B` (slate-800) — secondary buttons, dark text actions
- Secondary hover: `#334155` (slate-700)

**Neutrals (Slate scale — primary neutral):**
- `#F8FAFC` slate-50 — page background, input fills
- `#F1F5F9` slate-100 — sidebar bg, card bg, section bg
- `#E2E8F0` slate-200 — borders, dividers
- `#CBD5E1` slate-300 — disabled borders
- `#94A3B8` slate-400 — placeholder text, muted icons
- `#64748B` slate-500 — secondary body text, labels
- `#475569` slate-600 — body text
- `#334155` slate-700 — strong body text
- `#1E293B` slate-800 — headings
- `#0F172A` slate-900 — darkest text, brand titles

**Background system:** White `#FFFFFF` surfaces on `#F8FAFC` / `#F1F5F9` page backgrounds. No full-bleed dark mode in the public design system (light-first).

**Semantic states:**
- Error: bg `#FEE2E2`, border `#DC2626`
- Success: bg `#DCFCE7`, border `#16A34A`
- Warning: amber tones
- Info: sky/blue tones

### Typography
**Primary font: Plus Jakarta Sans** (geometric, friendly sans-serif)
- Used for all body copy, labels, buttons, input text
- Weights in use: Regular (400), Medium (500), Bold (700)
- Sizes: 12px (xs), 14px (sm), 16px (base/lg)

**Secondary font: Inter** (neutral, highly legible)
- Used for design system documentation, data tables, small UI labels, metadata
- All 9 weights available
- Sizes: 8–28px in use

**Tertiary font: Averta Std** (soft, rounded)
- Used in sidebar section labels, some navigation text
- Weights: Regular, Semibold
- Sizes: 12–20px

**DM Sans:** Occasional body copy variant (14–24px)

**Type scale (Inter/Plus Jakarta Sans):**
xs=12px, sm=14px, base=16px, lg=18px, xl=20px, 2xl=24px, 3xl=30px, 4xl=36px, 5xl=48px, 6xl=60px, 7xl=72px

**Line heights:** 16px→xs, 20px→sm, 24px→base, 28px→lg/xl, 32px→2xl, 36px→3xl, 40px→4xl, 48px→5xl

### Spacing
- **Base unit: 4px**
- 34-step scale from 0 → 384px
- Common spacing values: 4, 8, 12, 16, 24, 32, 48, 64px

### Border Radius
9 tokens: none(0), sm(2px), DEFAULT(4px), md(6px), lg(8px), xl(12px), 2xl(16px), 3xl(24px), full(9999px)
- Buttons: 4px (xs/sm) → 8px (xl)
- Inputs: 8px (all sizes)
- Sidebar/panels: 12px
- Avatars: full (circle)
- Badges/chips: full (pill)

### Shadows
9 elevation levels (none → 2xl + inner):
- none: no shadow
- 2xs: `0 1px 0` at 5% opacity
- xs: `0 1px 2px` at 5%
- sm: `0 1px 3px + 0 1px 2px` at 10%
- DEFAULT: `0 4px 6px + 0 2px 4px` at 10%
- md: `0 10px 15px + 0 4px 6px` at 10%
- lg: `0 20px 25px + 0 8px 10px` at 10%
- 2xl: `0 25px 50px` at 25%
- inner: `inset 0 2px 4px` at 5%

Cards typically use `sm` or `DEFAULT` shadow. Modals use `lg`. Dropdowns use `md`.

### Surfaces & Backgrounds
- **No gradients on backgrounds** — flat, clean surfaces throughout
- **No full-bleed imagery** in UI components
- **No hand-drawn illustrations** detected
- **No repeating textures or patterns** in UI
- White `#FFFFFF` cards on `#F1F5F9` or `#F8FAFC` page backgrounds

### Animations & Interactions
- **No heavy animations** — the design system is clean and understated
- **Hover states:** Slightly darker color (e.g. `#7F1D1D` → `#6B1818`), no opacity tricks
- **Press/active states:** Darker still, no scale transforms
- **Focus:** Border color changes to primary brand color
- **Transitions:** Implied 150–200ms ease — subtle

### Cards
- Background: `#FFFFFF`
- Border: `1px solid #E2E8F0` or shadow `sm`/`DEFAULT`
- Border radius: `lg` (8px) or `xl` (12px) for panels
- No colored left-borders
- Padding: 16–24px

### Iconography
- **Stroke icons** (outline style), 24px primary / 16px compact
- **Solid icons** used for arrows, chevrons in CTAs
- Custom icon system — icons referenced as `Icon/Outline/*` and `Icon/Solid/*` in Figma
- **No emoji** as icons
- **No unicode chars** as icons
- Icons are SVG-based (no icon font detected)
- See ICONOGRAPHY section below.

---

## ICONOGRAPHY

**System:** Custom SVG icon set built into the Figma component library.

**Styles:**
- `Icon/Outline/*` — stroke icons, 24px default, 16px small variant. Used for navigation, actions, form adornments.
- `Icon/Solid/*` — filled icons. Used for arrow-right (CTAs), chevron-down (selects), check, x (close).

**Most used icons** (by instance count):
1. `frame` (outline, 24px) — generic frame/container placeholder
2. `arrow-sm-right` (outline) — navigation arrows
3. `close-small` (stroke, 16px) — dismiss/close actions
4. `x` (outline) — close dialogs
5. `check` (outline) — confirmations, checkmarks
6. `arrow-right` (solid) — CTA arrows
7. `chevron-down-small` (stroke, 24px) — dropdowns, selects
8. `3-dots` (stroke, 24px) — overflow menus
9. `diagonals-tlbr` (stroke, 24px) — expand/resize
10. `arrows-update` (stroke, 24px) — refresh/update

**Usage notes:**
- Icon size is determined by component context (16px in compact components, 24px in standard)
- Always use stroke icons (outline) for navigation and general UI
- Solid variants reserved for directional affordances (arrows, chevrons) in CTAs
- Icons copied to `assets/` are not available yet — the custom icon set lives in the Figma file. Use Lucide Icons (CDN) as a stand-in: it matches the stroke style closely.

**Lucide Icons CDN (substitute):**
```html
<script src="https://unpkg.com/lucide@latest/dist/umd/lucide.min.js"></script>
```
⚠️ **Flag:** The actual Globalyapp icon set is proprietary SVGs in Figma. Lucide is the closest publicly available match (same stroke weight, same style). Request SVG exports from the design team for production use.

---

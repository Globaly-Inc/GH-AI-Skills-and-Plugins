# Globalyapp UI Kit

A high-fidelity, interactive click-through prototype of the Globalyapp web application.

## Screens

| Screen | Description |
|--------|-------------|
| `dashboard` | Overview with stat cards and recent applications table |
| `applications` | Full applications list with search + status filter |
| `documents` | Document management with upload zone |
| `new-application` | Multi-field application creation form |
| `settings` | Profile settings + brand mode switcher |
| `report-month` | Month-to-date placeholder |
| `report-year` | Year-to-date placeholder |
| `search` | Global search placeholder |
| `calendar` | Calendar placeholder |
| `payments` | GlobalyPay integration placeholder |

## Components

| File | Exports | Description |
|------|---------|-------------|
| `Button.jsx` | `Button`, `IconButton` | All sizes (xs→xl) and variants (primary, secondary, outline, ghost, danger, subtle) |
| `Badge.jsx` | `Badge`, `StatusBadge`, `Chip` | Pill badges, status-mapped badges, removable chips |
| `Input.jsx` | `Input`, `Field`, `SearchInput`, `Select` | All input states (default, active, error, success, disabled), all sizes (sm→xl) |
| `Card.jsx` | `Card`, `StatCard`, `SectionHeader` | Base card, stat metric card, section title+actions |
| `Sidebar.jsx` | `Sidebar`, `NavItem`, `sidebarIcons` | Full sidebar with logo, nav groups, user footer |
| `TopBar.jsx` | `TopBar` | Page header with title, subtitle, search, notification bell, action slot |

## Design Tokens (from Figma Style Guide)

- **Primary brand:** `#012E8A` (deep navy — Globalyapp)
- **GlobalyOS:** `#6820E4` (custom purple scale)
- **GlobalyPay:** `#2563EB` (blue)
- **Font:** Plus Jakarta Sans (UI), Inter (data/labels), DM Sans (Averta Std fallback)
- **Border radius:** inputs/buttons `8px`, cards `12px`, sidebar `12px`
- **Surface panel:** `#F1F5F9` (slate-100)
- **Page bg:** `#F8FAFC` (slate-50)

## Usage

```html
<!-- Load all components -->
<script src="https://unpkg.com/react@18.3.1/umd/react.development.js" ...></script>
<script src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.development.js" ...></script>
<script src="https://unpkg.com/@babel/standalone@7.29.0/babel.min.js" ...></script>
<script type="text/babel" src="Button.jsx"></script>
<script type="text/babel" src="Badge.jsx"></script>
<script type="text/babel" src="Input.jsx"></script>
<script type="text/babel" src="Card.jsx"></script>
<script type="text/babel" src="Sidebar.jsx"></script>
<script type="text/babel" src="TopBar.jsx"></script>
```

Then in your Babel script, use components directly (they are exported to `window`):

```jsx
<Button variant="primary" size="md">Submit</Button>
<StatusBadge status="In Review" dot />
<Card><p>Content</p></Card>
```

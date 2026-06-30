# UX & Copy (reference)

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


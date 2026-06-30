# Common Mistakes (reference checklist)

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

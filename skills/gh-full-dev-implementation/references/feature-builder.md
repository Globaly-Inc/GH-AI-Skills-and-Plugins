# Reference: React + Supabase Feature Builder

Used by `gh-full-dev-implementation` IMPLEMENT mode when the feature touches the UI layer.
Defines the exact file-creation order and folder targets for GlobalyApp.

---

## Folder map

```
src/
  pages/          ← route-level page components (one file per page)
  components/     ← shared/reusable UI pieces (subfolders by domain)
  hooks/          ← all React Query + Supabase hooks (use<Name>.ts)
  services/       ← pure async functions that call Supabase directly
  types/          ← shared TypeScript types (not generated — hand-authored)
  integrations/
    supabase/
      types.ts    ← GENERATED — never edit by hand; regenerate after migrations
      client.ts   ← singleton supabase client
supabase/
  migrations/     ← SQL migration files
  functions/      ← Edge Functions (one folder per function)
```

---

## Creation order for a new feature

Always build bottom-up so each layer can be tested before the next depends on it:

```
1. supabase/migrations/   ← schema first (see migration-workflow.md)
2. src/integrations/supabase/types.ts  ← regenerate after migration
3. src/hooks/use<Feature>.ts           ← data layer
4. src/components/<domain>/            ← presentational components
5. src/pages/<Portal>/<FeaturePage>.tsx ← assemble page from components
6. Route registration                  ← add to the relevant router file
7. Navigation update                   ← add link/nav entry if visible in UI
8. src/test/                           ← tests per layer (see TDD loop)
```

Never create the page before the hook exists. The page should import the hook and
display its `data` / `isLoading` / `error` states — not call Supabase directly.

---

## Hook pattern (`src/hooks/use<Feature>.ts`)

```ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type Row = Database["public"]["Tables"]["<table_name>"]["Row"];

const KEYS = {
  all: ["<feature>"] as const,
  list: (filter: string) => ["<feature>", "list", filter] as const,
};

export function use<Feature>List(filter: string) {
  return useQuery({
    queryKey: KEYS.list(filter),
    queryFn: async () => {
      const { data, error } = await supabase
        .from("<table_name>")
        .select("*")
        .eq("<column>", filter);
      if (error) throw error;
      return data as Row[];
    },
  });
}

export function useCreate<Feature>() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: Database["public"]["Tables"]["<table_name>"]["Insert"]) => {
      const { data, error } = await supabase.from("<table_name>").insert(payload).select().single();
      if (error) throw error;
      return data as Row;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: KEYS.all }),
  });
}
```

Rules:
- Query keys live as constants at the top of the hook file, not inline.
- Always `throw error` — never return null silently on a Supabase error.
- Invalidate by the `all` key family on any mutation so all list queries refresh.
- Use `Database["public"]["Tables"][...]["Insert"]` for insert payloads — never write
  your own type when the generated one exists.

---

## Route registration (react-router-dom v6)

Locate the router in `src/App.tsx` or the relevant portal router file.
Add the new route inside the correct `<Routes>` block:

```tsx
<Route path="/feature-path" element={<FeaturePage />} />
```

For protected routes (auth required), wrap in the existing `<ProtectedRoute>` component —
do not roll your own auth guard.

---

## Navigation update

If the feature needs a nav link, find the relevant sidebar or nav component under
`src/components/layout/` or `src/components/<portal>/`. Add the link using the existing
`NavLink` pattern — match the style of adjacent items, don't introduce new nav patterns.

---

## Regenerating Supabase types

After applying a migration, regenerate types:
```bash
npx supabase gen types typescript --local > src/integrations/supabase/types.ts
```
Commit the updated `types.ts` in the same PR as the migration. Never let them drift.

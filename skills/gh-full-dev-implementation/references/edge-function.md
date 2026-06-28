# Reference: Edge Function Implementation

Used by `gh-full-dev-implementation` when a feature requires a Supabase Edge Function.
GlobalyApp has 106 Edge Functions — match existing patterns exactly.

---

## File structure

```
supabase/functions/
  <function-name>/
    index.ts       ← entry point (required)
    _shared/       ← shared utilities imported by this function (optional)
```

Shared code used across multiple functions lives in `supabase/functions/_shared/`.

---

## Canonical function skeleton

Every new Edge Function must follow this structure:

```ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// 1. CORS headers — copy exactly, do not modify
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

// 2. Env vars — always at the top, fail fast with !
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

serve(async (req: Request) => {
  // 3. CORS preflight — always first
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // 4. Auth — verify caller identity before any data access
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // 5. User-scoped client (respects RLS)
    const supabaseUser = createClient(SUPABASE_URL, Deno.env.get("SUPABASE_ANON_KEY")!, {
      global: { headers: { Authorization: authHeader } },
    });

    // 6. Admin client — only when RLS bypass is genuinely required
    const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // 7. Input validation
    const body = await req.json();
    if (!body.requiredField) {
      return new Response(JSON.stringify({ error: "Missing requiredField" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // 8. Business logic here

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (err) {
    // 9. Structured error logging
    console.error("[<function-name>] unhandled error:", err);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
```

---

## Auth patterns

### User-authenticated call (most functions)
Use the user's JWT to create a client — this preserves RLS:
```ts
const supabaseUser = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  global: { headers: { Authorization: req.headers.get("Authorization")! } },
});
```

### Admin / system call (background jobs, webhooks)
Use service role ONLY when the operation cannot be done under user context:
```ts
const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
```
Never expose service-role query results directly to the client response.

### Verifying the caller's identity
When you need `auth.uid()` inside a function:
```ts
const { data: { user }, error } = await supabaseUser.auth.getUser();
if (error || !user) return unauthorizedResponse();
const userId = user.id;
```

---

## Input validation

Validate every field before use. Do not trust client input:

```ts
const { field1, field2 } = await req.json();

if (typeof field1 !== "string" || !field1.trim()) {
  return new Response(JSON.stringify({ error: "field1 must be a non-empty string" }), {
    status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
```

For complex shapes, define a local type and validate manually — Deno Edge runtime does
not have Zod available by default without an import map.

---

## Logging

Use `console.error` for errors, `console.log` for key events. Always prefix with the
function name so logs are filterable in Supabase Dashboard:

```ts
console.log("[ai-counselor] processing request for user:", userId);
console.error("[ai-counselor] OpenAI call failed:", err);
```

Do not log sensitive data: JWT tokens, passwords, full user profiles.

---

## Error handling

- Always return a JSON body on errors — never an empty response.
- Use HTTP status codes correctly: 400 (bad input), 401 (not authenticated),
  403 (authenticated but not authorized), 500 (unexpected).
- Wrap the entire `serve` body in `try/catch` to prevent unhandled rejections.
- Log the error before returning — silent 500s are impossible to debug.

---

## Shared utilities

Place code used by 2+ functions in `supabase/functions/_shared/<util>.ts`:

```ts
// supabase/functions/_shared/cors.ts
export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};
```

Import with a relative path:
```ts
import { corsHeaders } from "../_shared/cors.ts";
```

---

## Testing

Edge Functions run in Deno — test with `deno test`:

```ts
// supabase/functions/<name>/index.test.ts
import { assertEquals } from "https://deno.land/std@0.168.0/testing/asserts.ts";

Deno.test("returns 400 when requiredField is missing", async () => {
  const req = new Request("http://localhost", {
    method: "POST",
    headers: { "Authorization": "Bearer fake", "Content-Type": "application/json" },
    body: JSON.stringify({}),
  });
  // import and call your handler directly
  const res = await handler(req);
  assertEquals(res.status, 400);
});
```

---

## Deployment

```bash
# Deploy a single function
npx supabase functions deploy <function-name>

# Deploy all functions
npx supabase functions deploy

# Test locally
npx supabase functions serve <function-name> --env-file .env
```

Call from the client with:
```ts
const { data, error } = await supabase.functions.invoke("<function-name>", {
  body: { requiredField: value },
});
```

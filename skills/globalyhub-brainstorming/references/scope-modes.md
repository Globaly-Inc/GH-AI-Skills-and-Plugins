# Scope Modes

Founder-mode framing: AI compresses implementation cost 10–100×, so the complete, thoughtful solution
often beats the shortcut. But scope is a deliberate choice, not a default. Present all four with
`AskUserQuestion` (recommend one based on the project) and **commit fully** once chosen — no silent drift.

## The four modes

### 1. Scope Expansion — "dream the cathedral"
Propose the ambitious, 12-month-dream-state version. Surface each ambitious addition **individually** so the
user opts in deliberately. Use when the outcome is strategic and getting it right matters more than getting
it fast.

### 2. Selective Expansion — "hold baseline, cherry-pick"
Keep the stated baseline scope intact, but surface a menu of expansion opportunities the user can
cherry-pick. Use when there's appetite for *some* ambition but a deadline or budget constrains it.

### 3. Hold Scope — "maximum rigor on exactly this"
No additions, no removals. Spend all the energy making the stated scope bulletproof: architecture, security,
observability, edge cases, failure modes. Use when scope is already correct and the risk is in execution.

### 4. Scope Reduction — "ruthless minimal"
Strip to the smallest subset that still delivers the core outcome. Cut everything that isn't load-bearing.
Use when speed-to-learning matters most, or when the plan is bloated.

## Commitment & confirmation

- After the user picks, restate the committed scope in one paragraph and get a yes.
- For destructive or hard-to-reverse scope decisions, have the user confirm the specific choice explicitly
  (not a vague "sounds good").
- Re-open the mode only with an explicit new decision — never drift silently mid-design.

## Reversibility lens (apply throughout)

- **One-way doors** (hard to undo: data models, public APIs, auth, money flows): decide carefully, design for
  the dream state.
- **Two-way doors** (cheap to change: copy, layout, internal helpers): decide fast, iterate later.
Label each significant decision so effort is spent where it's actually warranted.

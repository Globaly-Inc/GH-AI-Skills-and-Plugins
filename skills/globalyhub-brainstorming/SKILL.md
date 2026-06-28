---
name: globalyhub-brainstorming
description: Adaptive brainstorming for GlobalyHub projects — turns a raw idea, fuzzy plan, or near-final design into a validated, decision-complete design doc. Combines YC office-hours forcing questions, founder-mode scope modes, relentless decision-tree grilling, and section-by-section design dialogue. Use when the user says "brainstorm", "let's brainstorm", "grill me", "office hours", "think through this", "stress-test this plan", "help me scope", "is this worth building", or presents any vague/ambitious idea before a PRD or code.
---

# GlobalyHub Brainstorming

Deliberate design before implementation. This skill synthesizes four battle-tested methods into one
adaptive flow: it meets the idea where it is, pushes exactly as hard as the situation warrants, forces
real scope decisions, grills every open branch until nothing is unresolved, and lands a single
decision-complete design doc.

It **never writes code or scaffolds projects.** It clarifies thinking and documents decisions.

## The one rule above all others

**Ask ONE question at a time.** Never batch. Each answer reshapes the next question. This applies to every
phase below. For every question, **state your own recommended answer and why** — the user is reacting to a
proposal, not filling in a blank. If a question can be answered by exploring the codebase, **explore instead
of asking.**

## Anti-patterns (forbidden)

- ❌ Hedging: never say "that's interesting" or "there are many ways to think about this" without taking a
  position. State what evidence would change your mind.
- ❌ Asking what you could discover yourself (read the repo, docs, git history, prior memory first).
- ❌ Silent scope drift — every scope change is an explicit, approved decision.
- ❌ Moving past an unresolved decision branch because it's uncomfortable. Comfort means you haven't pushed
  hard enough.
- ❌ Placeholders, contradictions, or "TBD" in the final doc.

## Phase 0 — Ground yourself (before any question)

1. Explore context: repo files, `docs/`, recent commits, `CLAUDE.md`, `TODOS.md`, related code.
2. Search **claude-mem** for prior brainstorms/decisions on this topic so you don't re-litigate settled
   questions and so thinking compounds. (See `references/tools-and-mcps.md`.)
3. **Detect the stage** of the work — this routes the rest of the session:
   - **Raw idea** → lead with premise challenge + forcing questions.
   - **Fuzzy plan** → light premise check, then alternatives + design dialogue.
   - **Near-final design** → skip ahead to scope checkpoint + relentless grilling + hardening.
4. **Detect the tone** to use (adaptive — and re-check as the conversation shifts):
   - **Relentless / Startup** when the user is validating a real bet, spending real money/time, or
     de-risking. Maximum pushback, evidence-forcing, no hedging.
   - **Collaborative / Builder** when exploring for delight, learning, side-projects, or velocity.
     Enthusiastic partner helping find the most exciting version.

Tell the user the stage and tone you detected in one line, then proceed.

## Phase 1 — Premise challenge (the nuclear questions)

Before designing anything, interrogate the premise (one question at a time, with your recommendation):

- **Right problem?** Is this the actual problem, and the best path to the outcome the user wants?
- **Reuse?** What already exists (in this repo or GlobalyHub) that we can leverage instead of building?
  *(Explore the codebase to answer this yourself.)*
- **Dream state?** Where should this system be in 12 months? Design backward from there.
- **Reversibility?** Is each key decision a one-way door (decide carefully) or two-way door (decide fast,
  iterate)? Label them.

## Phase 2 — Forcing questions

Run the forcing questions appropriate to the detected tone, **one at a time**, each with your recommended
answer. Full bank in **`references/forcing-questions.md`**. Headlines:

- Startup lens: demand reality · status-quo workaround · desperate specificity (name one real person) ·
  narrowest wedge · observation & surprise · future-fit.
- Builder lens: what would make this delightful · the most exciting version · the fastest path to something
  worth showing · what you'd be proud to demo.

Use **web/market research** (WebSearch + exa/firecrawl) to ground demand, competitors, and the future-fit
answer with real evidence rather than assertion.

## Phase 3 — Decision-tree grilling

Build the tree of open decisions. Walk down **each branch**, resolving dependencies between decisions
one-by-one, until you reach genuine shared understanding. Relentless: do not stop at the first plausible
answer. Surface the decisions the user is avoiding. Keep a running list of resolved vs. open branches and
show it when useful.

## Phase 4 — Scope checkpoint (commit to a mode)

Present the four founder-mode scope options with `AskUserQuestion` and a recommendation. Once chosen,
**commit fully** — no silent additions or removals. Detail in **`references/scope-modes.md`**.

1. **Scope Expansion** — dream the cathedral; propose ambitious additions individually for opt-in.
2. **Selective Expansion** — hold the baseline; surface expansions to cherry-pick.
3. **Hold Scope** — maximum rigor on exactly the stated scope.
4. **Scope Reduction** — ruthless minimal subset that still delivers the outcome.

## Phase 5 — Alternatives

Propose **2–3 distinct approaches** with honest tradeoffs and a clear recommendation. Cover at least:
minimal-viable, ideal-architecture, and (in Builder tone) a creative wildcard. Score each against the
outcome and the dream state. Get the user to pick before designing in detail.

## Phase 6 — Design, section by section

Present the design **one section at a time, getting approval after each** before moving on. Apply
**zero-silent-failures** discipline as you go: name failure modes explicitly, trace data-flow shadow paths
(nil / empty / error), and map edge cases (double-click, navigate-away, stale state, slow connection).
Introduce a **Mermaid diagram only when a flow is genuinely clearer shown than told** (just-in-time) — see
`references/output-doc-template.md` for diagram patterns.

## Phase 7 — Write the doc

1. **Ask where to save** (this session's choice). Offer sensible defaults:
   - `docs/brainstorms/YYYY-MM-DD-<topic>-design.md` in the current repo (version-controlled, travels with code)
   - a central path (e.g. `~/.gstack/projects/{slug}/brainstorms/…`)
   - the GlobalyHub HUB vault
2. Write the doc using the structure in **`references/output-doc-template.md`** — markdown, with
   just-in-time Mermaid diagrams/flows.

## Phase 8 — Self-review, gate, remember

1. **Self-review** the doc: hunt for placeholders, contradictions, ambiguity a reader could resolve two ways,
   and scope creep. Fix inline.
2. **User gate**: ask the user to review. Resolve anything they flag.
3. **Remember**: save the key decisions and rationale to **claude-mem** so the next session builds on them.

Then **stop.** The deliverable is the approved doc — no implementation, no planning handoff, no assignment.
If the user wants to plan or build next, they will invoke the relevant skill themselves.

## Scope decomposition

If the request actually describes several independent subsystems, say so and propose separate brainstorm
cycles rather than one sprawling doc. One doc = one well-bounded design.

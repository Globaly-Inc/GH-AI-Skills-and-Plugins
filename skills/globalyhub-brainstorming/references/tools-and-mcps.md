# Tools & MCPs

This skill is dialogue-first, but it uses tools to ground the conversation in reality and to compound
knowledge across sessions. Prefer discovering an answer over asking for it.

## 1. Codebase exploration (always)
Before and during questioning, read the repo to answer questions yourself:
- Project files, `docs/`, `CLAUDE.md`, `TODOS.md`, architecture notes.
- Recent git history for what's already built and why.
- Existing implementations to satisfy the Phase-1 "reuse" question.

> grill-me rule: *"If a question can be answered by exploring the codebase, explore the codebase instead."*

## 2. Web / market research (for demand & future-fit)
Ground demand-reality, status-quo, competitor, and future-fit answers with evidence, not assertion:
- `WebSearch` for quick facts and current state.
- **exa** / **firecrawl** MCPs (or the `deep-research` skill) for competitor scans and market signals.
Cite sources in the doc so claims stay auditable.

## 3. Memory — claude-mem (compounding)
- **At start (Phase 0):** search claude-mem for prior brainstorms, decisions, and constraints on this topic
  or project, so settled questions aren't re-litigated.
- **At end (Phase 8):** save the decision log — each decision, its rationale, and reversibility — so the
  next session and other GlobalyHub projects build on it.

## Not used
- **Figma / visual mockups:** out of scope for this skill by design. If a UI decision truly needs a picture,
  describe it in prose or a Mermaid wireframe-style flow and leave visual mockups to a dedicated design step.

## Tool discipline
- Tools serve the dialogue; don't disappear into research. Time-box exploration and bring findings back as a
  recommended answer to the current question.
- Never block the conversation on a tool that's unavailable (offline, no MCP) — fall back to asking, and note
  the assumption in the doc.

# Report Template

One consolidated markdown file. Lead with conclusions, then evidence. Citations sit **next to** the claims
they support (inline `[n]`), with a full registry at the end. Mermaid diagrams just-in-time. No placeholders.

```markdown
# <Product> — Deep Product Research

> AS_OF: YYYY-MM-DD · Source brainstorm doc: <path> · Engines used: Claude subagents, exa/firecrawl, Gemini (used/skipped) · Mode: Fast | Standard

## Executive Summary
<The verdict in 5–8 lines: Is there a market? Where do we fit? What's the wedge? Existing vs new category?
Top 3 risks. Overall confidence.>

## How GlobalyHub Fits  (the verdict)
<The wedge (from competitor weaknesses) + category play + reachable market + top risks. Each line cited.>

## 1. Market & PMF Signals   `confidence: H/M/L`
<Demand evidence, growth, willingness to pay. TAM/SAM/SOM with diagram + assumptions.>

## 2. Competitor Landscape   `confidence: H/M/L`
<Competitor matrix table. Status-quo workaround.>

## 3. Competitor Weaknesses (Voice of Customer)   `confidence: H/M/L`
<Weakness themes, each with # independent mentions + representative cited verbatims. This is the wedge.>

## 4. Positioning   `confidence: H/M/L`
<Perceptual map (Mermaid) + where we land and why.>

## 5. Category Fit   `confidence: H/M/L`
<Existing vs new category recommendation + Five Forces table + industry attractiveness.>

## 6. Trends, Future-Fit & Regulatory   `confidence: H/M/L`
<Tailwinds/headwinds, regulatory constraints, why this matters more over time.>

## Areas of Disagreement / Uncertainty
<Unresolved contradictions between sources; what would resolve them.>

## Implications & Open Questions
<What this means for the product decision; what to validate next.>

## Methodology
<Tracks run (incl. any adaptive extras + why), engines per track, what couldn't be checked (access limits,
skipped paid engine), AS_OF.>

## Citation Registry
<[1] Author/Institution — Title — date — URL — what it establishes — limitation. One row per source.>

### Dropped Sources
<Source — reason rejected (secondary echo / undated / paywalled-unread / contradicted by [n]).>
```

## Completion checklist (P6 self-review)
- [ ] Brainstorm doc was loaded and its product/wedge framed the tracks.
- [ ] All 5 fixed tracks covered (+ any adaptive extras named & justified).
- [ ] All four frameworks present and evidence-backed.
- [ ] Every central claim cited **inline**, not only in the registry.
- [ ] Review-mined weaknesses meet the ≥3-independent-mentions bar (or labeled anecdotal).
- [ ] Dates checked against AS_OF; stale/undated sources flagged.
- [ ] Counter-review passed; dropped sources listed and absent from the body.
- [ ] Contradictions visible, not flattened. Confidence marked per section.
- [ ] Access limits / skipped paid engine disclosed.
- [ ] Diagrams render (valid Mermaid) and earn their place. No placeholders, no "TBD".
- [ ] Single md file; saved to the user-chosen location; key conclusions saved to claude-mem.

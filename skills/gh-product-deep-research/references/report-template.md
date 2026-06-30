# Report Template & Frameworks

One consolidated markdown file. Lead with conclusions, then evidence. Citations sit **next to** the claims
they support (inline `[n]`), plus a registry at the end. Mermaid diagrams **just-in-time** (only where a
picture beats prose). No placeholders.

## Frameworks to apply (all four, evidence-backed)

1. **Competitor matrix + weaknesses** — a table across competitors + the status quo:
   `| Competitor | Segment | Key features | Pricing | Positioning | Top user-reported weaknesses [n] |`
   Below it, a weakness list — each with # independent mentions + 1–2 cited verbatims. This is the wedge.
2. **Positioning map** — pick the two axes buyers care about (e.g. price vs depth) and plot competitors +
   where GlobalyHub lands (aim for an empty, valuable quadrant). Mermaid `quadrantChart`, or a prose 2×2 if it
   won't render.
3. **Market sizing** — TAM/SAM/SOM, top-down + bottom-up, assumptions stated.
4. **Category fit + Five Forces** — existing vs new category recommendation, then rate each of Porter's five
   forces (Low/Med/High + one-line justification) and conclude on industry attractiveness.

Tie them into one **"How GlobalyHub fits"** verdict: the wedge + category play + reachable market + top risks,
each line traceable to a cited finding.

## Report structure

```markdown
# <Product> — Product Research

> AS_OF: YYYY-MM-DD · Brainstorm doc: <path> · Engine: exa|firecrawl|builtin

## Executive Summary
<5–8 lines: market real? where we fit? the wedge? existing vs new category? top 3 risks. Overall confidence.>

## How GlobalyHub Fits  (verdict)
<Wedge (from competitor weaknesses) + category play + reachable market + top risks. Each line cited.>

## 1. Market & Category   `confidence: H/M/L`
<TAM/SAM/SOM (+ assumptions), demand signals, existing-vs-new category call, key trends/regulatory.>

## 2. Competitors   `confidence: H/M/L`
<Competitor matrix + positioning map. Status-quo workaround.>

## 3. Competitor Weaknesses (Voice of Customer)   `confidence: H/M/L`
<Weakness themes, each with # independent mentions + cited verbatims.>

## Risks & Open Questions
<Unresolved contradictions, what to validate next.>

## Methodology & Sources
<Engine used, source cap, what couldn't be checked (paywalls/blocked), AS_OF.
[1] Author — Title — date — url — what it establishes.>
```

## Self-review checklist (single pass)
- [ ] Brainstorm doc loaded and framed the research.
- [ ] All 3 areas covered; ≤6 sources/area respected.
- [ ] All 4 frameworks present and evidence-backed.
- [ ] Every central claim cited **inline**, not only in the source list.
- [ ] Weaknesses meet the ≥3-independent-mentions bar (or labeled anecdotal).
- [ ] Dates checked vs AS_OF; access limits disclosed; confidence marked per section.
- [ ] Diagrams render (valid Mermaid) and earn their place. No placeholders.
- [ ] Single md file saved to the chosen location; key conclusions saved to claude-mem.

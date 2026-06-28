# Verification — Counter-Review Team

No finding enters the report until it survives verification. After the research agents return notes, run a
**counter-review team in parallel** (separate agents, adversarial mindset), then build the citation registry
and apply quality gates.

## Evidence log shape (every research agent uses this)
```text
Claim:
Source:            (URL or retrievable id)
Source type:       official | review | forum | journalism | analysis | dataset
Date / period / version:
What it supports:
Limitation or bias:
Confidence:        high | medium | low
Status:            consensus | disputed | tentative
```

## The four verifiers (run concurrently)

1. **claim-validator** — For each central claim, open the cited source and confirm it actually says that.
   Default to "unsupported" if you can't verify. Flag claims that overreach their source.
2. **source-diversity-checker** — Ensure central claims rest on **independent** sources, not the same
   secondary article echoed across pages. Repeated syndication ≠ independent confirmation.
3. **recency-validator** — For dated/versioned/price/market claims, confirm currency as of **AS_OF**. Flag
   stale stats, superseded versions, undated pages.
4. **contradiction-finder** — Surface conflicts between sources. For each, record both sides, the likely
   reason for the difference, and how the report will handle it (resolve or mark unresolved).

A finding that fails a verifier is **dropped** or **downgraded** (confidence lowered, marked tentative).

## Citation registry (P4)
- Dedupe all sources; assign stable `[n]` numbers.
- Tag each: type, author/institution, title, date, URL, "what it establishes", major limitation.
- **Dropped-sources list:** every source rejected, with the reason (e.g. "secondary echo", "undated",
  "paywalled/unread", "contradicted by [n]"). Dropped sources must not reappear in the report.

## Quality gates
- **Central / decision-driving claim:** primary or strong source + independent confirmation where possible.
- **Numeric / market-size claim:** source + timeframe + scope/population + method stated.
- **Review-mined weakness:** "pattern" only with **≥3 independent user mentions**; otherwise "anecdotal".
- **Contested claim:** present competing interpretations and why sources disagree — never flatten.
- **Recommendation:** explicitly linked to the evidence and assumptions behind it.

If a gate can't be met, say so in the report and lower certainty — do not paper over it.

## Confidence markers
Each report section carries a confidence label (High / Medium / Low) with a one-line rationale tied to source
quality, independence, and recency.

# Research Tracks

Run the **5 fixed tracks** every time. Add **1–2 adaptive extra tracks** only if the brainstorm doc surfaces
a distinct angle worth its own agent (e.g. a regulated vertical, a specific acquisition channel, a platform
dependency). Each track = one Claude subagent, optionally backed by exa/firecrawl and (with approval) Gemini.

For each track the subagent returns **distilled notes only** (claim · source · type · date · supports ·
limitation · confidence), never raw search dumps.

---

## Track 1 — Market & PMF signals
**Goal:** Is there real, sized demand?
- TAM / SAM / SOM (top-down from market reports + bottom-up from unit economics).
- Demand evidence: search volume, growth rate, funding flowing into the space, hiring signals.
- Willingness to pay: existing price points users already pay for the status quo.
- PMF signals in adjacent products (retention/engagement public data, "I can't live without X" testimonials).
**Engines:** exa/firecrawl for reports & signals; Gemini for a heavy market-sizing pass (optional, paid).
**Primary sources to prefer:** analyst reports, filings, government/industry statistics, funding databases.

## Track 2 — Competitor landscape
**Goal:** Who already serves this job?
- Direct + indirect competitors + the status-quo workaround (spreadsheet, manual process, nothing).
- Feature comparison, pricing/packaging, positioning/messaging, target segment, traction signals.
**Engines:** firecrawl to scrape pricing/feature pages; exa for discovery; Claude to structure.
**Primary sources:** official product/pricing pages, docs, changelogs, status pages.

## Track 3 — Competitor weaknesses (voice-of-customer)
**Goal:** Where are incumbents weak, in users' own words?
- Mine **user reviews and forums**: G2, Capterra, Trustpilot, app stores, **Reddit**, Hacker News, X/Twitter,
  community forums, support threads.
- Cluster complaints into themes; quote representative verbatims; count independent mentions.
- **Rule:** a weakness is a "pattern" only with **≥3 independent user mentions** across sources. Otherwise
  label it "anecdotal."
**Engines:** firecrawl (scrape review/forum pages) + exa (find them); Claude to cluster & quote.
**Primary sources:** the reviews/posts themselves (link each verbatim).

## Track 4 — Category fit
**Goal:** Play in an existing category, or design a new one?
- Map existing category(ies): definitions, leaders, buyer expectations, analyst framing.
- Assess whether the product is a better-mousetrap in an existing category (compete on execution) or a
  genuinely new category (category design — higher risk, higher ceiling).
- If new category: what's the name, the "from/to" narrative, and the evidence buyers feel the old category
  failing them?
**Engines:** exa for analyst/category framing; Claude to synthesize.

## Track 5 — Trends, future-fit & regulatory
**Goal:** Will this matter more or less over time?
- Tailwinds/headwinds (tech shifts, AI, platform changes, buyer-behavior shifts).
- Regulatory or compliance constraints (by geography, if relevant).
- The "future-fit" question: why does this become *more* essential as the world changes?
**Engines:** exa/firecrawl for current events & regulation; verify dates against AS_OF.

---

## Adaptive extra tracks (0–2)
Spin up only when the brainstorm doc clearly demands it. Examples:
- **Channel/GTM track** — if distribution is the stated wedge.
- **Regulatory deep-dive** — if the product touches health/finance/legal/data-privacy.
- **Integration/ecosystem track** — if the product depends on a specific platform (Stripe, GCP, Slack, etc.).
Name each extra track and justify it in one line in the report's methodology note.

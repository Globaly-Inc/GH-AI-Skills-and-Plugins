# Engines & MCPs

This skill fans out across **multiple AI models/engines in parallel**. Each track is owned by a Claude
subagent that may delegate search/scrape to MCPs or offload a heavy pass to an external model.

## Availability check (P0)
At intake, confirm which engines are live and tell the user. If one is missing, degrade gracefully — cover
its work with the others and note the limitation (lower confidence). Never fabricate a source to fill a gap.

---

## 1. Claude subagents (Task tool) — orchestration backbone
- Launch **one subagent per track**, concurrently (single message, multiple Task calls).
- Each subagent: plans sub-queries → searches → **opens and reads** key sources → returns **distilled
  structured notes only**. Raw search context stays in the subagent and is discarded (keeps lead-agent
  context lean, daymade pattern).
- No API key required. This is the default that always runs.

## 2. exa + firecrawl MCPs — search & scrape
- **exa**: `web_search_exa`, advanced search, crawling — best for discovery and finding review/forum pages.
- **firecrawl**: `firecrawl_search`, `firecrawl_scrape`, `firecrawl_crawl` — best for pulling full content
  from competitor pricing/feature pages and review/Reddit threads (Track 2 & 3 lean on this).
- Load via ToolSearch when needed. At least one of exa/firecrawl should be available for good coverage;
  if neither is, fall back to Claude's built-in web search and note reduced coverage.

## 3. Gemini Deep Research API — cross-model diversity (PAID)
- A **different model** runs an autonomous research pass on a track — adds genuine cross-model diversity.
- **Cost/latency:** ≈ $2–5 and 2–10 minutes per task. Requires `GEMINI_API_KEY` configured in the environment.
- **Cost-confirm protocol (required):**
  1. Free engines (Claude + exa/firecrawl) run automatically.
  2. Before any Gemini call, present: *which track(s) it will cover, estimated cost (e.g. "~$3–5 for 1
     market-sizing task"), and estimated time.*
  3. Use `AskUserQuestion` to get explicit go-ahead. Proceed only on yes.
  4. If declined or `GEMINI_API_KEY` is absent → cover the track with Claude+MCPs and note it in the report.
- **Best tracks to offload to Gemini:** Track 1 (market sizing) and Track 4 (category framing) — broad,
  synthesis-heavy passes where a second model's independent take is most valuable.
- **Invocation:** call the Gemini Deep Research agent via the configured CLI/script (Bash), with the track's
  research question and a structured output format; ingest its cited markdown as one more evidence source
  (run it through the same P3 counter-review — do not trust it blind).

## Parallelism & limits
- Dispatch all free-engine track agents at once; collect, then run the counter-review team in parallel.
- Time-box each agent; if one stalls, proceed with what returned and note the gap.
- Treat every engine's output as **evidence to be verified**, never as final truth — P3 applies to all of them,
  including Gemini.

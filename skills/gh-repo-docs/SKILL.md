---
name: gh-repo-docs
description: "Generate a complete team reference document for any GitHub repository. Use when given a GitHub URL and asked to document, explain, or create a reference guide for a repo. Triggers on: generate a guide for, create reference docs for, document this repo, explain this github repo, create team docs for, write docs for."
user-invocable: true
---

# Repo Docs — GitHub Repository Reference Generator

Generate a comprehensive team reference document for any GitHub repository. Combines GStack-style structured command tables (Role / Triggers / When to Use / Expected Outcome / Suggested Model) with deep narrative explanations. Output is a shareable Markdown file ready for your team.

**Announce at start:** "I'm using the repo-docs skill to generate a team reference guide."

---

## Step 1: Parse the Repository

Extract `owner/repo` from the URL or message context. If not provided, ask:
> "Which GitHub repo should I document? Please provide the full URL or owner/repo format (e.g. obra/superpowers)."

---

## Step 2: Fetch Repository Metadata

Run these commands to gather core information:

```bash
# Core metadata
gh api repos/{owner}/{repo} --jq '{
  name: .name,
  description: .description,
  stars: .stargazers_count,
  language: .language,
  homepage: .homepage,
  topics: .topics,
  license: .license.name
}' 2>/dev/null

# Root file/directory listing
gh api repos/{owner}/{repo}/contents --jq '.[].name' 2>/dev/null

# Latest release/version
gh api repos/{owner}/{repo}/releases/latest --jq '{tag: .tag_name, date: .published_at}' 2>/dev/null || echo "no releases"
```

---

## Step 3: Adaptive File Discovery

Based on the root listing, fetch relevant files.

**Always fetch (if present):**
- `README.md`
- `CLAUDE.md`
- `AGENTS.md`
- `GEMINI.md`
- `package.json` / `pyproject.toml` / `Cargo.toml` / `go.mod`

**Detection rules — fetch additional files based on signals:**

| Signal in root listing | Repo Type | Additional files to fetch |
|------------------------|-----------|--------------------------|
| `skills/` directory | AI Skills Plugin | All `SKILL.md` files in `skills/*` |
| `.claude-plugin/` or `plugin.json` | Claude Code Plugin | `plugin.json`, `marketplace.json` |
| `hooks/` directory | Agent Framework with Hooks | `hooks.json`, session-start scripts |
| `.sh` files at root | CLI Tool | All shell scripts |
| `Makefile` at root | Build Tool | `Makefile` (first 100 lines) |
| `src/` + `package.json` | Node/JS Library | `package.json` scripts section |
| `pyproject.toml` or `setup.py` | Python Package | CLI entry points |
| `Cargo.toml` | Rust Crate | `Cargo.toml` |

**Fetching file contents from the GitHub API:**
```bash
# Fetch and decode a file
gh api repos/{owner}/{repo}/contents/{path} --jq '.content' | base64 -d 2>/dev/null

# List a directory
gh api repos/{owner}/{repo}/contents/{dir} --jq '.[].name' 2>/dev/null
```

**For repos with `skills/` directory — fetch ALL skills:**
```bash
# List all skill directories
gh api repos/{owner}/{repo}/contents/skills --jq '.[].name' 2>/dev/null

# For EACH skill, fetch SKILL.md:
gh api repos/{owner}/{repo}/contents/skills/{skill-name}/SKILL.md --jq '.content' | base64 -d 2>/dev/null
```

Fetch ALL skills — no cap on number.

**Look for example/config files:**
```bash
gh api repos/{owner}/{repo}/contents --jq '.[] | select(.name | test("example|sample|\\.example$"; "i")) | .name' 2>/dev/null
```

---

## Step 4: Generate the Reference Document

Write a comprehensive Markdown document using the structure below. Skip or add sections based on what you found. Adapt section titles to match the repo type.

---

### Document Template

````markdown
# [Repo Name]: Complete Team Reference Guide

> **Source repo:** [github.com/{owner}/{repo}](https://github.com/{owner}/{repo})
> **Author:** [from README or GitHub profile] | **Stars:** [N]k+ | **Language:** [language]
> **Version:** [latest tag or "main"] | **License:** [license name]
> [If present] **Community:** [Discord/Slack link] | **Docs:** [homepage URL]

---

## Table of Contents

1. [What Is X?](#1-what-is-x)
2. [How It Works](#2-how-it-works--the-core-mechanism)
3. [Installation](#3-installation-by-platform)
4. [Repository File Structure](#4-repository-file-structure)
5. [Complete Workflow](#5-complete-workflow--step-by-step)
6. [Skills/Commands Catalog](#6-skillscommands-catalog)
7. [Philosophy & Core Principles](#7-philosophy--core-principles)
8. [Common Mistakes & How to Avoid Them](#8-common-mistakes--how-to-avoid-them)
[If applicable] 9. [Contributing](#9-contributing)
10. [Quick Reference Card](#10-quick-reference-card)

---

## 1. What Is [Repo Name]?

[2-3 paragraphs covering:]
- What problem this tool solves
- Who uses it and why
- What makes it different from alternatives
- The core value proposition in plain language

**Without [Tool]:**
- [Pain point 1]
- [Pain point 2]

**With [Tool]:**
- [Benefit 1]
- [Benefit 2]

---

## 2. How It Works — The Core Mechanism

[Explain the fundamental mechanism. How does it actually work under the hood?]

```
[ASCII flow diagram showing the main pipeline/loop/process]
[Use box-and-arrow ASCII art]

Input
  │
  ▼
[Step 1 box]
  │
  ▼
[Step 2 box]
  │
  ▼
Output
```

[Explain each step in the diagram — 1-2 sentences per step]

---

## 3. Installation by Platform

[Group by platform. Include all platforms mentioned in README or detected from .claude-plugin/, .codex-plugin/, etc.]

### [Platform 1] ([Recommended / Simplest])

```bash
[exact installation command]
```

[1 sentence: what this command does]

### [Platform 2]

```bash
[exact installation command]
```

[Repeat for each platform]

---

## 4. Repository File Structure

```
[repo-name]/
├── [file or dir]/    ← [one-line: what it does]
├── [file or dir]/    ← [one-line: what it does]
└── [file or dir]/    ← [one-line: what it does]
```

| File/Directory | Who Creates It | Who Uses It | Purpose |
|----------------|---------------|-------------|---------|
| `[path]` | [creator] | [consumer] | [purpose] |

---

## 5. Complete Workflow — Step by Step

[The end-to-end process from first use to completed task. Use the actual workflow from the README/skills.]

```
[Starting point]
 │
 ▼
[1. First step name]
 ├── [sub-action]
 ├── [sub-action]
 └── [sub-action]
 │
 ▼
[2. Second step name]
 │
 ▼
[Final state]
```

[For each numbered step, write 2-3 sentences explaining what happens and why]

---

## 6. [Skills Catalog / Command Reference / API Reference]

[Title adapts: "Skills Catalog" for AI plugins, "Command Reference" for CLI tools, "API Reference" for libraries]

---

### [Skill/Command Name]

| | |
|---|---|
| **Role Specialist** | [The persona this skill/command embodies, e.g. "Senior Software Engineer", "QA Lead", "Systems Debugger"] |
| **Triggers on** | [Exact phrases or contexts that activate this — copy from SKILL.md description field or README] |
| **When to use** | [Specific scenarios where this is the right choice] |
| **When NOT to use** | [Cases where a different skill/command is better] |
| **Expected outcome** | [What you get when this completes successfully] |
| **Suggested model** | [claude-haiku-4-5 / claude-sonnet-4-6 / claude-opus-4-7 — and briefly why. Only include if the repo mentions model guidance.] |

#### How It Works

[2-4 paragraphs explaining:]
- The step-by-step process this skill/command follows
- Key behaviors and what makes it distinctive
- What mandatory steps it enforces (if any)
- How it integrates with other skills/commands in the repo

#### Key Rules

- [Constraint or iron law 1]
- [Constraint or iron law 2]
- [Hard gate or mandatory step]

#### Sample Prompts

```
"[Copy-pasteable example prompt 1 — specific, not generic]"
"[Example prompt 2]"
"[Example prompt 3]"
"[Example prompt 4]"
"[Example prompt 5]"
```

---

[Repeat the above block for EVERY skill/command found in the repo]

---

## 7. Philosophy & Core Principles

[What values and design philosophy is this tool built on? Extract from README philosophy sections, skill names, rule enforcement patterns.]

### [Principle Name 1]

[2-3 sentences: what this principle means in practice, why the authors built it in, what would go wrong without it]

### [Principle Name 2]

[2-3 sentences]

[Continue for all principles]

---

## 8. Common Mistakes & How to Avoid Them

[Extract from README warnings, AGENTS.md gotchas, skill "Red Flags" sections, or infer from the tool's design constraints]

### Mistake 1: [Short Name]

**Symptom:** [What the user sees when this goes wrong]

**Why it happens:** [Root cause]

**Fix:** [Specific action to prevent or resolve]

---

### Mistake 2: [Short Name]

**Symptom:** [...]
**Why it happens:** [...]
**Fix:** [...]

[Minimum 3 mistakes. Aim for 5-7.]

---

## 9. Contributing

[Only include this section if the repo has a CONTRIBUTING.md, PR template, or contribution guidelines in the README/AGENTS.md]

[Key contribution rules, PR requirements, what will/won't be accepted]

---

## 10. Quick Reference Card

### What to use when

```
[Trigger scenario]          → [skill/command]   — [one-line description]
[Trigger scenario]          → [skill/command]   — [one-line description]
[Trigger scenario]          → [skill/command]   — [one-line description]
```

### Core Rules (Iron Laws)

| Concept | Rule |
|---------|------|
| [concept] | [rule in one sentence] |

### Supported Platforms

[List all supported platforms on one line, separated by ·]

---

*Generated from [github.com/{owner}/{repo}](https://github.com/{owner}/{repo}) — [today's date in YYYY-MM-DD]*
````

---

## Step 5: Quality Check Before Saving

Before writing the file, verify every item:

- [ ] Every skill/command found in the repo appears in Section 6
- [ ] No placeholder text remains: no "[fill this in]", "TBD", "TODO", or empty brackets
- [ ] Sample prompts are copy-pasteable (specific scenarios, not "prompt 1")
- [ ] Common Mistakes section has at least 3 entries with Symptom + Fix
- [ ] Quick Reference Card entries match actual skills/commands in Section 6
- [ ] All installation commands are exact (copied from README, not paraphrased)
- [ ] ASCII flow diagram in Section 2 reflects the actual workflow

---

## Step 6: Save the Document

**Always open a native OS file-save dialog so the user can pick the destination** — do not just write to the current directory silently. Suggest `[REPO-NAME]_REFERENCE.md` as the default filename.

### macOS (default — `osascript` native Save dialog)

Run this Bash command to pop up the native file chooser. It returns the full POSIX path the user selected (the file does not need to exist yet — this is a Save-As picker):

```bash
osascript -e 'POSIX path of (choose file name with prompt "Save the repo reference guide as:" default name "[REPO-NAME]_REFERENCE.md")' 2>/dev/null
```

- If the command prints a path → write the document to that exact path with the Write tool.
- If the user **cancels** the dialog, `osascript` exits non-zero and prints nothing → fall back to the text prompt below (do NOT write the file until the user confirms a location).
- To pick a folder instead of a full filename, use `choose folder with prompt "..."` and append `/[REPO-NAME]_REFERENCE.md` to the returned path.

### Linux (fallback)

Try a GUI dialog if one is available, otherwise use the text prompt:

```bash
# GNOME / GTK
zenity --file-selection --save --confirm-overwrite --filename="[REPO-NAME]_REFERENCE.md" 2>/dev/null \
  # KDE fallback
  || kdialog --getsavefilename "$HOME/[REPO-NAME]_REFERENCE.md" '*.md' 2>/dev/null
```

### Windows (fallback)

```bash
powershell -NoProfile -Command "Add-Type -AssemblyName System.Windows.Forms; \$d = New-Object System.Windows.Forms.SaveFileDialog; \$d.Filter='Markdown (*.md)|*.md'; \$d.FileName='[REPO-NAME]_REFERENCE.md'; if(\$d.ShowDialog() -eq 'OK'){ \$d.FileName }"
```

### Text fallback (if no GUI dialog is available or the picker is cancelled)

Ask the user:
> "Reference guide ready. Save as **`[REPO-NAME]_REFERENCE.md`** in the current directory (`[show current working dir]`)?
> Or type a different path to save elsewhere."

If the user presses Enter / says yes / provides no path, write to `[REPO-NAME]_REFERENCE.md` in the current working directory.

> **Note:** `[REPO-NAME]` is a placeholder — substitute the actual repository name (e.g. `SPEC-KIT_REFERENCE.md`) into every command above before running it.

---

## Adaptive Section Rules

**No `skills/` and no CLI commands found:**
Replace Section 6 title with "Key Functions / API Reference" — document the main exported functions, classes, or APIs from source files.

**Has `hooks/` directory:**
Insert a "Hooks Reference" section between Section 6 and Section 7, documenting each hook file, the event it fires on, and what it does.

**Has multiple supported platforms:**
Section 3 must have one subsection per platform with exact install commands.

**README shorter than 100 lines:**
Add a note at the top of Section 1: "Note: This repo has minimal documentation. The following is synthesized from the codebase structure and available files."

**Has example files (*.example, prd.json.example, etc.):**
Include a "Configuration Examples" subsection in Section 4 showing the example file content and explaining each field.

---

## gh API Reference

```bash
# Decode base64 file content (GitHub API encodes all file contents in base64)
gh api repos/{owner}/{repo}/contents/{path} --jq '.content' | base64 -d

# List directory contents
gh api repos/{owner}/{repo}/contents/{dir} --jq '.[].name'

# Get repo metadata
gh api repos/{owner}/{repo} --jq '{stars: .stargazers_count, lang: .language, desc: .description}'

# If gh is not available, use curl:
curl -s https://api.github.com/repos/{owner}/{repo} | python3 -m json.tool
curl -s "https://api.github.com/repos/{owner}/{repo}/contents/{path}" | python3 -c "import sys,json,base64; print(base64.b64decode(json.load(sys.stdin)['content']).decode())"
```

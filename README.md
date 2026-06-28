# GH AI Skills and Plugins

**Globaly Inc's internal Claude Code marketplace.** Install it once and you get every
company-authored skill — across product, research, engineering, and devops — and you stay
in sync automatically as the team ships new skills.

This repo is a [Claude Code plugin marketplace](https://docs.claude.com/en/docs/claude-code/plugins).
It works the same on your laptop or any cloud box.

---

## Install (every team member)

```bash
# 1. Add the company marketplace (one time)
claude plugin marketplace add Globaly-Inc/GH-AI-Skills-and-Plugins

# 2. Install all company skills
claude plugin install globaly-skills@globaly
```

That's it. Restart Claude Code (or start a new session) and the skills are available.

> **Private repo:** make sure your `gh`/git auth can read `Globaly-Inc`. If `marketplace add`
> can't reach the repo, run `gh auth login` (or `gh auth status`) first.

## Staying in sync (automatic)

The plugin ships a `SessionStart` hook (`hooks/auto-sync.sh`) that, on each new session,
refreshes the marketplace and updates `globaly-skills` in the background. New skills land on
your **next** session — no action needed.

Force an update right now:

```bash
claude plugin marketplace update globaly
claude plugin update globaly-skills@globaly   # restart to apply
```

## What's inside

| Skill | Function | Use it when… |
|-------|----------|--------------|
| `product-discovery` | Product | framing a fuzzy idea before a PRD |
| `research-synthesis` | R&D / Research | turning raw research into findings |
| `eng-code-review` | Engineering | reviewing a diff before merge |
| `gh-full-dev-implementation` | Engineering | implementing a feature or improving architecture end-to-end |
| `devops-deploy-check` | DevOps | a pre-deploy Go/No-Go gate |

More skills are added over time — they appear automatically after a sync.

## Verify your install

```bash
claude plugin list            # globaly-skills should be listed
```

## Contributing a skill

See [CONTRIBUTING.md](./CONTRIBUTING.md). Short version: add `skills/<name>/SKILL.md`,
bump the `version` in both manifests, open a PR.

---

_Internal to Globaly Inc. Not for external distribution._

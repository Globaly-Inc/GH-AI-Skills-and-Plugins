# Contributing a skill

This marketplace ships a single plugin, **`globaly-skills`**. Every skill lives under
`skills/` and is distributed to the whole team. Adding or changing a skill is a normal PR
plus a **version bump** — the bump is what tells everyone's machine an update is available.

## Add a new skill

1. Create `skills/<skill-name>/SKILL.md`. The directory name **must match** the `name:` in
   frontmatter (lowercase, kebab-case).
2. Frontmatter:
   ```markdown
   ---
   name: <skill-name>
   description: One sentence on what it does PLUS the trigger phrases that should invoke it.
   ---
   ```
   The `description` is how Claude decides when to use the skill — make the triggers explicit
   (e.g. "Use when the user says 'deploy check', 'go/no-go'…").
3. Write the body: when to use, the process/steps, the expected output. Keep it focused.
   Supporting files (examples, templates) go in `skills/<skill-name>/references/`.
4. **Naming convention:** All custom GlobalyHub skills must be prefixed `gh-`
   followed by a lowercase-kebab-case descriptor, e.g. `gh-prd-generator`, `gh-research-synthesis`.
   The directory name must match the `name:` field exactly.
   Legacy skills without the prefix are grandfathered; do not rename them.

## Bump the version (required for sync)

Edit **both** manifests and raise the version (semver):

- `.claude-plugin/plugin.json` → `version`
- `.claude-plugin/marketplace.json` → the `globaly-skills` entry's `version`

The two **must agree**. `claude plugin tag` validates this and can cut a release tag.

| Change | Bump |
|--------|------|
| New skill / new capability | minor (`0.1.0` → `0.2.0`) |
| Fix / wording in an existing skill | patch (`0.1.0` → `0.1.1`) |
| Breaking change (rename/remove a skill) | major (`0.x` → `1.0.0`) |

## Validate before you push

```bash
claude plugin validate .        # checks marketplace.json + plugin.json + skills
```

## Open a PR

Push a branch and open a PR. Once merged to `main`, teammates pick up the change on their
next session (auto-sync) or via `claude plugin update globaly-skills@globaly`.

## Adding agents or slash commands

Drop `*.md` files into `agents/` or `commands/`. They auto-load with the plugin — still bump
the version so the update propagates.

#!/usr/bin/env bash
#
# Globaly skills auto-sync.
# Runs on session start: refreshes the marketplace metadata and updates the
# globaly-skills plugin so members pick up the latest company skills.
#
# Best-effort and non-blocking: any failure (offline, no auth, CLI missing) is
# swallowed so it never disrupts a session. Updates apply on the NEXT session
# start (the CLI requires a restart to load new plugin versions).

set -u

# Skip if the claude CLI isn't on PATH (e.g. non-CLI environments).
command -v claude >/dev/null 2>&1 || exit 0

claude plugin marketplace update globaly >/dev/null 2>&1 || true
claude plugin update globaly-skills@globaly >/dev/null 2>&1 || true

exit 0

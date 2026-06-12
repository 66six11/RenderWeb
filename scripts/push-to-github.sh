#!/usr/bin/env bash
set -euo pipefail

REMOTE="${REMOTE:-git@github.com:66six11/RenderWeb.git}"
COMMIT_MESSAGE="${COMMIT_MESSAGE:-Add Astro R3F render blog starter}"

if [ ! -d .git ]; then
  git init
  git branch -M main
fi

git remote remove origin 2>/dev/null || true
git remote add origin "$REMOTE"
git add .

git commit -m "$COMMIT_MESSAGE" || true
git push -u origin main

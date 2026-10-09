# CLAUDE.md: MiniBrief website

## ⚠️ Claude Code never pushes to `main` (2026-10-09, John)

`main` auto-deploys to production (minibrief.app) via Vercel. The Claude Code
GitHub Action (`.github/workflows/claude.yml`, triggered by `@claude`) never
pushes to `main` or any default branch. All work goes on a `claude/*` branch
and is opened as a pull request for John to review before merge. The workflow
runs only for trusted authors (OWNER, MEMBER, COLLABORATOR).

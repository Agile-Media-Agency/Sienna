Sienna Monorepo

This repository hosts multiple related apps and shared packages to support adaptive learning and communication tools for Sienna.

Structure
- apps/: individual applications (e.g., age-comparison, chat)
- packages/: shared UI, utilities, and content
- docs/: documentation and decisions
- .github/: (optional) workflows and issue templates

Workspaces
- Root package.json uses npm/pnpm/yarn workspaces: apps/* and packages/*

Getting Started
1) Pick a framework per app (e.g., Next.js, Vite, Expo).
2) Inside an app directory, initialize the chosen framework.
3) Add dependencies and scripts to each app package.json.
4) Share components/utils by importing from packages/ui and packages/utils.

Existing Artifacts To Migrate
- Siennas-stats-favorites-background/age-comparison-app.html
- Siennas-chat-apps/prompt-starter.md

Accessibility & Inclusivity
- Prioritize high-contrast themes, large touch targets, captions, and TTS.
- Respect reduced‑motion settings; keep animations optional.

Notes
- This is scaffolded without installing dependencies. Choose your package manager and initialize per app.

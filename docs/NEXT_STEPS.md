# Next Steps

1) Choose frameworks per app
- Age Comparison: Vite + React or Next.js
- Chat: Next.js recommended (app router, server actions)

2) Migrate existing artifacts
- Move `Siennas-stats-favorites-background/age-comparison-app.html` into `apps/age-comparison` (Vite/Next public or page)
- Integrate prompts from `Siennas-chat-apps/prompt-starter.md` into `packages/content`

3) Install UI foundation
- Use Pico.css for base styling and wire Motion.dev in `packages/ui`
- Ensure reduced-motion friendly animations (opt-in motion)

4) Add basic CI later
- Lint, typecheck, build each workspace

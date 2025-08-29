# Agents

Purpose
- Document how to collaborate with AI agents (e.g., Codex CLI) in this repo.

Guidelines
- Keep prompts short, goal-driven, and include file paths.
- Prefer incremental changes with clear acceptance criteria.
- Ask the agent to update the plan for multi-step tasks.
- Avoid secrets in prompts; use env vars/local files instead.

Conventions
- Use workspace paths in requests (e.g., `apps/age-comparison/...`).
- Prefer applying patches over large copy-paste in messages.
- Keep changes scoped; don’t refactor unrelated code without need.

Review
- For substantive changes, request a brief summary of diffs and impacted files.
- Validate with local runs/tests when possible before merging.


# GitHub Projects Setup

This repo uses GitHub Projects (Beta) to track work (Now / Next / Later).

Two options:

1) Use GitHub UI (fastest)
- Create a new Project under your org or user.
- Add views/fields as you like (Status: Now, Next, Later).
- Link this repo to the project.
- Add a project automation token and URL as repo secrets (see below).

2) Use gh CLI
```bash
gh auth login
# Create repo and push (choose org/user and visibility)
gh repo create Agile-Media-Agency/Sienna --public --source=. --remote=origin --push

# Create project (org example)
gh project create "Sienna" --owner Agile-Media-Agency
gh project list --owner Agile-Media-Agency
# Capture the project URL, e.g. https://github.com/orgs/Agile-Media-Agency/projects/123
```

Automation
- Workflow `.github/workflows/project-add.yml` adds issues/PRs to the project.
- Set these repo secrets (Settings → Secrets and variables → Actions):
  - `PROJECT_URL`: The full project URL (Projects Beta).
  - `PROJECT_TOKEN`: A classic PAT with `project` and `repo` scopes, or a fine-grained PAT with project write access.

Labels
- On push to main/master, `.github/workflows/labels.yml` syncs labels from `.github/labels.yml`.


# Sienna – Project Overview (Pico + Motion) – 2025-08-29–1610
(from ChatGPT)

## Purpose
A calm, step-by-step AAC app that helps Sienna build clear messages with minimal cognitive load. Predictable layouts, large tap targets, and optional gentle motion.

## Tech Stance (Phase 1)
- **Framework:** Vanilla HTML/JS (or Vite Vanilla) for prototype; React later.
- **UI:** **Pico.css** (tokens via CSS variables) + **Motion One** for micro-interactions.
- **Data:** Schema-first JSON (categories, templates, options).
- **A11y:** High contrast themes, large targets, respect `prefers-reduced-motion`.

## Why Pico + Motion (not Tailwind/shadcn) now
- Tiny footprint, quick to theme, great defaults for large touch surfaces.
- We own the visual language; no fighting a component library.
- We can add shadcn selectively in Phase 2+ for Dialog/Sheet/Select if needed.

## Style Tokens (base theme)
- clay `#CC6A4C` (primary) · gold `#93784E` (surface-2) · cream `#F7E4D2` (bg)
- charcoal `#161614` (text) · offwhite `#FFFBF4` (cards/sticky)
- Corners 24px · Shadow `0 8px 24px rgba(22,22,20,0.06)`
- Type: **Prata** (serif headings), **Inter** (body/buttons). Body 18–20px.

## Themes
- `sienna-default` (above tokens)
- `sienna-contrast` (stronger contrast)
- `sienna-playful` (soft rose/lilac, still calm)
HTML attribute drives theme: `<html data-theme="sienna-default">`. CSS maps `--pico-*` vars to our theme vars.

## Motion Rules (Motion One)
- Page enter: fade + 12px slide (220ms, ease-out), motion-safe.
- Card/Button press: scale 0.98 on down/1.0 on up (150ms).
- Sticky bar “bump” to 1.02 on token add (180ms).
- Disable animations if `prefers-reduced-motion: reduce`.


---

## Information Architecture

The app is organized into a simple step-by-step wizard, with a sticky sentence bar at the top and footer navigation (Back · Main Menu) at the bottom. This structure ensures predictable navigation, large touch targets, and minimal cognitive load.

### Phase 1 – Core Flows

1. **Main Menu**

   * Layout: 2×2 grid (scrollable if more options are added later).
   * Starter categories: *How I Feel*, *Ask Something*, *I Want To*, *Quick Chat*.
   * Categories are customizable by caregivers. “Favorites” can float to the top.

2. **How I Feel**

   * Template: “I feel {emotion}.”
   * Six starter emotions (happy, tired, loved, frustrated, excited, nervous).
   * Customizable list, with parent/guardian lock to prevent accidental edits.

3. **Ask Something**

   * Phase 1 scope: single person, current age (e.g., “How old is Mommy?”).
   * Template system: `{question} {subject}`.
   * Confirm & Send after one selection.

4. **Sticky Sentence Bar**

   * Always visible.
   * Shows sentence tokens being built.
   * Includes Undo (remove last token) and Reset (clear all).

5. **Footer Navigation**

   * Back (step back one screen).
   * Main Menu (reset + return).

---

### Phase 2 – Comparisons

* Add “+ Add another person” in Ask flows.
* Example: “Mommy is 39. Daddy is 41. Chad Wild Clay is 41.”
* Schema update: templates accept arrays of subjects.

---

### Phase 3 – Time Anchors

* Add optional “at what time?” step.
* Choices:

  * “Today” (default).
  * “When Sienna was {age}.”
  * “On event {name} (with stored date).”
* Backend calculates ages by subtracting birthdates from event date.
* Schema update: `events.json` file for concerts, shows, milestones.

---

### Phase 4 – Visual Timelines

* Add simple timeline visualization: horizontal bar chart or stacked cards.
* Shows side-by-side ages at chosen date/event.
* Helps reinforce developmental concept that parents were once younger too.

---

This keeps **Phase 1 extremely lightweight** (one-person age lookups, emotions, basic sentences) while laying the foundation for comparison, events, and timelines later. Each phase is additive — schema-first design ensures no rewrites.

---


## Schema (JSON)
- `categories.json` – top-level options
- `templates.json` – sentence patterns (arrays like `["How old is", "{person}"]`)
- `options.json` – choice sets keyed by template step (e.g., `choose_person`)

## Component Primitives (Phase 1)
- `StickySentenceBar` (offwhite pill, actions: Undo/Reset)
- `CategoryCard` (offwhite card, large tap target)
- `OptionButton` (large, offwhite or clay variant)
- `FooterNav` (gold surface)

## Roadmap
- **Phase 1:** Pico + Motion prototype (no LLM). Confirm flows and ergonomics on device.
- **Phase 2:** Personalization (family, favorites, ages); optional shadcn for Dialog/Sheet/Select.
- **Phase 3:** TTS preview; restricted contacts for messaging; Save Favorites.
- **Phase 4:** LLM add-on (events, lookups, preferences) with caregiver-controlled scope.

## Repo Alignment (update plan)
- Root README: keep monorepo description; add Pico/Motion as Phase-1 UI choice.
- `docs/NEXT_STEPS.md`: replace Tailwind/Shadcn with Pico/Motion for Phase 1.
- `apps/chat/README.md`: set “Pico + Motion” as starter; React later.
- `docs/ACCESSIBILITY.md`: keep as-is (good).
- Keep `docs/PROJECTS.md` as-is for project automation.



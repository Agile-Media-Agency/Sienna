Absolutely—let’s **bake in #4 now** so Base44, Claude, or a CLI can scaffold a clean, extensible project before any UI code gets generated.

// Below is compact starter pack you can paste into tools (or drop in as files) so the app is schema-first, componentized, motion-ready, and easy to scale.

# Sienna – Project Overview – 2025-08-29–1520 (from ChatGPT)

## Goals (short)

* Step-by-step AAC wizard that assembles clear sentences with minimal cognitive load.
* Calm, wellness-style UI (not “kiddy”).
* Schema-first data model so Phase 2+ is additive, not a rewrite.
* Safety: restricted messaging targets later.

## Tech stance (Phase 1)

* React + Tailwind + Motion One (motion.dev).
* TypeScript for stability.
* JSON-configured content (categories, templates, options).
* Simple state machine (reducer or XState optional later).
* No LLM yet (hooks reserved for Phase 4).

---

## Since Shadcn/ui provides the base components and Motion.dev handles animations, they are a powerful combination for creating highly interactive user interfaces. Many developers and component libraries integrate Motion.dev with Shadcn/ui to add smooth transitions and effects. For example, a developer can: 
* Wrap a Shadcn card component with Motion.dev's <motion.div /> to animate its entry.
* Create a custom button by composing a Shadcn button with Motion.dev's animation properties.
* Integrate pre-made Shadcn-like components that already have Motion.dev animations built-in, from projects like Motion-Primitives or Aceternity UI. 
## Shadcn UI provides the building blocks (the components). For example, it gives you the code for a button, a card, or a dialog box.
## Motion.dev provides the instructions for how those blocks should move. For example, it tells the button to spring into place when it appears or tells the card to fade out smoothly when it's removed. 
## Using them together allows you to build a UI with both the solid structure from Shadcn UI and the dynamic, engaging animations from Motion.dev. 

# Sienna – Repository Structure – 2025-08-29–1520 (from ChatGPT)

```
sienna/
├─ README.md
├─ docs/
│  ├─ 01-Design-Principles.md
│  ├─ 02-Style-Tokens.md
│  ├─ 03-IA-and-Flow.md
│  └─ 04-Phases.md
├─ src/
│  ├─ app/
│  │  ├─ routes.ts           # simple route ids for steps
│  │  └─ App.tsx
│  ├─ components/
│  │  ├─ StickySentenceBar.tsx
│  │  ├─ CategoryCard.tsx
│  │  ├─ OptionButton.tsx
│  │  └─ FooterNav.tsx
│  ├─ state/
│  │  ├─ sentenceReducer.ts   # append/remove tokens, reset
│  │  └─ useStepNav.ts        # next/back/reset hooks
│  ├─ schema/
│  │  ├─ categories.json      # top-level nav options
│  │  ├─ templates.json       # sentence templates
│  │  └─ options.json         # options keyed by template
│  ├─ styles/
│  │  └─ tokens.css           # CSS vars if needed
│  └─ pages/
│     ├─ MainMenu.tsx
│     ├─ HowIFeel.tsx
│     ├─ AskTemplate.tsx
│     ├─ AskChooseWho.tsx
│     └─ ConfirmSend.tsx
├─ tailwind.config.js
├─ package.json
└─ motion.d.ts                # typing helpers for Motion One
```

---

# Sienna – Style Tokens – 2025-08-29–1520 (from ChatGPT)

**Tailwind `extend`**

```js
// tailwind.config.js (extend)
theme: {
  extend: {
    colors: {
      clay: '#CC6A4C',
      gold: '#93784E',
      cream: '#F7E4D2',
      charcoal: '#161614',
      offwhite: '#FFFBF4',
    },
    boxShadow: {
      soft: '0 8px 24px rgba(22,22,20,0.06)',
    },
    borderRadius: {
      xl: '24px',
    },
    fontFamily: {
      serif: ['Prata', 'Playfair Display', 'serif'],
      sans: ['Inter', 'system-ui', 'sans-serif'],
    },
  }
}
```

**Motion guidance**

* Screen transitions: fade + 12px slide (200–240ms, ease-out), `motion-safe`.
* Button/Card press: scale to 0.98 on down, return on up (150ms).
* Sticky bar “bump” (1.02) when a token is added.
* Respect `prefers-reduced-motion: reduce`.

---

# Sienna – Schema (Phase 1 JSON) – 2025-08-29–1520 (from ChatGPT)

`src/schema/categories.json`

```json
{
  "categories": [
    { "id": "feel", "label": "How I Feel", "icon": "😊" },
    { "id": "ask", "label": "Ask Something", "icon": "❓" },
    { "id": "want", "label": "I Want To", "icon": "▶️" },
    { "id": "quick", "label": "Quick Chat", "icon": "💬" }
  ]
}
```

`src/schema/templates.json`

```json
{
  "templates": [
    {
      "id": "feel_template",
      "category": "feel",
      "pattern": ["I feel", "{emotion}"],
      "next": "choose_emotion"
    },
    {
      "id": "ask_age",
      "category": "ask",
      "pattern": ["How old is", "{person}"],
      "next": "choose_person"
    },
    {
      "id": "ask_where",
      "category": "ask",
      "pattern": ["Where is", "{place}"],
      "next": "choose_place"
    }
  ]
}
```

`src/schema/options.json`

```json
{
  "choose_emotion": {
    "type": "static",
    "items": [
      { "value": "happy 😊" },
      { "value": "tired 😴" },
      { "value": "loved 🥰" },
      { "value": "frustrated 😣" },
      { "value": "excited 🎉" },
      { "value": "nervous 😬" }
    ]
  },
  "choose_person": {
    "type": "static",
    "items": [
      { "value": "Mommy", "meta": { "age": 39 } },
      { "value": "Daddy", "meta": { "age": 41 } },
      { "value": "You (S)", "meta": { "age": 14 } },
      { "value": "Chad Wild Clay", "meta": { "age": 41 } }
    ]
  },
  "choose_place": {
    "type": "static",
    "items": [
      { "value": "home" },
      { "value": "school" },
      { "value": "the theater" }
    ]
  }
}
```

> Phase 2 simply adds more **templates** (e.g., “Can we watch {topic}?”) and changes `type` to `"dynamic"` for lists that will later be LLM- or DB-backed.

---

# Sienna – Component Contracts – 2025-08-29–1520 (from ChatGPT)

```ts
// StickySentenceBar.tsx
type StickySentenceBarProps = {
  tokens: string[];                 // current sentence parts
  canUndo: boolean;
  onUndo: () => void;
  onReset: () => void;
};
```

```ts
// CategoryCard.tsx
type CategoryCardProps = {
  id: string;
  label: string;
  icon?: string;
  onSelect: (id: string) => void;
};
```

```ts
// OptionButton.tsx
type OptionButtonProps = {
  label: string;
  variant?: 'primary' | 'secondary';
  onSelect: () => void;
  disabled?: boolean;
};
```

```ts
// FooterNav.tsx
type FooterNavProps = {
  onBack: () => void;
  onMain: () => void;
};
```

---

# Sienna – State & Navigation – 2025-08-29–1520 (from ChatGPT)

**Sentence reducer (append/remove/reset)**

```ts
// sentenceReducer.ts
type Action =
  | { type: 'ADD_TOKEN'; token: string }
  | { type: 'UNDO' }
  | { type: 'RESET' };

export function sentenceReducer(state: string[], action: Action) {
  switch (action.type) {
    case 'ADD_TOKEN': return [...state, action.token];
    case 'UNDO': return state.slice(0, -1);
    case 'RESET': return [];
    default: return state;
  }
}
```

**Step navigation hook**

```ts
// useStepNav.ts
export function useStepNav() {
  const [route, setRoute] = React.useState<'menu'|'feel'|'askTmpl'|'askWho'|'confirm'>('menu');
  return {
    route,
    goto: setRoute
  };
}
```

**Routes map**

```ts
// routes.ts
export const routes = {
  menu: 'menu',
  feel: 'feel',
  askTmpl: 'askTmpl',
  askWho: 'askWho',
  confirm: 'confirm',
} as const;
```

---

# Sienna – Motion One hooks – 2025-08-29–1520 (from ChatGPT)

```ts
import { animate } from 'motion';

export function useEnterTransition(ref: React.RefObject<HTMLElement>) {
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(12px)';
    animate(el, { opacity: 1, transform: 'translateY(0px)' }, { duration: 0.22, easing: 'ease-out' });
  }, []);
}

export function bump(el: HTMLElement) {
  animate(el, [{ transform: 'scale(1)' }, { transform: 'scale(1.02)' }, { transform: 'scale(1)' }],
    { duration: 0.18, easing: 'ease-out' });
}
```

---

# Sienna – README.md (starter) – 2025-08-29–1520 (from ChatGPT)

**Overview**
Sienna is a calm, step-by-step AAC prototype that builds sentences with minimal cognitive load. It is schema-first and expandable to personalization and AI.

**Run**

```
npm i
npm run dev
```

**Phases**

* Phase 1: Core UX (this repo)
* Phase 2: Personalization (family, favorites, ages)
* Phase 3: Feedback & Safety (TTS, restricted contacts)
* Phase 4: AI Enhancements (events, knowledge, suggestions)

**Design**
See `/docs` and Tailwind tokens. Motion One controls subtle, accessibility-aware animations.

---

# Prompts you can paste (kickoff + build)

## Kickoff Prompt (for Claude/Base44)

```
Create a new React + TypeScript + Tailwind + Motion One project named “Sienna” using the attached/defined file structure, style tokens, and schema. Do not add LLMs yet.

Requirements:
1) Use schema-first JSON in src/schema for categories, templates, and options; read these to power screens.
2) Implement components: StickySentenceBar, CategoryCard, OptionButton, FooterNav (per contracts).
3) Implement pages: MainMenu, HowIFeel, AskTemplate, AskChooseWho, ConfirmSend.
4) Implement sentenceReducer (ADD_TOKEN, UNDO, RESET) and useStepNav for routing.
5) Apply Tailwind tokens and Motion One transitions exactly as documented.
6) Keep screens to a 2x2 grid max and large tap targets. Respect prefers-reduced-motion.
7) Use our color palette, type, radius, shadows, and motion rules.

Deliver compilable code with the above structure and minimal dummy data from the JSON files.
```

## Phase 1 Build Prompt (after scaffolding)

```
Wire up flows:
- MainMenu → HowIFeel: append “I feel” then pick {emotion}; Allow Undo/Reset.
- MainMenu → AskTemplate: pick “How old is” → AskChooseWho list (from options.json).
- AskChooseWho → ConfirmSend: render complete sentence (e.g., “Mommy is 39 years old.”) and enable Send Message CTA (no actual messaging yet).
- StickySentenceBar: show tokens; on ADD_TOKEN bump; provide Undo/Reset.
- FooterNav: Back (step back), Main Menu (return & Reset).

Ensure grammatically correct assembly (avoid duplicated verbs/objects) by using template pattern arrays.
```

---

## Why this prevents future pain

* **Schema-first** means Phase 2 (family tree, favorites) is just more JSON + a new page; no rewrites.
* **Component contracts** keep styling and motion consistent while you expand.
* **Reducer + hooks** centralize sentence logic and step navigation; easy to test.
* **Motion One wrapper hooks** keep animation code tidy and accessible.

If you want, I can also generate the actual **starter files** in a zip (README, docs, JSON, TypeScript stubs) using your naming convention so you can import straight into Base44/GitHub.

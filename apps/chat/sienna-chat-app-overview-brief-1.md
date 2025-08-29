    Please apply the following style guide when generating the interface. The app should feel calm and supportive, not childish. Use the color palette provided, rounded corners, soft shadows, and clear typography. Headings should use a soft serif, body text a clean sans. Buttons must be large, centered, and easy to tap. The interface should resemble the calm design of modern wellness/yoga apps, not bright kids’ games.

    Perfect — let’s reset and build a **clear, expandable foundation** before you hand anything to Claude or Base44. I’ll give you:

1. **High-level design principles** (so you don’t paint yourself into a corner later).
2. **A phased roadmap** (functional build order).
3. **A consolidated “start from scratch” prompt** you can paste.
4. **Optional add-ons** you might want to decide on *before* coding starts (to avoid costly refactors).

---

## 1. Design Principles

* **Simplicity over breadth**: One-step-at-a-time wizard flow with predictable layouts. Don’t overload screens with 10 options — 2×2 grid max.
* **Expandable schema**: Treat everything (emotions, questions, family, topics) as entries in structured lists. That way adding “new cousins” or “new bands” doesn’t require hard-coding.
* **Safety-first**: Messaging integration should be restricted from the beginning (family whitelist, no arbitrary numbers).
* **Accessibility baked in**: High-contrast tokens, large tap targets, predictable motor patterns, `prefers-reduced-motion` respected.
* **Styling = calm tool, not kiddy app**: Gentle palette, serif/sans typography, soft shadows, minimal but elegant motion (Motion One).
* **LLM optional but planned**: Core functionality should work without AI. Then you can layer in AI for dynamic questions/events without rewriting the base.

---

## 2. Roadmap (Phased Build)

**Phase 1 — Core UX**

* Step-by-step wizard (sentence bar + Back/Undo/Reset).
* Categories: *How I Feel*, *Ask Something*, *I Want To*, *Quick Chat*.
* Sticky sentence bar at top.
* Confirm & Send screen.
* Motion One: subtle transitions (fade/slide, bump animations).

**Phase 2 — Personalization**

* Family database (names, ages, relationships).
* Favorites/topics (Spy Ninjas, Shrek, Kidz Bop, etc.).
* Editable lists with “+ Add” flow.

**Phase 3 — Feedback & Safety**

* Text-to-speech preview before sending.
* Restricted messaging (only whitelisted contacts).
* Save “favorite sentences.”

**Phase 4 — AI Enhancements**

* Simple LLM integration for answering dynamic questions (“When is the next Shrek show?”).
* Contextual memory (knows family ages, compares).
* Parental controls for what AI can/can’t fetch.

---

## 3. Clean Starting Prompt

Here’s what you can paste directly into Claude or Base44 to begin fresh:

```
I want to design a mobile-first AAC prototype called “Sienna” for my 14-year-old daughter, who has cerebral palsy. She can read well but struggles with spelling, typing, and motor control. She loves predictive text but ends up producing gibberish. This tool should help her express herself clearly in text messages.

**Core Goal:**  
A step-by-step wizard that builds sentences one choice at a time. Predictable layouts, calm styling, and minimal cognitive load. 

**Constraints:**  
- Reading/comprehension: 1st–2nd grade.  
- Large buttons, 2×2 grid max.  
- Sticky sentence bar at top with Undo, Reset, Back, and Main Menu always available.  
- No open contact lists — only whitelisted family messaging in future phases.  
- Respect accessibility (`prefers-reduced-motion`).  

**Style Guide:**  
- Palette: clay #CC6A4C (primary), gold #93784E (surface-2), cream #F7E4D2 (background), charcoal #161614 (text), offwhite #FFFBF4 (cards/sticky).  
- Typography: Prata/Playfair (serif for headings), Inter (sans for body/buttons). Headings 32–36px, body 18–20px, buttons 20–22px.  
- Shape: rounded 24px corners, soft shadows (0 8px 24px rgba(22,22,20,0.06)).  
- Motion: Use Motion One (motion.dev). Screen transitions = fade + 12px slide (220ms, ease-out). Buttons/cards scale 0.98 on press. Sticky bar bump when adding a word. All motion disabled if `prefers-reduced-motion`.  
- Tone: calm, elegant, not kiddy. More like a wellness app than a game.  

**Phase 1 scope only (build now):**  
1. Main Menu: 2×2 grid (How I Feel, Ask Something, I Want To, Quick Chat).  
2. How I Feel: sentence bar “I feel —”; options grid of 6 emotions (happy, tired, loved, frustrated, excited, nervous).  
3. Ask Something: choose template (How old is / Where is / When is / What time is / Can we watch / Can you tell me about). Updates sticky bar.  
4. Ask Something → choose who/topic: list of cards (Mommy, Daddy, You (S), Chad Wild Clay).  
5. Confirm & Send: sentence preview + “Send Message” button.  

Please generate this in React + Tailwind, styled with the tokens above, using Motion One for transitions.
```

---

## 4. Suggested Add-ons Before Coding

* **Schema-first data model**: Even in Phase 1, use JSON to define categories, options, and templates. That way Phase 2 (family tree, favorites) just extends the schema.
* **Component library mindset**: Treat CategoryCard, OptionButton, StickySentenceBar, FooterNav as reusable components. Will save you headaches when expanding.
* **Preview early on a phone**: Some AAC users respond differently to desktop vs. touchscreen. Test on-device ASAP.
* **Plan for scaling**: If Base44 generates code, make sure it’s structured for modular expansion (e.g., hooks for personalization, context for data, services for messaging).

---

👉 Would you like me to also draft the **Phase 2 prompt** now (so when you’re ready you can just paste it in), or do you want to test Phase 1 with Sienna first before adding family + favorites?

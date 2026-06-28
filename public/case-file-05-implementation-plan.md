# case-file-05 — Implementation Plan

**Project:** Cryptic Hunt (Project Mayhem)
**Case:** case-file-05 — 8 Puzzles
**Route:** `/hunt/case-05`
**Stack:** Next.js 15 · TypeScript · Zustand · Framer Motion · Tailwind CSS

---

## Table of Contents

1. [Overview](#1-overview)
2. [File Structure](#2-file-structure)
3. [Routing](#3-routing)
4. [Shared Architecture](#4-shared-architecture)
5. [State Management](#5-state-management)
6. [Answer Validation](#6-answer-validation)
7. [Puzzle Specifications](#7-puzzle-specifications)
8. [Dependency Map](#8-dependency-map)
9. [Build Order](#9-build-order)
10. [Audit & Risk Notes](#10-audit--risk-notes)

---

## 1. Overview

case-file-05 is a self-contained puzzle module with 8 interactive puzzles. Each puzzle has a unique interactive UI component, a shared answer-validation layer, and a shared hint system. Progress persists to `localStorage`. All puzzle components are lazy-loaded via `next/dynamic`.

**The 8 Puzzles**

| ID  | Slug           | Title              | Answer          | Fuzzy Threshold |
|-----|----------------|--------------------|-----------------|-----------------|
| P01 | math-trick     | The Math Trick     | `42`            | exact           |
| P02 | wilhelm        | The Famous Scream  | `Private Wilhelm` | 0.80          |
| P03 | taured         | The Missing Country | `Taured`        | exact           |
| P04 | kryptos        | The CIA Sculpture  | `Berlin`        | exact           |
| P05 | deep-blue      | Man vs Computer    | `Garry Kasparov`| 0.85            |
| P06 | golden-record  | The Golden Record  | `Carl Sagan`    | 0.85            |
| P07 | demon-core     | The Deadly Metal   | `Demon Core`    | exact           |
| P08 | poe-cipher     | The 150-Year Code  | `Gil Broza`     | 0.80            |

**Scoring:** Base 300 pts per puzzle. Each hint used deducts 50 pts. Max total: 2400 pts.

---

## 2. File Structure

```
app/
└── hunt/
    ├── page.tsx                          # Dashboard — CHOOSE CASE FILE grid
    └── case-05/
        └── page.tsx                      # case-file-05 entry point

components/
└── case-file-05/
    ├── CaseFileLayout.tsx                # Dark wrapper + ambient audio + progress bar
    ├── CaseFileProvider.tsx              # Wraps Zustand store into context
    │
    ├── components/
    │   │
    │   ├── # ── Shared ──────────────────────────────────────────
    │   ├── PuzzleHub.tsx                 # 8-card selection grid
    │   ├── PuzzleShell.tsx               # Shared wrapper: title, clue, answer zone
    │   ├── AnswerInput.tsx               # Input + fuzzy match + partial credit
    │   ├── HintSystem.tsx                # 3-hint system, -50 pts each
    │   ├── SolvedReveal.tsx              # Confetti + lore text + next puzzle CTA
    │   ├── ProgressBar.tsx               # 0/8 solved indicator
    │   │
    │   ├── # ── Per-puzzle ──────────────────────────────────────
    │   ├── p01-math-trick/
    │   │   ├── MathTrick.tsx             # Orchestrator
    │   │   ├── HexConverter.tsx          # Live hex → decimal field
    │   │   ├── DigitCards.tsx            # Animated digit breakdown
    │   │   └── SumCounter.tsx            # Ticking sum to 42
    │   │
    │   ├── p02-wilhelm/
    │   │   ├── WilhelmScream.tsx         # Orchestrator
    │   │   ├── WaveformVisualizer.tsx    # Canvas AudioContext waveform
    │   │   └── AudioPlayer.tsx           # Howler.js wrapper, button-triggered
    │   │
    │   ├── p03-taured/
    │   │   ├── TauredPassport.tsx        # Orchestrator
    │   │   ├── PassportCard.tsx          # Aged-paper CSS styled card
    │   │   ├── EuropeMapSVG.tsx          # SVG Europe, pin between FR+ES
    │   │   └── DisappearingMan.tsx       # Framer Motion fade-out silhouette
    │   │
    │   ├── p04-kryptos/
    │   │   ├── KryptosCipher.tsx         # Orchestrator
    │   │   ├── CipherPanel.tsx           # Monospace stone-styled cipher text
    │   │   └── ClueReveal.tsx            # Sequential: CLOCK → BERLIN → NORTHEAST
    │   │
    │   ├── p05-deep-blue/
    │   │   ├── DeepBlueChess.tsx         # Orchestrator
    │   │   ├── ChessReplay.tsx           # PGN auto-replay, 1.5s/move
    │   │   └── BlunderHighlight.tsx      # Move-7 red flash + tooltip
    │   │
    │   ├── p06-golden-record/
    │   │   ├── GoldenRecord.tsx          # Orchestrator
    │   │   ├── VinylSpinner.tsx          # CSS rotate animation, SVG disc
    │   │   ├── EEGWaveform.tsx           # SVG sinusoidal brainwave path
    │   │   └── VoyagerTimeline.tsx       # 1977 launch → 1981 marriage scroll
    │   │
    │   ├── p07-demon-core/
    │   │   ├── DemonCore.tsx             # Orchestrator
    │   │   ├── PlutoniumSphere.tsx       # CSS radial-gradient pulsing glow
    │   │   └── IncidentTimeline.tsx      # Daghlian 1945 → Slotin 1946 vertical
    │   │
    │   └── p08-poe-cipher/
    │       ├── PoeCipher.tsx             # Orchestrator
    │       ├── CipherText.tsx            # Parchment CSS bg + cipher display
    │       └── YearCounter.tsx           # rAF-driven 1840 → 2000 tick
    │
    ├── hooks/
    │   ├── useCaseStore.ts               # Zustand store (solved, score, hints)
    │   ├── useAnswerValidation.ts        # Calls answerMatcher, returns MatchResult
    │   └── useHints.ts                   # Per-puzzle hint state and deduction
    │
    └── lib/
        ├── puzzles.config.ts             # PuzzleConfig[] — all 8 definitions
        ├── answerMatcher.ts              # Fuzzy match + alias + partial-credit logic
        └── scoring.ts                    # Score calculation helpers

public/
└── case-05/
    ├── wilhelm.mp3                       # Wilhelm Scream (public domain)
    └── game6-1997.pgn                    # Kasparov vs Deep Blue, Game 6
```

---

## 3. Routing

```
/hunt              →  app/hunt/page.tsx              # Dashboard
/hunt/case-05      →  app/hunt/case-05/page.tsx      # This case
```

`app/hunt/case-05/page.tsx` renders:

```tsx
import { CaseFileProvider } from "@/components/case-file-05/CaseFileProvider"
import { CaseFileLayout }   from "@/components/case-file-05/CaseFileLayout"
import { PuzzleHub }        from "@/components/case-file-05/components/PuzzleHub"

export default function CaseFile03Page() {
  return (
    <CaseFileProvider>
      <CaseFileLayout>
        <PuzzleHub />
      </CaseFileLayout>
    </CaseFileProvider>
  )
}
```

When a puzzle is selected, `PuzzleHub` swaps to `PuzzleShell` with the appropriate lazy-loaded puzzle component. No sub-routing needed — single-page state transition.

---

## 4. Shared Architecture

### 4.1 CaseFileLayout

Renders the persistent dark wrapper for all case-05 UI. Includes:

- `ProgressBar` — shows `X / 8 solved` at top
- Ambient audio toggle (optional, muted by default)
- Back-to-hub breadcrumb when inside a puzzle

### 4.2 PuzzleHub

8-card selection grid. Each card has three states:

| State    | Visual                                         |
|----------|------------------------------------------------|
| `locked` | Greyed out, `🔒` icon (future: unlock gates)   |
| `active` | Full opacity, hover glow, clickable            |
| `solved` | Green checkmark overlay, score shown           |

All 8 are `active` by default (no sequential locking required unless specified).

### 4.3 PuzzleShell

Shared wrapper rendered around every puzzle. Props:

```ts
type PuzzleShellProps = {
  puzzleId: number
  title: string
  clue: string            // paragraph text shown above the UI
  children: ReactNode     // the puzzle-specific interactive component
}
```

Renders: title → clue text → `{children}` → `AnswerInput` → `HintSystem` → `SolvedReveal`

### 4.4 AnswerInput

Single `<input>` + submit button. On submit, calls `useAnswerValidation` and handles:

- **Correct** — triggers `SolvedReveal`
- **Partial** — e.g. user typed "Carl" → shows inline prompt "Include the full name"
- **Wrong** — shake animation, wrong counter increments

Strips punctuation and normalises to lowercase before matching. Never shows "wrong" for near-misses within fuzzy threshold.

### 4.5 HintSystem

3 hints per puzzle, stored in `puzzles.config.ts`. Each hint:
- Costs 50 pts on reveal
- Cannot be un-revealed
- Shows progressively (Hint 1 → Hint 2 → Hint 3), never all at once

### 4.6 SolvedReveal

Shown after correct answer:
- Confetti burst (CSS `@keyframes`, no canvas library needed)
- Lore paragraph — extra trivia about the puzzle topic
- "Next Puzzle →" CTA or "Back to Case File" if all 8 solved

---

## 5. State Management

### Zustand Store — `useCaseStore.ts`

```ts
interface CaseStore {
  // state
  solved:      number[]                    // puzzle IDs solved
  hintsUsed:   Record<number, number>      // puzzleId → hints used (0–3)
  scores:      Record<number, number>      // puzzleId → points earned
  totalScore:  number
  activePuzzle: number | null
  startedAt:   number                      // Date.now() on first open

  // actions
  solvePuzzle: (id: number, score: number) => void
  useHint:     (id: number) => void
  setActive:   (id: number | null) => void
  reset:       () => void
}
```

Persisted to `localStorage` under key `"ch-case-05"` via Zustand `persist` middleware.

**Score calculation:**

```ts
// in scoring.ts
export function calcScore(basePoints: number, hintsUsed: number): number {
  return Math.max(0, basePoints - hintsUsed * 50)
}
// e.g. 2 hints used → 300 - 100 = 200 pts
```

---

## 6. Answer Validation

### `answerMatcher.ts`

```ts
type MatchResult = {
  correct:    boolean
  partial:    boolean       // e.g. first name only
  suggestion: string | null // prompt to show on partial match
}

function normalize(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9\s]/g, "").trim()
}

function matchAnswer(input: string, config: PuzzleConfig): MatchResult {
  const norm = normalize(input)
  const canonical = normalize(config.answer)

  // 1. Exact match against canonical
  if (norm === canonical) return { correct: true, partial: false, suggestion: null }

  // 2. Exact match against aliases
  for (const alias of config.aliases) {
    if (norm === normalize(alias)) return { correct: true, partial: false, suggestion: null }
  }

  // 3. Fuzzy match (Levenshtein similarity)
  if (config.fuzzyThreshold < 1.0) {
    const sim = similarity(norm, canonical)
    if (sim >= config.fuzzyThreshold) return { correct: true, partial: false, suggestion: null }
  }

  // 4. Partial credit — check if input is a fragment of the answer
  if (canonical.includes(norm) && norm.length > 2) {
    return { correct: false, partial: true, suggestion: `Include the full answer — try again` }
  }

  return { correct: false, partial: false, suggestion: null }
}
```

### Answer Config per Puzzle

```ts
// puzzles.config.ts (excerpt)
export const PUZZLES: PuzzleConfig[] = [
  {
    id: 1, slug: "math-trick", title: "The Math Trick",
    answer: "42", aliases: [],
    fuzzyThreshold: 1.0,          // exact only — it's a number
    hints: [
      "The magic number is a hex value from a 1999 game",
      "Convert 0x5f3759df from hexadecimal to decimal",
      "Add all 10 digits of 1,597,463,007 together"
    ],
    points: 300,
    component: dynamic(() => import("./components/p01-math-trick/MathTrick"), { ssr: false })
  },
  {
    id: 2, slug: "wilhelm", title: "The Famous Scream",
    answer: "private wilhelm", aliases: ["wilhelm"],
    fuzzyThreshold: 0.80,
    hints: [
      "This scream has been in hundreds of Hollywood films",
      "It was named after a character in a 1953 Western film",
      "The character was a soldier with a rank"
    ],
    points: 300,
    component: dynamic(() => import("./components/p02-wilhelm/WilhelmScream"), { ssr: false })
  },
  // ... all 8
]
```

---

## 7. Puzzle Specifications

---

### P01 — The Math Trick

**Clue:** The Quake III hex magic number `0x5f3759df`. Convert to decimal, sum the digits.

**Answer:** `42`

**UI Flow:**
1. Display the hex string `0x5f3759df` in a monospace card
2. User types into a hex input field → real-time decimal conversion shown below
3. "Break it down" button → `DigitCards` animate in one-by-one (Framer stagger)
4. `SumCounter` ticks from 0 up to 42 with 1840s mechanical counter effect
5. Answer field auto-fills `42` after the animation (or user types it)

**Components:**
- `HexConverter.tsx` — controlled input, validates hex chars, shows decimal live
- `DigitCards.tsx` — array of digit cards `[1,5,9,7,4,6,3,0,0,7]`, stagger `0.08s`
- `SumCounter.tsx` — `setInterval` tick from 0 to 42 at 60ms intervals

**Dependencies:** None. Pure React + CSS.

**Easter egg:** When `42` is entered, quote from Hitchhiker's Guide fades in.

---

### P02 — The Famous Scream

**Clue:** In 1951, a screaming sound effect became legendary. Identify the character it was named after.

**Answer:** `Private Wilhelm` (alias: `Wilhelm`)

**UI Flow:**
1. Display a dark visualizer canvas — flat sine wave, silent state
2. "Play the scream" button (user-triggered, never auto-plays)
3. On play: `WaveformVisualizer` activates, waveform spikes dramatically
4. After audio ends: film-credits-style ticker shows movies that used it
5. Answer field appears with label "Name the character"

**Components:**
- `AudioPlayer.tsx` — Howler.js, `preload: 'none'`, loads on button hover/focus
- `WaveformVisualizer.tsx` — `AudioContext` + `AnalyserNode` → `requestAnimationFrame` → Canvas
- Film credits: CSS `translateY` scroll animation on a `<ul>` of movie names

**Audio file:** `public/case-05/wilhelm.mp3` — public domain, safe to self-host

**Critical note:** Never `autoPlay`. Browsers block it. The play button must be the trigger.

---

### P03 — The Missing Country

**Clue:** In 1954, a man arrived at a Japanese airport with a passport from a country that doesn't exist, located between France and Spain.

**Answer:** `Taured`

**UI Flow:**
1. `PassportCard` renders with aged-paper texture, country field shows `TAURED`
2. `EuropeMapSVG` shows a simple SVG map of Western Europe with a pulsing red pin between France and Spain (where Taured would be — roughly Andorra's location)
3. "The man disappeared overnight" → `DisappearingMan` SVG silhouette fades from hotel window with Framer Motion `opacity: 0`
4. Answer field: "What country was on his passport?"

**Components:**
- `PassportCard.tsx` — `background: repeating-linear-gradient(...)` aged paper, monospace fields
- `EuropeMapSVG.tsx` — simplified SVG paths for FR, ES, Andorra region; pulsing `<circle>` marker
- `DisappearingMan.tsx` — SVG silhouette, Framer `animate={{ opacity: [1, 0] }}` on trigger

---

### P04 — The CIA Sculpture (Kryptos)

**Clue:** The Kryptos sculpture at CIA HQ has 4 encrypted sections. The artist gave 3 clues over the years. What was the second clue?

**Answer:** `Berlin`

**UI Flow:**
1. `CipherPanel` shows the actual Kryptos ciphertext in monospace, dark stone aesthetic
2. Three `ClueReveal` cards: **CLOCK** (unlocked) → **???** → **NORTHEAST** (locked)
3. User clicks "Reveal Clue 2" button → BERLIN fades in
4. K4 section at the bottom pulses red with badge: `STILL UNSOLVED — 2026`
5. Answer field: "What was the second clue?"

**Components:**
- `CipherPanel.tsx` — `font-family: monospace`, stone-grey background, actual Kryptos text
- `ClueReveal.tsx` — 3 cards, each with a lock icon; sequential unlock animation

**Note:** The answer is `Berlin`, not `Lorenz`. Lorenz is the answer to P09 (Tunny, not in this case file). Keep distinct.

---

### P05 — Man vs. Computer (Deep Blue)

**Clue:** In 1997, Garry Kasparov played IBM's Deep Blue in Game 6. He blundered on move 7. Who was the human champion?

**Answer:** `Garry Kasparov` (fuzzy: `Kasparov` accepted)

**UI Flow:**
1. `ChessReplay` loads PGN of the actual Game 6
2. Auto-replays move-by-move at 1.5s intervals with a "Watching Game 6, 1997" label
3. At move 7: playback pauses, `BlunderHighlight` flashes the source square red
4. Tooltip over blundered square: `"Kasparov plays Bd6?? — a fatal mistake"`
5. Play/Pause controls visible during replay
6. Answer field below board

**Components:**
- `ChessReplay.tsx` — `chess.js` for game logic, `react-chessboard` for render, PGN parsed on mount
- `BlunderHighlight.tsx` — custom square highlight via `react-chessboard`'s `customSquareStyles` prop

**Mobile fix:** `boardWidth` must be derived from container ref:
```ts
const { width } = useContainerWidth(ref)  // ResizeObserver hook
<Chessboard boardWidth={Math.min(width, 480)} ... />
```

**Dependencies:** `chess.js`, `react-chessboard` — lazy-loaded, never bundled with other puzzles.

---

### P06 — The Golden Record

**Clue:** Ann Druyan's brainwaves while thinking of falling in love were recorded for Voyager in 1977. Four years later she married a famous space scientist.

**Answer:** `Carl Sagan`

**UI Flow:**
1. `VinylSpinner` — golden SVG disc with CSS infinite `rotate` animation
2. `EEGWaveform` — animated SVG `<path>` with irregular peaks (simulates brainwaves), peaks cluster when "thinking of love" label appears
3. `VoyagerTimeline` — horizontal scroll: **1977 Voyager launch** → **1981 Marriage** → **?? Who?**
4. Answer field: "Who did she marry?"

**Components:**
- `VinylSpinner.tsx` — `<svg>` with concentric rings, `animation: spin 4s linear infinite`
- `EEGWaveform.tsx` — SVG `<path>` with `stroke-dashoffset` animation, irregular peaks via cubic bezier
- `VoyagerTimeline.tsx` — flex row of milestone cards, auto-scrolls right to reveal question

---

### P07 — The Deadly Metal

**Clue:** A plutonium sphere killed two scientists in 1945 and 1946. It was intended for a third atomic bomb. What was its nickname?

**Answer:** `Demon Core`

**UI Flow:**
1. `PlutoniumSphere` — CSS radial-gradient sphere with animated green glow pulse (radioactive aesthetic), no Three.js
2. `IncidentTimeline` — vertical timeline: `Aug 1945: Harry Daghlian` → `May 1946: Louis Slotin`
3. Each incident card has a "criticality" indicator that pulses red
4. Answer field: "What was this sphere called?"
5. On correct: `DEMON CORE` renders with a CRT static glitch CSS effect

**Components:**
- `PlutoniumSphere.tsx`:
  ```css
  background: radial-gradient(circle at 35% 35%, #90ff90, #005500, #001100);
  box-shadow: 0 0 40px #00ff0044, 0 0 80px #00ff0022;
  animation: pulse 2s ease-in-out infinite;
  ```
- `IncidentTimeline.tsx` — vertical `<ul>` with connecting line, dates on left, names on right

**Note:** No Three.js. CSS radial-gradient achieves the same glowing sphere at zero bundle cost.

---

### P08 — The 150-Year Code

**Clue:** Edgar Allan Poe shared a cipher in 1840. It went unsolved for 150 years. A man in Toronto cracked it in 2000.

**Answer:** `Gil Broza` (alias: `Gil Bronza`)

**UI Flow:**
1. `CipherText` — the actual Tyler cipher displayed on a parchment-style background (`sepia` CSS filter on a cream div)
2. "1840" label sits at top. "UNSOLVED FOR 150 YEARS" badge in red
3. `YearCounter` — on trigger, year ticks rapidly from 1840 → 2000 using `requestAnimationFrame`
4. At 2000: a substitution-cipher decode animation plays — cipher letters swap out for plain text one by one
5. Answer field: "Who solved it in 2000?"

**Components:**
- `CipherText.tsx` — `font-family: 'Courier New'`, `filter: sepia(0.4) brightness(0.95)`, aged paper background
- `YearCounter.tsx` — `rAF` loop: `easeOut` speed curve so it slows dramatically before landing on 2000
- Decode animation: each `<span>` character swaps from cipher char to plaintext with 30ms stagger

---

## 8. Dependency Map

```
Puzzle          npm package           Lazy-loaded?   Bundle cost
─────────────────────────────────────────────────────────────────
P01 Math Trick  (none)                —              ~0 KB
P02 Wilhelm     howler                yes            ~7 KB
P03 Taured      framer-motion         yes (shared)   ~30 KB
P04 Kryptos     (none)                —              ~0 KB
P05 Deep Blue   chess.js              yes            ~85 KB
                react-chessboard      yes            ~40 KB
P06 Golden Rec  (none)                —              ~0 KB
P07 Demon Core  (none)                —              ~0 KB
P08 Poe Cipher  (none)                —              ~0 KB
─────────────────────────────────────────────────────────────────
Shared          framer-motion         yes            ~30 KB
                zustand               always         ~3 KB
```

Framer Motion is already used in the project (case-file-01 structure suggests it). Chess.js + react-chessboard are the only net-new heavy deps, isolated to P05.

---

## 9. Build Order

Build in this exact sequence. Each step validates the previous before adding complexity.

### Step 1 — Route + Layout Shell

Create `app/hunt/case-05/page.tsx`, `CaseFileLayout.tsx`, `CaseFileProvider.tsx`.

**Done when:** `/hunt/case-05` loads with dark background and an empty progress bar showing `0 / 8`.

---

### Step 2 — Config + Store

Write all 8 entries in `puzzles.config.ts` with correct answers, aliases, hints. Implement `useCaseStore` with Zustand + `persist`. Implement `answerMatcher.ts`.

**Done when:** `useCaseStore` can be manually tested in the browser console — `solvePuzzle(1, 300)` updates the store and persists to `localStorage`.

---

### Step 3 — Shared Components

Build `PuzzleHub` → `PuzzleShell` → `AnswerInput` → `HintSystem` → `SolvedReveal` in that order. Wire to `useCaseStore`.

**Done when:** You can open a placeholder puzzle, type the wrong answer (shake), use a hint (cost deducted), type the right answer (reveal triggers), return to hub (card shows solved state with score).

---

### Step 4 — P01: Math Trick (Anchor Puzzle)

No deps. Validates the full puzzle lifecycle in production conditions.

**Done when:** Full flow works — hex input → digit cards → sum counter → answer `42` → reveal.

---

### Step 5 — P04: Kryptos + P07: Demon Core

Both CSS-only, no new deps. Fast to build, visually impressive.

**P04 done when:** Cipher panel renders, 3 clue cards unlock sequentially, BERLIN appears on trigger.
**P07 done when:** Glowing sphere pulses, timeline shows both incidents, `DEMON CORE` glitch-reveals on correct answer.

---

### Step 6 — P06: Golden Record + P08: Poe Cipher

SVG animation work. Introduces `requestAnimationFrame` patterns used in P08.

**P06 done when:** Vinyl spins, EEG waveform animates, timeline scrolls to reveal question.
**P08 done when:** Year counter races to 2000, cipher decode animation plays, fuzzy match accepts `Gil Bronza`.

---

### Step 7 — P03: Taured + P02: Wilhelm Scream

P03 needs Framer Motion (should already be installed). P02 needs howler + Web Audio API.

**P03 done when:** Passport card renders, map pin placed correctly, man disappears on trigger.
**P02 done when:** Button triggers audio, waveform spikes during playback, no autoplay on mount.

---

### Step 8 — P05: Deep Blue (Heaviest)

Install `chess.js` + `react-chessboard`. Load PGN. Build replay with pause-at-blunder.

**P05 done when:** Game 6 auto-replays, stops on move 7, blunder square flashes, board resizes correctly on mobile.

---

### Step 9 — Polish Pass

- All 8 puzzles lazy-loaded via `next/dynamic({ ssr: false })`
- `localStorage` persistence survives tab close + browser restart
- Accessibility: `aria-label` on all inputs, `aria-describedby` on clue text, correct/wrong states use icon + color (not color alone)
- Share mechanic: "I solved P01 in 42 seconds →" copies shareable text to clipboard
- Mobile QA: chess board width, audio button tap targets (min 44px), passport card scroll on small screens
- Final bundle audit: verify chess deps are not included in the main chunk

---

## 10. Audit & Risk Notes

### Correctness Risks

| Risk | Detail | Fix |
|------|--------|-----|
| P04 answer confusion | Lorenz is the Tunny cipher machine — not this puzzle. This puzzle answers "second clue = BERLIN" | Config has `answer: "berlin"`, `aliases: []` |
| P06 timeline dates | Druyan recorded brainwaves 1977, married Sagan 1981 — exactly 4 years. Timeline must be accurate | Hard-code milestone years, no fuzzy math |
| P08 name variants | Real solver is "Gil Broza". "Gil Bronza" appears in some secondary sources | Both in `aliases[]` |
| P02 copyright | Wilhelm Scream is public domain (first appeared in 1951, recorded 1951) | Self-host in `/public/case-05/` |

### UX Risks

| Risk | Detail | Fix |
|------|--------|-----|
| Audio autoplay block | All browsers block autoplay without user gesture | `AudioPlayer` must be triggered by explicit button click. Never call `.play()` on mount |
| Chess board mobile overflow | `react-chessboard` default `boardWidth` can overflow narrow screens | Use `ResizeObserver` on container ref, cap at `min(containerWidth, 480)` |
| Answer frustration | "P. T. Barnum" vs "PT Barnum" vs "Barnum" — inconsistent | `normalize()` strips all punctuation before comparison |
| Partial credit UX | "Carl" alone should not show "Wrong" — should prompt "full name?" | `partial` branch in `MatchResult` handled before showing error state |
| Three.js bundle cost | P07 (Demon Core) does not need a 3D sphere | Use CSS `radial-gradient` + `box-shadow` — same visual at ~0 KB cost |

### Performance Risks

| Risk | Detail | Fix |
|------|--------|-----|
| Chess bundle loads on every puzzle | `chess.js` + `react-chessboard` = ~125 KB | `next/dynamic(() => import(...), { ssr: false })` isolates to P05 route |
| Howler loads on every puzzle | ~7 KB is small but unnecessary | Same dynamic import pattern in P02 |
| Golden Record SVG animation on low-end devices | CSS `rotate` is GPU-composited, should be fine | Use `will-change: transform` on the vinyl SVG wrapper |
| EEG waveform `requestAnimationFrame` | Runs indefinitely if not cleaned up | `useEffect` return: `cancelAnimationFrame(rafId)` |

### Accessibility

- All `<input>` elements: `aria-label="Answer"` + `aria-describedby="puzzle-clue-{id}"`
- Correct/wrong states: never color alone — pair with `<i>` icon (checkmark / X)
- Chess board: provide a move list `<ol>` as a fallback for keyboard users
- Vinyl spinner: `prefers-reduced-motion` media query → static disc, no rotation
- Audio waveform canvas: `role="img"` + `aria-label="Audio waveform visualization"`

### Security

All answers are client-side in `puzzles.config.ts` — acceptable for a casual puzzle game. If a competitive leaderboard is added later, move answer validation to a Next.js API route and never trust client-submitted scores.

---

*Last updated: June 2026 — case-file-05, Project Mayhem / Cryptic Hunt*

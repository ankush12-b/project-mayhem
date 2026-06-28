# Progress Tracker — case-file-05

Use this checklist to track the implementation progress of case-file-05. Mark items as complete as you finish them.

## 🗂️ Core Setup & Shared Architecture
- [x] **Step 1: Route & Layout Shell**
  - [x] Create `/hunt/case-05` entry point
  - [x] Implement `CaseFileProvider`
  - [x] Implement `CaseFileLayout` (Ambient toggle, back-to-hub breadcrumbs)
  - [x] Implement 0/8 `ProgressBar` component
- [x] **Step 2: Config & Store**
  - [x] Create `puzzles.config.ts` (Dynamic load, answers, aliases, hints)
  - [x] Implement Zustand `useCaseStore` with localStorage persistence
  - [x] Implement `answerMatcher.ts` (Exact, fuzzy, and partial checks)
  - [x] Implement `scoring.ts` logic (-50 pts per hint)
- [x] **Step 3: Shared Components**
  - [x] Implement `PuzzleHub` selection grid (locked, active, solved states)
  - [x] Implement `PuzzleShell` wrapper
  - [x] Implement `AnswerInput` (shake feedback on error)
  - [x] Implement progressive `HintSystem` (deduction alerts)
  - [x] Implement `SolvedReveal` (confetti effects + lore text + CTA)

---

## 🧩 Interactive Puzzles
- [x] **Step 4: P01 - The Math Trick**
  - [x] Monospace hex converter field
  - [x] Staggered digit card layout
  - [x] Vintage 1840s sum counter ticker
  - [x] Easter egg quote fade-in
- [x] **Step 5: P04 & P07 - CSS Specials**
  - [x] **P04: Kryptos Cipher**
    - [x] Monospace stone-styled ciphertext panel
    - [x] Sequential clue reveal cards (CLOCK -> BERLIN -> NORTHEAST)
    - [x] Pulsing K4 alert section
  - [x] **P07: Demon Core**
    - [x] Glowing plutonium sphere (pure CSS radial-gradient)
    - [x] Vertical incident timeline (Daghlian & Slotin)
    - [x] Criticality pulsing nodes
    - [x] CRT glitch victory text reveal
- [x] **Step 6: P06 & P08 - SVG Animations**
  - [x] **P06: Golden Record**
    - [x] Spinner SVG vinyl (infinite CSS rotation)
    - [x] EEG animated brainwave path
    - [x] Horizontal Voyager milestone timeline
  - [x] **P08: Poe Cipher**
    - [x] Tyler cipher on aged parchment styling
    - [x] requestAnimationFrame rapid year counter (1840 -> 2000)
    - [x] Substitution character decoding stagger effect
- [x] **Step 7: P03 & P02 - Audio & Map Details**
  - [x] **P03: Taured Passport**
    - [x] Aged passport card
    - [x] Europe SVG map positioning pulsing pin on France/Spain border
    - [x] Silhouette disappearance fade
  - [x] **P02: Wilhelm Scream**
    - [x] Web Audio API Analyser context
    - [x] Canvas audio visualizer dynamic waveform
    - [x] Credits film vertical ticker
    - [x] Preload hover logic (no autoplay)
- [x] **Step 8: P05 - Deep Blue (Engine)**
  - [x] Install dependencies (`chess.js`, `react-chessboard`)
  - [x] Build automatic PGN move replayer (1.5s delay)
  - [x] Implement auto-pause & red square highlight on move 7 blunder
  - [x] Implement mobile-responsive ResizeObserver board scaling

---

## 🏁 Polish & QA
- [x] **Step 9: Polish Pass**
  - [x] Audit Next.js dynamic chunks
  - [x] Verify LocalStorage retention after reload/close
  - [x] Implement clipboard-based text sharing copy
  - [x] Verify accessibility labels, focus states, and color indicators
  - [x] Test mobile sizing (min 44px tap targets, scrollable content blocks)

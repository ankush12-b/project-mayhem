# Step 2 — Config & Store

## Goal
Implement the central configuration, state management store (with persistence), and answer validation logic.

## Files to Create/Modify
- `[NEW]` [puzzles.config.ts](file:///d:/projects/Cryptic-Hunt-2/components/case-file-05/lib/puzzles.config.ts)
- `[NEW]` [useCaseStore.ts](file:///d:/projects/Cryptic-Hunt-2/components/case-file-05/hooks/useCaseStore.ts)
- `[NEW]` [answerMatcher.ts](file:///d:/projects/Cryptic-Hunt-2/components/case-file-05/lib/answerMatcher.ts)
- `[NEW]` [scoring.ts](file:///d:/projects/Cryptic-Hunt-2/components/case-file-05/lib/scoring.ts)

## Specifications

### 1. Central Configuration (`lib/puzzles.config.ts`)
Define the `PuzzleConfig` interface and export the list of 8 puzzles containing:
- `id`, `slug`, `title`, `answer` (correct string), `aliases` (list of accepted alternative strings), `fuzzyThreshold` (number between 0 and 1), `hints` (array of 3 strings), `points` (base points: 300), and `component` (lazy-loaded component via `next/dynamic`).
- Canonical answers:
  1. `42` (exact)
  2. `Private Wilhelm` (alias: `wilhelm`, threshold: 0.80)
  3. `Taured` (exact)
  4. `Berlin` (exact)
  5. `Garry Kasparov` (threshold: 0.85)
  6. `Carl Sagan` (threshold: 0.85)
  7. `Demon Core` (exact)
  8. `Gil Broza` (alias: `Gil Bronza`, threshold: 0.80)

### 2. Zustand Store (`hooks/useCaseStore.ts`)
- Use Zustand with `persist` middleware to persist state to `localStorage` under key `"ch-case-05"`.
- State interface:
  ```ts
  interface CaseStore {
    solved: number[]
    hintsUsed: Record<number, number> // puzzleId -> count (0-3)
    scores: Record<number, number>    // puzzleId -> score
    totalScore: number
    activePuzzle: number | null
    startedAt: number                 // Date.now() on first load
    solvePuzzle: (id: number, score: number) => void
    useHint: (id: number) => void
    setActive: (id: number | null) => void
    reset: () => void
  }
  ```

### 3. Answer Matcher (`lib/answerMatcher.ts`)
Implement the fuzzy match logic:
- `normalize(s)`: Convert to lowercase, remove punctuation/special characters, and trim.
- `matchAnswer(input, config)`:
  1. Exact match against canonical answer (normalized).
  2. Exact match against aliases (normalized).
  3. Fuzzy match using Levenshtein distance/similarity if `fuzzyThreshold` is below 1.0.
  4. Partial credit check: if input is a substring of the canonical answer (min length 3), return `partial: true` with suggestion prompt `"Include the full answer — try again"`.

### 4. Scoring Helper (`lib/scoring.ts`)
Calculate scores dynamically:
```ts
export function calcScore(basePoints: number, hintsUsed: number): number {
  return Math.max(0, basePoints - hintsUsed * 50);
}
```

## Verification Criteria
- [ ] Zustand store hooks are functional and values persist after page reload.
- [ ] Running store actions via the browser console (e.g. `solvePuzzle`) updates state correctly.
- [ ] Answer matching logic accurately catches correct, partial, and incorrect answers under configured thresholds.

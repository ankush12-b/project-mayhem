# Step 3 — Shared Components

## Goal
Build the shared UI components that orchestrate selecting, viewing, submitting answers for, and using hints on individual puzzles.

## Files to Create/Modify
- `[NEW]` [PuzzleHub.tsx](file:///d:/projects/Cryptic-Hunt-2/components/case-file-05/components/PuzzleHub.tsx)
- `[NEW]` [PuzzleShell.tsx](file:///d:/projects/Cryptic-Hunt-2/components/case-file-05/components/PuzzleShell.tsx)
- `[NEW]` [AnswerInput.tsx](file:///d:/projects/Cryptic-Hunt-2/components/case-file-05/components/AnswerInput.tsx)
- `[NEW]` [HintSystem.tsx](file:///d:/projects/Cryptic-Hunt-2/components/case-file-05/components/HintSystem.tsx)
- `[NEW]` [SolvedReveal.tsx](file:///d:/projects/Cryptic-Hunt-2/components/case-file-05/components/SolvedReveal.tsx)
- `[NEW]` [useAnswerValidation.ts](file:///d:/projects/Cryptic-Hunt-2/components/case-file-05/hooks/useAnswerValidation.ts)
- `[NEW]` [useHints.ts](file:///d:/projects/Cryptic-Hunt-2/components/case-file-05/hooks/useHints.ts)

## Specifications

### 1. Puzzle Hub (`PuzzleHub.tsx`)
Grid of 8 cards. Shows each puzzle with its status:
- **Locked**: Greyed out, locked icon.
- **Active**: Interactive, hover glow.
- **Solved**: Checkmark overlay, points earned displayed.
- Swaps layout to render `PuzzleShell` when an active puzzle is clicked.

### 2. Puzzle Shell (`PuzzleShell.tsx`)
A generic wrapper that takes:
```ts
type PuzzleShellProps = {
  puzzleId: number
  title: string
  clue: string
  children: ReactNode
}
```
Renders the following vertical stack:
1. Title and back-to-hub navigation.
2. Clue text paragraph.
3. Custom puzzle interactive content (`children`).
4. `AnswerInput` (if unsolved) or `SolvedReveal` (if solved).
5. `HintSystem` (collapsible/visible at bottom).

### 3. Answer Input (`AnswerInput.tsx`)
- Standard text input with submit button.
- Triggers shake animation on submission of an incorrect answer.
- Displays error/warning message inline for partial/close answers.
- Integrates `useAnswerValidation` hook.

### 4. Hint System (`HintSystem.tsx`)
- Renders up to 3 progressive hints.
- Deducts 50 points from the puzzle score when a hint is unlocked.
- Warns user before unlocking, and displays hints sequentially (1 -> 2 -> 3).

### 5. Solved Reveal (`SolvedReveal.tsx`)
- Triggered when the puzzle is solved.
- Plays custom CSS confetti animation burst.
- Displays puzzle lore trivia text.
- Renders "Next Puzzle" or "Back to Case File" CTA.

## Verification Criteria
- [ ] Clicking a puzzle on the `PuzzleHub` changes state to render the `PuzzleShell` with that puzzle.
- [ ] Entering an incorrect answer triggers a shake animation and increments wrong counter.
- [ ] Revealing a hint deducts points from the potential score.
- [ ] Correct answer triggers the solved reveal overlay, confetti, and lore.

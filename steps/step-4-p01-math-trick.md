# Step 4 — P01: The Math Trick (Anchor Puzzle)

## Goal
Implement the first puzzle (P01: The Math Trick) to validate the end-to-end integration of the puzzle hub, shell, inputs, validation, scoring, and transitions.

## Files to Create/Modify
- `[NEW]` [MathTrick.tsx](file:///d:/projects/Cryptic-Hunt-2/components/case-file-05/components/p01-math-trick/MathTrick.tsx)
- `[NEW]` [HexConverter.tsx](file:///d:/projects/Cryptic-Hunt-2/components/case-file-05/components/p01-math-trick/HexConverter.tsx)
- `[NEW]` [DigitCards.tsx](file:///d:/projects/Cryptic-Hunt-2/components/case-file-05/components/p01-math-trick/DigitCards.tsx)
- `[NEW]` [SumCounter.tsx](file:///d:/projects/Cryptic-Hunt-2/components/case-file-05/components/p01-math-trick/SumCounter.tsx)

## Specifications

### 1. Hex Converter (`HexConverter.tsx`)
- Renders the target hex magic number `0x5f3759df` in a monospace card.
- User input field that filters/validates hex characters (0-9, A-F).
- Renders the converted decimal equivalent in real-time below the input.

### 2. Digit Cards (`DigitCards.tsx`)
- Triggered by a "Break it down" button once the correct decimal is entered/revealed.
- Animates cards representing the individual digits `[1, 5, 9, 7, 4, 6, 3, 0, 0, 7]` in a staggered sequence (0.08s delay between cards) using Framer Motion.

### 3. Sum Counter (`SumCounter.tsx`)
- Ticks upwards from 0 to 42 using a `setInterval` or `requestAnimationFrame` at 60ms intervals.
- Styled with a mechanical vintage ticker effect.
- Auto-fills the `AnswerInput` field with `42` upon completion.

### 4. Easter Egg
- Fades in a quote from *The Hitchhiker's Guide to the Galaxy* ("Answer to the Ultimate Question of Life, the Universe, and Everything...") when the answer matches.

## Verification Criteria
- [ ] Hex validation restricts inputs to valid hexadecimal characters.
- [ ] Staggered animation triggers and plays smoothly when "Break it down" is clicked.
- [ ] Counter ticks correctly to 42, and automatically fills the answer input.
- [ ] Answering `42` successfully resolves the puzzle and updates the progress.

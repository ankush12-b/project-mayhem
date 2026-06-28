# Step 8 — P05: Man vs. Computer (Deep Blue)

## Goal
Implement P05 (Deep Blue), parsing the chess PGN game, integrating the board interface, highlighting critical blunders, and adapting the layout for mobile responsiveness.

## Files to Create/Modify
- `[NEW]` [DeepBlueChess.tsx](file:///d:/projects/Cryptic-Hunt-2/components/case-file-05/components/p05-deep-blue/DeepBlueChess.tsx)
- `[NEW]` [ChessReplay.tsx](file:///d:/projects/Cryptic-Hunt-2/components/case-file-05/components/p05-deep-blue/ChessReplay.tsx)
- `[NEW]` [BlunderHighlight.tsx](file:///d:/projects/Cryptic-Hunt-2/components/case-file-05/components/p05-deep-blue/BlunderHighlight.tsx)
- `[NEW]` [public/case-05/game6-1997.pgn](file:///d:/projects/Cryptic-Hunt-2/public/case-05/game6-1997.pgn)

## Specifications

### 1. Library Dependencies
- Run `npm install chess.js react-chessboard`.
- Make sure these are lazy-loaded within the puzzle definition so they do not bloat the initial site bundle.

### 2. Chess Replay (`ChessReplay.tsx`)
- Loads the PGN representation of Kasparov vs Deep Blue, Game 6 (1997).
- Automatically steps through the match at 1.5-second intervals.
- Renders custom controls: Play/Pause, Forward, Rewind.

### 3. Blunder Highlight (`BlunderHighlight.tsx`)
- On move 7 (`Bd6??`), pauses playback automatically.
- Highlights the blunder source/destination squares with a red outline or background overlay utilizing `customSquareStyles` on the chessboard component.
- Fades in a tooltip alert on the board stating `"Kasparov plays Bd6?? — a fatal mistake"`.

### 4. Mobile Responsiveness Fix
- Do not hardcode chessboard widths. Use a `ResizeObserver` hook to evaluate container parent boundaries.
- Set `boardWidth` to `Math.min(containerWidth, 480)`.

### 5. Answer
- `Garry Kasparov` (Fuzzy matching should allow `Kasparov`).

## Verification Criteria
- [ ] Chessboard displays and begins stepping through Game 6.
- [ ] Replay halts at move 7, highlighting the target square in red.
- [ ] Resize observer dynamically scales the chessboard width without breaking overflow limits on small screen devices.

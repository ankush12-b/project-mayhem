# Step 9 — Polish Pass

## Goal
Conduct final optimization checks, audit bundle chunks, check screen layouts, ensure proper accessibility, and add high-level polish like the sharing mechanism.

## Files to Create/Modify
- `[MODIFY]` [page.tsx](file:///d:/projects/Cryptic-Hunt-2/app/hunt/case-05/page.tsx)
- `[MODIFY]` [puzzles.config.ts](file:///d:/projects/Cryptic-Hunt-2/components/case-file-05/lib/puzzles.config.ts)

## Specifications

### 1. Dynamic Imports Audit
Ensure all 8 puzzle items in `puzzles.config.ts` employ dynamic importing with SSR disabled:
```ts
component: dynamic(() => import("./components/pXX-puzzle/Puzzle"), { ssr: false })
```
Verify that heavy libraries like `chess.js` and `howler` do not bundle inside the initial page chunk.

### 2. Sharing Mechanism
- Implement a share card overlay or clipboard-copier.
- Triggers a clipboard action copying styled text like:
  `"I cracked Puzzle P01 in Cryptic Hunt Case 03 in 42 seconds! Can you beat my score?"`

### 3. LocalStorage Integrity
- Verify state persistence across full browser reloads, tab closes, and cache refreshes.
- Ensure that partial progress is preserved, scoring stays constant, and the progress bar doesn't reset to 0/8.

### 4. Accessibility Check
- Every input field must have an explicit `aria-label="Answer"` or `aria-describedby="puzzle-clue-{id}"`.
- Ensure focus states are clearly styled (focus rings).
- Active vs inactive states should use indicators and icons (e.g. checkmark/X) rather than color changes alone.
- Add support for keyboard users on interactive areas.
- Support `prefers-reduced-motion` across animated SVGs/CSS (e.g., stopping rotating record overlays).

### 5. Mobile Layout QA
- Ensure minimum tap target dimensions are `44px` on all buttons and inputs.
- Ensure long texts (e.g., Poe cipher parchment) scroll smoothly without cutting off vertical or horizontal text containers.

## Verification Criteria
- [ ] Next.js build succeeds with bundle splits showing isolated puzzle components.
- [ ] Share strings are generated and copy cleanly to clipboards.
- [ ] Keyboard navigation and accessibility readers successfully identify input prompts.

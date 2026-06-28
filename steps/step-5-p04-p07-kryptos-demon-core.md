# Step 5 — P04: Kryptos & P07: Demon Core

## Goal
Implement two CSS-heavy, zero-dependency interactive puzzles: P04 (Kryptos) and P07 (Demon Core).

## Files to Create/Modify
- `[NEW]` [KryptosCipher.tsx](file:///d:/projects/Cryptic-Hunt-2/components/case-file-05/components/p04-kryptos/KryptosCipher.tsx)
- `[NEW]` [CipherPanel.tsx](file:///d:/projects/Cryptic-Hunt-2/components/case-file-05/components/p04-kryptos/CipherPanel.tsx)
- `[NEW]` [ClueReveal.tsx](file:///d:/projects/Cryptic-Hunt-2/components/case-file-05/components/p04-kryptos/ClueReveal.tsx)
- `[NEW]` [DemonCore.tsx](file:///d:/projects/Cryptic-Hunt-2/components/case-file-05/components/p07-demon-core/DemonCore.tsx)
- `[NEW]` [PlutoniumSphere.tsx](file:///d:/projects/Cryptic-Hunt-2/components/case-file-05/components/p07-demon-core/PlutoniumSphere.tsx)
- `[NEW]` [IncidentTimeline.tsx](file:///d:/projects/Cryptic-Hunt-2/components/case-file-05/components/p07-demon-core/IncidentTimeline.tsx)

## Specifications

### 1. P04 — Kryptos
- **Cipher Panel (`CipherPanel.tsx`)**:
  - Displays the original Kryptos ciphertext with a monospace font (`font-family: monospace`) on a textured stone-grey background.
- **Clue Reveal (`ClueReveal.tsx`)**:
  - Shows 3 card slots: **CLOCK** (pre-unlocked), **???** (locked), and **NORTHEAST** (pre-unlocked).
  - Clicking "Reveal Clue 2" triggers an unlock animation that reveals the word **BERLIN**.
- **K4 Alert Section**:
  - Shows the K4 section highlighted at the bottom, pulsing red with a badge: `STILL UNSOLVED — 2026`.
- **Answer**: `Berlin`

### 2. P07 — Demon Core
- **Plutonium Sphere (`PlutoniumSphere.tsx`)**:
  - Pure CSS radial-gradient sphere styling:
    ```css
    background: radial-gradient(circle at 35% 35%, #90ff90, #005500, #001100);
    box-shadow: 0 0 40px #00ff0044, 0 0 80px #00ff0022;
    animation: pulse 2s ease-in-out infinite;
    ```
- **Incident Timeline (`IncidentTimeline.tsx`)**:
  - Renders a vertical connected timeline tracking:
    1. *Aug 1945: Harry Daghlian*
    2. *May 1946: Louis Slotin*
  - Criticality markers on timeline cards pulse red when hovered or active.
- **CRT Static Glitch Effect**:
  - Upon solving correctly with `Demon Core`, the title and text display with a CRT static/glitch effect.

## Verification Criteria
- [ ] Kryptos ciphertext renders beautifully, and the second clue reveals "BERLIN" sequentially.
- [ ] Plutonium sphere glows and pulses using pure CSS shadows and gradients (no canvas/WebGL).
- [ ] Incident timeline renders correctly and fits mobile screens.
- [ ] Glitch effect is applied to the victory reveal state of P07.

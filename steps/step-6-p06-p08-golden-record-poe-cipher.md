# Step 6 — P06: The Golden Record & P08: Poe Cipher

## Goal
Implement SVG-based animation puzzles: P06 (Golden Record) and P08 (Poe Cipher), incorporating clean frame loops and responsive layouts.

## Files to Create/Modify
- `[NEW]` [GoldenRecord.tsx](file:///d:/projects/Cryptic-Hunt-2/components/case-file-05/components/p06-golden-record/GoldenRecord.tsx)
- `[NEW]` [VinylSpinner.tsx](file:///d:/projects/Cryptic-Hunt-2/components/case-file-05/components/p06-golden-record/VinylSpinner.tsx)
- `[NEW]` [EEGWaveform.tsx](file:///d:/projects/Cryptic-Hunt-2/components/case-file-05/components/p06-golden-record/EEGWaveform.tsx)
- `[NEW]` [VoyagerTimeline.tsx](file:///d:/projects/Cryptic-Hunt-2/components/case-file-05/components/p06-golden-record/VoyagerTimeline.tsx)
- `[NEW]` [PoeCipher.tsx](file:///d:/projects/Cryptic-Hunt-2/components/case-file-05/components/p08-poe-cipher/PoeCipher.tsx)
- `[NEW]` [CipherText.tsx](file:///d:/projects/Cryptic-Hunt-2/components/case-file-05/components/p08-poe-cipher/CipherText.tsx)
- `[NEW]` [YearCounter.tsx](file:///d:/projects/Cryptic-Hunt-2/components/case-file-05/components/p08-poe-cipher/YearCounter.tsx)

## Specifications

### 1. P06 — The Golden Record
- **Vinyl Spinner (`VinylSpinner.tsx`)**:
  - Renders a golden SVG disc.
  - Infinite CSS spin animation with `will-change: transform` to optimize performance.
  - Respects accessibility via `prefers-reduced-motion` media query (stops rotation).
- **EEG Waveform (`EEGWaveform.tsx`)**:
  - Renders an animated SVG sinusoidal/irregular brainwave path.
  - Utilizes `stroke-dashoffset` path-drawing animations.
  - Waveform peaks cluster/spike when the "thinking of love" phase triggers.
- **Voyager Timeline (`VoyagerTimeline.tsx`)**:
  - A horizontal timeline showing milestones: **1977 Voyager launch** -> **1981 Marriage** -> **?? Who?**.
  - Autoscrolls dynamically to focus on the final milestone.
- **Answer**: `Carl Sagan`

### 2. P08 — Poe Cipher
- **Cipher Text (`CipherText.tsx`)**:
  - Displays the original Tyler cipher text on a sepia-styled parchment background.
  - Renders a red "UNSOLVED FOR 150 YEARS" badge.
- **Year Counter (`YearCounter.tsx`)**:
  - Uses `requestAnimationFrame` (rAF) to count rapidly from 1840 to 2000.
  - Incorporates an `easeOut` curve so it slows down elegantly as it approaches 2000.
  - *Must implement useEffect cleanup to cancel active RAF frames on unmount.*
- **Substitution Decode Animation**:
  - When the counter reaches 2000, characters in the cipher text swap out for resolved plaintext with a 30ms stagger effect.
- **Answer**: `Gil Broza` (alias `Gil Bronza`)

## Verification Criteria
- [ ] Vinyl disc spins smoothly and halts if the user's OS has "Reduce Motion" enabled.
- [ ] EEG sinusoidal paths render cleanly without canvas lag.
- [ ] Year counter runs asynchronously up to 2000, slowing down at the end, and triggers cleanups on component unmount.
- [ ] Decoding animation stagger is visually clear and swaps characters dynamically.

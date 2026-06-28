# Step 7 — P03: The Missing Country & P02: The Famous Scream

## Goal
Implement the interactive map, card flip, audio integration (using Howler.js), and canvas-based audio wave visualizations for P03 (Taured) and P02 (Wilhelm).

## Files to Create/Modify
- `[NEW]` [TauredPassport.tsx](file:///d:/projects/Cryptic-Hunt-2/components/case-file-05/components/p03-taured/TauredPassport.tsx)
- `[NEW]` [PassportCard.tsx](file:///d:/projects/Cryptic-Hunt-2/components/case-file-05/components/p03-taured/PassportCard.tsx)
- `[NEW]` [EuropeMapSVG.tsx](file:///d:/projects/Cryptic-Hunt-2/components/case-file-05/components/p03-taured/EuropeMapSVG.tsx)
- `[NEW]` [DisappearingMan.tsx](file:///d:/projects/Cryptic-Hunt-2/components/case-file-05/components/p03-taured/DisappearingMan.tsx)
- `[NEW]` [WilhelmScream.tsx](file:///d:/projects/Cryptic-Hunt-2/components/case-file-05/components/p02-wilhelm/WilhelmScream.tsx)
- `[NEW]` [AudioPlayer.tsx](file:///d:/projects/Cryptic-Hunt-2/components/case-file-05/components/p02-wilhelm/AudioPlayer.tsx)
- `[NEW]` [WaveformVisualizer.tsx](file:///d:/projects/Cryptic-Hunt-2/components/case-file-05/components/p02-wilhelm/WaveformVisualizer.tsx)
- `[NEW]` [public/case-05/wilhelm.mp3](file:///d:/projects/Cryptic-Hunt-2/public/case-05/wilhelm.mp3)

## Specifications

### 1. P03 — The Missing Country (Taured)
- **Passport Card (`PassportCard.tsx`)**:
  - Aged-paper visual style (using repeat linear gradients and filters).
  - Details the traveler profile, highlighting "TAURED" as the country of origin.
- **Europe Map SVG (`EuropeMapSVG.tsx`)**:
  - Outlines Western Europe (France, Spain, etc.).
  - Pins a red pulsing beacon directly on the border between France and Spain.
- **Disappearing Man (`DisappearingMan.tsx`)**:
  - Triggered after interaction, a shadow figure silhouette inside a window outline fades out to `opacity: 0` with a Framer Motion transition.
- **Answer**: `Taured`

### 2. P02 — The Famous Scream (Wilhelm)
- **Audio File Setup**:
  - Place `wilhelm.mp3` in the `public/case-05/` directory.
- **Audio Player (`AudioPlayer.tsx`)**:
  - Uses `howler` library to handle play, pause, and ended hooks.
  - Set `preload: 'none'` and only initialize/preload the audio on hover/focus of the play button.
  - **CRITICAL**: Never trigger autoplay. Playback must be initiated by user interaction.
- **Waveform Visualizer (`WaveformVisualizer.tsx`)**:
  - Creates a Web Audio API `AudioContext` and couples it to an `AnalyserNode`.
  - Connects the Howler sound source to the analyser context.
  - Draws a real-time waveform on an HTML5 `<canvas>` via `requestAnimationFrame`. Make sure to clear/cleanup the audio nodes and context on unmount to prevent leaks.
- **Film Credits Ticker**:
  - A vertical scrolling ticker listing movie names that used the sound effect, styled with CSS translations.
- **Answer**: `Private Wilhelm` (alias: `wilhelm`)

## Verification Criteria
- [ ] Maps render correctly with the correct location highlighted.
- [ ] Clicking the play button triggers the sound clip. Autoplay is not present.
- [ ] Sound playback drives the canvas visualizer waves.
- [ ] Stopping or closing the puzzle releases the AudioContext resources.

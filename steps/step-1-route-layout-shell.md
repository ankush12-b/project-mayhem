# Step 1 — Route & Layout Shell

## Goal
Set up the routing directory, define the page entry point, and create the layout shell with the progress bar.

## Files to Create/Modify
- `[NEW]` [page.tsx](file:///d:/projects/Cryptic-Hunt-2/app/hunt/case-05/page.tsx)
- `[NEW]` [CaseFileLayout.tsx](file:///d:/projects/Cryptic-Hunt-2/components/case-file-05/CaseFileLayout.tsx)
- `[NEW]` [CaseFileProvider.tsx](file:///d:/projects/Cryptic-Hunt-2/components/case-file-05/CaseFileProvider.tsx)
- `[NEW]` [ProgressBar.tsx](file:///d:/projects/Cryptic-Hunt-2/components/case-file-05/components/ProgressBar.tsx)

## Specifications

### 1. Route Entry (`app/hunt/case-05/page.tsx`)
Create the route for case-file-05.
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

### 2. Case File Provider (`CaseFileProvider.tsx`)
Wraps the Zustand store context to ensure it runs correctly on the client side.

### 3. Case File Layout (`CaseFileLayout.tsx`)
- Renders the dark wrapper for all case-05 UI.
- Displays `ProgressBar` showing `X / 8 solved` at the top.
- Includes an ambient audio toggle (optional, muted by default).
- Displays a breadcrumb/back-to-hub button when a puzzle is active.

### 4. Progress Bar (`components/ProgressBar.tsx`)
A visual progress indicator for solved puzzles (0/8 progress bar).

## Verification Criteria
- [ ] Accessing `/hunt/case-05` loads the layout with a dark theme.
- [ ] An empty progress bar showing `0 / 8 solved` is visible at the top.

"use client";

import React, { useState } from "react";
import { CaseFile04Puzzle, MirrorScriptPuzzle, FortuneTellerPuzzle, ShootingRangeLogsPuzzle } from "@/components/case-file-04";

export default function Page() {
  const [stage, setStage] = useState<"wheel" | "mirror" | "fortune" | "shooting">("wheel");

  if (stage === "wheel") {
    return <CaseFile04Puzzle onSolved={() => setStage("mirror")} />;
  }

  if (stage === "mirror") {
    return <MirrorScriptPuzzle onSolved={() => setStage("fortune")} />;
  }

  if (stage === "fortune") {
    return <FortuneTellerPuzzle onSolved={() => setStage("shooting")} />;
  }

  return <ShootingRangeLogsPuzzle />;
}

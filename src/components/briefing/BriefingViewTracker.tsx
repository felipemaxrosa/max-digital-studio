"use client";

import { useEffect, useRef } from "react";
import { track, EVENTS } from "@/lib/analytics";

/** Dispara briefing_view uma única vez ao montar o hub. */
export function BriefingViewTracker() {
  const fired = useRef(false);
  useEffect(() => {
    if (fired.current) return;
    fired.current = true;
    track(EVENTS.briefingView);
  }, []);
  return null;
}

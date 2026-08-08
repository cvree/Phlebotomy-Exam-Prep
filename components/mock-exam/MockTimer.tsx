"use client";

import { useEffect, useRef } from "react";
import { cx } from "@/components/shared/ui";

/**
 * Countdown clock.
 *
 * Ticks off wall-clock deltas rather than assuming each interval fires exactly
 * a second apart — background tabs throttle timers, and a clock that quietly
 * runs slow would hand a student extra time they will not get on the day.
 */
export function MockTimer({
  secondsRemaining,
  onTick,
}: {
  secondsRemaining: number;
  onTick: (seconds: number) => void;
}) {
  const lastRealTick = useRef(Date.now());
  const remaining = useRef(secondsRemaining);
  remaining.current = secondsRemaining;

  // Held in a ref so the interval is created once. Depending on `onTick`
  // directly would tear the interval down and rebuild it on every render —
  // including the render each tick causes.
  const onTickRef = useRef(onTick);
  onTickRef.current = onTick;

  useEffect(() => {
    lastRealTick.current = Date.now();
    const interval = window.setInterval(() => {
      const now = Date.now();
      const elapsed = Math.floor((now - lastRealTick.current) / 1000);
      if (elapsed <= 0) return;
      lastRealTick.current = now;
      onTickRef.current(Math.max(0, remaining.current - elapsed));
    }, 1000);

    return () => window.clearInterval(interval);
  }, []);

  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  const low = secondsRemaining <= 300;
  const critical = secondsRemaining <= 60;

  return (
    <div
      className={cx(
        "inline-flex items-center gap-2 rounded-[var(--radius)] border-2 px-3 py-1.5",
        critical
          ? "border-danger bg-danger-soft text-danger"
          : low
            ? "border-flag-border bg-flag-soft text-flag"
            : "border-line bg-surface text-ink",
      )}
    >
      <span aria-hidden="true" className="text-sm">
        ⏱
      </span>
      <span className="font-mono text-base font-semibold tabular-nums">
        {minutes}:{String(seconds).padStart(2, "0")}
      </span>
      <span className="sr-only" aria-live="polite" aria-atomic="true">
        {/* Announced only at meaningful boundaries — a per-second live region
            would be unusable with a screen reader. */}
        {secondsRemaining % 300 === 0 && secondsRemaining > 0
          ? `${minutes} minutes remaining`
          : ""}
      </span>
    </div>
  );
}

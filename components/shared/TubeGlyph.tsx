import type { Tube } from "@/types/content";
import { cx } from "./ui";

/**
 * The collection tube illustration.
 *
 * Colour here is decoration. Every place this renders also renders the tube's
 * name and additive as text, and the SVG itself carries no meaning for a
 * screen reader — hence `aria-hidden`. Nothing in the product requires a
 * student to distinguish two tubes by colour alone.
 */
export function TubeGlyph({
  tube,
  size = "md",
  className,
}: {
  tube: Tube;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const dimensions = {
    sm: { w: 22, h: 56 },
    md: { w: 30, h: 78 },
    lg: { w: 38, h: 98 },
  }[size];

  const gradientId = `tube-body-${tube.id}`;

  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width={dimensions.w}
      height={dimensions.h}
      viewBox="0 0 30 78"
      className={cx("shrink-0", className)}
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={tube.swatch.body} stopOpacity="0.55" />
          <stop offset="38%" stopColor={tube.swatch.body} stopOpacity="0.95" />
          <stop offset="100%" stopColor={tube.swatch.body} stopOpacity="0.6" />
        </linearGradient>
      </defs>

      {/* Tube body: straight sides, rounded base. */}
      <path
        d="M4 14 h22 v48 a11 11 0 0 1 -22 0 z"
        fill={`url(#${gradientId})`}
        stroke={tube.swatch.label}
        strokeOpacity="0.35"
        strokeWidth="1"
      />

      {/* Fill line — the detail that makes it read as a collection tube. */}
      <line
        x1="7"
        y1="34"
        x2="23"
        y2="34"
        stroke={tube.swatch.label}
        strokeOpacity="0.3"
        strokeWidth="1"
        strokeDasharray="2 2"
      />

      {/* Closure. */}
      <rect
        x="2"
        y="4"
        width="26"
        height="14"
        rx="3"
        fill={tube.swatch.cap}
        stroke={tube.swatch.label}
        strokeOpacity="0.4"
        strokeWidth="1"
      />

      {/* Marbled closures get a second band so they are distinguishable in
          greyscale and to viewers with colour-vision deficiencies. */}
      {tube.colorNames.some((name) => name.includes("marbled")) ? (
        <rect x="2" y="10" width="26" height="4" fill={tube.swatch.label} fillOpacity="0.45" />
      ) : null}

      {/* Highlight. */}
      <rect x="7" y="20" width="3" height="34" rx="1.5" fill="#ffffff" fillOpacity="0.35" />
    </svg>
  );
}

/**
 * A tube with its identifying text. The unit used across drills and study
 * pages, so a tube always arrives with its name and additive attached.
 */
export function TubeChip({
  tube,
  showAdditive = true,
  className,
}: {
  tube: Tube;
  showAdditive?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cx(
        "flex items-center gap-3 rounded-[var(--radius)] border border-line",
        "bg-surface px-3 py-2",
        className,
      )}
    >
      <TubeGlyph tube={tube} size="sm" />
      <div className="min-w-0">
        <p className="text-sm font-semibold text-ink">{tube.displayName}</p>
        {showAdditive ? (
          <p className="text-xs text-ink-muted">{tube.additive}</p>
        ) : null}
      </div>
    </div>
  );
}

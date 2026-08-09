import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

/** Shared primitives. Deliberately small — anything with behavior lives elsewhere. */

function cx(...values: (string | false | null | undefined)[]): string {
  return values.filter(Boolean).join(" ");
}

export { cx };

// --- Buttons ---------------------------------------------------------------

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

const BUTTON_BASE =
  "inline-flex items-center justify-center gap-2 rounded-[var(--radius)] " +
  "font-semibold transition-colors disabled:cursor-not-allowed " +
  "disabled:opacity-50 text-center";

const BUTTON_VARIANTS: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-primary-contrast hover:bg-primary-strong " +
    "disabled:hover:bg-primary",
  secondary:
    "bg-surface text-ink border border-line-strong hover:bg-surface-muted",
  ghost: "text-primary hover:bg-primary-soft",
  danger: "bg-surface text-danger border border-danger-border hover:bg-danger-soft",
};

const BUTTON_SIZES: Record<ButtonSize, string> = {
  sm: "min-h-9 px-3 text-sm",
  md: "min-h-11 px-4 text-[0.9375rem]",
  lg: "min-h-13 px-6 text-base sm:text-[1.0625rem]",
};

export function buttonClass(
  variant: ButtonVariant = "primary",
  size: ButtonSize = "md",
  extra?: string,
): string {
  return cx(BUTTON_BASE, BUTTON_VARIANTS[variant], BUTTON_SIZES[size], extra);
}

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonClass(variant, size, className)}
      {...props}
    />
  );
}

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  prefetch?: boolean;
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
  prefetch,
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      prefetch={prefetch}
      className={buttonClass(variant, size, className)}
    >
      {children}
    </Link>
  );
}

// --- Surfaces --------------------------------------------------------------

export function Card({
  children,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "article" | "li";
}) {
  return (
    <Tag
      className={cx(
        "rounded-[var(--radius-lg)] border border-line bg-surface",
        "shadow-[var(--shadow-card)]",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  id,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
  id?: string;
}) {
  return (
    <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
      <div className="max-w-2xl">
        {eyebrow ? (
          <p className="mb-1.5 text-xs font-semibold uppercase tracking-[0.09em] text-primary">
            {eyebrow}
          </p>
        ) : null}
        <h2 id={id} className="text-2xl sm:text-3xl">
          {title}
        </h2>
        {description ? (
          <p className="mt-2 text-[0.9375rem] text-ink-muted">{description}</p>
        ) : null}
      </div>
      {action}
    </div>
  );
}

// --- Badges and pills ------------------------------------------------------

type BadgeTone = "neutral" | "primary" | "success" | "danger" | "flag";

const BADGE_TONES: Record<BadgeTone, string> = {
  neutral: "bg-surface-muted text-ink-muted border-line",
  primary: "bg-primary-soft text-primary border-transparent",
  success: "bg-success-soft text-success border-success-border",
  danger: "bg-danger-soft text-danger border-danger-border",
  flag: "bg-flag-soft text-flag border-flag-border",
};

export function Badge({
  children,
  tone = "neutral",
  className,
}: {
  children: ReactNode;
  tone?: BadgeTone;
  className?: string;
}) {
  return (
    <span
      className={cx(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5",
        "text-xs font-semibold",
        BADGE_TONES[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

// --- Notices ---------------------------------------------------------------

/**
 * The standing caveat component.
 *
 * Used for every claim that needs a boundary: unverified exam structure,
 * unreviewed clinical content, "follow your facility's protocol". It is
 * intentionally plain rather than alarming — these notes are meant to be read,
 * not dismissed.
 */
export function Notice({
  title,
  children,
  tone = "neutral",
}: {
  title?: string;
  children: ReactNode;
  tone?: BadgeTone;
}) {
  const tones: Record<BadgeTone, string> = {
    neutral: "border-line bg-surface-muted",
    primary: "border-transparent bg-primary-soft",
    success: "border-success-border bg-success-soft",
    danger: "border-danger-border bg-danger-soft",
    flag: "border-flag-border bg-flag-soft",
  };

  return (
    <div
      className={cx(
        "rounded-[var(--radius)] border px-4 py-3 text-sm",
        tones[tone],
      )}
    >
      {title ? <p className="mb-1 font-semibold text-ink">{title}</p> : null}
      <div className="text-ink-muted [&_a]:font-medium [&_a]:text-primary [&_a]:underline">
        {children}
      </div>
    </div>
  );
}

// --- Empty states ----------------------------------------------------------

export function EmptyState({
  title,
  description,
  action,
  secondaryAction,
  /**
   * The heading level to render. Defaults to `h2` so an empty state sitting
   * directly under a page's `h1` does not skip a level; pass `h3` when the
   * empty state is nested inside a section that already has an `h2`.
   */
  headingLevel: Heading = "h2",
}: {
  title: string;
  description: string;
  action?: { href: string; label: string };
  secondaryAction?: { href: string; label: string };
  headingLevel?: "h2" | "h3";
}) {
  return (
    <div className="rounded-[var(--radius-lg)] border border-dashed border-line-strong bg-surface-muted/60 px-5 py-8 text-center sm:px-8 sm:py-10">
      <Heading className="font-sans text-lg font-semibold text-ink">
        {title}
      </Heading>
      <p className="mx-auto mt-2 max-w-md text-[0.9375rem] text-ink-muted">
        {description}
      </p>
      {action || secondaryAction ? (
        <div className="mt-5 flex flex-col items-center justify-center gap-2.5 sm:flex-row">
          {action ? (
            <ButtonLink href={action.href} size="md">
              {action.label}
            </ButtonLink>
          ) : null}
          {secondaryAction ? (
            <ButtonLink href={secondaryAction.href} variant="secondary" size="md">
              {secondaryAction.label}
            </ButtonLink>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

// --- Data display ----------------------------------------------------------

export function StatTile({
  label,
  value,
  detail,
}: {
  label: string;
  value: string;
  detail?: string;
}) {
  return (
    <div className="rounded-[var(--radius)] border border-line bg-surface px-4 py-3">
      <dt className="text-xs font-semibold uppercase tracking-[0.07em] text-ink-subtle">
        {label}
      </dt>
      <dd className="mt-1 font-display text-2xl text-ink">{value}</dd>
      {detail ? <p className="mt-0.5 text-xs text-ink-muted">{detail}</p> : null}
    </div>
  );
}

/**
 * A labeled proportion bar.
 *
 * `aria-hidden` on the bar itself: the number it depicts is always present as
 * text next to it, so announcing the graphic adds noise without information.
 */
export function Meter({
  value,
  max = 1,
  tone = "primary",
  className,
}: {
  value: number;
  max?: number;
  tone?: "primary" | "success" | "danger" | "neutral";
  className?: string;
}) {
  const pct = max === 0 ? 0 : Math.max(0, Math.min(1, value / max)) * 100;
  const fills = {
    primary: "bg-primary",
    success: "bg-success",
    danger: "bg-danger",
    neutral: "bg-ink-subtle",
  };
  return (
    <div
      aria-hidden="true"
      className={cx(
        "h-2 w-full overflow-hidden rounded-full bg-surface-sunken",
        className,
      )}
    >
      <div
        className={cx("h-full rounded-full transition-[width]", fills[tone])}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

export function VisuallyHidden({ children }: { children: ReactNode }) {
  return (
    <span className="absolute h-px w-px overflow-hidden whitespace-nowrap border-0 p-0 [clip:rect(0,0,0,0)]">
      {children}
    </span>
  );
}

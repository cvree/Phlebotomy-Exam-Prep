"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { cx } from "./ui";

const NAV_ITEMS = [
  { href: "/nha-cpt", label: "NHA CPT" },
  { href: "/practice", label: "Practice" },
  { href: "/drills", label: "Drills" },
  { href: "/mock-exam", label: "Mock exam" },
  { href: "/progress", label: "Progress" },
];

const STUDY_ITEMS = [
  { href: "/study/order-of-draw", label: "Order of draw" },
  { href: "/study/phlebotomy-tube-colors", label: "Tube colours & additives" },
  { href: "/study/specimen-handling", label: "Specimen handling" },
  { href: "/study/venipuncture-complications", label: "Complications" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Route change closes the menu. Without this, tapping a link on mobile
  // navigates but leaves the panel covering the page you just opened.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur-sm">
      <a
        href="#main"
        className={cx(
          "sr-only rounded-[var(--radius)] bg-primary px-4 py-2 font-semibold",
          "text-primary-contrast focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50",
        )}
      >
        Skip to content
      </a>

      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="flex items-center gap-2.5 rounded-[var(--radius-sm)]"
          aria-label="Phlebotomy Exam Prep — home"
        >
          <Wordmark />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={cx(
                "rounded-[var(--radius-sm)] px-3 py-2 text-sm font-medium transition-colors",
                isActive(item.href)
                  ? "bg-primary-soft text-primary"
                  : "text-ink-muted hover:bg-surface-muted hover:text-ink",
              )}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/study/order-of-draw"
            className={cx(
              "rounded-[var(--radius-sm)] px-3 py-2 text-sm font-medium transition-colors",
              pathname.startsWith("/study")
                ? "bg-primary-soft text-primary"
                : "text-ink-muted hover:bg-surface-muted hover:text-ink",
            )}
          >
            Study guides
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/practice"
            className="hidden rounded-[var(--radius)] bg-primary px-4 py-2.5 text-sm font-semibold text-primary-contrast transition-colors hover:bg-primary-strong sm:inline-flex"
          >
            Start practising
          </Link>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="inline-flex h-11 w-11 items-center justify-center rounded-[var(--radius)] border border-line text-ink lg:hidden"
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <svg
              aria-hidden="true"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            >
              {open ? (
                <>
                  <path d="M5 5l10 10" />
                  <path d="M15 5L5 15" />
                </>
              ) : (
                <>
                  <path d="M3 6h14" />
                  <path d="M3 10h14" />
                  <path d="M3 14h14" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {open ? (
        <div
          id="mobile-nav"
          ref={panelRef}
          className="border-t border-line bg-surface lg:hidden"
        >
          <nav aria-label="Mobile" className="container-page py-3">
            <ul className="flex flex-col">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={cx(
                      "flex min-h-12 items-center rounded-[var(--radius)] px-3 text-[0.9375rem] font-medium",
                      isActive(item.href)
                        ? "bg-primary-soft text-primary"
                        : "text-ink",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <p className="mt-4 px-3 text-xs font-semibold uppercase tracking-[0.08em] text-ink-subtle">
              Study guides
            </p>
            <ul className="mt-1 flex flex-col">
              {STUDY_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="flex min-h-12 items-center rounded-[var(--radius)] px-3 text-[0.9375rem] text-ink-muted"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <Link
              href="/practice"
              className="mt-4 flex min-h-12 items-center justify-center rounded-[var(--radius)] bg-primary px-4 font-semibold text-primary-contrast"
            >
              Start practising
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}

function Wordmark() {
  return (
    <span className="flex items-center gap-2.5">
      <svg
        aria-hidden="true"
        width="26"
        height="26"
        viewBox="0 0 26 26"
        className="shrink-0"
      >
        <rect
          x="0.5"
          y="0.5"
          width="25"
          height="25"
          rx="7"
          fill="var(--primary-soft)"
          stroke="var(--primary)"
          strokeOpacity="0.35"
        />
        <path
          d="M9 6h8v3H9z"
          fill="var(--primary)"
        />
        <path
          d="M10 9h6v8a3 3 0 0 1-6 0z"
          fill="var(--primary)"
          fillOpacity="0.4"
        />
        <path d="M10 14h6" stroke="var(--primary)" strokeWidth="1.2" />
      </svg>
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.0625rem] font-semibold tracking-tight text-ink">
          Phlebotomy Exam Prep
        </span>
        <span className="mt-0.5 text-[0.6875rem] font-medium uppercase tracking-[0.1em] text-ink-subtle">
          Know what to study
        </span>
      </span>
    </span>
  );
}

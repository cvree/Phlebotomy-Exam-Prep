import Link from "next/link";
import type { ReactNode } from "react";
import type { ReviewStatus, SourceReference } from "@/types/content";
import { ButtonLink, Card, Notice } from "@/components/shared/ui";
import { ReviewStatusNote } from "@/components/shared/ReviewStatusNote";

export type StudySection = { id: string; title: string };

export type RelatedLink = { href: string; label: string; description: string };

/**
 * Shell for the long-form study guides.
 *
 * Every guide gets the same structure: an honest summary, a contents list, the
 * article, a practice call to action tied to the topic, and the sources with
 * their review status. Consistency here is what makes the guides feel like a
 * reference rather than a blog.
 */
export function StudyArticle({
  eyebrow,
  title,
  standfirst,
  updated,
  sections,
  practiceCta,
  related,
  reviewStatus,
  sources,
  children,
}: {
  eyebrow: string;
  title: string;
  standfirst: string;
  updated: string;
  sections: StudySection[];
  practiceCta: { href: string; label: string; blurb: string };
  related: RelatedLink[];
  reviewStatus: ReviewStatus;
  sources: SourceReference[];
  children: ReactNode;
}) {
  return (
    <article className="pb-4">
      <header className="border-b border-line bg-surface-muted/50">
        <div className="container-prose py-10 sm:py-14">
          <p className="text-sm font-semibold uppercase tracking-[0.09em] text-primary">
            {eyebrow}
          </p>
          <h1 className="mt-2.5 font-display text-4xl leading-[1.1] sm:text-5xl">
            {title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-ink-muted">
            {standfirst}
          </p>
          <p className="mt-4 text-xs text-ink-subtle">Last updated {updated}</p>
        </div>
      </header>

      <div className="container-prose py-8 sm:py-10">
        <nav aria-labelledby="contents" className="mb-9">
          <h2
            id="contents"
            className="font-sans text-xs font-bold uppercase tracking-[0.09em] text-ink-subtle"
          >
            On this page
          </h2>
          <ul className="mt-2.5 space-y-1.5">
            {sections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="text-[0.9375rem] text-primary hover:underline"
                >
                  {section.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="prose-study">{children}</div>

        <Card className="mt-10 bg-primary-soft p-5 sm:p-6">
          <h2 className="font-display text-2xl">Think you know it?</h2>
          <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-muted">
            {practiceCta.blurb}
          </p>
          <ButtonLink href={practiceCta.href} size="lg" className="mt-4 w-full sm:w-auto">
            {practiceCta.label}
          </ButtonLink>
        </Card>

        <section className="mt-10" aria-labelledby="related">
          <h2 id="related" className="font-display text-2xl">
            Related
          </h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {related.map((item) => (
              <li key={item.href}>
                <Card className="h-full">
                  <Link href={item.href} className="block h-full p-4">
                    <h3 className="font-sans text-base font-semibold text-primary">
                      {item.label} →
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
                      {item.description}
                    </p>
                  </Link>
                </Card>
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-10 space-y-4">
          <Notice title="Follow your facility's procedure manual">
            This guide describes widely-taught practice. Equipment, tube
            conventions, and local policy vary. Where your facility&apos;s
            procedure manual differs from anything here, the manual is the
            authority.
          </Notice>
          <ReviewStatusNote status={reviewStatus} sources={sources} />
        </div>
      </div>
    </article>
  );
}

/** A section heading that anchors the contents list. */
export function StudySection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section aria-labelledby={id}>
      <h2 id={id} className="scroll-mt-20">
        {title}
      </h2>
      {children}
    </section>
  );
}

/** Callout for the mistakes that actually cost marks and cause harm. */
export function CommonMistake({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="my-5 rounded-[var(--radius)] border-l-4 border-l-danger border-y border-r border-line bg-danger-soft/40 px-4 py-3">
      <p className="font-sans text-sm font-bold text-danger">{title}</p>
      <div className="mt-1 text-[0.9375rem] leading-relaxed text-ink">
        {children}
      </div>
    </div>
  );
}

export function KeyPoint({ children }: { children: ReactNode }) {
  return (
    <div className="my-5 rounded-[var(--radius)] border-l-4 border-l-primary border-y border-r border-line bg-primary-soft/50 px-4 py-3">
      <div className="text-[0.9375rem] leading-relaxed text-ink">{children}</div>
    </div>
  );
}

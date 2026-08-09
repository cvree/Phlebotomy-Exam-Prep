import Link from "next/link";

const COLUMNS = [
  {
    title: "Practice",
    links: [
      { href: "/practice", label: "Practice questions" },
      { href: "/mock-exam", label: "Mock exam" },
      { href: "/drills/order-of-draw", label: "Order of Draw drill" },
      { href: "/drills/tube-colors", label: "Tube Mastery drill" },
      { href: "/progress", label: "Your progress" },
    ],
  },
  {
    title: "Study guides",
    links: [
      { href: "/study/order-of-draw", label: "Order of draw" },
      { href: "/study/phlebotomy-tube-colors", label: "Tube colors & additives" },
      { href: "/study/specimen-handling", label: "Specimen handling" },
      { href: "/study/venipuncture-complications", label: "Venipuncture complications" },
      { href: "/study/california-requirements", label: "California requirements" },
    ],
  },
  {
    title: "About",
    links: [
      { href: "/nha-cpt", label: "NHA CPT hub" },
      { href: "/nha-cpt/practice-test", label: "NHA CPT practice test" },
      { href: "/about/methodology", label: "Our methodology" },
      { href: "/pricing", label: "Pricing" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-line bg-surface-muted/50">
      <div className="container-page py-10 sm:py-12">
        <div className="grid gap-8 sm:grid-cols-3">
          {COLUMNS.map((column) => (
            <div key={column.title}>
              <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.09em] text-ink-subtle">
                {column.title}
              </h2>
              <ul className="mt-3 space-y-2">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-ink-muted transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 space-y-3 border-t border-line pt-6 text-xs leading-relaxed text-ink-subtle">
          <p>
            <strong className="font-semibold text-ink-muted">
              Not affiliated with any certifying body.
            </strong>{" "}
            Phlebotomy Exam Prep is an independent study tool. It is not
            affiliated with, endorsed by, or sponsored by the National
            Healthcareer Association (NHA), ASCP, NCCT, or the California
            Department of Public Health (CDPH). NHA and CPT are the property
            of their respective owners.
          </p>
          <p>
            All questions are <strong className="font-semibold text-ink-muted">original
            practice questions</strong> written for this platform. They are not
            real exam questions and are not reproduced from any exam. Passing a
            practice test here does not guarantee any exam outcome.
          </p>
          <p>
            Educational content is provided for study purposes and is not
            clinical guidance or legal advice. Always follow your training
            program, your facility&apos;s procedure manual, and the
            instructions supplied with the equipment you use. California
            licensing content describes the shape of the CDPH pathway for
            study purposes only — confirm current requirements, forms, and
            fees directly with CDPH Laboratory Field Services before relying
            on anything here for an actual application.{" "}
            <Link href="/about/methodology" className="text-primary underline">
              How we write and review content
            </Link>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}

# Phlebotomy Exam Prep

A focused certification study platform for phlebotomy students. Built around one
loop:

> Learn → Practice → Get feedback → Find the weak area → Drill it → Test → Improve

The product promise is **know what to study before your phlebotomy certification
exam**. Every session should leave a student knowing what they know, what they
are weak at, and what to do next — not just a percentage.

The first certification is the **NHA Certified Phlebotomy Technician (CPT)**.
Certification configuration is data, so ASCP PBT and NCCT can be added without
restructuring the application. The platform is built for California
candidates specifically: alongside the national exam material, a dedicated
"California Requirements" study area covers the CDPH Laboratory Field
Services CPT1/CPT2 state licensing pathway that California layers on top of
national certification.

---

## Features

**Practice**

- 238 original, certification-style questions across ten study areas
- Immediate inline feedback: verdict, correct answer, full explanation, why the
  specific distractor you picked was wrong, and a memory tip where one helps
- Session modes: Quick 10, all areas, a single area, weak areas, missed
  questions, and unseen questions
- Sessions autosave and resume after a refresh
- Results screen leads with the weak-area insight, not the score

**Drills**

- **Order of Draw** — arrange the six CLSI collection positions. Three
  interchangeable interactions: drag and drop, tap two cards to swap, and
  move-up/move-down buttons on every row. Grades per position, names what was
  misplaced, and explains why each position sits where it does.
- **Tube & additive mastery** — eight-question rounds in two directions
  (tube → additive, additive → tube), explaining the mechanism after every
  answer. Two further modes are declared and disabled.

**Vocabulary**

- 181 original term definitions across ten areas — word parts, blood and its
  components, tube additives, blood disorders (polycythemia vera,
  thrombocytopenia, hemochromatosis…), vein anatomy, procedure and equipment,
  complications, specimen handling, lab tests and departments, and
  safety/compliance
- Every term carries what it *is*, what it is **part of** (EDTA belongs to the
  lavender tube; the median cubital vein belongs to the antecubital fossa), the
  word parts it is built from, why it matters at the chairside, a mnemonic
  where one helps, and the terms it is genuinely confused with
- Thirteen sets: three curated (a 51-term starter deck, sound-alikes, the full
  glossary) and one per area, each with its own page
- Five study modes per set:
  - **Flashcards** — flip with a tap or the space bar, grade with 1–4, term- or
    definition-first, shuffle
  - **Learn** — adaptive rounds; recognition first, promoted to typed recall
    once a term has been right twice in a row, with missed terms re-queued
    before the round ends
  - **Write** — typed recall throughout, with spelling near-misses graded
    "close" rather than wrong, and an "I was right" override
  - **Match** — six pairs against the clock, with a best time per set
  - **Test** — mixed multiple-choice, true/false, and written questions with no
    feedback until submit
- **Spaced repetition** across everything: an SM-2 derivative schedules each
  term individually, and `/vocabulary/review` mixes what is due from every set
- A searchable glossary — search covers the term, its abbreviations, and its
  definition, so "purple tube" finds EDTA

**Mock exam**

- Full-length timed paper with no correctness, answers, or explanations until
  submission
- Wall-clock timer that survives a sleeping phone or a closed tab
- Question grid with answered/flagged state, flagging, previous/next, autosave,
  resume, submit confirmation, and an unanswered-question warning
- Afterwards: domain breakdown, strongest and weakest areas, and full review
  filtered by missed / flagged / all

**Progress**

- Mastery per area from Not started to Strong, weighted toward recent answers
  and gated on exposure, with the reasoning shown in plain language
- A study readiness score with an expandable five-component breakdown
- Deterministic, explainable "what to study next" recommendations
- Study streak, export to JSON, and reset

**Study guides** — long-form pages on order of draw, tube colors and
additives, specimen handling, venipuncture complications, and California
CPT1/CPT2 licensing requirements, each linking directly into the matching
practice or drill.

---

## Development

Requires Node.js 20 or newer.

```bash
npm install
npm run dev          # http://localhost:3000
```

## Testing

```bash
npm run test         # vitest, single run
npm run test:watch   # watch mode
```

132 tests cover the parts where a bug would quietly mislead a student: scoring,
question selection and session generation, mastery and readiness calculation,
weak-area detection, recommendation rules, storage migrations, streak
arithmetic, order-of-draw grading, and tube-drill generation. `tests/` also
asserts structural integrity of the question bank, so a content mistake fails CI
rather than reaching a student.

## Linting and types

```bash
npm run lint
npm run typecheck
```

## Production build

```bash
npm run build     # writes a static site to ./out
```

`npm run check` runs typecheck, lint, tests, and the production build in
sequence.

## Deployment

The app has no server logic — progress lives in the browser — so it builds to a
**static export** in `./out` and can be hosted on any static host: GitHub Pages,
Netlify, Cloudflare Pages, S3, or a plain nginx directory.

Two build-time environment variables:

| Variable | Purpose | Default |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical URLs, Open Graph tags, sitemap, robots.txt | `https://phlebotomyexamprep.app` |
| `NEXT_PUBLIC_BASE_PATH` | Set when serving from a subdirectory rather than a domain root | empty |

### GitHub Pages

`.github/workflows/deploy.yml` builds and publishes on every push to `main`, and
can be re-run manually from the Actions tab. It runs typecheck, lint, and tests
first, so a broken build never reaches a student. The base path and site URL are
derived from the repository, so nothing is hardcoded to one account.

**One-time setup.** Pages has to be switched on by a repository admin before the
workflow can publish — the workflow's own token is not allowed to create the
Pages site. Go to **Settings → Pages → Build and deployment → Source: GitHub
Actions**, then re-run the latest workflow run. After that every push to `main`
deploys automatically.

The site is then served at `https://<owner>.github.io/<repo>/`.

### Anywhere else

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain npm run build
# then serve ./out as static files
```

---

## Project structure

```text
app/                      Routes (App Router). Pages are thin; logic lives below.
components/
  practice/               Question card, explanation panel, setup, results
  drills/                 Order of Draw and Tube Mastery
  vocab/                  Hub, set studio, five study modes, glossary browser
  mock-exam/              Runner, timer, navigator, results
  progress/               Dashboard, readiness meter, recommendations, provider
  study/                  Long-form article shell
  shared/                 Buttons, cards, badges, notices, tube illustration
data/
  certifications/         Certification config and the ten study areas
  questions/              The question bank, one file per area
  tubes/                  Tube reference data
  vocab/                  Vocabulary bank, categories, and set definitions
  study/                  Order-of-draw sequence
  sources.ts              Shared reference pointers
lib/
  scoring/                Session generation and scoring
  progress/               Mastery, readiness, recommendations, mutations
  drills/                 Drill logic, independent of React
  vocab/                  Spaced-repetition scheduler, answer matching,
                          item generation, and progress rollups
  storage/                Driver, schema, migrations, repository
  analytics/              Event definitions and a pluggable sink
  entitlements/           Feature gating seam
types/                    Content, study, and vocabulary domain types
tests/                    Vitest suites
```

### Architectural notes

**Clinical facts are data, not code.** The order of draw, tube additives, and
every question live in `data/`. No component encodes a clinical fact, so a
correction in one place fixes the drill, the study guide, and the question
explanations together.

**The study engine is pure.** Everything in `lib/progress` and `lib/scoring`
takes its inputs as arguments — including timestamps — and returns new values.
Nothing there touches React, storage, or the clock, which is what makes it
testable without a browser.

**Storage is behind one seam.** `lib/storage/driver.ts` is the only file that
knows `localStorage` exists, and `StudyProgressRepository` is the only thing
components talk to. Swapping in Supabase, Firebase, or an authenticated API is a
new driver, not a rewrite. The persisted schema is versioned with a migration
chain, and migration never throws — a corrupt payload degrades to an
empty-but-valid record rather than crashing a study session.

**Entitlements are a seam, not a paywall.** No payments are implemented.
`canAccess("mock-exams")` exists so that gating can be added later by editing
plan data rather than scattering checks through components.

**Analytics are defined but not connected.** Events are named in one place and
`setAnalyticsSink` accepts a provider. Nothing leaves the browser today, and the
property type restricts events to counts and content identifiers — never a
student's answers or anything about the student.

---

## Content safety

This is healthcare education, and the accuracy claims here are deliberately
conservative.

**Questions are original.** Every question was written for this platform. None
of it is taken from, reconstructed from, or intended to resemble a real
certification exam. No brain dumps, no recalled exam content. Reproducing exam
content violates certifying bodies' terms and can invalidate a candidate's
result.

**Vocabulary definitions are original too.** All 181 term definitions are
written in our own words at the level a phlebotomy student needs them. Nothing
is copied from a textbook, a published glossary, or a commercial study set.

**No affiliation.** This project is not affiliated with, endorsed by, or
sponsored by the National Healthcareer Association, ASCP, NCCT, or the
California Department of Public Health (CDPH).

**Everything carries a review status.** Questions, tube records, vocabulary
terms, and the order-of-draw sequence each have a `reviewStatus` that is
rendered wherever the content appears:

```
draft → needs-review → reviewed → published
```

**All 238 questions and all 181 vocabulary terms currently sit at
`needs-review`.** They were written from
material that mainstream phlebotomy programs teach consistently, but **no
qualified reviewer has checked them against the cited references.** The UI says
so on every question. A test asserts that nothing has been promoted to
`reviewed` without that work happening.

**Citations name real documents and nothing more.** We store the title and
publisher of citable standards (CLSI GP41/GP42, the OSHA bloodborne pathogens
standard, CDC guidance) and deliberately do *not* store clause numbers, page
numbers, or quotations, because nobody has opened those documents as part of
authoring this content. Each reference records exactly how much verification has
happened.

**Exam structure is not guessed at.** The NHA CPT question count, time limit,
passing score, and official domain weightings are `undefined` in
`data/certifications/index.ts`, `examStructureVerified` is `false`, and the UI
shows a verification notice wherever exam structure is discussed. The mock exam
uses *our* practice format (50 questions, 60 minutes), labeled as ours
everywhere it appears.

**Readiness is not a prediction.** Study readiness measures how much material a
student has demonstrated recently across the syllabus. It is not validated
against exam outcomes and the product never states a probability of passing.

### Requires human verification before launch

1. NHA CPT exam structure — question count, time limit, scoring, published
   domains and weightings, eligibility and retake policy
2. Clinical review of all 238 questions and 181 vocabulary definitions by a
   qualified phlebotomy educator or MLS professional, against the cited
   standards
3. Precise citations for each reviewed item, replacing the title-only references
4. Tube additive details, draw volumes, and inversion counts against current
   manufacturer instructions for use
5. The ten study areas, if they are ever to be described as mapping to a
   published test plan
6. California CPT1/CPT2 specifics (training hours, supervised-procedure
   counts, fees, renewal cadence) against current CDPH Laboratory Field
   Services publications — this content is not legal advice

---

## Roadmap

**Next**

- Clinical review pass, moving content from `needs-review` to `reviewed`
- Human verification of the California CPT1/CPT2 specifics against current
  CDPH publications
- Continue growing the bank while holding the review standard
- The remaining drill modes: what-comes-next, find-the-misplaced-tube, timed
  order of draw, and the two further tube directions
- Extend the vocabulary scheduler to the question bank, so missed questions are
  spaced rather than simply re-queued
- Audio pronunciation for the terms that carry a phonetic respelling

**Later**

- Optional account for syncing progress across devices, with the local-only
  mode preserved as the default
- ASCP PBT and NCCT question sets, using the certification tagging already in
  the schema
- Per-question timing, to distinguish "knew it" from "guessed it slowly"

---

## License and disclaimer

Educational content is provided for study purposes and is not clinical guidance
or legal advice. Always follow your training program, your facility's
procedure manual, and the instructions supplied with the equipment you use.
California licensing content describes the shape of the CDPH CPT1/CPT2
pathway for study purposes only — confirm current requirements directly with
CDPH Laboratory Field Services.

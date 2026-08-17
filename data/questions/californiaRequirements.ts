import { buildQuestions } from "./authoring";
import {
  SRC_CA_BPC_1246,
  SRC_CDPH_LFS,
  SRC_TEXTBOOK_CURRICULUM,
} from "@/data/sources";

/**
 * California is one of a small number of states that requires phlebotomists
 * to hold a state-issued certificate on top of a national certification exam.
 * Passing the NHA CPT (or another national exam) is a step toward practicing
 * in California — it is not, by itself, authorization to draw blood in a
 * California clinical laboratory.
 *
 * This domain covers the CDPH Laboratory Field Services CPT1/CPT2 licensing
 * pathway: scope of practice, training and procedure-count requirements,
 * supervision, and renewal. Specific numbers (hours, procedure counts, fees)
 * are set by CDPH and can change — see the `note` on each source. None of
 * this is legal advice; confirm current requirements directly with CDPH LFS
 * before relying on a number here for an application.
 */
export const CALIFORNIA_QUESTIONS = buildQuestions(
  {
    domain: "california-requirements",
    certifications: ["nha-cpt"],
    sources: [SRC_CDPH_LFS, SRC_CA_BPC_1246, SRC_TEXTBOOK_CURRICULUM],
    reviewStatus: "needs-review",
  },
  [
    {
      id: "ca-001",
      subdomain: "State licensing basics",
      difficulty: 1,
      stem:
        "A phlebotomist has just passed a national certification exam, such as the NHA CPT. Is that enough to legally draw blood in a California clinical laboratory?",
      choices: {
        a: "Yes — national certification alone satisfies California law",
        b: "No — California also requires a state-issued Certified Phlebotomy Technician (CPT1 or CPT2) certificate from CDPH",
        c: "No — California does not permit phlebotomy technicians at all; only nurses may draw blood",
        d: "Yes, but only in outpatient settings",
      },
      correct: "b",
      explanation:
        "California is one of the few states that layers a state certification requirement on top of national certification. Under California Business and Professions Code §1246, any unlicensed person performing phlebotomy in a clinical laboratory must hold a current, valid Certified Phlebotomy Technician certificate — CPT1 or CPT2 — issued by CDPH. A national exam is typically a prerequisite for that state certificate, not a substitute for it.",
      why: {
        a: "This is the most common misconception candidates bring into California from states with no state licensing layer.",
        c: "Nurses, physicians, and clinical laboratory scientists may also draw blood under their own licenses, but certified phlebotomy technicians are expressly authorized too, once state-certified.",
        d: "The state certification requirement is not limited by setting; it applies to clinical laboratory blood collection generally.",
      },
      tip: "National exam, then state certificate. In California, the CDPH CPT1/CPT2 certificate is the credential that actually authorizes the draw.",
      tags: ["california", "cdph", "licensing"],
    },
    {
      id: "ca-002",
      subdomain: "CPT1 vs. CPT2",
      difficulty: 1,
      stem: "What does a California CPT1 (Certified Phlebotomy Technician I) certificate authorize?",
      choices: {
        a: "Skin puncture and venipuncture",
        b: "Skin puncture only",
        c: "Skin puncture, venipuncture, and arterial puncture",
        d: "Venipuncture only",
      },
      correct: "a",
      explanation:
        "CPT1 is the base California phlebotomy certification and authorizes both skin (capillary) puncture and venipuncture. It does not authorize arterial puncture — that scope belongs to CPT2.",
      why: {
        b: "Skin puncture alone understates CPT1's scope; venipuncture is included.",
        c: "Arterial puncture requires the CPT2 certificate, not CPT1.",
        d: "CPT1 covers both skin puncture and venipuncture, not venipuncture alone.",
      },
      tip: "CPT1 = skin + vein. CPT2 = CPT1's scope, plus artery.",
      tags: ["california", "cpt1", "scope-of-practice"],
    },
    {
      id: "ca-003",
      subdomain: "CPT1 vs. CPT2",
      difficulty: 2,
      stem: "A phlebotomy technician wants to draw arterial blood gas specimens in California — for example, in an ICU or respiratory care setting. What must be true first?",
      choices: {
        a: "They must hold a CPT2 certificate, which requires already holding CPT1",
        b: "Any CPT1 holder may perform arterial puncture after one supervised attempt",
        c: "Arterial puncture requires a nursing license; no phlebotomy certificate authorizes it",
        d: "CPT1 automatically upgrades to CPT2 after one year of experience",
      },
      correct: "a",
      explanation:
        "CPT2 adds arterial puncture to a phlebotomist's scope of practice, and it is built on top of CPT1 rather than being an alternate first credential — a candidate holds CPT1, then completes the additional training and supervised arterial punctures CDPH requires to add CPT2.",
      why: {
        b: "A single supervised attempt does not satisfy CDPH's requirements, and CPT1 alone does not authorize arterial puncture regardless of experience.",
        c: "CPT2 specifically exists to authorize arterial puncture for certified phlebotomy technicians who are not nurses.",
        d: "There is no automatic upgrade; CPT2 requires a separate application with its own supervised-procedure documentation.",
      },
      tip: "CPT2 is CPT1 plus arterial puncture — not a separate starting point.",
      tags: ["california", "cpt2", "arterial-puncture"],
    },
    {
      id: "ca-004",
      subdomain: "Regulator",
      difficulty: 1,
      stem: "Which California state agency issues and oversees the CPT1/CPT2 phlebotomy certificate?",
      choices: {
        a: "The California Department of Public Health, through Laboratory Field Services (LFS)",
        b: "The California Board of Registered Nursing",
        c: "The National Healthcareer Association",
        d: "The California Medical Board",
      },
      correct: "a",
      explanation:
        "Laboratory Field Services, a program within the California Department of Public Health, licenses clinical laboratories and certifies laboratory personnel — including certified phlebotomy technicians. It reviews applications, verifies training and procedure documentation, and issues CPT1/CPT2 certificates.",
      why: {
        b: "The Board of Registered Nursing licenses nurses, a separate credential from CPT certification.",
        c: "NHA is a national certifying agency whose exam can satisfy part of the CDPH application; NHA itself does not issue the California state certificate.",
        d: "The Medical Board licenses physicians, not phlebotomy technicians.",
      },
      tip: "CDPH → Laboratory Field Services (LFS) is the office to remember for anything California-phlebotomy-license related.",
      tags: ["california", "cdph", "lfs"],
    },
    {
      id: "ca-005",
      subdomain: "Application requirements",
      difficulty: 2,
      stem: "Which of the following is part of a typical CDPH CPT1 application packet?",
      choices: {
        a: "Documentation of a CDPH-approved training program plus supervised, successful skin punctures and venipunctures, a passing score on an approved national certification exam, fingerprinting, and the applicable fee",
        b: "A letter from any employer stating the applicant has 'some phlebotomy experience'",
        c: "Proof of a bachelor's degree in a biological science",
        d: "A passing score on the exam alone, with no supervised procedure documentation",
      },
      correct: "a",
      explanation:
        "CDPH LFS asks for evidence that training, supervised hands-on practice, and a qualifying national exam have all been completed, plus a fingerprint background check and the application fee. A national exam score alone is not sufficient — CDPH also wants documented supervised procedures.",
      why: {
        b: "A generic experience letter without specific procedure counts does not meet CDPH's documentation standard.",
        c: "A specific degree is not part of the CPT1 pathway; it is built around CDPH-approved training and supervised practice.",
        d: "The exam is one piece of the packet, not a substitute for supervised procedure documentation.",
      },
      tip: "Think training + documented supervised procedures + national exam + fingerprints + fee — CDPH wants the whole packet, not just the exam score.",
      tags: ["california", "cdph", "application"],
      sources: [SRC_CDPH_LFS],
    },
    {
      id: "ca-006",
      subdomain: "Supervision",
      difficulty: 2,
      stem: "Under California law, who may supervise a certified phlebotomy technician's blood collection duties?",
      choices: {
        a: "A licensed physician and surgeon, or another person licensed to supervise phlebotomy under the same chapter of law, such as a licensed nurse acting within that role",
        b: "Any coworker who has worked in the lab longer than the technician",
        c: "No supervision is required once a technician is certified",
        d: "Only another certified phlebotomy technician of equal or higher tier",
      },
      correct: "a",
      explanation:
        "Certified phlebotomy technicians work under the supervision of a licensed physician and surgeon, or another person licensed under the relevant chapter — commonly a licensed nurse in the collection setting. Supervision is not satisfied by informal seniority, and it does not end once a technician is certified.",
      why: {
        b: "Being senior in tenure is not the same as holding the license California requires for supervision.",
        c: "Certification changes what a technician may do; it does not remove the supervision requirement.",
        d: "Peer-level phlebotomy certification is not, by itself, the supervising license the statute requires.",
      },
      tip: "Certification authorizes the skill; supervision by a licensed professional is a separate, ongoing requirement.",
      tags: ["california", "supervision"],
    },
    {
      id: "ca-007",
      subdomain: "Supervision",
      difficulty: 3,
      stem: "A newly hired, newly certified CPT1 technician is about to perform their first blood draw at a new employer. What must happen before that first draw, according to California's competency-verification expectations?",
      choices: {
        a: "The supervisor determines the technician is competent to perform venipuncture or skin puncture before that first draw, and re-checks competency at least annually afterward",
        b: "Nothing further — CDPH certification alone is treated as proof of competency at any facility",
        c: "The technician must retake the national certification exam at the new facility",
        d: "Competency is assumed after 90 days of employment, with no earlier check",
      },
      correct: "a",
      explanation:
        "Employers are expected to have the supervising licensed professional confirm a technician's competency before their first blood withdrawal at that facility, and again on an ongoing basis — commonly cited as at least annually, with more frequent policy compliance checks. A state certificate establishes eligibility; the facility still verifies actual competency in its own setting before letting the technician draw unsupervised.",
      why: {
        b: "Facilities layer their own competency verification on top of state certification; it is not automatically waived.",
        c: "Retaking the national exam is not the mechanism used for facility-level competency verification.",
        d: "A 90-day grace period before any check contradicts the expectation that competency is confirmed before the first draw.",
      },
      tip: "Certified means eligible. A facility's own supervisor still verifies you're competent there, starting before your first stick.",
      tags: ["california", "supervision", "competency"],
    },
    {
      id: "ca-008",
      subdomain: "Continuing education",
      difficulty: 2,
      stem: "What is the general continuing education expectation for a California certified phlebotomy technician to keep their certificate current?",
      choices: {
        a: "At least three hours per year, or six hours every two years, of continuing education or training",
        b: "No continuing education is required once certified",
        c: "A full re-take of the national certification exam every year",
        d: "Forty hours of continuing education every year",
      },
      correct: "a",
      explanation:
        "California phlebotomy certification is not a one-time credential — technicians are expected to complete ongoing continuing education, commonly described as at least three hours per year or six hours across a two-year cycle, to keep the certificate current.",
      why: {
        b: "Certification is maintained, not permanent from the point of issue.",
        c: "Continuing education, not a full exam retake, is the maintenance mechanism.",
        d: "Forty hours per year substantially overstates the ongoing requirement.",
      },
      tip: "A small, steady continuing-education habit — a few hours a year — is what keeps a California CPT certificate current.",
      tags: ["california", "continuing-education", "renewal"],
    },
    {
      id: "ca-009",
      subdomain: "Scope boundaries",
      difficulty: 2,
      stem: "A CPT1-certified technician is asked to draw blood through an existing peripheral venous catheter rather than by a fresh venipuncture. Is this within scope?",
      choices: {
        a: "It can be, but only in a licensed facility and only after the technician has received the facility's required minimum hours of specific training in that procedure",
        b: "Never — catheter draws are always outside a phlebotomy technician's scope in California",
        c: "Yes, with no additional training or setting restrictions",
        d: "Only CPT2 technicians may ever draw through a catheter",
      },
      correct: "a",
      explanation:
        "California allows a certified phlebotomy technician to collect blood through a peripheral venous catheter, but conditions it: the collection must occur in a facility licensed under the relevant division of the Health and Safety Code, and the technician must have received a minimum amount of specific training in the procedure from the supervising physician or their delegate.",
      why: {
        b: "The procedure is permitted under the right conditions, not categorically excluded.",
        c: "The setting and training conditions are exactly what makes this permitted rather than blanket-approved.",
        d: "The catheter-draw allowance is not framed as CPT2-exclusive; it applies to certified phlebotomy technicians who meet the training and setting conditions.",
      },
      tip: "Catheter draws: right setting, right training, then it's in scope.",
      tags: ["california", "catheter-draw", "scope-of-practice"],
    },
    {
      id: "ca-010",
      subdomain: "Who is exempt",
      difficulty: 2,
      stem: "Which of these people can legally draw blood in a California clinical laboratory setting without holding a CPT1/CPT2 certificate?",
      choices: {
        a: "A licensed registered nurse or physician, practicing within their own license",
        b: "Anyone with six months of informal on-the-job phlebotomy experience",
        c: "A medical assistant with no phlebotomy-specific state credential",
        d: "Anyone who has passed a national phlebotomy exam but has not applied to CDPH",
      },
      correct: "a",
      explanation:
        "The CPT1/CPT2 requirement in Business and Professions Code §1246 is specifically aimed at unlicensed personnel performing phlebotomy in a clinical laboratory. Licensed professionals such as physicians and registered nurses already hold a license authorizing the procedure within their scope of practice, so the phlebotomy-technician certificate requirement does not apply to them the same way.",
      why: {
        b: "Informal experience is not a license or a CDPH certificate; it does not substitute for either.",
        c: "Medical assistants who are not otherwise licensed and have not obtained CPT certification are exactly the unlicensed personnel the statute is written for.",
        d: "This is the central point of the domain: passing a national exam without the state certificate does not satisfy California law.",
      },
      tip: "The state certificate requirement targets unlicensed personnel. Separately licensed clinicians draw blood under their own license instead.",
      tags: ["california", "licensing", "exemptions"],
    },
    {
      id: "ca-011",
      subdomain: "Reciprocity",
      difficulty: 2,
      stem: "A phlebotomist certified in another state, with an active NHA CPT credential, relocates to California and is offered a lab job. What should they expect?",
      choices: {
        a: "They still need to apply to CDPH Laboratory Field Services for a California CPT1 (or CPT2) certificate before drawing blood in a California clinical laboratory",
        b: "Their out-of-state certification is automatically valid in California with no further steps",
        c: "They must wait one full year of California residency before applying",
        d: "California does not recognize any national certifying agency, so their exam is irrelevant",
      },
      correct: "a",
      explanation:
        "A national certification is typically part of what CDPH looks for, but it does not by itself authorize practice in California. The technician still needs to submit a CDPH application — including documentation CDPH requires — and receive a California CPT certificate before drawing blood unsupervised in a clinical laboratory here.",
      why: {
        b: "This is the exact misconception this domain exists to correct: national certification does not automatically satisfy California's separate state requirement.",
        c: "There is no residency waiting period described in the state certification pathway; the requirement is about documentation, not duration of residency.",
        d: "National exams from CDPH-approved agencies are relevant — they can support the application — just not sufficient alone.",
      },
      tip: "Moving to California with an out-of-state or national certification means one more step: the CDPH application, not a fresh start from zero.",
      tags: ["california", "reciprocity", "relocation"],
    },
    {
      id: "ca-012",
      subdomain: "Training programs",
      difficulty: 1,
      stem: "What is true of phlebotomy training programs that prepare students for California CPT1/CPT2 certification?",
      choices: {
        a: "They must be approved by Laboratory Field Services to count toward CDPH certification",
        b: "Any community adult-education course qualifies automatically",
        c: "Only programs run inside a hospital qualify",
        d: "Training program approval is optional as long as the student passes a national exam",
      },
      correct: "a",
      explanation:
        "California requires that the didactic and clinical training used to support a CPT1/CPT2 application come from a program approved by Laboratory Field Services. This is one of the reasons the specific hour counts and format of an out-of-state or informal training course may not transfer directly.",
      why: {
        b: "Approval is specific to LFS review, not automatic for any adult-education listing.",
        c: "Programs can be based in various settings; the requirement is LFS approval, not a hospital location.",
        d: "Program approval is not optional — CDPH looks for training from an approved program as part of the application, separate from the exam.",
      },
      tip: "Before enrolling in a California phlebotomy program, confirm it is Laboratory Field Services–approved.",
      tags: ["california", "training-program"],
    },
    {
      id: "ca-013",
      subdomain: "Why this matters",
      difficulty: 1,
      stem: "Why does it matter for a phlebotomy student in California to understand the CPT1/CPT2 pathway before finishing their national exam prep?",
      choices: {
        a: "Because passing the national exam is a milestone on the way to being able to legally work, not the finish line — the CDPH application still has to be completed",
        b: "It doesn't matter; employers handle all state paperwork automatically for every new hire",
        c: "Because the national exam and the CDPH certificate cover identical content, so studying for one automatically completes the other",
        d: "Because CDPH certification replaces the need to ever take a national exam",
      },
      correct: "a",
      explanation:
        "Students who plan around the national exam as the final step often discover late that California requires a separate state application afterward. Understanding the pathway early — training program approval, procedure documentation, the exam, then the CDPH packet — avoids a gap between 'certified nationally' and 'legally able to work in California.'",
      why: {
        b: "Employers may help, but the applicant is ultimately responsible for holding a valid, current CPT certificate.",
        c: "The national exam and the state application are related but distinct requirements — one does not automatically complete the other.",
        d: "A qualifying national exam is generally part of, not a replacement for, the CDPH pathway.",
      },
      tip: "Plan for both finish lines: the national exam, then the CDPH application.",
      tags: ["california", "exam-prep", "planning"],
      sources: [SRC_CDPH_LFS, SRC_TEXTBOOK_CURRICULUM],
    },
    {
      id: "ca-014",
      subdomain: "Legal basis",
      difficulty: 1,
      stem: "The requirement for certified phlebotomy technicians in California comes primarily from which body of law?",
      choices: {
        a: "The California Business and Professions Code, in the Clinical Laboratory Technology chapter",
        b: "Federal OSHA regulations",
        c: "CLSI consensus standards",
        d: "The California Vehicle Code",
      },
      correct: "a",
      explanation:
        "California's phlebotomy certification requirement sits within the Business and Professions Code, in the chapter governing clinical laboratory technology. Federal OSHA and CLSI matter for safety and collection technique, but the state licensing requirement itself is a Business and Professions Code matter, implemented by CDPH.",
      why: {
        b: "OSHA governs workplace safety, such as bloodborne pathogen exposure control — a different subject from who may legally perform the draw.",
        c: "CLSI publishes voluntary laboratory standards; it does not create state licensing law.",
        d: "The Vehicle Code is unrelated.",
      },
      tip: "Safety rules (OSHA/Cal-OSHA) and collection standards (CLSI) are different from licensing law (Business and Professions Code) — know which question is asking about which.",
      tags: ["california", "legal-basis"],
      sources: [SRC_CA_BPC_1246],
    },
    {
      id: "ca-015",
      subdomain: "Employer responsibility",
      difficulty: 2,
      stem: "A clinical laboratory in California allows an employee to perform venipuncture without a current CPT1/CPT2 certificate and without another qualifying license. What is the compliance problem?",
      choices: {
        a: "The employee is practicing outside the certification requirement set by California law, which is a compliance failure for both the employee and the employing laboratory",
        b: "There is no problem as long as the employee eventually gets certified within five years",
        c: "This is only a problem if a patient specimen is later rejected",
        d: "It is permitted as long as a supervisor is generally present somewhere in the building",
      },
      correct: "a",
      explanation:
        "Business and Professions Code §1246 requires unlicensed personnel performing phlebotomy in a clinical laboratory to hold a valid, current CPT certificate. Allowing an uncertified, unlicensed employee to draw blood is a compliance failure regardless of whether a specimen problem ever surfaces — the requirement is about who is legally authorized to perform the procedure, not about specimen outcomes.",
      why: {
        b: "There is no grace period described that allows years of uncertified practice.",
        c: "Specimen quality is a separate issue from legal authorization to collect it; an uncertified draw is a problem even if the specimen is fine.",
        d: "General presence in the building does not satisfy the specific supervision and certification requirements.",
      },
      tip: "Certification status is a legal requirement independent of whether any single draw 'goes fine.'",
      tags: ["california", "compliance", "employer-responsibility"],
    },
    {
      id: "ca-016",
      subdomain: "Approved national agencies",
      difficulty: 2,
      stem: "What role does an approved national certifying agency, such as the NHA, generally play in the California CPT1/CPT2 pathway?",
      choices: {
        a: "A passing score from a CDPH-approved national certifying agency's exam is typically used as part of the evidence supporting a CPT1/CPT2 application, alongside training and procedure documentation",
        b: "National agencies issue the California state certificate directly, with no CDPH involvement",
        c: "National certification exams have no relationship to the California pathway at all",
        d: "CDPH requires applicants to pass every national agency's exam, not just one",
      },
      correct: "a",
      explanation:
        "CDPH accepts certification from national accrediting agencies it approves as one component of a CPT application. It sits alongside — not instead of — documented training and supervised procedure counts. The state certificate itself is still issued by CDPH, not by the national agency.",
      why: {
        b: "CDPH, not the national agency, issues the California CPT1/CPT2 certificate.",
        c: "A qualifying national exam is a meaningful part of the pathway, not an unrelated credential.",
        d: "One qualifying national exam from an approved agency is the expectation, not exams from every agency.",
      },
      tip: "A national exam like the NHA CPT feeds into the California application — it doesn't replace it, and CDPH still issues the final certificate.",
      tags: ["california", "nha", "national-certification"],
    },
    {
      id: "ca-017",
      subdomain: "Fingerprinting and background",
      difficulty: 1,
      stem: "Why does a CDPH CPT application typically include a fingerprint submission?",
      choices: {
        a: "CDPH conducts a criminal background check as part of certifying laboratory personnel who will handle patients and specimens",
        b: "Fingerprints are used to verify the applicant's blood type",
        c: "It is required only for CPT2, never for CPT1",
        d: "It replaces the need for a national certification exam",
      },
      correct: "a",
      explanation:
        "Like many California health-related licenses, the CPT application includes a fingerprint-based background check, since certified phlebotomy technicians work directly with patients and clinical specimens.",
      why: {
        b: "Fingerprints have no connection to blood typing.",
        c: "Background checks are a standard part of the application generally, not carved out as CPT2-only.",
        d: "Fingerprinting and the national exam are separate requirements within the same application, not substitutes for each other.",
      },
      tip: "Health licensing applications in California routinely pair background checks with education and competency requirements — CPT is no exception.",
      tags: ["california", "application", "background-check"],
    },
    {
      id: "ca-018",
      subdomain: "Big picture",
      difficulty: 3,
      stem: "A student preparing for the NHA CPT exam while living in California asks how to sequence their path to legally working as a phlebotomist in-state. Which order best reflects the California pathway?",
      choices: {
        a: "Complete a CDPH-approved training program with documented supervised procedures → pass a CDPH-approved national certification exam → submit the CPT1 application (with fingerprints and fee) to CDPH Laboratory Field Services → work under required supervision and keep up continuing education",
        b: "Pass the national exam → start working unsupervised immediately → apply to CDPH only if asked",
        c: "Apply to CDPH first with no training or exam, then complete training afterward",
        d: "Skip the national exam and go directly to CDPH for CPT2",
      },
      correct: "a",
      explanation:
        "The pathway runs through CDPH-approved training with documented supervised practice, a qualifying national exam, then a CDPH application (fingerprints and fee included) for the CPT1 certificate itself, followed by ongoing supervision and continuing education to keep it current. Skipping or reordering these steps — working unsupervised before certification, or applying before training — does not satisfy the requirement.",
      why: {
        b: "Working unsupervised on the strength of a national exam alone, before holding the state certificate, is exactly the gap this domain warns about.",
        c: "CDPH review depends on the training and exam documentation already existing; applying before completing them does not work.",
        d: "CPT2 is built on top of CPT1, and it still requires the arterial-puncture-specific training and procedures on top of the national exam.",
      },
      tip: "Train → test → apply to CDPH → work under supervision → keep continuing education current. Each step depends on the one before it.",
      tags: ["california", "pathway", "planning"],
      sources: [SRC_CDPH_LFS, SRC_CA_BPC_1246, SRC_TEXTBOOK_CURRICULUM],
    },
    {
      id: "ca-019",
      subdomain: "Certificate levels",
      difficulty: 3,
      stem: "California recognizes a Limited Phlebotomy Technician (LPT) category in addition to CPT1 and CPT2. What distinguishes it?",
      choices: {
        a: "It authorizes skin puncture only, not venipuncture or arterial puncture",
        b: "It authorizes venipuncture but limits the number of daily draws",
        c: "It is a temporary certificate that converts to CPT1 automatically",
        d: "It authorizes arterial puncture in limited settings",
      },
      correct: "a",
      explanation:
        "The state's certificate levels are tiered by the procedures they " +
        "authorize. The limited category covers skin puncture only, CPT1 adds " +
        "venipuncture, and CPT2 adds arterial puncture on top of CPT1's scope. " +
        "Each level has its own training and application requirements.",
      why: {
        b: "The distinction is which procedures are authorized, not how many draws are performed.",
        c: "Moving between levels requires meeting that level's requirements and applying; nothing converts automatically.",
        d: "Arterial puncture sits at the CPT2 level, the highest of the three.",
      },
      tip: "Three tiers by procedure: limited = skin only, CPT1 = skin + vein, CPT2 = skin + vein + artery.",
      tags: ["california", "certificate-levels", "scope-of-practice"],
    },
    {
      id: "ca-020",
      subdomain: "Renewal",
      difficulty: 2,
      stem: "A California CPT certificate has lapsed because the holder missed the renewal. What is the effect on their ability to work?",
      choices: {
        a: "They may continue working while the renewal is processed",
        b: "They are not authorized to perform certified phlebotomy duties until the certificate is current again",
        c: "There is a statutory grace period during which practice is permitted",
        d: "The employer may authorize continued practice in writing",
      },
      correct: "b",
      explanation:
        "Authorization comes from holding a current certificate. Once it lapses " +
        "the authorization lapses with it, and the holder stops performing " +
        "certified duties until CDPH restores it. Employers cannot grant " +
        "authorization that only the state can issue.",
      why: {
        a: "A pending renewal is not the same as a current certificate.",
        c: "Practicing on the assumption of a grace period is how people end up practicing without authorization.",
        d: "An employer cannot substitute its own permission for a state certificate.",
      },
      tip: "Expired means stop. Track your renewal date the way you track your exam date.",
      tags: ["california", "renewal", "compliance"],
    },
    {
      id: "ca-021",
      subdomain: "Scope of practice",
      difficulty: 3,
      stem: "A CPT1-certified technician is asked to start a peripheral intravenous line for fluid administration. Is this within their California scope?",
      choices: {
        a: "Yes, since it involves the same veins as venipuncture",
        b: "No — the CPT certificate authorizes blood collection procedures, not therapeutic infusion",
        c: "Yes, if a nurse observes",
        d: "Yes, if the patient consents",
      },
      correct: "b",
      explanation:
        "The certificate authorizes collecting specimens at defined levels of " +
        "invasiveness. Establishing access for therapy is a different activity " +
        "governed by other licenses. Similar anatomy does not extend a scope of " +
        "practice.",
      why: {
        a: "Using the same vessels does not make two different procedures the same scope.",
        c: "Observation by another professional does not expand what a certificate authorizes.",
        d: "A patient cannot consent someone into a scope of practice they do not hold.",
      },
      tip: "Same vein, different job. Collecting a specimen and delivering therapy are governed separately.",
      tags: ["california", "scope-of-practice", "iv-therapy"],
    },
    {
      id: "ca-022",
      subdomain: "Working while pending",
      difficulty: 3,
      stem: "An applicant has completed training and passed a national exam, and their CDPH application is submitted but not yet approved. Can they perform venipuncture as a certified phlebotomy technician?",
      choices: {
        a: "Yes, the exam result is the operative credential",
        b: "No — the certificate must be issued before performing certified duties, unless another lawful basis applies",
        c: "Yes, if their employer keeps a copy of the application",
        d: "Yes, for up to 90 days",
      },
      correct: "b",
      explanation:
        "The state certificate is what authorizes the work, and a submitted " +
        "application is not a certificate. Some people draw blood on another " +
        "lawful basis — a training program's supervised clinical practice, or a " +
        "separate professional license — but a pending application is not one of " +
        "them.",
      why: {
        a: "The national exam feeds into the application; it does not authorize practice in California by itself.",
        c: "Documentation of an application is not authorization.",
        d: "Inventing a provisional window is exactly the assumption that leads to unauthorized practice.",
      },
      tip: "Submitted is not issued. Confirm the certificate exists before the first independent draw.",
      tags: ["california", "application", "compliance"],
    },
    {
      id: "ca-023",
      subdomain: "Training programs",
      difficulty: 2,
      stem: "Why does it matter whether a phlebotomy training program is approved by CDPH Laboratory Field Services?",
      choices: {
        a: "Approval affects only the program's tuition rates",
        b: "Training from a non-approved program may not satisfy the state's requirements, leaving the graduate unable to certify",
        c: "Approval determines which national exam a graduate may sit",
        d: "Approval is a marketing designation with no regulatory effect",
      },
      correct: "b",
      explanation:
        "The application relies on training that meets the state's " +
        "requirements. A program without that approval can leave a graduate with " +
        "a certificate of completion that CDPH will not accept, which means " +
        "paying for the training twice. Verifying approval before enrolling is " +
        "the whole safeguard.",
      why: {
        a: "Tuition is set by the program and is unrelated to approval status.",
        c: "National certifying agencies set their own eligibility routes.",
        d: "Approval has direct regulatory consequences for an applicant.",
      },
      tip: "Check the approval list before you pay tuition, not after you graduate.",
      tags: ["california", "training-programs", "cdph"],
    },
    {
      id: "ca-024",
      subdomain: "Documentation",
      difficulty: 2,
      stem: "Why should a California CPT applicant keep their own copies of training certificates, supervised procedure logs, and exam results?",
      choices: {
        a: "CDPH requires applicants to submit originals that are never returned",
        b: "The applicant is responsible for documenting their own qualifications, and records from a closed program can be difficult to recover",
        c: "Employers are prohibited from keeping such records",
        d: "Copies substitute for the CDPH certificate itself",
      },
      correct: "b",
      explanation:
        "The burden of demonstrating qualifications sits with the applicant. " +
        "Training programs close, employers change record systems, and " +
        "reconstructing a supervised procedure log years later is often " +
        "impossible — so the person who needs the records keeps them.",
      why: {
        a: "Submission requirements vary and are not the reason to keep personal copies.",
        c: "Employers keep personnel records; that does not relieve the individual.",
        d: "No copy substitutes for the certificate CDPH issues.",
      },
      tip: "Keep your own file. Programs close and employers change systems; your record should outlast both.",
      tags: ["california", "documentation", "application"],
    },
    {
      id: "ca-025",
      subdomain: "Scope of practice",
      difficulty: 3,
      stem: "A patient asks a California CPT what their abnormal result means. What does scope of practice require?",
      choices: {
        a: "Explain the result, since the technician collected the specimen",
        b: "Refer the question to the ordering provider — interpreting results is outside the certificate's scope",
        c: "Read the reference range aloud and let the patient interpret it",
        d: "Explain only results that appear normal",
      },
      correct: "b",
      explanation:
        "The certificate authorizes collection, not diagnosis or " +
        "interpretation. Reading a value against a reference range without the " +
        "clinical picture routinely misleads patients, so the question goes to " +
        "the provider who ordered the test.",
      why: {
        a: "Collecting a specimen confers no authority to interpret what it shows.",
        c: "Handing over a range without context is interpretation by another route.",
        d: "Selective explanation still puts the technician in the interpreting role — and silence about abnormal results is its own message.",
      },
      tip: "Collect, don't interpret. That boundary holds in every state, and California is explicit about it.",
      tags: ["california", "scope-of-practice", "communication"],
    },
    {
      id: "ca-026",
      subdomain: "Supervision",
      difficulty: 3,
      stem: "How does California's supervision requirement relate to a technician's competence?",
      choices: {
        a: "Supervision ends once a technician has been certified for one year",
        b: "Supervision is an ongoing structural requirement, separate from how experienced the individual is",
        c: "Supervision applies only to CPT2 holders",
        d: "Supervision is satisfied by having a coworker in the building",
      },
      correct: "b",
      explanation:
        "The requirement is about the structure of the laboratory setting — a " +
        "qualified licensed professional responsible for the work — rather than " +
        "a training period a technician graduates out of. Experience does not " +
        "remove it.",
      why: {
        a: "There is no experience threshold that ends the requirement.",
        c: "It applies across the certificate levels, not only to CPT2.",
        d: "Physical proximity of any coworker is not the same as designated professional supervision.",
      },
      tip: "Supervision is a feature of the setting, not a phase you graduate from.",
      tags: ["california", "supervision", "compliance"],
    },
    {
      id: "ca-027",
      subdomain: "Regulatory landscape",
      difficulty: 3,
      stem: "A California CPT is expected to follow Cal/OSHA bloodborne pathogen requirements, CLSI collection standards, and CDPH certification rules. How do these relate?",
      choices: {
        a: "They are alternatives — following one satisfies the others",
        b: "They govern different things and apply simultaneously: worker safety, collection practice, and who may perform the work",
        c: "CDPH rules supersede Cal/OSHA in a laboratory",
        d: "CLSI standards are legally binding and replace state regulation",
      },
      correct: "b",
      explanation:
        "Each answers a different question. Cal/OSHA governs how the worker is " +
        "protected, CLSI describes how a collection should be performed, and " +
        "CDPH certification governs who is authorized to perform it. All three " +
        "apply to the same draw at the same time.",
      why: {
        a: "Compliance with one body of rules does not discharge obligations under another.",
        c: "Occupational safety obligations are not displaced by certification rules.",
        d: "CLSI publishes consensus standards; they are not themselves statutes.",
      },
      tip: "Safety rules, practice standards, and licensing law are three separate layers over the same procedure.",
      tags: ["california", "regulation", "compliance"],
    },
    {
      id: "ca-028",
      subdomain: "Certificate levels",
      difficulty: 2,
      stem: "A CPT1 holder wants to move up to CPT2. What does that generally require?",
      choices: {
        a: "Only additional years of experience as a CPT1",
        b: "Meeting CPT2's specific training and supervised arterial procedure requirements, then applying to CDPH",
        c: "Passing a second national certification exam only",
        d: "An employer's written attestation alone",
      },
      correct: "b",
      explanation:
        "CPT2 adds arterial puncture, so it adds arterial-specific training and " +
        "a documented number of supervised arterial procedures, followed by an " +
        "application to CDPH. Time served as a CPT1 does not by itself produce " +
        "the upgrade.",
      why: {
        a: "Experience alone does not document arterial-specific training and procedures.",
        c: "The national exam is one input; the state requirements for the higher level still apply.",
        d: "An employer cannot attest someone into a higher state certificate level.",
      },
      tip: "Every level up means level-specific training, documented procedures, and a new application.",
      tags: ["california", "cpt2", "arterial-puncture"],
    },
    {
      id: "ca-029",
      subdomain: "Verification",
      difficulty: 2,
      stem: "How can an employer confirm that a job applicant holds a current California CPT certificate?",
      choices: {
        a: "By accepting a photocopy of the certificate at face value",
        b: "By verifying the certificate's status through CDPH Laboratory Field Services",
        c: "By checking the national certifying agency's registry alone",
        d: "By asking a previous employer",
      },
      correct: "b",
      explanation:
        "The issuing authority is the authoritative source for whether a " +
        "certificate is current, suspended, or expired. A photocopy shows what " +
        "was true on the day it was printed, and a national registry confirms a " +
        "different credential entirely.",
      why: {
        a: "A copy cannot show a certificate's current status or any subsequent action against it.",
        c: "National certification and the state certificate are separate credentials with separate statuses.",
        d: "A previous employer knows what they were told, not the current state record.",
      },
      tip: "Verify with the issuer. A national certification and a state certificate are two different things.",
      tags: ["california", "verification", "cdph"],
    },
    {
      id: "ca-030",
      subdomain: "Students",
      difficulty: 3,
      stem: "On what basis may a phlebotomy student perform venipunctures during their clinical externship in California?",
      choices: {
        a: "They may practice independently once classroom hours are complete",
        b: "Under the structure of an approved training program, with the supervision that program and the clinical site require",
        c: "They may not touch a patient until certified",
        d: "Under a temporary certificate issued at enrollment",
      },
      correct: "b",
      explanation:
        "Supervised clinical practice within an approved program is how the " +
        "required procedure counts are accumulated in the first place. The " +
        "authority comes from the program's structure and the site's " +
        "supervision, not from a credential the student does not yet hold.",
      why: {
        a: "Completing classroom hours does not authorize independent practice.",
        c: "Supervised practice on patients is a required part of qualifying.",
        d: "Enrollment does not produce a state-issued temporary certificate.",
      },
      tip: "Students practice under the program's supervision. That supervised practice is what the application counts.",
      tags: ["california", "students", "externship"],
    },
    {
      id: "ca-031",
      subdomain: "Scope of practice",
      difficulty: 3,
      stem: "A CPT2 is asked to perform an arterial puncture at a site they have never been trained on, in a setting with no protocol for it. What is the appropriate response?",
      choices: {
        a: "Proceed — CPT2 authorizes arterial puncture generally",
        b: "Decline until trained and competency-verified for that procedure and setting, and escalate the request",
        c: "Proceed if a physician is nearby",
        d: "Proceed and document the lack of training afterwards",
      },
      correct: "b",
      explanation:
        "A certificate defines the outer boundary of what may be authorized; " +
        "individual competence and facility protocol define what should actually " +
        "be performed. Being certified for a category of procedure is not the " +
        "same as being trained and verified for this one.",
      why: {
        a: "Certification sets the ceiling, not a guarantee of competence for every variant.",
        c: "Proximity of a physician does not substitute for training and competency verification.",
        d: "Documenting a known deficiency after the fact does not make the act safe or defensible.",
      },
      tip: "Certified ≠ competent for everything in the category. Training and verification are separate.",
      tags: ["california", "competency", "arterial-puncture"],
    },
    {
      id: "ca-032",
      subdomain: "Renewal",
      difficulty: 2,
      stem: "What is the certificate holder's responsibility when their legal name or mailing address changes?",
      choices: {
        a: "Nothing until the next renewal cycle",
        b: "Notify CDPH according to its requirements, so records and renewal notices stay accurate",
        c: "Notify only their employer",
        d: "Obtain an entirely new certificate",
      },
      correct: "b",
      explanation:
        "Certificate holders keep their information current with the issuing " +
        "agency. Renewal notices and correspondence go to the address on file, " +
        "and a lapse caused by mail going to an old address still leaves the " +
        "holder unauthorized to work.",
      why: {
        a: "Waiting can mean missing the renewal notice that prevents a lapse.",
        c: "The employer's records do not update the state's.",
        d: "An update is a record change, not a new certificate.",
      },
      tip: "A renewal notice sent to an old address still counts as sent. Keep CDPH current.",
      tags: ["california", "renewal", "record-keeping"],
    },
    {
      id: "ca-033",
      subdomain: "Compliance",
      difficulty: 3,
      stem: "A supervisor asks an uncertified employee to perform venipunctures because the department is short-staffed. What is the correct response?",
      choices: {
        a: "Comply, since the supervisor is accountable for the decision",
        b: "Decline and raise the issue, because authorization is a legal requirement that staffing pressure does not waive",
        c: "Comply for a single shift only",
        d: "Comply if the draws are documented as performed by a certified colleague",
      },
      correct: "b",
      explanation:
        "Staffing pressure does not create authorization. Performing certified " +
        "duties without the certificate exposes the individual and the facility, " +
        "and documenting the work under someone else's name compounds it with " +
        "falsified records.",
      why: {
        a: "A supervisor's instruction does not transfer legal responsibility for practicing without authorization.",
        c: "The requirement has no single-shift exception.",
        d: "Recording work under another person's name is falsification of records.",
      },
      tip: "No one can delegate authorization they do not have the power to grant.",
      tags: ["california", "compliance", "unauthorized-practice"],
    },
    {
      id: "ca-034",
      subdomain: "Continuing education",
      difficulty: 2,
      stem: "What is the purpose of the continuing education requirement attached to a California CPT certificate?",
      choices: {
        a: "To generate revenue for training providers",
        b: "To keep certificate holders current with changing standards, safety requirements, and practice",
        c: "To replace the need for employer competency verification",
        d: "To determine seniority in the workplace",
      },
      correct: "b",
      explanation:
        "Collection standards, safety devices, and regulatory requirements all " +
        "change over a career. Periodic education is the mechanism for keeping " +
        "practice aligned with them, and it sits alongside — not instead of — an " +
        "employer's competency verification.",
      why: {
        a: "The requirement exists for practice currency; provider revenue is incidental.",
        c: "Employer competency verification is a separate and continuing obligation.",
        d: "Continuing education has no bearing on workplace seniority.",
      },
      tip: "Standards move. Continuing education is how your practice moves with them.",
      tags: ["california", "continuing-education", "renewal"],
    },
    {
      id: "ca-035",
      subdomain: "Regulatory landscape",
      difficulty: 3,
      stem: "Why is California's phlebotomy certificate requirement relevant to a student preparing for a national certification exam?",
      choices: {
        a: "The national exam includes a California law section for all candidates",
        b: "National certification is a step toward practicing in California, but the state certificate is what authorizes the work there",
        c: "California certification replaces the need for a national exam",
        d: "The two credentials are issued by the same organization",
      },
      correct: "b",
      explanation:
        "The two credentials do different jobs. A national exam demonstrates " +
        "competence to a certifying body and feeds the state application; the " +
        "CDPH certificate is what makes the draw lawful in California. Planning " +
        "for only one leaves a graduate unable to start work.",
      why: {
        a: "National exams are written for a national audience and do not carry a state-law section for every candidate.",
        c: "The state pathway generally relies on a qualifying national exam rather than replacing it.",
        d: "A national certifying agency and a state public health department are entirely separate bodies.",
      },
      tip: "Two finish lines: the national exam, then the state certificate. Budget time and money for both.",
      tags: ["california", "national-certification", "planning"],
    },
    {
      id: "ca-036",
      subdomain: "Compliance",
      difficulty: 2,
      stem: "Where should a California phlebotomy student confirm current training hours, supervised procedure counts, and fees before applying?",
      choices: {
        a: "A study guide or exam prep resource",
        b: "Current CDPH Laboratory Field Services publications, or by contacting LFS directly",
        c: "A discussion forum for phlebotomy students",
        d: "The employer's onboarding packet",
      },
      correct: "b",
      explanation:
        "These specifics are set by the state and can change. Study material " +
        "captures a snapshot, and even a careful one goes out of date, so the " +
        "issuing agency's current publications are the source to rely on for an " +
        "actual application.",
      why: {
        a: "Prep resources describe the shape of the pathway; they are not maintained as an authoritative record of current numbers.",
        c: "Peer discussion is often out of date and is not authoritative.",
        d: "Employer materials describe that employer's process, not the state's current requirements.",
      },
      tip: "Learn the structure from study material; confirm every number with CDPH before you apply.",
      tags: ["california", "verification", "application"],
      sources: [SRC_CDPH_LFS, SRC_TEXTBOOK_CURRICULUM],
    },
  ],
);

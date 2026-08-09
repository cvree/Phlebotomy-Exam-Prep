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
  ],
);

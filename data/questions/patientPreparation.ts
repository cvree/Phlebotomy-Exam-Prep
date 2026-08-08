import { buildQuestions } from "./authoring";
import { SRC_CLSI_GP41, SRC_TEXTBOOK_CURRICULUM } from "@/data/sources";

export const PATIENT_PREP_QUESTIONS = buildQuestions(
  {
    domain: "patient-preparation",
    certifications: ["nha-cpt"],
    sources: [SRC_CLSI_GP41, SRC_TEXTBOOK_CURRICULUM],
    reviewStatus: "needs-review",
  },
  [
    {
      id: "pre-001",
      subdomain: "Fasting",
      difficulty: 2,
      stem: "A patient scheduled for a fasting lipid panel reports drinking black coffee two hours ago. What should the phlebotomist do?",
      choices: {
        a: "Proceed with the draw; black coffee does not break a fast",
        b: "Cancel the test and reschedule for the next morning",
        c: "Proceed with the draw and document the non-fasting status per facility policy",
        d: "Have the patient wait four more hours and then draw",
      },
      correct: "c",
      explanation:
        "Coffee — even black — stimulates metabolism and is not permitted " +
        "during a true fast, in which only water is allowed. The phlebotomist " +
        "does not unilaterally cancel an ordered test. Collect if policy " +
        "allows, document that the patient was not fasting so the result can " +
        "be interpreted correctly, and notify per your facility's process.",
      why: {
        a: "Water only. Coffee, tea, gum, and smoking all affect a fasting specimen.",
        b: "Cancelling an ordered test is not the phlebotomist's decision.",
        d: "Ad hoc rescheduling at the drawing chair is not the correct process and wastes the patient's day.",
      },
      tip: "A fast means water only. When the fast is broken, document it rather than hiding it — the number is only interpretable with that context.",
      tags: ["fasting", "lipid-panel"],
    },
    {
      id: "pre-002",
      subdomain: "Consent",
      difficulty: 2,
      stem: "A competent adult inpatient says \"No, I don't want any more blood taken\" when the phlebotomist arrives. What is the correct response?",
      choices: {
        a: "Explain that the doctor ordered it and proceed",
        b: "Stop, do not draw, and report the refusal to the nurse and per facility policy",
        c: "Return in ten minutes and try again without discussion",
        d: "Ask a family member to authorise the draw",
      },
      correct: "b",
      explanation:
        "A competent adult can refuse any procedure. Proceeding without " +
        "consent is battery. The correct action is to stop, thank the " +
        "patient, and report the refusal so the care team can address it — " +
        "often the patient's concern is answerable, but that conversation " +
        "belongs to the team, not to a forced draw.",
      why: {
        a: "An order authorises the test; it does not override the patient's refusal.",
        c: "Repeated attempts to catch a patient off guard are coercive.",
        d: "Family members cannot consent for a competent adult.",
      },
      tip: "Consent is ongoing. A patient can withdraw it at any point, including mid-procedure.",
      tags: ["consent", "refusal", "ethics"],
    },
    {
      id: "pre-003",
      subdomain: "Basal state",
      difficulty: 2,
      stem: "The term \"basal state\" refers to a patient who:",
      choices: {
        a: "Has been fasting for 12 hours and is at rest, typically drawn early in the morning",
        b: "Has just completed moderate exercise",
        c: "Is lying flat regardless of when they last ate",
        d: "Has abstained from all medication for 24 hours",
      },
      correct: "a",
      explanation:
        "Basal state describes the body after roughly 12 hours of fasting " +
        "and rest, which in practice means an early-morning draw before " +
        "the patient has eaten or become active. Many reference ranges were " +
        "established on basal-state specimens, which is why the timing " +
        "matters for comparability.",
      why: {
        b: "Exercise shifts numerous analytes and is the opposite of basal.",
        c: "Position affects some analytes but is not what basal state means on its own.",
        d: "Medication holds are a separate instruction from the ordering provider.",
      },
      tip: "Basal state is why morning draws exist. Reference ranges assume it.",
      tags: ["basal-state", "timing"],
    },
    {
      id: "pre-004",
      subdomain: "Site assessment",
      difficulty: 3,
      stem: "A patient has had a mastectomy with lymph node dissection on the left side and has an IV running in the right forearm. Where should the phlebotomist look first?",
      choices: {
        a: "The left arm, since the right arm has an IV",
        b: "Above the IV site on the right arm",
        c: "A site on the right arm below the IV, or an alternative site such as the hand or foot per policy — after consulting the nurse",
        d: "Any convenient vein, since neither restriction is absolute",
      },
      correct: "c",
      explanation:
        "Both arms are restricted, so this needs a deliberate decision rather " +
        "than a default. The mastectomy side is generally avoided because " +
        "lymph node removal impairs drainage and raises infection and " +
        "lymphedema risk. On the IV side, drawing above the IV contaminates " +
        "the specimen with infusing fluid; below it, after the infusion has " +
        "been stopped for a period per policy, is the usual approach. When " +
        "both arms are compromised, involve the nurse and follow facility " +
        "policy — which may require provider authorisation.",
      why: {
        a: "The mastectomy side is the restriction that most facilities treat most conservatively, and it is not automatically overridden by an IV on the other side.",
        b: "Drawing above a running IV is the classic way to produce a wildly wrong potassium or glucose.",
        d: "Both restrictions exist for real reasons and are not optional.",
      },
      tip: "Never above a running IV. When both arms are restricted, escalate rather than improvise.",
      tags: ["site-selection", "mastectomy", "iv"],
    },
    {
      id: "pre-005",
      subdomain: "Positioning",
      difficulty: 2,
      stem: "A patient tells the phlebotomist they fainted the last time they had blood drawn. What is the most appropriate action?",
      choices: {
        a: "Draw quickly so the patient has less time to react",
        b: "Have the patient lie down for the draw and stay with them afterwards",
        c: "Ask a colleague to perform the draw instead",
        d: "Give the patient juice before starting",
      },
      correct: "b",
      explanation:
        "A history of syncope is the single best predictor of syncope, and " +
        "the response is to remove the fall risk: draw the patient supine, " +
        "or at minimum reclined, and keep them under observation afterwards. " +
        "A fainting patient in a standing or seated position can sustain a " +
        "head injury far worse than the draw itself.",
      why: {
        a: "Speed does not prevent a vasovagal response, and rushing increases the chance of a failed stick and a repeat.",
        c: "Changing operators does not change the patient's physiology.",
        d: "Food or drink may help a patient who is fasting and lightheaded, but positioning is what prevents injury.",
      },
      tip: "Ask every patient about previous reactions. It takes five seconds and prevents most syncope injuries.",
      tags: ["syncope", "positioning", "history"],
    },
    {
      id: "pre-006",
      subdomain: "Allergies",
      difficulty: 2,
      stem: "A patient reports a latex allergy. Which supply most needs to be checked before the draw?",
      choices: {
        a: "The evacuated tubes",
        b: "The tourniquet, gloves, and adhesive bandage",
        c: "The alcohol prep pad",
        d: "The needle",
      },
      correct: "b",
      explanation:
        "Latex shows up in reusable tourniquets, some gloves, and many " +
        "adhesive bandages — all of which contact the skin for a sustained " +
        "period. Latex-free substitutes exist for each, and a patient with a " +
        "documented allergy needs all three swapped, not just the gloves.",
      why: {
        a: "Some tube stoppers historically contained latex, so it is worth being aware of, but the tourniquet, gloves, and bandage are the direct and prolonged skin contacts.",
        c: "Alcohol pads are not a latex source.",
        d: "The needle itself is stainless steel.",
      },
      tip: "Latex-free means the whole kit. People remember gloves and forget the tourniquet and the bandage.",
      tags: ["latex-allergy", "equipment"],
    },
    {
      id: "pre-007",
      subdomain: "Communication",
      difficulty: 2,
      stem: "A nine-year-old child is visibly anxious about the draw. Which approach is most appropriate?",
      choices: {
        a: "Tell the child it will not hurt at all",
        b: "Explain honestly and simply what will happen, and offer a limited real choice such as which arm",
        c: "Have the parent restrain the child so the draw can be done quickly",
        d: "Postpone the draw until the child is calm on their own",
      },
      correct: "b",
      explanation:
        "Honesty plus a small amount of control works better than " +
        "reassurance that turns out to be false. Telling a child it will not " +
        "hurt destroys their trust the moment the needle goes in — and their " +
        "trust in the next healthcare worker too. Offering a genuine choice " +
        "within a fixed frame ('which arm?' not 'shall we?') gives the child " +
        "agency without making the procedure negotiable.",
      why: {
        a: "It is untrue, and the child will know within seconds.",
        c: "Holding techniques have a place with young children, but restraint is not the first move for a nine-year-old who can be talked with.",
        d: "Open-ended delay usually increases anxiety rather than resolving it.",
      },
      tip: "Never promise it will not hurt. Say what it will feel like and how long it will last.",
      tags: ["paediatric", "communication"],
    },
    {
      id: "pre-008",
      subdomain: "Timing",
      difficulty: 3,
      stem: "A trough level for an antibiotic is ordered. When should the specimen be collected?",
      choices: {
        a: "Thirty minutes after the dose is given",
        b: "Immediately before the next scheduled dose",
        c: "At the midpoint between two doses",
        d: "At any time, provided the exact time is documented",
      },
      correct: "b",
      explanation:
        "A trough is the lowest concentration in the dosing interval, which " +
        "occurs just before the next dose. It tells the clinician whether the " +
        "drug is staying above the therapeutic threshold. A peak — collected " +
        "a specified interval after administration — answers the opposite " +
        "question, whether the concentration is climbing into a toxic range.",
      why: {
        a: "That timing describes a peak, not a trough, and the exact interval depends on the drug and route.",
        c: "A midpoint level is neither, and is not interpretable against trough reference ranges.",
        d: "Documentation is required but does not substitute for correct timing — a mistimed level is clinically useless.",
      },
      tip: "Trough = lowest = just before the next dose. Peak = highest = a set interval after it. Always record the exact collection time.",
      tags: ["tdm", "trough", "timing"],
    },
    {
      id: "pre-009",
      subdomain: "Site assessment",
      difficulty: 2,
      stem: "Which site should be avoided for routine venipuncture?",
      choices: {
        a: "The median cubital vein in the antecubital fossa",
        b: "An area of extensive scarring from burns",
        c: "The cephalic vein on the lateral aspect of the arm",
        d: "The dorsal hand veins using a winged set",
      },
      correct: "b",
      explanation:
        "Burned and heavily scarred tissue is avoided: the veins are hard to " +
        "palpate and often sclerosed, the tissue is fragile, the area is more " +
        "susceptible to infection, and sensation may be altered so the " +
        "patient cannot report nerve pain reliably. Edematous, hematomatous, " +
        "and heavily tattooed-and-inflamed sites are avoided for related " +
        "reasons.",
      why: {
        a: "The median cubital vein is the usual first choice.",
        c: "The cephalic vein is a reasonable second choice, particularly in larger patients.",
        d: "Hand veins with a winged set are a normal alternative when the antecubital is unusable.",
      },
      tip: "Avoid: burns, scars, edema, hematoma, and the same-side mastectomy. Each one is unreliable for a different reason.",
      tags: ["site-selection", "contraindications"],
    },
    {
      id: "pre-010",
      subdomain: "Fasting",
      difficulty: 1,
      stem: "For a standard fasting specimen, what is the patient permitted to consume during the fasting period?",
      choices: {
        a: "Water only",
        b: "Water and clear juice",
        c: "Water and black coffee",
        d: "Nothing at all, including water",
      },
      correct: "a",
      explanation:
        "Water is allowed and is actively encouraged — a dehydrated patient " +
        "is harder to draw and their results can be affected by " +
        "hemoconcentration. Everything else is excluded, including juice, " +
        "coffee, tea, gum, mints, and smoking.",
      why: {
        b: "Juice contains sugar and directly affects glucose and lipids.",
        c: "Coffee is a metabolic stimulant and is not permitted.",
        d: "Withholding water is not required and makes the draw harder.",
      },
      tip: "Water yes, everything else no. Encourage water — hydrated veins are easier veins.",
      tags: ["fasting", "hydration"],
    },
  ],
);

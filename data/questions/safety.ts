import { buildQuestions } from "./authoring";
import {
  SRC_CDC_HAND_HYGIENE,
  SRC_CDC_STANDARD_PRECAUTIONS,
  SRC_OSHA_BBP,
  SRC_TEXTBOOK_CURRICULUM,
} from "@/data/sources";

export const SAFETY_QUESTIONS = buildQuestions(
  {
    domain: "safety-infection-control",
    certifications: ["nha-cpt"],
    sources: [
      SRC_OSHA_BBP,
      SRC_CDC_STANDARD_PRECAUTIONS,
      SRC_TEXTBOOK_CURRICULUM,
    ],
    reviewStatus: "needs-review",
  },
  [
    {
      id: "saf-001",
      subdomain: "Standard precautions",
      difficulty: 1,
      stem: "Standard precautions are applied to which patients?",
      choices: {
        a: "Only patients with a documented bloodborne infection",
        b: "Only patients on isolation precautions",
        c: "Every patient, regardless of diagnosis or presumed infection status",
        d: "Only patients whose chart flags them as high risk",
      },
      correct: "c",
      explanation:
        "Standard precautions treat blood, all body fluids except sweat, " +
        "non-intact skin, and mucous membranes as potentially infectious for " +
        "every patient. The whole point is that infection status is often " +
        "unknown — including to the patient — so protection cannot depend on " +
        "knowing who is infected.",
      why: {
        a: "Most bloodborne infections are undiagnosed at the time of a draw.",
        b: "Transmission-based precautions are added on top of standard precautions, never instead of them.",
        d: "A risk flag is information, not a substitute for baseline protection.",
      },
      tip: "Standard precautions are the floor, not the response. Isolation precautions stack on top.",
      tags: ["standard-precautions", "ppe"],
    },
    {
      id: "saf-002",
      subdomain: "Sharps safety",
      difficulty: 1,
      stem: "Immediately after withdrawing the needle from the patient's arm, what should the phlebotomist do with it?",
      choices: {
        a: "Recap it using a one-handed scoop technique, then discard it",
        b: "Activate the safety device and place it in a sharps container",
        c: "Set it on the tray until the site has been bandaged",
        d: "Remove the needle from the holder and discard the parts separately",
      },
      correct: "b",
      explanation:
        "The safety feature is activated as the needle leaves the arm, and " +
        "the needle goes directly into a sharps container at the point of " +
        "use. Every second a contaminated needle spends uncontained is an " +
        "opportunity for an injury, and most needlesticks happen between " +
        "withdrawal and disposal.",
      why: {
        a: "Recapping is prohibited for routine disposal. The scoop technique is a narrow exception for situations where recapping is unavoidable, not a disposal method.",
        c: "An uncontained needle on a tray is one of the most common sources of injury to the phlebotomist and to housekeeping staff.",
        d: "The needle and holder are discarded as a single unit; disassembling adds handling.",
      },
      tip: "Activate, then discard — in one motion, at the bedside. The container comes to the draw, not the other way round.",
      tags: ["sharps", "needlestick"],
    },
    {
      id: "saf-003",
      subdomain: "PPE",
      difficulty: 2,
      stem: "When removing personal protective equipment after a draw on a patient in contact precautions, which item is removed first?",
      choices: {
        a: "Mask or respirator",
        b: "Gown",
        c: "Gloves",
        d: "Face shield",
      },
      correct: "c",
      explanation:
        "Gloves come off first because they are the most contaminated item. " +
        "Removing them before touching the gown ties, mask straps, or your " +
        "own face keeps contamination from spreading. The mask or respirator " +
        "comes off last, outside the room, because it protects you while you " +
        "are still in the contaminated space.",
      why: {
        a: "The mask is removed last, after leaving the patient's room.",
        b: "The gown is removed after gloves and eye protection.",
        d: "Eye protection is removed after gloves, by the strap or earpieces.",
      },
      tip: "Dirtiest off first, and touch clean surfaces only — remove eye protection and masks by the straps, never the front.",
      tags: ["ppe", "doffing"],
      sources: [SRC_CDC_STANDARD_PRECAUTIONS, SRC_TEXTBOOK_CURRICULUM],
    },
    {
      id: "saf-004",
      subdomain: "Exposure response",
      difficulty: 2,
      stem: "A phlebotomist sustains a needlestick from a used needle. What is the first action?",
      choices: {
        a: "Report the incident to the supervisor",
        b: "Wash the site with soap and running water",
        c: "Ask the patient to consent to source testing",
        d: "Complete the facility exposure incident form",
      },
      correct: "b",
      explanation:
        "Immediate decontamination comes first: wash the wound with soap and " +
        "running water. Reporting, source testing, and documentation all " +
        "follow, and they follow quickly — post-exposure prophylaxis is " +
        "time-sensitive — but they come after the site has been washed.",
      why: {
        a: "Reporting is essential and should happen within minutes, but not before washing the wound.",
        c: "Source testing is part of the evaluation the employer arranges, not the exposed worker's first step.",
        d: "Documentation is required, and it comes after immediate care and reporting.",
      },
      tip: "Wash, report, evaluate — in that order. Do not squeeze the wound or apply bleach or caustic agents.",
      tags: ["needlestick", "post-exposure"],
      sources: [SRC_OSHA_BBP, SRC_TEXTBOOK_CURRICULUM],
    },
    {
      id: "saf-005",
      subdomain: "Hand hygiene",
      difficulty: 2,
      stem: "A phlebotomist has just finished a draw on a patient with confirmed Clostridioides difficile infection. Which hand hygiene method is appropriate after removing gloves?",
      choices: {
        a: "Alcohol-based hand rub, because it is faster and less drying",
        b: "Washing with soap and running water",
        c: "No hand hygiene is needed because gloves were worn",
        d: "Alcohol-based hand rub followed by a glove change",
      },
      correct: "b",
      explanation:
        "C. difficile forms spores, and alcohol does not reliably inactivate " +
        "them. Soap and running water physically remove spores from the " +
        "hands, so washing is the method of choice after caring for these " +
        "patients. Alcohol rub is appropriate in most other situations, but " +
        "not this one.",
      why: {
        a: "Alcohol is convenient and effective against many organisms, but not against C. difficile spores.",
        c: "Gloves reduce contamination; they do not eliminate it. Hands are decontaminated after every glove removal.",
        d: "Adding gloves does not solve the problem — the spores are already on the hands.",
      },
      tip: "Spores and visibly soiled hands mean soap and water. Alcohol rub handles most of the rest.",
      tags: ["hand-hygiene", "c-difficile"],
      sources: [SRC_CDC_HAND_HYGIENE, SRC_TEXTBOOK_CURRICULUM],
    },
    {
      id: "saf-006",
      subdomain: "Transmission-based precautions",
      difficulty: 2,
      stem: "A patient is on airborne precautions for suspected pulmonary tuberculosis. What respiratory protection does the phlebotomist need before entering the room?",
      choices: {
        a: "A surgical mask",
        b: "A fit-tested N95 or higher-level respirator",
        c: "A face shield alone",
        d: "No respiratory protection if the patient is wearing a mask",
      },
      correct: "b",
      explanation:
        "Airborne precautions require a fit-tested respirator — an N95 or " +
        "better — because the infectious particles stay suspended in air and " +
        "pass around and through a loose surgical mask. Fit testing matters: " +
        "an unfitted respirator leaks at the seal.",
      why: {
        a: "A surgical mask blocks droplets, not airborne particles.",
        c: "A face shield protects against splashes; it does nothing for inhaled particles.",
        d: "Source control on the patient helps, but it does not replace respiratory protection for the worker.",
      },
      tip: "Droplet = surgical mask. Airborne = fit-tested respirator. The distinction is particle size, not severity.",
      tags: ["airborne", "tuberculosis", "ppe"],
    },
    {
      id: "saf-007",
      subdomain: "Biohazard",
      difficulty: 2,
      stem: "A tube of blood breaks on a hard floor. After putting on gloves, what is the correct sequence?",
      choices: {
        a: "Pour disinfectant over the spill, then sweep the glass into a bag",
        b: "Absorb the liquid, remove glass with forceps or a brush and dustpan, then disinfect the area",
        c: "Disinfect the area, then pick the glass up by hand and absorb the residue",
        d: "Cover the spill with a towel and report it to housekeeping",
      },
      correct: "b",
      explanation:
        "Absorb the liquid first so the material is contained, then remove " +
        "the sharp fragments mechanically — never with the hands — and " +
        "finally disinfect the surface with an appropriate agent and the " +
        "correct contact time. Broken glass goes into the sharps container.",
      why: {
        a: "Flooding the spill spreads it, and sweeping before absorbing aerosolises and smears the material.",
        c: "Disinfectant is far less effective against organic load, and picking up glass by hand risks a laceration through the glove.",
        d: "The person who created the spill is responsible for containing it, and the spill remains a hazard while it waits.",
      },
      tip: "Contain, remove sharps mechanically, then disinfect. Disinfectant needs its full contact time to work.",
      tags: ["spill", "biohazard"],
    },
    {
      id: "saf-008",
      subdomain: "Sharps safety",
      difficulty: 1,
      stem: "A sharps container in a draw station is nearly full. What should be done?",
      choices: {
        a: "Press the contents down to make room and continue using it",
        b: "Replace it once it reaches the manufacturer's indicated fill line",
        c: "Continue using it until nothing more will fit",
        d: "Empty it into a biohazard bag and reuse the container",
      },
      correct: "b",
      explanation:
        "Sharps containers are replaced when they reach the fill line marked " +
        "by the manufacturer — typically well before they are physically " +
        "full. Overfilling causes needles to protrude from the opening, " +
        "which is a direct injury hazard to everyone who uses or transports " +
        "the container.",
      why: {
        a: "Reaching into or pressing down on a sharps container is one of the most dangerous things you can do with one.",
        c: "'Full' by the container's marking is well before 'full' by volume, and for good reason.",
        d: "Sharps containers are sealed and disposed of as a unit; they are not emptied.",
      },
      tip: "The fill line is the limit, not a suggestion. Never reach in, never press down.",
      tags: ["sharps", "disposal"],
    },
    {
      id: "saf-009",
      subdomain: "Fire safety",
      difficulty: 1,
      stem: "The RACE acronym for responding to a fire in a healthcare facility stands for:",
      choices: {
        a: "Report, Assess, Contain, Escape",
        b: "Rescue, Alarm, Confine, Extinguish or Evacuate",
        c: "Remove, Alert, Close, Exit",
        d: "Respond, Announce, Control, Evaluate",
      },
      correct: "b",
      explanation:
        "Rescue anyone in immediate danger, activate the Alarm, Confine the " +
        "fire by closing doors, then Extinguish it if it is small and you are " +
        "trained — otherwise Evacuate. The order matters: people first, " +
        "notification second, containment third.",
      tip: "RACE is what you do; PASS (Pull, Aim, Squeeze, Sweep) is how you use the extinguisher.",
      tags: ["fire-safety", "race"],
      sources: [SRC_TEXTBOOK_CURRICULUM],
    },
    {
      id: "saf-010",
      subdomain: "Chemical safety",
      difficulty: 1,
      stem: "Where does a phlebotomist find information about the hazards of a chemical used in the lab?",
      choices: {
        a: "The facility's incident report log",
        b: "The Safety Data Sheet (SDS) for that chemical",
        c: "The manufacturer's shipping invoice",
        d: "The laboratory information system",
      },
      correct: "b",
      explanation:
        "Safety Data Sheets describe a chemical's hazards, required " +
        "protective equipment, first-aid measures, spill response, and " +
        "disposal. Employers must keep them accessible to staff during all " +
        "working hours, and knowing where yours are kept is part of " +
        "orientation.",
      why: {
        a: "Incident logs record what has already happened, not how to handle a substance.",
        c: "Invoices record what was shipped, not how to work with it safely.",
        d: "The LIS handles orders and results.",
      },
      tip: "SDS answers four questions fast: what does it do to me, what do I wear, what do I do if it spills, and what do I do if it gets on me.",
      tags: ["chemical-safety", "sds"],
      sources: [SRC_TEXTBOOK_CURRICULUM],
    },
    {
      id: "saf-011",
      subdomain: "Standard precautions",
      difficulty: 3,
      stem: "A phlebotomist wears the same pair of gloves to draw two patients in adjacent beds, changing nothing in between. What is the primary problem?",
      choices: {
        a: "The gloves may have developed micro-tears from the first draw",
        b: "Gloves are single-patient items, and reuse transfers organisms between patients",
        c: "Glove powder from the first draw could contaminate the second specimen",
        d: "The second patient may have a latex allergy",
      },
      correct: "b",
      explanation:
        "Gloves are changed between every patient, full stop. Reusing them " +
        "carries organisms directly from one patient to the next, which is a " +
        "textbook route for healthcare-associated infection. Hand hygiene is " +
        "performed after removing the first pair and before donning the " +
        "second.",
      why: {
        a: "Micro-tears are a real risk, but they endanger the phlebotomist. The larger issue here is patient-to-patient transmission.",
        c: "Powdered gloves have largely been withdrawn from healthcare use, and specimen contamination is not the main concern.",
        d: "A latex allergy would be a problem with the glove material, not with reuse.",
      },
      tip: "One patient, one pair. Hand hygiene between them, every time.",
      tags: ["gloves", "cross-contamination"],
    },
  ],
);

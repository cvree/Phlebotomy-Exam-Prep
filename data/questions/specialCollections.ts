import { buildQuestions } from "./authoring";
import {
  SRC_CLSI_GP41,
  SRC_CLSI_GP42,
  SRC_TEXTBOOK_CURRICULUM,
} from "@/data/sources";

export const SPECIAL_COLLECTIONS_QUESTIONS = buildQuestions(
  {
    domain: "special-collections",
    certifications: ["nha-cpt"],
    sources: [SRC_CLSI_GP41, SRC_TEXTBOOK_CURRICULUM],
    reviewStatus: "needs-review",
  },
  [
    {
      id: "spc-001",
      subdomain: "Blood cultures",
      difficulty: 3,
      stem: "What most distinguishes site preparation for a blood culture from a routine venipuncture?",
      choices: {
        a: "The site is cleaned with a stronger antiseptic and a longer contact time, and is not re-palpated afterwards",
        b: "The site is warmed before collection",
        c: "A larger gauge needle is required",
        d: "The tourniquet is applied for longer",
      },
      correct: "a",
      explanation:
        "Blood cultures need genuine antisepsis rather than the brief " +
        "alcohol wipe used routinely — typically chlorhexidine or iodine with " +
        "the full contact and drying time the product specifies. Critically, " +
        "the site is not touched again after preparation. Re-palpating with " +
        "an ungloved or unprepared finger reintroduces skin flora and is a " +
        "leading cause of contaminated cultures.",
      why: {
        b: "Warming aids difficult draws; it is not part of culture technique.",
        c: "Needle size is not the distinguishing factor.",
        d: "Tourniquet time limits are unchanged, and longer would be worse.",
      },
      tip: "Prep it, let it dry, do not touch it again. Most false-positive cultures come from skin flora.",
      tags: ["blood-culture", "antisepsis", "contamination"],
    },
    {
      id: "spc-002",
      subdomain: "Glucose tolerance",
      difficulty: 2,
      stem: "During a two-hour glucose tolerance test, when does timing begin?",
      choices: {
        a: "When the fasting specimen is collected",
        b: "When the patient finishes drinking the glucose solution",
        c: "When the patient arrives at the clinic",
        d: "When the first post-dose specimen is collected",
      },
      correct: "b",
      explanation:
        "The clock starts the moment the patient finishes the glucose drink, " +
        "and every subsequent collection time is measured from that point. " +
        "The fasting specimen is drawn beforehand as the baseline. Timing has " +
        "to be exact, because the interpretation depends entirely on where " +
        "each value falls in the curve.",
      why: {
        a: "The fasting draw establishes the baseline and precedes the dose.",
        c: "Arrival time has no bearing on the curve.",
        d: "The post-dose draws are timed from the dose, not from each other.",
      },
      tip: "Clock starts when the last sip is taken. Record actual times, not scheduled ones.",
      tags: ["gtt", "glucose", "timing"],
    },
    {
      id: "spc-003",
      subdomain: "Glucose tolerance",
      difficulty: 3,
      stem: "A patient vomits 20 minutes after drinking the glucose solution for a GTT. What should the phlebotomist do?",
      choices: {
        a: "Continue the test and note the vomiting",
        b: "Give a second dose of glucose and restart the timing",
        c: "Stop the test and notify the ordering provider, who decides whether to reschedule",
        d: "Skip the 30-minute draw and continue with the rest",
      },
      correct: "c",
      explanation:
        "Once the dose has been lost, the test cannot produce interpretable " +
        "results — nobody knows how much glucose was absorbed. The " +
        "phlebotomist stops, documents the time and circumstances, and " +
        "notifies the provider, who decides whether to reschedule. Re-dosing " +
        "is not the phlebotomist's call.",
      why: {
        a: "The remaining values would be meaningless and could be misread as a normal curve.",
        b: "Repeating the dose is a clinical decision made by the provider.",
        d: "Dropping one time point does not fix an unknown absorbed dose.",
      },
      tip: "Lost dose means lost test. Stop, document the time, escalate.",
      tags: ["gtt", "protocol"],
    },
    {
      id: "spc-004",
      subdomain: "Paediatric",
      difficulty: 3,
      stem: "Why is a dermal (capillary) puncture often preferred over venipuncture in infants?",
      choices: {
        a: "Capillary blood gives more accurate chemistry results",
        b: "Infants have small total blood volume, and repeated venipuncture risks anemia and vein damage",
        c: "Capillary collection requires no patient identification",
        d: "Capillary specimens never hemolyse",
      },
      correct: "b",
      explanation:
        "An infant's total blood volume is small enough that repeated " +
        "venipuncture carries a real risk of iatrogenic anemia, and the " +
        "limited accessible veins need to be preserved for when they are " +
        "genuinely required. Capillary collection also avoids deep punctures " +
        "near vulnerable structures.",
      why: {
        a: "Capillary and venous values differ for several analytes; capillary is not more accurate.",
        c: "Identification requirements are identical, and are stricter for neonates in practice.",
        d: "Capillary specimens hemolyse readily, particularly if the site is squeezed.",
      },
      tip: "It is about preserving blood volume and veins, not about accuracy.",
      tags: ["paediatric", "capillary", "iatrogenic-anemia"],
      sources: [SRC_CLSI_GP42, SRC_TEXTBOOK_CURRICULUM],
    },
    {
      id: "spc-005",
      subdomain: "Blood bank",
      difficulty: 2,
      stem: "Which additional labelling element is commonly required on a blood bank specimen beyond routine requirements?",
      choices: {
        a: "The ordering physician's pager number",
        b: "The collector's identification and the exact date and time of collection",
        c: "The patient's blood type as stated by the patient",
        d: "The expected transfusion date",
      },
      correct: "b",
      explanation:
        "Blood bank specimens must be traceable to the person who collected " +
        "them and to a precise moment, because a transfusion error is " +
        "potentially fatal and its investigation depends on that trail. Many " +
        "facilities add a dedicated blood bank armband with a unique number " +
        "linking patient, specimen, and any unit issued.",
      why: {
        a: "Contact details are not specimen identification.",
        c: "A patient's recollection of their blood type is never used for compatibility.",
        d: "The transfusion date is not known at collection and is not a label element.",
      },
      tip: "Blood bank adds who collected it and exactly when. That trail is the safety mechanism.",
      tags: ["blood-bank", "labelling", "traceability"],
    },
    {
      id: "spc-006",
      subdomain: "Geriatric",
      difficulty: 2,
      stem: "Which adjustment is most appropriate when drawing an elderly patient with fragile veins and thin skin?",
      choices: {
        a: "Apply the tourniquet more tightly to distend the vein",
        b: "Use a smaller-gauge winged set with reduced vacuum, and anchor the vein carefully without stretching the skin",
        c: "Use a larger needle to enter the vein more decisively",
        d: "Skip the tourniquet entirely in all elderly patients",
      },
      correct: "b",
      explanation:
        "Fragile veins collapse under full evacuated-tube vacuum and roll " +
        "readily, so a winged set with a smaller tube or a syringe gives more " +
        "control. Anchor firmly but do not stretch thin skin, which tears. A " +
        "tourniquet that is too tight can itself bruise or damage the vessel.",
      why: {
        a: "Excess tourniquet pressure damages fragile vessels and can cause bruising.",
        c: "A larger needle increases trauma in a fragile vein.",
        d: "A tourniquet is still useful; it just needs to be applied with less pressure and for less time.",
      },
      tip: "Less vacuum, less pressure, better anchoring. Fragile veins fail from force, not from technique speed.",
      tags: ["geriatric", "fragile-veins", "winged-set"],
    },
    {
      id: "spc-007",
      subdomain: "Blood cultures",
      difficulty: 3,
      stem: "Blood culture sets are typically collected from two separate sites. Why?",
      choices: {
        a: "To collect enough total volume for the analyser",
        b: "To help distinguish true bacteremia from skin contamination of a single set",
        c: "Because one site may clot before filling",
        d: "To satisfy chain of custody requirements",
      },
      correct: "b",
      explanation:
        "Growth in both sets points strongly toward genuine bacteremia. " +
        "Growth in only one, especially of a common skin organism, points " +
        "toward contamination at that site. Separate sites give clinicians " +
        "the information needed to make that call rather than treating every " +
        "positive as real.",
      why: {
        a: "Volume matters enormously for culture sensitivity, but two sites exist for interpretive reasons; volume alone could be met at one site.",
        c: "Culture bottles do not clot in that sense.",
        d: "Chain of custody applies to forensic specimens.",
      },
      tip: "Two sites answer 'is this real?'. Adequate volume answers 'will it grow?'. Both matter.",
      tags: ["blood-culture", "contamination", "interpretation"],
    },
    {
      id: "spc-008",
      subdomain: "Special handling",
      difficulty: 3,
      stem: "A blood alcohol specimen is ordered for legal purposes. Which preparation detail is critical?",
      choices: {
        a: "Cleaning the site with an alcohol-based antiseptic",
        b: "Cleaning the site with a non-alcohol antiseptic such as aqueous povidone-iodine or benzalkonium chloride",
        c: "Warming the site before collection",
        d: "Collecting the specimen into a serum separator tube",
      },
      correct: "b",
      explanation:
        "An alcohol-based prep can contaminate the specimen and, more " +
        "importantly for a legal specimen, gives the defence an argument " +
        "regardless of whether contamination actually occurred. A non-alcohol " +
        "antiseptic removes that objection. The specimen is usually collected " +
        "into a grey sodium fluoride tube under chain of custody.",
      why: {
        a: "This is exactly the error the question is about.",
        c: "Warming is unrelated.",
        d: "A grey tube is used; fluoride prevents ongoing fermentation in the tube.",
      },
      tip: "No alcohol prep for alcohol levels. Grey tube, non-alcohol antiseptic, chain of custody.",
      tags: ["blood-alcohol", "forensic", "antiseptic"],
    },
    {
      id: "spc-009",
      subdomain: "Paediatric",
      difficulty: 2,
      stem: "What is the maximum recommended depth for a heel puncture on a newborn?",
      choices: {
        a: "Approximately 1.0 mm",
        b: "Approximately 2.0 mm",
        c: "Approximately 3.5 mm",
        d: "Depth is not limited if the correct site is used",
      },
      correct: "b",
      explanation:
        "Around 2.0 mm is the commonly cited limit for newborn heel " +
        "punctures. The calcaneus lies close to the surface, and puncturing " +
        "into or near bone risks osteochondritis and osteomyelitis. Automatic " +
        "incision devices designed for neonates control depth for you, which " +
        "is why they are preferred over manual lancets.",
      why: {
        a: "Too shallow to reliably obtain adequate flow.",
        c: "Deep enough to risk bone contact in a newborn.",
        d: "Depth is limited regardless of site, because the bone is shallow throughout the neonatal heel.",
      },
      tip: "Correct site and controlled depth. Use a device rated for neonates rather than judging by feel.",
      tags: ["heel-stick", "neonate", "depth"],
      sources: [SRC_CLSI_GP42, SRC_TEXTBOOK_CURRICULUM],
    },
    {
      id: "spc-010",
      subdomain: "Special handling",
      difficulty: 2,
      stem: "A cold agglutinin specimen is ordered. How should it be handled after collection?",
      choices: {
        a: "Transported on ice",
        b: "Kept at 37°C until the serum is separated",
        c: "Refrigerated immediately",
        d: "Frozen if transport will exceed one hour",
      },
      correct: "b",
      explanation:
        "Cold agglutinins are antibodies that attach to red cells at cold " +
        "temperatures. If the specimen cools before separation, the " +
        "antibodies bind to the cells and are removed with them, so the " +
        "measured level is falsely low. The specimen is kept at body " +
        "temperature until the serum is off the cells.",
      why: {
        a: "Chilling causes the exact loss the handling is designed to prevent.",
        c: "Refrigeration has the same effect as ice.",
        d: "Freezing whole blood is never appropriate.",
      },
      tip: "'Cold' in the name means keep it warm. Cold agglutinins, cryoglobulins, cryofibrinogen — all warm.",
      tags: ["cold-agglutinin", "warmed", "transport"],
    },
  ],
);

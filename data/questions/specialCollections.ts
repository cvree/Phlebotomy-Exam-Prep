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
      subdomain: "Pediatric",
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
      tags: ["pediatric", "capillary", "iatrogenic-anemia"],
      sources: [SRC_CLSI_GP42, SRC_TEXTBOOK_CURRICULUM],
    },
    {
      id: "spc-005",
      subdomain: "Blood bank",
      difficulty: 2,
      stem: "Which additional labeling element is commonly required on a blood bank specimen beyond routine requirements?",
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
      tags: ["blood-bank", "labeling", "traceability"],
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
        "importantly for a legal specimen, gives the defense an argument " +
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
      subdomain: "Pediatric",
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
    {
      id: "spc-011",
      subdomain: "Blood cultures",
      difficulty: 2,
      stem: "A physician orders 'blood cultures x2' for a patient with suspected sepsis. What does this order require in terms of collection?",
      choices: {
        a: "Two sets of bottles, each set collected from a separate venipuncture at a different site",
        b: "One venipuncture, with the drawn blood split evenly between two aerobic bottles",
        c: "Two venipunctures performed at the same site, ten minutes apart",
        d: "One large-volume draw from a single stick, divided among four bottles",
      },
      correct: "a",
      explanation:
        "Each 'set' means one aerobic-and-anaerobic bottle pair collected " +
        "from one distinct site. Drawing from two separate sites is what " +
        "lets clinicians compare results afterward: growth in both sets " +
        "points toward true bacteremia, while growth confined to one site " +
        "points toward a contaminant introduced there. Splitting a single " +
        "draw across bottles from one stick collapses that comparison and " +
        "defeats the purpose of ordering multiple sets.",
      why: {
        b: "Splitting one draw between two bottles from the same site does not create two independent sets and cannot separate contamination from true bacteremia.",
        c: "Two draws at the same site share the same local skin flora exposure and do not give the independent comparison the order is meant to provide.",
        d: "Dividing one stick among four bottles is still a single site, so it has the same limitation as splitting a draw between two bottles.",
      },
      tip: "'x2' means two sticks at two sites, not two bottles from one stick.",
      tags: ["blood-culture", "two-sites", "sepsis"],
    },
    {
      id: "spc-012",
      subdomain: "Blood cultures",
      difficulty: 2,
      stem: "Why is a brief alcohol wipe, adequate for a routine venipuncture, not sufficient site preparation for a blood culture draw?",
      choices: {
        a: "Alcohol takes too long to dry, which delays the collection unnecessarily",
        b: "Alcohol alone does not reliably kill all skin organisms within the short contact time typically used, so cultures require a stronger antiseptic left in contact for its full recommended time",
        c: "Alcohol residue interferes chemically with the growth medium inside the bottle",
        d: "Alcohol prep is reserved for arterial punctures and was never intended for venous draws",
      },
      correct: "b",
      explanation:
        "A quick alcohol swipe controls surface bacteria well enough for " +
        "routine chemistry and hematology draws, but blood culture bottles " +
        "are built to detect even small numbers of organisms, so any skin " +
        "flora that survives a rushed prep can grow and produce a " +
        "false-positive result. An agent such as chlorhexidine or an " +
        "iodine-based prep, applied and left for the manufacturer's full " +
        "contact and dry time, achieves a much higher kill rate before the " +
        "needle enters the skin.",
      why: {
        a: "Drying time is part of proper preparation, not a reason to skip a stronger antiseptic.",
        c: "The concern is organisms surviving on the skin, not the antiseptic reacting with the growth medium.",
        d: "Alcohol prep is used for both arterial and venous routine draws; the issue is contact time, not the type of vessel.",
      },
      tip: "A culture bottle will grow anything that survives the prep — give the antiseptic its full contact time.",
      tags: ["blood-culture", "antisepsis", "skin-prep"],
    },
    {
      id: "spc-013",
      subdomain: "Blood cultures",
      difficulty: 3,
      stem: "A phlebotomist collects a blood culture using a syringe rather than a butterfly-to-bottle adapter. What principle should guide the order in which the two bottles are filled?",
      choices: {
        a: "The aerobic bottle must always be filled first, without exception",
        b: "The anaerobic bottle must always be filled first, without exception",
        c: "Facility protocol sets the fill order, but any air remaining in the syringe should not be pushed into the anaerobic bottle",
        d: "Fill order makes no difference as long as both bottles reach their fill line",
      },
      correct: "c",
      explanation:
        "Different facilities and bottle manufacturers specify different " +
        "fill orders, so there is no single universal order to memorize. " +
        "What stays constant is the underlying principle: air introduced " +
        "into the anaerobic bottle can inhibit or kill anaerobic organisms " +
        "and compromise that culture. Following the local protocol while " +
        "keeping any air in the syringe or tubing away from the anaerobic " +
        "bottle satisfies both the specific procedure and its purpose.",
      why: {
        a: "Treating this as an absolute rule ignores that protocols legitimately vary between facilities and manufacturers.",
        b: "The same problem exists in the opposite direction; no single order is universal across settings.",
        d: "Fill volume matters, but keeping air out of the anaerobic bottle also matters, so order is not irrelevant.",
      },
      tip: "Memorize the principle — no air into the anaerobic bottle — not one universal order, since protocols differ.",
      tags: ["blood-culture", "syringe-draw", "anaerobic"],
    },
    {
      id: "spc-014",
      subdomain: "Blood cultures",
      difficulty: 2,
      stem: "An adult blood culture bottle is designed to be filled with 8 to 10 mL of blood, but the vein gives out after only about 2 mL has been added. What is the main consequence?",
      choices: {
        a: "The bottle will simply take longer to flag positive if bacteria are present",
        b: "The lower blood-to-broth ratio reduces sensitivity, making the bottle more likely to miss a true bacteremia",
        c: "The laboratory information system will automatically reject the specimen",
        d: "The specimen will need to be diluted further with saline before it can be incubated",
      },
      correct: "b",
      explanation:
        "Blood culture sensitivity depends heavily on how much blood is " +
        "inoculated — the more blood added, the more likely any circulating " +
        "organisms are captured in the bottle. Under-filling shifts the " +
        "blood-to-broth ratio and lowers the odds that bacteria present in " +
        "the patient's bloodstream actually end up in the bottle, so a " +
        "significantly under-filled bottle can produce a false-negative " +
        "result rather than simply a slower positive one.",
      why: {
        a: "Underfilling risks missing growth entirely, not merely delaying detection of growth that is present.",
        c: "Automated rejection is not how most laboratories handle a volume shortfall; the bottle is typically still processed, just with a noted limitation.",
        d: "Diluting an already under-filled bottle with saline would further reduce sensitivity, not correct it, and is not standard practice.",
      },
      tip: "Volume is sensitivity. A thin culture bottle is a culture more likely to read falsely negative.",
      tags: ["blood-culture", "volume", "sensitivity"],
    },
    {
      id: "spc-015",
      subdomain: "Glucose tolerance",
      difficulty: 2,
      stem: "During a three-hour oral glucose tolerance test, the 90-minute draw is missed because the patient had stepped away from the waiting area. What should the phlebotomist do?",
      choices: {
        a: "Collect the specimen as soon as the patient is located, and label it with the actual time it was drawn rather than the scheduled time",
        b: "Skip the 90-minute draw entirely and continue with the remaining draws at their originally scheduled times",
        c: "Restart the entire test from the fasting specimen forward",
        d: "Estimate the missing 90-minute value by averaging the specimens drawn immediately before and after it",
      },
      correct: "a",
      explanation:
        "When a timed draw runs late, the correct response is to collect it " +
        "as soon as possible and document the actual collection time, " +
        "because interpretation of the curve depends on knowing precisely " +
        "how much time has elapsed since the glucose load. A late but " +
        "accurately timed draw still gives the provider usable information, " +
        "whereas silently omitting or fabricating a value does not.",
      why: {
        b: "Silently skipping a required time point removes data the provider needs to evaluate the glucose curve.",
        c: "A late draw that can still be collected and accurately time-stamped does not require repeating portions of the test that were already completed correctly.",
        d: "Estimating a result from surrounding values is fabricating data; a reported laboratory result must reflect what was actually measured.",
      },
      tip: "Late is better than fabricated — draw it, time-stamp it accurately, and move on.",
      tags: ["gtt", "timing", "documentation"],
    },
    {
      id: "spc-016",
      subdomain: "Glucose tolerance",
      difficulty: 2,
      stem: "A pregnant patient is scheduled for a one-hour glucose challenge test as routine gestational diabetes screening. When in pregnancy is this screening typically performed, and how does it differ from the diagnostic glucose tolerance test?",
      choices: {
        a: "Around 24 to 28 weeks gestation, and unlike the diagnostic test, the one-hour screen does not require the patient to fast beforehand",
        b: "In the first trimester, using the same three-day carbohydrate loading required before a diagnostic GTT",
        c: "Only after delivery, to check for residual insulin resistance from the pregnancy",
        d: "Around 24 to 28 weeks gestation, requiring the same eight-hour fast as the diagnostic three-hour test",
      },
      correct: "a",
      explanation:
        "The one-hour glucose challenge test is typically performed between " +
        "24 and 28 weeks of gestation and functions as a screening test, " +
        "not a diagnostic one: the patient drinks a standardized glucose " +
        "load without fasting first, and a single specimen is drawn one " +
        "hour later. Only a screening result above the cutoff leads to the " +
        "longer, fasting, multiple-draw diagnostic OGTT.",
      why: {
        b: "Neither the timing nor the multi-day carbohydrate loading described here matches the standard gestational diabetes screening protocol.",
        c: "Gestational diabetes screening is performed during pregnancy, in the second trimester window, not after delivery.",
        d: "Requiring a fast describes the follow-up diagnostic test; the one-hour screen is specifically the non-fasting step.",
      },
      tip: "The one-hour screen is a no-fasting, one-draw test; fasting and multiple draws belong to the diagnostic follow-up.",
      tags: ["gestational-diabetes", "glucose-challenge", "pregnancy"],
    },
    {
      id: "spc-017",
      subdomain: "Blood bank",
      difficulty: 3,
      stem: "Why do many facilities require a dedicated blood bank identification band, separate from the patient's standard armband, before a type and crossmatch specimen can be collected?",
      choices: {
        a: "It creates a second, independent identifier system that links the specimen and any issued unit specifically to that patient, reducing the risk of a mistransfusion",
        b: "It replaces the need for the patient to verbally state their name and date of birth",
        c: "It is required only for patients who have received a transfusion in the past",
        d: "It allows the specimen to bypass the facility's usual positive patient identification process",
      },
      correct: "a",
      explanation:
        "A mistransfused unit of blood can be fatal within minutes, so blood " +
        "bank identification is deliberately built to be more redundant " +
        "than routine specimen labeling. A dedicated band with a unique " +
        "number, applied and verified at the bedside, creates a second " +
        "identification trail independent of the patient's standard " +
        "armband, so an error in one system is unlikely to also occur in " +
        "the other. The specimen, the band, and any crossmatched unit are " +
        "all tied to that same unique number.",
      why: {
        b: "The extra band supplements verbal identification when the patient can respond; it does not replace it.",
        c: "The requirement applies to any patient undergoing type and crossmatch testing, not only those with a prior transfusion history.",
        d: "The band adds a layer of verification on top of standard identification rather than shortcutting it.",
      },
      tip: "Blood bank identification is redundant on purpose — two independent systems are harder to fool than one.",
      tags: ["blood-bank", "patient-identification", "crossmatch"],
    },
    {
      id: "spc-018",
      subdomain: "Therapeutic drug monitoring",
      difficulty: 2,
      stem: "A physician orders both a trough level and a peak level for a patient receiving intravenous vancomycin. How should these two specimens be timed relative to the dose?",
      choices: {
        a: "The trough is drawn immediately before the next scheduled dose, and the peak is drawn after the dose at the time the drug is expected to reach its highest concentration",
        b: "Both specimens are drawn together, immediately after the dose is administered",
        c: "The trough is drawn at the drug's highest concentration, and the peak is drawn immediately before the next dose",
        d: "Either specimen can be drawn at any convenient time within the same day",
      },
      correct: "a",
      explanation:
        "A trough level reflects the lowest circulating drug concentration " +
        "and is drawn right before the next dose is due, mainly to check " +
        "that the drug has not accumulated to toxic levels. A peak level " +
        "reflects the highest concentration and is timed to the drug's " +
        "known absorption or infusion profile, to confirm the dose is " +
        "reaching an effective level. Because both values only mean " +
        "something in relation to the dosing schedule, drawing either at " +
        "the wrong time makes the result clinically misleading.",
      why: {
        b: "Drawing both specimens together at one arbitrary time captures neither the true trough nor the true peak.",
        c: "This reverses the definitions — trough is drawn before the next dose, and peak is drawn near the expected high point after dosing.",
        d: "Timing precision relative to the dose is the entire point of therapeutic drug monitoring; a merely convenient time is not a substitute.",
      },
      tip: "Trough is right before the next dose; peak is at the drug's known high point after dosing.",
      tags: ["therapeutic-drug-monitoring", "trough", "peak"],
    },
    {
      id: "spc-019",
      subdomain: "Pediatric",
      difficulty: 2,
      stem: "Before performing a heel stick on a newborn, the phlebotomist warms the heel for several minutes. What is the purpose of this step, and where should the puncture actually be made?",
      choices: {
        a: "Warming increases blood flow to the area, and the puncture should be made on the lateral or medial plantar surface of the heel",
        b: "Warming numbs the site, and the puncture should be made on the posterior curved surface of the heel",
        c: "Warming sterilizes the skin, and the exact puncture site does not matter as long as the heel feels warm",
        d: "Warming is unnecessary for capillary punctures and is used only to prepare a site for venipuncture",
      },
      correct: "a",
      explanation:
        "Gentle warming with a warm, moist compress for a few minutes " +
        "dilates the local capillary bed and improves blood flow, making a " +
        "free-flowing sample easier to obtain with less squeezing of the " +
        "tissue. The puncture itself is limited to the lateral or medial " +
        "plantar surface of the heel; the posterior curved surface and " +
        "central arch are avoided because the calcaneus lies close to the " +
        "skin there, and puncturing near bone risks osteomyelitis or " +
        "osteochondritis.",
      why: {
        b: "Warming does not have a numbing effect, and the posterior curved surface is precisely the area that should be avoided because of its proximity to bone.",
        c: "Warming does not sterilize the skin — antiseptic site prep is a separate step — and puncture site selection still matters for safety.",
        d: "Warming to improve flow is specifically a capillary-puncture technique used at heel and finger sites, not a venipuncture step.",
      },
      tip: "Warm it for flow, stick the sides — never the curved back of the heel.",
      tags: ["heel-stick", "neonate", "site-selection"],
      sources: [SRC_CLSI_GP42, SRC_TEXTBOOK_CURRICULUM],
    },
    {
      id: "spc-020",
      subdomain: "Pediatric",
      difficulty: 1,
      stem: "Why do pediatric phlebotomy procedures place special emphasis on tracking the cumulative volume of blood drawn from a small child over a hospital stay?",
      choices: {
        a: "Because pediatric tubes are more expensive, and volume tracking is used to control laboratory costs",
        b: "Because a small child's total blood volume is proportionally much smaller than an adult's, so repeated draws can add up to clinically significant iatrogenic anemia",
        c: "Because it is required only for billing and insurance documentation purposes",
        d: "Because pediatric specimens clot faster, and cumulative volume tracking is used to predict clotting time",
      },
      correct: "b",
      explanation:
        "A young child, and especially a neonate, has a much smaller total " +
        "blood volume than an adult, so even routine-sized draws repeated " +
        "frequently over a hospital stay can add up to a meaningful " +
        "fraction of that volume. Facilities track cumulative draw volume " +
        "and use pediatric-sized tubes to collect only what is needed, " +
        "because unnecessary or oversized draws can push a small patient " +
        "toward anemia that becomes a clinical problem of its own.",
      why: {
        a: "Cost control is not the clinical rationale behind the practice.",
        c: "The tracking exists for patient safety, not for billing or insurance documentation.",
        d: "Cumulative draw volume tracking has no relationship to predicting how quickly a specimen will clot.",
      },
      tip: "Small patient, small reserve — every extra milliliter is a bigger share of a smaller tank.",
      tags: ["pediatric", "iatrogenic-anemia", "specimen-volume"],
      sources: [SRC_CLSI_GP42, SRC_TEXTBOOK_CURRICULUM],
    },
    {
      id: "spc-021",
      subdomain: "Geriatric",
      difficulty: 2,
      stem: "An elderly patient's skin tents slightly and moves loosely over the underlying vein when the phlebotomist tries to anchor it. Which adjustment best addresses this?",
      choices: {
        a: "Increase tourniquet pressure so the vein is held more firmly in place",
        b: "Anchor the vein from below with the thumb, applying firm and steady traction on the skin a few centimeters below the site, without pulling the skin taut over the puncture point itself",
        c: "Release the anchoring hand as soon as the needle is inserted so the loose skin can settle naturally",
        d: "Abandon the site and choose a smaller vein higher on the forearm instead of anchoring",
      },
      correct: "b",
      explanation:
        "In older patients, skin has often lost the underlying support that " +
        "normally keeps a vein from shifting, so the vein can roll or the " +
        "skin can tent away from the needle during entry. Anchoring below " +
        "the site with firm downward traction stabilizes the vein without " +
        "stretching the puncture point itself, which is what prevents both " +
        "rolling and skin tearing. That anchoring should be maintained " +
        "throughout the draw, not released once the needle is in.",
      why: {
        a: "Tighter tourniquet pressure does not address skin laxity and can bruise fragile tissue in an elderly patient.",
        c: "Releasing anchoring right after entry is when a loosely supported vein is most likely to roll or the needle to shift.",
        d: "Changing sites does not solve an anchoring technique problem and unnecessarily abandons a vein that may still be usable.",
      },
      tip: "Anchor below, pull steady, hold it the whole draw — loose skin needs traction, not a tighter tourniquet.",
      tags: ["geriatric", "tenting-skin", "anchoring"],
    },
    {
      id: "spc-022",
      subdomain: "Difficult access",
      difficulty: 2,
      stem: "A phlebotomist cannot locate a usable antecubital vein on a difficult-access adult patient and decides to use a dorsal hand vein instead. Which technique adjustment should accompany this choice?",
      choices: {
        a: "Use a standard-gauge straight needle at a steep angle to ensure adequate penetration",
        b: "Use a smaller-gauge winged (butterfly) needle and enter at a shallower angle, since hand veins are smaller and closer to the surface than antecubital veins",
        c: "Apply the tourniquet lower, near the wrist, to maximize distension in the hand",
        d: "Use a larger evacuated tube to compensate for the smaller vein diameter",
      },
      correct: "b",
      explanation:
        "Hand veins are typically smaller, more superficial, and less " +
        "supported by surrounding tissue than antecubital veins, so a " +
        "smaller-gauge needle on a winged set gives better control over the " +
        "draw, and a shallower insertion angle matches the vein's shallower " +
        "depth beneath the skin. A steep angle or a larger needle in a " +
        "small superficial vein is much more likely to go through the vein " +
        "or cause it to blow.",
      why: {
        a: "A steep angle and a standard or larger needle are suited to deeper, larger veins, not the small superficial veins of the hand.",
        c: "Tourniquet placement should generally stay a few inches above the intended site; moving it down to the wrist does not improve distension and adds discomfort.",
        d: "A larger tube pulls more vacuum, which a small hand vein is more likely to collapse under, not compensate for.",
      },
      tip: "Small vein, small needle, shallow angle — hand veins do not forgive a steep, aggressive stick.",
      tags: ["difficult-access", "hand-veins", "winged-set"],
    },
    {
      id: "spc-023",
      subdomain: "Special handling",
      difficulty: 1,
      stem: "A phlebotomist collecting a legal blood alcohol specimen reaches for an isopropyl alcohol prep pad out of habit. What is the specific risk this creates, and what should be used instead?",
      choices: {
        a: "The alcohol pad could contaminate the site and be argued to have falsely elevated the blood alcohol result; an aqueous antiseptic such as povidone-iodine or benzalkonium chloride should be used instead",
        b: "The alcohol pad could cause a falsely low result by killing bacteria that would otherwise ferment the sample, so no substitution is needed",
        c: "The alcohol pad is acceptable as long as it is allowed to dry completely before the puncture is made",
        d: "The alcohol pad's only real risk is causing minor discomfort to the patient, not affecting specimen accuracy",
      },
      correct: "a",
      explanation:
        "Any alcohol introduced at the puncture site, even in a small " +
        "residual amount, can be argued to have raised the measured blood " +
        "alcohol concentration, and in a legal context that possibility " +
        "alone is enough to undermine the specimen's credibility regardless " +
        "of whether contamination actually occurred. Using an aqueous, " +
        "non-alcohol antiseptic removes that vulnerability entirely, which " +
        "is why it is required practice for forensic blood alcohol draws.",
      why: {
        b: "Alcohol prep does not cause fermentation or a falsely low reading; the concern runs in the opposite direction.",
        c: "Letting the pad dry does not remove the objection, since the mere use of an alcohol-based product at the site remains a defensible legal challenge to the result.",
        d: "The risk described here is to specimen integrity and legal defensibility, not simply to patient comfort.",
      },
      tip: "For legal alcohol draws, any alcohol at the site is a problem, dry or not — reach for iodine or benzalkonium chloride instead.",
      tags: ["blood-alcohol", "forensic", "antiseptic"],
    },
    {
      id: "spc-024",
      subdomain: "Point-of-care testing",
      difficulty: 1,
      stem: "A nurse asks why a critical-care patient's glucose is being sent to the laboratory for a venous draw when a point-of-care glucose meter is available at the bedside. What is the best explanation?",
      choices: {
        a: "Point-of-care meters are used for rapid bedside monitoring and treatment decisions, but a laboratory venous glucose is more accurate and is used to confirm results, especially at very high or low extremes or before high-stakes treatment decisions",
        b: "Point-of-care meters are always more accurate than laboratory instruments and should be used exclusively",
        c: "Laboratory glucose testing is performed only when a point-of-care meter happens to be unavailable",
        d: "There is no meaningful difference in accuracy between the two methods, so the choice between them is arbitrary",
      },
      correct: "a",
      explanation:
        "Point-of-care glucose meters are designed for speed and convenience " +
        "at the bedside, which makes them well suited to frequent " +
        "monitoring and immediate decisions such as insulin dosing. They " +
        "are less precise than laboratory chemistry analyzers, however, " +
        "particularly at very low or very high glucose values, and can be " +
        "affected by hematocrit, certain medications, and other " +
        "interfering substances. When accuracy is critical — confirming a " +
        "suspected critical value, or before a major treatment decision — " +
        "a laboratory venous draw is used to verify the result.",
      why: {
        b: "Point-of-care meters trade some accuracy for speed; they are not universally more accurate than laboratory instruments.",
        c: "Laboratory testing is a deliberate choice made for accuracy and confirmation, not merely a fallback used when a meter is missing.",
        d: "The two methods differ meaningfully in accuracy and appropriate use, so the choice between them is not arbitrary.",
      },
      tip: "Point-of-care glucose is fast and good for trending; a laboratory venous glucose is the accuracy check when it really counts.",
      tags: ["point-of-care", "glucose", "laboratory-testing"],
    },
  ],
);

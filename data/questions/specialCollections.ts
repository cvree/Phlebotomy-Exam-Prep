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
    {
      id: "spc-025",
      subdomain: "Blood cultures",
      difficulty: 3,
      stem: "Why are blood cultures typically collected as two sets from two separate sites?",
      choices: {
        a: "To double the volume available for testing",
        b: "To help distinguish true bacteremia from skin contamination, and to improve detection",
        c: "Because one site rarely yields enough blood",
        d: "To allow one set to be discarded if it clots",
      },
      correct: "b",
      explanation:
        "An organism growing in both sets points to genuine bloodstream " +
        "infection; one growing in a single bottle is more likely to be skin " +
        "flora picked up during collection. Multiple sets also raise the chance " +
        "of detecting intermittent bacteremia.",
      why: {
        a: "Volume matters for sensitivity, but the two-site design is about interpreting the result.",
        c: "A single site typically yields adequate volume; that is not the reason for two sets.",
        d: "Culture bottles are not discarded on that basis.",
      },
      tip: "Two sites, two sets. Growth in both means infection; growth in one often means contamination.",
      tags: ["blood-cultures", "contamination", "bacteremia"],
    },
    {
      id: "spc-026",
      subdomain: "Blood cultures",
      difficulty: 3,
      stem: "What is the most important factor affecting the sensitivity of a blood culture?",
      choices: {
        a: "The brand of antiseptic used",
        b: "The volume of blood inoculated into the bottles",
        c: "The gauge of the needle",
        d: "The time of day the specimen is collected",
      },
      correct: "b",
      explanation:
        "Organisms can be sparse in the bloodstream, so the volume of blood " +
        "cultured is the single biggest determinant of whether they are found. " +
        "Underfilled bottles are one of the commonest reasons a culture misses a " +
        "real infection.",
      why: {
        a: "Antiseptic choice affects contamination rates, not the ability to detect a true positive.",
        c: "Needle gauge does not meaningfully change culture yield.",
        d: "Timing relative to fever spikes has been studied, but volume dominates.",
      },
      tip: "Fill the bottles to the marked volume. Underfilling is the most common reason a culture misses the organism.",
      tags: ["blood-cultures", "volume", "sensitivity"],
    },
    {
      id: "spc-027",
      subdomain: "Blood cultures",
      difficulty: 3,
      stem: "After the site has been prepared with antiseptic for a blood culture, the phlebotomist is unsure of the vein's location. What should be done?",
      choices: {
        a: "Re-palpate with a gloved finger and proceed",
        b: "Re-prepare the site with antiseptic before palpating again, or palpate only above and below the prepared area",
        c: "Proceed without palpating and hope for the best",
        d: "Palpate through a sterile gauze pad, which requires no re-preparation",
      },
      correct: "b",
      explanation:
        "Touching a prepared site recontaminates it. Either the site is prepared " +
        "again with the full contact time, or palpation stays outside the " +
        "prepared field. The whole value of a culture rests on the specimen not " +
        "picking up skin flora.",
      why: {
        a: "A glove is not sterile and recontaminates the prepared skin.",
        c: "Guessing at the vein risks a failed stick and a repeat of the whole preparation.",
        d: "Gauze is a barrier but the pressure through it can still transfer organisms, and it is not a recognized substitute for re-preparation.",
      },
      tip: "Once it's prepped, don't touch it. Palpate first, or prep again.",
      tags: ["blood-cultures", "sterile-technique", "palpation"],
    },
    {
      id: "spc-028",
      subdomain: "Newborn screening",
      difficulty: 3,
      stem: "How is a newborn screening filter paper card correctly filled?",
      choices: {
        a: "Layer several drops on each circle to ensure saturation",
        b: "Apply a single large drop to each circle, allowing it to soak through and fill the circle from one application",
        c: "Fill only the first circle and let the laboratory divide it",
        d: "Press the card directly against the heel puncture",
      },
      correct: "b",
      explanation:
        "Each circle is filled from a single free-falling drop that soaks " +
        "through the paper evenly. Layering drops creates uneven saturation and " +
        "invalidates the specimen, and pressing the card to the skin compresses " +
        "the fibers and contaminates the sample with tissue fluid.",
      why: {
        a: "Layering produces uneven saturation and is a standard rejection reason.",
        c: "The circles correspond to separate tests and all required circles must be filled.",
        d: "Contact with the skin compresses the paper and adds tissue fluid.",
      },
      tip: "One drop per circle, soaked through, air dried flat. No layering, no touching the paper to skin.",
      tags: ["newborn-screening", "filter-paper", "collection-technique"],
    },
    {
      id: "spc-029",
      subdomain: "Newborn screening",
      difficulty: 2,
      stem: "How is a newborn screening card handled after collection?",
      choices: {
        a: "Sealed in a plastic bag immediately while still wet",
        b: "Air dried horizontally, away from heat and direct sunlight, before packaging",
        c: "Placed in a warming device to dry faster",
        d: "Refrigerated immediately",
      },
      correct: "b",
      explanation:
        "The card dries flat in open air, away from heat, sunlight, and other " +
        "cards. Sealing a wet card traps moisture and degrades the specimen; " +
        "heating alters the analytes the screen is looking for.",
      why: {
        a: "Trapped moisture ruins the specimen and encourages microbial growth.",
        c: "Heat degrades the analytes being screened for.",
        d: "Refrigeration before drying causes condensation on the card.",
      },
      tip: "Flat, open air, no heat, no sunlight, no stacking — then package.",
      tags: ["newborn-screening", "drying", "handling"],
    },
    {
      id: "spc-030",
      subdomain: "Blood donation",
      difficulty: 2,
      stem: "What distinguishes an autologous donation from an allogeneic donation?",
      choices: {
        a: "Autologous blood is donated by a relative",
        b: "Autologous blood is donated by the patient for their own later use",
        c: "Autologous blood is collected only in emergencies",
        d: "Autologous blood is drawn from an artery",
      },
      correct: "b",
      explanation:
        "In an autologous donation the patient donates their own blood in " +
        "advance, typically before scheduled surgery, and receives it back if " +
        "needed. Allogeneic donation is blood given by one person for transfusion " +
        "to another, and a directed donation from a named relative is a variant " +
        "of that.",
      why: {
        a: "A relative's donation is a directed allogeneic donation, not autologous.",
        c: "Autologous donation is planned ahead of elective procedures, not an emergency measure.",
        d: "Donation is venous, not arterial.",
      },
      tip: "Auto = self. The patient banks their own blood before surgery.",
      tags: ["blood-donation", "autologous", "transfusion"],
    },
    {
      id: "spc-031",
      subdomain: "Therapeutic phlebotomy",
      difficulty: 3,
      stem: "Therapeutic phlebotomy is used as treatment for which conditions?",
      choices: {
        a: "Iron deficiency anemia and dehydration",
        b: "Polycythemia vera and hereditary hemochromatosis",
        c: "Thrombocytopenia and hemophilia",
        d: "Leukopenia and neutropenia",
      },
      correct: "b",
      explanation:
        "Removing blood is the treatment when there is too much of something: " +
        "red cell mass in polycythemia vera, or iron in hemochromatosis, where " +
        "repeated removal draws down iron stores. The order comes from a " +
        "physician and specifies the volume.",
      why: {
        a: "Removing blood from an iron-deficient or dehydrated patient would worsen both conditions.",
        c: "Removing blood from a patient with a bleeding disorder is the opposite of what is needed.",
        d: "Low white cell counts are not treated by removing blood.",
      },
      tip: "Therapeutic phlebotomy treats too much: too many red cells, or too much iron.",
      tags: ["therapeutic-phlebotomy", "polycythemia", "hemochromatosis"],
    },
    {
      id: "spc-032",
      subdomain: "Legal collections",
      difficulty: 3,
      stem: "Why is an alcohol-based antiseptic avoided when collecting a legal blood alcohol specimen?",
      choices: {
        a: "Alcohol wipes are not sterile enough for legal collections",
        b: "Residual alcohol could contaminate the specimen and be challenged as the source of the result",
        c: "Alcohol reacts with the tube additive",
        d: "It would delay the collection",
      },
      correct: "b",
      explanation:
        "Whether or not enough alcohol transfers to change the number, its use " +
        "gives a defense a straightforward challenge to the result. A " +
        "non-alcohol antiseptic such as an aqueous povidone-iodine or " +
        "benzalkonium preparation removes that argument entirely.",
      why: {
        a: "Sterility is not the issue; the specific contaminant is.",
        c: "The concern is the analyte being measured, not a reaction with the additive.",
        d: "Timing is unrelated to the choice of antiseptic here.",
      },
      tip: "Never clean with alcohol when alcohol is the analyte. Use a non-alcohol antiseptic.",
      tags: ["blood-alcohol", "forensic", "antiseptic"],
    },
    {
      id: "spc-033",
      subdomain: "Legal collections",
      difficulty: 3,
      stem: "What must accompany a forensic drug screen specimen?",
      choices: {
        a: "A physician's handwritten note",
        b: "A completed chain-of-custody form and a tamper-evident seal, with the donor's identity verified by photo identification",
        c: "The patient's insurance card",
        d: "A copy of the laboratory's accreditation certificate",
      },
      correct: "b",
      explanation:
        "Forensic and workplace testing requires documented custody at every " +
        "step, tamper-evident sealing performed in the donor's presence, and " +
        "identity verified with photo identification. A result whose custody " +
        "cannot be proven is a result that will not stand up.",
      why: {
        a: "A clinical note does not establish custody.",
        c: "Insurance is administrative and unrelated to specimen integrity.",
        d: "Accreditation is a laboratory credential and travels with the laboratory, not the specimen.",
      },
      tip: "Photo ID, sealed in front of the donor, signed at every transfer. That's the chain.",
      tags: ["chain-of-custody", "drug-screen", "forensic"],
    },
    {
      id: "spc-034",
      subdomain: "Pediatric collection",
      difficulty: 3,
      stem: "Why is dermal puncture generally preferred over venipuncture in infants under one year?",
      choices: {
        a: "Capillary results are more accurate in infants",
        b: "It avoids the risks of deep venipuncture in small limbs and limits the volume removed",
        c: "Infants have no accessible veins",
        d: "Dermal puncture is painless",
      },
      correct: "b",
      explanation:
        "An infant's blood volume is small and the accessible veins are deep " +
        "relative to their size, so venipuncture carries more risk and removes " +
        "more blood than the testing requires. Microcollection from a heel " +
        "puncture answers most questions with far less taken.",
      why: {
        a: "Some capillary values differ from venous ones; accuracy is not the reason.",
        c: "Infants do have accessible veins, but reaching them safely is more difficult.",
        d: "A dermal puncture still hurts; it is simply lower risk and lower volume.",
      },
      tip: "Small patient, small volume. Heel stick first in infants under a year.",
      tags: ["pediatric", "dermal-puncture", "infant"],
    },
    {
      id: "spc-035",
      subdomain: "Pediatric collection",
      difficulty: 2,
      stem: "What is the appropriate approach to a frightened school-age child needing a venipuncture?",
      choices: {
        a: "Tell the child it will not hurt at all",
        b: "Explain honestly in age-appropriate terms, offer limited choices, and use a caregiver's support and distraction",
        c: "Have several staff hold the child down immediately",
        d: "Perform the draw while the child is distracted, without any explanation",
      },
      correct: "b",
      explanation:
        "Honest, simple explanation plus a small amount of control — which arm, " +
        "whether to watch or look away — reduces distress far more than either " +
        "false reassurance or surprise. A caregiver's presence and distraction " +
        "help; gentle immobilization is for safety, not a first resort.",
      why: {
        a: "A promise that proves false destroys trust for this draw and every future one.",
        c: "Immediate physical restraint escalates fear and is reserved for safety when other approaches fail.",
        d: "Performing a procedure by surprise breaches trust and increases movement risk.",
      },
      tip: "Be honest, give a small choice, bring the caregiver in. Restraint is a last resort for safety.",
      tags: ["pediatric", "communication", "distraction"],
    },
    {
      id: "spc-036",
      subdomain: "Geriatric collection",
      difficulty: 3,
      stem: "Which adjustment is appropriate for an older adult with thin, fragile skin and small veins?",
      choices: {
        a: "Apply the tourniquet more tightly to distend the veins",
        b: "Consider a winged set with a smaller tube, minimal tourniquet pressure or a blood pressure cuff at low pressure, and gentle anchoring",
        c: "Use a larger gauge needle to collect faster",
        d: "Slap the site firmly to raise the vein",
      },
      correct: "b",
      explanation:
        "Fragile veins and skin call for less force everywhere: gentler " +
        "tourniquet pressure, a smaller tube so the vacuum does not collapse the " +
        "vessel, careful anchoring that does not tear the skin, and a winged set " +
        "for control. Adhesive removal deserves the same care.",
      why: {
        a: "Excess tourniquet pressure can rupture fragile vessels and bruise thin skin.",
        c: "A larger needle in a small fragile vein is more likely to go through it.",
        d: "Slapping is never appropriate; it bruises and can rupture capillaries.",
      },
      tip: "Less pressure everywhere: tourniquet, vacuum, anchoring, and tape.",
      tags: ["geriatric", "fragile-veins", "technique"],
    },
    {
      id: "spc-037",
      subdomain: "Glucose tolerance",
      difficulty: 3,
      stem: "During a three-hour glucose tolerance test, the patient vomits the glucose drink 20 minutes in. What should happen?",
      choices: {
        a: "Continue the test and note the vomiting on the requisition",
        b: "Stop the test and notify the ordering provider, since the glucose load was not retained",
        c: "Give a second dose of the glucose solution and restart the clock",
        d: "Substitute a sugary snack of equivalent content",
      },
      correct: "b",
      explanation:
        "The test measures the response to a known, retained glucose load. If " +
        "the load was not kept down, nothing that follows can be interpreted. " +
        "The test is stopped and the provider decides whether to reschedule.",
      why: {
        a: "Continuing produces a curve that means nothing, at the cost of several more needle sticks.",
        c: "Re-dosing and restarting is a clinical decision, not the phlebotomist's to make.",
        d: "An improvised substitute is not the standardized load the test requires.",
      },
      tip: "No retained load, no test. Stop and let the provider decide.",
      tags: ["glucose-tolerance-test", "protocol", "communication"],
    },
    {
      id: "spc-038",
      subdomain: "Blood bank",
      difficulty: 3,
      stem: "Why do transfusion service specimens usually have a limited window of validity before crossmatching?",
      choices: {
        a: "Red cells lyse within hours of collection",
        b: "Recent transfusion or pregnancy can stimulate new antibodies, so an older specimen may not reflect the patient's current status",
        c: "EDTA degrades within 24 hours",
        d: "The laboratory's instruments cannot process older specimens",
      },
      correct: "b",
      explanation:
        "A patient who has been transfused or pregnant recently can develop new " +
        "red cell antibodies quickly. A specimen collected days earlier may miss " +
        "them, so transfusion services require a recent specimen — often within " +
        "three days for such patients.",
      why: {
        a: "Properly stored specimens do not lyse within the validity window.",
        c: "EDTA remains effective well beyond a day.",
        d: "The limit is immunological, not instrumental.",
      },
      tip: "The specimen expires because the patient's antibodies can change, not because the blood spoils.",
      tags: ["blood-bank", "crossmatch", "antibodies"],
    },
    {
      id: "spc-039",
      subdomain: "Point-of-care testing",
      difficulty: 2,
      stem: "Why must quality control be run on a point-of-care instrument?",
      choices: {
        a: "It is optional if the device is new",
        b: "To confirm the device and reagents are performing correctly before patient results are reported",
        c: "To calibrate the patient's expectations",
        d: "Only when a result appears abnormal",
      },
      correct: "b",
      explanation:
        "Quality control materials with known values verify that the meter and " +
        "its strips are producing accurate results at that moment. Results are " +
        "not reported from a device whose control has failed, and the runs are " +
        "documented as required by the facility and regulation.",
      why: {
        a: "New devices require quality control like any other, at the intervals specified.",
        c: "Quality control concerns the instrument, not the patient conversation.",
        d: "Waiting for an abnormal result means the failure is discovered after results have been reported.",
      },
      tip: "Controls before patients. A failed control means the device is out until it is fixed.",
      tags: ["point-of-care", "quality-control", "documentation"],
    },
    {
      id: "spc-040",
      subdomain: "Special tests",
      difficulty: 3,
      stem: "A cold agglutinin specimen is collected. What handling does it require?",
      choices: {
        a: "Transport on ice",
        b: "Collection into a pre-warmed tube and maintenance at 37°C until processed",
        c: "Immediate freezing",
        d: "Protection from light",
      },
      correct: "b",
      explanation:
        "Cold agglutinins bind red cells as the specimen cools, so antibody " +
        "that has attached to the cells is no longer measurable in the serum. " +
        "The tube is pre-warmed and kept at body temperature all the way to " +
        "processing.",
      why: {
        a: "Chilling is precisely what causes the antibody to be lost from the serum.",
        c: "Freezing is an extreme version of the same error.",
        d: "Light exposure is not the concern for this analyte.",
      },
      tip: "Cold agglutinins and cryoglobulins both need to stay warm. \"Cold\" in the name is the warning.",
      tags: ["cold-agglutinin", "warmed-specimen", "handling"],
    },
    {
      id: "spc-041",
      subdomain: "Blood cultures",
      difficulty: 2,
      stem: "When both aerobic and anaerobic culture bottles are collected from a syringe draw, which is generally inoculated first?",
      choices: {
        a: "The aerobic bottle, so trapped air does not enter the anaerobic bottle",
        b: "The anaerobic bottle, always",
        c: "Whichever is picked up first",
        d: "Both simultaneously using a splitter",
      },
      correct: "a",
      explanation:
        "With a syringe, any air in it is expelled into the first bottle " +
        "inoculated — so the aerobic bottle goes first, keeping air out of the " +
        "anaerobic bottle where oxygen would inhibit the organisms being sought. " +
        "The order differs when a direct-draw adapter is used, so facility " +
        "protocol governs.",
      why: {
        b: "Anaerobic-first is the pattern for a direct-draw set, not for a syringe with residual air.",
        c: "The sequence exists for a reason and is not arbitrary.",
        d: "Simultaneous splitting is not standard practice for culture collection.",
      },
      tip: "Syringe: aerobic first, so the air goes where it does no harm. Follow your facility's protocol.",
      tags: ["blood-cultures", "aerobic", "anaerobic"],
    },
    {
      id: "spc-042",
      subdomain: "Special tests",
      difficulty: 3,
      stem: "A peak drug level is ordered for a medication given intravenously. What determines when the specimen is collected?",
      choices: {
        a: "Immediately as the infusion starts",
        b: "The interval after the dose specified for that drug, since peak timing is drug-specific",
        c: "Exactly 60 minutes after the dose for every drug",
        d: "At the same time as the trough",
      },
      correct: "b",
      explanation:
        "Peak timing varies by drug and route, so the protocol for that " +
        "medication defines the interval. Collecting at the wrong moment " +
        "produces a number that will be interpreted as a peak when it is not, " +
        "and dosing decisions follow from it.",
      why: {
        a: "Sampling at the start of the infusion captures the pre-dose level, not the peak.",
        c: "A single universal interval does not apply across drugs and routes.",
        d: "The trough is a separate collection immediately before the next dose.",
      },
      tip: "Peaks are drug-specific. Check the protocol, and record the actual collection time.",
      tags: ["therapeutic-drug-monitoring", "peak", "timing"],
    },
    {
      id: "spc-043",
      subdomain: "Blood donation",
      difficulty: 2,
      stem: "Which screening step is part of qualifying a volunteer blood donor?",
      choices: {
        a: "A fasting glucose",
        b: "A hemoglobin or hematocrit check, vital signs, and a health history questionnaire",
        c: "A chest radiograph",
        d: "A coagulation panel",
      },
      correct: "b",
      explanation:
        "Donor screening protects both the donor and the recipient: a " +
        "hemoglobin or hematocrit check confirms the donor can safely give a " +
        "unit, vital signs confirm they are well enough on the day, and the " +
        "health history identifies risks to the recipient.",
      why: {
        a: "Fasting glucose is not part of routine donor qualification.",
        c: "Imaging is not part of blood donor screening.",
        d: "Coagulation testing is not a routine donor screening test.",
      },
      tip: "Hemoglobin, vitals, history. Protecting the donor and the recipient at the same time.",
      tags: ["blood-donation", "donor-screening", "eligibility"],
    },
    {
      id: "spc-044",
      subdomain: "Pediatric collection",
      difficulty: 3,
      stem: "Why is a heel puncture unsuitable for an ambulatory toddler?",
      choices: {
        a: "The heel has no capillary supply after infancy",
        b: "Once a child bears weight, the heel's tissue changes and a finger puncture becomes the appropriate site",
        c: "Toddlers cannot tolerate any dermal puncture",
        d: "Heel punctures are prohibited by regulation after six months",
      },
      correct: "b",
      explanation:
        "Heel puncture is for infants who are not yet walking. Once a child " +
        "bears weight, the heel tissue thickens and the puncture becomes both " +
        "less productive and more painful, so the finger is used instead — the " +
        "same site as for an adult, with an appropriate lancet depth.",
      why: {
        a: "The heel retains a blood supply; the tissue simply changes character.",
        c: "Toddlers are routinely collected by finger puncture.",
        d: "The transition follows the child's development, not a fixed regulatory age.",
      },
      tip: "Not walking yet? Heel. Walking? Finger.",
      tags: ["pediatric", "heel-stick", "site-selection"],
    },
    {
      id: "spc-045",
      subdomain: "Special tests",
      difficulty: 3,
      stem: "A patient is scheduled for a lactose tolerance test. What is the general structure of the collection?",
      choices: {
        a: "A single random specimen",
        b: "A fasting baseline specimen, then timed specimens after a measured lactose load",
        c: "Specimens collected only after symptoms appear",
        d: "A 24-hour urine collection with no blood draws",
      },
      correct: "b",
      explanation:
        "Tolerance tests share one shape: establish a fasting baseline, give a " +
        "measured load, then sample at defined intervals to see how the body " +
        "handles it. Timing is what makes the curve interpretable, so the actual " +
        "collection times are recorded.",
      why: {
        a: "A single value cannot show a response over time.",
        c: "Symptom-triggered sampling produces uncontrolled timing and no comparable baseline.",
        d: "The test is a timed series of blood specimens.",
      },
      tip: "Every tolerance test: baseline, load, timed specimens. Record every actual time.",
      tags: ["tolerance-test", "lactose", "timed-collection"],
    },
    {
      id: "spc-046",
      subdomain: "Special tests",
      difficulty: 2,
      stem: "Which specimen requires the patient to be in a specific position for a defined period before collection?",
      choices: {
        a: "A complete blood count",
        b: "A renin or aldosterone level, where posture affects the result",
        c: "A hemoglobin A1c",
        d: "A basic metabolic panel",
      },
      correct: "b",
      explanation:
        "Renin and aldosterone respond to posture, so the requisition specifies " +
        "whether the patient should be upright or supine and for how long " +
        "beforehand. Collecting without honoring that produces a value that " +
        "cannot be compared with the reference range.",
      why: {
        a: "A CBC has no posture requirement.",
        c: "A1c reflects months of glycemic control and is unaffected by posture.",
        d: "A routine metabolic panel carries no positioning requirement.",
      },
      tip: "Posture-sensitive tests exist. When the requisition specifies a position and a time, that instruction is part of the test.",
      tags: ["posture", "aldosterone", "special-handling"],
    },
    {
      id: "spc-047",
      subdomain: "Dialysis patients",
      difficulty: 3,
      stem: "A patient with a dialysis fistula in the left arm needs a routine draw. Where is the specimen collected?",
      choices: {
        a: "From the fistula, which provides excellent access",
        b: "From the opposite arm, avoiding the fistula limb entirely",
        c: "From below the fistula in the same arm",
        d: "From above the fistula in the same arm",
      },
      correct: "b",
      explanation:
        "The whole fistula limb is protected: no venipuncture, no tourniquet, " +
        "no blood pressure cuff. The fistula is the patient's lifeline for " +
        "dialysis, and clotting or infecting it has serious consequences, so the " +
        "opposite arm is used.",
      why: {
        a: "Only dialysis staff access a fistula, and never for routine specimen collection.",
        c: "The restriction covers the entire limb, not just the fistula site.",
        d: "Above the fistula is still the fistula limb, and a tourniquet there is prohibited.",
      },
      tip: "Fistula arm: nothing. No needle, no tourniquet, no cuff. Use the other arm.",
      tags: ["dialysis", "fistula", "site-selection"],
    },
    {
      id: "spc-048",
      subdomain: "Special tests",
      difficulty: 3,
      stem: "Which collection detail matters most for an ammonia level?",
      choices: {
        a: "The patient must be standing",
        b: "Minimal tourniquet time, no fist clenching, and immediate chilled transport",
        c: "The specimen must be protected from light",
        d: "The specimen must be collected in a serum separator tube",
      },
      correct: "b",
      explanation:
        "Ammonia rises quickly in a specimen and is affected by muscle activity " +
        "during collection, so the tourniquet time is short, the patient does not " +
        "pump their fist, and the tube goes on ice and travels immediately. " +
        "Delay is the most common reason an ammonia comes back falsely high.",
      why: {
        a: "There is no standing requirement for ammonia.",
        c: "Light protection applies to bilirubin and several vitamins, not to ammonia.",
        d: "Ammonia is collected into a specified anticoagulated tube, not a serum separator.",
      },
      tip: "Ammonia: quick, calm, cold. Short tourniquet, no fist pumping, straight onto ice.",
      tags: ["ammonia", "handling", "collection-technique"],
    },
  ],
);

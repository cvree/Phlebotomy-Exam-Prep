import { buildQuestions } from "./authoring";
import {
  SRC_CLSI_GP41,
  SRC_MANUFACTURER_IFU,
  SRC_TEXTBOOK_CURRICULUM,
} from "@/data/sources";

export const SPECIMEN_HANDLING_QUESTIONS = buildQuestions(
  {
    domain: "specimen-handling",
    certifications: ["nha-cpt"],
    sources: [SRC_CLSI_GP41, SRC_TEXTBOOK_CURRICULUM],
    reviewStatus: "needs-review",
  },
  [
    {
      id: "spe-001",
      subdomain: "Light protection",
      difficulty: 2,
      stem: "Which analyte requires the specimen to be protected from light?",
      choices: {
        a: "Potassium",
        b: "Bilirubin",
        c: "Sodium",
        d: "Albumin",
      },
      correct: "b",
      explanation:
        "Bilirubin is photosensitive and degrades on exposure to light, " +
        "producing a falsely low result. Specimens are wrapped in foil or " +
        "collected into amber tubes. Neonatal bilirubin is the situation " +
        "where this matters most, because treatment decisions hang on the " +
        "number. Vitamin B12, folate, and carotene are also light-sensitive.",
      why: {
        a: "Potassium is affected by hemolysis and delayed processing, not light.",
        c: "Sodium is stable in light.",
        d: "Albumin is not photosensitive.",
      },
      tip: "Bilirubin fades in the light. Wrap it, and remember it most for neonates.",
      tags: ["light-sensitive", "bilirubin"],
    },
    {
      id: "spe-002",
      subdomain: "Temperature",
      difficulty: 2,
      stem: "Which specimen should be transported chilled?",
      choices: {
        a: "Cold agglutinins",
        b: "Ammonia",
        c: "Cryofibrinogen",
        d: "Cryoglobulin",
      },
      correct: "b",
      explanation:
        "Ammonia is chilled — usually in an ice slurry — because it rises " +
        "quickly at room temperature as cells continue to metabolize. Lactate " +
        "and blood gases are treated similarly. Cold agglutinins, " +
        "cryofibrinogen, and cryoglobulin are the opposite case: they must be " +
        "kept at body temperature, because chilling makes the target " +
        "substance precipitate out before it can be measured.",
      why: {
        a: "Cold agglutinins are kept warm at 37°C.",
        c: "Cryofibrinogen is kept warm.",
        d: "Cryoglobulin is kept warm.",
      },
      tip: "Anything starting with 'cryo' or 'cold' is kept WARM. The name describes what it does when chilled, not how to transport it.",
      tags: ["chilled", "warmed", "transport"],
    },
    {
      id: "spe-003",
      subdomain: "Rejection criteria",
      difficulty: 2,
      stem: "Which finding would cause a laboratory to reject a specimen outright?",
      choices: {
        a: "A tube labeled with the patient's name but no second identifier",
        b: "A tube filled slightly above the indicated line",
        c: "A tube that arrived 20 minutes after collection",
        d: "A tube with a small amount of blood on the outside",
      },
      correct: "a",
      explanation:
        "Incomplete identification is an unconditional rejection: the lab " +
        "cannot establish whose specimen it is, and no downstream process can " +
        "recover that. The other findings are problems of varying severity — " +
        "the contaminated exterior is a safety issue that needs cleaning — " +
        "but they do not make the specimen unattributable.",
      why: {
        b: "Slight overfill is usually acceptable outside citrate tubes, where the ratio is critical.",
        c: "Twenty minutes is within limits for most routine tests.",
        d: "It is a biohazard concern requiring decontamination, not automatic rejection.",
      },
      tip: "Unlabelled or mislabeled is the one error nobody can fix later. Recollect.",
      tags: ["rejection", "labeling"],
    },
    {
      id: "spe-004",
      subdomain: "Processing",
      difficulty: 3,
      stem: "A gold SST is centrifuged five minutes after collection. What is the likely consequence?",
      choices: {
        a: "The gel barrier will form more completely",
        b: "Incomplete clotting causes fibrin strands in the serum and can affect results",
        c: "The serum volume will be higher than expected",
        d: "No effect, since the clot activator works instantly",
      },
      correct: "b",
      explanation:
        "Clot activator speeds clotting but does not make it instantaneous — " +
        "roughly 30 minutes is typical. Spinning early means blood is still " +
        "clotting after centrifugation, so fibrin strands form in the serum, " +
        "clog analyser probes, and can produce erroneous results. Patients on " +
        "anticoagulants take longer still.",
      why: {
        a: "The barrier forms poorly when the specimen has not fully clotted.",
        c: "Serum volume tends to be lower and the specimen unusable.",
        d: "It is fast, not instant, and the difference matters.",
      },
      tip: "Let serum tubes clot fully — about 30 minutes — before spinning. Longer for anticoagulated patients.",
      tags: ["centrifugation", "clotting", "fibrin"],
      sources: [SRC_CLSI_GP41, SRC_MANUFACTURER_IFU, SRC_TEXTBOOK_CURRICULUM],
    },
    {
      id: "spe-005",
      subdomain: "Hemolysis",
      difficulty: 2,
      stem: "Which result is most affected by a hemolysed specimen?",
      choices: {
        a: "Potassium",
        b: "Sodium",
        c: "Chloride",
        d: "Albumin",
      },
      correct: "a",
      explanation:
        "Potassium sits at a much higher concentration inside red cells than " +
        "in plasma, so when cells rupture the potassium leaks out and the " +
        "measured value climbs — sometimes to a level that looks like a " +
        "medical emergency. LDH and AST are affected the same way, for the " +
        "same reason.",
      why: {
        b: "Sodium is higher outside cells, so hemolysis affects it far less.",
        c: "Chloride is minimally affected.",
        d: "Albumin is not concentrated inside red cells.",
      },
      tip: "Potassium, LDH, AST live inside red cells. Break the cells and those three go up.",
      tags: ["hemolysis", "potassium", "preanalytical"],
    },
    {
      id: "spe-006",
      subdomain: "Chain of custody",
      difficulty: 2,
      stem: "A specimen is collected for pre-employment drug screening. What additional documentation is required?",
      choices: {
        a: "A copy of the employment contract",
        b: "Chain of custody documentation tracking every person who handles the specimen",
        c: "A physician's countersignature on the requisition",
        d: "A duplicate specimen held in reserve",
      },
      correct: "b",
      explanation:
        "Chain of custody creates an unbroken, signed record of who had the " +
        "specimen and when, from collection to final disposition, with " +
        "tamper-evident seals. It exists because these results are used in " +
        "legal and employment proceedings, where any gap in the record makes " +
        "the result challengeable.",
      why: {
        a: "Employment paperwork is unrelated to specimen handling.",
        c: "A countersignature does not establish custody.",
        d: "Split specimens are sometimes used, but the defining requirement is the custody record.",
      },
      tip: "Chain of custody is about proving nobody could have tampered with it. Every handoff gets signed.",
      tags: ["chain-of-custody", "forensic"],
    },
    {
      id: "spe-007",
      subdomain: "Transport",
      difficulty: 3,
      stem: "A lavender EDTA tube for a CBC is collected at a satellite clinic and cannot reach the laboratory for six hours. What is the main concern?",
      choices: {
        a: "The specimen will clot in transit",
        b: "Cell morphology deteriorates, affecting the differential and some indices",
        c: "The EDTA will be consumed and stop working",
        d: "Potassium will fall below the reportable range",
      },
      correct: "b",
      explanation:
        "EDTA keeps blood liquid for a long time, but it does not preserve " +
        "cell appearance indefinitely. Over hours, cells begin to change " +
        "shape, which degrades the differential and distorts indices such as " +
        "MCV. Many facilities require smears to be made within a few hours of " +
        "collection when transport will be delayed.",
      why: {
        a: "Properly mixed EDTA prevents clotting well beyond six hours.",
        c: "EDTA is not consumed in that sense.",
        d: "Potassium tends to rise with delay, and it is not the main issue for a CBC.",
      },
      tip: "EDTA stops clotting, not aging. Delayed CBCs lose morphology first.",
      tags: ["transport", "stability", "cbc"],
    },
    {
      id: "spe-008",
      subdomain: "Labelling",
      difficulty: 2,
      stem: "A phlebotomist realizes after leaving the patient's room that one tube was not labeled. What should be done?",
      choices: {
        a: "Label it now from the requisition still in hand",
        b: "Discard the tube and recollect after re-verifying the patient's identity",
        c: "Send it to the lab with a note explaining the omission",
        d: "Ask the patient's nurse to confirm and then label it",
      },
      correct: "b",
      explanation:
        "Once you have left the bedside, you can no longer prove whose blood " +
        "is in the tube — only that you believe you know. Labelling from " +
        "memory or from the requisition is exactly the mechanism that " +
        "produces wrong-patient results. The correct action is to discard, " +
        "re-verify identity, and recollect.",
      why: {
        a: "The requisition proves what was ordered, not what is in the tube.",
        c: "The lab will reject it, and it should.",
        d: "The nurse did not witness the collection and cannot attest to the tube's contents.",
      },
      tip: "If the label did not go on at the bedside, the specimen is not attributable. Recollect and apologize.",
      tags: ["labeling", "rejection", "patient-safety"],
    },
    {
      id: "spe-009",
      subdomain: "Processing",
      difficulty: 2,
      stem: "Why should a gel separator tube not be re-centrifuged after the barrier has formed?",
      choices: {
        a: "The gel may liquefy and contaminate the analyser",
        b: "Analytes can be released from cells trapped below the barrier, altering results",
        c: "The tube may crack under repeated force",
        d: "It has no effect but wastes time",
      },
      correct: "b",
      explanation:
        "Re-spinning can drive analytes across or around the barrier from the " +
        "cells beneath it — potassium is the usual offender — producing a " +
        "result that no longer reflects the patient. If more serum is needed, " +
        "the specimen is recollected rather than re-spun.",
      why: {
        a: "Gel liquefaction is not the principal concern.",
        c: "Tube breakage is possible but rare and not the reason for the rule.",
        d: "There is a real analytical effect.",
      },
      tip: "Spin a gel tube once. Need more serum? Recollect.",
      tags: ["centrifugation", "gel-tube", "potassium"],
    },
    {
      id: "spe-010",
      subdomain: "Rejection criteria",
      difficulty: 3,
      stem: "A light blue citrate tube arrives filled to about two-thirds of the indicated line. What should happen?",
      choices: {
        a: "It should be tested and the result flagged as approximate",
        b: "It should be rejected and recollected",
        c: "It should be topped up from a second citrate tube",
        d: "It should be tested if the patient is difficult to draw",
      },
      correct: "b",
      explanation:
        "A citrate tube's 9:1 blood-to-anticoagulant ratio is part of the " +
        "test method. A short draw leaves excess citrate, which binds more " +
        "calcium and falsely prolongs PT and aPTT — potentially causing an " +
        "anticoagulant dose to be reduced when it should not be. The tube is " +
        "rejected and recollected.",
      why: {
        a: "Coagulation results are used for dosing decisions; an approximate one is worse than none.",
        c: "Combining tubes is never acceptable — it destroys the ratio in both.",
        d: "A difficult draw is a reason to plan the recollection carefully, not to report an invalid result.",
      },
      tip: "Citrate tubes are the strictest fill in the rack. To the line, or recollect.",
      tags: ["citrate", "short-draw", "rejection"],
    },
    {
      id: "spe-011",
      subdomain: "Aliquoting",
      difficulty: 2,
      stem: "When preparing an aliquot from a centrifuged specimen, what is essential?",
      choices: {
        a: "Using the same pipette tip for all aliquots to keep volumes consistent",
        b: "Labelling the aliquot tube with the same patient identifiers as the original",
        c: "Warming the specimen before transferring",
        d: "Recording the centrifuge speed on the aliquot label",
      },
      correct: "b",
      explanation:
        "An aliquot is a new container holding the same patient's specimen, " +
        "so it carries the same identification. An unlabeled or " +
        "partially-labeled aliquot is as unusable as an unlabeled original, " +
        "and a fresh pipette tip is used for each specimen to prevent " +
        "cross-contamination.",
      why: {
        a: "Reusing a tip carries one patient's specimen into another's.",
        c: "Warming is only required for specific analytes.",
        d: "Centrifuge parameters belong in processing records, not on the label.",
      },
      tip: "Every container holding a patient's specimen carries that patient's identifiers. No exceptions for aliquots.",
      tags: ["aliquot", "labeling", "cross-contamination"],
    },
    {
      id: "spe-012",
      subdomain: "Labeling requirements",
      difficulty: 1,
      stem: "Which set of elements must appear on every specimen label before it leaves the patient's side?",
      choices: {
        a: "The patient's full name, date of birth or a unique identifier, date and time of collection, and the collector's initials",
        b: "The patient's room number, the ordering physician's name, and the test name",
        c: "The patient's full name and the accession number assigned by the laboratory",
        d: "The patient's full name, insurance information, and the specimen type",
      },
      correct: "a",
      explanation:
        "These four elements — patient name, a unique identifier such as date " +
        "of birth or MRN, collection date and time, and the collector's " +
        "initials — let the laboratory prove whose specimen it is, when it " +
        "was drawn, and who is accountable for the collection. Missing any " +
        "one of them makes the specimen impossible to verify against the " +
        "order, and most labs treat an incomplete label as grounds for rejection.",
      why: {
        b: "Room number and physician name do not identify the patient or verify the collection event, and rooms change.",
        c: "The accession number is assigned by the lab after receipt; it cannot substitute for the collection date, time, and collector information gathered at the bedside.",
        d: "Insurance information plays no role in specimen identification and is not a required label element.",
      },
      tip: "Name, ID, date/time, initials — the four elements every label needs before you walk away.",
      tags: ["labeling", "specimen-label", "patient-identification"],
    },
    {
      id: "spe-013",
      subdomain: "Labeling timing",
      difficulty: 2,
      stem: "A phlebotomist is running behind schedule and considers pre-labeling tubes for the next three patients while walking to their rooms, to save time. Why is this practice unacceptable?",
      choices: {
        a: "It violates infection control standards for tube handling",
        b: "The tube could be filled at the wrong bedside, permanently attaching one patient's identifiers to another patient's blood",
        c: "Pre-printed labels do not scan correctly in the laboratory information system",
        d: "It uses more labels than necessary and increases supply costs",
      },
      correct: "b",
      explanation:
        "Tubes must be labeled after the draw, at the patient's side, only " +
        "once the patient's identity has been verified. Labeling in advance " +
        "breaks the link between identity verification and the actual " +
        "collection: if tubes get shuffled, or a wrong tube is grabbed for a " +
        "wrong patient, the error is invisible because the label already " +
        "looks complete and correct. The safeguard only works when labeling " +
        "is the last step of the encounter, not a step taken beforehand.",
      why: {
        a: "Pre-labeling is not primarily an infection control issue; the danger is misidentification.",
        c: "Scanning performance is unrelated to the reason this practice is prohibited.",
        d: "Supply cost is a trivial concern next to the risk of a wrong-patient result.",
      },
      tip: "Verify, draw, then label — always in that order, always at the bedside.",
      tags: ["labeling", "bedside-labeling", "patient-safety"],
    },
    {
      id: "spe-014",
      subdomain: "Temperature-sensitive transport",
      difficulty: 2,
      stem: "An arterial blood gas specimen cannot be analyzed within a few minutes of collection. What should the phlebotomist do, and why?",
      choices: {
        a: "Transport it in an ice slurry, because ongoing cellular metabolism continues to consume oxygen and alters pH and pCO2 at room temperature",
        b: "Leave it at room temperature, because chilling causes the blood gases to diffuse out of solution",
        c: "Warm it to body temperature, because cooling falsely elevates pO2",
        d: "Centrifuge it immediately and refrigerate the plasma",
      },
      correct: "a",
      explanation:
        "Red and white cells in an arterial blood gas specimen remain " +
        "metabolically active after collection, continuing to consume oxygen " +
        "and produce carbon dioxide. If the specimen sits at room temperature, " +
        "pO2 drifts down and pCO2 drifts up, along with a corresponding pH " +
        "shift, well before it is ever analyzed. Chilling the syringe in ice " +
        "slows that metabolism enough to keep the values close to what they " +
        "were at the moment of the draw.",
      why: {
        b: "Blood gases do not diffuse out of a properly sealed, air-free syringe; the concern is metabolic drift, not gas loss.",
        c: "Warming would accelerate the very metabolism that chilling is meant to slow.",
        d: "Arterial blood gases are analyzed as whole blood; centrifuging removes the cellular component the test actually measures.",
      },
      tip: "ABGs go on ice because the cells inside keep 'breathing' after the draw.",
      tags: ["chilled-specimen", "arterial-blood-gas", "transport"],
    },
    {
      id: "spe-015",
      subdomain: "Light protection",
      difficulty: 1,
      stem: "A specimen is drawn for a serum carotene (vitamin A) level. What handling step is essential during and after collection?",
      choices: {
        a: "Protecting the specimen from light exposure",
        b: "Keeping the specimen at body temperature until testing",
        c: "Collecting into a tube with no additive whatsoever",
        d: "Transporting the specimen on dry ice",
      },
      correct: "a",
      explanation:
        "Carotene, like bilirubin, vitamin A, and folate, is photosensitive " +
        "and breaks down when exposed to light. Ordinary room or daylight can " +
        "degrade the analyte during transport and while the specimen sits on " +
        "the bench, producing a falsely low result that could lead to an " +
        "incorrect diagnosis of deficiency. The specimen is wrapped in foil " +
        "or placed in an amber tube from the moment of collection until it is tested.",
      why: {
        b: "Carotene is not temperature-sensitive in the way cryoglobulin or cold agglutinins are; the threat here is light, not warmth.",
        c: "The tube additive is chosen by the test method, not by the need for light protection.",
        d: "Dry ice freezing is not required for this analyte and is unrelated to its light sensitivity.",
      },
      tip: "If it's a vitamin or a pigment, suspect it's light-sensitive: bilirubin, folate, carotene, vitamin A.",
      tags: ["light-sensitive", "carotene", "vitamin-a"],
    },
    {
      id: "spe-016",
      subdomain: "Rejection criteria",
      difficulty: 3,
      stem: "A laboratory receives two problem specimens in the same hour: Specimen 1 has no patient name anywhere on the tube. Specimen 2 is a stat troponin that arrived visibly hemolyzed. How should these be handled differently?",
      choices: {
        a: "Both must be rejected outright with no further discussion, since both are handling errors",
        b: "Specimen 1 is rejected outright with no exception possible; Specimen 2 may warrant a call to the ordering provider to weigh the clinical urgency before deciding whether to reject and recollect",
        c: "Both should be tested and the results flagged as unreliable",
        d: "Specimen 1 can be labeled from the requisition since the tube clearly came with matching paperwork; Specimen 2 must be rejected outright",
      },
      correct: "b",
      explanation:
        "A completely unlabeled tube can never be traced back to a patient " +
        "with certainty, so there is no acceptable path except rejection and " +
        "recollection — no phone call changes that fact. A hemolyzed stat " +
        "specimen is different: hemolysis affects some analytes far more " +
        "than others, and for a critical, hard-to-repeat draw the lab may " +
        "call the provider to discuss whether a flagged result has clinical " +
        "value while a fresh sample is obtained, rather than defaulting " +
        "straight to rejection with no input.",
      why: {
        a: "Treating every problem identically ignores that some criteria are absolute and others involve clinical judgment.",
        c: "Reporting an unreliable result as 'flagged' still misidentifies specimen 1 entirely, since there is no way to know whose result is being flagged.",
        d: "Labeling from paperwork after the fact never corrects an unlabeled tube, because the paperwork does not prove what is inside the tube.",
      },
      tip: "Unlabeled is always a hard stop. Hemolysis and similar quality issues are often a phone call first.",
      tags: ["rejection", "chain-of-custody", "hemolysis", "critical-thinking"],
    },
    {
      id: "spe-017",
      subdomain: "Hemolysis",
      difficulty: 2,
      stem: "A specimen drawn through a 25-gauge butterfly needle with forceful syringe aspiration arrives grossly hemolyzed. Besides potassium, the ordered AST is also unreliable. Why can the laboratory not simply report the AST with a note that the true value is somewhat lower?",
      choices: {
        a: "Because there is no reliable way to calculate how much AST leaked from ruptured cells, so the degree of falsification cannot be predicted or subtracted out",
        b: "Because AST is not actually affected by hemolysis and the specimen should be tested as is",
        c: "Because hemolyzed specimens always clot, making the AST untestable for an unrelated reason",
        d: "Because the analyzer cannot physically aspirate hemolyzed serum",
      },
      correct: "a",
      explanation:
        "Hemolysis releases intracellular AST into the serum in an amount " +
        "that depends on how many cells ruptured and how completely — a " +
        "quantity nobody can measure after the fact. Because that added " +
        "contribution cannot be subtracted back out with any confidence, a " +
        "hemolyzed result cannot be mathematically corrected; it has to be " +
        "recollected using a technique that avoids the mechanical trauma " +
        "that caused the hemolysis, such as a larger needle or gentler aspiration.",
      why: {
        b: "AST is concentrated inside cells, similarly to potassium and LDH, so hemolysis raises it significantly.",
        c: "Hemolysis and clotting are separate problems; a hemolyzed serum tube can still be perfectly clotted and centrifuged.",
        d: "Hemolyzed serum aspirates normally on most analyzers; the problem is accuracy, not instrument function.",
      },
      tip: "You can't math your way out of hemolysis — recollect with a gentler technique instead.",
      tags: ["hemolysis", "ast", "recollection"],
    },
    {
      id: "spe-018",
      subdomain: "Rejection criteria",
      difficulty: 2,
      stem: "A lavender-top EDTA tube submitted for a CBC contains a visible clot. Why must this specimen be rejected rather than simply noting the clot on the report?",
      choices: {
        a: "A clot in an anticoagulated tube consumes platelets and traps white and red cells, so automated cell counts no longer reflect the true circulating values",
        b: "Clotted specimens are a biohazard and cannot legally be opened by laboratory staff",
        c: "The clot will damage the analyzer's aspiration probe if left in the tube",
        d: "EDTA specimens are never analyzed as whole blood, so a clot has no bearing on the result",
      },
      correct: "a",
      explanation:
        "EDTA is added specifically to keep whole blood from clotting so that " +
        "cell counts reflect the patient's actual circulating blood. A clot " +
        "forming despite the anticoagulant means platelets and often other " +
        "cells have been pulled out of suspension into the clot, so the " +
        "platelet count, white count, and red count from the remaining " +
        "liquid are all falsely low. There is no way to separate out and " +
        "count what is trapped in the clot, so the specimen must be recollected.",
      why: {
        b: "A clot is a normal handling issue, not a legal barrier to opening the tube; the objection is analytical, not regulatory.",
        c: "Instrument protection is a secondary practical concern; the primary reason for rejection is that the counts are no longer valid.",
        d: "EDTA tubes are analyzed as whole blood specifically so the cell counts are accurate, which is exactly why a clot matters so much.",
      },
      tip: "A clot in a lavender top means cells left the pool being counted. Recollect.",
      tags: ["clotted-specimen", "edta", "cbc", "rejection"],
    },
    {
      id: "spe-019",
      subdomain: "Quantity not sufficient",
      difficulty: 2,
      stem: "A serum separator tube for a comprehensive metabolic panel and two add-on tests arrives only one-third full. The requesting nurse asks the lab to just run what it can. What is the most appropriate response?",
      choices: {
        a: "Reject the tube as quantity not sufficient, since there is not enough serum for the ordered panel plus the add-ons, and request recollection",
        b: "Run the metabolic panel only and cancel the add-ons without notifying anyone",
        c: "Dilute the specimen with saline to reach a workable volume",
        d: "Centrifuge for an extended time to force additional serum to separate",
      },
      correct: "a",
      explanation:
        "Automated analyzers need a minimum volume to reliably aspirate a " +
        "specimen without drawing in air or sediment, and a severely " +
        "underfilled tube frequently cannot supply that minimum across a " +
        "full panel plus add-ons. Rather than guessing which tests might " +
        "still be feasible and silently dropping others, the standard " +
        "response is to flag the specimen as quantity not sufficient and " +
        "request a recollection, so the ordering team knows every result is " +
        "still needed and can plan for another draw.",
      why: {
        b: "Silently canceling tests without notifying the ordering provider leaves a gap in care that nobody is aware of.",
        c: "Diluting a specimen changes analyte concentrations and invalidates every result; it is never an acceptable workaround.",
        d: "Longer centrifugation does not create serum that was never drawn; the shortfall is a volume-of-blood problem, not a separation problem.",
      },
      tip: "When in doubt about volume, don't guess and split it thin — call for a recollection and say so.",
      tags: ["qns", "underfilled-tube", "rejection"],
    },
    {
      id: "spe-020",
      subdomain: "Transport time",
      difficulty: 3,
      stem: "A plain red-top tube (no separator, no glycolytic inhibitor) for a glucose and potassium level sits at room temperature for four hours before being centrifuged. What change would the laboratory expect to see?",
      choices: {
        a: "Glucose falsely decreased and potassium falsely increased, because cells continue glycolysis and slowly leak potassium the whole time serum stays in contact with them",
        b: "Glucose falsely increased and potassium falsely decreased, because cellular metabolism produces glucose and consumes potassium",
        c: "Both glucose and potassium remain essentially unchanged since serum was never separated from the clot",
        d: "Only glucose is affected; potassium is stable in serum for days at room temperature",
      },
      correct: "a",
      explanation:
        "As long as serum sits in contact with cells, those cells keep " +
        "consuming glucose through glycolysis and slowly leak intracellular " +
        "potassium across their membranes, even without frank hemolysis. " +
        "Over several hours at room temperature the glucose result trends " +
        "down and the potassium result trends up, which is exactly why " +
        "tubes for these tests are separated from cells promptly or drawn " +
        "into a tube with a glycolytic inhibitor such as sodium fluoride " +
        "when delay is expected.",
      why: {
        b: "Cellular metabolism consumes glucose and releases potassium, the opposite of what this choice describes.",
        c: "Contact with the clot is precisely the problem; failing to separate serum promptly is what allows the drift to happen.",
        d: "Potassium is not stable indefinitely at room temperature; slow leakage from cells raises it measurably over hours.",
      },
      tip: "Cells in contact with serum keep eating glucose and leaking potassium. Separate promptly or use a fluoride tube.",
      tags: ["transport-time", "glycolysis", "glucose", "potassium"],
    },
    {
      id: "spe-021",
      subdomain: "Centrifugation",
      difficulty: 1,
      stem: "Why is a whole blood specimen centrifuged before most serum or plasma chemistry testing is performed?",
      choices: {
        a: "Centrifugation spins the heavier cellular components to the bottom of the tube, leaving clear serum or plasma on top for the analyzer to sample",
        b: "Centrifugation destroys any bacteria present in the specimen",
        c: "Centrifugation is required to activate the anticoagulant in the tube",
        d: "Centrifugation warms the specimen to body temperature for accurate results",
      },
      correct: "a",
      explanation:
        "Serum and plasma chemistry tests measure substances dissolved in " +
        "the liquid portion of blood, not inside the cells. Centrifugal " +
        "force separates the denser red cells, white cells, and platelets " +
        "from the lighter liquid, packing them at the bottom — or below a " +
        "gel barrier — so the analyzer can sample clean serum or plasma " +
        "without drawing up cellular material that would contaminate the result.",
      why: {
        b: "Centrifugation is a physical separation process; it does not sterilize a specimen or kill bacteria.",
        c: "Anticoagulants act chemically as soon as blood contacts them; spinning is a separate, later step.",
        d: "Centrifuges do not control temperature; some processes require refrigerated centrifugation, but warming is never the goal.",
      },
      tip: "Spinning separates, it doesn't sterilize, activate, or warm.",
      tags: ["centrifugation", "serum", "plasma", "processing"],
    },
    {
      id: "spe-022",
      subdomain: "Labeling",
      difficulty: 2,
      stem: "A specimen arrives in the laboratory with the patient's name and date of birth on the label, but no collection time is recorded anywhere. Why can this be a serious problem even though the patient is clearly identified?",
      choices: {
        a: "Without a collection time, the lab cannot judge whether time-sensitive analytes such as glucose, potassium, or a trough drug level still reflect the patient's condition, or whether a delay has already altered the result",
        b: "It is only a paperwork inconvenience and has no bearing on how the results should be interpreted",
        c: "The specimen must be relabeled with the time the lab received it, since that is an acceptable substitute",
        d: "Missing a collection time is a minor issue only for microbiology specimens",
      },
      correct: "a",
      explanation:
        "Many results depend on when the specimen was drawn relative to a " +
        "medication dose, a meal, or simply how long it has been sitting " +
        "before separation. A trough drug level drawn at the wrong point in " +
        "the dosing interval, or a glucose that has been sitting " +
        "uncentrifuged for an unknown length of time, can look normal and " +
        "still be clinically wrong. Without a true collection time, nobody " +
        "downstream can judge whether the result is trustworthy, which is " +
        "why missing collection time is treated as a labeling defect worth " +
        "flagging or rejecting for affected tests.",
      why: {
        b: "Timing drives the interpretation of many results, so this is a clinical accuracy problem, not just paperwork.",
        c: "The time the lab received the tube reflects transport, not collection, and substituting it would misrepresent when the specimen was actually drawn.",
        d: "Collection timing matters across many disciplines, including chemistry and coagulation, not only microbiology.",
      },
      tip: "No collection time means no way to know if the result still tells the truth about the patient.",
      tags: ["labeling", "collection-time", "time-sensitive-testing"],
    },
    {
      id: "spe-023",
      subdomain: "Specimen mixing",
      difficulty: 1,
      stem: "Immediately after drawing a lavender EDTA tube, what is the correct way to mix it?",
      choices: {
        a: "Invert the tube gently a specified number of times (commonly around eight), never shaking it",
        b: "Shake the tube vigorously for several seconds to ensure complete mixing",
        c: "Mixing is unnecessary as long as the tube is analyzed within the hour",
        d: "Roll the tube rapidly between the palms until the additive is visibly dissolved",
      },
      correct: "a",
      explanation:
        "Gentle end-over-end inversion distributes the anticoagulant through " +
        "the blood without subjecting the cells to mechanical stress. " +
        "Shaking, by contrast, applies shear forces that rupture red cells " +
        "and can whip air into the specimen, causing hemolysis and foaming " +
        "that interferes with testing. The number of inversions is specified " +
        "for each tube type because both too little mixing and excessive " +
        "agitation cause problems.",
      why: {
        b: "Vigorous shaking is the specific technique that causes mechanical hemolysis and foaming.",
        c: "Without mixing, the anticoagulant stays concentrated near where it was added and the specimen can clot in the unmixed portion.",
        d: "Rapid rolling between the palms applies similar shear stress to shaking and risks the same hemolysis.",
      },
      tip: "Invert gently, don't shake — a shaken tube is a hemolyzed tube.",
      tags: ["mixing", "inversion", "hemolysis", "anticoagulant"],
    },
    {
      id: "spe-024",
      subdomain: "Aliquoting",
      difficulty: 2,
      stem: "A single tube of blood must be split into two smaller aliquots — one sent to the in-house chemistry department and one sent out to a reference laboratory for a specialized test. What must be true of both resulting aliquots?",
      choices: {
        a: "Each aliquot must carry the patient's full identifiers and be traceable back to the original tube, even though neither aliquot is the original container",
        b: "Only the aliquot going to the reference laboratory needs full identifiers, since in-house staff can look up the patient in the computer system",
        c: "The two aliquots can share a single combined label as long as they travel together",
        d: "Only the original tube needs identifiers; aliquots are considered internal working copies that do not require separate labeling",
      },
      correct: "a",
      explanation:
        "Splitting a specimen does not reduce the identification requirement " +
        "— it multiplies it, because each resulting container becomes a " +
        "separate object that could be misplaced, mislabeled, or handled by " +
        "a different person or facility. Every aliquot needs the same " +
        "patient identifiers as the original draw and a way to trace it " +
        "back to that original specimen, which matters even more once one " +
        "aliquot leaves the building for an outside lab that has no other " +
        "way to confirm what it received.",
      why: {
        b: "In-house staff having computer access does not eliminate the need for a physical label; the label is what ties a specific tube to that specific patient at the bench.",
        c: "Once two aliquots are physically separated, they can be handled independently, so a shared label stops functioning the moment they are no longer traveling together.",
        d: "Treating aliquots as unlabeled working copies is exactly how a mix-up between two patients' aliquots happens.",
      },
      tip: "Splitting a specimen means labeling twice, not once — every piece needs full identifiers.",
      tags: ["aliquot", "splitting-specimen", "labeling", "traceability"],
    },
    {
      id: "spe-025",
      subdomain: "Rejection criteria",
      difficulty: 2,
      stem: "The name on a specimen label reads 'Johnathan Reyes' while the requisition reads 'Jonathan Reyes.' The laboratory has no way to confirm which spelling is correct. What is the appropriate action?",
      choices: {
        a: "Reject the specimen and require recollection, since a name mismatch between label and requisition cannot be reliably resolved after the fact",
        b: "Accept the specimen and correct the spelling on the requisition to match the label",
        c: "Accept the specimen since the two names are close enough to clearly refer to the same person",
        d: "Call the patient's room to ask them to confirm the spelling of their own name",
      },
      correct: "a",
      explanation:
        "A discrepancy between the label and the requisition is one of the " +
        "identification failures that has no safe workaround, because the " +
        "laboratory cannot know which document — if either — is accurate, " +
        "and guessing risks attaching results to the wrong medical record. " +
        "Even a one-letter difference is treated as a mismatch requiring " +
        "recollection, because minor typographical similarity is exactly " +
        "the kind of error that produces a wrong-patient result if it is waved through.",
      why: {
        b: "Editing the requisition to match the label assumes the label is correct without any way to verify that assumption.",
        c: "Near-identical spellings are the classic pattern behind real wrong-patient identification errors; 'close enough' is not a safe standard.",
        d: "A phone call after the fact cannot re-establish the identity verification that should have happened at the moment of collection, and does not confirm what the collector actually checked at the bedside.",
      },
      tip: "Any mismatch between label and requisition — even one letter — is a hard stop, not a judgment call.",
      tags: ["rejection", "labeling", "name-mismatch", "patient-identification"],
    },
  ],
);

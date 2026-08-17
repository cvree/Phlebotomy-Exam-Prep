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
        "quickly at room temperature as cells continue to metabolise. Lactate " +
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
      stem: "A phlebotomist realises after leaving the patient's room that one tube was not labeled. What should be done?",
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
      tip: "If the label did not go on at the bedside, the specimen is not attributable. Recollect and apologise.",
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
    {
      id: "spe-026",
      subdomain: "Centrifugation",
      difficulty: 2,
      stem: "Why must a centrifuge be loaded with tubes balanced across from each other?",
      choices: {
        a: "To make unloading easier",
        b: "An unbalanced rotor vibrates, which can break tubes and damage the instrument",
        c: "To ensure both tubes spin for the same length of time",
        d: "Balancing changes the separation quality of the gel",
      },
      correct: "b",
      explanation:
        "A rotor spinning off-balance transmits severe vibration through the " +
        "instrument. Tubes break, specimens are lost, aerosols are generated, " +
        "and the centrifuge itself can be damaged. Tubes of equal size and fill " +
        "are placed opposite each other, using a water-filled balance tube when " +
        "the count is odd.",
      why: {
        a: "Convenience is not the reason; mechanical safety is.",
        c: "Every tube in the rotor spins for the same duration regardless of placement.",
        d: "Gel separation depends on speed and time, not on rotor balance.",
      },
      tip: "Equal weight, directly opposite. An odd number means a balance tube, not a guess.",
      tags: ["centrifugation", "balancing", "safety"],
    },
    {
      id: "spe-027",
      subdomain: "Centrifugation",
      difficulty: 3,
      stem: "Why should a gel serum separator tube not be re-spun after the barrier has formed?",
      choices: {
        a: "The tube's vacuum would be lost",
        b: "Re-spinning can force cellular constituents through or past the barrier, altering results",
        c: "The gel dissolves on a second spin",
        d: "It causes the specimen to clot a second time",
      },
      correct: "b",
      explanation:
        "Once the barrier has set, a second spin can drive analytes from the " +
        "cells below into the serum above — potassium and LDH in particular. The " +
        "serum that was already separated is no longer the specimen the " +
        "laboratory thinks it is.",
      why: {
        a: "Vacuum is irrelevant once the tube has been filled and spun.",
        c: "The gel does not dissolve; the problem is what passes it.",
        d: "The specimen has already clotted; clotting is not repeated.",
      },
      tip: "One spin per gel tube. If more serum is needed, collect again rather than re-spinning.",
      tags: ["centrifugation", "gel-barrier", "specimen-integrity"],
    },
    {
      id: "spe-028",
      subdomain: "Temperature",
      difficulty: 2,
      stem: "Which specimen is typically transported chilled?",
      choices: {
        a: "A complete blood count",
        b: "An ammonia level",
        c: "A cold agglutinin titer",
        d: "A potassium on whole blood",
      },
      correct: "b",
      explanation:
        "Ammonia rises quickly in a specimen at room temperature as amino acids " +
        "break down, so it goes on ice or into a chilled transport and moves to " +
        "the laboratory immediately. Lactate and blood gases sit in the same " +
        "category.",
      why: {
        a: "A CBC is held at room temperature; chilling can affect cell indices.",
        c: "Cold agglutinins must be kept warm at 37°C — chilling is exactly what ruins that specimen.",
        d: "Chilling whole blood drives potassium out of the cells and falsely raises the result.",
      },
      tip: "Chill ammonia, lactate, and blood gases. Warm cold agglutinins and cryoglobulins. Never chill a potassium on whole blood.",
      tags: ["chilled-specimen", "ammonia", "transport"],
    },
    {
      id: "spe-029",
      subdomain: "Temperature",
      difficulty: 3,
      stem: "A cryoglobulin specimen is collected. How must it be handled?",
      choices: {
        a: "On ice, transported immediately",
        b: "Kept at 37°C from collection until it is processed",
        c: "Frozen immediately after collection",
        d: "At room temperature with no special handling",
      },
      correct: "b",
      explanation:
        "Cryoglobulins precipitate when the specimen cools, so a specimen " +
        "allowed to drop toward room temperature loses the very protein being " +
        "measured. It is collected into pre-warmed tubes and kept at body " +
        "temperature through transport and processing.",
      why: {
        a: "Ice causes the precipitation that makes the result falsely low or negative.",
        c: "Freezing is the most extreme version of the same error.",
        d: "Room temperature is below body temperature, and the precipitation begins there.",
      },
      tip: "\"Cryo\" means it reacts to cold — so keep it warm. Same for cold agglutinins.",
      tags: ["cryoglobulin", "warmed-specimen", "transport"],
    },
    {
      id: "spe-030",
      subdomain: "Light protection",
      difficulty: 2,
      stem: "Besides bilirubin, which analyte commonly requires protection from light?",
      choices: {
        a: "Sodium",
        b: "Vitamin B12 and folate",
        c: "Hemoglobin A1c",
        d: "Blood urea nitrogen",
      },
      correct: "b",
      explanation:
        "Light-sensitive analytes degrade on exposure, so the specimen is " +
        "wrapped in foil or collected into an amber container. Bilirubin is the " +
        "one everybody remembers; vitamin B12, folate, carotene, and porphyrins " +
        "belong on the same list.",
      why: {
        a: "Sodium is unaffected by light exposure.",
        c: "Hemoglobin A1c is stable in ordinary lighting.",
        d: "BUN requires no light protection.",
      },
      tip: "Light-sensitive: bilirubin, B12, folate, carotene, porphyrins. Foil or amber, immediately.",
      tags: ["light-protection", "bilirubin", "vitamin-b12"],
    },
    {
      id: "spe-031",
      subdomain: "Processing time",
      difficulty: 3,
      stem: "Within roughly what time should serum or plasma be separated from cells for most routine chemistry testing?",
      choices: {
        a: "Within 30 minutes",
        b: "Within about 2 hours of collection",
        c: "Within 8 hours",
        d: "Within 24 hours",
      },
      correct: "b",
      explanation:
        "Two hours is the widely taught limit. Cells left in contact with serum " +
        "or plasma keep metabolizing — glucose falls, potassium leaks out, LDH " +
        "rises — so separation stops the specimen from drifting away from the " +
        "patient's actual values.",
      why: {
        a: "Thirty minutes is tighter than the routine standard, though some individual analytes do require it.",
        c: "Eight hours in contact with cells produces substantial analyte shifts.",
        d: "A day of contact makes several chemistry results meaningless.",
      },
      tip: "Two hours to separate. After that the cells have been quietly rewriting the result.",
      tags: ["processing-time", "separation", "preanalytical"],
    },
    {
      id: "spe-032",
      subdomain: "Analyte stability",
      difficulty: 3,
      stem: "What happens to glucose in an unseparated tube left at room temperature?",
      choices: {
        a: "It rises steadily as cells release glucose",
        b: "It falls, because blood cells continue to metabolize it",
        c: "It stays constant for 24 hours",
        d: "It converts to lactate only in a fluoride tube",
      },
      correct: "b",
      explanation:
        "Red and white cells keep consuming glucose after collection, so an " +
        "unseparated specimen loses glucose over time — roughly a few percent " +
        "per hour at room temperature. Prompt separation or a sodium fluoride " +
        "tube is what prevents a falsely low result.",
      why: {
        a: "Cells consume glucose rather than releasing it.",
        c: "Measurable decline begins within the first hour.",
        d: "Fluoride is what stops glycolysis; without it the conversion proceeds faster, not only in that tube.",
      },
      tip: "Glucose falls in the tube. Fluoride or fast separation — one or the other.",
      tags: ["glucose", "glycolysis", "stability"],
    },
    {
      id: "spe-033",
      subdomain: "Hemolysis",
      difficulty: 3,
      stem: "Which group of results is most affected by hemolysis?",
      choices: {
        a: "Potassium, LDH, and AST, all falsely increased",
        b: "Sodium and chloride, both falsely increased",
        c: "Albumin and total protein, both falsely decreased",
        d: "Glucose, falsely increased",
      },
      correct: "a",
      explanation:
        "Hemolysis releases the contents of red cells into the plasma or serum. " +
        "Potassium, LDH, and AST are far more concentrated inside the cell than " +
        "outside, so even mild hemolysis raises them noticeably — and a falsely " +
        "high potassium can prompt urgent treatment the patient does not need.",
      why: {
        b: "Sodium and chloride concentrations are similar inside and outside the cell, so hemolysis barely moves them.",
        c: "Protein measurements are not the primary casualties of hemolysis.",
        d: "Glucose is affected by delayed separation rather than by cell rupture.",
      },
      tip: "Whatever is concentrated inside red cells goes up when they break: potassium, LDH, AST, magnesium.",
      tags: ["hemolysis", "potassium", "specimen-quality"],
    },
    {
      id: "spe-034",
      subdomain: "Hemolysis",
      difficulty: 2,
      stem: "Which collection practice is a common cause of hemolysis?",
      choices: {
        a: "Allowing the alcohol to dry fully before puncture",
        b: "Vigorously shaking additive tubes after collection",
        c: "Filling tubes to the indicated volume",
        d: "Using a 21 gauge needle for an adult draw",
      },
      correct: "b",
      explanation:
        "Shaking ruptures red cells outright. So does drawing through too fine a " +
        "needle, forcing blood from a syringe, drawing through a hematoma, " +
        "prolonged tourniquet time, and puncturing before the alcohol has dried.",
      why: {
        a: "Letting alcohol dry prevents hemolysis rather than causing it.",
        c: "Correct fill volume protects the additive ratio and does not hemolyze the specimen.",
        d: "A 21 gauge needle is the routine choice and is not associated with hemolysis.",
      },
      tip: "Gentle inversions, not shaking. Most hemolysis is created at the bedside, not in the laboratory.",
      tags: ["hemolysis", "mixing", "collection-technique"],
    },
    {
      id: "spe-035",
      subdomain: "Rejection criteria",
      difficulty: 2,
      stem: "Which finding requires a specimen to be rejected rather than tested?",
      choices: {
        a: "A tube filled slightly above the indicated line",
        b: "A clotted EDTA specimen submitted for a CBC",
        c: "A specimen that arrived ten minutes after collection",
        d: "A tube labeled with the collector's initials",
      },
      correct: "b",
      explanation:
        "Clots in an EDTA specimen consume platelets and cells, so counts read " +
        "falsely low and the film is unreadable. There is no correction for it: " +
        "the specimen is rejected and recollected.",
      why: {
        a: "Slight overfilling is generally acceptable in tubes without a fixed ratio requirement.",
        c: "Ten minutes is well within routine transport expectations.",
        d: "Collector identification is required on the label, not a defect.",
      },
      tip: "A clot in a lavender tube is an automatic redraw. Mix it properly the first time.",
      tags: ["rejection", "clotted-specimen", "cbc"],
    },
    {
      id: "spe-036",
      subdomain: "Chain of custody",
      difficulty: 3,
      stem: "What does a chain of custody document establish?",
      choices: {
        a: "That the patient consented to testing",
        b: "A documented record of every person who handled the specimen from collection to result",
        c: "That the laboratory is accredited",
        d: "The billing responsibility for the test",
      },
      correct: "b",
      explanation:
        "Chain of custody records who collected the specimen, who handled it, " +
        "and when each transfer took place, with a tamper-evident seal at each " +
        "stage. It is required where a result may be used in a legal or " +
        "employment proceeding — forensic and workplace drug testing above all.",
      why: {
        a: "Consent is separate documentation and does not track specimen handling.",
        c: "Accreditation is a laboratory credential, not a specimen record.",
        d: "Billing is administrative and unrelated to custody.",
      },
      tip: "Chain of custody answers one question: can anyone prove this specimen was never out of documented control?",
      tags: ["chain-of-custody", "forensic", "drug-testing"],
    },
    {
      id: "spe-037",
      subdomain: "Chain of custody",
      difficulty: 3,
      stem: "During a chain-of-custody collection, the phlebotomist is called away before sealing the specimen. What is the correct action?",
      choices: {
        a: "Leave the specimen at the station and seal it on returning",
        b: "Complete the sealing and documentation before leaving, or the collection is invalid",
        c: "Ask a colleague to seal it and sign the form",
        d: "Seal it later and back-date the form to the collection time",
      },
      correct: "b",
      explanation:
        "The chain is only as good as its weakest moment. A specimen left " +
        "unsealed and unattended cannot be certified as untampered, which is the " +
        "entire point of the process, so the sealing and paperwork are completed " +
        "before anything else takes the collector's attention.",
      why: {
        a: "An unattended, unsealed specimen breaks the chain irreparably.",
        c: "A colleague cannot attest to a collection they did not witness.",
        d: "Back-dating documentation is falsification and would invalidate the result and the collector's standing.",
      },
      tip: "Seal and sign before you do anything else. An unattended specimen is a broken chain.",
      tags: ["chain-of-custody", "documentation", "integrity"],
    },
    {
      id: "spe-038",
      subdomain: "Transport",
      difficulty: 2,
      stem: "Why are some specimens prohibited from travel through a pneumatic tube system?",
      choices: {
        a: "The tube system is too slow for urgent specimens",
        b: "Acceleration and impact in the system can hemolyze specimens or agitate ones that must stay undisturbed",
        c: "Pneumatic systems are not permitted to carry biohazardous material",
        d: "The tubes cannot accommodate blood collection tubes",
      },
      correct: "b",
      explanation:
        "The forces of launching, travelling, and landing agitate a specimen " +
        "considerably. That can hemolyze red cells or disturb specimens whose " +
        "integrity depends on being left alone, so facility policy names which " +
        "specimens must be hand-carried.",
      why: {
        a: "Pneumatic systems are used precisely because they are fast.",
        c: "They routinely carry properly contained biological specimens.",
        d: "The carriers are designed to hold collection tubes.",
      },
      tip: "Know your facility's do-not-tube list. Agitation is the reason, and hand-carrying is the fix.",
      tags: ["pneumatic-tube", "transport", "hemolysis"],
    },
    {
      id: "spe-039",
      subdomain: "Aliquoting",
      difficulty: 3,
      stem: "What is the essential requirement when preparing an aliquot from a primary specimen?",
      choices: {
        a: "The aliquot tube may be labeled with the test name only",
        b: "The aliquot carries the same patient identification as the primary tube, and specimens are never combined",
        c: "Aliquots from two tubes on the same patient may be pooled to obtain adequate volume",
        d: "The aliquot does not need to be labeled if it is tested immediately",
      },
      correct: "b",
      explanation:
        "An aliquot is a portion of one specimen, and it carries the same " +
        "identification as the tube it came from. Pooling two tubes — even from " +
        "the same patient — produces a specimen of unknown age and unknown " +
        "additive ratio that no result can be trusted from.",
      why: {
        a: "A test name is not patient identification.",
        c: "Combining tubes destroys the traceability and the additive ratio of both.",
        d: "An unlabeled tube on a bench is exactly how specimens get mixed up.",
      },
      tip: "One primary, one aliquot, same identifiers, never pooled.",
      tags: ["aliquot", "labeling", "specimen-integrity"],
    },
    {
      id: "spe-040",
      subdomain: "Analyte stability",
      difficulty: 3,
      stem: "Why should a whole blood specimen for potassium not be refrigerated before separation?",
      choices: {
        a: "Refrigeration causes the specimen to clot",
        b: "Cold inhibits the cell membrane pump, allowing potassium to leak out and falsely raise the result",
        c: "Refrigeration destroys potassium",
        d: "Cold makes the tube's gel barrier fail",
      },
      correct: "b",
      explanation:
        "The sodium-potassium pump that keeps potassium inside the cell needs " +
        "energy, and cooling slows it. Potassium leaks into the plasma, and the " +
        "reported value can be substantially higher than the patient's true one.",
      why: {
        a: "Anticoagulated specimens do not clot when chilled, and serum specimens have already clotted.",
        c: "Potassium is an element and is not destroyed by cooling.",
        d: "Gel behaves normally at refrigerator temperatures.",
      },
      tip: "Chilling whole blood pushes potassium out of the cells. Separate first, then chill if the assay needs it.",
      tags: ["potassium", "refrigeration", "stability"],
    },
    {
      id: "spe-041",
      subdomain: "Labeling",
      difficulty: 2,
      stem: "A 24-hour urine collection arrives with the start time recorded but no end time. What is the concern?",
      choices: {
        a: "There is none — the volume is what matters",
        b: "Without the full collection interval the result cannot be expressed per unit time, so it may be uninterpretable",
        c: "The specimen must be discarded because urine cannot be stored",
        d: "The laboratory can estimate the interval from the volume",
      },
      correct: "b",
      explanation:
        "A timed collection reports an amount excreted over a defined period. " +
        "Without both endpoints the denominator is unknown and the result cannot " +
        "be calculated, so the collection interval is documented as carefully as " +
        "the specimen itself.",
      why: {
        a: "Volume alone means nothing without the interval it was collected over.",
        c: "Urine specimens are routinely stored with appropriate preservation and refrigeration.",
        d: "Volume varies enormously between patients and cannot substitute for a recorded interval.",
      },
      tip: "A timed collection is a rate. Miss an endpoint and there is no rate to report.",
      tags: ["timed-collection", "urine", "documentation"],
    },
    {
      id: "spe-042",
      subdomain: "Rejection criteria",
      difficulty: 2,
      stem: "A specimen arrives in a tube whose expiration date has passed. What should happen?",
      choices: {
        a: "Test it, since expiration affects only the tube's appearance",
        b: "Reject and recollect, because the additive and vacuum are no longer guaranteed",
        c: "Test it but flag the result as approximate",
        d: "Re-spin it to compensate",
      },
      correct: "b",
      explanation:
        "An expired tube may have lost vacuum — giving an underfilled tube and " +
        "the wrong additive ratio — and the additive itself is no longer " +
        "guaranteed to perform. Checking expiry dates during restocking is what " +
        "prevents this reaching a patient.",
      why: {
        a: "Expiry affects vacuum and additive performance, not just appearance.",
        c: "There is no defensible way to qualify a result from an unreliable tube.",
        d: "Centrifugation cannot compensate for a failed additive or short fill.",
      },
      tip: "Rotate stock and check dates when you restock the tray. An expired tube is a wasted stick.",
      tags: ["expired-tube", "rejection", "quality"],
    },
    {
      id: "spe-043",
      subdomain: "Processing",
      difficulty: 2,
      stem: "Why are tube stoppers left in place during centrifugation?",
      choices: {
        a: "To keep the tubes upright in the rotor",
        b: "To prevent aerosol formation, evaporation, and contamination",
        c: "To help the gel barrier form",
        d: "To maintain the tube's vacuum for a second draw",
      },
      correct: "b",
      explanation:
        "Spinning an open tube throws an invisible aerosol of blood into the " +
        "centrifuge chamber and the room. The stopper contains it, and it also " +
        "prevents evaporation and airborne contamination of the specimen.",
      why: {
        a: "The rotor's cups hold tubes upright regardless of the stopper.",
        c: "Gel separates by density during the spin; the stopper plays no part.",
        d: "The vacuum is spent once the tube is filled and is not reusable.",
      },
      tip: "Stoppers stay on. An open tube in a centrifuge aerosolizes blood you cannot see.",
      tags: ["centrifugation", "aerosol", "safety"],
    },
    {
      id: "spe-044",
      subdomain: "Transport",
      difficulty: 2,
      stem: "How should specimens be positioned during transport?",
      choices: {
        a: "Horizontally, to prevent the gel from shifting",
        b: "Upright, with the stopper up",
        c: "Inverted, to keep the additive mixed",
        d: "Position does not affect specimen quality",
      },
      correct: "b",
      explanation:
        "Upright transport promotes complete clot formation in serum tubes, " +
        "reduces agitation of the specimen against the stopper, and limits the " +
        "hemolysis and stopper contact that come from sloshing on its side.",
      why: {
        a: "Horizontal transport allows blood to contact the stopper and increases agitation.",
        c: "Inverting encourages the specimen to sit against the stopper for the whole journey.",
        d: "Orientation measurably affects clot formation and hemolysis rates.",
      },
      tip: "Stopper up, all the way to the laboratory.",
      tags: ["transport", "tube-position", "specimen-integrity"],
    },
    {
      id: "spe-045",
      subdomain: "Rejection criteria",
      difficulty: 3,
      stem: "A chemistry specimen is described by the laboratory as \"lipemic.\" What does this mean?",
      choices: {
        a: "It contains visible red discoloration from ruptured cells",
        b: "It appears milky or turbid from a high concentration of lipids",
        c: "It has a yellow-brown color from elevated bilirubin",
        d: "It has formed a fibrin clot",
      },
      correct: "b",
      explanation:
        "Lipemia is turbidity from circulating lipids, most often because the " +
        "patient did not fast. It interferes optically with many assays, which " +
        "is why the fasting requirement exists and why the laboratory notes it.",
      why: {
        a: "Red discoloration describes hemolysis.",
        c: "Yellow-brown discoloration describes an icteric specimen from raised bilirubin.",
        d: "A fibrin clot is a separate defect from turbidity.",
      },
      tip: "Hemolyzed = red. Icteric = yellow. Lipemic = milky, and usually means the patient ate.",
      tags: ["lipemia", "specimen-appearance", "fasting"],
    },
    {
      id: "spe-046",
      subdomain: "Storage",
      difficulty: 2,
      stem: "A specimen requires frozen storage before transport. What is the correct practice?",
      choices: {
        a: "Freeze the whole blood tube immediately after collection",
        b: "Separate the serum or plasma into an aliquot tube first, then freeze",
        c: "Freeze the specimen with the gel barrier intact",
        d: "Chill rather than freeze, since freezing always damages specimens",
      },
      correct: "b",
      explanation:
        "Freezing whole blood ruptures red cells wholesale, so the specimen is " +
        "separated and the serum or plasma is transferred to an aliquot tube " +
        "before it goes into the freezer. Freezing a primary gel tube is also " +
        "avoided because the tube can crack and the barrier is not designed for " +
        "it.",
      why: {
        a: "Freezing whole blood hemolyzes it completely.",
        c: "Primary tubes with gel are not intended for freezing and can fracture.",
        d: "Freezing is appropriate and required for certain analytes when performed on separated specimens.",
      },
      tip: "Separate, then freeze. Never freeze whole blood.",
      tags: ["freezing", "storage", "aliquot"],
    },
    {
      id: "spe-047",
      subdomain: "STAT handling",
      difficulty: 2,
      stem: "A specimen is ordered STAT. What does this change about handling?",
      choices: {
        a: "Nothing — STAT applies only to how quickly the result is reported",
        b: "It is transported and processed with priority, and identified as STAT so the laboratory sees it immediately",
        c: "It may skip the order of draw",
        d: "It may be collected without full patient identification to save time",
      },
      correct: "b",
      explanation:
        "STAT changes the urgency of transport and processing, and the specimen " +
        "is marked so it is not left in a rack with routine work. What it never " +
        "changes is the collection standard: identification, order of draw, and " +
        "labeling are performed in full.",
      why: {
        a: "The whole handling path is accelerated, not just the reporting.",
        c: "Additive carryover does not become harmless because a test is urgent.",
        d: "Urgency never justifies collecting from an unverified patient — a fast wrong result is worse than a slow right one.",
      },
      tip: "STAT speeds up transport, never the standards. Identification and order of draw are unchanged.",
      tags: ["stat", "priority", "transport"],
    },
    {
      id: "spe-048",
      subdomain: "Processing",
      difficulty: 3,
      stem: "A tube arrives with a visible fibrin strand in the separated serum. What does this most likely indicate?",
      choices: {
        a: "The specimen was hemolyzed during collection",
        b: "The tube was centrifuged before clotting was complete",
        c: "The tube was overfilled",
        d: "The specimen was chilled during transport",
      },
      correct: "b",
      explanation:
        "Fibrin appearing in serum after separation means clotting was still in " +
        "progress when the tube was spun. The remedy is to allow the full " +
        "clotting time — commonly around 30 minutes, longer for patients on " +
        "anticoagulants — before centrifugation.",
      why: {
        a: "Hemolysis colors the serum red; it does not produce fibrin strands.",
        c: "Overfilling affects additive ratios rather than causing latent fibrin.",
        d: "Chilling slows clotting but the strands specifically indicate a premature spin.",
      },
      tip: "Latent fibrin means you spun too early. Give the clot its full time.",
      tags: ["fibrin", "clotting-time", "centrifugation"],
    },
    {
      id: "spe-049",
      subdomain: "Documentation",
      difficulty: 2,
      stem: "A phlebotomist notices a specimen was collected 40 minutes ago and is still on the counter. What should be done?",
      choices: {
        a: "Discard it, since any delay invalidates a specimen",
        b: "Deliver it promptly and report the delay, so the laboratory can judge whether it is still acceptable",
        c: "Refrigerate it and deliver at the end of the shift",
        d: "Deliver it without comment, since the label carries the collection time",
      },
      correct: "b",
      explanation:
        "The laboratory decides acceptability against each test's stability " +
        "requirements, and it can only do that if it knows what happened. " +
        "Delivering promptly and stating the delay lets that judgment be made " +
        "for the specific tests ordered.",
      why: {
        a: "Many analytes are still within their stability window at 40 minutes; discarding costs the patient another stick unnecessarily.",
        c: "Adding hours of delay compounds the problem, and refrigeration is wrong for some analytes.",
        d: "A time on a label is easy to miss, and an explicit report is what prompts the check.",
      },
      tip: "Deliver fast, say what happened. The laboratory can only account for a delay it knows about.",
      tags: ["delay", "communication", "stability"],
    },
    {
      id: "spe-050",
      subdomain: "Rejection criteria",
      difficulty: 2,
      stem: "What does \"QNS\" mean on a rejected specimen report?",
      choices: {
        a: "Quality not standardized",
        b: "Quantity not sufficient",
        c: "Questionable specimen source",
        d: "Quick negative screen",
      },
      correct: "b",
      explanation:
        "QNS means there was not enough specimen to perform the testing ordered. " +
        "It is prevented by knowing the volume each test needs, filling tubes to " +
        "their indicated line, and collecting an additional tube when several " +
        "tests share one specimen type.",
      why: {
        a: "This is not a recognized laboratory abbreviation.",
        c: "Source concerns are described directly rather than by this abbreviation.",
        d: "QNS is a rejection reason, not a screening result.",
      },
      tip: "QNS = quantity not sufficient = another needle for the patient. Fill to the line.",
      tags: ["qns", "rejection", "fill-volume"],
    },
    {
      id: "spe-051",
      subdomain: "Transport",
      difficulty: 3,
      stem: "How should a specimen requiring chilled transport be packed?",
      choices: {
        a: "Buried directly in dry ice",
        b: "In a slurry of ice and water, or a chilled transport container, so cooling is even",
        c: "On a single ice cube in the bottom of the bag",
        d: "In a freezer until transport",
      },
      correct: "b",
      explanation:
        "An ice-and-water slurry surrounds the tube evenly and holds it near " +
        "0°C without freezing it. Ice cubes alone leave warm gaps and can freeze " +
        "the spots they touch, and freezing a whole blood specimen hemolyzes it.",
      why: {
        a: "Dry ice is far colder than required and will freeze a specimen meant only to be chilled.",
        c: "One cube cools unevenly and melts long before the specimen arrives.",
        d: "A freezer converts a chilled requirement into a frozen one and ruptures the cells.",
      },
      tip: "Chilled means an ice-water slurry, not a frozen brick. Even cooling, no freezing.",
      tags: ["chilled-transport", "ice-slurry", "handling"],
    },
    {
      id: "spe-052",
      subdomain: "Analyte stability",
      difficulty: 3,
      stem: "Which specimen is most time-critical after collection?",
      choices: {
        a: "A hemoglobin A1c",
        b: "An arterial blood gas or an ammonia level",
        c: "A cholesterol",
        d: "A thyroid-stimulating hormone",
      },
      correct: "b",
      explanation:
        "Blood gases and ammonia change measurably within minutes as metabolism " +
        "continues in the specimen. Both go on ice where protocol requires and " +
        "travel immediately, often hand-carried rather than sent through a tube " +
        "system.",
      why: {
        a: "A1c reflects glycated hemoglobin and is stable for a considerable period.",
        c: "Cholesterol is comparatively stable in a properly handled specimen.",
        d: "TSH is stable enough for routine transport times.",
      },
      tip: "Blood gases and ammonia are minutes-critical. Walk them over.",
      tags: ["blood-gas", "ammonia", "urgency"],
    },
    {
      id: "spe-053",
      subdomain: "Rejection criteria",
      difficulty: 3,
      stem: "Which of these is the single most serious specimen defect?",
      choices: {
        a: "A slightly hemolyzed chemistry specimen",
        b: "An unlabeled or mislabeled specimen",
        c: "A specimen delivered 30 minutes after collection",
        d: "A specimen transported upright rather than horizontally",
      },
      correct: "b",
      explanation:
        "Every other defect degrades a result that still belongs to the right " +
        "patient. A mislabeled specimen attaches a result to the wrong person, " +
        "which can lead directly to a wrong treatment — which is why it is the " +
        "one defect with no work-around.",
      why: {
        a: "Hemolysis compromises specific analytes and is usually detected and flagged.",
        c: "Thirty minutes is within the routine window for most tests.",
        d: "Upright is the correct orientation, so this is not a defect at all.",
      },
      tip: "Identification errors are the ones that harm patients. Everything else is a quality problem.",
      tags: ["mislabeling", "rejection", "patient-safety"],
    },
    {
      id: "spe-054",
      subdomain: "Processing",
      difficulty: 2,
      stem: "What should be done if a specimen tube cracks inside the centrifuge?",
      choices: {
        a: "Continue the run and clean up afterwards",
        b: "Stop the centrifuge, let aerosols settle, then clean up with PPE using mechanical means for the glass",
        c: "Open the lid immediately to see the damage",
        d: "Rinse the chamber with water while it is still spinning down",
      },
      correct: "b",
      explanation:
        "A break inside a spinning centrifuge fills the chamber with aerosolized " +
        "blood. The rotor is stopped and the lid stays closed for a period so " +
        "aerosols can settle, then the cleanup is performed with appropriate PPE, " +
        "removing glass with forceps or another mechanical device rather than " +
        "gloved fingers.",
      why: {
        a: "Continuing to spin keeps generating aerosol and spreads contamination further.",
        c: "Opening immediately releases the aerosol directly into the operator's breathing zone.",
        d: "Water on a spinning rotor is both an electrical and a splash hazard.",
      },
      tip: "Stop, wait, then clean with PPE. The invisible aerosol is the hazard, not the visible glass.",
      tags: ["centrifuge", "breakage", "aerosol"],
    },
    {
      id: "spe-055",
      subdomain: "Documentation",
      difficulty: 2,
      stem: "Which information does the laboratory rely on the collector to record accurately?",
      choices: {
        a: "The patient's diagnosis",
        b: "The collection date and time, and any deviation such as a difficult draw or a non-fasting patient",
        c: "The expected result range",
        d: "The ordering physician's schedule",
      },
      correct: "b",
      explanation:
        "The collector is the only person who knows what actually happened at " +
        "the bedside: when the specimen was taken, whether the draw was " +
        "difficult, whether the patient had eaten, whether the tourniquet was on " +
        "longer than usual. That context is often what explains an odd result.",
      why: {
        a: "Diagnosis comes from the clinical record, not from the collector.",
        c: "Reference ranges belong to the laboratory's assay, not the collection.",
        d: "Physician scheduling has no bearing on the specimen.",
      },
      tip: "You are the laboratory's eyes at the bedside. Note the deviations — they explain the surprises.",
      tags: ["documentation", "preanalytical", "communication"],
    },
  ],
);

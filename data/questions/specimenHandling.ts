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
        a: "A tube labelled with the patient's name but no second identifier",
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
      tip: "Unlabelled or mislabelled is the one error nobody can fix later. Recollect.",
      tags: ["rejection", "labelling"],
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
      stem: "A phlebotomist realises after leaving the patient's room that one tube was not labelled. What should be done?",
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
      tags: ["labelling", "rejection", "patient-safety"],
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
        "so it carries the same identification. An unlabelled or " +
        "partially-labelled aliquot is as unusable as an unlabelled original, " +
        "and a fresh pipette tip is used for each specimen to prevent " +
        "cross-contamination.",
      why: {
        a: "Reusing a tip carries one patient's specimen into another's.",
        c: "Warming is only required for specific analytes.",
        d: "Centrifuge parameters belong in processing records, not on the label.",
      },
      tip: "Every container holding a patient's specimen carries that patient's identifiers. No exceptions for aliquots.",
      tags: ["aliquot", "labelling", "cross-contamination"],
    },
  ],
);

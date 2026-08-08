import { buildQuestions } from "./authoring";
import { SRC_CLSI_GP41, SRC_TEXTBOOK_CURRICULUM } from "@/data/sources";

export const PATIENT_ID_QUESTIONS = buildQuestions(
  {
    domain: "patient-identification",
    certifications: ["nha-cpt"],
    sources: [SRC_CLSI_GP41, SRC_TEXTBOOK_CURRICULUM],
    reviewStatus: "needs-review",
  },
  [
    {
      id: "pid-001",
      subdomain: "Two identifiers",
      difficulty: 1,
      stem: "Which pair of identifiers is acceptable for verifying an inpatient before a venipuncture?",
      choices: {
        a: "Room number and bed number",
        b: "Full name and date of birth",
        c: "Full name and room number",
        d: "Diagnosis and attending physician",
      },
      correct: "b",
      explanation:
        "Two identifiers must both be specific to the person and must not " +
        "change with where the person happens to be. Full name and date of " +
        "birth qualify; a medical record number is another common one. Room " +
        "and bed are location, not identity — patients get moved.",
      why: {
        a: "Location identifiers are explicitly excluded because they change without the patient changing.",
        c: "Half of this pair is a location identifier, so the pair fails.",
        d: "Diagnosis and physician are shared by many patients and are not identity.",
      },
      tip: "An identifier has to travel with the patient. If moving beds changes the answer, it is not an identifier.",
      tags: ["two-identifiers", "patient-safety"],
    },
    {
      id: "pid-002",
      subdomain: "Active identification",
      difficulty: 2,
      stem: "An alert adult inpatient is about to be drawn. What is the correct way to ask for their name?",
      choices: {
        a: "\"Are you Maria Chen?\"",
        b: "\"You're Maria Chen, right?\"",
        c: "\"Please tell me your full name and date of birth.\"",
        d: "\"Can you confirm the name on this armband is yours?\"",
      },
      correct: "c",
      explanation:
        "Active identification asks the patient to state their identifiers " +
        "in their own words, which you then compare to the requisition and " +
        "the armband. Asking a yes/no question invites a reflexive 'yes' from " +
        "a patient who is medicated, hard of hearing, drowsy, or simply " +
        "being agreeable.",
      why: {
        a: "This is passive identification. A confused or sedated patient will often agree.",
        b: "A leading question is worse still — it supplies the answer.",
        d: "Checking the armband is required, but it is a second step, not a substitute for the patient stating their identifiers.",
      },
      tip: "Ask open, then verify: patient states it, requisition says it, armband confirms it. All three must agree.",
      tags: ["active-identification"],
    },
    {
      id: "pid-003",
      subdomain: "Discrepancies",
      difficulty: 2,
      stem: "The name on the requisition is spelled slightly differently from the name on the patient's armband. What should the phlebotomist do?",
      choices: {
        a: "Draw the patient and note the discrepancy on the requisition",
        b: "Correct the requisition to match the armband and proceed",
        c: "Stop and resolve the discrepancy with the nurse before drawing",
        d: "Draw the patient and let the laboratory resolve it on receipt",
      },
      correct: "c",
      explanation:
        "An unresolved identity discrepancy is a stop. Do not draw, do not " +
        "alter documents, and do not defer the problem downstream. Resolve it " +
        "with the patient's nurse or the ordering provider, then proceed once " +
        "the identity is confirmed.",
      why: {
        a: "Documenting a discrepancy does not resolve it, and the specimen is already at risk of being attributed to the wrong person.",
        b: "Phlebotomists do not alter identifying information to make it match. That destroys the evidence of the mismatch.",
        d: "The lab cannot verify who was in the bed. Once the specimen leaves the bedside, the chance to check is gone.",
      },
      tip: "Mismatched identity is never a paperwork problem. Stop and resolve it at the bedside.",
      tags: ["discrepancy", "patient-safety"],
    },
    {
      id: "pid-004",
      subdomain: "Labelling",
      difficulty: 1,
      stem: "When are blood collection tubes labelled?",
      choices: {
        a: "Before the draw, so nothing is forgotten afterwards",
        b: "At the bedside, immediately after the draw and before leaving the patient",
        c: "At the nurses' station after the draw is complete",
        d: "In the laboratory when the specimen is received",
      },
      correct: "b",
      explanation:
        "Tubes are labelled at the point of collection, in the presence of " +
        "the patient, immediately after the draw. Pre-labelling risks the " +
        "tube being filled with a different patient's blood; labelling later " +
        "risks mixing up tubes en route. The label goes on before you leave " +
        "the bedside.",
      why: {
        a: "Pre-labelled tubes are a classic wrong-patient mechanism, especially when a draw is abandoned and restarted.",
        c: "Any distance between the draw and the label is an opportunity for a mix-up.",
        d: "The lab has no way to know who the blood came from. An unlabelled specimen is rejected.",
      },
      tip: "Label at the bedside, with the patient still in front of you. It is the last moment the identity can be confirmed.",
      tags: ["labelling", "bedside"],
    },
    {
      id: "pid-005",
      subdomain: "Labelling",
      difficulty: 2,
      stem: "Which set of elements is required on a routine specimen label?",
      choices: {
        a: "Patient name and test name",
        b: "Patient name, a second identifier, date and time of collection, and the collector's identification",
        c: "Patient name, room number, and collector's initials",
        d: "Medical record number and ordering physician",
      },
      correct: "b",
      explanation:
        "A label must let anyone downstream answer three questions: whose is " +
        "it, when was it taken, and who took it. That means the patient's " +
        "name, a second unique identifier, the collection date and time, and " +
        "an identifier for the collector. Facilities add fields on top of " +
        "this, and blood bank specimens usually require more.",
      why: {
        a: "The test is on the requisition and in the order; identity and timing are what the tube itself must carry.",
        c: "Room number is a location, not an identifier, and collection time is missing.",
        d: "The ordering physician does not identify the specimen or when it was drawn.",
      },
      tip: "Whose, when, and by whom. If the label cannot answer all three, it is not complete.",
      tags: ["labelling", "requirements"],
    },
    {
      id: "pid-006",
      subdomain: "Special situations",
      difficulty: 3,
      stem: "An unconscious trauma patient arrives with no identification and is registered under a temporary designation with an assigned number. How should the phlebotomist identify this patient?",
      choices: {
        a: "Wait until the patient's identity is established before drawing",
        b: "Use the temporary designation and number on the armband, matching it exactly to the requisition",
        c: "Ask the accompanying paramedic for the patient's name",
        d: "Label the tubes 'unknown male' with the date and time",
      },
      correct: "b",
      explanation:
        "Facilities assign a temporary identity precisely so that emergency " +
        "care can proceed safely. That designation and its number function as " +
        "the identifiers, and they must match the armband and the requisition " +
        "exactly. When the real identity is established later, the record is " +
        "merged through a controlled process.",
      why: {
        a: "Trauma care cannot wait for registration, which is why the temporary system exists.",
        c: "Third-party report is not verification, and it is often wrong at the scene.",
        d: "A free-text description is not a unique identifier and cannot be reconciled later.",
      },
      tip: "No name does not mean no identifiers. The assigned temporary number is the identifier, and it must match everywhere.",
      tags: ["unidentified", "emergency"],
    },
    {
      id: "pid-007",
      subdomain: "Outpatient",
      difficulty: 2,
      stem: "An outpatient with no armband presents for a draw. How is identity verified?",
      choices: {
        a: "By the name they gave at the reception desk",
        b: "By having the patient state two identifiers, compared against the requisition and photo identification per facility policy",
        c: "By the appointment time on the schedule",
        d: "By asking a family member accompanying them",
      },
      correct: "b",
      explanation:
        "Outpatients have no armband, so the patient's own statement of two " +
        "identifiers — compared against the requisition, and against photo " +
        "identification where the facility requires it — is the verification " +
        "step. The absence of an armband raises the importance of asking " +
        "properly, it does not lower the standard.",
      why: {
        a: "What reception recorded is the thing being verified, not the verification.",
        c: "Appointment slots get shifted, shared, and double-booked.",
        d: "The patient identifies themselves whenever they are able to.",
      },
      tip: "No armband means the patient's own statement carries more weight, not less. Ask open questions.",
      tags: ["outpatient", "verification"],
    },
    {
      id: "pid-008",
      subdomain: "Special situations",
      difficulty: 3,
      stem: "A phlebotomist is drawing a sleeping inpatient at 05:00. What is the correct approach?",
      choices: {
        a: "Draw quietly without waking the patient, checking the armband only",
        b: "Wake the patient gently, perform active identification, then proceed",
        c: "Ask the night nurse to identify the patient and proceed",
        d: "Skip the patient and return during visiting hours",
      },
      correct: "b",
      explanation:
        "A patient who can state their identifiers is asked to do so, even " +
        "at an inconvenient hour. Waking someone gently is a small cost " +
        "against a mislabelled specimen. Nurse identification is a fallback " +
        "for patients who genuinely cannot respond, not a shortcut for ones " +
        "who are merely asleep.",
      why: {
        a: "The armband alone is one identifier source, and it can be on the wrong wrist. Active identification is the standard when the patient is able.",
        c: "Nurse verification is a legitimate fallback for unresponsive, confused, or paediatric patients — not for an arousable adult.",
        d: "Timed and morning draws exist for clinical reasons and cannot simply be deferred.",
      },
      tip: "If the patient can talk, the patient identifies themselves. Everything else is a fallback.",
      tags: ["inpatient", "active-identification"],
    },
    {
      id: "pid-009",
      subdomain: "Blood bank",
      difficulty: 3,
      stem: "Why do blood bank specimens typically carry stricter identification and labelling requirements than routine chemistry specimens?",
      choices: {
        a: "Blood bank tubes are more expensive to replace",
        b: "A misidentified specimen can lead to an incompatible transfusion, which can be fatal",
        c: "Blood bank testing takes longer to perform",
        d: "Regulations require duplicate testing on all blood bank specimens",
      },
      correct: "b",
      explanation:
        "The consequence sets the standard. A mislabelled chemistry specimen " +
        "usually produces a result that looks wrong and gets questioned. A " +
        "mislabelled type and screen can produce a correct-looking blood type " +
        "for the wrong person, and the error only surfaces during a " +
        "transfusion reaction. That is why many facilities require the " +
        "collector's identifier and exact collection time on the tube, and " +
        "why an unlabelled or questionable specimen is always recollected.",
      why: {
        a: "Cost is not the driver of any identification policy.",
        c: "Turnaround time has nothing to do with labelling stringency.",
        d: "Confirmatory testing policies vary; the underlying reason is transfusion safety.",
      },
      tip: "Blood bank specimens are never relabelled or corrected. Questionable identity means recollect.",
      tags: ["blood-bank", "transfusion-safety"],
    },
    {
      id: "pid-010",
      subdomain: "Requisitions",
      difficulty: 2,
      stem: "Before drawing, the phlebotomist reviews the requisition primarily to determine:",
      choices: {
        a: "Which tubes are needed and any special collection requirements",
        b: "The patient's insurance coverage",
        c: "The patient's diagnosis",
        d: "Which phlebotomist drew the previous specimen",
      },
      correct: "a",
      explanation:
        "The requisition drives the collection: which tests are ordered, " +
        "therefore which tubes and volumes, whether the patient needed to " +
        "fast, whether the collection is timed, and whether anything needs " +
        "chilling or protection from light. Reading it before entering the " +
        "room means you carry the right supplies and only stick the patient " +
        "once.",
      why: {
        b: "Billing is handled administratively and does not change the collection.",
        c: "Diagnosis is context, not a collection instruction.",
        d: "Prior collectors are relevant to a difficult-draw note, not to the requisition's main purpose.",
      },
      tip: "Read the requisition before you enter the room. Walking back for a forgotten tube costs the patient a second stick.",
      tags: ["requisition", "preparation"],
    },
  ],
);

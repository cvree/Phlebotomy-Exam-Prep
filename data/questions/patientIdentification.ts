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
      stem: "When are blood collection tubes labeled?",
      choices: {
        a: "Before the draw, so nothing is forgotten afterwards",
        b: "At the bedside, immediately after the draw and before leaving the patient",
        c: "At the nurses' station after the draw is complete",
        d: "In the laboratory when the specimen is received",
      },
      correct: "b",
      explanation:
        "Tubes are labeled at the point of collection, in the presence of " +
        "the patient, immediately after the draw. Pre-labeling risks the " +
        "tube being filled with a different patient's blood; labeling later " +
        "risks mixing up tubes en route. The label goes on before you leave " +
        "the bedside.",
      why: {
        a: "Pre-labeled tubes are a classic wrong-patient mechanism, especially when a draw is abandoned and restarted.",
        c: "Any distance between the draw and the label is an opportunity for a mix-up.",
        d: "The lab has no way to know who the blood came from. An unlabeled specimen is rejected.",
      },
      tip: "Label at the bedside, with the patient still in front of you. It is the last moment the identity can be confirmed.",
      tags: ["labeling", "bedside"],
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
      tags: ["labeling", "requirements"],
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
        "against a mislabeled specimen. Nurse identification is a fallback " +
        "for patients who genuinely cannot respond, not a shortcut for ones " +
        "who are merely asleep.",
      why: {
        a: "The armband alone is one identifier source, and it can be on the wrong wrist. Active identification is the standard when the patient is able.",
        c: "Nurse verification is a legitimate fallback for unresponsive, confused, or pediatric patients — not for an arousable adult.",
        d: "Timed and morning draws exist for clinical reasons and cannot simply be deferred.",
      },
      tip: "If the patient can talk, the patient identifies themselves. Everything else is a fallback.",
      tags: ["inpatient", "active-identification"],
    },
    {
      id: "pid-009",
      subdomain: "Blood bank",
      difficulty: 3,
      stem: "Why do blood bank specimens typically carry stricter identification and labeling requirements than routine chemistry specimens?",
      choices: {
        a: "Blood bank tubes are more expensive to replace",
        b: "A misidentified specimen can lead to an incompatible transfusion, which can be fatal",
        c: "Blood bank testing takes longer to perform",
        d: "Regulations require duplicate testing on all blood bank specimens",
      },
      correct: "b",
      explanation:
        "The consequence sets the standard. A mislabeled chemistry specimen " +
        "usually produces a result that looks wrong and gets questioned. A " +
        "mislabeled type and screen can produce a correct-looking blood type " +
        "for the wrong person, and the error only surfaces during a " +
        "transfusion reaction. That is why many facilities require the " +
        "collector's identifier and exact collection time on the tube, and " +
        "why an unlabeled or questionable specimen is always recollected.",
      why: {
        a: "Cost is not the driver of any identification policy.",
        c: "Turnaround time has nothing to do with labeling stringency.",
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
    {
      id: "pid-011",
      subdomain: "Two identifiers",
      difficulty: 1,
      stem: "Facility policy accepts either of two identifier pairs for an inpatient draw. Which pair below satisfies the requirement?",
      choices: {
        a: "Full name and medical record number",
        b: "Room number and diagnosis",
        c: "Attending physician and bed number",
        d: "Diagnosis and date of birth",
      },
      correct: "a",
      explanation:
        "A valid pair is any two identifiers that are unique to the person " +
        "and travel with them. Full name paired with a medical record number " +
        "meets that test just as well as full name paired with date of " +
        "birth. None of the other options include a true identifier at all.",
      why: {
        b: "Room number and diagnosis are both non-identifiers, so pairing them changes nothing.",
        c: "A physician treats many patients and a bed is a location, so neither one identifies a person.",
        d: "Diagnosis is not identity, even when it is paired with a real identifier like date of birth.",
      },
      tip: "Name is one identifier; date of birth or medical record number makes two. Room, bed, diagnosis, and physician never count.",
      tags: ["two-identifiers", "medical-record-number"],
    },
    {
      id: "pid-012",
      subdomain: "Active identification",
      difficulty: 2,
      stem: "A patient just out of anesthesia is groggy but responsive. The phlebotomist asks, \"Can you tell me your name and date of birth?\" rather than \"Are you Mr. Alvarez, born 3/14?\" Why is the open question preferred?",
      choices: {
        a: "It takes less time to phrase the question that way",
        b: "An open question requires the patient to supply the identifiers rather than confirm a suggested one, which lowers the risk of a false agreement",
        c: "Yes or no questions are against facility policy in every situation",
        d: "The chart already confirms identity, so the wording does not matter",
      },
      correct: "b",
      explanation:
        "Active identification depends on the patient generating the answer, " +
        "not endorsing one that is handed to them. A groggy, medicated, or " +
        "simply agreeable patient will often say \"yes\" to a suggested name " +
        "whether or not it is correct, so the open form is what actually " +
        "protects against a wrong-patient draw.",
      why: {
        a: "The choice is about accuracy, not speed, and the open question is not meaningfully slower.",
        c: "Passive identification is the required fallback for patients who cannot answer, so it is not banned outright.",
        d: "The chart tells you who should be in the bed, not who actually is, which is exactly what verification checks.",
      },
      tip: "Let the patient supply the answer. A question they can just agree to is not a check.",
      tags: ["active-identification", "passive-identification"],
    },
    {
      id: "pid-013",
      subdomain: "Special situations",
      difficulty: 3,
      stem: "Two unidentified female trauma patients arrive minutes apart and are both registered as \"Jane Doe,\" each with a different temporary trauma number on her wristband. What matters most when collecting specimens from either patient?",
      choices: {
        a: "Labeling both patients' tubes as \"Jane Doe\" since neither real identity is known",
        b: "Matching the exact temporary trauma number on the wristband to the number on that patient's requisition, not just the placeholder name",
        c: "Asking the two patients to identify each other once they are stable",
        d: "Waiting until hospital registration confirms real names before drawing either patient",
      },
      correct: "b",
      explanation:
        "When two patients share the same placeholder name, the name gives " +
        "no way to tell them apart. The unique trauma number assigned to " +
        "each wristband is the actual identifier in this situation, and it " +
        "must be checked digit for digit against that patient's own " +
        "requisition before every collection.",
      why: {
        a: "Identical labels on two different patients are indistinguishable and create exactly the mix-up the numbering system exists to prevent.",
        c: "Trauma patients in this state are typically unable to respond, and identity is not something one patient can confirm for another.",
        d: "Emergency treatment and testing cannot be held until registration resolves a real identity, which is why the temporary system exists.",
      },
      tip: "When the names are identical placeholders, the number on the band is the only thing keeping the two patients apart.",
      tags: ["unidentified", "trauma-numbering", "emergency"],
    },
    {
      id: "pid-014",
      subdomain: "Special situations",
      difficulty: 2,
      stem: "A newborn requires a heel stick shortly after delivery. How is the infant correctly identified before the collection?",
      choices: {
        a: "By asking the mother to state the baby's name",
        b: "By matching the unique number on the infant's ID band to the identical number on the mother's matching band",
        c: "By the name written on the bassinet card",
        d: "By the footprints taken shortly after birth",
      },
      correct: "b",
      explanation:
        "A newborn cannot state a name or date of birth, and many infants " +
        "do not have a finalized name yet at the time of the first heel " +
        "stick. Facilities instead apply matched bands to mother and baby " +
        "carrying an identical unique number at delivery, and that number " +
        "pair is checked before every procedure.",
      why: {
        a: "A spoken name is not a controlled, verifiable identifier and may not even be finalized yet.",
        c: "A card at the bassinet can be swapped, misplaced, or left with the wrong infant, unlike a band applied directly to the baby.",
        d: "Footprints are kept as a birth record but are not used to verify identity for a routine specimen collection.",
      },
      tip: "A newborn cannot give a name or date of birth. The matched band numbers are the identifiers.",
      tags: ["newborn", "mother-baby-band"],
    },
    {
      id: "pid-015",
      subdomain: "Blood bank",
      difficulty: 3,
      stem: "A patient is scheduled for a type and crossmatch before surgery. Beyond the routine two identifiers used for other specimens, what does blood bank collection typically add?",
      choices: {
        a: "A dedicated blood bank ID band or another independent identification step tying the specimen to that patient, per facility policy",
        b: "A verbal consent form the patient signs immediately after the draw",
        c: "Collection of a noticeably larger blood volume than a routine chemistry draw",
        d: "A second phlebotomist redrawing the same site right afterward",
      },
      correct: "a",
      explanation:
        "Because a mismatched transfusion can be fatal and the error would " +
        "not surface until the unit is given, many facilities layer an " +
        "extra safeguard onto blood bank collection: a dedicated wristband " +
        "applied at the time of the draw, or an independent second " +
        "identification step, on top of the ordinary two-identifier check.",
      why: {
        b: "Consent is a separate clinical process and does not verify who the specimen actually came from.",
        c: "Volume is set by the testing requirements of the assay, not by identification stringency.",
        d: "A second draw at the same site does not confirm identity and is not a recognized identification control.",
      },
      tip: "A type and crossmatch treats identity as the single point of failure. Extra band, extra check.",
      tags: ["blood-bank", "identification-band", "transfusion-safety"],
    },
    {
      id: "pid-016",
      subdomain: "Discrepancies",
      difficulty: 2,
      stem: "While comparing the requisition to the patient's wristband, the phlebotomist notices the date of birth on the wristband does not match the date of birth on the requisition, though the names are identical. What should be done?",
      choices: {
        a: "Proceed with the draw since the names match",
        b: "Cross out the incorrect date of birth on the wristband and write in the correct one",
        c: "Stop the collection and resolve the mismatch with nursing or registration before drawing",
        d: "Use the date of birth from the requisition when labeling the tube",
      },
      correct: "c",
      explanation:
        "Any mismatch between the requisition and the wristband is a stop, " +
        "even when only one of the two identifiers disagrees. A matching " +
        "name alone does not rule out two patients who share that name, so " +
        "the discrepancy has to be resolved with nursing or registration " +
        "before any specimen is collected.",
      why: {
        a: "One matching identifier out of two is not enough, especially with a common name shared by more than one patient on a unit.",
        b: "Phlebotomists never alter identifying information on a wristband; doing so erases evidence of a real discrepancy.",
        d: "Picking whichever date of birth is convenient is a guess, not a resolution, and risks labeling the tube incorrectly.",
      },
      tip: "One mismatched identifier is enough to stop. Never split the difference between two documents.",
      tags: ["discrepancy", "wristband", "stop-the-line"],
    },
    {
      id: "pid-017",
      subdomain: "Special situations",
      difficulty: 1,
      stem: "An inpatient is found without any ID wristband when the phlebotomist arrives for a scheduled draw. What is the correct action?",
      choices: {
        a: "Verify identity verbally instead and proceed with the draw",
        b: "Do not draw; notify nursing so a wristband can be applied and verified before collection proceeds",
        c: "Use the room and bed number as substitute identifiers for this one draw",
        d: "Check the whiteboard in the room for the patient's name and proceed",
      },
      correct: "b",
      explanation:
        "Inpatient identification policy assumes a wristband is present as " +
        "one of the sources being cross-checked. Without a band, a verbal " +
        "statement alone cannot be verified against anything physical, so " +
        "the draw waits until nursing applies and confirms a new band.",
      why: {
        a: "A verbal statement with nothing to check it against does not meet the cross-check standard inpatient policy requires.",
        c: "Room and bed numbers are locations, not identifiers, and cannot substitute for a wristband under any circumstance.",
        d: "A whiteboard is edited by many staff members throughout the day and is not a controlled identification source.",
      },
      tip: "No band, no draw. Get the band applied and verified first.",
      tags: ["wristband", "missing-identification"],
    },
    {
      id: "pid-018",
      subdomain: "Labeling",
      difficulty: 2,
      stem: "A phlebotomist draws four patients on a unit and plans to label all four sets of tubes together at the nurses' station once the round is finished. What is wrong with this plan?",
      choices: {
        a: "Nothing, as long as every tube is labeled before leaving the unit",
        b: "Labeling away from the bedside separates identity confirmation from marking the tube, so a specimen can be rejected even once it is eventually labeled correctly",
        c: "Nothing, because the tubes are naturally in the order they were drawn",
        d: "The plan is acceptable if the room number is written on each tube in pen as a temporary marker",
      },
      correct: "b",
      explanation:
        "The moment a filled tube leaves a patient's bedside unlabeled, the " +
        "only thing tying it to that patient is memory. With four patients " +
        "and four sets of tubes waiting to be sorted later, one mix-up is " +
        "enough to attribute results to the wrong person, which is why the " +
        "label goes on at that bedside before moving to the next patient.",
      why: {
        a: "\"Before leaving the unit\" is still after leaving that patient's bedside, so the mix-up risk is already present.",
        c: "Relying on the order drawn depends on the tubes never being reordered, set down, or confused, which is not a control.",
        d: "A handwritten room number is not a validated identifier and does not substitute for the actual specimen label.",
      },
      tip: "One patient, one draw, one label, before the next patient. Batching labels is how tubes get swapped.",
      tags: ["labeling", "bedside", "specimen-rejection"],
    },
    {
      id: "pid-019",
      subdomain: "Outpatient",
      difficulty: 2,
      stem: "At an outpatient draw station, the front-desk clerk hands the phlebotomist a pre-printed requisition with the patient's name and date of birth already filled in. The phlebotomist calls the patient back and begins the draw without asking for any identifiers. What went wrong?",
      choices: {
        a: "Nothing; the pre-printed requisition already contains verified identifiers",
        b: "The phlebotomist skipped active identification; the patient still has to state a full name and date of birth for comparison against the requisition",
        c: "Nothing, because outpatients do not require the same identity verification inpatients do",
        d: "The clerk should have called the patient's full name loudly in the waiting room instead",
      },
      correct: "b",
      explanation:
        "A pre-printed requisition only reflects what was typed in at " +
        "check-in; it says nothing about who is actually sitting in the " +
        "chair. The phlebotomist is still responsible for asking that " +
        "person to state their own identifiers before drawing, exactly as " +
        "in any other setting.",
      why: {
        a: "Printed information can be wrong, outdated, or attached to the wrong patient's paperwork without anyone noticing.",
        c: "Not having a wristband changes which tools are available for outpatient verification; it does not remove the requirement to verify.",
        d: "Calling a name in a waiting room is how a patient is summoned, not how the person who answers is confirmed.",
      },
      tip: "Paperwork isn't proof. Outpatients state their own identifiers just like anyone else.",
      tags: ["outpatient", "active-identification"],
    },
    {
      id: "pid-020",
      subdomain: "Special situations",
      difficulty: 3,
      stem: "A patient recovering from a stroke is unable to speak. Her daughter is at the bedside and says, \"That's my mother, Linda Ortiz, she was born in 1958.\" How should the phlebotomist proceed?",
      choices: {
        a: "Accept the daughter's statement as identification and proceed with the draw",
        b: "Verify identity using the patient's wristband and the requisition rather than relying solely on the family member's statement, involving nursing if any doubt remains",
        c: "Ask the daughter to sign the requisition in the patient's place",
        d: "Postpone the draw indefinitely until the patient is able to speak for herself",
      },
      correct: "b",
      explanation:
        "A family member's statement is well-intentioned but is not a " +
        "validated identifier and cannot substitute for checking the " +
        "patient's own wristband against the requisition. When a patient " +
        "cannot self-identify, staff rely on the band and chart, pulling in " +
        "nursing if anything about the identity remains unclear.",
      why: {
        a: "Relatives can be mistaken, at the wrong bedside, or simply wrong on a detail, and their statement is not traceable the way a wristband is.",
        c: "A signature from a third party is not part of the identification process and does not stand in for checking the patient's own identifiers.",
        d: "The band and chart-based verification methods exist precisely so care does not have to wait for a patient who cannot speak.",
      },
      tip: "A relative can tell you who a patient is. The wristband is what proves it.",
      tags: ["nonverbal-patient", "family-member", "identification-band"],
    },
    {
      id: "pid-021",
      subdomain: "Special situations",
      difficulty: 2,
      stem: "A patient scheduled for a fasting glucose draw speaks only Vietnamese, and the phlebotomist does not. What is the correct way to carry out active identification?",
      choices: {
        a: "Skip verbal identification for this patient and rely on the wristband alone",
        b: "Use a qualified interpreter to have the patient state their name and date of birth, then compare the response to the requisition and wristband",
        c: "Ask a family member in the room to confirm the patient's identity instead of involving the patient",
        d: "Point to the name on the wristband and have the patient nod if it is correct",
      },
      correct: "b",
      explanation:
        "A language barrier changes how identification is carried out, not " +
        "whether it is required. A qualified interpreter, whether in " +
        "person, by phone, or by video per facility policy, lets the " +
        "patient state their own identifiers, which are then compared to " +
        "the requisition and wristband exactly as with any other patient.",
      why: {
        a: "The wristband is only one source, and skipping the patient's own statement lowers the standard just for this patient.",
        c: "A family member answering in the patient's place is not the patient identifying themselves, and a language barrier is not a reason to substitute a proxy.",
        d: "A nod in response to a pointed-out name is passive identification, the weaker method active identification is meant to replace.",
      },
      tip: "A language barrier changes how you ask, not whether the patient still has to answer.",
      tags: ["language-barrier", "interpreter", "active-identification"],
    },
    {
      id: "pid-022",
      subdomain: "Special situations",
      difficulty: 3,
      stem: "Two patients sharing a semi-private room have similar names: Robert Johnson and Robert Johnston. Both are due for morning draws. What should the phlebotomist do differently for this pair?",
      choices: {
        a: "Draw whichever patient is nearest the door first to save time",
        b: "Perform full active identification for each patient individually, reading the complete name and date of birth carefully and rechecking each requisition and wristband before that patient's draw",
        c: "Since the names are so close, use a single requisition to cover both patients",
        d: "Label both patients' tubes with just a last initial to keep the two first names from being confused",
      },
      correct: "b",
      explanation:
        "Similar names are a well-known setup for wrong-patient errors. " +
        "Each patient still needs the full identification process carried " +
        "out on their own, unhurried, with close attention to the parts of " +
        "the name and date of birth that actually differ, plus a fresh " +
        "check against that patient's own requisition and wristband.",
      why: {
        a: "Which bed happens to be closer to the door has nothing to do with confirming which patient is which.",
        c: "One requisition can never serve two different patients, regardless of how close their names look.",
        d: "An initial-only label is less specific than a full name, which makes the confusion worse rather than solving it.",
      },
      tip: "Similar names call for slower identification, not faster. Read the whole name and the whole date of birth.",
      tags: ["similar-names", "double-check", "patient-safety"],
    },
    {
      id: "pid-023",
      subdomain: "Special situations",
      difficulty: 2,
      stem: "A phlebotomist needs to draw a 4-year-old child, and the mother answers when asked for the child's name and date of birth. Is this acceptable, and what should the phlebotomist still do?",
      choices: {
        a: "It is acceptable as the sole identification, since a young child cannot reliably self-identify",
        b: "A parent or guardian's statement can be used since the child cannot self-identify, but it must still be checked against the wristband and requisition before the draw",
        c: "It is unacceptable; the draw must be postponed until the child can answer independently",
        d: "The parent's statement removes the need to check the wristband at all",
      },
      correct: "b",
      explanation:
        "Young children are a recognized exception where a caregiver's " +
        "statement stands in for active identification, since a four-year-" +
        "old cannot reliably state their own identifiers. That statement " +
        "is still cross-checked against the child's wristband and the " +
        "requisition, just like an adult patient's own statement would be.",
      why: {
        a: "Accepting only the parent's word without checking the band skips the cross-check step that catches errors, even when the source of the statement is legitimate.",
        c: "Postponing is unnecessary because the guardian-answers exception exists for exactly this kind of patient.",
        d: "A verbal statement from anyone, including a guardian, does not eliminate the need to check the wristband.",
      },
      tip: "A caregiver can speak for a child who can't, but the wristband still gets checked either way.",
      tags: ["pediatric", "caregiver", "guardian"],
    },
    {
      id: "pid-024",
      subdomain: "Labeling",
      difficulty: 1,
      stem: "A phlebotomist returns to the drawing station and finds a filled tube that was never labeled; the patient has already left the area. What should be done?",
      choices: {
        a: "Label the tube from memory, since the phlebotomist remembers who was just drawn",
        b: "Discard the tube and redraw the patient with correct bedside labeling",
        c: "Send the tube to the laboratory with a note explaining that the label was added later",
        d: "Ask a nearby coworker to confirm whose tube it is and label it accordingly",
      },
      correct: "b",
      explanation:
        "Once a specimen is separated from its patient without a label, " +
        "there is no way to prove whose blood it is beyond memory, and " +
        "memory is not a validated identification method. The only correct " +
        "response is to discard the tube and collect a fresh specimen with " +
        "the label applied properly at that patient's bedside.",
      why: {
        a: "Memory is not verifiable and is exactly the kind of assumption identification procedures exist to eliminate.",
        c: "A note explaining a broken process does not restore the missing verification step; the specimen was still unlabeled at the moment of collection.",
        d: "A coworker's guess about whose tube it is is no more reliable than the original phlebotomist's memory and is not a recognized identification method.",
      },
      tip: "An unlabeled tube has no identity. When in doubt, or when the patient has left, discard and redraw.",
      tags: ["unlabeled-specimen", "specimen-rejection", "redraw"],
    },
    {
      id: "pid-025",
      subdomain: "Active identification",
      difficulty: 2,
      stem: "Which question best demonstrates active identification of an alert outpatient?",
      choices: {
        a: "\"Are you Mr. Alvarez?\"",
        b: "\"Please state your full name and date of birth.\"",
        c: "\"You're the ten o'clock appointment, correct?\"",
        d: "\"Is this your chart?\"",
      },
      correct: "b",
      explanation:
        "Active identification makes the patient supply the information rather " +
        "than confirm it. An open request produces an answer that can be " +
        "compared against the requisition; a yes/no question can be answered " +
        "correctly by a patient who is hard of hearing, medicated, anxious, or " +
        "simply being agreeable.",
      why: {
        a: "A patient who mishears or wants to be helpful will say yes to a name that is not theirs.",
        c: "Appointment time is not a patient identifier and invites the same reflexive agreement.",
        d: "Confirming ownership of a document is not identification of the person.",
      },
      tip: "Make them tell you, don't ask them to agree. \"State your name\" beats \"Are you…?\" every time.",
      tags: ["active-identification", "two-identifiers", "outpatient"],
    },
    {
      id: "pid-026",
      subdomain: "Inpatient identification",
      difficulty: 2,
      stem: "An inpatient's armband is not on their wrist — it is taped to the bed rail. What should the phlebotomist do?",
      choices: {
        a: "Use the armband on the rail, since it belongs to this bed",
        b: "Ask the nurse to place a verified armband on the patient before collecting",
        c: "Ask the patient to hold the armband while it is read",
        d: "Collect the specimen and note the armband's location on the requisition",
      },
      correct: "b",
      explanation:
        "An armband is only an identifier while it is attached to the patient. " +
        "One taped to a rail, a nightstand, or a chart could belong to a " +
        "previous occupant or have been removed for any number of reasons. The " +
        "nurse re-verifies identity and applies a band before collection " +
        "proceeds.",
      why: {
        a: "Beds get reassigned, and a band on the furniture proves nothing about the person in it.",
        c: "A patient holding a detached band is no more verified than a band on the rail.",
        d: "Documenting a broken identification process does not repair it.",
      },
      tip: "On the patient or it does not count. A detached band identifies furniture.",
      tags: ["armband", "inpatient", "verification"],
    },
    {
      id: "pid-027",
      subdomain: "Unidentified patients",
      difficulty: 3,
      stem: "An unconscious trauma patient in the emergency department has a temporary identification band reading \"Doe, John — MR 4471902.\" How is the specimen identified?",
      choices: {
        a: "By the temporary designation and number on the band, matched to the requisition",
        b: "By the bed number, until a legal name is established",
        c: "By whatever name the accompanying paramedic supplies",
        d: "Collection is deferred until the patient's identity is known",
      },
      correct: "a",
      explanation:
        "A temporary identifier is a real identifier. The assigned designation " +
        "and unique number on the band are matched to the requisition and " +
        "carried onto the labels, so results stay attached to this patient " +
        "throughout, and the record is reconciled when the legal name is " +
        "established.",
      why: {
        b: "Bed and room numbers change and are never patient identifiers.",
        c: "A verbal report is not a verified identifier and cannot be reconciled with the record later.",
        d: "Emergency care cannot wait on a name, which is exactly why temporary identification systems exist.",
      },
      tip: "Temporary identifiers are still identifiers. The number on the band is what ties everything together.",
      tags: ["unidentified-patient", "emergency", "temporary-id"],
    },
    {
      id: "pid-028",
      subdomain: "Pediatric identification",
      difficulty: 2,
      stem: "A four-year-old is brought to an outpatient draw station by a parent. How should identification be performed?",
      choices: {
        a: "Ask the child to state their own name and date of birth",
        b: "Ask the parent or guardian to state the child's full name and date of birth, and verify against the requisition",
        c: "Accept the appointment list as confirmation",
        d: "Use the parent's name and the child's first name",
      },
      correct: "b",
      explanation:
        "When a patient cannot reliably identify themselves, the parent, " +
        "guardian, or caregiver supplies the identifiers and those are verified " +
        "against the requisition. In an inpatient setting the child's armband " +
        "is checked as well, and who supplied the identification is documented " +
        "where policy requires it.",
      why: {
        a: "A four-year-old may not know their date of birth and may answer to any name offered.",
        c: "A schedule is a list of expectations, not a verification of who is in front of you.",
        d: "The specimen belongs to the child, so the child's own full identifiers are what must match.",
      },
      tip: "Patient can't identify themselves? A caregiver identifies them — and you record who did.",
      tags: ["pediatric", "caregiver", "two-identifiers"],
    },
    {
      id: "pid-029",
      subdomain: "Requisition matching",
      difficulty: 2,
      stem: "The requisition lists a middle initial that does not appear on the patient's armband, but the last name, first name, and date of birth match. What is the correct action?",
      choices: {
        a: "Proceed — three of four elements match",
        b: "Resolve the discrepancy with the nurse or ordering area before collecting",
        c: "Correct the armband to match the requisition",
        d: "Correct the requisition to match the armband",
      },
      correct: "b",
      explanation:
        "A discrepancy between the requisition and the patient's identification " +
        "is resolved before collection, not judged at the bedside. It may be a " +
        "harmless clerical difference or it may be two patients with similar " +
        "names, and the only way to tell them apart is to check rather than " +
        "assume.",
      why: {
        a: "Partial matching is precisely the reasoning behind wrong-patient errors.",
        c: "A phlebotomist does not alter a patient's identification band.",
        d: "Editing the requisition to fit hides the discrepancy rather than resolving it.",
      },
      tip: "Any mismatch is a stop-and-verify, not a judgment call about how close is close enough.",
      tags: ["requisition", "discrepancy", "verification"],
    },
    {
      id: "pid-030",
      subdomain: "Labeling",
      difficulty: 1,
      stem: "Which set of elements belongs on a specimen label at the bedside?",
      choices: {
        a: "Patient name, unique identification number, date and time of collection, and collector's identification",
        b: "Patient name and room number",
        c: "Patient name, diagnosis, and ordering physician",
        d: "Unique identification number and test name only",
      },
      correct: "a",
      explanation:
        "The label carries the patient's full name, a unique identifier such as " +
        "a medical record number, the date and time the specimen was collected, " +
        "and the identity of the person who collected it. Those four elements " +
        "let the laboratory tie the specimen to a patient, judge whether it was " +
        "collected at the right time, and reach the collector with questions.",
      why: {
        b: "A room number is not a patient identifier and changes with a transfer.",
        c: "Diagnosis and physician do not identify the specimen or when it was taken.",
        d: "Without the patient's name, collection time, and collector, the specimen cannot be verified or queried.",
      },
      tip: "Name, unique number, date and time, collector initials. Four elements, written at the bedside.",
      tags: ["labeling", "label-elements", "documentation"],
    },
    {
      id: "pid-031",
      subdomain: "Labeling",
      difficulty: 2,
      stem: "Why are tubes labeled after collection rather than before the draw?",
      choices: {
        a: "Pre-printed labels do not adhere to a cold tube",
        b: "A pre-labeled tube that is not used, or is used for a different patient, becomes a mislabeled specimen",
        c: "Labels interfere with the vacuum inside the tube",
        d: "Facility policy requires labels to be applied in the laboratory",
      },
      correct: "b",
      explanation:
        "Labeling after the draw, in the patient's presence, ties the label to " +
        "a specimen that actually came from that patient. Pre-labeled tubes " +
        "drift: one gets set down, another patient's draw goes into it, or an " +
        "unused labeled tube ends up back in the tray waiting to cause harm.",
      why: {
        a: "Adhesion is not the concern, and tubes are at room temperature at collection.",
        c: "A label on the outside has no effect on the tube's vacuum.",
        d: "Labeling happens at the bedside, not in the laboratory — that is the whole point.",
      },
      tip: "Draw, then label, in front of the patient, before you leave. Never before, never later, never elsewhere.",
      tags: ["labeling", "bedside", "mislabeling"],
    },
    {
      id: "pid-032",
      subdomain: "Blood bank identification",
      difficulty: 3,
      stem: "What additional identification requirement typically applies to a type and crossmatch specimen?",
      choices: {
        a: "The specimen must be labeled in the laboratory rather than at the bedside",
        b: "A blood bank identification band or system number is assigned and recorded on both the patient and the specimen",
        c: "Two phlebotomists must sign the requisition",
        d: "The patient's photograph must be attached to the tube",
      },
      correct: "b",
      explanation:
        "Transfusion carries the highest consequence for a wrong-patient " +
        "specimen, so blood bank identification adds a dedicated band or system " +
        "number linking the patient to their specimen and, later, to the unit " +
        "issued for them. The number is recorded on the band, the tube, and the " +
        "paperwork.",
      why: {
        a: "Blood bank specimens are labeled at the bedside like every other specimen, with an additional identifier.",
        c: "Some facilities require a second verifier, but a signature on a requisition is not the defining requirement.",
        d: "Photographs are not part of standard transfusion identification systems.",
      },
      tip: "Blood bank adds a number that links patient, specimen, and unit. Break that chain and someone gets the wrong blood.",
      tags: ["blood-bank", "type-and-crossmatch", "identification-band"],
    },
    {
      id: "pid-033",
      subdomain: "Two identifiers",
      difficulty: 3,
      stem: "Two patients on the same unit share the name \"Maria Garcia.\" What most reliably distinguishes them?",
      choices: {
        a: "Room and bed assignment",
        b: "The unique medical record number, verified against the armband and requisition",
        c: "Physical appearance and approximate age",
        d: "The order in which the requisitions were printed",
      },
      correct: "b",
      explanation:
        "The unique identification number exists for exactly this situation. " +
        "Names repeat, and dates of birth can coincide, but the medical record " +
        "number is assigned to one person. Facilities often flag same-name " +
        "patients specifically so staff slow down and check the number.",
      why: {
        a: "Room assignments change, and patients are moved without paperwork catching up immediately.",
        c: "Appearance and estimated age are not identifiers and cannot be verified against a record.",
        d: "Print order says nothing about which patient a requisition belongs to.",
      },
      tip: "When names collide, the unique number is the tiebreaker. Never the room.",
      tags: ["same-name", "medical-record-number", "two-identifiers"],
    },
    {
      id: "pid-034",
      subdomain: "Communication barriers",
      difficulty: 2,
      stem: "A patient speaks little English and no armband is present in an outpatient setting. What is the appropriate approach to identification?",
      choices: {
        a: "Use a family member's summary of who the patient is and proceed",
        b: "Use a qualified interpreter or the facility's language service to obtain the identifiers directly from the patient",
        c: "Ask the patient to nod when their name is read aloud",
        d: "Skip verbal identification and rely on the appointment record",
      },
      correct: "b",
      explanation:
        "The identifiers still have to come from the patient, so the language " +
        "barrier is bridged rather than worked around. A qualified interpreter " +
        "or language line lets the patient state their own name and date of " +
        "birth, and photo identification may be used as an additional check " +
        "where policy allows.",
      why: {
        a: "An informal summary from a relative is not verified identification, and family members mishear too.",
        c: "Nodding to a name read aloud is passive identification, and even more error-prone across a language barrier.",
        d: "A schedule records who was expected, not who arrived.",
      },
      tip: "A language barrier changes how you ask, not whether you ask.",
      tags: ["language-barrier", "interpreter", "active-identification"],
    },
    {
      id: "pid-035",
      subdomain: "Inpatient identification",
      difficulty: 2,
      stem: "A phlebotomist enters a room for an early morning draw and the patient is asleep. What is the correct approach?",
      choices: {
        a: "Draw quietly without waking the patient, then verify the armband",
        b: "Wake the patient gently, introduce yourself, and complete identification before drawing",
        c: "Verify the armband only and let the patient sleep",
        d: "Skip the patient and return at the end of rounds",
      },
      correct: "b",
      explanation:
        "A sleeping patient is woken gently and identified like any other. " +
        "Beyond the identification requirement, a startled patient can move " +
        "unpredictably with a needle in their arm, so waking them is a safety " +
        "measure as much as a procedural one.",
      why: {
        a: "Verifying identity after the specimen exists reverses the whole safeguard.",
        c: "The armband alone omits the patient's own statement of their identifiers when they are able to give it.",
        d: "Timed morning collections have a reason for their timing; skipping the patient is not the default.",
      },
      tip: "Never draw on a sleeping patient. Wake gently, identify fully, then proceed.",
      tags: ["sleeping-patient", "inpatient", "safety"],
    },
    {
      id: "pid-036",
      subdomain: "Barcode systems",
      difficulty: 2,
      stem: "A facility uses barcode scanning of the patient's armband at the bedside. Does this replace asking the patient to state their identifiers?",
      choices: {
        a: "Yes, scanning is more accurate than a verbal exchange",
        b: "No — scanning supplements the verbal verification and the requisition match, it does not replace them",
        c: "Yes, provided the scanner prints the labels at the bedside",
        d: "Only for outpatients, who can be trusted to correct an error",
      },
      correct: "b",
      explanation:
        "Scanning confirms that the band and the order agree; it cannot confirm " +
        "that the band is on the right patient. The verbal exchange with an " +
        "alert patient catches the error a scanner cannot see, which is why " +
        "electronic systems are layered on top of verification rather than " +
        "substituted for it.",
      why: {
        a: "A scanner reads a band accurately even when the band is on the wrong wrist.",
        c: "Bedside label printing improves labeling accuracy but still cannot verify who is wearing the band.",
        d: "The layering applies to every setting; outpatients are not a special case for skipping steps.",
      },
      tip: "A scanner verifies the band. Only the patient can verify the band is theirs.",
      tags: ["barcode", "technology", "verification"],
    },
    {
      id: "pid-037",
      subdomain: "Discrepancy handling",
      difficulty: 3,
      stem: "After collecting, a phlebotomist notices the labels printed for a different patient than the one just drawn. What must happen?",
      choices: {
        a: "Cross out the printed name and hand-write the correct one",
        b: "Discard the specimens and recollect with correct labels after re-verifying the patient",
        c: "Send the specimens with a note explaining the error",
        d: "Apply correct labels over the incorrect ones and send them",
      },
      correct: "b",
      explanation:
        "The specimens can no longer be tied to a verified identity at the " +
        "moment of collection, so they are discarded and recollected. Altering " +
        "or over-labeling produces a specimen whose history cannot be " +
        "reconstructed, and any of those work-arounds risks attaching results " +
        "to the wrong medical record.",
      why: {
        a: "Altered labels destroy the audit trail and are grounds for rejection.",
        c: "A note does not restore verified identity to a specimen that never had it.",
        d: "Layering labels hides an error rather than correcting it, and the tube underneath still carries the wrong name.",
      },
      tip: "A specimen that cannot be traced to a verified patient is not salvageable. Redraw.",
      tags: ["mislabeling", "recollection", "error-handling"],
    },
    {
      id: "pid-038",
      subdomain: "Patient rights",
      difficulty: 2,
      stem: "An alert inpatient refuses the draw after identification is complete. What is the correct response?",
      choices: {
        a: "Proceed, since the physician has ordered the test",
        b: "Stop, respect the refusal, and notify the nurse and document per policy",
        c: "Have a family member persuade the patient",
        d: "Return in ten minutes and try again without discussion",
      },
      correct: "b",
      explanation:
        "A competent patient may refuse any procedure. The phlebotomist stops, " +
        "reports the refusal to the nurse or ordering clinician so the care team " +
        "can respond, and documents it as policy requires. Proceeding against a " +
        "refusal can constitute battery.",
      why: {
        a: "An order authorizes a test; it does not override the patient's consent.",
        c: "Recruiting family to pressure a competent patient is coercive, not consent.",
        d: "Repeating the attempt without addressing the refusal disregards the patient's decision.",
      },
      tip: "Consent is ongoing. A patient can withdraw it at any point, including after you've identified them.",
      tags: ["consent", "refusal", "patient-rights"],
    },
    {
      id: "pid-039",
      subdomain: "Two identifiers",
      difficulty: 1,
      stem: "Which of the following can serve as the second identifier alongside the patient's full name?",
      choices: {
        a: "The patient's room number",
        b: "The patient's date of birth or unique medical record number",
        c: "The name of the ordering physician",
        d: "The patient's telephone number as listed on the schedule",
      },
      correct: "b",
      explanation:
        "Acceptable identifiers are specific to the person and independent of " +
        "where they happen to be: full name, date of birth, medical record " +
        "number, or another unique assigned identifier. Location-based " +
        "information changes with a transfer and never qualifies.",
      why: {
        a: "Room and bed numbers are location, not identity, and change without notice.",
        c: "One physician has many patients, so their name distinguishes nobody.",
        d: "A number from a scheduling list is not a verified patient identifier and may be shared by a household.",
      },
      tip: "An identifier travels with the patient. If it changes when they move beds, it is not one.",
      tags: ["two-identifiers", "acceptable-identifiers"],
    },
    {
      id: "pid-040",
      subdomain: "Outpatient identification",
      difficulty: 2,
      stem: "An outpatient arrives without any identification documents. Can the draw proceed?",
      choices: {
        a: "No — a government photo ID is universally required before any collection",
        b: "Yes, if the patient can state the identifiers that match the requisition and facility policy allows it",
        c: "Yes, provided a staff member recognizes them",
        d: "Only if a relative vouches for the patient in writing",
      },
      correct: "b",
      explanation:
        "The requirement is two identifiers verified against the requisition, " +
        "usually obtained by having the patient state them. Photo " +
        "identification strengthens verification and some facilities require it " +
        "for particular tests, but a patient who can correctly state their own " +
        "identifiers has met the standard where policy permits.",
      why: {
        a: "Photo ID is a policy-level requirement in some settings, not a universal precondition for collection.",
        c: "Recognition by staff is memory, not verification, and is not a recognized identification method.",
        d: "A relative's statement is not a substitute for the patient's own verified identifiers when the patient is able to give them.",
      },
      tip: "Two identifiers, stated by the patient, matched to the requisition. Photo ID adds confidence where policy asks for it.",
      tags: ["outpatient", "photo-id", "two-identifiers"],
    },
    {
      id: "pid-041",
      subdomain: "Documentation",
      difficulty: 2,
      stem: "Why is the collection time recorded on the specimen label?",
      choices: {
        a: "It documents how long the phlebotomist spent with the patient",
        b: "Results for many analytes depend on when the specimen was taken relative to doses, meals, or symptoms",
        c: "It determines the order in which the laboratory tests specimens",
        d: "It is used for billing purposes only",
      },
      correct: "b",
      explanation:
        "Timing changes the meaning of a result. A drug level is interpreted " +
        "against the dose time, a glucose against the meal, a cardiac marker " +
        "against the onset of symptoms, and a timed collection against its " +
        "scheduled point. Without the collection time the number floats free of " +
        "its context.",
      why: {
        a: "The label records when the specimen was obtained, not how long the encounter lasted.",
        c: "Testing priority comes from the order's urgency, not from the label time.",
        d: "Billing is a downstream use; clinical interpretation is the reason the field exists.",
      },
      tip: "A result without a collection time is a number without a context — especially for drug levels and timed tests.",
      tags: ["labeling", "collection-time", "timed-tests"],
    },
    {
      id: "pid-042",
      subdomain: "Inpatient identification",
      difficulty: 3,
      stem: "A nurse offers to identify a confused inpatient whose armband is missing. What is the correct sequence?",
      choices: {
        a: "Accept the nurse's identification and collect immediately",
        b: "Have the nurse verify identity and apply a new armband, then verify that band before collecting",
        c: "Collect now and ask the nurse to band the patient afterwards",
        d: "Ask the patient's roommate to confirm the patient's name",
      },
      correct: "b",
      explanation:
        "A caregiver's identification of a confused patient is valid, but the " +
        "armband is what carries that verification forward for everyone who " +
        "comes next. The nurse identifies the patient and applies the band, and " +
        "the phlebotomist then verifies against the band as usual.",
      why: {
        a: "Skipping the band leaves the next person without any verification and no record of this one.",
        c: "Banding after the fact cannot confirm who the specimen came from.",
        d: "A roommate is not a source of verified patient identification.",
      },
      tip: "The nurse verifies, the band records it, you check the band. All three, in that order.",
      tags: ["armband", "confused-patient", "nurse-verification"],
    },
    {
      id: "pid-043",
      subdomain: "Requisition matching",
      difficulty: 2,
      stem: "What should a phlebotomist confirm on the requisition before beginning a collection?",
      choices: {
        a: "Only the patient's name",
        b: "Patient identifiers, tests ordered, any special requirements such as fasting or timing, and the ordering provider",
        c: "Only the tests ordered",
        d: "The patient's insurance information",
      },
      correct: "b",
      explanation:
        "The requisition is read completely before the tray is opened: who the " +
        "patient is, what was ordered, what the order requires — fasting, a " +
        "timed draw, chilling, a specific site — and who ordered it. Catching a " +
        "requirement at the bedside prevents a redraw an hour later.",
      why: {
        a: "A name alone tells you nothing about what to collect or what the specimen needs.",
        c: "Tests without verified identifiers are a wrong-patient error waiting to happen.",
        d: "Insurance details are administrative and do not affect collection.",
      },
      tip: "Read the whole requisition before you touch a tube. Special requirements are the ones that cause redraws.",
      tags: ["requisition", "special-requirements", "preparation"],
    },
    {
      id: "pid-044",
      subdomain: "Labeling",
      difficulty: 3,
      stem: "A phlebotomist collects from two patients in a shared room in quick succession. What practice most reliably prevents a mix-up?",
      choices: {
        a: "Labeling both sets of tubes at the nurses' station immediately afterwards",
        b: "Completing each patient fully — draw, label, verify — before approaching the second patient",
        c: "Using different colored pens for each patient",
        d: "Drawing both patients first, then labeling in the order the draws were performed",
      },
      correct: "b",
      explanation:
        "One patient at a time, start to finish, is the practice that removes " +
        "the opportunity for a mix-up. Any workflow that has two patients' " +
        "unlabeled tubes in hand at once depends on memory, and memory is the " +
        "failure mode that identification procedures exist to eliminate.",
      why: {
        a: "Labeling away from the bedside breaks the link between the patient and the specimen.",
        c: "Ink color is not an identifier and does not survive relabeling or handling.",
        d: "Relying on remembering the sequence is exactly the vulnerability being avoided.",
      },
      tip: "Finish one patient completely before starting the next. Never hold two patients' unlabeled tubes.",
      tags: ["mislabeling", "workflow", "shared-room"],
    },
    {
      id: "pid-045",
      subdomain: "Two identifiers",
      difficulty: 2,
      stem: "A patient states a date of birth that differs by one digit from the requisition. What is the appropriate action?",
      choices: {
        a: "Accept it as a transposition and proceed",
        b: "Treat it as a discrepancy and resolve it before collecting",
        c: "Ask the patient to try again and accept the second answer",
        d: "Use the name match alone and proceed",
      },
      correct: "b",
      explanation:
        "A one-digit difference is a mismatch. It may be a data-entry " +
        "transposition, or it may be a different patient with a similar record, " +
        "and the difference between those two possibilities is a verification " +
        "step, not an assumption made at the bedside.",
      why: {
        a: "Assuming a transposition is a guess about which record is right.",
        c: "Prompting until the answer matches coaches the patient toward the expected response.",
        d: "Falling back on one identifier abandons the two-identifier requirement at the exact moment it matters.",
      },
      tip: "One digit off is a mismatch, not a typo you get to overlook.",
      tags: ["discrepancy", "date-of-birth", "verification"],
    },
    {
      id: "pid-046",
      subdomain: "Long-term care",
      difficulty: 2,
      stem: "In a long-term care facility, residents may not wear identification bands. How is identification handled?",
      choices: {
        a: "By recognizing residents from previous visits",
        b: "By following the facility's identification policy, typically identification by a caregiver who knows the resident, documented as required",
        c: "By using the room number posted on the door",
        d: "By asking another resident to confirm",
      },
      correct: "b",
      explanation:
        "Settings without routine banding rely on a defined policy, usually " +
        "identification by a staff member who knows the resident, combined with " +
        "whatever identifiers the resident can supply. Who provided the " +
        "identification is documented so the verification can be traced later.",
      why: {
        a: "Familiarity is not verification, and residents with similar names or appearances are commonly confused.",
        c: "A name on a door is not attached to the person and does not follow a room change.",
        d: "Another resident is not a verified source of identification.",
      },
      tip: "No band does not mean no verification. It means the policy names who verifies, and you record it.",
      tags: ["long-term-care", "caregiver-identification", "documentation"],
    },
    {
      id: "pid-047",
      subdomain: "Documentation",
      difficulty: 2,
      stem: "Why does the collector's identification appear on the specimen label?",
      choices: {
        a: "So the collector can be paid for the collection",
        b: "So the laboratory can contact the person who performed the collection with questions about it",
        c: "So the laboratory can rank collectors by volume",
        d: "It is a courtesy with no operational purpose",
      },
      correct: "b",
      explanation:
        "When a result looks wrong, a specimen arrives hemolyzed, or a question " +
        "arises about how a collection was performed, the laboratory needs to " +
        "reach the person who was actually there. It also makes the chain of " +
        "responsibility for that specimen traceable.",
      why: {
        a: "Payroll does not depend on tube labels.",
        c: "Volume statistics come from the laboratory information system, not from label initials.",
        d: "Traceability is an operational requirement, not a courtesy.",
      },
      tip: "Your initials on the tube say: I collected this, and I can answer questions about it.",
      tags: ["labeling", "traceability", "documentation"],
    },
    {
      id: "pid-048",
      subdomain: "Active identification",
      difficulty: 3,
      stem: "A patient with dementia confidently states a name that does not match the requisition. What should the phlebotomist do?",
      choices: {
        a: "Accept the stated name and cancel the collection",
        b: "Stop and verify identity through the armband and the nurse before proceeding",
        c: "Proceed on the basis of the requisition, since the patient is unreliable",
        d: "Ask the question again more slowly and accept whichever answer comes second",
      },
      correct: "b",
      explanation:
        "When a patient cannot reliably identify themselves, the verification " +
        "shifts to the armband and a caregiver who knows the patient — it does " +
        "not disappear. Proceeding on the requisition alone assumes the paper " +
        "reached the right bed, which is the assumption identification exists " +
        "to test.",
      why: {
        a: "Cancelling on the basis of an unreliable statement leaves ordered testing undone without addressing the question.",
        c: "The requisition is one half of a comparison; it cannot confirm itself.",
        d: "Repeating the question until an acceptable answer appears is not verification.",
      },
      tip: "When the patient can't verify, someone else must — never nobody.",
      tags: ["dementia", "verification", "armband"],
    },
    {
      id: "pid-049",
      subdomain: "Labeling",
      difficulty: 2,
      stem: "Where should a label be positioned on a blood collection tube?",
      choices: {
        a: "Over the cap, so it cannot be removed",
        b: "Lengthwise on the tube body, leaving a window of the specimen visible where required",
        c: "Wrapped around the tube several times to secure it",
        d: "On the bottom of the tube",
      },
      correct: "b",
      explanation:
        "The label goes on the body of the tube, applied so the specimen can " +
        "still be assessed — checking volume, clot formation, hemolysis, or the " +
        "plasma layer. Covering the tube completely forces the laboratory to " +
        "peel a label off to see what it received.",
      why: {
        a: "Labeling the cap risks losing the identity the moment the tube is opened.",
        c: "Multiple wraps obscure the specimen and can jam analyzer racks.",
        d: "The base is not readable in a rack and is the least visible surface on the tube.",
      },
      tip: "Label the body lengthwise, never the cap, and leave the laboratory a view of what is inside.",
      tags: ["labeling", "tube-handling", "laboratory-processing"],
    },
    {
      id: "pid-050",
      subdomain: "Discrepancy handling",
      difficulty: 3,
      stem: "A phlebotomist realizes mid-draw that they never verified the patient's identifiers. What is the correct action?",
      choices: {
        a: "Complete the draw and verify identifiers immediately afterwards, before labeling",
        b: "Stop the draw immediately, discard the specimen, verify identity, and start over",
        c: "Ask the patient their name while the needle is still in place and continue",
        d: "Complete the draw and label it from the requisition",
      },
      correct: "b",
      explanation:
        "Identification is a precondition for the collection, not a step that " +
        "can be back-filled. A specimen drawn without verified identity has no " +
        "reliable identity, so the safe course is to end the procedure, verify " +
        "properly, and recollect — one extra stick against a wrong-patient " +
        "result.",
      why: {
        a: "Verifying afterwards confirms who is in the chair, but not that the blood already in the tube came from a verified patient.",
        c: "Continuing the procedure while the needle is in the arm removes the option to stop if the answer does not match.",
        d: "Labeling from the requisition assumes the requisition matches the patient — which is the unverified assumption.",
      },
      tip: "Identity comes before the needle. If it didn't, the specimen doesn't count.",
      tags: ["error-handling", "verification", "recollection"],
    },
  ],
);

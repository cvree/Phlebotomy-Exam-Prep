import { buildQuestions } from "./authoring";
import { SRC_CLSI_GP41, SRC_TEXTBOOK_CURRICULUM } from "@/data/sources";

export const COMPLICATIONS_QUESTIONS = buildQuestions(
  {
    domain: "complications",
    certifications: ["nha-cpt"],
    sources: [SRC_CLSI_GP41, SRC_TEXTBOOK_CURRICULUM],
    reviewStatus: "needs-review",
  },
  [
    {
      id: "com-001",
      subdomain: "Syncope",
      difficulty: 2,
      stem: "A seated patient becomes pale and says they feel faint during the draw. What is the first action?",
      choices: {
        a: "Finish the draw quickly, then attend to the patient",
        b: "Remove the tourniquet and needle, then lower the patient's head and support them",
        c: "Give the patient water to drink",
        d: "Leave to find help",
      },
      correct: "b",
      explanation:
        "Stop the procedure and protect the patient from a fall. Remove the " +
        "tourniquet and needle, activate the safety device, then lower the " +
        "head between the knees or recline the patient, loosen tight " +
        "clothing, and stay with them. A cold compress on the back of the " +
        "neck helps. Never leave a fainting patient unattended.",
      why: {
        a: "A patient who loses consciousness with a needle in the arm can be injured badly.",
        c: "Nothing is given by mouth to someone who may be about to lose consciousness.",
        d: "Leaving the patient is the one thing that must not happen. Call for help without leaving.",
      },
      tip: "Needle out, head down, stay with them. Call for help without leaving the room.",
      tags: ["syncope", "emergency"],
    },
    {
      id: "com-002",
      subdomain: "Hematoma",
      difficulty: 2,
      stem: "Swelling appears rapidly at the site during a draw. What should the phlebotomist do?",
      choices: {
        a: "Continue the draw and apply pressure afterwards",
        b: "Release the tourniquet, withdraw the needle, and apply firm pressure",
        c: "Reposition the needle deeper to reach the vein",
        d: "Loosen the tourniquet and continue slowly",
      },
      correct: "b",
      explanation:
        "Rapid swelling means blood is leaking into the surrounding tissue — " +
        "a hematoma forming. Continuing makes it larger and more painful, and " +
        "a large hematoma can compress nearby nerves. Stop, release the " +
        "tourniquet, withdraw, and apply firm direct pressure for several " +
        "minutes.",
      why: {
        a: "Every additional second enlarges the hematoma.",
        c: "Advancing the needle worsens the vessel injury.",
        d: "Slowing down does not stop the leak.",
      },
      tip: "Swelling means stop. A growing hematoma is the reason, not an inconvenience.",
      tags: ["hematoma", "complications"],
    },
    {
      id: "com-003",
      subdomain: "Nerve injury",
      difficulty: 3,
      stem: "As the needle is inserted, the patient reports a sharp, shooting, electric sensation radiating into the hand. What should be done?",
      choices: {
        a: "Reassure the patient and complete the draw quickly",
        b: "Withdraw the needle immediately and do not attempt the site again",
        c: "Withdraw slightly and continue at a different angle",
        d: "Release the tourniquet and continue",
      },
      correct: "b",
      explanation:
        "Shooting, electric, or radiating pain suggests nerve contact. " +
        "Withdraw the needle immediately — continuing risks lasting injury, " +
        "including chronic pain syndromes. Do not re-attempt that site; use " +
        "the other arm if a specimen is still needed, and report the event " +
        "per facility policy.",
      why: {
        a: "Ordinary needle pain is dull and local. Radiating electric pain is a different signal and should never be worked through.",
        c: "Redirecting near a nerve is how transient contact becomes permanent damage.",
        d: "The tourniquet is not the problem.",
      },
      tip: "Electric or shooting pain means out, now. Do not redirect, do not retry that site.",
      tags: ["nerve-injury", "pain", "emergency"],
    },
    {
      id: "com-004",
      subdomain: "Hemolysis",
      difficulty: 2,
      stem: "Which practice is most likely to cause a hemolysed specimen?",
      choices: {
        a: "Using a 21-gauge needle",
        b: "Vigorously shaking the tube to mix the additive",
        c: "Releasing the tourniquet once blood flow is established",
        d: "Allowing the alcohol to dry before puncture",
      },
      correct: "b",
      explanation:
        "Shaking ruptures red cells mechanically. Tubes are inverted gently. " +
        "Other common causes are a needle that is too narrow, drawing through " +
        "a small-bore catheter, forcing blood from a syringe through a " +
        "needle, puncturing before the alcohol has dried, and a prolonged " +
        "tourniquet with vigorous fist pumping.",
      why: {
        a: "Twenty-one gauge is a standard size and is not associated with hemolysis.",
        c: "Early tourniquet release reduces hemoconcentration and is correct practice.",
        d: "Letting alcohol dry prevents hemolysis.",
      },
      tip: "Invert, never shake. Most hemolysis is mechanical and preventable.",
      tags: ["hemolysis", "mixing"],
    },
    {
      id: "com-005",
      subdomain: "Petechiae",
      difficulty: 3,
      stem: "Small red spots appear on the arm distal to the tourniquet. What do they indicate?",
      choices: {
        a: "An allergic reaction to the tourniquet material",
        b: "Petechiae, suggesting a possible platelet or capillary defect, and a warning that the site may bleed longer",
        c: "The tourniquet is too loose",
        d: "Early hematoma formation",
      },
      correct: "b",
      explanation:
        "Petechiae are pinpoint hemorrhages from small vessels under " +
        "tourniquet pressure. They are not caused by the phlebotomist and " +
        "they are not dangerous in themselves, but they signal that the " +
        "patient may have a coagulation or platelet abnormality — so expect " +
        "prolonged bleeding at the site and hold pressure longer.",
      why: {
        a: "A latex or contact reaction produces itching, redness, or hives rather than pinpoint hemorrhages.",
        c: "A loose tourniquet fails to distend the vein; it does not produce petechiae.",
        d: "A hematoma is a localized collection of blood at the puncture site, not scattered pinpoint spots.",
      },
      tip: "Petechiae are a warning, not an injury. They tell you to hold pressure longer.",
      tags: ["petechiae", "bleeding", "assessment"],
    },
    {
      id: "com-006",
      subdomain: "Failed draw",
      difficulty: 2,
      stem: "How many venipuncture attempts should a single phlebotomist make on one patient before seeking assistance?",
      choices: {
        a: "One",
        b: "Two",
        c: "Four",
        d: "As many as needed to obtain the specimen",
      },
      correct: "b",
      explanation:
        "Two attempts is the customary limit before handing off to a " +
        "colleague. The rule protects the patient from repeated trauma and " +
        "recognizes that a second operator often succeeds where the first " +
        "could not — different hands find different veins. Facility policy is " +
        "the authority; some are stricter.",
      why: {
        a: "One unsuccessful attempt does not require an immediate handoff.",
        c: "Four sticks by the same person is excessive and causes unnecessary harm.",
        d: "Persisting indefinitely is not acceptable practice.",
      },
      tip: "Two and hand off. It is not a failure — it is the protocol.",
      tags: ["failed-draw", "policy"],
    },
    {
      id: "com-007",
      subdomain: "Edema",
      difficulty: 2,
      stem: "Why should venipuncture be avoided in an edematous arm?",
      choices: {
        a: "The veins are always too deep to reach",
        b: "Accumulated tissue fluid can contaminate and dilute the specimen, and the tissue heals poorly",
        c: "Edematous tissue is more painful to puncture",
        d: "Tourniquets cannot be applied to swollen limbs",
      },
      correct: "b",
      explanation:
        "Edema is excess interstitial fluid. It dilutes and contaminates the " +
        "specimen, obscures the veins by distorting the landmarks, and marks " +
        "tissue with impaired circulation that heals slowly and is more prone " +
        "to infection. Use the other arm, or an alternative site.",
      why: {
        a: "Depth varies; contamination and poor healing are the consistent problems.",
        c: "Discomfort is real but secondary.",
        d: "A tourniquet can physically be applied; that is not the objection.",
      },
      tip: "Edema means contaminated specimen and slow healing. Pick a different limb.",
      tags: ["edema", "site-selection"],
    },
    {
      id: "com-008",
      subdomain: "Seizure",
      difficulty: 3,
      stem: "A patient begins seizing during a venipuncture. What is the correct response?",
      choices: {
        a: "Restrain the patient's limbs to prevent injury",
        b: "Remove the needle and tourniquet, protect the patient from injury, call for help, and do not put anything in their mouth",
        c: "Place a padded object between the patient's teeth",
        d: "Complete the draw once the movements subside",
      },
      correct: "b",
      explanation:
        "Get the needle out immediately, hold pressure if you safely can, " +
        "and protect the patient from striking nearby objects. Call for help " +
        "and note the time the episode started. Do not restrain the patient " +
        "and do not put anything in their mouth — both cause injury and " +
        "neither stops a seizure.",
      why: {
        a: "Restraint causes fractures and soft tissue injury without shortening the seizure.",
        c: "Objects in the mouth cause dental and airway injury. This advice was abandoned decades ago.",
        d: "The patient needs assessment after a seizure, not a continued procedure.",
      },
      tip: "Needle out, protect from injury, time it, get help. Never restrain, never anything in the mouth.",
      tags: ["seizure", "emergency"],
    },
    {
      id: "com-009",
      subdomain: "Hematoma",
      difficulty: 3,
      stem: "Which technique error most commonly causes a hematoma?",
      choices: {
        a: "Using the median cubital vein",
        b: "The needle passing through the far wall of the vein, or inadequate pressure afterwards",
        c: "Allowing the alcohol to dry",
        d: "Releasing the tourniquet before the last tube is removed",
      },
      correct: "b",
      explanation:
        "Hematomas form when blood escapes the vessel into surrounding " +
        "tissue. The two usual mechanisms are mechanical — going through the " +
        "far wall on insertion, or only partially entering so blood leaks " +
        "around the bevel — and post-procedural, from insufficient pressure " +
        "afterwards. Elbow flexion instead of direct pressure is a frequent " +
        "contributor.",
      why: {
        a: "The median cubital vein is the recommended first choice.",
        c: "Allowing alcohol to dry is correct practice.",
        d: "Releasing the tourniquet early is recommended and reduces bleeding.",
      },
      tip: "Through the far wall, or not enough pressure after. Those two account for most hematomas.",
      tags: ["hematoma", "technique"],
    },
    {
      id: "com-010",
      subdomain: "IV contamination",
      difficulty: 3,
      stem: "A specimen drawn from an arm with a running IV shows a glucose of 480 mg/dL in a patient with no history of diabetes. What is the most likely explanation?",
      choices: {
        a: "The patient has undiagnosed diabetes",
        b: "The specimen is contaminated with dextrose-containing IV fluid",
        c: "The tube was underfilled",
        d: "The specimen hemolysed during transport",
      },
      correct: "b",
      explanation:
        "A wildly implausible result in a patient with an IV running above " +
        "the draw site points to fluid contamination before it points to " +
        "disease. Dextrose solutions produce dramatic glucose elevations, and " +
        "saline dilutes everything else. This is why draws are taken below a " +
        "stopped IV, or from the other arm, and why the site is documented.",
      why: {
        a: "It is possible, but contamination is far more likely and must be excluded first by recollecting properly.",
        c: "Underfilling affects citrate ratios, not glucose to this degree.",
        d: "Hemolysis raises potassium and LDH; it does not produce this glucose.",
      },
      tip: "Impossible number plus a nearby IV equals contamination until proven otherwise. Recollect from the other arm.",
      tags: ["iv-contamination", "preanalytical", "glucose"],
    },
    {
      id: "com-011",
      subdomain: "Petechiae",
      difficulty: 2,
      stem:
        "While applying and tightening the tourniquet, the phlebotomist " +
        "notices several small, flat red spots appearing on the skin just " +
        "below it. The patient has not yet been punctured. What should the " +
        "phlebotomist do?",
      choices: {
        a: "Remove the tourniquet immediately and cancel the draw, since this is an allergic reaction to the tourniquet",
        b: "Note the finding, proceed with the venipuncture cautiously, and plan to hold pressure longer than usual afterward",
        c: "Reapply the tourniquet more tightly to get a better look at the veins",
        d: "Ignore the spots since they are unrelated to the blood draw",
      },
      correct: "b",
      explanation:
        "Petechiae appearing under tourniquet pressure are pinpoint " +
        "capillary hemorrhages that suggest a platelet or capillary " +
        "fragility issue, not an allergy or a technique error. They do not " +
        "by themselves prevent the draw, but they warn that the patient may " +
        "bleed longer than expected, so plan for extended pressure and " +
        "document the finding.",
      why: {
        a: "Allergic reactions to tourniquet material produce itching, redness, or hives over the contact area, not scattered pinpoint hemorrhages, so canceling for that reason is a misdiagnosis.",
        c: "Tightening further increases capillary pressure and can worsen the petechiae without improving vein visibility.",
        d: "The finding predicts prolonged bleeding at the puncture site, so it changes how pressure is applied afterward and should not be disregarded.",
      },
      tip: "Petechiae under the tourniquet are a heads-up, not a stop sign — proceed, but hold pressure longer.",
      tags: ["petechiae", "tourniquet", "assessment"],
    },
    {
      id: "com-012",
      subdomain: "Edema",
      difficulty: 2,
      stem:
        "A phlebotomist arrives to draw a patient and finds the intended " +
        "arm visibly swollen from IV fluid overload. The other arm is " +
        "unaffected. What is the correct action?",
      choices: {
        a: "Apply the tourniquet more loosely and proceed on the swollen arm",
        b: "Select a vein in the unaffected arm instead",
        c: "Warm the swollen arm to reduce the edema before drawing",
        d: "Draw from the swollen arm but note the edema on the requisition",
      },
      correct: "b",
      explanation:
        "Excess interstitial fluid in an edematous limb dilutes and " +
        "contaminates the specimen and marks tissue that heals poorly, " +
        "regardless of tourniquet tightness or documentation. When an " +
        "unaffected limb is available, it is the correct choice rather than " +
        "compensating for the edema.",
      why: {
        a: "Loosening the tourniquet does not address the underlying fluid contamination of the specimen.",
        c: "Warming does not reverse fluid accumulation in a clinically meaningful timeframe and is not a recognized workaround.",
        d: "Documenting the edema does not make the specimen usable; a contaminated result can still mislead patient care decisions.",
      },
      tip: "Edema plus an available second arm equals an easy decision — use the other arm.",
      tags: ["edema", "site-selection"],
    },
    {
      id: "com-013",
      subdomain: "Site selection",
      difficulty: 2,
      stem:
        "A patient has a bruised, tender hematoma at the antecubital fossa " +
        "of the only arm available for venipuncture, from a draw earlier " +
        "that day. What should the phlebotomist do?",
      choices: {
        a: "Insert the needle directly through the hematoma, since the vein underneath is still usable",
        b: "Select a vein below the hematoma, or on the hand, avoiding the affected area",
        c: "Apply extra pressure to the hematoma first, then draw through it once it feels firmer",
        d: "Use a larger-gauge needle to push through the hematoma tissue more easily",
      },
      correct: "b",
      explanation:
        "Drawing through an existing hematoma risks a painful, inaccurate, " +
        "and potentially contaminated specimen, and can reopen bleeding into " +
        "the tissue. When only one arm is accessible, choose a site distal " +
        "to the hematoma or another vein clear of the affected area rather " +
        "than working through it.",
      why: {
        a: "Puncturing through a hematoma can reintroduce bleeding into the tissue and yield a specimen contaminated by tissue fluid and old blood.",
        c: "Pressure firms a hematoma over time, but it does not make the site safe or accurate to puncture through.",
        d: "Needle gauge does not solve the underlying problem of drawing through damaged, blood-filled tissue.",
      },
      tip: "Never draw through a hematoma — go below it or find another vein.",
      tags: ["hematoma", "site-selection"],
    },
    {
      id: "com-014",
      subdomain: "Site selection",
      difficulty: 1,
      stem:
        "Why are scarred or burned areas of skin avoided as venipuncture " +
        "sites?",
      choices: {
        a: "The underlying veins are typically difficult to palpate, often sclerosed, and the tissue has reduced sensation and higher infection risk",
        b: "The skin at those sites is unusually thin and punctures too easily",
        c: "Anesthetic cream cannot be applied to scarred skin",
        d: "Blood collected from those areas always clots faster than normal",
      },
      correct: "a",
      explanation:
        "Scar tissue and healed burns often overlie veins that have " +
        "hardened or sclerosed from previous injury or repeated trauma, " +
        "making them hard to feel and access. Sensation is frequently " +
        "altered, so the patient may not reliably report nerve pain, and " +
        "impaired local circulation raises the risk of infection and poor " +
        "healing.",
      why: {
        b: "Scarred skin is typically thicker and less elastic than normal skin, not unusually thin or fragile to puncture.",
        c: "Anesthetic cream use is not the reason these sites are avoided; the vascular and sensory changes are.",
        d: "Clotting time is not characteristically altered by scar tissue at the site.",
      },
      tip: "Scarred or burned skin hides sclerosed veins and dulled sensation — pick a different site.",
      tags: ["scar-tissue", "site-selection"],
    },
    {
      id: "com-015",
      subdomain: "Site selection",
      difficulty: 3,
      stem:
        "A patient had a mastectomy with axillary lymph node dissection on " +
        "the right side. Why is the right arm generally avoided for " +
        "venipuncture, and what should be done if the left arm is also " +
        "restricted, for example by a dialysis fistula?",
      choices: {
        a: "The right arm is avoided because lymphatic drainage is impaired, raising infection and lymphedema risk; if both arms are restricted, involve the patient's nurse and follow facility policy for an alternative site",
        b: "The right arm is avoided only for cosmetic reasons, and if both arms are restricted, either arm may be used since the concern is not medical",
        c: "The right arm is avoided because the veins are permanently collapsed, and if both arms are restricted, the draw should simply be skipped",
        d: "The right arm is avoided due to pain sensitivity, and if both arms are restricted, a numbing agent should be applied before proceeding as usual",
      },
      correct: "a",
      explanation:
        "Lymph node removal disrupts normal lymphatic drainage on that " +
        "side, which increases the risk of infection and lymphedema from a " +
        "puncture and can also alter test results locally. When both arms " +
        "carry restrictions, this is not a decision to improvise — the " +
        "phlebotomist should involve the patient's nurse or physician and " +
        "follow facility policy, which may specify an alternate site with " +
        "provider approval.",
      why: {
        b: "The restriction is a genuine medical concern about infection and lymphedema, not a cosmetic consideration, so either arm is not simply interchangeable.",
        c: "The veins are not necessarily collapsed, and skipping a medically necessary draw without escalating is not an acceptable resolution.",
        d: "Numbing the area does not address the lymphatic drainage risk, and proceeding as usual ignores the restriction entirely.",
      },
      tip: "Mastectomy side plus lymph node dissection means avoid that arm — and if both arms are off-limits, escalate rather than guess.",
      tags: ["mastectomy", "lymphedema", "site-selection"],
    },
    {
      id: "com-016",
      subdomain: "IV contamination",
      difficulty: 2,
      stem:
        "A patient has an IV infusing in the only accessible arm. Under " +
        "what circumstance, if any, is it acceptable to draw a specimen " +
        "from that arm?",
      choices: {
        a: "It is never acceptable under any circumstance; the draw must be rescheduled",
        b: "It may be acceptable to draw below the IV site, after the infusion has been stopped for the period specified by policy, with the site documented",
        c: "It is acceptable to draw above the IV site as long as the tourniquet is applied between the IV and the puncture",
        d: "It is acceptable to draw from that arm at any time as long as the first tube collected is discarded",
      },
      correct: "b",
      explanation:
        "Drawing above a running IV virtually guarantees contamination " +
        "from the infused fluid. If the same arm truly must be used, the " +
        "accepted approach is to draw from a site below the IV, after the " +
        "infusion has been turned off for the interval the facility " +
        "specifies, and to document that the site was used so results can " +
        "be interpreted appropriately.",
      why: {
        a: "An outright rule against ever using that arm is stricter than actual practice, which does permit a below-the-IV draw under specific conditions.",
        c: "Tourniquet placement between the IV and the site does not prevent contamination when the puncture is above or at the infusion point.",
        d: "Discarding a first tube is a technique used for line draws in other contexts; it does not eliminate contamination from an actively running infusion above the site.",
      },
      tip: "Below the IV, infusion stopped, site documented — or use the other arm.",
      tags: ["iv-contamination", "site-selection", "preanalytical"],
    },
    {
      id: "com-017",
      subdomain: "Bleeding",
      difficulty: 2,
      stem:
        "After needle withdrawal, a patient on warfarin continues to bleed " +
        "briskly through the gauze after the usual amount of pressure. What " +
        "should the phlebotomist do?",
      choices: {
        a: "Apply firm direct pressure for a longer duration than usual until bleeding has fully stopped",
        b: "Apply a pressure bandage and send the patient on their way, since some bleeding is expected",
        c: "Elevate the arm above the head without applying pressure",
        d: "Apply a second tourniquet above the site to stop the bleeding",
      },
      correct: "a",
      explanation:
        "Anticoagulant therapy delays clot formation, so patients on " +
        "warfarin or similar medications routinely need pressure held " +
        "longer than the typical minute or two — sometimes five minutes or " +
        "more — until bleeding has actually stopped, not just until the " +
        "usual time has elapsed. Releasing the patient while still bleeding " +
        "risks a large hematoma or continued blood loss after leaving.",
      why: {
        b: "A bandage alone does not provide the direct compressive force needed to stop active bleeding, and releasing the patient while still bleeding is unsafe.",
        c: "Elevation without direct pressure does little to control brisk bleeding on its own.",
        d: "A second tourniquet above the site does not address bleeding at the puncture below it and is not a recognized technique for this situation.",
      },
      tip: "Anticoagulated patients need pressure held until the bleeding actually stops, not for a fixed default time.",
      tags: ["bleeding", "anticoagulant", "hematoma"],
    },
    {
      id: "com-018",
      subdomain: "Hematoma",
      difficulty: 3,
      stem:
        "Midway through a draw, with blood actively flowing into the tube, " +
        "the phlebotomist sees the area around the needle beginning to " +
        "swell. What is the correct immediate sequence of actions?",
      choices: {
        a: "Finish filling the current tube, then release the tourniquet and withdraw the needle",
        b: "Release the tourniquet, withdraw the needle, and apply firm pressure to the site",
        c: "Leave the needle in place, remove the tourniquet, and wait to see if the swelling resolves on its own",
        d: "Advance the needle slightly further into the vein to get past the leak",
      },
      correct: "b",
      explanation:
        "Visible swelling during active blood flow means blood is already " +
        "escaping into the tissue around the needle. The correct sequence " +
        "is to release the tourniquet, withdraw the needle promptly, and " +
        "apply firm direct pressure — every additional second the needle " +
        "stays in place while the vessel is compromised adds more blood " +
        "into the tissue.",
      why: {
        a: "Continuing to fill the tube while the vessel is leaking allows the hematoma to keep growing for no benefit.",
        c: "Leaving the needle in place does not stop the leak; the vessel injury is being caused by the needle's position.",
        d: "Advancing the needle deeper worsens the vessel injury rather than correcting it.",
      },
      tip: "Swelling during the draw means stop now — tourniquet off, needle out, pressure on, in that order.",
      tags: ["hematoma", "technique", "emergency"],
    },
    {
      id: "com-019",
      subdomain: "Nerve injury",
      difficulty: 2,
      stem:
        "During a routine draw, an older adult patient suddenly says, " +
        "\"That's not like the normal poke — that's shooting pain down to " +
        "my fingers.\" What is the appropriate response?",
      choices: {
        a: "Ask the patient to describe the pain further while continuing to draw",
        b: "Withdraw the needle immediately without redirecting or probing further",
        c: "Slightly reposition the needle to see if the sensation improves",
        d: "Reassure the patient that this sensation is a normal part of venipuncture",
      },
      correct: "b",
      explanation:
        "A patient explicitly distinguishing a new, shooting sensation " +
        "from ordinary needle discomfort is describing a hallmark sign of " +
        "nerve contact. The needle should come out right away, without any " +
        "attempt to redirect or probe toward the vein, because continued " +
        "manipulation near a nerve is what turns brief contact into lasting " +
        "injury.",
      why: {
        a: "Continuing to draw while asking questions delays removing the likely source of nerve irritation.",
        c: "Repositioning near a nerve, even slightly, risks converting transient contact into more significant injury.",
        d: "Ordinary needle discomfort is dull and local; a patient reporting something qualitatively different should never be reassured out of the fact that it is abnormal.",
      },
      tip: "When the patient says it feels different, believe them — needle out, no redirecting.",
      tags: ["nerve-injury", "pain", "emergency"],
    },
    {
      id: "com-020",
      subdomain: "Iatrogenic anemia",
      difficulty: 2,
      stem:
        "A critically ill patient in the ICU has had blood drawn for " +
        "multiple lab panels several times a day for over a week. What " +
        "complication is this pattern most likely to contribute to, and " +
        "what is the phlebotomist's role in preventing it?",
      choices: {
        a: "Iatrogenic anemia from cumulative blood loss; the phlebotomist should draw only the tubes actually ordered and use pediatric or low-volume tubes where appropriate",
        b: "Hemolysis from repeated venipuncture; the phlebotomist should switch to a larger-gauge needle for every draw",
        c: "Nerve injury from repeated punctures; the phlebotomist should always use the same site for every draw",
        d: "Vasovagal syncope from frequent draws; the phlebotomist should skip tourniquet use to prevent it",
      },
      correct: "a",
      explanation:
        "Frequent, high-volume blood draws in critically ill or pediatric " +
        "patients can remove enough blood over days to meaningfully " +
        "contribute to anemia, sometimes prompting a transfusion that would " +
        "otherwise not have been needed. Phlebotomists reduce this risk by " +
        "drawing only what is actually ordered, avoiding redundant or " +
        "discretionary tubes, and using low-volume or pediatric tubes when " +
        "the patient's size or condition calls for it.",
      why: {
        b: "Repeated venipuncture over separate visits does not itself cause hemolysis, and needle gauge is not the relevant variable here.",
        c: "Reusing the same site repeatedly is generally discouraged because it damages that vein, not recommended as a safeguard.",
        d: "Tourniquet use is unrelated to draw frequency, and omitting it would only make veins harder to locate.",
      },
      tip: "Small patients, frequent draws — draw only what's ordered, and reach for low-volume tubes.",
      tags: ["iatrogenic-anemia", "pediatric", "specimen-volume"],
    },
    {
      id: "com-021",
      subdomain: "Syncope",
      difficulty: 2,
      stem:
        "A patient is seated and the tourniquet has just been applied, but " +
        "the needle has not yet touched the skin, when the patient reports " +
        "feeling dizzy and their face loses color. What should the " +
        "phlebotomist understand about this situation?",
      choices: {
        a: "This cannot be true syncope because the needle has not been inserted, so the patient is likely exaggerating",
        b: "A vasovagal reaction can be triggered by anxiety alone before any puncture occurs, and the same protective response applies immediately",
        c: "The reaction must be caused by the tourniquet cutting off circulation and will resolve once it is loosened",
        d: "This is a normal, expected sensation that requires no action as long as the patient stays seated",
      },
      correct: "b",
      explanation:
        "Syncope is a vasovagal response driven by anxiety, fear, or " +
        "anticipation of pain, not by blood loss — it can begin before the " +
        "needle ever touches the skin. The phlebotomist should stop the " +
        "procedure at once, remove the tourniquet, and support the patient " +
        "just as if it had happened mid-draw, rather than treating early " +
        "symptoms as less serious.",
      why: {
        a: "Pre-puncture syncope is a well-recognized presentation; dismissing the patient's report risks a fall that could otherwise be prevented.",
        c: "A properly applied tourniquet does not cause dizziness on its own within seconds; the mechanism is a vasovagal response, not local circulation loss.",
        d: "Pallor and dizziness are early warning signs that call for immediate action, not a wait-and-see approach.",
      },
      tip: "Syncope can start before the needle goes in — anxiety alone is enough to trigger it.",
      tags: ["syncope", "emergency", "assessment"],
    },
    {
      id: "com-022",
      subdomain: "Failed draw",
      difficulty: 1,
      stem:
        "A phlebotomist has made two unsuccessful venipuncture attempts on " +
        "the same patient. What is the correct next step?",
      choices: {
        a: "Attempt a third time using a different vein",
        b: "Hand off the draw to another qualified phlebotomist",
        c: "Switch to a much larger needle and try again",
        d: "Ask the patient to try applying their own tourniquet and attempt again",
      },
      correct: "b",
      explanation:
        "Two attempts is the accepted limit for a single phlebotomist " +
        "before handing the patient off to a colleague. A different person " +
        "often succeeds where the first did not, and the handoff protects " +
        "the patient from the cumulative trauma of repeated sticks by the " +
        "same operator.",
      why: {
        a: "A third attempt by the same phlebotomist exceeds the customary limit and adds unnecessary trauma.",
        c: "A larger needle does not address why the first two attempts failed and is not a substitute for a fresh set of hands.",
        d: "Tourniquet application is the phlebotomist's responsibility, not a way to salvage a third attempt.",
      },
      tip: "Two strikes and you hand off — it's protocol, not a personal failure.",
      tags: ["failed-draw", "policy"],
    },
    {
      id: "com-023",
      subdomain: "Allergic reaction",
      difficulty: 2,
      stem:
        "After bandage placement, a patient develops localized redness, " +
        "itching, and small raised bumps confined to the area where the " +
        "adhesive bandage was applied. What is the most likely explanation " +
        "and appropriate follow-up?",
      choices: {
        a: "A contact allergic reaction to the adhesive; document it, remove the bandage if still in place, and use a hypoallergenic alternative for future draws",
        b: "A normal healing response that requires no documentation or change in supplies",
        c: "An infection at the puncture site that requires antibiotic ointment immediately",
        d: "A delayed reaction to the antiseptic used before puncture, unrelated to the bandage",
      },
      correct: "a",
      explanation:
        "Localized itching, redness, and raised bumps confined to the area " +
        "under an adhesive bandage are typical of a contact allergy to the " +
        "adhesive itself. It should be documented in the patient's record, " +
        "and future draws should use a hypoallergenic or paper tape " +
        "alternative to avoid a similar reaction.",
      why: {
        b: "Redness and itching localized to the adhesive contact area are not part of normal healing and should be documented so future supplies are adjusted.",
        c: "Infection typically develops later and involves warmth, swelling, or drainage rather than an immediate itchy rash matching the bandage shape, and self-applying antibiotic ointment is not within the phlebotomist's role.",
        d: "The reaction pattern, confined precisely to where the bandage contacted the skin, points to the adhesive rather than the antiseptic used earlier over a different area.",
      },
      tip: "A rash shaped like the bandage points to the adhesive — switch to a hypoallergenic option and note it in the chart.",
      tags: ["allergic-reaction", "bandage", "documentation"],
    },
    {
      id: "com-024",
      subdomain: "Patient behavior",
      difficulty: 2,
      stem:
        "Partway through a draw, a patient becomes verbally combative, " +
        "curses at the phlebotomist, and pulls their arm away. What is the " +
        "safest response?",
      choices: {
        a: "Hold the patient's arm firmly to complete the draw before the situation escalates further",
        b: "Stop the procedure, do not attempt to restrain the patient alone, and get help per facility policy",
        c: "Speak more firmly to the patient and continue, since stopping might reward the behavior",
        d: "Quickly finish the draw while a coworker is called to help calm the patient",
      },
      correct: "b",
      explanation:
        "A patient who becomes combative or withdraws consent mid-" +
        "procedure needs the phlebotomist to prioritize safety over " +
        "completing the collection. The correct response is to stop, avoid " +
        "any unilateral attempt to restrain or physically control the " +
        "patient, and involve security, nursing staff, or a supervisor as " +
        "the facility's policy directs.",
      why: {
        a: "Restraining a patient alone to force completion of a procedure risks injury to both parties and can constitute an inappropriate use of force.",
        c: "Continuing against a patient's resistance does not de-escalate the situation and increases the risk of injury or a needlestick.",
        d: "Attempting to finish the draw while combativeness is ongoing keeps a needle in an uncontrolled situation, which is unsafe.",
      },
      tip: "Combative patient means stop and get help — never push through with a needle still in play.",
      tags: ["patient-behavior", "safety", "emergency"],
    },
  ],
);

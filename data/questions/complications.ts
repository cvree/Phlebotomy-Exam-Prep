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
        d: "A hematoma is a localised collection of blood at the puncture site, not scattered pinpoint spots.",
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
    {
      id: "com-025",
      subdomain: "Nerve injury",
      difficulty: 3,
      stem: "During insertion the patient reports a sharp, electric, shooting pain radiating down the forearm. What is the immediate action?",
      choices: {
        a: "Reposition the needle slightly and continue",
        b: "Remove the needle immediately, apply pressure, and report the event",
        c: "Complete the draw quickly to minimize the duration of pain",
        d: "Loosen the tourniquet and continue",
      },
      correct: "b",
      explanation:
        "Radiating, electric, or shooting pain is the signature of nerve " +
        "involvement, and it is one of the few findings that ends the procedure " +
        "on the spot. The needle comes out, pressure is applied, and the event is " +
        "reported and documented because symptoms may persist and need follow-up.",
      why: {
        a: "Moving a needle that is already contacting a nerve risks further injury.",
        c: "Finishing the draw prolongs contact with the nerve for the sake of a specimen.",
        d: "The tourniquet is not the source of the pain and adjusting it changes nothing.",
      },
      tip: "Electric, shooting, radiating pain = needle out now. Nerve injury can be permanent.",
      tags: ["nerve-injury", "pain", "emergency"],
    },
    {
      id: "com-026",
      subdomain: "Arterial puncture",
      difficulty: 3,
      stem: "The tube fills unusually rapidly with bright red blood that appears to pulse. What should the phlebotomist do?",
      choices: {
        a: "Continue, since the specimen is filling well",
        b: "Withdraw the needle, apply firm pressure for at least five minutes, and notify a supervisor or nurse",
        c: "Withdraw the needle and apply a bandage without pressure",
        d: "Advance the needle deeper to reach a vein",
      },
      correct: "b",
      explanation:
        "Bright red, rapidly pulsing flow indicates an arterial puncture. The " +
        "needle is withdrawn and firm pressure held for at least five minutes — " +
        "longer for an anticoagulated patient — because arterial pressure will " +
        "keep pushing blood into the tissue. The event is reported and the " +
        "specimen labeled as arterial if it is used at all.",
      why: {
        a: "An arterial puncture is a complication, not a fortunate fast draw, and the specimen differs from a venous one.",
        c: "Arterial bleeding under pressure requires sustained direct pressure, not just a dressing.",
        d: "Advancing deeper compounds the injury.",
      },
      tip: "Bright red, fast, pulsing = artery. Out, five minutes of firm pressure, and tell someone.",
      tags: ["arterial-puncture", "bleeding", "emergency"],
    },
    {
      id: "com-027",
      subdomain: "Hematoma",
      difficulty: 2,
      stem: "Which practice most contributes to hematoma formation?",
      choices: {
        a: "Removing the tourniquet before withdrawing the needle",
        b: "Failing to apply adequate pressure after the needle is withdrawn",
        c: "Using a 21 gauge needle",
        d: "Filling tubes to the indicated line",
      },
      correct: "b",
      explanation:
        "A hematoma forms when blood leaks from the punctured vessel into the " +
        "surrounding tissue. Inadequate pressure after withdrawal is the most " +
        "common cause, alongside puncturing through the far wall, leaving the " +
        "tourniquet on during withdrawal, and letting the patient bend their arm.",
      why: {
        a: "Removing the tourniquet first is correct practice and reduces hematoma risk.",
        c: "A routine gauge choice is not a hematoma risk factor.",
        d: "Correct fill volume has no bearing on bleeding into the tissue.",
      },
      tip: "Hematoma checklist: tourniquet off first, straight arm, firm pressure, look before you bandage.",
      tags: ["hematoma", "pressure", "prevention"],
    },
    {
      id: "com-028",
      subdomain: "Hematoma",
      difficulty: 2,
      stem: "A hematoma begins forming during the draw. What is the correct response?",
      choices: {
        a: "Continue the draw and apply ice afterwards",
        b: "Release the tourniquet, withdraw the needle, and apply firm pressure to the site",
        c: "Tighten the tourniquet to stop the leak",
        d: "Massage the area to disperse the blood",
      },
      correct: "b",
      explanation:
        "A swelling that appears during collection means blood is escaping into " +
        "the tissue, so the procedure ends: tourniquet off, needle out, firm " +
        "pressure. Continuing enlarges the hematoma and can compress structures " +
        "in the area.",
      why: {
        a: "Continuing to draw through a forming hematoma makes it larger and the specimen less reliable.",
        c: "Tightening the tourniquet raises venous pressure and worsens the leak.",
        d: "Massaging spreads blood through the tissue and increases bruising.",
      },
      tip: "Swelling during the draw means stop. Pressure, not persistence.",
      tags: ["hematoma", "response", "technique"],
    },
    {
      id: "com-029",
      subdomain: "Syncope",
      difficulty: 3,
      stem: "An outpatient loses consciousness in the drawing chair. After the needle is removed, what is the priority?",
      choices: {
        a: "Leave to find a supervisor",
        b: "Protect the patient from falling, lower their head or lay them flat, and call for help without leaving them unattended",
        c: "Give the patient juice immediately",
        d: "Place the patient's head between their knees and continue the draw",
      },
      correct: "b",
      explanation:
        "The immediate danger is a fall and a head injury. The patient is " +
        "supported and positioned so blood returns to the brain, help is " +
        "summoned by calling out or by an alert system, and they are not left " +
        "alone. Oral fluids wait until the patient is fully alert.",
      why: {
        a: "Leaving an unconscious patient unattended risks a fall with no one there.",
        c: "Nothing goes into the mouth of a patient who is not fully conscious — aspiration risk.",
        d: "The draw is over; the patient's safety is the only concern now.",
      },
      tip: "Never leave a fainting patient. Support, position, call for help from where you are.",
      tags: ["syncope", "emergency", "patient-safety"],
    },
    {
      id: "com-030",
      subdomain: "Syncope",
      difficulty: 2,
      stem: "Which early sign suggests a patient is about to faint?",
      choices: {
        a: "Increased talkativeness",
        b: "Pallor, sweating, yawning, or a report of feeling warm or lightheaded",
        c: "Flushed cheeks and rapid speech",
        d: "Complaining that the tourniquet is tight",
      },
      correct: "b",
      explanation:
        "The vasovagal prodrome is recognizable: the patient goes pale and " +
        "clammy, may yawn or sigh, says they feel hot, dizzy, or nauseated, and " +
        "often becomes quiet. Catching it early is the difference between a " +
        "controlled stop and a fall.",
      why: {
        a: "Patients about to faint typically become quieter, not more talkative.",
        c: "Flushing is not the pattern; pallor is.",
        d: "Tourniquet discomfort is common and is not a syncope warning.",
      },
      tip: "Pale, sweaty, yawning, quiet — that's the prodrome. Stop before it becomes a faint.",
      tags: ["syncope", "warning-signs", "assessment"],
    },
    {
      id: "com-031",
      subdomain: "Seizures",
      difficulty: 3,
      stem: "A patient begins seizing during a venipuncture. What is the correct response?",
      choices: {
        a: "Restrain the patient's limbs to complete the draw",
        b: "Remove the needle and tourniquet, protect the patient from injury, call for help, and do not put anything in their mouth",
        c: "Place a padded object between the patient's teeth",
        d: "Leave the room to get assistance",
      },
      correct: "b",
      explanation:
        "The needle comes out immediately, the area around the patient is made " +
        "safe, and help is summoned. Restraining a seizing patient causes injury " +
        "and putting anything in their mouth risks dental damage and airway " +
        "obstruction. The event's start time is noted for the care team.",
      why: {
        a: "Restraint during a seizure causes injuries and does not stop the seizure.",
        c: "Placing anything in the mouth is contraindicated and dangerous.",
        d: "The patient must not be left unattended during a seizure.",
      },
      tip: "Needle out, area clear, call for help, nothing in the mouth, note the time.",
      tags: ["seizure", "emergency", "patient-safety"],
    },
    {
      id: "com-032",
      subdomain: "Petechiae",
      difficulty: 3,
      stem: "Small red pinpoint spots appear on the arm below the tourniquet. What do they indicate?",
      choices: {
        a: "An allergic reaction to the tourniquet",
        b: "Capillary fragility or a platelet abnormality, suggesting the site may bleed longer than usual",
        c: "An arterial puncture",
        d: "The beginning of a hematoma",
      },
      correct: "b",
      explanation:
        "Petechiae are tiny hemorrhages from capillaries that leak under the " +
        "tourniquet's pressure, pointing to fragile capillaries or a platelet " +
        "problem. They are not an emergency in themselves, but they are a " +
        "warning that the puncture site may bleed for longer.",
      why: {
        a: "An allergic reaction produces itching, wheals, or diffuse redness rather than pinpoint hemorrhages.",
        c: "Arterial puncture presents as bright pulsing flow, not as skin spots.",
        d: "A hematoma is a localized swelling of pooled blood, not scattered pinpoint spots.",
      },
      tip: "Petechiae are a heads-up: expect a longer hold on the site afterwards.",
      tags: ["petechiae", "bleeding-risk", "assessment"],
    },
    {
      id: "com-033",
      subdomain: "Site problems",
      difficulty: 3,
      stem: "Why should a site with edema be avoided for venipuncture?",
      choices: {
        a: "Edematous tissue contains no veins",
        b: "Accumulated tissue fluid can contaminate and dilute the specimen, and the veins are harder to locate",
        c: "Edema makes the skin impossible to disinfect",
        d: "Edematous tissue is always infected",
      },
      correct: "b",
      explanation:
        "Edema is excess interstitial fluid. It obscures the vessels, distorts " +
        "the landmarks, and can dilute or contaminate the specimen. The tissue " +
        "also heals less well, so an unaffected site is chosen instead.",
      why: {
        a: "Veins are present but are difficult to locate and enter reliably.",
        c: "Skin disinfection remains possible; the problem is the fluid and vessel access.",
        d: "Edema has many non-infectious causes.",
      },
      tip: "Swollen tissue means diluted specimens and hidden veins. Find another site.",
      tags: ["edema", "site-selection", "specimen-quality"],
    },
    {
      id: "com-034",
      subdomain: "IV contamination",
      difficulty: 3,
      stem: "Why must a specimen never be drawn above a running IV line?",
      choices: {
        a: "The tourniquet would occlude the IV",
        b: "The specimen would be contaminated with infusing fluid, producing grossly abnormal results",
        c: "It causes the IV to infiltrate",
        d: "It is uncomfortable for the patient",
      },
      correct: "b",
      explanation:
        "Blood drawn upstream of an infusion is mixed with whatever is running " +
        "in. Dextrose produces an impossible glucose, saline dilutes " +
        "electrolytes, and a potassium-containing fluid produces a critical " +
        "value that never existed in the patient.",
      why: {
        a: "Occlusion is a practical problem but not the reason results are invalid.",
        c: "Infiltration is a separate IV complication unrelated to the draw site's position.",
        d: "Discomfort is not the concern; the specimen being unusable is.",
      },
      tip: "Below the IV, after it has been stopped for the required interval, and document that you did.",
      tags: ["iv-contamination", "site-selection", "specimen-quality"],
    },
    {
      id: "com-035",
      subdomain: "Failed draws",
      difficulty: 2,
      stem: "A vein collapses as the tube's vacuum engages. What adjustment often helps?",
      choices: {
        a: "Use a larger-volume tube to increase draw force",
        b: "Use a smaller-volume tube or a syringe, which applies gentler suction",
        c: "Apply the tourniquet more tightly and leave it on longer",
        d: "Advance the needle deeper into the vein",
      },
      correct: "b",
      explanation:
        "Collapse happens when the vacuum pulls harder than the vein can " +
        "supply. A smaller tube applies less suction, and a syringe lets the " +
        "collector control the rate by hand. A winged set with a smaller tube is " +
        "the usual combination for fragile veins.",
      why: {
        a: "A larger tube pulls harder and collapses the vein faster.",
        c: "Overtightening obstructs flow into the vein and prolongs tourniquet time.",
        d: "Depth is not the issue when the vessel is collapsing under suction.",
      },
      tip: "Collapsing vein? Reduce the suction — smaller tube, or a syringe you control.",
      tags: ["collapsed-vein", "vacuum", "technique"],
    },
    {
      id: "com-036",
      subdomain: "Hemoconcentration",
      difficulty: 3,
      stem: "Which practice causes hemoconcentration?",
      choices: {
        a: "Releasing the tourniquet as soon as blood flows",
        b: "Leaving the tourniquet on for several minutes while searching for a vein",
        c: "Using a 21 gauge needle",
        d: "Inverting tubes gently after collection",
      },
      correct: "b",
      explanation:
        "Prolonged tourniquet pressure forces water out of the vessels while " +
        "cells and larger molecules stay behind, concentrating the specimen. " +
        "Potassium, protein, calcium, and cell counts can all read falsely high, " +
        "which is why the tourniquet comes off within about a minute.",
      why: {
        a: "Early release is the practice that prevents hemoconcentration.",
        c: "Needle gauge affects hemolysis risk, not hemoconcentration.",
        d: "Gentle mixing has no effect on plasma concentration.",
      },
      tip: "One minute maximum. Find the vein first, then apply the tourniquet.",
      tags: ["hemoconcentration", "tourniquet", "preanalytical"],
    },
    {
      id: "com-037",
      subdomain: "Allergic reactions",
      difficulty: 2,
      stem: "A patient develops a raised, itchy rash under the adhesive bandage minutes after the draw. What is the appropriate action?",
      choices: {
        a: "Ignore it — bandage reactions are always trivial",
        b: "Remove the bandage, use a hypoallergenic alternative such as paper tape over gauze, and report the reaction",
        c: "Apply a second bandage over the first",
        d: "Advise the patient to take an antihistamine",
      },
      correct: "b",
      explanation:
        "The bandage comes off, an alternative dressing goes on, and the " +
        "reaction is documented so it is known for next time. Recommending " +
        "medication is outside a phlebotomist's scope; observing and reporting " +
        "is not.",
      why: {
        a: "A skin reaction should be acted on and recorded, whatever its severity.",
        c: "Layering keeps the causative adhesive against the skin.",
        d: "Advising medication is a clinical recommendation outside the role.",
      },
      tip: "Remove the cause, substitute a gentler dressing, document it. Don't recommend medication.",
      tags: ["allergic-reaction", "adhesive", "documentation"],
    },
    {
      id: "com-038",
      subdomain: "Site problems",
      difficulty: 3,
      stem: "A vein feels hard and cord-like with no rebound when palpated. What does this suggest and what should be done?",
      choices: {
        a: "A healthy, well-filled vein — proceed",
        b: "A sclerosed or thrombosed vein — select a different site",
        c: "An artery — apply pressure",
        d: "A tendon — apply more tourniquet pressure",
      },
      correct: "b",
      explanation:
        "A hard, cord-like vessel with no springiness is sclerosed or " +
        "thrombosed, often from repeated punctures or previous infusions. Blood " +
        "flow through it is poor, entry is difficult, and any specimen obtained " +
        "is likely to be of poor quality, so another site is used.",
      why: {
        a: "A healthy vein is soft and rebounds under the fingertip.",
        c: "An artery pulses; a sclerosed vein does not.",
        d: "Tendons are avoided as landmarks, and more tourniquet pressure does not soften a scarred vessel.",
      },
      tip: "Bouncy is good, cord-like is not. Palpate before you commit to a site.",
      tags: ["sclerosed-vein", "palpation", "site-selection"],
    },
    {
      id: "com-039",
      subdomain: "Iatrogenic anemia",
      difficulty: 3,
      stem: "Why is collection volume tracked carefully in neonates and frequently-drawn patients?",
      choices: {
        a: "To limit laboratory supply costs",
        b: "Because repeated collections can cause iatrogenic anemia, particularly in patients with small blood volumes",
        c: "Because tubes cannot be reordered quickly",
        d: "Because volume affects the order of draw",
      },
      correct: "b",
      explanation:
        "A neonate's total blood volume is small enough that routine collection " +
        "volumes represent a meaningful fraction of it. Cumulative losses from " +
        "repeated draws can produce anemia caused by the testing itself, so " +
        "facilities set limits and use microcollection wherever possible.",
      why: {
        a: "Cost is real but not the clinical reason for the limits.",
        c: "Supply logistics have nothing to do with it.",
        d: "The order of draw is independent of total volume collected.",
      },
      tip: "Iatrogenic = caused by the care. In a neonate, the tubes themselves can cause the anemia.",
      tags: ["iatrogenic-anemia", "neonatal", "collection-volume"],
    },
    {
      id: "com-040",
      subdomain: "Infection",
      difficulty: 2,
      stem: "A patient calls the next day reporting the puncture site is red, warm, swollen, and increasingly painful. What is the appropriate response?",
      choices: {
        a: "Reassure them that bruising is normal after a draw",
        b: "Direct them to contact their healthcare provider promptly, and report the call per facility policy",
        c: "Advise them to apply a warm compress and wait a week",
        d: "Tell them to take an over-the-counter antibiotic",
      },
      correct: "b",
      explanation:
        "Redness, warmth, swelling, and worsening pain suggest infection rather " +
        "than ordinary bruising, and that needs clinical assessment. The " +
        "phlebotomist refers the patient and reports the call so the event is on " +
        "record.",
      why: {
        a: "These findings go beyond bruising, and reassurance could delay treatment.",
        c: "A week of watching a possible infection is unsafe advice.",
        d: "Antibiotics are prescription medications and are outside a phlebotomist's scope entirely.",
      },
      tip: "Red, warm, swollen, worsening pain = clinical assessment, not reassurance.",
      tags: ["infection", "follow-up", "scope-of-practice"],
    },
    {
      id: "com-041",
      subdomain: "Nerve injury",
      difficulty: 3,
      stem: "A patient reports persistent tingling in the hand two days after a draw. What should be documented and done?",
      choices: {
        a: "Nothing — tingling always resolves on its own",
        b: "Record the report in detail and route it through the facility's incident process so the patient can be evaluated",
        c: "Advise the patient to massage the site vigorously",
        d: "Tell the patient it is unrelated to the draw",
      },
      correct: "b",
      explanation:
        "Persistent paresthesia after a venipuncture may indicate nerve " +
        "involvement that needs assessment. It is documented factually and " +
        "reported through the incident process, both so the patient is evaluated " +
        "and so the event is on record.",
      why: {
        a: "Some nerve injuries persist, and assuming resolution delays evaluation.",
        c: "Vigorous massage is not indicated and may worsen symptoms.",
        d: "Dismissing a plausible connection is neither accurate nor the phlebotomist's determination to make.",
      },
      tip: "Report it factually and let the clinicians judge. Never diagnose it away.",
      tags: ["nerve-injury", "documentation", "incident-reporting"],
    },
    {
      id: "com-042",
      subdomain: "Hemolysis",
      difficulty: 2,
      stem: "A specimen drawn through an existing hematoma is likely to show what?",
      choices: {
        a: "Falsely low potassium",
        b: "Hemolysis and contamination from the pooled blood, making results unreliable",
        c: "Improved flow and specimen quality",
        d: "No effect, as long as the tube fills completely",
      },
      correct: "b",
      explanation:
        "The blood pooled in a hematoma is outside the circulation and partly " +
        "damaged, so drawing through one mixes it with the fresh specimen. The " +
        "correct move is to select a site above the hematoma or use the other " +
        "arm.",
      why: {
        a: "Hemolysis raises potassium rather than lowering it.",
        c: "A hematoma degrades specimen quality; it does not improve flow.",
        d: "A full tube of contaminated blood is still contaminated.",
      },
      tip: "Never draw through a hematoma. Go above it, or use the other arm.",
      tags: ["hematoma", "hemolysis", "site-selection"],
    },
    {
      id: "com-043",
      subdomain: "Reflux",
      difficulty: 3,
      stem: "What practice prevents backflow of tube additive into the patient's vein?",
      choices: {
        a: "Keeping the tube below the puncture site so blood flows away from the patient",
        b: "Filling tubes above the level of the patient's arm",
        c: "Squeezing the tube during filling",
        d: "Removing the tourniquet before the tube is attached",
      },
      correct: "a",
      explanation:
        "Reflux is rare but real: if a tube's contents are allowed to contact " +
        "the needle end while the arm is above the tube, additive can travel " +
        "back toward the patient. Keeping the tube below the site and the arm " +
        "angled downward means gravity works with the flow rather than against " +
        "it.",
      why: {
        b: "Positioning a tube above the arm is what creates the risk.",
        c: "Squeezing a filling tube can push contents back toward the needle.",
        d: "The tourniquet's timing does not address reflux.",
      },
      tip: "Arm angled down, tube below the site. Gravity should always be on the specimen's side.",
      tags: ["reflux", "tube-position", "patient-safety"],
    },
    {
      id: "com-044",
      subdomain: "Failed draws",
      difficulty: 2,
      stem: "The needle is inserted but no blood appears, and the patient reports no unusual pain. What is a reasonable first step?",
      choices: {
        a: "Probe in several directions to find the vein",
        b: "Check that the tube is seated fully, then make one small, deliberate adjustment of needle depth or angle",
        c: "Withdraw and immediately reinsert at a new site without reassessing",
        d: "Ask the patient to pump their fist vigorously",
      },
      correct: "b",
      explanation:
        "The cheapest checks come first: is the tube fully engaged, has it lost " +
        "vacuum, is the bevel just short of the lumen. One small deliberate " +
        "adjustment is acceptable. Blind probing is not, and vigorous fist " +
        "pumping alters potassium and other results.",
      why: {
        a: "Probing is painful and is a leading cause of nerve and arterial injury.",
        c: "Reinserting without reassessing repeats whatever caused the miss.",
        d: "Fist pumping raises potassium and is discouraged.",
      },
      tip: "Check the tube first — it's free. Then one small adjustment. Never a search.",
      tags: ["failed-draw", "troubleshooting", "probing"],
    },
    {
      id: "com-045",
      subdomain: "Patient distress",
      difficulty: 2,
      stem: "A patient begins hyperventilating from anxiety during a draw. What is the appropriate response?",
      choices: {
        a: "Continue the draw quickly and ignore the breathing",
        b: "Stop, help the patient slow their breathing, keep them seated or reclined, and resume only when they are settled",
        c: "Have the patient breathe into a paper bag",
        d: "Leave the room so the patient can calm down alone",
      },
      correct: "b",
      explanation:
        "The procedure pauses, the patient is coached toward slower breathing, " +
        "and they stay in a safe position in case they become lightheaded. " +
        "Paper-bag rebreathing is no longer recommended, and leaving an " +
        "acutely distressed patient alone is unsafe.",
      why: {
        a: "Continuing while the patient is in distress escalates the episode and risks a sudden movement with a needle in place.",
        c: "Paper-bag rebreathing is outdated advice and can be harmful.",
        d: "The patient may faint; they should not be left unattended.",
      },
      tip: "Stop, coach the breathing, stay with them. Resume only when they're settled.",
      tags: ["hyperventilation", "anxiety", "patient-safety"],
    },
    {
      id: "com-046",
      subdomain: "Bleeding",
      difficulty: 3,
      stem: "Which patient is most likely to bleed for an extended period after a venipuncture?",
      choices: {
        a: "A patient who is well hydrated",
        b: "A patient on anticoagulant therapy or with a low platelet count",
        c: "A patient with a high hematocrit",
        d: "A patient who fasted overnight",
      },
      correct: "b",
      explanation:
        "Anticoagulants and thrombocytopenia both impair the body's ability to " +
        "seal a puncture. Those patients need pressure held longer and the site " +
        "checked before a bandage goes on and before they leave.",
      why: {
        a: "Hydration status does not impair hemostasis.",
        c: "A high hematocrit affects viscosity, not the clotting mechanism.",
        d: "Fasting has no effect on the ability to form a clot.",
      },
      tip: "Anticoagulants and low platelets mean hold longer and check twice before bandaging.",
      tags: ["bleeding", "anticoagulant", "thrombocytopenia"],
    },
    {
      id: "com-047",
      subdomain: "Site problems",
      difficulty: 2,
      stem: "A patient's arm shows visible bruising across the entire antecubital area from a draw yesterday. What should the phlebotomist do?",
      choices: {
        a: "Draw through the bruise, since the vein underneath is known to work",
        b: "Select an unaffected site above the bruise or use the other arm",
        c: "Warm the bruise before drawing to disperse the blood",
        d: "Apply the tourniquet directly over the bruise to compress it",
      },
      correct: "b",
      explanation:
        "Bruised tissue is painful, and blood pooled outside the vessels " +
        "contaminates the specimen. An unaffected site is chosen — above the " +
        "bruise or on the other arm — which also avoids adding a second insult " +
        "to already-injured tissue.",
      why: {
        a: "The vein may be usable, but the surrounding pooled blood compromises the specimen.",
        c: "Warming does not clear an established bruise and delays the draw pointlessly.",
        d: "A tourniquet over bruised tissue is painful and can extend the injury.",
      },
      tip: "Above the bruise or the other arm. Never through it.",
      tags: ["bruising", "site-selection", "specimen-quality"],
    },
    {
      id: "com-048",
      subdomain: "Emergency response",
      difficulty: 3,
      stem: "A patient in the outpatient waiting area collapses and is unresponsive. What is the phlebotomist's role?",
      choices: {
        a: "Attempt to draw blood for a stat panel",
        b: "Activate the facility's emergency response, stay with the patient, and provide care within their training and scope",
        c: "Move the patient to a drawing chair",
        d: "Wait for a family member to arrive",
      },
      correct: "b",
      explanation:
        "The emergency response system is activated first, the patient is not " +
        "left, and the phlebotomist acts within what they are trained and " +
        "certified to do. Moving a collapsed patient risks worsening an unknown " +
        "injury.",
      why: {
        a: "No specimen is collected from a collapsed patient without an order and a clinical team present.",
        c: "Moving an unresponsive patient can aggravate a spinal or other injury.",
        d: "Waiting for family delays emergency care.",
      },
      tip: "Activate, stay, act within scope. Don't move them and don't wait.",
      tags: ["emergency", "collapse", "scope-of-practice"],
    },
    {
      id: "com-049",
      subdomain: "Hemolysis",
      difficulty: 3,
      stem: "A laboratory reports a hemolyzed specimen and asks for a recollection. Which change is most likely to help?",
      choices: {
        a: "Use a smaller gauge needle to slow the flow",
        b: "Avoid a needle that is too fine, minimize tourniquet time, let alcohol dry, and mix gently rather than shaking",
        c: "Fill tubes only halfway",
        d: "Warm the specimen before transport",
      },
      correct: "b",
      explanation:
        "Hemolysis is usually created during collection, and the fixes are " +
        "collection fixes: adequate needle bore, short tourniquet time, dry " +
        "alcohol before puncture, no forced syringe transfer, and gentle " +
        "inversions. Reviewing all of them beats changing one thing at random.",
      why: {
        a: "A finer needle increases shear stress on red cells and makes hemolysis more likely.",
        c: "Underfilling causes ratio errors and does not prevent cell rupture.",
        d: "Warming does not repair hemolysis and can degrade other analytes.",
      },
      tip: "Hemolysis is made at the bedside. Bore, tourniquet time, dry alcohol, gentle mixing.",
      tags: ["hemolysis", "prevention", "collection-technique"],
    },
    {
      id: "com-050",
      subdomain: "Patient distress",
      difficulty: 2,
      stem: "A patient vomits during a draw. What should the phlebotomist do first?",
      choices: {
        a: "Continue the draw and offer a tissue",
        b: "Stop the procedure, remove the needle safely, position the patient to protect their airway, and get help",
        c: "Ask the patient to hold still until the tube fills",
        d: "Leave the room to fetch cleaning supplies",
      },
      correct: "b",
      explanation:
        "The needle comes out safely, and the patient is positioned so they " +
        "cannot aspirate — turned to the side or leaned forward. Then help is " +
        "summoned and the patient stays supervised, since vomiting may precede " +
        "a faint.",
      why: {
        a: "Continuing risks a sudden movement with a needle in the vein and ignores the airway.",
        c: "Asking a vomiting patient to stay still is neither realistic nor safe.",
        d: "Cleanup can wait; the patient cannot be left unattended.",
      },
      tip: "Needle out, airway protected, stay with them. Cleanup is the last concern.",
      tags: ["vomiting", "airway", "emergency"],
    },
    {
      id: "com-051",
      subdomain: "Failed draws",
      difficulty: 3,
      stem: "Which explanation for a failed draw indicates the needle went completely through the vein?",
      choices: {
        a: "A flash of blood followed by a rapidly forming swelling at the site",
        b: "No flash of blood at any point",
        c: "Blood flowing briskly and then stopping when the tube is changed",
        d: "The tube filling very slowly but completely",
      },
      correct: "a",
      explanation:
        "A flash confirms the bevel entered the lumen, and a swelling that " +
        "follows means blood is now leaking from both walls into the tissue — " +
        "the signature of a through-and-through puncture. The needle is " +
        "withdrawn and pressure applied.",
      why: {
        b: "No flash at all suggests the vein was never entered.",
        c: "Flow stopping at a tube change suggests the needle shifted position or the tube lost vacuum.",
        d: "Slow but complete filling points to a small vein or partial occlusion, not a through puncture.",
      },
      tip: "Flash then swelling = you went through. Out and pressure, don't chase it.",
      tags: ["through-and-through", "hematoma", "troubleshooting"],
    },
    {
      id: "com-052",
      subdomain: "Documentation",
      difficulty: 2,
      stem: "How should an adverse event during a draw be documented?",
      choices: {
        a: "Factually and objectively, describing what was observed and what was done",
        b: "With an assessment of who was at fault",
        c: "Only if the patient asks for it to be recorded",
        d: "Verbally to a colleague, with no written record",
      },
      correct: "a",
      explanation:
        "Documentation records observations and actions: what the patient " +
        "reported, what was seen, what was done, and when. Speculation about " +
        "cause or fault does not belong in it, and the record exists whether or " +
        "not the patient asks for one.",
      why: {
        b: "Attributing fault is not the collector's role and undermines the record's objectivity.",
        c: "The obligation to document does not depend on a patient's request.",
        d: "A verbal mention leaves no record for follow-up or review.",
      },
      tip: "What you saw, what you did, when. No opinions, no blame, no gaps.",
      tags: ["documentation", "incident-reporting", "professionalism"],
    },
    {
      id: "com-053",
      subdomain: "Site problems",
      difficulty: 3,
      stem: "Why is repeated venipuncture at the same site over time a problem?",
      choices: {
        a: "It permanently changes the patient's blood type",
        b: "It leads to scarring and sclerosis, making the vein progressively harder to use",
        c: "It causes the vein to enlarge and become easier to access",
        d: "It has no long-term effect",
      },
      correct: "b",
      explanation:
        "Repeated punctures at one spot produce scar tissue and sclerosis, and " +
        "the vessel gradually becomes hard, narrow, and difficult to enter. " +
        "Rotating sites preserves access for patients who need frequent draws — " +
        "which is exactly the population most at risk.",
      why: {
        a: "Blood type is genetically determined and unaffected by venipuncture.",
        c: "Repeated trauma hardens and narrows a vein rather than improving it.",
        d: "The cumulative effect is well recognized in frequently-drawn patients.",
      },
      tip: "Rotate sites. The patient who is drawn daily is the one whose veins you must protect.",
      tags: ["sclerosis", "repeated-punctures", "site-rotation"],
    },
    {
      id: "com-054",
      subdomain: "Emergency response",
      difficulty: 3,
      stem: "A patient reports chest pain and shortness of breath while seated for a draw. What is the correct action?",
      choices: {
        a: "Complete the draw quickly so the specimen is available for the workup",
        b: "Stop, activate the emergency response, stay with the patient, and report exactly what they said",
        c: "Have the patient walk to the emergency department",
        d: "Give the patient water and continue",
      },
      correct: "b",
      explanation:
        "Chest pain with shortness of breath is a potential emergency, not a " +
        "reason to hurry a specimen. The draw stops, the emergency response is " +
        "activated, and the patient is not left alone or asked to walk anywhere.",
      why: {
        a: "Prioritizing a specimen over an evolving emergency inverts the priority entirely.",
        c: "Sending a patient with possible cardiac symptoms to walk unaccompanied is unsafe.",
        d: "Fluids and continuing the draw delay recognition of a potentially serious event.",
      },
      tip: "Chest pain and breathlessness outrank any specimen. Stop, call, stay.",
      tags: ["emergency", "chest-pain", "patient-safety"],
    },
  ],
);

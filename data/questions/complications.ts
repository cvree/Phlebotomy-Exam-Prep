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
        "recognises that a second operator often succeeds where the first " +
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
  ],
);

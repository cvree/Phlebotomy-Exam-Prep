import { buildQuestions } from "./authoring";
import {
  SRC_CLSI_GP41,
  SRC_CLSI_GP42,
  SRC_TEXTBOOK_CURRICULUM,
} from "@/data/sources";

export const TECHNIQUE_QUESTIONS = buildQuestions(
  {
    domain: "venipuncture-technique",
    certifications: ["nha-cpt"],
    sources: [SRC_CLSI_GP41, SRC_TEXTBOOK_CURRICULUM],
    reviewStatus: "needs-review",
  },
  [
    {
      id: "tec-001",
      subdomain: "Tourniquet",
      difficulty: 2,
      stem: "What is the maximum recommended time a tourniquet should remain applied before the draw?",
      choices: {
        a: "About 30 seconds",
        b: "About 1 minute",
        c: "About 3 minutes",
        d: "About 5 minutes",
      },
      correct: "b",
      explanation:
        "One minute is the usual limit. Beyond that, hemoconcentration " +
        "begins to distort protein-bound analytes, potassium, lactate, and " +
        "cell counts. If you need longer to find a vein, release the " +
        "tourniquet, let the arm recover for a couple of minutes, then " +
        "reapply.",
      why: {
        a: "Thirty seconds is often enough in practice, but it is not the stated limit.",
        c: "Three minutes produces measurable hemoconcentration.",
        d: "Five minutes is well past the point of clinically significant distortion.",
      },
      tip: "One minute. If the search takes longer, release and reapply — do not keep hunting under pressure.",
      tags: ["tourniquet", "hemoconcentration"],
    },
    {
      id: "tec-002",
      subdomain: "Needle insertion",
      difficulty: 2,
      stem: "At approximately what angle should the needle enter the skin for a routine antecubital venipuncture?",
      choices: {
        a: "5 degrees or less",
        b: "15 to 30 degrees",
        c: "45 degrees",
        d: "90 degrees",
      },
      correct: "b",
      explanation:
        "A shallow angle of roughly 15 to 30 degrees follows the path of a " +
        "superficial vein. Too steep and the needle passes straight through " +
        "the far wall into deeper tissue; too shallow and it slides along " +
        "under the skin without entering the lumen. The bevel faces up.",
      why: {
        a: "Under about 15 degrees the needle tends to track along the skin rather than into the vein.",
        c: "Forty-five degrees is steep enough to risk going through the vein.",
        d: "Ninety degrees is a dermal puncture angle, not a venipuncture angle.",
      },
      tip: "15–30 degrees, bevel up, in the direction the vein runs.",
      tags: ["needle-angle", "insertion"],
    },
    {
      id: "tec-003",
      subdomain: "Equipment",
      difficulty: 2,
      stem: "Which needle gauge is most commonly used for routine adult venipuncture with an evacuated tube system?",
      choices: {
        a: "16 gauge",
        b: "21 to 22 gauge",
        c: "25 gauge",
        d: "27 gauge",
      },
      correct: "b",
      explanation:
        "Routine adult draws typically use 21 or 22 gauge. Remember that " +
        "gauge runs backwards: a larger number means a narrower needle. Too " +
        "narrow and red cells are damaged as they squeeze through, producing " +
        "hemolysis; too wide and the puncture is unnecessarily traumatic.",
      why: {
        a: "Sixteen gauge is a large-bore needle used for donation and infusion, not routine draws.",
        c: "Twenty-five gauge is generally too narrow and increases hemolysis risk.",
        d: "Twenty-seven gauge is an injection needle, not a blood collection needle.",
      },
      tip: "Bigger number, smaller bore. Too small a bore shears red cells and hemolyses the specimen.",
      tags: ["needle-gauge", "equipment", "hemolysis"],
    },
    {
      id: "tec-004",
      subdomain: "Site preparation",
      difficulty: 2,
      stem: "After cleaning the site with 70% isopropyl alcohol, what should the phlebotomist do next?",
      choices: {
        a: "Wipe the site dry with sterile gauze to save time",
        b: "Allow the alcohol to air dry completely",
        c: "Fan the site with the hand to speed drying",
        d: "Insert the needle immediately while the site is still wet",
      },
      correct: "b",
      explanation:
        "Alcohol needs to air dry to do its job — the antiseptic action " +
        "happens during evaporation. Drying also prevents two practical " +
        "problems: a stinging sensation for the patient as alcohol is carried " +
        "into the puncture, and hemolysis of the specimen from alcohol " +
        "contamination.",
      why: {
        a: "Wiping recontaminates the site and cuts the contact time short.",
        c: "Fanning with the hand blows skin flora back onto the prepared site.",
        d: "Wet alcohol stings and can hemolyse the sample.",
      },
      tip: "Let it dry. Wiping, fanning, and blowing all defeat the antisepsis.",
      tags: ["antisepsis", "alcohol", "hemolysis"],
    },
    {
      id: "tec-005",
      subdomain: "Equipment",
      difficulty: 3,
      stem: "A winged infusion (butterfly) set is being used, and the first tube to be filled is a light blue sodium citrate tube. What should be done first?",
      choices: {
        a: "Draw the citrate tube first; the tubing volume is negligible",
        b: "Draw a discard tube first to fill the tubing's dead space",
        c: "Draw an EDTA tube first, then the citrate tube",
        d: "Fill the citrate tube only halfway and note it on the label",
      },
      correct: "b",
      explanation:
        "The tubing of a winged set holds air. If the citrate tube is drawn " +
        "first, that air consumes part of the tube's vacuum and the tube " +
        "under-fills, breaking the 9:1 blood-to-citrate ratio the coagulation " +
        "test depends on. A discard tube — non-additive, or another citrate " +
        "tube per policy — is drawn first purely to clear the dead space, and " +
        "it is discarded.",
      why: {
        a: "The dead space is small in absolute terms but significant relative to a citrate tube's fill.",
        c: "Drawing EDTA before citrate introduces exactly the carryover the order of draw exists to prevent.",
        d: "A short-filled citrate tube is a rejection criterion, not something to annotate.",
      },
      tip: "Butterfly plus citrate first means a discard tube. The discard is thrown away — it exists only to fill the tubing.",
      tags: ["butterfly", "discard-tube", "citrate"],
    },
    {
      id: "tec-006",
      subdomain: "Dermal puncture",
      difficulty: 3,
      stem: "During a dermal puncture, what should be done with the first drop of blood?",
      choices: {
        a: "Collect it, since it is the freshest sample",
        b: "Wipe it away with clean gauze",
        c: "Use it for the glucose test only",
        d: "Return it to the site by releasing pressure",
      },
      correct: "b",
      explanation:
        "The first drop is contaminated with tissue fluid from the puncture " +
        "and with any residual alcohol, both of which distort results. Wipe " +
        "it away and collect from the drops that follow, allowing them to " +
        "form freely rather than milking the site.",
      why: {
        a: "Freshness is not the issue; tissue fluid and alcohol contamination are.",
        c: "Glucose is among the analytes most affected by tissue fluid dilution.",
        d: "This is not a possible action.",
      },
      tip: "Wipe the first drop. Then let drops form on their own — squeezing adds tissue fluid and hemolyses the sample.",
      tags: ["dermal-puncture", "capillary"],
      sources: [SRC_CLSI_GP42, SRC_TEXTBOOK_CURRICULUM],
    },
    {
      id: "tec-007",
      subdomain: "Dermal puncture",
      difficulty: 2,
      stem: "Which site is appropriate for a heel stick on an infant under one year old?",
      choices: {
        a: "The center of the heel",
        b: "The medial or lateral plantar surface of the heel",
        c: "The posterior curvature of the heel",
        d: "The great toe",
      },
      correct: "b",
      explanation:
        "The medial and lateral plantar surfaces are used because the " +
        "calcaneus — the heel bone — sits shallowly beneath the central and " +
        "posterior heel. Puncturing over the bone risks osteochondritis and " +
        "osteomyelitis. Puncture depth is also limited for the same reason.",
      why: {
        a: "The center of the heel sits directly over the calcaneus.",
        c: "The posterior curvature carries the highest risk of striking bone.",
        d: "Toes are not used for routine infant collection.",
      },
      tip: "Stay to the sides of the heel. The bone is closer to the surface than it looks.",
      tags: ["heel-stick", "pediatric", "dermal-puncture"],
      sources: [SRC_CLSI_GP42, SRC_TEXTBOOK_CURRICULUM],
    },
    {
      id: "tec-008",
      subdomain: "Failed draw",
      difficulty: 2,
      stem: "The tube begins filling and then stops while the needle is still in the arm. What is the most appropriate first adjustment?",
      choices: {
        a: "Withdraw the needle and try the other arm immediately",
        b: "Probe laterally with the needle until flow resumes",
        c: "Try a fresh tube, then make a slight adjustment to needle depth or angle",
        d: "Ask the patient to pump their fist vigorously",
      },
      correct: "c",
      explanation:
        "A tube that stops mid-fill usually means a failed vacuum, a vein " +
        "wall against the bevel, or a valve. Changing the tube tests the " +
        "cheapest hypothesis first. If that does not work, a slight, " +
        "controlled change of depth or angle may reseat the bevel. Two " +
        "attempts is the customary limit before handing off.",
      why: {
        a: "A second stick is warranted eventually, but not before the simple corrections have been tried.",
        b: "Lateral probing is painful and is a recognized mechanism of nerve injury.",
        d: "Vigorous fist pumping raises potassium and is not recommended.",
      },
      tip: "New tube, then small adjustment. Never probe sideways — that is how nerves get hit.",
      tags: ["failed-draw", "troubleshooting"],
    },
    {
      id: "tec-009",
      subdomain: "Tourniquet",
      difficulty: 2,
      stem: "How far above the intended puncture site should the tourniquet be applied?",
      choices: {
        a: "1 to 2 inches",
        b: "3 to 4 inches",
        c: "6 to 8 inches",
        d: "Directly over the site",
      },
      correct: "b",
      explanation:
        "Three to four inches — roughly a hand's width — above the site. " +
        "Closer than that and the tourniquet interferes with the draw and " +
        "with anchoring the vein; much further and the venous distension at " +
        "the site is inadequate.",
      why: {
        a: "Too close: it gets in the way and distorts the site.",
        c: "Too far: distension at the puncture site suffers.",
        d: "Never over the site.",
      },
      tip: "About a hand's width above the site.",
      tags: ["tourniquet", "technique"],
    },
    {
      id: "tec-010",
      subdomain: "Post-draw",
      difficulty: 2,
      stem: "After the needle is withdrawn, what is the correct way to achieve hemostasis?",
      choices: {
        a: "Have the patient bend the elbow tightly and hold it for a minute",
        b: "Apply direct pressure with gauze, keeping the arm straight or slightly elevated",
        c: "Apply a bandage immediately without pressure",
        d: "Have the patient massage the site to disperse the blood",
      },
      correct: "b",
      explanation:
        "Direct pressure over the site with the arm straight or slightly " +
        "elevated is what stops the bleeding. Bending the elbow is a " +
        "widespread habit that actually increases hematoma formation, because " +
        "it does not apply pressure directly over the puncture in the vein " +
        "wall — which sits deeper and slightly proximal to the skin entry.",
      why: {
        a: "Elbow flexion is associated with more hematomas, not fewer.",
        c: "A bandage without pressure does not stop bleeding from the vein.",
        d: "Massage disrupts the forming clot and causes bruising.",
      },
      tip: "Pressure, straight arm. The skin hole and the vein hole are not in the same place — pressure has to cover both.",
      tags: ["hemostasis", "hematoma", "post-draw"],
    },
    {
      id: "tec-011",
      subdomain: "Equipment",
      difficulty: 3,
      stem: "A syringe draw is performed and blood must be transferred into evacuated tubes. What is the correct method?",
      choices: {
        a: "Remove the tube stoppers and pour the blood in",
        b: "Push the plunger to force blood through the needle into each tube",
        c: "Use a syringe transfer device, letting each tube's vacuum draw the blood in",
        d: "Attach a new needle and puncture each stopper, holding the tube in the hand",
      },
      correct: "c",
      explanation:
        "A syringe transfer device holds the tube safely and lets its own " +
        "vacuum pull the correct volume. Every alternative involves either " +
        "an exposed needle held near the hand or manual force on the plunger, " +
        "and both are recognized causes of needlestick injury and hemolysis. " +
        "Order of draw still applies during the transfer.",
      why: {
        a: "Uncapping tubes aerosolises blood and destroys the vacuum that measures the fill volume.",
        b: "Forcing blood through a needle shears red cells and hemolyses the specimen.",
        d: "Holding a tube while puncturing its stopper by hand is one of the highest-risk manoeuvres in the lab.",
      },
      tip: "Transfer device, never hand-held. Let the vacuum do the work — pushing the plunger hemolyses.",
      tags: ["syringe", "transfer-device", "sharps"],
    },
    {
      id: "tec-012",
      subdomain: "Equipment",
      difficulty: 2,
      stem: "A patient has small, fragile-looking veins on the back of the hand, and no antecubital vein is usable. Which needle gauge is the most appropriate choice?",
      choices: {
        a: "18 gauge, to maximize flow rate",
        b: "20 gauge, the same as a standard antecubital draw",
        c: "23 gauge, on a winged infusion set",
        d: "25 gauge, on a standard straight needle holder",
      },
      correct: "c",
      explanation:
        "Small or fragile veins call for a narrower needle to reduce the " +
        "chance of blowing the vein, and a winged set gives the flexibility " +
        "and shallow angle of approach that hand veins need. Twenty-three " +
        "gauge is the standard choice for this combination.",
      why: {
        a: "An 18 gauge needle is far too large-bore for a small hand vein and risks collapsing it.",
        b: "Twenty gauge is oversized for a fragile hand vein and increases the risk of a failed draw.",
        d: "Twenty-five gauge is narrower than what blood collection sets are designed around and is more suited to injections; it also ignores the flexibility a winged set provides for a hand site.",
      },
      tip: "Small, fragile, or hand veins: think 23-gauge butterfly.",
      tags: ["needle-gauge", "butterfly", "equipment"],
    },
    {
      id: "tec-013",
      subdomain: "Equipment",
      difficulty: 2,
      stem: "An elderly patient has veins that feel unusually soft and prone to collapsing under vacuum pressure. Which collection method gives the phlebotomist the most control over draw pressure?",
      choices: {
        a: "A standard evacuated tube system with a 21 gauge needle",
        b: "A syringe with a needle, drawing back manually and slowly",
        c: "A winged set connected directly to the largest available tube",
        d: "An evacuated tube system using the smallest available tube first",
      },
      correct: "b",
      explanation:
        "A syringe lets the phlebotomist control the rate and force of " +
        "aspiration by hand, rather than exposing the vein to the fixed, " +
        "sometimes forceful vacuum pull of an evacuated tube. This makes it " +
        "the preferred option for veins that are unpredictable or that " +
        "collapse easily.",
      why: {
        a: "The fixed vacuum pull of the evacuated tube system is exactly what tends to collapse a fragile vein.",
        c: "Connecting a winged set to a large tube still exposes the vein to that tube's full, uncontrolled vacuum draw.",
        d: "A smaller tube reduces vacuum somewhat but still pulls at a fixed rate the phlebotomist cannot moderate.",
      },
      tip: "Unpredictable, collapsing veins: a syringe hands control back to the phlebotomist's own hand.",
      tags: ["syringe", "equipment", "geriatric"],
    },
    {
      id: "tec-014",
      subdomain: "Tourniquet",
      difficulty: 1,
      stem: "Where should the tourniquet be positioned relative to the intended venipuncture site?",
      choices: {
        a: "Directly over the site so it can be felt through the tourniquet",
        b: "About 3 to 4 inches above the site",
        c: "At the wrist, regardless of where the site is",
        d: "Anywhere on the upper arm, since exact placement does not matter",
      },
      correct: "b",
      explanation:
        "The tourniquet is placed roughly three to four inches above the " +
        "chosen site, about a hand's width. This distends the vein enough " +
        "to be palpated and entered without crowding the workspace needed " +
        "to clean, anchor, and puncture the site.",
      why: {
        a: "Placement directly over the site interferes with cleaning and puncturing it.",
        c: "A fixed wrist placement ignores where the actual puncture site is, which may be far from the wrist.",
        d: "Placement does matter: too close crowds the site, and too far reduces venous distension there.",
      },
      tip: "About a hand's width above the site — close enough to distend the vein, far enough to stay out of the way.",
      tags: ["tourniquet", "site-selection"],
    },
    {
      id: "tec-015",
      subdomain: "Site preparation",
      difficulty: 2,
      stem: "What is the correct technique for cleansing a venipuncture site with a 70% isopropyl alcohol pad?",
      choices: {
        a: "Scrub back and forth vigorously over the entire antecubital area",
        b: "Wipe in a single direction, away from the site, in one pass",
        c: "Cleanse in a circular motion starting at the site and moving outward",
        d: "Dab the center of the site once and move directly to puncture",
      },
      correct: "c",
      explanation:
        "The site is cleansed starting at the center and spiraling outward " +
        "in a circular motion, which pushes surface flora away from the " +
        "puncture point rather than dragging it back across the site. The " +
        "alcohol is then allowed to air dry before the needle goes in.",
      why: {
        a: "Back-and-forth scrubbing can drag skin flora back across the area meant to be cleaned.",
        b: "A single straight wipe does not adequately cover or disinfect the full site area.",
        d: "A single dab does not provide the contact time or coverage needed for effective antisepsis.",
      },
      tip: "Center outward, in a circle, like a target — never back toward the middle.",
      tags: ["antisepsis", "alcohol", "site-preparation"],
    },
    {
      id: "tec-016",
      subdomain: "Site preparation",
      difficulty: 2,
      stem: "A blood culture collection is ordered. Why is 70% isopropyl alcohol alone not considered adequate for this site preparation?",
      choices: {
        a: "Alcohol takes too long to air dry compared to other antiseptics",
        b: "Alcohol does not sufficiently reduce skin flora for a sample that must remain sterile",
        c: "Alcohol reacts chemically with the culture bottle's growth medium",
        d: "Alcohol is only approved for use on pediatric patients",
      },
      correct: "b",
      explanation:
        "Blood cultures must be free of skin bacteria, since any contaminant " +
        "introduced during the draw can grow in the bottle and produce a " +
        "false-positive result. A stronger antiseptic, such as chlorhexidine " +
        "gluconate or tincture of iodine, is used for a more thorough kill of " +
        "skin flora before culture collection.",
      why: {
        a: "Drying time is not the reason a stronger antiseptic is required; the concern is antimicrobial adequacy.",
        c: "Alcohol has no chemical reaction with culture media; the issue is skin flora surviving on the site.",
        d: "Alcohol's approved use is not limited to pediatric patients, and this is not the reason it is insufficient here.",
      },
      tip: "Blood cultures need sterile-level skin prep — chlorhexidine or iodine, not alcohol alone.",
      tags: ["blood-culture", "antisepsis", "chlorhexidine"],
    },
    {
      id: "tec-017",
      subdomain: "Site preparation",
      difficulty: 3,
      stem: "A blood culture is ordered on a 5-week-old infant. The facility's default blood culture prep uses chlorhexidine gluconate. What should the phlebotomist do?",
      choices: {
        a: "Use chlorhexidine gluconate as usual; the age restriction only applies to premature infants",
        b: "Use an age-appropriate alternative antiseptic, since chlorhexidine is not recommended under 2 months of age",
        c: "Skip antisepsis entirely for infants and proceed directly to the draw",
        d: "Use 70% isopropyl alcohol alone, since it is gentler on infant skin",
      },
      correct: "b",
      explanation:
        "Chlorhexidine gluconate carries a caution against use in infants " +
        "younger than 2 months due to reports of skin irritation and " +
        "absorption concerns, so facilities use an approved alternative, " +
        "such as povidone-iodine, for this age group's blood culture prep.",
      why: {
        a: "The commonly cited caution applies to infants under 2 months generally, not only to premature infants.",
        c: "Skipping antisepsis on a blood culture site would risk contaminating the culture with skin flora.",
        d: "Alcohol alone does not provide the antimicrobial strength a blood culture requires, regardless of patient age.",
      },
      tip: "Under 2 months, skip the chlorhexidine — use the facility's approved alternative instead.",
      tags: ["blood-culture", "chlorhexidine", "pediatric"],
    },
    {
      id: "tec-018",
      subdomain: "Needle insertion",
      difficulty: 1,
      stem: "Why is the needle bevel oriented upward during a routine venipuncture?",
      choices: {
        a: "It allows a cleaner entry into the vein and a smoother, less traumatic puncture",
        b: "It is required so the color-coded needle cap can be reattached afterward",
        c: "It increases the speed at which the tube fills",
        d: "It prevents the tourniquet from loosening during the draw",
      },
      correct: "a",
      explanation:
        "A bevel-up orientation presents the sharpest point and edge to the " +
        "vein wall first, giving a cleaner entry with less tissue trauma and " +
        "a lower chance of the bevel catching against the far wall of the " +
        "vein as it enters.",
      why: {
        b: "Cap reattachment is not part of routine practice and has nothing to do with bevel orientation.",
        c: "Bevel orientation affects the quality of entry, not the fill rate once the needle is in the lumen.",
        d: "Bevel orientation and tourniquet tension are unrelated.",
      },
      tip: "Bevel up, always — it is what makes the entry clean rather than tearing.",
      tags: ["needle-angle", "bevel", "insertion"],
    },
    {
      id: "tec-019",
      subdomain: "Needle insertion",
      difficulty: 2,
      stem: "Just before inserting the needle, the phlebotomist places a thumb below the intended puncture site and pulls the skin taut. What is the purpose of this step?",
      choices: {
        a: "To numb the area before the needle enters",
        b: "To anchor the vein and keep it from rolling out of the needle's path",
        c: "To warm the site and improve venous distension",
        d: "To check the patient's pulse before proceeding",
      },
      correct: "b",
      explanation:
        "Superficial veins can shift sideways under the pressure of the " +
        "needle tip if they are not held in place. Anchoring below the site " +
        "with the thumb, while pulling the skin taut, stabilizes the vein so " +
        "the needle enters the lumen instead of pushing the vein aside.",
      why: {
        a: "Traction on the skin has no anesthetic effect.",
        c: "Warming the site is a separate technique used before the tourniquet is applied, not part of the anchoring step.",
        d: "Checking a pulse is not part of routine venipuncture and is not the purpose of anchoring.",
      },
      tip: "Anchor below the site and pull taut — a rolling vein is the most common reason for a missed stick.",
      tags: ["anchoring", "insertion", "technique"],
    },
    {
      id: "tec-020",
      subdomain: "Equipment",
      difficulty: 2,
      stem: "Before approaching the patient for an evacuated tube system draw, what should the phlebotomist do while assembling supplies?",
      choices: {
        a: "Assemble the needle and holder, and check that tube expiration dates have not passed",
        b: "Pre-label every tube with the patient's information before confirming patient identity",
        c: "Remove the needle's protective cap in advance to save a step at the bedside",
        d: "Puncture the stopper of each tube slightly to verify the vacuum is intact",
      },
      correct: "a",
      explanation:
        "Assembly and setup happens before the patient encounter begins: the " +
        "needle is threaded into the holder and the tubes to be used are " +
        "checked for expiration, since an expired tube can have degraded or " +
        "insufficient vacuum. Labeling still happens only after the draw and " +
        "in the patient's presence, following two-identifier confirmation.",
      why: {
        b: "Labels are applied after the draw, at the patient's side, only once identity has been confirmed with two identifiers.",
        c: "Uncapping the needle early exposes a sharp unnecessarily and creates a needlestick risk before it is needed.",
        d: "Pre-puncturing a stopper destroys the very vacuum that draw depends on.",
      },
      tip: "Assemble and check expiration dates before the patient encounter; label only after the draw, at the bedside.",
      tags: ["equipment", "setup", "workflow"],
    },
    {
      id: "tec-021",
      subdomain: "Dermal puncture",
      difficulty: 2,
      stem: "Which site is appropriate for a fingerstick capillary puncture on an adult?",
      choices: {
        a: "The very center of the fingertip pad",
        b: "The lateral or medial palmar surface of the fingertip",
        c: "Directly over or beside the nail bed",
        d: "The tip of the thumb",
      },
      correct: "b",
      explanation:
        "The lateral or medial surface of the third or fourth fingertip is " +
        "used because it has adequate tissue depth over the bone and avoids " +
        "major nerves and blood vessels that run more centrally. The center " +
        "of the pad and the area near the nail bed are both avoided.",
      why: {
        a: "The center of the fingertip has less tissue depth over bone and carries more nerve endings, making it more painful and riskier.",
        c: "Puncturing near the nail bed risks nerve and bone injury and is specifically avoided.",
        d: "The thumb and fifth finger are generally avoided; the third or fourth finger is preferred.",
      },
      tip: "Sides of the fingertip, not the center, and never near the nail.",
      tags: ["dermal-puncture", "site-selection", "fingerstick"],
    },
    {
      id: "tec-022",
      subdomain: "Dermal puncture",
      difficulty: 2,
      stem: "What is the maximum recommended puncture depth for a heel stick performed with a standard neonatal lancet?",
      choices: {
        a: "Under 2.0 millimeters",
        b: "About 4.0 millimeters",
        c: "About 6.0 millimeters",
        d: "Depth is not a concern as long as the site is on the plantar surface",
      },
      correct: "a",
      explanation:
        "Neonatal heel-stick lancets are designed to limit puncture depth to " +
        "under 2.0 millimeters. Because the calcaneus lies close to the skin " +
        "surface in an infant's heel, a deeper puncture risks striking bone " +
        "and causing osteochondritis or osteomyelitis.",
      why: {
        b: "Four millimeters exceeds the safe depth limit and risks contact with the calcaneus.",
        c: "Six millimeters is well beyond a safe puncture depth for an infant heel.",
        d: "Depth still matters even on the correct plantar surface, since the bone lies close beneath the skin.",
      },
      tip: "Under 2.0 mm on a heel stick — the bone is closer than it looks in a newborn's heel.",
      tags: ["heel-stick", "pediatric", "depth"],
      sources: [SRC_CLSI_GP42, SRC_TEXTBOOK_CURRICULUM],
    },
    {
      id: "tec-023",
      subdomain: "Dermal puncture",
      difficulty: 3,
      stem: "For a capillary draw requiring both an EDTA tube for a CBC and a serum tube for chemistry, which tube should generally be filled first?",
      choices: {
        a: "The serum tube, following the same order used for venous draws",
        b: "The EDTA tube, because capillary blood begins clotting quickly in a small, slow-flowing sample",
        c: "Either tube, since order of draw does not apply to capillary collection",
        d: "Whichever tube has the larger opening, to fill it before flow slows",
      },
      correct: "b",
      explanation:
        "Capillary blood flows slowly and in small volumes, so it begins to " +
        "clot and platelets begin to aggregate faster than in a venous draw. " +
        "The EDTA (hematology) tube is therefore collected earlier in the " +
        "capillary sequence than the standard venous order of draw would " +
        "suggest, to get an unclotted sample before flow diminishes further.",
      why: {
        a: "The standard venous order of draw places serum tubes before EDTA, but capillary collection reverses this because of how quickly a slow, small sample clots.",
        c: "Order of draw still matters for capillary collection; it is simply adjusted for the way the sample behaves.",
        d: "Tube opening size is not the deciding factor; the risk of clotting in a slow capillary flow is.",
      },
      tip: "Capillary draws often flip the order: EDTA earlier, because a slow trickle of blood clots fast.",
      tags: ["dermal-puncture", "order-of-draw", "capillary"],
      sources: [SRC_CLSI_GP42, SRC_TEXTBOOK_CURRICULUM],
    },
    {
      id: "tec-024",
      subdomain: "Dermal puncture",
      difficulty: 2,
      stem: "During a capillary collection, blood flow slows and the phlebotomist is tempted to squeeze the site firmly to keep the drops coming. Why is this discouraged?",
      choices: {
        a: "It is discouraged only because it slows down the collection process",
        b: "It dilutes the sample with tissue fluid and can hemolyze the specimen",
        c: "It causes the site to clot faster than it otherwise would",
        d: "It is discouraged only because it is uncomfortable for the patient",
      },
      correct: "b",
      explanation:
        "Firm squeezing, or milking, forces tissue fluid into the blood " +
        "drop, diluting analytes and skewing results, and the mechanical " +
        "trauma to the tissue can also hemolyze red cells. A gentle, " +
        "intermittent pressure that allows the site to refill naturally is " +
        "preferred over continuous squeezing.",
      why: {
        a: "The concern is specimen quality, not simply the time it takes to collect.",
        c: "Squeezing does not accelerate clotting; the concern is dilution and hemolysis, not clot timing.",
        d: "Patient discomfort is a secondary concern; the primary reason to avoid milking is specimen integrity.",
      },
      tip: "Milking dilutes with tissue fluid and hemolyses the sample — gentle intermittent pressure only.",
      tags: ["dermal-puncture", "milking", "hemolysis"],
    },
    {
      id: "tec-025",
      subdomain: "Equipment",
      difficulty: 3,
      stem: "During a multi-tube evacuated tube system draw, how should the phlebotomist hold the needle holder while switching tubes?",
      choices: {
        a: "Brace the holder against the arm and avoid pushing in or pulling back on the needle as tubes are exchanged",
        b: "Let the holder hang freely from the needle so the patient's arm supports its weight",
        c: "Pull the holder slightly outward with each tube change to relieve vacuum pressure",
        d: "Push the holder slightly inward with each tube change to ensure full needle depth",
      },
      correct: "a",
      explanation:
        "Bracing the holder — often with fingers resting against the " +
        "patient's arm — keeps the needle steady in the vein while a tube is " +
        "removed and the next one is seated. Any push or pull on the needle " +
        "itself during a tube change risks advancing through the vein wall " +
        "or pulling out of the lumen partway, either of which can end the " +
        "draw or cause a hematoma.",
      why: {
        b: "Letting the holder hang unsupported allows its weight and motion to shift the needle position with each tube change.",
        c: "Pulling outward on the holder risks drawing the needle bevel partly out of the vein.",
        d: "Pushing inward risks advancing the needle through the far wall of the vein.",
      },
      tip: "Brace, don't push or pull. The needle stays still — only the tubes move.",
      tags: ["equipment", "multi-tube", "technique"],
    },
    {
      id: "tec-026",
      subdomain: "Needle selection",
      difficulty: 2,
      stem: "Which needle gauge is the usual choice for a routine adult antecubital venipuncture with an evacuated tube system?",
      choices: {
        a: "18 gauge",
        b: "21 gauge",
        c: "25 gauge",
        d: "27 gauge",
      },
      correct: "b",
      explanation:
        "A 21 gauge needle is the routine default: wide enough that blood flows " +
        "without shearing red cells, narrow enough to be comfortable in a " +
        "typical antecubital vein. Smaller veins move to 22 or 23 gauge, usually " +
        "with a winged set.",
      why: {
        a: "18 gauge is a large-bore needle used for donation and therapeutic collection, not routine draws.",
        c: "25 gauge is too narrow for routine venipuncture and raises the risk of hemolysis.",
        d: "27 gauge is a fine injection needle, not a blood collection needle.",
      },
      tip: "Remember gauge runs backwards: the bigger the number, the smaller the bore. 21 is the routine middle ground.",
      tags: ["needle-gauge", "equipment", "venipuncture"],
    },
    {
      id: "tec-027",
      subdomain: "Needle selection",
      difficulty: 3,
      stem: "Why can too small a needle gauge cause hemolysis?",
      choices: {
        a: "The needle is too short to reach the vein",
        b: "Red cells are forced through a narrow lumen under vacuum pressure and rupture",
        c: "Small needles increase the tube's vacuum",
        d: "Small needles cannot be attached to a holder",
      },
      correct: "b",
      explanation:
        "Vacuum pulling blood through a very narrow lumen subjects red cells to " +
        "shear stress, and cells that rupture release potassium and hemoglobin " +
        "into the plasma. The result is a specimen that can be rejected or, " +
        "worse, produce a falsely elevated potassium.",
      why: {
        a: "Length and gauge are independent; a short needle causes a failed stick, not hemolysis.",
        c: "The tube's vacuum is fixed at manufacture and is unaffected by needle choice.",
        d: "Fine needles attach perfectly well; the problem is what happens to the cells passing through them.",
      },
      tip: "Too narrow a bore shears cells. Hemolysis shows up first as a falsely high potassium.",
      tags: ["hemolysis", "needle-gauge", "specimen-quality"],
    },
    {
      id: "tec-028",
      subdomain: "Insertion",
      difficulty: 1,
      stem: "At approximately what angle is the needle inserted for a routine antecubital venipuncture?",
      choices: {
        a: "5 to 10 degrees",
        b: "15 to 30 degrees",
        c: "45 degrees",
        d: "90 degrees",
      },
      correct: "b",
      explanation:
        "A shallow angle of roughly 15 to 30 degrees follows the line of a " +
        "superficial vein, entering the lumen rather than passing through it. " +
        "Steeper angles are the common cause of going straight through the far " +
        "wall.",
      why: {
        a: "Too shallow an angle tends to skim under the skin without entering the vein.",
        c: "Forty-five degrees is steep for a superficial vein and risks a through-and-through puncture.",
        d: "Ninety degrees is the angle of a dermal puncture, not a venipuncture.",
      },
      tip: "Shallow — 15 to 30 degrees, bevel up. Steep angles go through the vein, not into it.",
      tags: ["insertion-angle", "venipuncture", "technique"],
    },
    {
      id: "tec-029",
      subdomain: "Site preparation",
      difficulty: 2,
      stem: "Why must the alcohol be allowed to dry completely before the needle is inserted?",
      choices: {
        a: "Wet alcohol can cause a stinging sensation and can affect specimen quality",
        b: "Wet alcohol makes the vein harder to see",
        c: "Alcohol damages the needle's coating",
        d: "Drying is only a comfort measure with no other effect",
      },
      correct: "a",
      explanation:
        "Alcohol needs its full contact time to work, and it does that while it " +
        "is drying. Puncturing through wet alcohol stings, and alcohol carried " +
        "into the specimen can interfere with results — a particular concern for " +
        "blood alcohol testing, where the site is cleaned with a non-alcohol " +
        "antiseptic instead.",
      why: {
        b: "Visibility is not the reason; antisepsis and specimen integrity are.",
        c: "Alcohol does not degrade the needle.",
        d: "Comfort matters, but the antiseptic action and specimen quality reasons are the substantive ones.",
      },
      tip: "Let it air dry — that's when the alcohol is actually working. Don't fan it, don't blot it.",
      tags: ["site-preparation", "alcohol", "antisepsis"],
    },
    {
      id: "tec-030",
      subdomain: "Site preparation",
      difficulty: 2,
      stem: "In which pattern is the venipuncture site cleaned with alcohol?",
      choices: {
        a: "Back and forth across the site several times",
        b: "In concentric circles moving outward from the intended puncture point",
        c: "In a single downward stroke",
        d: "Only over the visible vein itself",
      },
      correct: "b",
      explanation:
        "Cleaning from the center outward in widening circles moves organisms " +
        "away from the puncture point rather than dragging them back across it. " +
        "The cleaned area is larger than the puncture site so the surrounding " +
        "skin does not recontaminate it.",
      why: {
        a: "Scrubbing back and forth carries organisms from the periphery back over the site.",
        c: "One stroke covers too little area and does not provide friction over the whole field.",
        d: "Cleaning only the vein line leaves contaminated skin immediately adjacent to the puncture.",
      },
      tip: "Center outward, widening circles. Never come back over where you have already cleaned.",
      tags: ["site-preparation", "antisepsis", "technique"],
    },
    {
      id: "tec-031",
      subdomain: "Tourniquet",
      difficulty: 2,
      stem: "How far above the intended puncture site is the tourniquet applied?",
      choices: {
        a: "About 1 inch",
        b: "About 3 to 4 inches",
        c: "About 8 to 10 inches",
        d: "Directly over the site",
      },
      correct: "b",
      explanation:
        "Three to four inches proximal to the site gives enough distance that " +
        "the tourniquet is out of the way of the puncture and the antiseptic " +
        "field, while still being close enough to distend the target vein " +
        "effectively.",
      why: {
        a: "An inch puts the tourniquet in the working field and can contaminate the cleaned site.",
        c: "Too far proximal reduces the distending effect on the target vein.",
        d: "A tourniquet over the site makes the puncture impossible and would be released into it.",
      },
      tip: "Three to four inches up — far enough to be out of your way, close enough to still work.",
      tags: ["tourniquet", "placement", "technique"],
    },
    {
      id: "tec-032",
      subdomain: "Tourniquet",
      difficulty: 3,
      stem: "When during the procedure is the tourniquet normally released?",
      choices: {
        a: "After the needle has been withdrawn and pressure applied",
        b: "As soon as blood flow is established, or within about a minute of application",
        c: "Only after all tubes have been filled, regardless of how long that takes",
        d: "Before the needle is inserted",
      },
      correct: "b",
      explanation:
        "Once blood is flowing the tourniquet has done its job, and releasing it " +
        "early limits hemoconcentration. If the draw is long, it comes off " +
        "within about a minute regardless, and the withdrawal sequence is always " +
        "tourniquet off, then needle out.",
      why: {
        a: "Withdrawing the needle against a still-applied tourniquet raises venous pressure and promotes hematoma.",
        c: "Leaving it on through a long multi-tube draw exceeds the time limit and distorts results.",
        d: "Releasing before insertion collapses the vein you were about to enter.",
      },
      tip: "Tourniquet off before the needle comes out — always. Under a minute total, ideally released once flow starts.",
      tags: ["tourniquet", "hemoconcentration", "sequence"],
    },
    {
      id: "tec-033",
      subdomain: "Equipment",
      difficulty: 2,
      stem: "What is the correct way to transfer blood from a syringe into evacuated tubes?",
      choices: {
        a: "Remove the tube stopper and pour the blood in",
        b: "Use a syringe transfer device, letting the tube's vacuum draw the blood",
        c: "Push the plunger to force blood through the needle into the tube",
        d: "Attach the collection needle to the tube and push",
      },
      correct: "b",
      explanation:
        "A transfer device is attached to the syringe and the tube is pushed " +
        "onto it, letting the vacuum pull the correct volume at its own rate. " +
        "That protects the phlebotomist from the needle and protects the " +
        "specimen from the hemolysis that forced flow produces.",
      why: {
        a: "Uncapping a tube causes aerosols, breaks the vacuum, and destroys the additive-to-blood ratio.",
        c: "Pushing the plunger forces cells through the needle and hemolyzes the specimen.",
        d: "Holding a tube against a needle is a classic needlestick mechanism and defeats the safety design.",
      },
      tip: "Let the vacuum pull. Never push a plunger, never uncap a tube, never hold a tube against a needle.",
      tags: ["syringe", "transfer-device", "safety"],
    },
    {
      id: "tec-034",
      subdomain: "Equipment",
      difficulty: 3,
      stem: "A winged infusion set is used to collect a light blue sodium citrate tube as the only tube ordered. What must be done first?",
      choices: {
        a: "Nothing — the citrate tube is drawn directly",
        b: "Draw a discard tube first to fill the tubing's dead space",
        c: "Draw a lavender tube first to prime the line",
        d: "Prime the tubing with saline",
      },
      correct: "b",
      explanation:
        "The tubing of a winged set holds air, and that air would take up part " +
        "of the citrate tube's fixed vacuum, leaving it underfilled and the " +
        "9:1 blood-to-additive ratio wrong. A discard tube fills the dead space " +
        "first so the citrate tube fills completely.",
      why: {
        a: "Drawing directly leaves the citrate tube short by roughly the volume of the tubing.",
        c: "Any tube drawn before a citrate tube risks additive carryover; the discard tube is drawn and thrown away for a reason.",
        d: "Saline priming would dilute the specimen and is not part of routine collection.",
      },
      tip: "Butterfly + coagulation tube first = discard tube first. The tubing's air has to go somewhere.",
      tags: ["winged-set", "discard-tube", "sodium-citrate"],
    },
    {
      id: "tec-035",
      subdomain: "Vein entry",
      difficulty: 2,
      stem: "What is the purpose of anchoring the vein before insertion?",
      choices: {
        a: "It makes the vein larger",
        b: "It holds the vein and skin taut so the vessel does not roll away from the needle",
        c: "It replaces the need for a tourniquet",
        d: "It reduces the volume of blood needed",
      },
      correct: "b",
      explanation:
        "Pulling the skin taut a couple of inches below the site with the thumb " +
        "stabilizes a vessel that would otherwise slide sideways as the needle " +
        "presses on it. Rolling veins are one of the most common reasons an " +
        "otherwise good stick misses.",
      why: {
        a: "Anchoring stabilizes the vein; distension comes from the tourniquet.",
        c: "The tourniquet distends the vein and is still required.",
        d: "Volume requirements are set by the tests ordered, not by technique.",
      },
      tip: "Thumb below the site, skin pulled taut, and never anchor above the site with a finger in the needle's path.",
      tags: ["anchoring", "rolling-veins", "technique"],
    },
    {
      id: "tec-036",
      subdomain: "Failed draws",
      difficulty: 3,
      stem: "Blood begins to flow and then stops with the tube only partly filled. What is a reasonable first adjustment?",
      choices: {
        a: "Probe laterally in search of the vein",
        b: "Withdraw the needle slightly or rotate the bevel, since it may be against a vein wall or a valve",
        c: "Remove the tube and squeeze the patient's arm",
        d: "Push the needle in deeper until flow resumes",
      },
      correct: "b",
      explanation:
        "Flow that starts and stops usually means the bevel has come to rest " +
        "against a wall or a valve. A slight withdrawal or a gentle rotation of " +
        "the bevel can restore flow. Blind probing is not an option — it is " +
        "painful and it is how nerves and arteries get hit.",
      why: {
        a: "Lateral probing is explicitly discouraged and is a leading cause of nerve injury.",
        c: "Squeezing the arm hemoconcentrates the specimen and does not address the needle's position.",
        d: "Advancing deeper is likely to pass through the far wall of the vein.",
      },
      tip: "Small, deliberate adjustment — never a search. Two attempts, then hand off.",
      tags: ["failed-draw", "needle-position", "probing"],
    },
    {
      id: "tec-037",
      subdomain: "Failed draws",
      difficulty: 2,
      stem: "How many venipuncture attempts should one phlebotomist make before asking someone else to try?",
      choices: {
        a: "One",
        b: "No more than two",
        c: "Four",
        d: "As many as needed until a specimen is obtained",
      },
      correct: "b",
      explanation:
        "Two attempts is the widely taught limit for one collector. Beyond that " +
        "the patient's discomfort and tissue trauma keep rising while the odds " +
        "of success fall, so the draw is handed to a colleague or escalated per " +
        "policy.",
      why: {
        a: "A second attempt is normally reasonable after an unsuccessful first.",
        c: "Four attempts by one person exceeds the accepted limit and is hard to justify to the patient.",
        d: "Unlimited attempts prioritize the specimen over the patient, which inverts the priority.",
      },
      tip: "Two and through. Handing off is a professional judgment, not a failure.",
      tags: ["failed-draw", "attempt-limit", "escalation"],
    },
    {
      id: "tec-038",
      subdomain: "Post-puncture care",
      difficulty: 2,
      stem: "After the needle is withdrawn, how is bleeding controlled?",
      choices: {
        a: "Bend the patient's arm at the elbow and hold gauze in place",
        b: "Apply firm direct pressure to the site with the arm extended until bleeding stops",
        c: "Apply a bandage immediately without pressure",
        d: "Have the patient hold the site loosely while dressing",
      },
      correct: "b",
      explanation:
        "Direct pressure with the arm straight closes the puncture in the vein " +
        "wall as well as the one in the skin. Bending the elbow lets the site " +
        "reopen under the fold and is a well-known cause of hematoma, so the arm " +
        "stays extended.",
      why: {
        a: "Bending the arm is specifically discouraged; it encourages bleeding into the tissue.",
        c: "A bandage over an unsealed puncture soaks through and does not stop bleeding.",
        d: "Loose pressure leaves the vein puncture open beneath intact skin — exactly how a hematoma forms.",
      },
      tip: "Straight arm, firm pressure, check before you bandage. Bending the elbow is the classic hematoma mistake.",
      tags: ["post-puncture", "pressure", "hematoma-prevention"],
    },
    {
      id: "tec-039",
      subdomain: "Dermal puncture",
      difficulty: 2,
      stem: "Why is the first drop of blood wiped away during a capillary collection?",
      choices: {
        a: "It contains excess tissue fluid and residual alcohol that can affect results",
        b: "It is always contaminated with bacteria",
        c: "It clots faster than subsequent drops",
        d: "Wiping it stimulates better blood flow",
      },
      correct: "a",
      explanation:
        "The first drop is diluted with interstitial fluid released by the " +
        "puncture and may carry residual alcohol from site preparation. Wiping " +
        "it with clean gauze and collecting from the drops that follow gives a " +
        "more representative specimen.",
      why: {
        b: "Contamination is not the reason; tissue fluid dilution is.",
        c: "Clotting behavior is not what makes the first drop unsuitable.",
        d: "Wiping removes a compromised drop; it does not itself improve flow.",
      },
      tip: "Wipe the first drop. It's mostly tissue fluid and whatever alcohol was left behind.",
      tags: ["dermal-puncture", "capillary-collection", "first-drop"],
    },
    {
      id: "tec-040",
      subdomain: "Dermal puncture",
      difficulty: 2,
      stem: "Which site is appropriate for a capillary puncture on an adult?",
      choices: {
        a: "The center of the fingertip pad",
        b: "The side of the fleshy pad of the third or fourth finger, slightly off center",
        c: "The tip of the thumb",
        d: "The earlobe",
      },
      correct: "b",
      explanation:
        "The middle or ring finger is used, punctured slightly to the side of " +
        "center on the fleshy pad and across the fingerprint lines so the drop " +
        "forms rather than running along a groove. The central tip is more " +
        "sensitive and the bone sits closer beneath it.",
      why: {
        a: "The dead center of the tip is the most sensitive area and closest to the bone.",
        c: "The thumb has a pulse, thicker calluses, and is avoided; the index finger is more sensitive and callused too.",
        d: "The earlobe is not a recommended routine site.",
      },
      tip: "Third or fourth finger, side of the pad, perpendicular to the fingerprint lines.",
      tags: ["dermal-puncture", "finger-stick", "site-selection"],
    },
    {
      id: "tec-041",
      subdomain: "Dermal puncture",
      difficulty: 3,
      stem: "On an infant, which part of the heel is used for a dermal puncture?",
      choices: {
        a: "The center of the heel",
        b: "The medial or lateral plantar surface, off the central curve of the heel",
        c: "The back of the heel over the bone",
        d: "The arch of the foot",
      },
      correct: "b",
      explanation:
        "The medial and lateral plantar surfaces keep the lancet away from the " +
        "calcaneus. Puncturing the central posterior heel risks contacting bone, " +
        "which can lead to osteomyelitis — the reason both the site and the " +
        "depth are specified for infants.",
      why: {
        a: "The center of the heel sits directly over the bone.",
        c: "The posterior curve is where the bone is closest to the surface.",
        d: "The arch carries nerves and tendons and is not a collection site.",
      },
      tip: "Stay on the medial or lateral plantar surface, limit the depth, and never puncture the central or posterior heel.",
      tags: ["heel-stick", "infant", "osteomyelitis"],
    },
    {
      id: "tec-042",
      subdomain: "Dermal puncture",
      difficulty: 2,
      stem: "Why should the site not be squeezed or \"milked\" during a capillary collection?",
      choices: {
        a: "It is uncomfortable but has no effect on the specimen",
        b: "It forces tissue fluid into the specimen and can hemolyze it, distorting results",
        c: "It reduces the total volume obtainable",
        d: "It causes the puncture to close prematurely",
      },
      correct: "b",
      explanation:
        "Vigorous squeezing pushes interstitial fluid into the drop and damages " +
        "red cells, producing a diluted, hemolyzed specimen — potassium in " +
        "particular becomes unreliable. Gentle intermittent pressure well away " +
        "from the puncture, plus a warmed site, is what actually improves flow.",
      why: {
        a: "The effect on the specimen is real and can change reported results.",
        c: "Volume is not the problem; specimen quality is.",
        d: "Squeezing does not close the puncture, but it does compromise what comes out of it.",
      },
      tip: "Warm the site instead of squeezing it. Milking gives you tissue fluid and a falsely high potassium.",
      tags: ["dermal-puncture", "milking", "specimen-quality"],
    },
    {
      id: "tec-043",
      subdomain: "Dermal puncture",
      difficulty: 2,
      stem: "What is the benefit of warming a site before a capillary collection?",
      choices: {
        a: "It sterilizes the skin surface",
        b: "It increases blood flow to the area, improving the yield",
        c: "It thins the blood so it clots more slowly",
        d: "It numbs the site",
      },
      correct: "b",
      explanation:
        "Warming the site for a few minutes with a warm cloth or commercial " +
        "warmer can increase local blood flow substantially, which means a " +
        "usable specimen without squeezing. It is routine before a newborn " +
        "screening collection.",
      why: {
        a: "Warming has no antiseptic effect; alcohol cleaning is a separate step.",
        c: "Warming does not alter the blood's clotting behavior.",
        d: "It is not an anesthetic, though it does make collection quicker.",
      },
      tip: "Warm first, squeeze never. A warmed heel or finger gives up blood freely.",
      tags: ["dermal-puncture", "warming", "capillary-collection"],
    },
    {
      id: "tec-044",
      subdomain: "Equipment",
      difficulty: 2,
      stem: "What are the three components of an evacuated tube collection system?",
      choices: {
        a: "Needle, syringe, and transfer device",
        b: "Multi-sample needle, tube holder (adapter), and evacuated tube",
        c: "Lancet, capillary tube, and sealant",
        d: "Winged set, tourniquet, and gauze",
      },
      correct: "b",
      explanation:
        "The evacuated tube system is a double-ended multi-sample needle, a " +
        "holder that the needle screws into, and the vacuum tube that pushes " +
        "onto the back end. The rubber sleeve over the back end is what allows " +
        "several tubes to be filled without blood leaking between them.",
      why: {
        a: "That describes syringe collection, a separate method.",
        c: "Those are dermal puncture supplies.",
        d: "A winged set is an alternative needle assembly, and the others are accessories rather than system components.",
      },
      tip: "Needle, holder, tube. The rubber sleeve on the back end is what makes multi-tube draws possible.",
      tags: ["evacuated-tube-system", "equipment", "components"],
    },
    {
      id: "tec-045",
      subdomain: "Vein entry",
      difficulty: 2,
      stem: "In which orientation is the needle bevel positioned during insertion?",
      choices: {
        a: "Bevel down, to avoid the far wall",
        b: "Bevel up, aligned with the vein",
        c: "Bevel sideways, to widen the opening",
        d: "Orientation makes no difference",
      },
      correct: "b",
      explanation:
        "Bevel up lets the sharpened point enter the skin and vessel cleanly, " +
        "and keeps the opening clear of the vein's back wall once inside. It is " +
        "also the more comfortable entry for the patient.",
      why: {
        a: "Bevel down turns the opening against the vein's floor and can occlude flow.",
        c: "A sideways bevel gives a ragged entry and does not widen anything usefully.",
        d: "Orientation affects both flow and comfort measurably.",
      },
      tip: "Bevel up, shallow angle, vein anchored. Those three go together.",
      tags: ["bevel", "insertion", "technique"],
    },
    {
      id: "tec-046",
      subdomain: "Tube filling",
      difficulty: 3,
      stem: "A phlebotomist notices the light blue citrate tube is only two-thirds full. What must be done?",
      choices: {
        a: "Send it and note the volume on the requisition",
        b: "Recollect the tube — coagulation testing requires the specified blood-to-additive ratio",
        c: "Add blood from a second tube to top it up",
        d: "Remove some of the citrate with a pipette",
      },
      correct: "b",
      explanation:
        "Sodium citrate tubes depend on a 9:1 blood-to-anticoagulant ratio. An " +
        "underfilled tube has proportionally too much citrate, which binds more " +
        "calcium and falsely prolongs clotting times — a result that could " +
        "change a patient's anticoagulant dose.",
      why: {
        a: "A note does not correct a ratio error, and the result would be misleading if reported.",
        c: "Combining tubes produces a specimen of unknown ratio and unknown age.",
        d: "Altering a tube's additive is never acceptable.",
      },
      tip: "Blue tops must fill to the line. An underfilled citrate tube reads falsely prolonged.",
      tags: ["sodium-citrate", "fill-volume", "coagulation"],
    },
    {
      id: "tec-047",
      subdomain: "Mixing",
      difficulty: 2,
      stem: "How are additive tubes mixed after collection?",
      choices: {
        a: "Shaken vigorously for several seconds",
        b: "Inverted gently the number of times specified by the manufacturer, immediately after filling",
        c: "Left to stand; the additive dissolves on its own",
        d: "Rolled between the palms for a minute",
      },
      correct: "b",
      explanation:
        "Gentle, complete inversions — typically a small specified number per " +
        "tube type — distribute the additive through the specimen without " +
        "damaging cells. Mixing happens right after the tube is filled, because " +
        "clotting starts immediately in an inadequately mixed anticoagulant tube.",
      why: {
        a: "Shaking hemolyzes the specimen and can activate platelets.",
        c: "An unmixed anticoagulant tube clots, making it unusable for cell counts.",
        d: "Rolling does not invert the tube and leaves the additive unevenly distributed.",
      },
      tip: "Invert gently, right away, the number of times the manufacturer specifies. Never shake.",
      tags: ["mixing", "inversions", "additive"],
    },
    {
      id: "tec-048",
      subdomain: "Safety",
      difficulty: 2,
      stem: "When is the needle's safety device activated?",
      choices: {
        a: "After the needle has been placed in the sharps container",
        b: "Immediately upon withdrawal from the patient, before anything else is done",
        c: "After all tubes have been labeled",
        d: "Only if the phlebotomist is interrupted",
      },
      correct: "b",
      explanation:
        "The device is engaged the moment the needle leaves the arm, one-handed " +
        "and away from the body, before gauze, tubes, or anything else takes " +
        "attention. The interval between withdrawal and containment is when most " +
        "needlesticks occur.",
      why: {
        a: "Activating inside the container defeats the purpose and puts a hand near the opening.",
        c: "Labeling comes after the sharp is contained, not before.",
        d: "Activation is unconditional, not a response to a distraction.",
      },
      tip: "Out of the arm, safety engaged, into the container. No steps in between.",
      tags: ["safety-device", "needlestick", "sharps"],
    },
    {
      id: "tec-049",
      subdomain: "Site selection",
      difficulty: 3,
      stem: "A phlebotomist cannot see a vein but feels a firm, bouncy, cord-like structure that does not pulse. What does this most likely indicate?",
      choices: {
        a: "An artery",
        b: "A suitable vein — palpation matters more than visibility",
        c: "A tendon",
        d: "A nerve",
      },
      correct: "b",
      explanation:
        "Veins are found by feel, not by sight. A vessel that is soft, bouncy, " +
        "and resilient under the fingertip and does not pulse is a vein, and it " +
        "is often a better target than one that merely looks prominent.",
      why: {
        a: "An artery pulses under the finger and resists compression.",
        c: "A tendon is hard, unyielding, and does not rebound when pressed.",
        d: "A nerve is not palpable as a discrete cord in this way, and contact with one produces sharp pain.",
      },
      tip: "Palpate, don't just look. Bouncy and resilient is a vein; hard is a tendon; pulsing is an artery.",
      tags: ["palpation", "site-selection", "vein-assessment"],
    },
    {
      id: "tec-050",
      subdomain: "Equipment",
      difficulty: 2,
      stem: "What is the main advantage of a winged infusion (butterfly) set?",
      choices: {
        a: "It draws blood faster than a straight needle",
        b: "Its flexible tubing and shallow angle suit small, fragile, or awkwardly placed veins",
        c: "It eliminates the need for a tourniquet",
        d: "It allows tubes to be filled out of order",
      },
      correct: "b",
      explanation:
        "The wings give fine control at a very shallow angle and the flexible " +
        "tubing decouples tube changes from the needle, which makes a winged set " +
        "the tool of choice for hand veins, pediatric draws, and fragile " +
        "vessels. Its dead space is the trade-off to remember.",
      why: {
        a: "Flow through the narrow tubing is generally slower, not faster.",
        c: "A tourniquet is used with a winged set as with any other method.",
        d: "The order of draw applies regardless of the collection device.",
      },
      tip: "Butterfly for small and awkward veins — just remember the tubing's dead space when a citrate tube is first.",
      tags: ["winged-set", "equipment", "small-veins"],
    },
    {
      id: "tec-051",
      subdomain: "Post-puncture care",
      difficulty: 2,
      stem: "A patient on warfarin is still oozing from the site after the usual pressure. What should the phlebotomist do?",
      choices: {
        a: "Apply a pressure bandage and let the patient leave",
        b: "Continue direct pressure until bleeding stops, and notify the nurse or provider if it does not",
        c: "Apply a tourniquet above the site",
        d: "Have the patient raise their arm above their head and leave",
      },
      correct: "b",
      explanation:
        "Anticoagulated patients take longer to seal a puncture, so pressure is " +
        "simply continued until bleeding actually stops. A patient who keeps " +
        "bleeding beyond a reasonable period is reported rather than sent away " +
        "with a dressing over an active bleed.",
      why: {
        a: "A bandage over active bleeding hides it while a hematoma forms underneath.",
        c: "A tourniquet obstructs venous return and makes bleeding from the site worse.",
        d: "Elevation alone does not replace direct pressure, and the patient should not leave unobserved.",
      },
      tip: "Hold longer, check before bandaging, and escalate if it will not stop. Never send a bleeding patient away.",
      tags: ["anticoagulant", "bleeding", "post-puncture"],
    },
    {
      id: "tec-052",
      subdomain: "Site selection",
      difficulty: 2,
      stem: "Which site should be avoided for routine venipuncture?",
      choices: {
        a: "The median cubital vein of the left arm",
        b: "An area with extensive burns, scarring, or an active rash",
        c: "The dorsal hand veins",
        d: "The cephalic vein of the forearm",
      },
      correct: "b",
      explanation:
        "Burned, scarred, or inflamed skin is avoided: it is painful, it is more " +
        "vulnerable to infection, the underlying vessels are often damaged, and " +
        "the specimen quality suffers. An unaffected site is used, even if it is " +
        "less convenient.",
      why: {
        a: "The median cubital is the preferred first-choice site.",
        c: "Hand veins are the standard alternative when the antecubital area is unsuitable.",
        d: "The cephalic vein is an accepted second-choice site.",
      },
      tip: "Damaged skin means damaged vessels and higher infection risk. Move to healthy tissue.",
      tags: ["site-selection", "burns", "contraindications"],
    },
    {
      id: "tec-053",
      subdomain: "Order of tubes",
      difficulty: 3,
      stem: "A syringe draw yields blood for several tube types. In what order are the tubes filled from the syringe?",
      choices: {
        a: "In any order, since the blood is already collected",
        b: "In the same order of draw used for evacuated tubes, using a transfer device",
        c: "Largest volume tube first",
        d: "Additive tubes last, so they are freshest",
      },
      correct: "b",
      explanation:
        "The order of draw still applies when filling from a syringe. Blood in " +
        "the syringe begins clotting immediately, so the anticoagulated tubes " +
        "that depend on intact, unclotted cells still need to be filled in " +
        "sequence, and carryover between tubes is still possible at the transfer " +
        "device.",
      why: {
        a: "Clotting starts the moment blood leaves the vein, so sequence still matters.",
        c: "Volume has no bearing on the sequence.",
        d: "Delaying additive tubes maximizes the chance they receive partly clotted blood.",
      },
      tip: "Syringe or evacuated tube, the order of draw is the same — and fill promptly, because the clock is running.",
      tags: ["syringe", "order-of-draw", "transfer-device"],
    },
    {
      id: "tec-054",
      subdomain: "Vein entry",
      difficulty: 3,
      stem: "The phlebotomist inserts the needle and sees a small flash of blood, but no blood enters the tube. What is the most likely explanation?",
      choices: {
        a: "The tube has lost its vacuum, or the bevel is only partly in the lumen",
        b: "The patient is dehydrated beyond the point of collection",
        c: "The needle gauge is too large",
        d: "The tourniquet was applied too loosely",
      },
      correct: "a",
      explanation:
        "A flash followed by nothing points to a bevel that is only partly " +
        "inside the vessel, or to a tube that has lost its vacuum. Trying a " +
        "fresh tube distinguishes the two before any needle adjustment is made, " +
        "since it costs nothing and requires no movement in the arm.",
      why: {
        b: "Dehydration makes veins harder to find but does not typically produce a flash and then nothing.",
        c: "An oversized needle causes different problems; it does not explain a flash without flow.",
        d: "A loose tourniquet makes the vein hard to enter in the first place rather than stopping flow after entry.",
      },
      tip: "Flash but no fill? Change the tube first — it's free and it doesn't move the needle.",
      tags: ["failed-draw", "vacuum", "troubleshooting"],
    },
    {
      id: "tec-055",
      subdomain: "Post-puncture care",
      difficulty: 2,
      stem: "What instruction should be given to a patient after a bandage is applied?",
      choices: {
        a: "Remove the bandage immediately upon leaving",
        b: "Keep the bandage on for a short period, avoid heavy lifting with that arm, and report swelling or continued bleeding",
        c: "Keep the bandage on for 24 hours regardless",
        d: "No instructions are needed for a routine draw",
      },
      correct: "b",
      explanation:
        "The patient leaves knowing three things: leave the bandage for a while, " +
        "do not stress the arm with heavy lifting, and get in touch if the site " +
        "swells, bruises significantly, or bleeds again. That short handover " +
        "prevents most post-draw calls.",
      why: {
        a: "Removing it immediately risks the site reopening before it has fully sealed.",
        c: "A fixed 24-hour rule is unnecessary and, for patients with fragile skin, can itself cause injury.",
        d: "Aftercare instruction is part of every collection, routine or not.",
      },
      tip: "Leave it a while, don't lift heavy, call if it swells. Three sentences, most problems avoided.",
      tags: ["post-puncture", "patient-instructions", "aftercare"],
    },
  ],
);

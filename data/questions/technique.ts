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
        a: "Uncapping tubes aerosolizes blood and destroys the vacuum that measures the fill volume.",
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
  ],
);

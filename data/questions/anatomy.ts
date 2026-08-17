import { buildQuestions } from "./authoring";
import { SRC_TEXTBOOK_CURRICULUM } from "@/data/sources";

export const ANATOMY_QUESTIONS = buildQuestions(
  {
    domain: "anatomy-physiology",
    certifications: ["nha-cpt"],
    sources: [SRC_TEXTBOOK_CURRICULUM],
    reviewStatus: "needs-review",
  },
  [
    {
      id: "ana-001",
      subdomain: "Antecubital anatomy",
      difficulty: 1,
      stem: "Which vein is generally the first choice for routine venipuncture in the antecubital fossa?",
      choices: {
        a: "Basilic vein",
        b: "Median cubital vein",
        c: "Cephalic vein",
        d: "Brachial vein",
      },
      correct: "b",
      explanation:
        "The median cubital vein is typically large, well anchored by " +
        "surrounding tissue so it rolls less, and sits away from the major " +
        "nerves and the brachial artery. Those three properties together — " +
        "size, stability, and distance from vulnerable structures — make it " +
        "the safest and most successful first choice.",
      why: {
        a: "The basilic vein is the last resort: the median nerve and brachial artery lie close to it.",
        c: "The cephalic vein is a reasonable second choice but tends to roll more.",
        d: "The brachial vein is a deep vessel and is not a phlebotomy site.",
      },
      tip: "Median cubital first, cephalic second, basilic last — and last means last, not third-equal.",
      tags: ["veins", "site-selection"],
    },
    {
      id: "ana-002",
      subdomain: "Antecubital anatomy",
      difficulty: 2,
      stem: "Why is the basilic vein considered the last choice for venipuncture?",
      choices: {
        a: "It is usually too small to cannulate",
        b: "It lies close to the median nerve and the brachial artery",
        c: "It collapses more readily than other veins",
        d: "It produces hemolysed specimens more often",
      },
      correct: "b",
      explanation:
        "The basilic vein sits on the medial (little-finger) side of the " +
        "antecubital fossa, where the median nerve and the brachial artery " +
        "run nearby. A misdirected needle there can cause nerve injury with " +
        "lasting consequences, or an arterial puncture. The vein itself is " +
        "often prominent and tempting, which is exactly why the caution has " +
        "to be taught explicitly.",
      why: {
        a: "It is frequently the most visible vein, not the smallest.",
        c: "It does roll, but that is a nuisance rather than the reason for the ranking.",
        d: "Hemolysis relates to technique and equipment, not to this vein specifically.",
      },
      tip: "Medial side = basilic = nerve and artery territory. Prominent does not mean safe.",
      tags: ["basilic", "nerve-injury", "anatomy"],
    },
    {
      id: "ana-003",
      subdomain: "Blood composition",
      difficulty: 1,
      stem: "Approximately what proportion of whole blood is plasma?",
      choices: {
        a: "About 25%",
        b: "About 45%",
        c: "About 55%",
        d: "About 75%",
      },
      correct: "c",
      explanation:
        "Whole blood is roughly 55% plasma and 45% formed elements, with " +
        "red cells making up the overwhelming majority of the latter. That " +
        "45% figure is essentially the hematocrit, which is why hematocrit " +
        "and plasma volume move in opposite directions.",
      tip: "55% liquid, 45% cells. The cell fraction is the hematocrit.",
      tags: ["blood-composition", "hematocrit"],
    },
    {
      id: "ana-004",
      subdomain: "Serum vs plasma",
      difficulty: 2,
      stem: "What is the difference between serum and plasma?",
      choices: {
        a: "Serum contains fibrinogen; plasma does not",
        b: "Plasma contains fibrinogen and clotting factors; serum does not",
        c: "Serum contains red cells; plasma does not",
        d: "There is no chemical difference; the terms are interchangeable",
      },
      correct: "b",
      explanation:
        "Plasma is the liquid portion of blood that was prevented from " +
        "clotting, so it still contains fibrinogen and the other clotting " +
        "factors. Serum is what remains after blood has clotted, and the " +
        "clotting process consumed the fibrinogen. That single difference is " +
        "why a fibrinogen assay needs a citrate tube, not a serum tube.",
      why: {
        a: "This reverses the relationship.",
        c: "Neither contains red cells after separation.",
        d: "The difference is real and determines which tube a test requires.",
      },
      tip: "Anticoagulant tube → plasma (fibrinogen present). Clot tube → serum (fibrinogen consumed).",
      tags: ["serum", "plasma", "fibrinogen"],
    },
    {
      id: "ana-005",
      subdomain: "Vessels",
      difficulty: 2,
      stem: "Which finding most strongly suggests the phlebotomist has entered an artery rather than a vein?",
      choices: {
        a: "The blood is dark red and flows slowly",
        b: "Bright red blood pulses into the tube and fills it rapidly",
        c: "The tube fills only partially before stopping",
        d: "The patient reports a sharp electric sensation down the arm",
      },
      correct: "b",
      explanation:
        "Arterial blood is oxygenated, so it is brighter red, and it is " +
        "under systemic pressure, so it pulses and fills quickly. If this " +
        "happens, withdraw the needle immediately, apply firm direct pressure " +
        "for at least five minutes, and notify a supervisor and the patient's " +
        "nurse — the site needs monitoring for hematoma.",
      why: {
        a: "Dark, steady flow is the normal venous appearance.",
        c: "A partial fill points to vein collapse, needle position, or a failing tube vacuum.",
        d: "An electric shooting sensation suggests nerve involvement, a different emergency.",
      },
      tip: "Bright and pulsing means artery: stop, hold firm pressure five minutes or more, escalate.",
      tags: ["arterial-puncture", "complications"],
    },
    {
      id: "ana-006",
      subdomain: "Hemostasis",
      difficulty: 2,
      stem: "Which cell fragment is directly responsible for forming the initial platelet plug at a puncture site?",
      choices: {
        a: "Erythrocytes",
        b: "Thrombocytes",
        c: "Leukocytes",
        d: "Monocytes",
      },
      correct: "b",
      explanation:
        "Thrombocytes — platelets — adhere to the damaged vessel wall and " +
        "aggregate to form the primary plug within seconds. The coagulation " +
        "cascade then reinforces that plug with fibrin. A patient with a low " +
        "platelet count therefore bleeds longer at the puncture site and " +
        "needs pressure held longer.",
      why: {
        a: "Erythrocytes carry oxygen and are trapped in the clot rather than forming it.",
        c: "Leukocytes handle immune defense.",
        d: "Monocytes are a type of leukocyte and are not part of primary hemostasis.",
      },
      tip: "Thrombocyte = platelet. Low platelets means hold pressure longer.",
      tags: ["hemostasis", "platelets"],
    },
    {
      id: "ana-007",
      subdomain: "Vessels",
      difficulty: 1,
      stem: "Which vessels carry blood back toward the heart and are the target of venipuncture?",
      choices: {
        a: "Arteries",
        b: "Veins",
        c: "Arterioles",
        d: "Capillaries",
      },
      correct: "b",
      explanation:
        "Veins return blood to the heart, sit under lower pressure, have " +
        "thinner walls, and many contain valves. Those properties are what " +
        "make them accessible with a small needle and reasonable pressure — " +
        "and the valves are why a needle sometimes stops flowing when it " +
        "reaches one.",
      why: {
        a: "Arteries carry blood away from the heart under high pressure and are not routine phlebotomy targets.",
        c: "Arterioles are small arteries.",
        d: "Capillaries are sampled by dermal puncture, not venipuncture.",
      },
      tip: "Veins carry blood to the heart. Valves in veins are a real cause of a sudden stop in flow.",
      tags: ["vessels", "basics"],
    },
    {
      id: "ana-008",
      subdomain: "Antecubital anatomy",
      difficulty: 3,
      stem: "In the common H-shaped antecubital vein pattern, the cephalic vein is found on which aspect of the arm?",
      choices: {
        a: "The medial aspect, toward the little finger",
        b: "The lateral aspect, toward the thumb",
        c: "Directly in the center of the fossa",
        d: "On the posterior surface of the forearm",
      },
      correct: "b",
      explanation:
        "The cephalic vein runs on the lateral, thumb side of the arm; the " +
        "basilic runs medially, on the little-finger side. Anchoring this to " +
        "the thumb is practical rather than academic: the thumb side is the " +
        "safer side, because the nerve and artery hazards concentrate " +
        "medially.",
      why: {
        a: "That describes the basilic vein.",
        c: "The median cubital vein typically crosses the center.",
        d: "These are anterior surface veins.",
      },
      tip: "Cephalic = thumb side = safer. Basilic = little-finger side = riskier.",
      tags: ["cephalic", "anatomy", "orientation"],
    },
    {
      id: "ana-009",
      subdomain: "Blood composition",
      difficulty: 2,
      stem: "Which leukocyte is normally the most numerous in the peripheral blood of a healthy adult?",
      choices: {
        a: "Lymphocyte",
        b: "Neutrophil",
        c: "Eosinophil",
        d: "Basophil",
      },
      correct: "b",
      explanation:
        "Neutrophils normally make up the largest share of circulating white " +
        "cells in adults, with lymphocytes second. Basophils are the rarest. " +
        "The usual ordering — neutrophils, lymphocytes, monocytes, " +
        "eosinophils, basophils — is worth knowing because a differential " +
        "that departs from it is what flags an abnormality.",
      tip: "Never Let Monkeys Eat Bananas: Neutrophils, Lymphocytes, Monocytes, Eosinophils, Basophils — most to least.",
      tags: ["leukocytes", "differential"],
    },
    {
      id: "ana-010",
      subdomain: "Physiology",
      difficulty: 3,
      stem: "A patient's arm is held below heart level with a tourniquet applied for three minutes before the draw. Which effect is most likely?",
      choices: {
        a: "Hemodilution, falsely lowering protein and cell counts",
        b: "Hemoconcentration, falsely raising protein, calcium, and cell counts",
        c: "No measurable effect on results",
        d: "Hemolysis of the specimen",
      },
      correct: "b",
      explanation:
        "A prolonged tourniquet forces water and small molecules out of the " +
        "vessel while large molecules and cells stay behind, concentrating " +
        "what remains. Proteins, protein-bound analytes such as calcium, " +
        "lipids, and cell counts all read falsely high. This is why the " +
        "tourniquet is released within about a minute — ideally as soon as " +
        "blood flow is established.",
      why: {
        a: "The shift runs the other way: fluid leaves the vessel.",
        c: "The effect is measurable and clinically significant for several analytes.",
        d: "Hemolysis can occur from other causes, but concentration is the specific consequence of a prolonged tourniquet.",
      },
      tip: "Tourniquet under a minute. Longer means falsely high proteins, calcium, and counts.",
      tags: ["hemoconcentration", "tourniquet", "preanalytical"],
    },
    {
      id: "ana-011",
      subdomain: "Antecubital anatomy",
      difficulty: 2,
      stem: "When choosing among the three primary antecubital veins for a routine venipuncture, which sequence reflects the standard order of preference, from first choice to last?",
      choices: {
        a: "Cephalic, then median cubital, then basilic",
        b: "Median cubital, then cephalic, then basilic",
        c: "Basilic, then median cubital, then cephalic",
        d: "Median cubital, then basilic, then cephalic",
      },
      correct: "b",
      explanation:
        "The median cubital vein is chosen first because it is typically " +
        "large, well anchored, and away from major nerves and arteries. The " +
        "cephalic vein is the reasonable second option, and the basilic vein " +
        "is reserved for last because of its proximity to the brachial " +
        "artery and median nerve.",
      why: {
        a: "This puts the cephalic vein ahead of the median cubital, reversing the usual first two choices.",
        c: "This starts with the riskiest vein instead of saving it for last.",
        d: "This ranks the basilic ahead of the cephalic, even though the basilic carries the greater risk.",
      },
      tip: "Median cubital, cephalic, basilic — safest to riskiest.",
      tags: ["veins", "site-selection", "antecubital-fossa"],
    },
    {
      id: "ana-012",
      subdomain: "Antecubital anatomy",
      difficulty: 3,
      stem: "A patient's antecubital veins form what looks like an 'M' rather than the more common 'H' pattern, with an accessory cephalic vein joining the median cubital vein near the bend of the elbow. What is the best-practice implication?",
      choices: {
        a: "The M pattern is abnormal, so venipuncture should be deferred until imaging maps the veins",
        b: "The visual pattern name matters less than palpation; the phlebotomist should palpate to confirm a vein's size, depth, and direction regardless of whether it is an H or M configuration",
        c: "Only the H pattern contains a vein suitable for venipuncture",
        d: "The M pattern means the basilic vein cannot be used safely in this patient",
      },
      correct: "b",
      explanation:
        "Both the H pattern and the M (or N) pattern are normal, common " +
        "variants of antecubital venous anatomy, and neither name tells the " +
        "phlebotomist how deep, mobile, or well-anchored a specific vein is. " +
        "Palpation — feeling for bounce, size, and direction — is what " +
        "actually guides needle placement, no matter which visual pattern is " +
        "present.",
      why: {
        a: "The M pattern is a normal anatomical variant, not a red flag requiring imaging or deferral.",
        c: "Both the H and M patterns typically include a usable connecting vein in the fossa.",
        d: "The pattern name does not by itself rule the basilic vein in or out; it remains a last resort because of the nearby nerve and artery, not because of this variant.",
      },
      tip: "Look guides the eye, palpation guides the needle.",
      tags: ["antecubital-fossa", "venous-patterns", "palpation"],
    },
    {
      id: "ana-013",
      subdomain: "Vessels",
      difficulty: 1,
      stem: "From innermost to outermost, what are the three layers of a blood vessel wall?",
      choices: {
        a: "Tunica intima, tunica media, tunica adventitia",
        b: "Tunica adventitia, tunica media, tunica intima",
        c: "Epidermis, dermis, subcutaneous layer",
        d: "Endothelium, myocardium, pericardium",
      },
      correct: "a",
      explanation:
        "The tunica intima is the thin innermost layer that directly " +
        "contacts blood, the tunica media is the middle layer of smooth " +
        "muscle and elastic tissue that gives the vessel its tone, and the " +
        "tunica adventitia is the tough outer connective-tissue layer that " +
        "anchors the vessel to surrounding structures.",
      why: {
        b: "This lists the layers in reverse, putting the outer adventitia on the inside.",
        c: "These are skin layers, not the layers of a vessel wall.",
        d: "The myocardium and pericardium are layers of the heart wall, not a blood vessel wall.",
      },
      tip: "Intima inside, media in the middle (muscle), adventitia outside (anchor).",
      tags: ["vessel-anatomy", "tunica-layers"],
    },
    {
      id: "ana-014",
      subdomain: "Vessels",
      difficulty: 2,
      stem: "A new phlebotomist is comparing the three vessel types before a dermal-puncture training session. Which statement correctly matches a vessel type with a phlebotomy-relevant characteristic?",
      choices: {
        a: "Capillaries are the largest vessels and are the target of routine venipuncture",
        b: "Arteries lie deep, carry bright red pulsating blood, and are avoided in routine draws",
        c: "Veins carry oxygen-rich blood under high pressure and pulsate strongly when punctured",
        d: "Capillaries contain valves that stop blood from flowing backward",
      },
      correct: "b",
      explanation:
        "Arteries run deeper than veins, carry oxygenated bright red blood " +
        "under pulsing systemic pressure, and are not routine venipuncture " +
        "targets. Veins are closer to the surface, darker and non-pulsating, " +
        "and are the usual venipuncture target. Capillaries are the smallest " +
        "vessels and are what a dermal puncture, such as a fingerstick or " +
        "heelstick, actually samples.",
      why: {
        a: "Capillaries are the smallest vessels, not the largest, and dermal puncture — not venipuncture — samples them.",
        c: "High pressure and strong pulsation describe arterial blood, not venous blood.",
        d: "Valves that prevent backflow are a venous feature, not a capillary one.",
      },
      tip: "Artery = deep, bright, pulsing. Vein = surface, dark, steady. Capillary = tiny, feeds a fingerstick.",
      tags: ["vessels", "arteries", "capillaries", "dermal-puncture"],
    },
    {
      id: "ana-015",
      subdomain: "Antecubital anatomy",
      difficulty: 3,
      stem: "Why does the close relationship between the brachial artery and the basilic vein change technique when the basilic vein must be used?",
      choices: {
        a: "It does not change technique; the basilic vein is punctured exactly like the median cubital vein",
        b: "Because the brachial artery lies deep and medial to the basilic vein, the phlebotomist should use a shallower needle angle and confirm the vein is not pulsating before inserting",
        c: "The proximity means a tourniquet should never be applied above the basilic vein",
        d: "The proximity only matters for arterial blood gas collection, not for venipuncture",
      },
      correct: "b",
      explanation:
        "Because the brachial artery runs close to and deep to the basilic " +
        "vein, advancing the needle too steeply or too far risks puncturing " +
        "the artery. Using a shallower angle and palpating first to confirm " +
        "there is no pulsation under the intended site reduces that risk when " +
        "the basilic vein is genuinely the only option.",
      why: {
        a: "Treating the basilic identically to the median cubital ignores the added arterial and nerve risk it carries.",
        c: "The risk here comes from needle depth and angle, not from where the tourniquet is placed.",
        d: "This proximity is exactly why the basilic vein is ranked last for routine venipuncture, not a concern limited to arterial blood gas draws.",
      },
      tip: "Deep artery under the basilic vein means a shallow angle and a pulse check first.",
      tags: ["basilic", "brachial-artery", "needle-angle", "site-selection"],
    },
    {
      id: "ana-016",
      subdomain: "Hemostasis",
      difficulty: 1,
      stem: "Place the three phases of hemostasis in the order they occur after a vessel is injured.",
      choices: {
        a: "Coagulation cascade, platelet plug formation, vascular spasm",
        b: "Platelet plug formation, vascular spasm, coagulation cascade",
        c: "Vascular spasm, platelet plug formation, coagulation cascade",
        d: "Vascular spasm, coagulation cascade, platelet plug formation",
      },
      correct: "c",
      explanation:
        "Injury first triggers a vascular spasm that narrows the vessel and " +
        "limits blood loss. Platelets then adhere to the injury site and " +
        "aggregate into a plug within seconds. The coagulation cascade " +
        "follows, laying down fibrin that reinforces and stabilizes that " +
        "plug into a firmer clot.",
      why: {
        a: "The coagulation cascade reinforces the platelet plug, so it cannot occur before that plug exists.",
        b: "The platelet plug forms only after the initial vascular spasm, not before it.",
        d: "This swaps the last two phases; the coagulation cascade stabilizes the platelet plug rather than preceding it.",
      },
      tip: "Spasm, plug, cascade — the S-P-C order of hemostasis.",
      tags: ["hemostasis", "physiology"],
    },
    {
      id: "ana-017",
      subdomain: "Blood composition",
      difficulty: 1,
      stem: "Which group is classified as the 'formed elements' of blood?",
      choices: {
        a: "Erythrocytes, leukocytes, and platelets",
        b: "Plasma, serum, and fibrinogen",
        c: "Water, electrolytes, and albumin",
        d: "Erythrocytes, plasma, and clotting factors",
      },
      correct: "a",
      explanation:
        "The formed elements are the cellular and cell-fragment components " +
        "suspended in blood: red blood cells, white blood cells, and " +
        "platelets. Plasma is the liquid matrix that carries them, and serum " +
        "is simply plasma with the clotting factors removed after clotting " +
        "has occurred.",
      why: {
        b: "Plasma, serum, and fibrinogen are all liquid or dissolved components, not cellular formed elements.",
        c: "Water, electrolytes, and albumin are dissolved constituents of plasma, not formed elements.",
        d: "This mixes a formed element, erythrocytes, with liquid components, plasma and clotting factors.",
      },
      tip: "Formed elements are the cells and cell fragments: RBCs, WBCs, platelets.",
      tags: ["blood-composition", "formed-elements"],
    },
    {
      id: "ana-018",
      subdomain: "Blood composition",
      difficulty: 2,
      stem: "An adult's total blood volume is approximately what proportion of body weight, and why does this matter when several tubes are ordered on one patient?",
      choices: {
        a: "About 7-8% of body weight, so staying within safe maximum draw volumes matters most for small adults, infants, and patients with frequent blood work",
        b: "About 25% of body weight, so draw volume never needs to be tracked",
        c: "About 1-2% of body weight, so almost any standard tube order risks significant blood loss",
        d: "Blood volume is a fixed 5 liters for every adult, regardless of body size",
      },
      correct: "a",
      explanation:
        "Total blood volume runs roughly 7-8% of body weight, which is about " +
        "five liters in an average-sized adult but considerably less in a " +
        "small adult or an infant. Because a smaller patient has less total " +
        "volume to draw from, cumulative draw volume needs to be tracked to " +
        "avoid iatrogenic anemia, especially with frequent testing.",
      why: {
        b: "This overstates the percentage and wrongly dismisses the real need to track cumulative draw volume for smaller patients.",
        c: "This understates the percentage and exaggerates the risk a standard order poses to an average-sized adult.",
        d: "Blood volume scales with body size, so it is not a fixed amount that is the same for every adult.",
      },
      tip: "About 7-8% of body weight is blood — small patients have far less to spare.",
      tags: ["blood-volume", "patient-safety", "physiology"],
    },
    {
      id: "ana-019",
      subdomain: "Hemostasis",
      difficulty: 2,
      stem: "A requisition flags a patient with a platelet count of 18,000/microliter (severe thrombocytopenia). What is the most important adjustment to post-venipuncture care?",
      choices: {
        a: "No adjustment is needed; platelet count does not affect bleeding after venipuncture",
        b: "Apply firm direct pressure to the site for a longer period than usual, and confirm bleeding has fully stopped before releasing the patient",
        c: "Apply a pressure bandage but skip direct manual pressure entirely",
        d: "Have the patient move the arm immediately to help the site clot",
      },
      correct: "b",
      explanation:
        "Platelets form the initial plug that seals a puncture site, and " +
        "severe thrombocytopenia impairs that plug formation, so bleeding " +
        "takes longer to stop. Holding firm direct pressure longer than " +
        "usual and visually confirming hemostasis before the patient leaves " +
        "is the standard adjustment; red cells and white cells do not " +
        "substitute for the platelets' clotting role.",
      why: {
        a: "Platelet count directly determines how quickly a puncture site stops bleeding, so it must change post-draw care.",
        c: "A bandage alone, without direct manual pressure, does not reliably help a fragile platelet plug hold in a patient with severe thrombocytopenia.",
        d: "Moving the arm can dislodge a plug that is still forming and encourage a hematoma, the opposite of what is needed.",
      },
      tip: "Low platelets mean a longer hold — confirm the site has stopped bleeding before the patient leaves.",
      tags: ["platelets", "thrombocytopenia", "post-draw-care"],
    },
    {
      id: "ana-020",
      subdomain: "Site selection",
      difficulty: 2,
      stem: "When antecubital veins are not accessible, which site is an appropriate alternative for venipuncture, and which should be avoided?",
      choices: {
        a: "The dorsal metacarpal veins on the back of the hand are an appropriate alternative; deep veins such as the femoral vein should not be targeted by a phlebotomist",
        b: "The femoral vein is an appropriate first alternative because it is large and easy to palpate",
        c: "Any vein on the palm-side of the wrist is an appropriate site because it is close to the surface",
        d: "Foot veins are always preferred over hand veins in adult patients",
      },
      correct: "a",
      explanation:
        "The dorsal venous network on the back of the hand offers a " +
        "safe, superficial alternative when antecubital veins cannot be " +
        "used, which comes up often in pediatric and difficult-access draws. " +
        "Deep veins such as the femoral vein require specialized training and " +
        "carry substantially higher complication risk, so they are outside " +
        "the scope of routine phlebotomy.",
      why: {
        b: "The femoral vein is deep, requires specialized training or authorization to access, and carries far higher complication risk than a superficial alternative.",
        c: "The palm-side wrist is usually avoided despite being superficial, because the radial artery, tendons, and nerves run close by there.",
        d: "Foot veins carry their own risks and access restrictions, particularly for patients with diabetes or circulation problems, and are not a default preference over hand veins.",
      },
      tip: "Hand veins are a fair backup; femoral and foot veins need special caution or authorization.",
      tags: ["site-selection", "pediatric", "hand-veins", "deep-veins"],
    },
    {
      id: "ana-021",
      subdomain: "Arterial puncture",
      difficulty: 1,
      stem: "Which two arteries are the standard sites for arterial puncture, and where is each located?",
      choices: {
        a: "The radial artery at the wrist and the femoral artery at the groin",
        b: "The brachial artery at the elbow and the carotid artery at the neck",
        c: "The cephalic artery at the wrist and the popliteal artery behind the knee",
        d: "The ulnar artery at the wrist and the axillary artery at the armpit",
      },
      correct: "a",
      explanation:
        "The radial artery at the wrist is the preferred site for arterial " +
        "puncture because it is accessible and has collateral circulation " +
        "backup from the ulnar artery. The femoral artery at the groin is " +
        "used mainly by specially trained personnel when radial access is " +
        "not possible, since it lies deeper and carries higher complication " +
        "risk.",
      why: {
        b: "The brachial artery lacks the radial artery's collateral backup, and the carotid artery sits near vital neck structures, so neither is a standard puncture site.",
        c: "There is no 'cephalic artery' — the cephalic is a superficial vein, so this pairing is anatomically incorrect.",
        d: "The ulnar and axillary arteries are not the standard puncture sites; the ulnar instead supplies the collateral flow that makes the radial site safer.",
      },
      tip: "Radial first, at the wrist with ulnar backup; femoral is for trained specialists only.",
      tags: ["arterial-puncture", "radial-artery", "femoral-artery"],
    },
    {
      id: "ana-022",
      subdomain: "Dermal puncture",
      difficulty: 2,
      stem: "Why is a heel stick on a newborn performed only to a shallow, controlled depth?",
      choices: {
        a: "Because a deeper puncture risks striking the calcaneus (heel bone), which can cause bone injury or infection",
        b: "Because an infant's epidermis is too thick to allow any puncture depth",
        c: "Because a deeper puncture always produces a falsely low hematocrit result",
        d: "Because deeper punctures make the specimen impossible to collect",
      },
      correct: "a",
      explanation:
        "An infant's heel has only a thin layer of soft tissue over the " +
        "calcaneus, so depth-limited safety lancets and approved puncture " +
        "sites are used to stay within the dermis and subcutaneous tissue. " +
        "Puncturing too deep can strike the bone itself and lead to " +
        "osteomyelitis or other bone injury.",
      why: {
        b: "An infant's epidermis is thin, not thick, which is part of why depth has to be limited rather than unrestricted.",
        c: "Hematocrit accuracy depends mainly on collection technique, not directly on how deep the lancet goes; the bone-injury risk is the primary safety reason for a shallow depth.",
        d: "A deeper puncture does not make collection impossible; it creates a genuine safety hazard for the infant.",
      },
      tip: "Heel-stick depth is capped to stay in soft tissue and stay off the calcaneus.",
      tags: ["dermal-puncture", "heel-stick", "pediatric", "skin-anatomy"],
    },
    {
      id: "ana-023",
      subdomain: "Special populations",
      difficulty: 2,
      stem: "A patient has had lymph nodes removed from her left axilla during breast cancer surgery. Why should the phlebotomist avoid drawing blood from her left arm?",
      choices: {
        a: "Lymph node removal disrupts normal lymphatic drainage, and venipuncture on that side raises the risk of complications such as lymphedema and infection",
        b: "The left arm is used because it draws faster after lymph node removal",
        c: "Blood drawn from that arm always produces a falsely elevated potassium result",
        d: "There is no clinical reason to avoid the affected arm; it is only a comfort preference",
      },
      correct: "a",
      explanation:
        "Axillary lymph node removal compromises lymphatic drainage on that " +
        "side, so a needle stick there can trigger swelling, slower healing, " +
        "and a higher infection risk in tissue that already struggles to " +
        "clear fluid. The usual guidance is to use the unaffected arm " +
        "whenever possible, or to consult before drawing from the affected " +
        "side.",
      why: {
        b: "The affected arm is not chosen for speed; it should be avoided because of the impaired lymphatic drainage.",
        c: "Falsely elevated potassium is linked to issues like hemolysis or prolonged fist pumping, not to lymph node removal.",
        d: "This is a documented clinical risk factor in phlebotomy practice, not merely a matter of patient comfort.",
      },
      tip: "No lymph nodes, not the first choice: use the unaffected arm after axillary node removal.",
      tags: [
        "lymphatic-system",
        "mastectomy",
        "site-selection",
        "special-populations",
      ],
    },
    {
      id: "ana-024",
      subdomain: "Terminology",
      difficulty: 1,
      stem: "A requisition note reads: 'Draw from the antecubital fossa, proximal to the wrist, on the medial aspect of the forearm.' What does this description mean in plain terms?",
      choices: {
        a: "Draw from the bend of the elbow, farther from the wrist, on the side of the forearm closest to the body's midline",
        b: "Draw from the back of the hand, closer to the wrist, on the side of the forearm farthest from the body's midline",
        c: "Draw from the bend of the elbow, closer to the wrist than the elbow itself, on the outer side of the forearm",
        d: "Draw from the shoulder, farther from the trunk, on the side of the forearm closest to the thumb",
      },
      correct: "a",
      explanation:
        "'Antecubital' refers to the front of the elbow crease. 'Proximal' " +
        "means closer to the trunk of the body, so a site proximal to the " +
        "wrist sits up toward the elbow rather than down toward the hand. " +
        "'Medial' means toward the body's midline, which on the forearm is " +
        "the little-finger side.",
      why: {
        b: "This reverses both directional terms and misplaces the site on the hand instead of the elbow.",
        c: "This correctly locates the elbow but treats 'medial' as the outer side, when the outer, thumb side is actually lateral.",
        d: "This misplaces the site at the shoulder and confuses 'medial' with the thumb side, which is lateral.",
      },
      tip: "Proximal = closer to the trunk. Medial = toward the midline. Antecubital = front of the elbow.",
      tags: ["terminology", "anatomical-directions", "antecubital"],
    },
    {
      id: "ana-025",
      subdomain: "Blood composition",
      difficulty: 1,
      stem: "Approximately what proportion of whole blood is plasma?",
      choices: {
        a: "About 25%",
        b: "About 45%",
        c: "About 55%",
        d: "About 75%",
      },
      correct: "c",
      explanation:
        "Whole blood is roughly 55% plasma and 45% formed elements — red cells, " +
        "white cells, and platelets. That split is visible in a spun tube, where " +
        "the packed cell column is the hematocrit and the fluid above it is the " +
        "plasma.",
      why: {
        a: "A quarter is far too little; plasma is the larger of the two fractions.",
        b: "45% is the formed-element fraction, not the plasma fraction.",
        d: "Three-quarters would leave too little room for the cellular components.",
      },
      tip: "55 fluid, 45 cells. Spin a tube and you can see the ratio.",
      tags: ["blood-composition", "plasma", "hematocrit"],
    },
    {
      id: "ana-026",
      subdomain: "Blood composition",
      difficulty: 2,
      stem: "What is the essential difference between plasma and serum?",
      choices: {
        a: "Serum contains fibrinogen; plasma does not",
        b: "Plasma contains fibrinogen and clotting factors; serum is what remains after clotting, so it lacks them",
        c: "Plasma is obtained from a serum separator tube",
        d: "Serum contains red cells; plasma does not",
      },
      correct: "b",
      explanation:
        "Plasma comes from an anticoagulated tube, so clotting never happens and " +
        "fibrinogen and the other clotting factors stay in solution. Serum comes " +
        "from a tube allowed to clot, so those factors are consumed in the clot " +
        "and the liquid poured off lacks them.",
      why: {
        a: "This reverses the relationship — fibrinogen is consumed in forming the clot that produces serum.",
        c: "A serum separator tube produces serum, as its name says; plasma comes from anticoagulated tubes.",
        d: "Neither plasma nor serum contains red cells once the specimen is properly separated.",
      },
      tip: "Plasma = anticoagulated, keeps fibrinogen. Serum = clotted, fibrinogen used up. Plasma also gives slightly more volume.",
      tags: ["plasma", "serum", "fibrinogen"],
    },
    {
      id: "ana-027",
      subdomain: "Blood cells",
      difficulty: 2,
      stem: "Which white blood cell is normally the most abundant in adult peripheral blood?",
      choices: {
        a: "Lymphocyte",
        b: "Neutrophil",
        c: "Monocyte",
        d: "Eosinophil",
      },
      correct: "b",
      explanation:
        "Neutrophils are the most numerous white cells in normal adult blood and " +
        "are the first responders to bacterial infection. Lymphocytes come " +
        "second, followed by monocytes, then eosinophils and basophils in small " +
        "numbers.",
      why: {
        a: "Lymphocytes are the second most common in adults, though they predominate in young children.",
        c: "Monocytes are present in modest numbers, well below neutrophils.",
        d: "Eosinophils normally make up only a small percentage of white cells.",
      },
      tip: "Never Let Monkeys Eat Bananas — Neutrophils, Lymphocytes, Monocytes, Eosinophils, Basophils, most to least.",
      tags: ["white-blood-cells", "neutrophils", "differential"],
    },
    {
      id: "ana-028",
      subdomain: "Blood cells",
      difficulty: 2,
      stem: "What is the approximate lifespan of a normal red blood cell in circulation?",
      choices: {
        a: "About 24 hours",
        b: "About 10 days",
        c: "About 120 days",
        d: "About 2 years",
      },
      correct: "c",
      explanation:
        "Red cells circulate for roughly 120 days before being removed, mostly " +
        "in the spleen. That turnover is why a hemoglobin A1c reflects average " +
        "glucose over the preceding two to three months — it is limited by how " +
        "long the cells have been around to be glycated.",
      why: {
        a: "A single day describes neither red cells nor most other blood cells.",
        b: "Roughly ten days is closer to the lifespan of a platelet.",
        d: "No circulating red cell lasts anywhere near two years.",
      },
      tip: "RBC ≈ 120 days, platelets ≈ 10 days. The 120 is why A1c looks back about three months.",
      tags: ["red-blood-cells", "lifespan", "hemoglobin-a1c"],
    },
    {
      id: "ana-029",
      subdomain: "Hemostasis",
      difficulty: 3,
      stem: "Which sequence describes the stages of hemostasis after a vessel is injured?",
      choices: {
        a: "Coagulation, vascular spasm, platelet plug, fibrinolysis",
        b: "Vascular spasm, platelet plug formation, coagulation, fibrinolysis",
        c: "Platelet plug formation, fibrinolysis, vascular spasm, coagulation",
        d: "Fibrinolysis, coagulation, platelet plug, vascular spasm",
      },
      correct: "b",
      explanation:
        "The vessel constricts first, platelets adhere and aggregate into a " +
        "temporary plug, the coagulation cascade lays down fibrin to reinforce " +
        "it, and once the vessel has healed fibrinolysis dissolves the clot " +
        "away. Each stage buys time for the next.",
      why: {
        a: "Coagulation reinforces a plug that must exist first; it does not lead.",
        c: "Dissolving the clot before it forms is self-defeating.",
        d: "Fibrinolysis is the final stage, not the first.",
      },
      tip: "Squeeze, plug, cement, clean up. Spasm → platelets → fibrin → fibrinolysis.",
      tags: ["hemostasis", "coagulation", "platelets"],
    },
    {
      id: "ana-030",
      subdomain: "Vascular anatomy",
      difficulty: 2,
      stem: "How can an artery be distinguished from a vein during site assessment?",
      choices: {
        a: "An artery feels softer and collapses under light pressure",
        b: "An artery pulsates, has a thicker elastic wall, and is usually deeper",
        c: "An artery is always visible through the skin",
        d: "An artery sits closest to the surface in the antecubital fossa",
      },
      correct: "b",
      explanation:
        "Arteries carry blood under pressure, so they pulse under the finger, " +
        "have thick muscular and elastic walls, and generally run deeper than " +
        "the superficial veins used for venipuncture. A pulse under the " +
        "fingertip is a stop signal, not a target.",
      why: {
        a: "Veins are the soft, easily compressed vessels; arteries resist compression.",
        c: "Arteries are typically deeper and less visible than superficial veins.",
        d: "The superficial veins are closest to the surface; the brachial artery lies deeper and more medially.",
      },
      tip: "If it pulses, it's an artery — move on. Feel before you stick, every time.",
      tags: ["arteries", "veins", "palpation"],
    },
    {
      id: "ana-031",
      subdomain: "Vascular anatomy",
      difficulty: 3,
      stem: "Why is the basilic vein generally the last choice among the antecubital veins?",
      choices: {
        a: "It is too small to yield an adequate specimen",
        b: "It lies near the median nerve and the brachial artery, and tends to roll",
        c: "It is a superficial artery rather than a vein",
        d: "It collapses under normal vacuum pressure",
      },
      correct: "b",
      explanation:
        "The basilic vein sits on the medial side of the antecubital fossa, " +
        "close to the median nerve and the brachial artery, and it is less well " +
        "anchored than the median cubital. That combination means a missed stick " +
        "there carries a higher chance of nerve injury or arterial puncture.",
      why: {
        a: "Size is not the objection — the basilic is often prominent and usable.",
        c: "The basilic is a vein; the nearby artery is the brachial.",
        d: "Collapse under vacuum is a technique and vessel-condition issue, not what makes the basilic a last resort.",
      },
      tip: "Median cubital first, cephalic second, basilic last — the nerve and the artery are the reason for the order.",
      tags: ["basilic-vein", "median-nerve", "site-selection"],
    },
    {
      id: "ana-032",
      subdomain: "Vascular anatomy",
      difficulty: 2,
      stem: "Which layer of a blood vessel wall is in direct contact with flowing blood?",
      choices: {
        a: "Tunica adventitia (externa)",
        b: "Tunica media",
        c: "Tunica intima",
        d: "Basement lamina of the epidermis",
      },
      correct: "c",
      explanation:
        "The tunica intima is the innermost layer, lined with endothelium that " +
        "the blood actually touches. The tunica media is the muscular middle " +
        "layer responsible for constriction and dilation, and the tunica " +
        "adventitia is the fibrous outer coat that anchors the vessel.",
      why: {
        a: "The adventitia is the outermost connective tissue layer.",
        b: "The media is the muscular middle layer and does not contact the blood.",
        d: "That structure belongs to skin, not to a blood vessel.",
      },
      tip: "Intima inside, media in the middle, adventitia outside.",
      tags: ["vessel-anatomy", "tunica-intima", "histology"],
    },
    {
      id: "ana-033",
      subdomain: "Circulation",
      difficulty: 2,
      stem: "Blood returning from the body enters which chamber of the heart first?",
      choices: {
        a: "Left atrium",
        b: "Right atrium",
        c: "Left ventricle",
        d: "Right ventricle",
      },
      correct: "b",
      explanation:
        "Deoxygenated blood returns through the venae cavae into the right " +
        "atrium, passes to the right ventricle, and is pumped to the lungs. " +
        "Oxygenated blood comes back to the left atrium, then the left " +
        "ventricle, which drives it out to the body.",
      why: {
        a: "The left atrium receives oxygenated blood returning from the lungs.",
        c: "The left ventricle is the systemic pump, at the end of the circuit rather than the start.",
        d: "The right ventricle receives blood from the right atrium, one step later.",
      },
      tip: "Right side takes blood to the lungs, left side sends it to the body. Atrium receives, ventricle pumps.",
      tags: ["heart", "circulation", "cardiovascular"],
    },
    {
      id: "ana-034",
      subdomain: "Blood cells",
      difficulty: 2,
      stem: "What is the primary function of platelets?",
      choices: {
        a: "Transporting oxygen to tissues",
        b: "Forming the initial plug at a site of vessel injury",
        c: "Producing antibodies against pathogens",
        d: "Carrying carbon dioxide back to the lungs",
      },
      correct: "b",
      explanation:
        "Platelets — thrombocytes — adhere to exposed collagen at an injury, " +
        "activate, and aggregate into the temporary plug that stops bleeding " +
        "while the coagulation cascade builds a fibrin mesh around it.",
      why: {
        a: "Oxygen transport is the red cell's job, performed by hemoglobin.",
        c: "Antibody production belongs to B lymphocytes and plasma cells.",
        d: "Carbon dioxide transport involves red cells and plasma, not platelets.",
      },
      tip: "Platelets plug, red cells carry oxygen, white cells defend.",
      tags: ["platelets", "hemostasis", "blood-cells"],
    },
    {
      id: "ana-035",
      subdomain: "Blood types",
      difficulty: 2,
      stem: "A patient is blood type O negative. What does this mean?",
      choices: {
        a: "Their red cells carry both A and B antigens and no Rh antigen",
        b: "Their red cells carry neither A nor B antigens and no Rh(D) antigen",
        c: "Their plasma contains no antibodies",
        d: "They can receive blood from any donor type",
      },
      correct: "b",
      explanation:
        "Type O means the red cells carry neither the A nor the B antigen, and " +
        "Rh negative means the D antigen is absent as well. Because there is " +
        "nothing on the cells for a recipient's antibodies to attack, O negative " +
        "red cells are the universal donor for red cell transfusion.",
      why: {
        a: "That describes AB, which carries both antigens.",
        c: "Type O plasma contains both anti-A and anti-B antibodies.",
        d: "O negative is the universal red cell donor, not the universal recipient — that is AB positive.",
      },
      tip: "O negative gives to everyone; AB positive receives from everyone.",
      tags: ["blood-types", "abo", "rh-factor"],
    },
    {
      id: "ana-036",
      subdomain: "Vascular anatomy",
      difficulty: 2,
      stem: "Which veins are commonly used when the antecubital veins are unsuitable?",
      choices: {
        a: "The dorsal metacarpal veins on the back of the hand",
        b: "The femoral vein in the groin",
        c: "The jugular vein in the neck",
        d: "The veins on the palm side of the wrist",
      },
      correct: "a",
      explanation:
        "The dorsal metacarpal veins on the back of the hand are the standard " +
        "alternative once the antecubital area is ruled out. They are smaller, " +
        "so a smaller needle or a winged set is used, and the technique adjusts " +
        "for the shallower angle.",
      why: {
        b: "Femoral access is a physician-level procedure, not within a phlebotomist's scope.",
        c: "Jugular collection is performed by specially trained clinicians, typically in neonates.",
        d: "The palm side of the wrist is avoided because of nerve and tendon proximity.",
      },
      tip: "Antecubital first, dorsal hand second. Wrist underside, femoral, and jugular are not yours.",
      tags: ["hand-veins", "alternative-sites", "site-selection"],
    },
    {
      id: "ana-037",
      subdomain: "Blood cells",
      difficulty: 3,
      stem: "Which protein inside the red blood cell binds and carries oxygen?",
      choices: {
        a: "Albumin",
        b: "Hemoglobin",
        c: "Fibrinogen",
        d: "Globulin",
      },
      correct: "b",
      explanation:
        "Hemoglobin is the iron-containing protein filling the red cell. Each " +
        "molecule binds oxygen in the lungs and releases it in the tissues, and " +
        "its concentration is what a hemoglobin measurement reports.",
      why: {
        a: "Albumin is a plasma protein that maintains oncotic pressure and transports various substances.",
        c: "Fibrinogen is a plasma clotting protein, converted to fibrin during coagulation.",
        d: "Globulins are a plasma protein group that includes antibodies.",
      },
      tip: "Hemoglobin is inside the cell; albumin, fibrinogen, and globulins are out in the plasma.",
      tags: ["hemoglobin", "red-blood-cells", "oxygen-transport"],
    },
    {
      id: "ana-038",
      subdomain: "Capillary anatomy",
      difficulty: 3,
      stem: "How does the composition of capillary blood differ from venous blood?",
      choices: {
        a: "It is identical in every respect",
        b: "It is a mixture of arterial and venous blood plus interstitial and intracellular fluid",
        c: "It contains no white blood cells",
        d: "It is purely arterial blood",
      },
      correct: "b",
      explanation:
        "A dermal puncture samples blood from the capillary bed, so it mixes " +
        "arterial and venous blood with a small contribution of interstitial and " +
        "intracellular fluid. That is why some capillary values differ from " +
        "venous ones and why the specimen source is noted.",
      why: {
        a: "Several analytes differ measurably between capillary and venous specimens.",
        c: "White cells are present in capillary blood.",
        d: "Capillary blood is mixed, with a modest arterial predominance in a warmed site — not purely arterial.",
      },
      tip: "Capillary blood is a blend. Note the source, because some values legitimately differ from venous.",
      tags: ["capillary-blood", "dermal-puncture", "specimen-source"],
    },
    {
      id: "ana-039",
      subdomain: "Body systems",
      difficulty: 2,
      stem: "Creatinine and blood urea nitrogen are used primarily to assess which body system?",
      choices: {
        a: "The hepatic system",
        b: "The urinary (renal) system",
        c: "The endocrine system",
        d: "The respiratory system",
      },
      correct: "b",
      explanation:
        "Both are nitrogenous waste products cleared by the kidneys, so their " +
        "concentrations in blood reflect how well the kidneys are filtering. " +
        "Rising levels suggest reduced renal clearance.",
      why: {
        a: "Liver assessment relies on ALT, AST, bilirubin, and albumin.",
        c: "Endocrine assessment uses hormone measurements such as TSH and cortisol.",
        d: "Respiratory function is assessed with blood gases, not with nitrogenous wastes.",
      },
      tip: "Creatinine and BUN mean kidneys. ALT, AST, bilirubin mean liver.",
      tags: ["renal", "creatinine", "bun"],
    },
    {
      id: "ana-040",
      subdomain: "Blood cells",
      difficulty: 2,
      stem: "Where are blood cells primarily produced in an adult?",
      choices: {
        a: "The spleen",
        b: "The red bone marrow",
        c: "The liver",
        d: "The thymus",
      },
      correct: "b",
      explanation:
        "Hematopoiesis in adults takes place in red bone marrow, chiefly in the " +
        "flat bones and the ends of long bones. The liver and spleen perform " +
        "this role in the fetus and can resume it in some disease states, but " +
        "marrow is the normal adult site.",
      why: {
        a: "The spleen filters blood and removes aged red cells rather than producing them in health.",
        c: "The liver is a fetal site of blood formation, not the adult one.",
        d: "The thymus is where T lymphocytes mature, not where blood cells are produced.",
      },
      tip: "Adults make blood in red marrow. The liver and spleen did that job before birth.",
      tags: ["hematopoiesis", "bone-marrow", "blood-cells"],
    },
    {
      id: "ana-041",
      subdomain: "Terminology",
      difficulty: 2,
      stem: "What does the term \"distal\" mean?",
      choices: {
        a: "Closer to the point of attachment or the trunk",
        b: "Farther from the point of attachment or the trunk",
        c: "Toward the midline of the body",
        d: "Toward the back of the body",
      },
      correct: "b",
      explanation:
        "Distal describes a position farther from the trunk or from a limb's " +
        "attachment — the fingers are distal to the wrist, which is distal to " +
        "the elbow. Proximal is its opposite, and both are used constantly in " +
        "describing where a site sits on a limb.",
      why: {
        a: "That is the definition of proximal.",
        c: "Toward the midline is medial.",
        d: "Toward the back is posterior or dorsal.",
      },
      tip: "Distal = distant from the trunk. Proximal = pressed toward it.",
      tags: ["terminology", "anatomical-directions"],
    },
    {
      id: "ana-042",
      subdomain: "Circulation",
      difficulty: 3,
      stem: "Which statement about veins is correct?",
      choices: {
        a: "Veins carry blood away from the heart under high pressure",
        b: "Veins carry blood toward the heart and many contain valves that prevent backflow",
        c: "Veins have thicker muscular walls than arteries",
        d: "Veins never carry oxygenated blood",
      },
      correct: "b",
      explanation:
        "Veins return blood to the heart at low pressure, which is why many — " +
        "especially in the limbs — carry one-way valves that stop blood falling " +
        "backward between muscular contractions. A valve encountered during a " +
        "draw is one cause of a vein that will not yield blood.",
      why: {
        a: "Carrying blood away from the heart under high pressure describes arteries.",
        c: "Arteries have the thicker, more muscular walls; vein walls are comparatively thin.",
        d: "The pulmonary veins carry oxygenated blood from the lungs to the heart.",
      },
      tip: "Veins go toward the heart, have valves, and are thin-walled. The pulmonary vein is the oxygenated exception.",
      tags: ["veins", "valves", "circulation"],
    },
    {
      id: "ana-043",
      subdomain: "Vascular anatomy",
      difficulty: 3,
      stem: "In the common \"H\" pattern of antecubital veins, which vein connects the cephalic and basilic veins?",
      choices: {
        a: "The brachial vein",
        b: "The median cubital vein",
        c: "The radial vein",
        d: "The axillary vein",
      },
      correct: "b",
      explanation:
        "In the H pattern the median cubital vein runs diagonally between the " +
        "cephalic vein laterally and the basilic vein medially, forming the " +
        "crossbar. Its central position, size, and anchoring are what make it " +
        "the first-choice site.",
      why: {
        a: "The brachial vein is a deep vessel running with the brachial artery, not part of the superficial pattern.",
        c: "The radial vein is a deep forearm vessel, not part of the antecubital surface pattern.",
        d: "The axillary vein lies at the shoulder, well above the antecubital fossa.",
      },
      tip: "In an H, the median cubital is the crossbar joining cephalic to basilic — and it's your first choice.",
      tags: ["median-cubital", "h-pattern", "antecubital"],
    },
    {
      id: "ana-044",
      subdomain: "Blood cells",
      difficulty: 2,
      stem: "An elevated eosinophil count is most often associated with which condition?",
      choices: {
        a: "Acute bacterial infection",
        b: "Allergic reactions and parasitic infections",
        c: "Iron deficiency",
        d: "Dehydration",
      },
      correct: "b",
      explanation:
        "Eosinophils rise in allergic and parasitic conditions. Acute bacterial " +
        "infection typically drives neutrophils up instead, and viral infection " +
        "more often raises lymphocytes — which is why the differential count is " +
        "informative beyond the total white count.",
      why: {
        a: "A neutrophil rise is the classic response to acute bacterial infection.",
        c: "Iron deficiency shows in red cell indices, not in the eosinophil count.",
        d: "Dehydration concentrates all cell lines relatively rather than selectively raising eosinophils.",
      },
      tip: "Eosinophils: allergies and parasites. Neutrophils: bacteria. Lymphocytes: viruses.",
      tags: ["eosinophils", "differential", "white-blood-cells"],
    },
    {
      id: "ana-045",
      subdomain: "Terminology",
      difficulty: 2,
      stem: "The suffix \"-emia\" refers to what?",
      choices: {
        a: "A condition of the blood",
        b: "Inflammation",
        c: "Surgical removal",
        d: "Excessive discharge",
      },
      correct: "a",
      explanation:
        "\"-emia\" denotes a blood condition, which is why it appears in anemia, " +
        "leukemia, bacteremia, and hyperglycemia. Recognizing it makes " +
        "unfamiliar terms on a requisition readable rather than memorized.",
      why: {
        b: "Inflammation is \"-itis\", as in phlebitis.",
        c: "Surgical removal is \"-ectomy\", as in splenectomy.",
        d: "Excessive discharge is \"-rrhea\".",
      },
      tip: "-emia = blood, -itis = inflammation, -ectomy = removal, -ology = study of.",
      tags: ["terminology", "word-parts", "suffixes"],
    },
    {
      id: "ana-046",
      subdomain: "Hemostasis",
      difficulty: 3,
      stem: "Why do EDTA and sodium citrate prevent a specimen from clotting?",
      choices: {
        a: "They destroy platelets",
        b: "They bind calcium, which the coagulation cascade requires",
        c: "They inhibit thrombin directly",
        d: "They lower the specimen's pH below the range where clotting occurs",
      },
      correct: "b",
      explanation:
        "Both are chelators: they bind the calcium ions that several steps of " +
        "the coagulation cascade depend on, so the cascade cannot proceed. " +
        "Heparin works by a different mechanism — it enhances antithrombin and " +
        "so inhibits thrombin and factor Xa.",
      why: {
        a: "Platelets remain present and are counted from an EDTA specimen; that is what makes it the hematology tube.",
        c: "Direct thrombin inhibition is not how calcium chelators act; heparin's mechanism is the antithrombin route.",
        d: "Neither works through a pH shift.",
      },
      tip: "EDTA and citrate grab calcium. Heparin boosts antithrombin. Different mechanisms, different uses.",
      tags: ["anticoagulants", "calcium", "coagulation"],
    },
    {
      id: "ana-047",
      subdomain: "Vascular anatomy",
      difficulty: 3,
      stem: "Which structure lies close enough to the medial antecubital area to make an inadvertent puncture there particularly serious?",
      choices: {
        a: "The ulnar nerve at the wrist",
        b: "The median nerve and the brachial artery",
        c: "The radial artery",
        d: "The cephalic vein",
      },
      correct: "b",
      explanation:
        "The median nerve and the brachial artery run near the basilic vein on " +
        "the medial side of the antecubital fossa. Puncturing either can produce " +
        "lasting nerve injury or significant arterial bleeding, which is why the " +
        "medial approach is the last one attempted.",
      why: {
        a: "The ulnar nerve is a concern at the wrist rather than in the medial antecubital area.",
        c: "The radial artery is at the wrist and is used for arterial sampling by trained staff.",
        d: "The cephalic vein is a lateral vein and is a routine, comparatively safe alternative.",
      },
      tip: "Medial antecubital = nerve and artery territory. That is why basilic is last.",
      tags: ["median-nerve", "brachial-artery", "complications"],
    },
    {
      id: "ana-048",
      subdomain: "Blood composition",
      difficulty: 2,
      stem: "A hematocrit result of 45% means what?",
      choices: {
        a: "45% of the blood volume is plasma",
        b: "45% of the blood volume is packed red cells",
        c: "45% of red cells are abnormally shaped",
        d: "The hemoglobin is 45 g/dL",
      },
      correct: "b",
      explanation:
        "Hematocrit is the proportion of blood volume occupied by packed red " +
        "cells. It moves with hydration as well as with red cell mass, which is " +
        "why a dehydrated patient can show a falsely elevated value.",
      why: {
        a: "That is the remaining fraction — plasma — not the hematocrit itself.",
        c: "Red cell shape abnormalities are reported on a blood film, not by hematocrit.",
        d: "A hemoglobin of 45 g/dL is not physiologically possible; the units and the measurement differ.",
      },
      tip: "Hematocrit = packed red cell fraction. Dehydration pushes it up without adding a single cell.",
      tags: ["hematocrit", "red-blood-cells", "blood-composition"],
    },
    {
      id: "ana-049",
      subdomain: "Body systems",
      difficulty: 2,
      stem: "The lymphatic system's role most relevant to phlebotomy site selection is what?",
      choices: {
        a: "It produces red blood cells",
        b: "It drains interstitial fluid, so impaired drainage after node removal makes a limb prone to swelling and infection",
        c: "It regulates blood pressure directly",
        d: "It transports oxygen to tissues",
      },
      correct: "b",
      explanation:
        "Lymphatics return interstitial fluid to circulation and filter it " +
        "through nodes. When nodes are removed or damaged, drainage on that side " +
        "is impaired — the limb swells more readily and clears infection less " +
        "well, which is why that arm is avoided for venipuncture.",
      why: {
        a: "Red cells are produced in bone marrow.",
        c: "Blood pressure regulation is primarily cardiovascular, renal, and endocrine.",
        d: "Oxygen transport belongs to red cells in the bloodstream.",
      },
      tip: "Nodes removed means drainage impaired, and impaired drainage is why that arm stays out of the plan.",
      tags: ["lymphatic-system", "mastectomy", "site-selection"],
    },
    {
      id: "ana-050",
      subdomain: "Skin anatomy",
      difficulty: 3,
      stem: "During a dermal puncture, which skin layer must the lancet reach to obtain blood?",
      choices: {
        a: "The epidermis only",
        b: "The dermis, where the capillary beds lie",
        c: "The subcutaneous fat layer",
        d: "The periosteum of the underlying bone",
      },
      correct: "b",
      explanation:
        "The capillary beds that supply a dermal puncture sit in the dermis, " +
        "beneath the avascular epidermis. Lancet depth is chosen to reach them " +
        "without going deeper — reaching bone risks osteomyelitis, which is the " +
        "reason heel puncture depth is limited in infants.",
      why: {
        a: "The epidermis has no blood vessels, so a puncture confined to it yields nothing.",
        c: "Passing into subcutaneous fat is deeper than needed and increases injury risk without improving flow.",
        d: "Contacting bone is a recognized complication to be avoided, not a target.",
      },
      tip: "Deep enough for the dermis, never deep enough for bone. That's why lancet depth is specified.",
      tags: ["dermal-puncture", "skin-anatomy", "capillary-collection"],
    },
  ],
);

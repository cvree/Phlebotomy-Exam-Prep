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
  ],
);

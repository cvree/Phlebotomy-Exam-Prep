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
        c: "Leukocytes handle immune defence.",
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
        c: "Directly in the centre of the fossa",
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
        c: "The median cubital vein typically crosses the centre.",
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
  ],
);

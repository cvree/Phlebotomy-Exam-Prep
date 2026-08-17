import { buildQuestions } from "./authoring";
import { SRC_CLSI_GP41, SRC_TEXTBOOK_CURRICULUM } from "@/data/sources";

export const PATIENT_PREP_QUESTIONS = buildQuestions(
  {
    domain: "patient-preparation",
    certifications: ["nha-cpt"],
    sources: [SRC_CLSI_GP41, SRC_TEXTBOOK_CURRICULUM],
    reviewStatus: "needs-review",
  },
  [
    {
      id: "pre-001",
      subdomain: "Fasting",
      difficulty: 2,
      stem: "A patient scheduled for a fasting lipid panel reports drinking black coffee two hours ago. What should the phlebotomist do?",
      choices: {
        a: "Proceed with the draw; black coffee does not break a fast",
        b: "Cancel the test and reschedule for the next morning",
        c: "Proceed with the draw and document the non-fasting status per facility policy",
        d: "Have the patient wait four more hours and then draw",
      },
      correct: "c",
      explanation:
        "Coffee — even black — stimulates metabolism and is not permitted " +
        "during a true fast, in which only water is allowed. The phlebotomist " +
        "does not unilaterally cancel an ordered test. Collect if policy " +
        "allows, document that the patient was not fasting so the result can " +
        "be interpreted correctly, and notify per your facility's process.",
      why: {
        a: "Water only. Coffee, tea, gum, and smoking all affect a fasting specimen.",
        b: "Cancelling an ordered test is not the phlebotomist's decision.",
        d: "Ad hoc rescheduling at the drawing chair is not the correct process and wastes the patient's day.",
      },
      tip: "A fast means water only. When the fast is broken, document it rather than hiding it — the number is only interpretable with that context.",
      tags: ["fasting", "lipid-panel"],
    },
    {
      id: "pre-002",
      subdomain: "Consent",
      difficulty: 2,
      stem: "A competent adult inpatient says \"No, I don't want any more blood taken\" when the phlebotomist arrives. What is the correct response?",
      choices: {
        a: "Explain that the doctor ordered it and proceed",
        b: "Stop, do not draw, and report the refusal to the nurse and per facility policy",
        c: "Return in ten minutes and try again without discussion",
        d: "Ask a family member to authorise the draw",
      },
      correct: "b",
      explanation:
        "A competent adult can refuse any procedure. Proceeding without " +
        "consent is battery. The correct action is to stop, thank the " +
        "patient, and report the refusal so the care team can address it — " +
        "often the patient's concern is answerable, but that conversation " +
        "belongs to the team, not to a forced draw.",
      why: {
        a: "An order authorises the test; it does not override the patient's refusal.",
        c: "Repeated attempts to catch a patient off guard are coercive.",
        d: "Family members cannot consent for a competent adult.",
      },
      tip: "Consent is ongoing. A patient can withdraw it at any point, including mid-procedure.",
      tags: ["consent", "refusal", "ethics"],
    },
    {
      id: "pre-003",
      subdomain: "Basal state",
      difficulty: 2,
      stem: "The term \"basal state\" refers to a patient who:",
      choices: {
        a: "Has been fasting for 12 hours and is at rest, typically drawn early in the morning",
        b: "Has just completed moderate exercise",
        c: "Is lying flat regardless of when they last ate",
        d: "Has abstained from all medication for 24 hours",
      },
      correct: "a",
      explanation:
        "Basal state describes the body after roughly 12 hours of fasting " +
        "and rest, which in practice means an early-morning draw before " +
        "the patient has eaten or become active. Many reference ranges were " +
        "established on basal-state specimens, which is why the timing " +
        "matters for comparability.",
      why: {
        b: "Exercise shifts numerous analytes and is the opposite of basal.",
        c: "Position affects some analytes but is not what basal state means on its own.",
        d: "Medication holds are a separate instruction from the ordering provider.",
      },
      tip: "Basal state is why morning draws exist. Reference ranges assume it.",
      tags: ["basal-state", "timing"],
    },
    {
      id: "pre-004",
      subdomain: "Site assessment",
      difficulty: 3,
      stem: "A patient has had a mastectomy with lymph node dissection on the left side and has an IV running in the right forearm. Where should the phlebotomist look first?",
      choices: {
        a: "The left arm, since the right arm has an IV",
        b: "Above the IV site on the right arm",
        c: "A site on the right arm below the IV, or an alternative site such as the hand or foot per policy — after consulting the nurse",
        d: "Any convenient vein, since neither restriction is absolute",
      },
      correct: "c",
      explanation:
        "Both arms are restricted, so this needs a deliberate decision rather " +
        "than a default. The mastectomy side is generally avoided because " +
        "lymph node removal impairs drainage and raises infection and " +
        "lymphedema risk. On the IV side, drawing above the IV contaminates " +
        "the specimen with infusing fluid; below it, after the infusion has " +
        "been stopped for a period per policy, is the usual approach. When " +
        "both arms are compromised, involve the nurse and follow facility " +
        "policy — which may require provider authorisation.",
      why: {
        a: "The mastectomy side is the restriction that most facilities treat most conservatively, and it is not automatically overridden by an IV on the other side.",
        b: "Drawing above a running IV is the classic way to produce a wildly wrong potassium or glucose.",
        d: "Both restrictions exist for real reasons and are not optional.",
      },
      tip: "Never above a running IV. When both arms are restricted, escalate rather than improvise.",
      tags: ["site-selection", "mastectomy", "iv"],
    },
    {
      id: "pre-005",
      subdomain: "Positioning",
      difficulty: 2,
      stem: "A patient tells the phlebotomist they fainted the last time they had blood drawn. What is the most appropriate action?",
      choices: {
        a: "Draw quickly so the patient has less time to react",
        b: "Have the patient lie down for the draw and stay with them afterwards",
        c: "Ask a colleague to perform the draw instead",
        d: "Give the patient juice before starting",
      },
      correct: "b",
      explanation:
        "A history of syncope is the single best predictor of syncope, and " +
        "the response is to remove the fall risk: draw the patient supine, " +
        "or at minimum reclined, and keep them under observation afterwards. " +
        "A fainting patient in a standing or seated position can sustain a " +
        "head injury far worse than the draw itself.",
      why: {
        a: "Speed does not prevent a vasovagal response, and rushing increases the chance of a failed stick and a repeat.",
        c: "Changing operators does not change the patient's physiology.",
        d: "Food or drink may help a patient who is fasting and lightheaded, but positioning is what prevents injury.",
      },
      tip: "Ask every patient about previous reactions. It takes five seconds and prevents most syncope injuries.",
      tags: ["syncope", "positioning", "history"],
    },
    {
      id: "pre-006",
      subdomain: "Allergies",
      difficulty: 2,
      stem: "A patient reports a latex allergy. Which supply most needs to be checked before the draw?",
      choices: {
        a: "The evacuated tubes",
        b: "The tourniquet, gloves, and adhesive bandage",
        c: "The alcohol prep pad",
        d: "The needle",
      },
      correct: "b",
      explanation:
        "Latex shows up in reusable tourniquets, some gloves, and many " +
        "adhesive bandages — all of which contact the skin for a sustained " +
        "period. Latex-free substitutes exist for each, and a patient with a " +
        "documented allergy needs all three swapped, not just the gloves.",
      why: {
        a: "Some tube stoppers historically contained latex, so it is worth being aware of, but the tourniquet, gloves, and bandage are the direct and prolonged skin contacts.",
        c: "Alcohol pads are not a latex source.",
        d: "The needle itself is stainless steel.",
      },
      tip: "Latex-free means the whole kit. People remember gloves and forget the tourniquet and the bandage.",
      tags: ["latex-allergy", "equipment"],
    },
    {
      id: "pre-007",
      subdomain: "Communication",
      difficulty: 2,
      stem: "A nine-year-old child is visibly anxious about the draw. Which approach is most appropriate?",
      choices: {
        a: "Tell the child it will not hurt at all",
        b: "Explain honestly and simply what will happen, and offer a limited real choice such as which arm",
        c: "Have the parent restrain the child so the draw can be done quickly",
        d: "Postpone the draw until the child is calm on their own",
      },
      correct: "b",
      explanation:
        "Honesty plus a small amount of control works better than " +
        "reassurance that turns out to be false. Telling a child it will not " +
        "hurt destroys their trust the moment the needle goes in — and their " +
        "trust in the next healthcare worker too. Offering a genuine choice " +
        "within a fixed frame ('which arm?' not 'shall we?') gives the child " +
        "agency without making the procedure negotiable.",
      why: {
        a: "It is untrue, and the child will know within seconds.",
        c: "Holding techniques have a place with young children, but restraint is not the first move for a nine-year-old who can be talked with.",
        d: "Open-ended delay usually increases anxiety rather than resolving it.",
      },
      tip: "Never promise it will not hurt. Say what it will feel like and how long it will last.",
      tags: ["pediatric", "communication"],
    },
    {
      id: "pre-008",
      subdomain: "Timing",
      difficulty: 3,
      stem: "A trough level for an antibiotic is ordered. When should the specimen be collected?",
      choices: {
        a: "Thirty minutes after the dose is given",
        b: "Immediately before the next scheduled dose",
        c: "At the midpoint between two doses",
        d: "At any time, provided the exact time is documented",
      },
      correct: "b",
      explanation:
        "A trough is the lowest concentration in the dosing interval, which " +
        "occurs just before the next dose. It tells the clinician whether the " +
        "drug is staying above the therapeutic threshold. A peak — collected " +
        "a specified interval after administration — answers the opposite " +
        "question, whether the concentration is climbing into a toxic range.",
      why: {
        a: "That timing describes a peak, not a trough, and the exact interval depends on the drug and route.",
        c: "A midpoint level is neither, and is not interpretable against trough reference ranges.",
        d: "Documentation is required but does not substitute for correct timing — a mistimed level is clinically useless.",
      },
      tip: "Trough = lowest = just before the next dose. Peak = highest = a set interval after it. Always record the exact collection time.",
      tags: ["tdm", "trough", "timing"],
    },
    {
      id: "pre-009",
      subdomain: "Site assessment",
      difficulty: 2,
      stem: "Which site should be avoided for routine venipuncture?",
      choices: {
        a: "The median cubital vein in the antecubital fossa",
        b: "An area of extensive scarring from burns",
        c: "The cephalic vein on the lateral aspect of the arm",
        d: "The dorsal hand veins using a winged set",
      },
      correct: "b",
      explanation:
        "Burned and heavily scarred tissue is avoided: the veins are hard to " +
        "palpate and often sclerosed, the tissue is fragile, the area is more " +
        "susceptible to infection, and sensation may be altered so the " +
        "patient cannot report nerve pain reliably. Edematous, hematomatous, " +
        "and heavily tattooed-and-inflamed sites are avoided for related " +
        "reasons.",
      why: {
        a: "The median cubital vein is the usual first choice.",
        c: "The cephalic vein is a reasonable second choice, particularly in larger patients.",
        d: "Hand veins with a winged set are a normal alternative when the antecubital is unusable.",
      },
      tip: "Avoid: burns, scars, edema, hematoma, and the same-side mastectomy. Each one is unreliable for a different reason.",
      tags: ["site-selection", "contraindications"],
    },
    {
      id: "pre-010",
      subdomain: "Fasting",
      difficulty: 1,
      stem: "For a standard fasting specimen, what is the patient permitted to consume during the fasting period?",
      choices: {
        a: "Water only",
        b: "Water and clear juice",
        c: "Water and black coffee",
        d: "Nothing at all, including water",
      },
      correct: "a",
      explanation:
        "Water is allowed and is actively encouraged — a dehydrated patient " +
        "is harder to draw and their results can be affected by " +
        "hemoconcentration. Everything else is excluded, including juice, " +
        "coffee, tea, gum, mints, and smoking.",
      why: {
        b: "Juice contains sugar and directly affects glucose and lipids.",
        c: "Coffee is a metabolic stimulant and is not permitted.",
        d: "Withholding water is not required and makes the draw harder.",
      },
      tip: "Water yes, everything else no. Encourage water — hydrated veins are easier veins.",
      tags: ["fasting", "hydration"],
    },
    {
      id: "pre-011",
      subdomain: "Fasting",
      difficulty: 2,
      stem: "A patient scheduled for a fasting lipid panel and fasting glucose asks how long the fast needs to be, then admits they stopped eating only six hours ago. What should the phlebotomist tell the patient and do?",
      choices: {
        a: "Explain that the standard fasting window is 8 to 12 hours with water permitted throughout, so six hours is not enough, and follow facility policy for a non-fasting draw or reschedule",
        b: "Explain that 4 hours is the minimum, so six hours is fine and the draw can proceed as a standard fast",
        c: "Explain that a full 24 hours with no fluids at all is required, so the patient must be sent home",
        d: "Explain that there is no minimum fasting time as long as the patient avoided sugary foods",
      },
      correct: "a",
      explanation:
        "Routine fasting lipid and glucose testing is built around an 8 to " +
        "12 hour fast, with water encouraged rather than restricted. Six " +
        "hours falls short of that window, so the phlebotomist should tell " +
        "the patient clearly and either reschedule or draw and document the " +
        "non-fasting status per policy, rather than treating it as close " +
        "enough.",
      why: {
        b: "Four hours is well short of the standard window; treating it as sufficient would mislabel a non-fasting specimen as fasting.",
        c: "Twenty-four hours with no fluids is excessive and inaccurate — water is permitted and encouraged during a normal fast.",
        d: "There is a real minimum duration; avoiding sugar alone does not substitute for the fasting window the reference range assumes.",
      },
      tip: "8 to 12 hours, water allowed. Anything short of that gets documented, not waved through.",
      tags: ["fasting", "lipid-panel", "glucose"],
    },
    {
      id: "pre-012",
      subdomain: "Basal state",
      difficulty: 2,
      stem: "A provider orders a cortisol level specifically timed for an early-morning draw to evaluate diurnal variation. Why does the collection time matter for this test?",
      choices: {
        a: "Cortisol is highest in the early morning and declines through the day, so a level drawn later cannot be judged against the AM reference range",
        b: "Cortisol does not vary by time of day, but morning draws are simply easier to schedule around fasting",
        c: "The laboratory's analyzer is only calibrated for cortisol testing in the morning",
        d: "An AM draw guarantees the patient has already eaten breakfast before collection",
      },
      correct: "a",
      explanation:
        "Cortisol follows a diurnal rhythm, peaking shortly after waking and " +
        "falling through the day. Reference ranges for a routine AM cortisol " +
        "are built on that pattern, so a specimen drawn at the wrong time of " +
        "day reflects a different point on the curve and cannot be " +
        "interpreted against the ordered range — the result is effectively " +
        "meaningless without knowing exactly when it was drawn.",
      why: {
        b: "Cortisol is strongly time-dependent; the AM order exists precisely because the analyte itself changes across the day.",
        c: "Analyzer calibration is not tied to time of day and has nothing to do with why the order specifies a morning draw.",
        d: "Whether the patient has eaten is a separate consideration from why the timing of a diurnal hormone matters.",
      },
      tip: "Time-sensitive hormones are basal-state analytes: draw at the ordered hour or the number can't be interpreted.",
      tags: ["basal-state", "cortisol", "timing"],
    },
    {
      id: "pre-013",
      subdomain: "Timing",
      difficulty: 3,
      stem: "A patient's gentamicin infusion was scheduled to end at 0800 but actually finished at 0815 due to a delay. The order calls for a peak level 30 minutes after the infusion ends. It is now 0830. What should the phlebotomist do?",
      choices: {
        a: "Draw now, at 0830, since it is close enough to the scheduled time",
        b: "Wait until 0845 — 30 minutes after the infusion actually finished — and record the exact draw time on the requisition",
        c: "Draw at 0800, matching the originally scheduled infusion end time",
        d: "Ask the nursing staff to adjust the next dose so future draws line up with the order sheet",
      },
      correct: "b",
      explanation:
        "Peak levels are timed from when the dose actually finished infusing, " +
        "not from the time printed on the schedule. Drawing at 0830 would " +
        "catch the drug mid-distribution and read falsely high, which could " +
        "prompt an inappropriate dose reduction. The phlebotomist should wait " +
        "for the correct interval from the real infusion end and document " +
        "both times precisely so pharmacy can interpret the result.",
      why: {
        a: "Fifteen minutes early misses the distribution phase and produces a falsely elevated level, not merely a slightly imprecise one.",
        c: "0800 was before the infusion even finished; a level drawn then reflects the drug still being administered, not a peak.",
        d: "Medication timing is never adjusted to make a lab draw easier — the draw is scheduled around the dose, not the reverse.",
      },
      tip: "Peak and trough timing anchors to the actual dose, not the clock time on the order sheet.",
      tags: ["tdm", "peak", "timing"],
    },
    {
      id: "pre-014",
      subdomain: "Consent",
      difficulty: 1,
      stem: "For a routine venipuncture, what does obtaining informed consent actually require of the phlebotomist?",
      choices: {
        a: "Having the patient sign a written consent form before every draw",
        b: "Explaining the procedure in terms the patient can understand and getting their verbal agreement to proceed",
        c: "Notifying the patient's emergency contact before starting",
        d: "Confirming in the chart that the ordering provider already explained the test",
      },
      correct: "b",
      explanation:
        "Consent for a routine draw is typically implied or verbal: the " +
        "phlebotomist briefly explains what is about to happen in plain " +
        "language and confirms the patient agrees. A signed form is not the " +
        "standard for this level of procedure, and the consent obtained this " +
        "way can be withdrawn by the patient at any point, before or during " +
        "the draw.",
      why: {
        a: "Written, signed consent is reserved for higher-risk procedures, not a standard venipuncture.",
        c: "Contacting a family member is not part of consent and is not required for a competent adult's own procedure.",
        d: "A provider's earlier explanation of the test does not substitute for the phlebotomist's own consent conversation at the bedside.",
      },
      tip: "Consent means the patient understood and agreed in the moment — not just that a form exists somewhere in the chart.",
      tags: ["consent", "communication"],
    },
    {
      id: "pre-015",
      subdomain: "Consent",
      difficulty: 2,
      stem: "The tourniquet is already applied and the phlebotomist is about to insert the needle when the patient says, \"Wait, stop, I changed my mind.\" What should the phlebotomist do?",
      choices: {
        a: "Explain that it's too late to stop now that the tourniquet is on",
        b: "Immediately stop, release the tourniquet, and do not insert the needle",
        c: "Insert the needle quickly since stopping partway is more upsetting for the patient",
        d: "Insert the needle but withdraw only a small partial sample",
      },
      correct: "b",
      explanation:
        "Consent can be withdrawn at any point up until — and including — the " +
        "moment of the draw. Once a competent patient withdraws consent, " +
        "proceeding anyway is a violation of their rights regardless of how " +
        "much setup has already happened. The correct response is to stop " +
        "immediately, remove the tourniquet, reassure the patient, and " +
        "document and report the refusal per policy.",
      why: {
        a: "There is no point in the setup, including a tourniquet already in place, where consent becomes irreversible.",
        c: "Speed does not make an unconsented procedure acceptable; \"faster\" is not an exception to withdrawn consent.",
        d: "Any needle insertion after consent has been withdrawn is unauthorized, regardless of how little sample is taken.",
      },
      tip: "Withdrawn consent is honored immediately — even with the tourniquet already on and the needle in hand.",
      tags: ["consent", "refusal"],
    },
    {
      id: "pre-016",
      subdomain: "Positioning",
      difficulty: 2,
      stem: "A patient mentions they usually feel dizzy at the sight of a needle, though they have never actually fainted during a draw. What should the phlebotomist do?",
      choices: {
        a: "Proceed in the standard seated position, since the patient has never actually fainted",
        b: "Recline or lay the patient down before starting, and keep the needle out of the patient's direct line of sight",
        c: "Have the patient stand and walk around briefly before the draw to settle their nerves",
        d: "Delay the draw until the patient reports feeling no anxiety at all",
      },
      correct: "b",
      explanation:
        "The injury from a vasovagal reaction comes from an unprotected fall, " +
        "not from the needle itself, so a reported history of dizziness — " +
        "even without a completed faint — is enough reason to reposition the " +
        "patient reclined before starting rather than waiting for symptoms to " +
        "appear. Keeping the needle out of view is a simple additional step " +
        "for patients sensitive to the sight of it.",
      why: {
        a: "Waiting for a confirmed fainting episode before taking precautions misses the point of prevention; reported dizziness is itself the warning sign.",
        c: "Standing and walking increases orthostatic and vasovagal risk rather than reducing it.",
        d: "Requiring zero anxiety before proceeding is neither realistic nor necessary; positioning addresses the physiological risk directly.",
      },
      tip: "Don't wait for a full faint to take it seriously — any reported dizziness earns a reclined position up front.",
      tags: ["syncope", "positioning", "risk-assessment"],
    },
    {
      id: "pre-017",
      subdomain: "Allergies",
      difficulty: 1,
      stem: "Before gathering supplies for a draw, how should a phlebotomist screen for a latex allergy?",
      choices: {
        a: "Assume there is no allergy unless the patient volunteers it without being asked",
        b: "Check the chart for an allergy alert and directly ask the patient about latex sensitivity before selecting a tourniquet and gloves",
        c: "Apply the tourniquet as usual and watch for a reaction before deciding",
        d: "Only ask about latex if the patient is scheduled for a procedure that specifically involves latex gloves",
      },
      correct: "b",
      explanation:
        "Screening happens before supplies are chosen, not after: checking " +
        "the chart catches a documented allergy, and asking directly catches " +
        "one that is new, undocumented, or that the patient did not think to " +
        "mention. Doing both up front lets latex-free equipment be selected " +
        "from the start instead of swapped out mid-setup.",
      why: {
        a: "Relying on the patient to volunteer the information unprompted misses people who don't realize it's relevant to a blood draw.",
        c: "Waiting to see whether skin contact causes a reaction means the exposure has already happened, defeating the purpose of screening.",
        d: "Gloves and a tourniquet are latex sources in essentially every venipuncture, not just in procedures explicitly labeled as involving latex.",
      },
      tip: "Screen before you gather supplies, not while you're already reaching for them — chart plus a direct question, every time.",
      tags: ["latex-allergy", "screening", "preparation"],
    },
    {
      id: "pre-018",
      subdomain: "Site assessment",
      difficulty: 3,
      stem: "Before approaching a patient for a scheduled draw, a phlebotomist reads a chart note from the previous visit: \"Difficult stick, multiple attempts, right median cubital bruised.\" How should this note change the approach?",
      choices: {
        a: "It shouldn't change anything, since veins fully recover between visits",
        b: "Plan to assess both arms carefully, favor an alternate site over the previously bruised area, and consider a more experienced phlebotomist if the patient is known to be difficult",
        c: "Go straight to the right median cubital again, since it has already been located once before",
        d: "Order a less invasive test in place of the one requested",
      },
      correct: "b",
      explanation:
        "A documented difficult draw is information worth acting on before " +
        "the patient is even approached: it flags a site that may still be " +
        "bruised or traumatized and a patient for whom the first attempt " +
        "matters more than usual. Reviewing it in advance allows a " +
        "deliberate plan — checking both arms, avoiding the injured site, " +
        "and pulling in more experienced help if needed — rather than " +
        "repeating whatever led to the previous difficulty.",
      why: {
        a: "Bruising and vessel trauma from a difficult prior stick can persist for days, and re-puncturing that same area risks further injury.",
        c: "Reusing the exact site the note is warning about ignores the purpose of documenting it in the first place.",
        d: "A phlebotomist does not have the authority to substitute a different test for the one that was ordered.",
      },
      tip: "A chart note about a hard stick exists to be read before you walk in, not discovered again the hard way.",
      tags: ["site-selection", "history", "preparation"],
    },
    {
      id: "pre-019",
      subdomain: "Communication",
      difficulty: 2,
      stem: "An adult patient is trembling and says they hate needles but are willing to go through with the draw. Which approach best supports getting it done safely?",
      choices: {
        a: "Speak calmly, briefly explain each step just before doing it, and offer a simple distraction such as looking away or talking about something else",
        b: "Hold the patient's arm firmly in place without asking, so they cannot pull away during the stick",
        c: "Tell the patient to stop being dramatic and hold still",
        d: "Skip explaining any of the steps and move as fast as possible without narrating anything",
      },
      correct: "a",
      explanation:
        "A cooperative but anxious adult responds best to calm, brief warnings " +
        "before each step (\"small pinch now\") paired with an optional " +
        "distraction technique. This keeps the patient informed and gives " +
        "them a sense of control, which lowers the chance of a sudden " +
        "movement, without needing to physically restrain someone who has " +
        "already agreed to the draw.",
      why: {
        b: "Restraining a patient who is anxious but cooperating and has not withdrawn consent is inappropriate and can itself cause harm or distress.",
        c: "Dismissive language increases anxiety and damages the patient's trust rather than calming them.",
        d: "Withholding any explanation removes the patient's ability to anticipate what's happening, which tends to heighten fear rather than reduce it.",
      },
      tip: "An anxious but cooperative adult needs communication and a sense of control, not restraint.",
      tags: ["anxiety", "communication", "de-escalation"],
    },
    {
      id: "pre-020",
      subdomain: "Communication",
      difficulty: 2,
      stem: "A three-year-old is scheduled for a blood draw with a parent present in the room. What is the most appropriate way to involve the parent?",
      choices: {
        a: "Have the parent hold the child in a secure comfort position while the phlebotomist explains each step in simple, concrete words",
        b: "Ask the parent to wait outside so the child is not distracted during the draw",
        c: "Have the parent perform the venipuncture themselves under the phlebotomist's supervision",
        d: "Avoid speaking directly to the child at all, since a toddler cannot understand any explanation",
      },
      correct: "a",
      explanation:
        "At this age, a caregiver's secure hold — sometimes called a comfort " +
        "hold — keeps the child safe and still while also providing " +
        "reassurance that a stranger cannot. Pairing that with brief, " +
        "concrete language from the phlebotomist (\"a little poke\") gives the " +
        "child both physical security and some idea of what to expect.",
      why: {
        b: "Removing the parent increases separation anxiety at an age where it is already significant, and it takes away a helpful pair of hands for a safe hold.",
        c: "The caregiver assists with comfort and positioning, but the venipuncture itself remains the trained phlebotomist's task.",
        d: "Even a toddler responds to a calm tone and simple concrete words; assuming nothing registers is not accurate.",
      },
      tip: "For toddlers, a secure comfort hold plus simple, concrete words beats either silence or sending the caregiver away.",
      tags: ["pediatric", "caregiver", "communication"],
    },
    {
      id: "pre-021",
      subdomain: "Preparation",
      difficulty: 2,
      stem: "A phlebotomist is assigned to draw a patient on airborne isolation precautions. What should happen before entering the room?",
      choices: {
        a: "Gather and organize all needed supplies, then don the required PPE, so the room can be entered in a single trip",
        b: "Step into the room to introduce yourself first, then step back out to put on PPE",
        c: "Wear gloves only, since a mask is optional for a phlebotomy visit",
        d: "Ask the patient to step out into the hallway so isolation precautions don't apply during the draw",
      },
      correct: "a",
      explanation:
        "Isolation precautions require full PPE to be in place before entry, " +
        "and organizing supplies in advance avoids having to leave mid-draw " +
        "for something forgotten — which would mean removing and redonning " +
        "PPE, wasting equipment and increasing exposure risk. One trip in, " +
        "fully equipped, is the standard.",
      why: {
        b: "Entering before PPE is on defeats the purpose of the precautions entirely, whichever direction the exposure risk runs.",
        c: "The specific precaution type determines the required PPE; airborne precautions generally call for a fit-tested respirator, not gloves alone.",
        d: "Moving an isolated patient out of their room to avoid following precautions is backwards and inappropriate.",
      },
      tip: "One trip in: supplies gathered, PPE donned, then enter. Forgetting something means a full re-gown, not a quick dash out.",
      tags: ["isolation-precautions", "ppe", "preparation"],
    },
    {
      id: "pre-022",
      subdomain: "Fasting",
      difficulty: 2,
      stem: "A patient arrives for a 3-hour oral glucose tolerance test (GTT). What must the phlebotomist confirm before starting?",
      choices: {
        a: "That the patient has fasted as instructed and understands they will remain on site for multiple timed draws after drinking the glucose solution",
        b: "That the patient has eaten a normal breakfast so the glucose challenge has something to work against",
        c: "That the patient can leave immediately after the first draw and return later for the remaining ones",
        d: "That the patient has already taken their usual morning insulin dose before arriving",
      },
      correct: "a",
      explanation:
        "A GTT depends on a true fasting baseline drawn before the glucose " +
        "load, followed by additional draws at fixed intervals over several " +
        "hours. Confirming the fast and making sure the patient understands " +
        "the time commitment up front prevents an invalidated baseline and a " +
        "patient who leaves partway through and breaks the timed series.",
      why: {
        b: "Eating before the test invalidates the fasting baseline the entire series is measured against.",
        c: "Leaving between timed draws breaks the fixed-interval schedule and makes the results uninterpretable — the patient needs to plan on staying for the whole test.",
        d: "Insulin taken before an unmeasured baseline, ahead of a test that deliberately loads the patient with glucose, is a medication and timing decision that belongs to the ordering provider's instructions, not a default assumption.",
      },
      tip: "A GTT rests on two things: a true fasting baseline and a patient who knows they're committing to the whole timed series.",
      tags: ["glucose-tolerance-test", "fasting", "timing"],
    },
    {
      id: "pre-023",
      subdomain: "Site assessment",
      difficulty: 2,
      stem: "Before selecting an arm for venipuncture, which of the following should the phlebotomist check as a routine part of preparation?",
      choices: {
        a: "Only whether the patient is right- or left-handed",
        b: "The presence of IV lines, a history of mastectomy, edema, and visible scarring on each arm",
        c: "The patient's most recent laboratory results",
        d: "Whether the patient has eaten within the last hour",
      },
      correct: "b",
      explanation:
        "A quick visual and verbal check of both arms for IV lines, " +
        "mastectomy history, edema, and scarring identifies sites to avoid " +
        "before a tourniquet is ever applied. Catching these at the " +
        "preparation stage prevents a contaminated specimen or a failed " +
        "stick from an obviously compromised site, rather than discovering " +
        "the problem mid-procedure.",
      why: {
        a: "Handedness is not a clinical contraindication and has no bearing on which site is safe to use.",
        c: "Recent lab values don't reveal the current physical condition of either arm.",
        d: "Fasting status is a separate preparation check unrelated to which arm is safe for the draw.",
      },
      tip: "Scan both arms before touching either one — lines, mastectomy history, swelling, and scars are preparation-stage checks, not mid-stick surprises.",
      tags: ["site-selection", "preparation", "contraindications"],
    },
    {
      id: "pre-024",
      subdomain: "Communication",
      difficulty: 1,
      stem: "An adult patient says they have never had blood drawn before and looks nervous. What is the most appropriate explanation for the phlebotomist to give?",
      choices: {
        a: "A brief, plain-language description of what will happen, what it will feel like, and roughly how long it will take",
        b: "A detailed technical explanation of coagulation and specimen processing so the patient understands the full laboratory workflow",
        c: "No explanation at all, since discussing the procedure tends to increase anxiety",
        d: "A firm reassurance that the needle will not be felt at all",
      },
      correct: "a",
      explanation:
        "A first-time patient benefits from a short, concrete explanation " +
        "pitched at their level — what the tourniquet will feel like, that " +
        "there will be a brief pinch, and about how long it will take. That " +
        "sets accurate expectations without burying the patient in clinical " +
        "detail they have no use for.",
      why: {
        b: "Laboratory workflow detail doesn't reassure an anxious first-time patient and risks overwhelming rather than calming them.",
        c: "Withholding any explanation leaves a first-timer to imagine the worst, which tends to raise anxiety rather than lower it.",
        d: "Promising no sensation at all is inaccurate and risks destroying the patient's trust the moment they do feel the needle.",
      },
      tip: "Plain language, accurate expectations, right-sized detail — that's what actually calms a first-time patient.",
      tags: ["communication", "first-time-patient", "consent"],
    },
    {
      id: "pre-025",
      subdomain: "Fasting",
      difficulty: 1,
      stem: "A patient asks whether they may drink water before a fasting blood test. What is the correct guidance?",
      choices: {
        a: "No fluids of any kind are permitted",
        b: "Water is generally permitted and encouraged unless the ordering provider specifies otherwise",
        c: "Only sports drinks are permitted, to prevent dehydration",
        d: "Water is permitted only in the final hour before the draw",
      },
      correct: "b",
      explanation:
        "Plain water is normally allowed during a fast and helps: a dehydrated " +
        "patient has veins that are harder to find and analytes that are " +
        "relatively concentrated. What is excluded is anything with calories or " +
        "metabolic effect — food, juice, sweetened or caffeinated drinks, and " +
        "in many protocols gum and mints.",
      why: {
        a: "Prohibiting water makes collection harder and can affect results through hemoconcentration.",
        c: "A sports drink contains sugar and electrolytes and breaks the fast outright.",
        d: "There is no such restriction; water is permitted throughout the fasting period.",
      },
      tip: "Water yes, everything else no. Dehydration makes both the stick and the results worse.",
      tags: ["fasting", "hydration", "patient-instructions"],
    },
    {
      id: "pre-026",
      subdomain: "Fasting",
      difficulty: 2,
      stem: "Which best describes the basal state referred to in laboratory reference ranges?",
      choices: {
        a: "Any time at least four hours after a meal",
        b: "The resting, fasting condition early in the morning, roughly 12 hours after the last meal",
        c: "The state immediately following moderate exercise",
        d: "Any time the patient reports feeling well",
      },
      correct: "b",
      explanation:
        "The basal state is the body at rest after an overnight fast, typically " +
        "sampled early in the morning before activity or food. Many reference " +
        "ranges were established on basal-state specimens, which is why fasting " +
        "morning collection is specified for the tests most affected by " +
        "digestion and activity.",
      why: {
        a: "A four-hour gap in the middle of an active day is not a basal state.",
        c: "Exercise shifts several analytes and is the opposite of the resting condition.",
        d: "Subjective wellbeing has no relationship to metabolic state.",
      },
      tip: "Basal = rested, fasting, early morning. That is the condition many reference ranges assume.",
      tags: ["basal-state", "fasting", "reference-ranges"],
    },
    {
      id: "pre-027",
      subdomain: "Consent",
      difficulty: 2,
      stem: "A patient rolls up their sleeve and extends their arm when the phlebotomist explains the draw. What type of consent is this?",
      choices: {
        a: "Informed consent",
        b: "Implied consent",
        c: "Expressed written consent",
        d: "Consent by proxy",
      },
      correct: "b",
      explanation:
        "Implied consent is communicated by the patient's actions rather than " +
        "their words — extending an arm after an explanation is the classic " +
        "example. It is valid for a routine venipuncture that has been " +
        "explained, and it can be withdrawn at any point.",
      why: {
        a: "Informed consent involves a discussion of risks, benefits, and alternatives, typically for more invasive procedures.",
        c: "Nothing was written or signed here.",
        d: "Consent by proxy is given by an authorized decision-maker for a patient who cannot consent.",
      },
      tip: "Explain, then watch. An extended arm is implied consent; a withdrawn arm is a refusal.",
      tags: ["consent", "implied-consent", "patient-rights"],
    },
    {
      id: "pre-028",
      subdomain: "Consent",
      difficulty: 3,
      stem: "A 15-year-old arrives alone for a routine draw ordered by their pediatrician. What is the appropriate step?",
      choices: {
        a: "Proceed — the order is sufficient authorization",
        b: "Follow facility policy on minors, which generally requires consent from a parent or legal guardian unless a recognized exception applies",
        c: "Ask the teenager to sign a consent form on their own behalf",
        d: "Refuse all collection from anyone under 18 under any circumstances",
      },
      correct: "b",
      explanation:
        "Minors generally cannot consent for themselves, so a parent or legal " +
        "guardian consents. Exceptions exist — emancipated minors and certain " +
        "categories of care that vary by state — and they are defined by policy " +
        "and law rather than judged at the drawing chair.",
      why: {
        a: "A physician's order authorizes the test, not the consent to perform it on a minor.",
        c: "A minor's signature does not constitute valid consent unless a recognized exception applies.",
        d: "Minors are drawn routinely with appropriate consent; a blanket refusal is not the standard.",
      },
      tip: "Minor means guardian consent, unless policy names an exception. Check the policy, don't improvise.",
      tags: ["consent", "minors", "legal"],
    },
    {
      id: "pre-029",
      subdomain: "Positioning",
      difficulty: 2,
      stem: "A patient tells the phlebotomist they fainted at their last blood draw. What is the appropriate positioning?",
      choices: {
        a: "Seated in a standard chair, with the draw performed quickly",
        b: "Reclined or lying down, with the patient monitored throughout",
        c: "Standing, so the patient can sit down if they feel unwell",
        d: "Seated on a high stool for better access",
      },
      correct: "b",
      explanation:
        "A history of syncope changes the plan before the needle appears. " +
        "Reclining removes the distance to fall, keeps blood flow to the brain, " +
        "and lets the phlebotomist watch for early signs — pallor, sweating, " +
        "yawning — while there is still time to respond.",
      why: {
        a: "Speed does not prevent a vasovagal response, and a standard chair still allows a fall.",
        c: "Never draw from a standing patient; a faint from standing height risks a serious head injury.",
        d: "A high stool increases the fall distance, which is the opposite of what this patient needs.",
      },
      tip: "History of fainting? Lie them down. Never draw anyone standing up.",
      tags: ["syncope", "positioning", "patient-safety"],
    },
    {
      id: "pre-030",
      subdomain: "Site assessment",
      difficulty: 3,
      stem: "A patient has an IV running in the left forearm and a dialysis fistula in the right arm. Where should the phlebotomist look for a site?",
      choices: {
        a: "Above the IV in the left arm",
        b: "Consult the nurse or provider — neither arm is straightforward, and hand or alternative sites may be required",
        c: "Directly from the fistula, which is designed for vascular access",
        d: "From the fistula arm, below the fistula",
      },
      correct: "b",
      explanation:
        "A fistula arm is off limits for venipuncture entirely, and an arm with " +
        "a running IV is at best a constrained option. With both arms " +
        "compromised the collection is discussed with the patient's nurse or " +
        "provider, who may authorize a hand vein, a site below a stopped IV, or " +
        "collection by another route.",
      why: {
        a: "Drawing above an IV samples infusing fluid rather than the patient's blood.",
        c: "A fistula is never used for venipuncture — the risk of clotting or infecting it is unacceptable.",
        d: "The whole fistula limb is avoided, not just the fistula itself.",
      },
      tip: "Fistula arm: no draws, no tourniquet, no blood pressure cuff. When both arms are compromised, ask.",
      tags: ["fistula", "iv-line", "site-selection"],
    },
    {
      id: "pre-031",
      subdomain: "Site assessment",
      difficulty: 3,
      stem: "A patient had a mastectomy with lymph node removal on the right side four years ago. What is the correct approach to site selection?",
      choices: {
        a: "The restriction expires after two years, so either arm is acceptable",
        b: "Avoid the affected side and use the unaffected arm; if both sides are affected, seek provider guidance",
        c: "Use the affected side but avoid a tourniquet",
        d: "Use the affected side only for small-volume draws",
      },
      correct: "b",
      explanation:
        "Lymph node removal impairs drainage on that side indefinitely, leaving " +
        "the limb prone to lymphedema and slower to clear infection. The " +
        "unaffected arm is used; where both sides are affected, the provider " +
        "decides and may authorize a specific site.",
      why: {
        a: "There is no expiry — the lymphatic drainage does not return.",
        c: "Omitting the tourniquet does not address the infection and lymphedema risk from the puncture itself.",
        d: "Volume is not the issue; the breach of the skin barrier on that side is.",
      },
      tip: "Mastectomy with node removal means that arm is out — permanently, not for a couple of years.",
      tags: ["mastectomy", "lymphedema", "site-selection"],
    },
    {
      id: "pre-032",
      subdomain: "Timing",
      difficulty: 2,
      stem: "A therapeutic drug monitoring order specifies a trough level. When is the specimen collected?",
      choices: {
        a: "Thirty minutes after the dose is given",
        b: "Immediately before the next scheduled dose",
        c: "At the midpoint between two doses",
        d: "At any convenient time, since the laboratory adjusts for timing",
      },
      correct: "b",
      explanation:
        "A trough is the lowest concentration in the dosing interval, so it is " +
        "drawn immediately before the next dose — it answers whether the drug " +
        "stays above the therapeutic threshold. A peak, drawn a specified " +
        "interval after administration, answers whether it climbs into toxic " +
        "range.",
      why: {
        a: "That window describes a peak for some drugs, which is the opposite measurement.",
        c: "A midpoint value corresponds to neither the trough nor the peak and cannot be interpreted against either range.",
        d: "The laboratory cannot correct a level for unknown timing; the collection time defines what the number means.",
      },
      tip: "Trough = just before the next dose, the low point. Peak = a set time after the dose, the high point.",
      tags: ["therapeutic-drug-monitoring", "trough", "timing"],
    },
    {
      id: "pre-033",
      subdomain: "Timing",
      difficulty: 2,
      stem: "A cortisol level is ordered for 0800. Why does the collection time matter?",
      choices: {
        a: "Cortisol is unstable at room temperature after mid-morning",
        b: "Cortisol follows a diurnal rhythm, so results are interpreted against the time of day they were drawn",
        c: "The laboratory only runs cortisol in the morning",
        d: "Morning collection avoids interference from food",
      },
      correct: "b",
      explanation:
        "Cortisol peaks in the early morning and falls through the day, so a " +
        "value only means something when the collection time is known. That is " +
        "why the order names a specific time and why the actual collection time " +
        "goes on the label.",
      why: {
        a: "The reason for timing is physiological variation, not specimen instability.",
        c: "Laboratory scheduling does not drive the clinical timing of the collection.",
        d: "Fasting is a separate consideration and is not what makes cortisol time-dependent.",
      },
      tip: "Diurnal analytes — cortisol chief among them — are judged against the clock. Draw at the time ordered, and record it.",
      tags: ["diurnal-variation", "cortisol", "timing"],
    },
    {
      id: "pre-034",
      subdomain: "Patient factors",
      difficulty: 3,
      stem: "A patient arrives having just walked briskly for twenty minutes. Why might this matter for their results?",
      choices: {
        a: "Exercise has no measurable effect on laboratory results",
        b: "Recent exercise can transiently change several analytes, so the patient should rest before collection where the test is affected",
        c: "Exercise permanently alters the reference range for that patient",
        d: "Exercise only affects results if the patient is fasting",
      },
      correct: "b",
      explanation:
        "Physical activity transiently shifts a number of analytes, including " +
        "muscle enzymes and some electrolytes and hormones. Where the test is " +
        "sensitive to it, a short rest before collection brings the patient " +
        "closer to the basal state the reference range assumes.",
      why: {
        a: "The effects are well described and are the reason rest is part of standard preparation.",
        c: "The changes are transient, not a permanent shift in the patient's baseline.",
        d: "The effect of activity is independent of whether the patient has eaten.",
      },
      tip: "Let an active patient sit and settle. Basal state means rested, not just unfed.",
      tags: ["exercise", "preanalytical", "basal-state"],
    },
    {
      id: "pre-035",
      subdomain: "Patient factors",
      difficulty: 3,
      stem: "How does prolonged standing before a draw affect certain analyte concentrations?",
      choices: {
        a: "It dilutes the blood, lowering concentrations of large molecules",
        b: "It shifts fluid out of the vessels, raising the measured concentration of proteins and protein-bound substances",
        c: "It has no effect once the tourniquet is applied",
        d: "It affects only glucose and electrolytes",
      },
      correct: "b",
      explanation:
        "Upright posture moves water out of the vascular space, leaving the " +
        "cells and larger molecules that cannot cross the vessel wall relatively " +
        "concentrated. Proteins, protein-bound analytes, and cellular counts can " +
        "read higher than they would in a patient who has been seated or supine.",
      why: {
        a: "The fluid shift concentrates rather than dilutes the remaining plasma.",
        c: "A tourniquet adds its own hemoconcentration on top; it does not cancel the postural effect.",
        d: "The effect falls on protein-bound and cellular components, not on small freely-diffusing molecules.",
      },
      tip: "Standing concentrates. Seat the patient for a few minutes before drawing when posture-sensitive tests are ordered.",
      tags: ["posture", "hemoconcentration", "preanalytical"],
    },
    {
      id: "pre-036",
      subdomain: "Patient interaction",
      difficulty: 1,
      stem: "What is the first thing a phlebotomist should do when entering an outpatient drawing room to meet a patient?",
      choices: {
        a: "Apply the tourniquet to save time",
        b: "Introduce themselves, state their role, and explain what they are there to do",
        c: "Lay out tubes so the patient can see what is coming",
        d: "Ask what the patient's diagnosis is",
      },
      correct: "b",
      explanation:
        "The encounter opens with an introduction: who you are, what your role " +
        "is, and what you are about to do. It establishes the interaction, sets " +
        "expectations for a patient who may be anxious, and leads naturally into " +
        "identification and consent.",
      why: {
        a: "Nothing touches the patient before identification and an explanation.",
        c: "Displaying equipment before any explanation tends to increase anxiety rather than reduce it.",
        d: "Diagnosis is not the phlebotomist's business to ask about and has no bearing on the collection.",
      },
      tip: "Introduce, explain, identify, consent — in that order, before anything touches the patient.",
      tags: ["communication", "introduction", "professionalism"],
    },
    {
      id: "pre-037",
      subdomain: "Patient factors",
      difficulty: 2,
      stem: "A patient mentions they are extremely anxious about needles and has a history of panic during draws. What is a reasonable approach?",
      choices: {
        a: "Complete the draw as fast as possible without discussion",
        b: "Recline the patient, talk them through what will happen, use distraction, and be prepared to stop",
        c: "Tell the patient the needle will not hurt at all",
        d: "Have a colleague hold the patient's arm firmly throughout",
      },
      correct: "b",
      explanation:
        "Anxiety is managed rather than rushed past: positioning that makes a " +
        "faint safe, an honest description of what is coming, distraction, and " +
        "a stated willingness to pause. A patient who knows they can stop is " +
        "usually far more able to continue.",
      why: {
        a: "Speed without explanation heightens the loss of control that drives the anxiety.",
        c: "A promise the patient will not feel anything is untrue and destroys trust at the first sensation.",
        d: "Restraint escalates panic and creates a safety risk with a needle in play.",
      },
      tip: "Recline, explain, distract, and mean it when you say you'll stop if they need you to.",
      tags: ["anxiety", "needle-phobia", "communication"],
    },
    {
      id: "pre-038",
      subdomain: "Fasting",
      difficulty: 2,
      stem: "A patient states they fasted overnight but chewed sugar-free gum on the way in. How should the phlebotomist handle a fasting glucose order?",
      choices: {
        a: "Proceed silently — sugar-free gum contains no sugar",
        b: "Report the gum per facility policy, since chewing stimulates digestive activity that can affect results",
        c: "Cancel the test outright",
        d: "Have the patient wait two hours and then draw",
      },
      correct: "b",
      explanation:
        "Chewing triggers digestive responses regardless of the sugar content, " +
        "so many protocols treat gum as breaking a fast. The phlebotomist's job " +
        "is to document and communicate what the patient actually did, not to " +
        "decide unilaterally whether it counted.",
      why: {
        a: "Sugar-free does not mean metabolically inert; the chewing itself is the issue.",
        c: "Cancelling is the ordering provider's decision, informed by what is documented.",
        d: "Inventing a waiting period is not a defined protocol and delays care on a guess.",
      },
      tip: "Anything in the mouth gets documented. Whether it invalidates the test is the provider's call.",
      tags: ["fasting", "gum", "documentation"],
    },
    {
      id: "pre-039",
      subdomain: "Privacy",
      difficulty: 2,
      stem: "A patient's family member asks the phlebotomist which tests are being collected. What is the appropriate response?",
      choices: {
        a: "List the tests, since the family member is present in the room",
        b: "Politely refer the question to the patient or the care team",
        c: "Explain that the tests are confidential and cannot be discussed with anyone",
        d: "Answer only if the patient appears not to object",
      },
      correct: "b",
      explanation:
        "Health information belongs to the patient. The phlebotomist does not " +
        "become the source for a family member's questions, even a well-meaning " +
        "one in the room; the question goes to the patient themselves or to the " +
        "clinicians responsible for their care.",
      why: {
        a: "Physical presence does not make someone authorized to receive health information.",
        c: "The information is not undiscussable — it simply is not the phlebotomist's to disclose.",
        d: "Reading a patient's expression is not the same as their authorization.",
      },
      tip: "Redirect rather than disclose. The patient owns the information; you are not its distributor.",
      tags: ["privacy", "hipaa", "communication"],
    },
    {
      id: "pre-040",
      subdomain: "Site assessment",
      difficulty: 2,
      stem: "Before applying a tourniquet, the phlebotomist notices extensive scarring across the antecubital area of both arms. What is the concern?",
      choices: {
        a: "Scarred tissue is more painful but otherwise unaffected",
        b: "Scarred veins are difficult to penetrate and can yield poor-quality specimens, so an alternative site should be considered",
        c: "Scarring prevents the tourniquet from working",
        d: "Scarring means the patient must be drawn by a physician",
      },
      correct: "b",
      explanation:
        "Scarred and sclerosed veins are hard, poorly elastic, and difficult to " +
        "enter, and blood flow through them is often inadequate — the result is " +
        "a failed draw or a specimen of poor quality. An alternative site such " +
        "as a hand vein is considered instead.",
      why: {
        a: "Discomfort is not the main issue; the vessel's usability is.",
        c: "The tourniquet still functions; the vein is the problem.",
        d: "Scarred sites are within a phlebotomist's scope; the decision is about site selection.",
      },
      tip: "Feel before you commit. A hard, cord-like vein under scarred skin will fight you and may still give a poor specimen.",
      tags: ["scarring", "sclerosed-veins", "site-selection"],
    },
    {
      id: "pre-041",
      subdomain: "Test preparation",
      difficulty: 3,
      stem: "For a two-hour postprandial glucose, when is the specimen collected?",
      choices: {
        a: "Two hours after the patient wakes up",
        b: "Two hours after the patient begins the specified meal or glucose load",
        c: "Two hours after arriving at the collection site",
        d: "Two hours after the fasting specimen is drawn, regardless of when the patient ate",
      },
      correct: "b",
      explanation:
        "\"Postprandial\" means after eating, and the clock starts when the " +
        "patient begins the meal or glucose drink, not when they finish, arrive, " +
        "or wake. Timing from the wrong point makes the value " +
        "uninterpretable against the reference range.",
      why: {
        a: "Waking has no relationship to a glucose challenge.",
        c: "Arrival time is a scheduling detail, not a physiological starting point.",
        d: "The interval runs from the meal, and a fasting draw may have preceded it by any amount of time.",
      },
      tip: "The clock starts at the first bite or the first sip — record that time, not the arrival time.",
      tags: ["postprandial", "glucose", "timing"],
    },
    {
      id: "pre-042",
      subdomain: "Patient factors",
      difficulty: 2,
      stem: "A patient reports smoking a cigarette in the parking lot before a fasting draw. Why is this worth documenting?",
      choices: {
        a: "Smoking has no effect on any laboratory value",
        b: "Smoking can transiently affect several analytes and is generally not permitted during a fast",
        c: "Smoking only matters for respiratory tests",
        d: "Documentation is required for billing purposes",
      },
      correct: "b",
      explanation:
        "Nicotine has measurable short-term physiological effects and smoking is " +
        "generally excluded during a fasting period along with food and drink. " +
        "The phlebotomist documents what the patient reports so the result can " +
        "be interpreted in light of it.",
      why: {
        a: "Transient effects on several analytes are well described.",
        c: "The effects are systemic, not confined to any one type of testing.",
        d: "The reason is clinical interpretation, not billing.",
      },
      tip: "Fasting means nothing but water — no food, no drink, no gum, no cigarettes.",
      tags: ["smoking", "fasting", "preanalytical"],
    },
    {
      id: "pre-043",
      subdomain: "Positioning",
      difficulty: 2,
      stem: "How should the patient's arm be positioned for an antecubital venipuncture?",
      choices: {
        a: "Bent at the elbow so the veins bulge",
        b: "Extended in a straight line from shoulder to wrist, supported and slightly downward",
        c: "Raised above the level of the heart",
        d: "Rotated so the palm faces down",
      },
      correct: "b",
      explanation:
        "A straight, supported arm angled slightly downward gives a stable " +
        "surface to anchor the vein, keeps the vein from rolling, and lets the " +
        "tube fill without blood running back along the needle. An armrest or " +
        "pillow does the supporting so the patient does not have to hold it.",
      why: {
        a: "A bent elbow kinks the vessel and removes the firm surface needed to anchor the skin.",
        c: "Elevating the arm above heart level reduces venous filling.",
        d: "A palm-down forearm rotates the antecubital veins away from the approach.",
      },
      tip: "Straight, supported, slightly downhill. The patient should never be holding their own arm up.",
      tags: ["positioning", "arm-position", "technique"],
    },
    {
      id: "pre-044",
      subdomain: "Test preparation",
      difficulty: 3,
      stem: "A patient scheduled for a glucose tolerance test asks whether they may leave the facility between draws. What is the correct guidance?",
      choices: {
        a: "They may leave as long as they return on time",
        b: "They should remain at the facility, resting, and avoid eating, drinking anything but water, smoking, or exercising",
        c: "They may leave if they take a light snack with them",
        d: "They may leave for the first hour only",
      },
      correct: "b",
      explanation:
        "The test measures how the body clears a defined glucose load over a " +
        "fixed period, so the conditions have to hold for the whole period. " +
        "Eating, smoking, and activity all alter the curve, and staying on site " +
        "also means help is at hand if the patient becomes unwell.",
      why: {
        a: "Punctual return does nothing about what the patient did while away.",
        c: "A snack invalidates the test outright — the glucose load is supposed to be the only intake.",
        d: "The requirement covers the full duration, not part of it.",
      },
      tip: "GTT means stay, rest, and nothing but water — for the entire test, not just between the last two draws.",
      tags: ["glucose-tolerance-test", "patient-instructions", "timing"],
    },
    {
      id: "pre-045",
      subdomain: "Site assessment",
      difficulty: 2,
      stem: "Why should the phlebotomist ask about prior draw experiences before starting?",
      choices: {
        a: "It is required by law in every state",
        b: "Prior fainting, difficult access, or a preferred arm change how the draw is planned",
        c: "It fills time while the tourniquet is applied",
        d: "It establishes whether the patient can be billed",
      },
      correct: "b",
      explanation:
        "Patients often know things that would take several failed attempts to " +
        "discover: which arm works, that they faint, that a particular site has " +
        "never produced a specimen. Asking turns their experience into a better " +
        "plan and fewer sticks.",
      why: {
        a: "This is good practice everywhere, not a universal statutory requirement.",
        c: "The question is asked before the tourniquet, as part of planning the draw.",
        d: "Billing is unrelated to collection planning.",
      },
      tip: "Ask which arm usually works. The patient has been at more of their own draws than you have.",
      tags: ["patient-history", "site-selection", "communication"],
    },
    {
      id: "pre-046",
      subdomain: "Test preparation",
      difficulty: 2,
      stem: "A lipid panel is ordered with fasting required. Roughly how long is the fast typically specified?",
      choices: {
        a: "2 to 4 hours",
        b: "9 to 12 hours",
        c: "24 hours",
        d: "48 hours",
      },
      correct: "b",
      explanation:
        "A fasting lipid panel conventionally follows an overnight fast in the " +
        "range of nine to twelve hours, because triglycerides rise after a meal " +
        "and take hours to return to baseline. The exact requirement comes from " +
        "the ordering provider and facility protocol.",
      why: {
        a: "A few hours is not long enough for postprandial triglycerides to clear.",
        c: "A full day of fasting is not required and introduces unnecessary risk for the patient.",
        d: "Two days of fasting is neither required nor safe as a routine instruction.",
      },
      tip: "Overnight — roughly 9 to 12 hours — is the usual lipid fast. Water is still allowed.",
      tags: ["fasting", "lipid-panel", "patient-instructions"],
    },
    {
      id: "pre-047",
      subdomain: "Patient interaction",
      difficulty: 2,
      stem: "A patient asks what the results of their test will mean. How should the phlebotomist respond?",
      choices: {
        a: "Give a general interpretation of the test's normal range",
        b: "Explain that the ordering provider will discuss results, and offer to note the question for the care team",
        c: "Decline to answer and change the subject",
        d: "Give an opinion but state that it is not medical advice",
      },
      correct: "b",
      explanation:
        "Interpreting results is outside a phlebotomist's scope, and an " +
        "offhand explanation can frighten or falsely reassure a patient who " +
        "does not have the rest of their clinical picture. Referring the " +
        "question to the provider answers it honestly and keeps the patient's " +
        "concern from being dismissed.",
      why: {
        a: "Reference ranges without clinical context routinely mislead patients.",
        c: "Ignoring a patient's concern leaves them anxious and unanswered.",
        d: "A disclaimer does not put interpretation back inside the phlebotomist's scope.",
      },
      tip: "Redirect, don't interpret — and make sure the question reaches someone who can answer it.",
      tags: ["scope-of-practice", "communication", "professionalism"],
    },
    {
      id: "pre-048",
      subdomain: "Patient factors",
      difficulty: 3,
      stem: "An infant cries vigorously throughout a collection. Which result is most likely to be affected?",
      choices: {
        a: "Sodium",
        b: "White blood cell count",
        c: "Albumin",
        d: "Cholesterol",
      },
      correct: "b",
      explanation:
        "Vigorous crying transiently raises the white blood cell count in " +
        "infants, sometimes substantially. Knowing that a specimen was collected " +
        "during hard crying helps the laboratory and clinician interpret an " +
        "unexpectedly high count rather than chase it.",
      why: {
        a: "Sodium is tightly regulated and not meaningfully shifted by crying.",
        c: "Albumin changes with posture and hydration over longer periods, not with a brief episode of crying.",
        d: "Cholesterol reflects longer-term metabolic factors, not acute distress.",
      },
      tip: "A screaming infant can push the WBC count up. Calm the baby where you can, and note it when you can't.",
      tags: ["pediatric", "crying", "preanalytical"],
    },
    {
      id: "pre-049",
      subdomain: "Test preparation",
      difficulty: 2,
      stem: "Which patient instruction is appropriate for a scheduled fasting draw the following morning?",
      choices: {
        a: "\"Skip your morning medications as well as food.\"",
        b: "\"Nothing to eat or drink except water after [time]; continue your medications unless your provider told you otherwise.\"",
        c: "\"Fast, and drink coffee only if you take it black.\"",
        d: "\"Fast for as long as you comfortably can.\"",
      },
      correct: "b",
      explanation:
        "The instruction is specific about the cutoff, permits water, and leaves " +
        "medication decisions with the prescriber. Telling a patient to withhold " +
        "medications is a clinical instruction outside a phlebotomist's scope " +
        "and can cause real harm.",
      why: {
        a: "Advising a patient to skip prescribed medication is outside scope and potentially dangerous.",
        c: "Coffee, black or otherwise, breaks the fast.",
        d: "A vague instruction produces a fast of unknown length, which cannot be interpreted.",
      },
      tip: "Be specific about time, allow water, and never tell a patient to hold a medication.",
      tags: ["patient-instructions", "fasting", "scope-of-practice"],
    },
    {
      id: "pre-050",
      subdomain: "Positioning",
      difficulty: 2,
      stem: "A patient in a wheelchair arrives for an outpatient draw. What is the safest approach?",
      choices: {
        a: "Ask the patient to transfer into the drawing chair without assistance",
        b: "Lock the wheelchair's brakes and draw with the arm supported, or transfer with assistance if the patient prefers and it is safe",
        c: "Draw with the arm resting on the wheelchair's armrest and no other support",
        d: "Decline the draw and reschedule for an inpatient setting",
      },
      correct: "b",
      explanation:
        "Brakes are locked so the chair cannot move mid-procedure, and the arm " +
        "is supported on a firm surface. Whether the patient transfers is their " +
        "call and depends on what is safe — an unassisted transfer risks a fall " +
        "that has nothing to do with the blood draw.",
      why: {
        a: "An unassisted transfer risks a fall and is not required for the draw.",
        c: "An unbraked chair can roll, and an armrest alone rarely gives a stable, straight arm.",
        d: "A wheelchair is not a barrier to outpatient collection.",
      },
      tip: "Lock the brakes, support the arm, and never make a patient transfer just for your convenience.",
      tags: ["wheelchair", "positioning", "patient-safety"],
    },
  ],
);

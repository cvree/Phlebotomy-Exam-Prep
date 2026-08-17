import { buildQuestions } from "./authoring";
import {
  SRC_CDC_HAND_HYGIENE,
  SRC_CDC_STANDARD_PRECAUTIONS,
  SRC_OSHA_BBP,
  SRC_TEXTBOOK_CURRICULUM,
} from "@/data/sources";

export const SAFETY_QUESTIONS = buildQuestions(
  {
    domain: "safety-infection-control",
    certifications: ["nha-cpt"],
    sources: [
      SRC_OSHA_BBP,
      SRC_CDC_STANDARD_PRECAUTIONS,
      SRC_TEXTBOOK_CURRICULUM,
    ],
    reviewStatus: "needs-review",
  },
  [
    {
      id: "saf-001",
      subdomain: "Standard precautions",
      difficulty: 1,
      stem: "Standard precautions are applied to which patients?",
      choices: {
        a: "Only patients with a documented bloodborne infection",
        b: "Only patients on isolation precautions",
        c: "Every patient, regardless of diagnosis or presumed infection status",
        d: "Only patients whose chart flags them as high risk",
      },
      correct: "c",
      explanation:
        "Standard precautions treat blood, all body fluids except sweat, " +
        "non-intact skin, and mucous membranes as potentially infectious for " +
        "every patient. The whole point is that infection status is often " +
        "unknown — including to the patient — so protection cannot depend on " +
        "knowing who is infected.",
      why: {
        a: "Most bloodborne infections are undiagnosed at the time of a draw.",
        b: "Transmission-based precautions are added on top of standard precautions, never instead of them.",
        d: "A risk flag is information, not a substitute for baseline protection.",
      },
      tip: "Standard precautions are the floor, not the response. Isolation precautions stack on top.",
      tags: ["standard-precautions", "ppe"],
    },
    {
      id: "saf-002",
      subdomain: "Sharps safety",
      difficulty: 1,
      stem: "Immediately after withdrawing the needle from the patient's arm, what should the phlebotomist do with it?",
      choices: {
        a: "Recap it using a one-handed scoop technique, then discard it",
        b: "Activate the safety device and place it in a sharps container",
        c: "Set it on the tray until the site has been bandaged",
        d: "Remove the needle from the holder and discard the parts separately",
      },
      correct: "b",
      explanation:
        "The safety feature is activated as the needle leaves the arm, and " +
        "the needle goes directly into a sharps container at the point of " +
        "use. Every second a contaminated needle spends uncontained is an " +
        "opportunity for an injury, and most needlesticks happen between " +
        "withdrawal and disposal.",
      why: {
        a: "Recapping is prohibited for routine disposal. The scoop technique is a narrow exception for situations where recapping is unavoidable, not a disposal method.",
        c: "An uncontained needle on a tray is one of the most common sources of injury to the phlebotomist and to housekeeping staff.",
        d: "The needle and holder are discarded as a single unit; disassembling adds handling.",
      },
      tip: "Activate, then discard — in one motion, at the bedside. The container comes to the draw, not the other way round.",
      tags: ["sharps", "needlestick"],
    },
    {
      id: "saf-003",
      subdomain: "PPE",
      difficulty: 2,
      stem: "When removing personal protective equipment after a draw on a patient in contact precautions, which item is removed first?",
      choices: {
        a: "Mask or respirator",
        b: "Gown",
        c: "Gloves",
        d: "Face shield",
      },
      correct: "c",
      explanation:
        "Gloves come off first because they are the most contaminated item. " +
        "Removing them before touching the gown ties, mask straps, or your " +
        "own face keeps contamination from spreading. The mask or respirator " +
        "comes off last, outside the room, because it protects you while you " +
        "are still in the contaminated space.",
      why: {
        a: "The mask is removed last, after leaving the patient's room.",
        b: "The gown is removed after gloves and eye protection.",
        d: "Eye protection is removed after gloves, by the strap or earpieces.",
      },
      tip: "Dirtiest off first, and touch clean surfaces only — remove eye protection and masks by the straps, never the front.",
      tags: ["ppe", "doffing"],
      sources: [SRC_CDC_STANDARD_PRECAUTIONS, SRC_TEXTBOOK_CURRICULUM],
    },
    {
      id: "saf-004",
      subdomain: "Exposure response",
      difficulty: 2,
      stem: "A phlebotomist sustains a needlestick from a used needle. What is the first action?",
      choices: {
        a: "Report the incident to the supervisor",
        b: "Wash the site with soap and running water",
        c: "Ask the patient to consent to source testing",
        d: "Complete the facility exposure incident form",
      },
      correct: "b",
      explanation:
        "Immediate decontamination comes first: wash the wound with soap and " +
        "running water. Reporting, source testing, and documentation all " +
        "follow, and they follow quickly — post-exposure prophylaxis is " +
        "time-sensitive — but they come after the site has been washed.",
      why: {
        a: "Reporting is essential and should happen within minutes, but not before washing the wound.",
        c: "Source testing is part of the evaluation the employer arranges, not the exposed worker's first step.",
        d: "Documentation is required, and it comes after immediate care and reporting.",
      },
      tip: "Wash, report, evaluate — in that order. Do not squeeze the wound or apply bleach or caustic agents.",
      tags: ["needlestick", "post-exposure"],
      sources: [SRC_OSHA_BBP, SRC_TEXTBOOK_CURRICULUM],
    },
    {
      id: "saf-005",
      subdomain: "Hand hygiene",
      difficulty: 2,
      stem: "A phlebotomist has just finished a draw on a patient with confirmed Clostridioides difficile infection. Which hand hygiene method is appropriate after removing gloves?",
      choices: {
        a: "Alcohol-based hand rub, because it is faster and less drying",
        b: "Washing with soap and running water",
        c: "No hand hygiene is needed because gloves were worn",
        d: "Alcohol-based hand rub followed by a glove change",
      },
      correct: "b",
      explanation:
        "C. difficile forms spores, and alcohol does not reliably inactivate " +
        "them. Soap and running water physically remove spores from the " +
        "hands, so washing is the method of choice after caring for these " +
        "patients. Alcohol rub is appropriate in most other situations, but " +
        "not this one.",
      why: {
        a: "Alcohol is convenient and effective against many organisms, but not against C. difficile spores.",
        c: "Gloves reduce contamination; they do not eliminate it. Hands are decontaminated after every glove removal.",
        d: "Adding gloves does not solve the problem — the spores are already on the hands.",
      },
      tip: "Spores and visibly soiled hands mean soap and water. Alcohol rub handles most of the rest.",
      tags: ["hand-hygiene", "c-difficile"],
      sources: [SRC_CDC_HAND_HYGIENE, SRC_TEXTBOOK_CURRICULUM],
    },
    {
      id: "saf-006",
      subdomain: "Transmission-based precautions",
      difficulty: 2,
      stem: "A patient is on airborne precautions for suspected pulmonary tuberculosis. What respiratory protection does the phlebotomist need before entering the room?",
      choices: {
        a: "A surgical mask",
        b: "A fit-tested N95 or higher-level respirator",
        c: "A face shield alone",
        d: "No respiratory protection if the patient is wearing a mask",
      },
      correct: "b",
      explanation:
        "Airborne precautions require a fit-tested respirator — an N95 or " +
        "better — because the infectious particles stay suspended in air and " +
        "pass around and through a loose surgical mask. Fit testing matters: " +
        "an unfitted respirator leaks at the seal.",
      why: {
        a: "A surgical mask blocks droplets, not airborne particles.",
        c: "A face shield protects against splashes; it does nothing for inhaled particles.",
        d: "Source control on the patient helps, but it does not replace respiratory protection for the worker.",
      },
      tip: "Droplet = surgical mask. Airborne = fit-tested respirator. The distinction is particle size, not severity.",
      tags: ["airborne", "tuberculosis", "ppe"],
    },
    {
      id: "saf-007",
      subdomain: "Biohazard",
      difficulty: 2,
      stem: "A tube of blood breaks on a hard floor. After putting on gloves, what is the correct sequence?",
      choices: {
        a: "Pour disinfectant over the spill, then sweep the glass into a bag",
        b: "Absorb the liquid, remove glass with forceps or a brush and dustpan, then disinfect the area",
        c: "Disinfect the area, then pick the glass up by hand and absorb the residue",
        d: "Cover the spill with a towel and report it to housekeeping",
      },
      correct: "b",
      explanation:
        "Absorb the liquid first so the material is contained, then remove " +
        "the sharp fragments mechanically — never with the hands — and " +
        "finally disinfect the surface with an appropriate agent and the " +
        "correct contact time. Broken glass goes into the sharps container.",
      why: {
        a: "Flooding the spill spreads it, and sweeping before absorbing aerosolises and smears the material.",
        c: "Disinfectant is far less effective against organic load, and picking up glass by hand risks a laceration through the glove.",
        d: "The person who created the spill is responsible for containing it, and the spill remains a hazard while it waits.",
      },
      tip: "Contain, remove sharps mechanically, then disinfect. Disinfectant needs its full contact time to work.",
      tags: ["spill", "biohazard"],
    },
    {
      id: "saf-008",
      subdomain: "Sharps safety",
      difficulty: 1,
      stem: "A sharps container in a draw station is nearly full. What should be done?",
      choices: {
        a: "Press the contents down to make room and continue using it",
        b: "Replace it once it reaches the manufacturer's indicated fill line",
        c: "Continue using it until nothing more will fit",
        d: "Empty it into a biohazard bag and reuse the container",
      },
      correct: "b",
      explanation:
        "Sharps containers are replaced when they reach the fill line marked " +
        "by the manufacturer — typically well before they are physically " +
        "full. Overfilling causes needles to protrude from the opening, " +
        "which is a direct injury hazard to everyone who uses or transports " +
        "the container.",
      why: {
        a: "Reaching into or pressing down on a sharps container is one of the most dangerous things you can do with one.",
        c: "'Full' by the container's marking is well before 'full' by volume, and for good reason.",
        d: "Sharps containers are sealed and disposed of as a unit; they are not emptied.",
      },
      tip: "The fill line is the limit, not a suggestion. Never reach in, never press down.",
      tags: ["sharps", "disposal"],
    },
    {
      id: "saf-009",
      subdomain: "Fire safety",
      difficulty: 1,
      stem: "The RACE acronym for responding to a fire in a healthcare facility stands for:",
      choices: {
        a: "Report, Assess, Contain, Escape",
        b: "Rescue, Alarm, Confine, Extinguish or Evacuate",
        c: "Remove, Alert, Close, Exit",
        d: "Respond, Announce, Control, Evaluate",
      },
      correct: "b",
      explanation:
        "Rescue anyone in immediate danger, activate the Alarm, Confine the " +
        "fire by closing doors, then Extinguish it if it is small and you are " +
        "trained — otherwise Evacuate. The order matters: people first, " +
        "notification second, containment third.",
      tip: "RACE is what you do; PASS (Pull, Aim, Squeeze, Sweep) is how you use the extinguisher.",
      tags: ["fire-safety", "race"],
      sources: [SRC_TEXTBOOK_CURRICULUM],
    },
    {
      id: "saf-010",
      subdomain: "Chemical safety",
      difficulty: 1,
      stem: "Where does a phlebotomist find information about the hazards of a chemical used in the lab?",
      choices: {
        a: "The facility's incident report log",
        b: "The Safety Data Sheet (SDS) for that chemical",
        c: "The manufacturer's shipping invoice",
        d: "The laboratory information system",
      },
      correct: "b",
      explanation:
        "Safety Data Sheets describe a chemical's hazards, required " +
        "protective equipment, first-aid measures, spill response, and " +
        "disposal. Employers must keep them accessible to staff during all " +
        "working hours, and knowing where yours are kept is part of " +
        "orientation.",
      why: {
        a: "Incident logs record what has already happened, not how to handle a substance.",
        c: "Invoices record what was shipped, not how to work with it safely.",
        d: "The LIS handles orders and results.",
      },
      tip: "SDS answers four questions fast: what does it do to me, what do I wear, what do I do if it spills, and what do I do if it gets on me.",
      tags: ["chemical-safety", "sds"],
      sources: [SRC_TEXTBOOK_CURRICULUM],
    },
    {
      id: "saf-011",
      subdomain: "Standard precautions",
      difficulty: 3,
      stem: "A phlebotomist wears the same pair of gloves to draw two patients in adjacent beds, changing nothing in between. What is the primary problem?",
      choices: {
        a: "The gloves may have developed micro-tears from the first draw",
        b: "Gloves are single-patient items, and reuse transfers organisms between patients",
        c: "Glove powder from the first draw could contaminate the second specimen",
        d: "The second patient may have a latex allergy",
      },
      correct: "b",
      explanation:
        "Gloves are changed between every patient, full stop. Reusing them " +
        "carries organisms directly from one patient to the next, which is a " +
        "textbook route for healthcare-associated infection. Hand hygiene is " +
        "performed after removing the first pair and before donning the " +
        "second.",
      why: {
        a: "Micro-tears are a real risk, but they endanger the phlebotomist. The larger issue here is patient-to-patient transmission.",
        c: "Powdered gloves have largely been withdrawn from healthcare use, and specimen contamination is not the main concern.",
        d: "A latex allergy would be a problem with the glove material, not with reuse.",
      },
      tip: "One patient, one pair. Hand hygiene between them, every time.",
      tags: ["gloves", "cross-contamination"],
    },
    {
      id: "saf-012",
      subdomain: "Hepatitis B vaccination",
      difficulty: 2,
      stem: "A newly hired phlebotomist with regular exposure to blood is offered the hepatitis B vaccine series. She would rather not start it right now. What does OSHA require in this situation?",
      choices: {
        a: "The employer must require the vaccine as a condition of employment",
        b: "She may decline by signing a declination form, and may request the vaccine later at no cost if she changes her mind",
        c: "She must pay for the series herself if she wants it at a later date",
        d: "Declining the vaccine means she cannot perform blood draws",
      },
      correct: "b",
      explanation:
        "The bloodborne pathogens standard requires employers to make the " +
        "hepatitis B vaccine series available free of charge to employees " +
        "with occupational exposure, but it does not let the employer force " +
        "vaccination. An employee who declines signs a declination statement, " +
        "and the offer stays open — if she reconsiders next month or next " +
        "year, the vaccine is still provided at no cost.",
      why: {
        a: "Vaccination cannot be mandated by the employer under this standard; it is offered, not required.",
        c: "The employee never pays for the series, including if she initially declines and later requests it.",
        d: "Declining the vaccine does not bar someone from the job; other precautions still apply.",
      },
      tip: "Declining is not final. The offer — and the free price tag — stands for as long as the exposure risk does.",
      tags: ["hepatitis-b", "vaccination", "osha"],
    },
    {
      id: "saf-013",
      subdomain: "Exposure response",
      difficulty: 2,
      stem: "Why does a facility expect a needlestick injury to be reported within minutes rather than at the end of the shift?",
      choices: {
        a: "Post-exposure prophylaxis is most effective when started soon after exposure, so delay reduces its benefit",
        b: "Late reports are not accepted by workers' compensation under any circumstances",
        c: "The sharps container must be weighed before the next shift begins",
        d: "The patient cannot be tested for bloodborne pathogens after the shift ends",
      },
      correct: "a",
      explanation:
        "Post-exposure prophylaxis, when indicated, works best when it is " +
        "started as soon as possible after the exposure — its effectiveness " +
        "drops the longer treatment is delayed. Prompt reporting is what " +
        "gets the exposed worker into evaluation and, if appropriate, " +
        "treatment while that window is still open, not a formality that can " +
        "wait for a slow moment.",
      why: {
        b: "Reporting timelines affect how smoothly a claim proceeds, but this is not why urgency is taught, and late reports are still handled.",
        c: "Sharps container weight has nothing to do with reporting an injury.",
        d: "Source patient testing can be arranged after a shift ends; it is not the reason for reporting promptly.",
      },
      tip: "PEP is a clock, not a checkbox. Report first, finish the paperwork second.",
      tags: ["needlestick", "post-exposure", "reporting"],
      sources: [SRC_OSHA_BBP, SRC_TEXTBOOK_CURRICULUM],
    },
    {
      id: "saf-014",
      subdomain: "Transmission-based precautions",
      difficulty: 3,
      stem: "How does the mask requirement for droplet precautions differ from the requirement for airborne precautions?",
      choices: {
        a: "Droplet precautions require a fit-tested N95 or higher respirator; airborne precautions require only a surgical mask",
        b: "Droplet precautions require a surgical mask worn within about 3 to 6 feet of the patient; airborne precautions require a fit-tested N95 or higher respirator regardless of distance",
        c: "Both require the same respirator, but airborne precautions also add a gown and gloves",
        d: "Droplet precautions require no mask at all, since large droplets settle quickly onto surfaces",
      },
      correct: "b",
      explanation:
        "Droplet precautions protect against large respiratory particles " +
        "that travel only a short distance before falling, so a surgical " +
        "mask worn when working within a few feet of the patient is " +
        "sufficient. Airborne precautions protect against small particles " +
        "that stay suspended and travel on air currents throughout a room, " +
        "which is why they call for a fit-tested respirator instead, " +
        "regardless of how close the phlebotomist stands.",
      why: {
        a: "This reverses the two categories — the fit-tested respirator belongs to airborne precautions, not droplet.",
        c: "The two categories use different respiratory protection, not the same mask with extra layers added on top.",
        d: "Droplet precautions do require a mask; large droplets are infectious at close range even though they do not travel far.",
      },
      tip: "Distance matters for droplet, not for airborne. If it travels on air currents, distance stops helping.",
      tags: ["droplet-precautions", "airborne", "ppe"],
    },
    {
      id: "saf-015",
      subdomain: "Transmission-based precautions",
      difficulty: 1,
      stem: "A patient is on contact precautions for a wound colonized with MRSA. What does this require of the phlebotomist beyond standard precautions?",
      choices: {
        a: "A fit-tested respirator before entering the room",
        b: "A gown and gloves for any contact with the patient or their immediate environment, and dedicated or disposable equipment",
        c: "A surgical mask worn within a few feet of the patient",
        d: "Nothing additional, since MRSA is not spread through blood",
      },
      correct: "b",
      explanation:
        "Contact precautions address organisms spread by touching the " +
        "patient or contaminated surfaces near them, so a gown and gloves " +
        "are worn for any contact, and equipment such as a tourniquet or " +
        "blood pressure cuff is dedicated to that patient or discarded " +
        "afterward rather than carried to the next room.",
      why: {
        a: "A respirator addresses airborne transmission, which is not the concern with MRSA on a wound.",
        c: "A surgical mask addresses droplet transmission; MRSA on a wound is a contact risk, not a respiratory one.",
        d: "MRSA spreads readily by touch even though it is not classified as a bloodborne pathogen, which is exactly why contact precautions apply.",
      },
      tip: "Contact precautions are about hands and surfaces: gown, gloves, and equipment that stays in the room.",
      tags: ["contact-precautions", "mrsa", "ppe"],
    },
    {
      id: "saf-016",
      subdomain: "Chain of infection",
      difficulty: 3,
      stem: "The chain of infection includes a reservoir, portal of exit, mode of transmission, portal of entry, and susceptible host. Which link does hand hygiene primarily interrupt?",
      choices: {
        a: "The reservoir, by eliminating the organism from the patient",
        b: "The mode of transmission, by removing organisms from the hands before they can be carried to another person or surface",
        c: "The portal of entry, by sealing off the susceptible host's skin",
        d: "The susceptible host, by making the phlebotomist immune to the organism",
      },
      correct: "b",
      explanation:
        "Hands are one of the most common modes of transmission in " +
        "healthcare, carrying organisms from a reservoir — a patient, a " +
        "surface, equipment — to the next person or surface touched. " +
        "Removing organisms from the hands at the right moments breaks that " +
        "link in the chain without needing to change the reservoir or the " +
        "host at all.",
      why: {
        a: "Hand hygiene does not treat or eliminate infection in the patient who is the reservoir; it stops the organism from traveling further.",
        c: "Portal of entry refers to how an organism gets into a new host — broken skin, mucous membranes, a needle stick — not to hand hygiene.",
        d: "Hand hygiene does not confer immunity; it removes organisms from a surface that would otherwise transmit them.",
      },
      tip: "Break any link and the chain fails. Hand hygiene is aimed squarely at the transmission link.",
      tags: ["chain-of-infection", "hand-hygiene"],
    },
    {
      id: "saf-017",
      subdomain: "Sterile technique",
      difficulty: 2,
      stem: "Why does skin preparation for a blood culture draw use a stricter antiseptic protocol than a routine venipuncture?",
      choices: {
        a: "Blood culture tubes have a shorter expiration date and must be filled faster",
        b: "Skin flora that would be harmless contamination on a routine tube can be cultured and misread as a true bloodstream infection",
        c: "The larger needle used for blood cultures requires a longer antiseptic to numb the site",
        d: "Blood culture bottles are made of a material that reacts with standard alcohol prep",
      },
      correct: "b",
      explanation:
        "A blood culture is designed to detect organisms growing in the " +
        "blood, so any skin bacteria introduced during the draw can grow in " +
        "the bottle right alongside a true pathogen. A more rigorous " +
        "antiseptic protocol and a longer scrub or dwell time reduce that " +
        "contamination, because a falsely positive culture can lead to " +
        "unnecessary antibiotics and a longer hospital stay while the result " +
        "is sorted out.",
      why: {
        a: "Tube or bottle expiration dating has nothing to do with the antiseptic protocol used on the skin.",
        c: "Antiseptics are not anesthetics; they do not numb the site regardless of needle size.",
        d: "Standard alcohol-based antiseptics do not damage blood culture bottles; the stricter protocol is about contamination, not chemistry.",
      },
      tip: "A contaminated blood culture doesn't just miss the mark — it can point treatment at an infection that was never there.",
      tags: ["blood-culture", "sterile-technique", "contamination"],
    },
    {
      id: "saf-018",
      subdomain: "PPE",
      difficulty: 2,
      stem: "A phlebotomist develops itching and redness on her hands soon after putting on latex gloves, and a coworker mentions she has reacted this way before. What is the appropriate response?",
      choices: {
        a: "Continue wearing the latex gloves, since the reaction is only a minor skin irritation",
        b: "Switch to a non-latex glove such as nitrile and report the reaction so it can be evaluated and documented",
        c: "Wash the latex gloves with soap and water before reuse to remove the irritant",
        d: "Wear two pairs of latex gloves to create a barrier against the reaction",
      },
      correct: "b",
      explanation:
        "Symptoms like itching and redness after latex contact can signal a " +
        "developing latex allergy, which can worsen with repeated exposure " +
        "and in rare cases become severe. Switching to a non-latex " +
        "alternative such as nitrile removes the trigger, and reporting the " +
        "reaction gets it evaluated and documented so future exposure can be " +
        "avoided.",
      why: {
        a: "Continuing exposure risks worsening a sensitization that may still be mild at this point.",
        c: "Latex gloves are single-use; washing and reusing them is not an infection-control or an allergy-management strategy.",
        d: "Doubling up on latex increases contact with the allergen rather than reducing it.",
      },
      tip: "Itching after latex is not a nuisance to push through — it is data. Switch materials and document it.",
      tags: ["latex-allergy", "gloves", "ppe"],
    },
    {
      id: "saf-019",
      subdomain: "Sharps safety",
      difficulty: 1,
      stem: "A phlebotomist is in a situation where a needle absolutely must be recapped before it can be safely handled. Which technique is acceptable?",
      choices: {
        a: "Holding the cap in one hand and the syringe in the other to guide the needle in directly",
        b: "A one-handed scoop technique, using the needle itself to scoop up the cap from a flat surface",
        c: "Recapping is never acceptable under any circumstance, so the needle should be left uncapped and set aside",
        d: "Asking a coworker to hold the cap steady while the needle is inserted",
      },
      correct: "b",
      explanation:
        "Two-handed recapping puts one hand directly in the path of the " +
        "needle and is a major cause of needlestick injuries, so it is never " +
        "used. When recapping cannot be avoided, the one-handed scoop " +
        "technique — sliding the needle into a cap resting on a flat surface " +
        "without using the other hand — keeps both hands out of the needle's " +
        "path.",
      why: {
        a: "This is two-handed recapping, the exact technique that engineered safety devices and workplace policy exist to eliminate.",
        c: "Recapping is discouraged as routine practice, but some situations — such as transporting a needle a short distance for a specific procedure — call for it, and a safe technique exists for that case.",
        d: "Involving a second person's hand near an uncapped needle adds another person at risk instead of removing the hazard.",
      },
      tip: "One hand, one surface, no fingers near the point. Two-handed recapping is off the table entirely.",
      tags: ["sharps", "recapping", "needlestick"],
    },
    {
      id: "saf-020",
      subdomain: "Sharps safety",
      difficulty: 2,
      stem: "Most blood collection needles used today include an engineered sharps injury protection feature, such as a shield or retractable mechanism. What drove this shift toward safety-engineered devices?",
      choices: {
        a: "Manufacturers found conventional needles more expensive to produce",
        b: "The Needlestick Safety and Prevention Act, which strengthened requirements for employers to use safer devices to reduce sharps injuries",
        c: "Patients began requesting safety needles specifically for comfort during the draw",
        d: "Safety-engineered needles allow for a smaller gauge than conventional needles",
      },
      correct: "b",
      explanation:
        "The Needlestick Safety and Prevention Act amended the bloodborne " +
        "pathogens standard to require employers to evaluate and adopt " +
        "safer medical devices, including needles with engineered sharps " +
        "injury protection, and to involve frontline staff in selecting " +
        "them. That regulatory push is why shielded and retractable needles " +
        "became the norm rather than the exception.",
      why: {
        a: "Cost was not the driver; safety devices generally cost more than conventional needles, and the shift happened despite that.",
        c: "Patient comfort is unrelated to why these devices were adopted — the concern was worker injury, not the patient's experience.",
        d: "Gauge selection is a clinical decision based on the vein and specimen needs, not a feature tied to the safety mechanism.",
      },
      tip: "The shield isn't a convenience feature — it exists because a federal law required employers to reduce sharps injuries.",
      tags: ["sharps", "needlestick-prevention-act", "engineered-devices"],
      sources: [SRC_OSHA_BBP, SRC_TEXTBOOK_CURRICULUM],
    },
    {
      id: "saf-021",
      subdomain: "General safety",
      difficulty: 1,
      stem: "A phlebotomist notices a frayed cord on a centrifuge and a puddle of water on the floor near an outlet in the draw room. What should be done first?",
      choices: {
        a: "Use the centrifuge carefully, avoiding the frayed section of the cord",
        b: "Mop up the water and continue working, since the cord issue is minor",
        c: "Take the equipment out of service and report both hazards so they can be addressed before anyone is exposed to a shock risk",
        d: "Unplug the centrifuge and leave a note for the next shift to deal with it later",
      },
      correct: "c",
      explanation:
        "A frayed cord near standing water is an electrical shock hazard, " +
        "not a minor inconvenience. The equipment should be taken out of " +
        "service and both problems reported right away, so that maintenance " +
        "or facilities staff can correct them before anyone else encounters " +
        "the same setup.",
      why: {
        a: "A frayed cord is a hazard regardless of how carefully it is handled; damaged equipment is taken out of service, not worked around.",
        b: "Mopping up the water addresses only half the hazard and leaves the damaged cord in use.",
        d: "Leaving the hazard for the next shift delays a fix that should not wait, and does not report the water hazard at all.",
      },
      tip: "Frayed cord plus water equals stop, unplug, and report — not work around it.",
      tags: ["electrical-safety", "general-safety"],
      sources: [SRC_TEXTBOOK_CURRICULUM],
    },
    {
      id: "saf-022",
      subdomain: "Hand hygiene",
      difficulty: 2,
      stem: "Which statement correctly describes proper hand hygiene technique and timing for a phlebotomist?",
      choices: {
        a: "Hands are washed with soap and water for at least 20 seconds, or decontaminated with alcohol-based rub, before and after every patient contact and before and after gloving",
        b: "Hand hygiene is only required before donning gloves, since the gloves protect the hands afterward",
        c: "A quick rinse with water alone is sufficient between patients as long as gloves were worn",
        d: "Alcohol-based hand rub should be wiped off immediately after application to avoid skin dryness",
      },
      correct: "a",
      explanation:
        "Hand hygiene is performed at multiple defined moments — before " +
        "patient contact, after patient contact, and before and after " +
        "gloving — using either a soap-and-water wash of at least 20 seconds " +
        "or an alcohol-based rub applied to all hand surfaces until dry. " +
        "Gloves reduce contamination but do not replace the need for hand " +
        "hygiene before or after they are worn.",
      why: {
        b: "Hand hygiene is required after patient contact and after glove removal too, not only before gloving.",
        c: "Water alone, without soap or an antiseptic agent, does not adequately remove organisms, and gloves are not a substitute for hand hygiene.",
        d: "Alcohol-based rub needs to stay on the hands and air dry to be effective; wiping it off cuts the contact time short.",
      },
      tip: "Before, after, and around every pair of gloves — hand hygiene brackets the glove, it doesn't stop at it.",
      tags: ["hand-hygiene", "technique"],
      sources: [SRC_CDC_HAND_HYGIENE, SRC_TEXTBOOK_CURRICULUM],
    },
    {
      id: "saf-023",
      subdomain: "Transmission-based precautions",
      difficulty: 3,
      stem: "A phlebotomist has draws ordered on three patients: one with suspected measles, one colonized with MRSA, and one with active C. difficile infection. Which precaution category applies to each?",
      choices: {
        a: "Measles: droplet precautions. MRSA: airborne precautions. C. difficile: contact precautions",
        b: "Measles: airborne precautions. MRSA: contact precautions. C. difficile: contact precautions, with soap-and-water hand hygiene",
        c: "Measles: contact precautions. MRSA: droplet precautions. C. difficile: airborne precautions",
        d: "All three patients require the same precaution category, since standard precautions already cover each organism",
      },
      correct: "b",
      explanation:
        "Measles is spread by small airborne particles, so it requires " +
        "airborne precautions with a fit-tested respirator. MRSA colonization " +
        "and C. difficile infection are both spread by contact, so both call " +
        "for a gown and gloves — but C. difficile forms spores that survive " +
        "alcohol, so hand hygiene after that specific patient must be soap " +
        "and water rather than alcohol-based rub.",
      why: {
        a: "This swaps measles and MRSA into the wrong categories — measles is airborne, not droplet, and MRSA is contact, not airborne.",
        c: "None of these three organisms match the category listed here; each is assigned to the wrong precaution type.",
        d: "Standard precautions apply to every patient as a baseline, but these three organisms each require an additional, organism-specific precaution layered on top.",
      },
      tip: "Match the organism to how it travels: airborne particles need a respirator, contact organisms need a gown and gloves, and spores need soap and water.",
      tags: ["transmission-based-precautions", "measles", "mrsa", "c-difficile"],
    },
    {
      id: "saf-024",
      subdomain: "Biohazard",
      difficulty: 2,
      stem: "A phlebotomist has just finished a draw and is holding a used lancet, a blood-soaked gauze pad, and an empty alcohol prep wrapper. How should each be discarded?",
      choices: {
        a: "All three go into the sharps container, since they all contacted the patient",
        b: "The lancet goes into the sharps container, the gauze pad goes into a biohazard (red) bag, and the wrapper goes into regular trash",
        c: "The lancet and the gauze pad both go into regular trash, since neither can puncture skin once used",
        d: "All three go into the biohazard (red) bag, since anything used during a draw is regulated waste",
      },
      correct: "b",
      explanation:
        "Waste is sorted by what it is, not just where it came from. A used " +
        "lancet is a sharp and always goes into a puncture-resistant sharps " +
        "container. Gauze saturated with blood is regulated medical waste " +
        "and goes into a biohazard bag. The empty alcohol prep wrapper never " +
        "contacted blood or body fluid and is ordinary trash.",
      why: {
        a: "The alcohol wrapper never touched blood or the patient's skin in a way that makes it regulated waste; treating it as a sharp overclassifies it.",
        c: "A used lancet is a sharp regardless of how small it looks, and it belongs in a sharps container, not regular trash.",
        d: "Lumping the lancet in with soft biohazard waste puts a puncture hazard into a bag that is not designed to contain it.",
      },
      tip: "Sharp goes in the sharps container. Soaked with blood goes in red. Everything else that never touched a patient is regular trash.",
      tags: ["biohazard", "waste-disposal", "sharps"],
    },
    {
      id: "saf-025",
      subdomain: "Chemical safety",
      difficulty: 2,
      stem: "A phlebotomist wipes down a work surface with a disinfectant wipe and immediately sets a tray of supplies on it. What is the problem with this?",
      choices: {
        a: "The disinfectant needs time on the surface to work, and using the surface right away can wipe it away before it has disinfected anything",
        b: "Disinfectant wipes are only intended for equipment, never for countertops",
        c: "The tray of supplies will absorb the disinfectant and become unsafe to use",
        d: "There is no problem, since the surface was visibly wet with disinfectant",
      },
      correct: "a",
      explanation:
        "Disinfectants are labeled with a required contact time — often " +
        "several minutes — during which the surface must stay visibly wet " +
        "for the product to kill the organisms it is rated for. Setting " +
        "supplies down and wiping the surface dry right after application " +
        "cuts that contact time short, so the surface may look clean while " +
        "still carrying live organisms.",
      why: {
        b: "Disinfectant wipes are commonly used on countertops and other surfaces, not just equipment; that is not the issue here.",
        c: "Ordinary supplies are not endangered by residual disinfectant on a surface; the concern is the surface not being fully disinfected.",
        d: "Visible wetness right after application does not mean the required contact time has elapsed — the two are unrelated.",
      },
      tip: "Wet time is work time. If the surface dries or gets used before the labeled contact time is up, the disinfectant didn't finish the job.",
      tags: ["disinfection", "contact-time", "chemical-safety"],
      sources: [SRC_TEXTBOOK_CURRICULUM],
    },
    {
      id: "saf-026",
      subdomain: "Hand hygiene",
      difficulty: 2,
      stem: "A phlebotomist is collecting from a patient in contact precautions for Clostridioides difficile. After removing gloves, which hand hygiene method is required?",
      choices: {
        a: "Alcohol-based hand rub, because it acts faster than soap",
        b: "Soap and running water, because alcohol does not kill the spores",
        c: "Either method, since gloves were worn throughout",
        d: "Alcohol-based hand rub followed by a glove change",
      },
      correct: "b",
      explanation:
        "C. difficile forms spores, and alcohol-based hand rubs do not " +
        "inactivate them. Washing with soap and running water physically " +
        "removes spores from the skin through friction and rinsing, which is " +
        "why soap and water is specified after caring for a patient with C. " +
        "difficile even when gloves were worn.",
      why: {
        a: "Speed is irrelevant when the agent does not work on the organism in question.",
        c: "Gloves reduce contamination but do not eliminate it — hands are routinely contaminated during removal.",
        d: "New gloves over spore-contaminated hands does nothing about the spores already on the skin.",
      },
      tip: "Spores beat alcohol. C. difficile and norovirus mean soap, water, and friction.",
      tags: ["hand-hygiene", "c-difficile", "spores"],
      sources: [SRC_CDC_HAND_HYGIENE, SRC_TEXTBOOK_CURRICULUM],
    },
    {
      id: "saf-027",
      subdomain: "Hand hygiene",
      difficulty: 1,
      stem: "When are hands washed with soap and running water rather than cleaned with an alcohol-based hand rub?",
      choices: {
        a: "Whenever gloves are about to be put on",
        b: "Only at the start and end of a shift",
        c: "When hands are visibly soiled",
        d: "Only when a sink happens to be closer than a dispenser",
      },
      correct: "c",
      explanation:
        "Alcohol-based rubs are the routine choice for hands that are not " +
        "visibly dirty, because they are faster, more accessible, and gentler " +
        "on skin. Visible soil — blood, other body fluids, or dirt — defeats " +
        "an alcohol rub, so those hands are washed with soap and running water.",
      why: {
        a: "Hand hygiene before gloving can be performed with a rub when hands are not visibly soiled.",
        b: "Hand hygiene is performed at many points during a shift, not just its boundaries.",
        d: "The choice is driven by the state of the hands and the organism involved, never by convenience.",
      },
      tip: "Visibly soiled, or spores involved? Soap and water. Otherwise, rub.",
      tags: ["hand-hygiene", "standard-precautions"],
      sources: [SRC_CDC_HAND_HYGIENE, SRC_TEXTBOOK_CURRICULUM],
    },
    {
      id: "saf-028",
      subdomain: "PPE",
      difficulty: 2,
      stem: "Which sequence describes the correct order for putting on PPE before entering an isolation room?",
      choices: {
        a: "Gloves, gown, mask, eye protection",
        b: "Gown, mask or respirator, eye protection, gloves",
        c: "Mask, gloves, gown, eye protection",
        d: "Eye protection, gloves, gown, mask",
      },
      correct: "b",
      explanation:
        "Donning works from the inside out and ends with the hands: the gown " +
        "goes on first, then the mask or respirator, then eye protection, and " +
        "gloves last so they can be pulled over the gown cuffs. Putting gloves " +
        "on early means handling straps and ties with gloved hands and leaving " +
        "the cuff-to-glove seam open.",
      why: {
        a: "Gloves are last, not first — they seal over the gown cuffs.",
        c: "The gown goes on before the mask so its ties can be reached without contaminating gloved hands.",
        d: "Eye protection sits over the mask straps, so the mask goes on first, and gloves are still last.",
      },
      tip: "On: gown, mask, eyes, gloves. Off: gloves, eyes, gown, mask — dirtiest first, mask last and outside the room.",
      tags: ["ppe", "donning", "isolation"],
      sources: [SRC_CDC_STANDARD_PRECAUTIONS, SRC_TEXTBOOK_CURRICULUM],
    },
    {
      id: "saf-029",
      subdomain: "Transmission-based precautions",
      difficulty: 2,
      stem: "A requisition is for a patient in airborne precautions for suspected tuberculosis. What respiratory protection is required?",
      choices: {
        a: "A surgical mask worn by the phlebotomist",
        b: "A fit-tested N95 or higher-level respirator",
        c: "A surgical mask worn by the patient only",
        d: "No respiratory protection if the draw takes under five minutes",
      },
      correct: "b",
      explanation:
        "Airborne precautions cover organisms that stay suspended in small " +
        "droplet nuclei and travel on air currents, so a loose surgical mask is " +
        "not enough. A fit-tested N95 or higher respirator, worn correctly, is " +
        "required, and the room's negative-pressure door stays closed.",
      why: {
        a: "A surgical mask does not seal to the face and is not rated to filter droplet nuclei.",
        c: "Masking the patient helps contain source droplets but does not protect the phlebotomist entering the room.",
        d: "Airborne particles do not respect a stopwatch; protection is required for any entry.",
      },
      tip: "Airborne (TB, measles, varicella) = fit-tested N95. Droplet (flu, pertussis) = surgical mask. Contact (MRSA, C. diff) = gown and gloves.",
      tags: ["airborne-precautions", "tuberculosis", "n95"],
      sources: [SRC_CDC_STANDARD_PRECAUTIONS, SRC_TEXTBOOK_CURRICULUM],
    },
    {
      id: "saf-030",
      subdomain: "Transmission-based precautions",
      difficulty: 2,
      stem: "Which category of transmission-based precautions applies to a patient colonized with MRSA?",
      choices: {
        a: "Airborne precautions",
        b: "Droplet precautions",
        c: "Contact precautions",
        d: "Protective isolation",
      },
      correct: "c",
      explanation:
        "MRSA spreads by direct and indirect contact — hands, equipment, and " +
        "environmental surfaces — so contact precautions apply. That means a " +
        "gown and gloves for the encounter, and equipment that is either " +
        "dedicated to the room or disinfected before it leaves.",
      why: {
        a: "Airborne precautions are for organisms carried in droplet nuclei, such as tuberculosis.",
        b: "Droplet precautions address large respiratory droplets over a short distance, not contact spread.",
        d: "Protective isolation shields an immunocompromised patient from the outside world; it does not describe MRSA.",
      },
      tip: "MRSA, VRE, C. difficile: contact precautions. Gown and gloves on, equipment wiped down before it leaves.",
      tags: ["contact-precautions", "mrsa", "isolation"],
      sources: [SRC_CDC_STANDARD_PRECAUTIONS, SRC_TEXTBOOK_CURRICULUM],
    },
    {
      id: "saf-031",
      subdomain: "Sharps safety",
      difficulty: 1,
      stem: "At what point is a sharps container replaced?",
      choices: {
        a: "When items reach the manufacturer's fill line, roughly two-thirds to three-quarters full",
        b: "Only when nothing more can be forced into it",
        c: "At the end of every shift, regardless of how full it is",
        d: "When the outside of the container becomes visibly soiled",
      },
      correct: "a",
      explanation:
        "Containers are sealed and replaced at the fill line — commonly around " +
        "two-thirds to three-quarters full — because an overfilled container " +
        "forces the next user's hand toward protruding sharps. Waiting until " +
        "nothing else fits guarantees exactly the exposure the container exists " +
        "to prevent.",
      why: {
        b: "Forcing items into a full container is a leading cause of needlestick injury.",
        c: "Containers are changed by fill level, not by the clock; a barely-used container is not replaced.",
        d: "External soiling is a separate problem and does not define when a container is full.",
      },
      tip: "Seal at the fill line, not at the brim. Never push a sharp past resistance.",
      tags: ["sharps", "disposal", "needlestick"],
      sources: [SRC_OSHA_BBP, SRC_TEXTBOOK_CURRICULUM],
    },
    {
      id: "saf-032",
      subdomain: "Engineering controls",
      difficulty: 3,
      stem: "A self-sheathing needle and a rule prohibiting recapping are examples of which two types of control, respectively?",
      choices: {
        a: "Work practice control and engineering control",
        b: "Engineering control and work practice control",
        c: "Both are engineering controls",
        d: "Both are personal protective equipment",
      },
      correct: "b",
      explanation:
        "Engineering controls isolate or remove the hazard through the device " +
        "itself — a self-sheathing needle, a sharps container, a splash shield. " +
        "Work practice controls change how the task is performed, such as " +
        "prohibiting recapping or requiring hand hygiene. Engineering controls " +
        "are preferred because they do not depend on anyone remembering.",
      why: {
        a: "The two are reversed: the device is the engineering control and the rule is the work practice control.",
        c: "A prohibition on recapping is a behavior rule, not a physical device.",
        d: "PPE is worn on the body and is the last line of defense, not the first.",
      },
      tip: "Engineering = the device does the protecting. Work practice = the person does. PPE = the barrier you wear.",
      tags: ["engineering-controls", "work-practice-controls", "osha"],
      sources: [SRC_OSHA_BBP, SRC_TEXTBOOK_CURRICULUM],
    },
    {
      id: "saf-033",
      subdomain: "Bloodborne pathogens",
      difficulty: 2,
      stem: "Under the OSHA Bloodborne Pathogens Standard, what is the employer's obligation regarding hepatitis B vaccination for at-risk employees?",
      choices: {
        a: "It must be offered at no cost after training, and may be declined in writing",
        b: "It is mandatory and employment can be conditioned on receiving it",
        c: "It must be offered, with the employee paying a share of the cost",
        d: "It is offered only after an employee sustains an exposure",
      },
      correct: "a",
      explanation:
        "The vaccination series is made available at no cost to employees with " +
        "occupational exposure risk, after they receive bloodborne pathogens " +
        "training and within a short window of assignment. An employee may " +
        "decline, but must sign a declination form and can request the vaccine " +
        "later at any time while still covered.",
      why: {
        b: "Employees may decline; what is required is that the offer be made and documented.",
        c: "The employer bears the full cost — no share is passed to the employee.",
        d: "The vaccine is offered proactively; post-exposure prophylaxis is a separate obligation.",
      },
      tip: "Offered free, offered early, declinable in writing, and available later if the employee changes their mind.",
      tags: ["hepatitis-b", "vaccination", "osha"],
      sources: [SRC_OSHA_BBP, SRC_TEXTBOOK_CURRICULUM],
    },
    {
      id: "saf-034",
      subdomain: "Bloodborne pathogens",
      difficulty: 2,
      stem: "Which bloodborne pathogen carries the highest risk of transmission from a single needlestick involving an infected source patient?",
      choices: {
        a: "HIV",
        b: "Hepatitis C virus",
        c: "Hepatitis B virus",
        d: "All three carry an identical risk",
      },
      correct: "c",
      explanation:
        "Hepatitis B is the most transmissible of the three by needlestick, " +
        "which is precisely why an effective vaccine is offered to every worker " +
        "with exposure risk. Hepatitis C carries an intermediate risk with no " +
        "vaccine available, and HIV the lowest of the three.",
      why: {
        a: "HIV transmission risk from a percutaneous exposure is the lowest of the three.",
        b: "Hepatitis C sits between hepatitis B and HIV in transmission risk.",
        d: "The three differ substantially, which is why vaccination and follow-up protocols differ.",
      },
      tip: "By needlestick risk: HBV > HCV > HIV. Only HBV has a vaccine — take it.",
      tags: ["bloodborne-pathogens", "hepatitis-b", "exposure-risk"],
      sources: [SRC_OSHA_BBP, SRC_TEXTBOOK_CURRICULUM],
    },
    {
      id: "saf-035",
      subdomain: "Exposure response",
      difficulty: 2,
      stem: "Under the Bloodborne Pathogens Standard, who pays for post-exposure evaluation and follow-up after an occupational needlestick?",
      choices: {
        a: "The employee, through their own health insurance",
        b: "The employer, at no cost to the employee",
        c: "The source patient's insurance carrier",
        d: "It is split between employer and employee",
      },
      correct: "b",
      explanation:
        "Post-exposure evaluation, testing, prophylaxis, and follow-up are " +
        "provided at no cost to the exposed employee, at a reasonable time and " +
        "place, and by a licensed healthcare professional. Cost must never be a " +
        "reason an exposure goes unreported.",
      why: {
        a: "Shifting the cost to the employee is exactly what the standard forbids.",
        c: "The source patient bears no responsibility for the exposed worker's care.",
        d: "There is no employee share; the full cost sits with the employer.",
      },
      tip: "Free, prompt, and confidential — the three features that make reporting an exposure the easy choice.",
      tags: ["exposure-response", "osha", "post-exposure"],
      sources: [SRC_OSHA_BBP, SRC_TEXTBOOK_CURRICULUM],
    },
    {
      id: "saf-036",
      subdomain: "Biohazard spills",
      difficulty: 2,
      stem: "A tube of blood breaks on the floor of the drawing room. After putting on gloves, what is the correct sequence for cleaning it up?",
      choices: {
        a: "Pour disinfectant over the spill, then sweep the glass into a bag",
        b: "Absorb the liquid, remove glass with forceps or a brush and dustpan into a sharps container, then disinfect the area",
        c: "Wipe the area with disinfectant, then pick up the glass by hand",
        d: "Cover the spill with paper towels and report it for housekeeping to handle",
      },
      correct: "b",
      explanation:
        "Liquid is absorbed first so the spill is contained, broken glass is " +
        "picked up with a mechanical device — never gloved fingers — and " +
        "discarded as a sharp, and only then is the area disinfected with an " +
        "appropriate agent for the required contact time.",
      why: {
        a: "Flooding the spill spreads it, and broken glass is never swept into an ordinary bag.",
        c: "Picking up glass by hand risks a contaminated laceration, gloves or not.",
        d: "The person who breaks a specimen is responsible for containing it; blood spills are not left for someone else to find.",
      },
      tip: "Absorb, remove sharps mechanically, disinfect, then dispose of everything as biohazard waste.",
      tags: ["spill-cleanup", "broken-glass", "biohazard"],
      sources: [SRC_OSHA_BBP, SRC_TEXTBOOK_CURRICULUM],
    },
    {
      id: "saf-037",
      subdomain: "Biohazard spills",
      difficulty: 2,
      stem: "Which disinfectant preparation is commonly specified for decontaminating a blood spill on a hard surface?",
      choices: {
        a: "A 1:10 dilution of household bleach, prepared for use",
        b: "70% isopropyl alcohol",
        c: "Plain detergent and hot water",
        d: "A 1:1000 dilution of bleach",
      },
      correct: "a",
      explanation:
        "A freshly prepared 1:10 dilution of household bleach — or another " +
        "EPA-registered tuberculocidal disinfectant — is the standard choice " +
        "for blood spills. Bleach solutions lose potency over time, so they are " +
        "prepared for use rather than kept indefinitely, and the surface must " +
        "stay wet for the labeled contact time.",
      why: {
        b: "Alcohol evaporates quickly, is not the recommended agent for blood spills, and does not penetrate organic material well.",
        c: "Detergent cleans but does not disinfect; blood spills require a registered disinfectant.",
        d: "That dilution is far too weak for a blood spill on a surface.",
      },
      tip: "1:10 bleach, made fresh, left wet for the labeled contact time.",
      tags: ["disinfection", "bleach", "spill-cleanup"],
      sources: [SRC_OSHA_BBP, SRC_TEXTBOOK_CURRICULUM],
    },
    {
      id: "saf-038",
      subdomain: "Chain of infection",
      difficulty: 2,
      stem: "Performing hand hygiene between patients breaks which link in the chain of infection?",
      choices: {
        a: "The susceptible host",
        b: "The mode of transmission",
        c: "The infectious agent",
        d: "The portal of entry",
      },
      correct: "b",
      explanation:
        "Hands are the classic vehicle carrying organisms from one patient to " +
        "the next, so cleaning them interrupts the mode of transmission. The " +
        "chain needs every link to stay intact — agent, reservoir, portal of " +
        "exit, mode of transmission, portal of entry, susceptible host — so " +
        "breaking any one of them stops the infection.",
      why: {
        a: "Protecting the host is what vaccination and treating underlying illness address.",
        c: "The organism itself still exists; hand hygiene removes it from the route, not from the world.",
        d: "Covering a wound or using a barrier addresses the portal of entry.",
      },
      tip: "Six links: agent, reservoir, portal of exit, transmission, portal of entry, host. Break any one and there is no infection.",
      tags: ["chain-of-infection", "hand-hygiene", "transmission"],
      sources: [SRC_CDC_STANDARD_PRECAUTIONS, SRC_TEXTBOOK_CURRICULUM],
    },
    {
      id: "saf-039",
      subdomain: "Work area rules",
      difficulty: 1,
      stem: "Which activity is prohibited in an area where blood specimens are handled?",
      choices: {
        a: "Labeling tubes at the bench",
        b: "Applying lip balm or handling contact lenses",
        c: "Writing on a requisition",
        d: "Wearing a laboratory coat",
      },
      correct: "b",
      explanation:
        "Eating, drinking, smoking, applying cosmetics or lip balm, and " +
        "handling contact lenses are prohibited wherever there is a reasonable " +
        "likelihood of occupational exposure. All of them move a hand to the " +
        "face or mouth, which is precisely the route contamination takes.",
      why: {
        a: "Labeling at the bench is routine work, done with gloves and hand hygiene.",
        c: "Paperwork is expected work; it is kept away from specimen contact but is not prohibited.",
        d: "A laboratory coat is protective equipment, and is required rather than prohibited.",
      },
      tip: "Nothing that brings a hand to your mouth or eyes. That covers food, drink, cosmetics, lip balm, and contacts.",
      tags: ["work-practice-controls", "osha", "contamination"],
      sources: [SRC_OSHA_BBP, SRC_TEXTBOOK_CURRICULUM],
    },
    {
      id: "saf-040",
      subdomain: "Work area rules",
      difficulty: 1,
      stem: "A coworker asks to keep their lunch in the refrigerator used for chilled specimens because it is the nearest one. What is the correct response?",
      choices: {
        a: "Allow it if the food is sealed in a bag",
        b: "Allow it only for the duration of one shift",
        c: "Decline — food and drink are never stored where blood or specimens are kept",
        d: "Allow it if the food is on a separate shelf from the specimens",
      },
      correct: "c",
      explanation:
        "Food and drink are never stored in refrigerators, freezers, shelves, " +
        "cabinets, or on countertops where blood or other potentially " +
        "infectious material is kept. Bags, shelves, and time limits do not " +
        "change the rule, because contamination transfers through handles, " +
        "surfaces, and leaks rather than direct stacking.",
      why: {
        a: "A sealed bag does not stop the hands that open the door from transferring contamination.",
        b: "The prohibition has no time allowance built into it.",
        d: "Shelf separation inside a shared unit is not a recognized control.",
      },
      tip: "Specimen refrigerators hold specimens. There is no version of this that is acceptable.",
      tags: ["work-practice-controls", "specimen-storage", "osha"],
      sources: [SRC_OSHA_BBP, SRC_TEXTBOOK_CURRICULUM],
    },
    {
      id: "saf-041",
      subdomain: "Fire safety",
      difficulty: 2,
      stem: "The RACE acronym guides response to a fire. What does the R stand for?",
      choices: {
        a: "Report the fire to the switchboard",
        b: "Rescue anyone in immediate danger",
        c: "Restrict access to the corridor",
        d: "Retrieve the nearest extinguisher",
      },
      correct: "b",
      explanation:
        "RACE runs Rescue, Alarm, Confine, Extinguish or Evacuate. People come " +
        "first: anyone in immediate danger is moved, then the alarm is raised, " +
        "then doors are closed to confine the fire, and only then is a small " +
        "fire fought — or the area evacuated if it is not small.",
      why: {
        a: "Raising the alarm is the A, and it comes after moving anyone in immediate danger.",
        c: "Confining the fire by closing doors is the C, the third step.",
        d: "Extinguishing is the last step, and only for a fire small enough to fight safely.",
      },
      tip: "RACE for the response, PASS for the extinguisher: Pull, Aim, Squeeze, Sweep.",
      tags: ["fire-safety", "race", "emergency"],
      sources: [SRC_TEXTBOOK_CURRICULUM],
    },
    {
      id: "saf-042",
      subdomain: "Chemical safety",
      difficulty: 2,
      stem: "Where does a phlebotomist find the handling, storage, and first-aid information for a chemical used in the drawing area?",
      choices: {
        a: "The safety data sheet (SDS) for that chemical",
        b: "The facility's exposure control plan",
        c: "The manufacturer's tube insert",
        d: "The infection control manual",
      },
      correct: "a",
      explanation:
        "A safety data sheet accompanies every hazardous chemical and covers " +
        "identification, hazards, composition, first-aid measures, handling and " +
        "storage, exposure controls, and disposal. Employers must keep them " +
        "accessible to employees during every shift.",
      why: {
        b: "The exposure control plan addresses bloodborne pathogens, not chemical hazards.",
        c: "A tube insert describes the tube and its additive, not general chemical hazards.",
        d: "Infection control covers organisms; chemical hazard information lives in the SDS.",
      },
      tip: "Chemical question? SDS. Bloodborne question? Exposure control plan.",
      tags: ["chemical-safety", "sds", "hazard-communication"],
      sources: [SRC_TEXTBOOK_CURRICULUM],
    },
    {
      id: "saf-043",
      subdomain: "Chemical safety",
      difficulty: 2,
      stem: "When a dilution requires mixing acid and water, which order is correct and why?",
      choices: {
        a: "Water into acid, so the acid is not disturbed",
        b: "Acid into water, so heat is dissipated and splattering is limited",
        c: "Either order, provided the container is glass",
        d: "Either order, provided a fume hood is used",
      },
      correct: "b",
      explanation:
        "Acid is always added to water. The reaction releases heat, and the " +
        "larger volume of water absorbs it; pouring water into concentrated " +
        "acid concentrates that heat at the surface and can boil and spatter " +
        "corrosive liquid back at the person mixing it.",
      why: {
        a: "This is the dangerous direction, and the reason has nothing to do with disturbing the acid.",
        c: "Glassware does not change the chemistry of the exothermic reaction.",
        d: "A hood captures vapor but does not prevent a spattering burn.",
      },
      tip: "Do as you oughta — add acid to water.",
      tags: ["chemical-safety", "dilution", "acid"],
      sources: [SRC_TEXTBOOK_CURRICULUM],
    },
    {
      id: "saf-044",
      subdomain: "Waste handling",
      difficulty: 1,
      stem: "A used gauze pad with a small amount of dried blood on it is discarded into which container?",
      choices: {
        a: "The sharps container",
        b: "A biohazard (regulated medical waste) container",
        c: "The regular waste basket, since it is not saturated",
        d: "The chemical waste bin",
      },
      correct: "b",
      explanation:
        "Blood-contaminated non-sharp items go into a labeled biohazard " +
        "container. Facility policy defines exactly which lightly-soiled items " +
        "must be treated as regulated waste, and the safe default for anything " +
        "carrying visible blood is the biohazard container.",
      why: {
        a: "Sharps containers are reserved for needles, lancets, and broken glass — filling them with gauze wastes capacity.",
        c: "Guessing about saturation is not the phlebotomist's call to make at the bedside; visible blood goes in biohazard waste.",
        d: "Chemical waste streams are for chemicals, not blood-contaminated material.",
      },
      tip: "Sharps in sharps. Anything else with blood on it goes in biohazard. Everything else is trash.",
      tags: ["waste-disposal", "biohazard", "regulated-waste"],
      sources: [SRC_OSHA_BBP, SRC_TEXTBOOK_CURRICULUM],
    },
    {
      id: "saf-045",
      subdomain: "PPE",
      difficulty: 2,
      stem: "A patient reports a latex allergy. Which change is required before the draw?",
      choices: {
        a: "Use nitrile gloves and a non-latex tourniquet, and check the bandage material",
        b: "Use latex gloves but double-glove for a barrier",
        c: "Use latex gloves and wash hands before contact",
        d: "No change is required — glove latex does not touch the patient",
      },
      correct: "a",
      explanation:
        "Every item that may touch the patient is swapped for a latex-free " +
        "alternative: gloves, tourniquet, and adhesive bandage. Tourniquets are " +
        "the item most often forgotten, and they sit against skin under " +
        "pressure for the length of the draw.",
      why: {
        b: "Doubling a latex glove doubles the latex; it does not create a latex-free barrier.",
        c: "Hand hygiene has no effect on the latex proteins in the glove itself.",
        d: "Gloves contact the patient's arm directly throughout the procedure.",
      },
      tip: "Latex allergy means gloves, tourniquet, and bandage all change — the tourniquet is the one people forget.",
      tags: ["latex-allergy", "ppe", "tourniquet"],
      sources: [SRC_TEXTBOOK_CURRICULUM],
    },
    {
      id: "saf-046",
      subdomain: "Sharps safety",
      difficulty: 3,
      stem: "A phlebotomist finds an uncapped needle left on a counter by a colleague. What is the safest response?",
      choices: {
        a: "Carefully recap it with a one-handed scoop, then discard it",
        b: "Bring a sharps container to the counter and dispose of the needle without recapping",
        c: "Carry the needle to the nearest sharps container across the room",
        d: "Leave it and tell the colleague who left it to deal with it",
      },
      correct: "b",
      explanation:
        "The container comes to the sharp, not the other way around. Bringing a " +
        "sharps container to the counter removes the need to recap or to carry " +
        "an exposed needle through a space where someone may turn a corner into " +
        "it. The incident is then reported so the underlying practice is fixed.",
      why: {
        a: "Recapping adds an unnecessary handling step; the goal is to touch the needle as little as possible.",
        c: "Walking with an unsheathed needle is one of the highest-risk moments in the whole procedure.",
        d: "Leaving an exposed needle on a counter leaves the hazard live for whoever arrives next.",
      },
      tip: "Never carry, never recap. Move the container, not the needle.",
      tags: ["sharps", "needlestick", "hazard-response"],
      sources: [SRC_OSHA_BBP, SRC_TEXTBOOK_CURRICULUM],
    },
    {
      id: "saf-047",
      subdomain: "Specimen transport safety",
      difficulty: 2,
      stem: "How are labeled tubes transported from an outpatient drawing station to the laboratory?",
      choices: {
        a: "Loose in a laboratory coat pocket",
        b: "In a sealed, leak-proof biohazard bag, with the requisition in the outer pocket",
        c: "In an open rack carried by hand",
        d: "In a sealed biohazard bag together with the requisition",
      },
      correct: "b",
      explanation:
        "Specimens travel in a closed, leak-proof secondary container labeled " +
        "with the biohazard symbol. The requisition rides in the separate outer " +
        "pocket so that a leaking tube does not destroy the paperwork that " +
        "identifies the specimen.",
      why: {
        a: "A pocket is neither leak-proof nor labeled, and tubes can break or fall out.",
        c: "An open rack offers no containment if a tube tips, leaks, or breaks in transit.",
        d: "Sealing the requisition in with the specimen risks losing it to a leak — that is what the outer pocket is for.",
      },
      tip: "Specimen inside, paperwork in the outside pocket. That separation is the whole reason the pocket exists.",
      tags: ["transport", "biohazard-bag", "specimen-handling"],
      sources: [SRC_OSHA_BBP, SRC_TEXTBOOK_CURRICULUM],
    },
    {
      id: "saf-048",
      subdomain: "PPE",
      difficulty: 2,
      stem: "During a difficult draw a phlebotomist's glove tears. What should be done?",
      choices: {
        a: "Continue and change gloves after the draw is finished",
        b: "Stop safely, remove the needle and dispose of it, perform hand hygiene, and re-glove",
        c: "Pull a second glove over the torn one and continue",
        d: "Continue if there is no visible blood on the hand",
      },
      correct: "b",
      explanation:
        "A torn glove is no longer a barrier. The draw is brought to a safe " +
        "stop — needle out and disposed of — then gloves come off, hands are " +
        "cleaned, and fresh gloves go on before the procedure is restarted.",
      why: {
        a: "Finishing the draw means continuing to work with blood while unprotected.",
        c: "Layering a glove over a contaminated tear does not decontaminate the hand underneath.",
        d: "Contamination is not always visible, which is the premise of standard precautions.",
      },
      tip: "A compromised barrier is no barrier. Stop, discard, clean hands, re-glove.",
      tags: ["ppe", "gloves", "standard-precautions"],
      sources: [SRC_CDC_STANDARD_PRECAUTIONS, SRC_TEXTBOOK_CURRICULUM],
    },
    {
      id: "saf-049",
      subdomain: "Exposure control plan",
      difficulty: 2,
      stem: "How often must an employer review and update the exposure control plan?",
      choices: {
        a: "Every three years",
        b: "At least annually, and whenever tasks or procedures change",
        c: "Only after an exposure incident occurs",
        d: "Only when new employees are hired",
      },
      correct: "b",
      explanation:
        "The plan is reviewed and updated at least annually and whenever new or " +
        "modified tasks and procedures affect exposure. The annual review must " +
        "also document consideration of safer devices that have come onto the " +
        "market since the last review.",
      why: {
        a: "A three-year cycle is too long; the requirement is annual at minimum.",
        c: "Waiting for an incident makes the plan reactive, which is the opposite of its purpose.",
        d: "Hiring triggers training, not the plan review cycle.",
      },
      tip: "Annually, plus whenever the work changes — and the review documents new safer devices considered.",
      tags: ["exposure-control-plan", "osha", "compliance"],
      sources: [SRC_OSHA_BBP, SRC_TEXTBOOK_CURRICULUM],
    },
    {
      id: "saf-050",
      subdomain: "Sharps safety",
      difficulty: 2,
      stem: "What information must a sharps injury log record?",
      choices: {
        a: "The injured employee's full name and home address",
        b: "The type and brand of device, the department where the incident occurred, and how it happened",
        c: "The source patient's name and diagnosis",
        d: "Only the total number of injuries each year",
      },
      correct: "b",
      explanation:
        "The log records the device type and brand, where the incident " +
        "happened, and an explanation of how — the details that let a facility " +
        "identify which devices and which settings are producing injuries. It " +
        "is maintained so employee confidentiality is protected.",
      why: {
        a: "The log is kept in a way that protects the confidentiality of the injured employee.",
        c: "Source patient identity is confidential medical information and is not logged here.",
        d: "A bare count reveals nothing about which device or setting needs to change.",
      },
      tip: "The log exists to find patterns in devices and settings, not to name people.",
      tags: ["sharps-injury-log", "osha", "needlestick"],
      sources: [SRC_OSHA_BBP, SRC_TEXTBOOK_CURRICULUM],
    },
    {
      id: "saf-051",
      subdomain: "PPE",
      difficulty: 1,
      stem: "When must a laboratory coat or gown worn during collections be removed?",
      choices: {
        a: "At the end of the week, when it goes for laundering",
        b: "Before leaving the work area, and immediately if it becomes contaminated",
        c: "Only if it is visibly soaked through",
        d: "Only when the phlebotomist takes a break",
      },
      correct: "b",
      explanation:
        "Protective clothing stays in the work area. It comes off before " +
        "leaving — so contamination is not carried to the cafeteria, the lift, " +
        "or home — and comes off immediately if it is penetrated by blood or " +
        "other potentially infectious material.",
      why: {
        a: "Wearing a potentially contaminated coat for a week and outside the work area defeats its purpose.",
        c: "Contamination requiring removal does not have to soak through.",
        d: "Break time is one occasion among many; the rule is leaving the work area.",
      },
      tip: "The coat protects the work area from you and you from it. It does not leave with you.",
      tags: ["ppe", "laboratory-coat", "contamination"],
      sources: [SRC_OSHA_BBP, SRC_TEXTBOOK_CURRICULUM],
    },
    {
      id: "saf-052",
      subdomain: "Standard precautions",
      difficulty: 2,
      stem: "Under standard precautions, which body fluid is NOT automatically treated as potentially infectious?",
      choices: {
        a: "Sweat",
        b: "Saliva",
        c: "Cerebrospinal fluid",
        d: "Any fluid visibly contaminated with blood",
      },
      correct: "a",
      explanation:
        "Standard precautions apply to blood, all body fluids, secretions and " +
        "excretions except sweat, non-intact skin, and mucous membranes. Sweat " +
        "is the single named exception, and any fluid with visible blood in it " +
        "is treated as infectious regardless.",
      why: {
        b: "Saliva is included, and is specifically named in the context of dental procedures.",
        c: "Cerebrospinal fluid is explicitly among the fluids covered.",
        d: "Visible blood removes any doubt — that fluid is treated as infectious.",
      },
      tip: "Everything except sweat. That is the whole exception list.",
      tags: ["standard-precautions", "body-fluids", "osha"],
      sources: [SRC_CDC_STANDARD_PRECAUTIONS, SRC_OSHA_BBP],
    },
    {
      id: "saf-053",
      subdomain: "Isolation",
      difficulty: 3,
      stem: "A phlebotomist must collect from a patient in protective (reverse) isolation. What is the purpose of the PPE in this case?",
      choices: {
        a: "To protect the phlebotomist from the patient's infection",
        b: "To protect an immunocompromised patient from organisms carried in",
        c: "To prevent specimen contamination during transport",
        d: "To satisfy a documentation requirement only",
      },
      correct: "b",
      explanation:
        "Protective isolation reverses the usual direction: the patient's " +
        "immune system cannot defend against organisms that a healthy person " +
        "shrugs off, so PPE keeps the outside world out. Supplies brought into " +
        "the room are limited to what is needed, and anything shared is avoided.",
      why: {
        a: "That is the aim of transmission-based precautions, which run in the opposite direction.",
        c: "Specimen integrity is handled by collection and transport practice, not by isolation type.",
        d: "The requirement exists because the patient's safety genuinely depends on it.",
      },
      tip: "Standard and transmission-based precautions protect you. Protective isolation protects the patient.",
      tags: ["protective-isolation", "immunocompromised", "ppe"],
      sources: [SRC_CDC_STANDARD_PRECAUTIONS, SRC_TEXTBOOK_CURRICULUM],
    },
    {
      id: "saf-054",
      subdomain: "Equipment hygiene",
      difficulty: 2,
      stem: "A reusable tourniquet becomes contaminated with a drop of blood during a draw. What should happen to it?",
      choices: {
        a: "Wipe the visible drop off and continue using it",
        b: "Discard it, and use a single-patient tourniquet for the rest of the encounter",
        c: "Set it aside to be laundered at the end of the week",
        d: "Use it only for patients in the same isolation category",
      },
      correct: "b",
      explanation:
        "A blood-contaminated tourniquet is discarded rather than wiped. " +
        "Tourniquets are handled repeatedly, stretched, and pressed against " +
        "skin, and many facilities now use single-patient-use tourniquets " +
        "precisely because they are a documented vehicle for organisms between " +
        "patients.",
      why: {
        a: "Wiping does not decontaminate a porous, stretched material that has absorbed blood.",
        c: "A contaminated item is not kept in circulation for days awaiting laundering.",
        d: "Grouping patients by isolation category is not a recognized substitute for disposing of contaminated equipment.",
      },
      tip: "Contaminated tourniquet = discarded tourniquet. It is the cheapest item in the tray and the most-handled.",
      tags: ["tourniquet", "equipment-hygiene", "cross-contamination"],
      sources: [SRC_TEXTBOOK_CURRICULUM],
    },
    {
      id: "saf-055",
      subdomain: "Ergonomics and general safety",
      difficulty: 1,
      stem: "Which practice reduces the risk of injury when a phlebotomist must move a heavy specimen transport box?",
      choices: {
        a: "Bend at the waist and lift with a straight back",
        b: "Bend the knees, keep the load close to the body, and lift with the legs",
        c: "Twist while lifting to shorten the movement",
        d: "Lift quickly to reduce the time under load",
      },
      correct: "b",
      explanation:
        "Safe lifting bends the knees rather than the back, keeps the load " +
        "close to the body's center of gravity, and drives the movement with " +
        "the large muscles of the legs. Twisting under load is a common cause " +
        "of back injury and is avoided by turning the feet instead.",
      why: {
        a: "Bending at the waist puts the load on the lumbar spine, which is the injury pattern to avoid.",
        c: "Twisting under load concentrates force on the spine and is a leading cause of back injury.",
        d: "Speed adds momentum the body has to absorb; controlled movement is safer.",
      },
      tip: "Knees bent, load close, legs lift, feet turn.",
      tags: ["ergonomics", "lifting", "general-safety"],
      sources: [SRC_TEXTBOOK_CURRICULUM],
    },
    {
      id: "saf-056",
      subdomain: "Sharps safety",
      difficulty: 3,
      stem: "Which situation best explains why a needle should never be removed from its holder before disposal?",
      choices: {
        a: "The holder is more expensive to replace than the needle",
        b: "Removing the needle requires handling the contaminated hub, adding an injury opportunity",
        c: "Detached needles cannot fit into a sharps container",
        d: "The holder must be returned to the manufacturer intact",
      },
      correct: "b",
      explanation:
        "The needle and holder are discarded as a single unit because every " +
        "additional handling step is an additional chance to be stuck. " +
        "Unscrewing a used needle brings the fingers close to a contaminated " +
        "hub, and the twisting motion is exactly where control is lost.",
      why: {
        a: "Cost is not the reasoning; injury risk is.",
        c: "A detached needle physically fits, which is part of why the temptation exists.",
        d: "Single-use holders are discarded, not returned.",
      },
      tip: "One unit in, one unit out. Every extra handling step is an extra chance to be stuck.",
      tags: ["sharps", "needle-holder", "disposal"],
      sources: [SRC_OSHA_BBP, SRC_TEXTBOOK_CURRICULUM],
    },
    {
      id: "saf-057",
      subdomain: "Hand hygiene",
      difficulty: 2,
      stem: "Approximately how long should hands be rubbed together with soap during handwashing?",
      choices: {
        a: "About 5 seconds",
        b: "At least 15 to 20 seconds",
        c: "A full 2 minutes",
        d: "Until the water runs clear",
      },
      correct: "b",
      explanation:
        "Friction for at least 15 to 20 seconds is what actually removes " +
        "organisms — soap loosens them and rubbing lifts them off, covering " +
        "the backs of the hands, between the fingers, the thumbs, and under " +
        "the nails before rinsing.",
      why: {
        a: "Five seconds leaves most transient organisms in place.",
        c: "A two-minute surgical-style scrub is not required for routine hand hygiene.",
        d: "Water clarity says nothing about how long friction was applied.",
      },
      tip: "It's the friction and the time, not the water temperature, that does the work.",
      tags: ["hand-hygiene", "technique"],
      sources: [SRC_CDC_HAND_HYGIENE, SRC_TEXTBOOK_CURRICULUM],
    },
    {
      id: "saf-058",
      subdomain: "Bloodborne pathogens",
      difficulty: 2,
      stem: "How often must bloodborne pathogens training be provided to employees with occupational exposure?",
      choices: {
        a: "At hire only",
        b: "At initial assignment and at least annually thereafter",
        c: "Every two years",
        d: "Only when an employee requests it",
      },
      correct: "b",
      explanation:
        "Training is provided at the time of initial assignment to tasks with " +
        "occupational exposure and at least annually after that, with " +
        "additional training whenever new tasks or procedures change exposure " +
        "risk. It is provided during working hours at no cost.",
      why: {
        a: "One-time training does not keep pace with changing devices, procedures, or memory.",
        c: "A two-year cycle is longer than the required annual minimum.",
        d: "Training is an employer obligation, not something an employee has to ask for.",
      },
      tip: "At assignment, then annually — plus extra whenever the work changes.",
      tags: ["training", "osha", "bloodborne-pathogens"],
      sources: [SRC_OSHA_BBP, SRC_TEXTBOOK_CURRICULUM],
    },
    {
      id: "saf-059",
      subdomain: "Transmission-based precautions",
      difficulty: 3,
      stem: "A patient on droplet precautions for pertussis needs a draw. What PPE is added to standard precautions?",
      choices: {
        a: "A fit-tested N95 respirator and a gown",
        b: "A surgical mask, with eye protection if splashing is anticipated",
        c: "A gown and gloves only",
        d: "No additional PPE, because the patient is not coughing at the moment",
      },
      correct: "b",
      explanation:
        "Droplet precautions target large respiratory droplets that fall out of " +
        "the air within a short distance, so a surgical mask worn on entry is " +
        "the added protection, with eye protection when splashes or sprays are " +
        "possible. Gloves and hand hygiene are already part of standard " +
        "precautions for any draw.",
      why: {
        a: "An N95 is the airborne-precautions requirement; droplet precautions do not call for one.",
        c: "A gown and gloves are the contact-precautions combination and do not protect mucous membranes from droplets.",
        d: "Precautions are based on the patient's status, not on whether a cough happens while you are in the room.",
      },
      tip: "Droplet = surgical mask on entry. Airborne = fit-tested N95. Contact = gown and gloves.",
      tags: ["droplet-precautions", "pertussis", "ppe"],
      sources: [SRC_CDC_STANDARD_PRECAUTIONS, SRC_TEXTBOOK_CURRICULUM],
    },
    {
      id: "saf-060",
      subdomain: "Exposure response",
      difficulty: 3,
      stem: "Blood splashes into a phlebotomist's eye during a difficult draw. What is the immediate action?",
      choices: {
        a: "Blink repeatedly and continue, then report at the end of the shift",
        b: "Flush the eye with water or saline at an eyewash station for an extended period, then report immediately",
        c: "Rub the eye with a clean gauze pad and apply antiseptic",
        d: "Instill an antibiotic eye drop before reporting",
      },
      correct: "b",
      explanation:
        "A mucous membrane exposure is flushed immediately and continuously " +
        "with water or saline — an eyewash station is designed for exactly this " +
        "— and then reported at once so post-exposure evaluation can begin. " +
        "Prophylaxis is time-sensitive, so delay costs options.",
      why: {
        a: "Blinking does not flush the exposure, and deferring the report delays time-sensitive evaluation.",
        c: "Rubbing drives material further into the conjunctiva, and antiseptics are not used in the eye.",
        d: "Medication decisions belong to the evaluating clinician, after flushing and reporting.",
      },
      tip: "Mucous membrane exposure: flush long, report immediately. The clock on prophylaxis starts at the splash.",
      tags: ["exposure-response", "mucous-membrane", "eyewash"],
      sources: [SRC_OSHA_BBP, SRC_TEXTBOOK_CURRICULUM],
    },
  ],
);

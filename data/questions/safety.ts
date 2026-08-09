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
        a: "Flooding the spill spreads it, and sweeping before absorbing aerosolizes and smears the material.",
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
  ],
);

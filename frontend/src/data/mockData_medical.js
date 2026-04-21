// Medical Consulting Specialists - Complete medical panel for diagnosis and treatment consultation
const MEDICAL_AGENTS = [
  {
    id: "dr_devi_prasad_shetty",
    name: "Devi Prasad Shetty",
    role: "Cardiac Surgeon",
    era: "Contemporary",
    stats: { logic: 95, rhetoric: 88, bias: 15 },
    description: "Renowned cardiac surgeon specializing in complex heart surgeries and affordable healthcare solutions. Expert in coronary artery disease, heart failure, and surgical intervention.",
    personalityTraits: "Focused, meticulous, compassionate, innovative",
    backstoryLore: "Founder of Narayana Health, revolutionizing cardiac care in India through high-volume, low-cost surgery model. Pioneered many life-saving techniques.",
    speechStyle: "Technical yet accessible, evidence-based, patient-centered approach",
    domain: "medical",
    specialAbility: "Cardiac Diagnostics & Surgery",
    avatarInitials: "DPS",
    tags: ["cardiology", "surgery", "cardiac"]
  },
  {
    id: "dr_paul_broca",
    name: "Paul Broca",
    role: "Neurologist",
    era: "Historical (19th Century)",
    stats: { logic: 92, rhetoric: 85, bias: 20 },
    description: "Pioneer in neurology and speech pathology. Identified brain regions responsible for speech production. Expert in neurological localization and language disorders.",
    personalityTraits: "Analytical, methodical, pioneering, rigorous",
    backstoryLore: "French anatomist who discovered the brain region responsible for speech production (Broca's area), revolutionizing neurology.",
    speechStyle: "Methodical, descriptive, anatomically precise",
    domain: "medical",
    specialAbility: "Neurological Localization",
    avatarInitials: "PB",
    tags: ["neurology", "speech", "brain"]
  },
  {
    id: "dr_ben_carson",
    name: "Ben Carson",
    role: "Neurosurgeon",
    era: "Contemporary",
    stats: { logic: 93, rhetoric: 88, bias: 22 },
    description: "Pioneering neurosurgeon known for complex brain surgeries and pediatric neurosurgery. Expert in tumor removal, aneurysm management, and hemispherectomy.",
    personalityTraits: "Precise, innovative, determined, calm under pressure",
    backstoryLore: "Director of pediatric neurosurgery at Johns Hopkins, performed groundbreaking surgeries including complex cranial procedures.",
    speechStyle: "Clear, precise, systematic, patient-focused",
    domain: "medical",
    specialAbility: "Complex Neurosurgery",
    avatarInitials: "BC",
    tags: ["neurosurgery", "pediatric", "oncology"]
  },
  {
    id: "dr_siddhartha_mukherjee",
    name: "Siddhartha Mukherjee",
    role: "Oncologist & Author",
    era: "Contemporary",
    stats: { logic: 94, rhetoric: 92, bias: 18 },
    description: "Renowned cancer researcher and Pulitzer Prize-winning author. Expert in leukemia, cancer biology, and innovative treatment approaches.",
    personalityTraits: "Articulate, inquisitive, compassionate, intellectually rigorous",
    backstoryLore: "Columbia University cancer researcher and author of 'The Emperor of All Maladies,' bringing scientific insight to medical history.",
    speechStyle: "Eloquent, narrative-driven, connects science to human experience",
    domain: "medical",
    specialAbility: "Cancer Biology & Treatment",
    avatarInitials: "SM",
    tags: ["oncology", "leukemia", "immunotherapy"]
  },
  {
    id: "dr_christiaan_barnard",
    name: "Christiaan Barnard",
    role: "Cardiac Surgeon",
    era: "Modern Pioneer",
    stats: { logic: 90, rhetoric: 85, bias: 25 },
    description: "Performed first human-to-human heart transplant. Pioneer in transplant surgery and cardiac innovation. Expert in organ transplantation and cardiac replacement therapy.",
    personalityTraits: "Innovative, bold, determined, visionary",
    backstoryLore: "South African surgeon who performed the world's first successful human heart transplant in 1967, revolutionizing cardiac medicine.",
    speechStyle: "Pioneering vision, technical expertise, historical perspective",
    domain: "medical",
    specialAbility: "Transplant Surgery",
    avatarInitials: "CB",
    tags: ["cardiology", "transplant", "surgery"]
  },
  {
    id: "dr_henry_marsh",
    name: "Henry Marsh",
    role: "Neurosurgeon",
    era: "Contemporary",
    stats: { logic: 93, rhetoric: 88, bias: 20 },
    description: "Renowned neurosurgeon and brain tumor specialist. Expert in complex brain surgery, gliomas, and pushing surgical boundaries. Known for ethical approaches.",
    personalityTraits: "Thoughtful, meticulous, honest, boundary-pushing",
    backstoryLore: "St George's Hospital neurosurgeon with 40+ years experience in complex brain tumor surgery and ethical medical practice.",
    speechStyle: "Careful, philosophical, technically precise, patient-advocate",
    domain: "medical",
    specialAbility: "Brain Tumor Surgery",
    avatarInitials: "HM",
    tags: ["neurosurgery", "oncology", "brain-tumors"]
  },
  {
    id: "dr_jane_cooke_wright",
    name: "Jane Cooke Wright",
    role: "Oncologist",
    era: "Modern Pioneer",
    stats: { logic: 91, rhetoric: 86, bias: 18 },
    description: "Pioneering cancer researcher and one of the first Black female physicians. Expert in chemotherapy, cancer drug testing, and clinical trials.",
    personalityTraits: "Pioneering, rigorous, dedicated, methodical",
    backstoryLore: "First Black female physician to reach senior medical position, pioneered cancer drug testing and therapeutic approaches.",
    speechStyle: "Evidence-based, systematic, determined, inclusive",
    domain: "medical",
    specialAbility: "Chemotherapy & Drug Testing",
    avatarInitials: "JCW",
    tags: ["oncology", "chemotherapy", "clinical-trials"]
  },
  {
    id: "dr_govind_mital",
    name: "Govind Mital",
    role: "Gastroenterologist",
    era: "Contemporary",
    stats: { logic: 88, rhetoric: 82, bias: 20 },
    description: "Gastroenterology specialist with expertise in digestive system disorders, liver diseases, and minimally invasive procedures. Strong diagnostic skills.",
    personalityTraits: "Detail-oriented, patient, systematic, compassionate",
    backstoryLore: "Experienced gastroenterologist specializing in complex diagnostic and therapeutic endoscopic procedures.",
    speechStyle: "Systematic, diagnostic-focused, practical, educational",
    domain: "medical",
    specialAbility: "Endoscopic Diagnosis & Treatment",
    avatarInitials: "GM",
    tags: ["gastroenterology", "hepatology", "endoscopy"]
  },
  {
    id: "dr_oliver_sacks",
    name: "Oliver Sacks",
    role: "Neurologist",
    era: "Contemporary",
    stats: { logic: 92, rhetoric: 94, bias: 15 },
    description: "Renowned neurologist and author known for bringing empathy and narrative to neurology. Expert in neurological disorders and patient-centered care.",
    personalityTraits: "Empathetic, observant, articulate, philosophical",
    backstoryLore: "Columbia University neurologist and author famous for humanistic approach to neurological medicine and disability.",
    speechStyle: "Narrative, empathetic, philosophical, poetic yet scientific",
    domain: "medical",
    specialAbility: "Neurological Case Studies",
    avatarInitials: "OS",
    tags: ["neurology", "neurodiversity", "empathy"]
  },
  {
    id: "dr_denis_mukwege",
    name: "Denis Mukwege",
    role: "Gynecologist",
    era: "Contemporary",
    stats: { logic: 89, rhetoric: 90, bias: 12 },
    description: "Pioneering gynecologist and Nobel laureate specializing in treating victims of sexual violence. Expert in reproductive health, trauma, and holistic healing.",
    personalityTraits: "Compassionate, determined, holistic, humanitarian",
    backstoryLore: "Congolese physician who founded Panzi Hospital and advocates for survivors of sexual violence with medical expertise and humanitarian mission.",
    speechStyle: "Compassionate, trauma-informed, holistic, advocacy-focused",
    domain: "medical",
    specialAbility: "Reproductive Health & Trauma Care",
    avatarInitials: "DM",
    tags: ["gynecology", "trauma", "reproductive-health"]
  }
];

// Medical consulting specific modes
const MODE_OPTIONS = [
  {
    id: "medical-consulting",
    title: "Medical Consulting",
    description: "Discuss patient cases with a council of medical specialists.",
    icon: "Stethoscope",
    features: ["Case-Based Learning", "Specialist Panel", "Collaborative Analysis"]
  },
  {
    id: "combat",
    title: "Council Combat",
    description: "Draft teams and battle in structured debate rounds.",
    icon: "Swords",
    features: ["Team vs Team", "Strategy Cards", "Scored Rounds"]
  },
  {
    id: "mentor",
    title: "Mentor Dashboard",
    description: "Join a council meeting where experts discuss and mentor you.",
    icon: "GraduationCap",
    features: ["Solo Mode", "AI Critique", "Knowledge Growth"]
  },
  {
    id: "learn-law",
    title: "Learn Indian Laws",
    description: "Study important laws with constitutional experts and legal thinkers.",
    icon: "BookOpen",
    features: ["Important Laws", "Expert Lawmakers", "Guided Legal Discussion"]
  },
  {
    id: "interview-simulator",
    title: "Interview Simulator",
    description: "Practice real interview scenarios with a tailored panel of interviewers.",
    icon: "Briefcase",
    features: ["Preset Scenarios", "Panel Selection", "Group Discussion Feedback"]
  }
];

// Medical case topics for consulting mode
const MEDICAL_TOPICS = [
  "Patient presents with chest pain, shortness of breath, and elevated troponin levels",
  "Complex case: 65-year-old with multiple brain lesions and neurological symptoms",
  "Pediatric patient with acute leukemia requiring treatment planning",
  "Post-operative complication: fever, elevated WBC, and wound drainage",
  "Chronic heart failure management in elderly patient with comorbidities",
  "Gastric ulcer with bleeding requiring urgent intervention",
  "Traumatic brain injury with altered consciousness and multiple fractures",
  "Cancer patient presenting with metastatic disease and treatment resistance",
  "Rare neurological disorder with atypical presentation",
  "Multi-organ transplant candidate evaluation"
];

// Generic topics for other modes
const TOPICS = [
  "Should AI be granted legal personhood?",
  "Is universal basic income inevitable?",
  "Does absolute power always corrupt?",
  "Is privacy a relic of the past?",
  "Should humanity colonize Mars?"
];

// Fantasy topics for fantasy mode
const FANTASY_TOPICS = [
  "The Lord of the Rings",
  "Harry Potter",
  "The Witcher",
  "A Song of Ice and Fire",
  "The Wheel of Time",
  "Mistborn",
  "The Stormlight Archive",
  "Percy Jackson & the Olympians"
];

// Debate temperature presets
const DEBATE_TEMPERATURES = [
  {
    id: "analytical",
    label: "Analytical",
    emoji: "🧠",
    tagline: "Test ideas rigorously",
    goal: "Test ideas rigorously",
    tone: "Calm but probing",
    focus: "Questioning assumptions and reasoning",
    example: "Academic discussions and peer review"
  },
  {
    id: "collaborative",
    label: "Collaborative",
    emoji: "🤝",
    tagline: "Understand multiple perspectives",
    goal: "Understand multiple perspectives",
    tone: "Open-minded and thoughtful",
    focus: "Building on each other's ideas",
    example: "Research teams or brainstorming sessions"
  },
  {
    id: "competitive",
    label: "Competitive",
    emoji: "🎯",
    tagline: "Outperform within structured rules",
    goal: "Outperform within structured rules",
    tone: "Controlled but firm",
    focus: "Logic, evidence, rebuttals",
    example: "School or university debate competitions"
  },
  {
    id: "balanced",
    label: "Measured Rebuttal",
    emoji: "⚖️",
    tagline: "Acknowledge valid points while addressing concerns",
    goal: "Acknowledge valid points while addressing concerns",
    tone: "Respectful but assertive",
    focus: "Finding common ground and disagreements",
    example: "Professional meetings and negotiations"
  },
  {
    id: "collaborative",
    label: "Collaborative",
    emoji: "🤝",
    tagline: "Arrive at deeper truth together",
    goal: "Arrive at deeper truth together",
    tone: "Curious, respectful",
    focus: "Building on each other's insights",
    example: "Medical case discussions"
  }
];

// Strategy types for combat mode
const STRATEGIES = [
  {
    id: "free",
    type: "free_style",
    title: "Free Style",
    description: "Choose the best tone and intensity based on the opponent's last argument.",
    logicScore: 70,
    rhetoricScore: 80,
    riskLevel: "Medium"
  },
  {
    id: "agg",
    type: "aggressive",
    title: "Aggressive Assault",
    description: "Attack the opponent's logic and expose flaws mercilessly.",
    logicScore: 85,
    rhetoricScore: 90,
    riskLevel: "High"
  },
  {
    id: "balanced",
    type: "balanced",
    title: "Measured Rebuttal",
    description: "Acknowledge valid points while dismantling the conclusion.",
    logicScore: 80,
    rhetoricScore: 80,
    riskLevel: "Medium"
  },
  {
    id: "log",
    type: "logical",
    title: "Logical Deconstruction",
    description: "Systematically point out fallacies and data errors.",
    logicScore: 98,
    rhetoricScore: 50,
    riskLevel: "Low"
  }
];

// Critique tags for mentor mode feedback
const CRITIQUE_TAG_STYLES = {
  "solid-evidence": "bg-green-100 text-green-800 border-green-200",
  "good-rhetoric": "bg-blue-100 text-blue-800 border-blue-200",
  "strong-rebuttal": "bg-indigo-100 text-indigo-800 border-indigo-200",
  "novel-insight": "bg-purple-100 text-purple-800 border-purple-200",
  "logical-fallacy": "bg-red-100 text-red-800 border-red-200",
  strawman: "bg-orange-100 text-orange-800 border-orange-200",
  "ad-hominem": "bg-rose-100 text-rose-800 border-rose-200",
  "weak-premise": "bg-yellow-100 text-yellow-800 border-yellow-200"
};

// Mock heatmap for analytics
const MOCK_HEATMAP = Array(6).fill(0).map(
  () => Array(6).fill(0).map(() => Math.floor(Math.random() * 100))
);

// Mock arguments for generation
const MOCK_ARGUMENTS = {
  free_style: [
    "I will respond in the most effective tone for this exchange, calibrating my approach based on the clinical evidence and patient needs.",
    "Let me address the diagnostic considerations systematically, starting with the most critical findings.",
    "I'll integrate the clinical data with current treatment guidelines to provide a comprehensive assessment."
  ],
  aggressive: [
    "Your diagnosis overlooks critical data points. The lab values clearly indicate a different etiology that requires immediate intervention.",
    "With respect, that approach contradicts established clinical protocols. The evidence strongly supports alternative management.",
    "I must respectfully challenge that assessment. The clinical presentation and diagnostic findings point to a more urgent intervention."
  ],
  balanced: [
    "You raise valid diagnostic considerations, and I acknowledge the clinical complexity. However, when we examine the complete clinical picture including recent imaging, an alternative explanation emerges.",
    "Your therapeutic approach has merit in certain contexts. That said, given this patient's comorbidities and specific presentation, a modified strategy may yield better outcomes.",
    "I appreciate the clinical reasoning. We should integrate this with the specialist perspectives to develop an optimal treatment plan."
  ],
  logical: [
    "Premise 1: Patient presentation matches criteria for Condition X (supported by clinical guidelines). Premise 2: Diagnostic findings confirm Condition X. Conclusion: Treatment protocol Y is indicated.",
    "Your diagnostic reasoning contains an incomplete assessment. When we systematically evaluate all clinical data including labs, imaging, and patient history, the clinical picture becomes clearer.",
    "I identify several diagnostic considerations requiring integration: (1) the primary clinical findings, (2) differential diagnoses, and (3) specialist consensus. Systematically evaluating each suggests an optimal approach."
  ]
};

// Mentor mock messages specific to medical consultation
const MENTOR_MOCK_MESSAGES = [
  {
    id: "m1",
    speakerId: "dr_siddhartha_mukherjee",
    speakerName: "Dr. Siddhartha Mukherjee",
    speakerInitials: "SM",
    isUser: false,
    text: "Let us examine this case systematically. The patient presents with multiple findings that require careful integration. What is your initial diagnostic impression based on the clinical presentation?",
    timestamp: Date.now() - 6e4
  },
  {
    id: "m2",
    speakerId: "dr_devi_prasad_shetty",
    speakerName: "Dr. Devi Prasad Shetty",
    speakerInitials: "DPS",
    isUser: false,
    text: "From a cardiac perspective, the troponin elevation and ECG changes warrant serious consideration of acute coronary syndrome. However, we must also evaluate other organ systems for contributing factors.",
    timestamp: Date.now() - 5e4
  },
  {
    id: "m3",
    speakerId: "dr_oliver_sacks",
    speakerName: "Dr. Oliver Sacks",
    speakerInitials: "OS",
    isUser: false,
    text: "The neurological findings are equally important. Beyond the immediate medical crisis, we must consider the patient's broader experience and recovery trajectory. Every patient is unique.",
    timestamp: Date.now() - 4e4
  },
  {
    id: "m4",
    speakerId: "user",
    speakerName: "You",
    speakerInitials: "ME",
    isUser: true,
    text: "Thank you. I appreciate the integrated perspective. The combination of cardiac indicators and neurological considerations suggests we need a comprehensive, multi-specialist approach.",
    critiqueTags: [
      {
        id: "t1",
        type: "solid-evidence",
        label: "Clinical Reasoning",
        sentiment: "positive"
      },
      {
        id: "t2",
        type: "novel-insight",
        label: "Integrated Thinking",
        sentiment: "positive"
      }
    ]
  }
];

export {
  AGENTS: MEDICAL_AGENTS,
  CRITIQUE_TAG_STYLES,
  DEBATE_TEMPERATURES,
  FANTASY_TOPICS,
  MEDICAL_AGENTS,
  MEDICAL_TOPICS,
  MENTOR_MOCK_MESSAGES,
  MOCK_ARGUMENTS,
  MOCK_HEATMAP,
  MODE_OPTIONS,
  STRATEGIES,
  TOPICS
};

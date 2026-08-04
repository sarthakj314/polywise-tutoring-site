export type Track = { name: string; note: string };

export type Domain = {
  id: string;
  index: string;
  label: string;
  blurb: string;
  tracks: Track[];
  learners: string;
  depth: string;
};

export const DOMAINS: Domain[] = [
  {
    id: "money",
    index: "01",
    label: "Money & Markets",
    blurb:
      "From a first budget to derivatives desks. The same atlas holds the person who has never opened a brokerage account and the one pricing convexity.",
    learners: "4,180",
    depth: "Beginner → Desk-ready",
    tracks: [
      { name: "Personal finance, honestly", note: "cash flow, debt, taxes, first $10k" },
      { name: "Fintech systems", note: "ledgers, rails, KYC, stablecoin plumbing" },
      { name: "Markets & instruments", note: "equities, rates, options, risk" },
      { name: "Reading a company", note: "10-K teardown, unit economics" },
    ],
  },
  {
    id: "exams",
    index: "02",
    label: "Exams & School",
    blurb:
      "Every AP, the SAT and ACT, and the ordinary Tuesday homework in between — scheduled backwards from the test date, not forwards from a syllabus.",
    learners: "9,742",
    depth: "Grade 8 → Freshman year",
    tracks: [
      { name: "AP sciences", note: "Bio, Chem, Physics 1/2/C, Enviro" },
      { name: "AP humanities", note: "USH, World, Gov, Lang, Lit, Psych" },
      { name: "SAT / ACT", note: "adaptive sections, timed pressure drills" },
      { name: "Coursework rescue", note: "the unit you quietly fell behind on" },
    ],
  },
  {
    id: "math",
    index: "03",
    label: "Mathematics",
    blurb:
      "Arithmetic to measure theory, with no shame attached to where you enter. The palace finds the exact rung you fell off and rebuilds from there.",
    learners: "6,310",
    depth: "Fractions → Graduate",
    tracks: [
      { name: "Foundations", note: "arithmetic, algebra, the gaps nobody names" },
      { name: "Calculus sequence", note: "single, multi, differential equations" },
      { name: "Proof & structure", note: "linear algebra, analysis, abstract algebra" },
      { name: "Competition math", note: "AMC, AIME, Olympiad-track problem sets" },
    ],
  },
  {
    id: "cs",
    index: "04",
    label: "Computer Science",
    blurb:
      "Not a bootcamp. A curriculum that knows the difference between someone who wants to ship a product and someone who wants to understand a compiler.",
    learners: "8,455",
    depth: "First loop → Systems",
    tracks: [
      { name: "Programming from zero", note: "Python, JS, the mental model of state" },
      { name: "Algorithms & data structures", note: "interview-grade and beyond" },
      { name: "Systems", note: "operating systems, networks, databases, compilers" },
      { name: "Shipping", note: "git, testing, deploys, reading a codebase" },
    ],
  },
  {
    id: "ai",
    index: "05",
    label: "AI & Model Building",
    blurb:
      "Two doors. One for literacy — what these systems are, where they lie. One for construction — backprop by hand, then a transformer you wrote yourself.",
    learners: "7,024",
    depth: "Literacy → From scratch",
    tracks: [
      { name: "AI literacy", note: "capability, failure, prompting, provenance" },
      { name: "Math of learning", note: "gradients, optimization, probability" },
      { name: "Build a model from scratch", note: "MLP → attention → a small LM you train" },
      { name: "Applied ML", note: "fine-tuning, evals, retrieval, deployment" },
    ],
  },
  {
    id: "health",
    index: "06",
    label: "Health & Body",
    blurb:
      "The subjects people are least likely to admit they never learned. Taught with the same rigor as the ones with exams attached.",
    learners: "5,190",
    depth: "Daily → Clinical",
    tracks: [
      { name: "Training & strength", note: "programming, progression, recovery" },
      { name: "Nutrition without the noise", note: "energy balance, protein, adherence" },
      { name: "Sleep & attention", note: "circadian mechanics, focus architecture" },
      { name: "Reading medical evidence", note: "trials, effect sizes, what to ignore" },
    ],
  },
  {
    id: "law",
    index: "07",
    label: "Law & Policy",
    blurb:
      "Contracts you are about to sign, rights you are about to need, and the structure of the systems that decide both.",
    learners: "2,860",
    depth: "Civic → Pre-law",
    tracks: [
      { name: "Contracts in practice", note: "leases, employment, equity, NDAs" },
      { name: "Constitutional structure", note: "powers, rights, landmark reasoning" },
      { name: "Regulation & compliance", note: "privacy, securities, healthcare" },
      { name: "LSAT logic", note: "argument anatomy, timed reasoning" },
    ],
  },
  {
    id: "life",
    index: "08",
    label: "Life Systems",
    blurb:
      "Everything adults are assumed to already know. Negotiation, taxes, logistics, the grammar of a hard conversation.",
    learners: "3,977",
    depth: "Practical → Fluent",
    tracks: [
      { name: "Negotiation", note: "offers, salary, rent, discomfort tolerance" },
      { name: "Writing that lands", note: "email, memo, argument, edit" },
      { name: "Money logistics", note: "filing, insurance, credit, retirement" },
      { name: "Habit architecture", note: "environment design, streak recovery" },
    ],
  },
];

export type Modality = "tutor" | "quiz" | "visual" | "audio" | "text";

export const MODALITIES: {
  id: Modality;
  label: string;
  sub: string;
  fit: number;
}[] = [
  { id: "tutor", label: "One-on-one", sub: "Socratic tutor", fit: 0.91 },
  { id: "quiz", label: "Retrieval", sub: "Quiz pressure", fit: 0.74 },
  { id: "visual", label: "Visual", sub: "Concept maps", fit: 0.62 },
  { id: "audio", label: "Audio", sub: "Narrated depth", fit: 0.38 },
  { id: "text", label: "Text", sub: "Dense reading", fit: 0.55 },
];

export const STAGES = [
  {
    n: "01",
    kicker: "Arrival",
    title: "You name the thing you want to be good at.",
    body:
      "Four questions, ninety seconds. Not a personality quiz — a target, a deadline, an honest read on where you are, and how much of your week you actually have.",
    meta: ["goal", "horizon", "baseline", "budget of hours"],
  },
  {
    n: "02",
    kicker: "The trials",
    title: "We put you inside five different rooms.",
    body:
      "The same concept, taught five ways: a tutor who asks instead of tells, a quiz that pushes, a visual map, a narrated walk, a dense page of text. You are not asked which you prefer. You are watched while you learn.",
    meta: ["1-on-1", "retrieval", "visual", "audio", "text"],
  },
  {
    n: "03",
    kicker: "Signal",
    title: "What the room notices while you work.",
    body:
      "Time to first correct answer. Where the cursor stalls. Which explanations you re-read. What survives seven days later. Whether you quit at minute nine or minute forty.",
    meta: ["latency", "re-reads", "hesitation", "7-day retention", "session length"],
  },
  {
    n: "04",
    kicker: "The read",
    title: "A learning fingerprint, not a learning style.",
    body:
      "Styles are folklore. This is a measured profile: per-concept, per-hour, per-modality. It says you retain from retrieval at 8pm and lose an hour to video at noon — and it is allowed to be wrong, because it re-tests itself.",
    meta: ["per-concept", "per-hour", "per-modality"],
  },
  {
    n: "05",
    kicker: "Construction",
    title: "We build the environment around that fingerprint.",
    body:
      "A tutor model fine-tuned on your domain and your misconceptions. A layout generated for your attention span. A month of work scheduled backwards from your deadline, spaced against your own forgetting curve.",
    meta: ["fine-tuned tutor", "generated layout", "spaced plan"],
  },
  {
    n: "06",
    kicker: "The palace",
    title: "You walk into a room that was made this morning.",
    body:
      "And then it changes again. Every week the trials re-run quietly underneath the work, so the room you learn in at week twelve looks nothing like the one you started in.",
    meta: ["rebuilt weekly"],
  },
];

export const SIGNALS = [
  "time-to-first-correct — 14.2s",
  "re-read depth — 2 passes",
  "hesitation before submit — 3.1s",
  "retention @ 7d — 0.82",
  "session survival — 41 min",
  "error class — sign convention",
  "peak hour — 20:00–21:30",
  "modality lift — retrieval +23%",
  "concept mastery — 61 / 94",
  "forgetting curve — λ 0.19",
];

export const t2aRelease = {
  researchVersion: "v3.2.3 r2",
  auditRevision: "r3",
  auditVerdict: "APPROVED",
  auditValidator: "ALL CHECKS PASSED · exit 0",
  auditSha256:
    "762CC26F1CFBC516141DD48D08F1D25209EB6678034B81F16C32CB4570B75171",
  scale: {
    phases: 2,
    formalCumulative: 600,
    listeningEventsCumulative: 660,
    phase2Formal: 400,
    corePrompts: 40,
    models: 2,
    cohorts: 3,
    evaluator: "single evaluator",
  },
  phase1: {
    id: "H1",
    model: "Stable Audio Open 1.0",
    formalN: 200,
    hiddenRepeatN: 20,
    listeningEvents: 220,
    promptN: 40,
    fixedSeedsPerPrompt: 5,
    ovl: 4.245,
    rel: 3.46,
    reliability: {
      gap30PairN: 15,
      ovlWithinOne: "14/15",
      relWithinOne: "15/15",
      decisionExact: "12/15",
    },
  },
  phase2: {
    formalN: 400,
    hiddenRepeatN: 40,
    listeningEvents: 440,
    repetitionsPerPrompt: 5,
    audio: "10 s · 44.1 kHz · stereo WAV · raw output retained",
    models: [
      { id: "SA3M", name: "Stable Audio 3 Medium", formalN: 200, ovl: 3.64, rel: 3.305 },
      { id: "SAO1", name: "Stable Audio Open 1.0", formalN: 200, ovl: 3.78, rel: 3.355 },
    ],
    deltas: {
      ovl: { value: -0.14, ciLow: -0.395, ciHigh: 0.115 },
      rel: { value: -0.05, ciLow: -0.295, ciHigh: 0.18 },
    },
    decisions: [
      { model: "SA3M", pass: 73, keep: 93, regenerate: 34 },
      { model: "SAO1", pass: 61, keep: 122, regenerate: 17 },
    ],
    bootstrap: {
      iterations: 10000,
      seed: 42,
      unit: "40 Prompt paired differences",
      implementation: "Python random.Random · MT19937 · paired Prompt resampling",
    },
  },
  repeatConsistency: {
    pairN: 40,
    audioHashMatches: 40,
    ovlExact: [22, 40],
    ovlWithinOne: [38, 40],
    relExact: [25, 40],
    relWithinOne: [39, 40],
    decisionExact: [34, 40],
    primaryExact: [27, 40],
    sameSession: 4,
    crossSession: 36,
    gap30: { pairN: 34, ovlWithinOne: [32, 34], relWithinOne: [33, 34] },
    laterMinusEarlierOvl: -0.15,
  },
  historicalBridge: {
    ovlSpearman: 0.5286,
    relSpearman: 0.7565,
    ovlMad: 0.585,
    relMad: 0.365,
  },
  requirementAudit: {
    prompts: 40,
    rows: 41,
    description: "human-reviewed requirement rows with partial event decomposition",
  },
} as const;

export const currentReportHref =
  "/downloads/t2a-v3-evidence/T2A_Evaluation_Report_v3.2.3_r3.md";

export const auditRecordHref =
  "/downloads/t2a-v3-evidence/T2A_Audit_Release_Record_r3.md";


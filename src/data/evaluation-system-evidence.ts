export type PublicEvidenceStatus = "Implemented" | "Case-supported" | "Integrated Concept" | "Future Extension";

export const evaluationSystemEvidence = {
  acousticBatch: {
    id: "acoustic-report-200",
    label: "Stable Audio Open 1.0 generated batch",
    n: 200,
    source: "full_evaluation_report_v1.3.md",
    status: "Implemented" as PublicEvidenceStatus,
    metrics: [
      { id: "technical-decodable", label: "进入正式分析", value: "200/200", unit: "files", statistic: "Count", source: "acoustic-report-200" },
      { id: "spectral-centroid", label: "Spectral Centroid", value: "3605", unit: "Hz", statistic: "Mean", source: "acoustic-report-200" },
      { id: "lr-correlation", label: "L/R Correlation", value: "0.71 / 0.92", unit: "", statistic: "Mean / Median", source: "acoustic-report-200" },
      { id: "integrated-lufs", label: "Integrated LUFS", value: "−22.7 ± 9.0", unit: "LUFS", statistic: "Mean ± SD", source: "acoustic-report-200" },
      { id: "crest-factor", label: "Crest Factor", value: "21.2 ± 7.1", unit: "dB", statistic: "Mean ± SD", source: "acoustic-report-200" },
      { id: "true-peak", label: "True Peak", value: "−3.8 ± 6.1", unit: "dBTP", statistic: "Mean ± SD", source: "acoustic-report-200" },
    ],
  },
  homeColumns: [
    { title: "Human Evaluation", status: "Implemented" as PublicEvidenceStatus, items: ["Point", "Line", "Scene", "Independent OVL"] },
    { title: "Signal Diagnostics", status: "Implemented" as PublicEvidenceStatus, items: ["Technical", "Spectral", "Spatial", "Dynamics"] },
    { title: "Execution & Analytics", status: "Implemented" as PublicEvidenceStatus, items: ["Schema Validation", "Dimension Profile", "Diagnostic Summary", "Regression Evidence"] },
  ],
  researchEvolution: [
    ["T2A Evaluation", "建立受控生成、Blinded Listening 与 Bad Case 分析基础。"],
    ["Acoustic Diagnostics", "将确定性声学测量加入人工听感证据。"],
    ["Audio-Visual Evaluation", "把评测对象扩展到跨模态事件与时间关系。"],
    ["Point–Line–Scene", "以 Point、Line、Scene 组织细粒度诊断。"],
    ["Reference-aware Diagnosis", "显式区分 Prompt→Visual 与 Visual→Audio 参考关系。"],
    ["Execution Layer", "将记录、校验、聚合和诊断摘要结构化。"],
  ],
  signalGroups: [
    { id: "Technical", items: ["Sample Rate", "Bit Depth", "DC Offset", "Clipping", "Boundary Integrity", "Silence / Abnormal Level"] },
    { id: "Spectral", items: ["Spectral Centroid", "Frequency-band Energy", "Perceptual Weighting"] },
    { id: "Spatial", items: ["L/R Energy", "Channel Correlation", "Short-time Spatial Change"] },
    { id: "Dynamics", items: ["Integrated LUFS", "Crest Factor", "True Peak"] },
  ],
  systemStatuses: [
    { label: "PLS Human Evaluation", status: "Implemented" as PublicEvidenceStatus },
    { label: "Execution Layer v0.1", status: "Implemented" as PublicEvidenceStatus },
    { label: "Signal Diagnostics batch analysis", status: "Implemented" as PublicEvidenceStatus },
    { label: "Signal → PLS record connection", status: "Integrated Concept" as PublicEvidenceStatus },
    { label: "Multi-evaluator QA", status: "Future Extension" as PublicEvidenceStatus },
  ],
  fusionExamples: [
    {
      title: "Technical-quality review",
      status: "Integrated Concept" as PublicEvidenceStatus,
      human: "听到持续咔哒或瞬态 artifact。",
      signal: "Clipping、Peak 或短时瞬态 Flag。",
      interpretation: "信号测量支持技术质量复核。",
      boundary: "不据此判断生成器内部根因，也不自动修改 OVL。",
    },
    {
      title: "Spatial review",
      status: "Integrated Concept" as PublicEvidenceStatus,
      human: "听感中的立体声宽度或空间变化有限。",
      signal: "较高 Channel Correlation 或短时空间变化不足。",
      interpretation: "Signal Evidence 为人工空间复核提供辅助证据。",
      boundary: "不由相关度自动生成 S2 分数。",
    },
  ],
  lifecycle: ["Requirement", "Capability Definition", "Draft Rubric", "Pilot", "Calibration", "Formal Evaluation", "QA Feedback", "Revision", "Regression"],
  lifecycleEvidence: {
    executed: ["Capability Definition", "Rubric Design", "Blind Evaluation", "Hidden Repeat", "Controlled Regression"],
    future: ["Multi-evaluator Calibration", "Gold Samples", "Sampling QA", "Adjudication"],
  },
  publicBoundary:
    "Signal Diagnostics 提供输出信号层面的辅助证据；PLS Capability 与 OVL 仍由人工评测完成。当前系统用于诊断性评测与方法验证，不代表全自动模型质量判定系统。",
} as const;


import { auditRecordHref, currentReportHref, t2aRelease } from "../../app/data/t2aRelease";

export const siteCopy = {
  role: "AI音视频生成评测",
  globalStatement:
    "从广播剧到游戏音频，再到音视频生成评测，我一直在做一件事：把看到和听到的结果拆开来看——质量好不好、内容对不对、错在哪里——再把判断转成可复查的记录与下一步验证方向。",
  heroCopy: {
    eyebrow: "AUDIO-VISUAL GENERATION EVALUATION",
    title: "杜明",
    subtitle: "AI音视频生成评测",
    body: "我用两轮诊断性评测拆分 Prompt→Visual 与 Visual→Audio 的失败链路，把 Bad Case 转成 Controlled Regression，并给出研发排查优先级。",
    metrics: [
      { value: "2", label: "诊断性评测轮次" },
      { value: "3→4→4", label: "重复诊断模式" },
      { value: "5", label: "跨轮冻结结论" },
    ],
    support: "Round-1 Discovery · Round-2 Controlled Regression · 小样本诊断性 PoC",
    primaryCta: "查看音视频生成评测案例",
    secondaryCta: "查看声音实践",
  },
  coreNarratives: [
    {
      id: "quality-and-relevance",
      title: "先把 Prompt→Visual 与 Visual→Audio 拆开",
      body: "Prompt 要求 3 次、Visual 与 Audio 都出现 4 次时，问题首先发生在 Text→Visual；Audio 与实际视觉事件的计数保持一致。",
      tags: ["Text→Visual", "Visual→Audio", "Failure Localization"],
      href: "/t2a-case-study#method",
      linkLabel: "查看诊断方法",
    },
    {
      id: "listening-protocol",
      title: "Round-1 发现问题，Round-2 受控回归",
      body: "在结果出现前定义假设、观察字段与判定规则，再检验 Round-1 中的同类问题是否能够复现，避免事后叙事。",
      note: "受控回归不等于每个案例都是严格单变量统计实验；它的目标是筛选下一步值得扩样的问题。",
      tags: ["Discovery", "Controlled Regression", "Bad Case"],
      href: "/t2a-case-study#rounds",
      linkLabel: "查看两轮设计",
    },
    {
      id: "comparison-and-badcases",
      title: "未复现与混合结果同样有决策价值",
      body: "Onset 与 Cross-shot 结果为 Not Replicated；Dynamic 为 Mixed / Refined；Audio Quality 保留为独立 Quality Gate。",
      note: "不是为了找 Bug 而找 Bug，而是用跨轮证据调整回归优先级与后续测试设计。",
      tags: ["Not Replicated", "Mixed / Refined", "Quality Gate"],
      href: "/t2a-case-study#results",
      linkLabel: "查看冻结结论",
    },
  ],
  projectSummary: {
    title: "Audio-Visual Generation Evaluation",
    body: "一项两轮诊断性音视频生成评测：从 Round-1 Bad Case Discovery 出发，进入 Round-2 Controlled Regression，并完成 Cross-Round Analysis v1.0。",
    scales: ["2 Rounds", "16 Generated Samples", "3 个可精确判定 Exact-count 案例", "5 条冻结结论"],
    finding: "最强证据不是“Audio 多生成一次”，而是 3→4→4 指向 Text→Visual 数量约束偏差，同时保持 Visual→Audio 的事件计数一致。",
    boundary: "这是小样本诊断性 PoC：Repeated Diagnostic Pattern 用于调整研发优先级，不进行统计泛化，也不推断模型内部机制。",
    href: "/t2a-case-study",
    linkLabel: "查看完整案例",
  },
  supportingPractices: {
    title: "评测判断来自实际的声音工作",
    body: "游戏音频、资产验收和运行时问题处理——这些实际工作让我能把抽象的评分标签落回可听、可查的具体问题。",
    cards: [
      {
        title: "游戏音频与运行时诊断",
        body: "包括战斗音效、动态混音、Wwise / FMOD 集成、空间音频和运行时问题定位。",
        href: "/sound-practice",
        linkLabel: "查看游戏音频案例",
      },
      {
        title: "音频交付与质量控制",
        body: "围绕格式、响度、真实峰值、瞬态、循环零交叉和 Click 风险建立验收检查。",
        href: "/audio-validation-summary",
        linkLabel: "查看音频验收案例",
      },
    ],
  },
  auditTrustLine: {
    title: "证据边界",
    status: "Cross-Round Analysis v1.0 · Frozen conclusions",
    body: "项目展示跨轮诊断结论与研发含义；不以小样本结果宣称统计性泛化，不把未复现的结果解释为第一轮观察无效。",
    href: "/t2a-case-study#boundary",
    linkLabel: "查看证据边界",
  },
  aboutCopy: {
    title: "关于杜明",
    body: "声音设计硕士，做过游戏音频制作、交付和运行时问题定位；现在主要做生成式音频的人工听评、Badcase 诊断和评测流程设计。",
  },
  links: { currentReportHref, auditRecordHref },
  evaluation: {
    phase2: {
      models: t2aRelease.phase2.models,
      conclusion: "在当前40条Prompt测试集中，未观察到明确的总体优势方向。置信区间跨越0不等于模型相等，只表示当前样本不足以支持明确的总体差异结论。",
    },
    repeats: {
      pairN: t2aRelease.repeatConsistency.pairN,
      ovl: "38 / 40（95.0%）",
      rel: "39 / 40（97.5%）",
      decision: "34 / 40（85.0%）",
      primary: "27 / 40（67.5%）",
      detail: "主分析使用全部40对；另以评价顺序间隔≥30的34对进行敏感性复核。隐藏重复只说明同一评测人的复测稳定性。",
    },
  },
} as const;

if (siteCopy.coreNarratives.length !== 3) {
  throw new Error("siteCopy.coreNarratives must contain exactly three narratives.");
}

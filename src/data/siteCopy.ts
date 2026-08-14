import { auditRecordHref, currentReportHref, t2aRelease } from "../../app/data/t2aRelease";

export const siteCopy = {
  role: "AI多模态音频评测 T2A",
  globalStatement:
    "从广播剧到游戏音频再到 T2A 评测，我一直在做一件事：把听到的东西拆开来看——质量好不好、内容对不对、错在哪里——然后把这些判断变成可以复查的记录，而不是停留在主观印象里。",
  heroCopy: {
    eyebrow: "AI AUDIO EVALUATION",
    title: "杜明",
    subtitle: "AI音频评测",
    body: "我把音频质量、Prompt符合度和具体错误分开记录，再用统一听评、隐藏重复和Badcase分析来做模型比较。",
    metrics: [
      { value: "600", label: "正式样本 · 两阶段累计" },
      { value: "400", label: "Phase 2受控比较" },
      { value: "40", label: "隐藏重复配对" },
    ],
    support: "2个模型 · 3批生成数据 · 40条核心Prompt · 单评测员",
    primaryCta: "查看T2A评测案例",
    secondaryCta: "查看声音实践",
  },
  coreNarratives: [
    {
      id: "quality-and-relevance",
      title: "先判断声音质量，再判断内容是否正确",
      body: "OVL用于判断音频是否自然、完整和可用；REL用于判断声源、事件、属性、次数和时序是否符合Prompt。两项分开记录，避免一个总分掩盖具体问题。",
      tags: ["OVL整体质量", "REL语义符合度", "事件级Badcase"],
      href: "/t2a-case-study#rubric",
      linkLabel: "查看评分标准",
    },
    {
      id: "listening-protocol",
      title: "把主观听感整理成统一的评测流程",
      body: "我用 Blind ID 隐藏模型和样本信息，按统一的 1–5 分标准完成正式听评，再用隐藏重复检查同一评测人的评分稳不稳定。",
      note: "所有正式评分、复测和 Badcase 裁决都是我自己做的；AI 只帮忙跑脚本、整理数据和做统计。",
      tags: ["Blind listening", "1–5分评分标准", "Hidden repeats"],
      href: "/t2a-case-study#protocol",
      linkLabel: "查看评测流程",
    },
    {
      id: "comparison-and-badcases",
      title: "总体分数之外，还要看模型具体错在哪里",
      body: "Phase 2 让 SAO1 和 Stable Audio 3 Medium 在同一组 Prompt 下做联合盲评。当前测试集没看到明确的总体优势方向，但两个模型错的地方不一样。",
      note: "SA3M更常出现声源或属性错误；SAO1更常出现数量错误和伪影。两者都可能缺少复合事件中的子事件。",
      tags: ["模型比较", "Badcase", "专项复测"],
      href: "/t2a-case-study#badcase",
      linkLabel: "查看模型比较",
    },
  ],
  projectSummary: {
    title: "T2A 音效生成评测",
    body: "第一阶段用 Stable Audio Open 1.0 搭建测试集、评分标准和 Badcase 规则；第二阶段重新生成 SAO1 基线，并与 Stable Audio 3 Medium 做了 400 条正式样本的受控比较。",
    scales: ["2个阶段", "600条正式样本（累计）", "660次试听事件（累计）", "Phase 2 n=400"],
    finding: "在当前40条Prompt测试集中，两模型的OVL与REL没有显示明确的总体优势方向；事件级错误可以用来选模型和设计下一轮专项复测。",
    boundary: "600条与660次均为两阶段累计，不代表统一的三臂实验。正式模型比较只在Phase 2进行；项目由单一评测人完成，隐藏重复仅检查同一评测人的复测稳定性。",
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
    title: "研究版本与复算检查",
    status: `${t2aRelease.researchVersion} · audit ${t2aRelease.auditRevision} · ${t2aRelease.auditValidator} · ${t2aRelease.auditVerdict}`,
    body: "复算检查补了隐藏重复配对、统计重算和文件完整性核对；没改人工评分、Badcase标签或裁决。",
    href: auditRecordHref,
    linkLabel: "查看审计说明",
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

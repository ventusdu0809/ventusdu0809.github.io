import { auditRecordHref, currentReportHref, t2aRelease } from "../../app/data/t2aRelease";

export const siteCopy = {
  role: "AI音频与音视频生成评测",
  globalStatement:
    "从声音制作到 T2A 主观听评，再到音视频生成的两轮诊断性评测，我持续把听感与声画判断拆成可观察、可复查的问题，帮助定位失败发生在哪一层。",
  heroCopy: {
    eyebrow: "AI AUDIO + AUDIO-VISUAL EVALUATION",
    title: "杜明",
    subtitle: "AI音频 / 音视频生成评测",
    body: "从 Text-to-Audio 主观听评到 Audio-Visual Generation 两轮诊断性评测，我把听感与声画判断拆成可复查证据，用于定位问题、验证是否复现并制定下一轮评测优先级。",
    metrics: [
      { value: "600", label: "T2A正式样本 · 两阶段累计" },
      { value: "2 Rounds", label: "T2VA诊断评测" },
      { value: "3 Cases", label: "3→4→4重复诊断模式" },
    ],
    support: "T2A规模化听评基础 · T2VA跨轮失败定位 · PLS评测方法",
    primaryCta: "查看T2VA主项目",
    primaryHref: "/audio-visual-evaluation",
    secondaryCta: "查看声音实践",
  },
  coreNarratives: [
    {
      id: "diagnostic-dimensions",
      title: "把整体听感拆成独立诊断维度",
      body: "按 Point → Line → Scene + Quality 分别检查单个事件、事件关系、整体场景与音频质量，避免一个总分掩盖失败发生的位置。",
      tags: ["Point / Line / Scene", "Quality Gate", "Failure Localization"],
      href: "/point-line-scene-framework",
      linkLabel: "查看PLS评测方法",
    },
    {
      id: "reviewable-evaluation",
      title: "让主观评测可以复查",
      body: "我用 Blind ID 隐藏模型和样本信息，按统一的 1–5 分标准完成正式听评，再用隐藏重复检查同一评测人的评分稳不稳定。",
      note: "所有正式评分、复测和 Badcase 裁决都是我自己做的；AI 只帮忙跑脚本、整理数据和做统计。",
      tags: ["Blind Listening", "Hidden Repeat", "Evidence Note"],
      href: "/t2a-case-study#protocol",
      linkLabel: "查看评测流程",
    },
    {
      id: "controlled-regression",
      title: "从 Bad Case 进入受控回归",
      body: "Round-1 用于发现问题；Round-2 在生成前冻结假设、观察字段和判定规则，再按 Repeated、Not Replicated 或 Mixed / Refined 调整研发与评测优先级。",
      note: "未复现不会抹掉 Round-1 的 Bad Case，但会改变下一轮应该优先投入什么。",
      tags: ["Discovery", "Controlled Regression", "Engineering Priority"],
      href: "/audio-visual-evaluation#rounds",
      linkLabel: "查看两轮诊断设计",
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
    title: "项目结果均保留证据边界与冻结版本",
    status: `${t2aRelease.researchVersion} · audit ${t2aRelease.auditRevision} · ${t2aRelease.auditValidator} · ${t2aRelease.auditVerdict}`,
    body: "复算检查补了隐藏重复配对、统计重算和文件完整性核对；没改人工评分、Badcase标签或裁决。",
    href: auditRecordHref,
    linkLabel: "查看审计说明",
    items: [
      {
        name: "T2A Evaluation",
        status: `${t2aRelease.researchVersion} · audit ${t2aRelease.auditRevision} · ${t2aRelease.auditVerdict}`,
        body: "保留人工评分、Bad Case 裁决、隐藏重复复核与复算记录。",
        href: auditRecordHref,
        linkLabel: "查看T2A审计说明",
      },
      {
        name: "Audio-Visual Evaluation",
        status: "Cross-Round Analysis v1.0 · Frozen",
        body: "Round-1、Round-2 与跨轮结论分别冻结；案例证据不写成统计泛化。",
        href: "/audio-visual-evaluation#boundary",
        linkLabel: "查看T2VA证据边界",
      },
    ],
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

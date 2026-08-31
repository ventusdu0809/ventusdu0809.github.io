import { auditRecordHref, currentReportHref, t2aRelease } from "../../app/data/t2aRelease";

export const siteCopy = {
  role: "AI 音频与音视频生成评测",
  globalStatement:
    "从声音制作到 T2A 主观听评，再到音视频生成的两轮诊断性评测，我持续把听感与声画判断拆成可观察、可复查的问题，帮助定位失败发生在哪一层。",
  heroCopy: {
    eyebrow: "AI 音频与音视频生成评测",
    eyebrowEn: "AI AUDIO & AUDIO-VISUAL EVALUATION",
    title: "杜明",
    subtitle: "AI 音频 / 音视频生成评测",
    body: "从文本生成音频（Text-to-Audio, T2A）的主观听评，到音视频生成（Audio-Visual Generation）的两轮诊断评测，我将专业听感与声画判断转化为可复查证据，用于定位失败、验证回归并确定下一步评测优先级。",
    metrics: [
      { value: "600", label: "T2A 正式样本 · 两阶段累计" },
      { value: "2 轮", label: "音视频诊断评测" },
      { value: "3 个案例", label: "重复出现 3→4→4 诊断模式" },
    ],
    support: "T2A规模化听评基础 · 音视频跨轮失败定位 · PLS评测方法",
    primaryCta: "查看音视频生成评测",
    primaryHref: "/audio-visual-evaluation",
    secondaryCta: "查看声音实践",
  },
  coreNarratives: [
    {
      id: "diagnostic-dimensions",
      title: "把整体听感拆成独立诊断维度",
      body: "按点（Point）→ 线（Line）→ 面（Scene）+ 独立质量（Quality）分别检查单个事件、事件关系、整体场景与音频质量，避免一个总分掩盖失败发生的位置。",
      tags: ["点 / 线 / 面", "质量门槛", "失败定位"],
      href: "/point-line-scene-framework",
      linkLabel: "查看PLS评测方法",
    },
    {
      id: "reviewable-evaluation",
      title: "让主观评测可以复查",
      body: "我用盲测编号（Blind ID）隐藏模型和样本信息，按统一的 1–5 分标准完成正式听评，并通过隐藏重复（Hidden Repeat）评估单评测员的复测一致性。",
      note: "工作边界：正式评分、复测与失败案例（Bad Case）裁决由本人完成；AI 用于脚本辅助、数据整理与统计计算，最终结果由本人复核。",
      tags: ["盲听", "隐藏重复", "证据说明"],
      href: "/t2a-case-study#protocol",
      linkLabel: "查看评测流程",
    },
    {
      id: "controlled-regression",
      title: "从失败案例进入受控回归",
      body: "第一轮用于问题发现（Discovery）；第二轮在生成前冻结假设、观察字段和判定规则，再按重复、未复现或部分成立 / 需细化调整研发与评测优先级。",
      note: "未复现（Not Replicated）不否定原始单例观察，但会降低其作为稳定失效模式的证据强度，并调整后续回归优先级。",
      tags: ["问题发现", "受控回归", "研发优先级"],
      href: "/audio-visual-evaluation#rounds",
      linkLabel: "查看两轮诊断设计",
    },
  ],
  projectSummary: {
    title: "T2A 音效生成评测",
    body: "第一阶段用 Stable Audio Open 1.0 搭建测试集、评分标准和 Bad Case 规则；第二阶段重新生成 SAO1 基线，并与 Stable Audio 3 Medium 做了 400 条正式样本的受控比较。",
    scales: ["2 个阶段", "600 条正式样本（累计）", "660 次试听事件（累计）", "第二阶段 n=400"],
    finding: "在当前 40 条 Prompt 测试集中，两模型的整体质量（Overall Quality, OVL）与文本符合度（Relevance, REL）没有显示明确的总体优势方向；事件级错误可以用来选模型和设计下一轮专项复测。",
    boundary: "600 条正式样本与 660 次试听事件均为两阶段累计，不代表统一的三臂实验。正式模型比较只在第二阶段进行；项目由单一评测人完成，隐藏重复仅检查同一评测人的复测稳定性。",
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
    body: "复算检查补充了隐藏重复配对、统计重算和文件完整性核对；人工评分、Bad Case 标签与裁决保持不变。",
    href: auditRecordHref,
    linkLabel: "查看审计说明",
    items: [
      {
        name: "T2A 音效生成评测",
        status: `${t2aRelease.researchVersion} · audit ${t2aRelease.auditRevision} · ${t2aRelease.auditVerdict}`,
        body: "保留人工评分、Bad Case 裁决、隐藏重复复核与复算记录。",
        href: auditRecordHref,
        linkLabel: "查看T2A审计说明",
      },
      {
        name: "音视频生成诊断评测",
        status: "Cross-Round Analysis v1.0 · Frozen",
        body: "Round-1、Round-2 与跨轮结论分别冻结；案例证据不写成统计泛化。",
        href: "/audio-visual-evaluation#boundary",
        linkLabel: "查看音视频评测证据边界",
      },
    ],
  },
  aboutCopy: {
    title: "关于杜明",
    body: "声音设计硕士，做过游戏音频制作、交付和运行时问题定位；现在主要做生成式音频的人工听评、Bad Case 诊断和评测流程设计。",
  },
  links: { currentReportHref, auditRecordHref },
  evaluation: {
    phase2: {
      models: t2aRelease.phase2.models,
      conclusion: "在当前 40 条 Prompt 测试集中，未观察到明确的总体优势方向。置信区间跨越 0 不等于模型相等，只表示当前样本不足以支持明确的总体差异结论。",
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

import type { Metadata } from "next";
import Link from "next/link";
import "../t2a-case-study/t2a-case-study.css";
import "./point-line-scene-framework.css";
import { evaluationSystemEvidence, publicEvidenceStatusLabels } from "../../src/data/evaluation-system-evidence";

export const metadata: Metadata = {
  title: "PLS-Eval｜Point–Line–Scene 结构化诊断评测",
  description: "PLS-Eval 将生成任务拆成 Point、Line、Scene 三层可验证约束，并保留独立 Quality 轴、显式参考链、原子评价单元与受控回归。",
  keywords: ["PLS-Eval", "Point-Line-Scene", "Failure Localization", "Atomic Evaluation Unit", "Reference-aware Diagnosis", "Judge Audit", "生成式音频评测", "音视频生成评测"],
  alternates: { canonical: "/point-line-scene-framework" },
};

const layers = [
  { id: "POINT", type: "Atomic Constraint", title: "点：局部事实", question: "单个事实是否正确？", items: ["Event", "Source", "Attribute", "Material", "Count"] },
  { id: "LINE", type: "Relational Constraint", title: "线：事实关系", question: "两个或多个事实之间的关系是否正确？", items: ["Temporal", "Spatial", "Causal", "Interactive", "Dynamic / Sync"] },
  { id: "SCENE", type: "Graph-level Constraint", title: "面：整体场景", question: "整个生成世界是否成立？", items: ["Environment", "Hierarchy", "Context", "Salience", "Coherence"] },
  { id: "QUALITY", type: "Orthogonal Quality Axis", title: "独立质量轴", question: "输出本身听起来怎么样？", items: ["Artifact", "Noise", "Clipping", "Loudness", "Spectral / Spatial Quality"] },
] as const;

const taxonomy = [
  ["POINT", ["P1 事件完整性", "P2 声源正确性", "P3 材质 / 属性一致性", "P4 事件计数"]],
  ["LINE", ["L1 起点对齐", "L2 时间顺序", "L3 持续时间 / 重叠", "L4 动态对应"]],
  ["SCENE", ["S1 环境匹配", "S2 空间合理性", "S3 注意 / 显著性一致性", "S4 叙事内声音一致性"]],
] as const;

const activeUnits = [
  ["P1", "事件完整性", "ACTIVE"], ["P3", "材质 / 属性一致性", "ACTIVE"], ["P4", "精确计数", "ACTIVE"],
  ["L2", "时间顺序", "ACTIVE"], ["OVL", "独立质量", "ACTIVE"], ["其他能力", "与当前任务无关", "N/A"],
] as const;

const atomicFacts = [
  ["事件是否出现", "Boolean / observed fact"], ["事件次数", "Integer"], ["声画偏移", "Continuous"],
  ["自然度 / OVL", "Ordinal 1–5"], ["候选偏好", "Pairwise · Future"],
] as const;

const p06State = [
  ["P4 事件计数", "5 / 5", "Visual ↔ Audio"], ["L1 起点对齐", "3 / 5", "audio_early"],
  ["Instruction Fidelity", "FAIL", "Prompt → Visual"], ["Cross-modal Correspondence", "PASS", "Visual → Audio"],
  ["OVL", "4 / 5", "Independent Quality"],
] as const;

const evaluatorRouting = [
  ["P1 事件完整性", "主要", "—", "Future", "Human"], ["P3 材质 / 属性", "主要", "辅助", "Future", "Human"],
  ["P4 精确计数", "主要", "—", "Future", "Human"], ["L1 声画起点", "主要", "Future", "Future", "Human"],
  ["Q 伪影 / 削波", "确认", "主要", "—", "Hybrid"], ["S 场景一致性", "主要", "—", "Future", "Human"],
] as const;

const judgeAudit = [
  ["01", "Detection", ["Positive Recall", "Failure Recall", "Balanced Accuracy"]],
  ["02", "Localization", ["Exact Failure Set Match", "Failure Jaccard"]],
  ["03", "Decoupling", ["Dimension Correlation", "Error Correlation", "Pseudo-Decoupling"]],
  ["04", "Reliability", ["Human Agreement", "Domain Stability", "Prompt Stability", "Confidence Calibration"]],
] as const;

const regressionCases = [
  ["Exact-count", "Repeated Diagnostic Pattern", "3 个案例重复出现 3→4→4，提高精确计数与参考链检查的回归优先级。"],
  ["Onset", "Not Replicated", "Round-2 未复现 audio_early，降低其作为稳定失效模式的证据强度。"],
  ["Dynamic", "Mixed / Refined", "边界响应存在，但连续 source-motion 跟随不足，问题被细化而不是简单判为成功或失败。"],
  ["Cross-shot", "Not Replicated", "No-cut 与 Planned-cut 均未复现持续声音中断，不支持一般化的 Cut→Audio Loss 解释。"],
] as const;

const frontierPapers = [
  {
    title: "OmniJudge or OmniBias?", theme: "Schema & Judge Audit", href: "https://arxiv.org/abs/2608.24160",
    findings: ["Balanced / Decoupled", "53 orthogonal binary dimensions", "Failure detection beyond aggregate accuracy"],
    influence: "支持保留原子级、维度级判断，并把 Judge 的失败发现能力与总体准确率分开审计。",
    boundary: "用于启发 PLS 的 Judge Audit；D³-Omni 并未验证当前音视频案例或 PLS Schema。",
  },
  {
    title: "Voice-Agent Judge", theme: "Evaluator Deployment", href: "https://arxiv.org/abs/2608.24314",
    findings: ["Metric-specific reliability", "Configuration sensitivity", "Human oversight"],
    influence: "支持按评价单元路由不同 Evaluator，并逐项验证自动评测可靠性。",
    boundary: "论文场景是电信与零售语音代理，不直接证明生成式音频 Judge 已可部署。",
  },
  {
    title: "RubricRM", theme: "Preference & Reward", href: "https://arxiv.org/abs/2608.26956",
    findings: ["Input-specific rubric", "Dimension weights", "Pairwise preference / reward"],
    influence: "启发在固定能力分类之上研究任务相关的选择与重要性，而不是每次重新发明能力分类。",
    boundary: "图像生成 / 编辑中的研究方向；PLS 尚未实现 Dynamic Importance、Preference 或 Reward。",
  },
] as const;

const literature = [
  ["细粒度拆解", "AudioScape-TTA · AnyAudio-Judge", "评价单位从总体相似度下沉到事件、属性和任务相关 rubric。", "https://arxiv.org/abs/2608.04479"],
  ["关系评价", "Fine-Grained Feedback · MMAG", "事件存在与时间关系应分开检查；混合音频需要同时处理语义与时间控制。", "https://arxiv.org/abs/2607.13408"],
  ["物理约束", "AcoustiTrace", "感知合理性不能替代生成、传播与接收过程中的声学物理一致性。", "https://arxiv.org/abs/2608.02035"],
  ["音视频联合评测", "AVGen-Bench", "单模态评价与粗粒度相似度不足以覆盖跨模态联合正确性。", "https://arxiv.org/abs/2604.08540"],
] as const;

const researchQuestions = [
  ["RQ1", "Point → Line → Scene 是否形成可测量的复杂度梯度？", "NOT TESTED"],
  ["RQ2", "PLS 是否比 holistic-only evaluation 更容易定位模型回归？", "FORMAL COMPARISON NOT TESTED"],
  ["RQ3", "PLS-derived Preference 能否形成有效 Reward Signal？", "FUTURE WORK"],
  ["RQ4", "显式参考链能否降低音视频评测中的错误归因？", "CASE-MOTIVATED"],
] as const;

const references = [
  ["Wang, J. et al. (2026)", "AudioScape-TTA", "https://arxiv.org/abs/2608.04479"],
  ["Li, H. et al. (2026)", "AnyAudio-Judge", "https://arxiv.org/abs/2606.03116"],
  ["Kuan, C.-Y. et al. (2026)", "Fine-Grained Feedback for TTA", "https://arxiv.org/abs/2607.13408"],
  ["Zheng, Z. et al. (2026)", "MMAG", "https://arxiv.org/abs/2608.06900"],
  ["Li, S. et al. (2026)", "AcoustiTrace", "https://arxiv.org/abs/2608.02035"],
  ["Zhou, Z. et al. (2026)", "AVGen-Bench", "https://arxiv.org/abs/2604.08540"],
  ["Desbos, M. et al. (2026)", "Production-Oriented SFX Evaluation", "https://arxiv.org/abs/2607.09973"],
  ["Yu, F. et al. (2026)", "AudioRubrics", "https://arxiv.org/abs/2608.02831"],
  ["Park, J. et al. (2026)", "LALM Judge Audit", "https://arxiv.org/abs/2607.13477"],
  ["Hu, G. et al. (2026)", "OmniJudge or OmniBias? D³-Omni", "https://arxiv.org/abs/2608.24160"],
  ["Purwar, A. et al. (2026)", "Benchmarking LLM Judges for Voice-Agent Evaluation", "https://arxiv.org/abs/2608.24314"],
  ["Kan, Z. et al. (2026)", "RubricRM", "https://arxiv.org/abs/2608.26956"],
] as const;

export default function PointLineSceneFrameworkPage() {
  return (
    <main className="t2a-page pls-page pls-eval-page">
      <header className="t2a-topbar">
        <Link className="wordmark" href="/" aria-label="返回作品集首页"><span className="wordmark-mark" aria-hidden="true" /><span>DU MING / AUDIO</span></Link>
        <nav aria-label="PLS-Eval 页面导航"><Link className="topbar-mobile-only" href="/">首页</Link><a className="topbar-mobile-only" href="#framework">框架</a><a className="topbar-mobile-only" href="#case-study">案例</a><a className="topbar-desktop-only" href="#framework">框架</a><a className="topbar-desktop-only" href="#schema">Schema</a><a className="topbar-desktop-only" href="#case-study">3→4→4</a><a className="topbar-desktop-only" href="#routing">Routing</a><a className="topbar-desktop-only" href="#boundary">边界</a><a className="topbar-desktop-only" href="#research-details">文献</a></nav>
      </header>

      <section className="pls-hero t2a-shell pls-eval-hero">
        <div className="pls-hero-index"><p className="eyebrow">PLS-EVAL</p><span>点 / POINT</span><span>线 / LINE</span><span>面 / SCENE</span></div>
        <div className="pls-hero-copy"><p className="pls-kicker">Point–Line–Scene Structured Diagnostic Evaluation</p><h1>先定位失败原因，<br />再讨论整体多少分</h1><p className="pls-eval-subtitle">从原子约束、关系约束到场景一致性的结构化诊断评测框架；独立质量（Quality）单独记录。</p><blockquote>PLS 不从“整体多少分”开始，而从“哪一项要求在哪里失败”开始。</blockquote><div className="pls-hero-actions"><a className="btn btn-primary" href="#framework">查看框架</a><Link className="paper-link" href="/point-line-scene-framework/report/">阅读完整报告</Link></div></div>
      </section>

      <section className="t2a-section t2a-shell" id="framework">
        <header className="t2a-section-heading"><p>01 / WHAT IS PLS-EVAL</p><h2>Point、Line、Scene 与 Quality 分别回答不同问题</h2><p>PLS-Eval 将生成要求拆成不同粒度的可验证约束。主要输出不是新的总分，而是每个评价单元保留下来的证据。</p></header>
        <div className="pls-eval-layer-grid">{layers.map((layer) => <article key={layer.id}><span>{layer.id}</span><small>{layer.type}</small><h3>{layer.title}</h3><ul>{layer.items.map((item) => <li key={item}>{item}</li>)}</ul><p>{layer.question}</p></article>)}</div>
        <div className="pls-primary-output"><div><span>PRIMARY OUTPUT</span><strong>Unit-level State / Score Vector</strong></div><b>→</b><div><span>DERIVED VIEW</span><strong>Point / Line / Scene reporting</strong></div><p>聚合用于报告；单元级记录用于失败定位。Layer score 不反向覆盖 Capability、Facts 或 Bad Case。</p></div>
      </section>

      <section className="t2a-section t2a-section-tint" id="schema"><div className="t2a-shell">
        <header className="t2a-section-heading"><p>02 / STABLE TAXONOMY × PROMPT-SPECIFIC SCHEMA</p><h2>能力分类保持稳定，适用评价单元随任务变化</h2><p>PLS 使用封闭、已冻结的 P1–P4、L1–L4、S1–S4；每条任务只激活与当前要求有关的单元，其余明确记为 N/A。</p></header>
        <div className="pls-taxonomy-schema"><article><span>STABLE CAPABILITY TAXONOMY</span><div>{taxonomy.map(([group, items]) => <section key={group}><h3>{group}</h3><ul>{items.map((item) => <li key={item}>{item}</li>)}</ul></section>)}</div></article><b aria-hidden="true">×</b><article><span>PROMPT-SPECIFIC ACTIVE SCHEMA</span><blockquote>“金属杯被敲三次，随后滑过木桌。”</blockquote><dl>{activeUnits.map(([id, label, status]) => <div key={id}><dt><code>{id}</code> {label}</dt><dd className={status === "ACTIVE" ? "is-active" : "is-na"}>{status}</dd></div>)}</dl></article></div>
        <p className="pls-method-principle">Ontology stays stable; applicable evaluation units change with the task.</p>
      </div></section>

      <section className="t2a-section t2a-shell" id="atomic-units">
        <header className="t2a-section-heading"><p>03 / ATOMIC EVALUATION UNIT</p><h2>One Unit = One Falsifiable Question</h2><p>原子化不要求所有指标使用同一种数据类型，而是要求一个评价单元只对应一个明确、可证伪的问题。</p></header>
        <div className="pls-coupling-compare"><article className="is-coupled"><span>COUPLED RUBRIC</span><h3>事件、材质、次数和顺序是否都正确？</h3><strong>FAIL</strong><p>失败后无法知道具体是哪项要求没有满足。</p></article><article className="is-decoupled"><span>DECOUPLED UNITS</span><dl><div><dt>P1 事件完整性</dt><dd>5</dd></div><div><dt>P3 材质 / 属性</dt><dd>5</dd></div><div className="is-focus"><dt>P4 事件计数</dt><dd>2</dd></div><div><dt>L2 时间顺序</dt><dd>5</dd></div></dl><p>结构示例：低分可以直接回到 P4，不会被其他正确项遮蔽。</p></article></div>
        <div className="pls-data-type-grid">{atomicFacts.map(([unit, type]) => <article key={unit}><strong>{unit}</strong><span>{type}</span></article>)}</div>
      </section>

      <section className="pls-case-band" id="case-study"><div className="t2a-shell">
        <header className="t2a-section-heading"><p>04 / WHY REFERENCE MATTERS</p><h2>3→4→4：正确性取决于比较哪一段参考链</h2><p>P06、P10 与 R2-H1-B 跨两轮重复出现同一条可精确判定的模式。</p></header>
        <div className="pls-reference-case"><div><span>文本要求 / PROMPT</span><strong>3</strong><small>COUNT = 3</small></div><b>→</b><div className="is-fail"><span>画面事实 / VISUAL</span><strong>4</strong><small>Instruction Fidelity · FAIL</small></div><b>→</b><div className="is-pass"><span>音频事实 / AUDIO</span><strong>4</strong><small>Event Correspondence · PASS</small></div></div>
        <p className="pls-reference-warning">如果直接比较 Prompt → Audio，容易把问题误写成 Audio Counting Failure。加入 Visual Fact 后，偏差定位到“文本 → 画面”的指令满足环节。</p><div className="pls-case-links"><Link className="btn btn-primary" href="/audio-visual-evaluation">查看两轮音视频评测</Link><span>Evidence status · Repeated Diagnostic Pattern</span></div>
      </div></section>

      <section className="t2a-section t2a-shell" id="unit-record">
        <header className="t2a-section-heading"><p>05 / UNIT-LEVEL RECORD</p><h2>先保留单元判断，再派生报告视图</h2><p>P06 的记录同时保留 Capability、参考关系、Bad Case 与独立质量；Point / Line 均值只是后续展示。</p></header>
        <div className="pls-unit-record"><div className="pls-state-vector"><span>PRIMARY · P06 STATE VECTOR</span>{p06State.map(([unit, value, note]) => <article key={unit}><strong>{unit}</strong><b className={value === "FAIL" ? "is-fail" : value === "PASS" ? "is-pass" : ""}>{value}</b><small>{note}</small></article>)}</div><b aria-hidden="true">→</b><div className="pls-derived-view"><span>DERIVED REPORTING VIEW</span><article><strong>Point</strong><b>5.00</b></article><article><strong>Line</strong><b>4.00</b></article><article><strong>OVL</strong><b>4 / 5</b></article><p>均值不能删除 <code>audio_early</code>，也不能改变 Prompt→Visual FAIL。</p></div></div>
        <aside className="pls-judgment-note"><div><span>JUDGMENT</span><strong>3 / 5 = 部分满足</strong></div><div><span>VALIDITY</span><strong>证据是否足以评价</strong></div><div><span>CONFIDENCE</span><strong>Future field · 尚未写入 v1.0</strong></div><p>判断分数、证据有效性与判断把握不是同一变量；本模块只做概念区分，不修改已冻结的 PLS Evaluation Schema v1.0。</p></aside>
        <div className="pls-quality-proof"><div><span>RELATION CORRECTNESS</span><strong>H2 · Point 5.00 / Line 5.00</strong></div><b>≠</b><div><span>PERCEPTUAL QUALITY</span><strong>OVL 3 · loudness_imbalance</strong></div><p>关系判断成立，输出质量仍可较低，因此 Quality 保持独立。</p></div>
      </section>

      <section className="t2a-section t2a-section-tint" id="routing"><div className="t2a-shell">
        <header className="t2a-section-heading"><p>06 / EVALUATION STACK & ROUTING</p><h2>不同评价单元可以交给不同证据来源</h2><p>当前系统由人工判断、信号诊断和结构化执行组成。Judge 只作为待验证路由，不写成已实现能力。</p></header>
        <div className="pls-stack-flow">{["Requirement", "Stable Capability Taxonomy", "Prompt-specific Schema", "Atomic Evaluation Units", "Evidence Collection", "Evaluator Routing", "Unit-level Record", "Failure Localization", "Controlled Regression"].map((item, index) => <div key={item}>{index > 0 && <i>↓</i>}<strong>{item}</strong></div>)}</div>
        <div className="table-wrap pls-routing-table"><table><thead><tr><th>Evaluation Unit</th><th>Human</th><th>Signal / Tool</th><th>Model Judge</th><th>Current Route</th></tr></thead><tbody>{evaluatorRouting.map((row) => <tr key={row[0]}>{row.map((cell, index) => index === 0 ? <th scope="row" key={cell}>{cell}</th> : <td key={`${row[0]}-${cell}-${index}`}>{cell}</td>)}</tr>)}</tbody></table></div>
        <p className="pls-routing-boundary"><strong>Current：</strong>Human + Signal + Execution。<strong>Future Validation：</strong>Audio / Omni Judge。没有经过逐单元可靠性验证的 Judge，不进入正式评分链路。</p>
      </div></section>

      <section className="t2a-section t2a-shell" id="judge-audit">
        <header className="t2a-section-heading"><p>07 / JUDGE AUDIT · FUTURE VALIDATION</p><h2>Aggregate Accuracy is not sufficient.</h2><p>自动 Judge 即使总体准确率较高，也可能更擅长确认正确项，而不擅长发现失败项。PLS 的未来审计将 Detection、Localization、Decoupling 与 Reliability 分开。</p></header>
        <div className="pls-judge-audit">{judgeAudit.map(([index, title, metrics]) => <article key={title}><span>{index}</span><h3>{title}</h3><ul>{metrics.map((metric) => <li key={metric}>{metric}</li>)}</ul><strong>NOT IMPLEMENTED</strong></article>)}</div>
        <div className="pls-localization-example"><span>LOCALIZATION EXAMPLE</span><div><p>Ground truth failure</p><code>{`{ P3, L2 }`}</code></div><b>↔</b><div><p>Judge failure set</p><code>{`{ P3, L2 }`}</code></div><strong>Exact Localization · PASS</strong></div>
      </section>

      <section className="t2a-section t2a-section-tint" id="regression"><div className="t2a-shell">
        <header className="t2a-section-heading"><p>08 / CONTROLLED REGRESSION</p><h2>发现失败以后，下一轮检查它是否重现</h2><p>第一轮发现问题；第二轮在生成前冻结假设、观察字段和判定规则，再更新证据强度与排查优先级。</p></header>
        <div className="pls-regression-summary">{regressionCases.map(([probe, status, detail]) => <article key={probe}><span>{probe}</span><h3>{status}</h3><p>{detail}</p></article>)}</div>
      </div></section>

      <section className="t2a-section t2a-shell" id="future-alignment">
        <header className="t2a-section-heading"><p>09 / RESEARCH FRONTIER & FUTURE ALIGNMENT</p><h2>固定能力分类之上，再研究 Judge、Preference 与 Reward</h2><p>三篇新工作解释了 PLS-Eval 为什么需要保留单元判断、按单元路由 Evaluator，并谨慎进入偏好与奖励研究。</p></header>
        <div className="pls-frontier-papers">{frontierPapers.map((paper) => <article key={paper.title}><span>{paper.theme}</span><h3>{paper.title}</h3><ul>{paper.findings.map((item) => <li key={item}>{item}</li>)}</ul><p><strong>对 PLS 的影响：</strong>{paper.influence}</p><small>{paper.boundary}</small><a href={paper.href} target="_blank" rel="noreferrer">阅读论文 ↗</a></article>)}</div>
        <div className="pls-horizon-grid"><article><span>CURRENT</span><ul><li>Fixed Taxonomy</li><li>Prompt-specific Applicability</li><li>Human Evaluation</li><li>Structured Unit Data</li><li>Controlled Regression</li></ul></article><article><span>NEXT</span><ul><li>Multi-evaluator Calibration</li><li>Judge Reliability Benchmark</li><li>Failure Localization Benchmark</li></ul></article><article><span>FUTURE</span><ul><li>Dynamic Importance</li><li>Pairwise Preference</li><li>PLS-derived Reward</li></ul><strong>Research direction, not implemented claim.</strong></article></div>
      </section>

      <section className="t2a-section t2a-section-tint" id="boundary"><div className="t2a-shell">
        <header className="t2a-section-heading"><p>10 / CURRENT EVIDENCE & LIMITATIONS</p><h2>哪些已经做过，哪些仍是研究方向</h2></header>
        <div className="pls-boundary-grid"><article><strong>10 + 6</strong><h3>两轮单次生成</h3><p>Round-1 10 个、Round-2 6 个；没有 multi-seed statistical experiment，不做总体性能泛化。</p></article><article><strong>IMPLEMENTED</strong><h3>PLS Schema + Execution Layer</h3><p>12 项 Capability、真实案例迁移、维度派生与结构化摘要已实现。</p></article><article><strong>LIMITED</strong><h3>Scene 与评测者证据</h3><p>Scene 案例有限；项目由单评测员完成，未测试 inter-rater reliability。</p></article><article><strong>FUTURE</strong><h3>Judge / Preference / Reward</h3><p>仅形成研究设计与路由框架，尚未完成正式验证。</p></article></div>
      </div></section>

      <section className="t2a-section t2a-shell" id="research-details">
        <header className="t2a-section-heading"><p>11 / RESEARCH DETAILS</p><h2>完整文献依据与研究材料</h2><p>默认页面先回答框架、Schema、案例和证据边界；文献脉络与完整引用在这里展开。</p></header>
        <details className="pls-landing-details"><summary>展开 Literature Landscape</summary><div className="pls-research-landscape">{literature.map(([theme, papers, evidence, href]) => <article key={theme}><span>{theme}</span><h3>{papers}</h3><p>{evidence}</p><a href={href} target="_blank" rel="noreferrer">查看代表论文 ↗</a></article>)}</div></details>
        <details className="pls-landing-details"><summary>展开 Signal Diagnostics 已执行指标</summary><div className="pls-signal-detail"><div className="pls-system-status">{evaluationSystemEvidence.systemStatuses.map((item) => <article key={item.label}><span>{publicEvidenceStatusLabels[item.status]}</span><strong>{item.label}</strong></article>)}</div><div className="pls-signal-groups">{evaluationSystemEvidence.signalGroups.map((group) => <article key={group.id}><span>{group.id}</span><ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul></article>)}</div><div className="pls-signal-evidence-block"><header><p className="eyebrow">BATCH ANALYSIS / SIGNAL EVIDENCE</p><h3>{evaluationSystemEvidence.acousticBatch.label}</h3><p>Generated N={evaluationSystemEvidence.acousticBatch.n} · Source: {evaluationSystemEvidence.acousticBatch.source}</p></header><div>{evaluationSystemEvidence.acousticBatch.metrics.map((metric) => <article key={metric.id}><span>{metric.statistic}</span><strong>{metric.value}{metric.unit ? ` ${metric.unit}` : ""}</strong><p>{metric.label}</p></article>)}</div></div><p className="pls-system-boundary">{evaluationSystemEvidence.publicBoundary}</p></div></details>
        <details className="pls-landing-details"><summary>展开 Research Questions</summary><div className="pls-rq-list">{researchQuestions.map(([id, question, status]) => <article key={id}><span>{id}</span><h3>{question}</h3><strong>{status}</strong></article>)}</div></details>
        <details className="pls-landing-details"><summary>展开 12 条参考文献</summary><ol className="pls-reference-list">{references.map(([authors, title, href]) => <li key={href}><span>{authors}</span><a href={href} target="_blank" rel="noreferrer">{title}</a><small>arXiv ↗</small></li>)}</ol></details>
        <div className="pls-report-link"><div><span>WORKING PAPER</span><h3>Point–Line–Scene 完整研究报告</h3><p>保留 Capability Taxonomy、Schema、真实迁移记录、研究限制与附录。</p><Link className="paper-link" href="/audio-world-framework">阅读早期研究笔记</Link></div><Link className="btn btn-primary" href="/point-line-scene-framework/report/">阅读完整报告</Link></div>
      </section>

      <footer className="t2a-footer t2a-shell"><Link href="/">← 返回作品集</Link><Link href="/t2a-case-study">T2A 评测</Link><Link href="/audio-visual-evaluation">音视频生成评测</Link><Link href="/point-line-scene-framework/report/">完整报告</Link><span>© 2026 杜明</span></footer>
    </main>
  );
}

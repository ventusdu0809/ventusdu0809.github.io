import type { Metadata } from "next";
import Link from "next/link";
import "../../t2a-case-study/t2a-case-study.css";
import "./report.css";

export const metadata: Metadata = {
  title: "Point–Line–Scene｜生成式音频与音视频模型分层诊断评测框架｜杜明",
  description: "Point–Line–Scene 完整研究报告：从细粒度音频评测、Capability Taxonomy 与 Evaluation Schema，到 Audio-Visual Generation 案例、Reference-aware Diagnosis、Controlled Regression 与 Execution Layer。",
  alternates: { canonical: "/point-line-scene-framework/report/" },
  openGraph: { title: "Point–Line–Scene｜生成式音频与音视频模型分层诊断评测框架", description: "从细粒度能力分解到显式参考链诊断与可执行评测。", type: "article", images: [] },
  twitter: { card: "summary", title: "Point–Line–Scene｜生成式音频与音视频模型分层诊断评测框架", description: "从细粒度能力分解到显式参考链诊断与可执行评测。", images: [] },
};

const toc = [
  ["introduction", "1. 引言"], ["related-work", "2. 相关工作"], ["method", "3. PLS 方法框架"],
  ["taxonomy-schema", "4. Taxonomy 与 Schema"], ["case-study", "5. 音视频案例研究"], ["reference-aware", "6. 显式参考链诊断"],
  ["execution-layer", "7. Execution Layer v0.1"], ["results", "8. 结果与诊断发现"], ["discussion", "9. 讨论"],
  ["limitations", "10. 研究范围与限制"], ["future-work", "11. 后续研究"], ["conclusion", "12. 结论"],
  ["references", "参考文献"], ["appendix-a", "附录 A · Taxonomy"], ["appendix-b", "附录 B · 记录"],
] as const;

const capabilities = [
  ["P1", "事件完整性（Event Completeness）", "核心视觉事件是否获得相应音频事件", "missing_audio_event"],
  ["P2", "声源正确性（Source Correctness）", "声音是否来自正确类型的声源", "wrong_source"],
  ["P3", "材质 / 属性一致性（Material / Attribute Consistency）", "声学材质与关键属性是否支持视觉对象和动作", "wrong_material"],
  ["P4", "事件计数（Event Counting）", "Audio count 是否与有效 Visual count 对应", "N_prompt / N_visual / N_audio"],
  ["L1", "起点对齐（Onset Alignment）", "音频起点是否与视觉事件基本同步", "audio_early"],
  ["L2", "时间顺序（Temporal Order）", "声音事件顺序是否与画面一致", "wrong_temporal_order"],
  ["L3", "持续时间 / 重叠关系（Duration / Overlap）", "持续时间以及重叠、分离关系是否正确", "audio_duration_short"],
  ["L4", "动态对应（Dynamic Correspondence）", "声音是否随运动或状态变化形成动态响应", "static_audio_motion"],
  ["S1", "环境匹配（Environment Match）", "整体声音环境是否匹配场景条件", "—"],
  ["S2", "空间合理性（Spatial Plausibility）", "位置、距离与空间关系是否可信", "—"],
  ["S3", "注意 / 显著性一致性（Attention / Salience Consistency）", "听觉显著性是否匹配视觉重要程度", "—"],
  ["S4", "叙事内声音一致性（Diegetic Consistency）", "声音能否由当前视觉世界合理解释", "—"],
] as const;

const caseRows = [
  ["R1 P06", "P4 / L1", "3 → 4 → 4；P4=5；L1=3", "Repeated Diagnostic Pattern；audio_early"],
  ["R1 P10", "P4 / L3", "3 → 4 → 4；P4=5；Validity=PARTIAL", "Exact-count PASS；audio_duration_short"],
  ["R2 H2", "P1 / P3 / L1 / L2", "Point=5.00；Line=5.00；OVL=3", "Onset Not Replicated；loudness_imbalance"],
  ["R2 H3", "P2 / L3 / L4 / S1", "P2=5；L3=5；L4=3；S1=5", "Dynamic Mixed / Refined；static_audio_motion"],
] as const;

const findings = [
  ["Exact-count", "Repeated Diagnostic Pattern", "P06、P10 与 R2-H1-B 均出现 3→4→4。Prompt→Visual 失败，Visual→Audio 计数一致，P4=5。"],
  ["Onset Alignment", "Not Replicated", "Round-1 的 audio_early 在 Round-2 H2 中未复现。"],
  ["Dynamic Correspondence", "Mixed / Refined", "边界响应出现，连续 source-motion tracking 仍不充分。"],
  ["Cross-shot Continuity", "Not Replicated", "No-cut 与 Planned-cut 条件均未复现持续声音中断。"],
  ["Audio Quality", "Persistent / Exploratory Concern", "响度失衡与伪影提示质量轴仍需独立检查。"],
] as const;

const references = [
  ["1", "Wang, J., et al.", "AudioScape-TTA: A Structured Soundscape Benchmark for Fine-Grained Text-to-Audio Evaluation", "arXiv:2608.04479, 2026", "https://arxiv.org/abs/2608.04479"],
  ["2", "Li, H., et al.", "AnyAudio-Judge: A Dynamic Rubric-Based Benchmark and Evaluator for Audio Instruction Following", "arXiv:2606.03116, 2026", "https://arxiv.org/abs/2606.03116"],
  ["3", "Kuan, C.-Y., et al.", "Improving Text-to-Audio Instruction Following via Fine-Grained Feedback from Audio-Aware Large Language Models", "Interspeech 2026; arXiv:2607.13408", "https://arxiv.org/abs/2607.13408"],
  ["4", "Zheng, Z., et al.", "MMAG: A Multi-Control Mixed Audio Generation Benchmark", "arXiv:2608.06900, 2026", "https://arxiv.org/abs/2608.06900"],
  ["5", "Li, S., et al.", "AcoustiTrace: When Plausible Sound Violates Physics", "arXiv:2608.02035, 2026", "https://arxiv.org/abs/2608.02035"],
  ["6", "Zhou, Z., et al.", "AVGen-Bench: A Task-Driven Benchmark for Multi-Granular Evaluation of Text-to-Audio-Video Generation", "arXiv:2604.08540, 2026", "https://arxiv.org/abs/2604.08540"],
  ["7", "Desbos, M., et al.", "A Production-Oriented Framework for Evaluation of SFX Generation", "DAFx26; arXiv:2607.09973", "https://arxiv.org/abs/2607.09973"],
  ["8", "Manakul, P., et al.", "AudioJudge: Understanding What Works in Large Audio Model Based Speech Evaluation", "EACL 2026, pp. 3644–3663", "https://aclanthology.org/2026.eacl-long.168/"],
  ["9", "Park, J., et al.", "Auditing Protocol-Level Shortcuts in Large Audio Language Model Judges for Speech Evaluation", "arXiv:2607.13477, 2026", "https://arxiv.org/abs/2607.13477"],
  ["10", "Yu, F., et al.", "Reinforcement Learning with Evolving Rubrics as Rewards for Audio Reasoning", "arXiv:2608.02831, 2026", "https://arxiv.org/abs/2608.02831"],
  ["11", "Elizalde, B., et al.", "CLAP: Learning Audio Concepts From Natural Language Supervision", "arXiv:2206.04769, 2022", "https://arxiv.org/abs/2206.04769"],
  ["12", "Kilgour, K., et al.", "Fréchet Audio Distance: A Metric for Evaluating Music Enhancement Algorithms", "arXiv:1812.08466, 2019", "https://arxiv.org/abs/1812.08466"],
  ["13", "ITU-T", "P.800.1: Mean Opinion Score (MOS) Terminology", "Recommendation P.800.1, 2016", "https://www.itu.int/rec/T-REC-P.800.1"],
] as const;

function Cite({ children }: { children: React.ReactNode }) { return <span className="paper-cite">[{children}]</span>; }
function TableWrap({ children }: { children: React.ReactNode }) { return <div className="paper-table-wrap">{children}</div>; }

export default function PointLineSceneReportPage() {
  return (
    <main className="pls-paper-page">
      <header className="paper-utility"><Link href="/point-line-scene-framework/">← 返回 PLS 研究页</Link><span>WORKING PAPER · 2026.08</span></header>
      <div className="paper-layout">
        <aside className="paper-toc" aria-label="论文目录"><p>目录 / CONTENTS</p><nav>{toc.map(([id, title]) => <a key={id} href={`#${id}`}>{title}</a>)}</nav></aside>
        <details className="paper-mobile-toc">
          <summary>目录 / Contents</summary>
          <nav>{toc.map(([id, title]) => <a key={id} href={`#${id}`}>{title}</a>)}</nav>
        </details>
        <article className="paper-sheet">
          <header className="paper-header">
            <p className="paper-type">WORKING PAPER · METHODS &amp; CASE STUDY</p>
            <h1>Point–Line–Scene：面向生成式音频与音视频模型的分层诊断评测框架</h1>
            <p className="paper-title-en">Point–Line–Scene: A Hierarchical Diagnostic Evaluation Framework for Generative Audio and Audio-Visual Models</p>
            <p className="paper-subtitle">从细粒度能力分解到显式参考链诊断与可执行评测</p>
            <dl className="paper-meta"><div><dt>作者</dt><dd>杜明</dd></div><div><dt>研究方向</dt><dd>AI 音频与音视频生成评测 · 2026.08</dd></div></dl>
          </header>
          <section className="paper-abstract" aria-labelledby="abstract-title">
            <h2 id="abstract-title">摘要 <span>ABSTRACT</span></h2>
            <p>生成式音频与音视频模型常以整体相似度或总体质量概括表现，但单一结果难以回答事件是否缺失、关系何处失配以及错误发生在哪一条跨模态链路。本文提出 Point–Line–Scene（PLS）分层诊断框架，将评价对象组织为原子正确性、关系正确性与整体场景一致性，并保留独立的感知质量轴。在此基础上，本文固定 P1–P4、L1–L4、S1–S4 共 12 项能力，建立 PLS Evaluation Schema v1.0，将可观察事实、能力评分、维度画像、有效性、诊断门与 OVL 连接为结构化记录。两轮 Audio-Visual Generation Evaluation 由 Round-1 问题发现进入 Round-2 受控回归，形成 Exact-count、Onset、Dynamic、Cross-shot 与 Audio Quality 的跨轮证据状态。P06、P10 与 R2-H1-B 的 3→4→4 模式进一步促成显式参考链诊断（Reference-aware Diagnosis），将 Prompt↔Visual 与 Visual↔Audio 分开判断。Execution Layer v0.1 已支持 Schema 校验、Dimension Profile 派生、轻量一致性检查与人可读诊断摘要。当前结果基于诊断性案例研究，尚不用于模型总体性能估计。</p>
            <p className="paper-keywords"><strong>关键词：</strong>生成式音频评测；音视频生成；细粒度评测；失败定位；显式参考链诊断；受控回归</p>
          </section>
          <section id="introduction"><h2><span>1</span> 引言 <small>INTRODUCTION</small></h2>
            <p>生成式音频评测正在从整体听感与语义相似度，转向事件、属性、时间关系和可验证指令的细粒度检查 <Cite>1–4</Cite>。在音视频生成中，评价对象还跨越文本要求、视觉事实与音频输出；若省略其中一层，最终不一致可能被归到错误的模型能力。</p>
            <p>本文研究如何用一套紧凑、可执行的结构组织不同粒度的评价对象，使结果既保留专业判断空间，又能服务于失败定位、受控回归与研发优先级。PLS 由三层评价对象与一个独立质量轴构成，并通过能力分类（Capability Taxonomy）、评测结构（Evaluation Schema）和执行层（Execution Layer）进入实际评测流程。</p>
            <div className="paper-scope"><strong>研究范围</strong><p>本文将近期生成式音频与音视频评测中的细粒度评价对象组织为 Point–Line–Scene，并通过两轮诊断性 Audio-Visual Generation Evaluation 检查部分方法假设。当前结果用于方法设计与案例级诊断，不用于模型总体性能估计。</p></div>
          </section>
          <section id="related-work"><h2><span>2</span> 相关工作 <small>RELATED WORK</small></h2>
            <h3>2.1 细粒度生成式音频评测</h3><p>AudioScape-TTA 与 AnyAudio-Judge 将复杂请求拆为事件实现、声学属性或独立可验证 rubric，推动评价单位从全局相似度下沉到可检查事实 <Cite>1, 2</Cite>。CLAP 与 FAD 分别代表语义表征和分布距离的常用路线 <Cite>11, 12</Cite>；它们提供总体信号，但不能独立承担案例级失败归因。</p>
            <h3>2.2 时间与多事件关系评测</h3><p>Fine-Grained Feedback 将 Event Presence 与 Temporal Relation 分开处理，MMAG 则在混合音频任务中同时关注语义、说话人、事件与时间控制 <Cite>3, 4</Cite>。这些工作支持将事件存在与事件关系拆开记录。</p>
            <h3>2.3 音视频联合评测</h3><p>AVGen-Bench 以任务驱动、多粒度评价覆盖文本到音视频生成的联合正确性 <Cite>6</Cite>。AcoustiTrace 从声音生成、传播环境与接收过程检查物理一致性 <Cite>5</Cite>。</p>
            <h3>2.4 制作可用性与 Judge Reliability</h3><p>Production-Oriented SFX Evaluation 将可编辑性、瞬态完整性及时间/能量对齐纳入制作语境 <Cite>7</Cite>。AudioJudge 讨论多维语音评价及 Judge 偏差 <Cite>8</Cite>；协议级 shortcut audit 提示未来自动 Judge 还需确认判断确实依赖音频证据 <Cite>9</Cite>。</p>
          </section>
          <section id="method"><h2><span>3</span> Point–Line–Scene 方法框架 <small>METHOD</small></h2>
            <figure className="paper-figure"><div className="figure-pls"><div><b>POINT</b><span>事件 / 声源 / 材质 / 数量</span></div><i>→</i><div><b>LINE</b><span>起点 / 顺序 / 持续 / 动态</span></div><i>→</i><div><b>SCENE</b><span>环境 / 空间 / 显著性 / 叙事内一致性</span></div></div><figcaption>图 1. Point–Line–Scene 分层评价结构。</figcaption></figure>
            <h3>3.1 Point：原子正确性</h3><p>Point 检查单个事件及其直接属性，包括事件完整性、声源、材质与数量。评价需要先确定 Reference；P4 以可观察的 Visual count 与 Audio count 为能力判断关系。</p>
            <h3>3.2 Line：关系正确性</h3><p>Line 检查多个事件或同一事件跨时间状态的关系，包括起点、顺序、持续/重叠与动态对应，并保留“主要关系成立但存在明显问题”的中间状态。</p>
            <h3>3.3 Scene：整体场景一致性</h3><p>Scene 检查环境、空间、显著性与叙事内声音能否共同形成可信声景。Scene 是整体关系的组织结果。</p>
            <h3>3.4 Quality 与跨层评价轴</h3><p>PLS 回答“哪里出了问题”，OVL 回答“最终听起来怎么样”。两者分别记录；MOS 术语采用 ITU-T P.800.1 的标准语境 <Cite>13</Cite>。</p>
          </section>
          <section id="taxonomy-schema"><h2><span>4</span> 能力分类与评测结构 <small>CAPABILITY TAXONOMY · EVALUATION SCHEMA</small></h2>
            <h3>4.1 固定的 12 项 Capability</h3><p>能力分类由 P1–P4、L1–L4、S1–S4 组成。每条记录显式填写 12 项能力，适用项记为 SCORED，不适用项记为 N/A，视觉事实无法可靠判断时使用 UNEVALUABLE。</p>
            <TableWrap><table className="capability-table"><colgroup><col /><col /><col /></colgroup><thead><tr><th>ID</th><th>能力</th><th>核心评测问题</th></tr></thead><tbody>{capabilities.map(([id, name, question]) => <tr key={id}><td><code>{id}</code></td><td>{name}</td><td>{question}</td></tr>)}</tbody></table></TableWrap><p className="table-caption">表 1. PLS 能力分类（Capability Taxonomy）。</p>
            <h3>4.2 评分语言</h3><p>1–5 分锚点描述目标关系的满足程度：5 表示完整满足，3 保留“主要关系成立但存在明显问题”的诊断空间。N/A 表示能力不适用；UNEVALUABLE 表示所需证据不足。</p>
            <h3>4.3 PLS Evaluation Schema v1.0</h3><figure className="paper-figure"><div className="figure-flow"><b>Facts</b><i>→</i><b>Capability</b><i>→</i><b>Dimension Profile</b><i>→</i><b>Validity / Gate</b><i>→</i><b>OVL</b><i>→</i><b>Diagnosis</b></div><figcaption>图 2. PLS Evaluation Schema v1.0 数据流。</figcaption></figure>
            <p>维度画像（Dimension Profile）由适用能力自动派生，输出 Point mean+n、Line mean+n 与 Scene mean+n，不生成 PLS Total Score。有效性（Validity）使用 VALID、PARTIAL、CONFOUNDED、UNEVALUABLE；诊断门（Diagnostic Gate）记录 Primary Probe、Instruction Fidelity 与 Cross-modal Correspondence。能力项下的 <code>bad_cases</code> 是 Bad Case 的正式来源。</p>
          </section>
          <section id="case-study"><h2><span>5</span> Audio-Visual Generation Evaluation 案例研究</h2>
            <h3>5.1 Round-1 Problem Discovery</h3><p>Round-1 包含 10 个单次生成样本，用于发现问题并记录可观察事实、能力分数与 Bad Case。单条异常先作为案例证据保留。</p>
            <h3>5.2 Round-2 Controlled Regression</h3><p>Round-2 依据 Round-1 的问题预先冻结主要能力、观察字段与判定规则，再用 6 个新样本检查是否复现。H4 将非预期 camera cut 从混杂因素转为 No-cut 与 Planned-cut 条件。</p>
            <h3>5.3 Cross-Round Analysis</h3><p>跨轮状态采用 Repeated Diagnostic Pattern、Not Replicated、Mixed / Refined 与 Persistent / Exploratory Concern。结果出来前定义观察项与判定规则，是 Controlled Regression 区别于重新生成样本的关键。</p>
          </section>
          <section id="reference-aware"><h2><span>6</span> 显式参考链诊断 <small>REFERENCE-AWARE DIAGNOSIS</small></h2>
            <figure className="paper-figure paper-figure-primary"><div className="figure-reference"><div><small>原始要求</small><b>Prompt Requirement</b></div><i><span>Instruction Fidelity</span>→</i><div><small>视觉事实</small><b>Visual Fact</b></div><i><span>Cross-modal Correspondence</span>→</i><div><small>音频观察</small><b>Audio Observation</b></div></div><figcaption>图 3. 显式参考链诊断（Reference-aware Diagnosis）。</figcaption></figure>
            <h3>6.1 Prompt → Visual → Audio</h3><p>显式参考链将 Text→Visual Instruction Fidelity 与 Visual→Audio Cross-modal Correspondence 分开判断。它描述评价关系，不涉及模型内部生成架构。</p>
            <h3>6.2 Exact-count 3→4→4</h3><p>P06、P10 与 R2-H1-B 均满足 <code>N_prompt=3</code>、<code>N_visual=4</code>、<code>N_audio=4</code>。因此 Instruction Fidelity=FAIL，Cross-modal Correspondence=PASS，P4=5。</p>
            <h3>6.3 Failure Attribution</h3><p>若只比较 Prompt 与 Audio，3≠4 容易被标记为 Audio Counting Failure。加入 Visual Fact 后，数量偏差被定位到 Prompt→Visual，Visual→Audio 的事件计数保持一致。</p>
          </section>
          <section id="execution-layer"><h2><span>7</span> 执行层（Execution Layer）v0.1</h2>
            <p>人工评测负责事实判定、能力评分与 Bad Case 归因；执行层负责 Schema 校验、Dimension Profile 派生、轻量一致性检查与诊断摘要生成。程序不替代评测员的专业判断。</p>
            <figure className="paper-figure"><div className="figure-execution"><div><b>人工评测</b><span>Facts · Scores · Bad Cases</span></div><i>→</i><div><b>Schema 校验</b><span>Schema · Required Fields</span></div><i>→</i><div><b>维度聚合</b><span>Point · Line · Scene</span></div><i>→</i><div><b>诊断输出</b><span>Summary · Case Profile</span></div></div><figcaption>图 4. 人机协同的执行层工作流。</figcaption></figure>
            <h3>7.1–7.3 Human-in-the-loop、校验与聚合</h3><p>完整记录进入 Draft 2020-12 Schema 校验，12 项 Capability 必须显式存在。聚合只计算 SCORED 项的平均值与有效样本数 n，并由能力分数派生 Dimension Profile。</p>
            <h3>7.4–7.5 诊断摘要与案例画像</h3><p>执行层输出人可读摘要、Capability Breakdown、参考链判断和案例集合画像。四个迁移诊断案例得到 Point=5.00（n=10）、Line=4.25（n=8）、Scene=5.00（n=4），用于检查 Schema 与 Execution Layer 的聚合和展示流程，不作为模型整体能力估计。</p>
          </section>
          <section id="results"><h2><span>8</span> 结果与诊断发现 <small>RESULTS</small></h2>
            <TableWrap><table><thead><tr><th>Case</th><th>Primary capability</th><th>结构化结果</th><th>诊断</th></tr></thead><tbody>{caseRows.map((row) => <tr key={row[0]}>{row.map((cell) => <td key={cell}>{cell}</td>)}</tr>)}</tbody></table></TableWrap><p className="table-caption">表 2. 迁移诊断案例（Migrated Diagnostic Cases）。</p>
            <div className="finding-list">{findings.map(([name, status, detail]) => <article key={name}><span>{name}</span><strong>{status}</strong><p>{detail}</p></article>)}</div>
            <TableWrap><table className="profile-table"><thead><tr><th>Dimension</th><th>Mean</th><th>Valid n</th></tr></thead><tbody><tr><td>Point</td><td>5.00</td><td>10</td></tr><tr><td>Line</td><td>4.25</td><td>8</td></tr><tr><td>Scene</td><td>5.00</td><td>4</td></tr></tbody></table></TableWrap><p className="table-caption">表 3. 执行层示例画像（Execution Demo Profile）。</p>
          </section>
          <section id="discussion"><h2><span>9</span> 讨论 <small>DISCUSSION</small></h2>
            <h3>9.1 Diagnostic-first Aggregation</h3><p>PLS 聚合保留维度均值与有效 n，服务于定位。研究者可以从 Dimension Profile 回到具体 Capability、Facts 与 Bad Case，避免单一总分遮蔽局部失败。</p>
            <h3>9.2 Relation Correctness vs Perceptual Quality</h3><p>H2 的 Point=5.00、Line=5.00 与 OVL=3 表明，关系正确性（Relational Correctness）和感知质量（Perceptual Quality）需要独立记录。</p>
            <h3>9.3 Failure Localization 与模型回归</h3><p>Exact-count 的参考链拆分把研发优先级从“音频计数失败”修正为 Text→Visual 数量约束问题；Not Replicated 与 Mixed / Refined 则区分稳定回归项、条件性问题与待细化现象。</p>
            <h3>9.4 工业评测流程中的应用位置</h3><p>PLS 适合放在人工评测与研发回归之间：评测员给出证据和能力判断，执行层整理结构，研发团队按 Capability 与证据状态安排复现、修复和后续测试。</p>
          </section>
          <section id="limitations"><h2><span>10</span> 研究范围与限制 <small>LIMITATIONS</small></h2><p>当前案例由 Round-1 的 10 个与 Round-2 的 6 个单次生成样本组成，属于小样本诊断性研究；H1-A 因关键视觉事实不清晰记为 UNEVALUABLE，不进入 Exact-count 证据集。Scene 层案例少于 Point 与 Line，项目由单评测员完成，尚未测试 inter-rater reliability。四条迁移记录与 Demo Profile 用于验证记录、聚合与展示流程，不支持模型总体性能估计。</p></section>
          <section id="future-work"><h2><span>11</span> 后续研究 <small>FUTURE WORK</small></h2><p>下一阶段包括扩大 Scene 层与多评测员证据，比较 PLS 与 holistic-only 评价在失败定位上的差异；将制作可用性指标接入人类评测流程 <Cite>7</Cite>；探索细粒度 rubric 与 preference/reward 的连接 <Cite>2, 3, 10</Cite>。自动 Judge 若进入流程，还需用 Audio Removal / Mismatch、A/B Swap、Metadata Conflict 与 Rephrasing Stability 等 probe 检查证据依赖 <Cite>8, 9</Cite>。</p></section>
          <section id="conclusion"><h2><span>12</span> 结论 <small>CONCLUSION</small></h2><p>本文将生成式音频与音视频评测中的细粒度对象组织为 Point–Line–Scene + Quality，并以固定的 12 项 Capability、Evaluation Schema v1.0 与 Execution Layer v0.1 形成从人工判断到结构化诊断的完整链路。两轮案例研究显示，显式参考链可以改变 Exact-count 的错误归因；跨轮状态可以区分重复模式、未复现、待细化问题与持续质量关注。PLS 的当前价值在于提供可复查的能力语言和研发回归入口。</p></section>
          <section id="references" className="paper-references"><h2>参考文献 <small>REFERENCES</small></h2><ol>{references.map(([id, authors, title, venue, href]) => <li id={`ref-${id}`} key={id}>[{id}] {authors} <a href={href} target="_blank" rel="noreferrer">{title}</a>. {venue}.</li>)}</ol></section>
          <section id="appendix-a" className="paper-appendix"><h2>附录 A <small>CAPABILITY TAXONOMY</small></h2><p>以下为评测记录中的固定能力与典型 Bad Case。定义、核心问题和评分语言不随单个案例改变。</p><TableWrap><table><thead><tr><th>ID</th><th>中文名称（English）</th><th>典型 Bad Case / 记录</th></tr></thead><tbody>{capabilities.map(([id, name, , badCase]) => <tr key={id}><td><code>{id}</code></td><td>{name}</td><td><code>{badCase}</code></td></tr>)}</tbody></table></TableWrap></section>
          <section id="appendix-b" className="paper-appendix"><h2>附录 B <small>REPRESENTATIVE EVALUATION RECORDS</small></h2><div className="record-list">
            <article><h3>R1 P06 <small>REFERENCE-AWARE</small></h3><dl><div><dt>事实</dt><dd><code>Prompt=3 · Visual=4 · Audio=4</code></dd></div><div><dt>能力</dt><dd>P4=5；L1=3</dd></div><div><dt>诊断</dt><dd>Instruction Fidelity=FAIL；Visual→Audio=PASS；<code>audio_early</code></dd></div></dl></article>
            <article><h3>R2 H2 <small>QUALITY INDEPENDENCE</small></h3><dl><div><dt>画像</dt><dd><code>Point=5.00 · Line=5.00 · OVL=3</code></dd></div><div><dt>发现</dt><dd>关系判断成立，音频存在 <code>loudness_imbalance</code></dd></div></dl></article>
            <article><h3>R2 H3 <small>PARTIAL CAPABILITY</small></h3><dl><div><dt>能力</dt><dd><code>P2=5 · L3=5 · L4=3 · S1=5</code></dd></div><div><dt>发现</dt><dd>Boundary Response=Present；Source-motion Tracking=Insufficiently Continuous；<code>static_audio_motion</code></dd></div></dl></article>
            <article><h3>R1 P10 <small>PARTIAL VALIDITY</small></h3><dl><div><dt>能力</dt><dd><code>P4=5 · Validity=PARTIAL</code></dd></div><div><dt>诊断</dt><dd>Visual→Audio exact-count=PASS；L3 记录 <code>audio_duration_short</code>；camera cut 限制原因解释</dd></div></dl></article>
          </div></section>
        </article>
      </div>
      <footer className="paper-footer"><Link href="/point-line-scene-framework/">← 返回 PLS 研究页</Link><span>杜明 · Point–Line–Scene · 2026</span></footer>
    </main>
  );
}

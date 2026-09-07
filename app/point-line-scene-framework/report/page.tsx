import type { Metadata } from "next";
import Link from "next/link";
import "../../t2a-case-study/t2a-case-study.css";
import "./report.css";

export const metadata: Metadata = {
  title: "PLS-Eval v2.1｜生成式音频与音视频结构化诊断评测｜杜明",
  description: "PLS-Eval v2.1 完整研究报告：稳定能力坐标、按任务激活的原子评价单元、依赖感知的评价资格、诊断向量与失败定位。",
  alternates: { canonical: "/point-line-scene-framework/report/" },
  openGraph: { title: "PLS-Eval v2.1｜生成式音频与音视频结构化诊断评测", description: "从任务要求生成原子评价单元，并用依赖、评价资格和诊断向量定位失败。", type: "article", images: [] },
  twitter: { card: "summary", title: "PLS-Eval v2.1｜生成式音频与音视频结构化诊断评测", description: "从任务要求生成原子评价单元，并用依赖、评价资格和诊断向量定位失败。", images: [] },
};

const toc = [
  ["introduction", "1. 引言"], ["related-work", "2. 相关工作"], ["method", "3. PLS 方法框架"],
  ["taxonomy-schema", "4. Taxonomy 与 Schema"], ["case-study", "5. 音视频案例研究"], ["reference-aware", "6. 显式参考链诊断"],
  ["execution-layer", "7. v2.1 执行约定"], ["evaluation-system", "8. 人工评测与信号诊断"],
  ["results", "9. 结果与诊断发现"], ["discussion", "10. 讨论"],
  ["limitations", "11. 研究范围与限制"], ["future-work", "12. 后续研究"], ["conclusion", "13. 结论"],
  ["references", "参考文献"], ["appendix-a", "附录 A · Taxonomy"], ["appendix-b", "附录 B · v2.1 记录结构"],
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

const findings = [
  ["精确计数（Exact-count）", "重复诊断模式（Repeated Diagnostic Pattern）", "P06、P10 与 R2-H1-B 均出现 3→4→4。文本→画面数量要求失败，画面→音频计数一致。"],
  ["起点对齐（Onset Alignment）", "未复现（Not Replicated）", "第一轮记录的 audio_early 未在第二轮 H2 中复现。"],
  ["动态对应（Dynamic Correspondence）", "部分成立 / 需细化（Mixed / Refined）", "边界状态有响应，但连续的声源运动跟随仍不充分。"],
  ["跨镜头持续性（Cross-shot Continuity）", "未复现（Not Replicated）", "无切镜与计划切镜条件均未复现持续声音中断。"],
  ["音频质量（Audio Quality）", "持续 / 探索性关注（Persistent / Exploratory Concern）", "响度失衡与伪影仍需沿独立质量轴检查。"],
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
      <header className="paper-utility"><Link href="/point-line-scene-framework/">← 返回 PLS 研究页</Link><span>PLS-EVAL v2.1 · WORKING PAPER · 2026.09</span></header>
      <div className="paper-layout">
        <aside className="paper-toc" aria-label="论文目录"><p>目录 / CONTENTS</p><nav>{toc.map(([id, title]) => <a key={id} href={`#${id}`}>{title}</a>)}</nav></aside>
        <details className="paper-mobile-toc">
          <summary>目录 / Contents</summary>
          <nav>{toc.map(([id, title]) => <a key={id} href={`#${id}`}>{title}</a>)}</nav>
        </details>
        <article className="paper-sheet">
          <header className="paper-header">
            <p className="paper-type">PLS-EVAL v2.1 · WORKING PAPER</p>
            <h1>Point–Line–Scene：面向生成式音频与音视频的结构化诊断评测</h1>
            <p className="paper-title-en">Point–Line–Scene: Structured Diagnostic Evaluation for Generative Audio and Audio-Visual Models</p>
            <p className="paper-subtitle">从任务要求生成原子评价单元，再用依赖与状态向量定位失败</p>
            <dl className="paper-meta"><div><dt>作者</dt><dd>杜明</dd></div><div><dt>版本</dt><dd>PLS Schema v2.1 · 2026.09</dd></div></dl>
          </header>
          <section className="paper-abstract" aria-labelledby="abstract-title">
            <h2 id="abstract-title">摘要 <span>ABSTRACT</span></h2>
            <p>生成式音频与音视频评测常用总体质量或相似度概括结果，但这些分数很难指出具体哪项要求失败。PLS-Eval v2.1 保留 P1–P4、L1–L4、S1–S4 作为稳定能力坐标，并根据每条 Prompt 生成相关的原子评价单元。单元本身只检查一个问题；单元之间可以存在依赖。系统先判断单元是否具备评价资格，再记录 PASS、FAIL、BLOCKED、N/A 或 UNEVALUABLE，形成诊断向量（Diagnostic Vector）并定位失败。感知质量继续作为独立轴记录。两轮 Audio-Visual Generation Evaluation 提供案例级证据，其中 3→4→4 模式说明文本→画面和画面→音频必须分开判断。人工评测与信号诊断目前各自保留，通过人工分析对照；两者尚未自动合并为同一判断。现有证据用于方法设计和案例定位，不用于估计模型总体性能。</p>
            <p className="paper-keywords"><strong>关键词：</strong>PLS-Eval；原子评价单元；评价资格；诊断向量；失败定位；显式参考链；受控回归</p>
          </section>
          <section id="introduction"><h2><span>1</span> 引言 <small>INTRODUCTION</small></h2>
            <p>生成式音频评测正在从整体听感与语义相似度，转向事件、属性、时间关系和可验证指令的细粒度检查 <Cite>1–4</Cite>。在音视频生成中，评价对象还跨越文本要求、视觉事实与音频输出；若省略其中一层，最终不一致可能被归到错误的模型能力。</p>
            <p>本文研究如何把任务要求整理成可检查的评价单元，并在前置条件缺失时避免重复判错。PLS 由三个能力层级和一条独立质量轴构成；v2.1 在此基础上加入按任务激活、依赖关系、评价资格和诊断向量。</p>
            <div className="paper-scope"><strong>研究范围</strong><p>本文将近期生成式音频与音视频评测中的细粒度评价对象组织为 Point–Line–Scene，并通过两轮诊断性 Audio-Visual Generation Evaluation 检查部分方法假设。当前结果用于方法设计与案例级诊断，不用于模型总体性能估计。</p></div>
          </section>
          <section id="related-work"><h2><span>2</span> 相关工作 <small>RELATED WORK</small></h2>
            <h3>2.1 细粒度生成式音频评测</h3><p>AudioScape-TTA 与 AnyAudio-Judge 将复杂请求拆为事件实现、声学属性或独立可验证 rubric，推动评价单位从全局相似度下沉到可检查事实 <Cite>1, 2</Cite>。CLAP 与 FAD 分别代表语义表征和分布距离的常用路线 <Cite>11, 12</Cite>；它们提供总体信号，但不能独立承担案例级失败归因。</p>
            <h3>2.2 时间与多事件关系评测</h3><p>Fine-Grained Feedback 将 Event Presence 与 Temporal Relation 分开处理，MMAG 则在混合音频任务中同时关注语义、说话人、事件与时间控制 <Cite>3, 4</Cite>。这些工作支持将事件存在与事件关系拆开记录。</p>
            <h3>2.3 音视频联合评测</h3><p>AVGen-Bench 以任务驱动、多粒度评价覆盖文本到音视频生成的联合正确性 <Cite>6</Cite>。AcoustiTrace 从声音生成、传播环境与接收过程检查物理一致性 <Cite>5</Cite>。</p>
            <h3>2.4 制作可用性与 Judge Reliability</h3><p>Production-Oriented SFX Evaluation 将可编辑性、瞬态完整性及时间/能量对齐纳入制作语境 <Cite>7</Cite>。AudioJudge 讨论多维语音评价及 Judge 偏差 <Cite>8</Cite>；协议级 shortcut audit 提示未来自动 Judge 还需确认判断确实依赖音频证据 <Cite>9</Cite>。</p>
          </section>
          <section id="method"><h2><span>3</span> Point–Line–Scene 方法框架 <small>METHOD</small></h2>
            <figure className="paper-figure"><div className="figure-pls"><div><b>点 / POINT</b><span>事件 / 声源 / 材质 / 数量</span></div><i>→</i><div><b>线 / LINE</b><span>起点 / 顺序 / 持续 / 动态</span></div><i>→</i><div><b>面 / SCENE</b><span>环境 / 空间 / 显著性 / 叙事内一致性</span></div></div><figcaption>图 1. 点—线—面（Point–Line–Scene）分层评价结构。</figcaption></figure>
            <h3>3.1 Point：局部事实</h3><p>Point 检查单个事件及其直接属性，包括事件完整性、声源、材质与数量。评价前需要明确 Reference；P4 比较可观察的 Visual count 与 Audio count，Prompt 数量另用于判断文本→画面的指令满足情况。</p>
            <h3>3.2 Line：事实关系</h3><p>Line 检查多个事件或同一事件跨时间状态的关系，包括起点、顺序、持续 / 重叠与动态对应。每个单元只判断一项关系。</p>
            <h3>3.3 Scene：整体场景一致性</h3><p>Scene 检查环境、空间、显著性与叙事内声音能否共同形成可信声景。Scene 是整体关系的组织结果。</p>
            <h3>3.4 Quality 与跨层评价轴</h3><p>PLS 回答“哪里出了问题”，OVL 回答“最终听起来怎么样”。两者分别记录；MOS 术语采用 ITU-T P.800.1 的标准语境 <Cite>13</Cite>。</p>
          </section>
          <section id="taxonomy-schema"><h2><span>4</span> PLS Schema v2.1 <small>STABLE TAXONOMY · PROMPT-SPECIFIC UNITS</small></h2>
            <h3>4.1 稳定能力坐标</h3><p>P1–P4、L1–L4、S1–S4 是稳定的能力分类（Stable Taxonomy），用于说明一个评价单元属于哪个问题域。它们不是要求每条样本都回答的 12 道固定题。具体 Prompt 只激活与当前任务有关的单元。</p>
            <TableWrap><table className="capability-table"><colgroup><col /><col /><col /></colgroup><thead><tr><th>ID</th><th>能力</th><th>核心评测问题</th></tr></thead><tbody>{capabilities.map(([id, name, question]) => <tr key={id}><td><code>{id}</code></td><td>{name}</td><td>{question}</td></tr>)}</tbody></table></TableWrap><p className="table-caption">表 1. PLS 能力分类（Capability Taxonomy）。</p>
            <h3>4.2 按任务生成原子评价单元</h3><p>原子评价单元（Atomic Diagnostic Unit）只检查一个可判断命题。以“敲击三次，随后让木质物体滑动”为例，当前任务可以激活“敲击存在”“敲击次数为 3”“滑动存在”“材质为木质”和“敲击先于滑动”。未被任务要求激活的能力记为 N/A，不需要为填满 12 项而制造问题。</p>
            <div className="paper-scope"><strong>Atomic ≠ Independent</strong><p>评价命题需要原子化，但不必彼此独立。“次数为 3”依赖“敲击存在”；“材质为木质”依赖“滑动事件存在”。依赖关系决定能否评价，不改变能力分类本身。</p></div>
            <h3>4.3 依赖感知的评价资格</h3><figure className="paper-figure"><div className="figure-dependency"><div><b>敲击存在</b><small>P1 · 前置单元</small></div><i>→</i><div><b>敲击次数为 3</b><small>P4 · 依赖前置事实</small></div><div><b>滑动存在</b><small>P1 · 前置单元</small></div><i>→</i><div><b>材质为木质</b><small>P3 · 依赖前置事实</small></div></div><figcaption>图 2. 原子单元可以存在依赖；前置事实缺失时，下游单元不重复记为 FAIL。</figcaption></figure>
            <div className="paper-state-grid"><article><strong>PASS</strong><p>具备评价资格，目标关系成立。</p></article><article><strong>FAIL</strong><p>具备评价资格，但目标关系不成立。</p></article><article><strong>BLOCKED</strong><p>前置单元失败，当前单元无法独立判断。</p></article><article><strong>N/A</strong><p>Prompt 没有激活该能力。</p></article><article><strong>UNEVALUABLE</strong><p>任务相关，但证据不足或事实不可可靠观察。</p></article></div>
            <h3>4.4 v2.1 数据流</h3><figure className="paper-figure"><div className="figure-flow figure-flow-v21"><b>任务要求</b><i>→</i><b>稳定能力坐标</b><i>→</i><b>激活单元</b><i>→</i><b>依赖图</b><i>→</i><b>评价资格</b><i>→</i><b>判断向量</b><i>→</i><b>失败位置</b><i>→</i><b>回归 / 案例分析</b></div><figcaption>图 3. PLS Schema v2.1 从 Prompt 生成诊断向量，不以三维平均分作为主要输出。</figcaption></figure>
            <p>诊断向量（Diagnostic Vector）保留每个激活单元的状态、Reference、可观察证据和 Bad Case。Quality / OVL 独立记录，不进入 P→L→S 的层级链，也不反向覆盖单元判断。</p>
            <h3>4.5 版本演进</h3><div className="paper-version-flow"><article><span>v1.0</span><p>固定能力记录<br />1–5 分能力评分<br />Dimension Profile</p></article><i>→</i><article><span>v2.x</span><p>显式参考链<br />拆分 Text→Visual 与 Visual→Audio</p></article><i>→</i><article><span>v2.1</span><p>按任务激活原子单元<br />依赖感知的评价资格<br />结构化状态与失败定位</p></article></div><p>v1.0 记录了早期结构化尝试。真实案例暴露出参考链、依赖和重复归因问题后，方法才演进为 v2.1。本报告不再把旧版均值视为当前框架的结果。</p>
          </section>
          <section id="case-study"><h2><span>5</span> Audio-Visual Generation Evaluation 案例研究</h2>
            <h3>5.1 Round-1 Problem Discovery</h3><p>Round-1 包含 10 个单次生成样本，用于发现问题并记录可观察事实、能力判断与 Bad Case。单条异常先作为案例证据保留。</p>
            <h3>5.2 Round-2 Controlled Regression</h3><p>Round-2 依据 Round-1 的问题预先冻结主要能力、观察字段与判定规则，再用 6 个新样本检查是否复现。H4 将非预期 camera cut 从混杂因素转为 No-cut 与 Planned-cut 条件。</p>
            <h3>5.3 Cross-Round Analysis</h3><p>跨轮状态采用 Repeated Diagnostic Pattern、Not Replicated、Mixed / Refined 与 Persistent / Exploratory Concern。结果出来前定义观察项与判定规则，是 Controlled Regression 区别于重新生成样本的关键。</p>
          </section>
          <section id="reference-aware"><h2><span>6</span> 显式参考链诊断 <small>REFERENCE-AWARE DIAGNOSIS</small></h2>
            <figure className="paper-figure paper-figure-primary"><div className="figure-reference"><div><small>原始要求</small><b>Prompt Requirement</b></div><i><span>Instruction Fidelity</span>→</i><div><small>视觉事实</small><b>Visual Fact</b></div><i><span>Cross-modal Correspondence</span>→</i><div><small>音频观察</small><b>Audio Observation</b></div></div><figcaption>图 4. 显式参考链诊断（Reference-aware Diagnosis）。</figcaption></figure>
            <h3>6.1 Prompt → Visual → Audio</h3><p>显式参考链将 Text→Visual Instruction Fidelity 与 Visual→Audio Cross-modal Correspondence 分开判断。它描述评价关系，不涉及模型内部生成架构。</p>
            <h3>6.2 Exact-count 3→4→4</h3><p>P06、P10 与 R2-H1-B 均满足 <code>N_prompt=3</code>、<code>N_visual=4</code>、<code>N_audio=4</code>。用 v2.1 状态语言表达：Instruction Fidelity=FAIL，P4 所检查的 Visual→Audio Event Counting=PASS。</p>
            <h3>6.3 Failure Attribution</h3><p>若只比较 Prompt 与 Audio，3≠4 容易被标记为 Audio Counting Failure。加入 Visual Fact 后，数量偏差被定位到 Prompt→Visual，Visual→Audio 的事件计数保持一致。</p>
          </section>
          <section id="execution-layer"><h2><span>7</span> v2.1 执行约定与实现边界 <small>EXECUTION CONTRACT</small></h2>
            <p>人工评测负责确认事实、判断原子命题和记录 Bad Case。执行层负责检查激活单元、依赖关系与评价资格，再整理诊断向量和人可读摘要。程序不替代评测员判断。</p>
            <figure className="paper-figure"><div className="figure-execution"><div><b>人工评测</b><span>要求 · 事实 · 判断依据</span></div><i>→</i><div><b>激活与依赖</b><span>Active Units · Dependencies</span></div><i>→</i><div><b>评价资格</b><span>Eligible · Blocked · N/A</span></div><i>→</i><div><b>诊断输出</b><span>Vector · Failure Location</span></div></div><figcaption>图 5. PLS v2.1 的执行约定。</figcaption></figure>
            <h3>7.1 结构校验</h3><p>校验对象从“12 项是否全部填写”改为“任务激活了哪些单元、每个单元是否有能力归属、Reference 和必要的依赖”。未激活的能力不生成空问题。</p>
            <h3>7.2 评价资格解析</h3><p>系统先检查前置单元。前置事实成立，下游单元才进入 PASS / FAIL 判断；前置事实失败时，下游单元记为 BLOCKED；证据本身无法可靠观察时记为 UNEVALUABLE。</p>
            <h3>7.3 输出与当前实现边界</h3><p>v2.1 的主要输出是激活单元、状态向量、失败位置和证据，不是 Point / Line / Scene 平均分。当前 Execution Layer v0.1 已验证结构校验、摘要生成和案例整理流程；Active Units、Dependency 与 Eligibility 的完整自动校验仍需按 v2.1 规范接入。本文不把方法规范写成已经完成的系统功能。</p>
          </section>
          <section id="evaluation-system"><h2><span>8</span> 人在回路的评测系统 <small>HUMAN-IN-THE-LOOP EVALUATION SYSTEM</small></h2>
            <p>PLS 的执行对象不是单一分数，而是一条可以回到具体样本确认的证据链。人工评测负责识别事实、判断原子单元与记录 Bad Case；信号诊断（Signal Diagnostics）从文件、频谱、空间与能量四组测量中提供补充证据。两类证据分别保留，当前通过人工分析进行对照；Signal 不自动生成或修改 PLS / OVL。</p>
            <figure className="paper-figure"><div className="figure-system"><div className="figure-system-input"><b>任务要求</b><i>→</i><b>能力坐标</b><i>→</i><b>激活单元</b></div><div className="figure-system-branches"><div><small>人工评测 · 已执行</small><strong>事实 · PLS · OVL · Bad Case</strong></div><span>+</span><div><small>信号诊断 · 辅助证据</small><strong>文件 · 频谱 · 空间 · 能量</strong></div></div><div className="figure-system-output"><b>分别记录</b><i>→</i><b>人工对照</b><i>→</i><b>问题定位与回归</b></div></div><figcaption>图 6. 人工评测与信号诊断分别保留，当前通过人工分析进行对照。</figcaption></figure>
            <p>信号级测量用于定位异常、选择复听样本和补充诊断证据，不替代 Capability Judgment。尤其是语义是否正确、声画关系是否成立、问题是否构成 Bad Case，仍需由评测员结合任务要求与可观察事实判断。</p>
            <p>当前已有结构化记录、Execution Layer v0.1 与批量声学分析；v2.1 的依赖和评价资格仍是待接入的执行规范。Signal→PLS 的结构化连接尚未实现，多评测员 QA 与更大规模相关性验证也未开展。正式 T2A 样本的 200 条批量声学分析为信号分支提供了数据来源，但本文不据此推导统一阈值或替代主观结论。</p>
          </section>
          <section id="results"><h2><span>9</span> 结果与诊断发现 <small>RESULTS</small></h2>
            <h3>9.1 主要输出：状态向量与失败位置</h3><TableWrap><table><thead><tr><th>评价关系 / 单元</th><th>评价资格</th><th>判断</th><th>可观察依据</th></tr></thead><tbody><tr><td>文本→画面数量要求</td><td>ELIGIBLE</td><td>FAIL</td><td><code>N_prompt=3 · N_visual=4</code></td></tr><tr><td>P4 画面→音频事件计数</td><td>ELIGIBLE</td><td>PASS</td><td><code>N_visual=4 · N_audio=4</code></td></tr></tbody></table></TableWrap><p className="table-caption">表 2. 3→4→4 的 v2.1 诊断表示。失败位置在文本→画面，不是音频计数。</p>
            <h3>9.2 跨轮证据状态</h3>
            <div className="finding-list">{findings.map(([name, status, detail]) => <article key={name}><span>{name}</span><strong>{status}</strong><p>{detail}</p></article>)}</div>
            <h3>9.3 数据集级汇总</h3><p>v2.1 在数据集层按 Capability 汇总 eligible n、PASS n、FAIL n、BLOCKED n 与 UNEVALUABLE n。当前报告不提供这组数字，因为冻结数据尚未按 v2.1 完整重标；旧版 Point / Line / Scene 均值不再作为本报告结果。</p>
          </section>
          <section id="discussion"><h2><span>10</span> 讨论 <small>DISCUSSION</small></h2>
            <h3>10.1 从平均分转向失败位置</h3><p>总体分数可以概括体验，却不能说明应该回看哪个要求。v2.1 先保留单元状态和证据，再按需要做数据集级统计。任何汇总都应能回到具体单元。</p>
            <h3>10.2 依赖关系减少重复归因</h3><p>如果敲击事件没有出现，“敲击次数为 3”就没有独立评价条件。把后者记为 BLOCKED，而不是再记一次 FAIL，可以避免同一个缺失事件被计为多个模型错误。</p>
            <h3>10.3 关系正确不等于感知质量</h3><p>H2 中，事件、材质、起点和顺序关系均成立，但仍记录到 <code>loudness_imbalance</code>。这说明 PLS 判断与 OVL / Quality 需要分别保存。</p>
            <h3>10.4 失败定位与后续回归</h3><p>精确计数的参考链拆分把问题从“音频计数失败”修正为文本→画面的数量要求不一致。未复现和部分成立 / 需细化则决定下一轮是降低优先级，还是继续拆分条件。</p>
          </section>
          <section id="limitations"><h2><span>11</span> 研究范围与限制 <small>LIMITATIONS</small></h2><p>当前证据由 Round-1 的 10 个和 Round-2 的 6 个单次生成样本组成，属于小样本诊断性研究。H1-A 因关键视觉事实不清晰记为 UNEVALUABLE，不进入精确计数证据集。面（Scene）层案例少于点（Point）与线（Line），项目由单评测员完成，尚未测试评测员间一致性。冻结数据尚未按 v2.1 全量重标，因此本报告只展示已有事实可以支持的状态，不给出 v2.1 数据集级通过率。</p></section>
          <section id="future-work"><h2><span>12</span> 后续研究 <small>FUTURE WORK</small></h2><p>下一阶段先把 Active Units、Dependency 与 Eligibility 接入执行层，再开展多评测员标注和更完整的面（Scene）层案例。随后可比较 PLS 与只给总体分的方法在失败定位上的差异，并研究制作可用性指标 <Cite>7</Cite> 以及细粒度 rubric 与 preference / reward 的连接 <Cite>2, 3, 10</Cite>。自动 Judge 若进入流程，还需通过 Audio Removal / Mismatch、A/B Swap、Metadata Conflict 与 Rephrasing Stability 等 probe 检查它是否真正依赖音频证据 <Cite>8, 9</Cite>。</p></section>
          <section id="conclusion"><h2><span>13</span> 结论 <small>CONCLUSION</small></h2><p>PLS-Eval v2.1 把 P1–P4、L1–L4、S1–S4 保留为稳定能力坐标，再按 Prompt 激活原子评价单元。依赖关系先决定评价资格，PASS、FAIL、BLOCKED、N/A 与 UNEVALUABLE 构成诊断向量，主要输出是失败位置和对应证据。两轮案例中的 3→4→4 说明显式参考链会直接改变错误归因；跨轮状态则区分重复模式、未复现、待细化问题和持续质量关注。人工评测与信号诊断当前作为独立证据分支保存，并由人工分析进行对照；结构化连接和自动判断尚未实现。</p></section>
          <section id="references" className="paper-references"><h2>参考文献 <small>REFERENCES</small></h2><ol>{references.map(([id, authors, title, venue, href]) => <li id={`ref-${id}`} key={id}>[{id}] {authors} <a href={href} target="_blank" rel="noreferrer">{title}</a>. {venue}.</li>)}</ol></section>
          <section id="appendix-a" className="paper-appendix"><h2>附录 A <small>CAPABILITY TAXONOMY</small></h2><p>以下 12 项是稳定能力坐标与典型 Bad Case。定义不随单个案例改变；是否激活由 Prompt 决定。</p><TableWrap><table><thead><tr><th>ID</th><th>中文名称（English）</th><th>典型 Bad Case / 记录</th></tr></thead><tbody>{capabilities.map(([id, name, , badCase]) => <tr key={id}><td><code>{id}</code></td><td>{name}</td><td><code>{badCase}</code></td></tr>)}</tbody></table></TableWrap></section>
          <section id="appendix-b" className="paper-appendix"><h2>附录 B <small>PLS SCHEMA v2.1 RECORD</small></h2><div className="record-list">
            <article><h3>任务与事实 <small>REQUIREMENT · FACTS</small></h3><dl><div><dt>任务</dt><dd>保存原始 Prompt 与当前评价对象。</dd></div><div><dt>事实</dt><dd>分别记录可观察的文本要求、视觉事实和音频事实。</dd></div></dl></article>
            <article><h3>激活单元 <small>ACTIVE UNITS</small></h3><dl><div><dt>归属</dt><dd>每个单元绑定一个 Capability ID。</dd></div><div><dt>命题</dt><dd>每个单元只回答一个问题，并声明所用 Reference。</dd></div></dl></article>
            <article><h3>依赖与资格 <small>DEPENDENCY · ELIGIBILITY</small></h3><dl><div><dt>依赖</dt><dd>记录当前单元所需的前置事实或单元。</dd></div><div><dt>资格</dt><dd><code>ELIGIBLE · BLOCKED · N/A · UNEVALUABLE</code></dd></div></dl></article>
            <article><h3>判断与定位 <small>JUDGMENT · LOCALIZATION</small></h3><dl><div><dt>向量</dt><dd>保存各激活单元的 PASS / FAIL 等状态。</dd></div><div><dt>输出</dt><dd>失败位置、对应证据、Bad Case 与独立 Quality / OVL。</dd></div></dl></article>
          </div></section>
        </article>
      </div>
      <footer className="paper-footer"><Link href="/point-line-scene-framework/">← 返回 PLS 研究页</Link><span>杜明 · PLS-Eval v2.1 · 2026</span></footer>
    </main>
  );
}

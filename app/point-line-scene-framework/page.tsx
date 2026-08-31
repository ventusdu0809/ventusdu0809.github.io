import type { Metadata } from "next";
import Link from "next/link";
import "../t2a-case-study/t2a-case-study.css";
import "./point-line-scene-framework.css";
import { evaluationSystemEvidence } from "../../src/data/evaluation-system-evidence";

export const metadata: Metadata = {
  title: "Point–Line–Scene｜从方法框架到可执行评测",
  description:
    "Point–Line–Scene 生成式音频与音视频评测方法：连接人在回路的评测、信号诊断、结构化评测记录、执行层与真实案例。",
  keywords: ["Point-Line-Scene", "生成式音频评测", "音视频生成评测", "human-in-the-loop", "signal diagnostics", "structured evaluation", "Evaluation Schema", "Execution Layer", "Reference-aware Diagnosis"],
  alternates: { canonical: "/point-line-scene-framework" },
};

const trends = [
  "原子级评分标准（Atomic Rubric）",
  "事件 / 属性（Event / Attribute）",
  "时间关系（Temporal Relation）",
  "结构化声景（Structured Soundscape）",
  "声学物理（Acoustic Physics）",
  "偏好 / 奖励（Preference / Reward）",
  "评测模型可靠性（Judge Reliability）",
] as const;

const literature = [
  {
    index: "01",
    theme: "细粒度拆解 / FINE-GRAINED DECOMPOSITION",
    title: "全局相似度不足以支持细粒度失效定位",
    papers: [
      ["[1] AudioScape-TTA · Wang et al., 2026", "https://arxiv.org/abs/2608.04479"],
      ["[2] AnyAudio-Judge · Li et al., 2026", "https://arxiv.org/abs/2606.03116"],
    ],
    evidence: "研究开始把复杂描述拆为事件实现、声学属性、语音内容，或独立且可验证的动态 rubric；评价单位从整体相似度下沉到原子事实。",
    synthesis: "POINT：原子声学正确性（Atomic Acoustic Correctness）",
  },
  {
    index: "02",
    theme: "关系评价 / RELATIONAL EVALUATION",
    title: "事件存在正确性与关系正确性应分离评价",
    papers: [
      ["[3] Fine-Grained Feedback / S3Bench · Kuan et al., 2026", "https://arxiv.org/abs/2607.13408"],
      ["[4] MMAG · Zheng et al., 2026", "https://arxiv.org/abs/2608.06900"],
    ],
    evidence: "Event Presence 与 Temporal Relation 被分开检查；Mixed Audio 还需要同时处理语义、说话人、声音事件与时间控制。",
    synthesis: "LINE：关系正确性（Relational Correctness）",
    boundary: "时间关系有直接文献支撑；将空间、因果、交互与动态统一归入线（Line），属于本框架的方法扩展。",
  },
  {
    index: "03",
    theme: "结构化场景 / STRUCTURED SCENE",
    title: "声景复杂度不能由事件数量单独表征",
    papers: [
      ["[1] AudioScape-TTA · Wang et al., 2026", "https://arxiv.org/abs/2608.04479"],
      ["[4] MMAG · Zheng et al., 2026", "https://arxiv.org/abs/2608.06900"],
    ],
    evidence: "结构化 soundscape 同时处理事件密度、结构复杂度与 Speech / Music / SFX 的组合，而不只保留一条 caption。",
    synthesis: "SCENE：整体声景与场景一致性（Holistic Soundscape / Scene Coherence）",
    boundary: "当前 Audio-Visual 项目对 Scene 的案例证据弱于 Point 与 Line。",
  },
  {
    index: "04",
    theme: "跨层物理约束 / CROSS-LAYER CONSTRAINT",
    title: "感知合理性不能替代声学物理一致性",
    papers: [["[5] AcoustiTrace · Li et al., 2026", "https://arxiv.org/abs/2608.02035"]],
    evidence: "Sound Generation → Propagation Environment → Acoustic Reception 把物理真实性放回可观察的声学过程。",
    synthesis: "物理保真由文献直接支持；感知保真是本文更广的跨层评价抽象。",
  },
  {
    index: "05",
    theme: "音视频扩展 / AUDIO-VISUAL EXTENSION",
    title: "单模态评价不足以覆盖跨模态联合正确性",
    papers: [["[6] AVGen-Bench · Zhou et al., 2026", "https://arxiv.org/abs/2604.08540"]],
    evidence: "单模态评价与粗粒度 embedding similarity，难以覆盖真实 T2AV 中的联合细粒度正确性。",
    synthesis: "Audio PLS → Audio-Visual PLS，并显式追踪跨模态参考链。",
  },
] as const;

const layers = [
  ["POINT", "点（Point）：原子正确性", "事件、声源、材质、属性与数量是否正确。"],
  ["LINE", "线（Line）：关系正确性", "时间、空间、因果、交互与动态对应是否成立。"],
  ["SCENE", "面（Scene）：整体一致性", "环境、前后景、显著性与叙事内声音是否共同成立。"],
] as const;

const executionLayers = [
  ["01", "Framework", "评测框架", "Point → Line → Scene", "组织评价对象。"],
  ["02", "Capability Taxonomy", "能力分类", "P1–P4 / L1–L4 / S1–S4", "定义具体检查什么。"],
  ["03", "Evaluation Schema", "评测结构", "Facts → Capability → Profile", "把判断转成结构化记录。"],
  ["04", "Execution Layer", "执行层", "Validation → Aggregation → Diagnosis", "让结构真正运行。"],
] as const;

const executionSteps = [
  ["01", "Human Evaluation", "人工判断", "评测员记录 Prompt / Visual / Audio Facts，并完成人工 Capability Score 与 Bad Case 判断。", ["Facts", "Capability Score", "Bad Case"]],
  ["02", "Evaluation Schema", "结构化记录", "12 项 Capability、Validity、Diagnostic Gate 与 OVL 被放入统一记录结构。", ["P1–S4", "Validity", "Diagnostic Gate", "OVL"]],
  ["03", "Execution Layer", "自动处理", "程序执行格式校验、Dimension 聚合、轻量一致性检查与诊断摘要整理。", ["Schema Validation", "Aggregation", "Consistency Check", "Summary"]],
  ["04", "Diagnostic Output", "诊断输出", "输出 PLS Profile、Capability Breakdown、参考链诊断与案例集合画像。", ["PLS Profile", "Capability Breakdown", "Reference-aware Diagnosis", "Demo Profile"]],
] as const;

const demoProfile = [
  ["Point", "5.00", "10"],
  ["Line", "4.25", "8"],
  ["Scene", "5.00", "4"],
] as const;

const regressionCases = [
  {
    id: "H2",
    path: ["Round-1: audio_early", "Round-2: aligned", "Not Replicated"],
    meaning: "Round-1 中观察到 audio_early；Round-2 条件下未复现。原始样本中的观察成立，但当前证据不足以将其提升为稳定失效模式。",
  },
  {
    id: "H3",
    path: ["Round-1: Dynamic Response issue", "Boundary response 未复现；source-motion 部分问题", "Mixed / Refined"],
    meaning: "边界状态变化可以产生明显响应，但连续 source motion 的动态对应仍有局部问题，因此将原假设细化为更细粒度的动态对应问题。",
  },
  {
    id: "H4",
    path: ["持续声音中断 + Camera Cut Confound", "No-cut vs Planned-cut 均 continuous", "Not Replicated"],
    meaning: "将非预期 Camera Cut 从混杂因素转为计划实验条件。No-cut 与 Planned-cut 均未复现持续声音中断，当前不支持 Cut→Audio Loss 的一般化解释。",
  },
] as const;

const researchQuestions = [
  ["RQ1", "Point → Line → Scene 是否形成可测量的复杂度梯度？", "NOT TESTED"],
  ["RQ2", "PLS 是否比 holistic-only evaluation 更容易定位模型回归？", "CASE-MOTIVATED · FORMAL COMPARISON NOT TESTED"],
  ["RQ3", "PLS-derived Preference 能否形成有效 Reward Signal？", "FUTURE WORK"],
  ["RQ4", "显式参考链能否降低音视频评测中的错误归因？", "P06 / P10 / R2-H1-B 显示归因结果改变；误归因率尚未测量"],
] as const;

const references = [
  ["Wang, J. et al. (2026)", "AudioScape-TTA: A Structured Soundscape Benchmark for Fine-Grained Text-to-Audio Evaluation", "https://arxiv.org/abs/2608.04479"],
  ["Li, H. et al. (2026)", "AnyAudio-Judge: A Dynamic Rubric-Based Benchmark and Evaluator for Audio Instruction Following", "https://arxiv.org/abs/2606.03116"],
  ["Kuan, C.-Y. et al. (2026)", "Improving Text-to-Audio Instruction Following via Fine-Grained Feedback from Audio-Aware Large Language Models", "https://arxiv.org/abs/2607.13408"],
  ["Zheng, Z. et al. (2026)", "MMAG: A Multi-Control Mixed Audio Generation Benchmark", "https://arxiv.org/abs/2608.06900"],
  ["Li, S. et al. (2026)", "AcoustiTrace: When Plausible Sound Violates Physics", "https://arxiv.org/abs/2608.02035"],
  ["Zhou, Z. et al. (2026)", "AVGen-Bench: A Task-Driven Benchmark for Multi-Granular Evaluation of Text-to-Audio-Video Generation", "https://arxiv.org/abs/2604.08540"],
  ["Desbos, M. et al. (2026)", "A Production-Oriented Framework for Evaluation of SFX Generation", "https://arxiv.org/abs/2607.09973"],
  ["Yu, F. et al. (2026)", "Reinforcement Learning with Evolving Rubrics as Rewards for Audio Reasoning", "https://arxiv.org/abs/2608.02831"],
  ["Park, J. et al. (2026)", "Auditing Protocol-Level Shortcuts in Large Audio Language Model Judges for Speech Evaluation", "https://arxiv.org/abs/2607.13477"],
] as const;

export default function PointLineSceneFrameworkPage() {
  return (
    <main className="t2a-page pls-page">
      <header className="t2a-topbar">
        <Link className="wordmark" href="/" aria-label="返回作品集首页"><span className="wordmark-mark" aria-hidden="true" /><span>DU MING / AUDIO</span></Link>
        <nav aria-label="研究页导航"><Link href="/t2a-case-study">T2A</Link><Link href="/audio-visual-evaluation">音视频评测</Link><a href="#landscape">文献</a><a href="#case-study">案例</a><a href="#execution">执行层</a><a href="#evaluation-system">系统</a><a href="#references">参考文献</a></nav>
      </header>

      <section className="pls-hero t2a-shell">
        <div className="pls-hero-index"><p className="eyebrow">研究 / RESEARCH</p><span>POINT</span><span>LINE</span><span>SCENE</span></div>
        <div className="pls-hero-copy">
          <p className="pls-kicker">点—线—面（Point–Line–Scene）</p>
          <h1>从整体分数<br />到多模态失败定位</h1>
          <p>基于近期生成式音频与音视频评测研究，将事件、关系与整体场景分别组织为点、线、面三个诊断层级，并进一步形成可运行的结构化评测流程。</p>
          <div className="pls-research-route" aria-label="方法路径"><span>问题</span><b>→</b><span>分层诊断</span><b>→</b><span>核心案例</span><b>→</b><span>结构化执行</span></div>
          <div className="pls-hero-actions"><a className="btn btn-primary" href="#framework">查看 PLS 方法</a><Link className="paper-link" href="/point-line-scene-framework/report/">阅读完整报告</Link></div>
        </div>
      </section>

      <section className="pls-positioning">
        <div className="t2a-shell pls-positioning-grid">
          <div><p className="eyebrow">研究定位 / POSITIONING</p><h2>方法综合 · 诊断案例研究<br />· 可执行评测</h2></div>
          <div><p>PLS 是我对现有细粒度评测对象的一种组织方式，用于帮助定位点、线、面三个层级的失败；它不是用于替代已有 Benchmark、Metric 或行业评测协议的独立理论。</p><strong>方法综合 · 诊断案例研究 · 可执行评测</strong></div>
        </div>
      </section>

      <section className="t2a-section t2a-shell" id="question">
        <header className="t2a-section-heading"><p>01 / 为什么需要细粒度诊断</p><h2>整体分数不能回答失败发生在哪里</h2><p>生成式音频与音视频评测需要进一步检查事件、属性、时间关系、结构化声景、物理一致性与评测模型可靠性等可验证对象。</p></header>
        <div className="pls-trend-strip">{trends.map((trend, index) => <span key={trend}><i>{String(index + 1).padStart(2, "0")}</i>{trend}</span>)}</div>
        <div className="pls-gap">
          <div><span>研究观察 / RESEARCH GAP</span><p>在本文覆盖的代表性工作中，这些评价对象主要分散在不同 Benchmark、任务与协议中。本文进一步尝试将它们组织为统一的诊断层级。</p></div>
          <div><span>核心问题 / RESEARCH QUESTION</span><h3>这些细粒度评价对象能否被组织为一套支持失败定位的统一层级结构？</h3></div>
          <strong>方法综合 / METHOD SYNTHESIS · 点 → 线 → 面</strong>
        </div>
      </section>

      <section className="t2a-section t2a-section-tint" id="landscape">
        <div className="t2a-shell">
          <header className="t2a-section-heading"><p>02 / 文献依据 / LITERATURE</p><h2>文献证据与方法综合</h2><p>完整文献综述保留在报告中；这里默认折叠详细证据，降低作品集页面的阅读负担。</p></header>
          <details className="pls-landing-details"><summary>展开文献依据与五组研究观察</summary><div className="pls-landscape">{literature.map((item) => (
            <article key={item.index}>
              <div className="pls-landscape-label"><span>{item.index}</span><small>{item.theme}</small></div>
              <div className="pls-landscape-body"><h3>{item.title}</h3><div className="pls-citations">{item.papers.map(([name, href]) => <a key={name} href={href} target="_blank" rel="noreferrer">{name} ↗</a>)}</div><p>{item.evidence}</p>{"boundary" in item && <small className="pls-inline-boundary">边界：{item.boundary}</small>}</div>
              <div className="pls-landscape-result"><span>方法综合 / SYNTHESIS</span><strong>{item.synthesis}</strong></div>
            </article>
          ))}</div></details>
        </div>
      </section>

      <section className="t2a-section t2a-shell" id="framework">
        <header className="t2a-section-heading"><p>03 / PLS 方法</p><h2>点、线、面分别回答不同问题</h2><p>PLS 将分散的评价对象组织为统一的失败定位结构，独立质量（Quality）继续单独记录。</p></header>
        <div className="pls-synthesis-map">
          <div className="pls-signal-column"><span>文献观察 / LITERATURE</span><p>Atomic Rubrics</p><p>Temporal / Interaction</p><p>Structured Soundscape</p><p>Acoustic Physics</p></div>
          <div className="pls-map-arrows" aria-hidden="true"><i>→</i><i>→</i><i>→</i><i>→</i></div>
          <div className="pls-output-column"><span>方法综合 / SYNTHESIS</span><strong>POINT</strong><strong>LINE</strong><strong>SCENE</strong><strong>Cross-layer Constraint</strong></div>
        </div>
        <div className="pls-layer-grid">{layers.map(([id, title, body], index) => <article key={id}><span>0{index + 1} / {id}</span><h3>{title}<small>{id}</small></h3><p>{body}</p></article>)}</div>
        <div className="pls-cross-axis"><span>跨层评价轴</span><strong>Physical Fidelity<br />Perceptual Fidelity</strong><p><b>Physical Fidelity</b> 由 AcoustiTrace 等物理诊断工作直接支持；<b>Perceptual Fidelity</b> 是本文更广的跨层感知评价抽象。Quality / OVL 独立呈现。</p></div>
      </section>

      <section className="pls-case-band" id="case-study">
        <div className="t2a-shell">
          <header className="t2a-section-heading"><p>04 / 核心案例 / CASE STUDY</p><h2>3→4→4：参考链如何改变错误归因</h2><p>P06、P10 与 R2-H1-B 跨两轮重复出现同一条可精确判定的诊断链。</p></header>
          <div className="pls-count-case"><div><span>文本提示（Prompt）</span><strong>3</strong><small>原始要求</small></div><i>→</i><div className="pls-count-fail"><span>画面事实（Visual Fact）</span><strong>4</strong><small>文本 → 画面：失败</small></div><i>→</i><div className="pls-count-pass"><span>音频事件（Audio Event）</span><strong>4</strong><small>画面 → 音频：通过</small></div></div>
          <div className="pls-attribution"><div><span>只看 Prompt → Audio</span><p><code>3 ≠ 4</code>，容易误判为音频计数失败。</p></div><div><span>加入画面事实</span><p>先定位文本 → 画面，再判断画面 → 音频，错误归因被修正。</p></div></div>
          <div className="pls-case-conclusion"><strong>重复诊断模式（Repeated Diagnostic Pattern）</strong><p>三个案例提高精确计数的回归优先级；结果用于描述评价参考链，不涉及模型内部生成顺序。</p><Link className="paper-link" href="/audio-visual-evaluation">查看完整两轮评测</Link></div>
          <div className="pls-revision-block" id="extension">
            <header><p>案例驱动的方法扩展 / METHOD EXTENSION</p><h3>显式参考链诊断（Reference-aware Diagnosis）</h3><span>案例结果提出一个关键问题：正确性判断采用哪一层 Reference？</span></header>
            <div className="pls-version-shift"><article><span>初始表达 / INITIAL</span><h3>Point = Atomic Correctness</h3><p>判断单个事件或属性是否正确。</p></article><b>案例观察 / CASE<br /><code>3→4→4</code></b><article><span>案例修订 / REFINED</span><h3>Point = Atomic Correctness<br />+ Explicit Reference</h3><p>先明确评价参照，再判断原子正确性。<small>PLS v2.x</small></p></article></div>
            <div className="pls-reference-chain"><div><span>原始指令</span><strong>Prompt</strong></div><b>→</b><div><span>指令保真</span><strong>Visual Fact</strong><small>Text→Visual</small></div><b>→</b><div><span>跨模态对应</span><strong>Audio Event</strong><small>Visual→Audio</small></div></div>
            <p className="pls-method-label">案例驱动的方法扩展 · <strong>显式参考链诊断（Reference-aware Diagnosis）</strong></p>
          </div>
        </div>
      </section>

      <section className="t2a-section t2a-section-tint" id="regression">
        <div className="t2a-shell">
          <header className="t2a-section-heading"><p>补充 / 受控回归 / CONTROLLED REGRESSION</p><h2>区分重复模式、未复现与待细化问题</h2><p>第二轮在预设条件下检查第一轮的问题是否重现，并据此调整证据强度与后续回归优先级。</p></header>
          <details className="pls-landing-details"><summary>展开三个受控回归案例</summary><div className="pls-regression-grid">{regressionCases.map((item) => <article key={item.id}><span>{item.id}</span><div className="pls-mini-path">{item.path.map((step, index) => <div key={step}>{index > 0 && <i>↓</i>}<strong>{step}</strong></div>)}</div><p>{item.meaning}</p></article>)}</div></details>
        </div>
      </section>

      <section className="t2a-section t2a-shell pls-execution-section" id="execution">
        <header className="t2a-section-heading pls-execution-heading">
          <p>05 / 执行流程 / EXECUTION LAYER</p>
          <h2>从方法框架到可执行评测</h2>
          <p>Point–Line–Scene 最初用于组织不同粒度的评测对象。结合 Audio-Visual Generation Evaluation 的真实案例后，我进一步整理了结构化评测记录，并实现轻量执行层（Execution Layer）：人工负责事实判断与能力评分，程序负责格式校验、维度聚合、诊断摘要与案例集合画像。</p>
        </header>

        <div className="pls-four-layer-model" aria-label="PLS方法的四层结构">
          {executionLayers.map(([index, english, chinese, structure, purpose]) => (
            <article key={english}>
              <span>{index} / {english}</span>
              <h3>{chinese}</h3>
              <strong>{structure}</strong>
              <p>{purpose}</p>
            </article>
          ))}
        </div>

        <div className="pls-execution-pipeline">
          <div className="pls-execution-pipeline-intro">
            <p className="eyebrow">执行流程 / EXECUTION PIPELINE</p>
            <h3>专业判断由人完成，程序负责计算与整理</h3>
            <p>人工评测负责事实判定、能力评分与 Bad Case 归因；执行层负责 Schema 校验、Dimension Profile 派生、轻量一致性检查与诊断摘要生成。程序不替代评测员的专业判断。</p>
          </div>
          <ol>
            {executionSteps.map(([index, english, chinese, body, tags]) => (
              <li key={english}>
                <span>{index}</span>
                <small>{english}</small>
                <h3>{chinese}</h3>
                <p>{body}</p>
                <div>{tags.map((tag) => <code key={tag}>{tag}</code>)}</div>
              </li>
            ))}
          </ol>
        </div>

        <details className="pls-landing-details pls-execution-details"><summary>展开真实记录、案例画像与聚合示例</summary><div className="pls-record-example">
          <header>
            <p className="eyebrow">真实记录 / EVALUATION RECORD</p>
            <h3>P06：同一输出如何形成不同关系判断</h3>
          </header>
          <div className="pls-record-columns">
            <article>
              <span>01 / OBSERVABLE FACTS</span>
              <dl className="pls-fact-list"><div><dt>Prompt</dt><dd>3 次</dd></div><div><dt>Visual</dt><dd>4 次</dd></div><div><dt>Audio</dt><dd>4 次</dd></div></dl>
            </article>
            <article>
              <span>02 / CAPABILITY</span>
              <dl className="pls-capability-list"><div><dt>P4 事件计数（Event Counting）</dt><dd>5 / 5</dd></div><div><dt>L1 起点对齐（Onset Alignment）</dt><dd>3 / 5</dd></div></dl>
              <code>audio_early</code>
            </article>
            <article>
              <span>03 / DIAGNOSIS</span>
              <dl className="pls-diagnosis-list"><div><dt>Instruction Fidelity</dt><dd className="is-fail">FAIL</dd></div><div><dt>Visual → Audio</dt><dd className="is-pass">PASS</dd></div><div><dt>Point / Line / OVL</dt><dd>5.00 / 4.00 / 4</dd></div></dl>
            </article>
          </div>
          <p className="pls-record-takeaway">同一输出在不同参考关系下可以得到不同结论：Prompt→Visual 未满足数量约束，但 Visual→Audio 的事件计数保持一致，因此不归因为 Audio Counting Failure。</p>
        </div>

        <div className="pls-execution-case-grid">
          <article className="pls-execution-case pls-quality-case">
            <header><span>CASE 02 / RELATION ≠ QUALITY</span><h3>H2：关系正确，听觉质量仍可较低</h3></header>
            <div className="pls-case-score-row"><div><small>POINT</small><strong>5.00</strong></div><div><small>LINE</small><strong>5.00</strong></div><div className="is-quality"><small>QUALITY</small><strong>3 / 5</strong></div></div>
            <code>loudness_imbalance</code>
            <p>事件完整性、起点对齐与时间顺序均成立，但音频仍存在响度失衡。关系正确性（Relational Correctness）与感知质量（Perceptual Quality）应作为独立评价轴记录。</p>
          </article>

          <article className="pls-execution-case pls-partial-case">
            <header><span>CASE 03 / PARTIAL CAPABILITY</span><h3>H3：保留部分成立的能力状态</h3></header>
            <dl><div><dt>P2 Source Correctness</dt><dd>5</dd></div><div><dt>L3 Duration / Overlap</dt><dd>5</dd></div><div className="is-focus"><dt>L4 Dynamic Correspondence</dt><dd>3</dd></div><div><dt>S1 Environment Match</dt><dd>5</dd></div></dl>
            <div className="pls-motion-split"><p><span>Boundary Response</span><strong>Present</strong></p><p><span>Source-motion Tracking</span><strong>Insufficiently Continuous</strong></p></div>
            <code>static_audio_motion</code>
            <p>状态边界变化已经产生可辨响应，但声音对连续 source motion 的细粒度跟随仍不足。1–5 分制保留了这种部分成立的能力状态。</p>
          </article>
        </div>

        <aside className="pls-confounded-case">
          <div><span>补充案例 / CONFOUNDED EVIDENCE</span><h3>P10：Validity 与 Capability Judgment 分开记录</h3></div>
          <p>L3=<code>audio_duration_short</code> 可以记录，但非预期 camera cut 影响对中断原因的解释，因此 Validity=<strong>PARTIAL</strong>。与此同时，P4 的 Visual→Audio exact-count 仍为 <strong>PASS</strong>。</p>
        </aside>

        <div className="pls-demo-profile">
          <div>
            <p className="eyebrow">执行层示例画像 / EXECUTION DEMO PROFILE</p>
            <h3>四个迁移诊断案例的适用能力评分汇总</h3>
            <p>四个迁移诊断案例的适用能力评分汇总，用于检查 Evaluation Schema 与 Execution Layer 的聚合和展示流程。不作为模型整体能力估计。</p>
          </div>
          <div className="pls-demo-profile-table" role="table" aria-label="四个迁移案例的执行演示画像">
            <div role="row" className="is-header"><span role="columnheader">Layer</span><span role="columnheader">Mean</span><span role="columnheader">Valid n</span></div>
            {demoProfile.map(([layer, mean, n]) => <div role="row" key={layer}><strong role="cell">{layer}</strong><span role="cell">{mean}</span><span role="cell">{n}</span></div>)}
          </div>
        </div></details>
      </section>

      <section className="t2a-section t2a-section-tint pls-system-section" id="evaluation-system">
        <div className="t2a-shell">
          <header className="t2a-section-heading">
            <p>06 / 评测系统 / EVALUATION SYSTEM</p>
            <h2>人在回路的评测系统</h2>
            <p>将人工评测（Human Evaluation）、信号诊断（Signal Diagnostics）和结构化执行连接为统一工作流。它是 T2A、音视频评测、PLS 与执行层的系统视图，不新增能力分类。</p>
          </header>

          <div className="pls-system-status" aria-label="Evaluation System implementation status">
            {evaluationSystemEvidence.systemStatuses.map((item) => <article key={item.label}><span>{item.status}</span><strong>{item.label}</strong></article>)}
          </div>

          <figure className="pls-system-figure">
            <div className="pls-system-prefix">
              {['需求（Requirement）', '能力分类（Capability Taxonomy）', '评测集（Evaluation Set）'].map((item, index) => <div key={item}>{index > 0 && <i>↓</i>}<strong>{item}</strong></div>)}
            </div>
            <div className="pls-system-branches">
              <article>
                <span>人工评测 / HUMAN EVALUATION</span>
                <h3>关系与质量判断</h3>
                <ul><li>点（Point）</li><li>线（Line）</li><li>面（Scene）</li><li>独立 OVL</li></ul>
              </article>
              <b aria-hidden="true">+</b>
              <article>
                <span>信号诊断 / SIGNAL DIAGNOSTICS</span>
                <h3>输出信号证据</h3>
                <ul><li>技术</li><li>频谱</li><li>空间</li><li>动态</li></ul>
              </article>
            </div>
            <div className="pls-system-converge">
              {['证据 / 评测记录', '评测结构', '执行层', '数据集分析', '诊断 / 回归'].map((item, index) => <div key={item}>{index > 0 && <i>↓</i>}<strong>{item}</strong></div>)}
            </div>
            <figcaption>图 4. 人工判断 × 信号诊断 × 结构化执行。</figcaption>
          </figure>

          <details className="pls-landing-details"><summary>展开信号证据、批量分析与方法整合</summary><div className="pls-system-responsibility-grid">
            <article><span>WHY SIGNAL EVIDENCE</span><h3>为人工观察增加可复核的信号证据</h3><p>人工听感能够发现问题；确定性测量可进一步检查 clipping、频谱分布、声道关系、响度与动态形态。</p></article>
            <article><span>WHAT REMAINS HUMAN</span><h3>Capability 与 OVL 仍由评测员完成</h3><p>Event correctness、Material interpretation、Temporal relation、Scene plausibility 与 OVL 不由单一信号指标自动决定。</p></article>
          </div>

          <div className="pls-signal-groups">
            {evaluationSystemEvidence.signalGroups.map((group) => <article key={group.id}><span>{group.id}</span><ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul></article>)}
          </div>

          <div className="pls-signal-evidence-block">
            <header><p className="eyebrow">BATCH ANALYSIS / SIGNAL EVIDENCE</p><h3>{evaluationSystemEvidence.acousticBatch.label}</h3><p>Generated N={evaluationSystemEvidence.acousticBatch.n} · Source: {evaluationSystemEvidence.acousticBatch.source}</p></header>
            <div>{evaluationSystemEvidence.acousticBatch.metrics.map((metric) => <article key={metric.id}><span>{metric.statistic}</span><strong>{metric.value}{metric.unit ? ` ${metric.unit}` : ''}</strong><p>{metric.label}</p></article>)}</div>
          </div>

          <div className="pls-fusion-block">
            <header><p className="eyebrow">EVIDENCE FUSION / METHOD INTEGRATION</p><h3>Human Note + Signal Evidence → Diagnosis</h3><p>以下为方法整合示例，不是自动评分规则。</p></header>
            <div className="pls-fusion-grid">
              {evaluationSystemEvidence.fusionExamples.map((item) => <article key={item.title}><span>{item.status}</span><h3>{item.title}</h3><dl><div><dt>Human Observation</dt><dd>{item.human}</dd></div><div><dt>Signal Evidence</dt><dd>{item.signal}</dd></div><div><dt>Interpretation</dt><dd>{item.interpretation}</dd></div><div><dt>Boundary</dt><dd>{item.boundary}</dd></div></dl></article>)}
            </div>
          </div>

          <aside className="pls-system-boundary">{evaluationSystemEvidence.publicBoundary}</aside></details>
        </div>
      </section>

      <section className="t2a-section t2a-shell" id="quality">
        <header className="t2a-section-heading"><p>补充 / PLS + 独立质量</p><h2>关系正确性与感知质量是独立评价轴</h2><p>R2-H2 与 R2-H4-A 显示，线（Line）层关系评分可以保持较高水平，同时 OVL 仍因响度失衡或伪影下降。因此诊断层评分与整体音频质量不应直接合成为单一结论。</p></header>
        <div className="pls-quality-grid"><article><span>R2-H2</span><div><strong>L1 = 5 / 5</strong><strong>OVL = 3 / 5</strong></div><code>loudness_imbalance</code></article><article><span>R2-H4-A</span><div><strong>L3 = 5 / 5 · L4 = 5 / 5</strong><strong>OVL = 3 / 5</strong></div><code>artifact_noise</code></article></div>
        <div className="pls-quality-answer"><div><span>Point / Line / Scene</span><h3>哪里出了问题？</h3></div><b>≠</b><div><span>Quality / OVL</span><h3>最终听起来怎么样？</h3></div></div>
        <p className="pls-project-boundary">Evidence status · Project-supported design observation</p>
      </section>

      <section className="t2a-section t2a-section-tint pls-operational-section" id="operationalization">
        <div className="t2a-shell">
          <header className="t2a-section-heading"><p>补充 / 标准落地 / OPERATIONALIZATION</p><h2>评测标准生命周期（Evaluation Standard Lifecycle）</h2><p>将能力定义、评分标准、评测执行、质量反馈与回归连接为可修订的标准生命周期。</p></header>
          <details className="pls-landing-details"><summary>展开标准生命周期与已执行边界</summary><div className="pls-lifecycle" aria-label="Evaluation Standard Lifecycle">
            {evaluationSystemEvidence.lifecycle.map((item, index) => <div key={item}>{index > 0 && <i>→</i>}<strong>{item}</strong></div>)}
          </div>
          <div className="pls-operational-evidence">
            <article><span>EXECUTED / 项目中已实践</span><ul>{evaluationSystemEvidence.lifecycleEvidence.executed.map((item) => <li key={item}>{item}</li>)}</ul></article>
            <article><span>FUTURE EXTENSION / SCALE-OUT DESIGN</span><ul>{evaluationSystemEvidence.lifecycleEvidence.future.map((item) => <li key={item}>{item}</li>)}</ul></article>
          </div>
          <p className="pls-operational-note">在个人项目中，能力定义、评分标准、盲听、隐藏重复与受控回归已形成闭环；多人校准与 QA 保留为规模化执行方案。</p></details>
        </div>
      </section>

      <section className="t2a-section pls-future-section" id="future">
        <div className="t2a-shell">
          <header className="t2a-section-heading"><p>补充 / 后续研究 / FUTURE RESEARCH</p><h2>从诊断评测扩展到生产、奖励与评测模型审计</h2><p>以下方向由邻近研究提出方法线索，当前项目尚未进行正式验证。</p></header>
          <details className="pls-landing-details"><summary>展开后续研究方向与可靠性检查</summary><div className="pls-future-routes">
            <article><span>A · PRODUCTION UTILITY</span><h3>制作流程适用性</h3><p>Desbos et al. [7] 从 production requirements 出发讨论 editability、transient integrity、temporal / energy alignment 与工作流适用性。当前 AV 项目未正式测试这些指标。</p><a href="https://arxiv.org/abs/2607.09973" target="_blank" rel="noreferrer">[7] Production-Oriented SFX Evaluation ↗</a></article>
            <article><span>B · PREFERENCE / REWARD</span><h3>从细粒度 rubric 到奖励信号</h3><p>Fine-Grained Feedback [3] 用于 TTA preference optimization；AnyAudio-Judge [2] 面向 audio instruction alignment reward；AudioRubrics [8] 则在<strong>音频推理（Audio Reasoning）</strong>任务中展示 adaptive rubric 作为 RL reward 的可行性。它们为生成式音频的 rubric-to-reward 提供邻近证据，当前 PLS 项目尚未验证这一迁移。</p><div><a href="https://arxiv.org/abs/2607.13408" target="_blank" rel="noreferrer">[3] Fine-Grained Feedback ↗</a><a href="https://arxiv.org/abs/2606.03116" target="_blank" rel="noreferrer">[2] AnyAudio-Judge ↗</a><a href="https://arxiv.org/abs/2608.02831" target="_blank" rel="noreferrer">[8] AudioRubrics ↗</a></div></article>
            <article><span>C · JUDGE RELIABILITY</span><h3>自动 Judge 的证据依赖审计</h3><p>Park et al. [9] 在<strong>语音评测（Speech Evaluation）</strong>中显示，高 human agreement 不足以保证 Judge 依赖音频证据。本文据此将 Judge Reliability 作为未来 PLS 自动化需要审计的方向。</p><a href="https://arxiv.org/abs/2607.13477" target="_blank" rel="noreferrer">[9] LALM Judge Audit ↗</a></article>
          </div>
          <div className="pls-probes">{["Audio Removal / Mismatch", "A/B Swap", "Metadata Conflict", "Rephrasing Stability"].map((probe, index) => <article key={probe}><span>PROBE {index + 1}</span><strong>{probe}</strong></article>)}</div>
          <div className="pls-scope-compare"><div><span>当前项目</span><strong>评测 → 诊断 → 受控回归</strong></div><div><span>后续研究</span><strong>制作可用性 · 偏好 / 奖励 · 自动评测模型</strong></div></div></details>
        </div>
      </section>

      <section className="t2a-section t2a-section-tint" id="contribution">
        <div className="t2a-shell">
          <header className="t2a-section-heading"><p>补充 / 研究产出与开放问题</p><h2>详细研究问题保留在完整报告</h2></header>
          <details className="pls-landing-details"><summary>展开研究产出与 RQ1–RQ4</summary><div className="pls-contribution-grid">{[
            ["01", "Literature Synthesis", "把 Event、Attribute、Temporal、Soundscape、Physics 与 Judge 等近期研究方向放进同一论证链。"],
            ["02", "Conceptual Framework", "用点（Point）→ 线（Line）→ 面（Scene）组织不同粒度的 Failure Localization。"],
            ["03", "Diagnostic Case Study", "用两轮 Audio-Visual Generation Evaluation 展示诊断与受控回归。"],
            ["04", "Project-derived Extension", "3→4→4 案例形成显式参考链诊断（Reference-aware Diagnosis）。"],
            ["05", "Research Agenda", "明确复杂度、holistic 对照、Preference / Reward 与多模态参考链等待测问题。"],
          ].map(([index, title, body]) => <article key={index}><span>{index}</span><h3>{title}</h3><p>{body}</p></article>)}</div>
          <div className="pls-rq-list">{researchQuestions.map(([id, question, status]) => <article key={id}><span>{id}</span><h3>{question}</h3><strong>{status}</strong></article>)}</div></details>
        </div>
      </section>

      <section className="t2a-section t2a-shell" id="boundary">
        <header className="t2a-section-heading"><p>10 / EVIDENCE BOUNDARY</p><h2>证据范围与研究限制</h2></header>
        <div className="pls-boundary-grid"><article><strong>10 + 6</strong><h3>两轮单次生成</h3><p>Round-1 10 个、Round-2 6 个；没有 multi-seed statistical experiment，不做总体性能泛化。</p></article><article><strong>UNEVALUABLE</strong><h3>H1-A 排除</h3><p>关键 Visual Fact 不清晰，不进入 Exact-count evidence set。</p></article><article><strong>LIMITED</strong><h3>Scene 与评测者证据</h3><p>Scene 案例有限；项目由单评测员完成，未测试 inter-rater reliability。</p></article><article><strong>NOT TESTED</strong><h3>后续方向</h3><p>Production Utility、Preference / Reward 与 automatic Judge 均未正式测试。</p></article></div>
      </section>

      <section className="t2a-section t2a-section-tint" id="references">
        <div className="t2a-shell">
          <header className="t2a-section-heading"><p>补充 / 参考文献 / REFERENCES</p><h2>参考文献</h2><p>完整引用继续保留，默认折叠以维持作品集页面的阅读节奏。</p></header>
          <details className="pls-landing-details"><summary>展开 9 条参考文献</summary><ol className="pls-reference-list">{references.map(([authors, title, href]) => <li key={href}><span>{authors}</span><a href={href} target="_blank" rel="noreferrer">{title}</a><small>arXiv ↗</small></li>)}</ol></details>
        </div>
      </section>

      <aside className="pls-research-note t2a-shell"><div><p className="eyebrow">方法起点 / ORIGIN NOTE</p><h2>从声音世界的组织思考，到可检验的评测问题</h2></div><div><p>“点·线·面·境”记录了我从声音设计与游戏音频出发的早期概念探索，并作为 Point–Line–Scene 方法演进的起点保留。</p><Link className="paper-link" href="/audio-world-framework">阅读早期研究笔记</Link></div></aside>

      <footer className="t2a-footer t2a-shell"><Link href="/">← 返回作品集</Link><Link href="/t2a-case-study">T2A 评测</Link><Link href="/audio-visual-evaluation">音视频生成评测</Link><Link href="/point-line-scene-framework/report/">完整报告</Link><span>© 2026 杜明</span></footer>
    </main>
  );
}

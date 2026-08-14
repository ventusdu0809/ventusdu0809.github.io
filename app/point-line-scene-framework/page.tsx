import type { Metadata } from "next";
import Link from "next/link";
import "../t2a-case-study/t2a-case-study.css";
import "./point-line-scene-framework.css";

export const metadata: Metadata = {
  title: "Point–Line–Scene｜从音频评测研究到多模态失败定位",
  description:
    "从近期生成式音频评测研究提炼 Point–Line–Scene，再以两轮 Audio-Visual Generation Evaluation 检查失败定位、受控回归与参考链问题。",
  keywords: ["Point-Line-Scene", "生成式音频评测", "音视频生成评测", "Failure Localization", "Reference-aware Evaluation"],
  alternates: { canonical: "/point-line-scene-framework" },
};

const trends = [
  "Atomic Rubric",
  "Event / Attribute",
  "Temporal Relation",
  "Structured Soundscape",
  "Acoustic Physics",
  "Preference / Reward",
  "Judge Reliability",
] as const;

const literature = [
  {
    index: "01",
    theme: "细粒度拆解 / FINE-GRAINED DECOMPOSITION",
    title: "整体相似，不等于知道哪里错了",
    papers: [
      ["AudioScape-TTA", "https://arxiv.org/abs/2608.04479"],
      ["AnyAudio-Judge", "https://arxiv.org/abs/2606.03116"],
    ],
    evidence: "研究开始把复杂描述拆为事件实现、声学属性、语音内容，或独立且可验证的动态 rubric；评价单位从整体相似度下沉到原子事实。",
    synthesis: "POINT：原子声学正确性（Atomic Acoustic Correctness）",
  },
  {
    index: "02",
    theme: "关系评价 / RELATIONAL EVALUATION",
    title: "事件都出现了，关系仍可能不成立",
    papers: [
      ["Fine-Grained Feedback / S3Bench", "https://arxiv.org/abs/2607.13408"],
      ["MMAG", "https://arxiv.org/abs/2608.06900"],
    ],
    evidence: "Event Presence 与 Temporal Relation 被分开检查；Mixed Audio 还需要同时处理语义、说话人、声音事件与时间控制。",
    synthesis: "LINE：关系正确性（Relational Correctness）",
    boundary: "Temporal 有直接文献支撑；将 Spatial / Causal / Interactive / Dynamic 统一归入 LINE，是作者的方法论扩展。",
  },
  {
    index: "03",
    theme: "结构化场景 / STRUCTURED SCENE",
    title: "复杂声景不是若干 Event 的简单相加",
    papers: [
      ["AudioScape-TTA", "https://arxiv.org/abs/2608.04479"],
      ["MMAG", "https://arxiv.org/abs/2608.06900"],
    ],
    evidence: "结构化 soundscape 同时处理事件密度、结构复杂度与 Speech / Music / SFX 的组合，而不只保留一条 caption。",
    synthesis: "SCENE：整体声景与场景一致性（Holistic Soundscape / Scene Coherence）",
    boundary: "当前 Audio-Visual 项目对 Scene 的案例证据弱于 Point 与 Line。",
  },
  {
    index: "04",
    theme: "跨层物理约束 / CROSS-LAYER CONSTRAINT",
    title: "听起来合理，也可能违反声学过程",
    papers: [["AcoustiTrace", "https://arxiv.org/abs/2608.02035"]],
    evidence: "Sound Generation → Propagation Environment → Acoustic Reception 把物理真实性放回可观察的声学过程。",
    synthesis: "Physical / Perceptual Fidelity 作为跨层约束，而不是 PLS 后面的第四层。",
  },
  {
    index: "05",
    theme: "音视频扩展 / AUDIO-VISUAL EXTENSION",
    title: "单独评价 Audio 与 Video，仍会漏掉联合错误",
    papers: [["AVGen-Bench", "https://arxiv.org/abs/2604.08540"]],
    evidence: "单模态评价与粗粒度 embedding similarity，难以覆盖真实 T2AV 中的联合细粒度正确性。",
    synthesis: "Audio PLS → Audio-Visual PLS，并显式追踪跨模态参考链。",
  },
] as const;

const layers = [
  ["POINT", "原子正确性", "事件、声源、材质、属性与数量是否正确。"],
  ["LINE", "关系正确性", "时间、空间、因果、交互与动态对应是否成立。"],
  ["SCENE", "整体场景一致性", "环境、前后景、显著性与叙事内声音是否共同成立。"],
] as const;

const regressionCases = [
  {
    id: "H2",
    path: ["Round-1: audio_early", "Round-2: aligned", "Not Replicated"],
    meaning: "Bad Case Discovery ≠ Stable Failure。受控样本没有复现，原观察仍然有效，但不能升级为稳定缺陷。",
  },
  {
    id: "H3",
    path: ["Round-1: Dynamic Response issue", "Boundary response 未复现；source-motion 部分问题", "Mixed / Refined"],
    meaning: "LINE 需要继续细化：不仅问“有没有变化”，还要问声音是否连续、细粒度地跟随 Visual Dynamics。",
  },
  {
    id: "H4",
    path: ["持续声音中断 + Camera Cut Confound", "No-cut vs Planned-cut 均 continuous", "Not Replicated"],
    meaning: "把偶然切镜从混杂因素变成自变量，完成 Evaluation → Hypothesis → Controlled Regression。",
  },
] as const;

const researchQuestions = [
  ["RQ1", "Point → Line → Scene 是否形成可测量的复杂度梯度？", "NOT TESTED"],
  ["RQ2", "PLS 是否比 holistic-only evaluation 更容易定位模型回归？", "PRELIMINARY CASE SUPPORT · 未做正式 A/B"],
  ["RQ3", "PLS-derived Preference 能否形成有效 Reward Signal？", "FUTURE WORK"],
  ["RQ4", "Reference-aware decomposition 是否能够降低 Audio-Visual 错误归因？", "PRELIMINARY CASE EVIDENCE · P06 / P10 / R2-H1-B"],
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
        <nav aria-label="研究页导航"><Link href="/t2a-case-study">T2A</Link><Link href="/audio-visual-evaluation">T2VA</Link><a href="#landscape">文献</a><a href="#case-study">案例</a><a href="#references">参考文献</a></nav>
      </header>

      <section className="pls-hero t2a-shell">
        <div className="pls-hero-index"><p className="eyebrow">研究 / RESEARCH</p><span>POINT</span><span>LINE</span><span>SCENE</span></div>
        <div className="pls-hero-copy">
          <p className="pls-kicker">Point–Line–Scene：</p>
          <h1>从细粒度音频评测研究<br />到多模态失败定位</h1>
          <p>我从近期生成式音频与音视频评测研究中观察趋势、寻找组织缺口，再把分散的评价对象综合为一套面向 Failure Localization 的层级结构。</p>
          <div className="pls-research-route" aria-label="研究叙事路径"><span>Literature Synthesis</span><b>→</b><span>Conceptual Framework</span><b>→</b><span>Audio-Visual Case Study</span></div>
          <div className="pls-hero-actions"><a className="btn btn-primary" href="#question">进入研究问题</a><a className="paper-link" href="/downloads/pls-framework/point_line_scene_framework_with_av_case_study.md" download>下载完整报告</a></div>
        </div>
      </section>

      <section className="pls-positioning">
        <div className="t2a-shell pls-positioning-grid">
          <div><p className="eyebrow">研究定位 / POSITIONING</p><h2>不是行业标准，也不是 16 个样本“证明”的理论</h2></div>
          <div><p>Point–Line–Scene 是我基于近期研究形成的上层方法论综合。两轮 Audio-Visual Generation Evaluation 只提供案例级经验依据（Case-level Empirical Evidence），并反向推动了一个新的方法扩展：Reference-aware Diagnosis。</p><strong>作者综合 + 案例研究 ≠ 统计验证</strong></div>
        </div>
      </section>

      <section className="t2a-section t2a-shell" id="question">
        <header className="t2a-section-heading"><p>01 / RESEARCH QUESTION</p><h2>先观察研究正在往哪里走</h2><p>近期工作不再只问“总体像不像”，而是在把生成结果拆成更具体、可验证的评价对象。</p></header>
        <div className="pls-trend-strip">{trends.map((trend, index) => <span key={trend}><i>{String(index + 1).padStart(2, "0")}</i>{trend}</span>)}</div>
        <div className="pls-gap">
          <div><span>RESEARCH GAP</span><p>这些对象分散在不同 Benchmark、任务与协议中；实践者仍缺少一套便于组织证据和定位失败的上层结构。</p></div>
          <div><span>RESEARCH QUESTION</span><h3>这些细粒度评价对象，能否被组织成一套更容易用于 Failure Localization 的统一层级结构？</h3></div>
          <strong>MY SYNTHESIS · Point → Line → Scene</strong>
        </div>
      </section>

      <section className="t2a-section t2a-section-tint" id="landscape">
        <div className="t2a-shell">
          <header className="t2a-section-heading"><p>02 / LITERATURE LANDSCAPE</p><h2>论文不是 Sources，而是 Argument</h2><p>每组研究先提供观察依据，再说明我从中做出的综合；直接文献支持与作者扩展不混写。</p></header>
          <div className="pls-landscape">{literature.map((item) => (
            <article key={item.index}>
              <div className="pls-landscape-label"><span>{item.index}</span><small>{item.theme}</small></div>
              <div className="pls-landscape-body"><h3>{item.title}</h3><div className="pls-citations">{item.papers.map(([name, href]) => <a key={name} href={href} target="_blank" rel="noreferrer">{name} ↗</a>)}</div><p>{item.evidence}</p>{"boundary" in item && <small className="pls-inline-boundary">边界：{item.boundary}</small>}</div>
              <div className="pls-landscape-result"><span>MY SYNTHESIS</span><strong>{item.synthesis}</strong></div>
            </article>
          ))}</div>
        </div>
      </section>

      <section className="t2a-section t2a-shell" id="framework">
        <header className="t2a-section-heading"><p>03 / FROM LITERATURE TO PLS</p><h2>把分散研究组织成失败定位结构</h2><p>PLS 的贡献不是发明 Event、Temporal 或 Scene，而是把它们组织为同一套 Failure Localization abstraction。</p></header>
        <div className="pls-synthesis-map">
          <div className="pls-signal-column"><span>WHAT LITERATURE SAYS</span><p>Atomic Rubrics</p><p>Temporal / Interaction</p><p>Structured Soundscape</p><p>Acoustic Physics</p></div>
          <div className="pls-map-arrows" aria-hidden="true"><i>→</i><i>→</i><i>→</i><i>→</i></div>
          <div className="pls-output-column"><span>WHAT I SYNTHESIZE</span><strong>POINT</strong><strong>LINE</strong><strong>SCENE</strong><strong>Cross-layer Constraint</strong></div>
        </div>
        <div className="pls-layer-grid">{layers.map(([id, title, body], index) => <article key={id}><span>0{index + 1} / {id}</span><h3>{title}<small>{id}</small></h3><p>{body}</p></article>)}</div>
        <div className="pls-cross-axis"><span>跨层约束</span><strong>Physical / Perceptual Fidelity</strong><p>物理与感知保真贯穿 Point、Line、Scene；Quality / OVL 独立呈现，不压缩成单一 Total Score。</p></div>
      </section>

      <section className="pls-case-band" id="case-study">
        <div className="t2a-shell">
          <header className="t2a-section-heading"><p>04 / AUDIO-VISUAL CASE STUDY</p><h2>方法论第一次遇到真实问题</h2><p>P06、P10 与 R2-H1-B 跨两轮重复出现同一条可精确判定的诊断链。</p></header>
          <div className="pls-count-case"><div><span>Prompt</span><strong>3</strong><small>Instruction</small></div><i>→</i><div className="pls-count-fail"><span>Visual Fact</span><strong>4</strong><small>Text→Visual · FAIL</small></div><i>→</i><div className="pls-count-pass"><span>Audio Event</span><strong>4</strong><small>Visual→Audio · PASS</small></div></div>
          <div className="pls-attribution"><div><span>只看 Prompt→Audio</span><p><code>3 ≠ 4</code>，容易误判为 Audio Counting Failure。</p></div><div><span>加入 Visual Fact</span><p>先定位 Text→Visual，再判断 Visual→Audio，错误归因被修正。</p></div></div>
          <div className="pls-case-conclusion"><strong>Repeated Diagnostic Pattern</strong><p>三个案例提高 Exact-count 的回归优先级，但仍不是 Systematic Failure，也不推断模型内部生成顺序。</p><Link className="paper-link" href="/audio-visual-evaluation">查看完整两轮评测 →</Link></div>
        </div>
      </section>

      <section className="t2a-section t2a-shell" id="extension">
        <header className="t2a-section-heading"><p>05 / PROJECT-DERIVED EXTENSION</p><h2>From Hierarchical Evaluation<br />to Reference-aware Diagnosis</h2><p>项目没有替框架“背书”，而是暴露了原版本未明确处理的问题：评价对象的 Reference 到底是谁？</p></header>
        <div className="pls-version-shift"><article><span>PLS v1</span><h3>Point = Atomic Correctness</h3><p>判断单个事件或属性是否正确。</p></article><b>项目观察<br /><code>3→4→4</code></b><article><span>PLS v2.x</span><h3>Point = Atomic Correctness<br />+ Reference Awareness</h3><p>先明确参照来源，再判断正确性。</p></article></div>
        <div className="pls-reference-chain"><div><span>原始指令</span><strong>Prompt</strong></div><b>→</b><div><span>Instruction Fidelity</span><strong>Visual Fact</strong><small>Text→Visual</small></div><b>→</b><div><span>Cross-modal Correspondence</span><strong>Audio Event</strong><small>Visual→Audio</small></div></div>
        <p className="pls-method-label">Reference-aware Evaluation / Provenance-aware Diagnosis · <strong>Project-derived methodological extension，不是既有学术标准。</strong></p>
      </section>

      <section className="t2a-section t2a-section-tint" id="regression">
        <div className="t2a-shell">
          <header className="t2a-section-heading"><p>06 / CONTROLLED REGRESSION</p><h2>研究价值不只来自“复现成功”</h2><p>Not Replicated 与 Mixed / Refined 同样改变了对问题的判断，也约束了下一轮研发优先级。</p></header>
          <div className="pls-regression-grid">{regressionCases.map((item) => <article key={item.id}><span>{item.id}</span><div className="pls-mini-path">{item.path.map((step, index) => <div key={step}>{index > 0 && <i>↓</i>}<strong>{step}</strong></div>)}</div><p>{item.meaning}</p></article>)}</div>
        </div>
      </section>

      <section className="t2a-section t2a-shell" id="quality">
        <header className="t2a-section-heading"><p>07 / PLS + QUALITY</p><h2>关系正确，不等于最终听感良好</h2><p>两个 frozen case 表明，能力层评分与感知质量可以同时给出不同答案。</p></header>
        <div className="pls-quality-grid"><article><span>R2-H2</span><div><strong>L1 = 5</strong><strong>OVL = 3</strong></div><code>loudness_imbalance</code></article><article><span>R2-H4-A</span><div><strong>L3 = 5 · L4 = 5</strong><strong>OVL = 3</strong></div><code>artifact_noise</code></article></div>
        <div className="pls-quality-answer"><div><span>Point / Line / Scene</span><h3>哪里出了问题？</h3></div><b>≠</b><div><span>Quality / OVL</span><h3>最终听起来怎么样？</h3></div></div>
        <p className="pls-project-boundary">这是项目支持的设计选择（Project-supported Design Decision），不是对所有评测任务的普遍证明。</p>
      </section>

      <section className="t2a-section pls-future-section" id="future">
        <div className="t2a-shell">
          <header className="t2a-section-heading"><p>08 / FROM EVALUATION TO ALIGNMENT</p><h2>下一步不是再加一个总分</h2><p>Fine-Grained Feedback、AnyAudio-Judge 与 AudioRubrics 指向一条可能的研究链：让可解释 rubric 进入 Preference 与 Reward。</p></header>
          <div className="pls-future-flow">{["Capability", "Prompt", "PLS Decomposition", "Dynamic Rubric", "Human / Audio Judge", "Preference", "Reward", "Model Optimization"].map((item, index) => <div key={item}>{index > 0 && <i>→</i>}<span>{item}</span></div>)}</div>
          <div className="pls-scope-compare"><div><span>当前已完成 / CURRENT</span><strong>Evaluation → Diagnosis → Controlled Regression</strong></div><div><span>尚未完成 / NOT CLAIMED</span><strong>DPO · Reward Model · RL</strong></div></div>
        </div>
      </section>

      <section className="t2a-section t2a-shell" id="judge">
        <header className="t2a-section-heading"><p>09 / JUDGE RELIABILITY</p><h2>高人类一致性，不自动等于 Judge 使用了音频证据</h2><p>LALM Judge Audit 提醒：协议线索、标签与位置偏差都可能制造“看似可靠”的判断。如果 PLS 未来自动化，Judge Reliability 必须独立审计。</p></header>
        <div className="pls-probes">{["Audio Removal / Mismatch", "A/B Swap", "Metadata Conflict", "Rephrasing Stability"].map((probe, index) => <article key={probe}><span>PROBE {index + 1}</span><strong>{probe}</strong></article>)}</div>
        <p className="pls-project-boundary">以上是 Future Research；当前项目采用人工评测，没有验证自动 Audio Judge。</p>
      </section>

      <section className="t2a-section t2a-section-tint" id="contribution">
        <div className="t2a-shell">
          <header className="t2a-section-heading"><p>10 / RESEARCH CONTRIBUTION</p><h2>这项工作目前贡献了什么</h2></header>
          <div className="pls-contribution-grid">{[
            ["01", "Literature Synthesis", "把 Event、Attribute、Temporal、Soundscape、Physics 与 Judge 等近期研究方向放进同一论证链。"],
            ["02", "Conceptual Framework", "用 Point → Line → Scene 组织不同粒度的 Failure Localization。"],
            ["03", "Case-based Evidence", "用两轮 Audio-Visual Generation Evaluation 展示诊断与受控回归。"],
            ["04", "Project-derived Extension", "从 3→4→4 导出 Reference-aware / Provenance-aware Diagnosis。"],
            ["05", "Research Agenda", "明确复杂度、holistic 对照、Preference / Reward 与多模态参考链等待测问题。"],
          ].map(([index, title, body]) => <article key={index}><span>{index}</span><h3>{title}</h3><p>{body}</p></article>)}</div>
          <div className="pls-rq-list">{researchQuestions.map(([id, question, status]) => <article key={id}><span>{id}</span><h3>{question}</h3><strong>{status}</strong></article>)}</div>
        </div>
      </section>

      <section className="t2a-section t2a-shell" id="boundary">
        <header className="t2a-section-heading"><p>11 / EVIDENCE BOUNDARY</p><h2>知道证据能说到哪里</h2></header>
        <div className="pls-boundary-grid"><article><strong>10 + 6</strong><h3>两轮单次生成</h3><p>没有 multi-seed statistical experiment，不做总体性能泛化。</p></article><article><strong>UNEVALUABLE</strong><h3>H1-A 排除</h3><p>关键 Visual Fact 不清晰，不重跑到获得想要的结果。</p></article><article><strong>LIMITED</strong><h3>Scene 证据有限</h3><p>当前实证主要集中在 Point、Line 与参考链。</p></article><article><strong>FUTURE</strong><h3>尚未验证</h3><p>Production Utility、Preference / Reward、自动 Judge 与 inter-rater reliability。</p></article></div>
      </section>

      <section className="t2a-section t2a-section-tint" id="references">
        <div className="t2a-shell">
          <header className="t2a-section-heading"><p>12 / REFERENCES</p><h2>文献依据</h2><p>以下条目链接至 arXiv 原始页面；它们支持页面中的研究观察，但 Point–Line–Scene 的统一组织仍是作者综合。</p></header>
          <ol className="pls-reference-list">{references.map(([authors, title, href]) => <li key={href}><span>{authors}</span><a href={href} target="_blank" rel="noreferrer">{title}</a><small>arXiv ↗</small></li>)}</ol>
        </div>
      </section>

      <aside className="pls-research-note t2a-shell"><div><p className="eyebrow">方法起点 / ORIGIN NOTE</p><h2>从声音世界的组织思考，到可检验的评测问题</h2></div><div><p>“点·线·面·境”保留了我从声音设计与游戏音频出发的早期概念探索。它不是 PLS 的并列理论，而是方法演进的起点与未来研究笔记。</p><Link className="paper-link" href="/audio-world-framework">阅读早期研究笔记 →</Link></div></aside>

      <footer className="t2a-footer t2a-shell"><Link href="/">← 返回作品集</Link><Link href="/t2a-case-study">T2A 评测</Link><Link href="/audio-visual-evaluation">T2VA 评测</Link><a href="/downloads/pls-framework/point_line_scene_framework_with_av_case_study.md" download>下载完整报告</a><span>© 2026 杜明</span></footer>
    </main>
  );
}

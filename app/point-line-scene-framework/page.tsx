import type { Metadata } from "next";
import Link from "next/link";
import "../t2a-case-study/t2a-case-study.css";
import "./point-line-scene-framework.css";

export const metadata: Metadata = {
  title: "PLS评测框架｜生成式音频与音视频分层感知方法",
  description:
    "Point–Line–Scene 概念框架、文献支撑与 Audio-Visual Generation Evaluation 案例研究：从原子事件、关系和场景一致性到失败定位与受控回归。",
  keywords: ["Point-Line-Scene", "PLS", "生成式音频评测", "音视频生成评测", "Failure Localization", "Controlled Regression"],
  alternates: { canonical: "/point-line-scene-framework" },
};

const layers = [
  {
    id: "POINT",
    title: "原子正确性",
    question: "单个可观察元素本身是否正确？",
    items: ["事件是否出现（Event Presence）", "声源是否正确（Source Identity）", "材质与属性（Material / Attribute）", "数量（Count）", "音色、纹理与音高（Timbre / Texture / Pitch）"],
  },
  {
    id: "LINE",
    title: "关系正确性",
    question: "元素之间的关系是否正确？",
    items: ["时间关系（Temporal）", "空间关系（Spatial）", "因果关系（Causal）", "交互关系（Interactive）", "动态对应（Dynamic Correspondence）"],
  },
  {
    id: "SCENE",
    title: "整体场景一致性",
    question: "多个元素共同形成的声音世界是否成立？",
    items: ["环境是否成立（Environment）", "空间是否可信（Spatial Plausibility）", "前景与背景（Foreground / Background）", "注意与显著性（Attention / Salience）", "叙事内声音一致性（Diegetic Consistency）"],
  },
] as const;

const evidenceRows = [
  ["Point 原子分解", "充分", "部分覆盖", "概念有文献支持"],
  ["Line 时间关系", "充分", "P06 / H2", "已有案例展示"],
  ["Line 动态关系", "发展中", "P01 / H3", "Mixed / Refined"],
  ["场景一致性（Scene Coherence）", "充分", "仅 P05 / P08", "项目证据有限"],
  ["PLS 与 Quality 分离", "相关文献", "5 个冻结案例", "初步案例支持"],
  ["Text→Visual 与 Visual→Audio", "多模态研究依据", "3→4→4 ×3", "项目派生扩展"],
  ["制作可用性（Production Utility）", "概念 / 邻近研究", "尚未测试", "后续研究"],
  ["偏好 / 奖励（Preference / Reward）", "邻近研究充分", "尚未测试", "后续研究"],
  ["Judge 可靠性（Judge Reliability）", "发展中", "尚未测试", "后续研究"],
] as const;

const researchQuestions = [
  ["RQ1", "Point → Line → Scene 是否呈现可测量的能力复杂度梯度？", "尚未测试（Not Tested）"],
  ["RQ2", "PLS 是否比单一整体分数更有利于失败定位（Failure Localization）？", "初步案例支持（Preliminary Case Support）"],
  ["RQ3", "PLS 偏好是否能够成为奖励信号（Reward Signal）？", "尚未测试 / 后续研究"],
  ["RQ4", "分离 Text→Visual 与 Visual→Audio 是否能够降低错误归因？", "初步案例证据"],
] as const;

const sources = [
  ["AudioScape-TTA", "结构化声景、事件与属性 rubric", "https://arxiv.org/abs/2608.04479"],
  ["AnyAudio-Judge", "独立、可验证的动态 rubric", "https://arxiv.org/abs/2606.03116"],
  ["Fine-Grained Feedback / S3Bench", "事件存在、时间顺序与偏好优化", "https://arxiv.org/abs/2607.13408"],
  ["MMAG", "Mixed Audio、语义与时间控制", "https://arxiv.org/abs/2608.06900"],
  ["AcoustiTrace", "声学生成、传播与接收的物理诊断", "https://arxiv.org/abs/2608.02035"],
] as const;

export default function PointLineSceneFrameworkPage() {
  return (
    <main className="t2a-page pls-page">
      <header className="t2a-topbar">
        <Link className="wordmark" href="/" aria-label="返回作品集首页">
          <span className="wordmark-mark" aria-hidden="true" />
          <span>DU MING / AUDIO</span>
        </Link>
        <nav aria-label="PLS 研究页导航">
          <Link href="/t2a-case-study">T2A</Link>
          <Link href="/audio-visual-evaluation">T2VA</Link>
          <a href="#framework">框架</a>
          <a href="#evidence">证据</a>
          <a href="#boundary">边界</a>
        </nav>
      </header>

      <section className="pls-hero t2a-shell">
        <div>
          <p className="eyebrow">评测框架 + 案例研究</p>
          <h1>Point<br />Line<br />Scene</h1>
        </div>
        <div className="pls-hero-copy">
          <p className="pls-kicker">面向生成式音频与音视频模型的分层感知评测框架</p>
          <p>先确认单个事件，再检查事件之间的关系和整个场景；音质另行判断。这样可以看清问题发生在哪一层，也方便设计下一轮回归。</p>
          <div className="pls-hero-actions">
            <a className="btn btn-primary" href="#framework">阅读框架</a>
            <a className="paper-link" href="/downloads/pls-framework/point_line_scene_framework_with_av_case_study.md" download>下载完整 Markdown</a>
          </div>
          <p className="pls-version">PLS v2.x · 文献支撑 · 方法论抽象 · AV 项目案例证据</p>
        </div>
      </section>

      <section className="pls-positioning" aria-labelledby="positioning-title">
        <div className="t2a-shell pls-positioning-grid">
          <div><p className="eyebrow">研究定位 / POSITIONING</p><h2 id="positioning-title">一套方法框架，一组案例证据</h2></div>
          <div><p>PLS 用来组织评测问题；两轮音视频生成评测（Audio-Visual Generation Evaluation）用来展示这套方法怎样进入失败定位、受控回归与研发优先级。16 个单次生成样本只提供案例证据，不承担框架有效性的统计验证。</p><strong>诊断性案例研究 ≠ 框架验证基准</strong></div>
        </div>
      </section>

      <section className="t2a-section t2a-shell" id="framework">
        <header className="t2a-section-heading">
          <p>01 / 分层框架</p>
          <h2>Point → Line → Scene</h2>
          <p>三层回答不同问题；Quality、物理 / 感知保真、制作可用性和 Judge Reliability 则作为跨层评价轴。</p>
        </header>
        <div className="pls-layer-grid">
          {layers.map((layer, index) => (
            <article key={layer.id}>
              <span>0{index + 1} / {layer.id}</span>
              <h3>{layer.title} <small>{layer.id[0] + layer.id.slice(1).toLowerCase()}</small></h3>
              <p>{layer.question}</p>
              <ul>{layer.items.map((item) => <li key={item}>{item}</li>)}</ul>
            </article>
          ))}
        </div>
        <div className="pls-axes">
          <span>语义保真（Semantic Fidelity）</span>
          <span>物理 / 感知保真（Physical / Perceptual Fidelity）</span>
          <span>制作可用性（Production Utility）· 后续研究</span>
          <span>Judge 可靠性（Judge Reliability）· 后续研究</span>
          <strong>Quality / OVL 独立呈现，不与 PLS 合成单一 Total Score</strong>
        </div>
      </section>

      <section className="t2a-section t2a-section-tint" id="sources">
        <div className="t2a-shell">
          <header className="t2a-section-heading"><p>02 / 三类来源</p><h2>文献、方法论与项目证据分开说明</h2></header>
          <div className="pls-source-types">
            <article><span>A</span><h3>文献支撑（Literature-supported）</h3><p>论文直接支持的细粒度 rubric、时间关系、结构化声景、物理约束与 Judge 研究。</p></article>
            <article><span>B</span><h3>PLS 方法论抽象（Conceptual Abstraction）</h3><p>Point、Line、Scene 的统一命名与层级组织，是作者的方法论抽象，不是既有行业标准。</p></article>
            <article><span>C</span><h3>项目案例证据（Project Case Evidence）</h3><p>冻结项目案例只说明本项目观察到什么，不能写成框架已经得到统计证明。</p></article>
          </div>
          <div className="pls-literature-list">
            {sources.map(([title, role, href]) => <a key={title} href={href} target="_blank" rel="noreferrer"><strong>{title}</strong><span>{role}</span><i aria-hidden="true">↗</i></a>)}
          </div>
        </div>
      </section>

      <section className="pls-reference-band" aria-labelledby="reference-title">
        <div className="t2a-shell pls-reference-layout">
          <div><p className="eyebrow">项目派生扩展</p><h2 id="reference-title">判断之前，先问“在和谁比较？”</h2><p>在音视频生成中，Prompt 与 Audio 不一致不能自动解释为 Audio Failure。需要先记录实际画面事实（Visual Fact），再判断 Audio 是否与画面一致。</p></div>
          <div className="pls-reference-chain" aria-label="多模态评价参考链">
            <div><span>指令保真 Instruction Fidelity</span><strong>Prompt</strong></div><b>→</b>
            <div><span>观察参照 Observed Reference</span><strong>Visual Fact</strong></div><b>→</b>
            <div><span>跨模态对应 Cross-modal Correspondence</span><strong>Audio Event</strong></div>
          </div>
        </div>
      </section>

      <section className="t2a-section t2a-shell" id="case-study">
        <header className="t2a-section-heading"><p>03 / 核心案例</p><h2>3→4→4 修正了错误归因</h2><p>P06、P10 与 R2-H1-B 三个可精确判定案例跨两轮重复出现同一诊断链。</p></header>
        <div className="pls-count-case">
          <div><span>Prompt</span><strong>3</strong><small>Instruction</small></div><i>→</i>
          <div className="pls-count-fail"><span>Visual</span><strong>4</strong><small>Text→Visual FAIL</small></div><i>→</i>
          <div className="pls-count-pass"><span>Audio</span><strong>4</strong><small>Visual→Audio PASS</small></div>
        </div>
        <div className="pls-case-conclusion"><strong>Repeated Diagnostic Pattern</strong><p>这是案例级证据，用于提高回归优先级；不是 Systematic Failure，也不说明模型内部一定先生成 video 再生成 audio。</p><Link className="paper-link" href="/audio-visual-evaluation">查看两轮 T2VA 案例 →</Link></div>
      </section>

      <section className="t2a-section t2a-section-tint" id="evidence">
        <div className="t2a-shell">
          <header className="t2a-section-heading"><p>04 / 证据状态</p><h2>不同主张，对应不同强度的证据</h2><p>文献、项目证据与后续研究分别说明，不把它们混写成同一种“已验证结论”。</p></header>
          <div className="table-wrap pls-evidence-table">
            <table><thead><tr><th>主张</th><th>文献支撑</th><th>项目证据</th><th>当前状态</th></tr></thead><tbody>
              {evidenceRows.map(([claim, literature, project, status]) => <tr key={claim}><th scope="row">{claim}</th><td>{literature}</td><td>{project}</td><td><strong>{status}</strong></td></tr>)}
            </tbody></table>
          </div>
        </div>
      </section>

      <section className="t2a-section t2a-shell" id="questions">
        <header className="t2a-section-heading"><p>05 / 研究问题</p><h2>哪些已有案例，哪些仍待测试</h2></header>
        <div className="pls-rq-list">
          {researchQuestions.map(([id, question, status]) => <article key={id}><span>{id}</span><h3>{question}</h3><strong>{status}</strong></article>)}
        </div>
      </section>

      <section className="t2a-section t2a-section-tint" id="boundary">
        <div className="t2a-shell">
          <header className="t2a-section-heading"><p>06 / 证据边界</p><h2>案例研究，不做统计泛化</h2></header>
          <div className="pls-boundary-grid">
            <article><strong>10 + 6</strong><h3>两轮单次生成样本</h3><p>Round-1 10 个，Round-2 6 个；没有 multi-seed statistical experiment。</p></article>
            <article><strong>UNEVALUABLE</strong><h3>H1-A 不进入计数证据集</h3><p>关键 Visual Fact 不清晰时，不重跑到得到想要的结果。</p></article>
            <article><strong>LIMITED</strong><h3>Scene 项目证据有限</h3><p>目前主要来自 P05、P08；Round-2 未进行系统 Scene 回归。</p></article>
            <article><strong>FUTURE</strong><h3>尚未测试的方向</h3><p>Production Utility、Preference / Reward、自动 Judge 与 inter-rater reliability。</p></article>
          </div>
          <p className="pls-audit-note">证据地图（Evidence Map）：7 项有项目案例支持 · 3 项为项目派生扩展 · 3 项仅属于后续研究 · 0 项无依据主张</p>
        </div>
      </section>

      <aside className="pls-research-note t2a-shell" aria-labelledby="research-note-title">
        <div>
          <p className="eyebrow">研究笔记 / RESEARCH NOTE</p>
          <h2 id="research-note-title">PLS 形成之前的声音世界组织思考</h2>
        </div>
        <div>
          <p>“点·线·面·境”记录了我从声音设计和游戏音频出发，对事件、关系、场景与整体表达的早期整理。它现在作为方法演进笔记保留，不与 PLS 评测框架并列。</p>
          <Link className="paper-link" href="/audio-world-framework">阅读早期研究笔记 →</Link>
        </div>
      </aside>

      <footer className="t2a-footer t2a-shell">
        <Link href="/">← 返回作品集</Link>
        <Link href="/t2a-case-study">T2A 评测</Link>
        <Link href="/audio-visual-evaluation">T2VA 评测</Link>
        <a href="/downloads/pls-framework/point_line_scene_framework_with_av_case_study.md" download>下载完整方法报告</a>
        <span>© 2026 杜明</span>
      </footer>
    </main>
  );
}

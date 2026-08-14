import type { Metadata } from "next";
import Link from "next/link";
import "../t2a-case-study/t2a-case-study.css";
import "./audio-visual-evaluation.css";

export const metadata: Metadata = {
  title: "Audio-Visual Generation Evaluation｜两轮诊断性评测",
  description:
    "杜明的 Audio-Visual Generation Evaluation：从 Bad Case Discovery 到 Controlled Regression，进行声画生成的失败定位与研发优先级判断。",
  keywords: ["Audio-Visual Generation Evaluation", "音视频生成评测", "Controlled Regression", "Bad Case", "声画评测"],
  alternates: { canonical: "/audio-visual-evaluation" },
};

const findings = [
  ["Exact-count Chain", "Repeated Diagnostic Pattern", "三个可精确判定案例均呈现 3→4→4：Text→Visual 数量约束偏差重复出现，而 Visual→Audio 事件数量保持一致。"],
  ["Onset Alignment", "Not Replicated", "Round-1 出现的 audio_early 未在 Round-2 专项条件中再次出现。"],
  ["Dynamic Correspondence", "Mixed / Refined", "大幅状态变化可以获得响应；连续、细粒度的运动动态仍需进一步拆分验证。"],
  ["Cross-shot Persistence", "Not Replicated", "No-cut 与 Planned-cut 条件下的持续声音均保持到结束，当前不支持“切镜必然导致声音丢失”。"],
  ["Audio Quality", "Persistent / Exploratory Concern", "即使声画关系正确，音色不稳定、响度失衡或噪声仍可能影响最终可用性。"],
] as const;

const engineeringActions = [
  ["3→4→4", "先查 Text→Visual 的数量约束与视觉事件规划", "不把视觉阶段的偏差误归因为 Audio Counting Failure。"],
  ["Onset · Not Replicated", "降低专项回归优先级，保留监测", "已发生的 Bad Case 仍有效，但当前证据不足以升级为稳定问题。"],
  ["Dynamic · Mixed / Refined", "转向连续运动与细粒度动态测试", "把粗粒度的“有无响应”细化为更可执行的诊断问题。"],
  ["Cross-shot · Not Replicated", "暂不以 Cut → Audio Loss 作为重点假设", "Round-2 的 A/B 验证未支持该因果归因。"],
  ["Quality Gate", "保留独立质量门槛", "Relation Correctness 不等于最终音频可直接使用。"],
] as const;

export default function AudioVisualEvaluationPage() {
  return (
    <main className="t2a-page av-page">
      <header className="t2a-topbar">
        <Link className="wordmark" href="/" aria-label="返回作品集首页">
          <span className="wordmark-mark" aria-hidden="true" />
          <span>DU MING / AUDIO</span>
        </Link>
        <nav aria-label="项目页导航">
          <Link href="/t2a-case-study">T2A评测</Link>
          <Link href="/point-line-scene-framework">PLS框架</Link>
          <a href="#method">方法</a>
          <a href="#results">结果</a>
          <a href="#boundary">边界</a>
          <Link href="/resume">关于我</Link>
        </nav>
      </header>

      <section className="av-hero t2a-shell" id="overview">
        <div className="av-hero-copy">
          <p className="eyebrow">AUDIO-VISUAL GENERATION EVALUATION</p>
          <h1>从 Bad Case Discovery<br />到 Controlled Regression</h1>
          <p className="av-hero-subtitle">面向生成式音视频的分层感知评测与失败定位</p>
          <p className="t2a-lead">这是一项两轮诊断性评测：第一轮发现问题，第二轮以预先定义的假设、观察字段与判定规则进行受控回归，最后把证据转成下一步的研发与评测优先级。</p>
          <div className="t2a-status-row" aria-label="项目概况">
            <strong>Cross-Round Analysis v1.0</strong>
            <span>2 Rounds</span>
            <span>16 Generated Samples</span>
            <span>Diagnostic PoC</span>
          </div>
        </div>
        <aside className="av-hero-facts" aria-label="核心研究框架">
          <p>核心问题</p>
          <strong>Prompt 要求 3 次，最终 Audio 出现 4 次——到底是哪一层发生了偏差？</strong>
          <dl>
            <div><dt>Prompt</dt><dd>3</dd></div>
            <div><dt>Visual</dt><dd className="av-fail">4 · FAIL</dd></div>
            <div><dt>Audio</dt><dd className="av-pass">4 · PASS</dd></div>
          </dl>
        </aside>
      </section>

      <section className="av-case-band" aria-labelledby="count-title">
        <div className="t2a-shell av-case-layout">
          <div>
            <p className="eyebrow">CORE CASE / EXACT-COUNT</p>
            <h2 id="count-title">3→4→4 不等于 Audio Counting Failure</h2>
          </div>
          <div className="av-chain" aria-label="Prompt、Visual、Audio 三阶段计数链">
            <div><span>Prompt</span><strong>3</strong></div>
            <i aria-hidden="true">→</i>
            <div className="av-chain-fail"><span>Visual</span><strong>4</strong><small>Text→Visual FAIL</small></div>
            <i aria-hidden="true">→</i>
            <div className="av-chain-pass"><span>Audio</span><strong>4</strong><small>Visual→Audio PASS</small></div>
          </div>
          <p className="av-case-note">P06、P10 与 R2-H1-B 三个可精确判定案例重复出现这一结构。它是一个 <b>Repeated Diagnostic Pattern</b>，用于提高回归优先级；不是对模型普遍缺陷的统计性宣称。</p>
        </div>
      </section>

      <section className="t2a-section t2a-shell" id="method">
        <header className="t2a-section-heading">
          <p>01 / METHOD</p>
          <h2>把“声音不对”拆成可定位的问题</h2>
          <p>框架按 Point → Line → Scene + Quality（点→线→场景+质量）组织：既观察单个事件是否正确，也观察事件之间的时间关系、整体场景与独立音频质量。</p>
        </header>
        <div className="av-method-flow" aria-label="评测方法流程">
          {[
            ["01", "Capability", "明确要验证的能力与研究问题。"],
            ["02", "Scenario", "设计能够观察该能力的生成场景。"],
            ["03", "Visual Facts", "先记录实际生成的视觉事实。"],
            ["04", "Point · Line · Scene", "判定事件、时序与场景声画关系。"],
            ["05", "Quality", "独立记录音色、响度、噪声等质量问题。"],
            ["06", "Bad Case → Regression", "把发现转成可检验的后续条件。"],
          ].map(([index, title, body]) => <article key={index}><span>{index}</span><h3>{title}</h3><p>{body}</p></article>)}
        </div>
        <div className="av-method-note"><strong>关键诊断原则</strong><div><p>Prompt→Visual 与 Visual→Audio 分开判断。只有视觉事件数与音频事件数不一致时，才将其归为 Audio Event Counting Failure。</p><Link href="/point-line-scene-framework">查看 Point–Line–Scene 理论框架 →</Link></div></div>
      </section>

      <section className="t2a-section t2a-section-tint" id="rounds">
        <div className="t2a-shell">
          <header className="t2a-section-heading"><p>02 / ROUND-1 → ROUND-2</p><h2>从问题发现到受控回归</h2><p>第二轮不是“再写几个 Prompt”，而是在生成前冻结要验证的问题、主要能力、观察字段与判定规则；结果再按 Support、Not Replicated 或 Mixed / Refined 解释。</p></header>
          <div className="av-rounds-grid">
            <article><span>ROUND-1</span><h3>Discovery</h3><p>从生成结果中确认某个 Bad Case 在当次输出中发生过。</p><ul><li>Exact-count</li><li><code>audio_early</code></li><li>Dynamic Response</li><li>Sustained Audio Interruption</li></ul></article>
            <div className="av-round-arrow" aria-hidden="true"><span>Hypothesis</span><b>→</b><span>Controlled Regression</span></div>
            <article><span>ROUND-2</span><h3>Controlled Regression</h3><p>在新条件中检查同类问题是否可以再次出现，并用结果调整优先级。</p><ul><li>Exact-count → Repeated</li><li>Onset → Not Replicated</li><li>Dynamic → Mixed / Refined</li><li>Cross-shot → Not Replicated</li></ul></article>
          </div>
        </div>
      </section>

      <section className="t2a-section t2a-shell" id="results">
        <header className="t2a-section-heading"><p>03 / CROSS-ROUND RESULTS</p><h2>五条冻结结论，各自保留证据边界</h2><p>这里呈现 Cross-Round Analysis v1.0 的结论层，而非重新评分或新增统计推断。</p></header>
        <div className="av-findings">
          {findings.map(([topic, verdict, detail]) => <article key={topic}><p>{topic}</p><h3>{verdict}</h3><span>{detail}</span></article>)}
        </div>
      </section>

      <section className="t2a-section t2a-section-tint" id="engineering">
        <div className="t2a-shell">
          <header className="t2a-section-heading"><p>04 / RESEARCH → ENGINEERING</p><h2>评测结果应改变下一步查什么、测什么</h2><p>评测不止输出分数；它把“观察到什么”翻译为研发排查顺序与后续验证方向。</p></header>
          <div className="av-engineering-list">
            {engineeringActions.map(([signal, action, detail]) => <article key={signal}><span>{signal}</span><h3>{action}</h3><p>{detail}</p></article>)}
          </div>
        </div>
      </section>

      <section className="t2a-section t2a-shell" id="boundary">
        <header className="t2a-section-heading"><p>05 / EVIDENCE BOUNDARY</p><h2>小样本诊断，不做统计泛化</h2></header>
        <div className="av-boundary-grid">
          <article><h3>它能说明什么</h3><p>哪些 Bad Case 在当前样本中发生过；哪些问题在受控条件下重复、未复现或需要细化；以及研发与下一轮测试应优先关注什么。</p></article>
          <article><h3>它不说明什么</h3><p>不推断模型内部生成机制，不把三例重复模式称为系统性缺陷，也不把未复现解释为 Round-1 的观察无效。</p></article>
          <article><h3>评测纪律</h3><p>Bad Sample 是可观察到的失败；Invalid / Unevaluable Sample 则不被重跑到“得到想要的结果”。判定规则应在生成结果出现之前定义。</p></article>
        </div>
      </section>

      <footer className="t2a-footer t2a-shell"><Link href="/">← 返回杜明音频作品集</Link><Link href="/t2a-case-study">查看 T2A 评测案例</Link><Link href="/point-line-scene-framework">查看 PLS 理论报告</Link><span>© 2026 杜明</span></footer>
    </main>
  );
}

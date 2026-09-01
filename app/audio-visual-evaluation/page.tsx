import type { Metadata } from "next";
import Link from "next/link";
import "../t2a-case-study/t2a-case-study.css";
import "./audio-visual-evaluation.css";

export const metadata: Metadata = {
  title: "音视频生成诊断评测｜Audio-Visual Generation Evaluation",
  description:
    "杜明的音视频生成诊断评测：从失败案例（Bad Case）发现到受控回归（Controlled Regression），进行声画生成的失败定位与研发优先级判断。",
  keywords: ["Audio-Visual Generation Evaluation", "音视频生成评测", "Controlled Regression", "Bad Case", "声画评测"],
  alternates: { canonical: "/audio-visual-evaluation" },
};

const findings = [
  ["精确计数（Exact-count）", "重复诊断模式（Repeated Diagnostic Pattern）", "三个可精确判定案例均呈现 3→4→4：文本 → 画面数量约束偏差重复出现，而画面 → 音频事件数量保持一致。"],
  ["起点对齐（Onset Alignment）", "未复现（Not Replicated）", "第一轮出现的音频提前（audio_early）未在第二轮专项条件中再次出现。"],
  ["动态对应（Dynamic Correspondence）", "部分成立 / 需细化（Mixed / Refined）", "大幅状态变化可以获得响应；连续、细粒度的运动动态仍需进一步拆分验证。"],
  ["跨镜头持续性（Cross-shot Persistence）", "未复现（Not Replicated）", "无切镜与计划切镜条件下的持续声音均保持到结束，当前不支持“切镜必然导致声音丢失”。"],
  ["音频质量（Audio Quality）", "持续 / 探索性关注（Persistent / Exploratory Concern）", "即使声画关系正确，音色不稳定、响度失衡或噪声仍可能影响最终可用性。"],
] as const;

const engineeringActions = [
  ["3→4→4", "先查文本 → 画面的数量约束与视觉事件规划", "不把视觉阶段的偏差误归因为音频计数失败。"],
  ["起点 · 未复现", "降低专项回归优先级，保留监测", "已发生的失败案例仍有效，但当前证据不足以升级为稳定问题。"],
  ["动态 · 部分成立 / 需细化", "转向连续运动与细粒度动态测试", "把粗粒度的“有无响应”细化为更可执行的诊断问题。"],
  ["跨镜头 · 未复现", "暂不以切镜 → 音频丢失作为重点假设", "第二轮的 A/B 验证未支持该因果归因。"],
  ["质量门槛（Quality Gate）", "保留独立质量门槛", "关系正确不等于最终音频可直接使用。"],
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
          <Link className="topbar-mobile-only" href="/">首页</Link>
          <Link className="topbar-desktop-only" href="/t2a-case-study">T2A 评测</Link>
          <Link className="topbar-desktop-only" href="/point-line-scene-framework">PLS 方法</Link>
          <a className="topbar-desktop-only" href="#method">方法</a>
          <a href="#results">结果</a>
          <a className="topbar-desktop-only" href="#boundary">边界</a>
          <Link href="/resume">简历</Link>
        </nav>
      </header>

      <section className="av-hero t2a-shell" id="overview">
        <div className="av-hero-copy">
          <p className="eyebrow">主项目 / PRIMARY CASE</p>
          <h1>音视频生成<br />诊断评测</h1>
          <p className="av-hero-title-en">Audio-Visual Generation Evaluation</p>
          <p className="av-hero-subtitle">从失败案例发现（Bad Case Discovery）到受控回归（Controlled Regression）</p>
          <p className="t2a-lead">这是一项两轮诊断性评测：第一轮发现问题，第二轮以预先定义的假设、观察字段与判定规则进行受控回归，最后把证据转成下一步的研发排查与评测优先级。</p>
          <div className="t2a-status-row" aria-label="项目概况">
            <strong>Cross-Round Analysis v1.0</strong>
            <span>2 轮</span>
            <span>16 个生成样本</span>
            <span>诊断性 PoC</span>
          </div>
        </div>
        <aside className="av-hero-facts" aria-label="核心研究框架">
          <p>核心问题</p>
          <strong>文本提示（Prompt）要求 3 次，画面（Visual）与音频（Audio）均呈现 4 次：偏差应归入哪一段评价链？</strong>
          <dl>
            <div><dt>文本提示（Prompt）</dt><dd>3</dd></div>
            <div><dt>画面（Visual）</dt><dd className="av-fail">4 · 失败</dd></div>
            <div><dt>音频（Audio）</dt><dd className="av-pass">4 · 通过</dd></div>
          </dl>
        </aside>
      </section>

      <section className="av-case-band" aria-labelledby="count-title">
        <div className="t2a-shell av-case-layout">
          <div>
            <p className="eyebrow">核心案例 / EXACT-COUNT</p>
            <h2 id="count-title">3→4→4 不等于音频计数失败（Audio Counting Failure）</h2>
          </div>
          <div className="av-chain" aria-label="Prompt、Visual、Audio 三阶段计数链">
            <div><span>文本提示（Prompt）</span><strong>3</strong></div>
            <i aria-hidden="true">→</i>
            <div className="av-chain-fail"><span>画面（Visual）</span><strong>4</strong><small>文本 → 画面：失败（FAIL）</small></div>
            <i aria-hidden="true">→</i>
            <div className="av-chain-pass"><span>音频（Audio）</span><strong>4</strong><small>画面 → 音频：通过（PASS）</small></div>
          </div>
          <p className="av-case-note">P06、P10 与 R2-H1-B 三个可精确判定案例重复出现这一结构。它是一个<b>重复诊断模式（Repeated Diagnostic Pattern）</b>，用于提高回归优先级；不是对模型普遍缺陷的统计性宣称。</p>
        </div>
      </section>

      <section className="t2a-section t2a-shell av-media-section" id="media-evidence" aria-labelledby="media-evidence-title">
        <header className="t2a-section-heading">
          <p>01 / 视频证据</p>
          <h2 id="media-evidence-title">先看生成结果，再看诊断结论</h2>
          <p>这里只展示两个代表性样本。视频不自动播放，评分与结论来自已冻结的 Round-2 记录。</p>
        </header>
        <div className="av-media-grid">
          <figure className="av-media-card">
            <video controls preload="metadata" playsInline aria-label="R2-H1-B 木筷敲陶瓷杯计数案例">
              <source src="/video/t2va/R2-H1-B.mp4" type="video/mp4" />
              当前浏览器不支持视频播放。
            </video>
            <figcaption>
              <div className="av-media-heading"><span>R2-H1-B · 精确计数（Exact-count）</span><strong>3→4→4</strong></div>
              <p>Prompt 条件：木筷敲陶瓷杯，恰好 3 次。实际画面与音频均为 4 次。</p>
              <div className="av-verdict-row"><b className="is-fail">文本 → 画面：失败（FAIL）</b><b className="is-pass">画面 → 音频：通过（PASS）</b><b>P4 事件计数（Event Counting）：5 / 5</b></div>
            </figcaption>
          </figure>
          <figure className="av-media-card">
            <video controls preload="metadata" playsInline aria-label="R2-H3 吸尘器动态对应案例">
              <source src="/video/t2va/R2-H3.mp4" type="video/mp4" />
              当前浏览器不支持视频播放。
            </video>
            <figcaption>
              <div className="av-media-heading"><span>R2-H3 · 动态对应（Dynamic Correspondence）</span><strong>部分成立 / 需细化</strong></div>
              <p>吸尘器持续运行，门从关闭到打开；开门后出现明显响应，但持续运动的声学变化较为阶跃。</p>
              <div className="av-verdict-row"><b className="is-pass">边界响应（Boundary Response）：存在</b><b className="is-mixed">声源运动跟随（Source-motion Tracking）：部分问题</b><b>L4 动态对应：3 / 5</b></div>
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="t2a-section t2a-shell" id="method">
        <header className="t2a-section-heading">
          <p>02 / 方法</p>
          <h2>把“声音不对”拆成可定位的问题</h2>
          <p>框架按点（Point）→ 线（Line）→ 面（Scene）+ 独立质量（Quality）组织：既观察单个事件是否正确，也观察事件之间的时间关系、整体场景与独立音频质量。</p>
        </header>
        <div className="av-method-flow" aria-label="评测方法流程">
          {[
            ["01", "能力项（Capability）", "明确要验证的能力与研究问题。"],
            ["02", "评测场景（Scenario）", "设计能够观察该能力的生成场景。"],
            ["03", "画面事实（Visual Facts）", "先记录实际生成的视觉事实。"],
            ["04", "点、线、面（PLS）", "判定事件、时序与整体场景的声画关系。"],
            ["05", "独立质量（Quality）", "独立记录音色、响度、噪声等质量问题。"],
            ["06", "失败案例 → 回归", "把发现转成可检验的后续条件。"],
          ].map(([index, title, body]) => <article key={index}><span>{index}</span><h3>{title}</h3><p>{body}</p></article>)}
        </div>
        <div className="av-method-note"><strong>关键诊断原则</strong><div><p>文本 → 画面与画面 → 音频分开判断。只有视觉事件数与音频事件数不一致时，才将其归为音频事件计数失败。PLS 负责关系诊断；信号诊断（Signal Diagnostics）作为音频输出的补充证据层。</p><Link href="/point-line-scene-framework#evaluation-system">查看完整评测系统 →</Link></div></div>
      </section>

      <section className="t2a-section t2a-section-tint" id="rounds">
        <div className="t2a-shell">
          <header className="t2a-section-heading"><p>03 / 第一轮 → 第二轮</p><h2>从问题发现到受控回归</h2><p>第二轮在生成前冻结假设、主要能力、观察字段与判定规则，并按预设解释规则进行回归判断。</p></header>
          <div className="av-rounds-grid">
            <article><span>第一轮（ROUND 1）</span><h3>问题发现（Discovery）</h3><p>从生成结果中确认某个失败案例在当次输出中发生过。</p><ul><li>精确计数</li><li>音频提前（<code>audio_early</code>）</li><li>动态响应</li><li>持续音频中断</li></ul></article>
            <div className="av-round-arrow" aria-hidden="true"><span>假设</span><b>→</b><span>受控回归</span></div>
            <article><span>第二轮（ROUND 2）</span><h3>受控回归（Controlled Regression）</h3><p>在新条件中检查同类问题是否可以再次出现，并用结果调整优先级。</p><ul><li>精确计数 → 重复</li><li>起点 → 未复现</li><li>动态 → 部分成立 / 需细化</li><li>跨镜头 → 未复现</li></ul></article>
          </div>
        </div>
      </section>

      <section className="t2a-section t2a-shell" id="results">
        <header className="t2a-section-heading"><p>04 / 跨轮结果</p><h2>五条冻结结论，各自保留证据边界</h2><p>这里呈现 Cross-Round Analysis v1.0 的结论层，而非重新评分或新增统计推断。</p></header>
        <div className="av-findings">
          {findings.map(([topic, verdict, detail], index) => <article key={topic} className={index === 0 ? "av-finding-primary" : undefined}><p>{topic}</p><h3>{verdict}</h3><span>{detail}</span></article>)}
        </div>
      </section>

      <section className="t2a-section t2a-section-tint" id="engineering">
        <div className="t2a-shell">
          <header className="t2a-section-heading"><p>05 / 研究 → 工程</p><h2>将评测结论转化为研发排查与回归优先级</h2><p>把样本观察转换为可执行的排查顺序、回归条件与后续验证方向。</p></header>
          <div className="av-engineering-list">
            {engineeringActions.map(([signal, action, detail]) => <article key={signal}><span>{signal}</span><h3>{action}</h3><p>{detail}</p></article>)}
          </div>
        </div>
      </section>

      <section className="t2a-section t2a-shell" id="boundary">
        <header className="t2a-section-heading"><p>06 / 证据边界</p><h2>小样本诊断，不做统计泛化</h2></header>
        <div className="av-boundary-grid">
          <article><h3>可支持的结论</h3><p>记录当前样本中发生的失败案例，并区分跨轮重复、未复现与需要细化的问题，用于确定后续回归优先级。</p></article>
          <article><h3>范围之外</h3><p>不推断模型内部生成机制；三个精确计数案例属于重复诊断模式，不作系统性缺陷或总体性能结论。</p></article>
          <article><h3>评测纪律</h3><p>保留坏样本中的可观察失败；无效或无法评测的样本不进入对应证据集。判定规则在生成结果出现前定义。</p></article>
        </div>
      </section>

      <footer className="t2a-footer t2a-shell"><Link href="/">← 返回作品集首页</Link><Link href="/t2a-case-study">查看 T2A 评测案例</Link><Link href="/point-line-scene-framework">查看 PLS 评测方法</Link><span>© 2026 杜明</span></footer>
    </main>
  );
}

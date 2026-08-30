import type { Metadata } from "next";
import Link from "next/link";
import { siteCopy } from "../../src/data/siteCopy";
import { t2aRelease } from "../data/t2aRelease";
import "./t2a-case-study.css";

export const metadata: Metadata = {
  title: "T2A音效生成评测｜SAO1与Stable Audio 3 Medium",
  description: "杜明的 T2A 音效生成评测案例：人工听评、评分标准、隐藏重复、Bad Case 分析与受控模型比较。",
  keywords: ["AI 音频评测", "生成式音频评测", "Text-to-Audio", "音效生成", "Bad Case", "人工听评"],
  alternates: { canonical: "/t2a-case-study" },
};

const rubric = [
  ["5", "自然、完整，可直接作为候选音效使用。", "核心声源、事件、属性、次数和时序基本全部满足。"],
  ["4", "整体可用，只有轻微瑕疵或局部不自然。", "核心语义正确，只有轻微属性或细节偏差。"],
  ["3", "可以辨认，但存在明显质量问题，需要筛选或修改。", "主体相关，但缺少一项重要要求。"],
  ["2", "多处明显问题，使用价值较低。", "仅部分相关，关键声源或事件结构存在明显偏差。"],
  ["1", "严重失真、声源不可辨认或不具备使用价值。", "与Prompt基本无关，或核心声源错误。"],
] as const;

const cases = [
  { id: "C01 / B0008", title: "正向参照", score: "OVL 5 · REL 5 · pass", note: "音频质量与核心事件要求均满足。", audio: "/audio/B0008.mp3" },
  { id: "C02 / B0152", title: "空间方向反向", score: "OVL 4 · REL 1 · keep_as_badcase", note: "Prompt要求左→右，人工听感为右→左。", audio: "/audio/B0152.mp3" },
  { id: "C03 / B0099", title: "事件数量不符", score: "Primary Bad Case · wrong_count", note: "目标事件结构之外出现重复撞击。", audio: "/audio/B0099.mp3" },
  { id: "C04 / B0092", title: "声源不符", score: "OVL 1 · REL 1 · needs_regeneration", note: "目标声源未能确认，输出主要呈现难以辨认的杂音。", audio: "/audio/B0092.mp3" },
] as const;

export default function T2AEvaluationProgramPage() {
  const { evaluation, links } = siteCopy;
  const { phase2 } = t2aRelease;

  return (
    <main className="t2a-page">
      <header className="t2a-topbar">
        <Link className="wordmark" href="/" aria-label="返回作品集首页">
          <span className="wordmark-mark" aria-hidden="true" />
          <span>DU MING / AUDIO</span>
        </Link>
        <nav aria-label="主导航">
          <Link href="/t2a-case-study">评测案例</Link>
          <Link href="/#sound-practice">声音实践</Link>
          <Link href="/resume">关于我</Link>
        </nav>
      </header>

      <section className="t2a-program-hero t2a-shell" id="overview">
        <div>
          <p className="eyebrow">T2A EVALUATION CASE STUDY</p>
          <h1>听起来好，<br />不等于生成正确</h1>
          <p className="t2a-program-subtitle">我如何从Stable Audio Open 1.0单模型PoC出发，完成SAO1与Stable Audio 3 Medium的受控音效评测。</p>
          <p className="t2a-lead">我把音频质量、Prompt符合度和具体错误分开记录。结果不只回答“平均分是多少”，也回答“模型在哪类要求上容易出错”。</p>
          <div className="t2a-hero-actions">
            <a href="#results">查看模型比较</a>
            <a href="#cases">试听评分案例</a>
            <a href={links.currentReportHref} download>下载完整报告</a>
          </div>
        </div>
      </section>

      <section className="t2a-scale-strip" aria-label="项目规模">
        <div><strong>2</strong><span>评测阶段</span><small>PoC + 受控比较</small></div>
        <div><strong>600</strong><span>正式样本 · 累计</span><small>不是统一三臂实验</small></div>
        <div><strong>400</strong><span>Phase 2正式比较</span><small>SAO1与SA3M</small></div>
        <div><strong>40</strong><span>隐藏重复配对</span><small>单一评测人复测</small></div>
      </section>

      <section className="t2a-section t2a-shell" id="rubric">
        <header className="t2a-section-heading">
          <p>01 / SCORING</p>
          <h2>先判断声音质量，再判断内容是否正确</h2>
          <p>OVL在不看Prompt时判断音频本身；REL在显示英文Prompt后判断声源、事件和结构是否符合要求。</p>
        </header>
        <div className="t2a-question-grid">
          <article><span>OVL</span><h3>整体质量</h3><p>是否自然、完整、清晰，并具备实际使用价值。</p></article>
          <article><span>REL</span><h3>语义符合度</h3><p>声源、属性、次数、时序和空间要求是否被满足。</p></article>
          <article><span>BADCASE</span><h3>事件级诊断</h3><p>将声源、属性、数量、子事件和伪影分开记录。</p></article>
        </div>
        <div className="table-wrap t2a-rubric-table">
          <table><thead><tr><th>分数</th><th>OVL：整体质量</th><th>REL：文本—音频符合度</th></tr></thead><tbody>
            {rubric.map(([score, ovl, rel]) => <tr key={score}><th scope="row">{score}</th><td>{ovl}</td><td>{rel}</td></tr>)}
          </tbody></table>
        </div>
      </section>

      <section className="t2a-section t2a-section-tint" id="protocol">
        <div className="t2a-shell">
          <header className="t2a-section-heading"><p>02 / LISTENING PROTOCOL</p><h2>先盲听，再阅读Prompt</h2><p>正式听评在安静室内完成。系统音量保持不变，但未进行标准化声压级校准。</p></header>
          <ol className="t2a-protocol-steps">
            <li><span>01</span><div><strong>Blind ID</strong><p>隐藏模型与样本信息，避免先验判断影响评分。</p></div></li>
            <li><span>02</span><div><strong>先评OVL</strong><p>不看Prompt，可重复播放，只判断音频自身质量。</p></div></li>
            <li><span>03</span><div><strong>再评REL</strong><p>显示英文Prompt，复听后判断内容是否正确。</p></div></li>
            <li><span>04</span><div><strong>填写诊断</strong><p>复听后记录事件级问题，并完成最终人工裁决。</p></div></li>
          </ol>
          <div className="t2a-listening-protocol">
            <div><span>播放链路</span><strong>Adobe Audition · MOTU M4 · DT 770 PRO X</strong><p>安静室内完成听评。</p></div>
            <div><span>会话安排</span><strong>每轮约30条 · 约45分钟</strong><p>轮间休息约15分钟，分两天完成。</p></div>
            <div><span>边界</span><strong>单一评测人</strong><p>隐藏重复用于检查同一评测人的复测稳定性，不代表多人一致性。</p></div>
          </div>
          <div className="t2a-role-grid">
            <article><h3>本人完成</h3><p>五层框架、评分标准、200条 Phase 1 正式听评、复测、Bad Case 语义裁决与报告审核。</p></article>
            <article><h3>AI辅助</h3><p>脚本执行、数据整理、统计实现和表格编排；所有正式评分、复测和最终裁决均由本人完成。</p></article>
          </div>
        </div>
      </section>

      <section className="t2a-section t2a-shell" id="results">
        <header className="t2a-section-heading"><p>03 / CONTROLLED COMPARISON</p><h2>当前测试集未观察到明确的总体优势方向</h2><p>{evaluation.phase2.conclusion}</p></header>
        <div className="t2a-model-grid">
          {phase2.models.map((model) => <article key={model.id}><span>{model.id}</span><h3>{model.name}</h3><dl><div><dt>OVL</dt><dd>{model.ovl.toFixed(3)}</dd></div><div><dt>REL</dt><dd>{model.rel.toFixed(3)}</dd></div><div><dt>正式样本</dt><dd>{model.formalN}</dd></div></dl></article>)}
        </div>
        <p className="t2a-result-boundary">比较使用同一组40条Prompt的五次生成重复。结果只适用于当前测试集与该听评流程，不用于推断模型的内部机制。</p>
      </section>

      <section className="t2a-section t2a-section-tint" id="badcase">
        <div className="t2a-shell">
          <header className="t2a-section-heading"><p>04 / BADCASE</p><h2>总体分数之外，还要看模型具体错在哪里</h2><p>以下观察描述当前输出行为，不归因于训练数据、模型结构或采样机制。</p></header>
          <div className="t2a-badcase-summary">
            <article><span>声源错误</span><strong>SA3M 14.5% · SAO1 6.5%</strong><p>SA3M在当前样本中更常出现目标声源或属性不符。</p></article>
            <article><span>显式数量错误</span><strong>SA3M 42.5% · SAO1 60.0%</strong><p>仅在8条明确要求事件数量的Prompt中统计。</p></article>
            <article><span>子事件缺失</span><strong>SA3M 37.5% · SAO1 33.8%</strong><p>仅在16条复合事件Prompt中统计。</p></article>
          </div>
          <p className="t2a-footnote">后两项是基于相应Prompt子集的事后条件分析，用于选择下一轮专项复测，不作为预注册的总体错误率。</p>
        </div>
      </section>

      <section className="t2a-section t2a-shell" id="repeat">
        <header className="t2a-section-heading"><p>05 / HIDDEN REPEATS</p><h2>隐藏重复检查同一评测人的复测稳定性</h2><p>20条隐藏重复不进入正式统计。Phase 2使用40对隐藏重复进行主分析。</p></header>
        <div className="t2a-retest-grid">
          <article><strong>{evaluation.repeats.ovl}</strong><span>OVL within-one</span></article>
          <article><strong>{evaluation.repeats.rel}</strong><span>REL within-one</span></article>
          <article><strong>{evaluation.repeats.decision}</strong><span>人工决策一致</span></article>
          <article><strong>{evaluation.repeats.primary}</strong><span>Primary Bad Case 一致</span></article>
        </div>
        <p className="t2a-callout">{evaluation.repeats.detail}</p>
      </section>

      <section className="t2a-section t2a-section-tint" id="cases">
        <div className="t2a-shell">
          <header className="t2a-section-heading"><p>06 / LISTENING EXAMPLES</p><h2>评分与问题类型可以回到单条音频复听</h2><p>四条10秒案例用于展示正向参照、方向、数量和声源问题。</p></header>
          <div className="t2a-audio-grid">
            {cases.map((item) => <article key={item.id}><span>{item.id}</span><h3>{item.title}</h3><strong className="t2a-scoreline">{item.score}</strong><p>{item.note}</p><audio controls preload="none" aria-label={`${item.id} ${item.title}试听音频`}><source src={item.audio} type="audio/mpeg" />你的浏览器不支持音频播放。</audio></article>)}
          </div>
        </div>
      </section>

      <section className="t2a-section t2a-shell t2a-details-section" aria-labelledby="details-title">
        <header className="t2a-section-heading"><p>SUPPORTING MATERIALS</p><h2 id="details-title">需要时再展开查看方法与版本材料</h2></header>
        <details className="t2a-collapsible">
          <summary>统计与结果复核</summary>
          <div><p>主比较以40条Prompt为成对分析单位。Bootstrap、Wilcoxon、历史桥接和同一Prompt五次生成中的问题持续性，均作为补充复核材料。</p><p>持续性用于区分偶发输出与重复出现的问题：同一标签在五次生成中出现4–5次时，可优先纳入专项回归Prompt。</p></div>
        </details>
        <details className="t2a-collapsible">
          <summary>客观指标与方法边界</summary>
          <div><p>早期 Acoustic Diagnostics（声学诊断）从文件、频谱、空间与能量等角度检查解码、声道和响度风险。客观指标只用于定位与复听，不替代人工语义裁决。</p><p>CLAP仅作前5秒工作流的边界检查，未显示与人工评分的有效单调关系。完整七类FAD/JS保持NOT RUN。</p><p><Link href="/point-line-scene-framework#evaluation-system">查看自动声学诊断如何补充主观听评 →</Link></p></div>
        </details>
        <details className="t2a-collapsible">
          <summary>版本与审计记录</summary>
          <div><p>{siteCopy.auditTrustLine.body}</p><p>{siteCopy.auditTrustLine.status}</p><a href={links.auditRecordHref} download>下载审计说明</a><a href={links.currentReportHref} download>下载当前报告</a></div>
        </details>
      </section>

      <footer className="t2a-footer t2a-shell"><Link href="/">← 返回杜明音频作品集</Link><span>© 2026 杜明</span></footer>
    </main>
  );
}

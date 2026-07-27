import type { Metadata } from "next";
import Link from "next/link";
import { auditRecordHref, currentReportHref, t2aRelease } from "../data/t2aRelease";
import { conditionalBadcases, globalBadcases } from "../data/t2aBadcases";
import CopyAuditHash from "./CopyAuditHash";
import "./t2a-case-study.css";

export const metadata: Metadata = {
  title: "T2A 音效生成评测｜SAO1 vs Stable Audio 3 Medium｜杜明",
  description:
    "两阶段 T2A 音效评测案例：600 条累计正式样本、SAO1 与 Stable Audio 3 Medium 受控比较、人工 OVL/REL、事件级 Badcase、隐藏重复与代码数据复核。",
  keywords: ["AI 音频评测", "生成式音频评测", "Text-to-Audio", "音效生成", "Stable Audio", "Badcase", "人工听评", "OVL", "REL"],
  alternates: { canonical: "/t2a-case-study" },
  openGraph: {
    title: "T2A Evaluation Program · Controlled SAO1–SA3M Comparison",
    description: "两阶段 T2A 音效评测、受控模型比较、事件级 Badcase、隐藏重复与代码数据复核。",
  },
  twitter: {
    card: "summary_large_image",
    title: "T2A Evaluation Program · Controlled SAO1–SA3M Comparison",
    description: "两阶段 T2A 音效评测、受控模型比较、事件级 Badcase、隐藏重复与代码数据复核。",
  },
};

const layers = [
  ["L1", "文件", "解码、时长、静音、削波与端点风险"],
  ["L2", "频率", "STFT、频谱特征与频段能量"],
  ["L3", "空间", "声道能量、相关性、相位风险与声像"],
  ["L4", "能量", "LUFS、True Peak、LRA 与动态余量"],
  ["L5", "感知", "人工 OVL / REL、事件级诊断与最终裁决"],
] as const;

const historicalCases = [
  { id: "C01 / B0008", sample: "MEC_006_S0123", title: "正向参照", score: "OVL 5 · REL 5 · pass", note: "音频质量与核心事件要求均满足。", audio: "/audio/B0008.wav" },
  { id: "C02 / B0152", sample: "MEC_005_S0456", title: "空间方向反向", score: "OVL 4 · REL 1 · keep_as_badcase", note: "Prompt 要求左→右，人工听感为右→左。", audio: "/audio/B0152.wav" },
  { id: "C03 / B0099", sample: "WPN_004_S0042", title: "目标事件结构外重复", score: "Primary Badcase · wrong_count", note: "Prompt 描述一次双剑碰撞，随后一把剑落地并在石面发声；输出出现超出目标事件结构的重复撞击，历史人工裁决保留为 wrong_count。", audio: "/audio/B0099.wav" },
  { id: "C04 / B0092", sample: "NAT_006_S0042", title: "声源不符", score: "OVL 1 · REL 1 · needs_regeneration", note: "目标声源未能确认，输出主要呈现难以辨认的杂音。", audio: "/audio/B0092.wav" },
] as const;

const downloads = [
  ["当前项目报告", currentReportHref, "v3.2.3 r2 研究结果与 audit r3 修订口径。"],
  ["复算审查说明", auditRecordHref, "审查范围、复现方式、方法边界与安全说明。"],
  ["Audit revision notes", "/downloads/t2a-v3-evidence/T2A_Audit_Revision_Notes_r3.md", "r3 整改内容及未修改人工判断的声明。"],
  ["受控比较摘要", "/downloads/t2a-v3-evidence/controlled_comparison_summary_v3.2.3_r3.json", "模型均值、差值、Bootstrap 与版本信息。"],
  ["条件 Badcase 表", "/downloads/t2a-v3-evidence/badcase_conditional_rate_v3.2.3.csv", "Prompt-conditioned sample-level label rates。"],
  ["复测一致性表", "/downloads/t2a-v3-evidence/repeat_consistency_v3.2.3.csv", "全 40 对及 gap≥30 敏感性分析。"],
  ["Persistence 数据", "/downloads/t2a-v3-evidence/badcase_persistence_960.csv", "标签在五次生成重复中的持续性记录。"],
  ["公开审计包", "/downloads/t2a-v3-evidence/T2A_v3.2.3_r2_audit_r3.zip", "冻结证据、派生表、验证脚本与 Manifest。"],
] as const;

function pct([n, d]: readonly number[]) {
  return `${((n / d) * 100).toFixed(1)}%`;
}

export default function T2AEvaluationProgramPage() {
  const { phase1, phase2, repeatConsistency, historicalBridge, auditSha256 } = t2aRelease;

  return (
    <main className="t2a-page">
      <header className="t2a-topbar">
        <Link className="wordmark" href="/" aria-label="返回作品集首页">
          <span className="wordmark-mark" aria-hidden="true" />
          <span>DU MING / T2A EVALUATION</span>
        </Link>
        <nav aria-label="T2A 页面导航">
          <a href="#overview">总览</a><a href="#evolution">演进</a><a href="#protocol">设计</a>
          <a href="#results">结果</a><a href="#badcase">Badcase</a><a href="#repeat">复测</a>
          <a href="#audit">审计</a><a href="#cases">案例</a>
        </nav>
      </header>

      <section className="t2a-program-hero t2a-shell" id="overview">
        <div>
          <p className="eyebrow">T2A EVALUATION PROGRAM · RESEARCH RELEASE</p>
          <h1>T2A 音效生成评测：两阶段方法与结果</h1>
          <p className="t2a-program-subtitle">Stable Audio Open 1.0 历史 PoC<br />与 SAO1–Stable Audio 3 Medium 受控模型比较</p>
          <p className="t2a-lead">项目分为两个阶段：Phase 1 建立单模型评测流程，Phase 2 在同一组 Prompt 和听评协议下比较 SAO1 与 Stable Audio 3 Medium。分析分别覆盖整体质量、语义符合度、事件级错误、生成稳定性与复测一致性。</p>
          <div className="t2a-status-row" aria-label="发布状态">
            <span>{t2aRelease.researchVersion}</span><span>audit {t2aRelease.auditRevision}</span>
            <strong>复算检查 {t2aRelease.auditVerdict}</strong><span>{t2aRelease.scale.evaluator}</span>
          </div>
          <div className="t2a-hero-actions">
            <a href={currentReportHref} download>下载当前报告</a>
            <a href="#audit">查看审计记录</a>
            <Link href="/">返回首页</Link>
          </div>
        </div>
      </section>

      <section className="t2a-scale-strip" aria-label="项目累计规模">
        <div><strong>{t2aRelease.scale.phases}</strong><span>评测阶段</span><small>历史 PoC + 受控比较</small></div>
        <div><strong>{t2aRelease.scale.formalCumulative}</strong><span>正式样本 · 累计</span><small>三批生成数据</small></div>
        <div><strong>{t2aRelease.scale.listeningEventsCumulative}</strong><span>试听事件 · 累计</span><small>含两阶段隐藏重复</small></div>
        <div><strong>{t2aRelease.scale.phase2Formal}</strong><span>Phase 2</span><small>正式受控比较</small></div>
      </section>
      <p className="t2a-scope-warning t2a-shell">600 条正式样本是两阶段累计规模，不是一轮统一的 600 条三臂实验。H1 与 C1 仅作非等价历史桥接；C1 与 C2 才构成正式受控模型比较。</p>

      <section className="t2a-section t2a-shell" id="evolution">
        <header className="t2a-section-heading"><p>01 / RESEARCH EVOLUTION</p><h2>从方法建立到受控模型比较</h2></header>
        <div className="t2a-timeline">
          <article><span>Phase 1 · H1</span><h3>SAO1 Historical PoC</h3><strong>200 formal + 20 hidden</strong><p>建立 40 Prompt、OVL / REL、五层诊断、Blind ID、事件级 Badcase 与 CLAP 边界验证。</p></article>
          <article><span>Phase 2 · C1 + C2</span><h3>Controlled Comparison</h3><strong>400 formal + 40 hidden</strong><p>SAO1 regenerated 与 SA3M 同协议联合盲评；完成 paired Bootstrap、Wilcoxon、Badcase 与 Persistence。</p></article>
          <article><span>Capability refinement</span><h3>41 requirement rows</h3><strong>40 prompts</strong><p>人工审核要求表包含部分复合事件拆分；不是 41 个完整分解事件。</p></article>
          <article><span>Audit r3</span><h3>代码与数据复算</h3><strong>Codex review · APPROVED</strong><p>核对 Manifest、冻结文件哈希、统计复算、复测配对与公开包安全检查。</p></article>
        </div>
      </section>

      <section className="t2a-section t2a-section-tint" aria-labelledby="questions-title">
        <div className="t2a-shell">
          <header className="t2a-section-heading"><p>02 / RESEARCH QUESTIONS</p><h2 id="questions-title">评测问题与对应证据</h2></header>
          <div className="t2a-question-grid">
            <article><span>01</span><h3>OVL · 整体质量</h3><p>不看 Prompt，音频自身是否自然、完整、可用？</p></article>
            <article><span>02</span><h3>REL · 语义符合度</h3><p>声源、事件、属性、次数和时序是否满足 Prompt？</p></article>
            <article><span>03</span><h3>Badcase · 问题类型</h3><p>问题涉及声源、次数、属性、次事件，还是技术伪影？</p></article>
            <article><span>04</span><h3>Stability · 稳定性</h3><p>生成是否稳定？同一评测人的评分是否稳定？</p></article>
          </div>
        </div>
      </section>

      <section className="t2a-section t2a-shell" id="protocol">
        <header className="t2a-section-heading"><p>03 / PHASE 2 PROTOCOL</p><h2>同 Prompt、同协议的联合盲评</h2></header>
        <div className="t2a-protocol-summary">
          <div><strong>40 Prompt</strong><span>× 5 generation repetitions</span></div>
          <div><strong>× 2 models</strong><span>= 400 formal samples</span></div>
          <div><strong>+ 40 hidden repeats</strong><span>= 440 listening events</span></div>
        </div>
        <p className="t2a-callout">Phase 2 将每个 Prompt 的五次输出记为 generation repetitions。SAO1 脚本未向 pipeline 显式传入 generator，SA3M 正式生成也未实际应用固定 seed，因此本研究不属于 same-seed 或 matched-latent 比较。</p>
        <ol className="t2a-protocol-steps">
          <li><span>01</span><div><strong>Blind ID</strong><p>隐藏模型、Prompt、类别和 generation repeat。</p></div></li>
          <li><span>02</span><div><strong>先评 OVL</strong><p>隐藏 Prompt，可重复播放，判断音频自身质量。</p></div></li>
          <li><span>03</span><div><strong>再评 REL</strong><p>显示英文 Prompt，复听后判断语义符合度。</p></div></li>
          <li><span>04</span><div><strong>事件诊断</strong><p>记录 Primary 与 multi-label Badcase、decision、notes、replay count 和 timestamp。</p></div></li>
          <li><span>05</span><div><strong>解盲与裁决</strong><p>解盲后只做结构检查和人工裁决，不按模型身份改分。</p></div></li>
        </ol>
        <div className="t2a-phase2-execution" aria-label="Phase 2 人工听评执行记录">
          <div><p className="eyebrow">Phase 2 listening record</p><h3>440 次联合盲听，按 10 个 Session 登记</h3><p>冻结评分表包含 400 条正式样本与 40 条隐藏重复，每个 Session 记录 44 次试听。正式样本和隐藏重复使用同一 Rubric；隐藏重复不进入模型均值与 Badcase 正式统计。</p></div>
          <dl>
            <div><dt>正式统计</dt><dd>400</dd><small>200 / model</small></div>
            <div><dt>隐藏重复</dt><dd>40</dd><small>不进入正式统计</small></div>
            <div><dt>复测主分析</dt><dd>40 对</dd><small>all-pair</small></div>
            <div><dt>敏感性分析</dt><dd>34 对</dd><small>gap ≥ 30</small></div>
          </dl>
        </div>
        <div className="t2a-role-grid">
          <article><h3>本人负责</h3><p>测试集结构与五层框架、Rubric、正式听评、隐藏重复复测、Badcase 语义裁决及报告审核。</p></article>
          <article><h3>AI 辅助范围</h3><p>生成脚本执行、表格整理、统计计算、Manifest 与报告编排；所有语义评分和最终裁决均由本人完成。</p></article>
        </div>
        <div className="t2a-rubric-block">
          <h3>OVL / REL 评分锚点</h3>
          <div className="table-wrap">
            <table><thead><tr><th>分数</th><th>OVL：整体质量</th><th>REL：文本—音频符合度</th></tr></thead><tbody>
              <tr><th scope="row">5</th><td>优秀：接近可直接用于项目</td><td>高度匹配：核心事件、音色、次数与顺序基本全部满足</td></tr>
              <tr><th scope="row">4</th><td>良好：自然、完整，仅有轻微问题</td><td>大部分匹配：核心事件清楚，大部分属性与关系正确</td></tr>
              <tr><th scope="row">3</th><td>基本可用：存在瑕疵，但仍可作为生成音效使用</td><td>核心匹配：核心事件正确，但属性、次数或顺序存在缺失</td></tr>
              <tr><th scope="row">2</th><td>较差：勉强可辨认，伪影、断裂或不自然感明显</td><td>弱相关：仅符合大类，核心事件模糊或缺失</td></tr>
              <tr><th scope="row">1</th><td>不可用：静音、严重噪声、破音或明显生成失败</td><td>无关：核心声源错误或几乎没有对应关系</td></tr>
            </tbody></table>
          </div>
        </div>
      </section>

      <section className="t2a-section t2a-results-section" id="results">
        <div className="t2a-shell">
          <header className="t2a-section-heading t2a-light"><p>04 / CONTROLLED COMPARISON</p><h2>总体差异的 95% 置信区间均跨越 0</h2><p>在当前 40 条 Prompt 测试集中，未观察到方向明确的总体 OVL 或 REL 差异。</p></header>
          <div className="t2a-model-grid">
            {phase2.models.map((model) => <article key={model.id}><span>{model.id}</span><h3>{model.name}</h3><dl><div><dt>OVL</dt><dd>{model.ovl.toFixed(3)}</dd></div><div><dt>REL</dt><dd>{model.rel.toFixed(3)}</dd></div><div><dt>n</dt><dd>{model.formalN}</dd></div></dl></article>)}
          </div>
          <div className="t2a-ci-grid">
            <article><h3>ΔOVL · SA3M − SAO1</h3><strong>−0.140</strong><p>95% CI [−0.395, +0.115]</p><div className="ci-track" aria-label="OVL 差值置信区间跨越 0"><i style={{ left: "10%", width: "74%" }} /><b style={{ left: "58%" }} /></div></article>
            <article><h3>ΔREL · SA3M − SAO1</h3><strong>−0.050</strong><p>95% CI [−0.295, +0.180]</p><div className="ci-track" aria-label="REL 差值置信区间跨越 0"><i style={{ left: "15%", width: "68%" }} /><b style={{ left: "57%" }} /></div></article>
          </div>
          <p className="t2a-result-boundary">两项置信区间均跨越 0；这不等于模型等价，也不证明不存在差异。主分析按 40 个 Prompt 成对重采样 10,000 次，seed=42，Python MT19937；Wilcoxon 仅作为次要稳健性检查。</p>
        </div>
      </section>

      <section className="t2a-section t2a-shell" aria-labelledby="decision-title">
        <header className="t2a-section-heading"><p>05 / DECISION DISTRIBUTION</p><h2 id="decision-title">问题样本保留在正式统计中</h2></header>
        <div className="t2a-decision-comparison">
          {phase2.decisions.map((row) => <article key={row.model}><h3>{row.model}</h3><div className="decision-stack" aria-label={`${row.model} decision 分布`}><span style={{ width: `${row.pass / 2}%` }}>{row.pass}</span><span style={{ width: `${row.keep / 2}%` }}>{row.keep}</span><span style={{ width: `${row.regenerate / 2}%` }}>{row.regenerate}</span></div><p><b>pass {row.pass}</b> · keep_as_badcase {row.keep} · needs_regeneration {row.regenerate}</p></article>)}
        </div>
        <p className="t2a-callout"><code>needs_regeneration</code> 仍属于正式分析样本；它表示当前使用场景下建议重新生成，不代表文件从统计中删除。</p>
      </section>

      <section className="t2a-section t2a-section-tint" id="badcase">
        <div className="t2a-shell">
          <header className="t2a-section-heading"><p>06 / BADCASE PROFILE</p><h2>两模型的 Badcase 分布存在结构差异</h2></header>
          <div className="t2a-badcase-bars">
            {globalBadcases.map((row) => <div className="t2a-badcase-row" key={row.label}><strong>{row.label}</strong><div><span className="sa3m" style={{ width: `${row.sa3m * 3}%` }} /><span className="sao1" style={{ width: `${row.sao1 * 3}%` }} /></div><small>SA3M {row.sa3m.toFixed(1)}% · SAO1 {row.sao1.toFixed(1)}%</small></div>)}
          </div>
          <div className="t2a-legend"><span><i className="sa3m" />SA3M</span><span><i className="sao1" />SAO1</span></div>
          <p className="t2a-callout">描述性观察：SA3M 在当前测试集中更常出现声源与属性错误；SAO1 更常出现数量错误、技术伪影和纹理辨识不足。这里只描述输出，不推断训练数据、扩散架构或 sampler 等内部原因。</p>

          <h3 className="t2a-subsection-title">只在具备对应要求的 Prompt 子集中计算</h3>
          <div className="table-wrap t2a-conditional-table">
            <table><thead><tr><th>条件</th><th>SA3M</th><th>SAO1</th><th>Prompt n</th><th>输出 / 模型</th><th>证据等级</th></tr></thead><tbody>{conditionalBadcases.map((row) => <tr key={row.label}><th scope="row">{row.label}</th><td>{row.sa3m}</td><td>{row.sao1}</td><td>{row.prompts}</td><td>{row.outputs}</td><td>{row.evidence}</td></tr>)}</tbody></table>
          </div>
          <p className="t2a-table-note">这些结果来自事后能力审核，统计口径为 prompt-conditioned sample-level label rate，不属于预注册的逐事件错误率。40 条 Prompt 对应 41 条人工审核要求记录；仅对部分复合事件进行了拆分。</p>

          <div className="t2a-persistence">
            <div><p className="eyebrow">Persistence</p><h3>区分偶发输出与持续能力缺口</h3><p>统计同一 Prompt 的某一标签在五次生成重复中出现的次数，用于选择专项回归 Prompt 与支持研发优先级。</p></div>
            <dl><div><dt>0 / 5</dt><dd>not observed</dd></div><div><dt>1 / 5</dt><dd>sporadic</dd></div><div><dt>2–3 / 5</dt><dd>unstable</dd></div><div><dt>4–5 / 5</dt><dd>persistent</dd></div></dl>
          </div>
        </div>
      </section>

      <section className="t2a-section t2a-shell" id="repeat">
        <header className="t2a-section-heading"><p>07 / HIDDEN-REPEAT CONSISTENCY</p><h2>同一评测人的复测稳定性</h2></header>
        <div className="t2a-retest-grid">
          <article><strong>{pct(repeatConsistency.ovlWithinOne)}</strong><span>OVL within-one</span><small>38 / 40</small></article>
          <article><strong>{pct(repeatConsistency.relWithinOne)}</strong><span>REL within-one</span><small>39 / 40</small></article>
          <article><strong>{pct(repeatConsistency.decisionExact)}</strong><span>Decision exact</span><small>34 / 40</small></article>
          <article><strong>{pct(repeatConsistency.primaryExact)}</strong><span>Primary Badcase exact</span><small>27 / 40</small></article>
        </div>
        <div className="t2a-repeat-detail"><p><strong>40 / 40</strong> 音频 SHA256 匹配 · 4 对 same-session · 36 对 cross-session</p><p><strong>gap ≥ 30 · n=34：</strong>OVL within-one 32/34（94.1%）· REL within-one 33/34（97.1%）</p><p><strong>later − earlier OVL mean = −0.150</strong>。后次评分略低是描述性观察；呈现顺序、Session 与样本差异相互混杂，不归因为疲劳或评分漂移。</p></div>
        <p className="t2a-callout">隐藏重复衡量单一评测人的 intra-rater consistency，不代表多人评测一致性或 ICC。</p>
      </section>

      <section className="t2a-section t2a-section-tint" id="method">
        <div className="t2a-shell">
          <header className="t2a-section-heading"><p>08 / METHOD &amp; BOUNDARIES</p><h2>人工听评、客观检查与审计的职责边界</h2></header>
          <div className="t2a-layer-grid">{layers.map(([code, title, text]) => <article key={code}><span>{code}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
          <div className="t2a-method-boundaries">
            <article><h3>CLAP exploratory boundary check</h3><p>Phase 1 前 5 秒工作流与人工 REL 的 Spearman ρ≈−0.007，与 OVL ρ≈−0.015，未显示有效单调关系；不设置自动阈值，也不替代人工语义裁决。</p></article>
            <article><h3>完整七类 FAD / JS</h3><strong>NOT RUN</strong><p>缺少类别匹配、许可明确且预处理可追溯的完整参考集，因此不纳入 Prompt 语义、主观质量或模型排名结论。</p></article>
          </div>
        </div>
      </section>

      <section className="t2a-section t2a-shell" id="history">
        <header className="t2a-section-heading"><p>09 / HISTORICAL BRIDGE</p><h2>Phase 1 是方法起点，不是 SA3M 的直接基线</h2></header>
        <div className="t2a-history-grid">
          <article><span>Phase 1 · H1</span><h3>SAO1 Historical PoC</h3><p>40 Prompt × 5 fixed seeds · 200 formal · 20 hidden repeats</p><dl><div><dt>OVL</dt><dd>{phase1.ovl.toFixed(3)}</dd></div><div><dt>REL</dt><dd>{phase1.rel.toFixed(3)}</dd></div></dl><small>历史 15 对 gap≥30：OVL within-one 14/15，REL within-one 15/15，Decision exact 12/15。</small></article>
          <article><span>H1 ↔ C1 · non-equivalent bridge</span><h3>跨阶段延续性</h3><dl><div><dt>OVL ρ</dt><dd>{historicalBridge.ovlSpearman}</dd></div><div><dt>REL ρ</dt><dd>{historicalBridge.relSpearman}</dd></div><div><dt>OVL MAD</dt><dd>{historicalBridge.ovlMad}</dd></div><div><dt>REL MAD</dt><dd>{historicalBridge.relMad}</dd></div></dl><p>同一 Prompt 表现存在一定跨阶段延续性，但生成配置、评测时间与样本波动均不同，因此只作描述性桥接。</p></article>
        </div>
        <h3 className="t2a-history-protocol-title">Phase 1 人工听评操作记录（历史）</h3>
        <div className="t2a-listening-protocol" aria-label="Phase 1 人工听评操作条件">
          <div><span>监听链路</span><strong>DT 770 PRO X · MOTU M4 · Adobe Audition</strong><p>安静室内，固定系统音量；未做标准化声压级校准。</p></div>
          <div><span>会话安排</span><strong>220 次盲听 · 分两天完成</strong><p>每轮约 30 条、约 45 分钟，轮间休息约 15 分钟。</p></div>
          <div><span>评分顺序</span><strong>OVL → REL → 事件诊断</strong><p>OVL 阶段隐藏 Prompt；REL 阶段显示英文 Prompt。允许重复播放，事件标签在复听后填写。</p></div>
        </div>
        <p className="t2a-history-protocol-note">其中 20 条隐藏重复不进入正式 n=200 统计；Phase 1 复测稳定性主分析采用评价顺序间隔 ≥30 的 15 对。</p>
      </section>

      <section className="t2a-section t2a-audit-section" id="audit">
        <div className="t2a-shell">
          <header className="t2a-section-heading t2a-light"><p>10 / CODE &amp; DATA AUDIT</p><h2>代码、冻结数据与派生结果复核</h2><p>复核检查冻结文件、计算过程与公开证据是否一致；复核结论不替代人工听评，也不构成对模型能力的额外背书。</p></header>
          <div className="t2a-audit-grid">
            <dl><div><dt>Research version</dt><dd>{t2aRelease.researchVersion}</dd></div><div><dt>Audit revision</dt><dd>{t2aRelease.auditRevision}</dd></div><div><dt>Validator</dt><dd>{t2aRelease.auditValidator}</dd></div><div><dt>Codex review</dt><dd>{t2aRelease.auditVerdict}</dd></div><div><dt>Frozen-data check</dt><dd>PASS</dd></div><div><dt>Security scan</dt><dd>PASS</dd></div></dl>
            <article><h3>Audit SHA256</h3><code>{auditSha256}</code><CopyAuditHash value={auditSha256} /><p>r3 补充脱敏隐藏重复配对、恢复 10,000 次 paired Prompt Bootstrap、参数化构建路径并扩展验证脚本；没有修改人工评分、Badcase 标签或裁决结果。</p></article>
          </div>
        </div>
      </section>

      <section className="t2a-section t2a-shell" id="cases">
        <header className="t2a-section-heading"><p>11 / PHASE 1 HISTORICAL LISTENING CASES</p><h2>历史 PoC 的评分锚点与 Badcase</h2><p>以下 B 编号音频均来自 H1 / Stable Audio Open 1.0 历史 PoC，不是 Phase 2 模型比较输出。</p></header>
        <div className="t2a-audio-grid">{historicalCases.map((item) => <article key={item.id}><span>{item.id}</span><small>Cohort H1 · {item.sample}</small><h3>{item.title}</h3><strong>{item.score}</strong><p>{item.note}</p><audio controls preload="metadata" aria-label={`${item.id} Phase 1 历史音频`}><source src={item.audio} type="audio/wav" /></audio></article>)}</div>
      </section>

      <section className="t2a-section t2a-section-tint" id="next">
        <div className="t2a-shell">
          <header className="t2a-section-heading"><p>12 / LIMITATIONS &amp; NEXT WORK</p><h2>已完成范围与待补证据</h2></header>
          <div className="t2a-limit-grid"><article><h3>已完成</h3><ul><li>SAO1 重新生成与 SAO1–SA3M 受控比较</li><li>400 条 Phase 2 正式样本与 40 条隐藏重复</li><li>Prompt-level paired Bootstrap、Wilcoxon、条件 Badcase 与 Persistence</li><li>历史桥接、Manifest 与 audit r3 复算检查</li></ul></article><article><h3>尚未完成</h3><ul><li>36 条 Stress Set 正式生成与听评</li><li>多评测员研究</li><li>完整七类 FAD / JS</li><li>完整逐事件标签绑定与更多模型/训练版本比较</li></ul></article></div>
        </div>
      </section>

      <section className="t2a-section t2a-shell" id="downloads">
        <header className="t2a-section-heading"><p>13 / RELEASE MATERIALS</p><h2>研究报告、审计材料与历史归档</h2></header>
        <div className="t2a-artifact-grid">{downloads.map(([title, href, description], index) => <a href={href} key={href} download><span>{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{description}</p><b>打开 / 下载 ↗</b></a>)}</div>
        <aside className="t2a-history-download"><div><span>Historical archive</span><h3>Phase 1 PoC v1.4</h3><p>仅代表 Stable Audio Open 1.0 的 200 条历史 PoC，不代表当前正式研究版本。</p></div><a href="/downloads/T2A_Audio_Evaluation_PoC_Portfolio_CN_v1.4.pptx" download>下载历史 PPT</a></aside>
      </section>

      <footer className="t2a-footer t2a-shell"><Link href="/">← 返回杜明音频作品集</Link><span>Research {t2aRelease.researchVersion} · Audit {t2aRelease.auditRevision}</span><span>© 2026 杜明</span></footer>
    </main>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { awf } from "./data";
import CoreFlowDiagram from "./core-flow";
import "./audio-world-framework.css";

export const metadata: Metadata = {
  title: awf.meta.title,
  description: awf.meta.description,
  keywords: [...awf.meta.keywords],
  alternates: { canonical: "/audio-world-framework" },
};

export default function AudioWorldFrameworkPage() {
  return (
    <main className="awf-page">
      <header className="awf-topbar">
        <Link className="wordmark" href="/" aria-label="返回作品集首页">
          <span className="wordmark-mark" aria-hidden="true" />
          <span>DU MING / AUDIO</span>
        </Link>
        <nav aria-label="主导航">
          <Link href="/t2a-case-study">评测案例</Link>
          <Link href="/audio-world-framework">场景框架</Link>
          <Link href="/#sound-practice">声音实践</Link>
          <Link href="/resume">关于我</Link>
        </nav>
      </header>

      {/* 01 / HeroSection */}
      <section className="awf-hero awf-shell" id="overview" aria-labelledby="awf-hero-title">
        <div className="awf-hero-inner">
          <p className="eyebrow">{awf.hero.eyebrow}</p>
          <h1 id="awf-hero-title">
            点·线·面·境
          </h1>
          <p className="awf-hero-subtitle">{awf.hero.subtitle}</p>
          <p className="awf-hero-en">{awf.hero.en}</p>
          <div className="awf-hero-core">
            {awf.hero.core.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
          <p className="awf-hero-body">{awf.hero.body}</p>
          <div className="awf-tag-row" aria-label="主题标签">
            {awf.hero.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          <p className="awf-hero-oneliner">{awf.hero.oneLiner}</p>
        </div>
      </section>

      {/* 02 / CoreFlowDiagram */}
      <section className="awf-section awf-shell" id="flow" aria-labelledby="flow-title">
        <header className="awf-section-heading">
          <p>01 / 核心链路</p>
          <h2 id="flow-title">从音频资产到意义</h2>
          <p>点击或悬停节点，查看每一层的声音设计定义、音频场景例子与评测问题。</p>
        </header>
        <CoreFlowDiagram />
      </section>

      {/* 03 / ProblemStatement */}
      <section className="awf-section awf-section-tint" id="problem" aria-labelledby="problem-title">
        <div className="awf-shell">
          <header className="awf-section-heading">
            <p>02 / 问题</p>
            <h2 id="problem-title">{awf.problem.title}</h2>
            <p>{awf.problem.lead}</p>
          </header>
          <div className="awf-problem-grid">
            <article>
              <h3>{awf.problem.missingTitle}</h3>
              <ul>
                {awf.problem.missing.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
            <article>
              <h3>{awf.problem.targetTitle}</h3>
              <div className="awf-target-stack">
                {awf.problem.target.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* 04 / PointLineSceneMeaningSection */}
      <section className="awf-section awf-shell" id="framework" aria-labelledby="framework-title">
        <header className="awf-section-heading">
          <p>03 / 分层框架</p>
          <h2 id="framework-title">点、线、面、境：从事件到整体表达</h2>
          <p>每一层回答不同的问题，也对应不同的评测对象与标注粒度。</p>
        </header>
        <div className="awf-layer-grid">
          {awf.layers.map((layer) => (
            <article key={layer.id} className={`awf-layer-card awf-layer-${layer.id}`}>
              <p className="awf-layer-char">{layer.char}</p>
              <h3>{layer.en}</h3>
              <p className="awf-layer-def">{layer.definition}</p>
              <div className="awf-layer-examples">
                <span className="awf-layer-label">例如</span>
                <p>{layer.examples.join(" · ")}</p>
              </div>
              <div className="awf-layer-question">
                <span className="awf-layer-label">评测问题</span>
                <p>{layer.question}</p>
              </div>
              <div className="awf-layer-labels">
                {layer.labels.map((label) => (
                  <span key={label}>{label}</span>
                ))}
              </div>
              {layer.note ? <p className="awf-layer-note">{layer.note}</p> : null}
            </article>
          ))}
        </div>
      </section>

      {/* 05 / MiddlewareComparison */}
      <section className="awf-section awf-section-tint" id="middleware" aria-labelledby="middleware-title">
        <div className="awf-shell">
          <header className="awf-section-heading">
            <p>04 / 中间组织层</p>
            <h2 id="middleware-title">{awf.middleware.title}</h2>
            <p>{awf.middleware.lead}</p>
          </header>
          <div className="awf-mapping-wrap">
            <div className="awf-mapping-col awf-mapping-game" aria-label="游戏音频中间件">
              <p className="awf-mapping-heading">游戏音频中间件</p>
              {awf.middleware.gameAudio.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
            <div className="awf-mapping-bridge" aria-hidden="true">
              <svg width="48" height="300" viewBox="0 0 48 300" focusable="false">
                <path d="M24 4v292M24 4l-7 7M24 4l7 7M24 296l-7-7M24 296l7-7" fill="none" stroke="currentColor" strokeWidth="1.2" />
              </svg>
            </div>
            <div className="awf-mapping-col awf-mapping-ai" aria-label="AI 音频系统">
              <p className="awf-mapping-heading">AI 音频系统</p>
              {awf.middleware.aiAudio.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>

          <h3 className="awf-subsection-title">AI 音频场景中间层（AI Audio Scene Middleware，概念）</h3>
          <ol className="awf-ai-flow">
            {awf.middleware.aiFlow.map((item, index) => (
              <li key={item}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{item}</strong>
              </li>
            ))}
          </ol>

          <p className="awf-callout">{awf.middleware.conclusion}</p>
          <p className="awf-footnote">{awf.middleware.boundary}</p>
        </div>
      </section>

      {/* 06 / EvaluationMatrix */}
      <section className="awf-section awf-section-tint" id="evaluation" aria-labelledby="evaluation-title">
        <div className="awf-shell">
          <header className="awf-section-heading">
            <p>05 / 分层评测</p>
            <h2 id="evaluation-title">{awf.evaluationMatrix.title}</h2>
            <p>{awf.evaluationMatrix.lead}</p>
          </header>
          <div className="table-wrap awf-matrix-table">
            <table>
              <thead>
                <tr>
                  <th>层级</th>
                  <th>核心问题</th>
                  <th>可观察指标</th>
                  <th>典型问题</th>
                  <th>推荐评测方法</th>
                </tr>
              </thead>
              <tbody>
                {awf.evaluationMatrix.rows.map((row) => (
                  <tr key={row.layer}>
                    <th scope="row">
                      {row.layer} <small>{row.en}</small>
                    </th>
                    <td>{row.question}</td>
                    <td>{row.metrics}</td>
                    <td>{row.issues}</td>
                    <td>{row.methods}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="awf-subsection-title">问题定位示例</h3>
          <div className="awf-diagnosis-list">
            {awf.evaluationMatrix.diagnosis.map(([issue, layer]) => (
              <div key={issue}>
                <p>{issue}</p>
                <span>→ {layer}</span>
              </div>
            ))}
          </div>
          <p className="awf-callout">{awf.evaluationMatrix.punchline}</p>
        </div>
      </section>

      {/* 07 / AnnotationSchema */}
      <section className="awf-section awf-shell" id="annotation" aria-labelledby="annotation-title">
        <header className="awf-section-heading">
          <p>06 / 标注结构</p>
          <h2 id="annotation-title">{awf.annotation.title}</h2>
          <p>{awf.annotation.lead}</p>
        </header>
        <div className="awf-annotation-layout">
          <div className="awf-annotation-steps">
            {awf.annotation.steps.map(([step, title, detail]) => (
              <article key={step}>
                <span>{step}</span>
                <h3>{title}</h3>
                <p>{detail}</p>
              </article>
            ))}
          </div>
          <div className="awf-annotation-schema">
            <p className="awf-schema-title">{awf.annotation.schemaTitle}</p>
            <pre><code>{awf.annotation.schema}</code></pre>
          </div>
        </div>
        <p className="awf-callout">{awf.annotation.caution}</p>
      </section>

      {/* 08 / AudioSceneCaseStudy */}
      <section className="awf-section awf-section-tint" id="casestudy" aria-labelledby="casestudy-title">
        <div className="awf-shell">
          <header className="awf-section-heading">
            <p>07 / 案例拆解</p>
            <h2 id="casestudy-title">同一个 Prompt，四层拆解</h2>
            <blockquote className="awf-case-prompt">{awf.caseStudy.prompt}</blockquote>
          </header>
          <div className="awf-case-layers">
            {awf.caseStudy.layers.map((layer) => (
              <article key={layer.layer} className={`awf-case-card awf-case-${layer.layer}`}>
                <p className="awf-case-char">{layer.layer}</p>
                <h3>{layer.en}</h3>
                <ul>
                  {layer.content.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <h3 className="awf-subsection-title">可能的 Bad Case 与层级定位</h3>
          <div className="awf-case-badcases">
            {awf.caseStudy.badcases.map(([issue, layer]) => (
              <article key={issue}>
                <p>{issue}</p>
                <span>{layer}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 09 / ExistingProjectEvidence */}
      <section className="awf-section awf-shell" id="evidence" aria-labelledby="evidence-title">
        <header className="awf-section-heading">
          <p>08 / 已有证据</p>
          <h2 id="evidence-title">{awf.evidence.title}</h2>
          <p>{awf.evidence.lead}</p>
          <span className="awf-status-badge">{awf.evidence.status}</span>
        </header>

        <div className="awf-evidence-stats">
          {awf.evidence.stats.map(([value, label]) => (
            <div key={label}>
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>

        <h3 className="awf-subsection-title">{awf.evidence.consistencyTitle}</h3>
        <div className="awf-consistency-cards">
          {awf.evidence.consistency.map(([label, value]) => (
            <article key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
            </article>
          ))}
        </div>
        <p className="awf-footnote">{awf.evidence.consistencyNote}</p>

        <h3 className="awf-subsection-title">{awf.evidence.dimensionsTitle}</h3>
        <div className="awf-dimension-tags">
          {awf.evidence.dimensions.map((dimension) => (
            <span key={dimension}>{dimension}</span>
          ))}
        </div>

        <h3 className="awf-subsection-title">{awf.evidence.coverageTitle}</h3>
        <div className="table-wrap awf-coverage-table">
          <table>
            <thead>
              <tr>
                <th>层级</th>
                <th>当前覆盖</th>
                <th>状态</th>
              </tr>
            </thead>
            <tbody>
              {awf.evidence.coverage.map(([layer, coverage, status]) => (
                <tr key={layer}>
                  <th scope="row">{layer}</th>
                  <td>{coverage}</td>
                  <td>{status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="awf-next-block">
          <div className="awf-next-header">
            <h3>{awf.evidence.nextTitle}</h3>
            <span className="awf-next-badge">{awf.evidence.nextStatus}</span>
          </div>
          <ol>
            {awf.evidence.next.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        </div>
      </section>

      {/* 10 / RoleApplication */}
      <section className="awf-section awf-section-tint" id="role" aria-labelledby="role-title">
        <div className="awf-shell">
          <header className="awf-section-heading">
            <p>09 / 工作应用</p>
            <h2 id="role-title">{awf.role.title}</h2>
            <p>{awf.role.lead}</p>
          </header>
          <div className="awf-role-grid">
            {awf.role.columns.map((column) => (
              <article key={column.en}>
                <p className="awf-role-en">{column.en}</p>
                <h3>{column.zh}</h3>
                <ul>
                  {column.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 11 / WhyMeSection */}
      <section className="awf-section awf-shell" id="whyme" aria-labelledby="whyme-title">
        <header className="awf-section-heading">
          <p>10 / 能力来源</p>
          <h2 id="whyme-title">{awf.whyMe.title}</h2>
          <p>{awf.whyMe.lead}</p>
        </header>
        <div className="awf-whyme-grid">
          {awf.whyMe.items.map((item, index) => (
            <article key={item.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
        <p className="awf-whyme-conclusion">{awf.whyMe.conclusion}</p>
        <p className="awf-footnote">{awf.whyMe.boundary}</p>
      </section>

      {/* 12 / FooterDisclaimer */}
      <footer className="awf-footer awf-shell">
        <div>
          <Link href="/">返回作品集首页</Link>
          <Link href="/t2a-case-study">T2A 评测案例</Link>
        </div>
        <p>{awf.footer.note}</p>
        <p>{awf.footer.boundary}</p>
        <small>© 2026 杜明 · 点线面境框架</small>
      </footer>
    </main>
  );
}

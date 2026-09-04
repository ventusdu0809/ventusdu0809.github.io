import { siteCopy } from "../src/data/siteCopy";
import { evaluationSystemEvidence, publicEvidenceStatusLabels } from "../src/data/evaluation-system-evidence";

export default function Home() {
  const { heroCopy, coreNarratives, projectSummary, supportingPractices, auditTrustLine } = siteCopy;

  return (
    <main id="top">
      <header className="site-header recruiter-header">
        <a className="wordmark" href="#top" aria-label="返回页面顶部">
          <span className="wordmark-mark" aria-hidden="true" />
          <span className="wordmark-text">DU MING / AUDIO</span>
        </a>
        <nav aria-label="主导航">
          <a href="#projects">项目</a>
          <a href="/point-line-scene-framework">评测方法</a>
          <a href="#sound-practice">声音实践</a>
          <a href="/resume">简历</a>
        </nav>
        <a className="header-contact" href="#contact">联系</a>
      </header>

      <section className="hero recruiter-hero" aria-labelledby="hero-title">
        <div className="hero-inner recruiter-hero-inner">
          <p className="eyebrow recruiter-hero-eyebrow"><strong>{heroCopy.eyebrow}</strong></p>
          <h1 id="hero-title">{heroCopy.title}</h1>
          <p className="recruiter-roleline">{heroCopy.subtitle}</p>
          <p className="hero-intro recruiter-intro">{heroCopy.body}</p>
          <div className="hero-actions">
            <a className="btn btn-primary" href={heroCopy.primaryHref}>{heroCopy.primaryCta}</a>
            <a className="text-link" href="#sound-practice">{heroCopy.secondaryCta} →</a>
          </div>
        </div>
        <div className="recruiter-hero-facts" aria-label="项目规模">
          {heroCopy.metrics.map((metric) => (
            <div key={metric.label}>
              <strong>{metric.value}</strong>
              <span>{metric.label}</span>
            </div>
          ))}
          <p>{heroCopy.support}</p>
        </div>
      </section>

      <section className="content-section recruiter-intro-section" aria-labelledby="positioning-title">
        <div className="section-shell recruiter-two-column">
          <div>
            <p className="eyebrow">能力定位 / ROLE POSITIONING</p>
            <h2 id="positioning-title">{siteCopy.role}</h2>
          </div>
          <p className="section-lead">{siteCopy.globalStatement}</p>
        </div>
      </section>

      <section className="content-section content-section--paper" aria-labelledby="narratives-title">
        <div className="section-shell">
          <header className="section-heading">
            <p className="eyebrow">核心评测能力 / CORE PRACTICE</p>
            <h2 id="narratives-title">我如何把听感判断变成可复查的结论</h2>
          </header>
          <div className="recruiter-narratives">
            {coreNarratives.map((narrative, index) => (
              <article key={narrative.id} className="recruiter-narrative">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{narrative.title}</h3>
                <p>{narrative.body}</p>
                {"note" in narrative && narrative.note ? <p className="narrative-note">{narrative.note}</p> : null}
                <div className="tag-row" aria-label={`${narrative.title}相关标签`}>
                  {narrative.tags.map((tag) => <span key={tag}>{tag}</span>)}
                </div>
                <a className="paper-link" href={narrative.href}>{narrative.linkLabel}</a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="content-section recruiter-project recruiter-project-primary" id="projects" aria-labelledby="project-title">
        <div className="section-shell">
          <header className="section-heading">
            <p className="eyebrow">主项目 / PRIMARY CASE</p>
            <h2 id="project-title">音视频生成两轮评测</h2>
            <p className="section-subtitle-en">Audio-Visual Generation Evaluation</p>
            <p className="section-lead">两轮诊断性音视频生成评测：从第一轮（Round 1）问题发现进入第二轮（Round 2）受控回归，并完成 Cross-Round Analysis v1.0。</p>
          </header>
          <div className="recruiter-project-grid">
            <div className="recruiter-scale-list">
              <span>点 → 线 → 面 + 独立质量</span>
              <span>2 轮 · 16 个生成样本</span>
              <span>3 个精确计数案例</span>
              <span>5 条跨轮冻结结论</span>
            </div>
            <div>
              <p className="recruiter-finding">三个精确计数（Exact-count）案例均呈现 Prompt=3、Visual=4、Audio=4：文本 → 画面的数量约束不一致，而画面 → 音频计数保持一致，因此不应归为音频计数失败（Audio Counting Failure）。</p>
              <p className="recruiter-boundary">精确计数结论为重复诊断模式（Repeated Diagnostic Pattern）；项目属于小样本诊断性 PoC，用于定位失败链路和调整研发优先级，不作统计泛化。</p>
              <a className="btn btn-primary" href="/audio-visual-evaluation">查看音视频生成评测</a>
            </div>
          </div>
        </div>
      </section>

      <section className="content-section content-section--paper recruiter-project recruiter-project-foundation" aria-labelledby="foundation-project-title">
        <div className="section-shell">
          <header className="section-heading">
            <p className="eyebrow">基础项目 / FOUNDATION CASE</p>
            <h2 id="foundation-project-title">{projectSummary.title}</h2>
            <p className="section-lead">{projectSummary.body}</p>
          </header>
          <div className="recruiter-project-grid">
            <div className="recruiter-scale-list">
              {projectSummary.scales.map((scale) => <span key={scale}>{scale}</span>)}
            </div>
            <div>
              <p className="recruiter-finding">{projectSummary.finding}</p>
              <p className="recruiter-boundary">{projectSummary.boundary}</p>
              <a className="btn btn-primary" href={projectSummary.href}>{projectSummary.linkLabel}</a>
            </div>
          </div>
        </div>
      </section>

      <section className="content-section content-section--paper" id="sound-practice" aria-labelledby="practice-title">
        <div className="section-shell">
          <header className="section-heading">
            <p className="eyebrow">声音实践 / SOUND PRACTICE</p>
            <h2 id="practice-title">{supportingPractices.title}</h2>
            <p className="section-lead">{supportingPractices.body}</p>
          </header>
          <div className="recruiter-practice-grid">
            {supportingPractices.cards.map((card, index) => (
              <article key={card.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{card.title}</h3>
                <p>{card.body}</p>
                <a className="paper-link" href={card.href}>{card.linkLabel}</a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="content-section pls-home-feature" aria-labelledby="pls-home-title">
        <div className="section-shell">
          <header className="section-heading">
            <p className="eyebrow">评测方法 / EVALUATION METHOD</p>
            <h2 id="pls-home-title">点—线—面（Point–Line–Scene）评测方法</h2>
            <p className="section-lead">把任务要求拆成可验证的原子评价单元（Evaluation Unit），再通过原子评价单元与显式参考链定位失败。</p>
          </header>
          <div className="pls-home-diagram" role="img" aria-label="Point、Line、Scene 汇聚为单元状态并进行失败定位，Quality 作为独立质量轴。">
            <div className="pls-home-inputs"><b>POINT</b><b>LINE</b><b>SCENE</b></div><span className="pls-home-arrow" aria-hidden="true">→</span><b className="pls-home-state">UNIT STATE</b><span className="pls-home-arrow" aria-hidden="true">→</span><b className="pls-home-output">FAILURE<br />LOCALIZATION</b><aside><span>+</span><b>QUALITY</b><small>Independent axis</small></aside>
          </div>
          <ol className="pls-home-steps"><li>固定能力坐标系；</li><li>按任务激活原子评价单元；</li><li>用 Unit-level Record + Reference Chain 定位失败。</li></ol>
          <div className="pls-home-note">
            <p><strong>方法边界：</strong>PLS 是对现有细粒度评测对象的一种组织方式，用于帮助定位问题；它不替代已有 Benchmark、Metric 或行业评测协议。</p>
            <a className="btn btn-primary" href="/point-line-scene-framework">查看 PLS-Eval 方法</a>
          </div>
        </div>
      </section>

      <section className="content-section content-section--paper evaluation-system-home" id="evaluation-system" aria-labelledby="evaluation-system-title">
        <div className="section-shell">
          <header className="section-heading evaluation-system-heading">
            <p className="eyebrow">方法整合 / EVALUATION SYSTEM</p>
            <h2 id="evaluation-system-title">人工判断 × 信号诊断 × 结构化执行</h2>
            <p className="section-subtitle-en">Human Judgment × Signal Diagnostics × Structured Execution</p>
            <p className="section-lead">人工判断负责 PLS / OVL，信号诊断提供辅助声学证据，执行层负责记录校验与汇总；三者在分析阶段进行对照。</p>
          </header>

          <div className="evaluation-system-home-grid">
            {evaluationSystemEvidence.homeColumns.map((column) => (
              <article key={column.title}>
                <span>{publicEvidenceStatusLabels[column.status]}</span>
                <h3>{column.title}</h3>
                <ul>{column.items.map((item) => <li key={item}>{item}</li>)}</ul>
              </article>
            ))}
          </div>

          <div className="evaluation-system-home-actions">
            <p><strong>从听感判断到诊断证据。</strong> 该评测系统是对现有 T2A、音视频评测、PLS 与执行层的整体工作流整理，不是额外提出的一套独立理论。</p>
            <div><a className="btn btn-primary" href="/point-line-scene-framework#evaluation-system">查看 PLS-Eval 方法</a><a className="paper-link" href="/audio-visual-evaluation">查看案例研究 →</a></div>
          </div>

        </div>
      </section>

      <section className="audit-trust" aria-labelledby="audit-title">
        <div className="section-shell audit-trust-inner">
          <div>
            <p className="eyebrow">证据与版本 / EVIDENCE & VERSIONING</p>
            <h2 id="audit-title">{auditTrustLine.title}</h2>
          </div>
          <div className="audit-project-list">
            {auditTrustLine.items.map((item) => (
              <article key={item.name}>
                <strong>{item.name}</strong>
                <p className="audit-status">{item.status}</p>
                <p>{item.body}</p>
                <a className="paper-link" href={item.href}>{item.linkLabel}</a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <footer className="site-footer" id="contact">
        <div>
          <strong>杜明</strong>
          <span>{siteCopy.role}</span>
        </div>
        <div>
          <a href="/audio-visual-evaluation">音视频生成评测</a>
          <a href="/t2a-case-study">T2A 基础项目</a>
          <a href="/point-line-scene-framework">PLS 评测方法</a>
          <a href="/resume">简历</a>
          <a href="https://space.bilibili.com/7927779" target="_blank" rel="noreferrer">Bilibili</a>
        </div>
        <small>© 2026 杜明</small>
      </footer>
    </main>
  );
}

import { siteCopy } from "../src/data/siteCopy";

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
          <p className="eyebrow">{heroCopy.eyebrow}</p>
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
            <h2 id="project-title">Audio-Visual Generation Evaluation</h2>
            <p className="section-lead">两轮诊断性音视频生成评测：从 Round-1 问题发现进入 Round-2 受控回归，并完成 Cross-Round Analysis v1.0。</p>
          </header>
          <div className="recruiter-project-grid">
            <div className="recruiter-scale-list">
              <span>Point → Line → Scene + Quality</span>
              <span>2 Rounds · 16 Generated Samples</span>
              <span>3 个可精确判定 Exact-count 案例</span>
              <span>5 条跨轮冻结结论</span>
            </div>
            <div>
              <p className="recruiter-finding">三个精确计数案例均呈现 Prompt=3、Visual=4、Audio=4：Prompt→Visual 的数量约束不一致，而 Visual→Audio 计数保持一致，因此不应归为 Audio Counting Failure。</p>
              <p className="recruiter-boundary">Exact-count 结论为 Repeated Diagnostic Pattern；项目属于小样本诊断性 PoC，用于定位失败链路和调整研发优先级，不作统计泛化。</p>
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

      <section className="content-section pls-home-feature" aria-labelledby="pls-home-title">
        <div className="section-shell">
          <header className="section-heading">
            <p className="eyebrow">研究 / RESEARCH</p>
            <h2 id="pls-home-title">Point–Line–Scene：从文献综合到案例研究</h2>
            <p className="section-lead">基于近期生成式音频与音视频评测研究，将事件、关系与场景层面的评价对象组织为分层诊断结构，并通过两轮 Audio-Visual Generation Evaluation 检查其中部分方法假设。</p>
          </header>
          <div className="pls-home-grid">
            <article><span>01 · LITERATURE</span><strong>文献观察</strong><p>梳理细粒度 rubric、时间关系、结构化声景、物理约束与 Judge 研究。</p></article>
            <article><span>02 · SYNTHESIS</span><strong>方法综合</strong><p>把分散对象组织为 Point → Line → Scene 的失败定位结构。</p></article>
            <article><span>03 · CASE STUDY</span><strong>案例研究</strong><p>用两轮音视频生成评测检查受控回归与错误归因。</p></article>
            <article><span>04 · NEW QUESTION</span><strong>新研究问题</strong><p>从 3→4→4 形成显式参考链诊断。</p></article>
          </div>
          <div className="pls-home-note">
            <p><strong>研究路径：</strong>Literature → Synthesis → Case Study → New Research Question。案例结果进一步修订了评价参照与诊断边界，并形成新的研究问题。</p>
            <a className="btn btn-primary" href="/point-line-scene-framework">阅读研究方法</a>
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
          <a href="/t2a-case-study">T2A基础项目</a>
          <a href="/point-line-scene-framework">PLS评测方法</a>
          <a href="/resume">简历</a>
          <a href="https://space.bilibili.com/7927779" target="_blank" rel="noreferrer">Bilibili</a>
        </div>
        <small>© 2026 杜明</small>
      </footer>
    </main>
  );
}

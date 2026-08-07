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
          <a href="/t2a-case-study">评测案例</a>
          <a href="/audio-world-framework">场景框架</a>
          <a href="#sound-practice">声音实践</a>
          <a href="/resume">关于我</a>
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
            <a className="btn btn-primary" href="/t2a-case-study">{heroCopy.primaryCta}</a>
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
            <p className="eyebrow">ROLE POSITIONING</p>
            <h2 id="positioning-title">{siteCopy.role}</h2>
          </div>
          <p className="section-lead">{siteCopy.globalStatement}</p>
        </div>
      </section>

      <section className="content-section content-section--paper" aria-labelledby="narratives-title">
        <div className="section-shell">
          <header className="section-heading">
            <p className="eyebrow">CORE EVALUATION PRACTICE</p>
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

      <section className="content-section recruiter-project" aria-labelledby="project-title">
        <div className="section-shell">
          <header className="section-heading">
            <p className="eyebrow">FEATURED CASE STUDY</p>
            <h2 id="project-title">{projectSummary.title}</h2>
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
            <p className="eyebrow">SOUND PRACTICE</p>
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
            <p className="eyebrow">AUDIT NOTE</p>
            <h2 id="audit-title">{auditTrustLine.title}</h2>
          </div>
          <div>
            <p className="audit-status">{auditTrustLine.status}</p>
            <p>{auditTrustLine.body}</p>
            <a className="paper-link" href={auditTrustLine.href} download>{auditTrustLine.linkLabel}</a>
          </div>
        </div>
      </section>

      <footer className="site-footer" id="contact">
        <div>
          <strong>杜明</strong>
          <span>{siteCopy.role}</span>
        </div>
        <div>
          <a href="/t2a-case-study">评测案例</a>
          <a href="/audio-world-framework">场景框架</a>
          <a href="/resume">关于我</a>
          <a href="https://space.bilibili.com/7927779" target="_blank" rel="noreferrer">Bilibili</a>
        </div>
        <small>© 2026 杜明</small>
      </footer>
    </main>
  );
}

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
              <p className="recruiter-finding">核心案例呈现 3→4→4：数量偏差首先发生在 Text→Visual，Visual→Audio 的事件计数与实际画面保持一致，因此不能误判为 Audio Counting Failure。</p>
              <p className="recruiter-boundary">Exact-count 结论为 Repeated Diagnostic Pattern；项目属于小样本诊断性 PoC，用于定位失败链路和调整研发优先级，不作统计泛化。</p>
              <a className="btn btn-primary" href="/audio-visual-evaluation">查看T2VA主项目</a>
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
            <p className="eyebrow">评测方法 / PLS v2.x</p>
            <h2 id="pls-home-title">Point → Line → Scene</h2>
            <p className="section-lead">把文献中的细粒度评测方向组织成分层感知框架，再用 Audio-Visual Generation Evaluation 作为案例研究，展示它如何进入失败定位、受控回归和研发优先级。</p>
          </header>
          <div className="pls-home-grid">
            <article><span>POINT</span><strong>原子正确性</strong><p>事件、声源、材质、属性与数量是否正确。</p></article>
            <article><span>LINE</span><strong>关系正确性</strong><p>时间、空间、因果、动态与交互关系是否成立。</p></article>
            <article><span>SCENE</span><strong>整体场景一致性</strong><p>环境、前后景、显著性与世界内声音是否连贯。</p></article>
          </div>
          <div className="pls-home-note">
            <p><strong>新增原则：</strong>先明确 Prompt → Visual Fact → Audio Event 的参考链，再判断 Point / Line / Scene，减少多模态错误归因。</p>
            <a className="btn btn-primary" href="/point-line-scene-framework">阅读PLS评测框架</a>
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
          <a href="/audio-visual-evaluation">T2VA主项目</a>
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

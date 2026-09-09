import { siteCopy } from "../src/data/siteCopy";


export default function Home() {
  const { heroCopy, projectSummary, supportingPractices, auditTrustLine } = siteCopy;

  return (
    <main id="top" className="portfolio-home">
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
        <details className="mobile-nav"><summary>菜单</summary><nav aria-label="手机导航"><a href="#projects">项目</a><a href="/point-line-scene-framework">评测方法</a><a href="#sound-practice">声音实践</a><a href="/resume">简历</a><a href="#contact">联系</a></nav></details>
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

      <section className="content-section recruiter-project recruiter-project-primary" aria-labelledby="agent-project-title"><div className="section-shell"><header className="section-heading"><p className="eyebrow">精选项目 / CREATIVE AGENT</p><h2 id="agent-project-title">Creative QC &amp; Repair Agent</h2><p className="section-lead">多模态创作 Agent · 自动质检 · 失败定位 · 定向修复</p></header><p className="home-explanation">将自然语言需求编译为结构化要求，通过受限工具编辑时间线，再用时间线、音频信号、成片元数据和画面证据逐项质检。失败项定位到具体参数后，再进行定向修复。</p><div className="agent-home-metrics">{[['10/10','受控回归预期判断'],['8/8','支持的自动修复案例'],['10/10','Planner 受控案例'],['6/10','端到端预期行为匹配']].map(([n,label])=><div key={label}><strong>{n}</strong><span>{label}</span></div>)}</div><p className="recruiter-boundary">保留真实失败与安全停止。各指标来自不同受控测试集；6/10 不是 Agent 准确率。</p><div className="hero-actions"><a className="btn btn-primary" href="/creative-qc-agent/">查看 Case Study</a><a className="paper-link" href="/creative-qc-agent/build-log/">技术附录</a></div></div></section>

      <section className="content-section recruiter-project recruiter-project-primary" id="projects" aria-labelledby="project-title">
        <div className="section-shell">
          <header className="section-heading">
            <p className="eyebrow">主项目 / PRIMARY CASE</p>
            <h2 id="project-title">音视频生成两轮评测</h2>

            <p className="section-lead">先发现问题，再用预先定义的条件检查问题是否重复出现。</p>
          </header>
          <div className="recruiter-project-grid">
            <figure className="home-evidence">
              <video controls preload="metadata" playsInline aria-label="木筷敲陶瓷杯：文本要求三次，实际声画均为四次"><source src="/video/t2va/R2-H1-B.mp4" type="video/mp4" />当前浏览器不支持视频播放，请<a href="/video/t2va/R2-H1-B.mp4">下载案例视频</a>。</video>
              <figcaption>R2-H1-B · 木筷敲陶瓷杯<br />播放视频，对照下面的计数记录。</figcaption>
              <dl className="home-counts"><div><dt>文本要求</dt><dd>3 次</dd></div><div><dt>画面实际</dt><dd>4 次</dd></div><div><dt>声音实际</dt><dd>4 次</dd></div></dl>
            </figure>
            <div>
              <p className="recruiter-finding">声画计数一致，仍未满足文本要求。</p>
              <p className="home-explanation">三个案例都出现 3→4→4：画面和声音均比提示要求多一次。本例未观察到声画计数不一致，但整体结果未满足文本数量要求。</p><p className="recruiter-boundary">2 轮 · 16 个生成样本 · 5 项跨轮发现。小样本用于确定后续复测方向，不推断模型总体表现或内部原因。</p>
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
              <h3 className="recruiter-finding">平均分之外，逐项记录生成错误。</h3><p className="home-explanation">{projectSummary.finding}</p>
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

      <section className="content-section pls-home-feature" id="evaluation-system" aria-labelledby="pls-home-title">
        <div className="section-shell">
          <header className="section-heading"><p className="eyebrow">评测方法</p><h2 id="pls-home-title">把判断拆开，把依据留下</h2><p className="section-lead">点—线—面（PLS）分别检查单个事件、事件关系与整体场景，并独立记录音频质量。</p></header>
          <ol className="home-method"><li><strong>逐项判断</strong><p>明确每项要求，分别对照文本、画面和声音。</p></li><li><strong>记录证据</strong><p>保留评分与问题说明，用信号诊断辅助定位和复听。</p></li><li><strong>再次验证</strong><p>预先定义复测条件，检查问题是否再次出现。</p></li></ol>
          <p className="home-explanation">正式评分、复测与最终裁决由本人完成；AI 辅助脚本、整理和统计，结果由本人复核。PLS 用于组织评测对象，不替代已有评测协议。</p>
          <a className="paper-link" href="/point-line-scene-framework">查看完整评测方法</a>
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
          <span>{siteCopy.role}</span><a className="contact-email" href="mailto:mingdu0809@gmail.com">mingdu0809@gmail.com</a><a className="paper-link" href="mailto:mingdu0809@gmail.com">发送邮件</a>
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

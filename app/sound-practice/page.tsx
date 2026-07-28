import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "游戏音频与声音实践｜杜明",
  description: "杜明的游戏音频与声音实践案例：Wwise、FMOD、Unity、Hitstop、动态混音、智能座舱HMI与运行时资源组织。",
};

const practices = [
  ["01", "战斗反馈与动态混音", "围绕关键动作、音乐和人声建立听觉层级，让高密度战斗中的重要反馈保持清晰。"],
  ["02", "交互与中间件集成", "使用Wwise / FMOD与Unity连接状态、参数和音频事件，并通过实机表现检查触发关系。"],
  ["03", "空间与运行时诊断", "结合衰减、遮挡、空间关系和资源加载，定位声音设计进入游戏后出现的问题。"],
] as const;

export default function SoundPracticePage() {
  return (
    <main className="sound-practice-page">
      <header className="site-header sound-practice-nav">
        <Link className="wordmark" href="/" aria-label="返回作品集首页"><span className="wordmark-mark" aria-hidden="true" /><span>DU MING / AUDIO</span></Link>
        <nav aria-label="主导航"><Link href="/t2a-case-study">评测案例</Link><Link href="/sound-practice">声音实践</Link><Link href="/resume">关于我</Link></nav>
      </header>

      <section className="sound-practice-hero">
        <div className="section-shell">
          <p className="eyebrow">GAME AUDIO &amp; SOUND PRACTICE</p>
          <h1>声音设计进入游戏后，才成为可验证的体验</h1>
          <p>这些案例覆盖声音制作、交互集成、动态混音和运行时问题定位。重点不是展示工具名称，而是说明我如何发现听觉问题并推动修改。</p>
          <div className="tag-row"><span>Wwise</span><span>FMOD</span><span>Unity</span><span>Unreal Engine</span><span>动态混音</span><span>空间音频</span></div>
        </div>
      </section>

      <section className="content-section content-section--paper" aria-labelledby="practice-capability-title">
        <div className="section-shell">
          <header className="section-heading"><p className="eyebrow">01 / PRACTICE AREAS</p><h2 id="practice-capability-title">我处理哪些游戏音频问题</h2><p className="section-lead">从音效资产本身延伸到中间件、引擎状态和最终听觉表现。</p></header>
          <div className="practice-row">{practices.map(([number, title, body]) => <article key={number}><span className="practice-number">{number}</span><h3>{title}</h3><p>{body}</p></article>)}</div>
        </div>
      </section>

      <section className="content-section" aria-labelledby="integration-title">
        <div className="section-shell">
          <header className="section-heading"><p className="eyebrow">02 / INTERACTIVE AUDIO</p><h2 id="integration-title">交互声音如何与画面和状态连接</h2><p className="section-lead">两个公开案例分别展示智能座舱反馈设计，以及Wwise与Unity的配置、联调和运行时表现。</p></header>
          <div className="runtime-media-grid sound-video-grid">
            <figure className="runtime-media"><figcaption>交互声音设计｜智能座舱 HMI</figcaption><div className="runtime-embed"><iframe src="https://player.bilibili.com/player.html?isOutside=true&aid=115678921170383&bvid=BV1W2mABvEhG&cid=34575813914&p=1&autoplay=0" title="交互声音设计智能座舱HMI" loading="lazy" allowFullScreen scrolling="no" /></div><a className="runtime-fallback" href="https://www.bilibili.com/video/BV1W2mABvEhG/" target="_blank" rel="noreferrer">在Bilibili打开</a></figure>
            <figure className="runtime-media"><figcaption>GameKit3D + Wwise 全流程集成</figcaption><div className="runtime-embed"><iframe src="https://player.bilibili.com/player.html?isOutside=true&aid=116001815402657&bvid=BV1cyFuz5Ejd&cid=35778857476&p=1&autoplay=0" title="GameKit3D与Wwise全流程集成" loading="lazy" allowFullScreen scrolling="no" /></div><div className="sound-resource-links"><a className="runtime-fallback" href="https://www.bilibili.com/video/BV1cyFuz5Ejd/" target="_blank" rel="noreferrer">在Bilibili打开</a><a className="runtime-fallback" href="https://ziv0av2u21.feishu.cn/wiki/Vn5aw8hsBi776BkW0VWciETxnAe?from=from_copylink" target="_blank" rel="noreferrer">查看技术文档</a></div></figure>
          </div>
        </div>
      </section>

      <section className="content-section content-section--paper" aria-labelledby="runtime-title">
        <div className="section-shell">
          <header className="section-heading"><p className="eyebrow">03 / RUNTIME CASES</p><h2 id="runtime-title">运行时问题要回到修改前后验证</h2><p className="section-lead">以下案例只描述可观察到的表现和修改目标，不把结果包装成无法证明的底层原因。</p></header>
          <div className="runtime-case-list">
            <article className="runtime-case"><p className="eyebrow">案例01 / HITSTOP</p><h3>Hitstop时缓与声音逻辑协同</h3><p>通过修改前后视频检查时缓触发时的声音响应，让动作停顿、冲击反馈和底层逻辑保持一致。</p><div className="runtime-media-grid"><figure className="runtime-media"><figcaption>修改前</figcaption><video controls preload="none" aria-label="Hitstop修改前视频"><source src="/video/hitstop-before.mp4" type="video/mp4" /></video></figure><figure className="runtime-media"><figcaption>修改后</figcaption><video controls preload="none" aria-label="Hitstop修改后视频"><source src="/video/hitstop-after.mp4" type="video/mp4" /></video></figure></div></article>
            <article className="runtime-case"><p className="eyebrow">案例02 / DYNAMIC MIX</p><h3>动态混音与Snapshot切换</h3><p>通过混音调整SFX、音乐与人声的层级关系，并检查Snapshot切换时是否出现突兀的听感变化。</p><div className="runtime-media-grid"><figure className="runtime-media"><figcaption>混音案例一</figcaption><div className="runtime-embed"><iframe src="https://player.bilibili.com/player.html?isOutside=true&aid=116798179511695&bvid=BV1Wqjy6CEPF&cid=39335690503&p=2&autoplay=0" title="动态混音案例一" loading="lazy" allowFullScreen scrolling="no" /></div><a className="runtime-fallback" href="https://www.bilibili.com/video/BV1Wqjy6CEPF/?p=2" target="_blank" rel="noreferrer">在Bilibili打开</a></figure><figure className="runtime-media"><figcaption>混音案例二</figcaption><div className="runtime-embed"><iframe src="https://player.bilibili.com/player.html?isOutside=true&aid=116679816318744&bvid=BV1CAVz6DEwL&cid=38794496414&p=2&autoplay=0" title="动态混音案例二" loading="lazy" allowFullScreen scrolling="no" /></div><a className="runtime-fallback" href="https://www.bilibili.com/video/BV1CAVz6DEwL/?p=2" target="_blank" rel="noreferrer">在Bilibili打开</a></figure></div></article>
          </div>
        </div>
      </section>

      <section className="content-section" aria-labelledby="pipeline-title">
        <div className="section-shell">
          <header className="section-heading"><p className="eyebrow">04 / PIPELINE &amp; DELIVERY</p><h2 id="pipeline-title">资源组织与交付规则同样影响最终体验</h2></header>
          <div className="game-feature-grid">
            <article><p className="eyebrow">FMOD / UNITY资源组织</p><h3>按剧情章节拆分Bank</h3><p>音乐Bank原本约50 MB。由于自定义.bank转Unity Metadata与Byte数据的链路无法使用Stream，后续按剧情章节拆分为50个约2 MB的Bank，以减少单次加载规模和频繁加载。</p><div className="bank-diagram"><div className="bank-source"><b>原Music Bank</b><span>约50 MB</span></div><span className="bank-arrow" aria-hidden="true">→</span><div className="bank-target"><b>50 × 约2 MB</b><span>按剧情章节组织</span></div></div></article>
            <article><p className="eyebrow">音频交付与验收</p><h3>将交付规范变成可复查结果</h3><p>围绕格式、响度、真实峰值、瞬态和循环风险定义批量检查；工具负责筛查，最终听觉质量仍由人工判断。</p><ul className="check-list"><li>WAV / 24-bit / 48 kHz</li><li>短时LUFS</li><li>True Peak</li><li>瞬态对齐</li><li>循环零交叉</li><li>Click风险</li></ul><Link className="paper-link" href="/audio-validation-summary">查看音频验收案例</Link></article>
          </div>
        </div>
      </section>

      <footer className="site-footer section-shell"><div><strong>杜明</strong><span>游戏音频与声音实践</span></div><div><Link href="/">返回首页</Link><a href="https://space.bilibili.com/7927779" target="_blank" rel="noreferrer">Bilibili空间</a></div><small>© 2026 杜明</small></footer>
    </main>
  );
}

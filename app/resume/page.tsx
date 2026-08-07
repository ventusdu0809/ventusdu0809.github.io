import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "杜明｜AI音频数据评测与音频模型主观评测",
  description:
    "爱丁堡大学声音设计硕士杜明的AI音频评测简历，包含Text-to-Audio评测集构建、主观听评、Bad Case分析、声画同步和环境音效判断经验。",
};

export default function ResumePage() {
  return (
    <main className="resume-page">
      {/* ── 顶部导航 ── */}
      <nav className="resume-nav no-print" aria-label="简历导航">
        <Link href="/" className="resume-back">
          ← 返回作品集
        </Link>
        <button
          type="button"
          className="resume-print-btn"
          onClick={() => window.print()}
          aria-label="打印或保存为 PDF"
        >
          打印 / 保存 PDF
        </button>
      </nav>

      <div className="resume-shell">
        {/* ══════ Hero ══════ */}
        <header className="resume-hero">
          <div className="resume-hero-main">
            <h1 className="resume-name">杜明</h1>
            <p className="resume-role">AI 音频数据评测</p>
            <p className="resume-tagline">
              声音设计硕士 · 音频模型主观评测 · 声画同步与环境音效判断
            </p>
            <p className="resume-bio">
              爱丁堡大学声音设计硕士，具备游戏、影视及交互音频制作经历。独立完成
              Text-to-Audio
              模型评测项目，覆盖评测集构建、音频质检、盲听评分、Bad Case
              标注、隐藏重复、复测裁决及基础统计，能够将专业听感转化为结构化、可复核的评测结论。
            </p>
          </div>

          <address className="resume-contact">
            <a href="tel:15309993915">15309993915</a>
            <a href="mailto:mingdu0809@qq.com">mingdu0809@qq.com</a>
            <a
              href="https://sound-ventus.mingdu0809.workers.dev"
              target="_blank"
              rel="noreferrer"
            >
              AI 音频评测作品集
            </a>
          </address>
        </header>

        {/* ══════ 数据成果条 ══════ */}
        <section className="resume-stats" aria-label="项目核心数据">
          <div>
            <strong>40</strong>
            <span>测试 Prompt</span>
          </div>
          <div>
            <strong>600</strong>
            <span>正式样本</span>
          </div>
          <div>
            <strong>660</strong>
            <span>试听评测</span>
          </div>
          <div>
            <strong>95% / 98%</strong>
            <span>OVL / REL within-1</span>
          </div>
          <p className="resume-stats-note">
            数据来自个人 Text-to-Audio
            评测项目；隐藏重复为单评测员一致性，不代表多人评测员一致性。
          </p>
        </section>

        {/* ══════ 核心能力 ══════ */}
        <section className="resume-competencies" aria-labelledby="comp-title">
          <h2 id="comp-title" className="resume-section-title">
            核心能力
          </h2>
          <div className="resume-comp-grid">
            <article>
              <h3>音频模型评测</h3>
              <p>
                评测集构建、主观听评、OVL / REL 评分、Bad Case 分类、盲测、隐藏重复、复测裁决、评测报告
              </p>
            </article>
            <article>
              <h3>专业听感与问题判断</h3>
              <p>
                音质、音色、声场、底噪、爆音、失真、伪影、截断、材质与声源匹配、事件时间关系
              </p>
            </article>
            <article>
              <h3>声画同步与环境音效</h3>
              <p>
                声画同步、环境音效匹配、Foley、空间音频、多声源层次、声音遮蔽与音量平衡判断
              </p>
            </article>
          </div>
        </section>

        {/* ══════ 主体双栏 ══════ */}
        <div className="resume-body">
          {/* ── 主栏 ── */}
          <div className="resume-main-col">
            {/* AI 音频评测项目 */}
            <section
              className="resume-featured"
              aria-labelledby="featured-title"
            >
              <h2 id="featured-title" className="resume-section-title">
                AI 音频模型评测项目
              </h2>

              <article className="resume-entry resume-entry--featured">
                <header className="resume-entry-header">
                  <div className="resume-entry-title-group">
                    <h3>Text-to-Audio 专项评测</h3>
                    <p>SAO1 PoC 与 SAO1 v2 / SA3M 受控对比</p>
                    <p className="resume-entry-meta">
                      个人项目 · 评测集构建 · 盲听评分 · Bad Case 分析 · 评测报告
                    </p>
                  </div>
                  <time dateTime="2026-07">2026.07</time>
                </header>

                <ul className="resume-bullets">
                  <li>
                    独立搭建 Text-to-Audio
                    音频模型评测流程，覆盖测试样本构建、音频质检、盲听评分、问题标注、隐藏重复、复测裁决及报告输出。
                  </li>
                  <li>
                    围绕环境声、动作事件、材质、音色纹理、次数控制、时间顺序和次要事件等维度审核
                    40 条 Prompt，累计完成 600 个正式样本和 660 次试听评测。
                  </li>
                  <li>
                    建立 OVL 整体质量、REL 文本相关性评分及 Bad Case
                    分类体系；通过单评测员隐藏重复验证评分稳定性，OVL within-1
                    为 95%，REL within-1 为 98%。
                  </li>
                  <li>
                    统计问题发生率、模型差异和变化趋势，识别声源错误、次要事件缺失、次数控制、噪声纹理及人工伪影等能力短板，并输出结构化报告和可追溯审计材料。
                  </li>
                </ul>

                <Link className="resume-entry-link" href="/t2a-case-study">
                  查看完整评测项目 →
                </Link>
              </article>
            </section>

            {/* 声画与声音设计项目 */}
            <section aria-labelledby="sound-title">
              <h2 id="sound-title" className="resume-section-title">
                声画与声音设计项目
              </h2>

              <div className="resume-sub-projects">
                <article className="resume-entry resume-entry--sub">
                  <header className="resume-entry-header">
                    <div className="resume-entry-title-group">
                      <h3>The Explorer</h3>
                      <p>Unity 3D Game Kit 音频系统重构</p>
                      <p className="resume-entry-meta">
                        个人项目 · 交互音频、动态混音与音频规范
                      </p>
                    </div>
                    <time dateTime="2025-10/2026-02">2025.10 — 2026.02</time>
                  </header>
                  <ul className="resume-bullets">
                    <li>
                      整理音频命名、ID、优先级、响度及交付流程规范，建立可复核的音频资产质量标准；基于
                      Wwise 与 Unity
                      完成环境声、空间混响及动态混音配置，并通过 Profiler
                      检查并发声音、声部优先级和性能异常。
                    </li>
                  </ul>
                </article>

                <article className="resume-entry resume-entry--sub">
                  <header className="resume-entry-header">
                    <div className="resume-entry-title-group">
                      <h3>Backrooms</h3>
                      <p>7.1.2 杜比全景声影视声音设计</p>
                      <p className="resume-entry-meta">
                        个人项目 · 空间声音、声画叙事与环境声设计
                      </p>
                    </div>
                    <time dateTime="2024-03/2024-05">2024.03 — 2024.05</time>
                  </header>
                  <ul className="resume-bullets">
                    <li>
                      采用 7.1.2
                      杜比全景声完成影视声音设计，从声源定位、空间层次、环境反射、低频控制及叙事节奏等维度设计并检查整体听觉体验。
                    </li>
                  </ul>
                </article>
              </div>
            </section>

            {/* 工作经历 */}
            <section aria-labelledby="work-title">
              <h2 id="work-title" className="resume-section-title">
                工作经历
              </h2>

              <div className="resume-timeline">
                <article className="resume-entry">
                  <header className="resume-entry-header">
                    <div className="resume-entry-title-group">
                      <h3>杭州千乎网络</h3>
                      <p>游戏音频策划 / 声音设计 · 《辉烬》</p>
                    </div>
                    <time dateTime="2026-03/2026-07">2026.03 — 2026.07</time>
                  </header>
                  <ul className="resume-bullets">
                    <li>
                      参与战斗音效设计、动态混音和音频效果实机评测，按动作、武器和战斗事件拆分声音层级；通过修改前后对比检查
                      Snapshot、Sidechain Ducking 及高频战斗场景中关键声音的可辨识性。
                    </li>
                    <li>
                      与直属领导共同起草并迭代音频外包制作与交付规范，明确文件格式、命名、短时响度、True
                      Peak、瞬态对齐、循环零交叉及 Click
                      风险等验收标准；参与将验收标准转化为自动检查规则，负责规则审核、样例核验、问题反馈与迭代。
                    </li>
                  </ul>
                </article>

                <article className="resume-entry">
                  <header className="resume-entry-header">
                    <div className="resume-entry-title-group">
                      <h3>杭州伏腊</h3>
                      <p>游戏音效设计师 / 声音设计</p>
                    </div>
                    <time dateTime="2025-03/2025-07">2025.03 — 2025.07</time>
                  </header>
                  <ul className="resume-bullets">
                    <li>
                      参与 UE5
                      游戏及多款微信小游戏的音频需求梳理，整理音频需求文档与资产验收标准，检查音质、响度、触发逻辑及场景匹配。
                    </li>
                    <li>
                      基于 Unity 与 Wwise 完成 UI
                      及交互音频配置，围绕视觉动效、交互状态和声音触发时机检查声画协调性；负责过场动画和环境声音配置，从声源位置、空间衰减、遮挡、混响及前后景关系等维度判断场景声音合理性。
                    </li>
                  </ul>
                </article>

                <article className="resume-entry">
                  <header className="resume-entry-header">
                    <div className="resume-entry-title-group">
                      <h3>凤凰艺术</h3>
                      <p>多媒体视听内容编辑</p>
                    </div>
                    <time dateTime="2021-10/2022-01">2021.10 — 2022.01</time>
                  </header>
                  <ul className="resume-bullets">
                    <li>
                      负责艺术展览、采访及纪录片现场录音，在复杂环境中完成声音采集和素材质量检查；使用
                      iZotope RX
                      进行频谱检查、降噪和音频修复，识别并处理底噪、杂音、爆音、失真及其他音频缺陷。
                    </li>
                  </ul>
                </article>
              </div>
            </section>
          </div>

          {/* ── 侧栏 ── */}
          <aside className="resume-side-col">
            {/* 教育背景 */}
            <section aria-labelledby="edu-title">
              <h2 id="edu-title" className="resume-section-title">
                教育背景
              </h2>
              <article className="resume-side-entry">
                <h3>爱丁堡大学</h3>
                <p>声音设计硕士 MSc</p>
                <time dateTime="2023-09/2024-11">2023.09 — 2024.11</time>
                <p className="resume-side-detail">
                  影视声音、交互音频、空间声音、声音与画面关系、创意声音技术
                </p>
              </article>
              <article className="resume-side-entry">
                <h3>米兰布雷拉美术学院</h3>
                <p>新技术艺术本科 BA</p>
                <time dateTime="2017-10/2022-03">2017.10 — 2022.03</time>
                <p className="resume-side-detail">
                  摄影、视频、动画、新媒体与装置艺术
                </p>
              </article>
            </section>

            {/* 工具与技能 */}
            <section aria-labelledby="skills-title">
              <h2 id="skills-title" className="resume-section-title">
                工具与技能
              </h2>

              <div className="resume-side-entry">
                <h3>音频工具</h3>
                <p>
                  Cubase、Reaper、Audition、iZotope RX、Wwise、Unity、Unreal
                  Engine、Dolby Atmos Renderer
                </p>
              </div>

              <div className="resume-side-entry">
                <h3>数据工具</h3>
                <p>Excel（数据筛选、排序、基础函数、条件格式、基础统计）</p>
                <p className="resume-side-detail">
                  Python / pandas
                  基础：可在 AI
                  辅助下完成评分表整理、字段检查与简单统计
                </p>
              </div>
            </section>

            {/* 语言 */}
            <section aria-labelledby="lang-title">
              <h2 id="lang-title" className="resume-section-title">
                语言
              </h2>
              <ul className="resume-lang-list">
                <li>英语</li>
                <li>意大利语</li>
              </ul>
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
}

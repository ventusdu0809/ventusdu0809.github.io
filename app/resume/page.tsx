import type { Metadata } from "next";
import Link from "next/link";
import { PrintResumeButton } from "./PrintResumeButton";
import "./resume.css";

export const metadata: Metadata = {
  title: "杜明｜AI音频数据评测与音频模型主观评测",
  description:
    "爱丁堡大学声音设计硕士杜明的AI音频评测简历，包含Text-to-Audio评测集构建、主观听评、Bad Case分析，以及新增的两轮音视频生成诊断性评测。",
};

const abilities = [
  {
    number: "01",
    title: "音频模型评测",
    body: "评测集构建、主观听评、OVL / REL评分、Bad Case分类、盲测、隐藏重复、复测裁决、评测报告。",
  },
  {
    number: "02",
    title: "专业听感与问题判断",
    body: "音质、音色、声场、底噪、爆音、失真、伪影、截断、材质与声源匹配、事件时间关系。",
  },
  {
    number: "03",
    title: "声画同步与环境音效",
    body: "声画同步、环境音效匹配、Foley、空间音频、多声源层次、声音遮蔽与音量平衡判断。",
  },
];

const workExperience = [
  {
    company: "杭州千乎网络",
    role: "游戏音频策划 / 声音设计 · 《辉烬》",
    date: "2026.03—2026.07",
    points: [
      "参与战斗音效设计、动态混音和音频效果实机评测，按动作、武器和战斗事件拆分声音层级；通过修改前后对比检查Snapshot、Sidechain Ducking及高频战斗场景中关键声音的可辨识性。",
      "与直属领导共同起草并迭代音频外包制作与交付规范，明确文件格式、命名、短时响度、True Peak、瞬态对齐、循环零交叉及Click风险等验收标准；参与将验收标准转化为自动检查规则，负责规则审核、样例核验、问题反馈与迭代。",
      "按剧情章节拆分50个FMOD Bank，降低单次加载压力与无关资源常驻。",
    ],
    links: [
      { href: "/sound-practice", label: "查看游戏音频案例" },
      { href: "/audio-validation-summary", label: "查看音频资产验收案例" },
    ],
  },
  {
    company: "杭州伏腊",
    role: "游戏音效设计师 / 声音设计",
    date: "2025.03—2025.07",
    points: [
      "参与UE5恐怖游戏及多款小游戏的音频需求整理、声音制作与交付检查，编写音频需求文档并整理资产验收标准。",
      "基于Unity / Wwise配置UI状态反馈和RTPC；在UE5中处理Attenuation、Occlusion与空间音频，使声音响应交互状态、视觉动效和场景空间。",
    ],
  },
  {
    company: "凤凰艺术",
    role: "多媒体视听内容编辑",
    date: "2021.10—2022.01",
    points: [
      "负责艺术展览、采访及纪录片现场录音，在复杂环境中完成声音采集和素材质量检查；使用iZotope RX进行频谱检查、降噪和音频修复，识别并处理底噪、杂音、爆音、失真及其他音频缺陷。",
    ],
  },
];

export default function ResumePage() {
  return (
    <main className="resume-page">
      <div className="resume-shell">
        <nav className="resume-nav" aria-label="简历页面导航">
          <Link className="resume-back-link" href="/" aria-label="返回AI音频评测作品集">
            ← 返回作品集
          </Link>
          <PrintResumeButton />
        </nav>

        <header className="resume-hero">
          <div className="resume-hero-copy">
            <p className="resume-eyebrow">AI AUDIO EVALUATION</p>
            <h1>杜明</h1>
            <p className="resume-role">AI音频数据评测</p>
            <p className="resume-specialties">声音设计硕士 · 音频模型主观评测 · 声画同步与环境音效判断</p>
            <p className="resume-intro">
              爱丁堡大学声音设计硕士，具备游戏、影视及交互音频制作经历。独立完成Text-to-Audio模型评测项目，覆盖评测集构建、音频质检、盲听评分、Bad Case标注、隐藏重复、复测裁决及基础统计；并进一步扩展到两轮诊断性音视频生成评测，将专业视听判断转化为结构化、可复核的结论。
            </p>
          </div>

          <address className="resume-contact" aria-label="联系方式">
            <a href="mailto:mingdu0809@qq.com" aria-label="发送邮件至 mingdu0809@qq.com">
              <span>邮箱</span>
              mingdu0809@qq.com
            </a>
            <Link href="/t2a-case-study" aria-label="查看AI音频评测作品集">
              <span>作品集</span>
              AI音频评测作品集 →
            </Link>
          </address>
        </header>

        <section className="resume-metrics" aria-label="Text-to-Audio个人项目数据成果">
          <p className="resume-metrics-note">以下数据来自个人Text-to-Audio评测项目；隐藏重复衡量单评测员的within-1复测稳定性。</p>
          <div className="resume-metrics-grid">
            <div><strong>40</strong><span>测试Prompt</span></div>
            <div><strong>600</strong><span>正式样本</span></div>
            <div><strong>660</strong><span>试听评测</span></div>
            <div><strong>95% / 98%</strong><span>OVL / REL within-1</span></div>
          </div>
        </section>

        <section className="resume-section" aria-labelledby="abilities-title">
          <div className="resume-section-heading">
            <p>核心能力</p>
            <h2 id="abilities-title">将听感判断转化为可复核的评测记录</h2>
          </div>
          <div className="ability-grid">
            {abilities.map((ability) => (
              <article className="ability-card" key={ability.number}>
                <span aria-hidden="true">{ability.number}</span>
                <h3>{ability.title}</h3>
                <p>{ability.body}</p>
              </article>
            ))}
          </div>
        </section>

        <div className="resume-content-grid">
          <div className="resume-main-column">
            <section className="resume-section resume-primary-section" aria-labelledby="t2a-title">
              <div className="resume-section-heading">
                <p>重点项目</p>
                <h2 id="t2a-title">AI音频与音视频生成评测项目</h2>
              </div>
              <article className="t2a-project">
                <div className="entry-header">
                  <div className="entry-title-group">
                    <h3>Text-to-Audio专项评测</h3>
                    <p>SAO1 PoC与SAO1 / SA3M受控对比</p>
                  </div>
                  <time dateTime="2026-07">2026.07</time>
                </div>
                <p className="entry-meta">个人项目 · 评测集构建 · 盲听评分 · Bad Case分析 · 评测报告</p>
                <ol className="resume-points">
                  <li>独立搭建Text-to-Audio音频模型评测流程，覆盖测试样本构建、音频质检、盲听评分、问题标注、隐藏重复、复测裁决及报告输出。</li>
                  <li>围绕环境声、动作事件、材质、音色纹理、次数控制、时间顺序和次要事件等维度审核40条Prompt，累计完成600个正式样本和660次试听评测。</li>
                  <li>建立OVL整体质量、REL文本相关性评分及Bad Case分类体系；单评测员隐藏重复中，OVL within-1为95%，REL within-1为98%。</li>
                  <li>统计问题发生率、模型差异和变化趋势，识别声源错误、次要事件缺失、次数控制、噪声纹理及人工伪影等能力短板，并输出结构化报告和可追溯审计材料。</li>
                </ol>
                <aside className="responsibility-boundary">
                  <strong>个人贡献边界</strong>
                  <p>五层评测框架、听评方法、正式评分和Bad Case裁决由本人完成；AI用于资料归纳、代码实现和批处理执行，本人负责规则提出、结果审核与修改意见。</p>
                </aside>
                <Link className="resume-arrow-link" href="/t2a-case-study">查看完整评测项目 →</Link>
              </article>
              <article className="t2a-project resume-project-secondary">
                <div className="entry-header">
                  <div className="entry-title-group">
                    <h3>Audio-Visual Generation Evaluation</h3>
                    <p>Cross-Round Analysis v1.0 · 两轮诊断性 T2VA 评测</p>
                  </div>
                  <time dateTime="2026-08">2026.08</time>
                </div>
                <p className="entry-meta">个人项目 · Point → Line → Scene + Quality · Controlled Regression · Failure Localization</p>
                <ol className="resume-points">
                  <li>在原有T2A评测实践上扩展Point → Line → Scene + Quality分层框架，以Round-1 Discovery发现Bad Case，再通过Round-2 Controlled Regression按预先定义的观察字段与判定规则验证。</li>
                  <li>将Text→Visual与Visual→Audio分开定位；三个可精确判定案例均呈现3→4→4，冻结为Repeated Diagnostic Pattern，避免将视觉阶段数量偏差误归为Audio Counting Failure。</li>
                  <li>综合Not Replicated、Mixed / Refined与独立Quality Gate形成研发优先级：降低未复现问题优先级，细化动态专项测试，并持续关注音频质量风险。</li>
                </ol>
                <Link className="resume-arrow-link" href="/audio-visual-evaluation">查看新增T2VA评测项目 →</Link>
                <Link className="resume-arrow-link resume-related-link" href="/point-line-scene-framework">查看PLS理论框架 →</Link>
              </article>
            </section>

            <section className="resume-section" aria-labelledby="supporting-projects-title">
              <div className="resume-section-heading compact-heading">
                <p>补充项目</p>
                <h2 id="supporting-projects-title">声画与声音设计</h2>
              </div>
              <div className="supporting-projects">
                <article className="supporting-project">
                  <div className="entry-header">
                    <div className="entry-title-group">
                      <h3>The Explorer</h3>
                      <p>Unity 3D Game Kit音频系统重构</p>
                    </div>
                    <time dateTime="2025-10">2025.10—2026.02</time>
                  </div>
                  <p>整理音频命名、ID、优先级、响度及交付流程规范，建立可复核的音频资产质量标准；基于Wwise与Unity完成环境声、空间混响及动态混音配置，并通过Profiler检查并发声音、声部优先级和性能异常。</p>
                  <Link className="resume-arrow-link" href="/sound-practice">查看相关案例 →</Link>
                </article>
                <article className="supporting-project">
                  <div className="entry-header">
                    <div className="entry-title-group">
                      <h3>Backrooms</h3>
                      <p>7.1.2杜比全景声影视声音设计</p>
                    </div>
                    <time dateTime="2024-03">2024.03—2024.05</time>
                  </div>
                  <p>采用7.1.2杜比全景声完成影视声音设计，从声源定位、空间层次、环境反射、低频控制及叙事节奏等维度设计并检查整体听觉体验。</p>
                </article>
              </div>
            </section>

            <section className="resume-section resume-work-section" aria-labelledby="experience-title">
              <div className="resume-section-heading">
                <p>工作经历</p>
                <h2 id="experience-title">声音制作、验收与运行时判断</h2>
              </div>
              <div className="experience-timeline">
                {workExperience.map((experience) => (
                  <article className="experience-entry" key={`${experience.company}-${experience.date}`}>
                    <div className="entry-header">
                      <div className="entry-title-group">
                        <h3>{experience.company}</h3>
                        <p>{experience.role}</p>
                      </div>
                      <time dateTime={experience.date.slice(0, 7).replace(".", "-")}>{experience.date}</time>
                    </div>
                    <ul className="experience-points">
                      {experience.points.map((point) => <li key={point}>{point}</li>)}
                    </ul>
                    {experience.links && (
                      <div className="entry-links">
                        {experience.links.map((link) => <Link href={link.href} key={link.href}>{link.label} →</Link>)}
                      </div>
                    )}
                  </article>
                ))}
              </div>
            </section>
          </div>

          <aside className="resume-sidebar" aria-label="教育、工具与语言">
            <section className="sidebar-section" aria-labelledby="education-title">
              <h2 id="education-title">教育背景</h2>
              <article className="education-entry">
                <h3>爱丁堡大学</h3>
                <p>声音设计硕士 MSc</p>
                <time dateTime="2023-09">2023.09—2024.11</time>
                <small>影视声音、交互音频、空间声音、声音与画面关系、创意声音技术</small>
              </article>
              <article className="education-entry">
                <h3>米兰布雷拉美术学院</h3>
                <p>新技术艺术本科 BA</p>
                <time dateTime="2017-10">2017.10—2022.03</time>
                <small>摄影、视频、动画、新媒体与装置艺术</small>
              </article>
            </section>

            <section className="sidebar-section" aria-labelledby="tools-title">
              <h2 id="tools-title">工具与技能</h2>
              <dl className="sidebar-definition-list">
                <div><dt>音频工具</dt><dd>Cubase、Reaper、Audition、iZotope RX、Wwise、Unity、Unreal Engine、Dolby Atmos Renderer</dd></div>
                <div><dt>数据工具</dt><dd>Excel：数据筛选、排序、基础函数、条件格式、基础统计</dd></div>
                <div><dt>Python / pandas基础</dt><dd>可在AI辅助下完成评分表整理、字段检查与简单统计</dd></div>
              </dl>
            </section>

            <section className="sidebar-section" aria-labelledby="languages-title">
              <h2 id="languages-title">语言</h2>
              <p className="language-list">英语<br />意大利语</p>
            </section>
          </aside>
        </div>

        <footer className="resume-footer">
          <p>公开简历版本｜内容对应可展示的项目材料与案例页面。</p>
          <div>
            <Link href="/t2a-case-study">T2A评测案例</Link>
            <Link href="/audio-visual-evaluation">T2VA评测案例</Link>
            <Link href="/point-line-scene-framework">PLS理论框架</Link>
            <Link href="/sound-practice">游戏音频案例</Link>
            <Link href="/audio-validation-summary">音频资产验收案例</Link>
          </div>
        </footer>
      </div>
    </main>
  );
}

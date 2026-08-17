import type { Metadata } from "next";
import Link from "next/link";
import { PrintResumeButton } from "./PrintResumeButton";
import "./resume.css";

export const metadata: Metadata = {
  title: "杜明｜AI音频评测与音视频生成评测",
  description:
    "爱丁堡大学声音设计硕士杜明的AI音频评测简历，包含Text-to-Audio评测集构建、主观听评、Bad Case分析，以及新增的两轮音视频生成诊断性评测。",
};

const abilities = [
  {
    number: "01",
    title: "音频与音视频生成评测",
    body: "主观听评、分层能力框架、Bad Case 发现、Controlled Regression、失败定位与研发优先级。",
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
      "参与UE5游戏及多款微信小游戏的音频需求梳理，整理音频需求文档与资产验收标准，检查音质、响度、触发逻辑及场景匹配。",
      "基于Unity与Wwise完成UI及交互音频配置，围绕视觉动效、交互状态和声音触发时机检查声画协调性；负责过场动画和环境声音配置，从声源位置、空间衰减、遮挡、混响及前后景关系等维度判断场景声音合理性。",
      "通过动态混音、优先级和并发限制处理复杂声场，积累多事件重叠、声音遮蔽、响度失衡及次要声音缺失的排查经验。",
    ],
  },
  {
    company: "成都锦泰麓山丰田",
    role: "摄影摄像 / 视频制作",
    date: "2022.08—2023.02",
    points: [
      "负责品牌活动、产品及直播内容的摄影摄像与现场视听环境搭建，参与灯光、音视频设备调试及素材制作，积累画面构图、动作时序、现场声音与视听内容协调的实际经验。",
    ],
  },
  {
    company: "凤凰艺术",
    role: "多媒体视听内容编辑",
    date: "2021.10—2022.01",
    points: [
      "负责艺术展览、采访及纪录片现场录音，在复杂环境中完成声音采集和素材质量检查；使用iZotope RX进行频谱检查、降噪和音频修复，识别并处理底噪、杂音、爆音、失真等音频缺陷；完成纪录片和采访内容的音频编辑及混音，检查声音清晰度、音量平衡和画面内容匹配。",
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
            <p className="resume-role">AI音频数据评测 ｜ 音频模型主观评测</p>
            <p className="resume-specialties">声音设计硕士 · 音频模型主观评测 · 声画同步与环境音效判断</p>
            <p className="resume-intro">
              爱丁堡大学声音设计硕士，声音实践横跨广播剧制作、影视声画研究、交互装置与游戏音频，长期关注声音在叙事、画面、空间与交互中的关系。现聚焦AI音频模型与音视频生成评测，完成Text-to-Audio主观评测及两轮Audio-Visual Generation Evaluation，能够结合专业听感与声画经验进行分层诊断、定位跨模态失败链路，并将Bad Case转化为可复核的评测结论与研发优先级建议。
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
                    <h3>Audio-Visual Generation Evaluation ｜ Cross-Round Analysis v1.0</h3>
                    <p>分层评测框架 · Bad Case 分析 · Controlled Regression 与研发反馈</p>
                  </div>
                  <time dateTime="2026-08">2026.08</time>
                </div>
                <p className="entry-meta">个人项目 · 分层评测框架 · Bad Case 分析 · Controlled Regression · 研发反馈</p>
                <ol className="resume-points">
                  <li>构建Point → Line → Scene + Quality分层评测框架，围绕事件完整性、计数、声画起点、时序、动态对应、场景一致性及音频质量完成两轮诊断性评测。</li>
                  <li>基于Round-1 Discovery设计Round-2 Controlled Regression，拆分Text→Visual与Visual→Audio失败链路；3个可精确判定案例均出现「Prompt要求3次 → Video生成4次 → Audio对应4次」，将计数偏差定位至视觉生成阶段，避免误判为Audio Counting Failure。</li>
                  <li>将结果区分为Repeated Diagnostic Pattern、Not Replicated、Mixed / Refined与独立Quality Gate，并转化为回归优先级、失败定位及后续专项验证方向。</li>
                </ol>
                <Link className="resume-arrow-link" href="/audio-visual-evaluation">查看音视频生成评测项目 →</Link>
                <Link className="resume-arrow-link resume-related-link" href="/point-line-scene-framework">查看 PLS 研究方法 →</Link>
              </article>
              <article className="t2a-project resume-project-secondary">
                <div className="entry-header">
                  <div className="entry-title-group">
                    <h3>Text-to-Audio专项评测 ｜ SAO1 PoC 与 SAO1 v2 / SA3M 受控对比</h3>
                    <p>评测集构建 · 盲听评分 · Bad Case 分析与评测报告</p>
                  </div>
                  <time dateTime="2026-07">2026.07</time>
                </div>
                <p className="entry-meta">个人项目 · 评测集构建 · 盲听评分 · Bad Case 分析 · 评测报告</p>
                <ol className="resume-points">
                  <li>独立搭建Text-to-Audio评测流程，审核40条测试Prompt，覆盖音频质检、盲听评分、问题标注、隐藏重复与复测裁决，累计完成600个正式样本和660次试听评测。</li>
                  <li>建立OVL整体质量、REL文本相关性及Bad Case分类体系；通过单评测员隐藏重复检查评分稳定性，OVL within-1为95%，REL within-1为98%。</li>
                  <li>分析问题发生率、模型差异与变化趋势，识别声源错误、次要事件缺失、次数控制、噪声纹理及人工伪影等短板，并输出结构化评测报告。</li>
                </ol>
                <aside className="responsibility-boundary">
                  <strong>个人贡献边界</strong>
                  <p>T2A 评测规则、听评方法、正式评分和 Bad Case 裁决由本人完成；AI 用于资料归纳、代码实现和批处理执行，本人负责规则提出、结果审核与修改意见。</p>
                </aside>
                <Link className="resume-arrow-link" href="/t2a-case-study">查看完整评测项目 →</Link>
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
                <h3>爱丁堡大学（University of Edinburgh）</h3>
                <p>声音设计硕士（MSc）</p>
                <time dateTime="2023-09">2023.09—2024.11</time>
                <small>影视声音、交互音频、空间声音、声音与画面关系、创意声音技术</small>
              </article>
              <article className="education-entry">
                <h3>米兰布雷拉美术学院（Accademia Di Brera）</h3>
                <p>新技术艺术本科（BA）</p>
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
            <Link href="/audio-visual-evaluation">音视频生成评测</Link>
            <Link href="/point-line-scene-framework">PLS 研究方法</Link>
            <Link href="/sound-practice">游戏音频案例</Link>
            <Link href="/audio-validation-summary">音频资产验收案例</Link>
          </div>
        </footer>
      </div>
    </main>
  );
}

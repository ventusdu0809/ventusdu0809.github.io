import type { Metadata } from "next";
import Link from "next/link";
import { PrintResumeButton } from "./PrintResumeButton";
import "./resume.css";
import { ResumePrint } from "./ResumePrint";

export const metadata: Metadata = {
  title: "杜明｜多模态 Agent 与 AI 音视频评测",
  description:
    "杜明的多模态 Agent 与 AI 音视频评测简历，包含 Agent Workflow、自动 QC、失败定位、局部修复及音视频创作经历。",
};

const abilities = [
  {
    "number": "01",
    "title": "Agent Workflow",
    "body": "结构化需求、工具编排、QC / Repair"
  },
  {
    "number": "02",
    "title": "AI 音视频评测",
    "body": "原子评测、证据路由、受控回归"
  },
  {
    "number": "03",
    "title": "音视频创作",
    "body": "声音设计、视频制作、游戏音频、声画判断"
  },
  {
    "number": "04",
    "title": "快速原型",
    "body": "Vibe Coding / AI 辅助开发、Python 基础"
  }
];

const workExperience: {company:string; role:string; date:string; points:string[]; links:{href:string;label:string}[]}[] = [
  {
    "company": "杭州千乎网络",
    "role": "游戏音频策划 / 声音设计 ｜《辉烬》",
    "date": "2026.03 - 2026.07",
    "points": [
      "参与战斗音效、动态混音及实机评测，按动作、武器与事件拆分声音需求；对比修改前后 Snapshot、Sidechain Ducking 与复杂战斗中的关键声音可辨识性。",
      "与直属领导共同起草、迭代外包制作与交付规范，将格式、响度、True Peak、瞬态、循环与 Click 风险整理为验收项；参与自动检查规则转化，负责规则审核、样例核验与反馈。"
    ],
    "links": []
  },
  {
    "company": "杭州伏腊",
    "role": "游戏音效设计师 / 声音设计",
    "date": "2025.03 - 2025.07",
    "points": [
      "参与 UE5 游戏与微信小游戏的音频需求梳理、资产验收；基于 Unity / Wwise 配置 UI、交互、过场及环境声音，检查触发逻辑、声画协调、空间关系与场景匹配。"
    ],
    "links": []
  },
  {
    "company": "成都锦泰麓山丰田",
    "role": "摄影摄像 / 视频制作",
    "date": "2022.08 - 2023.02",
    "points": [
      "负责品牌活动、产品及直播的摄影摄像与现场视听环境搭建，参与灯光、音视频设备调试与素材制作。"
    ],
    "links": []
  }
];

export default function ResumePage() {
  return (
    <main className="resume-page">
      <div className="resume-shell">
        <nav className="resume-nav" aria-label="简历页面导航">
          <Link className="resume-back-link" href="/" aria-label="返回 多模态 Agent 与 AI 音视频评测作品集">
            ← 返回作品集
          </Link>
          <PrintResumeButton />
        </nav>

        <header className="resume-hero">
          <div className="resume-hero-copy">
            
            <h1>杜明</h1>
            <p className="resume-role">多模态 Agent 与 AI 音视频评测</p>
            <p className="resume-specialties">声音设计硕士 · 音视频创作者背景 · Agent Workflow · 自动 QC / 失败定位</p>
            <p className="resume-intro">爱丁堡大学声音设计硕士，具备游戏音频与视频制作经历。聚焦多模态 Agent 与创作工作流，通过 AI 辅助开发搭建需求编译、时间线执行、质检与局部修复原型；结合专业声画判断和模型评测经验，将创作要求转化为可验证条件与回归案例。</p>
          </div>

          <address className="resume-contact" aria-label="联系方式">
<a href="tel:15309993915"><span>电话</span>15309993915</a>
            <a href="mailto:mingdu0809@qq.com" aria-label="发送邮件至 mingdu0809@qq.com">
              <span>邮箱</span>
              mingdu0809@qq.com
            </a>
            <Link href="/" aria-label="查看 多模态 Agent 与 AI 音视频评测作品集">
              <span>作品集</span>
              多模态 Agent 与 AI 音视频评测作品集 →
            </Link>
          </address>
        </header>



        <section className="resume-section" aria-labelledby="abilities-title">
          <div className="resume-section-heading">
            <p>核心能力</p>
            <h2 id="abilities-title">Agent、评测与音视频创作</h2>
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
                <h2 id="t2a-title">Agent 与 AI 评测项目</h2>
              </div>
<article className="t2a-project ">
<div className="entry-header"><div className="entry-title-group"><h3>多模态音视频 Agent Evaluation &amp; Repair Workflow</h3><p>个人项目</p></div><time>2026.09</time></div>
<ol className="resume-points"><li>独立设计并通过 AI 辅助开发搭建自然语言 → Compiler → Planner → 可编辑 Timeline → 执行 / 渲染 → Evaluate / Repair 原型，处理配音、Logo、CTA 与 BGM ducking 等约束。</li><li>建立 Evidence Routing、Atomic Evaluation 与 Dependency 机制，按需求选择文本、时间线、音频或视觉证据，定位失败 Unit；视觉证据采用人工辅助审核（review-assisted）。</li><li>基于 Failure Localization 生成 Targeted Repair，并复测目标条件与原有正确条件；受控故障案例中修复 Logo 时序和配音期间 BGM 压低问题，保留修复前后证据与 Regression Set。</li><li>构建 10 Case 受控回归集，判断结果 10/10 符合预期、已支持自动修复 8/8；另完成 10 Case 端到端自然语言实测，保留 4 项真实失败及 Compiler / Plan Gate 阶段归因。</li></ol>
<Link className="resume-arrow-link" href="/creative-qc-agent">查看 Agent 项目 →</Link>
</article>
<article className="t2a-project resume-project-secondary">
<div className="entry-header"><div className="entry-title-group"><h3>Audio-Visual Generation Evaluation ｜ 跨轮诊断</h3><p>个人项目</p></div><time>2026.08</time></div>
<ol className="resume-points"><li>构建 Point → Line → Scene + Quality 分层框架，完成两轮事件完整性、计数、声画时序、动态对应、场景一致性与音质评测；由首轮发现设计次轮 Controlled Regression。</li><li>拆分 Text → Visual → Audio 失败链路：3 个可精确判定案例均为“要求 3 次 → 画面 4 次 → 声音 4 次”，将计数偏差定位到视觉生成阶段；整理复现、未复现及混合结论，为 QC 与回归集提供案例。</li></ol>
<Link className="resume-arrow-link" href="/audio-visual-evaluation">查看音视频生成评测 →</Link>
</article>
<article className="t2a-project resume-project-secondary">
<div className="entry-header"><div className="entry-title-group"><h3>Text-to-Audio 专项评测 ｜ 评测集、盲听与 Bad Case</h3><p>个人项目</p></div><time>2026.07</time></div>
<ol className="resume-points"><li>独立搭建评测流程，审核 <b>40 条 Prompt</b>，完成 <b>600 个正式样本、660 次试听评测</b>，覆盖音频质检、盲听评分、问题标注、隐藏重复及复测裁决。</li><li>建立 OVL 整体质量、REL 文本相关性及 Bad Case 分类；单评测员隐藏重复 <b>within-1：OVL 95%、REL 98%</b>。分析声源错误、次要事件缺失、次数控制及伪影，输出结构化报告。</li></ol>
<Link className="resume-arrow-link" href="/t2a-case-study">查看 T2A 评测 →</Link>
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
                      <p>Unity 3D Game Kit 音频系统重构</p>
                    </div>
                    <time dateTime="2025-10">2025.10—2026.02</time>
                  </div>
                  <p>整理命名、ID、优先级、响度与交付规范；完成环境声、空间混响及动态混音配置，用 Profiler 排查并发与性能问题，贯通需求、资产、工具配置和实机检查流程。</p>
                  <Link className="resume-arrow-link" href="/sound-practice">查看相关案例 →</Link>
                </article>
                <article className="supporting-project">
                  <div className="entry-header">
                    <div className="entry-title-group">
                      <h3>Backrooms</h3>
                      <p>7.1.2 杜比全景声影视声音设计</p>
                    </div>
                    <time dateTime="2024-03">2024.03—2024.05</time>
                  </div>
                  <p>围绕声源定位、空间层次、环境反射与叙事节奏完成声音设计，检查声音与画面、空间及情绪的关系。</p>
                </article>
              </div>
            </section>

            <section className="resume-section resume-work-section" aria-labelledby="experience-title">
              <div className="resume-section-heading">
                <p>工作经历</p>
                <h2 id="experience-title">音频制作、质量验收与视频创作</h2>
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
                <small>影视声音、交互与空间音频</small>
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
                <div><dt>原型开发</dt><dd>Vibe Coding / AI 辅助开发</dd></div>
<div><dt>创作工具</dt><dd>Cubase、Reaper、Audition、iZotope RX、Wwise、Unity、Unreal Engine、Dolby Atmos Renderer</dd></div>
                <div><dt>数据工具</dt><dd>Excel：数据筛选、排序、基础函数、条件格式、基础统计</dd></div>
                <div><dt>Python / pandas 基础</dt><dd>评分表整理、字段检查、简单统计</dd></div>
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
            <Link href="/creative-qc-agent">Agent 项目</Link>
<Link href="/t2a-case-study">T2A 评测案例</Link>
            <Link href="/audio-visual-evaluation">音视频生成评测</Link>
            <Link href="/point-line-scene-framework">PLS 研究方法</Link>
            <Link href="/sound-practice">游戏音频案例</Link>
            <Link href="/audio-validation-summary">音频资产验收案例</Link>
          </div>
        </footer>
      </div>
      <ResumePrint />
    </main>
  );
}

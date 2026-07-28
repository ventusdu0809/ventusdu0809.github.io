import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "杜明｜AI 音频评测 / 生成式音频评测",
  description:
    "杜明的公开简历：声音设计硕士背景，聚焦 AI 音频评测、Text-to-Audio 测试集设计、主观听评、数据校验与 Badcase 诊断。",
};

const projectLinks = [
  { href: "/t2a-case-study", label: "查看 T2A 案例研究" },
  { href: "/audio-validation-summary", label: "查看音频资产验收案例" },
  { href: "/sound-practice", label: "查看游戏音频案例" },
];

export default function ResumePage() {
  return (
    <main className="resume-page">
      <style>{`
        *, *::before, *::after { box-sizing: border-box; }
        :root {
          --resume-ink: #202421;
          --resume-muted: #626761;
          --resume-accent: #355c57;
          --resume-accent-soft: #e8efec;
          --resume-line: #d8d4cc;
          --resume-paper: #fff;
          --resume-wash: #f5f4ef;
        }
        html { background: #efeee9; }
        body { margin: 0; }
        .resume-page {
          width: min(880px, calc(100% - 32px));
          min-height: 100vh;
          margin: 0 auto;
          padding: 34px 48px 56px;
          color: var(--resume-ink);
          background: var(--resume-paper);
          font-family: "Noto Sans SC", "Source Han Sans SC", "Microsoft YaHei", sans-serif;
        }
        .resume-page a { color: var(--resume-accent); text-decoration: none; }
        .resume-page a:hover { text-decoration: underline; text-underline-offset: 3px; }
        .back { display: inline-flex; margin-bottom: 24px; font-size: .84rem; color: var(--resume-muted) !important; }
        .resume-header { padding-bottom: 20px; border-bottom: 1px solid var(--resume-line); }
        .header-top { display: flex; align-items: flex-start; justify-content: space-between; gap: 24px; }
        .header-name { margin: 0; font-size: 2.15rem; line-height: 1.2; letter-spacing: .04em; }
        .header-role { margin: 6px 0 0; color: var(--resume-accent); font-size: 1.05rem; font-weight: 700; }
        .header-contact { display: grid; gap: 5px; text-align: right; color: var(--resume-muted); font-size: .84rem; line-height: 1.45; }
        .keyword-strip { display: flex; flex-wrap: wrap; gap: 7px 16px; margin: 18px 0 0; color: #46504b; font-size: .8rem; }
        .keyword-strip span { position: relative; }
        .keyword-strip span:not(:last-child)::after { content: ""; position: absolute; right: -9px; top: 50%; width: 2px; height: 2px; border-radius: 50%; background: #969c97; }
        .section { margin-top: 25px; }
        .section-title { display: flex; align-items: center; gap: 10px; margin: 0 0 12px; color: var(--resume-accent); font-size: 1rem; font-weight: 800; letter-spacing: .03em; }
        .section-title::after { content: ""; flex: 1; height: 1px; background: var(--resume-line); }
        .summary { margin: 0; padding: 14px 16px; border-left: 3px solid var(--resume-accent); background: var(--resume-wash); font-size: .91rem; line-height: 1.75; }
        .item { margin-bottom: 19px; }
        .item:last-child { margin-bottom: 0; }
        .item-head { display: flex; justify-content: space-between; align-items: baseline; gap: 16px; }
        .item-name { font-size: .95rem; font-weight: 800; }
        .item-date { flex: 0 0 auto; color: var(--resume-muted); font-size: .79rem; white-space: nowrap; }
        .item-sub { margin: 3px 0 7px; color: var(--resume-muted); font-size: .8rem; }
        .bullets { list-style: none; margin: 0; padding: 0; }
        .bullets li { position: relative; margin: 0 0 6px; padding-left: 16px; font-size: .88rem; line-height: 1.65; }
        .bullets li::before { content: "–"; position: absolute; left: 0; color: var(--resume-accent); font-weight: 700; }
        .project-links { display: flex; flex-wrap: wrap; gap: 8px 16px; margin-top: 9px; font-size: .81rem; font-weight: 650; }
        .responsibility-note { margin: 10px 0 0; padding: 10px 12px; background: var(--resume-accent-soft); color: #35433e; font-size: .79rem; line-height: 1.6; }
        .education-detail { margin: 4px 0 0; color: var(--resume-muted); font-size: .82rem; }
        .skills { display: grid; grid-template-columns: 1fr; gap: 7px; margin: 0; }
        .skill-row { display: grid; grid-template-columns: 112px 1fr; gap: 12px; font-size: .87rem; line-height: 1.58; }
        .skill-row dt { font-weight: 800; }
        .skill-row dd { margin: 0; }
        .resume-footer { margin-top: 34px; padding-top: 16px; border-top: 1px solid var(--resume-line); color: var(--resume-muted); font-size: .75rem; line-height: 1.6; }
        @media (max-width: 680px) {
          .resume-page { width: 100%; padding: 22px 18px 42px; }
          .header-top { display: block; }
          .header-name { font-size: 1.75rem; }
          .header-contact { margin-top: 14px; text-align: left; }
          .item-head { align-items: flex-start; flex-direction: column; gap: 2px; }
          .skill-row { grid-template-columns: 1fr; gap: 1px; }
        }
        @media print {
          html { background: #fff; }
          .resume-page { width: 100%; padding: 0; }
          .back, .project-links { display: none; }
        }
      `}</style>

      <Link className="back" href="/">← 返回作品集</Link>

      <header className="resume-header">
        <div className="header-top">
          <div>
            <h1 className="header-name">杜明</h1>
            <p className="header-role">AI 音频评测 / 生成式音频评测（Text-to-Audio）</p>
          </div>
          <div className="header-contact" aria-label="联系方式">
            <a href="tel:+8615309993915">153 0999 3915</a>
            <a href="mailto:mingdu0809@qq.com">mingdu0809@qq.com</a>
            <Link href="/">ventusdu0809.github.io</Link>
          </div>
        </div>
        <div className="keyword-strip" aria-label="专业关键词">
          <span>通用 / 专项评测集</span>
          <span>主观评估方案</span>
          <span>Prompt-to-Audio 端到端评估</span>
          <span>评测数据校验</span>
          <span>Badcase 诊断</span>
          <span>评测报告</span>
        </div>
      </header>

      <section className="section" aria-labelledby="summary-title">
        <h2 className="section-title" id="summary-title">个人摘要</h2>
        <p className="summary">
          爱丁堡大学声音设计硕士，具备游戏音频设计、音频效果评测、资产验收与运行时问题诊断经验。独立搭建两阶段 Text-to-Audio 音效评测流程，完成通用评测集、专项评测、主观评分方案、人工评分数据校验、Badcase 诊断与评测报告；累计覆盖 600 条正式样本和 660 次试听事件。使用 Python / pandas 整理并复核 OVL / REL 评分及 Badcase 标注数据，了解 Stable Audio 音效生成流程与 latent diffusion 基础原理。
        </p>
      </section>

      <section className="section" aria-labelledby="projects-title">
        <h2 className="section-title" id="projects-title">核心项目</h2>

        <article className="item">
          <div className="item-head">
            <span className="item-name">T2A 音效生成评测｜SAO1 PoC 与 SAO1–SA3M 受控比较</span>
            <span className="item-date">2026.07</span>
          </div>
          <p className="item-sub">个人项目｜评测集设计、主观听评、数据校验与 Badcase 裁决</p>
          <ul className="bullets">
            <li>设计 40 条原创英文 Prompt，覆盖 7 类音效与声源、属性、数量、时序等能力；第一阶段完成 200 条 Stable Audio Open 1.0 正式样本，第二阶段完成 SAO1 与 Stable Audio 3 Medium 共 400 条正式样本的受控比较。</li>
            <li>建立 OVL / REL 1–5 分 Rubric、Blind ID、Primary / multi-label Badcase 与三类最终决策；先隐藏 Prompt 评价 OVL，再显示 Prompt 评价 REL，并通过隐藏重复检查同一评测人的复测稳定性。</li>
            <li>本人完成全部正式听评、40 对隐藏重复的复测、语义复核与最终裁决；使用 Python / pandas 完成评分表筛选、字段一致性检查、Prompt 层级统计与结果复核。</li>
            <li>当前测试集未观察到 SA3M 相对 SAO1 的明确总体优势，但两者呈现不同的失败分布；结论限定于当前数据、模型版本和听评协议，不进行模型内部归因。</li>
          </ul>
          <p className="responsibility-note"><strong>个人贡献边界：</strong>五层评测框架、听评方法、正式评分和 Badcase 裁决由本人完成；AI 用于资料归纳、代码实现和批处理执行，本人负责规则提出、结果审核与修改意见。</p>
          <div className="project-links">
            <Link href="/t2a-case-study">→ 查看完整案例研究</Link>
          </div>
        </article>

        <article className="item">
          <div className="item-head">
            <span className="item-name">TheExplorer｜Unity 3D Game Kit 音频系统重构</span>
            <span className="item-date">2025.10 — 2026.02</span>
          </div>
          <p className="item-sub">个人项目｜Wwise 集成、动态混音与性能分析</p>
          <ul className="bullets">
            <li>基于 Unity 3D Game Kit 重新规划 Wwise 音频系统，整理命名、数字 ID、优先级与资产接入规范；配置 Actor-Mixer、State、HDR、Auto-ducking 与空间混响。</li>
            <li>使用 Wwise Profiler 分析活跃声部和运行状态，通过 Virtual Voice 与 Playback Limit，将既定测试场景中的同屏活跃物理声部由 100+ 控制至 15 以内。</li>
          </ul>
          <div className="project-links">
            <Link href="/sound-practice">→ 查看 Wwise 集成与游戏音频案例</Link>
          </div>
        </article>
      </section>

      <section className="section" aria-labelledby="experience-title">
        <h2 className="section-title" id="experience-title">工作经历</h2>

        <article className="item">
          <div className="item-head">
            <span className="item-name">杭州千乎网络｜游戏音频策划 - 声音设计｜《辉烬》</span>
            <span className="item-date">2026.03 — 2026.07</span>
          </div>
          <ul className="bullets">
            <li>参与战斗音效、动态混音与实机效果评测，按动作、武器及战斗事件拆分声音层级，并通过修改前后对比检查 Hitstop 协同、Snapshot 切换和高频战斗场景的听觉表现。</li>
            <li>与负责人共同拟定并迭代音频外包制作与交付规范，明确格式、命名、短时响度、True Peak、瞬态对齐、循环零交叉和 Click 风险；AI 辅助实现验收工具，本人负责验收逻辑、规则审核、问题反馈与迭代。</li>
            <li>针对自定义 FMOD Bank 转换为 Unity 可读取数据后无法使用 Stream 的限制，按剧情章节拆分为 50 个 Bank，减少单次加载压力与无关资源常驻。</li>
          </ul>
          <div className="project-links">
            <Link href="/sound-practice">→ 查看游戏音频案例</Link>
            <Link href="/audio-validation-summary">→ 查看音频资产验收结果</Link>
          </div>
        </article>

        <article className="item">
          <div className="item-head">
            <span className="item-name">杭州伏腊｜游戏音效设计师 - 声音设计</span>
            <span className="item-date">2025.03 — 2025.07</span>
          </div>
          <ul className="bullets">
            <li>参与 UE5 恐怖游戏及多款小游戏的音频需求整理、声音制作与交付检查，编写音频需求文档并整理资产验收标准。</li>
            <li>基于 Unity / Wwise 配置 UI 状态反馈和 RTPC；在 UE5 中处理 Attenuation、Occlusion 与空间音频，使声音响应交互状态、视觉动效和场景空间。</li>
          </ul>
        </article>
      </section>

      <section className="section" aria-labelledby="education-title">
        <h2 className="section-title" id="education-title">教育经历</h2>
        <div className="item">
          <div className="item-head">
            <span className="item-name">爱丁堡大学｜声音设计硕士（MSc）</span>
            <span className="item-date">2023.09 — 2024.11</span>
          </div>
          <p className="education-detail">声音、画面与空间关系；视听理论与声音装置实践</p>
        </div>
        <div className="item">
          <div className="item-head">
            <span className="item-name">米兰布雷拉美术学院｜新技术艺术本科（BA）</span>
            <span className="item-date">2017.10 — 2022.03</span>
          </div>
          <p className="education-detail">装置艺术、视听叙事与跨媒介创作</p>
        </div>
      </section>

      <section className="section" aria-labelledby="skills-title">
        <h2 className="section-title" id="skills-title">专业技能</h2>
        <dl className="skills">
          <div className="skill-row"><dt>音频评测</dt><dd>通用 / 专项评测集、主观评估方案、Prompt-to-Audio 端到端评估、人工偏好评分、事件级 Badcase、隐藏重复、数据校验与评测报告</dd></div>
          <div className="skill-row"><dt>数据处理</dt><dd>Python / pandas（数据筛选、评分表整理、字段检查与结果复核）；CSV 数据治理、Blind ID 追溯与 SHA manifest</dd></div>
          <div className="skill-row"><dt>音频检查</dt><dd>Adobe Audition（频谱、波形及异常点检查）；文件格式、响度、True Peak、瞬态与循环风险验收</dd></div>
          <div className="skill-row"><dt>生成式音频</dt><dd>Text-to-Audio 评测流程；Stable Audio Open 1.0、Stable Audio 3 Medium 实测；了解 latent diffusion 基础原理</dd></div>
          <div className="skill-row"><dt>交互音频</dt><dd>FMOD、Wwise、Unity、Unreal Engine；动态混音、RTPC / State、空间音频与性能分析</dd></div>
          <div className="skill-row"><dt>音频制作</dt><dd>Cubase、Reaper；音效编辑、混音、循环处理与资产规范化</dd></div>
          <div className="skill-row"><dt>语言</dt><dd>英语、意大利语</dd></div>
        </dl>
      </section>

      <footer className="resume-footer">
        <p>公开简历版本｜内容对应可展示的项目材料与案例页面。</p>
        <div className="project-links">
          {projectLinks.map((link) => <Link href={link.href} key={link.href}>→ {link.label}</Link>)}
        </div>
      </footer>
    </main>
  );
}

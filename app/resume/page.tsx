import Link from "next/link";
import { t2aRelease } from "../data/t2aRelease";

export default function ResumePage() {
  return (
    <main>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --c-body: #202421; --c-sub: #666A65; --c-accent: #355C57;
          --c-divider: #D8D4CC; --c-bg: #F4F3EE;
          --font: "Noto Sans SC", "Source Han Sans SC", "Microsoft YaHei", sans-serif;
        }
        html { font-family: var(--font); color: var(--c-body); background: #fafaf8; }
        body { max-width: 780px; margin: 0 auto; padding: 32px 20px 60px; background: #fff; min-height: 100vh; }
        a { color: var(--c-accent); text-decoration: none; }
        a:hover { text-decoration: underline; }
        .back { display: inline-block; margin-bottom: 24px; font-size: 0.85rem; color: var(--c-sub); }
        .back:hover { color: var(--c-accent); }
        .header { margin-bottom: 28px; }
        .header-name { font-size: 2rem; font-weight: 700; letter-spacing: 0.02em; }
        .header-role { font-size: 1rem; color: var(--c-accent); font-weight: 600; margin-top: 4px; }
        .header-contact { font-size: 0.85rem; color: var(--c-sub); margin-top: 10px; line-height: 1.7; }
        .header-contact .sep { color: var(--c-divider); margin: 0 8px; }
        .section { margin-top: 26px; }
        .section-title { display: flex; align-items: center; gap: 8px; font-size: 1rem; font-weight: 700; color: var(--c-accent); margin-bottom: 10px; }
        .section-title::after { content: ""; flex: 1; height: 1px; background: var(--c-divider); margin-top: 2px; }
        .strip { border-left: 2px solid var(--c-accent); padding: 10px 0 10px 14px; background: var(--c-bg); font-size: 0.92rem; line-height: 1.65; }
        .item { margin-bottom: 18px; }
        .item-head { display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: 8px; }
        .item-name { font-size: 0.95rem; font-weight: 700; }
        .item-date { font-size: 0.8rem; color: var(--c-sub); white-space: nowrap; }
        .item-sub { font-size: 0.8rem; color: var(--c-sub); margin-bottom: 6px; }
        .bullets { list-style: none; padding: 0; }
        .bullets li { position: relative; padding-left: 16px; font-size: 0.9rem; line-height: 1.6; margin-bottom: 5px; }
        .bullets li::before { content: "\u2013"; position: absolute; left: 0; color: var(--c-accent); font-weight: 600; }
        .obs-note { font-size: 0.8rem; color: #888; padding-left: 16px; margin-top: 2px; }
        .skills-list { list-style: none; padding: 0; }
        .skills-list li { font-size: 0.9rem; line-height: 1.55; margin-bottom: 3px; }
        .skills-list li .cat { font-weight: 700; }
        .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid var(--c-divider); font-size: 0.78rem; color: var(--c-sub); }
        @media (max-width: 600px) { body { padding: 20px 16px 40px; } .header-name { font-size: 1.6rem; } .item-head { flex-direction: column; gap: 2px; } }
      `}</style>

      <Link className="back" href="/">← 返回作品集</Link>

      <header className="header">
        <h1 className="header-name">杜明</h1>
        <p className="header-role">AI 音频评测 / 生成式音频评测</p>
        <div className="header-contact">
          mingdu0809@qq.com<span className="sep">|</span>sound-ventus.mingdu0809.workers.dev
        </div>
      </header>

      <section className="section">
        <div className="section-title">个人摘要</div>
        <div className="strip">
          <p>爱丁堡大学声音设计硕士，具备游戏音频设计、动态混音、音频资产验收与运行时问题诊断经验。主导两阶段 T2A 项目的评测设计与人工执行，负责测试集、听评标准、正式盲听、隐藏重复复测及事件级 Badcase 裁决，并完成 SAO1 与 Stable Audio 3 Medium 的受控模型比较。</p>
        </div>
      </section>

      <section className="section">
        <div className="section-title">核心项目</div>

        <div className="item">
          <div className="item-head">
            <span className="item-name">T2A Evaluation Program ｜ SAO1 vs Stable Audio 3 Medium</span>
            <span className="item-date">2026.07</span>
          </div>
          <p className="item-sub">个人项目 ｜ 评测设计、人工听评与 Badcase 裁决</p>
          <ul className="bullets">
            <li>以 40 条原创英文 Prompt 建立两阶段评测：Phase 1 完成 SAO1 单模型历史 PoC；Phase 2 按每模型 5 次 generation repetitions，对 SAO1 regenerated 与 SA3M 的 400 条正式样本进行同协议联合盲评；两阶段累计 {t2aRelease.scale.formalCumulative} 条正式样本。</li>
            <li>制定 OVL、REL 的 1–5 分人工听评标准，采用 Blind ID 先隐藏 Prompt 评 OVL、再显示英文 Prompt 评 REL，并记录 Primary / multi-label Badcase、decision 与复听元数据；本人完成正式听评、复测与语义裁决。</li>
            <li>连接五层诊断、Prompt-level paired Bootstrap、Wilcoxon、条件 Badcase、Persistence 与隐藏重复；客观指标用于风险定位，不替代人工语义判断。</li>
            <li><strong>Phase 2 结果：</strong>SA3M OVL / REL 为 <strong>3.640 / 3.305</strong>，SAO1 为 <strong>3.780 / 3.355</strong>；ΔOVL 95% CI [−0.395, +0.115]、ΔREL 95% CI [−0.295, +0.180]，两项区间均跨越 0。</li>
          </ul>
          <p className="obs-note">研究版本 v3.2.3 r2 / audit r3；复算检查补充可复现与追溯信息，没有修改人工评分、Badcase 标签或裁决结果。</p>
          <p style={{marginTop: 6, fontSize: '0.82rem'}}>
            <Link href="/t2a-case-study">→ 查看完整案例研究</Link>
          </p>
        </div>

        <div className="item">
          <div className="item-head">
            <span className="item-name">TheExplorer ｜ Unity 3D Game Kit 音频系统重构</span>
            <span className="item-date">2025.10 — 2026.02</span>
          </div>
          <p className="item-sub">个人项目 ｜ Wwise 集成、动态混音与性能分析</p>
          <ul className="bullets">
            <li>基于 Unity 3D Game Kit 重新规划 Wwise 音频系统，整理命名、数字 ID、优先级及资产接入规范，并建立基于 ITU-R BS.1770 的响度检查口径。</li>
            <li>配置 Actor-Mixer、Tag 过滤与 State，实现区域环境声和交互状态切换；搭建 HDR、Auto-ducking 与卷积混响方案，处理高响度事件压制及不同空间的混响响应。</li>
            <li>使用 Wwise Profiler 分析活跃声部与内存占用，通过 Virtual Voice 和 Playback Limit，将既定测试场景中的同屏活跃物理声部由 100+ 控制至 15 以内。</li>
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="section-title">工作经历</div>

        <div className="item">
          <div className="item-head">
            <span className="item-name">杭州千乎网络 ｜ 游戏音频策划 ｜《辉烬》</span>
            <span className="item-date">2026.03 — 至今</span>
          </div>
          <ul className="bullets">
            <li>参与战斗音效、动态混音与实机验收，根据动作、武器和战斗事件拆分声音层级，并通过修改前后对比检查 Snapshot 切换及高频战斗场景中的听觉表现。</li>
            <li>参与音频外包制作与交付规范的起草与迭代，明确文件格式、命名、短时响度、True Peak、瞬态对齐、循环零交叉及 Click 风险等验收口径；AI 辅助实现检查工具，本人负责规则审核、问题反馈与迭代。</li>
            <li>针对自定义 FMOD Bank 转 Unity 数据链路无法使用 Stream 的限制，按故事章节拆分为 50 个约 20 MB 的 Bank，降低单次加载压力及无关资源常驻。</li>
          </ul>
          <p style={{marginTop: 6, fontSize: '0.82rem'}}>
            <Link href="/#game-detail">→ 查看游戏音频案例</Link>
          </p>
        </div>

        <div className="item">
          <div className="item-head">
            <span className="item-name">杭州伏腊 ｜ 游戏音效设计师</span>
            <span className="item-date">2025.03 — 2025.07</span>
          </div>
          <ul className="bullets">
            <li>参与 UE5 恐怖游戏及多款小游戏的音频需求整理、资产制作与交付验收，编写音频需求文档并整理资产检查标准。</li>
            <li>基于 Unity 与 Wwise 配置 UI 状态反馈、RTPC、Attenuation、Occlusion 和空间音频，匹配交互状态、视觉动效与场景声场。</li>
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="section-title">教育经历</div>

        <div className="item">
          <div className="item-head">
            <span className="item-name">爱丁堡大学 ｜ 声音设计 MSc</span>
            <span className="item-date">2023.09 — 2024.11</span>
          </div>
          <p className="item-sub">声音、画面与空间关系；Michel Chion 视听理论与声音装置实践</p>
        </div>

        <div className="item">
          <div className="item-head">
            <span className="item-name">米兰布雷拉美术学院 ｜ 新媒体艺术 BA</span>
            <span className="item-date">2017.10 — 2022.03</span>
          </div>
          <p className="item-sub">装置艺术、视听叙事与东方意境研究</p>
        </div>
      </section>

      <section className="section">
        <div className="section-title">专业技能</div>
        <ul className="skills-list">
          <li><span className="cat">音频评测：</span>人工听评方案、OVL / REL 评分标准、事件级 Badcase、隐藏重复复测、音频交付验收</li>
          <li><span className="cat">数据处理：</span>Python / pandas（数据筛选、评分表整理与结果核对）；Audition（频谱、波形及异常点检查）</li>
          <li><span className="cat">交互音频：</span>FMOD、Wwise、Unity、Unreal Engine；动态混音、RTPC / State、空间音频与性能分析</li>
          <li><span className="cat">音频制作：</span>Cubase、Reaper；音效编辑、混音与资产规范化处理</li>
          <li><span className="cat">相关基础：</span>Text-to-Audio 评测流程、latent diffusion 基础原理</li>
          <li><span className="cat">语言：</span>英语、意大利语</li>
        </ul>
      </section>

      <footer className="footer">
        <p>此页面为简历公开版，可在线浏览。</p>
      </footer>
    </main>
  );
}

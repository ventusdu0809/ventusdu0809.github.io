export function ResumePrint() { return (
<div className="resume-print-sheet">

<header className="header">
<h1 className="header-name">杜明</h1>
<p className="header-role">多模态 Agent 与 AI 音视频评测</p>
<p className="header-sub">声音设计硕士 · 音视频创作者背景 · Agent Workflow · 自动 QC / 失败定位</p>
<div className="header-contact"><a href="tel:15309993915">15309993915</a><span className="sep">|</span><a href="mailto:mingdu0809@qq.com">mingdu0809@qq.com</a><span className="sep">|</span><a href="https://ventusdu0809.github.io/">作品集：ventusdu0809.github.io</a></div>
</header>
<section className="section">
<h2 className="section-title">个人简介</h2>
<div className="summary">爱丁堡大学声音设计硕士，具备游戏音频与视频制作经历。聚焦多模态 Agent 与创作工作流，通过 AI 辅助开发搭建需求编译、时间线执行、质检与局部修复原型；结合专业声画判断和模型评测经验，将创作要求转化为可验证条件与回归案例。</div>
</section>
<section className="section">
<h2 className="section-title">核心能力</h2>
<div className="comp-grid">
<div><span className="comp-cat">Agent Workflow：</span>结构化需求、工具编排、QC / Repair</div>
<div><span className="comp-cat">AI 音视频评测：</span>原子评测、证据路由、受控回归</div>
<div><span className="comp-cat">音视频创作：</span>声音设计、视频制作、游戏音频、声画判断</div>
<div><span className="comp-cat">快速原型：</span>Vibe Coding / AI 辅助开发、Python 基础</div>
</div>
</section>
<section className="section">
<h2 className="section-title">Agent 与 AI 评测项目 <span>／个人项目</span></h2>
<article className="entry primary">
<div className="row"><h3 className="row-main">多模态音视频 Agent Evaluation &amp; Repair Workflow</h3><time className="row-date">2026.09</time></div>
<ul className="bullets">
<li>独立设计并通过 AI 辅助开发搭建自然语言 → Compiler → Planner → 可编辑 Timeline → 执行 / 渲染 → Evaluate / Repair 原型，处理配音、Logo、CTA 与 BGM ducking 等约束。</li>
<li>建立 Evidence Routing、Atomic Evaluation 与 Dependency 机制，按需求选择文本、时间线、音频或视觉证据，定位失败 Unit；视觉证据采用人工辅助审核（review-assisted）。</li>
<li>基于 Failure Localization 生成 Targeted Repair，并复测目标条件与原有正确条件；受控故障案例中修复 Logo 时序和配音期间 BGM 压低问题，保留修复前后证据与 Regression Set。</li>
<li>构建 10 Case 受控回归集，判断结果 10/10 符合预期、已支持自动修复 8/8；另完成 10 Case 端到端自然语言实测，保留 4 项真实失败及 Compiler / Plan Gate 阶段归因。</li>
</ul>
</article>
<article className="entry">
<div className="row"><h3 className="row-main">Audio-Visual Generation Evaluation ｜ 跨轮诊断</h3><time className="row-date">2026.08</time></div>
<ul className="bullets">
<li>构建 Point → Line → Scene + Quality 分层框架，完成两轮事件完整性、计数、声画时序、动态对应、场景一致性与音质评测；由首轮发现设计次轮 Controlled Regression。</li>
<li>拆分 Text → Visual → Audio 失败链路：3 个可精确判定案例均为“要求 3 次 → 画面 4 次 → 声音 4 次”，将计数偏差定位到视觉生成阶段；整理复现、未复现及混合结论，为 QC 与回归集提供案例。</li>
</ul>
</article>
<article className="entry">
<div className="row"><h3 className="row-main">Text-to-Audio 专项评测 ｜ 评测集、盲听与 Bad Case</h3><time className="row-date">2026.07</time></div>
<ul className="bullets">
<li>独立搭建评测流程，审核 <b>40 条 Prompt</b>，完成 <b>600 个正式样本、660 次试听评测</b>，覆盖音频质检、盲听评分、问题标注、隐藏重复及复测裁决。</li>
<li>建立 OVL 整体质量、REL 文本相关性及 Bad Case 分类；单评测员隐藏重复 <b>within-1：OVL 95%、REL 98%</b>。分析声源错误、次要事件缺失、次数控制及伪影，输出结构化报告。</li>
</ul>
</article>
</section>
<section className="section">
<h2 className="section-title">音视频创作项目 <span>／个人项目</span></h2>
<article className="entry">
<div className="row"><h3 className="row-main">The Explorer ｜ Unity / Wwise 音频系统重构</h3><time className="row-date">2025.10 - 2026.02</time></div>
<p className="plain">整理命名、ID、优先级、响度与交付规范；完成环境声、空间混响及动态混音配置，用 Profiler 排查并发与性能问题，贯通需求、资产、工具配置和实机检查流程。</p>
</article>
<article className="entry">
<div className="row"><h3 className="row-main">Backrooms ｜ 7.1.2 杜比全景声影视声音设计</h3><time className="row-date">2024.03 - 2024.05</time></div>
<p className="plain">围绕声源定位、空间层次、环境反射与叙事节奏完成声音设计，检查声音与画面、空间及情绪的关系。</p>
</article>
</section>
<section className="section">
<h2 className="section-title">工作经历</h2>
<article className="entry">
<div className="row"><h3 className="row-main">杭州千乎网络 ｜ 游戏音频策划 / 声音设计 ｜《辉烬》</h3><time className="row-date">2026.03 - 2026.07</time></div>
<ul className="bullets">
<li>参与战斗音效、动态混音及实机评测，按动作、武器与事件拆分声音需求；对比修改前后 Snapshot、Sidechain Ducking 与复杂战斗中的关键声音可辨识性。</li>
<li>与直属领导共同起草、迭代外包制作与交付规范，将格式、响度、True Peak、瞬态、循环与 Click 风险整理为验收项；参与自动检查规则转化，负责规则审核、样例核验与反馈。</li>
</ul>
</article>
<article className="entry">
<div className="row"><h3 className="row-main">杭州伏腊 ｜ 游戏音效设计师 / 声音设计</h3><time className="row-date">2025.03 - 2025.07</time></div>
<p className="plain">参与 UE5 游戏与微信小游戏的音频需求梳理、资产验收；基于 Unity / Wwise 配置 UI、交互、过场及环境声音，检查触发逻辑、声画协调、空间关系与场景匹配。</p>
</article>
<article className="entry">
<div className="row"><h3 className="row-main">成都锦泰麓山丰田 ｜ 摄影摄像 / 视频制作</h3><time className="row-date">2022.08 - 2023.02</time></div>
<p className="plain">负责品牌活动、产品及直播的摄影摄像与现场视听环境搭建，参与灯光、音视频设备调试与素材制作。</p>
</article>
</section>
<section className="section">
<h2 className="section-title">教育背景</h2>
<div className="row"><h3 className="row-main">爱丁堡大学 University of Edinburgh ｜ 声音设计硕士 MSc</h3><time className="row-date">2023.09 - 2024.11</time></div>
<div className="row"><h3 className="row-main">米兰布雷拉美术学院 Accademia Di Brera ｜ 新技术艺术本科 BA</h3><time className="row-date">2017.10 - 2022.03</time></div>
<p className="plain">硕士：影视声音、交互与空间音频；本科：摄影、视频、动画、新媒体与装置艺术。</p>
</section>
<section className="section">
<h2 className="section-title">工具与语言</h2>
<ul className="skills-list">
<li><b>原型 / 数据：</b>Vibe Coding / AI 辅助开发；Python / pandas 基础（评分表整理、字段检查、简单统计）；Excel</li>
<li><b>创作工具：</b>Unity、Wwise、Unreal Engine；Cubase、Reaper、Audition、iZotope RX、Dolby Atmos Renderer</li>
<li><b>语言：</b>英语、意大利语</li>
</ul>
</section>
</div>
); }

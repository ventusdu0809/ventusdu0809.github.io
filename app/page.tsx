import { auditRecordHref, currentReportHref, t2aRelease } from "./data/t2aRelease";

const layers = [
  ["L1", "文件层", "解码、时长、静音、削波与端点风险"],
  ["L2", "频率层", "STFT、频谱特征与频段能量"],
  ["L3", "空间层", "声道能量、相关性、相位风险与声像"],
  ["L4", "能量层", "LUFS、True Peak、LRA 与动态余量"],
  ["L5", "感知层", "人工 OVL / REL、事件级诊断与 Badcase"],
] as const;

const processSteps = [
  [
    "Phase 1",
    "SAO1 单模型 PoC（历史基线）",
    `设计 ${t2aRelease.phase1.promptN} 条原创 Prompt、${t2aRelease.phase1.fixedSeedsPerPrompt} 个 fixed seeds，完成 ${t2aRelease.phase1.formalN} 条正式样本的 OVL/REL 与事件级诊断。建立五层诊断、盲评与裁决流程。结果仅作为历史参考，不与 Phase 2 直接纵向比较。`,
  ],
  [
    "Phase 2",
    "SAO1 vs SA3M 受控模型比较",
    `重新生成 SAO1 基线并与 Stable Audio 3 Medium 开展 ${t2aRelease.phase2.formalN} 条正式样本的受控联合盲评。Prompt-level paired Bootstrap、Wilcoxon、条件 Badcase 分析与隐藏重复一致性验证。`,
  ],
  [
    "数据审计",
    "代码与数据复算检查",
    "audit r3 复核了模型均值、Bootstrap、Wilcoxon、Badcase、条件发生率和隐藏重复一致性，并核对了冻结文件与公开证据。整改只补充了计算复现和文件追溯，没改人工评分或裁决。",
  ],
  [
    "累计规模",
    "两阶段 · 三批次 · 单评测员",
    `两阶段累计 ${t2aRelease.scale.formalCumulative} 条正式样本、${t2aRelease.scale.listeningEventsCumulative} 次试听事件。${t2aRelease.repeatConsistency.pairN} 对隐藏重复（Phase 2）。所有结论以审核后评分表为统一数据来源。`,
  ],
] as const;

const listeningCases = [
  {
    id: "C01 / B0008",
    code: "MEC_006_S0123",
    title: "正向参照",
    outcome: "OVL 5 · REL 5 · 完整 10 秒播放",
    src: "/audio/B0008.mp3",
  },
  {
    id: "C02 / B0152",
    code: "MEC_005_S0456",
    title: "空间方向反向",
    outcome: "Prompt 要求左→右，人工听感为右→左",
    src: "/audio/B0152.mp3",
  },
  {
    id: "C03 / B0099",
    code: "WPN_004_S0042",
    title: "事件数量不符",
    outcome: "事件级诊断：wrong_count",
    src: "/audio/B0099.mp3",
  },
  {
    id: "C04 / B0092",
    code: "NAT_006_S0042",
    title: "声源不符",
    outcome: "wrong_source · needs_regeneration",
    src: "/audio/B0092.mp3",
  },
] as const;

const qaChecks = [
  "文件格式与命名",
  "短时响度",
  "True Peak",
  "瞬态对齐",
  "循环零交叉",
  "Click 风险",
] as const;

const practices = [
  [
    "A",
    "战斗与动态混音",
    "使用 Snapshot 与 Sidechain Ducking 组织高频战斗场景，保持关键反馈的可辨识性。",
  ],
  [
    "B",
    "交互与中间件",
    "使用 Wwise / Unity 配置 UI 交互音频与 RTPC，支持随状态变化的听觉反馈。",
  ],
  [
    "C",
    "空间与环境",
    "在 UE5 中结合 Attenuation、Occlusion 与空间音频，构建场景中的声源关系。",
  ],
] as const;

type EvidenceItem = {
  number: string;
  title: string;
  description: string;
  links: readonly (readonly [string, string])[];
  embed?: string;
};

const evidence: readonly EvidenceItem[] = [
  {
    number: "01",
    title: "T2A Evaluation Program",
    description:
      "两阶段 T2A 音效评测：Phase 1 建立 SAO1 单模型 PoC，Phase 2 完成 SAO1 vs SA3M 受控比较；audit r3 对代码、冻结数据与派生结果进行复算检查。",
    links: [
      ["查看 Evaluation Program", "/t2a-case-study"],
      ["下载当前项目报告", currentReportHref],
      ["查看复算审查说明", auditRecordHref],
    ],
  },
  {
    number: "02",
    title: "音频交付与验收",
    description:
      "与直属领导共同起草外包交付规范，明确 6 项验收口径，检测工具由 AI 辅助实现，本人负责规则审核与迭代。",
    links: [["查看验收数据可视化", "/audio-validation-summary"]],
  },
  {
    number: "03",
    title: "交互声音设计｜智能座舱 HMI",
    description: "围绕座舱交互状态、声音反馈与视听配合的公开视频案例。",
    embed:
      "https://player.bilibili.com/player.html?isOutside=true&aid=115678921170383&bvid=BV1W2mABvEhG&cid=34575813914&p=1&autoplay=0",
    links: [
      [
        "在 Bilibili 播放",
        "https://www.bilibili.com/video/BV1W2mABvEhG/",
      ],
    ],
  },
  {
    number: "04",
    title: "GameKit3D + Wwise 全流程集成",
    description: "Wwise 与 Unity 的配置、联调和运行时展示。",
    embed:
      "https://player.bilibili.com/player.html?isOutside=true&aid=116001815402657&bvid=BV1cyFuz5Ejd&cid=35778857476&p=1&autoplay=0",
    links: [
      [
        "在 Bilibili 播放",
        "https://www.bilibili.com/video/BV1cyFuz5Ejd/",
      ],
      [
        "查看技术文档（飞书）",
        "https://ziv0av2u21.feishu.cn/wiki/Vn5aw8hsBi776BkW0VWciETxnAe?from=from_copylink",
      ],
    ],
  },
];

const evaluationPipeline = [
  { number: "01", title: "建立历史方法基线", summary: "Phase 1 使用 SAO1 单模型 PoC 建立测试集、Rubric、Blind ID 与五层诊断。", details: ["40 Prompt × 5 fixed seeds", "200 formal + 20 hidden repeats", "历史结果不作为 SA3M 的直接基线"] },
  { number: "02", title: "设计受控模型比较", summary: "Phase 2 对 SAO1 regenerated 与 SA3M 使用同一组 Prompt 和听评协议。", details: ["40 Prompt × 5 generation repetitions × 2 models", "400 条正式样本", "不是 same-seed 或 matched-latent 比较"] },
  { number: "03", title: "生成与登记样本", summary: "保留原始输出并记录 cohort、模型、Prompt、generation repeat 与文件哈希。", details: ["10 秒 · 44.1 kHz · stereo WAV", "raw output retained", "解盲映射与正式评分分离"] },
  { number: "04", title: "联合盲评与数据治理", summary: "Blind ID 隐去模型和 Prompt；先隐藏 Prompt 评 OVL，再显示英文 Prompt 评 REL。", details: ["400 formal + 40 hidden repeats", "共 440 次 Phase 2 试听事件", "Primary + multi-label Badcase"] },
  { number: "05", title: "人工听评与事件诊断", summary: "以完整 10 秒样本为口径，分别记录整体质量、语义匹配和事件级问题。", details: ["OVL：整体质量与可用性", "REL：文本—音频相关性", "声源、属性、时序、数量、方向与伪影"] },
  { number: "06", title: "复测、审核与裁决", summary: "通过 40 对隐藏重复检查 intra-rater consistency，并保留决策、诊断和时间元数据。", details: ["40/40 音频 SHA256 匹配", "OVL within-one 38/40", "REL within-one 39/40"] },
  { number: "07", title: "统计、诊断与复算检查", summary: "以 Prompt 为成对分析单位，完成 Bootstrap、Wilcoxon、Badcase、Persistence 分析，并对冻结数据和派生结果进行复核。", details: ["10,000 次 paired Prompt Bootstrap", "条件发生率与历史桥接", "v3.2.3 r2 · audit r3 · APPROVED"] },
];

const methodologyBoundaries = [
  "本项目由单一评测人完成，不报告多人评测一致性。",
  "隐藏重复衡量同一评测人的 intra-rater consistency，不代表多人评测一致性。",
  "客观指标用于质量检查与复听定位，不设置自动通过阈值。",
  "CLAP 边界验证：当前前 5 秒工作流未显示与人工评分的有效单调相关，不设自动阈值。",
  "完整七类 FAD / JS 未运行，不纳入正式结论。",
  "Badcase 描述可观察到的输出问题，不用于推断模型内部机制。",
  "Phase 1 与 Phase 2 不是等价实验，不做跨阶段纵向数值比较。",
];

function ExternalOrInternalLink({
  label,
  href,
}: {
  label: string;
  href: string;
}) {
  const external = href.startsWith("http");

  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      download={href.startsWith("/downloads/") || undefined}
    >
      {label}
    </a>
  );
}

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="返回页面顶部">
          <span className="wordmark-mark" aria-hidden="true" />
          <span className="wordmark-text">DU MING / AUDIO</span>
        </a>

        <nav aria-label="页面导航">
          <a href="#paper-t2a">T2A 评测</a>
          <a href="#paper-framework">评测方法</a>
          <a href="#paper-game">游戏音频</a>
          <a href="#contact">联系</a>
        </nav>
      </header>

      <section className="hero" id="top" aria-label="封面">
        <div className="hero-inner">
          <h1 className="hero-name">杜明</h1>

          <div className="hero-tags" aria-label="专业方向">
            <span>生成式音频评测</span>
            <span>Text-to-Audio</span>
            <span>游戏音频</span>
          </div>

          <p className="hero-intro">
            从广播剧的线性叙事，到声音、画面与空间的研究，再到游戏音频和
            T2A 评测，我始终关注声音如何由元素形成场景，并最终触发情绪与意义。
          </p>

          <div className="hero-actions">
            <a className="btn btn-primary" href="#paper-t2a">
              查看 T2A 评测项目
            </a>
          </div>
        </div>

        <div className="hero-scroll-hint" aria-hidden="true">
          <span>向下滚动</span>
          <div className="hero-scroll-line" />
        </div>
      </section>

      <div className="scroll-stage" aria-label="项目概览">
        <section
          className="paper-card paper-card--one"
          id="paper-t2a"
          aria-labelledby="p1-title"
        >
          <p className="paper-card-label">
            01 · T2A Evaluation Program
          </p>

          <h2 id="p1-title">两阶段 T2A 音效评测与模型比较</h2>

          <p>
            Phase 1 使用 Stable Audio Open 1.0 建立单模型评测
            PoC；Phase 2 重新生成 SAO1 基线，并与 Stable Audio 3
            Medium 完成同协议、同 Prompt 的联合盲评。
          </p>

          <div className="metrics-row">
            <div className="metric-item sample">
              <div className="metric-label">评测阶段</div>
              <div className="metric-value">{t2aRelease.scale.phases}</div>
              <div className="metric-sub">PoC + 受控比较</div>
            </div>

            <div className="metric-item ovl">
              <div className="metric-label">正式样本 · 累计</div>
              <div className="metric-value">{t2aRelease.scale.formalCumulative}</div>
              <div className="metric-sub">2 模型 · 3 批次</div>
            </div>

            <div className="metric-item rel">
              <div className="metric-label">Phase 2 受控比较</div>
              <div className="metric-value">{t2aRelease.scale.phase2Formal}</div>
              <div className="metric-sub">40 Prompt · 单评测员</div>
            </div>
          </div>

          <a className="paper-link" href="#t2a-detail">
            查看项目详情
          </a>
        </section>

        <section
          className="paper-card paper-card--two"
          id="paper-framework"
          aria-labelledby="p2-title"
        >
          <p className="paper-card-label">02 · Evaluation Method</p>

          <h2 id="p2-title">五层诊断 · 主客观结果交叉核对</h2>

          <p>
            人工听评负责整体质量、语义匹配和事件级裁决；客观指标用于定位风险，并支持回听与复核。
          </p>

          <ul className="layer-mini-list">
            {layers.map(([code, name]) => (
              <li key={code}>
                <span>{code}</span>
                {name}
              </li>
            ))}
          </ul>

          <div className="tag-row">
            <span>人工 OVL / REL</span>
            <span>隐藏重复复测</span>
            <span>Bootstrap CI</span>
            <span>CLAP 边界验证</span>
            <span>Badcase 复核</span>
          </div>

          <a className="paper-link" href="#findings-detail">
            了解评测方法
          </a>
        </section>

        <section
          className="paper-card paper-card--three"
          id="paper-game"
          aria-labelledby="p3-title"
        >
          <p className="paper-card-label">
            03 · Game Audio &amp; Sound Design
          </p>

          <h2 id="p3-title">从声音资产到游戏内听觉表现</h2>

          <p>
            展示交互反馈、资产验收、动态混音、空间音频与运行时资源组织的实际案例。
          </p>

          <div className="tag-row">
            <span>Wwise</span>
            <span>FMOD</span>
            <span>Unity</span>
            <span>Unreal Engine</span>
            <span>音频交付验收</span>
            <span>动态混音</span>
          </div>

          <a className="paper-link" href="#game-detail">
            查看游戏音频案例
          </a>
        </section>
      </div>

      <section
        id="t2a-detail"
        className="content-section content-section--paper"
        aria-labelledby="t2a-title"
      >
        <div className="section-shell">
          <header className="section-heading">
            <p className="eyebrow">01 / T2A Evaluation Program</p>

            <h2 id="t2a-title">两阶段 T2A 音效评测体系</h2>

            <p className="section-lead">
              Phase 1 搭建了单模型 PoC 与评测流程；Phase 2 做了 SAO1 vs SA3M
              受控模型比较。正式结论统一引用审核后的评分表。
            </p>
          </header>

          <div className="project-spec" aria-label="正式测试集规格">
          <div className="project-spec-item">
            <strong className="project-spec-value">{t2aRelease.scale.phases}</strong>
            <span className="project-spec-label">评测阶段</span>
          </div>

          <span className="project-spec-operator" aria-hidden="true">
            ×
          </span>

          <div className="project-spec-item">
            <strong className="project-spec-value">{t2aRelease.scale.formalCumulative}</strong>
            <span className="project-spec-label">正式样本（累计）</span>
          </div>

          <span className="project-spec-operator" aria-hidden="true">
            =
          </span>

          <div className="project-spec-item">
            <strong className="project-spec-value">{t2aRelease.scale.listeningEventsCumulative}</strong>
            <span className="project-spec-label">试听事件（累计）</span>
          </div>

          <p className="project-spec-meta">
            2 个模型 · 3 批生成数据 · 单评测员
          </p>
        </div>

        <div className="process-grid">
          {processSteps.map(([number, title, description]) => (
            <article className="process-step" key={number}>
              <span className="process-step-number">{number}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
          </div>
      </section>

      <section
        id="evaluation-process"
        className="content-section content-section--paper evaluation-process-section"
        aria-labelledby="evaluation-process-title"
      >
        <div className="section-shell">
          <header className="section-heading">
            <p className="eyebrow">Evaluation Pipeline</p>

            <h2 id="evaluation-process-title">
              从受控样本到可追溯结论
            </h2>

            <p className="section-lead">
              项目从测试集设计、受控生成、样本盲化，到人工听评、
              复测审核和 Badcase 诊断，每一步都有据可查。客观指标负责文件检查和风险提示，
              最终判断以完整样本的人工试听和审核后评分表为准。
            </p>
          </header>

          <div className="pipeline-summary" aria-label="评测样本概览">
            <div className="pipeline-summary-item">
              <span>评测阶段</span>
              <strong>{t2aRelease.scale.phases}</strong>
              <small>PoC + 受控比较</small>
            </div>

            <div className="pipeline-summary-item">
              <span>正式样本 · 累计</span>
              <strong>{t2aRelease.scale.formalCumulative}</strong>
              <small>2 模型 · 3 批次</small>
            </div>

            <div className="pipeline-summary-item">
              <span>Phase 2 受控比较</span>
              <strong>{t2aRelease.scale.phase2Formal}</strong>
              <small>SAO1 vs SA3M</small>
            </div>

            <div className="pipeline-summary-item">
              <span>试听事件 · 累计</span>
              <strong>{t2aRelease.scale.listeningEventsCumulative}</strong>
              <small>含隐藏重复</small>
            </div>
          </div>

          <ol className="evaluation-pipeline">
            {evaluationPipeline.map((step) => (
              <li className="pipeline-step" key={step.number}>
                <div className="pipeline-step-marker" aria-hidden="true">
                  <span>{step.number}</span>
                </div>

                <article className="pipeline-step-content">
                  <header>
                    <p className="pipeline-step-label">
                      STEP {step.number}
                    </p>

                    <h3>{step.title}</h3>
                  </header>

                  <p className="pipeline-step-summary">
                    {step.summary}
                  </p>

                  <ul className="pipeline-step-details">
                    {step.details.map((detail) => (
                      <li key={detail}>{detail}</li>
                    ))}
                  </ul>
                </article>
              </li>
            ))}
          </ol>

          <aside
            className="method-boundary-panel"
            aria-labelledby="method-boundary-title"
          >
            <div className="method-boundary-heading">
              <p className="eyebrow">Method Boundaries</p>
              <h3 id="method-boundary-title">方法边界</h3>

              <p>
                明确哪些结论可以由当前两阶段项目支持，哪些内容仍需要后续测试。
              </p>
            </div>

            <ul className="method-boundary-list">
              {methodologyBoundaries.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </aside>

          <div className="pipeline-role-note">
            <div>
              <span>人工负责</span>
              <p>
                测试集与评分标准制定、正式样本听评、隐藏重复复测、
                Badcase 判断和最终裁决。
              </p>
            </div>

            <div>
              <span>脚本与指标负责</span>
              <p>
                文件检查、特征提取、数据汇总和风险候选定位；
                不替代人工语义判断。
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="findings-detail"
        className="content-section findings-section"
        aria-labelledby="findings-title"
      >
        <div className="findings-inner">
          <header className="section-heading findings-intro">
            <p className="eyebrow">02 / Findings &amp; Boundaries</p>

            <h2 id="findings-title">
              整体质量与语义符合度分别评估
            </h2>

            <p className="section-lead">
              人工 OVL、REL
              与事件级裁决构成项目主结论；统计与客观指标用于定位风险、检查一致性并支持复核。
            </p>
          </header>

          <div className="findings-metrics" aria-label="Phase 1 历史基线">
            <div className="finding-metric finding-metric--ovl">
              <span>Phase 1 OVL</span>
              <strong>{t2aRelease.phase1.ovl.toFixed(3)}</strong>
              <small>历史 SAO1 PoC · n=200</small>
            </div>

            <div className="finding-metric finding-metric--rel">
              <span>Phase 1 REL</span>
              <strong>{t2aRelease.phase1.rel.toFixed(3)}</strong>
              <small>历史 SAO1 PoC · n=200</small>
            </div>

            <div className="finding-metric finding-metric--rho">
              <span>Phase 2 模型比较</span>
              <strong>−0.140 / −0.050</strong>
              <small>ΔOVL / ΔREL · SA3M − SAO1 · 两项 CI 均跨 0</small>
            </div>
          </div>

          <div className="home-model-comparison" aria-label="Phase 2 模型比较">
            {t2aRelease.phase2.models.map((model) => (
              <article key={model.id}>
                <span>{model.id}</span>
                <h3>{model.name}</h3>
                <p><strong>OVL {model.ovl.toFixed(3)}</strong><strong>REL {model.rel.toFixed(3)}</strong><small>n={model.formalN}</small></p>
              </article>
            ))}
            <aside>
              <strong>在当前 40 条 Prompt 测试集中，OVL 与 REL 差值的 95% 置信区间均跨越 0。</strong>
              <p>ΔOVL −0.140，95% CI [−0.395, +0.115]；ΔREL −0.050，95% CI [−0.295, +0.180]。CI 跨越 0 不构成等价性结论。</p>
            </aside>
          </div>

          <div className="boundary-grid">
            <article className="boundary-card">
              <p className="eyebrow">CLAP 边界验证</p>

              <h3>当前 CLAP 工作流不替代人工判断</h3>

              <p>
                CLAP 与人工 OVL / REL
                未显示有效单调相关，因此不设置自动阈值，也不用于覆盖事件级
                Badcase 裁决。
              </p>
            </article>

            <article className="boundary-card">
              <p className="eyebrow">Phase 2 隐藏重复</p>

              <h3>同一评测人的复测一致性</h3>

              <p>
                40 对隐藏重复 · 40/40 音频 SHA256 匹配。OVL ±1 分：38/40
                (95.0%)；REL ±1 分：39/40 (97.5%)；决策一致：34/40
                (85.0%)。不等同于多人一致性。
              </p>
            </article>

            <article className="boundary-card">
              <p className="eyebrow">Independent Audit</p>
              <h3>{t2aRelease.researchVersion} · audit {t2aRelease.auditRevision}</h3>
              <p>Codex review：<strong>{t2aRelease.auditVerdict}</strong>；Validator：ALL CHECKS PASSED。复核补充计算复现与文件追溯信息，没有修改人工评分、Badcase 标签或裁决结果。</p>
              <a href="/t2a-case-study#audit">查看审计记录</a>
            </article>
          </div>

          <p className="findings-footnote">
            方法说明：完整七类 FAD / JS
            未运行，不纳入项目主结论；相关技术探索仅保留在附录中。
          </p>
        </div>
      </section>

      <section
        className="content-section listening-section"
        aria-labelledby="listening-title"
      >
        <div className="section-shell">
          <div className="listening-heading">
          <div>
            <p className="eyebrow">Historical PoC Listening Cases · Phase 1 · SAO1</p>
            <h2 id="listening-title">
              从正向参照到事件级 Badcase
            </h2>
          </div>

          <p className="listening-note">
            精选案例用于对应报告中的评测字段，不代替完整人工听评。
          </p>
        </div>

        <div className="case-grid">
          {listeningCases.map((item) => (
            <article className="case-card" key={item.id}>
              <div className="case-card-header">
                <span>{item.id}</span>
                <p>{item.code}</p>
              </div>

              <h3>{item.title}</h3>
              <p className="case-outcome">{item.outcome}</p>

              <audio
                controls
                preload="metadata"
                aria-label={`${item.id} 音频试听`}
              >
                <source src={item.src} type="audio/wav" />
              </audio>
            </article>
          ))}
        </div>
          </div>
      </section>

      <section
        id="game-detail"
        className="content-section content-section--paper"
        aria-labelledby="game-title"
      >
        <div className="section-shell">
          <header className="section-heading">
            <p className="eyebrow">03 / Game Audio Design</p>

            <h2 id="game-title">声音资产、交付验收与运行时表现</h2>

            <p className="section-lead">
              以下案例展示交互反馈、交付验收、资源组织与空间音频等实际工作内容。
            </p>
          </header>

        <div className="game-feature-grid">
          <article>
            <p className="eyebrow">交付与验收</p>

            <h3>将交付规范转为可检查的技术口径</h3>

            <p>
              与直属领导共同起草并迭代外包制作与交付规范，整理 6
              项音频检查维度。检测工具由 AI
              辅助实现；本人负责验收口径定义、检测逻辑审核与规则迭代。
            </p>

            <ul className="check-list">
              {qaChecks.map((check) => (
                <li key={check}>{check}</li>
              ))}
            </ul>
          </article>

          <article>
            <p className="eyebrow">FMOD / Unity 资源组织</p>

            <h3>按章节拆分 Bank，降低单次加载压力</h3>

            <p>
              由于自定义 FMOD .bank 转 Unity 数据链路无法使用
              Stream，按故事章节拆分为 50 个约 20 MB 的 Bank。
            </p>

            <div className="bank-diagram">
              <div className="bank-source">
                <b>按故事章节</b>
                <span>组织音频资源</span>
              </div>

              <span className="bank-arrow" aria-hidden="true">
                →
              </span>

              <div className="bank-target">
                <b>50 × 约 20 MB</b>
                <span>FMOD Bank</span>
              </div>
            </div>

            <p className="bank-note">
              目标：减少无关资源常驻，并控制单次加载规模。
            </p>
          </article>
        </div>

        <div className="practice-row">
          {practices.map(([number, title, description]) => (
            <article key={number}>
              <span className="practice-number">{number}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
          </div>
      </section>

      <section
        className="content-section runtime-section"
        aria-labelledby="runtime-title"
      >
        <div className="section-shell">
          <header className="section-heading">
            <p className="eyebrow">04 / Runtime Case Studies</p>

            <h2 id="runtime-title">运行时协同与动态混音</h2>

            <p className="section-lead">
              通过修改前后对比，呈现声音表现与游戏状态、混音逻辑之间的协同变化。
            </p>
          </header>

        <div className="runtime-case-list">
          <article className="runtime-case">
            <p className="eyebrow">案例 01 / Hitstop</p>

            <h3>Hitstop 状态下的声音与逻辑协同</h3>

            <p>
              通过修改前后视频呈现 Hitstop
              状态下声音表现的变化；案例只描述可观察结果，不延伸推断引擎内部根因。
            </p>

            <div className="runtime-media-grid">
              <figure className="runtime-media">
                <figcaption>修改前</figcaption>

                <video
                  controls
                  preload="none"
                  aria-label="Hitstop 修改前视频"
                >
                  <source
                    src="/video/hitstop-before.mp4"
                    type="video/mp4"
                  />
                </video>
              </figure>

              <figure className="runtime-media">
                <figcaption>修改后</figcaption>

                <video
                  controls
                  preload="none"
                  aria-label="Hitstop 修改后视频"
                >
                  <source
                    src="/video/hitstop-after.mp4"
                    type="video/mp4"
                  />
                </video>
              </figure>
            </div>
          </article>

          <article className="runtime-case">
            <p className="eyebrow">案例 02 / Dynamic Mix</p>

            <h3>动态混音与 PV 音效制作</h3>

            <p>通过混音调整 SFX、音乐与人声的层级关系，在密集信息中突出当前最重要的听觉线索。</p>

            <div className="runtime-media-grid">
              <figure className="runtime-media">
                <figcaption>案例一</figcaption>

                <div className="runtime-embed">
                  <iframe
                    src="https://player.bilibili.com/player.html?isOutside=true&aid=116798179511695&bvid=BV1Wqjy6CEPF&cid=39335690503&p=2&autoplay=0"
                    title="动态混音与 PV 音效制作案例一"
                    loading="lazy"
                    allowFullScreen
                    scrolling="no"
                  />
                </div>

                <a
                  className="runtime-fallback"
                  href="https://www.bilibili.com/video/BV1Wqjy6CEPF/?p=2"
                  target="_blank"
                  rel="noreferrer"
                >
                  在 Bilibili 打开
                </a>
              </figure>

              <figure className="runtime-media">
                <figcaption>案例二</figcaption>

                <div className="runtime-embed">
                  <iframe
                    src="https://player.bilibili.com/player.html?isOutside=true&aid=116679816318744&bvid=BV1CAVz6DEwL&cid=38794496414&p=2&autoplay=0"
                    title="动态混音与 PV 音效制作案例二"
                    loading="lazy"
                    allowFullScreen
                    scrolling="no"
                  />
                </div>

                <a
                  className="runtime-fallback"
                  href="https://www.bilibili.com/video/BV1CAVz6DEwL/?p=2"
                  target="_blank"
                  rel="noreferrer"
                >
                  在 Bilibili 打开
                </a>
              </figure>
            </div>
          </article>
        </div>
          </div>
      </section>

      <div className="page-end">
      <section
        className="content-section content-section--paper evidence-section"
        aria-labelledby="evidence-title"
      >
        <div className="section-shell">
          <header className="section-heading">
            <p className="eyebrow">05 / Project Materials</p>

            <h2 id="evidence-title">项目文档与演示</h2>

            <p className="section-lead">
              以下入口对应项目报告、案例说明、验收结果与公开视频。
            </p>
          </header>

        <div className="evidence-grid">
          {evidence.map((item) => (
            <article className="evidence-card" key={item.number}>
              <span className="evidence-number">{item.number}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>

              {item.embed ? (
                <div className="video-embed">
                  <iframe
                    src={item.embed}
                    title={`${item.title} 视频播放`}
                    loading="lazy"
                    allowFullScreen
                    scrolling="no"
                  />
                </div>
              ) : null}

              <div className="resource-links">
                {item.links.map(([label, href]) => (
                  <ExternalOrInternalLink
                    key={href}
                    label={label}
                    href={href}
                  />
                ))}
              </div>
            </article>
          ))}
        </div>
          </div>
      </section>

      <section
        id="contact"
        className="contact-wrapper"
        aria-labelledby="contact-title"
      >
        <div className="section-shell contact-section">
        <div>
          <p className="eyebrow">06 / Contact</p>
          <h2 id="contact-title">项目资料与联系</h2>

          <p className="contact-copy">
            需要查看完整报告、数据说明或更多试听案例，可通过以下方式联系。
          </p>
        </div>

        <div className="contact-placeholders">
          <a
            href="https://space.bilibili.com/7927779"
            target="_blank"
            rel="noreferrer"
          >
            Bilibili 作品空间
          </a>

          <a href="mailto:mingdu0809@qq.com">
            mingdu0809@qq.com
          </a>
        </div>
        </div>
      </section>

      <footer className="footer-wrapper">
        <div className="site-footer section-shell">
        <span>© 2026 杜明</span>
        <span>AI AUDIO EVALUATION / GAME AUDIO DESIGN</span>
        </div>
      </footer>
      </div>
    </main>
  );
}

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "音频资产验收｜杜明",
  description: "基于项目交付规范的音频资产批量验收：格式、响度、真实峰值、瞬态、循环零交叉与Click风险。",
};

const fileTotal = 7872;

const issueCounts = [
  { label: "短时响度", count: 4057, note: "未落入所属类别的目标范围" },
  { label: "真实峰值", count: 3494, note: "超过−1.0 dBTP红线" },
  { label: "瞬态对齐", count: 1609, note: "Hit / Attack开头存在延迟风险" },
  { label: "循环零交叉", count: 108, note: "Loop首尾存在衔接风险" },
  { label: "格式待优化", count: 46, note: "格式问题可通过批量转换修正" },
] as const;

const loudnessTargets = [
  ["受击反馈 Hit", "−14 至 −12 LUFS"],
  ["攻击音效 Attack", "−16 LUFS"],
  ["语音 VO", "−17 至 −15 LUFS"],
  ["音乐 Music", "−22 至 −16 LUFS，按风格确认"],
  ["环境循环 Ambience Loop", "−36 LUFS"],
  ["其他未分类", "−22 至 −16 LUFS"],
] as const;

const automatedChecks = [
  { code: "01", title: "文件格式", rule: "WAV · 24-bit · 48 kHz", boundary: "不符合时归入待优化，不直接判断听感质量。" },
  { code: "02", title: "短时响度", rule: "ITU-R BS.1770窗口测量", boundary: "按13个FMOD目录映射类别目标，允许±1 LUFS测量容差。" },
  { code: "03", title: "真实峰值", rule: "≤ −1.0 dBTP", boundary: "使用4倍过采样检查峰值风险，防止削波失真。" },
  { code: "04", title: "瞬态对齐", rule: "Hit / Attack开头静音", boundary: "核心发力点应贴近波形开头；超过3 ms进入复核。" },
  { code: "05", title: "循环零交叉", rule: "Loop首尾过零点", boundary: "定位潜在不连续，但最终仍需循环播放确认。" },
  { code: "06", title: "循环Click", rule: "衔接处RMS跳变", boundary: "用于提示爆点风险，不替代人工听审。" },
] as const;

export default function AudioValidationSummaryPage() {
  const maxIssueCount = issueCounts[0].count;

  return (
    <main className="document-page qa-page">
      <header className="document-header document-shell qa-hero">
        <Link className="back-link" href="/">返回作品集</Link>
        <p className="eyebrow">音频资产质量控制 / AUDIO ASSET QUALITY CONTROL</p>
        <h1>音频资产验收：从交付标准到可复查结果</h1>
        <p className="document-lead">基于与直属领导共同起草并迭代的交付规范，我定义验收口径、审核检测逻辑，并对7,872条音频资产进行批量检查。</p>
        <div className="qa-hero-note"><strong>我的职责</strong><span>规则定义 · 逻辑审核 · 问题反馈 · 迭代验收</span><small>代码实现与批量执行由 AI 辅助完成。</small></div>
      </header>

      <article className="document-shell document-body qa-body">
        <section aria-labelledby="qa-result-title">
          <p className="document-kicker">01 / 验收结果 / RESULT</p>
          <h2 id="qa-result-title">验收结果先回答哪些文件需要处理</h2>
          <p className="document-section-lead">三态结果区分“可直接进入下一环节”“仅需格式修正”和“命中质量规则”。不通过不等于文件损坏，而是需要复核或返修。</p>
          <div className="summary-metrics qa-summary" aria-label="音频资产验收汇总">
            <div><strong>7,872</strong><span>检查文件</span><small>最终资产总量</small></div>
            <div className="qa-pass"><strong>1,922</strong><span>通过 · 24.4%</span><small>未命中当前自动规则</small></div>
            <div className="qa-warning"><strong>46</strong><span>待优化 · 0.6%</span><small>仅需格式修正</small></div>
            <div className="qa-fail"><strong>5,904</strong><span>不通过 · 75.0%</span><small>至少命中一项质量规则</small></div>
          </div>
        </section>

        <section aria-labelledby="qa-issues-title">
          <p className="document-kicker">02 / 问题分布 / ISSUE DISTRIBUTION</p>
          <h2 id="qa-issues-title">问题主要集中在哪里</h2>
          <p className="document-section-lead">条形长度表示命中该检查项的文件数。一个文件可能同时命中响度、峰值或瞬态等多项规则。</p>
          <div className="issue-bars qa-issue-bars" aria-label="问题分布横向条形图">
            {issueCounts.map((issue) => (
              <div className="qa-issue-item" key={issue.label}>
                <div className="qa-issue-heading"><strong>{issue.label}</strong><span>{issue.count.toLocaleString()}个文件 · {((issue.count / fileTotal) * 100).toFixed(1)}%</span></div>
                <div className="issue-bar-track" aria-hidden="true"><span className="issue-bar-fill" style={{ width: `${(issue.count / maxIssueCount) * 100}%` }} /></div>
                <p>{issue.note}</p>
              </div>
            ))}
          </div>
          <p className="document-small">各项命中次数不能相加为不通过文件数；比例以7,872条资产为分母，仅表示该规则的覆盖情况。</p>
        </section>

        <section aria-labelledby="qa-standard-title">
          <p className="document-kicker">03 / 验收标准 / ACCEPTANCE STANDARD</p>
          <h2 id="qa-standard-title">验收规范如何转成可执行规则</h2>
          <p className="document-section-lead">规范先定义项目红线，再根据资产类别映射响度目标。自动检测负责筛查，人工听审负责判断可听问题。</p>
          <div className="qa-standard-block">
            <article><span>基础格式</span><h3>WAV · 24-bit · 48 kHz</h3><p>统一进入引擎前的交付格式，减少采样率和位深混用。</p></article>
            <article><span>绝对红线</span><h3>True Peak ≤ −1.0 dBTP</h3><p>任何类别均不得超过真实峰值上限，避免削波与爆音。</p></article>
            <article><span>编辑要求</span><h3>瞬态贴头 · Loop无缝</h3><p>Hit和Attack应快速响应；Loop需兼顾零交叉与实际循环听感。</p></article>
          </div>
          <div className="table-wrap qa-loudness-table">
            <table><thead><tr><th>资产类别</th><th>短时响度目标</th></tr></thead><tbody>
              {loudnessTargets.map(([category, target]) => <tr key={category}><th scope="row">{category}</th><td>{target}</td></tr>)}
            </tbody></table>
          </div>
        </section>

        <section aria-labelledby="qa-auto-title">
          <p className="document-kicker">04 / 自动筛查 / AUTOMATED SCREENING</p>
          <h2 id="qa-auto-title">自动检查覆盖什么，又不能判断什么</h2>
          <div className="validation-grid qa-check-grid">
            {automatedChecks.map((check) => <article className="validation-card" key={check.code}><span className="validation-card-number">{check.code}</span><h3>{check.title}</h3><strong>{check.rule}</strong><p>{check.boundary}</p></article>)}
          </div>
          <div className="qa-review-boundary">
            <div><span>自动筛查</span><p>格式、响度、真实峰值、开头静音、循环零交叉和衔接RMS跳变。</p></div>
            <div><span>仍需人工听审</span><p>口水音、齿音、喷麦、底噪、过度降噪、呼吸、混响尾音和实际Click听感。</p></div>
          </div>
        </section>

        <section aria-labelledby="qa-process-title">
          <p className="document-kicker">05 / 验收流程 / WORKFLOW</p>
          <h2 id="qa-process-title">一次验收如何形成返修依据</h2>
          <div className="validation-process qa-process">
            <div className="validation-process-step"><strong>1</strong><h3>读取规范</h3><p>确认格式、类别响度和编辑红线。</p></div>
            <div className="validation-process-step"><strong>2</strong><h3>映射类别</h3><p>按13个FMOD目录选择对应规则。</p></div>
            <div className="validation-process-step"><strong>3</strong><h3>批量筛查</h3><p>生成逐文件结果和问题标签。</p></div>
            <div className="validation-process-step"><strong>4</strong><h3>复核迭代</h3><p>根据误报与边界样本调整逻辑。</p></div>
          </div>
          <aside className="document-note"><strong>结果边界</strong><p>工具用于快速发现风险并统一返修口径，不替代声音设计师对语义、审美、空间感和实际可用性的判断。</p></aside>
        </section>

        <nav className="document-footer-nav" aria-label="页面跳转">
          <Link href="/">返回首页</Link>
          <Link href="/t2a-case-study">查看T2A评测案例</Link>
        </nav>
      </article>
    </main>
  );
}

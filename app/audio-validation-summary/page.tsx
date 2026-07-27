import Link from "next/link";

const checks = ["文件格式与命名", "短时响度", "True Peak", "瞬态对齐", "循环零交叉", "Click 风险"];

const issueCounts = [
  ["短时响度", 4057],
  ["真实峰值", 3494],
  ["瞬态对齐", 1609],
  ["循环零交叉", 108],
  ["格式待优化", 46],
];

const maxIssueCount = issueCounts[0][1];

export default function AudioValidationSummaryPage() {
  return (
    <main className="document-page">
      <header className="document-header document-shell">
        <Link className="back-link" href="/">返回作品集</Link>
        <p className="eyebrow">AUDIO DELIVERY QA / 验收结果</p>
        <h1>音频资产验收结果</h1>
        <p className="document-lead">基于与直属领导共同起草并迭代的音频外包制作与交付规范，对 7,872 条音频资产做批量验收，呈现聚合结果与规则口径。</p>
      </header>

      <article className="document-shell document-body">
        <section>
          <h2>验收概览</h2>
          <div className="summary-metrics" aria-label="音频资产验收汇总">
            <div><strong>7,872</strong><span>文件</span></div>
            <div><strong>1,922</strong><span>通过 · 24.4%</span></div>
            <div><strong>46</strong><span>待优化</span></div>
            <div><strong>5,904</strong><span>不通过</span></div>
          </div>
        </section>

        <section>
          <h2>问题分布（命中检查项次数）</h2>
          <div className="issue-bars" aria-label="问题分布横向条形图">
            {issueCounts.map(([label, count]) => (
              <div className="issue-bar-row" key={label}>
                <span className="issue-bar-label">{label}</span>
                <div className="issue-bar-track" aria-hidden="true">
                  <span className="issue-bar-fill" style={{ width: `${(Number(count) / Number(maxIssueCount)) * 100}%` }} />
                </div>
                <strong>{count.toLocaleString()}</strong>
              </div>
            ))}
          </div>
          <p className="document-small">同一文件可能命中多项检查，因此各检查项次数不能相加为不通过文件数。</p>
        </section>

        <section>
          <h2>验收规范</h2>
          <dl className="qa-spec-grid">
            <div><dt>格式</dt><dd>WAV / 24-bit / 48 kHz</dd></div>
            <div><dt>短时 LUFS（按类别目标）</dt><dd>Hit −12~−14、Attack −16、VO −15~−17、Music −22~−16、Ambience Loop −36、其他 −16~−22</dd></div>
            <div><dt>True Peak</dt><dd>≤ −1.0 dBTP</dd></div>
            <div><dt>Loop</dt><dd>首尾零交叉与无 Click</dd></div>
            <div><dt>Hit / Attack</dt><dd>瞬态贴近波形开头</dd></div>
          </dl>
        </section>

        <section>
          <h2>本次自动验收覆盖</h2>
          <ul className="check-list document-check-list">{checks.map((check) => <li key={check}>{check}</li>)}</ul>
          <p className="document-small">人声瑕疵、底噪、呼吸与头尾自然度属于规范中的听审 / 制作要求，不计入本页自动检查统计。</p>
        </section>

        <section className="qa-method-note">
          <p>与直属领导共同起草并迭代交付规范；检查工具由 AI 辅助实现，本人负责验收口径定义、检测逻辑审核、问题反馈与规则迭代。</p>
        </section>
        <p className="document-footnote">本页展示聚合数据；逐文件明细未列出。</p>
      </article>
    </main>
  );
}

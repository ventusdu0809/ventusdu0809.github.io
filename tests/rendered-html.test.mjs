import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${pathname}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(
    new Request(`http://localhost${pathname}`, { headers: { accept: "text/html" }, redirect: "manual" }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

function renderedDom(html) {
  return html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
}

const prohibitedHomeTerms = ["评测闭环", "体系化赋能", "Wilcoxon", "MT19937", "rank-biserial", "SHA256"];

test("homepage uses the recruiter-facing three-narrative structure", async () => {
  const response = await render("/");
  assert.equal(response.status, 200);
  const html = await response.text();
  for (const text of [
    "杜明", "AI 音频 / 音视频生成评测",
    "600", "T2A 正式样本 · 两阶段累计",
    "2 轮", "音视频诊断评测",
    "3 个案例", "重复出现 3→4→4 诊断模式",
    "把整体听感拆成独立诊断维度",
    "让主观评测可以复查",
    "从失败案例进入受控回归",
    "证据与版本 / EVIDENCE &amp; VERSIONING",
    "Cross-Round Analysis v1.0 · Frozen",
    "主项目 / PRIMARY CASE",
    "Audio-Visual Generation Evaluation",
    "3→4→4",
    "重复诊断模式（Repeated Diagnostic Pattern）",
    "评测方法 / EVALUATION METHOD",
    "点：事件是否正确", "线：关系是否成立", "面：整体是否可信", "执行：结果是否可复查",
    "人工判断 × 信号诊断 × 结构化执行",
    "阅读研究方法",
  ]) assert.match(html, new RegExp(text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  assert.equal((html.match(/class="recruiter-narrative"/g) ?? []).length, 3);
  assert.match(html, /href="\/t2a-case-study"/);
  assert.match(html, /href="\/audio-visual-evaluation"/);
  assert.match(html, /href="\/point-line-scene-framework"/);
  assert.ok(html.indexOf("主项目 / PRIMARY CASE") < html.indexOf("基础项目 / FOUNDATION CASE"));
  assert.ok(html.indexOf("声音实践 / SOUND PRACTICE") < html.indexOf("评测方法 / EVALUATION METHOD"));
  assert.doesNotMatch(html, /RESEARCH EVOLUTION/);
  assert.doesNotMatch(html, /href="\/audio-world-framework"[^>]*>场景框架/);
  assert.doesNotMatch(html, /项目不是框架的装饰|数量偏差首先发生|查看T2VA主项目/);
  for (const text of prohibitedHomeTerms) assert.doesNotMatch(html, new RegExp(text));
});

test("PLS research narrative connects literature, synthesis, case evidence and future work", async () => {
  const response = await render("/point-line-scene-framework");
  assert.equal(response.status, 200);
  const html = await response.text();
  for (const text of [
    "从整体分数", "到多模态失败定位",
    "点—线—面（Point–Line–Scene）", "方法综合 · 诊断案例研究",
    "研究观察 / RESEARCH GAP", "支持失败定位", "方法综合 / METHOD SYNTHESIS · 点 → 线 → 面",
    "AudioScape-TTA", "AnyAudio-Judge", "Fine-Grained Feedback / S3Bench", "MMAG",
    "AcoustiTrace", "AVGen-Bench", "Production-Oriented Framework", "AudioRubrics", "LALM Judge Audit",
    "文献观察 / LITERATURE", "方法综合 / SYNTHESIS", "Cross-layer Constraint",
    "文本提示（Prompt）", "画面事实（Visual Fact）", "音频事件（Audio Event）", "重复诊断模式（Repeated Diagnostic Pattern）",
    "初始表达 / INITIAL", "PLS v2.x", "Reference-aware Diagnosis", "Explicit Reference",
    "audio_early", "Not Replicated", "Mixed / Refined", "Camera Cut Confound",
    "R2-H2", "loudness_imbalance", "R2-H4-A", "artifact_noise",
    "评测 → 诊断 → 受控回归", "制作可用性 · 偏好 / 奖励 · 自动评测模型",
    "Audio Removal / Mismatch", "A/B Swap", "Metadata Conflict", "Rephrasing Stability",
    "Audio Reasoning", "Speech Evaluation", "Physical Fidelity", "Perceptual Fidelity",
    "CASE-MOTIVATED", "误归因率尚未测量", "Scene 与评测者证据",
    "从方法框架到可执行评测", "Evaluation Schema", "Execution Layer", "专业判断由人完成",
    "四个迁移诊断案例的适用能力评分汇总", "不作为模型整体能力估计",
    "audio_duration_short", "Validity 与 Capability Judgment 分开记录",
  ]) assert.match(html, new RegExp(text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  const dom = renderedDom(html);
  assert.match(html, /href="\/audio-visual-evaluation"/);
  assert.equal((dom.match(/阅读早期研究笔记/g) ?? []).length, 1);
  assert.equal((dom.match(/href="\/audio-world-framework"/g) ?? []).length, 1);
  assert.doesNotMatch(dom, /阅读早期研究笔记\s*→/);
  assert.equal((dom.match(/href="\/point-line-scene-framework\/report\/"/g) ?? []).length, 2);
  assert.match(dom, /href="\/point-line-scene-framework\/report\/"[^>]*>阅读完整报告/);
  assert.match(dom, /href="\/point-line-scene-framework\/report\/"[^>]*>完整报告/);
  assert.doesNotMatch(dom, /下载完整报告|\sdownload(?:=|\s|>)/);
  assert.doesNotMatch(dom, /No Statistical Validation Claim|MY SYNTHESIS|WHAT LITERATURE SAYS|WHAT I SYNTHESIZE|PROJECT-DERIVED EXTENSION/);
  assert.equal((html.match(/https:\/\/arxiv\.org\/abs\//g) ?? []).length >= 9, true);
  assert.doesNotMatch(html, /PLS 已被统计证明/);
  assert.doesNotMatch(html, /PLS 是行业标准/);
  assert.doesNotMatch(html, /提出全新理论|证明 PLS 有效|首次发现|论文不是 Sources，而是 Argument|方法论第一次遇到真实问题|PRELIMINARY CASE SUPPORT|Provenance-aware Diagnosis|Reference-aware Evaluation/);
  assert.equal((html.match(/class="pls-landing-details/g) ?? []).length >= 7, true);
  assert.doesNotMatch(html, /是作者的方法论扩展/);
  assert.match(html, /它不是用于替代已有 Benchmark、Metric 或行业评测协议的独立理论/);
  const css = await readFile(new URL("../app/point-line-scene-framework/point-line-scene-framework.css", import.meta.url), "utf8");
  const globalCss = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  assert.match(css, /\.pls-hero-index \{[^}]*background: var\(--pls-green\)/s);
  assert.match(css, /\.pls-hero-index > span \{[^}]*color: #fcfaf5/s);
  assert.match(css, /\.pls-four-layer-model article \{[^}]*background: var\(--white\)/s);
  assert.doesNotMatch(css, /\.pls-four-layer-model article:last-child \{[^}]*background:/s);
  assert.match(globalCss, /\.paper-link::after \{[^}]*content: "→"/s);
  assert.doesNotMatch(css, /\.pls-hero \{[^}]*radial-gradient/s);
});

test("PLS complete report presents the frozen research as a working paper", async () => {
  const response = await render("/point-line-scene-framework/report");
  assert.equal(response.status, 200);
  const html = await response.text();
  for (const text of [
    "WORKING PAPER · METHODS &amp; CASE STUDY",
    "面向生成式音频与音视频模型的分层诊断评测框架",
    "作者", "杜明", "摘要", "ABSTRACT",
    "1. 引言", "2. 相关工作", "3. PLS 方法框架",
    "PLS Evaluation Schema v1.0", "Execution Layer v0.1",
    "Audio-Visual Generation Evaluation",
    "显式参考链诊断", "REFERENCE-AWARE DIAGNOSIS",
    "参考文献", "REFERENCES",
    "Repeated Diagnostic Pattern",
    "Not Replicated", "Mixed / Refined", "Persistent / Exploratory Concern",
    "Point=5.00", "Line=4.25", "Scene=5.00",
    "附录 A", "附录 B",
  ]) assert.match(html, new RegExp(text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  assert.match(html, /href="\/point-line-scene-framework\/"[^>]*>← 返回 PLS 研究页/);
  assert.match(html, /<details class="paper-mobile-toc">/);
  assert.match(html, /图 3\. 显式参考链诊断/);
  assert.match(html, /表 3\. 执行层示例画像/);
  assert.match(html, /class="record-list"/);
  assert.doesNotMatch(html, /class="record-cards"/);
  assert.doesNotMatch(html, /Source Audit|五个必须回答的问题|Provenance-aware|freeze\//);
  const css = await readFile(new URL("../app/point-line-scene-framework/report/report.css", import.meta.url), "utf8");
  assert.match(css, /@media \(max-width: 1220px\)/);
  assert.match(css, /@media \(max-width: 430px\)/);
  assert.match(css, /@media print/);
  assert.match(css, /@page \{ size: A4; margin: 18mm 17mm 20mm; \}/);
  assert.match(css, /\.paper-table-wrap \{[^}]*overflow-x: auto/s);
  assert.match(css, /\.paper-toc \{[^}]*max-height: calc\(100vh - 44px\)[^}]*overflow-y: auto/s);
  assert.match(css, /\.paper-mobile-toc \{ display: none; \}/);
  assert.match(css, /\.paper-sheet section > h2 \{[^}]*border: 0/s);
  assert.match(css, /\.paper-sheet th \{[^}]*background: transparent/s);
  assert.match(css, /--paper-sans: "Microsoft YaHei", "微软雅黑", "PingFang SC"/);
  assert.match(css, /\.paper-sheet \{[^}]*font-family: var\(--paper-sans\)[^}]*font-size: 16px[^}]*font-weight: 400/s);
  assert.match(css, /\.paper-sheet section > h2 > span \{[^}]*font-size: 26px[^}]*font-weight: 600/s);
  assert.match(css, /\.paper-sheet h3 \{[^}]*font-size: 19px[^}]*font-weight: 600/s);
  assert.match(css, /\.table-caption \{[^}]*text-align: center/s);
  assert.doesNotMatch(css, /Noto Serif SC|Source Han Serif SC|Songti SC/);
  assert.ok(html.indexOf("表 1. PLS 能力分类") > html.indexOf("capability-table"));
  assert.ok(html.indexOf("表 2. 迁移诊断案例") > html.indexOf("Primary capability"));
  assert.ok(html.indexOf("表 3. 执行层示例画像") > html.indexOf("profile-table"));
});

test("T2VA is an additive case study with frozen cross-round conclusions", async () => {
  const response = await render("/audio-visual-evaluation");
  assert.equal(response.status, 200);
  const html = await response.text();
  for (const text of [
    "Audio-Visual Generation Evaluation",
    "从失败案例发现（Bad Case Discovery）", "受控回归（Controlled Regression）",
    "3→4→4 不等于音频计数失败（Audio Counting Failure）",
    "点（Point）→ 线（Line）→ 面（Scene）+ 独立质量（Quality）",
    "重复诊断模式（Repeated Diagnostic Pattern）", "起点对齐（Onset Alignment）", "未复现（Not Replicated）",
    "动态对应（Dynamic Correspondence）", "部分成立 / 需细化（Mixed / Refined）",
    "跨镜头持续性（Cross-shot Persistence）", "持续 / 探索性关注（Persistent / Exploratory Concern）",
    "小样本诊断，不做统计泛化",
    "查看 T2A 评测案例",
    "查看 PLS 评测方法",
    "R2-H1-B · Exact-count", "文本 → 画面：失败（FAIL）", "画面 → 音频：通过（PASS）", "P4 事件计数（Event Counting）：5 / 5",
    "R2-H3 · 动态对应（Dynamic Correspondence）", "声源运动跟随（Source-motion Tracking）：部分问题", "L4 动态对应：3 / 5",
  ]) assert.match(html, new RegExp(text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  assert.match(html, /href="\/point-line-scene-framework"/);
  assert.match(html, /src="\/video\/t2va\/R2-H1-B\.mp4"/);
  assert.match(html, /src="\/video\/t2va\/R2-H3\.mp4"/);
  assert.match(html, /preload="metadata"/);
  assert.doesNotMatch(html, /Systematic Failure/);
  assert.doesNotMatch(html, /统计性泛化结论/);
});

test("featured case study keeps an explicit paper-background contrast scheme", async () => {
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  assert.match(css, /\.recruiter-project \{ background: var\(--color-paper\); color: var\(--color-text\); \}/);
  assert.match(css, /\.content-section\.recruiter-project \.section-heading > h2 \{ color: var\(--color-text\) !important; \}/);
  assert.match(css, /\.content-section\.recruiter-project \.section-heading > \.section-lead \{ color: var\(--color-text-secondary\) !important; \}/);
});

test("case study keeps the essential evaluation story open and deep detail closed", async () => {
  const response = await render("/t2a-case-study");
  assert.equal(response.status, 200);
  const html = await response.text();
  for (const text of [
    "听起来好", "不等于生成正确",
    "先判断声音质量，再判断内容是否正确",
    "先盲听，再阅读 Prompt",
    "当前测试集未观察到明确的总体优势方向",
    "总体分数之外，还要看模型具体错在哪里",
    "隐藏重复检查同一评测人的复测稳定性",
    "38 / 40（95.0%）", "39 / 40（97.5%）",
    "SA3M 14.5% · SAO1 6.5%", "SA3M 42.5% · SAO1 60.0%", "SA3M 37.5% · SAO1 33.8%",
    "统计与结果复核", "客观指标与方法边界", "版本与审计记录",
    "aria-label=\"C01 / B0008 正向参照试听音频\"",
  ]) assert.match(html, new RegExp(text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  assert.equal((html.match(/<details class="t2a-collapsible">/g) ?? []).length, 3);
  assert.match(html, /第一阶段加入 20 条隐藏重复；第二阶段加入 40 条重复样本，与对应原样本构成 40 对/);
  assert.doesNotMatch(html, /within-one|within 1/);
  assert.doesNotMatch(html, /<details[^>]+open/);
  assert.doesNotMatch(html, /fixed seeds/);
  assert.doesNotMatch(html, /多模态评测/);
});

test("formal summary remains a compatible redirect", async () => {
  const response = await render("/t2a-formal-summary");
  assert.ok([301, 302, 303, 307, 308].includes(response.status));
  const location = new URL(response.headers.get("location"), "http://localhost");
  assert.equal(location.pathname, "/t2a-case-study");
  assert.equal(location.hash, "#results");
});

test("audio validation separates results, standards and review boundaries", async () => {
  const response = await render("/audio-validation-summary");
  assert.equal(response.status, 200);
  const html = await response.text();
  for (const text of [
    "音频资产验收：从交付标准到可复查结果",
    "验收结果先回答哪些文件需要处理",
    "问题主要集中在哪里",
    "验收规范如何转成可执行规则",
    "自动检查覆盖什么，又不能判断什么",
    "仍需人工听审",
    "7,872", "1,922", "5,904",
  ]) assert.match(html, new RegExp(text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  assert.match(html, /代码实现与批量执行由 AI 辅助完成/);
  assert.match(html, /各项命中次数不能相加为不通过文件数/);
});

test("game audio link opens a dedicated sound practice page", async () => {
  const [homeResponse, practiceResponse] = await Promise.all([render("/"), render("/sound-practice")]);
  assert.equal(homeResponse.status, 200);
  assert.equal(practiceResponse.status, 200);
  const [home, practice] = await Promise.all([homeResponse.text(), practiceResponse.text()]);
  assert.match(home, /href="\/sound-practice"[^>]*>查看游戏音频案例/);
  assert.doesNotMatch(home, /href="\/resume#game-audio"/);
  for (const text of [
    "声音设计进入游戏后才是可验证的体验",
    "GameKit3D + Wwise 全流程集成",
    "Hitstop时缓与声音逻辑协同",
    "动态混音与Snapshot切换",
    "50 × 约2 MB",
    "查看音频验收案例",
  ]) assert.match(practice, new RegExp(text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  assert.match(practice, /\/video\/hitstop-before\.mp4/);
  assert.match(practice, /\/video\/hitstop-after\.mp4/);
});

test("public resume matches the reviewed ATS source and links to evidence", async () => {
  const response = await render("/resume");
  assert.equal(response.status, 200);
  const html = await response.text();
  for (const text of [
    "杜明",
    "AI 音频 / 音视频生成评测",
    "600 个正式样本和 660 次试听评测",
    "Text-to-Audio 专项评测",
    "SAO1 PoC 与 SAO1 v2 / SA3M 受控对比",
    "Audio-Visual Generation Evaluation",
    "Cross-Round Analysis v1.0",
    "点（Point）→ 线（Line）→ 面（Scene）+ 独立质量（Quality）",
    "重复诊断模式（Repeated Diagnostic Pattern）",
    "查看 PLS 研究方法",
    "The Explorer",
    "杭州千乎网络",
    "2026.03—2026.07",
    "杭州伏腊",
    "成都锦泰麓山丰田",
    "凤凰艺术",
    "爱丁堡大学",
    "米兰布雷拉美术学院",
    "与直属领导共同起草并迭代音频外包制作与交付规范",
    "AI 用于资料归纳、代码实现和批处理执行",
  ]) assert.match(html, new RegExp(text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  for (const href of ["/t2a-case-study", "/audio-visual-evaluation", "/point-line-scene-framework", "/sound-practice", "/audio-validation-summary"]) {
    assert.match(html, new RegExp(`href="${href}"`));
  }
  assert.doesNotMatch(html, /\/#game-detail/);
  assert.doesNotMatch(html, /2026\.03 — 至今/);
  assert.doesNotMatch(html, /50 个约 (?:2|20) MB/);
  assert.doesNotMatch(html, /153[\s-]?0999[\s-]?3915/);
  assert.doesNotMatch(html, /href="tel:/);
  assert.doesNotMatch(html, /五层评测框架/);
  assert.match(html, /Accademia di Belle Arti di Brera/);
  assert.match(html, /<time[^>]*>2026\.08<\/time>/);
  const projectPoints = [...html.matchAll(/<ol class="resume-points">([\s\S]*?)<\/ol>/g)];
  assert.ok(projectPoints.length >= 2);
  assert.equal((projectPoints[0][1].match(/<li>/g) ?? []).length, 3);
  assert.equal((projectPoints[1][1].match(/<li>/g) ?? []).length, 3);
});

test("pages share the site copy source and keep public artifacts available", async () => {
  const root = new URL("../", import.meta.url);
  const [home, caseStudy, copy] = await Promise.all([
    readFile(new URL("app/page.tsx", root), "utf8"),
    readFile(new URL("app/t2a-case-study/page.tsx", root), "utf8"),
    readFile(new URL("src/data/siteCopy.ts", root), "utf8"),
  ]);
  assert.match(home, /src\/data\/siteCopy/);
  assert.match(caseStudy, /src\/data\/siteCopy/);
  assert.match(copy, /coreNarratives/);
  assert.match(copy, /coreNarratives\.length !== 3/);
  for (const relative of [
    "public/downloads/t2a-v3-evidence/T2A_Evaluation_Report_v3.2.3_r3.md",
    "public/downloads/t2a-v3-evidence/T2A_Audit_Release_Record_r3.md",
    "public/audio/B0008.mp3", "public/audio/B0152.mp3", "public/audio/B0099.mp3", "public/audio/B0092.mp3",
    "public/video/t2va/R2-H1-B.mp4", "public/video/t2va/R2-H3.mp4",
    "public/downloads/pls-framework/point_line_scene_framework_with_av_case_study.md",
  ]) await access(new URL(relative, root));
});

test("audio world framework page presents the four-layer method and keeps the truth boundary", async () => {
  const response = await render("/audio-world-framework");
  assert.equal(response.status, 200);
  const html = await response.text();
  for (const text of [
    "点·线·面·境",
    "生成式音频的场景表示与分层评测框架",
    "从声音事件到声音世界 / From Audio Events to Audio Worlds",
    "从「生成一段音频」到「构建一个声音世界」",
    "点、线、面、境：从事件到整体表达",
    "从 Wwise 到 AI Audio Scene Middleware",
    "分层评测矩阵",
    "从单标签走向层级结构",
    "雨夜，一个人撑伞缓慢走过石板路，远处偶尔传来雷声。",
    "从现有评测流程到下一阶段框架",
    "把听感问题整理成可复查的评测语言",
    "我的能力组合",
    "OVL within-1",
    "Proposed / Next Step",
    "已完成",
  ]) assert.match(html, new RegExp(text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  // 正式 PLS 页面提供早期研究笔记入口；首页不再与主框架并列展示
  const home = await (await render("/")).text();
  const pls = await (await render("/point-line-scene-framework")).text();
  assert.doesNotMatch(home, /href="\/audio-world-framework"/);
  assert.match(pls, /href="\/audio-world-framework"[^>]*>阅读早期研究笔记/);
  // 不虚构：未做过的内容必须标注 Proposed
  assert.match(html, /scene_incoherence/);
  assert.match(html, /补充 Prompt、场景状态和最终声音之间的组织与检查环节/);
  assert.doesNotMatch(html, /已成为行业标准/);
  assert.doesNotMatch(html, /面试演示|INTERVIEW MODE|STATE ANALOGY|一种关于世界状态的文化类比|《易经》|data-awf-interview|data-awf-hexagram/);
  assert.doesNotMatch(html, /用于模型训练/);
});

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

const prohibitedHomeTerms = ["评测闭环", "体系化赋能", "Wilcoxon", "MT19937", "rank-biserial", "SHA256"];

test("homepage uses the recruiter-facing three-narrative structure", async () => {
  const response = await render("/");
  assert.equal(response.status, 200);
  const html = await response.text();
  for (const text of [
    "杜明", "AI音视频生成评测",
    "3→4→4", "重复诊断模式", "5", "跨轮冻结结论",
    "先把 Prompt→Visual 与 Visual→Audio 拆开",
    "Round-1 发现问题，Round-2 受控回归",
    "未复现与混合结果同样有决策价值",
    "Cross-Round Analysis v1.0 · Frozen conclusions",
  ]) assert.match(html, new RegExp(text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  assert.equal((html.match(/class="recruiter-narrative"/g) ?? []).length, 3);
  assert.match(html, /href="\/t2a-case-study"/);
  for (const text of prohibitedHomeTerms) assert.doesNotMatch(html, new RegExp(text));
});

test("featured case study keeps an explicit paper-background contrast scheme", async () => {
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  assert.match(css, /\.recruiter-project \{ background: var\(--color-paper\); color: var\(--color-text\); \}/);
  assert.match(css, /\.content-section\.recruiter-project \.section-heading > h2 \{ color: var\(--color-text\) !important; \}/);
  assert.match(css, /\.content-section\.recruiter-project \.section-heading > \.section-lead \{ color: var\(--color-text-secondary\) !important; \}/);
});

test("case study presents the frozen cross-round findings and evidence boundary", async () => {
  const response = await render("/t2a-case-study");
  assert.equal(response.status, 200);
  const html = await response.text();
  for (const text of [
    "Audio-Visual Generation Evaluation",
    "从 Bad Case Discovery", "Controlled Regression",
    "3→4→4 不等于 Audio Counting Failure",
    "Point → Line → Scene + Quality",
    "Repeated Diagnostic Pattern", "Onset Alignment", "Not Replicated",
    "Dynamic Correspondence", "Mixed / Refined",
    "Cross-shot Persistence", "Persistent / Exploratory Concern",
    "小样本诊断，不做统计泛化",
  ]) assert.match(html, new RegExp(text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  assert.doesNotMatch(html, /Systematic Failure/);
  assert.doesNotMatch(html, /统计性泛化结论/);
  assert.doesNotMatch(html, /fixed seeds/);
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
  assert.match(html, /代码实现与批量执行由AI辅助完成/);
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

test("public resume keeps T2A evidence and adds the cross-round project", async () => {
  const response = await render("/resume");
  assert.equal(response.status, 200);
  const html = await response.text();
  for (const text of [
    "杜明",
    "AI音频数据评测",
    "Audio-Visual Generation Evaluation",
    "Point → Line → Scene + Quality",
    "Round-1 Discovery", "Round-2 Controlled Regression",
    "3→4→4", "Repeated Diagnostic Pattern", "Quality Gate",
    "Text-to-Audio专项评测",
    "600个正式样本和660次试听评测",
    "OVL within-1为95%", "REL within-1为98%",
    "The Explorer",
    "杭州千乎网络",
    "2026.03—2026.07",
    "杭州伏腊",
    "凤凰艺术",
    "爱丁堡大学",
    "米兰布雷拉美术学院",
    "与直属领导共同起草并迭代音频外包制作与交付规范",
    "AI用于资料归纳、代码实现和批处理执行",
  ]) assert.match(html, new RegExp(text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  for (const href of ["/t2a-case-study", "/sound-practice", "/audio-validation-summary"]) {
    assert.match(html, new RegExp(`href="${href}"`));
  }
  assert.doesNotMatch(html, /\/#game-detail/);
  assert.doesNotMatch(html, /2026\.03 — 至今/);
  assert.doesNotMatch(html, /50 个约 (?:2|20) MB/);
  assert.doesNotMatch(html, /153[\s-]?0999[\s-]?3915/);
  assert.doesNotMatch(html, /href="tel:/);
  assert.match(html, /<time[^>]*>2026\.07<\/time>/);
  const projectPoints = [...html.matchAll(/<ol class="resume-points">([\s\S]*?)<\/ol>/g)];
  assert.ok(projectPoints.length >= 2);
  assert.equal((projectPoints[0][1].match(/<li>/g) ?? []).length, 3);
  assert.equal((projectPoints[1][1].match(/<li>/g) ?? []).length, 3);
});

test("homepage shares copy data while the case study remains self-contained", async () => {
  const root = new URL("../", import.meta.url);
  const [home, caseStudy, copy] = await Promise.all([
    readFile(new URL("app/page.tsx", root), "utf8"),
    readFile(new URL("app/t2a-case-study/page.tsx", root), "utf8"),
    readFile(new URL("src/data/siteCopy.ts", root), "utf8"),
  ]);
  assert.match(home, /src\/data\/siteCopy/);
  assert.doesNotMatch(caseStudy, /src\/data\/siteCopy/);
  assert.match(caseStudy, /const findings/);
  assert.match(copy, /coreNarratives/);
  assert.match(copy, /coreNarratives\.length !== 3/);
  for (const relative of [
    "public/og-cross-round-v1.png",
    "public/downloads/t2a-v3-evidence/T2A_Evaluation_Report_v3.2.3_r3.md",
    "public/downloads/t2a-v3-evidence/T2A_Audit_Release_Record_r3.md",
    "public/audio/B0008.mp3", "public/audio/B0152.mp3", "public/audio/B0099.mp3", "public/audio/B0092.mp3",
  ]) await access(new URL(relative, root));
});

test("audio world framework page presents the four-layer method and keeps the truth boundary", async () => {
  const response = await render("/audio-world-framework");
  assert.equal(response.status, 200);
  const html = await response.text();
  for (const text of [
    "点·线·面·境",
    "AI 音频场景表示与分层评测框架",
    "From Audio Events to Audio Worlds",
    "从「生成一段音频」到「构建一个声音世界」",
    "点、线、面、境：四层能力拆解",
    "从 Wwise 到 AI Audio Scene Middleware",
    "一种关于世界状态的文化类比",
    "分层评测矩阵",
    "从单标签走向层级结构",
    "雨夜，一个人撑伞缓慢走过石板路，远处偶尔传来雷声。",
    "从现有评测流程到下一阶段框架",
    "我的角色不是只给模型打分，而是建立问题语言",
    "我的能力组合",
    "右上角可切换「面试演示」模式",
    "不主张《易经》与现代 AI 在技术原理上等同",
    "OVL within-1",
    "Proposed / Next Step",
    "已完成",
  ]) assert.match(html, new RegExp(text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  // 首页导航与页脚提供入口
  const home = await (await render("/")).text();
  assert.match(home, /href="\/audio-world-framework"[^>]*>场景框架/);
  // 不虚构：未做过的内容必须标注 Proposed
  assert.match(html, /scene_incoherence/);
  assert.match(html, /AI 音频中间件不是直接替代生成模型/);
  assert.doesNotMatch(html, /已成为行业标准/);
  assert.doesNotMatch(html, /《易经》是 AI 的技术来源/);
  assert.doesNotMatch(html, /用于模型训练/);
});


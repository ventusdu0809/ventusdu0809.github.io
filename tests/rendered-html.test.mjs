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

const forbidden = [
  "面向多模态评测",
  "两个模型等价",
  "41 events",
  "全部重复集中在 Session 10",
  "gap>=30 = 37",
  "CLAP 校准",
  "Codex 证明研究绝对正确",
];

test("homepage presents the two-phase Evaluation Program", async () => {
  const response = await render("/");
  assert.equal(response.status, 200);
  const html = await response.text();
  for (const text of ["T2A Evaluation Program", "600", "660", "400", "3.640", "3.305", "3.780", "3.355", "APPROVED"]) assert.match(html, new RegExp(text.replace(".", "\\.")));
  assert.match(html, /href="\/t2a-case-study"/);
  for (const text of forbidden) assert.doesNotMatch(html, new RegExp(text));
});

test("case study renders controlled comparison, boundaries and audit evidence", async () => {
  const response = await render("/t2a-case-study");
  assert.equal(response.status, 200);
  const html = await response.text();
  for (const text of [
    "T2A 音效生成评测：两阶段方法与结果", "600", "660", "3.640", "3.305", "3.780", "3.355",
    "−0.140", "−0.050", "40 / 40", "95.0%", "97.5%", "APPROVED",
    "762CC26F1CFBC516141DD48D08F1D25209EB6678034B81F16C32CB4570B75171",
    "prompt-conditioned sample-level label rate", "intra-rater consistency", "NOT RUN",
    "DT 770 PRO X", "未做标准化声压级校准", "OVL / REL 评分锚点",
    "440 次联合盲听", "10 个 Session", "敏感性分析", "220 次盲听 · 分两天完成",
  ]) assert.match(html, new RegExp(text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  assert.match(html, /Phase 1 Historical Listening Cases/i);
  assert.match(html, /超出目标事件结构的重复撞击/);
  assert.match(html, /CI.*不等于模型等价/);
  for (const text of forbidden) assert.doesNotMatch(html, new RegExp(text));
});

test("formal summary redirects to the controlled results section", async () => {
  const response = await render("/t2a-formal-summary");
  assert.ok([301, 302, 303, 307, 308].includes(response.status));
  const location = new URL(response.headers.get("location"), "http://localhost");
  assert.equal(location.pathname, "/t2a-case-study");
  assert.equal(location.hash, "#results");
});

test("resume and audio validation pages use the revised public wording", async () => {
  const resume = await render("/resume");
  assert.equal(resume.status, 200);
  const resumeHtml = await resume.text();
  assert.match(resumeHtml, /T2A Evaluation Program/);
  assert.doesNotMatch(resumeHtml, /多模态评测/);

  const qa = await render("/audio-validation-summary");
  assert.equal(qa.status, 200);
  const qaHtml = await qa.text();
  assert.match(qaHtml, /与直属领导共同起草并迭代/);
  assert.match(qaHtml, /文件格式与命名/);
});

test("current public release artifacts and historical audio exist", async () => {
  const root = new URL("../", import.meta.url);
  for (const relative of [
    "public/downloads/t2a-v3-evidence/T2A_Evaluation_Report_v3.2.3_r3.md",
    "public/downloads/t2a-v3-evidence/T2A_Audit_Release_Record_r3.md",
    "public/downloads/t2a-v3-evidence/T2A_v3.2.3_r2_audit_r3.zip",
    "public/downloads/t2a-v3-evidence/badcase_conditional_rate_v3.2.3.csv",
    "public/downloads/t2a-v3-evidence/repeat_consistency_v3.2.3.csv",
    "public/audio/B0008.wav", "public/audio/B0152.wav", "public/audio/B0099.wav", "public/audio/B0092.wav",
  ]) await access(new URL(relative, root));
});

test("homepage and case study share the release data module", async () => {
  const root = new URL("../", import.meta.url);
  const home = await readFile(new URL("app/page.tsx", root), "utf8");
  const caseStudy = await readFile(new URL("app/t2a-case-study/page.tsx", root), "utf8");
  const summary = await readFile(new URL("app/t2a-formal-summary/page.tsx", root), "utf8");
  assert.match(home, /data\/t2aRelease/);
  assert.match(caseStudy, /data\/t2aRelease/);
  assert.match(caseStudy, /data\/t2aBadcases/);
  assert.match(summary, /#results/);
  assert.doesNotMatch(caseStudy, /same-session\s*=\s*0|gap.?&gt;=.?30.?=.?37|later-minus-earlier.?=.?-0\.20/);
});

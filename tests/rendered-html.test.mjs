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

const prohibitedHomeTerms = ["多模态评测", "视频生成", "评测闭环", "体系化赋能", "Wilcoxon", "MT19937", "rank-biserial", "SHA256"];

test("homepage uses the recruiter-facing three-narrative structure", async () => {
  const response = await render("/");
  assert.equal(response.status, 200);
  const html = await response.text();
  for (const text of [
    "杜明", "AI音频评测",
    "600", "正式样本 · 两阶段累计",
    "400", "Phase 2受控比较",
    "40", "隐藏重复配对",
    "先判断声音质量，再判断内容是否正确",
    "把主观听感整理成统一的评测流程",
    "总体分数之外，还要看模型具体错在哪里",
    "v3.2.3 r2 · audit r3 · ALL CHECKS PASSED · exit 0 · APPROVED",
  ]) assert.match(html, new RegExp(text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  assert.equal((html.match(/class="recruiter-narrative"/g) ?? []).length, 3);
  assert.match(html, /href="\/t2a-case-study"/);
  for (const text of prohibitedHomeTerms) assert.doesNotMatch(html, new RegExp(text));
});

test("case study keeps the essential evaluation story open and deep detail closed", async () => {
  const response = await render("/t2a-case-study");
  assert.equal(response.status, 200);
  const html = await response.text();
  for (const text of [
    "听起来好，不等于生成正确",
    "先判断声音质量，再判断内容是否正确",
    "先盲听，再阅读Prompt",
    "当前测试集未观察到明确的总体优势方向",
    "总体分数之外，还要看模型具体错在哪里",
    "隐藏重复检查同一评测人的复测稳定性",
    "38 / 40（95.0%）", "39 / 40（97.5%）",
    "SA3M 14.5% · SAO1 6.5%", "SA3M 42.5% · SAO1 60.0%", "SA3M 37.5% · SAO1 33.8%",
    "统计与结果复核", "客观指标与方法边界", "版本与审计记录",
    "aria-label=\"C01 / B0008 正向参照试听音频\"",
  ]) assert.match(html, new RegExp(text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  assert.equal((html.match(/<details class="t2a-collapsible">/g) ?? []).length, 3);
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
  assert.match(html, /代码实现与批量执行由AI辅助完成/);
  assert.match(html, /各项命中次数不能相加为不通过文件数/);
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
  ]) await access(new URL(relative, root));
});

# Public Portfolio Extraction v1.0 — Implementation Plan

## 1. Current public structure

- `/`：招聘方首页；已有 Hero、核心评测能力、AV 主项目、T2A 基础项目、PLS 研究入口、证据版本与声音实践。
- `/t2a-case-study`：T2A 生成、Blinded Listening、OVL / REL、隐藏重复、模型比较与 Bad Case。
- `/audio-visual-evaluation`：两轮 AV 诊断、3→4→4、Controlled Regression、Cross-Round Results 与工程优先级。
- `/point-line-scene-framework`：PLS 文献综合、AV 案例、Reference-aware Diagnosis、Controlled Regression、Execution Layer、Quality、Future Research 与 Evidence Boundary。
- `/point-line-scene-framework/report`：完整 Working Paper；已包含 PLS Schema、AV Case Study、Reference-aware Diagnosis 与 Execution Layer。

当前首页已有 `Literature → Synthesis → Case Study → Execution`，但尚未显式连接 T2A、Acoustic Diagnostics、AV、PLS 与 Execution Layer 的研究演进。

## 2. Pages to modify

1. `app/page.tsx`
   - 新增轻量 Evaluation System 三列模块。
   - 新增 Research Evolution，说明这是现有工作的系统视图，不是新框架。
2. `app/point-line-scene-framework/page.tsx`
   - 在 Execution Layer 后新增 Human-in-the-loop Evaluation System。
   - 增加 Signal Diagnostics、Evidence Fusion、状态标签与统一 Public Boundary。
   - 增加 Operationalization / Evaluation Standard Lifecycle。
3. `app/point-line-scene-framework/report/page.tsx`
   - 只补一个简短 Human-in-the-loop Evaluation System 章节与一张论文式系统图。
4. `app/t2a-case-study/page.tsx`
   - 增加指向 PLS Evaluation System anchor 的轻量链接，不复制 Signal 内容。
5. `app/audio-visual-evaluation/page.tsx`
   - 增加一句 PLS 与 Signal Diagnostics 的职责关系，并链接系统章节。
6. 对应 CSS
   - 延续暖纸色、深灰正文与低饱和绿色；增加结构线、两栏汇流和移动端上下排列。

## 3. New content

- `src/data/evaluation-system-evidence.ts`
  - 公开站所需数字的唯一数据源，逐项包含 source、statistic type、N、status 与 note。
- 首页 `Evaluation System`
  - Human Evaluation / Signal Diagnostics / Execution & Analytics 三列。
- PLS `07 / EVALUATION SYSTEM`
  - Why Signal Evidence、What Is Automated、What Remains Human、Evidence Fusion、系统总图。
- PLS `09 / OPERATIONALIZATION`
  - Evaluation Standard Lifecycle；区分 Executed 与 Future Extension / Scale-out Design。
- Working Paper 简短系统章节。

## 4. Existing modules to reuse

- PLS 的 Point / Line / Scene / Independent OVL。
- 3→4→4 与五条冻结 Cross-Round Findings，原样保留。
- Evaluation Schema v1.0 与 Execution Layer v0.1 的公开说明，展示层只连接职责，不修改实现。
- T2A N=200 Acoustic Diagnostics 的正式口径来自内部 `projectEvidence.ts` 与 `full_evaluation_report_v1.3.md`。

## 5. Content that should not become a page

- 不新建 `/signal-diagnostics`、`/evaluation-standard-framework` 或 `/evaluation-system` 顶级页。
- Standard Lifecycle 作为 PLS Operationalization 子模块。
- Signal Diagnostics 作为 PLS 的辅助 Evidence Layer。
- 不公开 Interview Prep、Mock Interview、Crash Course、Do Not Say、Candidate Gap、Learning Status、自评或面试答案。

## 6. Expected navigation

- 首页主导航保持：项目 / 评测方法 / 声音实践 / 简历。
- 首页 Evaluation System CTA：
  - `查看评测方法 → /point-line-scene-framework#evaluation-system`
  - `查看案例研究 → /audio-visual-evaluation`
- T2A 与 AV 页面通过轻量链接回到 PLS 系统章节。
- 不新增顶级导航项，不改变公开站的信息架构。

## 7. Evidence and implementation boundaries

- Implemented：PLS Human Evaluation、Execution Layer、Acoustic Diagnostics batch analysis。
- Integrated Concept：Signal Evidence 与 PLS / Evaluation Record 的概念级连接。
- Future Extension：正式 Schema signal evidence 字段、Corpus Analytics、多人 Calibration / Sampling QA / Adjudication。
- 本轮不修改 `evaluation_record.schema.json`、PLS Capability Taxonomy、Execution Layer 代码或冻结研究结论。
- 本轮不提交、不部署，完成后等待人工审核。


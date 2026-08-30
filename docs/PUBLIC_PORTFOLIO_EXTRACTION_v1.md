# Public Portfolio Extraction v1.0

完成日期：2026-08-30  
状态：本地完成，未提交、未推送、未部署

## 1. 本次修改页面

- 首页 `/`
- T2A 案例页 `/t2a-case-study`
- Audio-Visual Generation Evaluation `/audio-visual-evaluation`
- Point–Line–Scene 研究页 `/point-line-scene-framework`
- PLS Working Paper `/point-line-scene-framework/report`

没有新增顶级项目页，也没有公开内部面试准备页面。

## 2. 新增公开模块

### Evaluation System

首页新增轻量系统视图：

`Human Judgment × Signal Diagnostics × Structured Execution`

它连接既有 T2A、Audio-Visual Evaluation、PLS 与 Execution Layer，不作为新的独立理论。首页同时加入 Research Evolution，呈现从 T2A 主观听评到 Reference-aware Diagnosis 与 Execution Layer 的研究演进。

### Signal Diagnostics

PLS 研究页新增四组辅助信号证据：

- Technical
- Spectral
- Spatial
- Dynamics

公开指标统一来自已执行的正式 T2A `N=200` 批量声学分析，来源记录为 `full_evaluation_report_v1.3.md`。公开值包括解码/分析计数、Spectral Centroid、L/R Correlation、Integrated LUFS、Crest Factor 与 True Peak。

### Human-in-the-loop Evaluation System

系统图将人工评测与信号诊断并行组织：

`Requirement → Capability Taxonomy → Evaluation Set`

随后分为 Human Evaluation 与 Signal Diagnostics，并在 Evidence / Evaluation Record 汇合，经 Evaluation Schema、Execution Layer、Dataset Analytics 进入 Diagnosis / Regression。

### Evaluation Standard Lifecycle

PLS 页面新增标准生命周期：

`Requirement → Capability Definition → Draft Rubric → Pilot → Calibration → Formal Evaluation → QA Feedback → Revision → Regression`

其中 Capability Definition、Rubric Design、Blind Evaluation、Hidden Repeat 与 Controlled Regression 标记为项目中已实践；Multi-evaluator Calibration、Gold Samples、Sampling QA 与 Adjudication 标记为 Future Extension。

## 3. 轻量页面连接

- T2A 页将旧的“五层”措辞收紧为 Acoustic Diagnostics，并链接到完整 Evaluation System。
- Audio-Visual Evaluation 页说明 PLS 负责关系诊断，Signal Diagnostics 作为音频输出的补充证据层。
- Working Paper 新增第 8 节 Human-in-the-loop Evaluation System，并加入论文风格系统图；原有结果、讨论、限制、未来工作与结论顺延编号。

## 4. 证据状态

| 模块 | 状态 |
|---|---|
| PLS Human Evaluation | Implemented |
| Execution Layer v0.1 | Implemented |
| Signal Diagnostics batch analysis | Implemented |
| Signal → PLS record connection | Integrated Concept |
| Multi-evaluator QA | Future Extension |

两个 Evidence Fusion 示例均标记为 Integrated Concept，只用于解释“人工观察 + 信号证据”的方法连接，不作为自动评分规则或已完成的案例结论。

## 5. 保持不变的内容

- P1–P4、L1–L4、S1–S4 定义与 Taxonomy 未改。
- PLS Evaluation Schema v1.0 与 Execution Layer 实现未改。
- `3→4→4` 仍解释为 Text→Visual FAIL、Visual→Audio PASS、P4=5。
- Cross-Round 冻结结论保持：
  - Exact-count = Repeated Diagnostic Pattern
  - Onset = Not Replicated
  - Dynamic = Mixed / Refined
  - Cross-shot = Not Replicated
  - Audio Quality = Persistent / Exploratory Concern
- Round-1、Round-2、Cross-Round frozen snapshots 与既有 tags 未改。

## 6. 明确未公开的内部内容

- 面试话术、模拟面试、速成课、岗位 JD、加分点或危险表达。
- 未执行的 FAD / JS 结果。
- 被内部审查否决或来源不一致的声学数字。
- “全自动评测”“工业统一阈值”“模型内部根因”等越界结论。
- 安全攻防、哈希或 SHA256 等工程审计叙事。

## 7. 测试与页面验收

### 公共网站仓库

- `npm run typecheck`：PASS
- `npm run lint`：PASS
- `npm test`：PASS，12/12 页面测试通过；包含一次完整 build

首次测试因 PLS 页面新增章节后编号超过既有 01–11 展示约束而失败。最终保留原有 01–11 主序列，并以 06B、07B 表示两个插入模块；未修改测试文件。

### 冻结 AV 评测仓库

- Round-1：49/49 PASS
- Cross-Round：81/81 PASS
- PLS Execution Layer：21/21 PASS
- Signal Diagnostics：16/16 PASS
- Round-2 独立入口：FAIL；现有脚本生成的临时入口无法解析仓库中实际存在的 `src/utils/round2Analysis` 与 `src/data/round2`。本次未修改冻结仓库处理该入口问题。

### 响应式验收

检查尺寸：

- 1440 × 900
- 1280 × 800
- 768 × 1024
- 390 × 844

首页、PLS 系统模块与 Working Paper 均无页面级或模块级横向溢出。390px 下首页卡片、PLS 状态卡、信号分组、系统图与 Working Paper 流程图均转为单列；768px 保留可读的双分支结构。

## 8. 后续扩展

- 多评测员 Calibration、Gold Samples、Sampling QA 与 Adjudication。
- Signal Evidence 与人工评分的样本级连接和相关性验证。
- Corpus-level distribution metrics。
- 在明确证据边界后，再评估自动 Judge 与生产流程接入。

本轮没有 commit、push 或 deploy。

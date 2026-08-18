# Point–Line–Scene：面向生成式音频与音视频模型的分层诊断评测框架

**Point–Line–Scene: A Hierarchical Diagnostic Evaluation Framework for Generative Audio and Audio-Visual Models**

从细粒度能力分解到显式参考链诊断与可执行评测

- 作者：杜明
- 领域：AI 音频与音视频生成评测
- 日期：2026.08
- 类型：Working Paper / Research Note

## 摘要

生成式音频与音视频模型常以整体相似度或总体质量概括表现，但单一结果难以回答事件是否缺失、关系何处失配以及错误发生在哪一条跨模态链路。本文提出 Point–Line–Scene（PLS）分层诊断框架，将评价对象组织为原子正确性、关系正确性与整体场景一致性，并保留独立的感知质量轴。本文固定 P1–P4、L1–L4、S1–S4 共 12 项能力，建立 PLS Evaluation Schema v1.0，将 Facts、Capability、Dimension Profile、Validity、Diagnostic Gate、OVL 与 Diagnosis 连接为结构化记录。两轮 Audio-Visual Generation Evaluation 由 Round-1 问题发现进入 Round-2 受控回归。P06、P10 与 R2-H1-B 的 `3→4→4` 模式进一步促成显式参考链诊断（Reference-aware Diagnosis）。Execution Layer v0.1 支持 Schema 校验、Dimension Profile 派生、轻量一致性检查与人可读诊断摘要。当前结果基于诊断性案例研究，尚不用于模型总体性能估计。

**关键词：** Generative Audio Evaluation；Audio-Visual Generation；Fine-Grained Evaluation；Failure Localization；Reference-aware Diagnosis；Controlled Regression

## 1. 引言

PLS 研究如何用一套紧凑、可执行的结构组织不同粒度的评价对象，使评测结果既保留专业判断空间，又能服务于失败定位、受控回归与研发优先级。完整网页论文提供方法、Schema、案例、结果、讨论、参考文献与附录的正式呈现。

## 2. 相关工作

近期研究将评价单位从整体相似度下沉到事件、属性、时间关系、结构化声景与可验证 rubric；音视频评测进一步关注跨模态联合正确性，制作研究与 Judge 研究则补充生产可用性和证据依赖问题 [1–10]。

## 3. Point–Line–Scene 方法框架

- **Point：** 事件、声源、材质、属性与数量的原子正确性。
- **Line：** 起点、顺序、持续、重叠与动态对应的关系正确性。
- **Scene：** 环境、空间、显著性与叙事内声音的整体场景一致性。
- **Quality / OVL：** 独立于 PLS 记录的感知质量轴。

## 4. Capability Taxonomy 与 Evaluation Schema

固定能力为 P1 Event Completeness、P2 Source Correctness、P3 Material / Attribute Consistency、P4 Event Counting；L1 Onset Alignment、L2 Temporal Order、L3 Duration / Overlap、L4 Dynamic Correspondence；S1 Environment Match、S2 Spatial Plausibility、S3 Attention / Salience Consistency、S4 Diegetic Consistency。

评分使用 `1–5 + N/A + UNEVALUABLE`。PLS Evaluation Schema v1.0 的数据链为：

`Facts → Capability → Dimension Profile → Validity + Diagnostic Gate → OVL → Diagnosis`

Dimension Profile 输出 Point、Line、Scene 的 `mean + n`，不生成 PLS Total Score。

## 5. Audio-Visual Generation Evaluation 案例研究

Round-1 以 10 个单次生成样本发现问题；Round-2 以 6 个单次生成样本，在预设主要能力、观察字段与判定规则后开展受控回归（Controlled Regression）。跨轮结果分别记录为 Repeated Diagnostic Pattern、Not Replicated、Mixed / Refined 与 Persistent / Exploratory Concern。

## 6. 显式参考链诊断

`Prompt Requirement → Visual Fact → Audio Observation`

- Instruction Fidelity：Prompt ↔ Visual
- Cross-modal Correspondence：Visual ↔ Audio

P06、P10 与 R2-H1-B 均为 `Prompt=3、Visual=4、Audio=4`。因此 Text→Visual=FAIL、Visual→Audio=PASS、P4=5，结果不归因为 Audio Counting Failure。

## 7. Execution Layer v0.1

人工评测负责事实判定、能力评分与 Bad Case 归因；执行层负责 Schema 校验、Dimension Profile 派生、轻量一致性检查与诊断摘要生成。程序不替代评测员的专业判断。

四个迁移诊断案例的示例画像为 Point=5.00（n=10）、Line=4.25（n=8）、Scene=5.00（n=4），用于检查聚合和展示流程，不作为模型整体能力估计。

## 8. 结果与诊断发现

- Exact-count = Repeated Diagnostic Pattern
- Onset = Not Replicated
- Dynamic = Mixed / Refined
- Cross-shot = Not Replicated
- Audio Quality = Persistent / Exploratory Concern

代表性记录包括 P06、P10、H2 与 H3。H2 的 Point=5.00、Line=5.00、OVL=3 体现关系正确性与感知质量的独立性；H3 的 L4=3 与 `static_audio_motion` 保留部分成立的动态能力状态。

## 9. 讨论

PLS 采用 diagnostic-first aggregation：从 Dimension Profile 可以回到 Capability、Facts 与 Bad Case。显式参考链改善失败归因，跨轮证据状态用于安排复现、修复与后续回归。

## 10. 研究范围与限制

当前研究为小样本、单评测员的诊断性案例研究。H1-A 因关键 Visual Fact 不清晰记为 UNEVALUABLE；Scene 证据少于 Point 与 Line；尚未测试 inter-rater reliability。

## 11. 后续研究

后续将扩大 Scene 与多评测员证据，比较 PLS 与 holistic-only evaluation 的失败定位效果，并探索制作可用性、Preference / Reward 与 Automatic Judge 的连接。

## 12. 结论

PLS 以固定能力语言、Evaluation Schema v1.0 与 Execution Layer v0.1，形成从人工判断到结构化诊断的完整链路。其当前价值是为生成式音频与音视频模型提供可复查的失败定位与研发回归入口。

## References

1. Wang, J., et al. *AudioScape-TTA*. arXiv:2608.04479, 2026.
2. Li, H., et al. *AnyAudio-Judge*. arXiv:2606.03116, 2026.
3. Kuan, C.-Y., et al. *Improving Text-to-Audio Instruction Following via Fine-Grained Feedback*. Interspeech 2026.
4. Zheng, Z., et al. *MMAG*. arXiv:2608.06900, 2026.
5. Li, S., et al. *AcoustiTrace*. arXiv:2608.02035, 2026.
6. Zhou, Z., et al. *AVGen-Bench*. arXiv:2604.08540, 2026.
7. Desbos, M., et al. *A Production-Oriented Framework for Evaluation of SFX Generation*. DAFx26, 2026.
8. Manakul, P., et al. *AudioJudge*. EACL 2026.
9. Park, J., et al. *Auditing Protocol-Level Shortcuts in Large Audio Language Model Judges for Speech Evaluation*. 2026.
10. Yu, F., et al. *Reinforcement Learning with Evolving Rubrics as Rewards for Audio Reasoning*. 2026.
11. Elizalde, B., et al. *CLAP*. 2022.
12. Kilgour, K., et al. *Fréchet Audio Distance*. 2019.
13. ITU-T. *P.800.1: Mean Opinion Score (MOS) Terminology*. 2016.

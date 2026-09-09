# Creative QC & Repair Agent — Case Study

视频输出完成，不等于需求已经满足。这个项目验证的是：系统能否用证据判断错误、定位到具体条件，并仅修改相关时间线字段。

## 一次真实执行：A03

Compiler 将需求转成 Atomic RequirementSpec；Planner 提交 6 个编辑动作，分别处理 Logo、CTA、VO、BGM ducking、时长、输出尺寸。动作通过校验后，Executor 生成 12 秒、1080×1920 的真实视频。

A03 的 8 个自动条件全部 PASS。本例没有请求 P1/S1，不能据此宣称视觉条件已自动验证。VO 从 3.5 秒开始，完整保留至约 6.565 秒，没有截断原配音。

## 为什么需要 PLS 与 Evidence Router

POINT 判断对象，LINE 判断时间和关系，SCENE 判断组合构图，QUALITY 判断交付规格。C02 删除 Logo 后，P3 FAIL 导致 L1 BLOCKED；BLOCKED 不等于 FAIL。M04 Fault B 则出现 P1 PASS / S1 FAIL：主体还在，整体陈列却被破坏。后者来自真实抽帧和人工辅助视觉复核。

Timeline 回答 P3/P4/L1/L2，音频信号回答 P2/L3，成片元数据回答 Q1/Q2，视觉帧回答 P1/S1。能由确定性证据回答的问题，不交给 LLM 猜测。

## A10：Controlled recovery test

在有效输出上主动注入两个错误：Logo 从 8 秒推迟到 9.2 秒；BGM ducking 从 −8 dB 改为 0 dB。Evaluator 检测 L1/L3 FAIL，诊断生成 repair_target，受约束工具修改 Timeline，再渲染并使用同一 Evaluator 复测。

两个错误均被检测、修复；Logo 恢复至 8 秒，BGM 同一 VO 区间实测从 0 dB 变为 −7.99988 dB，无新增回归。这是受控恢复验证，不是自然发生的 Agent 故障。

## 冻结结果

| 测试范围 | 结果 |
|---|---|
| Controlled Regression expected judgments | 10/10 |
| Automated Repairs | 8/8 |
| Repair Regressions | 0 |
| Planner MATCH | 10/10 |
| Required Planner Actions | 14/14 |
| E2E Behavior MATCH | 6/10 |
| Executable E2E completed | 5/8 |
| A10 detection / repair | 2/2 · 2/2 |

6/10 是预期行为匹配，包含预期复核和安全停止，不是分类准确率。38/38 是实际评估过的自动条件通过数，不代表所有任务成功。各测试集分母不同，不能合并。

## 失败与迭代

M06 曾因 composition target 映射不符合 Schema 失败，随后澄清通用契约。最终仍保留 E07 Schema 错误、E11 Provider 超时。M07 初轮误判缺失 overlay 已满足，补充“库存可用不等于时间线存在”的通用规则后，最终轮 10/10 MATCH。

M08 保留 A04/A09 Compiler Schema 错误；A06 Planner 添加未请求的 ducking，被 Gate 拒绝；A07 保留 deferred 请求，却返回错误状态，也被 Gate 阻止。M08 单轮、无重试。核心冻结后，本次仅整理展示，没有重新调用模型或调整结果。

## 边界与证据入口

单源视频、固定素材库存、单一 Provider，未验证跨视频泛化；视觉为人工辅助复核；没有开放世界工具发现，不声称生产级可靠性。项目编辑已有媒体，不声称生成式视频能力。

首页 `/creative-qc-agent`，技术附录 `/creative-qc-agent/build-log`。网页证据位于 `/case-study/evidence/`，保留源文件相对路径与 SHA-256；视频为逐字节一致的副本，海报为派生抽帧。完整原始实现与运行证据保留在 M08 归档。

# T2A Model Comparison Report v2.0.3 — Public Release r1

> **数据版本：** `formal_scores_audited_v2.0.2.csv`，440 条试听记录（400 正式 + 40 隐藏重复）。
> 13 条 primary_badcase 一致性复核见 `adjudication_addendum_v2.0.2.csv`；
> 5 条语义标签抽查见 `semantic_label_review_v2.0.3.csv`。

## 01 项目摘要

第二阶段受控双模型比较：Stable Audio Open 1.0（重新生成基线）vs Stable Audio 3 Medium。
400 条正式样本的联合盲评，Prompt 层 Cluster Bootstrap 为主分析方法。

- 单一评测员，隐藏重复用于评测人自身稳定性
- OVL（整体音频质量，1–5）· REL（文本—音频语义符合度，1–5）
- primary_badcase（单选）+ 12 项 0/1 多标签诊断
- 10,000-iteration Cluster Bootstrap, seed=42

## 02 评测问题

1. 整体 OVL 是否呈现方向性差异？
2. REL 是否呈现方向性差异？
3. Badcase 类型分布是否不同？
4. 连续纹理辨识问题是否存在差异？
5. 排除 7 条 QC CHECK 后结论是否改变？

## 03 测试集

- 40 条原创英文 Prompt，7 个音效类别（每类 5–6 个 Prompt）
- 每模型 5 次生成重复（SA3M 未应用 seed，为随机重复）
- 2 模型 × 40 Prompt × 5 次生成 = 400 条正式样本
- 40 条隐藏重复（每模型 20 条）= 440 次试听事件

## 04 模型与生成配置

**SAO1 v2:** diffusers StableAudioPipeline (cpu_offload), diffusers 0.39.0, 100 steps, 10.0s,
guidance_scale 未显式传入（pipeline 默认）, seed 已应用。

**SA3M v2:** stabilityai/stable-audio-3-medium, 8 steps, 10.0s, cfg_scale=1.0,
seed 未应用（5 次生成为随机重复）。

## 05 盲化与人工听评

双阶段界面：先 OVL（不显示 Prompt）→ 提交后显示 Prompt → REL + 诊断。
10 个 Session × 44 条，自动记录 timestamp 和 replay_count。

## 06 裁决与数据冻结

- 原始评分与审核后评分分离，SHA256 已记录
- 31 条进入裁决（4 条补充 notes）
- 13 条 primary_badcase 一致性经人工复核
- 5 条 texture_ambiguity 经语义抽查（semantic_label_review_v2.0.3.csv）
- 修正后残留一致性问题：0

## 07 单评测员复测一致性

隐藏重复用于同一评测人的复测稳定性，不报告多人一致性。

| 指标 | 结果 |
|---:|---|
| OVL 完全一致 | 22/40 (55%) |
| OVL 差值≤1 | 38/40 (95%) |
| REL 完全一致 | 25/40 (62%) |
| REL 差值≤1 | 39/40 (98%) |
| 决策一致 | 34/40 (85%) |
| primary_exact | 27/40 (68%) |

## 08 总体模型结果

| 指标 | SA3M | SAO1 | Δ |
|:---|---:|---:|:---|
| OVL 均值±SD | 3.64±0.99 | 3.78±0.97 | -0.14 |
| REL 均值±SD | 3.31±1.14 | 3.35±0.96 | -0.05 |

**决策分布：**
| 决策 | SA3M | SAO1 |
|:---|---:|---:|
| pass | 73（36%） | 61（30%） |
| keep_as_badcase | 93（46%） | 122（61%） |
| needs_regeneration | 34（17%） | 17（8%） |

SAO1 的输出更多集中于 keep_as_badcase，SA3M 的 needs_regeneration 比例更高。

## 09 Prompt 层模型差异

| | Δ 均值 | 95% CI |
|:---|---:|:---|
| ΔOVL (SA3M − SAO1) | -0.1387 | [-0.3950, 0.1150] |
| ΔREL (SA3M − SAO1) | -0.0496 | [-0.2950, 0.1800] |

两个 95% CI 均跨越零点。在当前 40 条 Prompt 测试集中，未观察到具有明确方向的总体 OVL 或 REL 差异。

**禁止解释为：** 两模型等价、完全相同、整体表现接近、不存在差异。

Prompt 层 Win/Tie/Loss（描述性）：40 个 Prompt 中，SA3M 更高 17、持平 4、SAO1 更高 19。

## 10 Prompt 内生成波动

使用「Prompt 内生成波动」，不使用「种子稳定性」。
SA3M OVL SD 中位数：0.55
SAO1 OVL SD 中位数：0.55

## 11 类别探索分析

类别内 Prompt 数量为 5–6 个，以下均为探索性分析。

| 类别 | SA3M OVL | SAO1 OVL | Δ |
|:---|---:|---:|:---|
| ANI | 2.88 | 3.84 | -0.96 |
| DLY | 3.87 | 3.73 | +0.13 |
| FLY | 3.43 | 3.93 | -0.50 |
| MAG | 4.20 | 4.04 | +0.16 |
| MEC | 4.00 | 4.10 | -0.10 |
| NAT | 3.70 | 3.43 | +0.27 |
| WPN | 3.37 | 3.43 | -0.07 |

在探索性类别均值中，SA3M 的 ANI 类 OVL 和 REL 均低于 SAO1。类别结果不进行显著性检验。

## 12 Badcase 发生率变化

多标签发生率（每 100 条正式样本，一条可含多个标签）：

| 标签 | SA3M | SAO1 | Δ |
|:---|---:|---:|:---|
| wrong_source | 14.5 | 6.5 | +8.0 |
| wrong_count | 15.0 | 21.5 | -6.5 |
| artifact_noise | 12.5 | 17.0 | -4.5 |
| texture_ambiguity | 5.5 | 8.0 | -2.5 |

SA3M 的 wrong_source 较 SAO1 高 8.0 个百分点。
SAO1 的 artifact_noise 较 SA3M 高 4.5 个百分点。
以上为描述性差异，不称为显著差异。

## 13 连续纹理问题

在本次测试集中，两个模型均观察到 texture_ambiguity：SA3M 5.5/100，SAO1 8.0/100。
该结果作为描述性发现，用于指导下一轮连续纹理专项测试方向。

## 14 QC 敏感性分析

排除 7 条 QC CHECK 样本后：

| 指标 | 全部 (n=400) | 排除 CHECK (n=393) |
|:---|---:|---:|
| OVL 样本均值差 | -0.140 | -0.151 |
| REL 样本均值差 | -0.050 | -0.065 |

排除 QC CHECK 样本后，主要模型差异方向保持一致。

## 15 代表性试听案例

8 组案例按 SA3M 更好 / SAO1 更好 / 接近 / 均失败 / 连续纹理 平衡选取。
详见 `listening_examples_v2.csv`。

## 16 方法边界

- 单一评测员，不代表群体主观偏好。
- 隐藏重复用于评测者自身复测稳定性，不报告 inter-rater reliability 或 ICC。
- 相同 seed 不代表相同潜变量输入；SA3M 正式生成未应用 seed。
- 类别和 Badcase 子组分析属于探索性分析。
- 客观指标用于文件质量检查和风险定位，不替代人工语义裁决。
- 结果只适用于当前模型版本、配置和测试集。
- 不对模型内部机制进行因果归因。

## 17 结论与下一步

1. 在当前 40 条 Prompt 测试集中，SA3M 与 SAO1 未显示明确方向性的总体 OVL 或 REL 差异。
2. 两个模型呈现不同的 Badcase 分布：SA3M 的 wrong_source 更高，SAO1 的 artifact_noise 更高。
3. 连续纹理辨识问题在两个模型中均存在。
4. 后续将以单评测员个人项目形式执行连续纹理 Stress Set，沿用隐藏重复、盲化和裁决流程。

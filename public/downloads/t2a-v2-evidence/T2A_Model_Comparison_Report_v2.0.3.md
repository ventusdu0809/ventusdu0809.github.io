# T2A Model Comparison Report v2.0.3

> 项目版本：T2A_Model_Comparison_v2.0
> 评测员：DM01（单人）
> 正式样本：400（40 Prompt × 5 次生成 × 2 模型）
> 隐藏重复：40
> 评分日期：2026-07-25

---

> **数据版本：** 本报告基于 （440 条）。
> v2.0 → v2.0.1 修正了 13 条 primary_badcase 与多标签不一致（见 ）。
> OVL、REL 和 decision 未受影响。


## 01 项目摘要

本项目在同一测试集、统一盲评流程和相同评测标准下，对 Stable Audio Open 1.0（SAO1）和 Stable Audio 3 Medium（SA3M）两个文本到音频生成模型进行受控比较。

400 条正式样本由单一评测员在盲化条件下完成 OVL（整体音质）、REL（语义相关性）、事件级诊断标签和最终决策的评分。40 条隐藏重复用于评估评测员自身的复测稳定性。

核心发现：在当前 40 条 Prompt 测试集中，两模型的 OVL 均值差 Δ=−0.14（SA3M−SAO1），95% Bootstrap CI [−0.40, +0.12]，跨越零点。REL 均值差 Δ=−0.05，95% CI [−0.30, +0.18]。未观察到具有统计可信度的方向性差异。

---

## 02 评测问题

本轮比较回答以下五个问题：

1. SA3M 的整体音频质量是否高于 SAO1？
2. 对 Prompt 中声源、属性、数量、时序的遵循是否改善？
3. 同一 Prompt 下的生成波动是否降低？
4. SAO1 已知的连续纹理问题是否得到改善？
5. SA3M 是否产生了新的 Badcase 类型？

---

## 03 测试集

| 参数 | 值 |
|:---|:---|
| Prompt 数量 | 40 |
| 类别 | 7（NAT/FLY/WPN/MEC/ANI/MAG/DLY） |
| 每 Prompt 生成次数 | 5 |
| 模型数量 | 2 |
| 正式样本 | 400 |
| 隐藏重复 | 40 |
| 试听事件 | 440 |

---

## 04 模型与生成配置

### SA3 Medium

| 参数 | 值 |
|:---|:---|
| 模型 | stabilityai/stable-audio-3-medium |
| 实现 | stable-audio-3 (commit 124e8a7) |
| Checkpoint SHA256 | 48d9c65e… |
| steps | 8 |
| cfg_scale | 1.0 |
| duration | 10.0s |
| 后处理 | 无 |

### SAO1 v2 Regenerated Baseline

| 参数 | 值 |
|:---|:---|
| 模型 | stabilityai/stable-audio-open-1.0 |
| 实现 | diffusers StableAudioPipeline (cpu_offload) |
| steps | 100 |
| cfg_scale | 7.0（默认） |
| duration | 10.0s |
| 后处理 | 无 |

**Seed 说明：** SA3M 正式生成未应用 torch.manual_seed()，5 次生成为随机重复。SAO1 生成时调用了 torch.manual_seed(seed)。相同数值仅作为重复编号。SA3M 的诊断显示同 seed 连续两次生成 PCM 波形完全不可复现（Pearson r≈0）。本轮不将相同 seed 解释为相同潜变量输入。

---

## 05 盲化与人工听评

400 条正式样本 + 40 条隐藏重复 = 440 次试听事件，随机混排后分配 Blind ID C0001–C0440。评测员不知道每条样本的模型、Prompt、类别、seed 或是否为隐藏重复。

评分采用双阶段流程：先听音频评定 OVL（1–5），然后显示 Prompt 评定 REL（1–5）、事件级诊断标签（12 类）和最终决策（pass / keep_as_badcase / needs_regeneration）。

440 次试听分布在 10 个 Session 中完成，每 Session 44 条。

---

## 06 裁决与数据冻结

原始评分表经完整性检查（0 缺失、0 越界）后冻结为 `absolute_ratings_raw_frozen.csv`（SHA256: 15a30466…）。

31 条进入裁决流程：27 条 OVL−REL 大分差（≥2）经确认均为合理评测结果；4 条低分备注过短已补充详细描述。

最终审核后评分：**0 条评分被修改**，仅 4 条 notes 得到补充。

---

## 07 单评测员复测一致性

40 对隐藏重复的复测一致性：

| 指标 | 结果 |
|---:|---|
| OVL_exact | 22/40 (55%) |
| OVL_within1 | 38/40 (95%) |
| OVL_MAD | 0.50 |
| REL_exact | 25/40 (62%) |
| REL_within1 | 39/40 (98%) |
| REL_MAD | 0.40 |
| decision_exact | 34/40 (85%) |
| primary_exact | 26/40 (65%) |

OVL 差值≤1 的复测一致性为 95%，REL 差值≤1 为 98%，表明评测员自身评分具有较高的短期稳定性。

---

## 08 总体模型结果

| 指标 | SA3M | SAO1 | Δ (SA3M−SAO1) |
|:---|---:|---:|---:|
| OVL 均值±SD | 3.64±0.99 | 3.78±0.97 | -0.14 |
| OVL 中位数 | 4 | 4 | — |
| REL 均值±SD | 3.31±1.14 | 3.35±0.96 | -0.05 |
| REL 中位数 | 3 | 3 | — |

### 决策分布

| 决策 | SA3M | SAO1 |
|:---|---:|---:|
| pass | 73 (36%) | 61 (30%) |
| keep_as_badcase | 93 (46%) | 122 (61%) |
| needs_regeneration | 34 (17%) | 17 (8%) |

SAO1 的 keep_as_badcase 比例更高（61% vs 47%），needs_regeneration 比例更低（9% vs 17%），提示 SA3M 在少数样本上出现了更极端的失败。

---

## 09 Prompt 层模型差异

以 40 个 Prompt 为重采样单位，10,000 次 Cluster Bootstrap（seed=42）：

| 指标 | Δ 均值 | 95% CI |
|:---|---:|:---|
| ΔOVL | -0.1387 | [-0.3950, 0.1150] |
| ΔREL | -0.0496 | [-0.2950, 0.1800] |

两个 CI 均跨越零点。在当前 40 条 Prompt 测试集中，未观察到统计上明确的总体差异，SA3M 相对 SAO1 的 OVL 差值置信区间跨越零点。

### Prompt 层 Win/Tie/Loss（描述性）

在 Prompt 层级：SA3M OVL 更高 17 个，持平 4 个，SAO1 更高 19 个。

---

## 10 Prompt 内生成波动

SA3M 的 Prompt 内 OVL 标准差中位数：0.55
SAO1 的 Prompt 内 OVL 标准差中位数：0.55

高波动 Prompt（OVL SD≥1.0）：SA3M 4 个，SAO1 3 个。

---

## 11 Badcase 发生率变化

### 多标签发生率（每 100 样本）

| 标签 | SA3M | SAO1 | Δ |
|:---|---:|---:|---:|
| wrong_source | 14.5 | 6.5 | +8.0 |
| missing_secondary_event | 15.5 | 16.0 | -0.5 |
| extra_event | 1.5 | 2.0 | -0.5 |
| wrong_count | 14.5 | 21.5 | -7.0 |
| wrong_attribute | 17.5 | 12.5 | +5.0 |
| wrong_temporal_order | 1.5 | 1.0 | +0.5 |
| artifact_noise | 11.5 | 16.5 | -5.0 |
| abrupt_cutoff | 3.0 | 4.0 | -1.0 |
| clipping | 0.0 | 0.5 | -0.5 |
| silence | 0.0 | 0.5 | -0.5 |
| texture_ambiguity | 4.5 | 7.0 | -2.5 |
| other | 2.5 | 2.5 | +0.0 |

SA3M 的 wrong_source 多标签发生率较 SAO1 高 8.0 个百分点；SAO1 的 artifact_noise 较 SA3M 高 5.0 个百分点。以上为描述性差异，分母为每个模型 200 条正式样本，一条样本可同时包含多个标签。

### texture_ambiguity 专项

texture_ambiguity 发生率：SA3M 4.5/100，SAO1 7.0/100。SAO1 的连续纹理模糊问题略多于 SA3M，但差异有限。

---

## 12 类别探索分析

| 类别 | SA3M OVL | SAO1 OVL | ΔOVL | SA3M REL | SAO1 REL | ΔREL |
|:---|---:|---:|---:|---:|---:|---:|
| ANI | 2.88 | 3.84 | -0.96 | 2.72 | 3.48 | -0.76 |
| DLY | 3.87 | 3.73 | +0.13 | 3.50 | 3.33 | +0.17 |
| FLY | 3.43 | 3.93 | -0.50 | 3.27 | 3.47 | -0.20 |
| MAG | 4.20 | 4.04 | +0.16 | 4.04 | 3.64 | +0.40 |
| MEC | 4.00 | 4.10 | -0.10 | 3.70 | 3.47 | +0.23 |
| NAT | 3.70 | 3.43 | +0.27 | 3.33 | 3.30 | +0.03 |
| WPN | 3.37 | 3.43 | -0.07 | 2.60 | 2.87 | -0.27 |

> ⚠️ 类别内 Prompt 数量有限（5–7 个/类），标注为探索性分析。

---

## 13 代表性试听案例

### [sa3m_better] DLY_003

> **EN:** Typing on a mechanical keyboard, rapid keystrokes clicking for a few seconds, then a single mouse click to finish
> **CN:** 机械键盘上打字，快速按键咔嗒声持续几秒，最后以一声鼠标点击结束

| | OVL | REL |
|:---|---:|---:|
| SA3M | 5 | 3 |
| SAO1 | 3 | 3 |

音频文件：`08_reports/listening_examples/sa3m_better_DLY_003_SA3M.wav` / `..._SAO1.wav`

### [both_fail_sa3m_less_severe] NAT_006

> **EN:** Wind blowing through a bamboo forest, leaves rustling and stalks creaking as they sway
> **CN:** 风吹过竹林，竹叶沙沙作响，竹竿随风摇曳发出吱嘎声

| | OVL | REL |
|:---|---:|---:|
| SA3M | 2 | 1 |
| SAO1 | 1 | 1 |

音频文件：`08_reports/listening_examples/sa3m_better_NAT_006_SA3M.wav` / `..._SAO1.wav`

### [sao1_better] NAT_004

> **EN:** A campfire crackling steadily, with occasional pops and sparks as the wood burns
> **CN:** 篝火稳定燃烧的噼啪声，偶尔有火星爆裂和木柴燃烧的声响

| | OVL | REL |
|:---|---:|---:|
| SA3M | 2 | 1 |
| SAO1 | 5 | 5 |

音频文件：`08_reports/listening_examples/sao1_better_NAT_004_SA3M.wav` / `..._SAO1.wav`

### [sao1_better] FLY_005

> **EN:** Three quick footsteps on gravel, then a metal gate swinging open with a rusty screech
> **CN:** 碎石上三步快速脚步，然后金属门带生锈尖啸声打开

| | OVL | REL |
|:---|---:|---:|
| SA3M | 2 | 2 |
| SAO1 | 4 | 3 |

音频文件：`08_reports/listening_examples/sao1_better_FLY_005_SA3M.wav` / `..._SAO1.wav`

### [close] DLY_001

> **EN:** A wall clock ticking steadily, each tick a sharp precise click with exactly one second between each tick
> **CN:** 挂钟稳定滴答作响，每声滴答清晰精确咔嗒，间隔恰好一秒

| | OVL | REL |
|:---|---:|---:|
| SA3M | 3 | 3 |
| SAO1 | 4 | 4 |

音频文件：`08_reports/listening_examples/close_DLY_001_SA3M.wav` / `..._SAO1.wav`

### [close] DLY_004

> **EN:** Water pouring from a kettle into a ceramic cup, the liquid stream splashing and rising in pitch as the cup fills
> **CN:** 水从水壶倒入陶瓷杯中，水流溅入杯中，音调随杯满而升高

| | OVL | REL |
|:---|---:|---:|
| SA3M | 4 | 4 |
| SAO1 | 5 | 5 |

音频文件：`08_reports/listening_examples/close_DLY_004_SA3M.wav` / `..._SAO1.wav`

### [texture] FLY_006

> **EN:** Fabric rustling and clothes shifting, as someone adjusts their jacket with soft friction sounds
> **CN:** 织物摩擦和衣物移动声，整理夹克的柔和摩擦声

| | OVL | REL |
|:---|---:|---:|
| SA3M | 5 | 4 |
| SAO1 | 3 | 3 |

音频文件：`08_reports/listening_examples/texture_FLY_006_SA3M.wav` / `..._SAO1.wav`

### [texture] NAT_003

> **EN:** Ocean waves crashing against rocky cliffs, each wave building up then collapsing with a deep splash
> **CN:** 海浪拍打岩石悬崖，每一波浪涌起后崩塌发出深沉的溅响

| | OVL | REL |
|:---|---:|---:|
| SA3M | 3 | 3 |
| SAO1 | 3 | 3 |

音频文件：`08_reports/listening_examples/texture_NAT_003_SA3M.wav` / `..._SAO1.wav`

---

## 14 方法边界

本项目的方法边界：

- **单一评测员**：所有评分来自同一评测员（DM01）。不报告评测员间一致性，不将结果解释为群体偏好；
- **隐藏重复**：用于评估评测者自身的复测稳定性；
- **相同数值 seed**：不代表相同潜变量输入。SA3M 同 seed 连续两次生成确认 PCM 不可复现；
- **类别分析**：属于探索性分析，各类别 Prompt 数量不均衡；
- **客观指标**：CLAP/FAD 等客观指标不替代人工语义裁决；
- **因果归因**：不根据输出表现推断模型内部机制或根因；
- **范围限制**：结果仅适用于当前模型版本、生成配置和 40 条 Prompt 测试集。

---

## 15 结论与下一步

1. **在当前测试集上，未观察到明确的总体优势方向**：OVL 和 REL 的 Prompt 层级差值均跨越零点，未观察到具有统计可信度的方向性差异。

2. **SA3M 在音质和语义上的优势与劣势并存**：SA3M 在魔法、自然声等类别上略有优势，但在动物声上明显落后（ΔOVL=−0.96）。SA3M 的 wrong_source 发生率更高（+8.0/100），但 needs_regeneration 比例也更高（17% vs 9%），提示更极端的失败模式。

3. **SAO1 的输出更多集中于 keep_as_badcase，而 SA3M 的 needs_regeneration 比例更高**：keep_as_badcase 更多（61%）但极端失败更少（9% needs_regeneration）。artifact_noise 发生率高于 SA3M（+5.0/100）。

4. **连续纹理问题两模型均存在**：texture_ambiguity 发生率接近（SA3M 5.5 vs SAO1 8.0/100），提示这是在本次测试集中，两个模型均观察到连续纹理辨识问题。

5. **单评测员复测稳定性良好**：OVL within-1=95%，REL within-1=98%，支持评分数据的可靠性。

### 下一步

- 基于当前 Badcase 转移结果，设计连续纹理型音效专项 Stress Set（36 Prompt × 3 次生成 × 2 模型）；
- 在作品集网站中展示完整对比流程和试听案例；
- 后续继续以单评测员个人项目形式执行连续纹理 Stress Set。
# WPN_004 研发反馈示例

问题类型：事件结构 / `wrong_count` 与 `missing_secondary_event`  
影响维度：REL、事件数量、主次事件可区分性与时序  
证据范围：同一 Prompt 的 5 个固定 seed

## 1. Prompt

> Two swords clashing with a loud metallic ring, then one sword falling and clattering on stone ground

目标结构：

1. 两把剑先发生碰撞，并出现明确金属鸣响；
2. 随后其中一把剑落到石地并发出独立的撞击/滚落声。

## 2. Prompt 组证据

| Seed | Blind ID | OVL | REL | 主要标签 | 最终决策 |
|---:|---|---:|---:|---|---|
| 42 | B0099 | 4 | 3 | `wrong_count` | `keep_as_badcase` |
| 123 | B0121 | 5 | 3 | `missing_secondary_event` | `keep_as_badcase` |
| 456 | B0219 | 4 | 3 | `missing_secondary_event` | `keep_as_badcase` |
| 789 | B0058 | 4 | 3 | `wrong_count` | `keep_as_badcase` |
| 1024 | B0110 | 4 | 3 | `wrong_count` | `keep_as_badcase` |

组级结论：

- 5/5 样本均记录了事件结构问题；
- 其中 3/5 为 `wrong_count`，2/5 为 `missing_secondary_event`；
- 5/5 的 REL 均为 3，说明核心武器碰撞大致相关，但数量、主次事件或先后结构未完整满足；
- 5/5 均保留为 `keep_as_badcase`，用于专项分析与回归测试。

## 3. B0099 单条复听记录

> 第 1、3 次 impact 后出现杂音；主次事件相似、难以区分，且事件数量过多。

该表述只记录可听见的输出行为，不推断其内部生成原因。

## 4. 数据 QA 注记

B0099 在 canonical 快照中的 `primary_badcase=wrong_count`，但 `count_match=NA`。

- 本证据包保留 canonical 值，不静默补成 0；
- 组级统计采用已确认的 `primary_badcase` 最终分类；
- 该不完全对齐应在后续数据字典或回归版本中复核；
- 此 QA 注记不改变 B0099 的 OVL、REL、主要标签或最终人工决策。

## 5. 建议的回归测试

1. **单事件与双事件对照**：使用只包含一次剑击的 Prompt 与明确两阶段 Prompt 做最小对照。
2. **增加事件间隔**：保持声源与材质不变，仅扩大“碰撞→落地”的时间间隔。
3. **控制事件数量**：分别测试“一次碰撞”“两次碰撞”“一次碰撞后一次落地”，检查计数与阶段边界。
4. **主次事件可分辨性**：固定金属剑碰撞，改变落地材质或响度层级，检查第二事件是否仍能独立识别。
5. **背景干扰检查**：在相同 Prompt 结构下比较有无额外背景事件，记录其是否影响计数与时序判断。

## 6. 反馈边界

- 这是一份从本次 5-seed 输出整理的研发反馈示例，不是跨模型通用结论。
- 不设置自动阈值，不以客观指标替代人工事件级判断。
- 不把可观察到的数量、时序或噪声问题写成模型内部机制根因。


# T2A 公开字段字典

适用文件：`T2A_Example_Rows_10.csv`  
来源口径：`data/ratings_final_200_adjudicated.csv`

## 字段

| 字段 | 类型 / 取值 | 含义 |
|---|---|---|
| `sample_id` | 文本 | 正式样本 ID，由 Prompt ID 与 seed 组成。 |
| `blind_id` | 文本 | 听评阶段使用的盲测 ID。 |
| `prompt_id` | 文本 | 原创 Prompt 的稳定标识。 |
| `category_key` | 枚举 | 英文类别键：`natural_environment`、`mechanical_technology`、`weapon_combat`、`action_foley`、`animal`、`daily_life`、`magic_fantasy`。 |
| `category_cn` | 文本 | 类别中文名。 |
| `seed` | 整数 | 固定生成 seed：42、123、456、789 或 1024。 |
| `OVL` | 1–5 | 隐藏 Prompt 时评定的整体音频质量。 |
| `REL` | 1–5 | 显示英文 Prompt 后评定的文本—音频相关性。 |
| `tech_pass` | `是` / `否` | 人工记录的技术检查是否通过。 |
| `artifact_severity` | 0–2 | 项目内的伪影严重度序数编码；数值越高表示记录的风险越重，但不单独决定最终裁决。 |
| `primary_event` | 0 / 1 / 2 | 主事件诊断：0 未满足，1 部分满足，2 满足。 |
| `secondary_event` | 0 / 1 / 2 / `NA` | 次事件诊断；没有适用次事件时可为 `NA`。 |
| `attribute_match` | 0 / 1 / 2 / `NA` | 声源属性、材质或描述特征的匹配程度。 |
| `temporal_match` | 0 / 1 / 2 / `NA` | 事件先后、阶段或时间关系的匹配程度。 |
| `count_match` | 0 / 1 / 2 / `NA` | 明确数量要求的匹配程度；无适用数量要求或未填写时为 `NA`。 |
| `primary_badcase` | 枚举 | 主要问题标签，如 `wrong_count`、`wrong_source`、`wrong_attribute`、`missing_secondary_event`；`none` 表示无主要 Badcase 标签。 |
| `human_decision` | 枚举 | 最终人工决策：`pass`、`keep_as_badcase`、`needs_regeneration`。 |
| `adjudication_applied` | 布尔 | 该行是否应用了后续裁决修订。`False` 表示最终快照中未记录该行发生裁决变更。 |

## 诊断字段边界

- `0 / 1 / 2` 是事件级诊断，不等同于 OVL 或 REL。
- `NA` 应按字段上下文理解为“不适用”或“未评”，不能擅自当作 0。
- `primary_badcase` 是最终主要问题分类；它与某个诊断子项可能存在缺失或不完全对齐，需作为数据 QA 事项单独审查，不能静默改写 canonical 值。

## 最终决策边界

`pass`、`keep_as_badcase` 与 `needs_regeneration` 的文字说明，是对本次 adjudicated 数据的事后归纳，不是预注册阈值或自动分类规则。最终语义判断仍以人工复听与正式快照为准。

## 示例表边界

`T2A_Example_Rows_10.csv` 仅用于展示字段结构和代表性记录：

- 精确抽取 10 条正式样本，不包含隐藏重复；
- 不包含本地路径、私人试听备注或完整原始表；
- 不应据此重新计算项目总体结果；
- 如与其他摘要冲突，应以正式 adjudicated CSV 为准。


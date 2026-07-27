# B0092 最终决策记录

记录类型：最终决策记录  
数据来源：`data/ratings_final_200_adjudicated.csv`

> 该行 `adjudication_applied=False`，因此本文件不将 B0092 表述为“裁决变更”。

## 1. 样本标识

| 字段 | 值 |
|---|---|
| Blind ID | B0092 |
| Sample ID | NAT_006_S0042 |
| Prompt ID | NAT_006 |
| 类别 | natural_environment / 自然环境 |
| Seed | 42 |

正式英文 Prompt：

> Wind blowing through a bamboo forest, leaves rustling and stalks creaking as they sway

中文仅作辅助理解：风吹过竹林，竹叶沙沙作响，竹竿随风摇曳发出吱嘎声。

## 2. 正式记录

| 字段 | 值 |
|---|---|
| OVL | 1 |
| REL | 1 |
| `tech_pass` | 否 |
| `artifact_severity` | 2 |
| `primary_event` | 0 |
| `secondary_event` | NA |
| `attribute_match` | 0 |
| `temporal_match` | NA |
| `count_match` | NA |
| `primary_badcase` | `wrong_source` |
| `human_decision` | `needs_regeneration` |
| `adjudication_applied` | False |

## 3. 决策理由

人工复听未能确认 Prompt 要求的竹林风声、叶片沙沙声与竹竿吱嘎等目标声源特征，输出主要表现为难以辨认的杂音。该观察与 `primary_event=0`、`attribute_match=0`、`REL=1`、`tech_pass=否` 及 `artifact_severity=2` 相互印证，因此最终保留 `needs_regeneration` 决策。

## 4. 回溯方式

- 通过 `blind_id=B0092` 与 `sample_id=NAT_006_S0042` 精确定位正式记录。
- 本记录引用 adjudicated 快照中的最终字段，不修改原始评分表或正式 CSV。
- 结论仅描述可听见的输出表现，不推断模型内部原因。

## 5. 规则边界

`needs_regeneration` 的文字解释是对本次 adjudicated 决策的事后归纳，不是预注册阈值，也不表示任意一个单项分数都能自动触发相同决定。


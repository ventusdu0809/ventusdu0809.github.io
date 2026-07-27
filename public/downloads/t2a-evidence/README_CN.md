# T2A 评测公开证据包

本目录提供 T2A（Text-to-Audio）音效生成评测 PoC 的轻量公开证据，用于说明评分规则、听评流程、字段结构、最终决策记录与研发反馈格式。

## 数据口径

- 正式统计唯一依据：`data/ratings_final_200_adjudicated.csv`
- 正式样本：40 条原创英文 Prompt × 5 个固定 seed，共 200 条
- 20 条隐藏重复仅用于同一评测人的复测稳定性检查，不进入正式 200 条统计
- 本目录中的 CSV 是从正式 adjudicated 快照抽取或聚合的公开示例，不是新的统计源
- 未公开原始音频、私人路径、工作备注或完整评分表

## 文件说明

1. `T2A_Evaluation_Method_and_Evidence_CN_v1.0.pdf`  
   12 页方法与证据报告，覆盖评测目标、能力矩阵、Listening Protocol、Rubric、五层诊断、结果、Badcase、研发反馈与边界。

2. `T2A_Evaluation_Evidence_Workbook_CN_v1.0.xlsx`  
   可审计工作簿，包含 Overview、Coverage、Rubric_Protocol、Prompt_REL、Badcase_Retest 与 Examples 六个工作表。

3. `T2A_Rubric_and_Listening_Protocol_CN_v1.0.md`  
   OVL / REL 评分锚点、实际听评条件、盲听顺序与复测口径。

4. `T2A_Data_Dictionary_CN_v1.0.md`  
   公开示例表中的字段、编码与使用边界。

5. `T2A_Example_Rows_10.csv`  
   从 200 条正式样本中精确抽取的 10 行字段示例；覆盖 7 个音效类别及多种最终决策。

6. `T2A_Final_Decision_Record_B0092_CN_v1.0.md`  
   B0092 的最终决策记录。该行 `adjudication_applied=False`，因此不是“裁决变更”案例。

7. `T2A_RnD_Feedback_WPN004_CN_v1.0.md`  
   将 WPN_004 的可观察问题整理为可复查的研发反馈与回归测试建议。

8. `T2A_Badcase_Counts_200.csv`  
   200 条正式样本的 `primary_badcase` 分类计数与占比。

9. `SHA256SUMS.txt`  
   本目录公开文件的 SHA-256 校验清单。

## 使用边界

- 人工 OVL、REL 与事件级诊断是最终感知与语义判断依据。
- 客观指标和自动化脚本用于风险定位、整理、复现与 QA，不替代人工语义裁决。
- 决策边界是对本次 adjudicated 数据的事后归纳，不是预注册阈值，也不是自动判分规则。
- 文档仅描述可观察输出与记录字段，不推断模型内部原因。

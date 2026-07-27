# T2A PoC v1.2 — 最终统计报告（审核封版）

> 生成时间：2026-07-22 16:31
> 样本：200 条（40 Prompt × 5 seed, U=1 & non-duplicate）
> 模型：Stable Audio Open 1.0 / 10s / 100 steps
> 审核闭环：review_adjudication_template.csv 26 条裁决，12 条影响正式统计

---

## 一、全局 OVL/REL

| 指标 | OVL | REL |
|:---|---:|---:|
| 均值 | 4.25 | 3.46 |
| 中位数 | 5.0 | 3.0 |
| 标准差 | 0.93 | 1.05 |
| 范围 | 1–5 | 1–5 |

### OVL 分布

| 5 | 4 | 3 | 2 | 1 |
|---:|---:|---:|---:|---:|
| 102 (51.0%) | 56 | 35 | 3 | 4 |

### REL 分布

| 5 | 4 | 3 | 2 | 1 |
|---:|---:|---:|---:|---:|
| 42 (21.0%) | 38 | 103 | 4 | 13 |

---

## 二、相关性

- Spearman ρ = 0.372 (p = 0.0000)
- Bootstrap 95% CI: [0.243, 0.486] (n=10000, seed=42)

---

## 三、人工决策

| 决策 | 数量 | 占比 |
|:---|---:|---:|
| pass | 48 | 24.0% |
| keep_as_badcase | 138 | 69.0% |
| needs_regeneration | 14 | 7.0% |
| 技术通过 | 193 | 96.5% |

---

## 四、裁决变更记录

- RV001: WPN_002_S0123 [B0207] OVL=5 → OVL=3 (rater_inconsistency)
- RV002: ANI_002_S0042 [B0013] decision=pass → decision=pass (boundary_case)
- RV003: FLY_005_S1024 [B0050] decision=needs_regeneration → decision=keep_as_badcase (boundary_case)
- RV004: MEC_001_S0042 [B0045] decision=keep_as_badcase → decision=pass (boundary_case)
- RV005: NAT_001_S0123 [B0212] decision=keep_as_badcase → decision=needs_regeneration (boundary_case)
- RV006: DLY_002_S0042 [B0029] temporal_match=1 → temporal_match=NA (revert_to_NA)
- RV007: FLY_004_S0042 [B0062] count_match=0 → count_match=NA (revert_to_NA)
- RV008: FLY_004_S0123 [B0016] count_match=0 → count_match=NA (revert_to_NA)
- RV009: FLY_004_S0456 [B0021] count_match=0 → count_match=NA (revert_to_NA)
- RV010: FLY_004_S0789 [B0017] count_match=0 → count_match=NA (revert_to_NA)
- RV011: MEC_004_S0456 [B0133] secondary_event=1 → secondary_event=NA (revert_to_NA)
- RV012: WPN_002_S0456 [B0049] count_match=0 → count_match=NA (revert_to_NA)

## 五、分类统计

| 类别 | N | OVL 均值 | REL 均值 |
|:---|---:|---:|---:|
| 动作拟音 | 30 | 4.43 | 3.23 |
| 动物 | 25 | 4.36 | 3.48 |
| 日常生活 | 30 | 4.33 | 3.47 |
| 机械科技 | 30 | 4.50 | 3.93 |
| 武器战斗 | 30 | 4.30 | 2.93 |
| 自然环境 | 30 | 3.27 | 3.27 |
| 魔法幻想 | 25 | 4.60 | 4.00 |

---

## 六、可复现性

| 参数 | 值 |
|:---|---|
| Bootstrap seed | 42 |
| Bootstrap iterations | 10000 |
| 正式样本筛选 | U=1 AND is_hidden_duplicate=False |
| 裁决来源 | review_adjudication_template.csv |
| 裁决应用方式 | 按 blind_id 精确匹配 |

# Three-Cohort Evidence Synthesis v3.0

## Project Overview

- **2 models** (SAO1, SA3M)
- **3 generation cohorts** (H1: SAO1 PoC v1, C1: SAO1 regenerated v2, C2: SA3M v2)
- **2 evaluation phases** (Phase 1: single-model PoC, Phase 2: controlled comparison)
- **600 formal samples** (cumulative across two phases)
- **660 listening events** (cumulative, including hidden repeats)

> ⚠️ 600 formal samples and 660 listening events are two-phase cumulative totals,
> NOT a single unified three-arm experiment.

## Evidence Structure

```
SAO1 PoC v1 (H1)
    ┄┄┄ Historical bridge ┄┄┄>
SAO1 regenerated v2 (C1)
    ─── Controlled comparison ───>
SA3M v2 (C2)
```

- Dashed line: non-equivalent historical descriptive comparison
- Solid line: controlled model comparison (main result)
- No inference arrow from H1 to C2

## Three Core Conclusions

### 1. Method Evolution
Phase 1 established the evaluation framework (test set, OVL/REL, five-layer diagnosis,
badcase taxonomy, blind review, hidden repeats, adjudication).
Phase 2 extended the same framework to controlled dual-model comparison.

### 2. Baseline Portability
SAO1 scores changed substantially between Phase 1 (OVL=4.25) and
Phase 2 (OVL=3.78), confirming that historical single-model results
cannot be unconditionally reused as controlled baselines. Prompt-level Spearman
correlation was OVL ρ=0.970, REL ρ=0.982.

### 3. Current Model Comparison
All formal model conclusions reference Phase 2 only (C1 vs C2).
ΔOVL 95% CI = [-0.3950, 0.1150]
ΔREL 95% CI = [-0.2950, 0.1800]
Both intervals cross zero. See v2.0.3 report for full details.

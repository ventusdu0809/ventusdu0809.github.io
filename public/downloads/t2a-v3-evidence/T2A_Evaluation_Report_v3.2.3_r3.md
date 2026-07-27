# T2A Evaluation Program v3.2.3 r2 — Audit Report r3

`r3` changes audit evidence and reproducibility only. The research version
and all human judgments remain frozen at v3.2.3 r2.

## Controlled Phase 2 results

- SA3M: OVL 3.640, REL 3.305
- SAO1: OVL 3.780, REL 3.355
- Paired prompt-level difference (SA3M − SAO1): OVL −0.140, REL −0.050
- 95% prompt-cluster Bootstrap CI: OVL [−0.395, +0.115], REL [−0.295, +0.180]

The Bootstrap resamples the 40 prompts as paired clusters. It uses 10,000
iterations, seed 42, Python `random.Random` (MT19937), and sorted
order-statistic indices 250 and 9749 after zero-based sorting.

In the current 40-prompt test set, no clear overall advantage direction was
observed. A confidence interval crossing zero does not prove equivalence or
the absence of a difference.

## Prompt-conditioned sample-level label rates

These analyses are retrospective and were not pre-registered. Rates are
sample-level label occurrences within applicable-prompt subsets derived from
41 human-reviewed requirement rows across 40 prompts.

| Condition | SA3M | SAO1 | outputs/model | prompts | evidence |
|:---|---:|---:|---:|---:|:---|
| wrong_source | 29/200 (14.5%) | 13/200 (6.5%) | 200 | 40 | controlled_descriptive |
| wrong_count_explicit | 17/40 (42.5%) | 24/40 (60.0%) | 40 | 8 | retrospective_conditional |
| wrong_count_implicit | 13/80 (16.25%) | 19/80 (23.75%) | 80 | 16 | retrospective_conditional |
| missing_secondary_event | 30/80 (37.5%) | 27/80 (33.75%) | 80 | 16 | retrospective_conditional |
| missing_sonic_component | 0/25 (0.0%) | 1/25 (4.0%) | 25 | 5 | exploratory_small_n |
| wrong_attribute | 37/200 (18.5%) | 25/200 (12.5%) | 200 | 40 | retrospective_conditional |
| wrong_temporal_order | 3/80 (3.75%) | 2/80 (2.5%) | 80 | 16 | exploratory_provisional |

## Single-rater hidden-repeat consistency

Forty audit-safe hidden-repeat pairs were verified by matching full audio
SHA256 values. They measure intra-rater consistency only, not inter-rater
reliability.

All 40 pairs:

- OVL exact: 22/40 (55.0%)
- OVL within one point: 38/40 (95.0%)
- REL exact: 25/40 (62.5%)
- REL within one point: 39/40 (97.5%)
- Decision exact: 34/40 (85.0%)
- Primary Badcase exact: 27/40 (67.5%)

Sensitivity analysis using the actual canonical presentation gap and
excluding six pairs with a gap below 30 presentations:

- n=34
- OVL exact: 17/34 (50.0%)
- OVL within one point: 32/34 (94.1%)
- REL exact: 20/34 (58.8%)
- REL within one point: 33/34 (97.1%)
- Decision exact: 29/34 (85.3%)
- Primary Badcase exact: 23/34 (67.6%)

Hidden-repeat presentations were distributed across Sessions S01–S10;
10/40 occurred in S10. Four pairs were within the same session and 36 were
cross-session, so the small same-session subset does not support a stable
same-versus-cross comparison. Based on actual temporal order, later OVL was
lower in 12/40 pairs, higher in 6/40, unchanged in 22/40, with a mean
later-minus-earlier difference of −0.150. This descriptive tendency is
confounded with presentation order and session and is not attributed to
fatigue or rater drift.

## Historical bridge and limitations

Phase 1 and Phase 2 SAO1 prompt rows were joined by `prompt_id`: OVL
Spearman 0.5286 and MAD 0.585; REL Spearman 0.7565 and MAD 0.365. This is a
non-equivalent historical bridge, not a unified three-arm experiment.

Only DLY_003 has separately decomposed primary and secondary requirement
rows. Temporal applicability for other prompts remains retrospective. The
results are specific to one rater, the current model versions, and this test
set. Objective metrics do not replace human semantic judgment.

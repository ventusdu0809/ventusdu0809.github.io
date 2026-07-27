# Audit Revision Notes — r3

The research version remains T2A Evaluation Program v3.2.3 r2.

- No human rating was changed.
- No OVL, REL, primary Badcase, multilabel diagnostic, or adjudication
  decision was changed.
- No global or conditional Badcase result, Wilcoxon result, historical
  bridge result, prompt, or event-requirement row was changed.
- Added audit-safe hidden-repeat pairing evidence using full source-audio
  SHA256 values; the private blind map is not included.
- Added repeat-consistency recomputation.
- Restored the original reproducible prompt-level Bootstrap implementation
  instead of hardcoded intervals.
- Parameterized build paths and added deletion guards and dry-run mode.
- Added README and every other non-manifest file to manifest coverage.
- Standardized model means to three decimal places.

## Correction of historical repeat-session metadata

Earlier v3.1 derivative scripts did not use actual canonical presentation
order. They separated the 400 formal and 40 duplicate IDs, placed the latter
after all formal rows, and labeled the result a rough estimate. This produced
the unsupported statements that all repeats occurred in Session 10, all pairs
were cross-session, and 37 pairs had a gap of at least 30.

Audit r3 derives presentation order, session, and gap directly from the
canonical 440-row table. The verified values are four same-session pairs,
36 cross-session pairs, and 34 pairs with an absolute presentation gap of at
least 30. The all-pair consistency results are unchanged. This correction
changes no rating or research conclusion.

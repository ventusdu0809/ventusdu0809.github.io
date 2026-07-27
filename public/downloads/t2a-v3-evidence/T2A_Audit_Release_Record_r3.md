# T2A Evaluation Program — Audit Release Record

## Release status

- Research version: `v3.2.3 r2`
- Audit packaging revision: `r3`
- Independent Codex review: `APPROVED`
- Validator: `ALL CHECKS PASSED · exit 0`
- Audit ZIP SHA256: `762CC26F1CFBC516141DD48D08F1D25209EB6678034B81F16C32CB4570B75171`

`r3` 只修订审计证据、复现实现与安全边界。研究版本仍为 `v3.2.3 r2`，没有修改任何人工 OVL、REL、诊断标签、Primary Badcase 或裁决结果。

## r3 补充内容

- 增加 40 行脱敏隐藏重复配对表，并以完整音频 SHA256 核验来源一致性；
- 增加可独立执行的复测一致性复算；
- 恢复原始 10,000 次 Prompt-level paired Bootstrap：seed 42、Python `random.Random` / MT19937；
- 将构建路径参数化并加入删除保护与 dry-run；
- 扩展验证器，覆盖 Manifest、冻结哈希、模型均值、Bootstrap、Badcase、历史桥接、复测一致性与安全检查；
- 按真实 440 行呈现顺序与 Session 元数据修正早期衍生的复测 Session / gap 描述。

## 审计边界

- Phase 2 才是正式受控模型比较；Phase 1 与 Phase 2 只作非等价历史桥接。
- 隐藏重复衡量单一评测人的 intra-rater consistency，不代表多人评测一致性。
- 条件分析是事后的 Prompt-conditioned sample-level label rates，不是预注册逐事件错误率。
- 41 条 requirement rows 对应 40 条 Prompt，并非 41 个完整分解事件。
- 置信区间跨越 0 不构成模型等价性证明。
- Codex 审查用于核对代码、数据与证据链的一致性，不代表 AI 证明研究结论绝对正确。

## Public-safe package

公开 ZIP 不包含私人 blind map、隐藏重复的模型 / Prompt / seed 身份、API 或 Hugging Face token、个人用户路径和原始 WAV。

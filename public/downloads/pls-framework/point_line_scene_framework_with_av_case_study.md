# Point–Line–Scene：面向生成式音频与音视频模型的分层感知评测框架

## 从概念抽象到 Audio-Visual Generation Evaluation 案例研究

**English title:** *Point–Line–Scene: A Hierarchical Perceptual Evaluation Framework for Generative Audio and Audio-Visual Models*  
**English subtitle:** *From Conceptual Abstraction to an Audio-Visual Generation Evaluation Case Study*  
**Document type:** Conceptual Framework + Case Study  
**Status:** Research draft v2.x  
**Project evidence baseline:** Cross-Round Analysis v1.0 Final / Frozen

> **定位声明。** Point–Line–Scene（PLS）不是现有论文已经定义的行业标准，而是作者对当前细粒度生成式音频与音视频评测方向所作的方法论抽象。本文引用的 Audio-Visual Generation Evaluation 属于小样本案例级实证（case-based empirical evidence）：它展示 PLS 如何用于失败定位（Failure Localization）、受控回归（Controlled Regression）与研发优先级制定（Engineering Prioritization），但不构成对 PLS 普遍有效性的统计验证。

---

## 0. Source Audit 与证据分层

### 0.1 仓库审计结论

写作前已检查以下目录与文件：

- `freeze/AV-Gen-Eval-v1.0-round1-demo/`
- `freeze/AV-Gen-Eval-Round2-Controlled-Regression-v0.1-run01-frozen/`
- `freeze/AV-Gen-Eval-Cross-Round-Analysis-v1.0/`
- `freeze/ERRATUM-Round2-run01-frozen.md`
- `analysis/`
- `SPEC-v1.0.md`

仓库中没有独立的旧版 Point–Line–Scene 理论 Markdown；已有内容是评测规范、Round-1 / Round-2 报告和 Cross-Round 分析。因此本文作为新文件创建，不覆盖旧研究记录。所有项目事实以 frozen evidence 为准；工作区 `analysis/` 中的同名跨轮文件只作为便捷副本，不优先于 frozen snapshot。

### 0.2 三类陈述必须分开

| 类型 | 含义 | 本文写法 |
|---|---|---|
| Literature-supported | 论文或正式标准直接支持的研究方向 | “已有研究提出 / 显示……” |
| PLS Conceptual Abstraction | 作者对多个研究方向的上层组织 | “本文将其抽象为……” |
| Project Case Evidence | 本项目冻结样本中的观察、诊断与跨轮推论 | “在本项目中观察到……” |

本文不把案例观察改写成模型机制，也不把方法论抽象伪装成既有学术共识。

---

## 1. 摘要

本文提出 Point–Line–Scene（PLS）分层感知评测框架，用于组织生成式音频与音视频模型的细粒度评测。框架来自三类材料：第一，细粒度 rubric、事件与属性分解、时间关系、结构化声景、混合音频、声学物理约束、偏好优化和自动 Judge 可靠性等文献趋势；第二，作者将这些方向统一抽象为 Point、Line、Scene 三层，并将语义保真、物理 / 感知保真、制作可用性和 Judge 可靠性设为跨层评价轴；第三，Audio-Visual Generation Evaluation 作为案例研究，展示该框架如何进入真实评测工作流。

项目包含 Round-1 的 10 个单次生成样本和 Round-2 的 6 个单次生成样本。Round-1 用于问题发现（Discovery）；Round-2 对部分代表性 Bad Case 进行假设驱动的受控回归；Cross-Round Analysis v1.0 再将结果区分为 Repeated Diagnostic Pattern、Not Replicated、Mixed / Refined 与 Exploratory。该项目是诊断性概念验证（diagnostic PoC），没有多 seed 统计实验、评测者间信度研究、Reward 训练或自动 Audio Judge 验证，不用于统计性泛化。

项目最强的案例证据是 P06、P10 与 R2-H1-B 均呈现 `3→4→4`：Prompt 要求 3 次，实际 Visual Fact 为 4 次，Audio Event 也为 4 次。该链路支持把 Text→Visual 与 Visual→Audio 分开诊断，并促成 PLS v2.x 的项目派生扩展：Reference-aware / Provenance-aware Evaluation。其他案例显示，Line 正确不等于 Quality 良好，Round-1 Bad Case 不等于稳定失败，混杂因素可以在下一轮转化为实验变量。项目对 Point、Line 与 Quality 分离提供较直接的案例证据，对 Scene 的系统验证仍然有限。

---

## 2. 研究背景：为什么 Overall Score 不够

CLAP 通过对比学习建立音频—文本共同表示空间，适合衡量整体语义相关性，但它本身不是为逐条核查复杂指令中的事件、属性或关系而设计的。[CLAP, 2023](https://arxiv.org/abs/2206.04769) Fréchet Audio Distance（FAD）衡量音频分布在嵌入空间中的距离，最初用于音乐增强算法的整体分布质量比较，也不提供单个样本的失败位置。[FAD, 2018](https://arxiv.org/abs/1812.08466) Mean Opinion Score（MOS）及类似 OVL 主观分数可以表达总体感知质量，但一个平均分仍可能掩盖内容正确性、关系错误和质量问题之间的差别；MOS 的具体含义也必须随测试类型和条件说明。[ITU-T P.800.1](https://www.itu.int/itu-t/recommendations/rec.aspx?lang=en&rec=12972)

近年的研究正在从整体相似度走向可验证的细粒度要求：

```text
Complex Instruction
        ↓
Atomic Requirement
        ↓
Event / Attribute
        ↓
Relation
        ↓
Scene / Soundscape
        ↓
Preference / Reward
```

AudioScape-TTA 将真实声景表示为结构化语义，并用 event density 与 structural complexity 区分生成复杂度，再以 event realization、acoustic attributes 和 speech content 构造细粒度 rubric。[AudioScape-TTA, 2026](https://arxiv.org/abs/2608.04479) AnyAudio-Judge 将复杂指令动态拆成独立、可验证的二元 rubric，而不是直接交给 Judge 做单一整体判断。[AnyAudio-Judge, 2026](https://arxiv.org/abs/2606.03116) Fine-Grained Feedback 工作进一步把事件存在与时间顺序显式分开，并以 S3Bench 测试多事件叙事中的时间进程。[Kuan et al., 2026](https://arxiv.org/abs/2607.13408)

PLS 的目标不是否定整体指标，而是为整体指标补上“错在哪里、与谁比较、下一步怎样验证”的诊断接口。

---

## 3. Point–Line–Scene 核心框架

### 3.1 Point — 原子正确性（Atomic Correctness）

Point 回答：

> 单个可观察元素本身是否正确？

典型维度包括：

- Event Presence
- Source Identity
- Material
- Attribute
- Count
- Timbre
- Texture
- Pitch
- Speech Content

Point 不等于“只确认有没有声音”。一个事件存在，不代表其声源、材质、数量、音高或纹理正确。

### 3.2 Line — 关系正确性（Relational Correctness）

Line 回答：

> 元素之间的关系是否正确？

典型维度包括：

- Temporal：起点、顺序、持续、重叠
- Spatial：方向、距离、空间对应
- Causal：可见原因与声音结果是否匹配
- Interactive：多个事件或主体之间的交互
- Dynamic：声音是否连续、细粒度地响应状态与运动变化

### 3.3 Scene — 整体场景一致性（Holistic Coherence）

Scene 回答：

> 多个元素共同形成的声音 / 音视频世界是否成立？

典型维度包括：

- Environment Match
- Spatial Plausibility
- Foreground / Background Organization
- Attention / Salience
- Scene Continuity
- Diegetic Consistency
- Structural Coherence

Scene 不等于 Event Count。两个声景可以包含相同数量的事件，却在空间组织、前后景、叙事显著性和世界内一致性上完全不同。

### 3.4 跨层评价轴（Cross-cutting Axes）

PLS 不是一条不断追加层级的直线。以下维度横跨 Point、Line 与 Scene：

1. **Semantic Fidelity**：是否满足指令与可观察语义。
2. **Physical / Perceptual Fidelity**：声音是否符合材料、运动、传播环境和感知规律。
3. **Production Utility**：结果是否适合编辑、拆分和实际制作。
4. **Judge Reliability**：人工或自动评测者是否稳定、可校验、不过度依赖元数据。

Quality / OVL 作为独立结果轴，用于回答“最终听觉质量如何”，不能由 PLS 能力分数替代。

---

## 4. 文献如何支撑 Point

AudioScape-TTA 的 rubric 设计直接区分事件实现、声学属性和语音内容，并强调结构化声景中的细粒度核查。[AudioScape-TTA, 2026](https://arxiv.org/abs/2608.04479) AnyAudio-Judge 则将复杂 caption 拆成数量可变的独立二元项目，要求每一项可以单独验证。[AnyAudio-Judge, 2026](https://arxiv.org/abs/2606.03116)

由此可以提炼 Point rubric 的四项设计原则：

- **Atomic**：一次只检查一个要求。
- **Audible / Observable**：目标必须能从当前证据中听到或看到。
- **Verifiable**：必须存在清楚的判定条件。
- **Independent**：事件存在与属性正确不应混成同一项。

文献支持的是细粒度分解与可验证 rubric；“Point”这个上层命名及其与 Line、Scene 的统一关系是 PLS 的概念抽象。

---

## 5. 文献如何支撑 Line

Fine-Grained Feedback 明确分开 sound event existence 与 temporal ordering，并指出全局相似度难以捕捉事件缺失和顺序反转。[Kuan et al., 2026](https://arxiv.org/abs/2607.13408) AudioTime 提供包含 timestamp、duration、frequency 与 ordering 的强时间对齐音频—文本数据，说明时间控制需要专门的数据和指标。[AudioTime, 2024](https://arxiv.org/abs/2407.02857) MMAG 在混合音频场景中同时评估 sound events、temporal relationships、semantic alignment 与 acoustic fidelity，进一步说明关系评价不能被单一语义分数替代。[MMAG, 2026](https://arxiv.org/abs/2608.06900)

在音视频方向，AV-SyncBench 将 temporal synchronization 与 semantic correspondence 解耦评测。[AV-SyncBench, 2026](https://arxiv.org/abs/2607.00726) SAVGBench 则专门关注空间音频与画面声源的空间对齐。[SAVGBench, 2024](https://arxiv.org/abs/2412.13462)

本文因此把 Line 定义为：

> **Temporal + Spatial + Causal + Interactive + Dynamic Relationships**

Dynamic Correspondence 属于 Line，因为它关心视觉状态 / 运动变化与声音状态变化之间的关系，而不是单个声音元素的存在性。

---

## 6. 文献如何支撑 Scene

AudioScape-TTA 用 structured soundscape 组织复杂音频，并区分 event density 与 structural complexity；增加事件数量并不会自动形成更复杂、更可信的声景结构。[AudioScape-TTA, 2026](https://arxiv.org/abs/2608.04479) MMAG 将 speech、music 与 sound effects 置于统一 mixed-audio 场景，评估它们之间的语义与时间控制关系。[MMAG, 2026](https://arxiv.org/abs/2608.06900) LongAV-Compass 在长时音视频生成中进一步关注跨片段一致性、全局叙事连贯性与音视频对齐随时间的退化。[LongAV-Compass, 2026](https://arxiv.org/abs/2605.26244)

这些研究支持把 Scene 理解为“多个元素如何共同构成一个连贯世界”，而不是把它简化为更多事件或更高密度。

---

## 7. Audio-Visual Generation Evaluation：从概念框架到案例研究

### 7.1 Round-1：Problem Discovery

Round-1 包含 10 个单次生成样本，使用 Point → Line → Scene + Quality 记录：

- Point Failure
- Line Failure
- Scene Failure
- Quality Failure
- Visual Prompt-Following Failure

它的目的不是从 10 个样本估计模型总体错误率，而是发现可以被清楚描述和后续验证的失败现象。

### 7.2 Round-2：Hypothesis-driven Controlled Regression

Round-2 包含 6 个单次生成样本。针对 Round-1 代表性 Bad Case，它在生成与评分前：

1. 提出假设；
2. 冻结关键 Visual Facts 与观察字段；
3. 设计可判定条件或 A/B 条件；
4. 按预定规则检查同类问题能否再次出现。

因此 Controlled Regression 不等于“再写几个 Prompt 看结果”，也不要求每个案例都构成传统统计意义上的严格单变量实验。H4 是其中最接近配对控制的设计：Round-1 的意外 cut 是 confound，Round-2 将其转化为 Planned-cut Condition，并配置 No-cut Control。

### 7.3 Cross-Round：诊断状态而非模型排名

Cross-Round Analysis v1.0 不合并两轮总分，而使用：

- Repeated Diagnostic Pattern
- Not Replicated
- Mixed / Refined
- Exploratory
- UNEVALUABLE

这些是证据状态，不是统计显著性标签。

---

## 8. Exact-count：为什么 Point 不能只看 Prompt→Audio

三个进入正式 Exact-count Evidence Set 的案例是：

```text
Round-1 P06      3 → 4 → 4
Round-1 P10      3 → 4 → 4
Round-2 R2-H1-B  3 → 4 → 4
```

即：

```text
N_prompt = 3
N_visual = 4
N_audio  = 4
```

所以：

```text
Text→Visual = FAIL
Visual→Audio = PASS
```

R2-H1-B 的 P4 Event Counting 可以为 5，因为 P4 判断的是 Audio 是否跟随实际 Visual Events，而不是 Audio 是否直接满足原 Prompt 的数量要求。H1-A 因 `N_visual=unclear` 保持 UNEVALUABLE，不进入有效 Exact-count 证据集；冻结记录中的 legacy `audio_count_over` 按 ERRATUM 排除。

跨轮冻结结论是 **Repeated Diagnostic Pattern**，不是 Systematic Failure。三个案例支持定位当前错误链路，但不支持统计性泛化。

这个案例说明 PLS 的价值不只是拆解“声音有没有生成”，还要明确判断对象和错误来源。这里描述的是 evaluation chain，不是模型内部 architecture 或 generation pipeline；本文不推断模型内部一定先生成视频再生成音频。

---

## 9. 项目派生扩展：Reference-aware / Provenance-aware Point Diagnosis

传统 T2A Point 常被写成：

```text
Prompt → Audio
```

音视频生成中的可观察评测链更适合写成：

```text
Prompt → Visual Fact → Audio Event
```

因此 Point 至少包含两个不同问题：

### 9.1 Instruction Fidelity

Text→Visual 是否满足文本指令？

### 9.2 Cross-modal Correspondence

Visual→Audio 是否与实际画面事实一致？

本文将这一原则称为 **Reference-aware / Provenance-aware Point Diagnosis**。它是项目派生的方法论扩展，不是现有行业标准。它要求先明确“评价对象与参考对象”，再进入 Point / Line / Scene 判断，从而避免把 `Prompt ≠ Audio` 自动解释成 Audio Failure。

---

## 10. Line 案例一：Onset Alignment

Round-1 P06 的 L1=3，并记录 `audio_early`：Audio Event Onset 早于对应 Visual Contact。Round-2 H2 中：

- `E1_audio_water_onset = aligned`
- `E2_audio_impact_onset = aligned`
- `audio_event_order = water_then_impact`
- L1=5

Cross-Round 状态为 **Not Replicated**。这不是“同步能力已被证明稳定”，而是说明 P06 的 onset Bad Case 在当前受控样本中没有再次出现。

该案例展示 Line 层的两种用途：先定位 Temporal Error，再通过 Controlled Regression 判断它是否值得提升为稳定研究假设。

> **Bad Case Discovery ≠ Stable Failure**

---

## 11. Line 案例二：Dynamic Correspondence

Round-1 P01 的冻结证据为 L4=4、`static_audio_motion`：视觉状态明确变化，但声音没有形成可感知的动态响应。

Round-2 H3 中，Door 为 `Closed → Opening → Open`，Vacuum State 保持连续，且画面中存在持续来回运动。冻结证据同时记录：

- `audio_state_closed / door_transition / open = clearly_different`
- `audio_motion_response = clear`
- L4=3
- `static_audio_motion`

Cross-Round 状态为 **Mixed / Refined**：

- Boundary Response：粗粒度“完全不响应”未复现；
- Source-motion Response：仍存在局部问题，声音变化更接近阶跃式增强，没有充分连续跟随可见运动。

因此 Dynamic Line 不应只问“声音变没变”，还应问：

> 声音是否连续、细粒度地跟随视觉状态和运动变化？

这与 Physical / Perceptual Fidelity 有关，但当前项目没有系统验证声学物理模型，只提供与动态声学一致性相关的案例证据。

---

## 12. Line / Scene Continuity 案例：从 Confound 到 Independent Variable

Round-1 P10 的 L3=3、`audio_duration_short`：视觉声源仍运行，Audio State 提前终止；样本同时出现非预期 cut，因此 cut 是 confound。

Round-2 H4 设置：

- H4-A：No Cut，`audio_state_after_on = continuous_to_end`
- H4-B：Planned Cut，`audio_state_post_cut = continuous`
- 两者 L3=5、L4=5

Cross-Round 状态为 **Not Replicated**。它不说明模型“跨镜头能力很好”，也不支持跨模型泛化；它说明在这一对条件中，Round-1 的持续声音中断没有复现，当前证据不支持“cut 必然导致 Audio State Loss”。

方法学意义在于：

```text
Round-1 Confound
        ↓
Round-2 Independent Variable + Control
```

PLS Diagnosis 因此可以进入：

> Evaluation → Hypothesis → Controlled Regression

---

## 13. 为什么 Quality 必须独立于 PLS

两轮冻结证据中存在多组“关系正确但质量较低”的样本：

| Scenario | PLS / Relation evidence | OVL | Frozen Quality evidence |
|---|---|---:|---|
| P01 | L4=4 | 4 | `loudness_imbalance` |
| P06 | P4=5 | 4 | `timbral_instability` |
| R2-H1-B | P4=5，Visual→Audio Count PASS | 3 | `timbral_instability` |
| R2-H2 | L1=5，E1/E2 aligned | 3 | `loudness_imbalance` |
| R2-H4-A | L3=5，L4=5 | 3 | `artifact_noise` |

由此可见：

> **Relation Correctness 与 Perceptual Quality 是不同坐标轴。**

Point / Line / Scene 回答“哪里出了问题”；Quality / OVL 回答“最终听觉质量如何”。它们不能混成同一个 Score。Cross-Round 对 Audio Quality 的冻结状态是 **Persistent / Exploratory Concern**：正式 Quality Bad Case 跨两轮存在；背景音乐等信号仍属 exploratory，未进入正式 taxonomy frequency。

这是 project-supported design decision，仍然只是案例级证据。MMAG 对 acoustic fidelity、semantic alignment 与 temporal accuracy 的分维度处理，以及 Fine-Grained Feedback 同时报告 OVL / REL 与指令级指标，也提供相关文献背景。[MMAG, 2026](https://arxiv.org/abs/2608.06900) [Kuan et al., 2026](https://arxiv.org/abs/2607.13408)

---

## 14. Scene 层：有案例，但系统验证仍然有限

Round-1 中存在 Scene 相关冻结案例：

- **P05**：S4=3，`offscreen_event_missing`；同时 S2=4，`wrong_distance_cue`。它展示了画外事件是否属于当前世界、距离线索是否合理等 Scene 问题。
- **P08**：S2=4，`wrong_distance_cue` 与 `foreground_background_error`；S3=4。它展示了地下停车场中近处汽车与远处排风机的空间 / 前后景组织问题。

但这些只是少量 Round-1 单次生成案例。Round-2 主要针对 Exact-count、Onset、Dynamic 与 Cross-shot 回归，并没有系统扩展 Environment Match、Spatial Plausibility、Attention / Salience 与 Diegetic Consistency 的 Scene 验证。

因此当前结论是：

> 本项目目前对 Point、Line 与 Quality 分离提供了较直接的案例证据，而对 Scene 层的系统验证仍然较弱，需要在后续更复杂的多事件、空间与长时场景中继续补充。

---

## 15. PLS 在项目中如何实际运行

```text
Capability
    ↓
Scenario
    ↓
Visual Facts
    ↓
Point
    ↓
Line
    ↓
Scene
    ↓
Quality
    ↓
Bad Case
    ↓
Evidence Note
    ↓
Hypothesis
    ↓
Controlled Regression
    ↓
Cross-Round Diagnosis
    ↓
Engineering Priority
```

PLS 在项目中不是纯理论分类，而是一套从观察到诊断、再到回归测试与优先级调整的工作接口：

- Exact-count `3→4→4`：优先检查 Text→Visual 数量约束与 Visual Event Planning，而不是直接标记 Audio Counting Failure。
- Onset Not Replicated：保留监测，暂不升级为最高优先级稳定失败。
- Dynamic Mixed / Refined：从“是否变化”转向连续、细粒度运动响应。
- Cross-shot Not Replicated：暂不把 cut 作为稳定中断原因。
- Audio Quality Persistent / Exploratory Concern：始终保留独立 Quality Gate。

---

## 16. Physical / Perceptual Fidelity 是跨层约束

Physics 不应被写成 `Point → Line → Scene → Physics` 的第四层。AcoustiTrace 围绕声音生成、传播环境和声学接收组织可测物理过程，说明物理真实性跨越多个诊断对象。[AcoustiTrace, 2026](https://arxiv.org/abs/2608.02035)

在 PLS 中可以分别表现为：

- Point：Material / Source correctness
- Line：Dynamic Correspondence、Occlusion / Boundary Response
- Scene：Environment / Spatial Plausibility

本项目只案例性测试了其中一部分：H1-B 暴露材质 / 音色问题，H3 涉及 Boundary 与 Source-motion Response，H4-B 的距离变化对应响度增强，P05 / P08 涉及距离与前后景线索。它们不足以构成系统的 acoustic physics validation。

---

## 17. Production Utility：Future Work

当前 Audio-Visual Generation Evaluation 没有正式建立 Production Utility Rubric，因此不能把项目写成对制作可用性的验证。

未来可以评价：

- editability
- transient integrity
- tail completeness
- stem usability
- foreground extraction
- production readiness

这些方向与声音设计实践有关，但在本文的项目证据表中保持 **Not Tested / Future Work**。

---

## 18. Preference / Reward：Future Work

AnyAudio-Judge 和 Fine-Grained Feedback 均展示了细粒度判断如何转化为 reward 或 preference optimization 的可能路径。[AnyAudio-Judge, 2026](https://arxiv.org/abs/2606.03116) [Kuan et al., 2026](https://arxiv.org/abs/2607.13408)

但当前 AV 项目没有建立：

- preference pair dataset
- DPO
- Reward Model
- preference optimization

所以当前项目完成的是：

> **Evaluation → Diagnosis → Regression**

而不是：

> Preference → Reward → Alignment

后者仍属于下一阶段理论研究方向。

---

## 19. Judge Reliability：Future Work

自动 Judge 在细粒度音频评测中需要验证是否真正使用音频证据、是否受位置与措辞影响、能否稳定复述同一判断。AudioJudge 的研究发现大型音频模型 Judge 存在 verbosity 与 positional bias，并强调多维 Judge 与稳健性分析的重要性。[AudioJudge, 2026](https://aclanthology.org/2026.eacl-long.168/)

未来可加入：

- Audio Removal Test
- Audio Mismatch Test
- A/B Swap
- Metadata Conflict
- Rephrasing Stability

当前 AV 项目由人工 evaluator 完成，没有正式验证自动 Audio Judge，也没有 inter-rater reliability study。因此 Judge Reliability 在项目证据中为 **Not Tested / Future Work**。

---

## 20. PLS v2.x 结构

```text
                       Semantic Fidelity
                              │
                              │
          ┌───────────────────┼───────────────────┐
          │                   │                   │
        POINT ─────────────→ LINE ─────────────→ SCENE
          │                   │                   │
          └───────────────────┼───────────────────┘
                              │
                 Physical / Perceptual Fidelity
                              │
                       Production Utility
                              │
                        Judge Reliability
```

Audio-Visual 模式还要在进入 PLS 前明确参考链：

```text
Prompt
  ↓
Visual Fact
  ↓
Audio Event
```

这不是第四层，而是 Reference-aware / Provenance-aware Diagnosis 原则。

---

## 21. 更新后的方法论定义

> **Point–Line–Scene（PLS）是一种面向生成式音频与音视频模型的分层感知评测框架。它将复杂生成结果拆解为原子事件及属性正确性（Point）、事件之间的时间、空间、因果、动态和交互关系（Line），以及由多个元素共同构成的整体场景一致性（Scene）。在多模态生成中，PLS 进一步要求明确评价参考对象，区分 Instruction Fidelity 与 Cross-modal Correspondence，从而减少错误归因。Physical / Perceptual Fidelity、Production Utility 与 Judge Reliability 作为跨层评价轴存在，而非继续增加层级。**

> 本文的 Audio-Visual Generation Evaluation 小样本案例展示了该框架在 Failure Localization、Controlled Regression 与 Engineering Prioritization 中的实际使用方式，但不构成对框架普遍有效性的统计验证。

---

## 22. 研究问题与当前状态

### RQ1

**Point → Line → Scene 是否呈现可测量的能力复杂度梯度？**

**Current Status：Not Tested。** 当前项目没有系统控制场景难度，也没有比较 Point Accuracy、Line Accuracy 与 Scene Accuracy 的统计梯度。Round-1 的 capability mean 不能用来回答这一问题。

### RQ2

**PLS 是否比单一整体分数更有利于 Failure Localization？**

**Current Status：Preliminary Case Support。** P4=5 但 Text→Visual FAIL、L1=5 但 OVL=3、L3/L4=5 但 OVL=3，以及 Not Replicated / Mixed 状态，都展示了分层记录比单一分数提供更多诊断信息。但项目没有进行 PLS vs CLAP、PLS vs REL 或 PLS vs holistic-only evaluation 的正式 A/B，因此不能写成“RQ2 已验证”。

### RQ3

**PLS Preference 是否能够成为 Reward Signal？**

**Current Status：Not Tested / Future Work。** 当前项目没有 preference pair、DPO 或 Reward Model。

### RQ4

**在 Audio-Visual Generation 中，将 Text→Visual 与 Visual→Audio 分离，是否能够降低错误归因？**

**Current Status：Preliminary Case Evidence。** P06、P10、R2-H1-B 均为 `3→4→4`。未来需要覆盖更多 count level、动作类别、seed、模型与多评测者一致性，才能检验其稳健性与可推广性。

---

## 23. Evidence Status Table

| Claim | Literature | AV Project | Current Status |
|---|---|---|---|
| Atomic Point decomposition | Strong | Partial | Supported concept |
| Event vs Attribute separation | Strong | Partial | Supported concept |
| Temporal Line | Strong | P06 / H2 | Case demonstrated |
| Dynamic Line | Emerging | P01 / H3 | Case demonstrated; Mixed / Refined |
| Scene coherence | Strong literature | P05 / P08 only | Limited project evidence |
| PLS vs Quality separation | Related literature | P01 / P06 / H1-B / H2 / H4-A | Preliminary case support |
| Text→Visual vs Visual→Audio separation | Multimodal rationale | `3→4→4 ×3` | Project-derived extension |
| Evaluation → Controlled Regression | Experimental-method rationale | H2 / H3 / H4 | Project-derived extension |
| Not Replicated / Mixed as evidence states | General scientific rationale | H2 / H3 / H4 | Project-derived extension |
| Physical / Perceptual cross-axis | AcoustiTrace and spatial / temporal literature | Partial cases | Limited support |
| Production Utility | Conceptual / adjacent practice | Not tested | Future Work |
| Preference / Reward | Strong adjacent literature | Not tested | Future Work |
| Judge Reliability | Emerging literature | Not tested | Future Work |

机器可读版本见 `analysis/point_line_scene_evidence_map.json`。

---

## 24. Evidence Boundary 与限制

- Round-1 = 10 个单次生成样本。
- Round-2 = 6 个单次生成样本。
- H1-A = UNEVALUABLE，不进入 Exact-count valid set。
- H1-B exact audit = 单次人工复核。
- 没有 multi-seed statistical experiment。
- 没有 inter-rater reliability study。
- 没有 PLS 与 holistic-only evaluation 的正式 A/B。
- 没有 reward training。
- 没有 automatic Audio Judge validation。
- 没有正式 Production Utility Rubric。
- Scene 只有有限的 Round-1 案例证据。

因此本项目属于：

> **diagnostic case study**

而不是：

> **framework validation benchmark**

Cross-Round Analysis v1.0 的冻结结论保持不变：

- Exact-count = Repeated Diagnostic Pattern
- Onset = Not Replicated
- Dynamic = Mixed / Refined
- Cross-shot = Not Replicated
- Audio Quality = Persistent / Exploratory Concern

---

## 25. 五个必须回答的问题

### 25.1 Point–Line–Scene 是什么？

一种把原子元素、元素关系和整体场景分开，并以 Quality 与其他跨层轴补充的分层感知评测框架。

### 25.2 哪些部分来自已有论文？

细粒度 rubric、事件 / 属性分解、时间与空间关系、结构化声景、混合音频、物理声学诊断、偏好优化与 Judge 可靠性等研究方向来自已引用文献。

### 25.3 哪些部分是作者的方法论抽象？

Point / Line / Scene 的统一命名与层级组织、跨层评价轴，以及将这些维度串接进 Evaluation → Diagnosis → Regression 工作流，属于作者的概念抽象。

### 25.4 AV 项目实际支持了哪些部分？

项目案例支持分开诊断 Text→Visual 与 Visual→Audio，展示 Temporal / Dynamic / Continuity Line 的诊断与回归过程，支持 PLS 与 Quality 分轴，并显示 Not Replicated 与 Mixed 结果如何改变优先级。Scene 只有有限案例证据。

### 25.5 哪些部分仍然是未来研究方向？

PLS 能力复杂度梯度、Production Utility、Preference / Reward、自动 Judge Reliability、系统 Scene 验证、多 seed / 多模型 / 多评测者验证，以及 PLS 相对整体指标的正式 A/B。

---

## References

1. Elizalde, B., Deshmukh, S., Al Ismail, M., & Wang, H. **CLAP: Learning Audio Concepts From Natural Language Supervision.** ICASSP 2023. [arXiv:2206.04769](https://arxiv.org/abs/2206.04769)
2. Kilgour, K., Zuluaga, M., Roblek, D., & Sharifi, M. **Fréchet Audio Distance: A Metric for Evaluating Music Enhancement Algorithms.** 2018. [arXiv:1812.08466](https://arxiv.org/abs/1812.08466)
3. ITU-T. **P.800.1: Mean opinion score (MOS) terminology.** [Official recommendation](https://www.itu.int/itu-t/recommendations/rec.aspx?lang=en&rec=12972)
4. Wang, J., Yang, Y., Li, S., Rong, Y., Yang, S., Yang, X., & Liu, L. **AudioScape-TTA: A Structured Soundscape Benchmark for Fine-Grained Text-to-Audio Evaluation.** 2026. [arXiv:2608.04479](https://arxiv.org/abs/2608.04479)
5. Li, H., Tan, T., Yang, Y., Yang, S., & Chen, X. **AnyAudio-Judge: A Dynamic Rubric-Based Benchmark and Evaluator for Audio Instruction Following.** 2026. [arXiv:2606.03116](https://arxiv.org/abs/2606.03116)
6. Kuan, C.-Y., Kim, S., Kim, B., et al. **Improving Text-to-Audio Instruction Following via Fine-Grained Feedback from Audio-Aware Large Language Models.** 2026. [arXiv:2607.13408](https://arxiv.org/abs/2607.13408)
7. Xie, Z., Xu, X., Wu, Z., & Wu, M. **AudioTime: A Temporally-aligned Audio-text Benchmark Dataset.** 2024. [arXiv:2407.02857](https://arxiv.org/abs/2407.02857)
8. Zheng, Z., Xu, X., Mei, J., et al. **MMAG: A Multi-Control Mixed Audio Generation Benchmark.** 2026. [arXiv:2608.06900](https://arxiv.org/abs/2608.06900)
9. Li, S., Cao, Y., Liu, Y., et al. **AcoustiTrace: When Plausible Sound Violates Physics.** 2026. [arXiv:2608.02035](https://arxiv.org/abs/2608.02035)
10. **AV-SyncBench: Decoupled Benchmarking of Temporal and Semantic Audio-Visual Synchronization.** 2026. [arXiv:2607.00726](https://arxiv.org/abs/2607.00726)
11. Shimada, K., Simon, C., Shibuya, T., Takahashi, S., & Mitsufuji, Y. **SAVGBench: Benchmarking Spatially Aligned Audio-Video Generation.** 2024. [arXiv:2412.13462](https://arxiv.org/abs/2412.13462)
12. Liu, T., Shi, Y., Zhu, X., et al. **LongAV-Compass: Towards Unified Evaluation of Minute-Scale Audio-Visual Generation Across T2AV, I2AV, and V2AV.** 2026. [arXiv:2605.26244](https://arxiv.org/abs/2605.26244)
13. Manakul, P., Gan, W. H., Ryan, M. J., et al. **AudioJudge: Understanding What Works in Large Audio Model Based Speech Evaluation.** EACL 2026. [ACL Anthology](https://aclanthology.org/2026.eacl-long.168/)

### Frozen project evidence

- `freeze/AV-Gen-Eval-v1.0-round1-demo/evaluation_records.json`
- `freeze/AV-Gen-Eval-v1.0-round1-demo/report_round1.md`
- `freeze/AV-Gen-Eval-v1.0-round1-demo/representative_cases_round1.md`
- `freeze/AV-Gen-Eval-Round2-Controlled-Regression-v0.1-run01-frozen/evaluation_records.json`
- `freeze/AV-Gen-Eval-Round2-Controlled-Regression-v0.1-run01-frozen/final_analysis_report.md`
- `freeze/AV-Gen-Eval-Round2-Controlled-Regression-v0.1-run01-frozen/representative_cases_round2.md`
- `freeze/ERRATUM-Round2-run01-frozen.md`
- `freeze/AV-Gen-Eval-Cross-Round-Analysis-v1.0/cross_round_analysis.md`
- `freeze/AV-Gen-Eval-Cross-Round-Analysis-v1.0/cross_round_evidence_map.json`




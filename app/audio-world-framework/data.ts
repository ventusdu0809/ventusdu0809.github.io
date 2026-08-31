/**
 * 《点·线·面·境》AI 音频场景表示与分层评测框架
 * 页面数据文件：所有文案、表格、边界声明集中于此。
 * 真实性边界：已完成为「已完成」；未做过的实验/产品一律标注 Proposed / Next Step。
 */
export const awf = {
  meta: {
    title: "研究笔记：点·线·面·境｜声音场景组织思考",
    description:
      "杜明提出的点线面境框架：从声音事件、事件关系到场景与意义的分层表示，连接声音设计、游戏音频中间件与 AI 音频评测、标注。",
    keywords: [
      "AI 音频评测",
      "Text-to-Audio",
      "场景表示",
      "Scene Representation",
      "音频标注",
      "分层评测",
      "声音设计",
    ],
  },

  hero: {
    eyebrow: "方法框架 / METHODOLOGY",
    title: "点·线·面·境",
    subtitle: "生成式音频的场景表示与分层评测框架",
    en: "从声音事件到声音世界 / From Audio Events to Audio Worlds",
    core: [
      "声音不是若干音频素材的简单叠加。",
      "单个声音事件进入时间、空间、状态和因果关系后，才会形成完整场景。",
      "场景中的对象继续发生交互，听者才会感到情绪、叙事和氛围。",
    ],
    body: "这套框架从声音事件出发，逐步检查事件关系、场景组织和整体表达。它既可以用于设计评测项，也能帮助标注与研发定位问题。",
    tags: [
      "音频评测 Audio Evaluation",
      "场景表示 Scene Representation",
      "人类偏好 Human Preference",
      "游戏音频中间件 Game Audio Middleware",
      "声音设计 Sound Design",
    ],
    oneLiner: "重点不在素材叠了多少，而在这些声音是否组成了可信、可理解的场景。",
  },

  /** 首页主链路：Audio Asset → Event → Relation → Scene → Interaction → Meaning */
  flow: [
    {
      id: "asset",
      en: "Audio Asset",
      zh: "音频资产",
      desc: "单个音频素材或潜空间表示。",
      example: "一段雨声采样、一个脚步 WAV、一个合成器渲染结果。",
      question: "素材本身是否自然、完整、可用？",
    },
    {
      id: "event",
      en: "Event",
      zh: "声音事件",
      desc: "独立、可识别、有语义的声音事件。",
      example: "雨声、雷声、脚步、开门、鸟叫、车辆经过、一句对白。",
      question: "Prompt 要求的声音是否出现？声源、数量、属性是否正确？",
    },
    {
      id: "relation",
      en: "Relation",
      zh: "时间 / 空间 / 因果关系",
      desc: "事件之间的先后、持续、重叠、远近、强弱与因果。",
      example: "雷声出现后鸟叫停止；人物接近后脚步渐强；门开后室外声进入室内。",
      question: "每个声音都在，但它们在正确的时间、位置和关系中出现吗？",
    },
    {
      id: "scene",
      en: "Scene",
      zh: "声音场景",
      desc: "多个事件与关系共同形成的统一场景。",
      example: "森林 = 风吹树叶 + 远处鸟鸣 + 昆虫底噪 + 空间反射 + 远近层次 + 偶发树枝断裂。",
      question: "前后景是否合理？声源是否属于同一个世界？空间是否统一？",
    },
    {
      id: "interaction",
      en: "Interaction",
      zh: "状态与交互",
      desc: "场景中对象的状态变化与相互影响。",
      example: "人物进入室内后雨声被过滤；门关闭后室外声减弱；警报触发后环境紧张度上升。",
      question: "状态切换是否合理？交互是否产生可感知的响应？",
    },
    {
      id: "meaning",
      en: "Meaning",
      zh: "情绪 / 叙事 / 意境",
      desc: "场景在整体上产生的高层意义。",
      example: "「雨夜，一个人独自走过石板路」应传达安静、孤独、缓慢。",
      question: "正确生成声音，不等于正确表达意义。情绪与叙事是否成立？",
    },
  ],

  problem: {
    title: "从「生成一段音频」到「构建一个声音世界」",
    lead: "传统文本生成音频（Text-to-Audio，T2A）常被简化为 Prompt → Audio，评测也容易只问音质、声源和整体相关性。面对多事件场景，这些问题还不够。",
    missingTitle: "复杂音频场景还需要描述声音之间的组织关系",
    missing: [
      "哪些声音是独立事件；",
      "谁先发生、谁后发生；",
      "哪些声音同时存在；",
      "声音之间是否发生影响；",
      "当前环境处于什么状态；",
      "最终是否形成统一的情绪和叙事。",
    ],
    targetTitle: "因此需要分别检查",
    target: [
      "事件正确性",
      "关系正确性",
      "场景一致性",
      "交互合理性",
      "高层语义表达",
    ],
  },

  /** 点线面境四层核心 */
  layers: [
    {
      id: "point",
      char: "点",
      en: "声音事件 / Point",
      definition: "代表独立、可识别的声音事件。",
      examples: ["雨声", "雷声", "脚步", "开门", "鸟叫", "车辆经过", "一句人物对白"],
      question: "Prompt 要求的声音是否出现？声源、数量、属性是否正确？",
      labels: ["wrong_source", "missing_secondary_event", "wrong_attribute", "explicit_count_mismatch", "extra_event"],
      note: null,
    },
    {
      id: "relation",
      char: "线",
      en: "事件关系 / Relation",
      definition: "代表事件之间的关系：先后、持续、重叠、远近、强弱、因果与相互影响。",
      examples: ["雷声出现后，鸟叫停止", "人物接近后，脚步声逐渐增强", "门打开后，室外环境声进入室内"],
      question: "每一个声音都存在，但它们是否在正确的时间、位置和关系中出现？",
      labels: ["wrong_temporal_order", "abrupt_cutoff", "无因果响应"],
      note: "这可以诊断一种常见问题：模型会生成所有对象，但不会组织对象。",
    },
    {
      id: "scene",
      char: "面",
      en: "声音场景 / Scene",
      definition: "多个声音事件与关系共同形成的完整场景。",
      examples: ["风吹树叶", "远处鸟鸣", "昆虫底噪", "空间反射", "远近层次", "偶发树枝断裂"],
      question: "前景、背景是否合理？声源是否属于同一个世界？空间是否统一？",
      labels: ["scene_incoherence", "foreground_background_conflict", "spatial_inconsistency", "density_mismatch", "layer_imbalance"],
      note: "这一层可以形成新的 Bad Case 类型（Proposed）。",
    },
    {
      id: "meaning",
      char: "境",
      en: "整体表达 / Meaning",
      definition: "场景在整体上产生的高层意义：情绪、氛围、叙事阶段、紧张程度、孤独感、安全感、真实感、电影感、意境。",
      examples: ["情绪", "氛围", "叙事阶段", "紧张程度", "孤独感", "沉浸感"],
      question: "正确生成声音，不等于正确表达意义。",
      labels: ["情绪一致性评分", "叙事匹配评分", "场景整体偏好", "Pairwise Preference", "多评审主观判断"],
      note: "这一层更适合采用 Pairwise Preference 与多评审机制，而不是单条 1–5 打分。",
    },
  ],

  middleware: {
    title: "从 Wwise 到 AI Audio Scene Middleware",
    lead: "游戏音频中间件通过状态、位置与触发条件组织声音素材。这套逻辑可以转化为 AI 音频的中间组织层。",
    gameAudio: ["Audio Asset", "Event", "Switch", "State", "RTPC", "Game Object", "Scene", "Player Experience"],
    aiAudio: ["音频素材或潜空间表示", "语义声音事件", "离散条件选择", "当前场景或世界状态", "距离、速度、强度等连续参数", "场景中的声源对象", "事件图和时间关系", "人类偏好与听感结果"],
    mapping: [
      ["Audio Asset", "音频素材或潜空间表示"],
      ["Event", "语义声音事件"],
      ["Switch", "离散条件选择"],
      ["State", "当前场景或世界状态"],
      ["RTPC", "距离、速度、强度等连续参数"],
      ["Game Object", "场景中的声源对象"],
      ["Event System", "事件图和时间关系"],
      ["Audio Engine", "音频生成与渲染模块"],
      ["Player Experience", "人类偏好与听感结果"],
    ],
    aiFlow: [
      "Prompt / Video / Game State / User Action",
      "Semantic Parser",
      "Audio Events",
      "Event Graph",
      "Scene State",
      "Audio Asset Routing / Generation",
      "Mixing & Rendering",
      "Perception and Meaning",
    ],
    conclusion: "这一方向补充 Prompt、场景状态和最终声音之间的组织与检查环节。",
    boundary: "AI 音频场景中间层（AI Audio Scene Middleware）是概念设计，尚未实现为可运行产品。",
  },

  evaluationMatrix: {
    title: "分层评测矩阵",
    lead: "分层评测在整体分数之外，进一步帮助研发定位问题发生的层级。",
    rows: [
      {
        layer: "点",
        en: "Point",
        question: "声音事件是否正确",
        metrics: "事件召回、声源、数量、属性",
        issues: "缺失、错误声源、错误属性",
        methods: "事件级评分 + Bad Case 标签",
      },
      {
        layer: "线",
        en: "Relation",
        question: "事件关系是否正确",
        metrics: "顺序、持续、重叠、距离变化",
        issues: "顺序错误、持续错误、无因果响应",
        methods: "关系标签 + 时序检查",
      },
      {
        layer: "面",
        en: "Scene",
        question: "场景是否完整一致",
        metrics: "空间、层次、密度、连贯性",
        issues: "拼贴感、空间冲突、前后景失衡",
        methods: "Scene Coherence 独立维度",
      },
      {
        layer: "境",
        en: "Meaning",
        question: "是否传达目标意义",
        metrics: "情绪、叙事、偏好、沉浸感",
        issues: "氛围错误、叙事不符、意境缺失",
        methods: "Pairwise Preference + 多评审",
      },
    ],
    diagnosis: [
      ["事件存在，但数量不正确", "点层问题"],
      ["事件都存在，但顺序错误", "线层问题"],
      ["事件和顺序都正确，但整体像声音拼贴", "面层问题"],
      ["场景合理，但没有传达目标情绪", "境层问题"],
    ],
    punchline: "这比单纯的 OVL = 3.2 更具有诊断价值。",
  },

  annotation: {
    title: "从单标签走向层级结构",
    lead: "标注也需要分层：先标事件，再标关系，再标场景，最后标意义。",
    steps: [
      ["第一层", "标注声音事件", "声源、角色、起止时间、强度、属性"],
      ["第二层", "标注时间、空间与因果关系", "重叠、先后、距离变化、因果响应"],
      ["第三层", "标注场景与前后景结构", "空间一致性、层次、密度"],
      ["第四层", "标注情绪、叙事与人类偏好", "情绪对齐、叙事匹配、整体偏好"],
    ],
    schemaTitle: "标注 Schema 示例（Proposed）",
    schema: `scene:
  environment: rainy_street
  time: night
  global_mood:
    - lonely
    - calm

events:
  - id: event_01
    source: rain
    role: background
    start: 0.0
    end: 10.0
    intensity: medium

  - id: event_02
    source: footsteps
    role: foreground
    start: 1.5
    end: 8.5
    attributes:
      speed: slow
      surface: stone
      distance_change: approaching

  - id: event_03
    source: thunder
    role: secondary_event
    start: 6.2
    distance: far

relations:
  - subject: event_01
    predicate: overlaps
    object: event_02

  - subject: event_03
    predicate: occurs_after
    object: event_02

scene_quality:
  spatial_coherence: high
  foreground_background_balance: medium

meaning:
  emotion_alignment: high
  narrative_alignment: medium`,
    caution:
      "「境」层标签不能完全依靠单一标注员直接判断，需要明确 Rubric、锚点样本、多评审机制和一致性检查。",
  },

  caseStudy: {
    prompt: "雨夜，一个人撑伞缓慢走过石板路，远处偶尔传来雷声。",
    layers: [
      {
        layer: "点",
        en: "Point",
        content: ["雨", "脚步", "雨伞受雨", "远处雷声"],
      },
      {
        layer: "线",
        en: "Relation",
        content: ["雨声贯穿全程；", "脚步缓慢且连续；", "雷声低频、远距离、偶发；", "脚步与雨声共存，但不能完全被掩盖。"],
      },
      {
        layer: "面",
        en: "Scene",
        content: ["统一的夜间室外空间；", "前景为脚步和伞面；", "背景为持续雨声；", "远景为雷声；", "避免所有事件处于同一距离。"],
      },
      {
        layer: "境",
        en: "Meaning",
        content: ["安静", "孤独", "缓慢", "略带不确定感"],
      },
    ],
    badcases: [
      ["只生成雨声", "点层：事件缺失"],
      ["雷声持续出现", "线层：频率和时间关系错误"],
      ["脚步、雨声和雷声都像近距离素材", "面层：空间组织错误"],
      ["声音过于拥挤和激烈", "境层：目标情绪不匹配"],
    ],
  },

  evidence: {
    title: "从现有评测流程到下一阶段框架",
    lead: "下面这些是已经完成的 T2A 评测工作；框架中尚未验证的部分，我明确标为下一阶段计划，不把它们说成已完成。",
    status: "已完成",
    stats: [
      ["600", "正式评测样本"],
      ["660", "累计试听事件"],
      ["2", "模型"],
      ["3", "批生成数据"],
      ["60", "隐藏重复 · 两阶段累计"],
      ["40 对", "第二阶段重复配对"],
    ],
    consistencyTitle: "单一评测人复测一致性",
    consistency: [
      ["OVL within-1", "95.0%"],
      ["REL within-1", "97.5%"],
      ["Primary Bad Case Exact", "67.5%"],
    ],
    consistencyNote: "第一阶段加入 20 条隐藏重复；第二阶段加入 40 条重复样本，与对应原样本构成 40 对。两阶段隐藏重复均不进入正式样本统计，只用于检查同一评测人的复测稳定性。",
    dimensionsTitle: "现有评测维度",
    dimensions: ["OVL", "REL", "wrong_source", "artifact_noise", "wrong_attribute", "wrong_temporal_order", "missing_secondary_event", "extra_event", "abrupt_cutoff"],
    coverageTitle: "当前项目已经覆盖的层级",
    coverage: [
      ["点", "声源、属性、数量、次事件缺失", "已建立正式标签"],
      ["线", "时间顺序、重复与持续问题", "已有部分标签"],
      ["面", "部分由 OVL 和 REL 间接覆盖", "无独立指标"],
      ["境", "尚未独立建立正式指标", "未开展"],
    ],
    nextTitle: "下一阶段计划",
    nextStatus: "Proposed / Next Step",
    next: [
      "将 Prompt 拆解为事件图（Prompt Event Graph）",
      "增加事件级召回与条件发生率",
      "增加时间关系和空间关系标签",
      "增加 Scene Coherence 独立维度",
      "使用 Pairwise Preference 测试情绪和叙事表达",
      "比较自动指标、专家判断和普通听众偏好的差异",
    ],
  },

  role: {
    title: "把听感问题整理成可复查的评测语言",
    lead: "这套框架把听感问题整理成研发、标注和评测都能复用的描述。",
    columns: [
      {
        en: "EVALUATION DESIGN",
        zh: "评测设计",
        items: [
          "将复杂 Prompt 拆解成可观察能力",
          "建立分层 Rubric",
          "设计通用集与专项集",
          "将总分转化为可诊断问题",
        ],
      },
      {
        en: "ANNOTATION & QC",
        zh: "标注与质控",
        items: [
          "建立事件与场景 Ontology",
          "编写标注指南和边界案例",
          "设计 Gold Sample、隐藏重复和复测机制",
          "分析评审一致性与主观偏差",
        ],
      },
      {
        en: "R&D COLLABORATION",
        zh: "研发协作",
        items: [
          "区分模型问题、Prompt 问题和评测问题",
          "根据 Bad Case 设计对照实验",
          "将听感问题转化为结构化证据",
          "用回归集验证问题是否稳定改善",
        ],
      },
    ],
  },

  whyMe: {
    title: "我的能力组合",
    lead: "这套方法来自声音设计、游戏音频与实际评测工作的交叉经验。",
    items: [
      {
        title: "声音设计",
        body: "爱丁堡大学声音设计硕士，长期关注声音、空间、叙事和感知之间的关系。",
      },
      {
        title: "游戏音频中间件",
        body: "具备 Unity、Wwise 的实际项目经验，理解 Asset、Event、State、Switch、RTPC 和 Scene 的组织逻辑。",
      },
      {
        title: "AI 音频评测",
        body: "独立搭建 Text-to-Audio 评测流程，覆盖测试集、盲听、隐藏重复、一致性分析、Bad Case 诊断和报告交付。",
      },
      {
        title: "跨媒介场景研究",
        body: "本科阶段持续研究元素、空间与整体氛围之间的关系，这段训练后来进入声音设计与音频场景分析。",
      },
    ],
    conclusion:
      "我习惯把主观听感拆成可观察的事件、关系与场景问题，再交给评测、标注和研发继续验证。",
    boundary:
      "当前能力边界集中在人工听评、评测设计、声音制作与中间件实践；模型训练、大规模数据工程和自动 Judge 仍需与研发岗位协作完成。",
  },

  footer: {
    note: "本页将“点、线、面、境”作为声音场景的组织方法。场景一致性（Scene Coherence）、情绪 / 叙事评测与 AI 音频场景中间层仍属于后续研究或概念设计，不写成已完成产品。",
    boundary: "页面会明确区分已完成、计划中（Proposed / Next Step）与尚未测试的内容。",
  },
} as const;

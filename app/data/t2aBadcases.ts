export const globalBadcases = [
  { label: "wrong_source", sa3m: 14.5, sao1: 6.5 },
  { label: "wrong_count", sa3m: 15.0, sao1: 21.5 },
  { label: "missing_secondary_event", sa3m: 15.5, sao1: 16.0 },
  { label: "wrong_attribute", sa3m: 18.5, sao1: 12.5 },
  { label: "artifact_noise", sa3m: 12.5, sao1: 17.0 },
  { label: "texture_ambiguity", sa3m: 5.5, sao1: 8.0 },
] as const;

export const conditionalBadcases = [
  { label: "wrong_source", sa3m: "29/200 · 14.5%", sao1: "13/200 · 6.5%", prompts: 40, outputs: 200, evidence: "controlled descriptive" },
  { label: "明确次数错误", sa3m: "17/40 · 42.5%", sao1: "24/40 · 60.0%", prompts: 8, outputs: 40, evidence: "retrospective conditional" },
  { label: "隐含单次误重复", sa3m: "13/80 · 16.25%", sao1: "19/80 · 23.75%", prompts: 16, outputs: 80, evidence: "retrospective conditional" },
  { label: "次事件缺失", sa3m: "30/80 · 37.5%", sao1: "27/80 · 33.75%", prompts: 16, outputs: 80, evidence: "retrospective conditional" },
  { label: "必要声音成分缺失", sa3m: "0/25 · 0.0%", sao1: "1/25 · 4.0%", prompts: 5, outputs: 25, evidence: "exploratory small-n" },
  { label: "属性错误", sa3m: "37/200 · 18.5%", sao1: "25/200 · 12.5%", prompts: 40, outputs: 200, evidence: "retrospective conditional" },
  { label: "时序错误", sa3m: "3/80 · 3.75%", sao1: "2/80 · 2.5%", prompts: 16, outputs: 80, evidence: "exploratory provisional" },
] as const;


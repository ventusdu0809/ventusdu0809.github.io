"use client";

import { useState } from "react";
import { awf } from "./data";

/**
 * 六爻状态交互：六条横线在阴/阳之间切换。
 * 六位二进制组合显示 State 0–63；不展示具体卦名（避免卦名准确性风险）。
 * 改变任意一条线时提示 Local State Change → Global State Transition。
 *
 * 静态导出说明：Cloudflare 版由 React 驱动；GitHub Pages 静态版由
 * scripts/export-static.mjs 注入的 vanilla 脚本读取 data-* 属性驱动。
 */
export default function HexagramWorldState() {
  // 自下而上第 0–5 爻；false = 阴（断线），true = 阳（连线）
  const [lines, setLines] = useState<boolean[]>([false, false, false, false, false, false]);

  const toggle = (index: number) => {
    setLines((prev) => prev.map((value, i) => (i === index ? !value : value)));
  };

  // 二进制编号：自下而上第 0 爻为最低位
  const stateNumber = lines.reduce((acc, value, index) => acc + (value ? 1 << index : 0), 0);
  // 视觉展示：从上到下（第 5 爻在最高位）
  const binaryDisplay = [...lines].reverse().map((value) => (value ? "1" : "0")).join("");

  return (
    <div className="awf-hexagram-wrap" data-awf-hexagram>
      <div className="awf-hexagram" role="group" aria-label="六爻二进制状态交互：自下而上六条爻线，点击切换阴或阳">
        {[...lines].reverse().map((value, reversedIndex) => {
          const index = lines.length - 1 - reversedIndex;
          return (
            <button
              key={index}
              type="button"
              className={`awf-hexagram-line ${value ? "is-yang" : "is-yin"}`}
              aria-pressed={value}
              aria-label={`第 ${index + 1} 爻（自下而上）：${value ? "阳，连线" : "阴，断线"}，点击切换`}
              onClick={() => toggle(index)}
              data-hex-index={index}
              data-hex-yang={value ? "1" : "0"}
            >
              <span className="awf-hexagram-seg" aria-hidden="true" />
              <span className="awf-hexagram-seg" aria-hidden="true" />
            </button>
          );
        })}
      </div>

      <div className="awf-hexagram-readout" aria-live="polite" data-awf-hex-readout>
        <p className="awf-hexagram-state-label">
          STATE <strong>{stateNumber}</strong>
        </p>
        <p className="awf-hexagram-binary">二进制 {binaryDisplay}（自下而上为第 1–6 爻）</p>
        <p className="awf-hexagram-transition">
          {stateNumber === 0
            ? "初始状态：全部爻为阴，State 0"
            : "Local State Change → Global State Transition"}
        </p>
      </div>

      <div className="awf-hexagram-mapping">
        <h4>对应关系（类比）</h4>
        <dl>
          {awf.worldState.mapping.map(([key, value]) => (
            <div key={key}>
              <dt>{key}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <aside className="awf-hexagram-insight">
        {awf.worldState.insight.map((text) => (
          <p key={text}>{text}</p>
        ))}
      </aside>

      <p className="awf-disclaimer">{awf.worldState.disclaimer}</p>
    </div>
  );
}

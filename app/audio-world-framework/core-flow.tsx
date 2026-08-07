"use client";

import { useState } from "react";
import { awf } from "./data";

/**
 * 核心流程图：Audio Asset → Event → Relation → Scene → Interaction → Meaning
 * 点击节点高亮当前层、弱化其他层，并展示定义 / 音频例子 / 评测问题。
 * 纯 CSS + SVG 箭头，无 Canvas，保证文本可访问。
 *
 * 静态导出说明：Cloudflare 版由 React 驱动；GitHub Pages 静态版由
 * scripts/export-static.mjs 注入的 vanilla 脚本读取 data-* 属性驱动，
 * 两组交互行为保持一致。
 */
export default function CoreFlowDiagram() {
  const [activeId, setActiveId] = useState<string | null>(awf.flow[0].id);

  const active = awf.flow.find((node) => node.id === activeId) ?? awf.flow[0];
  const activeIndex = awf.flow.findIndex((node) => node.id === active.id);

  return (
    <div className="awf-flow" data-awf-flow>
      <ol className="awf-flow-track" aria-label="点线面境核心链路">
        {awf.flow.map((node, index) => {
          const isActive = node.id === active.id;
          return (
            <li key={node.id} className={isActive ? "is-active" : ""} data-flow-item={node.id}>
              <button
                type="button"
                className="awf-flow-node"
                aria-pressed={isActive}
                onClick={() => setActiveId(node.id)}
                aria-label={`${node.en} ${node.zh}：${node.desc}`}
                data-flow-id={node.id}
                data-flow-en={node.en}
                data-flow-zh={node.zh}
                data-flow-desc={node.desc}
                data-flow-example={node.example}
                data-flow-question={node.question}
                data-flow-index={String(index + 1).padStart(2, "0")}
              >
                <span className="awf-flow-index">{String(index + 1).padStart(2, "0")}</span>
                <span className="awf-flow-en">{node.en}</span>
                <span className="awf-flow-zh">{node.zh}</span>
              </button>
              {index < awf.flow.length - 1 ? (
                <span className="awf-flow-arrow" aria-hidden="true">
                  <svg width="34" height="12" viewBox="0 0 34 12" focusable="false">
                    <path d="M1 6h30M27 2l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.4" />
                  </svg>
                </span>
              ) : null}
            </li>
          );
        })}
      </ol>

      <div className="awf-flow-detail" aria-live="polite" data-awf-flow-detail>
        <p className="awf-flow-detail-eyebrow">
          LAYER {String(activeIndex + 1).padStart(2, "0")} / {active.en.toUpperCase()}
        </p>
        <h3>
          {active.zh} <span className="awf-flow-detail-en">{active.en}</span>
        </h3>
        <p className="awf-flow-detail-desc">{active.desc}</p>
        <div className="awf-flow-detail-grid">
          <div>
            <span className="awf-flow-detail-label">音频场景例子</span>
            <p>{active.example}</p>
          </div>
          <div>
            <span className="awf-flow-detail-label">评测问题</span>
            <p>{active.question}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

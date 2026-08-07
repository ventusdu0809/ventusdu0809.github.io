"use client";

import { useCallback, useEffect, useState } from "react";
import { awf } from "./data";

/**
 * 面试演示模式控制器：
 * - 右上角「普通浏览 / 面试演示」切换
 * - 面试模式下每屏只显示一个核心结论，大段内容默认折叠
 * - 底部进度条、讲解提示按钮、左右方向键切换章节
 * - Esc / 按钮退出，恢复完整网页滚动浏览
 *
 * 静态导出说明：Cloudflare 版由 React 驱动；GitHub Pages 静态版由
 * scripts/export-static.mjs 注入的 vanilla 脚本读取 data-* 属性驱动。
 * data-awf-interview-data 携带 slides 全文，供静态版脚本构建覆盖层。
 */
export default function InterviewModeController() {
  const [presenting, setPresenting] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);
  const [showTip, setShowTip] = useState(false);

  const total = awf.interview.slides.length;

  const goTo = useCallback(
    (index: number) => {
      setSlideIndex(Math.min(Math.max(index, 0), total - 1));
      setShowTip(false);
    },
    [total],
  );

  const start = () => {
    setPresenting(true);
    setSlideIndex(0);
    setShowTip(false);
  };

  const stop = () => {
    setPresenting(false);
    setShowTip(false);
  };

  useEffect(() => {
    if (!presenting) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") goTo(slideIndex + 1);
      else if (event.key === "ArrowLeft") goTo(slideIndex - 1);
      else if (event.key === "Escape") stop();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [presenting, slideIndex, goTo]);

  const slide = awf.interview.slides[slideIndex];

  return (
    <>
      <div
        className="awf-interview-toggle"
        role="group"
        aria-label="浏览模式切换"
        data-awf-interview-toggle
        data-awf-interview-data={JSON.stringify(awf.interview.slides)}
      >
        <button
          type="button"
          className={!presenting ? "is-active" : ""}
          onClick={stop}
          aria-pressed={!presenting}
          data-awf-interview-normal
        >
          {awf.interview.normalLabel}
        </button>
        <button
          type="button"
          className={presenting ? "is-active" : ""}
          onClick={start}
          aria-pressed={presenting}
          data-awf-interview-start
        >
          {awf.interview.label}
        </button>
      </div>

      {presenting ? (
        <section className="awf-interview" aria-label="面试演示模式" data-awf-interview-overlay>
          <div className="awf-interview-topbar">
            <span className="awf-interview-brand">点·线·面·境 / INTERVIEW MODE</span>
            <button type="button" className="awf-interview-exit" onClick={stop}>
              退出演示
            </button>
          </div>

          <div className="awf-interview-slide" key={slide.section}>
            <p className="awf-interview-section">第 {slide.section} 章 / {slide.title}</p>
            <h2 className="awf-interview-big">{slide.big}</h2>

            <div className="awf-interview-detail">
              <p>{slide.detail}</p>
            </div>

            <div className="awf-interview-tip-wrap">
              <button
                type="button"
                className="awf-interview-tip-button"
                onClick={() => setShowTip((value) => !value)}
                aria-expanded={showTip}
              >
                {awf.interview.hintLabel}
                <span aria-hidden="true">{showTip ? "−" : "+"}</span>
              </button>
              {showTip ? <p className="awf-interview-tip">{slide.tip}</p> : null}
            </div>
          </div>

          <div className="awf-interview-controls">
            <button
              type="button"
              className="awf-interview-nav"
              onClick={() => goTo(slideIndex - 1)}
              disabled={slideIndex === 0}
            >
              ← 上一章
            </button>
            <div className="awf-interview-progress" aria-label={`第 ${slideIndex + 1} / ${total} 章`}>
              {awf.interview.slides.map((item, index) => (
                <button
                  key={item.section}
                  type="button"
                  className={index <= slideIndex ? "is-done" : ""}
                  aria-label={`跳到第 ${item.section} 章 ${item.title}`}
                  onClick={() => goTo(index)}
                />
              ))}
            </div>
            <button
              type="button"
              className="awf-interview-nav"
              onClick={() => goTo(slideIndex + 1)}
              disabled={slideIndex === total - 1}
            >
              下一章 →
            </button>
          </div>
          <p className="awf-interview-kbd">← → 方向键切换章节 · Esc 退出</p>
        </section>
      ) : null}
    </>
  );
}

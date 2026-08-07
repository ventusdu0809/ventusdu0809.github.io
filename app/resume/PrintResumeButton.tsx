"use client";

export function PrintResumeButton() {
  return (
    <button className="resume-print-button" type="button" onClick={() => window.print()} aria-label="打印或保存当前简历为PDF">
      打印 / 保存PDF
    </button>
  );
}

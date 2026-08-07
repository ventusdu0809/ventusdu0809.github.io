"use client";

export default function PrintButton() {
  return (
    <button
      type="button"
      className="resume-print-btn"
      onClick={() => window.print()}
      aria-label="打印或保存为 PDF"
    >
      打印 / 保存 PDF
    </button>
  );
}

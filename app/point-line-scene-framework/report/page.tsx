import type { Metadata } from "next";
import Link from "next/link";
import reportSource from "../../../public/downloads/pls-framework/point_line_scene_framework_with_av_case_study.md?raw";
import "../../t2a-case-study/t2a-case-study.css";
import "./report.css";

export const metadata: Metadata = {
  title: "Point–Line–Scene 完整研究报告｜杜明",
  description:
    "Point–Line–Scene 分层感知评测框架的完整研究报告，涵盖文献综合、概念框架、Audio-Visual Generation Evaluation 案例、Reference-aware Diagnosis 与研究边界。",
  alternates: { canonical: "/point-line-scene-framework/report/" },
};

type ReportDocument = {
  html: string;
  sections: Array<{ id: string; title: string }>;
};

const report = renderMarkdown(reportSource);

export default function PointLineSceneReportPage() {
  return (
    <main className="pls-report-page">
      <header className="pls-report-topbar">
        <Link href="/point-line-scene-framework/">← 返回 PLS 研究页</Link>
        <span>完整研究报告 / FULL REPORT</span>
      </header>

      <div className="pls-report-layout">
        <aside className="pls-report-toc" aria-label="报告目录">
          <p>目录 / CONTENTS</p>
          <nav>
            {report.sections.map((section) => <a key={section.id} href={`#${section.id}`}>{section.title}</a>)}
          </nav>
        </aside>

        <article
          className="pls-report-article"
          dangerouslySetInnerHTML={{ __html: report.html }}
        />
      </div>

      <footer className="pls-report-footer">
        <Link href="/point-line-scene-framework/">← 返回 PLS 研究页</Link>
        <span>杜明 · Point–Line–Scene</span>
      </footer>
    </main>
  );
}

function renderMarkdown(source: string): ReportDocument {
  const lines = source.replaceAll("\r\n", "\n").split("\n");
  const output: string[] = [];
  const sections: ReportDocument["sections"] = [];
  let index = 0;
  let sectionIndex = 0;

  while (index < lines.length) {
    const line = lines[index];
    if (!line.trim()) {
      index += 1;
      continue;
    }

    const fence = line.match(/^```(.*)$/);
    if (fence) {
      const code: string[] = [];
      index += 1;
      while (index < lines.length && !lines[index].startsWith("```")) {
        code.push(lines[index]);
        index += 1;
      }
      index += 1;
      output.push(`<pre><code${fence[1] ? ` data-language="${escapeAttribute(fence[1].trim())}"` : ""}>${escapeHtml(code.join("\n"))}</code></pre>`);
      continue;
    }

    const heading = line.match(/^(#{1,3})\s+(.+)$/);
    if (heading) {
      const level = heading[1].length;
      const title = heading[2].trim();
      let id = "report-title";
      if (level === 2) {
        id = `section-${String(sectionIndex).padStart(2, "0")}`;
        sections.push({ id, title: plainText(title) });
        sectionIndex += 1;
      } else if (level === 3) {
        id = `subsection-${String(index).padStart(3, "0")}`;
      }
      output.push(`<h${level} id="${id}">${inlineMarkdown(title)}</h${level}>`);
      index += 1;
      continue;
    }

    if (/^---+$/.test(line.trim())) {
      output.push("<hr>");
      index += 1;
      continue;
    }

    if (line.startsWith(">")) {
      const quote: string[] = [];
      while (index < lines.length && lines[index].startsWith(">")) {
        quote.push(lines[index].replace(/^>\s?/, ""));
        index += 1;
      }
      output.push(`<blockquote>${quote.map((item) => `<p>${inlineMarkdown(item)}</p>`).join("")}</blockquote>`);
      continue;
    }

    if (isTableHeader(lines, index)) {
      const header = tableCells(lines[index]);
      const rows: string[][] = [];
      index += 2;
      while (index < lines.length && /^\s*\|.*\|\s*$/.test(lines[index])) {
        rows.push(tableCells(lines[index]));
        index += 1;
      }
      output.push(`<div class="pls-report-table-wrap"><table><thead><tr>${header.map((cell) => `<th>${inlineMarkdown(cell)}</th>`).join("")}</tr></thead><tbody>${rows.map((row) => `<tr>${row.map((cell) => `<td>${inlineMarkdown(cell)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`);
      continue;
    }

    const list = line.match(/^\s*(?:(\d+)\.|[-*])\s+(.+)$/);
    if (list) {
      const ordered = Boolean(list[1]);
      const items: string[] = [];
      const pattern = ordered ? /^\s*\d+\.\s+(.+)$/ : /^\s*[-*]\s+(.+)$/;
      while (index < lines.length) {
        const match = lines[index].match(pattern);
        if (!match) break;
        items.push(match[1]);
        index += 1;
      }
      const tag = ordered ? "ol" : "ul";
      output.push(`<${tag}>${items.map((item) => `<li>${inlineMarkdown(item)}</li>`).join("")}</${tag}>`);
      continue;
    }

    const paragraph: string[] = [line.trim()];
    index += 1;
    while (index < lines.length && lines[index].trim() && !startsBlock(lines, index)) {
      paragraph.push(lines[index].trim());
      index += 1;
    }
    output.push(`<p>${inlineMarkdown(paragraph.join(" "))}</p>`);
  }

  return { html: output.join("\n"), sections };
}

function startsBlock(lines: string[], index: number) {
  const line = lines[index];
  return /^(?:#{1,3}\s|```|>|---+$|\s*(?:\d+\.|[-*])\s+)/.test(line) || isTableHeader(lines, index);
}

function isTableHeader(lines: string[], index: number) {
  return /^\s*\|.*\|\s*$/.test(lines[index] ?? "") && /^\s*\|(?:\s*:?-+:?\s*\|)+\s*$/.test(lines[index + 1] ?? "");
}

function tableCells(line: string) {
  return line.trim().replace(/^\||\|$/g, "").split("|").map((cell) => cell.trim());
}

function inlineMarkdown(value: string) {
  const code: string[] = [];
  let html = escapeHtml(value).replace(/`([^`]+)`/g, (_match, content: string) => {
    const token = `@@INLINE_CODE_${code.length}@@`;
    code.push(`<code>${content}</code>`);
    return token;
  });
  html = html.replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, '<a href="$2" target="_blank" rel="noreferrer">$1</a>');
  html = html.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*([^*]+)\*/g, "<em>$1</em>");
  return html.replace(/@@INLINE_CODE_(\d+)@@/g, (_match, rawIndex: string) => code[Number(rawIndex)]);
}

function plainText(value: string) {
  return value.replace(/[`*_]/g, "").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
}

function escapeHtml(value: string) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
}

function escapeAttribute(value: string) {
  return escapeHtml(value).replaceAll("'", "&#39;");
}

import { cp, mkdir, readFile, readdir, rm, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const modeArg = process.argv.indexOf("--mode");
const mode = modeArg >= 0 ? process.argv[modeArg + 1] : "pages";

if (!new Set(["pages", "offline"]).has(mode)) {
  throw new Error(`Unsupported export mode: ${mode}`);
}

const outputDir = path.join(root, mode === "pages" ? "pages-dist" : "offline-dist");
const basePath = normalizeBasePath(process.env.PAGES_BASE_PATH || "/");
const routes = ["/", "/t2a-case-study", "/audio-validation-summary", "/sound-practice", "/resume", "/audio-world-framework"];
const routeSet = new Set([...routes, "/t2a-formal-summary"]);
const serverEntry = path.join(root, "dist", "server", "index.js");

await rm(outputDir, { recursive: true, force: true });
await mkdir(outputDir, { recursive: true });

const server = await import(`${pathToImportUrl(serverEntry)}?static-export=${Date.now()}`);

for (const route of routes) {
  const response = await renderRoute(server.default, route);
  if (response.status !== 200) {
    throw new Error(`Static render failed for ${route}: HTTP ${response.status}`);
  }
  const html = transformHtml(await response.text(), route);
  const target = route === "/"
    ? path.join(outputDir, "index.html")
    : path.join(outputDir, route.slice(1), "index.html");
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, html, "utf8");
}

await writeRedirectPage();
await copyStaticAssets();
await writeFile(path.join(outputDir, ".nojekyll"), "", "utf8");
await writeFile(path.join(outputDir, "404.html"), notFoundHtml(), "utf8");

if (mode === "offline") {
  await writeFile(
    path.join(outputDir, "README_OFFLINE.txt"),
    [
      "杜明｜AI 音频评测作品集（离线版）",
      "",
      "请双击根目录 index.html 打开。",
      "核心图片、图表、音频、视频和下载材料均随包提供。",
      "Bilibili 播放器与飞书链接属于外部补充内容，离线时不可访问。",
      "",
      "生成日期：2026-07-27",
    ].join("\r\n"),
    "utf8",
  );
}

const report = await buildAssetReport();
await writeFile(
  path.join(outputDir, "BUILD_ASSET_REPORT.json"),
  `${JSON.stringify(report, null, 2)}\n`,
  "utf8",
);

console.log(`Static ${mode} export completed: ${path.relative(root, outputDir)}`);
console.table(report.categories);
console.log(`Total: ${formatMiB(report.totalBytes)} MiB`);

async function renderRoute(handler, route) {
  const pending = [];
  const context = {
    waitUntil(promise) {
      pending.push(Promise.resolve(promise));
    },
    passThroughOnException() {},
  };
  const response = await handler.fetch(
    new Request(`https://static-export.invalid${route}`),
    {},
    context,
  );
  await Promise.allSettled(pending);
  return response;
}

function transformHtml(source, route) {
  let html = source
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<link\b[^>]*rel=["']modulepreload["'][^>]*>/gi, "")
    .replace(/\sdata-rsc-css-href=["'][^"']*["']/gi, "")
    .replace(/\sdata-precedence=["'][^"']*["']/gi, "");
  if (mode === "offline") {
    html = html.replace(
      /<iframe\b[^>]*src=["']https:\/\/player\.bilibili\.com\/[^"']*["'][^>]*>[\s\S]*?<\/iframe>/gi,
      '<div class="offline-embed-notice" role="note">该视频播放器需要联网；离线时请使用旁边的 Bilibili 链接。</div>',
    );
  }

  html = html.replace(
    /\b(href|src|poster|content)=(['"])(\/[^'"]*)\2/gi,
    (_match, attr, quote, value) => `${attr}=${quote}${rewriteRootUrl(value, route)}${quote}`,
  );

  html = html.replace(
    "</head>",
    '<meta name="generator" content="杜明作品集静态导出"/></head>',
  );

  const enhancement = `<script>
document.addEventListener("click", async function (event) {
  const button = event.target.closest("[data-copy-sha]");
  if (!button) return;
  const value = button.getAttribute("data-copy-sha");
  try {
    await navigator.clipboard.writeText(value);
  } catch (_) {
    const input = document.createElement("textarea");
    input.value = value;
    document.body.appendChild(input);
    input.select();
    document.execCommand("copy");
    input.remove();
  }
  const original = button.textContent;
  button.textContent = "已复制 SHA256";
  window.setTimeout(function () { button.textContent = original; }, 1800);
});
</script>
${route === "/audio-world-framework" ? awfStaticEnhancement() : ""}`;

  return html.replace("</body>", `${enhancement}</body>`);
}

/**
 * 《点·线·面·境》静态版交互增强脚本。
 * 静态导出会剥离 React 运行时，这里用 vanilla JS 读取组件渲染出的
 * data-* 属性，驱动：核心流程图点击、六爻阴阳切换、面试演示模式。
 * 与 Cloudflare 版 React 交互行为保持一致。
 */
function awfStaticEnhancement() {
  return `<script>
(function () {
  var flow = document.querySelector("[data-awf-flow]");
  if (flow) {
    var nodes = flow.querySelectorAll("[data-flow-id]");
    var detail = flow.querySelector("[data-awf-flow-detail]");
    function select(node) {
      nodes.forEach(function (n) {
        var item = n.closest("li");
        var active = n === node;
        item.classList.toggle("is-active", active);
        n.setAttribute("aria-pressed", active ? "true" : "false");
      });
      detail.querySelector(".awf-flow-detail-eyebrow").textContent =
        "LAYER " + node.getAttribute("data-flow-index") + " / " + node.getAttribute("data-flow-en").toUpperCase();
      var h3 = detail.querySelector("h3");
      h3.childNodes[0].textContent = node.getAttribute("data-flow-zh") + " ";
      h3.querySelector(".awf-flow-detail-en").textContent = node.getAttribute("data-flow-en");
      detail.querySelector(".awf-flow-detail-desc").textContent = node.getAttribute("data-flow-desc");
      var grid = detail.querySelectorAll(".awf-flow-detail-grid p");
      grid[0].textContent = node.getAttribute("data-flow-example");
      grid[1].textContent = node.getAttribute("data-flow-question");
    }
    nodes.forEach(function (n) {
      n.addEventListener("click", function () { select(n); });
    });
  }

  var hex = document.querySelector("[data-awf-hexagram]");
  if (hex) {
    var lines = hex.querySelectorAll("[data-hex-index]");
    var readout = hex.querySelector("[data-awf-hex-readout]");
    function renderHex() {
      var state = 0;
      lines.forEach(function (line) {
        if (line.getAttribute("data-hex-yang") === "1") {
          state += 1 << parseInt(line.getAttribute("data-hex-index"), 10);
        }
      });
      var binary = "";
      for (var i = 5; i >= 0; i--) { binary += ((state >> i) & 1) ? "1" : "0"; }
      readout.querySelector(".awf-hexagram-state-label strong").textContent = String(state);
      readout.querySelector(".awf-hexagram-binary").textContent = "二进制 " + binary + "（自下而上为第 1–6 爻）";
      readout.querySelector(".awf-hexagram-transition").textContent =
        state === 0 ? "初始状态：全部爻为阴，State 0" : "Local State Change → Global State Transition";
    }
    lines.forEach(function (line) {
      line.addEventListener("click", function () {
        var yang = line.getAttribute("data-hex-yang") === "1";
        line.setAttribute("data-hex-yang", yang ? "0" : "1");
        line.classList.toggle("is-yang", !yang);
        line.classList.toggle("is-yin", yang);
        line.setAttribute("aria-pressed", yang ? "false" : "true");
        renderHex();
      });
    });
  }

  var toggle = document.querySelector("[data-awf-interview-toggle]");
  if (toggle) {
    var slides = JSON.parse(toggle.getAttribute("data-awf-interview-data") || "[]");
    var overlay = null;
    var slideIndex = 0;
    var tipOpen = false;
    function buildSlide(slide) {
      return (
        '<div class="awf-interview-slide">' +
          '<p class="awf-interview-section">第 ' + slide.section + ' 章 / ' + escapeHtml(slide.title) + '</p>' +
          '<h2 class="awf-interview-big">' + escapeHtml(slide.big) + '</h2>' +
          '<div class="awf-interview-detail"><p>' + escapeHtml(slide.detail) + '</p></div>' +
          '<div class="awf-interview-tip-wrap">' +
            '<button type="button" class="awf-interview-tip-button" aria-expanded="false">讲解提示<span aria-hidden="true">+</span></button>' +
            (tipOpen ? '<p class="awf-interview-tip">' + escapeHtml(slide.tip) + '</p>' : '') +
          '</div>' +
        '</div>'
      );
    }
    function progressMarkup() {
      return slides.map(function (s, i) {
        return '<button type="button" class="' + (i <= slideIndex ? "is-done" : "") + '" aria-label="跳到第 ' + s.section + ' 章 ' + escapeHtml(s.title) + '" data-slide="' + i + '"></button>';
      }).join("");
    }
    function render() {
      var slide = slides[slideIndex];
      overlay.querySelector(".awf-interview-slide").outerHTML = buildSlide(slide);
      overlay.querySelector(".awf-interview-progress").innerHTML = progressMarkup();
      var navs = overlay.querySelectorAll(".awf-interview-nav");
      navs[0].disabled = slideIndex === 0;
      navs[1].disabled = slideIndex === slides.length - 1;
      var tipButton = overlay.querySelector(".awf-interview-tip-button");
      tipButton.addEventListener("click", function () {
        tipOpen = !tipOpen;
        render();
      });
      overlay.querySelectorAll("[data-slide]").forEach(function (b) {
        b.addEventListener("click", function () {
          slideIndex = parseInt(b.getAttribute("data-slide"), 10);
          tipOpen = false;
          render();
        });
      });
    }
    function start() {
      slideIndex = 0;
      tipOpen = false;
      overlay = document.createElement("section");
      overlay.className = "awf-interview";
      overlay.setAttribute("aria-label", "面试演示模式");
      overlay.innerHTML =
        '<div class="awf-interview-topbar"><span class="awf-interview-brand">点·线·面·境 / INTERVIEW MODE</span>' +
        '<button type="button" class="awf-interview-exit">退出演示</button></div>' +
        '<div class="awf-interview-slide"></div>' +
        '<div class="awf-interview-controls">' +
          '<button type="button" class="awf-interview-nav" data-dir="prev">← 上一章</button>' +
          '<div class="awf-interview-progress"></div>' +
          '<button type="button" class="awf-interview-nav" data-dir="next">下一章 →</button>' +
        '</div>' +
        '<p class="awf-interview-kbd">← → 方向键切换章节 · Esc 退出</p>';
      document.body.appendChild(overlay);
      overlay.querySelector(".awf-interview-exit").addEventListener("click", stop);
      var navs = overlay.querySelectorAll(".awf-interview-nav");
      navs[0].addEventListener("click", function () {
        slideIndex = Math.max(0, slideIndex - 1); tipOpen = false; render();
      });
      navs[1].addEventListener("click", function () {
        slideIndex = Math.min(slides.length - 1, slideIndex + 1); tipOpen = false; render();
      });
      render();
    }
    function stop() {
      if (overlay) { overlay.remove(); overlay = null; }
    }
    document.addEventListener("keydown", function (event) {
      if (!overlay) return;
      if (event.key === "ArrowRight") { slideIndex = Math.min(slides.length - 1, slideIndex + 1); tipOpen = false; render(); }
      else if (event.key === "ArrowLeft") { slideIndex = Math.max(0, slideIndex - 1); tipOpen = false; render(); }
      else if (event.key === "Escape") { stop(); }
    });
    toggle.querySelector("[data-awf-interview-start]").addEventListener("click", start);
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
})();
</script>`;
}

function rewriteRootUrl(value, route) {
  const match = value.match(/^([^?#]*)([?#].*)?$/);
  const pathname = match?.[1] || "/";
  const suffix = match?.[2] || "";

  if (mode === "pages") {
    if (routeSet.has(pathname)) {
      const routePath = pathname === "/" ? "" : `${pathname.slice(1)}/`;
      return `${basePath}${routePath}${suffix}`;
    }
    return `${basePath}${pathname.slice(1)}${suffix}`;
  }

  const prefix = route === "/" ? "./" : "../";
  if (routeSet.has(pathname)) {
    const target = pathname === "/" ? "index.html" : `${pathname.slice(1)}/index.html`;
    return `${prefix}${target}${suffix}`;
  }
  return `${prefix}${pathname.slice(1)}${suffix}`;
}

async function writeRedirectPage() {
  const route = "/t2a-formal-summary";
  const targetUrl = rewriteRootUrl("/t2a-case-study#results", route);
  const html = `<!doctype html>
<html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>正式结果｜杜明音频作品集</title><meta http-equiv="refresh" content="0;url=${escapeHtml(targetUrl)}">
<link rel="canonical" href="${escapeHtml(targetUrl)}"></head>
<body><p>正式结果已并入完整案例研究。<a href="${escapeHtml(targetUrl)}">继续查看</a></p></body></html>`;
  const target = path.join(outputDir, route.slice(1), "index.html");
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, html, "utf8");
}

async function copyStaticAssets() {
  const clientDir = path.join(root, "dist", "client");
  await cp(clientDir, outputDir, {
    recursive: true,
    force: true,
    filter(source) {
      const relative = path.relative(clientDir, source).replaceAll("\\", "/");
      if (!relative) return true;
      if (relative === ".vite" || relative.startsWith(".vite/")) return false;
      if ([".assetsignore", "_headers"].includes(relative)) return false;
      const extension = path.extname(relative).toLowerCase();
      if ([".js", ".map", ".wav"].includes(extension)) return false;
      return true;
    },
  });

  const assetDir = path.join(outputDir, "assets");
  try {
    for (const entry of await readdir(assetDir)) {
      if (!entry.endsWith(".css")) continue;
      const cssPath = path.join(assetDir, entry);
      let css = await readFile(cssPath, "utf8");
      if (mode === "pages" && basePath !== "/") {
        css = css.replace(/url\((['"]?)\/(?!\/)/g, `url($1${basePath}`);
      }
      await writeFile(cssPath, css, "utf8");
    }
  } catch (error) {
    if (error?.code !== "ENOENT") throw error;
  }
}

function notFoundHtml() {
  const home = mode === "pages" ? basePath : "./index.html";
  return `<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>页面未找到｜杜明音频作品集</title></head><body><main><h1>页面未找到</h1><p><a href="${escapeHtml(home)}">返回作品集首页</a></p></main></body></html>`;
}

async function buildAssetReport() {
  const files = await walkFiles(outputDir);
  const groups = new Map([
    ["HTML", [".html"]],
    ["CSS", [".css"]],
    ["JavaScript", [".js"]],
    ["图片", [".png", ".jpg", ".jpeg", ".webp", ".svg", ".gif", ".avif"]],
    ["音频", [".mp3", ".aac", ".m4a", ".ogg", ".wav"]],
    ["视频", [".mp4", ".webm", ".mov"]],
    ["PDF", [".pdf"]],
  ]);
  const categories = [];
  for (const [category, extensions] of groups) {
    const selected = files.filter((file) => extensions.includes(path.extname(file).toLowerCase()));
    const bytes = await sumSizes(selected);
    categories.push({ category, files: selected.length, MiB: Number(formatMiB(bytes)) });
  }
  const totalBytes = await sumSizes(files);
  return {
    mode,
    basePath: mode === "pages" ? basePath : null,
    generatedAt: new Date().toISOString(),
    categories,
    totalFiles: files.length,
    totalBytes,
    totalMiB: Number(formatMiB(totalBytes)),
  };
}

async function walkFiles(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walkFiles(absolute));
    else files.push(absolute);
  }
  return files;
}

async function sumSizes(files) {
  let total = 0;
  for (const file of files) total += (await stat(file)).size;
  return total;
}

function normalizeBasePath(input) {
  const clean = `/${input}`.replace(/\/{2,}/g, "/").replace(/\/+$/, "");
  return clean === "" ? "/" : `${clean}/`;
}

function pathToImportUrl(file) {
  return new URL(`file:///${file.replaceAll("\\", "/")}`).href;
}

function escapeHtml(value) {
  return value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;");
}

function formatMiB(bytes) {
  return (bytes / 1024 / 1024).toFixed(2);
}

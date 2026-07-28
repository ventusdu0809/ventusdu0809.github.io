import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";

const targetArg = process.argv[2] || "pages-dist";
const offline = process.argv.includes("--offline");
const root = path.resolve(targetArg);
const basePath = normalizeBasePath(process.env.PAGES_BASE_PATH || "/");
const errors = [];

const requiredPages = [
  "index.html",
  "t2a-case-study/index.html",
  "t2a-formal-summary/index.html",
  "audio-validation-summary/index.html",
  "sound-practice/index.html",
  "resume/index.html",
  "404.html",
];

for (const relative of requiredPages) await requireFile(relative);
for (const relative of ["audio/B0008.mp3", "audio/B0152.mp3", "audio/B0099.mp3", "audio/B0092.mp3"]) {
  await requireFile(relative);
}

const files = await walkFiles(root);
const htmlFiles = files.filter((file) => file.endsWith(".html"));
const wavFiles = files.filter((file) => file.toLowerCase().endsWith(".wav"));
if (wavFiles.length) errors.push(`Deployment contains WAV files: ${wavFiles.length}`);
if (!files.some((file) => file.toLowerCase().endsWith(".pdf"))) errors.push("No PDF found in deployment output");

for (const file of htmlFiles) {
  const html = await readFile(file, "utf8");
  const relative = path.relative(root, file).replaceAll("\\", "/");
  inspectText(html, relative);
  const refs = [...html.matchAll(/\b(?:href|src|poster)=(?:"([^"]+)"|'([^']+)')/gi)]
    .map((match) => match[1] || match[2]);
  for (const reference of refs) await verifyReference(reference, file, relative);
}

for (const file of files.filter((candidate) => [".css", ".json", ".txt"].includes(path.extname(candidate).toLowerCase()))) {
  inspectText(await readFile(file, "utf8"), path.relative(root, file).replaceAll("\\", "/"));
}

const totalBytes = await sumSizes(files);
console.log(`Verified ${files.length} files (${(totalBytes / 1024 / 1024).toFixed(2)} MiB)`);
console.log(`HTML pages: ${htmlFiles.length}; MP3: ${files.filter((file) => file.endsWith(".mp3")).length}; PDF: ${files.filter((file) => file.endsWith(".pdf")).length}`);

if (totalBytes > 300 * 1024 * 1024) errors.push("Deployment exceeds 300 MiB target");
if (offline && totalBytes > 100 * 1024 * 1024) errors.push("Offline directory exceeds 100 MiB target");

if (errors.length) {
  console.error("\nStatic verification failed:");
  for (const error of [...new Set(errors)]) console.error(`- ${error}`);
  process.exit(1);
}

console.log("Static verification: PASS");

async function requireFile(relative) {
  try {
    const details = await stat(path.join(root, relative));
    if (!details.isFile() || details.size === 0) errors.push(`Missing or empty: ${relative}`);
  } catch {
    errors.push(`Missing: ${relative}`);
  }
}

function inspectText(text, relative) {
  const forbidden = [
    ["\u675c\u94ed", "incorrect Chinese name spelling"],
    ["fonts.googleapis.com", "Google Fonts dependency"],
    ["fonts.gstatic.com", "Google Fonts dependency"],
    ["localhost", "localhost reference"],
    ["127.0.0.1", "loopback reference"],
    ["file://", "file URL"],
    ["C:\\Users\\", "Windows absolute path"],
    ["sound-ventus.mingdu0809.workers.dev", "Cloudflare production dependency"],
  ];
  for (const [needle, label] of forbidden) {
    if (text.includes(needle)) errors.push(`${relative}: ${label}`);
  }
}

async function verifyReference(reference, htmlFile, htmlRelative) {
  if (!reference || /^(?:https?:|mailto:|tel:|data:|#)/i.test(reference)) return;
  const clean = decodeURIComponent(reference.split("#")[0].split("?")[0]);
  if (!clean) return;

  let resolved;
  if (!offline && clean.startsWith("/")) {
    if (basePath !== "/" && !clean.startsWith(basePath)) {
      errors.push(`${htmlRelative}: root reference bypasses base path: ${reference}`);
      return;
    }
    const stripped = basePath === "/" ? clean.slice(1) : clean.slice(basePath.length);
    resolved = path.join(root, stripped);
  } else {
    resolved = path.resolve(path.dirname(htmlFile), clean);
  }

  if (!resolved.startsWith(root)) {
    errors.push(`${htmlRelative}: reference escapes output: ${reference}`);
    return;
  }
  try {
    const details = await stat(resolved);
    if (details.isDirectory()) await stat(path.join(resolved, "index.html"));
  } catch {
    errors.push(`${htmlRelative}: missing reference ${reference}`);
  }
}

async function walkFiles(directory) {
  const output = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) output.push(...await walkFiles(absolute));
    else output.push(absolute);
  }
  return output;
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

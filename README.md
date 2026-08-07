# 杜明｜AI 音频评测与生成式音频评测作品集

面向公开求职展示的静态作品集，内容包括 Text-to-Audio 人工听评、评分标准、Badcase 分析、隐藏重复、受控模型比较、音频资产验收，以及游戏运行时音频案例。

本仓库只保存公开网页、代表性压缩试听和可公开的方法材料，不包含完整生成音频库、参考数据集、原始评分源或私密项目数据。

## 在线入口

- GitHub Pages：<https://ventusdu0809.github.io/>
- GitHub 仓库：<https://github.com/ventusdu0809/ventusdu0809.github.io>
- Cloudflare 备用站：`https://sound-ventus.mingdu0809.workers.dev/`
- 离线入口：运行 `npm run build:offline` 生成 ZIP。

GitHub Pages 在中国大陆的速度和稳定性需要通过真实无 VPN 网络验证；在结果确认前，Cloudflare 与离线包继续作为备用入口。

## 技术栈

- React 19 + Next.js 16 App Router
- vinext 0.0.50 + Vite 8
- Cloudflare Worker（现有线上版本）
- GitHub Actions + GitHub Pages（静态多页面版本）
- Node.js 24 / npm 11（最低 Node.js 要求为 22.13）

## 本地运行

```powershell
npm ci
npm run dev
```

生产构建：

```powershell
npm run build
```

现有 Cloudflare 构建输出为 `dist/client` 与 `dist/server`。GitHub Pages 不直接发布该目录，而是在完成生产构建后导出真实静态页面。

## GitHub Pages 构建

用户主页仓库：

```powershell
$env:PAGES_BASE_PATH = "/"
npm run build:pages
npm run verify:pages
```

项目仓库：

```powershell
$env:PAGES_BASE_PATH = "/sound-ventus-portfolio/"
npm run build:pages
npm run verify:pages
```

输出目录为 `pages-dist/`。核心路由会生成真实文件：

```text
pages-dist/
├── index.html
├── t2a-case-study/index.html
├── t2a-formal-summary/index.html
├── audio-validation-summary/index.html
├── audio-world-framework/index.html
└── resume/index.html
```

GitHub Actions 会根据仓库名自动选择 `/` 或 `/<repository>/`，页面组件不硬编码仓库名称或 `github.io` 域名。

## 自动部署

`.github/workflows/deploy-pages.yml` 在以下情况运行：

- 推送到 `main`；
- 在 GitHub Actions 页面手动触发。

流程使用锁文件执行 `npm ci`，随后构建、验证、上传 Pages artifact，并由 GitHub 官方 Pages Action 发布。当前仓库的 Pages 发布来源已设置为 `GitHub Actions`，并强制使用 HTTPS。

## 离线包

```powershell
npm run build:offline
npm run verify:offline
```

输出：`release/杜明_AI音频评测作品集_离线版.zip`。

离线包与 Pages 共用页面和素材源；Bilibili 与飞书属于联网补充内容。详细说明见 `OFFLINE_PACKAGE.md`。

## Cloudflare 源码包

```powershell
npm run package:cloudflare-source
```

输出：`release/杜明_AI音频评测网站_Cloudflare源码包_2026-07-28.zip`。部署步骤见 `CLOUDFLARE_UPDATE_HANDOFF.md`。

## 目录

```text
app/                         页面、样式和公开数据映射
app/audio-world-framework/   《点·线·面·境》方法论案例页
public/                      图片、MP3、视频与公开下载材料
worker/                      现有 Cloudflare Worker 入口
scripts/export-static.mjs    Pages / 离线静态导出
scripts/verify-static.mjs    路由、资源、路径、体积和隐私检查
scripts/package-offline.ps1  离线 ZIP 生成
scripts/package-cloudflare-source.ps1  Cloudflare 源码 ZIP 生成
.github/workflows/           GitHub Pages 自动部署
tests/                       原 Cloudflare 渲染回归测试
```

## 《点·线·面·境》页面结构

路由：`/audio-world-framework`（首页导航「场景框架」与页脚均有入口）。

文件：

```text
app/audio-world-framework/
├── page.tsx                  页面主文件（14 个 section）
├── data.ts                   全部文案、表格与真实性边界声明
├── audio-world-framework.css 页面样式（awf-* 前缀，独立配色变量）
├── core-flow.tsx             核心流程图交互组件（client）
├── hexagram.tsx              六爻二进制状态交互组件（client）
└── interview-mode.tsx        面试演示模式控制器（client）
```

页面结构（14 个 section）：

1. HeroSection — 点·线·面·境主视觉 + 标签 + 一句话定位
2. CoreFlowDiagram — Audio Asset → Event → Relation → Scene → Interaction → Meaning 交互流程图
3. ProblemStatement — 当前音频评测缺少什么
4. PointLineSceneMeaningSection — 四层能力拆解（含点线面境各自 Bad Case 标签）
5. MiddlewareComparison — Wwise ↔ AI 音频对应 + AI Audio Scene Middleware 流程
6. WorldStateAnalogy — 六爻二进制状态交互 + 对应关系 + 免责声明
7. EvaluationMatrix — 分层评测矩阵 + 问题定位示例
8. AnnotationSchema — 四层标注流程 + YAML Schema
9. AudioSceneCaseStudy — 同一 Prompt 四层拆解 + Bad Case 定位
10. ExistingProjectEvidence — 已完成 T2A 数据 + 一致性 + 下一阶段（Proposed）
11. RoleApplication — 评测设计 / 标注质控 / 研发协作
12. WhyMeSection — 能力来源 + 边界声明
13. InterviewModeController — 右上角「普通浏览 / 面试演示」切换
14. FooterDisclaimer — 页脚 + 真实性免责声明

静态版交互说明：GitHub Pages 是纯静态托管，`export-static.mjs` 会剥离 React 运行时。为此该页面的三个交互组件（流程图、六爻、面试演示）在静态导出时由注入的 vanilla 增强脚本（`awfStaticEnhancement()`）读取组件渲染出的 `data-*` 属性驱动，行为与 Cloudflare 版一致。修改这三个组件时，如改变 `data-*` 结构，需同步更新 `scripts/export-static.mjs` 中的增强脚本。

真实性边界：页面中「已完成」数据（600 样本 / 660 试听 / OVL within-1 95.0% / REL within-1 97.5% / Primary Bad Case Exact 67.5%）来自 T2A 评测项目；Scene Coherence、情绪意境评测、AI Audio Middleware 均为「Proposed / Next Step」，页面明确标注，不表述为已完成。

## 音频与内容使用

- T2A 页面只发布 4 条与评分锚点和 Badcase 说明对应的 10 秒 MP3；原 WAV 不进入 Pages 或离线产物。
- 游戏项目视频和文档由杜明确认可公开展示。
- 网站材料用于个人作品集与方法展示，不代表模型官方排名或第三方产品背书。
- 完整七类 FAD / JS 保持 `NOT RUN`；客观指标不替代人工语义裁决。

## 已知限制

- GitHub Pages 是纯静态托管，不运行 Cloudflare Worker、D1、R2 或服务端接口。
- Bilibili iframe 和飞书链接依赖外部网络；离线环境不可播放或打开。
- 中国大陆网络可用性必须以真实家庭宽带和移动网络实测为准。
- 当前项目是单评测员 T2A 评测 PoC；多评测员一致性与未执行专项测试不会表述为已完成。

## 审计与验证

- `GITHUB_PAGES_AUDIT.md`：迁移前技术、资源、路径与隐私审计。
- `GITHUB_PAGES_VERIFICATION.md`：构建、部署、浏览器与网络验证记录。
- 迁移前 Git 标签：`pre-github-pages-2026-07-27`。
- 部署功能分支：`feat/github-pages-deployment`。

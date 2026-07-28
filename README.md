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
public/                      图片、MP3、视频与公开下载材料
worker/                      现有 Cloudflare Worker 入口
scripts/export-static.mjs    Pages / 离线静态导出
scripts/verify-static.mjs    路由、资源、路径、体积和隐私检查
scripts/package-offline.ps1  离线 ZIP 生成
scripts/package-cloudflare-source.ps1  Cloudflare 源码 ZIP 生成
.github/workflows/           GitHub Pages 自动部署
tests/                       原 Cloudflare 渲染回归测试
```

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

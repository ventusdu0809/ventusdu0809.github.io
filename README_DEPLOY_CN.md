# 杜明｜音频作品集：Cloudflare 部署说明

当前源码对应 T2A Evaluation Program 网站版本：既保留 Phase 1 单模型基线，也展示 Phase 2 Stable Audio Open 1.0 与 Stable Audio 3 Medium 的受控配对比较。公开报告、复测与 Badcase 证据位于 `public/downloads/t2a-v3-evidence/`。

## 1. 部署前准备

在终端执行以下命令查看本机 Node.js 版本：

```bash
node --version
```

本项目要求 **Node.js >= 22.13.0**（以 `package.json` 的 `engines.node` 为准）；若版本不满足，请先升级 Node.js。

## 2. 本地安装与构建

在本源码目录执行：

```bash
npm ci
npm run build
```

`node_modules`、构建输出目录（如 `dist`）不包含在源码包中；部署平台应自行安装依赖并执行构建。

构建后建议至少检查以下页面：

- `/`：作品集首页
- `/t2a-case-study`：完整 T2A 评测案例研究与公开证据下载
- `/t2a-formal-summary`：重定向至案例研究的正式结果章节
- `/audio-validation-summary`：音频资产验收摘要
- `/resume`：网页版简历

部署前，请先查看以下文件和目录，确认当前构建与运行时设置：

- `package.json`（依赖、Node.js 版本和构建脚本；本项目的构建脚本为 `vinext build`）
- `vite.config.ts`（vinext、Cloudflare Vite 插件与 worker 入口）
- `worker/`（worker 代码）
- 现有 Wrangler / Cloudflare 配置（如 `.openai/hosting.json`、项目内其他配置文件）

## 3. 推荐：Cloudflare Workers

本项目包含 vinext、Cloudflare Vite 插件与 worker 入口，建议按 Cloudflare Workers 的部署方式继续配置并发布。

1. 将本源码上传至你自己的 GitHub / GitLab 仓库，或在本地完成依赖安装与构建验证。
2. 根据本项目当前的 `package.json`、`vite.config.ts`、`worker/` 以及现有 Wrangler 配置，在 Cloudflare 中创建并绑定你自己的 Worker 项目。
3. 首次部署后，访问预览地址，确认视频、音频及站内报告页面均可访问。

本说明不提供通用的 `wrangler deploy` 命令：实际发布参数取决于你在 Cloudflare 中创建的 Worker、域名和绑定配置，请以项目代码与自己的 Cloudflare 配置为准。

## 4. 如坚持使用 Cloudflare Pages

Cloudflare Pages 不是本项目的首选路径。若你决定使用 Pages，需要自行完成相应适配；本源码包不保证开箱即用。

本源码包不包含任何部署密钥、访问令牌或平台凭据。

部署后请同时抽查 `public/downloads/t2a-v3-evidence/` 中的报告、CSV 与审计 ZIP 是否能直接下载；`SHA256SUMS.txt` 可用于核验公开证据文件。

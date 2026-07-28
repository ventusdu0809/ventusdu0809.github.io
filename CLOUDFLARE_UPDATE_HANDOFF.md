# Cloudflare 更新交接

此源码包与 GitHub Pages 当前版本使用同一套内容源。它不包含 `node_modules`、构建产物、Git 历史、环境变量或未使用的 WAV 原始音频。

## 本地部署

1. 解压源码包，在项目根目录执行 `npm ci`。
2. 执行 `npm run lint`、`npm run typecheck` 和 `npm run test`。
3. 执行 `npm run build`，确认生成 `dist/client`。
4. 登录你的 Cloudflare 账号后执行 `npx wrangler deploy`。

`wrangler.json` 指向 `worker/index.ts`，静态资源目录为 `dist/client`。部署前请在 Cloudflare 控制台确认目标 Worker 名称、域名绑定和权限；本包不会改动既有线上 Worker。

## 核心变更

- 首页改为 AI 音频评测的三项核心叙事，保留一个主行动按钮。
- T2A 页面默认展示评分、听评流程、模型比较、Badcase、隐藏重复与试听案例。
- 统计复核、客观指标边界、版本审计改为默认关闭的折叠内容。
- 全站职位表述统一为“AI 音频评测 / 生成式音频评测（Text-to-Audio）”。

## 发布后检查

- 首页、`/t2a-case-study`、`/audio-validation-summary`、`/resume` 均可打开。
- 四条 MP3 试听可播放。
- 报告与审计说明可下载。
- `T2A` 页面中三个“需要时再展开”的区域初始为关闭状态。

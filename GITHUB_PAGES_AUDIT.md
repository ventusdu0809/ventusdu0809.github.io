# GitHub Pages 部署前审计

审计日期：2026-07-27  
项目：杜明｜生成式音频评测与游戏音频作品集  
审计对象：`portfolio-cloudflare-staging-v2`

## 1. 当前技术结构

- 前端：React 19、Next.js 16 App Router。
- 构建层：vinext 0.0.50、Vite 8。
- 当前托管：Cloudflare Worker + 静态资源绑定。
- 包管理器：npm，仓库已有 `package-lock.json`，生产安装应使用 `npm ci`。
- Node.js 要求：`>=22.13.0`；本机审计版本为 Node.js `v24.18.0`。
- 当前本地启动：`npm run dev`。
- 当前生产构建：`npm run build`。
- 当前输出：`dist/client` 与 `dist/server`。
- 当前 Cloudflare 入口：`worker/index.ts`；配置文件为 `wrangler.json`。
- `.openai/hosting.json` 中未启用 D1 或 R2。

## 2. 页面与路由

现有核心路由：

- `/`
- `/t2a-case-study`
- `/t2a-formal-summary`（当前为服务端跳转）
- `/audio-validation-summary`
- `/resume`

这些页面由服务端渲染入口提供，不能将 `dist/client` 原样发布到 GitHub Pages，否则子页面直接打开或刷新时会出现 404，部分 React Server Components 请求也无法工作。

## 3. GitHub Pages 兼容性判断

结论：**可以迁移，但需要增加独立的静态多页面导出层，不能直接复用 Cloudflare Worker 运行方式。**

兼容方案：

1. 保留原有 `npm run build`、Worker 与 Wrangler 配置；
2. 构建后调用本地 `dist/server` 渲染核心页面；
3. 输出真实静态页面到 `pages-dist/`，例如 `t2a-case-study/index.html`；
4. 移除静态版本不需要的服务端/RSC脚本，保留原生图片、音频、视频和链接功能；
5. 根据仓库类型统一处理 `/` 或 `/<repository>/` 基础路径；
6. 另用同一内容源输出完全离线的目录和 ZIP。

## 4. 动态能力与 Cloudflare 依赖

- 当前网站没有作品集运行所必需的数据库、用户登录、表单提交或私有 API。
- Worker 中的 `/_vinext/image` 为图像优化入口，不是核心内容接口；当前页面未发现 `next/image` 使用。
- `app/chatgpt-auth.ts` 使用 `app.local` 作为 Codex 预览辅助逻辑，未发现被作品集页面引用，不属于公开站点依赖。
- 核心图片、图表、音频、视频、报告和下载材料均位于 `public/`，可以随静态站发布。
- Bilibili 播放器与飞书技术文档属于可选外部内容；核心案例文字和本地媒体不依赖这些外部服务。

因此，GitHub Pages 版本可在 Cloudflare Worker 下线时独立展示核心作品集；Bilibili 与飞书链接在离线环境下不能加载，离线包需要明确提示。

## 5. 资源审计

`public/` 当前约 43.18 MiB：

| 类别 | 文件数 | 大小（约） |
|---|---:|---:|
| 视频 | 2 | 28.69 MiB |
| 音频 | 7 | 11.78 MiB |
| 下载材料 | 31 | 1.59 MiB |
| 根目录图片与图标 | 5 | 1.12 MiB |

音频现状：7 个 WAV 各约 1.68 MiB，页面实际使用 B0008、B0152、B0099、B0092 四条。Pages 正式产物应改用 192 kbps 左右的 MP3，并排除 WAV 与未使用音频。播放器保持手动加载/播放，不启用自动播放。

最大单文件为 `hitstop-before.mp4`，约 21.81 MiB；第二个视频约 6.88 MiB。当前总体积低于本项目 300 MB 目标及离线包 100 MB 目标，但仍需统计最终构建产物。

## 6. 外部资源与路径风险

已发现：

- Google Fonts：当前由 `app/layout.tsx` 外链加载，应改为系统字体栈，避免中国大陆与离线环境加载失败。
- Bilibili：4 个嵌入播放器及相关外链；属于补充展示，不应作为核心内容唯一来源。
- 飞书：1 个技术文档外链；属于补充材料。
- Cloudflare 域名：简历页文字中写有 `sound-ventus.mingdu0809.workers.dev`，不应作为 GitHub Pages 核心资源依赖。
- 大量站内资源使用 `/audio/...`、`/video/...`、`/downloads/...` 根路径；项目仓库部署时必须统一加基础路径。

未发现页面资源引用 `file://`、`localhost`、`127.0.0.1` 或 `C:\Users\...`。

## 7. 隐私与公开信息

- 初步文本扫描未发现 API Key、Access Token、Cookie 或 `.env` 内容。
- 当前公开联系方式包含用户主动用于求职展示的 QQ 邮箱。
- 正式提交前仍需对源代码、构建产物及 ZIP 进行二次敏感信息扫描。
- 原始 200/400 条音频库、1,640 条参考 WAV、未脱敏评分源和本机临时文件不得进入公开仓库或 Pages 产物。
- 姓名统一使用“杜明”，不使用其他同音写法。

## 8. Git 状态风险

当前网站目录位于上级 Git 工作树 `C:\Users\ventus\Documents\AI音频评测` 内。该上级仓库没有任何提交，并包含大量与网站无关的未跟踪文件，不适合直接作为公开作品集仓库提交或推送。

计划在 `portfolio-cloudflare-staging-v2` 内建立独立 Git 仓库，以隔离分析脚本、历史压缩包、临时目录及其他项目文件。部署修改在独立分支 `feat/github-pages-deployment` 完成，不覆盖现有 Cloudflare 版本。

## 9. 需要新增或修改的文件

预计新增：

- `.github/workflows/deploy-pages.yml`
- `scripts/export-static.mjs`
- `scripts/verify-static.mjs`
- `scripts/package-offline.ps1`
- `GITHUB_PAGES_VERIFICATION.md`
- `OFFLINE_PACKAGE.md`
- Web 用 MP3 文件

预计修改：

- `package.json`
- `app/layout.tsx`
- `app/page.tsx`
- `app/t2a-case-study/page.tsx`
- `app/resume/page.tsx`
- `.gitignore`
- `README.md`

原 `vite.config.ts`、`wrangler.json`、`worker/index.ts` 与 Cloudflare 发布方式原则上保持不变。

## 10. 仓库与网址方案

优先顺序：

1. 若 `<GitHub用户名>.github.io` 未被占用，使用用户主页仓库，网址为 `https://<GitHub用户名>.github.io/`；
2. 若已占用，使用 `sound-ventus-portfolio`，网址为 `https://<GitHub用户名>.github.io/sound-ventus-portfolio/`。

基础路径由构建工作流根据仓库名自动计算，不在页面组件中硬编码 `github.io`，以便未来绑定自定义域名。

## 11. 主要风险与处理

| 风险 | 处理方式 |
|---|---|
| 服务端路由无法在 Pages 运行 | 导出真实多页面 HTML |
| 项目仓库子路径导致资源 404 | 单一基础路径配置与构建后链接检查 |
| RSC 脚本请求服务端 | Pages 产物移除不必要的 RSC/水合脚本 |
| WAV 体积与浏览器加载 | 转 MP3；Pages 排除 WAV |
| Google Fonts 访问不稳定 | 改为系统字体栈 |
| 外部 iframe 离线不可用 | 离线版替换为说明和外链文本 |
| 上级 Git 工作树混入无关内容 | 网站目录建立独立仓库 |
| 中国大陆访问稳定性未知 | 发布后由真实无 VPN 网络实测并如实记录 |

## 12. 验证边界

本地可验证构建、静态路由、资源存在性、链接、敏感字符串、体积、桌面和常见移动宽度布局。GitHub Actions 与正式网址只能在仓库创建并推送后验证。

家庭宽带、手机移动网络、不同运营商、无 VPN 访问等必须使用真实网络测试；若当前执行环境不能代表这些条件，验证报告将明确标记为 `NOT RUN / 待用户实测`，不会用部署成功替代网络可用性结论。

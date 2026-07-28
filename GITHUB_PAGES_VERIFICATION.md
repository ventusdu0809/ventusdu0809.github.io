# GitHub Pages 验证记录

状态：GitHub Pages 已发布；自动构建、静态资源与公开 HTTP 检查通过。

部署日期：2026-07-27

负责人：杜明

## 构建信息

| 项目 | 记录 |
|---|---|
| 实施提交 | `f0a9f7b` |
| PR 合并提交 | `76dec23c3d98b0bb3dd5fde45d0aca491475f5c5` |
| Node.js | 本地 v24.18.0；Actions Node 24 |
| npm | 本地 11.16.0 |
| 安装命令 | `npm ci` |
| 构建命令 | `npm run build:pages` |
| 校验命令 | `npm run verify:pages` |
| 构建输出 | `pages-dist/` |
| 部署工作流 | `.github/workflows/deploy-pages.yml` |
| 正式网址 | `https://ventusdu0809.github.io/` |
| GitHub 仓库 | `https://github.com/ventusdu0809/ventusdu0809.github.io` |
| Pull Request | `https://github.com/ventusdu0809/ventusdu0809.github.io/pull/1` |
| Actions 运行 | `https://github.com/ventusdu0809/ventusdu0809.github.io/actions/runs/30238249225` |
| 发布来源 | GitHub Actions workflow |
| HTTPS | 强制启用 |
| Pages 产物 | 54 个文件，32.48 MiB |
| 离线 ZIP | 32.17 MiB |

## 验证矩阵

| 检查项 | 状态 | 证据或说明 |
|---|---|---|
| 生产构建 | PASS | `npm test` 与 `npm run build:pages` 成功 |
| 原站回归测试 | PASS | 6/6 |
| 代码检查 | PASS | ESLint 无报错 |
| 静态多页面导出 | PASS | 6 个 HTML；根路径与项目子路径两种 base 均通过 |
| 首页 | PASS | HTTP 200；Chrome 正常渲染，标题与姓名正确 |
| T2A 案例直接打开与刷新 | PASS | HTTP 200；直接访问及刷新均正常 |
| 音频资源与解码 | PASS | 4 条 MP3 均 readyState=4、duration=10s |
| 音频播放 / 暂停 / 拖动 | 待人工复核 | 浏览器已确认资源可解码；最终站点仍需人工听声与拖动进度条 |
| PDF 存在 | PASS | 发布产物包含 1 份 PDF；线上打开待发布后复核 |
| 核心资源 404 | PASS（本地） | 自动逐项解析站内引用；正式站待发布后复核 Network |
| 本地路径 / localhost | PASS | 发布产物文本扫描无相关引用 |
| Cloudflare 核心依赖 | PASS | 无 Worker 核心资源依赖；Bilibili/飞书仅为补充外链 |
| 敏感信息 | PASS（初扫） | 未发现密钥、Token、Cookie 或环境变量内容；提交前再扫一次 |
| Windows Chrome | PASS（核心项） | 首页、子页、刷新、前进/后退、媒体解码、控制台均通过 |
| Windows Edge | NOT RUN | 当前未建立可审计的 Edge 自动检查会话 |
| 375 / 390 / 430 px | PASS | 无整页横向溢出；音频播放器不溢出；宽表格在容器内滚动 |
| 125% / 150% 缩放 | 待人工复核 | 自动浏览器会话无法可靠读取实际缩放倍率 |
| GitHub Actions | PASS | Run `30238249225`，conclusion=`success` |
| Pages deployment | PASS | Pages status=`built`，build_type=`workflow`，HTTPS enforced |
| 正式首页 HTTP | PASS | HTTP 200；响应约 27 KB |
| 正式案例页 HTTP | PASS | `/t2a-case-study/` HTTP 200，可直接访问 |
| 正式 MP3 | PASS | `/audio/B0008.mp3` HTTP 200，`audio/mp3`，241,415 bytes |
| 正式 PDF | PASS | 方法 PDF HTTP 200，`application/pdf`，277,864 bytes |
| 无 VPN 家庭宽带 | NOT RUN | 必须由真实网络实测，不能用构建成功替代 |
| 手机移动网络 | NOT RUN | 必须由真实移动网络实测 |
| 两家大陆运营商 | NOT RUN | 当前执行环境不具备该网络条件 |

正式站的命令行公开访问检查成功，但 Chrome 自动检查正式域名时连接超时；因此不能把本次检查当作中国大陆真实浏览器网络可用性的证据。投递前仍应在家庭宽带和手机移动网络中分别打开首页、案例页并播放音频。

## 本地资源统计

| 类别 | 文件数 | 大小（MiB） |
|---|---:|---:|
| HTML | 6 | 0.07 |
| CSS | 1 | 0.08 |
| 外部 JavaScript 文件 | 0 | 0.00 |
| 图片 | 5 | 1.12 |
| 音频 | 4 | 0.92 |
| 视频 | 2 | 28.69 |
| PDF | 1 | 0.26 |
| 总计 | 54 | 32.48 |

## 外部资源边界

Bilibili 播放器与飞书技术文档为联网补充材料，不是核心案例内容的唯一载体。GitHub Pages 核心页面、图表、四条 T2A 试听、Hitstop A/B 视频及公开报告均由站点自身托管。Google Fonts 已移除。

## 回滚

- 迁移前基线标签：`pre-github-pages-2026-07-27`；
- 功能分支：`feat/github-pages-deployment`；
- Cloudflare 的 `wrangler.json`、Worker 入口和域名保持不变；
- 若 Pages 版本异常，可将公开入口切回 Cloudflare，并从上述标签恢复迁移前网站源代码；
- 不使用强制覆盖主分支作为回滚手段。

## 2026-07-28 内容架构更新

本次更新将首页改为招聘导向的三项核心叙事，并重写 T2A 案例页的默认阅读层级。

| 检查项 | 状态 | 证据或说明 |
|---|---|---|
| ESLint | PASS | `npm run lint` 成功 |
| TypeScript | PASS | `npm run typecheck` 成功 |
| 页面渲染测试 | PASS | 4/4；检查三个核心叙事、默认关闭折叠区、音频 aria-label 与共享文案源 |
| Pages 静态导出 | PASS | `npm run build:pages` 成功 |
| Pages 静态校验 | PASS | 54 个文件，32.46 MiB |
| Cloudflare 源码包 | PASS | `npm run package:cloudflare-source`；32.27 MiB |

待本次合并至 `main` 后，由 GitHub Actions 重新发布并补充新的工作流运行链接。

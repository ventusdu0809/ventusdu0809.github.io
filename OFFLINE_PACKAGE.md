# 离线作品集

线上 GitHub Pages、Cloudflare 备用站和离线 ZIP 共用同一套页面与素材源，不维护相互脱节的副本。

## 生成方法

Windows PowerShell：

```powershell
npm ci
npm run build:offline
npm run verify:offline
```

输出：

```text
release/
└── 杜明_AI音频评测作品集_离线版.zip
```

解压后双击根目录 `index.html`。核心页面、图片、图表、4 条 T2A MP3 试听、2 个本地视频及下载材料均可离线读取。Bilibili 播放器和飞书文档属于外部补充内容，离线时显示提示或保留为联网链接。

## 约束

- ZIP 目标小于 100 MiB；
- 不包含 `node_modules`、构建缓存、环境变量、原始 WAV 库或未使用的音频；
- 不依赖 GitHub Pages、Cloudflare、Google Fonts 或本地开发服务器；
- 原始内容更新后必须重新构建，不直接编辑 `offline-dist/` 或 ZIP。

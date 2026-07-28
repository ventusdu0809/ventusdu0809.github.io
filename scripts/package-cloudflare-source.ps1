$ErrorActionPreference = "Stop"

$projectRoot = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
$releaseDir = Join-Path $projectRoot "release"
$stagingDir = Join-Path $releaseDir "cloudflare-source-staging"
$packageFolder = Join-Path $stagingDir "杜明_AI音频评测网站源码_2026-07-28"
$zipPath = Join-Path $releaseDir "杜明_AI音频评测网站_Cloudflare源码包_2026-07-28.zip"

New-Item -ItemType Directory -Path $releaseDir -Force | Out-Null
if (Test-Path -LiteralPath $stagingDir) {
  Remove-Item -LiteralPath $stagingDir -Recurse -Force
}
New-Item -ItemType Directory -Path $packageFolder -Force | Out-Null

$include = @(
  ".github", ".openai", "app", "public", "scripts", "src", "worker",
  "cloudflare-env.d.ts", "eslint.config.mjs", "next.config.ts", "package.json", "package-lock.json",
  "postcss.config.mjs", "README.md", "README_DEPLOY_CN.md", "tsconfig.json", "vite.config.ts", "wrangler.json",
  "GITHUB_PAGES_AUDIT.md", "GITHUB_PAGES_VERIFICATION.md", "OFFLINE_PACKAGE.md",
  "CONTENT_AUDIT_BEFORE_REWRITE.md", "CLOUDFLARE_UPDATE_HANDOFF.md"
)

foreach ($item in $include) {
  $source = Join-Path $projectRoot $item
  if (-not (Test-Path -LiteralPath $source)) {
    throw "缺少应打包文件：$item"
  }
  Copy-Item -LiteralPath $source -Destination $packageFolder -Recurse -Force
}

Get-ChildItem -LiteralPath (Join-Path $packageFolder "public") -Recurse -File -Filter "*.wav" |
  ForEach-Object { Remove-Item -LiteralPath $_.FullName -Force }

if (Test-Path -LiteralPath $zipPath) {
  Remove-Item -LiteralPath $zipPath -Force
}
Compress-Archive -LiteralPath $packageFolder -DestinationPath $zipPath -CompressionLevel Optimal

$zip = Get-Item -LiteralPath $zipPath
if ($zip.Length -ge 100MB) {
  throw "Cloudflare 源码 ZIP 超过 100 MiB：$([math]::Round($zip.Length / 1MB, 2)) MiB"
}

Remove-Item -LiteralPath $stagingDir -Recurse -Force
Write-Output "Cloudflare source package: $zipPath"
Write-Output "Size: $([math]::Round($zip.Length / 1MB, 2)) MiB"

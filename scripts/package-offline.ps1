$ErrorActionPreference = "Stop"

$projectRoot = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
$sourceDir = Join-Path $projectRoot "offline-dist"
$releaseDir = Join-Path $projectRoot "release"
$zipPath = Join-Path $releaseDir "杜明_AI音频评测作品集_离线版.zip"

if (-not (Test-Path -LiteralPath (Join-Path $sourceDir "index.html") -PathType Leaf)) {
  throw "offline-dist/index.html 不存在，请先运行 npm run build:offline:dir。"
}

New-Item -ItemType Directory -Path $releaseDir -Force | Out-Null
if (Test-Path -LiteralPath $zipPath) {
  Remove-Item -LiteralPath $zipPath -Force
}

Compress-Archive -Path (Join-Path $sourceDir "*") -DestinationPath $zipPath -CompressionLevel Optimal

$sizeMiB = [math]::Round((Get-Item -LiteralPath $zipPath).Length / 1MB, 2)
if ($sizeMiB -ge 100) {
  throw "离线 ZIP 为 $sizeMiB MiB，超过 100 MiB 目标。"
}

Write-Output "Offline package: $zipPath"
Write-Output "Size: $sizeMiB MiB"

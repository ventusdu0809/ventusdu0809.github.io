import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "杜明｜AI音频与音视频生成评测作品集",
  description:
    "杜明的 AI 音频与音视频生成评测作品集，包含 Text-to-Audio 主观听评、Bad Case 诊断、音视频生成受控回归、游戏音频与音频资产质量控制实践。",
  authors: [{ name: "杜明" }],
  creator: "杜明",
  keywords: ["AI 音频评测", "生成式音频评测", "T2A", "T2VA", "Point-Line-Scene", "PLS", "Audio-Visual Generation Evaluation", "Controlled Regression", "游戏音频", "Bad Case"],
  openGraph: {
    title: "杜明｜AI音频与音视频生成评测作品集",
    description:
      "Text-to-Audio 主观听评、两轮音视频生成诊断评测、游戏音频与音频资产质量控制实践。",
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "杜明｜AI音频与音视频生成评测作品集",
    description:
      "Text-to-Audio 主观听评、两轮音视频生成诊断评测、游戏音频与音频资产质量控制实践。",
    images: ["/og.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#F3EFE6",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <head />
      <body>{children}</body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "杜明｜T2A、音视频生成评测与PLS框架",
  description:
    "杜明的AI音频评测作品集：Text-to-Audio人工听评、两轮诊断性音视频生成评测，以及Point–Line–Scene分层感知评测框架。",
  authors: [{ name: "杜明" }],
  creator: "杜明",
  keywords: ["AI 音频评测", "生成式音频评测", "T2A", "T2VA", "Point-Line-Scene", "PLS", "Audio-Visual Generation Evaluation", "Controlled Regression", "游戏音频", "Bad Case"],
  openGraph: {
    title: "杜明｜T2A、音视频生成评测与PLS框架",
    description:
      "Text-to-Audio人工听评、两轮诊断性Audio-Visual Generation Evaluation与Point–Line–Scene框架。",
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "杜明｜T2A、音视频生成评测与PLS框架",
    description:
      "Text-to-Audio人工听评、两轮诊断性Audio-Visual Generation Evaluation与Point–Line–Scene框架。",
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

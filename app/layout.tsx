import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "杜明｜AI音频评测与生成式音频评测",
  description:
    "杜明的AI音频评测作品集，展示Text-to-Audio人工听评、评分标准、Badcase分析、隐藏重复和模型比较。",
  authors: [{ name: "杜明" }],
  creator: "杜明",
  keywords: ["AI 音频评测", "生成式音频评测", "T2A", "游戏音频", "Badcase"],
  openGraph: {
    title: "杜明｜AI音频评测与生成式音频评测",
    description:
      "Text-to-Audio人工听评、评分标准、Badcase分析、隐藏重复和模型比较。",
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "杜明｜AI音频评测与生成式音频评测",
    description:
      "Text-to-Audio人工听评、评分标准、Badcase分析、隐藏重复和模型比较。",
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

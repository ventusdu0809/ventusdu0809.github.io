import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "杜明｜AI音视频生成评测与声音设计",
  description:
    "杜明的AI音视频生成评测作品集，展示两轮诊断性评测、Controlled Regression、Bad Case失败定位与音频质量判断。",
  authors: [{ name: "杜明" }],
  creator: "杜明",
  keywords: ["AI 音视频生成评测", "Audio-Visual Generation Evaluation", "Controlled Regression", "游戏音频", "Bad Case"],
  openGraph: {
    title: "杜明｜AI音视频生成评测与声音设计",
    description:
      "两轮诊断性评测、Controlled Regression、Bad Case失败定位与音频质量判断。",
    images: ["/og-cross-round-v1.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "杜明｜AI音视频生成评测与声音设计",
    description:
      "两轮诊断性评测、Controlled Regression、Bad Case失败定位与音频质量判断。",
    images: ["/og-cross-round-v1.png"],
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

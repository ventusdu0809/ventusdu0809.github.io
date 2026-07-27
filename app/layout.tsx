import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "杜明｜生成式音频评测与游戏音频",
  description:
    "杜明的声音作品集：两阶段 T2A Evaluation Program、SAO1 与 Stable Audio 3 Medium 受控比较、人工听评、Badcase、音频交付验收与游戏运行时案例。",
  openGraph: {
    title: "杜明｜生成式音频评测与游戏音频",
    description:
      "两阶段 T2A 音效评测、受控模型比较、人工 OVL/REL、Badcase、隐藏重复、代码数据复核与游戏音频实践。",
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "杜明｜生成式音频评测与游戏音频",
    description:
      "T2A Evaluation Program、受控模型比较、游戏音频设计与音频质量验收作品集。",
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
      <head>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />

        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* App Router root layout is the document-level font declaration. */}
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Noto+Sans+SC:wght@400;500;600&family=Noto+Serif+SC:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>

      <body>{children}</body>
    </html>
  );
}

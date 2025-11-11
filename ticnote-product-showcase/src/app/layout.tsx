import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TicNote Product Showcase",
  description: "TicNote AI助手产品展示",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

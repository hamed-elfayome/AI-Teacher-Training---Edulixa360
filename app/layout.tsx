import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "600", "700", "900"],
});

export const metadata: Metadata = {
  title: "التدريب على الذكاء الاصطناعي للمعلمين | AI Teacher Training",
  description: "برنامج تدريبي متكامل للمعلمين على استخدام الذكاء الاصطناعي في التعليم",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${cairo.variable} font-[family-name:var(--font-cairo)] antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

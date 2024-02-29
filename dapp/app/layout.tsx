import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localfont from "next/font/local"
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const turds = localfont (
  {
    src: [{
        path: '../public/fonts/times.ttf',
        weight  : '400',
      }],
      variable: "--font-times"
  }
)

export const metadata: Metadata = {
  title: "Leafy",
  description: "I love leafy.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={turds.variable}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}

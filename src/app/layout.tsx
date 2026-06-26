import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Industrial Precision | High-Precision Weights",
  description: "B2B solution for high-precision OIML weights and measurement standards.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="selection:bg-black selection:text-white">
      <body
        className={`${jetbrainsMono.variable} font-mono antialiased bg-[#f5f5f5] text-[#1a1a1a] min-h-screen`}
      >
        <div className="max-w-7xl mx-auto border-x border-black/10 min-h-screen flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}

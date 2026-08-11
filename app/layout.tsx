import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PHCL Season 5 — Pillai HOC Champions League | Euforia 2026",
  description: "Official portal for PHCL Season 5 (Pillai HOC Champions League) at Euforia 2026. View live standings, 10 team rosters, 9 events, match results & points leaderboard. 8th September 2026.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#0b1121] text-slate-100 font-sans">
        {children}
      </body>
    </html>
  );
}

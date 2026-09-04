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
  title: "PHCL Season 5 | Captains & Leaderboard | Euforia 2026",
  icons: {
    icon: "/phcl-logo.png",
    shortcut: "/phcl-logo.png",
    apple: "/phcl-logo.png",
  },
  description: "Official PHCL Season 5 portal for Euforia 2026. Explore captain profiles, leaderboard standings, event point system, and official tournament rules.",
  keywords: [
    "PHCL",
    "Pillai HOC Champions League",
    "Euforia 2026",
    "captains",
    "leaderboard",
    "sports tournament",
    "event points",
  ],
  openGraph: {
    title: "PHCL Season 5 | Captains & Leaderboard | Euforia 2026",
    description: "Official PHCL Season 5 portal for Euforia 2026. Explore captain profiles, leaderboard standings, event point system, and official tournament rules.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PHCL Season 5 | Captains & Leaderboard | Euforia 2026",
    description: "Official PHCL Season 5 portal for Euforia 2026. Explore captain profiles, leaderboard standings, event point system, and official tournament rules.",
  },
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

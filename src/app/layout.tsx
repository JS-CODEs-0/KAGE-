import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SocialPilot — AI Social Media Manager",
  description:
    "Stealth AI-powered social media orchestration. Built on the Kage design architecture.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-ink text-bone font-sans antialiased selection:bg-vermilion selection:text-white relative">
        {/* Kage Grain & Vignette Atmospheric Overlays */}
        <div id="kage-grain" aria-hidden="true" />
        <div id="kage-vignette" aria-hidden="true" />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}

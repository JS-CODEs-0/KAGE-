"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, LayoutDashboard } from "lucide-react";

export function KageLandingPage() {
  const [iframeLoaded, setIframeLoaded] = useState(false);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-ink">
      {/* Top Floating Navigation Header */}
      <header className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-5 md:px-12 bg-gradient-to-b from-ink/90 via-ink/40 to-transparent backdrop-blur-[4px]">
        <Link href="/" className="flex items-center gap-3 group">
          <svg viewBox="0 0 44 44" fill="none" className="w-8 h-8 shrink-0">
            <circle cx="22" cy="25" r="8.6" fill="#e0231c" fillOpacity="0.9" />
            <path d="M5 13h34M9 18.4h26M22 8.5v27" stroke="#dfe7e0" strokeWidth="1.5" />
            <path d="M14 35.5h16" stroke="#dfe7e0" strokeWidth="1.2" strokeOpacity="0.6" />
          </svg>
          <div className="flex flex-col line-height-none gap-0.5">
            <span className="text-[12px] font-medium tracking-[0.26em] text-bone uppercase group-hover:text-white transition-colors">
              SOCIAL<span className="text-vermilion">PILOT</span>
            </span>
            <span className="text-[8px] font-normal tracking-[0.34em] text-muted uppercase">
              KAGE ARCHITECTURE
            </span>
          </div>
        </Link>

        <nav className="flex items-center gap-4 sm:gap-6">
          <Link
            href="/dashboard"
            className="kage-cta kage-cta--vermilion text-[10px] tracking-[0.22em] uppercase py-2 px-5"
          >
            <LayoutDashboard className="w-3.5 h-3.5 text-vermilion" />
            <span>Launch Command Console</span>
            <ArrowRight className="w-3 h-3 text-vermilion" />
          </Link>
        </nav>
      </header>

      {/* Loading state indicator before iframe paints */}
      {!iframeLoaded && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-ink text-muted space-y-4">
          <svg viewBox="0 0 44 44" fill="none" className="w-10 h-10 animate-pulse">
            <circle cx="22" cy="24" r="9.5" stroke="#e0231c" strokeWidth="1.2" />
            <path d="M6 12h32M9.5 17h25M22 8v28" stroke="#dfe7e0" strokeWidth="1.2" />
          </svg>
          <div className="kage-jp text-sm text-bone-dim">影の道 · 読込中</div>
          <p className="text-[10px] uppercase tracking-[0.24em] text-muted">Raising the mountain temple</p>
        </div>
      )}

      {/* Sandboxed Iframe hosting original Kage WebGL experience byte-exact */}
      <iframe
        src="/landing-pages/kage.html"
        title="SocialPilot — Kage Experience"
        sandbox="allow-downloads allow-forms allow-modals allow-popups allow-same-origin allow-scripts"
        loading="eager"
        onLoad={() => setIframeLoaded(true)}
        className="w-full h-full border-0 absolute inset-0 block"
        style={{
          background: "#05070a",
          opacity: iframeLoaded ? 1 : 0,
          transition: "opacity 0.6s ease-in-out",
        }}
      />
    </div>
  );
}

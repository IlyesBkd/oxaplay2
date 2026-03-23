"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import NavCTA from "./NavCTA";
import LanguageSwitcher from "./LanguageSwitcher";

const NAV_LINKS = [
  { label: "Accueil", href: "/" },
  { label: "CarPlay Voiture", href: "/carplay-voiture" },
  { label: "CarPlay Moto", href: "/carplay-moto" },
  { label: "Avis", href: "/avis" },
  { label: "FAQ", href: "/faq" },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}(?=\/|$)/, "") || "/";

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-black/40 backdrop-blur-2xl border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="shrink-0">
            <Image src="/logo-2.png" alt="OxaPlay" width={110} height={36} className="object-contain" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = pathWithoutLocale === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all min-h-[44px] flex items-center ${
                    isActive
                      ? "text-white bg-white/5"
                      : "text-gray-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* CTA + Lang + Mobile burger */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:block"><NavCTA /></div>
            <LanguageSwitcher />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden text-gray-300 hover:text-white min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg hover:bg-white/5 transition-colors"
              aria-label="Menu"
            >
              {mobileOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile slide-out menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] md:hidden">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <nav className="absolute top-0 right-0 w-72 h-full bg-zinc-900 border-l border-white/10 p-6 pt-20 flex flex-col gap-2 animate-slide-in-right">
            {NAV_LINKS.map((link) => {
              const isActive = pathWithoutLocale === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`px-4 py-3 rounded-xl text-base font-medium transition-all min-h-[48px] flex items-center ${
                    isActive
                      ? "text-white bg-purple-600/20 border border-purple-500/30"
                      : "text-gray-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="mt-6 pt-6 border-t border-white/10">
              <NavCTA />
            </div>
          </nav>
        </div>
      )}
    </>
  );
}

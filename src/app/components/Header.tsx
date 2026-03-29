"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import NavCTA from "./NavCTA";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}(?=\/|$)/, "") || "/";
  const t = useTranslations('Navigation');

  const NAV_LINKS = [
    { label: t('home'), href: "/" },
    { label: t('carplayVoiture'), href: "/carplay-voiture" },
    { label: t('carplayMoto'), href: "/carplay-moto" },
    { label: t('reviews'), href: "/avis" },
    { label: t('faq'), href: "/faq" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-zinc-950/80 backdrop-blur-2xl border-b border-zinc-800/60 shadow-[0_1px_30px_-10px_rgba(0,0,0,0.5)]"
          : "bg-transparent border-b border-transparent"
      }`}>
        <div className="max-w-7xl mx-auto px-5 h-[72px] flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="shrink-0">
            <Image src="/logo-2.png" alt="OxaPlay" width={110} height={36} className="object-contain" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-0.5">
            {NAV_LINKS.map((link) => {
              const isActive = pathWithoutLocale === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`px-4 py-2 rounded-full text-[13px] font-medium transition-all duration-300 min-h-[44px] flex items-center ${
                    isActive
                      ? "text-white bg-white/[0.08]"
                      : "text-zinc-400 hover:text-white hover:bg-white/[0.05]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* CTA + Lang + Mobile burger */}
          <div className="flex items-center gap-2.5">
            <div className="hidden sm:block"><NavCTA /></div>
            <LanguageSwitcher />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden text-zinc-400 hover:text-white min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full hover:bg-white/[0.06] transition-all duration-300"
              aria-label="Menu"
            >
              {mobileOpen ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Spacer for fixed header */}
      <div className="h-[72px]" />

      {/* Mobile slide-out menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] md:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setMobileOpen(false)} />
          <nav className="absolute top-0 right-0 w-[280px] h-full bg-zinc-950/95 backdrop-blur-2xl border-l border-zinc-800/50 p-6 pt-24 flex flex-col gap-1 animate-slide-in-right">
            {NAV_LINKS.map((link) => {
              const isActive = pathWithoutLocale === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`px-5 py-3.5 rounded-2xl text-[15px] font-medium transition-all duration-300 min-h-[48px] flex items-center ${
                    isActive
                      ? "text-white bg-white/[0.08]"
                      : "text-zinc-400 hover:text-white hover:bg-white/[0.04]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="mt-8 pt-6 border-t border-zinc-800/50">
              <NavCTA />
            </div>
          </nav>
        </div>
      )}
    </>
  );
}

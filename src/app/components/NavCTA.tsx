"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";


export default function NavCTA() {
  const [active, setActive] = useState(0);
  const [cycling, setCycling] = useState(true);
  const t = useTranslations('Navigation');

  const OPTIONS = [
    { label: t('voiture'), href: "/carplay-voiture" },
    { label: t('moto'), href: "/carplay-moto" },
  ];

  useEffect(() => {
    if (!cycling) return;
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % OPTIONS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [cycling, OPTIONS.length]);

  const current = OPTIONS[active];

  return (
    <div
      className="hidden sm:flex items-center rounded-full bg-white/[0.04] border border-zinc-800 overflow-hidden"
      onMouseEnter={() => setCycling(false)}
      onMouseLeave={() => setCycling(true)}
    >
      {/* Toggle pills */}
      <div className="flex">
        {OPTIONS.map((opt, i) => (
          <button
            key={opt.label}
            onClick={() => { setActive(i); setCycling(false); }}
            className={`relative px-3.5 py-2 text-xs font-medium tracking-wide transition-all duration-300 ${
              active === i
                ? "text-white"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            {active === i && (
              <span className="absolute inset-0.5 rounded-full bg-white/[0.08]" />
            )}
            <span className="relative">{opt.label}</span>
          </button>
        ))}
      </div>

      {/* Action link */}
      <a
        href={current.href}
        className="flex items-center gap-1.5 px-5 py-2 bg-white text-zinc-950 text-xs font-semibold tracking-wide rounded-full transition-all duration-300 hover:bg-zinc-200 active:scale-95"
      >
        {t('discover')}
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </a>
    </div>
  );
}

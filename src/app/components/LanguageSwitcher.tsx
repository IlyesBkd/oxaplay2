"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";

const LANGUAGES = [
  { code: "fr", label: "FR", flag: "🇫🇷" },
  { code: "en", label: "EN", flag: "🇬🇧" },
  { code: "de", label: "DE", flag: "🇩🇪" },
  { code: "es", label: "ES", flag: "🇪🇸" },
  { code: "it", label: "IT", flag: "🇮🇹" },
];

export default function LanguageSwitcher() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Extract current locale from pathname
  const segments = pathname.split("/");
  const currentLocale = LANGUAGES.find((l) => l.code === segments[1])?.code || "fr";
  const current = LANGUAGES.find((l) => l.code === currentLocale)!;

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const switchLocale = (code: string) => {
    // Replace locale segment in pathname
    const newSegments = [...segments];
    newSegments[1] = code;
    window.location.href = newSegments.join("/");
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.06] border border-white/10 text-xs font-bold text-gray-300 hover:text-white hover:border-white/20 transition-all"
      >
        <span>{current.flag}</span>
        <span>{current.label}</span>
        <svg className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-36 rounded-xl bg-zinc-900 border border-white/10 backdrop-blur-xl overflow-hidden shadow-[0_0_30px_-5px_rgba(0,0,0,0.5)] z-50">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => { switchLocale(lang.code); setOpen(false); }}
              className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-left text-sm transition-colors ${
                lang.code === currentLocale
                  ? "bg-purple-600/20 text-white font-semibold"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <span>{lang.flag}</span>
              <span>{lang.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

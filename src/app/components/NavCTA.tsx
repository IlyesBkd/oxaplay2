"use client";

import { useState, useEffect } from "react";

const OPTIONS = [
  { label: "Voiture", href: "/carplay-voiture", emoji: "🚗" },
  { label: "Moto", href: "/carplay-moto", emoji: "🏍️" },
];

export default function NavCTA() {
  const [active, setActive] = useState(0);
  const [cycling, setCycling] = useState(true);

  useEffect(() => {
    if (!cycling) return;
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % OPTIONS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [cycling]);

  const current = OPTIONS[active];

  return (
    <div
      className="hidden sm:flex items-center gap-0 rounded-2xl bg-white/[0.06] border border-white/10 backdrop-blur-lg overflow-hidden"
      onMouseEnter={() => setCycling(false)}
      onMouseLeave={() => setCycling(true)}
    >
      {/* Toggle pills */}
      <div className="flex">
        {OPTIONS.map((opt, i) => (
          <button
            key={opt.label}
            onClick={() => { setActive(i); setCycling(false); }}
            className={`relative px-3 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
              active === i
                ? "text-white"
                : "text-gray-500 hover:text-gray-300"
            }`}
          >
            {active === i && (
              <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-600/30 to-indigo-600/30 border border-purple-500/30" />
            )}
            <span className="relative flex items-center gap-1.5">
              <span>{opt.emoji}</span>
              <span>{opt.label}</span>
            </span>
          </button>
        ))}
      </div>

      {/* Action link */}
      <a
        href={current.href}
        className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-[0_0_20px_-5px_rgba(168,85,247,0.4)]"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
        Voir
      </a>
    </div>
  );
}

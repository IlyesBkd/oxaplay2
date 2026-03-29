"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  const t = useTranslations('FAQ');

  return (
    <section id="faq" className="w-full bg-zinc-950">
      <div className="max-w-3xl mx-auto px-6 py-20 sm:py-28">
        <div className="text-center mb-14">
          <p className="text-[11px] font-medium text-zinc-500 uppercase tracking-[0.25em] mb-4">FAQ</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 tracking-tight">
            {t('title')}
          </h2>
          <p className="text-zinc-500 text-sm">
            {t('subtitle')}
          </p>
        </div>

        <div className="space-y-4">
          {(t.raw('items') as any[]).map((item: any, i: number) => (
            <div
              key={i}
              className="border border-zinc-800/60 rounded-xl overflow-hidden bg-zinc-900/30 hover:bg-zinc-900/50 transition-all duration-300"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-zinc-800/50 transition-colors duration-200"
              >
                <span className="text-white font-medium">{item.q}</span>
                <svg
                  className={`w-5 h-5 text-zinc-400 transition-transform duration-300 ${
                    open === i ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  open === i ? "max-h-96" : "max-h-0"
                }`}
              >
                <div className="px-6 py-4 text-zinc-400 leading-relaxed border-t border-zinc-800/60">
                  {item.a}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

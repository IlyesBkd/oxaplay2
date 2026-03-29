"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "../../components/Header";
import { useTranslations } from "next-intl";

export default function FAQPage() {
  const [open, setOpen] = useState<number | null>(null);
  const t = useTranslations();

  return (
    <main className="w-full min-h-screen bg-zinc-950 text-white">
      <Header />

      <section className="w-full py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-[11px] font-medium text-zinc-500 uppercase tracking-[0.25em] mb-6">{t('FAQPage.badge')}</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 tracking-tight">{t('FAQPage.title')}</h1>
          <p className="text-zinc-500 text-base max-w-xl mx-auto">{t('FAQPage.subtitle')}</p>
        </div>
      </section>

      <section className="w-full pb-20 sm:pb-28">
        <div className="max-w-3xl mx-auto px-6">
          <div className="space-y-3">
            {(t.raw('FAQPage.items') as any[]).map((item: any, i: number) => (
              <div
                key={i}
                className="rounded-2xl border border-zinc-800 bg-zinc-900/50 overflow-hidden transition-all duration-300 hover:border-zinc-700"
              >
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="text-sm sm:text-base font-medium text-white">{item.q}</span>
                  <svg
                    className={`w-4 h-4 text-zinc-500 shrink-0 transition-transform duration-300 ${open === i ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${open === i ? "max-h-60 pb-5" : "max-h-0"}`}>
                  <p className="px-6 text-sm text-zinc-500 leading-relaxed">{item.a}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-zinc-500 mb-6">{t('FAQ.notFound')}</p>
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-3 rounded-full bg-white text-zinc-950 font-semibold text-sm transition-all duration-300 hover:bg-zinc-200 hover:scale-[1.02] active:scale-95"
            >
              {t('FAQ.contactUs')}
            </Link>
          </div>
        </div>
      </section>

      <footer className="w-full border-t border-zinc-800/50 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-zinc-700">{t('Footer.copyright')}</p>
            <div className="flex gap-6 text-xs text-zinc-600">
              <Link href="/mentions-legales" className="hover:text-white transition-colors duration-300">{t('Footer.legalLinks.legalNotice')}</Link>
              <Link href="/cgv" className="hover:text-white transition-colors duration-300">{t('Footer.legalLinks.terms')}</Link>
              <Link href="/politique-de-confidentialite" className="hover:text-white transition-colors duration-300">{t('Footer.legalLinks.privacy')}</Link>
              <Link href="/politique-de-retour" className="hover:text-white transition-colors duration-300">{t('Footer.legalLinks.returns')}</Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

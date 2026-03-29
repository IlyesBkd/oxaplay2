"use client";

import Link from "next/link";
import Header from "../../components/Header";
import { useTranslations } from "next-intl";


const CONTACT_SVG = {
  email: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
  hours: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
  address: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z",
  response: "M13 10V3L4 14h7v7l9-11h-7z",
};

export default function ContactPage() {
  const t = useTranslations();

  const CONTACT_INFO = [
    { key: "email", svg: CONTACT_SVG.email, href: "mailto:support@oxaplay.com" },
    { key: "hours", svg: CONTACT_SVG.hours, href: null },
    { key: "address", svg: CONTACT_SVG.address, href: null },
    { key: "response", svg: CONTACT_SVG.response, href: null },
  ];
  return (
    <main className="w-full min-h-screen bg-zinc-950 text-white">
      <Header />

      <section className="w-full py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-[11px] font-medium text-zinc-500 uppercase tracking-[0.25em] mb-6">{t('Contact.badge')}</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 tracking-tight">{t('Contact.title')}</h1>
          <p className="text-zinc-500 text-base max-w-xl mx-auto">{t('Contact.subtitle')}</p>
        </div>
      </section>

      <section className="w-full pb-20 sm:pb-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left: Contact info */}
            <div>
              <h2 className="text-2xl font-semibold text-white mb-8 tracking-tight">{t('Contact.info.title')}</h2>
              <div className="space-y-4">
                {CONTACT_INFO.map((c) => (
                  <div key={c.key} className="flex items-start gap-4 p-5 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-colors duration-300">
                    <div className="shrink-0 w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center">
                      <svg className="w-5 h-5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d={c.svg} />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[11px] text-zinc-500 uppercase tracking-[0.2em] font-medium mb-1">{t(`Contact.info.${c.key}.label`)}</p>
                      {c.href ? (
                        <a href={c.href} className="text-sm text-white hover:text-zinc-300 transition-colors duration-300">{t(`Contact.info.${c.key}.value`)}</a>
                      ) : (
                        <p className="text-sm text-zinc-400">{t(`Contact.info.${c.key}.value`)}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-5 rounded-2xl bg-zinc-900/50 border border-zinc-800">
                <p className="text-sm text-zinc-500 mb-3">{t('Contact.seeAlso')}</p>
                <div className="flex flex-wrap gap-2">
                  <Link href="/faq" className="px-3 py-1.5 rounded-full bg-zinc-800 text-xs text-zinc-400 hover:text-white hover:bg-zinc-700 transition-all duration-300">FAQ</Link>
                  <Link href="/politique-de-retour" className="px-3 py-1.5 rounded-full bg-zinc-800 text-xs text-zinc-400 hover:text-white hover:bg-zinc-700 transition-all duration-300">Retours & Remboursements</Link>
                  <Link href="/cgv" className="px-3 py-1.5 rounded-full bg-zinc-800 text-xs text-zinc-400 hover:text-white hover:bg-zinc-700 transition-all duration-300">CGV</Link>
                </div>
              </div>
            </div>

            {/* Right: Form */}
            <div>
              <h2 className="text-2xl font-semibold text-white mb-8 tracking-tight">{t('Contact.form.title')}</h2>
              <form action="#" className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-[11px] text-zinc-500 uppercase tracking-[0.2em] font-medium mb-2">{t('Contact.form.name')}</label>
                  <input
                    id="name"
                    type="text"
                    placeholder={t('Contact.form.namePlaceholder')}
                    className="w-full px-4 py-3.5 rounded-xl bg-zinc-900/50 border border-zinc-800 text-white placeholder-zinc-600 focus:border-zinc-600 focus:outline-none transition-all duration-300"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-[11px] text-zinc-500 uppercase tracking-[0.2em] font-medium mb-2">{t('Contact.form.email')}</label>
                  <input
                    id="email"
                    type="email"
                    placeholder={t('Contact.form.emailPlaceholder')}
                    className="w-full px-4 py-3.5 rounded-xl bg-zinc-900/50 border border-zinc-800 text-white placeholder-zinc-600 focus:border-zinc-600 focus:outline-none transition-all duration-300"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-[11px] text-zinc-500 uppercase tracking-[0.2em] font-medium mb-2">{t('Contact.form.subject')}</label>
                  <input
                    id="subject"
                    type="text"
                    placeholder={t('Contact.form.subjectPlaceholder')}
                    className="w-full px-4 py-3.5 rounded-xl bg-zinc-900/50 border border-zinc-800 text-white placeholder-zinc-600 focus:border-zinc-600 focus:outline-none transition-all duration-300"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-[11px] text-zinc-500 uppercase tracking-[0.2em] font-medium mb-2">{t('Contact.form.message')}</label>
                  <textarea
                    id="message"
                    rows={5}
                    placeholder={t('Contact.form.messagePlaceholder')}
                    className="w-full px-4 py-3.5 rounded-xl bg-zinc-900/50 border border-zinc-800 text-white placeholder-zinc-600 focus:border-zinc-600 focus:outline-none transition-all duration-300 resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full bg-white text-zinc-950 font-semibold text-sm transition-all duration-300 hover:bg-zinc-200 hover:scale-[1.01] active:scale-[0.99]"
                >
                  {t('Contact.form.submit')}
                </button>
                <p className="text-xs text-zinc-600 text-center">{t('Contact.form.responseTime')}</p>
              </form>
            </div>
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

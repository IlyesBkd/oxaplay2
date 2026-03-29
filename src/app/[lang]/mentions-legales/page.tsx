"use client";

import Link from "next/link";
import Header from "../../components/Header";
import { useTranslations } from "next-intl";

export default function MentionsLegales() {
  const t = useTranslations('LegalNotice');
  const tFooter = useTranslations('Footer');
  
  return (
    <main className="w-full min-h-screen bg-black text-white">
      <Header />
      <div className="max-w-3xl mx-auto px-4 py-16 sm:py-24">
        <h1 className="text-3xl sm:text-4xl font-bold mb-10">{t('title')}</h1>

        <div className="space-y-8 text-gray-400 text-sm leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-white mb-3">{t('section1.title')}</h2>
            <p>{t('section1.intro')}</p>
            <ul className="mt-2 space-y-1">
              <li><strong className="text-gray-300">{t('section1.companyName')}</strong> OxaPlay SAS</li>
              <li><strong className="text-gray-300">{t('section1.address')}</strong> 42 Rue du Faubourg Saint-Honoré, 75008 Paris, France</li>
              <li><strong className="text-gray-300">{t('section1.email')}</strong> support@oxaplay.com</li>
              <li><strong className="text-gray-300">{t('section1.capital')}</strong> 10 000 €</li>
              <li><strong className="text-gray-300">{t('section1.rcs')}</strong> Paris B 912 345 678</li>
              <li><strong className="text-gray-300">{t('section1.vat')}</strong> FR 12 912345678</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">{t('section2.title')}</h2>
            <p>{t('section2.content')}</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">{t('section3.title')}</h2>
            <p>{t('section3.content')}</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">{t('section4.title')}</h2>
            <p>{t('section4.content')}</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">{t('section5.title')}</h2>
            <p>{t('section5.content')} <a href="mailto:support@oxaplay.com" className="text-purple-400 hover:underline">support@oxaplay.com</a>.</p>
            <p className="mt-2">{t('section5.moreInfo')} <Link href="/politique-de-confidentialite" className="text-purple-400 hover:underline">{tFooter('legalLinks.privacy')}</Link>.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">{t('section6.title')}</h2>
            <p>{t('section6.content')}</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">{t('section7.title')}</h2>
            <p>{t('section7.content')}</p>
          </section>
        </div>
      </div>
    </main>
  );
}

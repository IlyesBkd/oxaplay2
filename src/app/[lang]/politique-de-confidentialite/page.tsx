"use client";

import Header from "../../components/Header";
import { useTranslations } from "next-intl";

export default function PolitiqueConfidentialite() {
  const t = useTranslations('PrivacyPolicy');
  
  const section2Items = t.raw('section2.items') as string[];
  const section3Items = t.raw('section3.items') as string[];
  const section6Items = t.raw('section6.items') as string[];
  const section7Items = t.raw('section7.items') as string[];
  
  return (
    <main className="w-full min-h-screen bg-black text-white">
      <Header />
      <div className="max-w-3xl mx-auto px-4 py-16 sm:py-24">
        <h1 className="text-3xl sm:text-4xl font-bold mb-10">{t('title')}</h1>

        <div className="space-y-8 text-gray-400 text-sm leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-white mb-3">{t('section1.title')}</h2>
            <p>{t('section1.content')}</p>
            <p className="mt-2">{t('section1.contact')} <a href="mailto:support@oxaplay.com" className="text-purple-400 hover:underline">support@oxaplay.com</a></p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">{t('section2.title')}</h2>
            <p>{t('section2.intro')}</p>
            <ul className="mt-2 list-disc list-inside space-y-1">
              {section2Items.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">{t('section3.title')}</h2>
            <p>{t('section3.intro')}</p>
            <ul className="mt-2 list-disc list-inside space-y-1">
              {section3Items.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">{t('section4.title')}</h2>
            <p>{t('section4.content')}</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">{t('section5.title')}</h2>
            <p>{t('section5.content')}</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">{t('section6.title')}</h2>
            <p>{t('section6.intro')}</p>
            <ul className="mt-2 list-disc list-inside space-y-1">
              {section6Items.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
            <p className="mt-2">{t('section6.noSale')}</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">{t('section7.title')}</h2>
            <p>{t('section7.intro')}</p>
            <ul className="mt-2 list-disc list-inside space-y-1">
              {section7Items.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
            <p className="mt-2">{t('section7.exercise')} <a href="mailto:support@oxaplay.com" className="text-purple-400 hover:underline">support@oxaplay.com</a></p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">{t('section8.title')}</h2>
            <p>{t('section8.content')}</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">{t('section9.title')}</h2>
            <p>{t('section9.content')}</p>
          </section>
        </div>
      </div>
    </main>
  );
}

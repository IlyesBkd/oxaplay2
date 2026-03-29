"use client";

import Header from "../../components/Header";
import { useTranslations } from "next-intl";

export default function PolitiqueDeRetour() {
  const t = useTranslations('ReturnPolicy');
  
  const section2Items = t.raw('section2.items') as string[];
  const section3Items = t.raw('section3.items') as string[];
  
  return (
    <main className="w-full min-h-screen bg-black text-white">
      <Header />
      <div className="max-w-3xl mx-auto px-4 py-16 sm:py-24">
        <h1 className="text-3xl sm:text-4xl font-bold mb-10">{t('title')}</h1>

        <div className="space-y-8 text-gray-400 text-sm leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-white mb-3">{t('section1.title')}</h2>
            <p>{t('section1.content', { days: <strong className="text-gray-300">14</strong> })}</p>
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
            <ol className="mt-2 list-decimal list-inside space-y-1">
              {section3Items.map((item, i) => <li key={i}>{item}</li>)}
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">{t('section4.title')}</h2>
            <p>{t('section4.content')}</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">{t('section5.title')}</h2>
            <p>{t('section5.content', { days: <strong className="text-gray-300">14</strong> })}</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">{t('section6.title')}</h2>
            <p>{t('section6.content')}</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">{t('section7.title')}</h2>
            <p>{t('section7.content', { years: <strong className="text-gray-300">2</strong> })}</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">{t('section8.title')}</h2>
            <p>{t('section8.intro')}</p>
            <ul className="mt-2 space-y-1">
              <li><strong className="text-gray-300">{t('section8.email')}</strong> <a href="mailto:support@oxaplay.com" className="text-purple-400 hover:underline">support@oxaplay.com</a></li>
              <li><strong className="text-gray-300">{t('section8.address')}</strong> OxaPlay SAS, 42 Rue du Faubourg Saint-Honoré, 75008 Paris, France</li>
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}

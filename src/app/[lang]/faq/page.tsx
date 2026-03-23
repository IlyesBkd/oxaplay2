"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "../../components/Header";

const FAQ_ITEMS = [
  {
    q: "Mon véhicule est-il compatible ?",
    a: "Oui ! OxaPlay est compatible avec 99% des véhicules équipés d'un allume-cigare 12V. Que vous ayez une voiture récente ou ancienne, notre écran s'adapte à votre tableau de bord en quelques secondes.",
  },
  {
    q: "Comment le son sort-il des enceintes de la voiture ?",
    a: "Vous avez trois options : via la fréquence FM (intégrée à l'écran), via un câble AUX (jack 3.5mm fourni), ou via le Bluetooth natif de votre autoradio. Choisissez la méthode qui vous convient le mieux.",
  },
  {
    q: "L'installation est-elle compliquée ?",
    a: "Pas du tout. C'est du vrai plug & play : branchez l'écran sur l'allume-cigare, activez le Bluetooth sur votre téléphone, et c'est prêt en moins de 2 minutes. Aucun outil, aucun câblage.",
  },
  {
    q: "Quels sont les délais de livraison ?",
    a: "Nous expédions sous 24h. La livraison est assurée en 48h à 72h pour la France métropolitaine, et 5 à 10 jours ouvrés pour l'international. Un numéro de suivi vous est envoyé par email.",
  },
  {
    q: "Est-ce compatible avec Apple CarPlay ET Android Auto ?",
    a: "Oui, les deux ! OxaPlay prend en charge Apple CarPlay (sans fil) pour tous les iPhones à partir du 6, et Android Auto pour les smartphones Android 10+. La connexion est automatique après le premier appairage.",
  },
  {
    q: "Puis-je retourner le produit si ça ne me convient pas ?",
    a: "Absolument. Vous disposez de 14 jours après réception pour nous retourner le produit et être remboursé intégralement. Contactez-nous à support@oxaplay.com pour initier le retour.",
  },
  {
    q: "Quelle est la taille de l'écran ?",
    a: "L'écran CarPlay Voiture mesure 10,26 pouces (format panoramique HD). L'écran CarPlay Moto mesure 5 pouces, spécialement conçu pour être compact et résistant aux intempéries.",
  },
  {
    q: "Y a-t-il une garantie ?",
    a: "Oui, tous nos produits sont couverts par une garantie de 2 ans. En cas de défaut de fabrication, nous remplaçons ou remboursons le produit. Notre SAV est joignable à support@oxaplay.com.",
  },
];

const GLOW = "shadow-[0_0_20px_rgba(168,85,247,0.6)]";

export default function FAQPage() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <main className="w-full min-h-screen bg-black text-white">
      {/* Navbar */}
      <Header />

      {/* Hero */}
      <section className="w-full py-20 sm:py-28 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-950/20 to-black" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-purple-600/20 border border-purple-500/30 text-purple-400 text-xs font-bold uppercase tracking-widest mb-6">
            Support
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Foire Aux Questions</h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">Trouvez rapidement les réponses à vos questions sur OxaPlay</p>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="w-full pb-20 sm:pb-28">
        <div className="max-w-3xl mx-auto px-4">
          <div className="space-y-3">
            {FAQ_ITEMS.map((item, i) => (
              <div
                key={i}
                className="rounded-xl border border-white/5 bg-zinc-900 overflow-hidden transition-all duration-300 hover:border-purple-500/40"
              >
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="text-sm sm:text-base font-semibold text-white">{item.q}</span>
                  <svg
                    className={`w-5 h-5 text-purple-400 shrink-0 transition-transform duration-300 ${open === i ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${open === i ? "max-h-60 pb-5" : "max-h-0"}`}>
                  <p className="px-6 text-sm text-gray-400 leading-relaxed">{item.a}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <p className="text-gray-400 mb-6">Vous ne trouvez pas votre réponse ?</p>
            <Link
              href="/contact"
              className={`inline-flex items-center px-8 py-3 rounded-full bg-purple-600 hover:bg-purple-500 text-white font-bold transition-all ${GLOW}`}
            >
              Contactez-nous
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t border-purple-900/30 bg-black">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-gray-600">© 2025 OxaPlay. Tous droits réservés.</p>
            <div className="flex gap-6 text-xs text-gray-500">
              <Link href="/mentions-legales" className="hover:text-purple-400 transition-colors">Mentions Légales</Link>
              <Link href="/cgv" className="hover:text-purple-400 transition-colors">CGV</Link>
              <Link href="/politique-de-confidentialite" className="hover:text-purple-400 transition-colors">Confidentialité</Link>
              <Link href="/politique-de-retour" className="hover:text-purple-400 transition-colors">Retours</Link>
            </div>
          </div>
        </div>
        <div className="w-full h-1 bg-gradient-to-r from-purple-700 via-purple-500 to-purple-700" />
      </footer>
    </main>
  );
}

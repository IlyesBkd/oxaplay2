"use client";

import { useState } from "react";

const FAQ_ITEMS = [
  {
    q: "Est-ce compatible avec mon iPhone 15 / 16 ?",
    a: "Oui ! OxaPlay est compatible avec tous les iPhones à partir de l'iPhone 6 et supérieur, y compris les iPhone 15 et 16. La connexion se fait sans fil via Bluetooth et Wi-Fi.",
  },
  {
    q: "Comment le son sort-il des enceintes de la voiture ?",
    a: "Le son est transmis via une connexion FM, Bluetooth ou AUX (câble jack 3.5mm fourni). Vous pouvez choisir la méthode qui convient le mieux à votre véhicule pour profiter du son directement sur vos enceintes.",
  },
  {
    q: "L'installation est-elle vraiment facile ?",
    a: "Absolument. Il suffit de brancher l'écran sur l'allume-cigare de votre voiture, d'activer le Bluetooth sur votre téléphone, et c'est prêt. Aucun outil, aucun câblage complexe. Installation en moins de 5 minutes.",
  },
  {
    q: "Puis-je le renvoyer si ça ne me plaît pas ?",
    a: "Bien sûr. Vous bénéficiez d'un droit de rétractation de 14 jours. Si le produit ne vous convient pas, contactez-nous à support@oxaplay.com et nous organiserons le retour et le remboursement intégral.",
  },
  {
    q: "Est-ce que ça fonctionne aussi avec Android ?",
    a: "Oui, OxaPlay est compatible avec Android Auto en plus d'Apple CarPlay. Tous les smartphones Android récents (Android 10+) sont pris en charge.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="w-full bg-black">
      <div className="max-w-3xl mx-auto px-4 py-16 sm:py-24">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-white mb-3">
          QUESTIONS FRÉQUENTES
        </h2>
        <p className="text-center text-gray-400 mb-12">
          Tout ce que vous devez savoir avant de commander
        </p>

        <div className="space-y-3">
          {FAQ_ITEMS.map((item, i) => (
            <div
              key={i}
              className="rounded-xl border border-white/5 bg-gray-900/30 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-purple-500/30"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left min-h-[48px] cursor-pointer"
              >
                <span className="text-sm sm:text-base font-semibold text-white">
                  {item.q}
                </span>
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
              <div
                className={`overflow-hidden transition-all duration-300 ${open === i ? "max-h-60 pb-5" : "max-h-0"}`}
              >
                <p className="px-6 text-sm text-gray-400 leading-relaxed">
                  {item.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

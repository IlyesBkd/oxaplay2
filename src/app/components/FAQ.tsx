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
    <section id="faq" className="w-full bg-zinc-950">
      <div className="max-w-3xl mx-auto px-6 py-20 sm:py-28">
        <div className="text-center mb-14">
          <p className="text-[11px] font-medium text-zinc-500 uppercase tracking-[0.25em] mb-4">FAQ</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 tracking-tight">
            Questions fréquentes.
          </h2>
          <p className="text-zinc-500 text-sm">
            Tout ce que vous devez savoir avant de commander.
          </p>
        </div>

        <div className="space-y-3">
          {FAQ_ITEMS.map((item, i) => (
            <div
              key={i}
              className="rounded-2xl border border-zinc-800 bg-zinc-900/50 overflow-hidden transition-all duration-300 hover:border-zinc-700"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left min-h-[48px] cursor-pointer"
              >
                <span className="text-sm sm:text-base font-medium text-white">
                  {item.q}
                </span>
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
              <div
                className={`overflow-hidden transition-all duration-300 ${open === i ? "max-h-60 pb-5" : "max-h-0"}`}
              >
                <p className="px-6 text-sm text-zinc-500 leading-relaxed">
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

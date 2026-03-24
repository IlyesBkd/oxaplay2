"use client";

import Image from "next/image";
import FAQ from "../components/FAQ";
import RatingBadge from "../components/RatingBadge";
import Header from "../components/Header";
import { usePricingVariant, type PricingData } from "@/lib/usePricingVariant";

/* ─── Data ─── */

const BRANDS = [
  { src: "/logo-car/BMW-Logo.wine.svg", alt: "BMW" },
  { src: "/logo-car/Audi-Logo.wine.svg", alt: "Audi" },
  { src: "/logo-car/Mercedes-Benz-Logo.wine.svg", alt: "Mercedes-Benz" },
  { src: "/logo-car/Ford_Motor_Company-Logo.wine.svg", alt: "Ford" },
  { src: "/logo-car/Honda-Logo.wine.svg", alt: "Honda" },
  { src: "/logo-car/Tesla,_Inc.-Logo.wine.svg", alt: "Tesla" },
  { src: "/logo-car/Porsche-Logo.wine.svg", alt: "Porsche" },
  { src: "/logo-car/Lamborghini-Logo.wine.svg", alt: "Lamborghini" },
  { src: "/logo-car/Citroën-Logo.wine.svg", alt: "Citroën" },
  { src: "/logo-car/Automobile_Dacia-Logo.wine.svg", alt: "Dacia" },
];

const PRODUCTS_STATIC = [
  {
    name: "CarPlay pour Voiture",
    oldPrice: "299,99 €",
    slug: "carplay-voiture",
    main: "/Voiture/photos_produits/1.jpg",
    gallery: [
      "/Voiture/photos_produits/1.jpg",
      "/Voiture/photos_produits/2.jpg",
      "/Voiture/photos_produits/3.jpg",
      "/Voiture/photos_produits/4.jpg",
      "/Voiture/photos_produits/5.jpg",
    ],
  },
  {
    name: "CarPlay pour Moto",
    oldPrice: "259,99 €",
    slug: "carplay-moto",
    main: "/Moto/photos_produits/1.jpg",
    gallery: [
      "/Moto/photos_produits/1.jpg",
      "/Moto/photos_produits/2.jpg",
      "/Moto/photos_produits/3.jpg",
      "/Moto/photos_produits/4.jpg",
      "/Moto/photos_produits/5.jpg",
    ],
  },
];

const TRUST_ITEMS = [
  { label: "Garantie 2 ans", svg: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
  { label: "Paiement Sécurisé", svg: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" },
  { label: "Satisfait ou Remboursé", svg: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" },
  { label: "Livraison 48h", svg: "M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" },
];

const TESTIMONIAL_VIDEOS = [
  "/Voiture/temoignages_clients/8617e897bf7249b88b80b3d27bf0e139.HD-720p-1.6Mbps-55016171.mp4",
  "/Voiture/temoignages_clients/b6ee109822b549dba85b66bdf05c87e7.HD-720p-1.6Mbps-55016167.mp4",
  "/Voiture/temoignages_clients/e31e12046750442496efb7bbc708240f.HD-720p-1.6Mbps-55016169.mp4",
  "/Voiture/temoignages_clients/f846a94508024394a8b09956d50115d5.HD-720p-1.6Mbps-55016168.mp4",
];

const HIGHLIGHTS = [
  { title: "Plug & Play", desc: "Installation en 5 minutes, aucun câblage complexe nécessaire.", svg: "M13 10V3L4 14h7v7l9-11h-7z" },
  { title: "Apple CarPlay", desc: "Connexion sans fil à votre iPhone pour GPS, musique et appels.", svg: "M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.858 15.355-5.858 21.213 0" },
  { title: "Android Auto", desc: "Compatible avec tous les smartphones Android récents.", svg: "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" },
  { title: "Écran HD Tactile", desc: "Résolution haute définition avec tactile multi-points réactif.", svg: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
  { title: "Universel", desc: "Compatible avec 98% des voitures et motos du marché.", svg: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
  { title: "Garantie 2 ans", desc: "Service après-vente réactif et garantie constructeur incluse.", svg: "M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
];


const FOOTER_NAV = [
  { label: "Accueil", href: "/" },
  { label: "CarPlay Voiture", href: "/carplay-voiture" },
  { label: "CarPlay Moto", href: "/carplay-moto" },
  { label: "Avis", href: "/avis" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

const FOOTER_LEGAL = [
  { label: "Mentions Légales", href: "/mentions-legales" },
  { label: "Politique de Confidentialité", href: "/politique-de-confidentialite" },
  { label: "CGV", href: "/cgv" },
  { label: "Retours & Remboursements", href: "/politique-de-retour" },
];

/* ═══════════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════════ */
export default function Home() {
  const pricing = usePricingVariant();

  return (
    <main className="w-full min-h-screen bg-zinc-950 text-white overflow-x-hidden">
      <Header />
      <Hero pricing={pricing} />
      <BrandStrip />
      <ProductsCTA pricing={pricing} />
      <FeaturesHighlight />
      <HowItWorks />
      <Testimonials />
      <FAQ />
      <Footer />
    </main>
  );
}

/* ─────────────────────────── HERO ─────────────────────────── */

function Hero({ pricing }: { pricing: PricingData }) {
  return (
    <section className="relative w-full h-[calc(100vh-72px)] min-h-[500px] flex items-end justify-center -mt-[72px] pt-[72px]">
      {/* Edge-to-edge background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/fond.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority
        />
      </div>
      {/* Bottom gradient overlay */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent" />
      <div className="absolute inset-0 z-[1] bg-zinc-950/30" />

      {/* Rating badge — positioned higher */}
      <div className="absolute top-[calc(72px+18%)] left-0 right-0 z-10 flex justify-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.08] backdrop-blur-sm border border-white/[0.1]">
          <RatingBadge />
          <span className="text-sm text-zinc-300 font-medium">+2 000 clients satisfaits</span>
        </div>
      </div>

      {/* Centered content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 pb-3 sm:pb-4 text-center">
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight mb-6">
          <span className="text-white">L&apos;écran qui transforme</span>
          <br />
          <span className="text-white">votre véhicule.</span>
        </h1>
        <p className="text-zinc-400 text-base sm:text-lg max-w-xl mx-auto leading-relaxed mb-10">
          CarPlay & Android Auto sans fil. Plug-and-play.
          Compatible avec 98% des véhicules.
        </p>

        {/* Minimal CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#products"
            className="inline-flex items-center gap-2.5 px-8 py-4 bg-white text-zinc-950 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 hover:bg-zinc-200 hover:scale-[1.03] active:scale-[0.97]"
          >
            Découvrir
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </a>
          <div className="flex items-center gap-3 text-sm text-zinc-500">
            {pricing.loading ? (
              <div className="h-5 w-32 bg-white/5 rounded-full animate-pulse" />
            ) : (
              <>
                <span className="font-semibold text-white">À partir de {pricing.voiture.formatted}</span>
                <span className="text-zinc-600 line-through text-xs">{pricing.voiture.formattedOriginal}</span>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── BRAND STRIP ─────────────────────────── */
function BrandStrip() {
  const logos = [...BRANDS, ...BRANDS];
  return (
    <section className="w-full border-y border-zinc-800/50 bg-zinc-950 overflow-hidden">
      <div className="py-8">
        <p className="text-center text-[11px] font-medium text-zinc-500 uppercase tracking-[0.25em] mb-6">Compatible avec +99% des véhicules</p>
        <div className="flex w-max animate-marquee gap-16">
          {logos.map((b, i) => (
            <div
              key={`${b.alt}-${i}`}
              className="relative h-16 w-40 shrink-0 opacity-30 hover:opacity-60 transition-opacity duration-500"
            >
              <Image src={b.src} alt={b.alt} fill sizes="112px" className="object-contain grayscale" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── PRODUCTS CTA ─────────────────────────── */
function ProductsCTA({ pricing }: { pricing: PricingData }) {
  return (
    <section id="products" className="w-full bg-zinc-950 py-20 sm:py-28 relative overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-[11px] font-medium text-zinc-500 uppercase tracking-[0.25em] mb-4">Nos Produits</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
            Choisissez votre écran.
          </h2>
          <p className="text-zinc-500 max-w-md mx-auto leading-relaxed text-sm">Plug & play, sans fil, compatible avec 98% des véhicules.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* ── CarPlay Voiture ── */}
          <a href="/carplay-voiture" className="group relative rounded-3xl overflow-hidden bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-all duration-500 hover:scale-[1.01]">
            <div className="relative h-72 sm:h-80 overflow-hidden">
              <Image
                src="/Voiture/photos_produits/2.jpg"
                alt="CarPlay Voiture"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/40 to-transparent" />
            </div>

            <div className="relative p-8">
              <div className="flex items-start justify-between gap-4 mb-5">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-1.5 tracking-tight">CarPlay Voiture</h3>
                  <p className="text-sm text-zinc-500">Écran 10.26&quot; IPS HD panoramique</p>
                </div>
                <div className="text-right shrink-0">
                  {pricing.loading ? (
                    <>
                      <div className="h-8 w-24 bg-zinc-800 rounded-lg animate-pulse mb-1" />
                      <div className="h-3 w-16 bg-zinc-800 rounded animate-pulse ml-auto" />
                    </>
                  ) : (
                    <>
                      <p className="text-2xl font-light text-white tracking-tight">{pricing.voiture.formatted}</p>
                      <p className="text-xs text-zinc-600 line-through">{pricing.voiture.formattedOriginal}</p>
                    </>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {["Sans fil", "CarPlay + Android", "Plug & Play"].map((f) => (
                  <span key={f} className="px-3 py-1 rounded-full bg-zinc-800/80 text-[11px] text-zinc-400 font-medium">{f}</span>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-zinc-950 font-semibold text-sm transition-all duration-300 group-hover:bg-zinc-200 group-hover:scale-[1.02] active:scale-95">
                  Découvrir
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
                <span className="text-xs text-zinc-500 font-medium">4.8 — 2 000+ avis</span>
              </div>
            </div>
          </a>

          {/* ── CarPlay Moto ── */}
          <a href="/carplay-moto" className="group relative rounded-3xl overflow-hidden bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-all duration-500 hover:scale-[1.01]">
            <div className="relative h-72 sm:h-80 overflow-hidden">
              <Image
                src="/Moto/photos_produits/3.jpg"
                alt="CarPlay Moto"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/40 to-transparent" />
            </div>

            <div className="relative p-8">
              <div className="flex items-start justify-between gap-4 mb-5">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-1.5 tracking-tight">CarPlay Moto</h3>
                  <p className="text-sm text-zinc-500">Écran 5&quot; compact & étanche IP67</p>
                </div>
                <div className="text-right shrink-0">
                  {pricing.loading ? (
                    <>
                      <div className="h-8 w-24 bg-zinc-800 rounded-lg animate-pulse mb-1" />
                      <div className="h-3 w-16 bg-zinc-800 rounded animate-pulse ml-auto" />
                    </>
                  ) : (
                    <>
                      <p className="text-2xl font-light text-white tracking-tight">{pricing.moto.formatted}</p>
                      <p className="text-xs text-zinc-600 line-through">{pricing.moto.formattedOriginal}</p>
                    </>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {["Étanche IP67", "GPS intégré", "Soleil lisible"].map((f) => (
                  <span key={f} className="px-3 py-1 rounded-full bg-zinc-800/80 text-[11px] text-zinc-400 font-medium">{f}</span>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-zinc-950 font-semibold text-sm transition-all duration-300 group-hover:bg-zinc-200 group-hover:scale-[1.02] active:scale-95">
                  Découvrir
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
                <span className="text-xs text-zinc-500 font-medium">4.7 — 800+ avis</span>
              </div>
            </div>
          </a>
        </div>

        {/* Trust strip */}
        <div className="mt-14 flex flex-wrap items-center justify-center gap-8 sm:gap-12">
          {[
            { icon: "M5 13l4 4L19 7", label: "Livraison 48h gratuite" },
            { icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", label: "Garantie 2 ans" },
            { icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15", label: "Retour 14 jours" },
            { icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z", label: "Paiement sécurisé" },
          ].map((t) => (
            <div key={t.label} className="flex items-center gap-2.5">
              <svg className="w-4 h-4 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d={t.icon} />
              </svg>
              <span className="text-xs text-zinc-500 font-medium">{t.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── FEATURES ─────────────────────────── */
function FeaturesHighlight() {
  return (
    <section id="features" className="w-full bg-zinc-950 border-y border-zinc-800/50">
      <div className="max-w-6xl mx-auto px-6 py-20 sm:py-28">
        <div className="text-center mb-16">
          <p className="text-[11px] font-medium text-zinc-500 uppercase tracking-[0.25em] mb-4">Avantages</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 tracking-tight">
            Pourquoi choisir OxaPlay.
          </h2>
          <p className="text-zinc-500 max-w-lg mx-auto leading-relaxed text-sm">
            Une technologie premium pensée pour transformer votre conduite.
          </p>
        </div>

        <div className="space-y-0 divide-y divide-zinc-800/60">
          {HIGHLIGHTS.map((h, i) => (
            <div
              key={h.title}
              className="group flex items-start gap-6 py-7 first:pt-0 last:pb-0"
            >
              <span className="shrink-0 text-[11px] font-medium text-zinc-700 tabular-nums pt-1 w-6 text-right">0{i + 1}</span>
              <div className="shrink-0 w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center group-hover:border-zinc-700 group-hover:bg-zinc-800 transition-colors duration-300">
                <svg className="w-5 h-5 text-zinc-500 group-hover:text-white transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={h.svg} />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-semibold text-white mb-1 tracking-tight">{h.title}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">{h.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── HOW IT WORKS ─────────────────────────── */
const STEPS = [
  {
    num: "01",
    title: "Branchez",
    desc: "Connectez l'écran à l'allume-cigare de votre véhicule.",
    svg: "M13 10V3L4 14h7v7l9-11h-7z",
  },
  {
    num: "02",
    title: "Connectez",
    desc: "Activez le Bluetooth sur votre téléphone et appairez-le.",
    svg: "M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.858 15.355-5.858 21.213 0",
  },
  {
    num: "03",
    title: "Profitez",
    desc: "CarPlay et Android Auto s'affichent. Bonne route !",
    svg: "M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z",
  },
];

function HowItWorks() {
  return (
    <section className="w-full bg-zinc-950 border-y border-zinc-800/50">
      <div className="max-w-5xl mx-auto px-6 py-20 sm:py-28">
        <div className="text-center mb-16">
          <p className="text-[11px] font-medium text-zinc-500 uppercase tracking-[0.25em] mb-4">Simplicité</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 tracking-tight">
            Installation en 3 étapes.
          </h2>
          <p className="text-zinc-500 text-sm">Aucun outil requis. Prêt en 2 minutes.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {STEPS.map((s, i) => (
            <div key={s.num} className="relative text-center group">
              {/* Connector line */}
              {i < STEPS.length - 1 && (
                <div className="hidden sm:block absolute top-12 left-[60%] w-[80%] h-px bg-zinc-800" />
              )}

              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-zinc-900 border border-zinc-800 group-hover:border-zinc-700 transition-all duration-300 mb-6">
                <svg className="w-7 h-7 text-zinc-400 group-hover:text-white transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={s.svg} />
                </svg>
              </div>

              <div className="text-xs font-medium text-zinc-600 tracking-[0.2em] mb-2">{s.num}</div>
              <h3 className="text-lg font-semibold text-white mb-2 tracking-tight">{s.title}</h3>
              <p className="text-sm text-zinc-500 leading-relaxed max-w-xs mx-auto">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── TESTIMONIALS ─────────────────────────── */
function Testimonials() {
  return (
    <section id="avis" className="w-full bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6 py-20 sm:py-28">
        <div className="text-center mb-16">
          <p className="text-[11px] font-medium text-zinc-500 uppercase tracking-[0.25em] mb-4">Témoignages</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 tracking-tight">
            Ils l&apos;ont adopté.
          </h2>
          <p className="text-zinc-500 text-sm">Découvrez les retours de nos clients en vidéo.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {TESTIMONIAL_VIDEOS.map((src, i) => (
            <div
              key={i}
              className="rounded-2xl overflow-hidden bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-all duration-500"
            >
              <video
                src={src}
                controls
                playsInline
                preload="metadata"
                className="w-full aspect-[9/16] object-cover bg-zinc-900"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


/* ─────────────────────────── FOOTER ─────────────────────────── */
function Footer() {
  return (
    <footer className="w-full border-t border-zinc-800/50 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <Image src="/logo-2.png" alt="OxaPlay" width={100} height={32} className="object-contain mb-5 opacity-80" />
            <p className="text-sm text-zinc-600 leading-relaxed">L&apos;écran CarPlay & Android Auto premium pour votre véhicule.</p>
            <p className="mt-3 text-sm"><a href="mailto:support@oxaplay.com" className="text-zinc-500 hover:text-white transition-colors duration-300">support@oxaplay.com</a></p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-[11px] font-medium text-zinc-400 uppercase tracking-[0.2em] mb-4">Navigation</h3>
            <ul className="space-y-2.5">
              {FOOTER_NAV.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-zinc-600 hover:text-white transition-colors duration-300">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-[11px] font-medium text-zinc-400 uppercase tracking-[0.2em] mb-4">Informations légales</h3>
            <ul className="space-y-2.5">
              {FOOTER_LEGAL.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-zinc-600 hover:text-white transition-colors duration-300">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-[11px] font-medium text-zinc-400 uppercase tracking-[0.2em] mb-4">Société</h3>
            <div className="space-y-2.5 text-sm text-zinc-600">
              <p>OxaPlay SAS</p>
              <p>42 Rue du Faubourg Saint-Honoré</p>
              <p>75008 Paris, France</p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-14 pt-8 border-t border-zinc-800/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-700">© 2025 OxaPlay. Tous droits réservés.</p>
          <Image src="/badges_paiement.png" alt="Moyens de paiement" width={160} height={20} className="object-contain opacity-30" />
        </div>
      </div>
    </footer>
  );
}

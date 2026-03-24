"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import FAQ from "../components/FAQ";
import RatingBadge from "../components/RatingBadge";
import Header from "../components/Header";

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

/* ─── Glow utility ─── */
const GLOW = "shadow-[0_0_30px_-5px_rgba(168,85,247,0.4)]";
const GLOW_SM = "shadow-[0_0_20px_-5px_rgba(168,85,247,0.2)]";

/* ═══════════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════════ */
export default function Home() {
  const [loading, setLoading] = useState(true);
  const [pricesData, setPricesData] = useState<{
    voiture: { actual: number; original: number; discount: number } | null;
    moto: { actual: number; original: number; discount: number } | null;
  }>({
    voiture: null,
    moto: null,
  });

  useEffect(() => {
    async function fetchPrices() {
      try {
        const res = await fetch("/api/prices");
        if (res.ok) {
          const data = await res.json();
          
          setPricesData({
            voiture: { 
              actual: data.carplayVoitureEur,
              original: data.carplayVoitureOriginalEur,
              discount: data.carplayVoitureDiscount || 50
            },
            moto: { 
              actual: data.carplayMotoEur,
              original: data.carplayMotoOriginalEur,
              discount: data.carplayMotoDiscount || 50
            },
          });
        }
      } catch (err) {
        console.error("Failed to fetch prices:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchPrices();
  }, []);

  return (
    <main className="w-full min-h-screen bg-black text-white overflow-x-hidden">
      <Header />
      <Hero pricesData={pricesData} loading={loading} />
      <BrandStrip />
      <Testimonials />
      <ProductsCTA pricesData={pricesData} loading={loading} />
      <FeaturesHighlight />
      <HowItWorks />
      <FAQ />
      <Footer />
    </main>
  );
}

/* ─────────────────────────── HERO ─────────────────────────── */
type PriceData = { actual: number; original: number; discount: number } | null;
function Hero({ pricesData, loading }: { pricesData: { voiture: PriceData; moto: PriceData }; loading: boolean }) {
  return (
    <section className="relative w-full min-h-[420px] sm:min-h-[600px] lg:min-h-[700px] flex items-center">
      {/* Full-width immersive background (hero-car is the main visual) */}
      <div className="absolute inset-0 flex items-center justify-end z-0">
        <div className="relative w-full sm:w-[70%] h-full">
          <Image
            src="/car-edition.png"
            alt=""
            fill
            sizes="(max-width: 640px) 100vw, 70vw"
            className="object-contain object-right opacity-40 sm:opacity-100"
            priority
          />
        </div>
      </div>
      {/* Gradient fade from left to blend image */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-black via-black/90 sm:via-black/80 to-transparent" />
      <div className="absolute inset-y-0 right-0 w-1/3 z-[1] bg-gradient-to-l from-black/60 via-transparent to-transparent" />

      {/* Centered text content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 py-10 sm:py-20">
        {/* Rating */}
        <div className="flex items-center gap-3 mb-6 justify-center sm:justify-start">
          <RatingBadge />
          <span className="text-sm text-gray-300 font-medium">+2 000 clients satisfaits</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-center sm:text-left">
          <span className="text-zinc-50">TRANSFORMEZ</span>
          <br />
          <span className="text-zinc-50">VOTRE VOITURE AVEC</span>
          <br />
          <span className="bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">OXAPLAY</span>
        </h1>
        <p className="mt-6 text-gray-400 text-base sm:text-lg max-w-lg leading-relaxed text-center sm:text-left">
          L’écran CarPlay & Android Auto sans fil, plug-and-play.
          Compatible avec 98% des véhicules. Installation en 5 minutes.
        </p>
        {/* Product Selection Cards */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-3xl">
          {/* Voiture */}
          <a
            href="/carplay-voiture"
            className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-900/90 to-black border border-white/[0.08] hover:border-purple-500/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_20px_60px_-15px_rgba(168,85,247,0.3)]"
          >
            {/* Background Image with Overlay */}
            <div className="relative h-48 overflow-hidden">
              <Image 
                src="/Voiture/photos_produits/2.jpg" 
                alt="CarPlay Voiture" 
                fill 
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-cover opacity-60 group-hover:opacity-80 group-hover:scale-110 transition-all duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative p-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1 group-hover:text-purple-400 transition-colors">
                    CarPlay Voiture
                  </h3>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Écran 10.26" IPS</p>
                </div>
                <div className="text-right">
                  {loading ? (
                    <>
                      <div className="h-8 w-24 bg-white/5 rounded animate-pulse mb-1" />
                      <div className="h-3 w-16 bg-white/5 rounded animate-pulse ml-auto" />
                    </>
                  ) : pricesData.voiture ? (
                    <>
                      <p className="text-2xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        {(pricesData.voiture.actual / 100).toFixed(2).replace(".", ",")} €
                      </p>
                      <p className="text-xs text-gray-600 line-through">{(pricesData.voiture.original / 100).toFixed(2).replace(".", ",")} €</p>
                    </>
                  ) : null}
                </div>
              </div>

              {/* Features */}
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-2.5 py-1 rounded-md bg-white/5 text-[10px] text-gray-400 font-medium border border-white/10">
                  Sans fil
                </span>
                <span className="px-2.5 py-1 rounded-md bg-white/5 text-[10px] text-gray-400 font-medium border border-white/10">
                  Plug & Play
                </span>
              </div>

              {/* CTA Arrow */}
              <div className="flex items-center justify-between">
                <span className="text-xs text-purple-400 font-semibold group-hover:text-purple-300 transition-colors">
                  Découvrir →
                </span>
                <div className="w-8 h-8 rounded-full bg-purple-600/20 flex items-center justify-center group-hover:bg-purple-600/40 transition-colors">
                  <svg className="w-4 h-4 text-purple-400 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </div>
            </div>
          </a>

          {/* Moto */}
          <a
            href="/carplay-moto"
            className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-900/90 to-black border border-white/[0.08] hover:border-purple-500/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_20px_60px_-15px_rgba(168,85,247,0.3)]"
          >
            {/* Background Image with Overlay */}
            <div className="relative h-48 overflow-hidden">
              <Image 
                src="/Moto/photos_produits/2.jpg" 
                alt="CarPlay Moto" 
                fill 
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-cover opacity-60 group-hover:opacity-80 group-hover:scale-110 transition-all duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative p-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1 group-hover:text-purple-400 transition-colors">
                    CarPlay Moto
                  </h3>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Écran 5" Compact</p>
                </div>
                <div className="text-right">
                  {loading ? (
                    <>
                      <div className="h-8 w-24 bg-white/5 rounded animate-pulse mb-1" />
                      <div className="h-3 w-16 bg-white/5 rounded animate-pulse ml-auto" />
                    </>
                  ) : pricesData.moto ? (
                    <>
                      <p className="text-2xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        {(pricesData.moto.actual / 100).toFixed(2).replace(".", ",")} €
                      </p>
                      <p className="text-xs text-gray-600 line-through">{(pricesData.moto.original / 100).toFixed(2).replace(".", ",")} €</p>
                    </>
                  ) : null}
                </div>
              </div>

              {/* Features */}
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-2.5 py-1 rounded-md bg-white/5 text-[10px] text-gray-400 font-medium border border-white/10">
                  GPS intégré
                </span>
                <span className="px-2.5 py-1 rounded-md bg-white/5 text-[10px] text-gray-400 font-medium border border-white/10">
                  Résistant
                </span>
              </div>

              {/* CTA Arrow */}
              <div className="flex items-center justify-between">
                <span className="text-xs text-purple-400 font-semibold group-hover:text-purple-300 transition-colors">
                  Découvrir →
                </span>
                <div className="w-8 h-8 rounded-full bg-purple-600/20 flex items-center justify-center group-hover:bg-purple-600/40 transition-colors">
                  <svg className="w-4 h-4 text-purple-400 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── BRAND STRIP + TRUST BAR ─────────────────────────── */
function BrandStrip() {
  const logos = [...BRANDS, ...BRANDS];
  return (
    <section className="w-full border-y border-white/[0.06] bg-black/60 overflow-hidden">
      {/* Scrolling car logos */}
      <div className="py-6">
        <div className="flex w-max animate-marquee gap-12">
          {logos.map((b, i) => (
            <div
              key={`${b.alt}-${i}`}
              className="relative h-24 w-56 shrink-0 opacity-60 hover:opacity-100 transition-opacity"
            >
              <Image src={b.src} alt={b.alt} fill sizes="112px" className="object-contain" />
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}

/* ─────────────────────────── PRODUCTS CTA ─────────────────────────── */
function ProductsCTA({ pricesData, loading }: { pricesData: { voiture: PriceData; moto: PriceData }; loading: boolean }) {
  return (
    <section id="products" className="w-full bg-black py-14 sm:py-20 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-purple-600/[0.04] rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-purple-400 text-xs font-bold uppercase tracking-[0.2em] mb-6">
            Nos Produits
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-50 mb-5">
            Choisissez votre écran CarPlay
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto leading-relaxed">Plug & play, sans fil, compatible avec 98% des véhicules.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* ── CarPlay Voiture ── */}
          <a href="/carplay-voiture" className="group relative rounded-3xl overflow-hidden border border-white/[0.08] hover:border-purple-500/40 transition-all duration-700 hover:shadow-[0_0_60px_-15px_rgba(168,85,247,0.25)]">
            {/* Product image */}
            <div className="relative h-72 sm:h-80 bg-gradient-to-br from-zinc-900 to-black overflow-hidden">
              <Image
                src="/Voiture/photos_produits/2.jpg"
                alt="CarPlay Voiture"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            </div>

            {/* Card content */}
            <div className="relative bg-black p-8">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-zinc-50 mb-1">CarPlay Voiture</h3>
                  <p className="text-sm text-gray-500">Écran 10.26&quot; IPS HD panoramique</p>
                </div>
                <div className="text-right shrink-0">
                  {loading ? (
                    <>
                      <div className="h-8 w-24 bg-white/5 rounded animate-pulse mb-1" />
                      <div className="h-3 w-16 bg-white/5 rounded animate-pulse ml-auto" />
                    </>
                  ) : pricesData.voiture ? (
                    <>
                      <p className="text-2xl font-extrabold text-zinc-50">{(pricesData.voiture.actual / 100).toFixed(2).replace(".", ",")} €</p>
                      <p className="text-xs text-gray-500 line-through">{(pricesData.voiture.original / 100).toFixed(2).replace(".", ",")} €</p>
                    </>
                  ) : null}
                </div>
              </div>

              {/* Features mini pills */}
              <div className="flex flex-wrap gap-2 mb-6">
                {["Sans fil", "CarPlay + Android", "Plug & Play"].map((f) => (
                  <span key={f} className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.06] text-[11px] text-gray-400 font-medium">{f}</span>
                ))}
              </div>

              {/* CTA row */}
              <div className="flex items-center justify-between">
                <span className={`inline-flex items-center gap-2 px-7 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 group-hover:from-purple-500 group-hover:to-indigo-500 text-white font-bold text-sm transition-all duration-300 ${GLOW}`}>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                  Découvrir
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="inline-flex items-center justify-center w-5 h-5 rounded-[3px] bg-green-500">
                    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="white"><path d="M12 17.27l-5.18 3.05 1.4-5.95L3.5 9.24l6.06-.52L12 3l2.44 5.72 6.06.52-4.72 5.13 1.4 5.95z" /></svg>
                  </span>
                  <span className="text-xs text-gray-400 font-medium">4.8 — 2 000+ avis</span>
                </div>
              </div>
            </div>
          </a>

          {/* ── CarPlay Moto ── */}
          <a href="/carplay-moto" className="group relative rounded-3xl overflow-hidden border border-white/[0.08] hover:border-purple-500/40 transition-all duration-700 hover:shadow-[0_0_60px_-15px_rgba(168,85,247,0.25)]">
            {/* Product image */}
            <div className="relative h-72 sm:h-80 bg-gradient-to-br from-zinc-900 to-black overflow-hidden">
              <Image
                src="/Moto/photos_produits/3.jpg"
                alt="CarPlay Moto"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            </div>

            {/* Card content */}
            <div className="relative bg-black p-8">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-zinc-50 mb-1">CarPlay Moto</h3>
                  <p className="text-sm text-gray-500">Écran 5&quot; compact & étanche IP67</p>
                </div>
                <div className="text-right shrink-0">
                  {loading ? (
                    <>
                      <div className="h-8 w-24 bg-white/5 rounded animate-pulse mb-1" />
                      <div className="h-3 w-16 bg-white/5 rounded animate-pulse ml-auto" />
                    </>
                  ) : pricesData.moto ? (
                    <>
                      <p className="text-2xl font-extrabold text-zinc-50">{(pricesData.moto.actual / 100).toFixed(2).replace(".", ",")} €</p>
                      <p className="text-xs text-gray-500 line-through">{(pricesData.moto.original / 100).toFixed(2).replace(".", ",")} €</p>
                    </>
                  ) : null}
                </div>
              </div>

              {/* Features mini pills */}
              <div className="flex flex-wrap gap-2 mb-6">
                {["Étanche IP67", "GPS intégré", "Soleil lisible"].map((f) => (
                  <span key={f} className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.06] text-[11px] text-gray-400 font-medium">{f}</span>
                ))}
              </div>

              {/* CTA row */}
              <div className="flex items-center justify-between">
                <span className={`inline-flex items-center gap-2 px-7 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 group-hover:from-purple-500 group-hover:to-indigo-500 text-white font-bold text-sm transition-all duration-300 ${GLOW}`}>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                  Découvrir
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="inline-flex items-center justify-center w-5 h-5 rounded-[3px] bg-green-500">
                    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="white"><path d="M12 17.27l-5.18 3.05 1.4-5.95L3.5 9.24l6.06-.52L12 3l2.44 5.72 6.06.52-4.72 5.13 1.4 5.95z" /></svg>
                  </span>
                  <span className="text-xs text-gray-400 font-medium">4.7 — 800+ avis</span>
                </div>
              </div>
            </div>
          </a>
        </div>

        {/* Bottom trust strip */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8">
          {[
            { icon: "M5 13l4 4L19 7", label: "Livraison 48h gratuite" },
            { icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", label: "Garantie 2 ans" },
            { icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15", label: "Retour 14 jours" },
            { icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z", label: "Paiement sécurisé" },
          ].map((t) => (
            <div key={t.label} className="flex items-center gap-2">
              <svg className="w-4 h-4 text-purple-400/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d={t.icon} />
              </svg>
              <span className="text-xs text-gray-500 font-medium">{t.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── FEATURES HIGHLIGHT ─────────────────────────── */
function FeaturesHighlight() {
  return (
    <section id="features" className="w-full bg-black">
      <div className="max-w-7xl mx-auto px-4 py-14 sm:py-20">
        <span className="block text-center text-xs font-bold text-purple-400 uppercase tracking-[0.2em] mb-4">Avantages</span>
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-zinc-50 mb-4">
          POURQUOI CHOISIR OXAPLAY ?
        </h2>
        <p className="text-center text-gray-400 mb-16 max-w-2xl mx-auto leading-relaxed">
          Une technologie premium pensée pour transformer votre expérience de conduite
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {HIGHLIGHTS.map((h) => (
            <div
              key={h.title}
              className="flex items-start gap-4 rounded-xl bg-white/[0.03] backdrop-blur-lg border border-white/10 p-7 hover:border-purple-500/50 hover:shadow-[0_0_30px_-5px_rgba(168,85,247,0.12)] hover:scale-[1.02] transition-all duration-500"
            >
              <div className="shrink-0 mt-0.5">
                <svg className="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="text-base font-bold text-zinc-50 mb-1">{h.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{h.desc}</p>
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
    num: "1",
    title: "Branchez",
    desc: "Connectez l’écran à l’allume-cigare de votre véhicule.",
    svg: "M13 10V3L4 14h7v7l9-11h-7z",
  },
  {
    num: "2",
    title: "Connectez",
    desc: "Activez le Bluetooth sur votre téléphone et appairez-le.",
    svg: "M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.858 15.355-5.858 21.213 0",
  },
  {
    num: "3",
    title: "Profitez",
    desc: "CarPlay et Android Auto s’affichent. Bonne route !",
    svg: "M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z",
  },
];

function HowItWorks() {
  return (
    <section className="w-full bg-black">
      <div className="max-w-5xl mx-auto px-4 py-14 sm:py-20">
        <span className="block text-center text-xs font-bold text-purple-400 uppercase tracking-[0.2em] mb-4">Simplicité</span>
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-zinc-50 mb-4">
          INSTALLATION EN 3 ÉTAPES
        </h2>
        <p className="text-center text-gray-400 mb-16 leading-relaxed">Aucun outil requis. Même votre grand-mère peut le faire.</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
          {STEPS.map((s, i) => (
            <div key={s.num} className="relative text-center">
              {/* Connector line */}
              {i < STEPS.length - 1 && (
                <div className="hidden sm:block absolute top-10 left-[60%] w-[80%] h-px bg-gradient-to-r from-purple-500/30 to-transparent" />
              )}

              {/* Step number + icon */}
              <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-700 ${GLOW_SM} mb-7`}>
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={s.svg} />
                </svg>
              </div>

              <div className="text-xs font-bold text-purple-400 uppercase tracking-[0.2em] mb-2">Étape {s.num}</div>
              <h3 className="text-lg font-bold text-zinc-50 mb-2">{s.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed max-w-xs mx-auto">{s.desc}</p>
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
    <section id="avis" className="w-full bg-black">
      <div className="max-w-7xl mx-auto px-4 py-14 sm:py-20">
        <span className="block text-center text-xs font-bold text-purple-400 uppercase tracking-[0.2em] mb-4">Social Proof</span>
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-zinc-50 mb-4">
          TÉMOIGNAGES CLIENTS
        </h2>
        <p className="text-center text-gray-400 mb-14 leading-relaxed">Découvrez ce que nos clients pensent de leur OxaPlay</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIAL_VIDEOS.map((src, i) => (
            <div
              key={i}
              className="rounded-2xl overflow-hidden border border-white/10 hover:border-purple-500/50 hover:shadow-[0_0_30px_-5px_rgba(168,85,247,0.15)] transition-all duration-500 bg-white/[0.03] backdrop-blur-lg"
            >
              <video
                src={src}
                controls
                playsInline
                preload="metadata"
                className="w-full aspect-[9/16] object-cover rounded-2xl bg-zinc-900"
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
    <footer className="w-full border-t border-white/[0.06] bg-black">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <Image src="/logo-2.png" alt="OxaPlay" width={120} height={40} className="object-contain mb-5" />
            <p className="text-sm text-gray-500 leading-relaxed">L’écran CarPlay & Android Auto premium pour votre véhicule.</p>
            <p className="mt-3 text-sm text-gray-500"><a href="mailto:support@oxaplay.com" className="text-purple-400 hover:underline">support@oxaplay.com</a></p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-xs font-semibold text-zinc-50 uppercase tracking-[0.15em] mb-4">Navigation</h3>
            <ul className="space-y-2">
              {FOOTER_NAV.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-gray-500 hover:text-purple-400 transition-colors">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-xs font-semibold text-zinc-50 uppercase tracking-[0.15em] mb-4">Informations légales</h3>
            <ul className="space-y-2">
              {FOOTER_LEGAL.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-gray-500 hover:text-purple-400 transition-colors">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-xs font-semibold text-zinc-50 uppercase tracking-[0.15em] mb-4">Société</h3>
            <div className="space-y-2 text-sm text-gray-500">
              <p>OxaPlay SAS</p>
              <p>42 Rue du Faubourg Saint-Honoré</p>
              <p>75008 Paris, France</p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-white/[0.06] flex flex-col items-center gap-4">
          <Image src="/badges_paiement.png" alt="Moyens de paiement" width={180} height={22} className="object-contain opacity-50" />
          <p className="text-xs text-gray-600">© 2025 OxaPlay. Tous droits réservés.</p>
        </div>
      </div>

      {/* Bottom neon bar */}
      <div className="w-full h-1 bg-gradient-to-r from-purple-700 via-purple-500 to-purple-700" />
    </footer>
  );
}

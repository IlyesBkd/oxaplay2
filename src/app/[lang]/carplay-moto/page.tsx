"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/app/components/Header";
import CheckoutModal from "@/app/components/CheckoutModal";
import RatingBadge from "@/app/components/RatingBadge";
import { usePostHog } from "posthog-js/react";

/* ─── Data ─── */
const GLOW = "shadow-[0_0_30px_-5px_rgba(168,85,247,0.4)]";
const GLOW_SM = "shadow-[0_0_20px_-5px_rgba(168,85,247,0.2)]";

const GALLERY = [
  "/Moto/photos_produits/1.jpg",
  "/Moto/photos_produits/2.jpg",
  "/Moto/photos_produits/3.jpg",
  "/Moto/photos_produits/4.jpg",
  "/Moto/photos_produits/5.jpg",
];

const MOTO_BRANDS = [
  { src: "/logo-car/BMW-Logo.wine.svg", alt: "BMW" },
  { src: "/logo-car/Honda-Logo.wine.svg", alt: "Honda" },
  { src: "/logo-car/Porsche-Logo.wine.svg", alt: "Porsche" },
  { src: "/logo-car/Lamborghini-Logo.wine.svg", alt: "Lamborghini" },
  { src: "/logo-car/Audi-Logo.wine.svg", alt: "Audi" },
  { src: "/logo-car/Mercedes-Benz-Logo.wine.svg", alt: "Mercedes-Benz" },
  { src: "/logo-car/Ford_Motor_Company-Logo.wine.svg", alt: "Ford" },
  { src: "/logo-car/Tesla,_Inc.-Logo.wine.svg", alt: "Tesla" },
  { src: "/logo-car/Citroën-Logo.wine.svg", alt: "Citroën" },
  { src: "/logo-car/Automobile_Dacia-Logo.wine.svg", alt: "Dacia" },
];

const BENTO_FEATURES = [
  {
    title: "Navigation & Musique",
    desc: "Wi-Fi intégré et Bluetooth 5.0 pour le GPS (Waze/Maps), appels et musique sans fil. Restez connecté sur la route.",
    svg: "M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.858 15.355-5.858 21.213 0",
    span: "sm:col-span-2 sm:row-span-1",
  },
  {
    title: "Contrôle tactile",
    desc: "Écran tactile LCD 5 pouces (1024×480), luminosité adaptée pour une lisibilité parfaite même en plein soleil.",
    svg: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
    span: "sm:col-span-1 sm:row-span-1",
  },
  {
    title: "Robustesse extrême",
    desc: "Conçu pour l'extérieur : matériaux LCD, plastique et métal. Résistant aux intempéries, vibrations et UV. Certifié IP67.",
    svg: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
    span: "sm:col-span-1 sm:row-span-1",
  },
  {
    title: "Connectivité universelle",
    desc: "Support total iPhone (CarPlay) et Android (Android Auto). Passez de l'un à l'autre sans configuration.",
    svg: "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z",
    span: "sm:col-span-2 sm:row-span-1",
  },
];

const SPECS_LEFT = [
  { label: "Marque / Modèle", value: "Leshida Q5S" },
  { label: "Type", value: "Navigation GPS Moto Portable" },
  { label: "Connectivité", value: "Wi-Fi intégré, Bluetooth 5.0" },
  { label: "Écran", value: 'Tactile LCD 5", 1024×480' },
  { label: "Compatibilité", value: "CarPlay & Android Auto" },
  { label: "Placement", value: "Avant (Guidon)" },
  { label: "Étanchéité", value: "IP67" },
  { label: "Matériaux", value: "LCD, Plastique, Métal" },
  { label: "Certifications", value: "CE, FCC, RoHS" },
  { label: "Garantie", value: "1 an constructeur" },
];

const BOX_ITEMS = [
  "1× Écran Connecté Moto (Leshida Q5S)",
  "1× Support de fixation guidon robuste",
  "1× Kit de câblage d'alimentation (batterie)",
  "1× Matériel de montage (Plastique/Métal)",
  "1× Manuel d'utilisation",
];

const TESTIMONIAL_VIDEOS = [
  "/Voiture/temoignages_clients/8617e897bf7249b88b80b3d27bf0e139.HD-720p-1.6Mbps-55016171.mp4",
  "/Voiture/temoignages_clients/b6ee109822b549dba85b66bdf05c87e7.HD-720p-1.6Mbps-55016167.mp4",
  "/Voiture/temoignages_clients/e31e12046750442496efb7bbc708240f.HD-720p-1.6Mbps-55016169.mp4",
  "/Voiture/temoignages_clients/f846a94508024394a8b09956d50115d5.HD-720p-1.6Mbps-55016168.mp4",
];

const FAQ_ITEMS = [
  { q: "Ma moto est-elle compatible ?", a: "Oui, l'écran se fixe sur n'importe quel guidon standard (22mm ou 28mm). Le kit de fixation universel s'adapte à 99% des motos du marché." },
  { q: "Est-ce vraiment étanche ?", a: "Oui, l'écran est certifié IP67 : résistant à la pluie, aux éclaboussures et à la poussière. Il est conçu pour rouler par tous les temps." },
  { q: "Comment l'écran est-il alimenté ?", a: "Via un câblage relié à la batterie de votre moto (kit fourni). L'installation est simple et ne nécessite aucune modification du circuit électrique." },
  { q: "Puis-je le retourner ?", a: "Oui, vous avez 14 jours pour retourner le produit et être remboursé intégralement. Contactez support@oxaplay.com." },
];

export default function CarPlayMotoPage() {
  const [activeImg, setActiveImg] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const [price, setPrice] = useState("129,99 €");
  const [discount, setDiscount] = useState(50);
  const [loading, setLoading] = useState(true);
  const [showSticky, setShowSticky] = useState(false);
  const posthog = usePostHog();

  useEffect(() => {
    async function fetchPrice() {
      try {
        const res = await fetch("/api/prices");
        if (res.ok) {
          const prices = await res.json();
          const priceEur = (prices.carplayMotoEur / 100).toFixed(2).replace(".", ",");
          setPrice(`${priceEur} €`);
          setDiscount(prices.carplayMotoDiscount || 50);
          
          // Track Product_Viewed event
          if (posthog) {
            try {
              posthog.capture('Product_Viewed', {
                product_name: 'CarPlay Moto',
                price: prices.carplayMotoEur / 100,
              });
            } catch (error) {
              console.error('[PostHog] Error tracking Product_Viewed:', error);
            }
          }
        }
      } catch (err) {
        console.error("Failed to fetch prices:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchPrice();
  }, [posthog]);

  // Scroll listener for sticky CTA
  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById('commander');
      if (heroSection) {
        const rect = heroSection.getBoundingClientRect();
        // Show sticky when the CTA button is below viewport
        setShowSticky(rect.bottom < 0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle checkout button click with tracking
  const handleCheckoutClick = () => {
    if (posthog) {
      try {
        posthog.capture('Checkout_Started', {
          product_name: 'CarPlay Moto',
          price: parseFloat(price.replace(',', '.').replace(' €', '')),
          currency: 'EUR',
        });
      } catch (error) {
        console.error('[PostHog] Error tracking Checkout_Started:', error);
      }
    }
    setShowCheckout(true);
  };

  return (
    <main className="w-full min-h-screen bg-black text-white overflow-x-hidden">
      {/* ─── NAVBAR ─── */}
      <Header />

      {/* ─── PRODUCT HERO: Immersive Split ─── */}
      <section className="relative w-full min-h-[70vh] lg:min-h-[85vh] flex flex-col lg:flex-row">
        {/* LEFT: Full-bleed image */}
        <div className="relative w-full lg:w-1/2 min-h-[50vh] lg:min-h-full">
          <Image
            src={GALLERY[activeImg]}
            alt="Écran CarPlay sans fil 5 pouces étanche IP67 pour moto - GPS et navigation"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
            priority
          />
          <div className="hidden lg:block absolute inset-y-0 right-0 w-32 bg-gradient-to-r from-transparent to-black" />
          <div className="lg:hidden absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black to-transparent" />

          {/* Floating vertical thumbnails */}
          <div className="absolute left-4 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-2.5 z-10">
            {GALLERY.map((src, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                className={`relative w-14 h-14 rounded-lg overflow-hidden border-2 transition-all duration-300 backdrop-blur-sm ${
                  activeImg === i
                    ? "border-purple-500 shadow-[0_0_15px_-3px_rgba(168,85,247,0.5)] scale-110"
                    : "border-white/20 hover:border-white/50 opacity-70 hover:opacity-100"
                }`}
              >
                <Image src={src} alt={`Écran CarPlay moto vue ${i + 1}`} fill sizes="56px" className="object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT: Product info */}
        <div className="relative w-full lg:w-1/2 flex items-center bg-black">
          <div className="w-full max-w-xl mx-auto px-6 sm:px-10 lg:px-14 py-12 lg:py-0">
            {/* Mobile thumbnails - moved to top */}
            <div className="flex gap-2.5 lg:hidden mb-6">
              {GALLERY.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`relative w-1/5 aspect-square rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                    activeImg === i
                      ? "border-purple-500 shadow-[0_0_12px_-3px_rgba(168,85,247,0.4)]"
                      : "border-white/10 hover:border-white/30"
                  }`}
                >
                  <Image src={src} alt={`Écran CarPlay moto aperçu ${i + 1}`} fill sizes="80px" className="object-cover" />
                </button>
              ))}
            </div>

            <span className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-purple-400 text-xs font-bold uppercase tracking-[0.2em] mb-6">
              Édition Moto
            </span>

            <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-zinc-50 mb-4 sm:mb-5 tracking-tight leading-tight">
              Écran Connecté<br />CarPlay & Android Auto
            </h1>

            <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-6 sm:mb-8 max-w-md">
              L&apos;écran 5&quot; étanche IP67 pour transformer votre moto en deux-roues connecté. GPS, musique et appels mains libres.
            </p>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-10">
              <RatingBadge />
              <span className="text-sm text-gray-400">800+ avis</span>
            </div>

            {/* Price */}
            <div className="flex flex-col sm:flex-row sm:items-end gap-3 sm:gap-4 mb-8 sm:mb-10">
              <div className="flex flex-col sm:flex-row sm:items-end gap-2">
                <span className="text-4xl sm:text-5xl font-extrabold text-zinc-50">{price}</span>
                <span className="text-lg sm:text-xl text-gray-500 line-through sm:mb-0 mb-1 sm:mb-0">259,99 €</span>
              </div>
              <span className="px-4 py-2 rounded-xl bg-gradient-to-r from-green-600/20 to-emerald-600/20 text-green-400 text-base sm:text-sm font-bold border border-green-500/30 shadow-[0_0_15px_-3px_rgba(34,197,94,0.3)]">-{discount}%</span>
            </div>

            {/* CTA */}
            <div id="commander" className="space-y-4 mb-10">
              <button
                onClick={handleCheckoutClick}
                className="animate-glow-pulse flex items-center justify-center gap-3 w-full py-5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xl transition-all duration-300 cursor-pointer"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
                </svg>
                Commander maintenant
              </button>
              <p className="text-center text-xs text-gray-500">Livraison gratuite en 48h</p>
            </div>

            {/* Payment */}
            <div className="flex flex-col items-center gap-2">
              <Image src="/badges_paiement.png" alt="Moyens de paiement" width={200} height={24} className="object-contain opacity-60" />
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span className="text-xs text-gray-500">Paiement sécurisé</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── BRAND MARQUEE ─── */}
      <section className="w-full border-y border-white/[0.06] bg-black/60 overflow-hidden">
        <div className="py-5">
          <p className="text-center text-xs font-bold text-purple-400 uppercase tracking-[0.2em] mb-4">Compatible avec 99% des deux-roues</p>
          <div className="flex w-max animate-marquee gap-12">
            {[...MOTO_BRANDS, ...MOTO_BRANDS].map((b, i) => (
              <div key={`${b.alt}-${i}`} className="relative h-24 w-56 shrink-0 opacity-60 hover:opacity-100 transition-opacity">
                <Image src={b.src} alt={b.alt} fill sizes="112px" className="object-contain" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FOCUS PRODUIT ─── */}
      <section className="w-full bg-black">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left: Text */}
            <div className="border-l-2 border-purple-500 pl-8">
              <span className="block text-xs font-bold text-purple-400 uppercase tracking-[0.2em] mb-5">Technologie & Détails</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-8">
                Conçu pour résister<br />à toutes les routes
              </h2>
              <p className="text-zinc-400 text-lg leading-relaxed mb-6">
                Un écran tactile LCD 5 pouces avec une résolution de 1024×480 pixels, optimisé pour une lisibilité parfaite même sous le soleil direct. Le revêtement anti-reflet et la luminosité adaptative garantissent un confort visuel en toutes conditions.
              </p>
              <p className="text-zinc-400 text-lg leading-relaxed">
                Certifié IP67, cet écran résiste à la pluie, la poussière et aux vibrations. Connectez-vous en Wi-Fi et Bluetooth 5.0 pour profiter de Waze, Spotify et vos appels mains libres — directement depuis votre guidon.
              </p>
            </div>

            {/* Right: Floating neon image */}
            <div className="relative flex items-center justify-center py-12">
              {/* Neon glow background */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-80 h-80 bg-purple-600/20 blur-[100px] rounded-full" />
              </div>
              {/* Product image */}
              <div className="relative w-full max-w-sm aspect-square drop-shadow-[0_0_30px_rgba(168,85,247,0.4)]">
                <Image
                  src="/Moto/photo_sans_fond_moto.png"
                  alt="Écran CarPlay Moto"
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FEATURES BENTO GRID ─── */}
      <section className="w-full bg-black py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <span className="block text-center text-xs font-bold text-purple-400 uppercase tracking-[0.2em] mb-4">Fonctionnalités</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-zinc-50 mb-16">
            Conçu pour les motards
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {BENTO_FEATURES.map((f) => (
              <div
                key={f.title}
                className={`group rounded-2xl bg-zinc-900/30 backdrop-blur-lg border border-white/10 p-8 hover:border-purple-500/50 hover:shadow-[0_0_30px_-5px_rgba(168,85,247,0.12)] transition-all duration-500 ${f.span}`}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600/20 to-indigo-600/20 border border-purple-500/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={f.svg} />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-zinc-50 mb-2">{f.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SPECS & BOX ─── */}
      <section className="w-full bg-black">
        <div className="max-w-7xl mx-auto px-4 py-12 sm:py-16">
          <span className="block text-center text-xs font-bold text-purple-400 uppercase tracking-[0.2em] mb-4">Détails</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-zinc-50 mb-16">
            Fiche technique & Contenu
          </h2>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left: Specs */}
            <div className="rounded-2xl bg-zinc-900/30 backdrop-blur-lg border border-white/10 overflow-hidden">
              <div className="px-6 py-4 border-b border-white/[0.06]">
                <h3 className="text-sm font-bold text-zinc-50 uppercase tracking-[0.15em]">Spécifications techniques</h3>
              </div>
              {SPECS_LEFT.map((s, i) => (
                <div
                  key={s.label}
                  className={`flex items-center justify-between px-6 py-3.5 ${i < SPECS_LEFT.length - 1 ? "border-b border-white/[0.04]" : ""}`}
                >
                  <span className="text-sm text-gray-500">{s.label}</span>
                  <span className="text-sm font-medium text-zinc-200 text-right max-w-[55%]">{s.value}</span>
                </div>
              ))}
            </div>

            {/* Right: Box contents */}
            <div className="rounded-2xl bg-purple-950/15 backdrop-blur-lg border border-purple-500/20 overflow-hidden">
              <div className="px-6 py-4 border-b border-purple-500/10">
                <h3 className="text-sm font-bold text-zinc-50 uppercase tracking-[0.15em]">Ce que vous recevez</h3>
              </div>
              <div className="p-6 space-y-4">
                {BOX_ITEMS.map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-purple-600/15 border border-purple-500/20 flex items-center justify-center shrink-0">
                      <svg className="w-4 h-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
              <div className="px-6 pb-6">
                <div className="rounded-xl bg-purple-600/10 border border-purple-500/15 p-4 text-center">
                  <p className="text-xs text-purple-300">Tous les accessoires inclus — Prêt à rouler</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="w-full bg-black py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <span className="block text-center text-xs font-bold text-purple-400 uppercase tracking-[0.2em] mb-4">Social Proof</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-zinc-50 mb-4">
            Ils roulent avec OxaPlay
          </h2>
          <p className="text-center text-gray-400 mb-14 leading-relaxed">Découvrez les retours de nos motards en vidéo</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TESTIMONIAL_VIDEOS.map((src, i) => (
              <div
                key={i}
                className="rounded-2xl overflow-hidden border border-white/10 hover:border-purple-500/50 hover:shadow-[0_0_30px_-5px_rgba(168,85,247,0.15)] transition-all duration-500 bg-white/[0.03] backdrop-blur-lg"
              >
                <video src={src} controls playsInline preload="metadata" className="w-full aspect-[9/16] object-cover rounded-2xl bg-zinc-900" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="w-full bg-black py-12 sm:py-16">
        <div className="max-w-3xl mx-auto px-4">
          <span className="block text-center text-xs font-bold text-purple-400 uppercase tracking-[0.2em] mb-4">Support</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-zinc-50 mb-14">
            Questions fréquentes
          </h2>

          <div className="space-y-3">
            {FAQ_ITEMS.map((item, i) => (
              <div
                key={i}
                className="rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-lg overflow-hidden transition-all duration-300 hover:border-purple-500/40"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="text-sm sm:text-base font-semibold text-zinc-50">{item.q}</span>
                  <svg
                    className={`w-5 h-5 text-purple-400 shrink-0 transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? "max-h-60 pb-5" : "max-h-0"}`}>
                  <p className="px-6 text-sm text-gray-400 leading-relaxed">{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── STICKY BOTTOM CTA (mobile) ─── */}
      {showSticky && (
        <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden">
        {/* Gradient fade top */}
        <div className="absolute inset-x-0 bottom-full h-20 bg-gradient-to-t from-black to-transparent pointer-events-none" />
        
        <div className="relative bg-gradient-to-b from-zinc-900/95 to-black/95 backdrop-blur-2xl border-t border-white/10 shadow-[0_-10px_40px_-10px_rgba(0,0,0,0.8)]">
          <div className="max-w-lg mx-auto px-4 py-4">
            {/* Price + Discount badge */}
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">{price}</span>
                <span className="text-sm text-gray-500 line-through">259,99 €</span>
              </div>
              <span className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-green-600/20 to-emerald-600/20 text-green-400 text-sm font-bold border border-green-500/30 shadow-[0_0_10px_-2px_rgba(34,197,94,0.4)]">-{discount}%</span>
            </div>
            
            {/* CTA Button */}
            <button
              onClick={handleCheckoutClick}
              className="w-full py-4 min-h-[52px] rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-base transition-all duration-300 shadow-[0_8px_30px_-8px_rgba(168,85,247,0.6)] hover:shadow-[0_8px_40px_-8px_rgba(168,85,247,0.8)] hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
              </svg>
              Commander maintenant
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
            
                      </div>
        </div>
      </div>
        </div>
      )}

      {/* Checkout Modal */}
      <CheckoutModal
        open={showCheckout}
        onClose={() => setShowCheckout(false)}
        productSlug="carplay-moto"
        productName="CarPlay Moto"
        price={price}
      />

      {/* ─── FOOTER ─── */}
      <footer className="w-full border-t border-white/[0.06] bg-black pb-20 lg:pb-0">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-gray-600">© 2025 OxaPlay. Tous droits réservés.</p>
            <div className="flex flex-wrap gap-6 text-xs text-gray-500">
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

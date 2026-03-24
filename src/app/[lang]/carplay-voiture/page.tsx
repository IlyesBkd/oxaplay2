"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/app/components/Header";
import CheckoutModal from "@/app/components/CheckoutModal";
import RatingBadge from "@/app/components/RatingBadge";
import { usePostHog } from "posthog-js/react";

/* ─── Data ─── */

const GALLERY = [
  "/Voiture/photos_produits/1.jpg",
  "/Voiture/photos_produits/2.jpg",
  "/Voiture/photos_produits/3.jpg",
  "/Voiture/photos_produits/4.jpg",
  "/Voiture/photos_produits/5.jpg",
];

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

const BENTO_FEATURES = [
  {
    title: "Son haute qualité",
    desc: "Haut-parleur intégré, transmission via câble AUX ou FM directement sur vos enceintes de voiture.",
    svg: "M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z",
    span: "sm:col-span-1 sm:row-span-1",
  },
  {
    title: "Sécurité & Recul",
    desc: "Compatible avec caméra de recul. Basculement automatique de l'écran dès que vous passez la marche arrière.",
    svg: "M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z",
    span: "sm:col-span-1 sm:row-span-1",
  },
  {
    title: "Écran Premium IPS",
    desc: "Écran IPS couleur 10.26 pouces avec des détails vifs et une luminosité adaptée, même en plein soleil. Tactile multi-points ultra-réactif.",
    svg: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
    span: "sm:col-span-2 sm:row-span-1",
  },
  {
    title: "Connectivité totale",
    desc: "CarPlay sans fil, Android Auto, lecture multimédia via carte mémoire ou Bluetooth. Tout est connecté, sans fil.",
    svg: "M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.858 15.355-5.858 21.213 0",
    span: "sm:col-span-2 sm:row-span-1",
  },
  {
    title: "Installation facile",
    desc: "Support universel inclus, alimentation allume-cigare. Aucun câblage complexe, prêt en 2 minutes chrono.",
    svg: "M13 10V3L4 14h7v7l9-11h-7z",
    span: "sm:col-span-1 sm:row-span-1",
  },
  {
    title: "Commande vocale",
    desc: "Contrôle mains libres intelligent. Lancez Siri ou Google Assistant sans quitter la route des yeux.",
    svg: "M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z",
    span: "sm:col-span-1 sm:row-span-1",
  },
];

const SPECS_LEFT = [
  { label: "Taille écran", value: '10.26" IPS HD' },
  { label: "Résolution", value: "1600 × 600 px" },
  { label: "Alimentation", value: "DC 7-32V / 6W" },
  { label: "Caméra", value: "Support 1 caméra (lignes ajustables)" },
  { label: "Température", value: "-30°C ~ 80°C (-22°F ~ 176°F)" },
  { label: "Fonctions", value: "Miroir, Économiseur, Commande vocale" },
  { label: "Position", value: "Conduite gauche / droite" },
  { label: "Langues", value: "FR, EN, ES, DE, IT, PT, NL + 20" },
  { label: "Mises à jour", value: "Réinitialisation & Firmware OTA" },
  { label: "Garantie", value: "2 ans constructeur" },
];

const BOX_ITEMS = [
  '1× Écran CarPlay voiture 10.26"',
  "1× Support universel ajustable",
  "1× Prise allume-cigare 12V",
  "1× Câble AUX (jack 3.5mm)",
  "1× Manuel d'utilisation FR/EN",
  "1× Kit d'accessoires de montage",
];

const TESTIMONIAL_VIDEOS = [
  "/Voiture/temoignages_clients/8617e897bf7249b88b80b3d27bf0e139.HD-720p-1.6Mbps-55016171.mp4",
  "/Voiture/temoignages_clients/b6ee109822b549dba85b66bdf05c87e7.HD-720p-1.6Mbps-55016167.mp4",
  "/Voiture/temoignages_clients/e31e12046750442496efb7bbc708240f.HD-720p-1.6Mbps-55016169.mp4",
  "/Voiture/temoignages_clients/f846a94508024394a8b09956d50115d5.HD-720p-1.6Mbps-55016168.mp4",
];

const FAQ_ITEMS = [
  { q: "Mon véhicule est-il compatible ?", a: "Oui, l'écran fonctionne avec 99% des véhicules équipés d'un allume-cigare 12V, qu'ils soient récents ou anciens." },
  { q: "Comment le son sort-il des enceintes ?", a: "Trois options : fréquence FM intégrée, câble AUX (jack 3.5mm fourni), ou Bluetooth natif de votre autoradio." },
  { q: "L'installation est-elle compliquée ?", a: "Pas du tout. Branchez sur l'allume-cigare, activez le Bluetooth sur votre téléphone, c'est prêt en 2 minutes." },
  { q: "Puis-je le retourner ?", a: "Oui, vous avez 14 jours pour retourner le produit et être remboursé intégralement. Contactez support@oxaplay.com." },
];

export default function CarPlayVoiturePage() {
  const [activeImg, setActiveImg] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const [actualPrice, setActualPrice] = useState<number | null>(null);
  const [originalPrice, setOriginalPrice] = useState<number | null>(null);
  const [discount, setDiscount] = useState(50);
  const [loading, setLoading] = useState(true);
  const [showSticky, setShowSticky] = useState(false);
  const posthog = usePostHog();

  // Format prices for display
  const formattedActualPrice = actualPrice ? `${(actualPrice / 100).toFixed(2).replace(".", ",")} €` : null;
  const formattedOriginalPrice = originalPrice ? `${(originalPrice / 100).toFixed(2).replace(".", ",")} €` : null;

  useEffect(() => {
    async function fetchPrice() {
      try {
        const res = await fetch("/api/prices");
        if (res.ok) {
          const prices = await res.json();
          setActualPrice(prices.carplayVoitureEur);
          setOriginalPrice(prices.carplayVoitureOriginalEur);
          setDiscount(prices.carplayVoitureDiscount || 50);
          
          // Track Product_Viewed event
          if (posthog) {
            try {
              posthog.capture('Product_Viewed', {
                product_name: 'CarPlay Voiture',
                price: prices.carplayVoitureEur / 100,
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
    if (posthog && actualPrice) {
      try {
        posthog.capture('Checkout_Started', {
          product_name: 'CarPlay Voiture',
          price: actualPrice / 100,
          currency: 'EUR',
        });
      } catch (error) {
        console.error('[PostHog] Error tracking Checkout_Started:', error);
      }
    }
    setShowCheckout(true);
  };

  return (
    <main className="w-full min-h-screen bg-zinc-950 text-white overflow-x-hidden">
      {/* ─── NAVBAR ─── */}
      <Header />

      {/* ─── PRODUCT HERO: Apple Store Style ─── */}
      <section className="relative w-full flex flex-col lg:flex-row lg:min-h-[calc(100vh-72px)]">
        {/* LEFT: Gallery with thumbnail selector */}
        <div className="w-full lg:w-1/2 flex flex-col">
          {/* Main image */}
          <div className="relative w-full aspect-square lg:aspect-[4/3] lg:flex-1 bg-zinc-900">
            <Image
              src={GALLERY[activeImg]}
              alt="Écran CarPlay sans fil 10.26 pouces pour voiture - Installation facile"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>
          {/* Thumbnail selector – always visible */}
          <div className="flex gap-2 px-4 py-3 bg-zinc-950">
            {GALLERY.map((src, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                className={`relative w-1/5 aspect-square rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                  activeImg === i
                    ? "border-white"
                    : "border-zinc-800 opacity-60 hover:opacity-100"
                }`}
              >
                <Image src={src} alt={`Écran CarPlay voiture aperçu ${i + 1}`} fill sizes="80px" className="object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT: Product info - sticky on desktop */}
        <div className="w-full lg:w-1/2 lg:sticky lg:top-[72px] lg:h-[calc(100vh-72px)] flex items-center bg-zinc-950">
          <div className="w-full max-w-xl mx-auto px-6 sm:px-10 lg:px-14 py-12 lg:py-0">
            <p className="text-[11px] font-medium text-zinc-500 uppercase tracking-[0.25em] mb-6">Édition Voiture</p>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5 tracking-tight leading-[1.1]">
              Écran CarPlay<br />& Android Auto
            </h1>

            <p className="text-zinc-500 text-sm sm:text-base leading-relaxed mb-8 max-w-md">
              L&apos;écran sans fil 10.26&quot; HD pour transformer n&apos;importe quelle voiture en véhicule connecté. Installation en 2 minutes.
            </p>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-8">
              <RatingBadge />
              <span className="text-sm text-zinc-500">2 000+ avis</span>
            </div>

            {/* Price - massive and light */}
            <div className="flex items-end gap-4 mb-10">
              {loading ? (
                <div className="flex items-end gap-4">
                  <div className="h-14 w-44 bg-zinc-800 rounded-lg animate-pulse" />
                  <div className="h-6 w-24 bg-zinc-800 rounded-lg animate-pulse" />
                </div>
              ) : (
                <>
                  <span className="text-4xl sm:text-5xl lg:text-6xl font-light text-white tracking-tight">{formattedActualPrice}</span>
                  <div className="flex flex-col gap-1 mb-2">
                    <span className="text-base text-zinc-600 line-through">{formattedOriginalPrice}</span>
                    <span className="text-xs text-zinc-500 font-medium">-{discount}%</span>
                  </div>
                </>
              )}
            </div>

            {/* CTA */}
            <div id="commander" className="space-y-3 mb-8">
              <button
                onClick={handleCheckoutClick}
                className="flex items-center justify-center gap-3 w-full py-4.5 rounded-full bg-white text-zinc-950 font-semibold text-base transition-all duration-300 hover:bg-zinc-200 hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
              >
                Commander maintenant
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
              <p className="text-center text-xs text-zinc-600">Livraison gratuite en 48h · Paiement sécurisé</p>
            </div>

            {/* Payment */}
            <div className="flex items-center justify-center">
              <Image src="/badges_paiement.png" alt="Moyens de paiement" width={180} height={22} className="object-contain opacity-30" />
            </div>
          </div>
        </div>
      </section>

      {/* ─── BRAND MARQUEE ─── */}
      <section className="w-full border-y border-zinc-800/50 bg-zinc-950 overflow-hidden">
        <div className="py-8">
          <p className="text-center text-[11px] font-medium text-zinc-500 uppercase tracking-[0.25em] mb-6">Compatible avec plus de 99% des véhicules</p>
          <div className="flex w-max animate-marquee gap-16">
            {[...BRANDS, ...BRANDS].map((b, i) => (
              <div key={`${b.alt}-${i}`} className="relative h-16 w-40 shrink-0 opacity-30 hover:opacity-60 transition-opacity duration-500">
                <Image src={b.src} alt={b.alt} fill sizes="112px" className="object-contain grayscale" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FOCUS PRODUIT ─── */}
      <section className="w-full bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6 py-20 sm:py-28">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            {/* Left: Text */}
            <div className="border-l border-zinc-800 pl-8">
              <p className="text-[11px] font-medium text-zinc-500 uppercase tracking-[0.25em] mb-5">Technologie & Détails</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-8 tracking-tight">
                Un écran pensé<br />pour votre conduite.
              </h2>
              <p className="text-zinc-500 text-base leading-relaxed mb-6">
                Profitez d&apos;un affichage IPS haute définition de 10.26 pouces avec une résolution cristalline de 1600×600 pixels. Chaque détail est net, même en plein soleil. Le tactile multi-points réagit au doigt comme votre smartphone.
              </p>
              <p className="text-zinc-500 text-base leading-relaxed">
                Branchez, appairez et roulez. L&apos;écran se connecte sans fil à votre iPhone ou Android en quelques secondes. Waze, Spotify, Apple Music, appels mains libres — toutes vos applications favorites, directement sur votre tableau de bord.
              </p>
            </div>

            {/* Right: Product image */}
            <div className="relative flex items-center justify-center py-12">
              <div className="relative w-full max-w-md aspect-[4/3]">
                <Image
                  src="/Voiture/produit_sans_fond-2.jpg"
                  alt="Écran CarPlay Voiture"
                  fill
                  sizes="(max-width: 768px) 100vw, 450px"
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FEATURES BENTO GRID ─── */}
      <section className="w-full bg-zinc-950 py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-[11px] font-medium text-zinc-500 uppercase tracking-[0.25em] mb-4">Fonctionnalités</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-white mb-16 tracking-tight">
            Tout ce dont vous avez besoin.
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {BENTO_FEATURES.map((f) => (
              <div
                key={f.title}
                className={`group rounded-2xl bg-zinc-900/50 border border-zinc-800 p-8 hover:border-zinc-700 hover:bg-zinc-900/80 transition-all duration-500 ${f.span}`}
              >
                <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center mb-5 group-hover:bg-zinc-700 transition-colors duration-300">
                  <svg className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={f.svg} />
                  </svg>
                </div>
                <h3 className="text-base font-semibold text-white mb-2 tracking-tight">{f.title}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SPECS & BOX ─── */}
      <section className="w-full bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6 py-20 sm:py-28">
          <p className="text-center text-[11px] font-medium text-zinc-500 uppercase tracking-[0.25em] mb-4">Détails</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-white mb-16 tracking-tight">
            Fiche technique & Contenu.
          </h2>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Left: Specs */}
            <div className="rounded-2xl bg-zinc-900/50 border border-zinc-800 overflow-hidden">
              <div className="px-6 py-4 border-b border-zinc-800">
                <h3 className="text-[11px] font-medium text-zinc-400 uppercase tracking-[0.2em]">Spécifications techniques</h3>
              </div>
              {SPECS_LEFT.map((s, i) => (
                <div
                  key={s.label}
                  className={`flex items-center justify-between px-6 py-3.5 ${i < SPECS_LEFT.length - 1 ? "border-b border-zinc-800/50" : ""}`}
                >
                  <span className="text-sm text-zinc-500">{s.label}</span>
                  <span className="text-sm font-medium text-zinc-300 text-right max-w-[55%]">{s.value}</span>
                </div>
              ))}
            </div>

            {/* Right: Box contents */}
            <div className="rounded-2xl bg-zinc-900/50 border border-zinc-800 overflow-hidden">
              <div className="px-6 py-4 border-b border-zinc-800">
                <h3 className="text-[11px] font-medium text-zinc-400 uppercase tracking-[0.2em]">Ce que vous recevez</h3>
              </div>
              <div className="p-6 space-y-4">
                {BOX_ITEMS.map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg bg-zinc-800 flex items-center justify-center shrink-0">
                      <svg className="w-3.5 h-3.5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm text-zinc-400">{item}</span>
                  </div>
                ))}
              </div>
              <div className="px-6 pb-6">
                <div className="rounded-xl bg-zinc-800/50 p-4 text-center">
                  <p className="text-xs text-zinc-500">Tous les accessoires inclus — Rien d&apos;autre à acheter</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="w-full bg-zinc-950 py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-[11px] font-medium text-zinc-500 uppercase tracking-[0.25em] mb-4">Témoignages</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-white mb-4 tracking-tight">
            Ils l&apos;ont adopté.
          </h2>
          <p className="text-center text-zinc-500 text-sm mb-14">Découvrez les retours de nos clients en vidéo.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {TESTIMONIAL_VIDEOS.map((src, i) => (
              <div
                key={i}
                className="rounded-2xl overflow-hidden bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-all duration-500"
              >
                <video src={src} controls playsInline preload="metadata" className="w-full aspect-[9/16] object-cover bg-zinc-900" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="w-full bg-zinc-950 py-20 sm:py-28">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-center text-[11px] font-medium text-zinc-500 uppercase tracking-[0.25em] mb-4">Support</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-white mb-14 tracking-tight">
            Questions fréquentes.
          </h2>

          <div className="space-y-3">
            {FAQ_ITEMS.map((item, i) => (
              <div
                key={i}
                className="rounded-2xl border border-zinc-800 bg-zinc-900/50 overflow-hidden transition-all duration-300 hover:border-zinc-700"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="text-sm sm:text-base font-medium text-white">{item.q}</span>
                  <svg
                    className={`w-4 h-4 text-zinc-500 shrink-0 transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? "max-h-60 pb-5" : "max-h-0"}`}>
                  <p className="px-6 text-sm text-zinc-500 leading-relaxed">{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── STICKY BOTTOM CTA (mobile) ─── */}
      {showSticky && (
        <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden">
          <div className="relative bg-zinc-950/95 backdrop-blur-2xl border-t border-zinc-800">
            <div className="max-w-lg mx-auto px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-light text-white">{formattedActualPrice}</span>
                  <span className="text-xs text-zinc-600 line-through">{formattedOriginalPrice}</span>
                </div>
                <span className="text-xs text-zinc-500">-{discount}%</span>
              </div>
              <button
                onClick={handleCheckoutClick}
                className="w-full py-3.5 min-h-[48px] rounded-full bg-white text-zinc-950 font-semibold text-sm transition-all duration-300 hover:bg-zinc-200 active:scale-[0.98] flex items-center justify-center gap-2"
              >
                Commander maintenant
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      <CheckoutModal
        open={showCheckout}
        onClose={() => setShowCheckout(false)}
        productSlug="carplay-voiture"
        productName="CarPlay Voiture"
        price={formattedActualPrice || ""}
      />

      {/* ─── FOOTER ─── */}
      <footer className="w-full border-t border-zinc-800/50 bg-zinc-950 pb-20 lg:pb-0">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-zinc-700">© 2025 OxaPlay. Tous droits réservés.</p>
            <div className="flex flex-wrap gap-6 text-xs text-zinc-600">
              <Link href="/mentions-legales" className="hover:text-white transition-colors duration-300">Mentions Légales</Link>
              <Link href="/cgv" className="hover:text-white transition-colors duration-300">CGV</Link>
              <Link href="/politique-de-confidentialite" className="hover:text-white transition-colors duration-300">Confidentialité</Link>
              <Link href="/politique-de-retour" className="hover:text-white transition-colors duration-300">Retours</Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

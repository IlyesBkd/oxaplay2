import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { PostHogProvider } from "./components/PostHogProvider";
import { PostHogPageView } from "./components/PostHogPageView";
import { Suspense } from "react";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "https://oxaplay.com"),
  title: {
    default: "OxaPlay – Écrans CarPlay & Android Auto Sans Fil",
    template: "%s | OxaPlay",
  },
  description: "Transformez votre véhicule avec nos écrans CarPlay & Android Auto premium, sans fil, plug & play. Installation en 2 minutes. Livraison gratuite 48h.",
  keywords: ["CarPlay sans fil", "Android Auto", "écran voiture", "CarPlay moto", "écran connecté", "Apple CarPlay", "GPS voiture", "écran tactile voiture"],
  authors: [{ name: "OxaPlay" }],
  creator: "OxaPlay",
  publisher: "OxaPlay",
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "/",
    siteName: "OxaPlay",
    title: "OxaPlay – Écrans CarPlay & Android Auto Sans Fil",
    description: "Transformez votre véhicule avec nos écrans CarPlay & Android Auto premium, sans fil, plug & play. Installation en 2 minutes.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "OxaPlay - Écrans CarPlay & Android Auto",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OxaPlay – Écrans CarPlay & Android Auto Sans Fil",
    description: "Transformez votre véhicule avec nos écrans CarPlay & Android Auto premium, sans fil, plug & play.",
    images: ["/og-image.jpg"],
    creator: "@oxaplay",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "verification_token",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${outfit.variable} ${inter.variable} antialiased`}>
      <head>
        {/* Google Ads Conversion Tracking */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-18013095662"
          strategy="afterInteractive"
        />
        <Script id="google-ads-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-18013095662');
          `}
        </Script>
      </head>
      <body className="min-h-screen bg-zinc-950 text-white font-sans">
        <PostHogProvider>
          <Suspense fallback={null}>
            <PostHogPageView />
          </Suspense>
          {children}
        </PostHogProvider>
      </body>
    </html>
  );
}

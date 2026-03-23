import { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://oxaplay.com';

export const metadata: Metadata = {
  title: "Écran CarPlay Voiture Sans Fil 10.26\" | OxaPlay",
  description: "Écran CarPlay & Android Auto sans fil 10.26\" HD pour voiture. Installation plug & play en 2 min. GPS, musique, appels mains libres. Livraison gratuite 48h.",
  keywords: ["CarPlay voiture", "écran CarPlay sans fil", "Android Auto voiture", "écran tactile voiture", "GPS voiture", "CarPlay 10 pouces"],
  openGraph: {
    title: "Écran CarPlay Voiture Sans Fil 10.26\" | OxaPlay",
    description: "Transformez votre voiture avec notre écran CarPlay & Android Auto sans fil 10.26\" HD. Installation en 2 minutes, compatible toutes voitures.",
    type: "product",
    url: `${baseUrl}/fr/carplay-voiture`,
    images: [
      {
        url: "/Voiture/photos_produits/1.jpg",
        width: 1200,
        height: 630,
        alt: "Écran CarPlay Sans Fil 10.26 pouces pour Voiture",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Écran CarPlay Voiture Sans Fil 10.26\" | OxaPlay",
    description: "Transformez votre voiture avec notre écran CarPlay & Android Auto sans fil 10.26\" HD. Installation en 2 minutes.",
    images: ["/Voiture/photos_produits/1.jpg"],
  },
  alternates: {
    canonical: `${baseUrl}/fr/carplay-voiture`,
  },
};

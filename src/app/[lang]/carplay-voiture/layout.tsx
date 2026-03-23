import { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://oxaplay.com';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;

  return {
    title: "Écran CarPlay Voiture Sans Fil 10.26\" HD",
    description: "Écran CarPlay & Android Auto sans fil 10.26\" HD pour voiture. Installation plug & play en 2 min. GPS, musique, appels mains libres. Livraison gratuite 48h.",
    keywords: ["CarPlay voiture", "écran CarPlay sans fil", "Android Auto voiture", "écran tactile voiture", "GPS voiture", "CarPlay 10 pouces"],
    openGraph: {
      title: "Écran CarPlay Voiture Sans Fil 10.26\" | OxaPlay",
      description: "Transformez votre voiture avec notre écran CarPlay & Android Auto sans fil 10.26\" HD. Installation en 2 minutes, compatible toutes voitures.",
      type: "website",
      url: `${baseUrl}/${lang}/carplay-voiture`,
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
      canonical: `${baseUrl}/${lang}/carplay-voiture`,
    },
  };
}

export default function CarPlayVoitureLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

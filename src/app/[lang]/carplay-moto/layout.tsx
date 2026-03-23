import { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://oxaplay.com';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;

  return {
    title: "Écran CarPlay Moto Sans Fil 5\" Étanche IP67",
    description: "Écran CarPlay & Android Auto sans fil 5\" étanche IP67 pour moto. GPS, musique, appels mains libres. Installation facile. Livraison gratuite 48h.",
    keywords: ["CarPlay moto", "écran moto sans fil", "Android Auto moto", "GPS moto", "écran étanche moto", "CarPlay 5 pouces"],
    openGraph: {
      title: "Écran CarPlay Moto Sans Fil 5\" Étanche | OxaPlay",
      description: "Transformez votre moto avec notre écran CarPlay & Android Auto sans fil 5\" étanche IP67. GPS, musique et appels mains libres.",
      type: "website",
      url: `${baseUrl}/${lang}/carplay-moto`,
      images: [
        {
          url: "/Moto/photos_produits/1.jpg",
          width: 1200,
          height: 630,
          alt: "Écran CarPlay Sans Fil 5 pouces Étanche pour Moto",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Écran CarPlay Moto Sans Fil 5\" Étanche | OxaPlay",
      description: "Transformez votre moto avec notre écran CarPlay & Android Auto sans fil 5\" étanche IP67.",
      images: ["/Moto/photos_produits/1.jpg"],
    },
    alternates: {
      canonical: `${baseUrl}/${lang}/carplay-moto`,
    },
  };
}

export default function CarPlayMotoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

import { NextResponse } from "next/server";
import { getPrices } from "@/db/index";

// Cache le flux pendant 1 heure (3600 secondes)
export const revalidate = 3600;

// Interface pour les produits
interface Product {
  id: string;
  title: string;
  description: string;
  link: string;
  imageLink: string;
  availability: "in_stock" | "out_of_stock";
  price: number; // Prix en centimes
  salePrice?: number; // Prix réduit en centimes (optionnel)
  condition: "new" | "used" | "refurbished";
  brand: string;
  gtin?: string; // Code-barres EAN/UPC (optionnel mais recommandé)
  mpn?: string; // Numéro de pièce fabricant (optionnel)
}

export async function GET() {
  try {
    // Récupérer les prix depuis la base de données
    const prices = await getPrices();

    // URL de base du site
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://oxaplay.com";

    // Définir les produits avec leurs données
    const products: Product[] = [
      {
        id: "carplay-voiture",
        title: "Écran CarPlay Sans Fil Voiture OxaPlay - 10.26\" IPS HD",
        description:
          "Transformez votre voiture avec l'écran CarPlay et Android Auto sans fil OxaPlay. Écran IPS 10.26\" HD, installation plug-and-play en 5 minutes, compatible avec 98% des véhicules. Navigation GPS, appels mains libres, musique en streaming. Livraison gratuite et garantie 2 ans.",
        link: `${baseUrl}/carplay-voiture`,
        imageLink: `${baseUrl}/Voiture/photos_produits/2.jpg`,
        availability: "in_stock",
        price: prices.carplayVoitureOriginalEur, // Prix original
        salePrice: prices.carplayVoitureEur, // Prix de vente réduit
        condition: "new",
        brand: "OxaPlay",
        gtin: "3760123456789", // Remplacer par votre vrai code EAN si disponible
        mpn: "OXAPLAY-CAR-001",
      },
      {
        id: "carplay-moto",
        title: "Écran CarPlay Moto OxaPlay - 5\" Étanche IP67 GPS Intégré",
        description:
          "Écran CarPlay et Android Auto pour moto OxaPlay. Écran 5\" compact étanche IP67, GPS intégré, résistant aux intempéries. Installation universelle sur guidon 22mm/28mm. Navigation, appels, musique. Parfait pour les motards. Livraison gratuite et garantie 2 ans.",
        link: `${baseUrl}/carplay-moto`,
        imageLink: `${baseUrl}/Moto/photos_produits/3.jpg`,
        availability: "in_stock",
        price: prices.carplayMotoOriginalEur, // Prix original
        salePrice: prices.carplayMotoEur, // Prix de vente réduit
        condition: "new",
        brand: "OxaPlay",
        gtin: "3760123456796", // Remplacer par votre vrai code EAN si disponible
        mpn: "OXAPLAY-MOTO-001",
      },
    ];

    // Générer le flux XML Google Shopping
    const xml = generateGoogleShoppingXML(products);

    // Retourner la réponse avec le bon Content-Type
    return new NextResponse(xml, {
      status: 200,
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200",
      },
    });
  } catch (error) {
    console.error("Error generating Google Shopping feed:", error);
    return new NextResponse("Error generating feed", { status: 500 });
  }
}

/**
 * Génère le flux XML conforme au format Google Merchant Center
 */
function generateGoogleShoppingXML(products: Product[]): string {
  const items = products
    .map((product) => {
      // Formater les prix (convertir centimes en euros)
      const priceFormatted = `${(product.price / 100).toFixed(2)} EUR`;
      const salePriceFormatted = product.salePrice
        ? `${(product.salePrice / 100).toFixed(2)} EUR`
        : null;

      return `
    <item>
      <g:id>${escapeXml(product.id)}</g:id>
      <g:title>${escapeXml(product.title)}</g:title>
      <g:description>${escapeXml(product.description)}</g:description>
      <g:link>${escapeXml(product.link)}</g:link>
      <g:image_link>${escapeXml(product.imageLink)}</g:image_link>
      <g:availability>${product.availability}</g:availability>
      <g:price>${priceFormatted}</g:price>${
        salePriceFormatted ? `\n      <g:sale_price>${salePriceFormatted}</g:sale_price>` : ""
      }
      <g:condition>${product.condition}</g:condition>
      <g:brand>${escapeXml(product.brand)}</g:brand>${
        product.gtin ? `\n      <g:gtin>${escapeXml(product.gtin)}</g:gtin>` : ""
      }${
        product.mpn ? `\n      <g:mpn>${escapeXml(product.mpn)}</g:mpn>` : ""
      }
      <g:google_product_category>Electronics &gt; GPS Navigation Systems</g:google_product_category>
      <g:product_type>Électronique &gt; Auto &gt; CarPlay</g:product_type>
      <g:shipping>
        <g:country>FR</g:country>
        <g:service>Standard</g:service>
        <g:price>0.00 EUR</g:price>
      </g:shipping>
    </item>`;
    })
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>OxaPlay - Écrans CarPlay et Android Auto</title>
    <link>${process.env.NEXT_PUBLIC_BASE_URL || "https://oxaplay.com"}</link>
    <description>Écrans CarPlay et Android Auto sans fil pour voiture et moto. Installation plug-and-play, compatible avec 98% des véhicules.</description>${items}
  </channel>
</rss>`;
}

/**
 * Échappe les caractères spéciaux XML
 */
function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

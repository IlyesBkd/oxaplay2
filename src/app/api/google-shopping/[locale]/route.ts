import { NextResponse } from "next/server";
import { getPrices } from "@/db/index";
import fs from "fs";
import path from "path";

// Cache le flux pendant 1 heure (3600 secondes)
export const revalidate = 3600;

// Locales supportées
const SUPPORTED_LOCALES = ["fr", "en", "de", "es", "it"] as const;
type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

// Configuration par locale
interface LocaleConfig {
  currency: string;
  country: string;
  productPath: {
    voiture: string;
    moto: string;
  };
  channelTitle: string;
  channelDescription: string;
}

const LOCALE_CONFIG: Record<SupportedLocale, LocaleConfig> = {
  fr: {
    currency: "EUR",
    country: "FR",
    productPath: { voiture: "carplay-voiture", moto: "carplay-moto" },
    channelTitle: "OxaPlay - Écrans CarPlay et Android Auto",
    channelDescription: "Écrans CarPlay et Android Auto sans fil pour voiture et moto. Installation plug-and-play, compatible avec 98% des véhicules.",
  },
  en: {
    currency: "GBP",
    country: "GB",
    productPath: { voiture: "carplay-voiture", moto: "carplay-moto" },
    channelTitle: "OxaPlay - CarPlay and Android Auto Screens",
    channelDescription: "Wireless CarPlay and Android Auto screens for cars and motorcycles. Plug-and-play installation, compatible with 98% of vehicles.",
  },
  de: {
    currency: "EUR",
    country: "DE",
    productPath: { voiture: "carplay-voiture", moto: "carplay-moto" },
    channelTitle: "OxaPlay - CarPlay und Android Auto Bildschirme",
    channelDescription: "Kabellose CarPlay und Android Auto Bildschirme für Autos und Motorräder. Plug-and-Play-Installation, kompatibel mit 98% der Fahrzeuge.",
  },
  es: {
    currency: "EUR",
    country: "ES",
    productPath: { voiture: "carplay-voiture", moto: "carplay-moto" },
    channelTitle: "OxaPlay - Pantallas CarPlay y Android Auto",
    channelDescription: "Pantallas CarPlay y Android Auto inalámbricas para coches y motos. Instalación plug-and-play, compatible con el 98% de los vehículos.",
  },
  it: {
    currency: "EUR",
    country: "IT",
    productPath: { voiture: "carplay-voiture", moto: "carplay-moto" },
    channelTitle: "OxaPlay - Schermi CarPlay e Android Auto",
    channelDescription: "Schermi CarPlay e Android Auto wireless per auto e moto. Installazione plug-and-play, compatibile con il 98% dei veicoli.",
  },
};

// Taux de conversion EUR -> GBP (à mettre à jour régulièrement)
const EUR_TO_GBP_RATE = 0.86;

// Interface pour les produits
interface Product {
  id: string;
  title: string;
  description: string;
  link: string;
  imageLink: string;
  availability: "in_stock" | "out_of_stock";
  price: number;
  salePrice?: number;
  condition: "new" | "used" | "refurbished";
  brand: string;
  gtin?: string;
  mpn?: string;
  googleProductCategory: string;
  productType: string;
}

// Charger les traductions depuis les fichiers JSON
function loadTranslations(locale: SupportedLocale): Record<string, unknown> {
  const messagesPath = path.join(process.cwd(), "messages", `${locale}.json`);
  const content = fs.readFileSync(messagesPath, "utf-8");
  return JSON.parse(content);
}

// Extraire le texte sans balises HTML
function stripHtml(text: string): string {
  return text.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

// Obtenir une valeur imbriquée depuis un objet
function getNestedValue(obj: Record<string, unknown>, path: string): string {
  const keys = path.split(".");
  let value: unknown = obj;
  for (const key of keys) {
    if (value && typeof value === "object" && key in value) {
      value = (value as Record<string, unknown>)[key];
    } else {
      return "";
    }
  }
  return typeof value === "string" ? value : "";
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ locale: string }> }
) {
  try {
    const { locale } = await params;

    // Vérifier que la locale est supportée
    if (!SUPPORTED_LOCALES.includes(locale as SupportedLocale)) {
      return new NextResponse(`Locale "${locale}" not supported. Supported locales: ${SUPPORTED_LOCALES.join(", ")}`, {
        status: 400,
      });
    }

    const validLocale = locale as SupportedLocale;
    const config = LOCALE_CONFIG[validLocale];

    // Récupérer les prix depuis la base de données
    const prices = await getPrices();

    // Charger les traductions
    const translations = loadTranslations(validLocale);

    // URL de base du site
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://oxaplay.com";

    // Convertir les prix si nécessaire (GBP pour UK)
    const convertPrice = (priceEur: number): number => {
      if (config.currency === "GBP") {
        return Math.round(priceEur * EUR_TO_GBP_RATE);
      }
      return priceEur;
    };

    // Construire les données des produits
    const products: Product[] = [
      {
        id: `carplay-voiture-${validLocale}`,
        title: stripHtml(getNestedValue(translations, "CarplayVoiture.title")) || "CarPlay Screen for Car",
        description: getNestedValue(translations, "CarplayVoiture.subtitle") + " " + getNestedValue(translations, "CarplayVoiture.focus.desc1"),
        link: `${baseUrl}/${validLocale}/${config.productPath.voiture}`,
        imageLink: `${baseUrl}/Voiture/photos_produits/2.jpg`,
        availability: "in_stock",
        price: convertPrice(prices.carplayVoitureOriginalEur),
        salePrice: convertPrice(prices.carplayVoitureEur),
        condition: "new",
        brand: "OxaPlay",
        gtin: "3760123456789",
        mpn: "OXAPLAY-CAR-001",
        googleProductCategory: "5613",
        productType: getProductType(validLocale, "voiture"),
      },
      {
        id: `carplay-moto-${validLocale}`,
        title: stripHtml(getNestedValue(translations, "CarplayMoto.title")) || "CarPlay Screen for Motorcycle",
        description: getNestedValue(translations, "CarplayMoto.subtitle") + " " + getNestedValue(translations, "CarplayMoto.focus.desc1"),
        link: `${baseUrl}/${validLocale}/${config.productPath.moto}`,
        imageLink: `${baseUrl}/Moto/photos_produits/3.jpg`,
        availability: "in_stock",
        price: convertPrice(prices.carplayMotoOriginalEur),
        salePrice: convertPrice(prices.carplayMotoEur),
        condition: "new",
        brand: "OxaPlay",
        gtin: "3760123456796",
        mpn: "OXAPLAY-MOTO-001",
        googleProductCategory: "5613",
        productType: getProductType(validLocale, "moto"),
      },
    ];

    // Générer le flux XML
    const xml = generateGoogleShoppingXML(products, config, baseUrl);

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

// Obtenir le type de produit traduit
function getProductType(locale: SupportedLocale, product: "voiture" | "moto"): string {
  const types: Record<SupportedLocale, Record<"voiture" | "moto", string>> = {
    fr: {
      voiture: "Électronique > Auto > Écrans CarPlay",
      moto: "Électronique > Moto > Écrans CarPlay",
    },
    en: {
      voiture: "Electronics > Car > CarPlay Screens",
      moto: "Electronics > Motorcycle > CarPlay Screens",
    },
    de: {
      voiture: "Elektronik > Auto > CarPlay Bildschirme",
      moto: "Elektronik > Motorrad > CarPlay Bildschirme",
    },
    es: {
      voiture: "Electrónica > Coche > Pantallas CarPlay",
      moto: "Electrónica > Moto > Pantallas CarPlay",
    },
    it: {
      voiture: "Elettronica > Auto > Schermi CarPlay",
      moto: "Elettronica > Moto > Schermi CarPlay",
    },
  };
  return types[locale][product];
}

/**
 * Génère le flux XML conforme au format Google Merchant Center
 */
function generateGoogleShoppingXML(
  products: Product[],
  config: LocaleConfig,
  baseUrl: string
): string {
  const items = products
    .map((product) => {
      // Formater les prix (convertir centimes en unité monétaire)
      const priceFormatted = `${(product.price / 100).toFixed(2)} ${config.currency}`;
      const salePriceFormatted = product.salePrice
        ? `${(product.salePrice / 100).toFixed(2)} ${config.currency}`
        : null;

      return `
    <item>
      <g:id>${escapeXml(product.id)}</g:id>
      <g:title>${escapeXml(product.title)}</g:title>
      <g:description>${escapeXml(product.description)}</g:description>
      <g:link>${escapeXml(product.link)}</g:link>
      <g:image_link>${escapeXml(product.imageLink)}</g:image_link>
      <g:availability>${product.availability}</g:availability>
      <g:price>${priceFormatted}</g:price>${salePriceFormatted ? `
      <g:sale_price>${salePriceFormatted}</g:sale_price>` : ""}
      <g:condition>${product.condition}</g:condition>
      <g:brand>${escapeXml(product.brand)}</g:brand>${product.gtin ? `
      <g:gtin>${escapeXml(product.gtin)}</g:gtin>` : ""}${product.mpn ? `
      <g:mpn>${escapeXml(product.mpn)}</g:mpn>` : ""}
      <g:google_product_category>${product.googleProductCategory}</g:google_product_category>
      <g:product_type>${escapeXml(product.productType)}</g:product_type>
      <g:shipping>
        <g:country>${config.country}</g:country>
        <g:service>Standard</g:service>
        <g:price>0.00 ${config.currency}</g:price>
      </g:shipping>
    </item>`;
    })
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>${escapeXml(config.channelTitle)}</title>
    <link>${baseUrl}</link>
    <description>${escapeXml(config.channelDescription)}</description>${items}
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

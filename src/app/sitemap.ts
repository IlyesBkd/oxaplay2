import { MetadataRoute } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://oxaplay.com';
const locales = ['fr', 'en', 'de', 'es', 'it'];

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/carplay-voiture',
    '/carplay-moto',
    '/faq',
    '/contact',
    '/avis',
    '/cgv',
    '/mentions-legales',
    '/politique-de-confidentialite',
    '/politique-de-retour',
  ];

  const sitemap: MetadataRoute.Sitemap = [];

  // Generate URLs for all locales and routes
  locales.forEach((locale) => {
    routes.forEach((route) => {
      sitemap.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' || route.includes('carplay') ? 'weekly' : 'monthly',
        priority: route === '' ? 1.0 : route.includes('carplay') ? 0.9 : 0.5,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${baseUrl}/${l}${route}`])
          ),
        },
      });
    });
  });

  return sitemap;
}

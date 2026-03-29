import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['fr', 'en', 'de', 'es', 'it'],

  // Used when no locale matches
  defaultLocale: 'fr',

  // Don't add /fr prefix for default locale
  localePrefix: 'as-needed'
});

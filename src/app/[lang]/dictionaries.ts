import "server-only";

const dictionaries = {
  fr: () => import("../../../messages/fr.json").then((m) => m.default),
  en: () => import("../../../messages/en.json").then((m) => m.default),
  de: () => import("../../../messages/de.json").then((m) => m.default),
  es: () => import("../../../messages/es.json").then((m) => m.default),
  it: () => import("../../../messages/it.json").then((m) => m.default),
};

export type Locale = keyof typeof dictionaries;

export const locales: Locale[] = ["fr", "en", "de", "es", "it"];

export const hasLocale = (locale: string): locale is Locale =>
  locale in dictionaries;

export const getDictionary = async (locale: Locale) => dictionaries[locale]();

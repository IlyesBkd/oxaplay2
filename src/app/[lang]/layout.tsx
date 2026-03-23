import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale, locales } from "./dictionaries";
import type { Locale } from "./dictionaries";
import ChatWidget from "../components/ChatWidget";

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang as Locale);

  const baseUrl = "https://oxaplay.com";
  const alternates: Record<string, string> = {};
  for (const l of locales) {
    alternates[l] = `${baseUrl}/${l}`;
  }

  return {
    title: dict.metadata.title,
    description: dict.metadata.description,
    alternates: {
      canonical: `${baseUrl}/${lang}`,
      languages: alternates,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return (
    <>
      {children}
      <ChatWidget />
    </>
  );
}

import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { PostHogProvider } from "./components/PostHogProvider";
import { PostHogPageView } from "./components/PostHogPageView";
import { Suspense } from "react";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "OxaPlay – Transformez votre véhicule",
  description: "Écrans CarPlay & Android Auto premium, sans fil, plug & play.",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${poppins.variable} antialiased`}>
      <body className="min-h-screen bg-black text-white">
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

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SITE_NAME, SITE_URL } from "@/data/brands";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "Ranking Mejores Minoxidil 2026 (Perú y USA): #1 You Minox, #2 Kirkland | MinoxidilTop.com",
    template: `%s`,
  },
  description:
    "Ranking oficial y cuadros comparativos de los mejores Minoxidil en Perú y Estados Unidos (Amazon). #1 You Minox en Crema (con Notificación Sanitaria DIGEMID), #2 Kirkland Signature, #3 Rogaine, #4 Hims y #5 Foligain/Keeps. +100 guías de barba, cabello y cejas.",
  keywords: [
    "mejor minoxidil peru",
    "ranking minoxidil",
    "you minox",
    "youminox.com",
    "you minox vs kirkland",
    "minoxidil en crema",
    "minoxidil para barba peru",
    "minoxidil para cabello y entradas",
    "minoxidil para cejas",
    "minoxidil con notificacion sanitaria digemid",
    "mejores minoxidil amazon usa",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: `${SITE_URL}/`,
  },
  verification: {
    google: "6vTPuOLwg6NECC6drRlPrl17vY6JKVwr_dnb9vTMj3U",
  },
  openGraph: {
    title:
      "Ranking Mejores Minoxidil (Perú 🇵🇪 y USA 🇺🇸): #1 You Minox | MinoxidilTop.com",
    description:
      "Descubre el Top 5 de los mejores Minoxidil del mercado: #1 You Minox en Crema (Perú - Notificación Sanitaria DIGEMID), #2 Kirkland Signature y el Top de Amazon USA.",
    url: `${SITE_URL}/`,
    siteName: SITE_NAME,
    locale: "es_PE",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Ranking Oficial de los Mejores Minoxidil — #1 You Minox en Perú",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Ranking Mejores Minoxidil (Perú y USA): #1 You Minox | MinoxidilTop.com",
    description:
      "Comparativa clínica de todos los Minoxidil de Perú y Estados Unidos. Descubre por qué You Minox en Crema lidera el #1 con Notificación Sanitaria DIGEMID.",
    images: [`${SITE_URL}/og-image.png`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={inter.variable}>
      <body className="min-h-screen flex flex-col bg-white text-slate-900 antialiased">
        {children}
      </body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
import { Manrope, Sora } from "next/font/google";
import "./globals.css";
import { BRAND_NAME, SITE_URL } from "@/data/site";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const description =
  "Plumbi și momitoare premium pentru pescuit — calitate atent verificată, gramaje precise, comandă rapidă pe WhatsApp. Livrare promptă în toată România.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${BRAND_NAME} | Plumbi și momitoare premium pentru pescuit`,
    template: `%s | ${BRAND_NAME}`,
  },
  description,
  keywords: [
    "plumbi pescuit",
    "momitoare pescuit",
    "plumbi crap",
    "momitoare feeder",
    "accesorii pescuit",
    "plumbi lacrimă",
    "plumb inline",
    "momitoare longcast",
    "nadire pescuit",
    "România",
  ],
  authors: [{ name: BRAND_NAME }],
  openGraph: {
    type: "website",
    locale: "ro_RO",
    url: SITE_URL,
    siteName: BRAND_NAME,
    title: `${BRAND_NAME} — precizie pe apă`,
    description,
    images: [
      {
        url: "/1.png",
        alt: `${BRAND_NAME} — logo`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${BRAND_NAME} — plumbi și momitoare premium`,
    description,
    images: ["/1.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f9f7f2" },
    { media: "(prefers-color-scheme: dark)", color: "#2a2420" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: BRAND_NAME,
    description,
    url: SITE_URL,
    image: `${SITE_URL}/1.png`,
    telephone: "+40-733-925-748",
    address: {
      "@type": "PostalAddress",
      addressCountry: "RO",
    },
    areaServed: "RO",
    priceRange: "$$",
  };

  return (
    <html lang="ro" className={`${manrope.variable} ${sora.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {children}
      </body>
    </html>
  );
}

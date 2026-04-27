import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { About } from "@/components/sections/About";
import { Benefits } from "@/components/sections/Benefits";
import { CategoryShowcase } from "@/components/sections/CategoryShowcase";
import { FinalCta } from "@/components/sections/FinalCta";
import { Hero } from "@/components/sections/Hero";
import { ProductCatalog } from "@/components/sections/ProductCatalog";
import { SeoContent } from "@/components/sections/SeoContent";
import { Testimonials } from "@/components/sections/Testimonials";
import { getCatalog } from "@/data/catalog";
import { BRAND_NAME, SITE_URL } from "@/data/site";

export const metadata: Metadata = {
  title: "Plumbi pescuit, plumbi crap și momitoare feeder",
  description:
    "Comandă plumbi pescuit și momitoare feeder: plumbi inline, plumbi grippa, plumbi pastă, momitoare longcast și method. Gramaje precise, comandă rapidă pe WhatsApp.",
  alternates: {
    canonical: SITE_URL,
  },
};

export default function Home() {
  const catalog = getCatalog();
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Ce plumb este bun pentru distanță mare?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Pentru lanseuri lungi se folosesc frecvent plumbi inline și modele cu profil aerodinamic, alese după lansetă și condițiile de pescuit.",
        },
      },
      {
        "@type": "Question",
        name: "Ce momitoare aleg pentru pescuit la feeder?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Alegerea depinde de distanță și curent: momitoare cilindrice pentru control, conice sau longcast pentru distanță, iar method pellet pentru nadire rapidă.",
        },
      },
      {
        "@type": "Question",
        name: "Cum comand plumbi și momitoare?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Comanda se face pe WhatsApp: trimiteți modelele și gramajele dorite, iar disponibilitatea și livrarea sunt confirmate rapid.",
        },
      },
    ],
  };
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Catalog plumbi și momitoare",
    itemListElement: catalog.slice(0, 24).map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: product.name,
      url: `${SITE_URL}/#${product.category}`,
    })),
  };
  const productListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Produse Fishleads - plumbi și momitoare",
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    numberOfItems: catalog.length,
    itemListElement: catalog.map((product, index) => {
      const lowestPrice = Math.min(...product.variants.map((variant) => variant.priceRon));
      return {
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Product",
          name: product.name,
          description: product.shortDescription,
          image: product.images.map((img) => `${SITE_URL}${img}`),
          category: product.category,
          sku: product.slug,
          brand: {
            "@type": "Brand",
            name: BRAND_NAME,
          },
          offers: {
            "@type": "Offer",
            priceCurrency: "RON",
            price: lowestPrice.toFixed(2),
            availability: "https://schema.org/InStock",
            url: `${SITE_URL}/#${product.category}`,
          },
        },
      };
    }),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productListJsonLd) }} />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-[#3D3028] focus:shadow-lg"
      >
        Sari la conținut
      </a>
      <Header />
      <main id="main" className="flex-1">
        <Hero />
        <CategoryShowcase />
        <ProductCatalog />
        <About />
        <Benefits />
        <SeoContent />
        <Testimonials />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}

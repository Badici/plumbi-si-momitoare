import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { About } from "@/components/sections/About";
import { Benefits } from "@/components/sections/Benefits";
import { CategoryShowcase } from "@/components/sections/CategoryShowcase";
import { FinalCta } from "@/components/sections/FinalCta";
import { Hero } from "@/components/sections/Hero";
import { ProductCatalog } from "@/components/sections/ProductCatalog";
import { Testimonials } from "@/components/sections/Testimonials";

export default function Home() {
  return (
    <>
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
        <Testimonials />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}

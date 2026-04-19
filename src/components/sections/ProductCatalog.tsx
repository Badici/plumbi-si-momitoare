"use client";

import { Container } from "@/components/ui/Container";
import { MotionSection } from "@/components/ui/MotionSection";
import { getProductsByCategory } from "@/data/catalog";
import { ProductCard } from "./ProductCard";

export function ProductCatalog() {
  const momitoare = getProductsByCategory("momitoare");
  const cosuleteFeeder = getProductsByCategory("cosulete-feeder");
  const plumbi = getProductsByCategory("plumbi");

  return (
    <MotionSection id="produse" className="scroll-mt-28 py-16 sm:py-20">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-heading text-xs font-semibold uppercase tracking-[0.2em] text-[#355E3B]">Catalog</p>
          <h2 className="font-heading mt-3 text-balance text-3xl font-semibold tracking-tight text-[#3D3028] sm:text-4xl">
            Produsele noastre, gramaje și prețuri — la un scroll distanță.
          </h2>
      
        </div>

        <section id="momitoare" className="scroll-mt-28 mt-14">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h3 className="font-heading text-2xl font-semibold tracking-tight text-[#3D3028]">Momitoare</h3>
              <p className="mt-2 max-w-prose text-sm leading-relaxed text-[#3D3028]/70">
                Momitoare pentru nadire precisă — de la ușoare la grele și longcast.
              </p>
            </div>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {momitoare.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>

        <section id="plumbi" className="scroll-mt-28 mt-16 sm:mt-20">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h3 className="font-heading text-2xl font-semibold tracking-tight text-[#3D3028]">Plumbi</h3>
              <p className="mt-2 max-w-prose text-sm leading-relaxed text-[#3D3028]/70">
                Inline, para, fix, trident, pastă și sondare — pentru orice tip de fund și tactică.
              </p>
            </div>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {plumbi.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>

        <section id="cosulete-feeder" className="scroll-mt-28 mt-16 sm:mt-20">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h3 className="font-heading text-2xl font-semibold tracking-tight text-[#3D3028]">Coșulețe feeder</h3>
              <p className="mt-2 max-w-prose text-sm leading-relaxed text-[#3D3028]/70">
                Coșulețe dedicate monturilor feeder — robuste, precise la nădire și ușor de folosit pe apă.
              </p>
            </div>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {cosuleteFeeder.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      </Container>
    </MotionSection>
  );
}

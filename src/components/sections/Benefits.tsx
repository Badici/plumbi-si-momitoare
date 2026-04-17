"use client";

import { Gauge, Leaf, MessageCircle, Shield, Sparkles, Wallet } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { MotionItem, MotionStagger } from "@/components/ui/MotionSection";

const items = [
  {
    icon: Sparkles,
    title: "Calitate premium",
    text: "Finisaje curate și consistență vizibilă — pentru încredere în fiecare montură.",
  },
  {
    icon: Gauge,
    title: "Gramaje precise",
    text: "Control atent al greutății — esențial pentru distanță, nadire și prezentare.",
  },
  {
    icon: Leaf,
    title: "Design eficient",
    text: "Forme gândite pentru apă reală: de la fund lin la vegetație și structuri discrete.",
  },
  {
    icon: Shield,
    title: "Rezistență ridicată",
    text: "Materiale și profile care țin pasul cu drilluri repetate și condiții variate.",
  },
  {
    icon: Wallet,
    title: "Prețuri corecte",
    text: "Raport excelent calitate–preț, transparent la variantă și gramaj.",
  },
  {
    icon: MessageCircle,
    title: "Comandă rapidă pe WhatsApp",
    text: "Spui modelul și gramajul — îți confirmăm rapid disponibilitatea și livrarea.",
  },
];

export function Benefits() {
  return (
    <section className="py-16 sm:py-20" aria-labelledby="beneficii-heading">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-heading text-xs font-semibold uppercase tracking-[0.2em] text-[#355E3B]">De ce noi</p>
          <h2 id="beneficii-heading" className="font-heading mt-3 text-balance text-3xl font-semibold tracking-tight text-[#3D3028] sm:text-4xl">
            Detalii mici care se văd mare pe apă.
          </h2>
          <p className="mt-4 text-pretty text-base leading-relaxed text-[#3D3028]/70">
            Îmbinăm estetica unui brand modern cu rigoarea unui producător care știe ce înseamnă o partidă bună.
          </p>
        </div>

        <MotionStagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <MotionItem key={item.title}>
                <div className="h-full rounded-2xl border border-[#3D3028]/10 bg-white/60 p-6 shadow-[0_18px_60px_-44px_rgba(61,48,40,0.45)] glass-panel transition hover:-translate-y-0.5 hover:border-[#355E3B]/25">
                  <div className="inline-flex size-11 items-center justify-center rounded-2xl bg-[#C4B98F]/30 ring-1 ring-[#355E3B]/20">
                    <Icon className="size-5 text-[#4B5A33]" aria-hidden />
                  </div>
                  <h3 className="font-heading mt-4 text-lg font-semibold tracking-tight text-[#3D3028]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#3D3028]/70">{item.text}</p>
                </div>
              </MotionItem>
            );
          })}
        </MotionStagger>
      </Container>
    </section>
  );
}

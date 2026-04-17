"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Fish, Leaf, ShieldCheck, Weight } from "lucide-react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { MotionSection } from "@/components/ui/MotionSection";

const points = [
  {
    icon: Fish,
    title: "Pasiune pentru pescuit",
    text: "Construim produse pentru oameni care simt apa, văd detaliile și își doresc monturi demne de încredere.",
  },
  {
    icon: Weight,
    title: "Precizie la gramaj",
    text: "Verificări atente și consistență lot-la-lot — pentru aruncări predictibile și prezentări curate ale nădei.",
  },
  {
    icon: ShieldCheck,
    title: "Seriozitate",
    text: "Comunicare directă, livrare rapidă și suport la alegerea modelului potrivit pentru apă și specie.",
  },
  {
    icon: Leaf,
    title: "Materiale alese",
    text: "Finisaje curate, forme eficiente și rezistență în timp — gândit pentru partide lungi și condiții reale.",
  },
];

export function About() {
  const reduce = useReducedMotion();

  return (
    <MotionSection id="despre" className="scroll-mt-28 bg-[#EEF6F5]/55 py-16 sm:py-20">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-center">
          <div className="relative">
            <div className="relative overflow-hidden rounded-[1.75rem] border border-[#3D3028]/10 bg-white/60 shadow-[0_28px_80px_-50px_rgba(61,48,40,0.55)] glass-panel">
              <div className="relative aspect-square w-full">
                <Image
                  src="/logo-2.png"
                  alt="Despre brand — emblemă"
                  fill
                  className="object-contain p-5"
                  sizes="(max-width: 1024px) 100vw, 520px"
                />
              </div>
            </div>
            <motion.div
              aria-hidden
              className="pointer-events-none absolute -bottom-8 -right-6 hidden size-40 rounded-full bg-[#C4B98F]/35 blur-2xl lg:block"
              animate={reduce ? undefined : { opacity: [0.55, 0.85, 0.55] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          <div>
            <p className="font-heading text-xs font-semibold uppercase tracking-[0.2em] text-[#355E3B]">Despre noi</p>
            <h2 className="font-heading mt-3 text-balance text-3xl font-semibold tracking-tight text-[#3D3028] sm:text-4xl">
              Produse făcute cu răbdare, pentru pescari care nu lasă nimic la voia întâmplării.
            </h2>
            <p className="mt-5 text-pretty text-base leading-relaxed text-[#3D3028]/75">
              Suntem dedicați accesoriilor care fac diferența în apă: plumbi și momitoare realizate atent, cu control
              riguros al gramajului și finisaje care rezistă la drilluri repetate. Ne plac monturile curate, lansările
              încrezătoare și momentul în care peștele răspunde exact cum ți-ai imaginat.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {points.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    initial={reduce ? false : { opacity: 0, y: 16 }}
                    whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 0.5, delay: idx * 0.06, ease: [0.22, 1, 0.36, 1] }}
                    className="rounded-2xl border border-[#3D3028]/10 bg-white/60 p-4 glass-panel"
                  >
                    <Icon className="size-5 text-[#355E3B]" aria-hidden />
                    <p className="font-heading mt-3 text-sm font-semibold text-[#3D3028]">{item.title}</p>
                    <p className="mt-2 text-sm leading-relaxed text-[#3D3028]/70">{item.text}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </MotionSection>
  );
}

"use client";

import { Quote } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { MotionItem, MotionStagger } from "@/components/ui/MotionSection";

const quotes = [
  {
    name: "Andrei P.",
    role: "Feeder · Dunăre",
    text: "Momitoarele se deschid uniform, iar plumbii stau cum trebuie pe fund. Comanda pe WhatsApp a fost clară și rapidă.",
  },
  {
    name: "Cătălin M.",
    role: "Crap · lac privat",
    text: "Se simte grija la finisaj. Am regăsit aceeași greutate între bucăți — lucru rar și foarte apreciat.",
  },
  {
    name: "Radu I.",
    role: "Stationar · noapte",
    text: "Îmi place cum arată montura și cum se comportă la lansări repetate. Livrare promptă, recomand cu încredere.",
  },
];

export function Testimonials() {
  return (
    <section className="border-y border-[#3D3028]/[0.06] bg-white/35 py-16 sm:py-20" aria-labelledby="testimoniale-heading">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-heading text-xs font-semibold uppercase tracking-[0.2em] text-[#355E3B]">Testimoniale</p>
          <h2 id="testimoniale-heading" className="font-heading mt-3 text-balance text-3xl font-semibold tracking-tight text-[#3D3028] sm:text-4xl">
            Încrederea pescarilor contează mai mult decât orice slogan.
          </h2>
        </div>

        <MotionStagger className="mt-12 grid gap-6 lg:grid-cols-3">
          {quotes.map((q) => (
            <MotionItem key={q.name}>
              <figure className="h-full rounded-2xl border border-[#3D3028]/10 bg-white/60 p-6 glass-panel">
                <Quote className="size-6 text-[#A67C52]/80" aria-hidden />
                <blockquote className="mt-4 text-sm leading-relaxed text-[#3D3028]/80">„{q.text}”</blockquote>
                <figcaption className="mt-6 border-t border-[#3D3028]/10 pt-4">
                  <p className="font-heading text-sm font-semibold text-[#3D3028]">{q.name}</p>
                  <p className="text-xs text-[#3D3028]/60">{q.role}</p>
                </figcaption>
              </figure>
            </MotionItem>
          ))}
        </MotionStagger>
      </Container>
    </section>
  );
}

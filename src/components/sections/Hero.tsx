"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { buildWhatsAppUrl } from "@/data/site";

const collage = [
  { src: "/momitoare-longcast.png", alt: "Momitoare Longcast" },
  { src: "/plumb-para.png", alt: "Plumb para" },
  { src: "/momitoare-usoare.png", alt: "Momitoare ușoare" },
  { src: "/plumbi-lacrima.png", alt: "Plumbi lacrimă" },
];

export function Hero() {
  const ref = useRef<HTMLElement | null>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y1 = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, -36]);
  const y2 = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, -18]);
  const scale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1, 0.985]);

  const wa = buildWhatsAppUrl(
    "Salut! Doresc să comand plumbi / momitoare. Mă puteți ghida după tipul de pescuit?",
  );

  return (
    <section ref={ref} id="acasa" className="mesh-hero relative overflow-hidden pb-16 pt-10 sm:pb-20 sm:pt-14">
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-10 size-[420px] rounded-full bg-[#C4B98F]/35 blur-3xl"
        style={{ y: y1 }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-20 bottom-0 size-[380px] rounded-full bg-[#355E3B]/20 blur-3xl"
        style={{ y: y2 }}
      />

      <Container className="relative grid items-center gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16">
        <motion.div style={{ scale }} className="space-y-8">
          <motion.p
            className="inline-flex items-center gap-2 rounded-full border border-[#3D3028]/10 bg-white/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#3D3028]/70 glass-panel"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            Calitate · Promptitudine · Livrare rapidă
          </motion.p>

          <motion.h1
            className="font-heading text-balance text-4xl font-semibold leading-[1.08] tracking-tight text-[#3D3028] sm:text-5xl lg:text-[3.35rem]"
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          >
            Plumbi și momitoare premium pentru pescari care vor rezultate.
          </motion.h1>

          <motion.p
            className="max-w-xl text-pretty text-lg leading-relaxed text-[#3D3028]/75"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            Materiale alese, gramaje verificate și finisaje curate — pentru monturi sigure, pescuit precis și
            încredere în fiecare aruncare.
          </motion.p>

          <motion.div
            className="flex flex-col gap-3 sm:flex-row sm:items-center"
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          >
            <WhatsAppButton href={wa} size="lg">
              Comandă pe WhatsApp
            </WhatsAppButton>
            <Link
              href="#produse"
              className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full border border-[#3D3028]/15 bg-white/55 px-7 text-base font-semibold text-[#3D3028] backdrop-blur transition hover:border-[#355E3B]/40 hover:bg-white/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3D3028]"
            >
              Vezi produsele
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </motion.div>

          <motion.dl
            className="grid max-w-xl grid-cols-3 gap-3 pt-2 sm:gap-4"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
          >
            {[
              { k: "Precizie", v: "Gramaje garantate" },
              { k: "Calitate", v: "Finisaj premium" },
              { k: "Comandă", v: "Direct pe WhatsApp" },
            ].map((row) => (
              <div key={row.k} className="rounded-2xl border border-[#3D3028]/10 bg-white/45 p-3 glass-panel sm:p-4">
                <dt className="text-[0.7rem] font-semibold uppercase tracking-wider text-[#3D3028]/55">{row.k}</dt>
                <dd className="mt-1 text-sm font-medium text-[#3D3028]">{row.v}</dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        <motion.div
          className="relative"
          initial={reduce ? false : { opacity: 0, y: 26 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative mx-auto max-w-[520px]">
            <div className="absolute inset-0 -z-10 rounded-[2.25rem] bg-gradient-to-br from-white/70 via-white/20 to-[#C4B98F]/25 blur-sm" />
            <div className="grid grid-cols-2 gap-4 rounded-[2.25rem] border border-[#3D3028]/10 bg-white/55 p-4 shadow-[0_30px_80px_-40px_rgba(61,48,40,0.45)] glass-panel sm:p-5">
              {collage.map((img, idx) => (
                <motion.div
                  key={img.src}
                  className="relative aspect-square overflow-hidden rounded-2xl bg-gradient-to-b from-white to-[#F3FAF9] ring-1 ring-[#3D3028]/10"
                  whileHover={reduce ? undefined : { y: -3 }}
                  transition={{ type: "spring", stiffness: 420, damping: 28 }}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-contain p-3 sm:p-4"
                    sizes="(max-width: 1024px) 45vw, 260px"
                    priority={idx < 2}
                  />
                </motion.div>
              ))}
            </div>
            <div className="pointer-events-none absolute -bottom-6 left-1/2 hidden w-[min(92%,520px)] -translate-x-1/2 rounded-full bg-[#3D3028]/10 px-6 py-3 text-center text-xs font-medium text-[#3D3028]/70 sm:block">
              Colaj reprezentativ — modele disponibile în site-ul nostru.
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

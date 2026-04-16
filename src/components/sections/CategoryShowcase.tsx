"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { MotionSection } from "@/components/ui/MotionSection";

const cards = [
  {
    title: "Momitoare",
    desc: "Nadire curată, eliberare controlată și profiluri pentru orice tactică — de la ușoare la longcast.",
    href: "#momitoare",
    cta: "Vezi modele",
    image: "/momitoare-medii.png",
    tint: "from-[#5B9291]/18 to-transparent",
  },
  {
    title: "Plumbi",
    desc: "De la inline și para la trident și sondare — stabilitate, feedback clar și monturi demne de concurs.",
    href: "#plumbi",
    cta: "Vezi modele",
    image: "/plumb-fix-tija.png",
    tint: "from-[#A67C52]/16 to-transparent",
  },
];

export function CategoryShowcase() {
  const reduce = useReducedMotion();

  return (
    <MotionSection className="py-16 sm:py-20">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-heading text-xs font-semibold uppercase tracking-[0.2em] text-[#5B9291]">
            Categorii principale
          </p>
          <h2 className="font-heading mt-3 text-balance text-3xl font-semibold tracking-tight text-[#3D3028] sm:text-4xl">
            Tot ce ai nevoie pentru montură și nadire, într-un singur loc.
          </h2>
          <p className="mt-4 text-pretty text-base leading-relaxed text-[#3D3028]/70">
            Alege categoria — apoi explorează modelele, gramajele și prețurile. Comanda se face rapid, direct pe
            WhatsApp.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {cards.map((c) => (
            <motion.div
              key={c.title}
              initial={reduce ? false : { opacity: 0, y: 22 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                href={c.href}
                className="group relative block overflow-hidden rounded-[1.75rem] border border-[#3D3028]/10 bg-white/55 p-6 shadow-[0_24px_70px_-50px_rgba(61,48,40,0.55)] glass-panel sm:p-8"
              >
                <div
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${c.tint} opacity-90 transition group-hover:opacity-100`}
                />
                <div className="relative grid gap-8 sm:grid-cols-[minmax(0,1fr)_200px] sm:items-center">
                  <div>
                    <h3 className="font-heading text-2xl font-semibold tracking-tight text-[#3D3028]">{c.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-[#3D3028]/72">{c.desc}</p>
                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#5B9291]">
                      {c.cta}
                      <ArrowUpRight className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                  <div className="relative mx-auto aspect-square w-full max-w-[220px] sm:mx-0 sm:max-w-none">
                    <Image
                      src={c.image}
                      alt={c.title}
                      fill
                      className="object-contain p-2 transition duration-500 group-hover:scale-[1.03]"
                      sizes="(max-width: 1024px) 70vw, 320px"
                    />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </MotionSection>
  );
}

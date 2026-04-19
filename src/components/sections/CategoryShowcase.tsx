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
    desc: "Momitoare cu o rezistență mecanică deosebită, echipate cu tijă rezistență ridicată la rupere, toate acoperite cu un strat indestructibil la șocuri mecanice.",
    href: "#momitoare",
    cta: "Vezi modele",
    image: "/momitoare-medii.png",
    tint: "from-[#355E3B]/18 to-transparent",
  },
  {
    title: "Plumbi",
    desc: "Cea mai largă varietate de modele, adaptate pentru orice stil de pescuit, de la pescuit lansat până la pescuit plantat, cu control foarte atent al calității și finisajelor.",
    href: "#plumbi",
    cta: "Vezi modele",
    image: "/plumb-fix-tija.png",
    tint: "from-[#A67C52]/16 to-transparent",
  },
  {
    title: "Coșulețe feeder",
    desc: "Coșulețe pentru monturi feeder, atât pentru lacuri cât și pentru ape curgătoare.",
    href: "#cosulete-feeder",
    cta: "Vezi modele",
    image: "/cosulet-fata.png",
    tint: "from-[#5a6d42]/20 to-transparent",
  },
];

export function CategoryShowcase() {
  const reduce = useReducedMotion();

  return (
    <MotionSection className="py-16 sm:py-20">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-heading text-xs font-semibold uppercase tracking-[0.2em] text-[#355E3B]">
            Categorii principale
          </p>
          <h2 className="font-heading mt-3 text-balance text-3xl font-semibold tracking-tight text-[#3D3028] sm:text-4xl">
            Tot ce ai nevoie pentru montură și nădire, într-un singur loc.
       
          </h2>
          <p className="mt-4 text-pretty text-base leading-relaxed text-[#3D3028]/70">
            Alege categoria — apoi explorează modelele, gramajele și prețurile. Comanda se face rapid, direct pe
            WhatsApp.
          </p>
        </div>

        <div className="mx-auto mt-12 flex max-w-4xl flex-col gap-5">
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
                className="group relative flex flex-row items-center gap-4 overflow-hidden rounded-[1.5rem] border border-[#3D3028]/10 bg-white/55 p-4 shadow-[0_24px_70px_-50px_rgba(61,48,40,0.55)] glass-panel sm:gap-8 sm:p-7"
              >
                <div
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-r ${c.tint} opacity-90 transition group-hover:opacity-100`}
                />
                <div className="relative flex min-w-0 flex-1 flex-col justify-center py-0.5 sm:py-1">
                  <h3 className="font-heading text-lg font-semibold tracking-tight text-[#3D3028] sm:text-2xl">{c.title}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-[#3D3028]/72 sm:mt-3 sm:text-sm">{c.desc}</p>
                  <span className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-[#355E3B] sm:mt-4 sm:text-sm">
                    {c.cta}
                    <ArrowUpRight className="size-3.5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 sm:size-4" />
                  </span>
                </div>
                <div className="relative h-28 w-28 shrink-0 sm:h-40 sm:w-44 md:h-44 md:w-48">
                  <Image
                    src={c.image}
                    alt={c.title}
                    fill
                    className="object-contain p-1.5 transition duration-500 group-hover:scale-[1.03] sm:p-2"
                    sizes="(max-width: 640px) 112px, 192px"
                  />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </MotionSection>
  );
}

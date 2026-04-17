"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { WHATSAPP_DISPLAY, buildWhatsAppUrl } from "@/data/site";

export function FinalCta() {
  const reduce = useReducedMotion();
  const wa = buildWhatsAppUrl(
    "Salut! Sunt pregătit de partidă — vreau să comand. Mă puteți ajuta cu recomandări?",
  );

  return (
    <section id="contact" className="scroll-mt-28 pb-20 pt-6 sm:pb-24">
      <Container>
        <motion.div
          className="relative overflow-hidden rounded-[2rem] border border-[#3D3028]/10 bg-gradient-to-br from-[#2A2420] via-[#3D3028] to-[#2F4A49] px-6 py-14 text-center text-[#F9F7F2] shadow-[0_40px_120px_-60px_rgba(61,48,40,0.75)] sm:px-10"
          initial={reduce ? false : { opacity: 0, y: 18 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-12%" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -left-24 top-0 size-72 rounded-full bg-[#C4B98F]/20 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 bottom-0 size-72 rounded-full bg-[#A67C52]/18 blur-3xl"
          />

          <div className="relative mx-auto max-w-2xl">
            <p className="font-heading text-xs font-semibold uppercase tracking-[0.22em] text-white/60">Contact</p>
            <h2 className="font-heading mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              Pregătit de partidă?
            </h2>
            <p className="mt-4 text-pretty text-base leading-relaxed text-white/75">
              Spune-ne ce vrei să prinzi, unde pescuiești și ce montură folosești — îți recomandăm rapid varianta
              potrivită.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <WhatsAppButton
                href={wa}
                size="lg"
                className="w-full bg-[#A67C52] shadow-[0_18px_60px_-30px_rgba(0,0,0,0.55)] hover:bg-[#8f6845] sm:w-auto"
              >
                Comandă acum pe WhatsApp
              </WhatsAppButton>
            </div>

            <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-white/85 backdrop-blur">
              <Phone className="size-4" aria-hidden />
              <span className="font-semibold tracking-wide">{WHATSAPP_DISPLAY}</span>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

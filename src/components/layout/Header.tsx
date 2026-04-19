"use client";

import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { BRAND_NAME, buildWhatsAppUrl } from "@/data/site";

const nav = [
  { href: "#acasa", label: "Acasă" },
  { href: "#momitoare", label: "Momitoare" },
  { href: "#plumbi", label: "Plumbi" },
  { href: "#cosulete-feeder", label: "Coșulețe feeder" },
  { href: "#despre", label: "Despre noi" },
  { href: "#contact", label: "Contact" },
];

const defaultOrderMsg =
  "Salut! Doresc să comand produsele voastre (plumbi / momitoare). Mă puteți ajuta cu disponibilitatea?";

export function Header() {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const headerBg = useTransform(scrollY, [0, 80], [0.55, 0.92]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const waHref = buildWhatsAppUrl(defaultOrderMsg);

  return (
    <header className="sticky top-0 z-50 border-b border-[#3D3028]/[0.06]">
      <motion.div
        className="absolute inset-0 -z-10 bg-[#F9F7F2]/70 backdrop-blur-xl"
        style={{ opacity: reduce ? 0.95 : headerBg }}
      />
      <Container className="flex h-[5.25rem] !max-w-screen-2xl items-center justify-between gap-3 lg:h-[6.25rem] lg:gap-4 xl:!max-w-[min(100%,90rem)] xl:gap-6 xl:px-10">
        <Link
          href="#acasa"
          className="flex min-w-0 items-center gap-4 rounded-xl py-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3D3028]"
          onClick={() => setOpen(false)}
        >
          <span className="relative block size-14 shrink-0 overflow-hidden lg:size-16">
            <Image src="/logo-2.png" alt={`${BRAND_NAME} — logo`} fill className="object-contain p-1" sizes="64px" priority />
          </span>
          <span className="font-heading hidden min-w-0 text-left text-base font-semibold leading-tight tracking-tight text-[#3D3028] sm:block lg:text-lg">
            {BRAND_NAME}
          </span>
        </Link>

        <nav className="hidden shrink-0 flex-nowrap items-center gap-0.5 lg:flex xl:gap-1.5" aria-label="Principal">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="whitespace-nowrap rounded-full px-2.5 py-2 text-sm font-medium text-[#3D3028]/80 transition hover:bg-[#3D3028]/[0.05] hover:text-[#3D3028] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3D3028] xl:px-3.5 xl:text-base"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <WhatsAppButton href={waHref} size="lg" className="hidden shrink-0 whitespace-nowrap sm:inline-flex shadow-none">
            Comandă pe WhatsApp
          </WhatsAppButton>
          <button
            type="button"
            className="inline-flex size-14 items-center justify-center rounded-full border border-[#3D3028]/10 bg-white/70 text-[#3D3028] shadow-sm backdrop-blur lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
            <span className="sr-only">Meniu</span>
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-nav"
            className="border-t border-[#3D3028]/[0.06] bg-[#F9F7F2]/95 backdrop-blur-xl lg:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <Container className="flex flex-col gap-2 py-6">
              {nav.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i, duration: 0.3 }}
                >
                  <Link
                    href={item.href}
                    className="block rounded-2xl px-5 py-3.5 text-lg font-medium text-[#3D3028] hover:bg-[#355E3B]/10"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <WhatsAppButton href={waHref} size="lg" className="mt-2 w-full sm:hidden">
                Comandă pe WhatsApp
              </WhatsAppButton>
            </Container>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

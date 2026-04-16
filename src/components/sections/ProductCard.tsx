"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { useMemo, useState } from "react";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import type { CatalogProduct } from "@/data/catalog";
import { buildWhatsAppUrl } from "@/data/site";
import { formatRon } from "@/lib/format";

function orderMessage(productName: string, variantLabel: string) {
  return `Salut! Doresc să comand ${productName} - ${variantLabel}.`;
}

export function ProductCard({ product }: { product: CatalogProduct }) {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const minPrice = useMemo(
    () => Math.min(...product.variants.map((v) => v.priceRon)),
    [product.variants],
  );

  return (
    <motion.article
      layout
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[#3D3028]/10 bg-white/60 shadow-[0_18px_60px_-44px_rgba(61,48,40,0.55)] glass-panel"
      whileHover={reduce ? undefined : { y: -4 }}
      transition={{ type: "spring", stiffness: 420, damping: 30 }}
    >
      <div className="relative aspect-[5/4] w-full bg-gradient-to-b from-white to-[#F3FAF9]">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain p-5 transition duration-500 group-hover:scale-[1.02]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 320px"
          loading="lazy"
        />
        {product.badge ? (
          <span className="absolute left-4 top-4 rounded-full bg-[#3D3028] px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-[#F9F7F2]">
            {product.badge}
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="font-heading text-lg font-semibold leading-snug tracking-tight text-[#3D3028]">
              {product.name}
            </h3>
            <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-[#3D3028]/70">{product.shortDescription}</p>
          </div>
        </div>

        <div className="mt-4 flex items-end justify-between gap-3">
          <div>
            <p className="text-[0.7rem] font-semibold uppercase tracking-wider text-[#3D3028]/45">De la</p>
            <p className="font-heading text-xl font-semibold text-[#5B9291]">{formatRon(minPrice)}</p>
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-1 rounded-full border border-[#3D3028]/10 bg-white/70 px-3 py-2 text-xs font-semibold text-[#3D3028] transition hover:border-[#5B9291]/35 sm:hidden"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            Variante
            <ChevronDown className={`size-4 transition ${open ? "rotate-180" : ""}`} />
          </button>
        </div>

        <div className={`mt-4 space-y-2 ${open ? "block" : "hidden"} sm:block`}>
          {product.variants.map((v) => (
            <div
              key={v.id}
              className="flex flex-col gap-2 rounded-xl border border-[#3D3028]/10 bg-white/55 p-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-center justify-between gap-3 sm:block">
                <span className="rounded-full bg-[#A8D1D1]/35 px-3 py-1 text-xs font-semibold text-[#2A4A49] ring-1 ring-[#5B9291]/20">
                  {v.label}
                </span>
                <p className="font-heading text-base font-semibold text-[#3D3028] sm:mt-2">{formatRon(v.priceRon)}</p>
              </div>
              <WhatsAppButton
                href={buildWhatsAppUrl(orderMessage(product.name, v.label))}
                size="md"
                className="w-full sm:w-auto shadow-none"
              >
                Comandă
              </WhatsAppButton>
            </div>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

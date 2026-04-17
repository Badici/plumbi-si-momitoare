"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { ChevronDown, Search, X, ZoomIn, ZoomOut } from "lucide-react";
import { useMemo, useState } from "react";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import type { CatalogProduct } from "@/data/catalog";
import { buildWhatsAppUrl } from "@/data/site";
import { formatRon } from "@/lib/format";

function orderMessage(productName: string, variantLabel: string) {
  return `Salut! Doresc să comand ${productName} - ${variantLabel}.`;
}

function ProductPhotoViewer({
  open,
  onClose,
  images,
  productName,
  startIndex,
}: {
  open: boolean;
  onClose: () => void;
  images: string[];
  productName: string;
  startIndex: number;
}) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(startIndex);
  const [zoom, setZoom] = useState(1.3);

  if (!open) {
    return null;
  }

  const current = images[index] ?? images[0];

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[90] flex items-center justify-center bg-[#1B1816]/90 p-4 backdrop-blur-md"
        initial={reduce ? undefined : { opacity: 0 }}
        animate={reduce ? undefined : { opacity: 1 }}
        exit={reduce ? undefined : { opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="relative w-full max-w-5xl rounded-2xl border border-white/15 bg-[#2A2420]/85 p-3 sm:p-5"
          initial={reduce ? undefined : { scale: 0.96, y: 12 }}
          animate={reduce ? undefined : { scale: 1, y: 0 }}
          exit={reduce ? undefined : { scale: 0.96, y: 12 }}
          transition={{ duration: 0.2 }}
          onClick={(event) => event.stopPropagation()}
        >
          <button
            type="button"
            className="absolute right-3 top-3 z-10 inline-flex size-10 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white"
            onClick={onClose}
            aria-label="Închide vizualizarea"
          >
            <X className="size-5" />
          </button>

          <div className="mb-3 flex items-center justify-between gap-3 pr-12">
            <p className="truncate text-sm font-semibold text-white/85">{productName}</p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="inline-flex size-9 items-center justify-center rounded-full border border-white/20 bg-black/25 text-white/85"
                onClick={() => setZoom((z) => Math.max(1, z - 0.15))}
                aria-label="Micșorează"
              >
                <ZoomOut className="size-4" />
              </button>
              <button
                type="button"
                className="inline-flex size-9 items-center justify-center rounded-full border border-white/20 bg-black/25 text-white/85"
                onClick={() => setZoom((z) => Math.min(2.5, z + 0.15))}
                aria-label="Mărește"
              >
                <ZoomIn className="size-4" />
              </button>
            </div>
          </div>

          <div className="relative h-[68vh] overflow-hidden rounded-xl bg-black/25 ring-1 ring-white/10">
            <motion.div className="relative h-full w-full" animate={{ scale: zoom }} transition={{ duration: 0.2 }}>
              <Image
                src={current}
                alt={`${productName} — imagine mărită`}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </motion.div>
          </div>

          {images.length > 1 ? (
            <div className="mt-4 flex flex-wrap items-center gap-2">
              {images.map((img, idx) => (
                <button
                  key={img}
                  type="button"
                  className={`relative h-14 w-14 overflow-hidden rounded-lg border ${
                    idx === index ? "border-white/70" : "border-white/20"
                  }`}
                  onClick={() => {
                    setIndex(idx);
                    setZoom(1.3);
                  }}
                >
                  <Image src={img} alt="miniatură" fill className="object-contain bg-white/10 p-1" sizes="56px" />
                </button>
              ))}
            </div>
          ) : null}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export function ProductCard({ product }: { product: CatalogProduct }) {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  const minPrice = useMemo(() => Math.min(...product.variants.map((v) => v.priceRon)), [product.variants]);
  const currentImage = product.images[imageIndex] ?? product.images[0];

  return (
    <>
      <motion.article
        layout
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[#3D3028]/10 bg-white/60 shadow-[0_18px_60px_-44px_rgba(61,48,40,0.55)] glass-panel"
        whileHover={reduce ? undefined : { y: -4 }}
        transition={{ type: "spring", stiffness: 420, damping: 30 }}
      >
        <div className="relative aspect-[5/4] w-full bg-gradient-to-b from-white to-[#F3FAF9]">
          <button
            type="button"
            className="absolute inset-0 z-[2]"
            onClick={() => setViewerOpen(true)}
            aria-label={`Deschide galeria pentru ${product.name}`}
          />
          <Image
            src={currentImage}
            alt={product.name}
            fill
            className="object-contain p-5 transition duration-500 group-hover:scale-[1.02]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 320px"
            loading="lazy"
          />
          <span className="absolute bottom-3 right-3 z-[3] inline-flex items-center gap-1 rounded-full border border-[#3D3028]/10 bg-white/75 px-3 py-1 text-[0.7rem] font-semibold text-[#3D3028]">
            <Search className="size-3.5" />
            Mărește
          </span>
          {product.badge ? (
            <span className="absolute left-4 top-4 z-[3] rounded-full bg-[#3D3028] px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-[#F9F7F2]">
              {product.badge}
            </span>
          ) : null}
        </div>

        {product.images.length > 1 ? (
          <div className="flex gap-2 overflow-x-auto px-4 pb-2 pt-3">
            {product.images.map((img, idx) => (
              <button
                key={img}
                type="button"
                className={`relative h-12 w-12 shrink-0 overflow-hidden rounded-lg border bg-white ${
                  idx === imageIndex ? "border-[#355E3B]/70" : "border-[#3D3028]/15"
                }`}
                onClick={() => setImageIndex(idx)}
                aria-label={`Imagine ${idx + 1} pentru ${product.name}`}
              >
                <Image src={img} alt="miniatură produs" fill className="object-contain p-1" sizes="48px" />
              </button>
            ))}
          </div>
        ) : null}

        <div className="flex flex-1 flex-col p-5 pt-4">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="font-heading text-lg font-semibold leading-snug tracking-tight text-[#3D3028]">{product.name}</h3>
              <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-[#3D3028]/70">{product.shortDescription}</p>
            </div>
          </div>

          <div className="mt-4 flex items-end justify-between gap-3">
            <div>
              <p className="text-[0.7rem] font-semibold uppercase tracking-wider text-[#3D3028]/45">De la</p>
              <p className="font-heading text-xl font-semibold text-[#355E3B]">{formatRon(minPrice)}</p>
            </div>
            <button
              type="button"
              className="inline-flex items-center gap-1 rounded-full border border-[#3D3028]/10 bg-white/70 px-3 py-2 text-xs font-semibold text-[#3D3028] transition hover:border-[#355E3B]/35 sm:hidden"
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
                  <span className="rounded-full bg-[#C4B98F]/35 px-3 py-1 text-xs font-semibold text-[#2A4A49] ring-1 ring-[#355E3B]/20">
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

      <ProductPhotoViewer
        key={`${viewerOpen}-${imageIndex}`}
        open={viewerOpen}
        onClose={() => setViewerOpen(false)}
        images={product.images}
        productName={product.name}
        startIndex={imageIndex}
      />
    </>
  );
}

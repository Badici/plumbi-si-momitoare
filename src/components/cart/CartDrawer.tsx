"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useCart } from "@/components/cart/CartContext";
import { formatRon } from "@/lib/format";

export function CartDrawer() {
  const pathname = usePathname();
  const { items, totalItems, totalPriceRon, isHydrated } = useCart();
  const [open, setOpen] = useState(false);
  const [isBumping, setIsBumping] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const shouldRenderDrawer = pathname === "/";

  useEffect(() => {
    if (!shouldRenderDrawer) {
      return;
    }
    let timeoutId: number | null = null;
    const animateButton = () => {
      setIsBumping(true);
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
      timeoutId = window.setTimeout(() => setIsBumping(false), 260);
    };
    window.addEventListener("cart:item-added", animateButton);
    return () => {
      window.removeEventListener("cart:item-added", animateButton);
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [shouldRenderDrawer]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const onOutsideClick = (event: MouseEvent) => {
      const target = event.target as Node;
      if (!panelRef.current?.contains(target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onOutsideClick);
    return () => document.removeEventListener("mousedown", onOutsideClick);
  }, [open]);

  if (!shouldRenderDrawer) {
    return (
      <Link
        href="/cos"
        className="relative inline-flex min-h-[48px] items-center gap-2 rounded-full border border-[#3D3028]/15 bg-white/75 px-4 text-sm font-semibold text-[#3D3028] transition hover:border-[#355E3B]/35"
        aria-label="Deschide coșul de cumpărături"
      >
        <ShoppingCart className="size-4" />
        Coș
        {isHydrated && totalItems > 0 ? (
          <span className="inline-flex min-w-6 items-center justify-center rounded-full bg-[#355E3B] px-1.5 py-0.5 text-xs text-white">
            {totalItems}
          </span>
        ) : null}
      </Link>
    );
  }

  return (
    <div className="relative" ref={panelRef}>
      <button
        type="button"
        className={`relative inline-flex min-h-[48px] items-center gap-2 rounded-full border border-[#3D3028]/15 bg-white/75 px-4 text-sm font-semibold text-[#3D3028] transition duration-200 hover:border-[#355E3B]/35 ${
          isBumping ? "scale-[1.06] border-[#355E3B]/45 shadow-[0_14px_34px_-20px_rgba(53,94,59,0.75)]" : ""
        }`}
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="mini-cart-drawer"
      >
        <ShoppingCart className="size-4" />
        Coș
        {isHydrated && totalItems > 0 ? (
          <span className="inline-flex min-w-6 items-center justify-center rounded-full bg-[#355E3B] px-1.5 py-0.5 text-xs text-white">
            {totalItems}
          </span>
        ) : null}
      </button>

      {open ? (
        <div
          id="mini-cart-drawer"
          className="absolute left-1/2 top-[calc(100%+0.6rem)] z-[80] w-[min(92vw,24rem)] -translate-x-1/2 rounded-2xl border border-[#3D3028]/10 bg-white p-4 shadow-[0_24px_64px_-36px_rgba(61,48,40,0.55)] sm:left-auto sm:right-0 sm:translate-x-0"
          role="dialog"
          aria-label="Coș rapid"
        >
          <div className="mb-3 flex items-center justify-between">
            <p className="font-heading text-base font-semibold text-[#3D3028]">Coș rapid</p>
            <button
              type="button"
              className="inline-flex size-8 items-center justify-center rounded-full border border-[#3D3028]/10 text-[#3D3028]"
              onClick={() => setOpen(false)}
              aria-label="Închide coșul rapid"
            >
              <X className="size-4" />
            </button>
          </div>

          {!isHydrated ? (
            <p className="text-sm text-[#3D3028]/70">Se încarcă...</p>
          ) : items.length === 0 ? (
            <p className="text-sm text-[#3D3028]/70">Coșul este gol.</p>
          ) : (
            <ul className="max-h-64 space-y-2 overflow-auto">
              {items.map((item) => (
                <li key={item.key} className="rounded-xl border border-[#3D3028]/10 bg-[#F9F7F2] px-3 py-2">
                  <p className="text-sm font-semibold text-[#3D3028]">{item.productName}</p>
                  <p className="text-xs text-[#3D3028]/70">
                    {item.variantLabel} x {item.quantity}
                  </p>
                  <p className="mt-1 text-xs font-semibold text-[#355E3B]">{formatRon(item.lineTotalRon)}</p>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-4 flex items-center justify-between rounded-xl bg-[#F3FAF9] px-3 py-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#3D3028]/55">Total</span>
            <span className="font-heading text-lg font-semibold text-[#355E3B]">{formatRon(totalPriceRon)}</span>
          </div>

          <div className="mt-3 grid gap-2">
            <Link
              href="/cos"
              className="inline-flex min-h-10 items-center justify-center rounded-full bg-[#355E3B] px-4 text-sm font-semibold text-white transition hover:bg-[#264A2F]"
              onClick={() => setOpen(false)}
            >
              Vezi coșul și checkout
            </Link>
            <button
              type="button"
              className="inline-flex min-h-10 items-center justify-center rounded-full border border-[#3D3028]/15 px-4 text-sm font-semibold text-[#3D3028]"
              onClick={() => setOpen(false)}
            >
              Continuă cumpărăturile
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

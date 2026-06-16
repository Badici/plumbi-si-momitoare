"use client";

import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { useCart } from "@/components/cart/CartContext";
import { Container } from "@/components/ui/Container";
import {
  addWhatsAppMessagePrefix,
  buildWhatsAppUrl,
  hasLyraBaitsReferralParams,
  WHATSAPP_LYRABAITS_PROMO_PREFIX,
} from "@/data/site";
import { formatRon } from "@/lib/format";

type DeliveryType = "pickup" | "home";

type DeliveryForm = {
  fullName: string;
  phone: string;
  email: string;
  county: string;
  city: string;
  street: string;
  number: string;
  details: string;
};

const PICKUP_ADDRESS = "Strada Vicina nr. 6, Bucuresti";

export function CartPageView() {
  const { items, totalItems, totalPriceRon, setQuantity, removeItem, clearCart, isHydrated } = useCart();
  const [deliveryType, setDeliveryType] = useState<DeliveryType>("pickup");
  const [error, setError] = useState("");
  const [deliveryForm, setDeliveryForm] = useState<DeliveryForm>({
    fullName: "",
    phone: "",
    email: "",
    county: "",
    city: "",
    street: "",
    number: "",
    details: "",
  });

  const shippingMessage = "Pretul transportului va fi comunicat ulterior, dupa calcularea greutatii coletului si distantei.";

  const summaryRows = useMemo(
    () => items.map((item) => `- ${item.productName} / ${item.variantLabel} x ${item.quantity} = ${formatRon(item.lineTotalRon)}`),
    [items],
  );

  const onConfirmOrder = () => {
    if (items.length === 0) {
      setError("Coșul este gol. Adaugă produse înainte de confirmare.");
      return;
    }

    if (deliveryType === "home") {
      const requiredValues = [
        deliveryForm.fullName,
        deliveryForm.phone,
        deliveryForm.email,
        deliveryForm.county,
        deliveryForm.city,
        deliveryForm.street,
        deliveryForm.number,
      ];
      if (requiredValues.some((value) => !value.trim())) {
        setError("Completează toate câmpurile obligatorii pentru livrare la domiciliu.");
        return;
      }
    }

    setError("");

    const messageParts = [
      "Salut! Doresc sa confirm comanda:",
      "",
      ...summaryRows,
      "",
      `Total produse: ${formatRon(totalPriceRon)} (${totalItems} bucati)`,
      "",
      "Livrare:",
    ];

    if (deliveryType === "pickup") {
      messageParts.push(`- Ridicare personala in Bucuresti (${PICKUP_ADDRESS})`);
    } else {
      messageParts.push("- Livrare la domiciliu");
      messageParts.push(`Nume si prenume: ${deliveryForm.fullName}`);
      messageParts.push(`Telefon: ${deliveryForm.phone}`);
      messageParts.push(`Email: ${deliveryForm.email}`);
      messageParts.push(`Judet: ${deliveryForm.county}`);
      messageParts.push(`Oras: ${deliveryForm.city}`);
      messageParts.push(`Strada: ${deliveryForm.street}`);
      messageParts.push(`Numar: ${deliveryForm.number}`);
      if (deliveryForm.details.trim()) {
        messageParts.push(`Detalii adresa: ${deliveryForm.details}`);
      }
      messageParts.push(shippingMessage);
    }

    let waUrl = buildWhatsAppUrl(messageParts.join("\n"));
    const params = new URLSearchParams(window.location.search);
    if (hasLyraBaitsReferralParams(params)) {
      waUrl = addWhatsAppMessagePrefix(waUrl, WHATSAPP_LYRABAITS_PROMO_PREFIX);
    }
    window.open(waUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <main className="flex-1 py-14 sm:py-20">
      <Container className="max-w-5xl">
        <header className="mb-8">
          <h1 className="font-heading text-3xl font-semibold tracking-tight text-[#3D3028] sm:text-4xl">Coș de cumpărături</h1>
          <p className="mt-3 text-sm text-[#3D3028]/70">
            Verifică produsele, ajustează cantitățile și confirmă comanda pe WhatsApp.
          </p>
        </header>

        {!isHydrated ? (
          <p className="rounded-2xl border border-[#3D3028]/10 bg-white/70 px-5 py-4 text-sm text-[#3D3028]/70">
            Se încarcă produsele din coș...
          </p>
        ) : items.length === 0 ? (
          <div className="rounded-2xl border border-[#3D3028]/10 bg-white/80 p-6">
            <p className="text-sm text-[#3D3028]/70">Nu ai produse în coș momentan.</p>
            <Link
              href="/#produse"
              className="mt-4 inline-flex min-h-11 items-center justify-center rounded-full bg-[#355E3B] px-5 text-sm font-semibold text-white transition hover:bg-[#264A2F]"
            >
              Înapoi la produse
            </Link>
          </div>
        ) : (
          <section className="space-y-4" aria-label="Produse in cos">
            {items.map((item) => (
              <article
                key={item.key}
                className="rounded-2xl border border-[#3D3028]/10 bg-white/80 p-4 shadow-[0_18px_44px_-36px_rgba(61,48,40,0.45)]"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="font-heading text-lg font-semibold text-[#3D3028]">{item.productName}</h2>
                    <p className="text-sm text-[#3D3028]/70">{item.variantLabel}</p>
                    <p className="mt-1 text-sm text-[#3D3028]/70">Preț unitar: {formatRon(item.unitPriceRon)}</p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <div className="inline-flex items-center rounded-full border border-[#3D3028]/15 bg-white">
                      <button
                        type="button"
                        className="inline-flex size-9 items-center justify-center text-[#3D3028]"
                        onClick={() =>
                          setQuantity({
                            productId: item.productId,
                            variantId: item.variantId,
                            quantity: Math.max(1, item.quantity - 1),
                          })
                        }
                        aria-label={`Scade cantitatea pentru ${item.productName} ${item.variantLabel}`}
                      >
                        <Minus className="size-4" />
                      </button>
                      <span className="min-w-10 text-center font-semibold text-[#3D3028]">{item.quantity}</span>
                      <button
                        type="button"
                        className="inline-flex size-9 items-center justify-center text-[#3D3028]"
                        onClick={() =>
                          setQuantity({
                            productId: item.productId,
                            variantId: item.variantId,
                            quantity: item.quantity + 1,
                          })
                        }
                        aria-label={`Creste cantitatea pentru ${item.productName} ${item.variantLabel}`}
                      >
                        <Plus className="size-4" />
                      </button>
                    </div>
                    <p className="min-w-28 text-right font-heading text-base font-semibold text-[#355E3B]">
                      {formatRon(item.lineTotalRon)}
                    </p>
                    <button
                      type="button"
                      className="inline-flex min-h-9 items-center gap-1 rounded-full border border-[#B23A48]/25 px-3 text-sm font-semibold text-[#B23A48] transition hover:bg-[#B23A48]/5"
                      onClick={() => removeItem({ productId: item.productId, variantId: item.variantId })}
                      aria-label={`Elimina ${item.productName} ${item.variantLabel} din cos`}
                    >
                      <Trash2 className="size-4" />
                      Șterge
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </section>
        )}

        {isHydrated && items.length > 0 ? (
          <section className="mt-8 rounded-2xl border border-[#3D3028]/10 bg-white/80 p-5 sm:p-6" aria-label="Checkout">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-[#3D3028]/70">
                Total coș: <span className="font-semibold text-[#3D3028]">{totalItems} produse</span>
              </p>
              <p className="font-heading text-2xl font-semibold text-[#355E3B]">{formatRon(totalPriceRon)}</p>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              <button
                type="button"
                className={`inline-flex min-h-11 items-center justify-center rounded-full px-4 text-sm font-semibold transition ${
                  deliveryType === "pickup"
                    ? "bg-[#355E3B] text-white"
                    : "border border-[#3D3028]/15 bg-white text-[#3D3028] hover:border-[#355E3B]/35"
                }`}
                onClick={() => setDeliveryType("pickup")}
              >
                Ridicare personala
              </button>
              <button
                type="button"
                className={`inline-flex min-h-11 items-center justify-center rounded-full px-4 text-sm font-semibold transition ${
                  deliveryType === "home"
                    ? "bg-[#355E3B] text-white"
                    : "border border-[#3D3028]/15 bg-white text-[#3D3028] hover:border-[#355E3B]/35"
                }`}
                onClick={() => setDeliveryType("home")}
              >
                Livrare la domiciliu
              </button>
            </div>

            {deliveryType === "pickup" ? (
              <p className="mt-4 rounded-xl border border-[#3D3028]/10 bg-[#F9F7F2] px-4 py-3 text-sm text-[#3D3028]/80">
                Ridicare personala in Bucuresti, {PICKUP_ADDRESS}. Dupa confirmare, comanda se trimite pe WhatsApp.
              </p>
            ) : (
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <input
                  className="min-h-11 rounded-xl border border-[#3D3028]/15 px-3 text-sm outline-none focus:border-[#355E3B]/45"
                  placeholder="Nume si prenume *"
                  value={deliveryForm.fullName}
                  onChange={(event) => setDeliveryForm((prev) => ({ ...prev, fullName: event.target.value }))}
                />
                <input
                  className="min-h-11 rounded-xl border border-[#3D3028]/15 px-3 text-sm outline-none focus:border-[#355E3B]/45"
                  placeholder="Telefon *"
                  value={deliveryForm.phone}
                  onChange={(event) => setDeliveryForm((prev) => ({ ...prev, phone: event.target.value }))}
                />
                <input
                  className="min-h-11 rounded-xl border border-[#3D3028]/15 px-3 text-sm outline-none focus:border-[#355E3B]/45"
                  placeholder="Email *"
                  value={deliveryForm.email}
                  onChange={(event) => setDeliveryForm((prev) => ({ ...prev, email: event.target.value }))}
                />
                <input
                  className="min-h-11 rounded-xl border border-[#3D3028]/15 px-3 text-sm outline-none focus:border-[#355E3B]/45"
                  placeholder="Judet *"
                  value={deliveryForm.county}
                  onChange={(event) => setDeliveryForm((prev) => ({ ...prev, county: event.target.value }))}
                />
                <input
                  className="min-h-11 rounded-xl border border-[#3D3028]/15 px-3 text-sm outline-none focus:border-[#355E3B]/45"
                  placeholder="Oras *"
                  value={deliveryForm.city}
                  onChange={(event) => setDeliveryForm((prev) => ({ ...prev, city: event.target.value }))}
                />
                <input
                  className="min-h-11 rounded-xl border border-[#3D3028]/15 px-3 text-sm outline-none focus:border-[#355E3B]/45"
                  placeholder="Strada *"
                  value={deliveryForm.street}
                  onChange={(event) => setDeliveryForm((prev) => ({ ...prev, street: event.target.value }))}
                />
                <input
                  className="min-h-11 rounded-xl border border-[#3D3028]/15 px-3 text-sm outline-none focus:border-[#355E3B]/45"
                  placeholder="Numar *"
                  value={deliveryForm.number}
                  onChange={(event) => setDeliveryForm((prev) => ({ ...prev, number: event.target.value }))}
                />
                <input
                  className="min-h-11 rounded-xl border border-[#3D3028]/15 px-3 text-sm outline-none focus:border-[#355E3B]/45"
                  placeholder="Detalii adresa (optional)"
                  value={deliveryForm.details}
                  onChange={(event) => setDeliveryForm((prev) => ({ ...prev, details: event.target.value }))}
                />
                <p className="sm:col-span-2 rounded-xl border border-[#3D3028]/10 bg-[#F9F7F2] px-4 py-3 text-sm text-[#3D3028]/80">
                  {shippingMessage}
                </p>
              </div>
            )}

            {error ? <p className="mt-4 text-sm font-medium text-[#B23A48]">{error}</p> : null}

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#355E3B] px-6 text-sm font-semibold text-white transition hover:bg-[#264A2F]"
                onClick={onConfirmOrder}
              >
                Confirma comanda si stabileste livrarea
              </button>
              <button
                type="button"
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-[#B23A48]/25 px-5 text-sm font-semibold text-[#B23A48] transition hover:bg-[#B23A48]/5"
                onClick={clearCart}
              >
                Goleste cosul
              </button>
            </div>
          </section>
        ) : null}
      </Container>
    </main>
  );
}

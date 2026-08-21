"use client";

import { ChevronDown, Search, Trash2 } from "lucide-react";
import confetti from "canvas-confetti";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { useMemo, useState } from "react";
import { BRAND_NAME, SITE_URL, WHATSAPP_DISPLAY } from "@/data/site";
import { WHOLESALE_EMAIL_RECIPIENTS, WHOLESALE_FORMSUBMIT_ENDPOINT } from "@/data/wholesale";
import { formatRon } from "@/lib/format";

type ProductVariantLite = {
  id: string;
  label: string;
  priceRon: number;
};

type ProductLite = {
  id: string;
  name: string;
  variants: ProductVariantLite[];
};

type OrderLine = {
  id: string;
  productId: string;
  productName: string;
  variantId: string;
  variantLabel: string;
  quantity: number;
  unitPriceRon: number;
};

type ClientFields = {
  clientName: string;
  clientSurname: string;
  companyName: string;
  address: string;
};

function buildOrderNumber() {
  return `EG-${Date.now()}`;
}

function sanitizeFilePart(value: string) {
  const ascii = sanitizePdfText(value);
  return ascii
    .toLowerCase()
    .replace(/[^a-z0-9\s-_]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 40);
}

function buildPdfFileName(orderNumber: string, client: ClientFields) {
  const company = sanitizeFilePart(client.companyName);
  const fullName = sanitizeFilePart(`${client.clientName} ${client.clientSurname}`);
  const prefix = company || fullName;
  if (!prefix) {
    return `${orderNumber}.pdf`;
  }
  return `${prefix}-${orderNumber}.pdf`;
}

function sanitizePdfText(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ă/g, "a")
    .replace(/Ă/g, "A")
    .replace(/â/g, "a")
    .replace(/Â/g, "A")
    .replace(/î/g, "i")
    .replace(/Î/g, "I")
    .replace(/ș/g, "s")
    .replace(/Ș/g, "S")
    .replace(/ț/g, "t")
    .replace(/Ț/g, "T");
}

function normalizeSearchText(value: string) {
  return sanitizePdfText(value).toLowerCase().trim();
}

function buildMailText(orderNumber: string, lines: OrderLine[], client: ClientFields, totalRon: number) {
  const lineRows = lines
    .map(
      (line, index) =>
        `${index + 1}. ${line.productName} - ${line.variantLabel} | cant: ${line.quantity} | pret: ${formatRon(line.unitPriceRon)} | total: ${formatRon(line.quantity * line.unitPriceRon)}`,
    )
    .join("\n");

  return [
    "Comanda en-gros noua",
    `Numar comanda: ${orderNumber}`,
    "",
    "Date client:",
    `Nume: ${client.clientName.trim() || "-"}`,
    `Prenume: ${client.clientSurname.trim() || "-"}`,
    `Companie: ${client.companyName.trim() || "-"}`,
    `Adresa: ${client.address.trim() || "-"}`,
    "",
    "Produse:",
    lineRows,
    "",
    `Total general: ${formatRon(totalRon)}`,
  ].join("\n");
}

function getSiteBaseUrl() {
  if (typeof window !== "undefined" && window.location.origin) {
    return window.location.origin;
  }
  return SITE_URL;
}

function downloadPdfBytes(fileName: string, bytes: Uint8Array) {
  const blob = new Blob([bytes.buffer as ArrayBuffer], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = fileName;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}

async function buildPdfBytes(orderNumber: string, lines: OrderLine[], client: ClientFields, totalRon: number) {
  const pdf = await PDFDocument.create();
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
  const siteBaseUrl = getSiteBaseUrl();

  let page = pdf.addPage([595, 842]);
  let y = 800;
  const pageWidth = page.getWidth();
  const tableRowLineHeight = 12;
  const tableFooterLimitY = 70;

  const ensurePageSpace = (requiredHeight = 0) => {
    if (y - requiredHeight >= tableFooterLimitY) {
      return;
    }
    page = pdf.addPage([595, 842]);
    y = 800;
  };

  const drawLine = (text: string, options?: { size?: number; bold?: boolean; gap?: number }) => {
    ensurePageSpace(options?.gap ?? 16);
    page.drawText(text, {
      x: 46,
      y,
      size: options?.size ?? 11,
      font: options?.bold ? bold : font,
    });
    y -= options?.gap ?? 16;
  };

  const drawPdfText = (
    text: string,
    x: number,
    yPos: number,
    size: number,
    useBold = false,
  ) => {
    page.drawText(sanitizePdfText(text), {
      x,
      y: yPos,
      size,
      font: useBold ? bold : font,
    });
  };

  const logoBytes = await fetch(`${siteBaseUrl}/logo-2.png`)
    .then((response) => response.arrayBuffer())
    .catch(() => null);
  if (logoBytes) {
    const logo = await pdf.embedPng(logoBytes);
    page.drawImage(logo, {
      x: 46,
      y: 768,
      width: 52,
      height: 52,
    });
  }

  page.drawRectangle({
    x: 0,
    y: 730,
    width: pageWidth,
    height: 2,
    color: rgb(0.21, 0.37, 0.23),
  });

  drawPdfText(BRAND_NAME, 110, 802, 17, true);
  drawPdfText("Lista produse", 110, 782, 11);
  drawPdfText(siteBaseUrl, 110, 766, 10);
  drawPdfText(`WhatsApp: ${WHATSAPP_DISPLAY}`, 110, 752, 10);

  y = 708;
  drawLine(sanitizePdfText(`Numar comanda: ${orderNumber}`));
  drawLine(sanitizePdfText(`Data: ${new Date().toLocaleString("ro-RO")}`));
  drawLine("");
  drawLine("Date client:", { bold: true });
  drawLine(sanitizePdfText(`Nume: ${client.clientName.trim() || "-"}`));
  drawLine(sanitizePdfText(`Prenume: ${client.clientSurname.trim() || "-"}`));
  drawLine(sanitizePdfText(`Companie: ${client.companyName.trim() || "-"}`));
  drawLine(sanitizePdfText(`Adresa: ${client.address.trim() || "-"}`));
  drawLine("");

  const drawTableHeader = () => {
    page.drawRectangle({
      x: 46,
      y: y - 3,
      width: pageWidth - 92,
      height: 22,
      color: rgb(0.95, 0.97, 0.95),
    });
    drawPdfText("Produs", 52, y + 5, 10, true);
    drawPdfText("Gramaj", 300, y + 5, 10, true);
    drawPdfText("Cant", 380, y + 5, 10, true);
    drawPdfText("Pret", 430, y + 5, 10, true);
    drawPdfText("Total", 500, y + 5, 10, true);
    y -= 26;
  };

  const wrapText = (text: string, maxWidth: number, size: number) => {
    const safeText = sanitizePdfText(text);
    const words = safeText.split(/\s+/).filter(Boolean);
    const linesWrapped: string[] = [];
    let current = "";
    for (const word of words) {
      const next = current ? `${current} ${word}` : word;
      if (font.widthOfTextAtSize(next, size) <= maxWidth) {
        current = next;
      } else {
        if (current) {
          linesWrapped.push(current);
        }
        current = word;
      }
    }
    if (current) {
      linesWrapped.push(current);
    }
    return linesWrapped.length > 0 ? linesWrapped : [safeText];
  };

  drawTableHeader();

  lines.forEach((line, index) => {
    const nameLines = wrapText(`${index + 1}. ${line.productName}`, 238, 9.4);
    const rowHeight = nameLines.length * tableRowLineHeight + 4;
    const needsNewPage = y - rowHeight < tableFooterLimitY;
    if (needsNewPage) {
      page = pdf.addPage([595, 842]);
      y = 780;
      drawTableHeader();
    }

    nameLines.forEach((nameLine, lineIdx) => {
      page.drawText(nameLine, { x: 52, y: y - lineIdx * tableRowLineHeight, size: 9.4, font });
    });
    drawPdfText(line.variantLabel, 300, y, 9.4);
    drawPdfText(String(line.quantity), 386, y, 9.4);
    drawPdfText(formatRon(line.unitPriceRon), 430, y, 9.4);
    drawPdfText(formatRon(line.quantity * line.unitPriceRon), 500, y, 9.4);
    y -= rowHeight;
  });

  drawLine("");
  drawLine(sanitizePdfText(`Total general: ${formatRon(totalRon)}`), { bold: true, size: 13, gap: 20 });
  drawLine("Document generat automat din portalul en-gros.", { size: 9, gap: 13 });
  drawLine(sanitizePdfText(`Site: ${siteBaseUrl}`), { size: 9, gap: 13 });

  return pdf.save();
}

export function WholesaleOrderBuilder({ products }: { products: ProductLite[] }) {
  const [query, setQuery] = useState("");
  const [lines, setLines] = useState<OrderLine[]>([]);
  const [expandedProducts, setExpandedProducts] = useState<Record<string, boolean>>({});
  const [clientFields, setClientFields] = useState<ClientFields>({
    clientName: "",
    clientSurname: "",
    companyName: "",
    address: "",
  });
  const [isSending, setIsSending] = useState(false);
  const [sendState, setSendState] = useState<{ ok: boolean; message: string } | null>(null);
  const [showBirthdayMessage, setShowBirthdayMessage] = useState(false);

  const filteredProducts = useMemo(() => {
    const q = normalizeSearchText(query);
    if (!q) {
      return products;
    }
    return products.filter((product) => {
      const nameMatch = normalizeSearchText(product.name).includes(q);
      const variantMatch = product.variants.some((variant) => normalizeSearchText(variant.label).includes(q));
      return nameMatch || variantMatch;
    });
  }, [products, query]);

  const totalRon = useMemo(
    () => lines.reduce((sum, line) => sum + line.quantity * Math.max(0, line.unitPriceRon), 0),
    [lines],
  );

  const addLine = (product: ProductLite, variant: ProductVariantLite) => {
    const lineId = `${product.id}-${variant.id}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    setLines((prev) => [
      ...prev,
      {
        id: lineId,
        productId: product.id,
        productName: product.name,
        variantId: variant.id,
        variantLabel: variant.label,
        quantity: 1,
        unitPriceRon: variant.priceRon,
      },
    ]);
  };

  const updateLine = (lineId: string, patch: Partial<Pick<OrderLine, "quantity" | "unitPriceRon">>) => {
    setLines((prev) =>
      prev.map((line) => {
        if (line.id !== lineId) {
          return line;
        }
        return {
          ...line,
          ...patch,
        };
      }),
    );
  };

  const removeLine = (lineId: string) => {
    setLines((prev) => prev.filter((line) => line.id !== lineId));
  };

  const clearLines = () => {
    setLines([]);
    setSendState(null);
  };

  const toggleProductExpanded = (productId: string) => {
    setExpandedProducts((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  const finishOrder = async () => {
    if (lines.length === 0) {
      setSendState({ ok: false, message: "Adaugă cel puțin un produs în comandă." });
      return;
    }

    const hasInvalidValues = lines.some((line) => line.quantity < 1 || Number.isNaN(line.unitPriceRon) || line.unitPriceRon < 0);
    if (hasInvalidValues) {
      setSendState({ ok: false, message: "Verifică valorile introduse pentru cantitate și preț." });
      return;
    }

    setIsSending(true);
    setSendState(null);

    try {
      const orderNumber = buildOrderNumber();
      const pdfBytes = await buildPdfBytes(orderNumber, lines, clientFields, totalRon);
      const fileName = buildPdfFileName(orderNumber, clientFields);
      const textBody = buildMailText(orderNumber, lines, clientFields, totalRon);
      const pdfBlob = new Blob([pdfBytes.buffer as ArrayBuffer], { type: "application/pdf" });
      const pdfFile = new File([pdfBlob], fileName, { type: "application/pdf" });

      const formData = new FormData();
      formData.append("_subject", `Comanda en-gros ${orderNumber}`);
      formData.append("_cc", WHOLESALE_EMAIL_RECIPIENTS[1]);
      formData.append("_captcha", "false");
      formData.append("message", textBody);
      formData.append("order_number", orderNumber);
      formData.append("total_ron", totalRon.toFixed(2));
      formData.append("client_name", clientFields.clientName.trim() || "-");
      formData.append("client_surname", clientFields.clientSurname.trim() || "-");
      formData.append("company_name", clientFields.companyName.trim() || "-");
      formData.append("client_address", clientFields.address.trim() || "-");
      formData.append("attachment", pdfFile);
      lines.forEach((line, index) => {
        formData.append(
          `line_${index + 1}`,
          `${line.productName} | ${line.variantLabel} | cant ${line.quantity} | pret ${line.unitPriceRon} RON`,
        );
      });

      const response = await fetch(WHOLESALE_FORMSUBMIT_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });

      const result = (await response.json().catch(() => ({}))) as { success?: string; message?: string };
      if (!response.ok || result.success !== "true") {
        const fallbackMessage = result.message ?? "FormSubmit nu a confirmat trimiterea.";
        setSendState({
          ok: false,
          message: fallbackMessage,
        });
        setIsSending(false);
        return;
      }

      setSendState({ ok: true, message: "Comanda a fost trimisă cu succes pe mail." });
    } catch {
      setSendState({ ok: false, message: "Eroare de conexiune la trimiterea emailului." });
    } finally {
      setIsSending(false);
    }
  };

  const downloadPdf = async () => {
    if (lines.length === 0) {
      setSendState({ ok: false, message: "Adaugă cel puțin un produs în comandă." });
      return;
    }
    const hasInvalidValues = lines.some((line) => line.quantity < 1 || Number.isNaN(line.unitPriceRon) || line.unitPriceRon < 0);
    if (hasInvalidValues) {
      setSendState({ ok: false, message: "Verifică valorile introduse pentru cantitate și preț." });
      return;
    }

    try {
      const orderNumber = buildOrderNumber();
      const bytes = await buildPdfBytes(orderNumber, lines, clientFields, totalRon);
      downloadPdfBytes(buildPdfFileName(orderNumber, clientFields), bytes);
      setSendState({ ok: true, message: "PDF descărcat cu succes." });
    } catch {
      setSendState({ ok: false, message: "Nu am putut genera PDF-ul. Verifică datele și încearcă din nou." });
    }
  };

  const triggerBirthdayEasterEgg = () => {
    confetti({
      particleCount: 90,
      spread: 72,
      startVelocity: 42,
      origin: { y: 0.7 },
    });
    confetti({
      particleCount: 70,
      angle: 60,
      spread: 68,
      origin: { x: 0, y: 0.75 },
    });
    confetti({
      particleCount: 70,
      angle: 120,
      spread: 68,
      origin: { x: 1, y: 0.75 },
    });

    setShowBirthdayMessage(true);
    window.setTimeout(() => setShowBirthdayMessage(false), 2200);
  };

  return (
    <main className="px-4 pb-10 pt-6 sm:px-6 sm:pt-8">
      <button
        type="button"
        onClick={triggerBirthdayEasterEgg}
        className="fixed right-4 top-4 z-40 inline-flex size-11 items-center justify-center rounded-full bg-[#EC4899] text-white shadow-[0_18px_40px_-22px_rgba(236,72,153,0.6)] transition hover:bg-[#DB2777]"
        aria-label="Easter egg aniversar"
      >
        <svg viewBox="0 0 24 24" className="size-4.5" fill="none" aria-hidden>
          <path
            d="M12 5.25c-.72 0-1.3-.58-1.3-1.3 0-.67.45-1.1 1.3-1.95.85.85 1.3 1.28 1.3 1.95 0 .72-.58 1.3-1.3 1.3Z"
            fill="currentColor"
          />
          <path d="M12 6.2v2.1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <path
            d="M4 11.2a2.2 2.2 0 1 1 4.4 0v1.25h7.2V11.2a2.2 2.2 0 1 1 4.4 0v2.85H4V11.2Z"
            fill="currentColor"
            opacity=".9"
          />
          <path
            d="M3.5 15.2h17a.5.5 0 0 1 .5.5V17a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4v-1.3a.5.5 0 0 1 .5-.5Z"
            fill="currentColor"
          />
        </svg>
      </button>
      <a
        href="#calcul-comanda"
        className="fixed bottom-4 right-4 z-40 inline-flex min-h-11 items-center justify-center rounded-full bg-[#355E3B] px-4 text-sm font-semibold text-white shadow-[0_18px_40px_-22px_rgba(53,94,59,0.75)]"
      >
        Foaia de comanda
      </a>
      {showBirthdayMessage ? (
        <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="rounded-full bg-white/95 px-7 py-3 text-center text-xl font-bold text-[#DB2777] shadow-[0_24px_70px_-34px_rgba(61,48,40,0.75)]">
            La multi ani viata mea!
          </div>
        </div>
      ) : null}
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <section className="rounded-2xl border border-[#3D3028]/10 bg-white/80 p-4 sm:p-5">
          <h1 className="font-heading text-2xl font-semibold tracking-tight text-[#3D3028] sm:text-3xl">Comenzi en-gros</h1>
          <p className="mt-2 text-sm leading-relaxed text-[#3D3028]/70">
            Caută produse, adaugă gramajele dorite, setează prețul manual în RON și finalizează factura pe email.
          </p>
          <a
            href="#calcul-comanda"
            className="mt-4 inline-flex min-h-10 items-center justify-center rounded-full border border-[#355E3B]/25 bg-[#F3FAF9] px-4 text-sm font-semibold text-[#355E3B] transition hover:bg-[#E9F4F0]"
          >
            Mergi la foaia de calcul
          </a>
          <label className="mt-4 block">
            <span className="sr-only">Caută produs</span>
            <span className="relative block">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#3D3028]/45" />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="min-h-11 w-full rounded-xl border border-[#3D3028]/16 bg-white pl-9 pr-3 text-sm outline-none focus:border-[#355E3B]/40"
                placeholder="Caută după numele produsului..."
              />
            </span>
          </label>
        </section>

        <section id="catalog-produse" className="scroll-mt-28 rounded-2xl border border-[#3D3028]/10 bg-white/80 p-4 sm:p-5">
          <h2 className="font-heading text-lg font-semibold text-[#3D3028] sm:text-xl">Catalog produse</h2>
          <p className="mt-1 text-xs text-[#3D3028]/65">
            Afișate: {filteredProducts.length} din {products.length} produse totale.
          </p>
          <div className="mt-4 space-y-3">
            {filteredProducts.map((product) => (
              <article key={product.id} className="rounded-xl border border-[#3D3028]/10 bg-[#F9F7F2] p-3 sm:p-4">
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-3 text-left"
                  onClick={() => toggleProductExpanded(product.id)}
                  aria-expanded={Boolean(expandedProducts[product.id])}
                >
                  <div>
                    <p className="font-semibold text-[#3D3028]">{product.name}</p>
                    <p className="text-xs text-[#3D3028]/65">{product.variants.length} gramaje disponibile</p>
                  </div>
                  <ChevronDown
                    className={`size-4 shrink-0 text-[#3D3028]/70 transition ${expandedProducts[product.id] ? "rotate-180" : ""}`}
                  />
                </button>
                {expandedProducts[product.id] ? (
                  <div className="mt-2 grid gap-2">
                    {product.variants.map((variant) => (
                      <div key={variant.id} className="flex flex-wrap items-center justify-between gap-2 rounded-lg bg-white/90 px-3 py-2">
                        <div>
                          <p className="text-sm font-medium text-[#3D3028]">{variant.label}</p>
                          <p className="text-xs text-[#3D3028]/65">Preț catalog: {formatRon(variant.priceRon)}</p>
                        </div>
                        <button
                          type="button"
                          className="inline-flex min-h-9 items-center justify-center rounded-full bg-[#355E3B] px-4 text-xs font-semibold text-white transition hover:bg-[#264A2F]"
                          onClick={() => addLine(product, variant)}
                        >
                          Adaugă în calcul
                        </button>
                      </div>
                    ))}
                  </div>
                ) : null}
              </article>
            ))}
            {filteredProducts.length === 0 ? (
              <p className="rounded-xl border border-dashed border-[#3D3028]/20 px-3 py-4 text-sm text-[#3D3028]/65">
                Nu există produse pentru căutarea curentă.
              </p>
            ) : null}
          </div>
        </section>

        <section id="calcul-comanda" className="scroll-mt-28 rounded-2xl border border-[#3D3028]/10 bg-white/80 p-4 sm:p-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="font-heading text-lg font-semibold text-[#3D3028] sm:text-xl">Calcul comandă</h2>
            <button
              type="button"
              onClick={clearLines}
              className="inline-flex min-h-9 items-center justify-center rounded-full border border-[#3D3028]/14 px-3 text-xs font-semibold text-[#3D3028]"
            >
              Golește lista
            </button>
          </div>

          {lines.length === 0 ? (
            <p className="mt-4 rounded-xl border border-dashed border-[#3D3028]/20 px-3 py-4 text-sm text-[#3D3028]/65">
              Nu ai adăugat produse în calcul.
            </p>
          ) : (
            <div className="mt-4 space-y-2">
              {lines.map((line) => {
                const lineTotal = line.quantity * Math.max(0, line.unitPriceRon);
                return (
                  <article key={line.id} className="rounded-xl border border-[#3D3028]/10 bg-[#F9F7F2] p-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-[#3D3028]">{line.productName}</p>
                        <p className="text-xs text-[#3D3028]/70">{line.variantLabel}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeLine(line.id)}
                        className="inline-flex size-8 items-center justify-center rounded-full border border-[#B23A48]/25 text-[#B23A48]"
                        aria-label="Șterge linia"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>

                    <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                      <label className="col-span-1">
                        <span className="mb-1 block text-xs font-medium text-[#3D3028]/75">Cantitate</span>
                        <input
                          type="number"
                          min={1}
                          value={line.quantity}
                          onChange={(event) =>
                            updateLine(line.id, { quantity: Math.max(1, Number(event.target.value) || 1) })
                          }
                          className="min-h-10 w-full rounded-lg border border-[#3D3028]/16 px-2 text-sm outline-none focus:border-[#355E3B]/40"
                        />
                      </label>
                      <label className="col-span-1">
                        <span className="mb-1 block text-xs font-medium text-[#3D3028]/75">Preț / buc (RON)</span>
                        <input
                          type="number"
                          step="0.01"
                          min={0}
                          value={line.unitPriceRon}
                          onChange={(event) =>
                            updateLine(line.id, { unitPriceRon: Math.max(0, Number(event.target.value) || 0) })
                          }
                          className="min-h-10 w-full rounded-lg border border-[#3D3028]/16 px-2 text-sm outline-none focus:border-[#355E3B]/40"
                        />
                      </label>
                      <div className="col-span-2 rounded-lg bg-white px-3 py-2">
                        <p className="text-xs text-[#3D3028]/60">Total linie</p>
                        <p className="font-semibold text-[#355E3B]">{formatRon(lineTotal)}</p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          <div className="mt-4 rounded-xl border border-[#355E3B]/15 bg-[#F3FAF9] px-4 py-3">
            <p className="text-xs uppercase tracking-wider text-[#3D3028]/55">Total comandă</p>
            <p className="font-heading text-2xl font-semibold text-[#355E3B]">{formatRon(totalRon)}</p>
          </div>
        </section>

        <section className="rounded-2xl border border-[#3D3028]/10 bg-white/80 p-4 sm:p-5">
          <h2 className="font-heading text-lg font-semibold text-[#3D3028] sm:text-xl">Date client (opțional)</h2>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            <input
              value={clientFields.clientName}
              onChange={(event) => setClientFields((prev) => ({ ...prev, clientName: event.target.value }))}
              placeholder="Nume client"
              className="min-h-11 rounded-xl border border-[#3D3028]/16 px-3 text-sm outline-none focus:border-[#355E3B]/40"
            />
            <input
              value={clientFields.clientSurname}
              onChange={(event) => setClientFields((prev) => ({ ...prev, clientSurname: event.target.value }))}
              placeholder="Prenume client"
              className="min-h-11 rounded-xl border border-[#3D3028]/16 px-3 text-sm outline-none focus:border-[#355E3B]/40"
            />
            <input
              value={clientFields.companyName}
              onChange={(event) => setClientFields((prev) => ({ ...prev, companyName: event.target.value }))}
              placeholder="Nume companie"
              className="min-h-11 rounded-xl border border-[#3D3028]/16 px-3 text-sm outline-none focus:border-[#355E3B]/40 sm:col-span-2"
            />
            <textarea
              value={clientFields.address}
              onChange={(event) => setClientFields((prev) => ({ ...prev, address: event.target.value }))}
              placeholder="Adresă"
              className="min-h-24 rounded-xl border border-[#3D3028]/16 px-3 py-2 text-sm outline-none focus:border-[#355E3B]/40 sm:col-span-2"
            />
          </div>

          {sendState ? (
            <p className={`mt-3 text-sm font-medium ${sendState.ok ? "text-[#2A6A3A]" : "text-[#B23A48]"}`}>{sendState.message}</p>
          ) : null}

          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            <button
              type="button"
              onClick={downloadPdf}
              className="inline-flex min-h-11 w-full items-center justify-center rounded-xl border border-[#355E3B]/28 bg-[#F3FAF9] px-4 text-sm font-semibold text-[#355E3B] transition hover:bg-[#E9F4F0] sm:w-auto"
            >
              Download PDF
            </button>
            <button
              type="button"
              disabled={isSending}
              onClick={finishOrder}
              className="inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-[#355E3B] px-4 text-sm font-semibold text-white transition hover:bg-[#264A2F] disabled:opacity-60 sm:flex-1"
            >
              {isSending ? "Se trimite comanda..." : "Finish order"}
            </button>
          </div>
          <p className="mt-2 text-xs text-[#3D3028]/60">
            Trimiterea folosește FormSubmit prin API-ul intern. Dacă este prima trimitere, confirmă emailul de activare
            primit de adresa principală ({WHOLESALE_EMAIL_RECIPIENTS[0]}).
          </p>
        </section>
      </div>
    </main>
  );
}

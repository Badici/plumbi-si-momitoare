export const WHATSAPP_E164 = "40733925748";
export const WHATSAPP_DISPLAY = "0733 925 748";
export const WHATSAPP_BASE_URL = `https://wa.me/${WHATSAPP_E164}`;

export const BRAND_NAME = "Plumbi și Momitoare";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://plumbisimomitoare.ro";

export function buildWhatsAppUrl(message: string) {
  const params = new URLSearchParams();
  params.set("text", message);
  return `${WHATSAPP_BASE_URL}?${params.toString()}`;
}

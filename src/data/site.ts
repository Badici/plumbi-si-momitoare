export const WHATSAPP_E164 = "40733925748";
export const WHATSAPP_DISPLAY = "0733 925 748";
export const WHATSAPP_BASE_URL = `https://wa.me/${WHATSAPP_E164}`;

export const BRAND_NAME = "Plumbi și Momitoare";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://plumbisimomitoare.ro";
export const WHATSAPP_LYRABAITS_PROMO_PREFIX =
  "Client venit de la LyraBaits, beneficiaza de promotia 10+1.";

export function buildWhatsAppUrl(message: string) {
  const params = new URLSearchParams();
  params.set("text", message);
  return `${WHATSAPP_BASE_URL}?${params.toString()}`;
}

export function addWhatsAppMessagePrefix(url: string, prefix: string) {
  if (!prefix.trim()) {
    return url;
  }

  try {
    const parsed = new URL(url);
    const currentMessage = parsed.searchParams.get("text");
    if (!currentMessage) {
      return url;
    }

    if (currentMessage.startsWith(prefix)) {
      return url;
    }

    parsed.searchParams.set("text", `${prefix}\n${currentMessage}`);
    return parsed.toString();
  } catch {
    return url;
  }
}

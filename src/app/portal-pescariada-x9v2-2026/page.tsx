import type { Metadata } from "next";
import { cookies } from "next/headers";
import { WholesaleAuthGate } from "@/components/wholesale/WholesaleAuthGate";
import { WholesaleOrderBuilder } from "@/components/wholesale/WholesaleOrderBuilder";
import { getCatalog } from "@/data/catalog";
import { SITE_URL } from "@/data/site";
import {
  WHOLESALE_AUTH_COOKIE,
  WHOLESALE_AUTH_COOKIE_VALUE,
  WHOLESALE_HIDDEN_PATH,
} from "@/data/wholesale";

export const metadata: Metadata = {
  title: "Portal en-gros",
  description: "Pagină internă pentru comenzi en-gros.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
  alternates: {
    canonical: `${SITE_URL}${WHOLESALE_HIDDEN_PATH}`,
  },
};

export default async function WholesaleHiddenPage() {
  const cookieStore = await cookies();
  const hasAccess = cookieStore.get(WHOLESALE_AUTH_COOKIE)?.value === WHOLESALE_AUTH_COOKIE_VALUE;

  if (!hasAccess) {
    return <WholesaleAuthGate />;
  }

  const products = getCatalog().map((product) => ({
    id: product.id,
    name: product.name,
    variants: product.variants.map((variant) => ({
      id: variant.id,
      label: variant.label,
      priceRon: variant.priceRon,
    })),
  }));

  return <WholesaleOrderBuilder products={products} />;
}

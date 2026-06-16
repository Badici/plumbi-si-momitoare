import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { CartPageView } from "@/components/cart/CartPageView";
import { BRAND_NAME, SITE_URL } from "@/data/site";

export const metadata: Metadata = {
  title: "Cos de cumparaturi",
  description: "Revizuieste produsele adaugate in cos si confirma comanda cu optiunea dorita de livrare.",
  openGraph: {
    title: `${BRAND_NAME} | Cos de cumparaturi`,
    description: "Confirma comanda de plumbi si momitoare si stabileste livrarea direct pe WhatsApp.",
    url: `${SITE_URL}/cos`,
  },
  alternates: {
    canonical: `${SITE_URL}/cos`,
  },
};

export default function CartPage() {
  return (
    <>
      <Header />
      <CartPageView />
      <Footer />
    </>
  );
}

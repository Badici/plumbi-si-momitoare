import type { MetadataRoute } from "next";
import { BRAND_NAME } from "@/data/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${BRAND_NAME} - Plumbi și momitoare pentru pescuit`,
    short_name: BRAND_NAME,
    description:
      "Plumbi pescuit, plumbi crap și momitoare feeder. Gramaje precise, produse premium și comandă rapidă pe WhatsApp.",
    start_url: "/",
    display: "standalone",
    background_color: "#f9f7f2",
    theme_color: "#f9f7f2",
    lang: "ro",
    icons: [
      {
        src: "/logo-2.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/logo-2.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}

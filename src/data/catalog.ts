import { DISCOVERED_PRODUCT_PNGS, type DiscoveredProductPng } from "./discovered-images";

export type ProductCategory = "momitoare" | "plumbi";

export type ProductVariant = {
  id: string;
  label: string;
  priceRon: number;
};

export type CatalogProduct = {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  image: string;
  category: ProductCategory;
  variants: ProductVariant[];
  badge?: string;
};

type Detail = Omit<CatalogProduct, "id" | "image">;

/**
 * Detalii produs — editează aici gramaje, prețuri și descrieri.
 * Fișierele noi din `public/` (PNG, în afară de logo) apar automat
 * dacă rulezi `npm run sync:images` sau la `prebuild`.
 */
const PRODUCT_DETAILS: Partial<Record<DiscoveredProductPng, Detail>> = {
  "cosulet-fata.png": {
    slug: "cosulet-fata",
    name: "Coșuleț momitoare — față",
    shortDescription:
      "Momitoare robustă pentru nadire precisă în fața monturii. Finisaj curat, deschidere controlată a nădei.",
    category: "momitoare",
    badge: "Popular",
    variants: [
      { id: "cf-30", label: "30 g", priceRon: 18 },
      { id: "cf-40", label: "40 g", priceRon: 20 },
      { id: "cf-50", label: "50 g", priceRon: 22 },
    ],
  },
  "cosulet-spate.png": {
    slug: "cosulet-spate",
    name: "Coșuleț momitoare — spate",
    shortDescription:
      "Variantă spate pentru distribuție echilibrată și aterizări stabile. Ideală pentru partide lungi pe fund lins.",
    category: "momitoare",
    variants: [
      { id: "cs-30", label: "30 g", priceRon: 18 },
      { id: "cs-40", label: "40 g", priceRon: 20 },
      { id: "cs-50", label: "50 g", priceRon: 22 },
    ],
  },
  "momitoare-3-spite.png": {
    slug: "momitoare-3-spite",
    name: "Momitoare 3 spite",
    shortDescription:
      "Construcție cu trei spite pentru eliberare progresivă a nădei. Recomandată când vrei ritm constant în zonă.",
    category: "momitoare",
    variants: [
      { id: "m3-40", label: "40 g", priceRon: 24 },
      { id: "m3-50", label: "50 g", priceRon: 26 },
      { id: "m3-60", label: "60 g", priceRon: 28 },
    ],
  },
  "momitoare-dunare.png": {
    slug: "momitoare-dunare",
    name: "Momitoare Dunăre",
    shortDescription:
      "Profil aerodinamic pentru curenți și distanțe medii. Materiale rezistente, finisaj atent la detalii.",
    category: "momitoare",
    variants: [
      { id: "md-50", label: "50 g", priceRon: 26 },
      { id: "md-60", label: "60 g", priceRon: 28 },
      { id: "md-70", label: "70 g", priceRon: 30 },
    ],
  },
  "momitoare-grele.png": {
    slug: "momitoare-grele",
    name: "Momitoare grele",
    shortDescription:
      "Pentru lansări lungi și monturi stabile în apă adâncă sau vânt. Greutate generoasă, control excelent.",
    category: "momitoare",
    badge: "Lansare",
    variants: [
      { id: "mg-70", label: "70 g", priceRon: 32 },
      { id: "mg-80", label: "80 g", priceRon: 34 },
      { id: "mg-90", label: "90 g", priceRon: 36 },
    ],
  },
  "momitoare-longcast.png": {
    slug: "momitoare-longcast",
    name: "Momitoare Longcast",
    shortDescription:
      "Optimizată pentru distanță maximă cu trajectorie curată. Partenerul tău când vrei zona „departe”.",
    category: "momitoare",
    variants: [
      { id: "ml-50", label: "50 g", priceRon: 28 },
      { id: "ml-60", label: "60 g", priceRon: 30 },
      { id: "ml-70", label: "70 g", priceRon: 32 },
    ],
  },
  "momitoare-medii.png": {
    slug: "momitoare-medii",
    name: "Momitoare medii",
    shortDescription:
      "Echilibru perfect între distanță și precizie. Una dintre cele mai versatile alegeri pentru crap și feeder.",
    category: "momitoare",
    variants: [
      { id: "mm-40", label: "40 g", priceRon: 22 },
      { id: "mm-50", label: "50 g", priceRon: 24 },
      { id: "mm-60", label: "60 g", priceRon: 26 },
    ],
  },
  "momitoare-usoare.png": {
    slug: "momitoare-usoare",
    name: "Momitoare ușoare",
    shortDescription:
      "Finețe și control la distanțe scurte și medii. Excelente pentru nadire discretă și reacții rapide ale peștelui.",
    category: "momitoare",
    variants: [
      { id: "mu-20", label: "20 g", priceRon: 16 },
      { id: "mu-30", label: "30 g", priceRon: 18 },
      { id: "mu-40", label: "40 g", priceRon: 20 },
    ],
  },
  "plumb-bag.png": {
    slug: "plumb-bag",
    name: "Plumb tip „bag”",
    shortDescription:
      "Formă compactă, profil discret pe fund. Potrivit pentru monturi sensibile și prezentări curate ale momelei.",
    category: "plumbi",
    variants: [
      { id: "pb-40", label: "40 g", priceRon: 10 },
      { id: "pb-50", label: "50 g", priceRon: 11 },
      { id: "pb-60", label: "60 g", priceRon: 12 },
    ],
  },
  "plumb-fix-tija.png": {
    slug: "plumb-fix-cu-tija",
    name: "Plumb fix cu tijă",
    shortDescription:
      "Montură stabilă cu tijă rigidă pentru anti-încurcare și direcție clară a firului spre momitor sau momie.",
    category: "plumbi",
    badge: "Precizie",
    variants: [
      { id: "pft-50", label: "50 g", priceRon: 12 },
      { id: "pft-60", label: "60 g", priceRon: 13 },
      { id: "pft-70", label: "70 g", priceRon: 14 },
    ],
  },
  "plumb-fix-vartej.png": {
    slug: "plumb-fix-cu-vartej",
    name: "Plumb fix cu vârtej",
    shortDescription:
      "Vârtej integrat pentru rotație lină și monturi sigure. Reduce torsiunea firului la drilluri și recuperări.",
    category: "plumbi",
    variants: [
      { id: "pfv-40", label: "40 g", priceRon: 12 },
      { id: "pfv-50", label: "50 g", priceRon: 13 },
      { id: "pfv-60", label: "60 g", priceRon: 14 },
    ],
  },
  "plumb-inline-fara-tija.png": {
    slug: "plumb-inline-fara-tija",
    name: "Plumb inline fără tijă",
    shortDescription:
      "Profil slim, alunecare pe fir pentru feedback fin. Ideal pentru pescuit fin și reacții rapide.",
    category: "plumbi",
    variants: [
      { id: "pif-30", label: "30 g", priceRon: 11 },
      { id: "pif-40", label: "40 g", priceRon: 12 },
      { id: "pif-50", label: "50 g", priceRon: 13 },
    ],
  },
  "plumb-para-inline.png": {
    slug: "plumb-para-inline",
    name: "Plumb para inline",
    shortDescription:
      "Formă para cu comportament predictibil în apă. Inline pentru control și siguranță la aruncări repetate.",
    category: "plumbi",
    variants: [
      { id: "ppi-40", label: "40 g", priceRon: 13 },
      { id: "ppi-50", label: "50 g", priceRon: 14 },
      { id: "ppi-60", label: "60 g", priceRon: 15 },
    ],
  },
  "plumb-para.png": {
    slug: "plumb-para",
    name: "Plumb para",
    shortDescription:
      "Clasic reinterpretat: stabilitate pe fund, profil prietenos cu vegetație ușoară și prezentare curată.",
    category: "plumbi",
    variants: [
      { id: "pp-50", label: "50 g", priceRon: 12 },
      { id: "pp-60", label: "60 g", priceRon: 13 },
      { id: "pp-70", label: "70 g", priceRon: 14 },
    ],
  },
  "plumb-pasta-longcast.png": {
    slug: "plumb-pasta-longcast",
    name: "Pastă plumb — Longcast",
    shortDescription:
      "Pastă de plastilă pentru plumbire fină și ajustări rapide la distanță. Excelentă pentru fine-tuning pe mal.",
    category: "plumbi",
    badge: "Versatil",
    variants: [
      { id: "ppl-1", label: "Cutie S", priceRon: 22 },
      { id: "ppl-2", label: "Cutie M", priceRon: 28 },
      { id: "ppl-3", label: "Cutie L", priceRon: 34 },
    ],
  },
  "plumb-pasta.png": {
    slug: "plumb-pasta",
    name: "Pastă plumb",
    shortDescription:
      "Adaos controlat de greutate fără a altera profilul monturii. Textură plăcută la lucru, aderență fiabilă.",
    category: "plumbi",
    variants: [
      { id: "ppa-1", label: "Cutie S", priceRon: 18 },
      { id: "ppa-2", label: "Cutie M", priceRon: 24 },
      { id: "ppa-3", label: "Cutie L", priceRon: 30 },
    ],
  },
  "plumb-sondare.png": {
    slug: "plumb-sondare",
    name: "Plumb sondare",
    shortDescription:
      "Profil dedicat explorării fundului: feedback clar, formă care „citește” structura și textura substratului.",
    category: "plumbi",
    variants: [
      { id: "ps-40", label: "40 g", priceRon: 13 },
      { id: "ps-50", label: "50 g", priceRon: 14 },
      { id: "ps-60", label: "60 g", priceRon: 15 },
    ],
  },
  "plumbi-lacrima.png": {
    slug: "plumbi-lacrima",
    name: "Plumbi lacrimă",
    shortDescription:
      "Set lacrimă pentru coborâri fluide și stabilitate. Finisaj uniform, gramaje verificate individual.",
    category: "plumbi",
    variants: [
      { id: "pl-40", label: "40 g", priceRon: 11 },
      { id: "pl-50", label: "50 g", priceRon: 12 },
      { id: "pl-60", label: "60 g", priceRon: 13 },
    ],
  },
  "plumbi-trident-1.png": {
    slug: "plumbi-trident-varianta-1",
    name: "Plumbi trident — varianta 1",
    shortDescription:
      "Profil trident pentru ancorare sigură în substrat moale. Prima variantă din gama noastră trident.",
    category: "plumbi",
    variants: [
      { id: "pt1-60", label: "60 g", priceRon: 15 },
      { id: "pt1-80", label: "80 g", priceRon: 17 },
      { id: "pt1-100", label: "100 g", priceRon: 19 },
    ],
  },
  "plumbi-trident-2.png": {
    slug: "plumbi-trident-varianta-2",
    name: "Plumbi trident — varianta 2",
    shortDescription:
      "Variantă alternativă de angrenare și distribuție a greutății. Alege în funcție de fund și tactică.",
    category: "plumbi",
    variants: [
      { id: "pt2-60", label: "60 g", priceRon: 15 },
      { id: "pt2-80", label: "80 g", priceRon: 17 },
      { id: "pt2-100", label: "100 g", priceRon: 19 },
    ],
  },
  "7.png": {
    slug: "plumb-distantiere-cu-tija",
    name: "Plumb distanțier cu tijă rigidă",
    shortDescription:
      "Plumb cu tijă rigidă pentru monturi de distanță și control sporit la coborâre. Finisaj camuflaj discret.",
    category: "plumbi",
    badge: "Distanță",
    variants: [
      { id: "p7-50", label: "50 g", priceRon: 14 },
      { id: "p7-60", label: "60 g", priceRon: 15 },
      { id: "p7-70", label: "70 g", priceRon: 16 },
    ],
  },
};

function inferFromFilename(file: string): Detail {
  const base = file.replace(/\.png$/i, "");
  const isMomitoare =
    base.startsWith("momitoare") || base.startsWith("cosulet");
  const human = base
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
  return {
    slug: base,
    name: human || "Produs nou",
    shortDescription:
      "Produs din gama noastră — detalii complete la comandă pe WhatsApp. Gramaje și prețuri actualizate rapid.",
    category: isMomitoare ? "momitoare" : "plumbi",
    variants: [
      { id: `${base}-a`, label: "Variantă A", priceRon: 15 },
      { id: `${base}-b`, label: "Variantă B", priceRon: 18 },
      { id: `${base}-c`, label: "Variantă C", priceRon: 21 },
    ],
  };
}

export function getCatalog(): CatalogProduct[] {
  return DISCOVERED_PRODUCT_PNGS.map((file) => {
    const detail = PRODUCT_DETAILS[file] ?? inferFromFilename(file);
    return {
      id: detail.slug,
      slug: detail.slug,
      name: detail.name,
      shortDescription: detail.shortDescription,
      image: `/${file}`,
      category: detail.category,
      variants: detail.variants,
      badge: detail.badge,
    };
  });
}

export function getProductsByCategory(category: ProductCategory): CatalogProduct[] {
  return getCatalog().filter((p) => p.category === category);
}

import { DISCOVERED_PRODUCT_PNGS } from "./discovered-images";

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
  images: string[];
  category: ProductCategory;
  variants: ProductVariant[];
  badge?: string;
};

type ProductSeed = Omit<CatalogProduct, "id">;

const DISCOVERED_SET = new Set<string>(DISCOVERED_PRODUCT_PNGS);

function imagePath(file: string) {
  return `/${file}`;
}

function keepDiscovered(files: string[]) {
  return files.filter((file) => DISCOVERED_SET.has(file)).map(imagePath);
}

const PRODUCT_SEEDS: ProductSeed[] = [
  {
    slug: "cosulet-momitoare",
    name: "Coșuleț momitoare",
    shortDescription:
      "Momitoare robustă pentru nadire precisă, cu vizualizări față/spate ale aceluiași model.",
    images: keepDiscovered(["cosulet-fata.png", "cosulet-spate.png"]),
    category: "momitoare",
    badge: "Popular",
    variants: [
      { id: "cm-30", label: "30 g", priceRon: 18 },
      { id: "cm-40", label: "40 g", priceRon: 20 },
      { id: "cm-50", label: "50 g", priceRon: 22 },
    ],
  },
  {
    slug: "momitoare-3-spite",
    name: "Momitoare 3 spite",
    shortDescription:
      "Construcție cu trei spite pentru eliberare progresivă a nădei. Recomandată când vrei ritm constant în zonă.",
    images: keepDiscovered(["momitoare-3-spite.png"]),
    category: "momitoare",
    variants: [
      { id: "m3-40", label: "40 g", priceRon: 24 },
      { id: "m3-50", label: "50 g", priceRon: 26 },
      { id: "m3-60", label: "60 g", priceRon: 28 },
    ],
  },
  {
    slug: "momitoare-dunare",
    name: "Momitoare Dunăre",
    shortDescription:
      "Profil aerodinamic pentru curenți și distanțe medii. Materiale rezistente, finisaj atent la detalii.",
    images: keepDiscovered(["momitoare-dunare.png"]),
    category: "momitoare",
    variants: [
      { id: "md-50", label: "50 g", priceRon: 26 },
      { id: "md-60", label: "60 g", priceRon: 28 },
      { id: "md-70", label: "70 g", priceRon: 30 },
    ],
  },
  {
    slug: "momitoare-grele",
    name: "Momitoare grele",
    shortDescription:
      "Pentru lansări lungi și monturi stabile în apă adâncă sau vânt. Greutate generoasă, control excelent.",
    images: keepDiscovered(["momitoare-grele.png"]),
    category: "momitoare",
    badge: "Lansare",
    variants: [
      { id: "mg-70", label: "70 g", priceRon: 32 },
      { id: "mg-80", label: "80 g", priceRon: 34 },
      { id: "mg-90", label: "90 g", priceRon: 36 },
    ],
  },
  {
    slug: "momitoare-longcast",
    name: "Momitoare Longcast",
    shortDescription:
      "Optimizată pentru distanță maximă cu traiectorie curată. Partenerul tău când vrei zona departe.",
    images: keepDiscovered(["momitoare-longcast.png"]),
    category: "momitoare",
    variants: [
      { id: "ml-50", label: "50 g", priceRon: 28 },
      { id: "ml-60", label: "60 g", priceRon: 30 },
      { id: "ml-70", label: "70 g", priceRon: 32 },
    ],
  },
  {
    slug: "momitoare-medii",
    name: "Momitoare medii",
    shortDescription:
      "Echilibru perfect între distanță și precizie. Una dintre cele mai versatile alegeri pentru crap și feeder.",
    images: keepDiscovered(["momitoare-medii.png"]),
    category: "momitoare",
    variants: [
      { id: "mm-40", label: "40 g", priceRon: 22 },
      { id: "mm-50", label: "50 g", priceRon: 24 },
      { id: "mm-60", label: "60 g", priceRon: 26 },
    ],
  },
  {
    slug: "momitoare-usoare",
    name: "Momitoare ușoare",
    shortDescription:
      "Finețe și control la distanțe scurte și medii. Excelente pentru nadire discretă și reacții rapide ale peștelui.",
    images: keepDiscovered(["momitoare-usoare.png"]),
    category: "momitoare",
    variants: [
      { id: "mu-20", label: "20 g", priceRon: 16 },
      { id: "mu-30", label: "30 g", priceRon: 18 },
      { id: "mu-40", label: "40 g", priceRon: 20 },
    ],
  },
  {
    slug: "plumb-bag",
    name: "Plumb tip bag",
    shortDescription:
      "Formă compactă, profil discret pe fund. Potrivit pentru monturi sensibile și prezentări curate ale momelei.",
    images: keepDiscovered(["plumb-bag.png"]),
    category: "plumbi",
    variants: [
      { id: "pb-40", label: "40 g", priceRon: 10 },
      { id: "pb-50", label: "50 g", priceRon: 11 },
      { id: "pb-60", label: "60 g", priceRon: 12 },
    ],
  },
  {
    slug: "plumb-fix-cu-tija",
    name: "Plumb fix cu tijă",
    shortDescription:
      "Montură stabilă cu tijă rigidă pentru anti-încurcare și direcție clară a firului spre montură.",
    images: keepDiscovered(["plumb-fix-tija.png"]),
    category: "plumbi",
    badge: "Precizie",
    variants: [
      { id: "pft-50", label: "50 g", priceRon: 12 },
      { id: "pft-60", label: "60 g", priceRon: 13 },
      { id: "pft-70", label: "70 g", priceRon: 14 },
    ],
  },
  {
    slug: "plumb-fix-cu-vartej",
    name: "Plumb fix cu vârtej",
    shortDescription:
      "Vârtej integrat pentru rotație lină și monturi sigure. Reduce torsiunea firului la drilluri și recuperări.",
    images: keepDiscovered(["plumb-fix-vartej.png"]),
    category: "plumbi",
    variants: [
      { id: "pfv-40", label: "40 g", priceRon: 12 },
      { id: "pfv-50", label: "50 g", priceRon: 13 },
      { id: "pfv-60", label: "60 g", priceRon: 14 },
    ],
  },
  {
    slug: "plumb-inline-fara-tija",
    name: "Plumb inline fără tijă",
    shortDescription:
      "Profil slim, alunecare pe fir pentru feedback fin. Ideal pentru pescuit fin și reacții rapide.",
    images: keepDiscovered(["plumb-inline-fara-tija.png"]),
    category: "plumbi",
    variants: [
      { id: "pif-30", label: "30 g", priceRon: 11 },
      { id: "pif-40", label: "40 g", priceRon: 12 },
      { id: "pif-50", label: "50 g", priceRon: 13 },
    ],
  },
  {
    slug: "plumb-para-inline",
    name: "Plumb para inline",
    shortDescription:
      "Formă pară cu comportament predictibil în apă. Inline pentru control și siguranță la aruncări repetate.",
    images: keepDiscovered(["plumb-para-inline.png"]),
    category: "plumbi",
    variants: [
      { id: "ppi-40", label: "40 g", priceRon: 13 },
      { id: "ppi-50", label: "50 g", priceRon: 14 },
      { id: "ppi-60", label: "60 g", priceRon: 15 },
    ],
  },
  {
    slug: "plumb-para",
    name: "Plumb pară",
    shortDescription:
      "Clasic reinterpretat: stabilitate pe fund, profil prietenos cu vegetație ușoară și prezentare curată.",
    images: keepDiscovered(["plumb-para.png"]),
    category: "plumbi",
    variants: [
      { id: "pp-50", label: "50 g", priceRon: 12 },
      { id: "pp-60", label: "60 g", priceRon: 13 },
      { id: "pp-70", label: "70 g", priceRon: 14 },
    ],
  },
  {
    slug: "plumb-pasta-longcast",
    name: "Plumb pastă Longcast",
    shortDescription:
      "Plumb pentru utilizare cu pastă, optimizat pentru ajustări rapide la distanță și stabilitate la lansare.",
    images: keepDiscovered(["plumb-pasta-longcast.png"]),
    category: "plumbi",
    badge: "Versatil",
    variants: [
      { id: "ppl-1", label: "Cutie S", priceRon: 22 },
      { id: "ppl-2", label: "Cutie M", priceRon: 28 },
      { id: "ppl-3", label: "Cutie L", priceRon: 34 },
    ],
  },
  {
    slug: "plumb-pasta",
    name: "Plumb pastă",
    shortDescription:
      "Plumb special conceput pentru utilizare cu pastă, cu aderență foarte bună și reglaje rapide pe mal.",
    images: keepDiscovered(["plumb-pasta.png"]),
    category: "plumbi",
    variants: [
      { id: "ppa-1", label: "Cutie S", priceRon: 18 },
      { id: "ppa-2", label: "Cutie M", priceRon: 24 },
      { id: "ppa-3", label: "Cutie L", priceRon: 30 },
    ],
  },
  {
    slug: "plumb-sondare",
    name: "Plumb sondare",
    shortDescription:
      "Profil dedicat explorării fundului: feedback clar, formă care citește structura și textura substratului.",
    images: keepDiscovered(["plumb-sondare.png"]),
    category: "plumbi",
    variants: [
      { id: "ps-40", label: "40 g", priceRon: 13 },
      { id: "ps-50", label: "50 g", priceRon: 14 },
      { id: "ps-60", label: "60 g", priceRon: 15 },
    ],
  },
  {
    slug: "plumbi-lacrima",
    name: "Plumbi lacrimă",
    shortDescription:
      "Set lacrimă pentru coborâri fluide și stabilitate. Finisaj uniform, gramaje verificate individual.",
    images: keepDiscovered(["plumbi-lacrima.png"]),
    category: "plumbi",
    variants: [
      { id: "pl-40", label: "40 g", priceRon: 11 },
      { id: "pl-50", label: "50 g", priceRon: 12 },
      { id: "pl-60", label: "60 g", priceRon: 13 },
    ],
  },
  {
    slug: "plumbi-trident",
    name: "Plumbi trident",
    shortDescription:
      "Același model prezentat din două unghiuri (1/2), pentru ancorare sigură în substrat moale.",
    images: keepDiscovered(["plumbi-trident-1.png", "plumbi-trident-2.png"]),
    category: "plumbi",
    variants: [
      { id: "pt-60", label: "60 g", priceRon: 15 },
      { id: "pt-80", label: "80 g", priceRon: 17 },
      { id: "pt-100", label: "100 g", priceRon: 19 },
    ],
  },
  {
    slug: "plumb-distantiere-cu-tija",
    name: "Plumb distanțier cu tijă rigidă",
    shortDescription:
      "Plumb cu tijă rigidă pentru monturi de distanță și control sporit la coborâre. Finisaj camuflaj discret.",
    images: keepDiscovered(["7.png"]),
    category: "plumbi",
    badge: "Distanță",
    variants: [
      { id: "p7-50", label: "50 g", priceRon: 14 },
      { id: "p7-60", label: "60 g", priceRon: 15 },
      { id: "p7-70", label: "70 g", priceRon: 16 },
    ],
  },
];

function normalizeGroupingBase(file: string) {
  return file
    .replace(/\.png$/i, "")
    .replace(/-(fata|spate)$/i, "")
    .replace(/-\d+$/i, "");
}

function inferFromFiles(files: string[]): ProductSeed {
  const representative = files[0] ?? "produs-nou.png";
  const base = normalizeGroupingBase(representative);
  const isMomitoare = base.startsWith("momitoare") || base.startsWith("cosulet");
  const human = base
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return {
    slug: base,
    name: human || "Produs nou",
    shortDescription:
      "Produs din gama noastră — detalii complete la comandă pe WhatsApp. Gramaje și prețuri actualizate rapid.",
    images: files.map(imagePath),
    category: isMomitoare ? "momitoare" : "plumbi",
    variants: [
      { id: `${base}-a`, label: "Variantă A", priceRon: 15 },
      { id: `${base}-b`, label: "Variantă B", priceRon: 18 },
      { id: `${base}-c`, label: "Variantă C", priceRon: 21 },
    ],
  };
}

function getInferredProducts(): ProductSeed[] {
  const knownFiles = new Set(PRODUCT_SEEDS.flatMap((p) => p.images.map((img) => img.replace(/^\//, ""))));
  const leftovers = DISCOVERED_PRODUCT_PNGS.filter((file) => !knownFiles.has(file));

  const groups = new Map<string, string[]>();
  leftovers.forEach((file) => {
    const key = normalizeGroupingBase(file);
    const current = groups.get(key) ?? [];
    current.push(file);
    groups.set(key, current);
  });

  return Array.from(groups.values())
    .map((files) => files.sort((a, b) => a.localeCompare(b, "ro")))
    .map((files) => inferFromFiles(files));
}

export function getCatalog(): CatalogProduct[] {
  return [...PRODUCT_SEEDS, ...getInferredProducts()]
    .filter((p) => p.images.length > 0)
    .map((seed) => ({
      id: seed.slug,
      slug: seed.slug,
      name: seed.name,
      shortDescription: seed.shortDescription,
      images: seed.images,
      category: seed.category,
      variants: seed.variants,
      badge: seed.badge,
    }));
}

export function getProductsByCategory(category: ProductCategory): CatalogProduct[] {
  return getCatalog().filter((p) => p.category === category);
}

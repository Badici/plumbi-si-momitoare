import { DISCOVERED_PRODUCT_PNGS } from "./discovered-images";

export type ProductCategory = "momitoare" | "cosulete-feeder" | "plumbi";

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

/** Ordinea afișării produselor din categoria Coșulețe feeder. */
export const COSULETE_FEEDER_ORDER = ["cosulet-lake-mini", "cosulet-lake-medium", "cosulet-river"] as const;

/** Ordinea afișării produselor din categoria Plumbi. */
export const PLUMBI_ORDER = [
  "plumb-inline",
  "plumb-fix-hexagonal",
  "plumb-fix-rotund",
  "plumb-fix-conic",
  "plumb-fix-cu-tija",
  "plumb-grippa-cu-vartej",
  "plumb-grippa-inline",
  "plumb-pasta",
  "plumb-pasta-longcast",
  "plumb-pasta-paste-bomb",
  "plumb-bag",
  "plumb-sondare",
] as const;

/** Ordinea afișării produselor din categoria Momitoare în catalog. */
export const MOMITOARE_ORDER = [
  "momitoare-rotunde-mici",
  "momitoare-rotunde-mari",
  "momitoare-conice",
  "momitoare-cilindrice",
  "momitoare-longcast",
  "momitoare-cu-placa",
  "momitoare-method-pellet",
] as const;

const PRODUCT_SEEDS: ProductSeed[] = [
  {
    slug: "cosulet-lake-mini",
    name: "Coșuleț Lake mini",
    shortDescription:
      "Cosulet clasic pentru pescuit la feeder.",
    images: ["/new_photos/cosulet lake mini.png"],
    category: "cosulete-feeder",
    badge: "Lake",
    variants: [
      { id: "cl-30", label: "30 g", priceRon: 18 },
      { id: "cl-40", label: "40 g", priceRon: 20 },
      { id: "cl-50", label: "50 g", priceRon: 22 },
    ],
  },
  {
    slug: "cosulet-lake-medium",
    name: "Coșuleț Lake medium",
    shortDescription:
      "Coșulețul clasic pentru pescuit la feeder, de dimensiuni medii.",
 
    images: ["/new_photos/cosulet lake mediu.png"],
    category: "cosulete-feeder",
    badge: "Lake",
    variants: [
      { id: "cl-30", label: "30 g", priceRon: 18 },
      { id: "cl-40", label: "40 g", priceRon: 20 },
      { id: "cl-50", label: "50 g", priceRon: 22 },
    ],
  },
  {
    slug: "cosulet-river",
    name: "Coșuleț River",
    shortDescription:
      "Model River, optimizat cu 4 țepi pe talpă pentru aderență și stabilitate în curent.",
 
    images: ["/new_photos/cosulate river 1.png", "/new_photos/cosulet river 2.png"],
    category: "cosulete-feeder",
    badge: "Feeder",
    variants: [
      { id: "cf-30", label: "90 g", priceRon: 18 },
      { id: "cf-40", label: "110 g", priceRon: 20 },
      { id: "cf-50", label: "130 g", priceRon: 22 },
      { id: "cf-60", label: "150 g", priceRon: 24 },
    ],
  },
  {
    slug: "momitoare-rotunde-mici",
    name: "Momitoare rotunde mici",
    shortDescription:
      "Momitoare rotunde compacte, ideale pentru nadire precisă și lansări în zona apropiată — echilibru bun între volum și control.",
    images: ["/new_photos/momitoare rotunde mici.png"],
    category: "momitoare",
    variants: [
      { id: "mrm-38", label: "38 g", priceRon: 5 },
      { id: "mrm-60", label: "60 g", priceRon: 5.2 },
    ],
  },
  {
    slug: "momitoare-rotunde-mari",
    name: "Momitoare rotunde mari",
    shortDescription:
      "Momitoare rotunde cu volum mai mare de nadă, pentru sesiuni în care vrei să ții mai multă momeală pe vad.",
    images: ["/new_photos/momitoare rotunde mari.png"],
    category: "momitoare",
    variants: [
      { id: "mrmar-60", label: "60 g", priceRon: 5.4 },
      { id: "mrmar-80", label: "80 g", priceRon: 5.8 },
    ],
  },
  {
    slug: "momitoare-conice",
    name: "Momitoare conice",
    shortDescription:
      "Profil conic, cu spațiu generos pentru nadă și cu o așezare foarte bună pe substrat datorită formei.",
 
    images: ["/new_photos/momitoare conice.png"],
    category: "momitoare",
    badge: "Lansare",
    variants: [
      { id: "mc-60", label: "60 g", priceRon: 5.4 },
      { id: "mc-70", label: "70 g", priceRon: 5.6 },
    ],
  },
  {
    slug: "momitoare-cilindrice",
    name: "Momitoare cilindrice",
    shortDescription:
      "Profil cilindric, ușor de umplut și controlat la lansare — potrivite pentru lansete mai ușoare și monturi fine.",
    images: ["/new_photos/momitoare cilindrice.png"],
    category: "momitoare",
    variants: [
      { id: "mci-38", label: "38 g", priceRon: 5 },
      { id: "mci-60", label: "60 g", priceRon: 5.2 },
    ],
  },
  {
    slug: "momitoare-longcast",
    name: "Momitoare longcast",
    shortDescription:
      "Model optimizat pentru distanță maximă și traiectorie curată.",
    images: ["/new_photos/momitoare longcast.png"],
    category: "momitoare",
    variants: [
      { id: "ml-38", label: "38 g", priceRon: 5 },
      { id: "ml-60", label: "60 g", priceRon: 5.4 },
      { id: "ml-80", label: "80 g", priceRon: 5.8 },
    ],
  },
  {
    slug: "momitoare-cu-placa",
    name: "Momitoare cu placă",
    shortDescription:
      "Construite pe un profil apropiat de method, cu placă pentru stabilitate și poziționare bună în curenți sau pe fund variat.",
    images: ["/new_photos/momitoare cu placa.png"],
    category: "momitoare",
    variants: [
      { id: "mp-100", label: "100 g", priceRon: 7 },
      { id: "mp-120", label: "120 g", priceRon: 7.5 },
    ],
  },
  {
    slug: "momitoare-method-pellet",
    name: "Momitor method pellet",
    shortDescription:
      "Construcție cu trei arcade pentru eliberare rapidă a nădei — recomandată la început de partidă pentru crearea patului de nadă.",
    images: ["/new_photos/momitoare method pellet.png"],
    category: "momitoare",
    variants: [{ id: "mmp-35", label: "35 g", priceRon: 5 }],
  },
  {
    slug: "plumb-inline",
    name: "Plumb inline cu tijă rigidă",
    shortDescription:
      "Clasicul plumb inline cu tijă rigidă și autoînțepare",

    images: ["/new_photos/plumbi inline.png"],
    category: "plumbi",
    badge: "Distanță",
    variants: [
      { id: "pin-76", label: "76 g", priceRon: 4.4 },
      { id: "pin-82", label: "82 g", priceRon: 4.6 },
      { id: "pin-92", label: "92 g", priceRon: 4.8 },
      { id: "pin-102", label: "102 g", priceRon: 5 },
      { id: "pin-112", label: "112 g", priceRon: 5.2 },
      { id: "pin-118", label: "118 g", priceRon: 5.4 },
      { id: "pin-138", label: "138 g", priceRon: 5.6 },
    ],
  },
  {
    slug: "plumb-fix-hexagonal",
    name: "Plumb fix cu vârtej hexagonal",
    shortDescription:
      "Cel mai folosit plumb pentru montură cu plumb pierdut.",

    images: ["/new_photos/plumb fix cu vartej hexagonal.png"],
    category: "plumbi",
    variants: [
      { id: "pfvh-70", label: "70 g", priceRon: 4.7 },
      { id: "pfvh-80", label: "80 g", priceRon: 4.8 },
      { id: "pfvh-90", label: "90 g", priceRon: 4.9 },
      { id: "pfvh-100", label: "100 g", priceRon: 5 },
      { id: "pfvh-110", label: "110 g", priceRon: 5.1 },
      { id: "pfvh-120", label: "120 g", priceRon: 5.2 },
      { id: "pfvh-130", label: "130 g", priceRon: 5.3 },
      { id: "pfvh-140", label: "140 g", priceRon: 5.4 },
    ],
  },
  {
    slug: "plumb-fix-rotund",
    name: "Plumb fix cu vârtej rotund",
    shortDescription:
      "Plumb folosit pentru lansări la distanțe foarte mari, cu un profil rotund care permite o așezare foarte bună pe substrat.",

    images: ["/new_photos/plumb fix cu vartej rotund.png"],
    category: "plumbi",
    variants: [
      { id: "pfvr-80", label: "80 g", priceRon: 4.8 },
      { id: "pfvr-90", label: "90 g", priceRon: 4.9 },
      { id: "pfvr-100", label: "100 g", priceRon: 5 },
      { id: "pfvr-110", label: "110 g", priceRon: 5.1 },
      { id: "pfvr-115", label: "115 g", priceRon: 5.2 },
      { id: "pfvr-120", label: "120 g", priceRon: 5.3 },
      { id: "pfvr-125", label: "125 g", priceRon: 5.4 },
      { id: "pfvr-130", label: "130 g", priceRon: 5.5 },
    ],
  },
  {
    slug: "plumb-fix-conic",
    name: "Plumb fix conic",
    shortDescription:
      "Cel mai bun și cel mai folosit plumb fix pentru montură elicopter și pescuit în mâl, acesta fiind recunoscut pentru ieșirea rapidă din mâl.",

    images: ["/new_photos/plumb fix conic.png"],
    category: "plumbi",
    variants: [
      { id: "pfc-105", label: "105 g", priceRon: 5 },
      { id: "pfc-115", label: "115 g", priceRon: 5.2 },
      { id: "pfc-125", label: "125 g", priceRon: 5.4 },
      { id: "pfc-135", label: "135 g", priceRon: 5.6 },
    ],
  },
  {
    slug: "plumb-fix-cu-tija",
    name: "Plumb fix cu tijă metalică",
    shortDescription:
      "Plumb folosit pentru pescuitul în substrat mâlos, la care tija metalică ajută la eliberarea acestuia din mâl și oferă o stabilitate foarte bună în lanseu.",

    images: ["/new_photos/plumb fix cu tija.png"],
    category: "plumbi",
    badge: "Precizie",
    variants: [
      { id: "pft-70", label: "70 g", priceRon: 7 },
      { id: "pft-80", label: "80 g", priceRon: 7 },
      { id: "pft-90", label: "90 g", priceRon: 7 },
      { id: "pft-100", label: "100 g", priceRon: 7 },
      { id: "pft-110", label: "110 g", priceRon: 8 },
      { id: "pft-120", label: "120 g", priceRon: 8 },
      { id: "pft-130", label: "130 g", priceRon: 8 },
      { id: "pft-140", label: "140 g", priceRon: 8 },
    ],
  },
  {
    slug: "plumb-grippa-cu-vartej",
    name: "Plumb Grippa cu vârtej",
    shortDescription:
      "Clasicul plumb pierdut destinat pescuitului plantat.",
    images: ["/new_photos/plumb grippa cu vartej.png"],
    category: "plumbi",
    variants: [
      { id: "pp-90", label: "90 g", priceRon: 5.8 },
      { id: "pp-100", label: "100 g", priceRon: 6 },
      { id: "pp-110", label: "110 g", priceRon: 6.2 },
      { id: "pp-120", label: "120 g", priceRon: 6.4 },
      { id: "pp-130", label: "130 g", priceRon: 6.6 },
      { id: "pp-150", label: "150 g", priceRon: 7 },
      { id: "pp-160", label: "160 g", priceRon: 7.5 },
      { id: "pp-180", label: "180 g", priceRon: 8.5 },
      { id: "pp-200", label: "200 g", priceRon: 9 },
    ],
  },
  {
    slug: "plumb-grippa-inline",
    name: "Plumb Grippa inline",
    shortDescription:
      "Poate cel mai evoluat plumb pentru pescuitul plantat cât și pescuitul pe râuri.",

    images: ["/new_photos/plumb grippa inline.png"],
    category: "plumbi",
    variants: [
      { id: "ppi-66", label: "66 g", priceRon: 5 },
      { id: "ppi-77", label: "77 g", priceRon: 5.5 },
      { id: "ppi-88", label: "88 g", priceRon: 6 },
      { id: "ppi-102", label: "102 g", priceRon: 6.5 },
      { id: "ppi-112", label: "112 g", priceRon: 6.9 },
      { id: "ppi-130", label: "130 g", priceRon: 7.1 },
      { id: "ppi-150", label: "150 g", priceRon: 7.3 },
      { id: "ppi-165", label: "165 g", priceRon: 7.5 },
      { id: "ppi-180", label: "180 g", priceRon: 8.5 },
      { id: "ppi-200", label: "200 g", priceRon: 9 },
    ],
  },
  {
    slug: "plumb-pasta",
    name: "Plumb pastă",
    shortDescription:
      "Plumb special conceput pentru utilizare cu pastă, cu aderență foarte bună.",
    images: ["/new_photos/plumb pasta.png"],
    category: "plumbi",
    variants: [
      { id: "ppa-1", label: "60 g", priceRon: 5 },
      { id: "ppa-2", label: "80 g", priceRon: 5.3 },
      { id: "ppa-3", label: "100 g", priceRon: 5.5 },
    ],
  },
  {
    slug: "plumb-pasta-longcast",
    name: "Plumb pastă longcast",
    shortDescription:
      "Plumb pentru utilizare cu pastă, optimizat pentru lanseuri la distanță și stabilitate la lansare.",
    images: ["/new_photos/plumb pasta longcast.png"],
    category: "plumbi",
    badge: "Versatil",
    variants: [
      { id: "ppl-1", label: "65 g", priceRon: 5 },
      { id: "ppl-2", label: "80 g", priceRon: 5.3 },
      { id: "ppl-3", label: "90 g", priceRon: 5.5 },
    ],
  },
  {
    slug: "plumb-pasta-paste-bomb",
    name: "Plumbi pasta tip Paste Bomb",
    shortDescription:
      "Cel mai evoluat plumb de pastă cu o ridicare foarte rapidă de pe substrat și recuperare foarte ușoară. Disponibil cu tijă rigidă sau cu insert cauciuc.",

    images: ["/new_photos/plumb pasta tip paste bomb.png"],
    category: "plumbi",
    variants: [{ id: "pt-60", label: "86 g", priceRon: 10 }],
  },
  {
    slug: "plumb-bag",
    name: "Plumb pentru bag",
    shortDescription:
      "Clasicul plumb pentru bag, cu cea mai mare plaja de gramaje.",
    images: ["/new_photos/plumbi bag.png"],
    category: "plumbi",
    variants: [
      { id: "pb-50", label: "50 g", priceRon: 4 },
      { id: "pb-60", label: "60 g", priceRon: 4.2 },
      { id: "pb-70", label: "70 g", priceRon: 4.4 },
      { id: "pb-75", label: "75 g", priceRon: 4.5 },
      { id: "pb-80", label: "80 g", priceRon: 4.6 },
      { id: "pb-85", label: "85 g", priceRon: 4.7 },
      { id: "pb-90", label: "90 g", priceRon: 4.8 },
      { id: "pb-95", label: "95 g", priceRon: 4.9 },
      { id: "pb-110", label: "110 g", priceRon: 5 },
    ],
  },
  {
    slug: "plumb-sondare",
    name: "Plumb pentru sondare",
    shortDescription:
      "Profil dedicat explorării substratului: feedback clar, formă care citește structura și textura substratului. Ideal pentru feeder si crap.",
    images: ["/new_photos/plumbi pentru sondare.png"],
    category: "plumbi",
    variants: [
      { id: "ps-40", label: "40 g", priceRon: 5 },
      { id: "ps-60", label: "60 g", priceRon: 5.5 },
      { id: "ps-80", label: "80 g", priceRon: 6 },
      { id: "ps-90", label: "90 g", priceRon: 6.5 },
      { id: "ps-110", label: "110 g", priceRon: 7 },
      { id: "ps-130", label: "130 g", priceRon: 7.5 },
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
  const isCosulet = base.startsWith("cosulet");
  const isMomitoare = base.startsWith("momitoare");
  const human = base
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  const category: ProductCategory = isCosulet
    ? "cosulete-feeder"
    : isMomitoare
      ? "momitoare"
      : "plumbi";

  return {
    slug: base,
    name: human || "Produs nou",
    shortDescription:
      "Produs din gama noastră — detalii complete la comandă pe WhatsApp. Gramaje și prețuri actualizate rapid.",
    images: files.map(imagePath),
    category,
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
  return [...PRODUCT_SEEDS]
    .filter((p) => p.images.length > 0)
    .filter((p) => p.images.every((img) => img.startsWith("/new_photos/")))
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
  const list = getCatalog().filter((p) => p.category === category);
  if (category === "momitoare") {
    const order = new Map<string, number>(MOMITOARE_ORDER.map((slug, i) => [slug, i]));
    return [...list].sort((a, b) => {
      const ia = order.get(a.slug);
      const ib = order.get(b.slug);
      if (ia === undefined && ib === undefined) {
        return a.slug.localeCompare(b.slug, "ro");
      }
      if (ia === undefined) {
        return 1;
      }
      if (ib === undefined) {
        return -1;
      }
      return ia - ib;
    });
  }
  if (category === "cosulete-feeder") {
    const order = new Map<string, number>(COSULETE_FEEDER_ORDER.map((slug, i) => [slug, i]));
    return [...list].sort((a, b) => {
      const ia = order.get(a.slug);
      const ib = order.get(b.slug);
      if (ia === undefined && ib === undefined) {
        return a.slug.localeCompare(b.slug, "ro");
      }
      if (ia === undefined) {
        return 1;
      }
      if (ib === undefined) {
        return -1;
      }
      return ia - ib;
    });
  }
  if (category === "plumbi") {
    const order = new Map<string, number>(PLUMBI_ORDER.map((slug, i) => [slug, i]));
    return [...list].sort((a, b) => {
      const ia = order.get(a.slug);
      const ib = order.get(b.slug);
      if (ia === undefined && ib === undefined) {
        return a.slug.localeCompare(b.slug, "ro");
      }
      if (ia === undefined) {
        return 1;
      }
      if (ib === undefined) {
        return -1;
      }
      return ia - ib;
    });
  }
  return list;
}

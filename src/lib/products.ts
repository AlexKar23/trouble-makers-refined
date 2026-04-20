// Catálogo Trouble Makers Shop — placeholders editoriales (sin URLs externas)

export type SwatchKey = "gold" | "silver" | "rose" | "teal";

export type Product = {
  slug: string;
  name: string;
  collection: string; // categoría visible
  category: "anillos" | "pendientes" | "colgantes" | "minis";
  price: number;
  oldPrice?: number;
  badge?: "Nuevo" | "Bestseller" | "Sale" | "Edición limitada";
  stock: number;
  swatches: SwatchKey[]; // disponibles
  description: string;
  materials: string;
  measurements: string;
};

export const swatchMeta: Record<SwatchKey, { label: string; color: string; gradient: string }> = {
  gold:   { label: "Oro 18k",   color: "hsl(32 58% 62%)", gradient: "var(--gradient-jewel-gold)" },
  silver: { label: "Plata 925", color: "hsl(220 6% 72%)", gradient: "var(--gradient-jewel-silver)" },
  rose:   { label: "Oro Rosa",  color: "hsl(12 48% 70%)", gradient: "var(--gradient-jewel-rose)" },
  teal:   { label: "Esmalte Teal", color: "hsl(174 42% 38%)", gradient: "var(--gradient-jewel-teal)" },
};

export const products: Product[] = [
  { slug: "anillo-mandala", name: "Anillo Mandala", collection: "Anillos · Acero", category: "anillos", price: 9, badge: "Bestseller", stock: 4, swatches: ["silver","gold"],
    description: "Anillo en acero quirúrgico con grabado tipo mandala. Resistente al agua y a los perfumes, perfecto para llevar todos los días sin que pierda brillo.",
    materials: "Acero inoxidable quirúrgico 316L. Hipoalergénico, no se oxida.", measurements: "Talla ajustable · Ancho 6 mm" },
  { slug: "anillo-ola", name: "Anillo Ola", collection: "Anillos · Plata 925", category: "anillos", price: 12, oldPrice: 16, badge: "Nuevo", stock: 8, swatches: ["silver","gold","rose"],
    description: "Anillo inspirado en las olas del Mediterráneo. Plata de ley con acabado mate, ligero y minimalista.",
    materials: "Plata de ley 925. Hipoalergénico.", measurements: "Tallas 12, 14, 16 · Ancho 4 mm" },
  { slug: "pendientes-conchas", name: "Pendientes Conchas", collection: "Pendientes", category: "pendientes", price: 14, badge: "Bestseller", stock: 3, swatches: ["gold","silver"],
    description: "Pendientes en forma de concha bañados en oro. Inspirados en el mar, ligeros y con cierre seguro tipo presión.",
    materials: "Latón con baño de oro 18k. Cierre de presión.", measurements: "1,5 cm de alto" },
  { slug: "colgante-cruz-brillante", name: "Colgante Cruz Brillante", collection: "Colgantes", category: "colgantes", price: 16, badge: "Edición limitada", stock: 5, swatches: ["silver","gold"],
    description: "Cadena fina con dije de cruz cubierta de circonitas. Pieza versátil que combina con todo tu fondo de joyero.",
    materials: "Plata 925 + circonitas. Cadena ajustable.", measurements: "Cadena 42 cm + extensor 5 cm" },
  { slug: "pendientes-aros-estrellas", name: "Pendientes Aros Estrellas", collection: "Pendientes · Gold", category: "pendientes", price: 12, badge: "Nuevo", stock: 9, swatches: ["gold"],
    description: "Aros dorados con dije de estrella. Tendencia atemporal para combinar con cualquier look.",
    materials: "Latón con baño de oro 18k.", measurements: "Aro 2 cm de diámetro" },
  { slug: "colgante-tigre", name: "Colgante Tigre", collection: "Colgantes", category: "colgantes", price: 14, badge: "Bestseller", stock: 6, swatches: ["gold","silver"],
    description: "Colgante de tigre, símbolo de fuerza y carácter. La pieza statement de la temporada.",
    materials: "Plata 925 con baño dorado.", measurements: "Cadena 45 cm · dije 2 cm" },
  { slug: "mini-aritos-piedras-fucsias", name: "Mini Aritos Piedras Fucsias", collection: "Mini Aritos", category: "minis", price: 8, badge: "Nuevo", stock: 12, swatches: ["silver","rose"],
    description: "Mini aros de plata con piedras color fucsia. Perfectos para el segundo agujero o cartílago.",
    materials: "Plata 925 + piedras de cristal.", measurements: "0,8 cm de diámetro" },
  { slug: "mini-aritos-rayo", name: "Mini Aritos Rayo", collection: "Mini Aritos", category: "minis", price: 7, stock: 14, swatches: ["silver","gold"],
    description: "Aritos diminutos con dije de rayo. Discretos pero con personalidad.",
    materials: "Plata 925.", measurements: "0,8 cm de diámetro" },
  // catálogo extendido para scroll infinito
  { slug: "pendientes-perla-barroca", name: "Pendientes Perla Barroca", collection: "Pendientes", category: "pendientes", price: 18, badge: "Nuevo", stock: 7, swatches: ["gold","silver"],
    description: "Perla cultivada de forma barroca con base dorada. Pieza de carácter editorial.",
    materials: "Plata bañada en oro 18k + perla cultivada.", measurements: "2,2 cm de alto" },
  { slug: "pendientes-aro-grueso", name: "Aros Esenciales Gruesos", collection: "Pendientes", category: "pendientes", price: 15, stock: 11, swatches: ["gold","silver","rose"],
    description: "El aro icónico, en grosor cómodo y peso ligero. Imprescindible.",
    materials: "Latón con baño de oro 18k.", measurements: "3 cm de diámetro" },
  { slug: "pendientes-cadena-asimetrica", name: "Pendientes Cadena Asimétrica", collection: "Pendientes", category: "pendientes", price: 22, badge: "Edición limitada", stock: 3, swatches: ["gold"],
    description: "Cadena fina asimétrica que abraza la oreja. Statement sutil.",
    materials: "Plata 925 con baño de oro.", measurements: "Largo 4-6 cm" },
  { slug: "pendientes-trebol", name: "Pendientes Trébol", collection: "Pendientes", category: "pendientes", price: 11, stock: 18, swatches: ["silver","gold"],
    description: "El símbolo de la suerte en mini formato. Para llevar a diario.",
    materials: "Plata 925.", measurements: "1 cm" },
  { slug: "pendientes-luna-creciente", name: "Pendientes Luna Creciente", collection: "Pendientes", category: "pendientes", price: 13, badge: "Bestseller", stock: 9, swatches: ["silver","gold"],
    description: "Luna creciente delicada, inspiración celestial.",
    materials: "Plata 925 con acabado pulido.", measurements: "1,4 cm" },
  { slug: "pendientes-clavo-largo", name: "Pendientes Clavo Largo", collection: "Pendientes", category: "pendientes", price: 16, stock: 6, swatches: ["gold","silver"],
    description: "Clavo alargado de líneas limpias. Minimalismo escultural.",
    materials: "Latón con baño de oro 18k.", measurements: "5 cm" },
  { slug: "pendientes-piedra-verde", name: "Pendientes Piedra Verde", collection: "Pendientes", category: "pendientes", price: 19, badge: "Nuevo", stock: 5, swatches: ["gold","teal"],
    description: "Piedra verde engastada en oro. Pieza que recuerda al jade del Mediterráneo.",
    materials: "Latón con baño de oro 18k + piedra cristal.", measurements: "1,6 cm" },
  { slug: "pendientes-mini-corazon", name: "Mini Corazón", collection: "Pendientes", category: "pendientes", price: 9, stock: 22, swatches: ["silver","gold","rose"],
    description: "Corazón diminuto, dulce y atemporal.",
    materials: "Plata 925.", measurements: "0,7 cm" },
  { slug: "pendientes-arquitectonicos", name: "Pendientes Arquitectónicos", collection: "Pendientes", category: "pendientes", price: 24, badge: "Edición limitada", stock: 2, swatches: ["silver","gold"],
    description: "Geometría de inspiración Bauhaus. Edición limitada de la temporada.",
    materials: "Plata 925.", measurements: "3,5 cm" },
  { slug: "pendientes-flor-nacar", name: "Pendientes Flor Nácar", collection: "Pendientes", category: "pendientes", price: 17, stock: 8, swatches: ["gold","rose"],
    description: "Pétalos de nácar engastados. Femenino y luminoso.",
    materials: "Latón con baño de oro 18k + nácar natural.", measurements: "1,2 cm" },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const byCategory = (cat: Product["category"]) => products.filter((p) => p.category === cat);

import { useEffect, useMemo, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronDown, SlidersHorizontal } from "lucide-react";
import { Layout } from "@/components/Layout";
import { ProductCard } from "@/components/ProductCard";
import { Product, products, SwatchKey, swatchMeta } from "@/lib/products";

const titles: Record<string, { title: string; sub: string; cat?: Product["category"] }> = {
  pendientes: { title: "Pendientes", sub: "Aros, perlas, asimétricos. Pieza por pieza.", cat: "pendientes" },
  anillos:    { title: "Anillos",    sub: "Acero, plata, oro. Para apilar sin miedo.", cat: "anillos" },
  colgantes:  { title: "Colgantes",  sub: "Símbolos para llevar cerca del corazón.",   cat: "colgantes" },
  minis:      { title: "Mini Aritos",sub: "El detalle que lo cambia todo.",            cat: "minis" },
  nueva:      { title: "Nueva Colección", sub: "Lo último en atelier — primavera 2026." },
};

const PAGE_SIZE = 6;

const Coleccion = () => {
  const { slug = "pendientes" } = useParams();
  const meta = titles[slug] ?? titles.pendientes;

  const base = useMemo(() => {
    if (slug === "nueva") return products.filter((p) => p.badge === "Nuevo" || p.badge === "Edición limitada").concat(products);
    return meta.cat ? products.filter((p) => p.category === meta.cat) : products;
  }, [slug, meta.cat]);

  // Filters
  const [material, setMaterial] = useState<SwatchKey | "all">("all");
  const [maxPrice, setMaxPrice] = useState(30);
  const [sort, setSort] = useState<"recommended" | "price-asc" | "price-desc">("recommended");

  const filtered = useMemo(() => {
    let arr = base.filter((p) => p.price <= maxPrice && (material === "all" || p.swatches.includes(material)));
    if (sort === "price-asc") arr = [...arr].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") arr = [...arr].sort((a, b) => b.price - a.price);
    return arr;
  }, [base, material, maxPrice, sort]);

  // Infinite scroll
  const [visible, setVisible] = useState(PAGE_SIZE);
  useEffect(() => { setVisible(PAGE_SIZE); }, [slug, material, maxPrice, sort]);
  const sentinel = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = sentinel.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setVisible((v) => Math.min(filtered.length, v + PAGE_SIZE));
    }, { rootMargin: "300px" });
    io.observe(el); return () => io.disconnect();
  }, [filtered.length]);

  const shown = filtered.slice(0, visible);
  const hasMore = visible < filtered.length;

  return (
    <Layout>
      {/* Hero */}
      <section className="container py-12 md:py-16">
        <nav className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground mb-6">
          <Link to="/" className="link-underline">Inicio</Link> <span className="mx-2 opacity-50">/</span> {meta.title}
        </nav>
        <div className="flex items-end justify-between gap-8 flex-wrap">
          <div>
            <h1 className="font-display text-5xl md:text-6xl">{meta.title}</h1>
            <p className="text-muted-foreground mt-3 max-w-md">{meta.sub}</p>
          </div>
          <p className="text-xs text-muted-foreground tabular-nums">{filtered.length} piezas</p>
        </div>
      </section>

      {/* Filters */}
      <section className="container">
        <div className="flex flex-wrap items-center gap-4 border-y border-border py-5">
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em]">
            <SlidersHorizontal className="h-3.5 w-3.5" /> Filtros
          </div>

          <div className="flex items-center gap-1.5">
            <button onClick={() => setMaterial("all")} className={`px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] border ${material==="all"?"bg-foreground text-background border-foreground":"border-border"}`}>Todos</button>
            {(Object.keys(swatchMeta) as SwatchKey[]).map((k) => (
              <button key={k} onClick={() => setMaterial(k)} className={`px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] border flex items-center gap-2 ${material===k?"bg-foreground text-background border-foreground":"border-border"}`}>
                <span className="h-2.5 w-2.5 rounded-full" style={{background: swatchMeta[k].color}} />
                {swatchMeta[k].label}
              </button>
            ))}
          </div>

          <label className="flex items-center gap-3 text-[11px] uppercase tracking-[0.18em]">
            Precio max: <span className="tabular-nums font-medium normal-case tracking-normal">{maxPrice}€</span>
            <input type="range" min={5} max={30} value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} className="w-32 accent-primary" />
          </label>

          <div className="ml-auto flex items-center gap-2">
            <select value={sort} onChange={(e) => setSort(e.target.value as any)} className="bg-transparent text-[11px] uppercase tracking-[0.18em] border border-border px-3 py-1.5">
              <option value="recommended">Recomendado</option>
              <option value="price-asc">Precio ↑</option>
              <option value="price-desc">Precio ↓</option>
            </select>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="container py-12">
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-display text-3xl mb-2">Sin resultados</p>
            <p className="text-muted-foreground text-sm">Prueba a quitar algún filtro.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-14">
            {shown.map((p, i) => <ProductCard key={p.slug + i} product={p} />)}
          </div>
        )}

        <div ref={sentinel} />

        {hasMore && (
          <div className="text-center mt-16">
            <button onClick={() => setVisible((v) => Math.min(filtered.length, v + PAGE_SIZE))} className="btn-ghost">
              Cargar más productos <ChevronDown className="h-4 w-4" />
            </button>
            <p className="text-xs text-muted-foreground mt-3">{visible} de {filtered.length}</p>
          </div>
        )}
        {!hasMore && filtered.length > PAGE_SIZE && (
          <p className="text-center text-xs uppercase tracking-[0.22em] text-muted-foreground mt-12">— Has visto todo el catálogo —</p>
        )}
      </section>
    </Layout>
  );
};

export default Coleccion;

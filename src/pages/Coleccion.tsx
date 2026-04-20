import { useEffect, useMemo, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronDown, SlidersHorizontal } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Layout } from "@/components/Layout";
import { ProductCard } from "@/components/ProductCard";
import { Product, products, SwatchKey, swatchMeta } from "@/lib/products";

const catMap: Record<string, Product["category"] | undefined> = {
  pendientes: "pendientes", anillos: "anillos", colgantes: "colgantes", minis: "minis", nueva: undefined,
};

const PAGE_SIZE = 6;

const Coleccion = () => {
  const { slug = "pendientes" } = useParams();
  const { t } = useTranslation();
  const cat = catMap[slug];
  const meta = {
    title: t(`collection.titles.${slug in catMap ? slug : "pendientes"}`),
    sub: t(`collection.subs.${slug in catMap ? slug : "pendientes"}`),
    cat,
  };

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
          <Link to="/" className="link-underline">{t("collection.home")}</Link> <span className="mx-2 opacity-50">/</span> {meta.title}
        </nav>
        <div className="flex items-end justify-between gap-8 flex-wrap">
          <div>
            <h1 className="font-display text-5xl md:text-6xl">{meta.title}</h1>
            <p className="text-muted-foreground mt-3 max-w-md">{meta.sub}</p>
          </div>
          <p className="text-xs text-muted-foreground tabular-nums">{filtered.length} {t("collection.pieces")}</p>
        </div>
      </section>

      {/* Filters */}
      <section className="container">
        <div className="flex flex-wrap items-center gap-4 border-y border-border py-5">
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em]">
            <SlidersHorizontal className="h-3.5 w-3.5" /> {t("collection.filters")}
          </div>

          <div className="flex items-center gap-1.5">
            <button onClick={() => setMaterial("all")} className={`px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] border ${material==="all"?"bg-foreground text-background border-foreground":"border-border"}`}>{t("collection.all")}</button>
            {(Object.keys(swatchMeta) as SwatchKey[]).map((k) => (
              <button key={k} onClick={() => setMaterial(k)} className={`px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] border flex items-center gap-2 ${material===k?"bg-foreground text-background border-foreground":"border-border"}`}>
                <span className="h-2.5 w-2.5 rounded-full" style={{background: swatchMeta[k].color}} />
                {swatchMeta[k].label}
              </button>
            ))}
          </div>

          <label className="flex items-center gap-3 text-[11px] uppercase tracking-[0.18em]">
            {t("collection.maxPrice")} <span className="tabular-nums font-medium normal-case tracking-normal">{maxPrice}€</span>
            <input type="range" min={5} max={30} value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} className="w-32 accent-primary" />
          </label>

          <div className="ml-auto flex items-center gap-2">
            <select value={sort} onChange={(e) => setSort(e.target.value as any)} className="bg-transparent text-[11px] uppercase tracking-[0.18em] border border-border px-3 py-1.5">
              <option value="recommended">{t("collection.sortRecommended")}</option>
              <option value="price-asc">{t("collection.sortAsc")}</option>
              <option value="price-desc">{t("collection.sortDesc")}</option>
            </select>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="container py-12">
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-display text-3xl mb-2">{t("collection.noResults")}</p>
            <p className="text-muted-foreground text-sm">{t("collection.tryRemove")}</p>
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
              {t("collection.loadMore")} <ChevronDown className="h-4 w-4" />
            </button>
            <p className="text-xs text-muted-foreground mt-3">{t("collection.ofTotal", { visible, total: filtered.length })}</p>
          </div>
        )}
        {!hasMore && filtered.length > PAGE_SIZE && (
          <p className="text-center text-xs uppercase tracking-[0.22em] text-muted-foreground mt-12">{t("collection.endCatalog")}</p>
        )}
      </section>
    </Layout>
  );
};

export default Coleccion;

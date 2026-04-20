import { Link } from "react-router-dom";
import { ArrowRight, Quote } from "lucide-react";
import { Layout } from "@/components/Layout";
import { ImgPlaceholder } from "@/components/ImgPlaceholder";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/products";
import { heroImages, ugcImages, productImages } from "@/lib/product-images";
import { useTranslation } from "react-i18next";

const Home = () => {
  const { t } = useTranslation();
  const bestsellers = products.filter((p) => p.badge === "Bestseller").slice(0, 4);

  const reviews = [
    { author: "Lucía M.", text: t("La calidad es increíble. Llevo el anillo todos los días y sigue como nuevo."), rating: 5 },
    { author: "Carmen P.", text: t("Llegó en 2 días y el packaging es de revista. Repetiré seguro."), rating: 5 },
    { author: "Andrea R.", text: t("Por fin una marca de bisutería que no me da alergia. Y los diseños son preciosos."), rating: 5 },
  ];

  const collections = [
    { slug: "pendientes", name: t("Pendientes"), count: 14, swatch: "gold"   as const, src: productImages["pendientes-conchas"]?.[0] },
    { slug: "anillos",    name: t("Anillos"),    count: 8,  swatch: "silver" as const, src: productImages["anillo-mandala"]?.[0] },
    { slug: "colgantes",  name: t("Colgantes"),  count: 6,  swatch: "rose"   as const, src: productImages["colgante-tigre"]?.[0] },
    { slug: "minis",      name: t("Mini Aritos"),count: 9,  swatch: "teal"   as const, src: productImages["mini-aritos-piedras-fucsias"]?.[0] },
  ];

  const marqueeItems = [t("Hecho a mano · Madrid"), t("Hipoalergénico"), t("Resistente al agua"), t("Envío gratis +40€"), t("10% con TROUBLE10"), t("Atelier propio")];

  return (
    <Layout>
      {/* HERO editorial asimétrico */}
      <section className="container py-16 md:py-24">
        <div className="grid md:grid-cols-12 gap-8 items-end">
          <div className="md:col-span-7 fade-in-up">
            <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground mb-6">
              <span className="editorial-rule mr-3" /> {t("SS · Madrid · 2026")}
            </p>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.95]">
              {t("Joyas que")} <em className="italic text-primary">{t("cuentan")}</em><br />
              {t("tu historia.")}
            </h1>
            <p className="mt-8 max-w-md text-base text-muted-foreground leading-relaxed">
              {t("Bisutería artesanal pensada para viajar contigo. Diseñada y montada a mano en Madrid, con materiales hipoalergénicos que sobreviven al mar, al perfume y al tiempo.")}
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/coleccion/nueva" className="btn-primary">{t("Descubrir colección")}</Link>
              <Link to="/coleccion/pendientes" className="btn-ghost">{t("Ver pendientes")}</Link>
            </div>
          </div>
          <div className="md:col-span-5 grid grid-cols-2 gap-4">
            <ImgPlaceholder src={heroImages[0]} swatch="gold" ratio="portrait" label="Editorial 01" className="translate-y-8" loading="eager" />
            <ImgPlaceholder src={heroImages[1]} swatch="teal" ratio="portrait" label="Editorial 02" loading="eager" />
          </div>
        </div>
      </section>

      {/* Marquee */}
      <section className="border-y border-border py-6 overflow-hidden bg-surface">
        <div className="marquee">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex gap-12 items-center text-[11px] uppercase tracking-[0.3em]">
              {marqueeItems.map((t) => (
                <span key={t} className="flex items-center gap-12">{t} <span className="text-primary">◆</span></span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Colecciones */}
      <section className="container py-20 md:py-28">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground mb-3"><span className="editorial-rule mr-3" /> {t("Colecciones")}</p>
            <h2 className="font-display text-4xl md:text-5xl">{t("Encuentra")} <em className="italic">{t("tu universo.")}</em></h2>
          </div>
          <Link to="/coleccion/nueva" className="hidden md:inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] link-underline">
            {t("Ver todo")} <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {collections.map((c) => (
            <Link key={c.slug} to={`/coleccion/${c.slug}`} className="group">
              <ImgPlaceholder src={c.src} swatch={c.swatch} ratio="portrait" label={c.name} className="transition-transform duration-700 group-hover:scale-[1.03]" />
              <div className="flex items-baseline justify-between mt-4">
                <p className="font-display text-2xl">{c.name}</p>
                <p className="text-xs text-muted-foreground">{c.count} {t("piezas")}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Bestsellers */}
      <section className="container py-20">
        <div className="mb-12">
          <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground mb-3"><span className="editorial-rule mr-3" /> {t("Bestsellers")}</p>
          <h2 className="font-display text-4xl md:text-5xl">{t("Los favoritos")} <em className="italic">{t("de la casa.")}</em></h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12">
          {bestsellers.map((p) => <ProductCard key={p.slug} product={p} />)}
        </div>
      </section>

      {/* Reviews */}
      <section className="container py-20 md:py-28">
        <div className="text-center mb-14">
          <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground mb-3">{t("Lo que dicen")}</p>
          <h2 className="font-display text-4xl md:text-5xl">{t("+ 12.000 clientas")} <em className="italic">{t("felices.")}</em></h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <article key={i} className="border border-border bg-card p-8 shadow-soft">
              <Quote className="h-6 w-6 text-primary mb-4" strokeWidth={1.4} />
              <p className="font-display text-2xl leading-snug mb-6">"{r.text}"</p>
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">{r.author}</p>
                <p className="text-xs tracking-widest text-accent">★★★★★</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* UGC */}
      <section className="border-t border-border bg-surface">
        <div className="container py-20">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground mb-3">{t("Comunidad")}</p>
              <h2 className="font-display text-4xl md:text-5xl">{t("#TravelWith")}<em className="italic">{t("Trouble")}</em></h2>
            </div>
            <a href="#" className="text-[11px] uppercase tracking-[0.22em] link-underline">{t("@troublemakers.shop")}</a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <ImgPlaceholder key={i} src={ugcImages[i]} swatch={(["gold","silver","rose","teal","gold","silver"] as const)[i]} label={`UGC 0${i+1}`} ratio="square" />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;

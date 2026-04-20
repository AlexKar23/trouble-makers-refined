import { Link } from "react-router-dom";
import { ArrowRight, Quote } from "lucide-react";
import { Layout } from "@/components/Layout";
import { ImgPlaceholder } from "@/components/ImgPlaceholder";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/products";

const reviews = [
  { author: "Lucía M.", text: "La calidad es increíble. Llevo el anillo todos los días y sigue como nuevo.", rating: 5 },
  { author: "Carmen P.", text: "Llegó en 2 días y el packaging es de revista. Repetiré seguro.", rating: 5 },
  { author: "Andrea R.", text: "Por fin una marca de bisutería que no me da alergia. Y los diseños son preciosos.", rating: 5 },
];

const collections = [
  { slug: "pendientes", name: "Pendientes", count: 14, swatch: "gold" as const },
  { slug: "anillos",    name: "Anillos",    count: 8,  swatch: "silver" as const },
  { slug: "colgantes",  name: "Colgantes",  count: 6,  swatch: "rose" as const },
  { slug: "minis",      name: "Mini Aritos",count: 9,  swatch: "teal" as const },
];

const Home = () => {
  const bestsellers = products.filter((p) => p.badge === "Bestseller").slice(0, 4);
  const ugc = ["gold","silver","rose","teal","gold","silver"] as const;

  return (
    <Layout>
      {/* HERO editorial asimétrico */}
      <section className="container py-16 md:py-24">
        <div className="grid md:grid-cols-12 gap-8 items-end">
          <div className="md:col-span-7 fade-in-up">
            <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground mb-6">
              <span className="editorial-rule mr-3" /> SS · Madrid · 2026
            </p>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.95]">
              Joyas que <em className="italic text-primary">cuentan</em><br />
              tu historia.
            </h1>
            <p className="mt-8 max-w-md text-base text-muted-foreground leading-relaxed">
              Bisutería artesanal pensada para viajar contigo. Diseñada y montada a mano en Madrid,
              con materiales hipoalergénicos que sobreviven al mar, al perfume y al tiempo.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/coleccion/nueva" className="btn-primary">Descubrir colección</Link>
              <Link to="/coleccion/pendientes" className="btn-ghost">Ver pendientes</Link>
            </div>
          </div>
          <div className="md:col-span-5 grid grid-cols-2 gap-4">
            <ImgPlaceholder swatch="gold" ratio="portrait" label="Editorial 01" className="translate-y-8" />
            <ImgPlaceholder swatch="teal" ratio="portrait" label="Editorial 02" />
          </div>
        </div>
      </section>

      {/* Marquee */}
      <section className="border-y border-border py-6 overflow-hidden bg-surface">
        <div className="marquee">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex gap-12 items-center text-[11px] uppercase tracking-[0.3em]">
              {["Hecho a mano · Madrid", "Hipoalergénico", "Resistente al agua", "Envío gratis +40€", "10% con TROUBLE10", "Atelier propio"].map((t) => (
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
            <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground mb-3"><span className="editorial-rule mr-3" /> Colecciones</p>
            <h2 className="font-display text-4xl md:text-5xl">Encuentra <em className="italic">tu universo</em>.</h2>
          </div>
          <Link to="/coleccion/nueva" className="hidden md:inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] link-underline">
            Ver todo <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {collections.map((c) => (
            <Link key={c.slug} to={`/coleccion/${c.slug}`} className="group">
              <ImgPlaceholder swatch={c.swatch} ratio="portrait" label={c.name} className="transition-transform duration-700 group-hover:scale-[1.03]" />
              <div className="flex items-baseline justify-between mt-4">
                <p className="font-display text-2xl">{c.name}</p>
                <p className="text-xs text-muted-foreground">{c.count} piezas</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Bestsellers */}
      <section className="container py-20">
        <div className="mb-12">
          <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground mb-3"><span className="editorial-rule mr-3" /> Bestsellers</p>
          <h2 className="font-display text-4xl md:text-5xl">Los favoritos <em className="italic">de la casa</em>.</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12">
          {bestsellers.map((p) => <ProductCard key={p.slug} product={p} />)}
        </div>
      </section>

      {/* Reviews */}
      <section className="container py-20 md:py-28">
        <div className="text-center mb-14">
          <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground mb-3">Lo que dicen</p>
          <h2 className="font-display text-4xl md:text-5xl">+ 12.000 clientas <em className="italic">felices</em>.</h2>
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
              <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground mb-3">Comunidad</p>
              <h2 className="font-display text-4xl md:text-5xl">#TravelWith<em className="italic">Trouble</em></h2>
            </div>
            <a href="#" className="text-[11px] uppercase tracking-[0.22em] link-underline">@troublemakers.shop</a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
            {ugc.map((s, i) => (
              <ImgPlaceholder key={i} swatch={s} label={`UGC 0${i+1}`} ratio="square" />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;

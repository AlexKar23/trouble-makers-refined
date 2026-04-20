import { useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { Flame, ShieldCheck, Truck, RotateCcw } from "lucide-react";
import { Layout } from "@/components/Layout";
import { ImgPlaceholder } from "@/components/ImgPlaceholder";
import { ProductCard } from "@/components/ProductCard";
import { getProduct, products, SwatchKey, swatchMeta } from "@/lib/products";
import { productImages } from "@/lib/product-images";
import { useCart } from "@/lib/cart";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";

const Producto = () => {
  const { slug = "" } = useParams();
  const product = getProduct(slug);
  const [swatch, setSwatch] = useState<SwatchKey>(product?.swatches[0] ?? "gold");
  const [qty, setQty] = useState(1);
  const { add } = useCart();
  if (!product) return <Navigate to="/" replace />;

  const related = products.filter((p) => p.slug !== product.slug && p.category === product.category).slice(0, 4);
  const galleryTones: SwatchKey[] = [swatch, swatch === "gold" ? "silver" : "gold", swatch === "rose" ? "teal" : "rose"];

  return (
    <Layout>
      <div className="container py-10">
        <nav className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground mb-8">
          <Link to="/" className="link-underline">Inicio</Link> <span className="mx-2 opacity-50">/</span>
          <Link to={`/coleccion/${product.category}`} className="link-underline capitalize">{product.category}</Link>
          <span className="mx-2 opacity-50">/</span> {product.name}
        </nav>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Gallery */}
          <div className="grid grid-cols-6 gap-3">
            <div className="hidden lg:flex col-span-1 flex-col gap-3">
              {galleryTones.map((t, i) => (
                <button key={i} onClick={() => setSwatch(t)}>
                  <ImgPlaceholder swatch={t} label={`0${i+1}`} />
                </button>
              ))}
            </div>
            <div className="col-span-6 lg:col-span-5">
              <ImgPlaceholder key={swatch} swatch={swatch} label={product.name} ratio="portrait" className="animate-fade-in" />
            </div>
          </div>

          {/* Info */}
          <div>
            {product.stock <= 5 && (
              <div className="inline-flex items-center gap-2 bg-destructive/10 text-destructive px-3 py-1.5 text-[11px] uppercase tracking-[0.2em] mb-5">
                <Flame className="h-3.5 w-3.5" /> Solo quedan {product.stock} unidades
              </div>
            )}
            <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground mb-3">{product.collection}</p>
            <h1 className="font-display text-5xl md:text-6xl leading-[1.02]">{product.name}</h1>

            <div className="flex items-baseline gap-4 mt-6">
              <span className="font-display text-3xl text-primary">{product.price}€</span>
              {product.oldPrice && <span className="text-muted-foreground line-through">{product.oldPrice}€</span>}
              <span className="text-xs text-muted-foreground">IVA incluido · Envío calculado al pagar</span>
            </div>

            <p className="text-base text-muted-foreground leading-relaxed mt-6 max-w-md">{product.description}</p>

            {/* Swatches */}
            <div className="mt-8">
              <p className="text-[11px] uppercase tracking-[0.22em] mb-3">
                Acabado: <span className="text-muted-foreground normal-case tracking-normal">{swatchMeta[swatch].label}</span>
              </p>
              <div className="flex gap-3">
                {product.swatches.map((s) => (
                  <button
                    key={s} type="button" aria-label={swatchMeta[s].label}
                    onClick={() => setSwatch(s)}
                    data-active={swatch === s}
                    className="swatch"
                    style={{ background: swatchMeta[s].color }}
                  />
                ))}
              </div>
            </div>

            {/* Qty + CTA */}
            <div className="flex flex-wrap items-stretch gap-3 mt-8">
              <div className="flex items-center border border-foreground">
                <button className="px-4" onClick={() => setQty(Math.max(1, qty - 1))} aria-label="Menos">−</button>
                <span className="px-4 tabular-nums">{qty}</span>
                <button className="px-4" onClick={() => setQty(qty + 1)} aria-label="Más">+</button>
              </div>
              <button onClick={() => add(product, swatch, qty)} className="btn-primary flex-1 min-w-[200px]">
                Agregar al carrito · {(product.price * qty).toFixed(2)}€
              </button>
            </div>
            <button className="mt-3 w-full bg-foreground text-background py-3.5 text-xs uppercase tracking-[0.2em] font-medium hover:bg-primary transition-colors">
              Comprar con  Pay
            </button>

            {/* Trust mini */}
            <div className="mt-8 grid grid-cols-3 gap-3 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              <div className="flex items-center gap-2"><Truck className="h-3.5 w-3.5 text-primary" /> 1-3 días</div>
              <div className="flex items-center gap-2"><RotateCcw className="h-3.5 w-3.5 text-primary" /> 14 días</div>
              <div className="flex items-center gap-2"><ShieldCheck className="h-3.5 w-3.5 text-primary" /> Pago seguro</div>
            </div>

            {/* Accordion */}
            <Accordion type="single" collapsible className="mt-10 border-t border-border">
              <AccordionItem value="materiales">
                <AccordionTrigger className="text-[11px] uppercase tracking-[0.22em] hover:no-underline">Materiales y cuidado</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed">{product.materials} Evita el contacto prolongado con perfumes y guarda en bolsa de tela.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="medidas">
                <AccordionTrigger className="text-[11px] uppercase tracking-[0.22em] hover:no-underline">Medidas</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">{product.measurements}</AccordionContent>
              </AccordionItem>
              <AccordionItem value="envio">
                <AccordionTrigger className="text-[11px] uppercase tracking-[0.22em] hover:no-underline">Envío y devoluciones</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">Envío estándar en 1-3 días por 5€ (gratis a partir de 40€). Devoluciones gratuitas durante 14 días.</AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        {/* Cross-selling */}
        <section className="mt-28">
          <div className="flex items-end justify-between mb-10">
            <h2 className="font-display text-3xl md:text-4xl">También te puede <em className="italic">interesar</em></h2>
            <Link to={`/coleccion/${product.category}`} className="text-[11px] uppercase tracking-[0.22em] link-underline">Ver más</Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12">
            {related.map((p) => <ProductCard key={p.slug} product={p} />)}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Producto;

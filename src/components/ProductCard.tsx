import { Link } from "react-router-dom";
import { Product, SwatchKey } from "@/lib/products";
import { productImages } from "@/lib/product-images";
import { ImgPlaceholder } from "./ImgPlaceholder";
import { useState } from "react";
import { useCart } from "@/lib/cart";

export const ProductCard = ({ product }: { product: Product }) => {
  const [hover, setHover] = useState<SwatchKey>(product.swatches[0]);
  const { add } = useCart();
  const imgs = productImages[product.slug] ?? [];
  const primary = imgs[0];
  const secondary = imgs[1];

  return (
    <article
      className="group relative flex flex-col"
      onMouseLeave={() => setHover(product.swatches[0])}
    >
      <Link to={`/producto/${product.slug}`} className="block relative overflow-hidden bg-surface">
        <ImgPlaceholder src={primary} swatch={hover} label={product.name} ratio="portrait" className="transition-transform duration-700 group-hover:scale-[1.03]" />
        {secondary && (
          <img src={secondary} alt="" aria-hidden loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        )}
        {product.badge && (
          <span className="absolute left-3 top-3 bg-background/95 px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] font-medium text-foreground">
            {product.badge}
          </span>
        )}
        {product.stock <= 5 && (
          <span className="absolute right-3 top-3 bg-primary/95 px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] font-medium text-primary-foreground">
            Solo {product.stock}
          </span>
        )}
        <button
          type="button"
          onClick={(e) => { e.preventDefault(); add(product); }}
          className="absolute inset-x-3 bottom-3 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 bg-foreground text-background py-3 text-[10px] uppercase tracking-[0.2em] font-medium hover:bg-primary"
        >
          Añadir al carrito
        </button>
      </Link>
      <div className="mt-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{product.collection}</p>
          <Link to={`/producto/${product.slug}`} className="font-display text-xl leading-tight link-underline">
            {product.name}
          </Link>
        </div>
        <div className="text-right shrink-0">
          {product.oldPrice && <p className="text-xs text-muted-foreground line-through">{product.oldPrice}€</p>}
          <p className="font-display text-xl">{product.price}€</p>
        </div>
      </div>
      <div className="mt-2 flex gap-1.5">
        {product.swatches.map((s) => (
          <button
            key={s}
            type="button"
            aria-label={s}
            onMouseEnter={() => setHover(s)}
            className="h-3 w-3 rounded-full border border-border"
            style={{ background: s === "gold" ? "hsl(32 58% 62%)" : s === "silver" ? "hsl(220 6% 78%)" : s === "rose" ? "hsl(12 48% 70%)" : "hsl(174 42% 38%)" }}
          />
        ))}
      </div>
    </article>
  );
};
